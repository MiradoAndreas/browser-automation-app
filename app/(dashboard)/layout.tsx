import { AppSidebar } from "@/components/app-sidebar"
import { DashboardSidebarTrigger } from "@/components/dashboard-sidebar-trigger"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider className="bg-background">
      <AppSidebar />
      <div className="relative flex min-w-0 flex-1 flex-col">
        <DashboardSidebarTrigger />
        {children}
      </div>
    </SidebarProvider>
  )
}
