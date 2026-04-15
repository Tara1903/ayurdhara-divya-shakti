# AYURDHARA DIVYA SHAKTI

Premium Next.js ecommerce storefront for Ayurvedic 5+1 Nabhi Therapy wellness kits.

## Stack

- Next.js 16 App Router
- TypeScript
- Tailwind CSS v4
- Framer Motion
- Supabase
- Vercel

## Core experience

- Premium conversion-first homepage
- Dedicated kits catalog
- Individual product detail pages
- Cart and Cash on Delivery checkout
- Optional customer account auth with email/password + email OTP
- Saved addresses, wishlist, and account order history
- Order success flow
- Separate admin login and dashboard with product and order management
- Supabase-ready product and order storage

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Create local env:

```bash
cp .env.example .env.local
```

3. Fill these variables:

```env
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ADMIN_EMAIL=
ADMIN_PASSWORD=
ADMIN_SESSION_SECRET=
```

If you want to review locally before wiring infrastructure, the storefront will
run in preview mode without Supabase. Checkout stores preview orders in memory,
and admin login uses these localhost-only demo credentials:

```env
Email: admin@ayurdhara.local
Password: preview123
```

In preview mode, customer auth is also available locally at `/auth`. You can:

- create a customer account with name, email, phone, and password
- sign in with email + password
- test email OTP using the preview code shown in the UI

4. Run the app:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

`NEXT_PUBLIC_SITE_URL` should be your final production domain or Vercel project URL so
metadata, sitemap, and robots.txt point to the correct site.

## Supabase setup

Run the SQL migration in:

- `supabase/migrations/20260410_initial_schema.sql`

Then seed the starter catalog with:

- `supabase/seed.sql`

Then run the customer account migration:

- `supabase/migrations/20260416_customer_accounts_and_wishlist.sql`

For real customer auth, enable Supabase Email auth and support:

- email + password
- email OTP / magic link

## Admin login

Admin login is env-based for now. Add these values to `.env.local`:

- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `ADMIN_SESSION_SECRET`

Then open:

- `/admin/login`

## Customer account routes

- `/auth`
- `/account`
- `/account/orders`
- `/account/profile`
- `/account/addresses`
- `/account/wishlist`

## Production checks

```bash
npm run lint
npm run build
```

## Production deployment

1. Create a new Supabase project and run:

   - `supabase/migrations/20260410_initial_schema.sql`
   - `supabase/migrations/20260416_customer_accounts_and_wishlist.sql`
   - `supabase/seed.sql`

2. Add these variables in Vercel:

   - `NEXT_PUBLIC_SITE_URL`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD`
   - `ADMIN_SESSION_SECRET`

3. Import the GitHub repo into a new Vercel project.
4. Deploy a preview build first, then promote to production once verified.
