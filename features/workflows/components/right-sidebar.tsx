"use client"

import { PlayIcon } from "lucide-react"
import { useTransition } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { runWorkflowAction } from "@/features/workflows/action"

export function RightSidebar() {
  const [isPending, startTransition] = useTransition()

  function handleRunWorkflow() {
    startTransition(async () => {
      try {
        await runWorkflowAction()
        toast.success("Workflow run queued")
      } catch {
        toast.error("Failed to start workflow. Please try again.")
      }
    })
  }

  return (
    <div className="flex size-full items-center justify-center">
      <Button type="button" onClick={handleRunWorkflow} disabled={isPending}>
        <PlayIcon aria-hidden="true" data-icon="inline-start" />
        {isPending ? "Starting…" : "Run"}
      </Button>
    </div>
  )
}
