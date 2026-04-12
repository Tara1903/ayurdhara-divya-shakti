import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const SESSION_COOKIE = "ayurdhara_admin_session";

function getAdminEnv() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const secret = process.env.ADMIN_SESSION_SECRET;
  const isDevelopment = process.env.NODE_ENV !== "production";

  if (!email || !password || !secret) {
    if (!isDevelopment) {
      return {
        email,
        password,
        secret,
        isConfigured: false,
        isPreview: false,
      };
    }

    return {
      email: "admin@ayurdhara.local",
      password: "preview123",
      secret: "ayurdhara-local-preview-secret",
      isConfigured: true,
      isPreview: true,
    };
  }

  return {
    email,
    password,
    secret,
    isConfigured: Boolean(email && password && secret),
    isPreview: false,
  };
}

function signValue(value: string, secret: string) {
  return createHmac("sha256", secret).update(value).digest("hex");
}

export async function createAdminSession(email: string, password: string) {
  const env = getAdminEnv();

  if (!env.isConfigured || !env.email || !env.password || !env.secret) {
    throw new Error(
      "Admin authentication is not configured. Add ADMIN_EMAIL, ADMIN_PASSWORD, and ADMIN_SESSION_SECRET.",
    );
  }

  if (email !== env.email || password !== env.password) {
    throw new Error("Invalid admin credentials.");
  }

  const payload = `${env.email}:${signValue(env.email, env.secret)}`;
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, payload, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function isAdminAuthenticated() {
  const env = getAdminEnv();
  if (!env.isConfigured || !env.email || !env.secret) {
    return false;
  }

  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE)?.value;

  if (!session) {
    return false;
  }

  const [email, signature] = session.split(":");
  if (!email || !signature) {
    return false;
  }

  const expected = signValue(email, env.secret);

  try {
    return (
      email === env.email &&
      timingSafeEqual(Buffer.from(signature), Buffer.from(expected))
    );
  } catch {
    return false;
  }
}

export async function requireAdmin() {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    redirect("/admin/login");
  }
}

export function getAdminSetupState() {
  const env = getAdminEnv();
  return env.isConfigured && !env.isPreview;
}

export function isPreviewAdminAuth() {
  return getAdminEnv().isPreview;
}
