"use server";

import { revalidatePath } from "next/cache";
import { createPreviewCustomerSession, getCurrentCustomer, getCustomerAuthMode, clearCustomerSession } from "@/lib/customer-auth";
import {
  authenticatePreviewCustomer,
  createCustomerPreviewAccount,
  sendPreviewOtp,
  syncCustomerProfileFromAuth,
  toggleCustomerWishlist,
  upsertCustomerAddress,
  updateCustomerProfile,
  verifyPreviewOtp,
} from "@/lib/customer-data";
import { getSiteUrl } from "@/lib/site";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { normalizePhone } from "@/lib/utils";

export type CustomerActionState = {
  error?: string;
  success?: string;
  redirectTo?: string;
};

function sanitizeNextPath(value: string | null | undefined) {
  if (!value || !value.startsWith("/")) {
    return "/account";
  }

  if (value.startsWith("//")) {
    return "/account";
  }

  return value;
}

function getOtpRedirectUrl(next: string) {
  const redirectUrl = new URL("/auth/callback", getSiteUrl());
  redirectUrl.searchParams.set("next", next);
  return redirectUrl.toString();
}

function validatePassword(password: string) {
  return password.length >= 8;
}

export async function signUpCustomerAction(
  _previousState: CustomerActionState,
  formData: FormData,
): Promise<CustomerActionState> {
  const fullName = String(formData.get("fullName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const phone = normalizePhone(String(formData.get("phone") ?? ""));
  const password = String(formData.get("password") ?? "");
  const next = sanitizeNextPath(String(formData.get("next") ?? "/account"));

  if (!fullName || !email || phone.length !== 10 || !validatePassword(password)) {
    return {
      error:
        "Enter your full name, a valid email, a 10-digit phone number, and a password with at least 8 characters.",
    };
  }

  const mode = getCustomerAuthMode();

  if (mode === "supabase") {
    const supabase = await createSupabaseServerClient();
    if (!supabase) {
      return { error: "Customer sign up is not configured yet." };
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: getOtpRedirectUrl(next),
        data: {
          full_name: fullName,
          phone,
        },
      },
    });

    if (error) {
      return { error: error.message };
    }

    if (data.user) {
      await syncCustomerProfileFromAuth({
        id: data.user.id,
        email: data.user.email,
        fullName,
        phone,
      });
    }

    if (data.session) {
      return {
        success: "Account created successfully.",
        redirectTo: next,
      };
    }

    return {
      success:
        "Account created. Check your email to confirm your account or use the OTP flow to sign in.",
    };
  }

  if (mode === "preview") {
    try {
      const customer = await createCustomerPreviewAccount({
        fullName,
        email,
        phone,
        password,
      });
      await createPreviewCustomerSession(customer.id);

      return {
        success: "Preview account created successfully.",
        redirectTo: next,
      };
    } catch (error) {
      return {
        error:
          error instanceof Error ? error.message : "Unable to create preview account.",
      };
    }
  }

  return { error: "Customer auth is not available yet." };
}

export async function signInCustomerAction(
  _previousState: CustomerActionState,
  formData: FormData,
): Promise<CustomerActionState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const next = sanitizeNextPath(String(formData.get("next") ?? "/account"));

  if (!email || !password) {
    return { error: "Enter your email and password." };
  }

  const mode = getCustomerAuthMode();

  if (mode === "supabase") {
    const supabase = await createSupabaseServerClient();
    if (!supabase) {
      return { error: "Customer sign in is not configured yet." };
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { error: error.message };
    }

    if (data.user) {
      await syncCustomerProfileFromAuth({
        id: data.user.id,
        email: data.user.email,
        fullName:
          typeof data.user.user_metadata?.full_name === "string"
            ? data.user.user_metadata.full_name
            : null,
        phone:
          typeof data.user.user_metadata?.phone === "string"
            ? data.user.user_metadata.phone
            : null,
      });
    }

    return {
      success: "Signed in successfully.",
      redirectTo: next,
    };
  }

  if (mode === "preview") {
    const customer = await authenticatePreviewCustomer(email, password);
    if (!customer) {
      return { error: "These preview credentials are not valid." };
    }

    await createPreviewCustomerSession(customer.id);
    return {
      success: "Signed in to preview account.",
      redirectTo: next,
    };
  }

  return { error: "Customer auth is not available yet." };
}

export async function sendCustomerOtpAction(
  _previousState: CustomerActionState,
  formData: FormData,
): Promise<CustomerActionState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const next = sanitizeNextPath(String(formData.get("next") ?? "/account"));

  if (!email) {
    return { error: "Enter your email address first." };
  }

  const mode = getCustomerAuthMode();

  if (mode === "supabase") {
    const supabase = await createSupabaseServerClient();
    if (!supabase) {
      return { error: "Email OTP is not configured yet." };
    }

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: false,
        emailRedirectTo: getOtpRedirectUrl(next),
      },
    });

    if (error) {
      return { error: error.message };
    }

    return {
      success:
        "We sent a sign-in code or secure sign-in link to your email. Use either one to continue.",
    };
  }

  if (mode === "preview") {
    try {
      const token = await sendPreviewOtp(email);
      return {
        success: `Preview OTP sent. Use code ${token} to continue.`,
      };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : "Unable to send preview OTP.",
      };
    }
  }

  return { error: "Email OTP is not available yet." };
}

