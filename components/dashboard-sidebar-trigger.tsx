"use client"

import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar"

export function DashboardSidebarTrigger() {
  const { isMobile } = useSidebar()

  if (!isMobile) return null

  return (
    <SidebarTrigger className="absolute top-4 left-4 z-10 text-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground" />
  )
}
