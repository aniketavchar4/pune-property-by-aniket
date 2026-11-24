# PUNE PROPERTY | BY ANIKET

Premium real-estate marketplace starter for Pune, built with Next.js 14, TypeScript and React.

## Included in this starter
- Responsive premium homepage and navigation
- Buy / Rent / All listing filters and local search across sample listings
- Property categories: Room, 1 BHK, 2 BHK, 3 BHK+, Plot and Commercial
- Sample property cards and detail pages
- Requirement form preview
- Login / signup screen preview
- Property listing form preview
- English / Marathi hero copy toggle

## Important: current status
This is the **front-end starter**, not a live production marketplace yet. Sample listings are demo content. Forms do not save data, login is not connected, admin access is not secured, and image/video uploads and payments are not active. These will be implemented in later steps with Supabase and a payment provider. Do not publish real private information until those features are configured.

## Run locally
1. Install Node.js 20 or later.
2. In this project folder run `npm install`.
3. Run `npm run dev` and open http://localhost:3000.
4. Run `npm run build` before deployment.

## Deploy on Netlify
- Import this GitHub repository in Netlify.
- Build command: `npm run build`
- Publish directory: `.next` (Netlify's Next.js integration normally detects the framework automatically; if it asks for a publish directory, follow the current Netlify Next.js adapter guidance rather than forcing a static export).
- Do not set this as a plain static HTML site. Use Netlify's Next.js runtime/plugin integration.

## Next implementation stages
1. Create Supabase project and configure environment variables from `.env.example`.
2. Add database schema, property records, image/video storage and row-level security.
3. Add secure authentication and admin role checks.
4. Connect real forms, property search and listing management.
5. Add premium listing duration and payment gateway after server-side verification.

Never commit real API secrets or service-role keys to GitHub.
