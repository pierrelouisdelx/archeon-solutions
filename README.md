# Archeon Solutions — archeon.ai

Marketing site, project case studies, and engineering blog, built on Next.js 16 (App Router) + Payload CMS.

## Quickstart (local)

```bash
cp .env.example .env       # default values already match the docker-compose Postgres
pnpm install
pnpm db:up                 # start Postgres in Docker (port 5432)
pnpm migrate               # create tables
pnpm dev
```

Other DB scripts: `pnpm db:down` (stop), `pnpm db:reset` (drop volume + restart).

Visit:
- http://localhost:3000 — public site
- http://localhost:3000/admin — Payload admin (first visit creates the admin user)

To seed the marketing content (projects, team, services, logos, testimonials, homepage stats) from the existing copy in `lib/fallbacks.ts`:

```bash
pnpm seed
```

The seed is idempotent — re-running is safe.

## Stack

- **Next.js 16** App Router, React Server Components, ISR with on-demand revalidation.
- **Payload CMS 3** — admin at `/admin`, REST at `/api`, GraphQL at `/api/graphql`.
- **Postgres** via `@payloadcms/db-postgres`.
- **Lexical** rich text with custom blocks: Quote, CodeBlock, ImageBlock, Callout, Embed.
- **Plugins**: `seo`, `redirects`, `nested-docs`, `search`. Optional `vercel-blob` storage when `BLOB_READ_WRITE_TOKEN` is set.
- **SEO**: per-page `generateMetadata`, dynamic `sitemap.ts` / `robots.ts` / `manifest.ts`, RSS at `/feed.xml`, dynamic OG images at `/og/{type}/{slug}`, JSON-LD (`Organization`, `WebSite`, `Article`, `CreativeWork`, `BreadcrumbList`).

## Routes

| Path | Purpose |
| --- | --- |
| `/` | Marketing single-page (CMS-driven sections + fallbacks) |
| `/projects` | Project index |
| `/projects/[slug]` | Project detail |
| `/blog` | Article index, paginated |
| `/blog/[slug]` | Article detail |
| `/blog/category/[slug]` | Category archive |
| `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`, `/feed.xml` | SEO / discovery |
| `/og/{type}/{slug}` | Dynamic 1200×630 social card |
| `/admin` | Payload CMS |
| `/api/preview`, `/api/exit-preview` | Draft preview |
| `/api/revalidate` | On-demand revalidation webhook (POST with `x-revalidate-secret`) |

## Environment

| Variable | Notes |
| --- | --- |
| `DATABASE_URI` | Postgres connection string |
| `PAYLOAD_SECRET` | 32+ random chars |
| `NEXT_PUBLIC_SERVER_URL` | Public base URL — used by SEO and Payload |
| `REVALIDATION_SECRET` | Auth for `/api/revalidate` |
| `BLOB_READ_WRITE_TOKEN` | Optional — enables Vercel Blob media storage |

## Scripts

| Script | Purpose |
| --- | --- |
| `pnpm dev` | Next.js dev server |
| `pnpm build` / `pnpm start` | Production build / serve |
| `pnpm payload` | Direct Payload CLI |
| `pnpm migrate` / `pnpm migrate:create` | Run / create Postgres migrations |
| `pnpm generate:types` | Regenerate `payload-types.ts` from the schema |
| `pnpm seed` | Populate the CMS with the marketing fallback content |
