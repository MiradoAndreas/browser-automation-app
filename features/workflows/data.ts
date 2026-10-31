import { and, desc, eq } from "drizzle-orm"

import { getDb } from "@/lib/db"
import { workflows } from "@/lib/db/schema"

export async function listWorkflows(orgId: string) {
  return getDb()
    .select()
    .from(workflows)
    .where(eq(workflows.orgId, orgId))
    .orderBy(desc(workflows.createdAt))
}

export async function getWorkflow(orgId: string, id: string) {
  const [workflow] = await getDb()
    .select()
    .from(workflows)
    .where(and(eq(workflows.id, id), eq(workflows.orgId, orgId)))
    .limit(1)

  return workflow
}

export async function createWorkflow(orgId: string, name: string) {
  const [workflow] = await getDb()
    .insert(workflows)
    .values({ orgId, name })
    .returning()

  return workflow
}
