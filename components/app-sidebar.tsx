import { OrganizationSwitcher, UserButton } from "@clerk/nextjs"
import { auth } from "@clerk/nextjs/server"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { WorkflowNav } from "@/features/workflows/components/workflow-nav"
import { createWorkflowAction } from "@/features/workflows/action"
import { listWorkflows } from "@/features/workflows/data"

export async function AppSidebar() {
  const { orgId } = await auth()
  const workflows = orgId ? await listWorkflows(orgId) : []

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
        <WorkflowNav
          workflows={workflows}
          createWorkflowAction={createWorkflowAction}
        />
      </SidebarContent>
      <SidebarFooter className="px-4 py-5 group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:px-2">
        <UserButton appearance={{ elements: { avatarBox: "size-8" } }} />
      </SidebarFooter>
    </Sidebar>
  )
}
