import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"

export const workflows = pgTable("workflows", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  enabled: boolean("enabled").default(false).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
})
