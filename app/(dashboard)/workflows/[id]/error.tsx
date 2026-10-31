"use client"

import { AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export default function Error({ retry }: { retry: () => void }) {
  return (
    <main className="flex min-h-svh">
      <Empty className="gap-6 rounded-none px-6 py-8">
        <EmptyHeader className="max-w-sm gap-3">
          <EmptyMedia variant="icon" className="mb-2 size-12 rounded-xl">
            <AlertCircle aria-hidden="true" className="size-6" strokeWidth={2} />
          </EmptyMedia>
          <EmptyTitle className="text-xl leading-[1.25] font-medium tracking-[-0.025em]">
            <h1>Unable to load workflow</h1>
          </EmptyTitle>
          <EmptyDescription className="max-w-sm text-sm leading-[1.6]">
            Something went wrong while loading this workflow. Please try again.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="max-w-none">
          <Button
            type="button"
            onClick={() => retry()}
            className="h-10 gap-2 rounded-lg px-4 text-sm font-medium"
          >
            Try again
          </Button>
        </EmptyContent>
      </Empty>
    </main>
  )
}
