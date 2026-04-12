export function getSiteUrl() {
  const configuredUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL ??
    process.env.VERCEL_URL;

  if (!configuredUrl) {
    return "http://localhost:3000";
  }

  const normalized = configuredUrl.startsWith("http")
    ? configuredUrl
    : `https://${configuredUrl}`;

  return normalized.replace(/\/+$/, "");
}