export async function verifyCustomerOtpAction(
  _previousState: CustomerActionState,
  formData: FormData,
): Promise<CustomerActionState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const token = String(formData.get("token") ?? "").trim();
  const next = sanitizeNextPath(String(formData.get("next") ?? "/account"));

  if (!email || token.length < 6) {
    return { error: "Enter your email and the OTP code." };
  }

  const mode = getCustomerAuthMode();

  if (mode === "supabase") {
    const supabase = await createSupabaseServerClient();
    if (!supabase) {
      return { error: "Email OTP is not configured yet." };
    }

    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: "email",
    });

    if (error) {
      return { error: error.message };
    }

    if (data.user) {
      await syncCustomerProfileFromAuth({
        id: data.user.id,
        email: data.user.email,
        fullName:
          typeof data.user.user_metadata?.full_name === "string"
            ? data.user.user_metadata.full_name
            : null,
        phone:
          typeof data.user.user_metadata?.phone === "string"
            ? data.user.user_metadata.phone
            : null,
      });
    }

    return {
      success: "OTP verified successfully.",
      redirectTo: next,
    };
  }

  if (mode === "preview") {
    try {
      const customer = await verifyPreviewOtp(email, token);
      await createPreviewCustomerSession(customer.id);

      return {
        success: "Preview OTP verified successfully.",
        redirectTo: next,
      };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : "Unable to verify preview OTP.",
      };
    }
  }

  return { error: "Email OTP is not available yet." };
}

export async function signOutCustomerAction() {
  await clearCustomerSession();
  revalidatePath("/");
}

export async function saveCustomerProfileAction(
  _previousState: CustomerActionState,
  formData: FormData,
): Promise<CustomerActionState> {
  const customer = await getCurrentCustomer();
  if (!customer) {
    return { error: "Please sign in to update your profile." };
  }

  const fullName = String(formData.get("fullName") ?? "").trim();
  const phone = normalizePhone(String(formData.get("phone") ?? ""));

  if (!fullName || phone.length !== 10) {
    return { error: "Enter your full name and a valid 10-digit phone number." };
  }

  try {
    await updateCustomerProfile(customer.id, {
      fullName,
      phone,
    });

    revalidatePath("/account");
    revalidatePath("/account/profile");
    revalidatePath("/checkout");

    return { success: "Profile updated successfully." };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Unable to save your profile.",
    };
  }
}

export async function saveCustomerAddressAction(
  _previousState: CustomerActionState,
  formData: FormData,
): Promise<CustomerActionState> {
  const customer = await getCurrentCustomer();
  if (!customer) {
    return { error: "Please sign in to manage addresses." };
  }

  const recipientName = String(formData.get("recipientName") ?? "").trim();
  const phone = normalizePhone(String(formData.get("phone") ?? ""));
  const line1 = String(formData.get("line1") ?? "").trim();
  const line2 = String(formData.get("line2") ?? "").trim();
  const city = String(formData.get("city") ?? "").trim();
  const state = String(formData.get("state") ?? "").trim();
  const pincode = String(formData.get("pincode") ?? "").trim();

  if (!recipientName || phone.length !== 10 || !line1 || !city || !state || !pincode) {
    return {
      error: "Complete all required address fields before saving.",
    };
  }

  try {
    await upsertCustomerAddress(customer.id, {
      id: String(formData.get("id") ?? "").trim() || undefined,
      label: String(formData.get("label") ?? "").trim() || "Address",
      recipientName,
      phone,
      line1,
      line2,
      city,
      state,
      pincode,
      country: String(formData.get("country") ?? "").trim() || "India",
      isDefault: formData.get("isDefault") === "on",
    });

    revalidatePath("/account");
    revalidatePath("/account/addresses");
    revalidatePath("/checkout");

    return { success: "Address saved successfully." };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Unable to save your address.",
    };
  }
}

export async function deleteCustomerAddressAction(formData: FormData) {
  const customer = await getCurrentCustomer();
  if (!customer) {
    return;
  }

  const addressId = String(formData.get("addressId") ?? "").trim();
  if (!addressId) {
    return;
  }

  const { deleteCustomerAddress } = await import("@/lib/customer-data");
  await deleteCustomerAddress(customer.id, addressId);
  revalidatePath("/account");
  revalidatePath("/account/addresses");
  revalidatePath("/checkout");
}

export async function toggleWishlistAction(
  _previousState: CustomerActionState,
  formData: FormData,
): Promise<CustomerActionState> {
  const redirectTo = sanitizeNextPath(String(formData.get("redirectTo") ?? "/account/wishlist"));
  const customer = await getCurrentCustomer();

  if (!customer) {
    return {
      redirectTo: `/auth?next=${encodeURIComponent(redirectTo)}`,
    };
  }

  const productId = String(formData.get("productId") ?? "").trim();
  if (!productId) {
    return {};
  }

  await toggleCustomerWishlist(customer.id, productId);
  revalidatePath("/account");
  revalidatePath("/account/wishlist");
  revalidatePath(redirectTo);

  return {
    redirectTo,
  };
}
