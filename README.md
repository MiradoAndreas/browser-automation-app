# Next.js template

This is a Next.js template with shadcn/ui.

## Database (Drizzle + Neon)

The app uses Drizzle ORM with `@neondatabase/serverless` for SQL over HTTP. After linking a Neon
project with `neon link`, pull its database credentials into the ignored local
environment file:

```bash
neon env pull --service postgres --file .env.local
```

Query from Server Components, Server Actions, or route handlers:

```ts
import { sql } from "drizzle-orm"
import { getDb } from "@/lib/db"

const db = getDb()
const rows = await db.execute(sql`SELECT current_database() AS database`)
```

Define tables in `lib/db/schema.ts` with `drizzle-orm/pg-core`. The schema includes
a simple `workflows` table for testing. Use `db.select()`, `db.insert()`, and the
other Drizzle query builders with those tables, or the `sql` tagged template for
parameterized SQL.

Drizzle Kit loads `.env*` files using Next.js environment loading. Set
`DATABASE_URL` to the pooled application URL and `DATABASE_URL_UNPOOLED` to the
direct URL for schema tools. Both are supplied by Neon environment pull.

```bash
npm run db:generate # Generate SQL migrations after editing the schema
npm run db:check    # Check migration history consistency
npm run db:migrate  # Apply generated migrations to the configured database
npm run db:studio   # Browse data locally
```

For a quick development test, run `npm run db:push` to apply the schema directly
without generating a migration file.

Commit the generated `drizzle/` directory with schema changes. Test migrations
on a development Neon branch before applying them to production.

`lib/db.ts` is server-only; keep
`DATABASE_URL` private. Clerk continues to handle authentication. Queries for
user-owned data must enforce the signed-in user's access on the server.

For isolated development, run `neon checkout dev --create` after linking. This
also updates local environment variables. Restart `npm run dev` after switching
database branches.

## Adding components

To add components to your app, run the following command:

```bash
npx shadcn@latest add button
```

This will place the ui components in the `components` directory.

## Using components

To use the components in your app, import them as follows:

```tsx
import { Button } from "@/components/ui/button"
```
