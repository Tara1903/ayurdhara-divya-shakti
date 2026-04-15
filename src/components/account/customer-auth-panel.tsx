"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  sendCustomerOtpAction,
  signInCustomerAction,
  signUpCustomerAction,
  type CustomerActionState,
  verifyCustomerOtpAction,
} from "@/app/actions/customer";
import { Button } from "@/components/ui/button";

type AuthMode = "signin" | "signup" | "otp";
const initialCustomerState: CustomerActionState = {};

export function CustomerAuthPanel({
  next = "/account",
}: {
  next?: string;
}) {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>("signin");
  const [otpEmail, setOtpEmail] = useState("");
  const [signInState, signInAction, signInPending] = useActionState(
    signInCustomerAction,
    initialCustomerState,
  );
  const [signUpState, signUpAction, signUpPending] = useActionState(
    signUpCustomerAction,
    initialCustomerState,
  );
  const [sendOtpState, sendOtpAction, sendOtpPending] = useActionState(
    sendCustomerOtpAction,
    initialCustomerState,
  );
  const [verifyOtpState, verifyOtpAction, verifyOtpPending] = useActionState(
    verifyCustomerOtpAction,
    initialCustomerState,
  );

  useEffect(() => {
    const redirectTarget =
      signInState.redirectTo ||
      signUpState.redirectTo ||
      verifyOtpState.redirectTo;

    if (redirectTarget) {
      router.push(redirectTarget);
      router.refresh();
    }
  }, [router, signInState.redirectTo, signUpState.redirectTo, verifyOtpState.redirectTo]);

  return (
    <section className="page-shell section-space">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="poster-surface rounded-[36px] px-6 py-8 md:px-8 md:py-10">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--color-gold)]">
            Customer Access
          </p>
          <h1 className="mt-4 font-serif-display text-4xl leading-[0.94] text-[var(--color-ink)] md:text-6xl">
            Save details once, reorder faster, and track every order in one place.
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-7 text-[var(--color-muted)] md:text-base">
            Sign in for account history, saved addresses, and wishlist access. Guest checkout still stays available if you just want to buy quickly.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              "Order history",
              "Saved addresses",
              "Wishlist + faster checkout",
            ].map((item) => (
              <div
                key={item}
                className="rounded-[24px] border border-white/40 bg-white/62 px-4 py-4 text-sm font-medium text-[var(--color-ink)] backdrop-blur"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[36px] border border-[var(--color-line)] bg-white/92 p-5 shadow-[0_18px_60px_rgba(61,44,20,0.08)] md:p-8">
          <div className="flex flex-wrap gap-2">
            <ModeButton active={mode === "signin"} onClick={() => setMode("signin")}>
              Sign In
            </ModeButton>
            <ModeButton active={mode === "signup"} onClick={() => setMode("signup")}>
              Create Account
            </ModeButton>
            <ModeButton active={mode === "otp"} onClick={() => setMode("otp")}>
              Email OTP
            </ModeButton>
          </div>

          {mode === "signin" ? (
            <form action={signInAction} className="mt-8 grid gap-5">
              <input type="hidden" name="next" value={next} />
              <Field label="Email">
                <input name="email" type="email" placeholder="you@example.com" required />
              </Field>
              <Field label="Password">
                <input name="password" type="password" placeholder="Your password" required />
              </Field>
              {signInState.error ? <ErrorText>{signInState.error}</ErrorText> : null}
              <Button type="submit" disabled={signInPending}>
                {signInPending ? "Signing In..." : "Sign In"}
              </Button>
            </form>
          ) : null}

          {mode === "signup" ? (
            <form action={signUpAction} className="mt-8 grid gap-5">
              <input type="hidden" name="next" value={next} />
              <Field label="Full Name">
                <input name="fullName" placeholder="Your full name" required />
              </Field>
              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Email">
                  <input name="email" type="email" placeholder="you@example.com" required />
                </Field>
                <Field label="Phone">
                  <input name="phone" type="tel" placeholder="10-digit mobile number" required />
                </Field>
              </div>
              <Field label="Password">
                <input
                  name="password"
                  type="password"
                  placeholder="At least 8 characters"
                  required
                />
              </Field>
              {signUpState.error ? <ErrorText>{signUpState.error}</ErrorText> : null}
              {signUpState.success ? <SuccessText>{signUpState.success}</SuccessText> : null}
              <Button type="submit" disabled={signUpPending}>
                {signUpPending ? "Creating Account..." : "Create Account"}
              </Button>
            </form>
          ) : null}

          {mode === "otp" ? (
            <div className="mt-8 grid gap-8">
              <form action={sendOtpAction} className="grid gap-5">
                <input type="hidden" name="next" value={next} />
                <Field label="Email for OTP">
                  <input
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={otpEmail}
                    onChange={(event) => setOtpEmail(event.target.value)}
                    required
                  />
                </Field>
                {sendOtpState.error ? <ErrorText>{sendOtpState.error}</ErrorText> : null}
                {sendOtpState.success ? <SuccessText>{sendOtpState.success}</SuccessText> : null}
                <Button type="submit" disabled={sendOtpPending}>
                  {sendOtpPending ? "Sending OTP..." : "Send Email OTP"}
                </Button>
              </form>

              <form action={verifyOtpAction} className="grid gap-5 rounded-[28px] bg-[var(--color-surface)] p-4 md:p-5">
                <input type="hidden" name="next" value={next} />
                <Field label="Email">
                  <input
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={otpEmail}
                    onChange={(event) => setOtpEmail(event.target.value)}
                    required
                  />
                </Field>
                <Field label="OTP Code">
                  <input name="token" inputMode="numeric" placeholder="6-digit code" required />
                </Field>
                {verifyOtpState.error ? <ErrorText>{verifyOtpState.error}</ErrorText> : null}
                {verifyOtpState.success ? <SuccessText>{verifyOtpState.success}</SuccessText> : null}
                <Button type="submit" disabled={verifyOtpPending}>
                  {verifyOtpPending ? "Verifying..." : "Verify OTP"}
                </Button>
              </form>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function ModeButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm font-medium ${
        active
          ? "bg-[rgba(46,125,50,0.14)] text-[var(--color-forest)]"
          : "border border-[var(--color-line)] text-[var(--color-ink)]"
      }`}
    >
      {children}
    </button>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
      <span>{label}</span>
      <div className="[&>input]:w-full [&>input]:rounded-[22px] [&>input]:border [&>input]:border-[var(--color-line)] [&>input]:bg-[var(--color-surface)] [&>input]:px-4 [&>input]:py-3 [&>input]:outline-none">
        {children}
      </div>
    </label>
  );
}

function ErrorText({ children }: { children: React.ReactNode }) {
  return <p className="rounded-2xl bg-[#fff0eb] px-4 py-3 text-sm text-[#9c4b35]">{children}</p>;
}

function SuccessText({ children }: { children: React.ReactNode }) {
  return (
    <p className="rounded-2xl bg-[#eff8ee] px-4 py-3 text-sm text-[var(--color-forest)]">
      {children}
    </p>
  );
}
