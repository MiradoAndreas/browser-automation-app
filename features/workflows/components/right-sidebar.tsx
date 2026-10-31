"use client"

import { PlayIcon } from "lucide-react"
import { useRealtimeRun } from "@trigger.dev/react-hooks"
import { useState, useTransition } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { runWorkflowAction } from "@/features/workflows/action"
import type { helloWorldTask } from "@/trigger/example"

type WorkflowRun = Awaited<ReturnType<typeof runWorkflowAction>>

function WorkflowRunFeedback({ runId, publicAccessToken }: WorkflowRun) {
  const { run, error } = useRealtimeRun<typeof helloWorldTask>(runId, {
    accessToken: publicAccessToken,
    skipColumns: ["payload"],
  })

  if (error) {
    return (
      <p role="alert" className="text-sm text-destructive">
        Unable to load live task updates. Please try again.
      </p>
    )
  }

  return (
    <div role="status" className="space-y-2 text-center text-sm">
      <p className="text-muted-foreground">
        {run ? run.status.toLowerCase().replaceAll("_", " ") : "Connecting…"}
      </p>
      {run?.isSuccess && <p>{run.output?.message ?? "Task completed"}</p>}
      {run?.isFailed && (
        <p className="text-destructive">Task failed. Please try again.</p>
      )}
      {run?.isCancelled && <p>Task canceled.</p>}
    </div>
  )
}

export function RightSidebar() {
  const [isPending, startTransition] = useTransition()
  const [workflowRun, setWorkflowRun] = useState<WorkflowRun | null>(null)

  function handleRunWorkflow() {
    startTransition(async () => {
      try {
        setWorkflowRun(await runWorkflowAction())
        toast.success("Workflow run queued")
      } catch {
        toast.error("Failed to start workflow. Please try again.")
      }
    })
  }

  return (
    <div className="flex size-full flex-col items-center justify-center gap-4 p-4">
      <Button type="button" onClick={handleRunWorkflow} disabled={isPending}>
        <PlayIcon aria-hidden="true" data-icon="inline-start" />
        {isPending ? "Starting…" : "Run"}
      </Button>
      {workflowRun && (
        <WorkflowRunFeedback key={workflowRun.runId} {...workflowRun} />
      )}
    </div>
  )
}
