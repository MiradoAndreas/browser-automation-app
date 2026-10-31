import { Workflow } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export default function NotFound() {
  return (
    <main className="flex min-h-svh">
      <Empty className="gap-6 rounded-none px-6 py-8">
        <EmptyHeader className="max-w-sm gap-3">
          <EmptyMedia variant="icon" className="mb-2 size-12 rounded-xl">
            <Workflow aria-hidden="true" className="size-6" strokeWidth={2} />
          </EmptyMedia>
          <EmptyTitle className="text-xl leading-[1.25] font-medium tracking-[-0.025em]">
            <h1>Workflow not found</h1>
          </EmptyTitle>
          <EmptyDescription className="max-w-sm text-sm leading-[1.6]">
            This workflow could not be found. Select another workflow from the
            sidebar.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="max-w-none">
          <Button asChild className="h-10 rounded-lg px-4 text-sm font-medium">
            <Link href="/">Back to dashboard</Link>
          </Button>
        </EmptyContent>
      </Empty>
    </main>
  )
}
