# Backend merge guide

The `api/` directory contains all new code to add to `photography-portfolio-api`.
This code targets **Prisma 5.x** (the version your existing project uses).

## Steps

### 1. Schema — replace your `prisma/schema.prisma`

Copy `api/prisma/schema.prisma` over yours. It adds:
- `SiteConfig` model
- `Photo` model (UUID id, `isFeatured`, `cloudinaryId`, album relation)
- Extends `Album` with `coverPhoto`, `photos`, `isPublished`, `layoutType`, `orderIndex`

**Important:** `Photo.id` is now a UUID string. If you have existing Photo rows with integer IDs, run `prisma migrate reset` first (drops all data — fine for dev).

```bash
npx prisma migrate reset
npx prisma migrate dev --name add-photos-config
npx prisma db seed        # populates SiteConfig with initial values
```

### 2. Install new dependencies

```bash
npm install @nestjs/config @nestjs/jwt @nestjs/passport passport passport-jwt cloudinary
npm install --save-dev @types/passport-jwt @types/multer
```

### 3. Copy new source directories

Copy these directories from `api/src/` into your project's `src/`:

| Directory | What it does |
|-----------|-------------|
| `prisma/` | Global PrismaService (if you don't have one already) |
| `auth/` | JWT login endpoint + guard |
| `cloudinary/` | Cloudinary upload/delete service |
| `albums/` | Public + admin album controllers & service |
| `photos/` | Public + admin photo controllers & service (with upload) |
| `site-config/` | Public + admin site config controllers & service |

### 4. Update `app.module.ts`

See `api/src/app.module.ts` — add `ConfigModule`, `PrismaModule`, `AuthModule`,
`CloudinaryModule`, `AlbumsModule`, `PhotosModule`, `SiteConfigModule` to imports.

Remove the old `AlbumsModule` if it conflicts (the new one replaces it).

### 5. Update `main.ts`

See `api/src/main.ts` — adds:
- `app.setGlobalPrefix('api')` (all routes become `/api/...`)
- `app.enableCors(...)` for `localhost:5173` + `process.env.FRONTEND_URL`

### 6. Environment variables

Copy `.env.example` to `.env` and fill in:

```
DATABASE_URL=...
ADMIN_EMAIL=...
ADMIN_PASSWORD=...
JWT_SECRET=...
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
FRONTEND_URL=https://your-frontend.vercel.app
```

### 7. Seed script

Add to `package.json`:
```json
"prisma": { "seed": "ts-node prisma/seed.ts" }
```

Then run: `npx prisma db seed`

## Deployment (Fly.io + Neon)

See the main plan for full deploy steps. Quick summary:

```bash
# Backend on Fly.io
fly launch
fly secrets set DATABASE_URL="..." ADMIN_EMAIL="..." ADMIN_PASSWORD="..." JWT_SECRET="..." \
  CLOUDINARY_CLOUD_NAME="..." CLOUDINARY_API_KEY="..." CLOUDINARY_API_SECRET="..." \
  FRONTEND_URL="https://your-frontend.vercel.app"
fly deploy
fly ssh console -C "npx prisma migrate deploy"
fly ssh console -C "npx prisma db seed"
```

Use **Neon** for PostgreSQL — the `DATABASE_URL` must include `?sslmode=require` at the end.
