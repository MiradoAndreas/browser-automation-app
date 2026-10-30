import "server-only"

import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"

import * as schema from "@/lib/db/schema"

/** Create a database client inside a Server Component, action, or route handler. */
export function getDb() {
  const databaseUrl = process.env.DATABASE_URL

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is missing. Run neon env pull to configure it.")
  }

  return drizzle({ client: neon(databaseUrl), schema })
}
