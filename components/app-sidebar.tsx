"use client"

import { useState } from "react"
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs"
import { Plus, Workflow } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
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

export function AppSidebar() {
  const [workflows, setWorkflows] = useState(initialWorkflows)
  const [activeWorkflow, setActiveWorkflow] = useState(initialWorkflows[0])

  function addWorkflow() {
    const name = `untitled-workflow-${workflows.length + 1}`
    setWorkflows([...workflows, name])
    setActiveWorkflow(name)
  }

  return (
    <Sidebar collapsible="icon" className="border-none">
      <SidebarHeader className="flex flex-row items-center justify-between gap-4 px-4 py-5 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-2">
        <div className="min-w-0 flex-1 overflow-hidden group-data-[collapsible=icon]:hidden">
          <OrganizationSwitcher
            hidePersonal
            appearance={{
              elements: {
                rootBox: { width: "100%", minWidth: 0, maxWidth: "100%" },
                organizationSwitcherTrigger: [
                  "justify-start gap-2 rounded-lg p-0 text-muted-foreground hover:text-sidebar-foreground",
                  {
                    width: "100%",
                    minWidth: 0,
                    maxWidth: "100%",
                    overflow: "hidden",
                  },
                ],
                organizationSwitcherTriggerIcon:
                  "shrink-0 text-muted-foreground",
                organizationPreview: {
                  minWidth: 0,
                  flex: 1,
                  overflow: "hidden",
                },
                organizationPreviewTextContainer: {
                  minWidth: 0,
                  flex: 1,
                  overflow: "hidden",
                },
                organizationPreviewMainIdentifier: [
                  "text-sm font-medium text-muted-foreground",
                  {
                    display: "block",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  },
                ],
                avatarBox: "size-7 shrink-0 rounded-lg",
              },
            }}
          />
        </div>
        <SidebarTrigger className="shrink-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground" />
      </SidebarHeader>
      <SidebarContent className="px-2 pt-2 group-data-[collapsible=icon]:px-0">
        <SidebarGroup>
          <SidebarGroupLabel className="mb-1 text-sm font-medium text-muted-foreground">
            Workflows
          </SidebarGroupLabel>
          <SidebarGroupAction onClick={addWorkflow} aria-label="New workflow">
            <Plus aria-hidden="true" />
          </SidebarGroupAction>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {workflows.map((workflow) => (
                <SidebarMenuItem key={workflow}>
                  <SidebarMenuButton
                    tooltip={workflow}
                    isActive={activeWorkflow === workflow}
                    onClick={() => setActiveWorkflow(workflow)}
                    aria-pressed={activeWorkflow === workflow}
                    className="h-9 rounded-lg px-2 text-sm data-active:font-normal"
                  >
                    <Workflow aria-hidden="true" />
                    <span>{workflow}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="px-4 py-5 group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:px-2">
        <UserButton appearance={{ elements: { avatarBox: "size-8" } }} />
      </SidebarFooter>
    </Sidebar>
  )
}

export function DashboardSidebarTrigger() {
  const { isMobile } = useSidebar()

  if (!isMobile) return null

  return (
    <SidebarTrigger className="absolute top-4 left-4 z-10 text-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground" />
  )
}
