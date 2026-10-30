import { loadEnvConfig } from "@next/env"
import { defineConfig } from "drizzle-kit"

loadEnvConfig(process.cwd())

const databaseUrl = process.env.DATABASE_URL_UNPOOLED

if (!databaseUrl) {
  throw new Error("DATABASE_URL_UNPOOLED is required for Drizzle migrations.")
}

export default defineConfig({
  schema: "./lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: { url: databaseUrl },
})
