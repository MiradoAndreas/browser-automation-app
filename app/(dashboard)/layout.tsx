import { AppSidebar, DashboardSidebarTrigger } from "@/components/app-sidebar"
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
