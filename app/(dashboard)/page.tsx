import { Plus, Workflow } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export default function Page() {
  return (
    <main className="flex min-h-svh bg-[#1b1b1b] text-[#fafafa]">
      <Empty className="gap-6 rounded-none px-6 py-8 font-[Arial,sans-serif]">
        <EmptyHeader className="max-w-sm gap-3">
          <EmptyMedia
            variant="icon"
            className="mb-2 size-12 rounded-xl bg-[#262626] text-[#fafafa]"
          >
            <Workflow aria-hidden="true" className="size-6" strokeWidth={2} />
          </EmptyMedia>
          <EmptyTitle className="text-xl leading-[1.25] font-medium tracking-[-0.025em]">
            <h1>No workflow selected</h1>
          </EmptyTitle>
          <EmptyDescription className="max-w-sm text-sm leading-[1.6] text-[#a0a0a0]">
            Select a workflow from the sidebar
            <br className="hidden sm:block" /> or create a new one to get started.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="max-w-none">
          <Button
            type="button"
            className="h-10 gap-2 rounded-lg bg-[#e5e5e5] px-4 text-sm font-medium text-[#1b1b1b] hover:bg-[#d4d4d4]"
          >
            <Plus aria-hidden="true" className="size-4" strokeWidth={2} />
            New workflow
          </Button>
        </EmptyContent>
      </Empty>
    </main>
  )
}
