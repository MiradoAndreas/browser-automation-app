"use client"

import { Plus, Workflow } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTransition } from "react"
import type { Workflow as WorkflowData } from "@/lib/db/schema"
import { generateSlug } from "@/features/workflows/lib/generate-slug"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

interface WorkflowNavProps {
  workflows: WorkflowData[]
  createWorkflowAction: (name: string) => Promise<void>
}

export function WorkflowNav({ workflows, createWorkflowAction }: WorkflowNavProps) {
  const pathname = usePathname()
  const { state, isMobile } = useSidebar()
  const [isPending, startTransition] = useTransition()

  function handleCreateWorkflow() {
    startTransition(async () => {
      await createWorkflowAction(generateSlug())
    })
  }

  const workflowList = (
    <SidebarMenu className="gap-1">
      {workflows.map((workflow) => (
        <SidebarMenuItem key={workflow.id}>
          <SidebarMenuButton
            asChild
            isActive={pathname === `/workflows/${workflow.id}`}
            className="h-9 rounded-lg px-2 text-sm data-active:font-normal"
          >
            <Link href={`/workflows/${workflow.id}`}>
              <span>{workflow.name}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )

  if (state === "collapsed" && !isMobile) {
    return (
      <SidebarGroup>
        <SidebarMenu>
          <SidebarMenuItem>
            <Popover>
              <PopoverTrigger asChild>
                <SidebarMenuButton aria-label="Workflows" tooltip="Workflows">
                  <Workflow aria-hidden="true" />
                </SidebarMenuButton>
              </PopoverTrigger>
              <PopoverContent side="right" align="start">
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={handleCreateWorkflow}
                      disabled={isPending}
                    >
                      <Plus aria-hidden="true" />
                      <span>New workflow</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
                <Separator />
                {workflowList}
              </PopoverContent>
            </Popover>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    )
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="mb-1 text-sm font-medium text-muted-foreground">
        Workflows
      </SidebarGroupLabel>
      <SidebarGroupAction
        aria-label="New workflow"
        onClick={handleCreateWorkflow}
        disabled={isPending}
      >
        <Plus aria-hidden="true" />
      </SidebarGroupAction>
      <SidebarGroupContent>{workflowList}</SidebarGroupContent>
    </SidebarGroup>
  )
}
