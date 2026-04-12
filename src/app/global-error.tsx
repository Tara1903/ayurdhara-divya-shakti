"use client";

import { useEffect } from "react";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  unstable_retry: () => void;
};

export default function GlobalError({
  error,
  unstable_retry,
}: GlobalErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          background:
            "radial-gradient(circle at top, rgba(212, 175, 55, 0.14), transparent 35%), #f7f1e3",
          color: "#17351d",
          fontFamily:
            'Manrope, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        }}
      >
        <title>Something went wrong | AYURDHARA DIVYA SHAKTI</title>
        <main
          style={{
            display: "grid",
            minHeight: "100vh",
            placeItems: "center",
            padding: "24px",
          }}
        >
          <section
            style={{
              width: "100%",
              maxWidth: "640px",
              borderRadius: "32px",
              border: "1px solid rgba(23, 53, 29, 0.08)",
              background: "rgba(255,255,255,0.86)",
              boxShadow: "0 28px 60px rgba(23, 53, 29, 0.08)",
              padding: "32px",
            }}
          >
            <p
              style={{
                margin: 0,
                color: "#9a7a15",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
              }}
            >
              AYURDHARA DIVYA SHAKTI
            </p>
            <h1
              style={{
                margin: "16px 0 0",
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                lineHeight: 0.94,
              }}
            >
              We hit a temporary issue while loading this page.
            </h1>
            <p
              style={{
                margin: "16px 0 0",
                color: "rgba(23, 53, 29, 0.72)",
                fontSize: "16px",
                lineHeight: 1.8,
              }}
            >
              The storefront is still safe. Try loading the page again, and if the
              issue continues we can inspect the deployment logs next.
            </p>
            {error.digest ? (
              <p
                style={{
                  margin: "16px 0 0",
                  color: "rgba(23, 53, 29, 0.52)",
                  fontSize: "13px",
                }}
              >
                Reference: {error.digest}
              </p>
            ) : null}
            <button
              onClick={() => unstable_retry()}
              style={{
                marginTop: "24px",
                border: 0,
                borderRadius: "999px",
                background: "#2e7d32",
                color: "#fff",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: 700,
                padding: "14px 22px",
              }}
            >
              Try again
            </button>
          </section>
        </main>
      </body>
    </html>
  );
}
