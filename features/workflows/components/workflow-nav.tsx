"use client"

import { useState } from "react"
import { Plus, Workflow } from "lucide-react"

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

const initialWorkflows = [
  "dominant-wasp",
  "honest-reindeer",
  "expected-llama",
  "essential-ocelot",
  "creepy-echidna",
  "eastern-silkworm",
  "cultural-lion",
  "proud-weasel",
  "regional-bonobo",
]

export function WorkflowNav() {
  const { state, isMobile } = useSidebar()
  const [workflows, setWorkflows] = useState(initialWorkflows)
  const [activeWorkflow, setActiveWorkflow] = useState(initialWorkflows[0])

  function addWorkflow() {
    const name = `untitled-workflow-${workflows.length + 1}`
    setWorkflows([...workflows, name])
    setActiveWorkflow(name)
  }

  const workflowList = (
    <SidebarMenu className="gap-1">
      {workflows.map((workflow) => (
        <SidebarMenuItem key={workflow}>
          <SidebarMenuButton
            isActive={activeWorkflow === workflow}
            onClick={() => setActiveWorkflow(workflow)}
            aria-pressed={activeWorkflow === workflow}
            className="h-9 rounded-lg px-2 text-sm data-active:font-normal"
          >
            <span>{workflow}</span>
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
                    <SidebarMenuButton onClick={addWorkflow}>
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
      <SidebarGroupAction onClick={addWorkflow} aria-label="New workflow">
        <Plus aria-hidden="true" />
      </SidebarGroupAction>
      <SidebarGroupContent>{workflowList}</SidebarGroupContent>
    </SidebarGroup>
  )
}
