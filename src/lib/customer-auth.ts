import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";
import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  getCustomerProfileById,
  syncCustomerProfileFromAuth,
} from "@/lib/customer-data";
import { getPreviewCustomerById } from "@/lib/local-preview-store";
import { isSupabaseAuthConfigured } from "@/lib/supabase";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import type { CustomerSessionSummary } from "@/types";

const CUSTOMER_SESSION_COOKIE = "ayurdhara_customer_session";

type CustomerAuthMode = "supabase" | "preview" | "disabled";

function getPreviewAuthConfig() {
  if (process.env.NODE_ENV === "production") {
    return {
      enabled: false,
      secret: "",
    };
  }

  return {
    enabled: true,
    secret:
      process.env.ADMIN_SESSION_SECRET || "ayurdhara-customer-preview-secret",
  };
}

function signPreviewValue(value: string, secret: string) {
  return createHmac("sha256", secret).update(value).digest("hex");
}

export function getCustomerAuthMode(): CustomerAuthMode {
  if (isSupabaseAuthConfigured()) {
    return "supabase";
  }

  if (getPreviewAuthConfig().enabled) {
    return "preview";
  }

  return "disabled";
}

export function isCustomerAuthAvailable() {
  return getCustomerAuthMode() !== "disabled";
}

async function getPreviewSessionUserId() {
  const previewConfig = getPreviewAuthConfig();
  if (!previewConfig.enabled) {
    return null;
  }

  const cookieStore = await cookies();
  const session = cookieStore.get(CUSTOMER_SESSION_COOKIE)?.value;

  if (!session) {
    return null;
  }

  const [userId, signature] = session.split(":");
  if (!userId || !signature) {
    return null;
  }

  const expected = signPreviewValue(userId, previewConfig.secret);

  try {
    return timingSafeEqual(Buffer.from(signature), Buffer.from(expected))
      ? userId
      : null;
  } catch {
    return null;
  }
}

export async function createPreviewCustomerSession(userId: string) {
  const previewConfig = getPreviewAuthConfig();
  if (!previewConfig.enabled) {
    throw new Error("Preview customer auth is not available in production.");
  }

  const cookieStore = await cookies();
  const payload = `${userId}:${signPreviewValue(userId, previewConfig.secret)}`;

  cookieStore.set(CUSTOMER_SESSION_COOKIE, payload, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });
}

export async function clearCustomerSession() {
  const mode = getCustomerAuthMode();

  if (mode === "supabase") {
    const supabase = await createSupabaseServerClient();
    await supabase?.auth.signOut();
  }

  const cookieStore = await cookies();
  cookieStore.delete(CUSTOMER_SESSION_COOKIE);
}

function toCustomerSummary(profile: {
  id: string;
  fullName: string;
  email: string;
  phone: string;
}): CustomerSessionSummary {
  return {
    id: profile.id,
    fullName: profile.fullName,
    email: profile.email,
    phone: profile.phone,
  };
}

export const getCurrentCustomer = cache(async () => {
  const mode = getCustomerAuthMode();

  if (mode === "supabase") {
    const supabase = await createSupabaseServerClient();
    if (!supabase) {
      return null;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return null;
    }

    const existingProfile =
      (await getCustomerProfileById(user.id)) ??
      (await syncCustomerProfileFromAuth({
        id: user.id,
        email: user.email,
        fullName:
          typeof user.user_metadata?.full_name === "string"
            ? user.user_metadata.full_name
            : null,
        phone:
          typeof user.user_metadata?.phone === "string"
            ? user.user_metadata.phone
            : null,
      }));

    if (existingProfile) {
      return toCustomerSummary(existingProfile);
    }

    return {
      id: user.id,
      fullName:
        (typeof user.user_metadata?.full_name === "string" &&
          user.user_metadata.full_name) ||
        user.email?.split("@")[0] ||
        "Customer",
      email: user.email ?? "",
      phone:
        (typeof user.user_metadata?.phone === "string" &&
          user.user_metadata.phone) ||
        "",
    } satisfies CustomerSessionSummary;
  }

  if (mode === "preview") {
    const userId = await getPreviewSessionUserId();
    if (!userId) {
      return null;
    }

    const customer = getPreviewCustomerById(userId);
    return customer ? toCustomerSummary(customer) : null;
  }

  return null;
});

export async function requireCustomer(redirectTo = "/account") {
  const customer = await getCurrentCustomer();
  if (!customer) {
    redirect(`/auth?next=${encodeURIComponent(redirectTo)}`);
  }

  return customer;
}
