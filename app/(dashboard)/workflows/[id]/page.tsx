import { WorkflowShell } from "@/features/workflows/components/workflow-shell"

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <main className="h-svh min-w-0">
      <WorkflowShell workflowId={id} />
    </main>
  )
}
