"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Newspaper,
  CalendarDays,
  Briefcase,
  Mail,
  LogOut,
  ChevronRight,
  Zap,
  Loader2,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const menuItems = [
  { title: "Dashboard", icon: LayoutDashboard, href: "/admin" },
  { title: "News", icon: Newspaper, href: "/admin/news" },
  { title: "Events", icon: CalendarDays, href: "/admin/events" },
  { title: "Careers", icon: Briefcase, href: "/admin/careers" },
  { title: "Newsletters", icon: Mail, href: "/admin/newsletters" },
];

function AdminSidebarContent() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    document.cookie =
      "admin_session=; path=/admin; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    router.push("/admin/login");
  };

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border/50 pb-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="hover:bg-transparent px-2"
              render={<Link href="/admin" className="group" />}
            >
              <div className="flex aspect-square size-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary via-primary/90 to-orange-500 text-white shadow-xl shadow-primary/20 transition-transform group-hover:scale-105 active:scale-95">
                <Zap size={20} className="fill-current animate-pulse" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight ml-3">
                <span className="truncate font-medium text-primary text-base  leading-none mb-1">RRP ELE CMS</span>
                <span className="truncate text-[10px] text-muted-foreground uppercase tracking-widest opacity-80 leading-none">
                  Digital Engine
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60 mb-2">
            Governance & Content
          </SidebarGroupLabel>
          <SidebarMenu className="gap-1 px-2">
            {menuItems.map((item) => {
              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname?.startsWith(item.href);
              return (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    render={<Link href={item.href} className="flex items-center gap-3" />}
                    isActive={isActive}
                    tooltip={item.title}
                    className={`h-11 transition-all duration-300 rounded-xl px-4 ${isActive
                      ? "bg-white shadow-sm border-gray-100/50 text-primary"
                      : "text-muted-foreground hover:bg-white/50 hover:text-foreground"
                      }`}
                  >
                    <div className={`transition-colors duration-300 ${isActive ? "text-primary" : "group-hover:text-primary"}`}>
                      <item.icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                    </div>
                    <span className={isActive ? "font-medium " : "font-normal"}>{item.title}</span>
                    {isActive && (
                      <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary),0.5)]" />
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupLabel className="px-4 text-[10px] uppercase tracking-[0.2em]  text-muted-foreground/60 mb-2">
            Resources
          </SidebarGroupLabel>
          <SidebarMenu className="gap-1 px-2">
            <SidebarMenuItem>
              <SidebarMenuButton
                render={<Link href="/" target="_blank" />}
                tooltip="View public site"
                className="h-11 rounded-xl px-4 text-muted-foreground hover:bg-white/50 hover:text-foreground transition-all duration-300"
              >
                <Zap className="size-4" />
                <span className="font-medium">View Website</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border/50 p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center gap-3 px-2 py-3 rounded-2xl bg-sidebar-accent/30 border border-white/40 shadow-sm">
              <Avatar className="h-9 w-9 rounded-xl border-2 border-white shadow-sm">
                <AvatarFallback className="rounded-xl bg-primary/10 text-primary text-xs">
                  AD
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-[13px] leading-tight overflow-hidden">
                <span className="truncate text-foreground">Admin User</span>
                <span className="truncate text-[10px] text-muted-foreground/80 uppercase tracking-wider">
                  Super Administrator
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 rounded-xl bg-white border border-gray-100 hover:bg-red-50 hover:border-red-100 text-muted-foreground hover:text-red-500 transition-all shadow-sm active:scale-90 group cursor-pointer"
                title="Logout"
              >
                <LogOut size={14} className="transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthChecking, setIsAuthChecking] = useState(true);

  const currentTitle =
    menuItems.find((item) =>
      item.href === "/admin"
        ? pathname === "/admin"
        : pathname?.startsWith(item.href)
    )?.title ?? "Dashboard";

  useEffect(() => {
    if (pathname === "/admin/login") {
      setIsAuthChecking(false);
      return;
    }
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      router.push("/admin/login");
    } else {
      setIsAuthChecking(false);
    }
  }, [pathname, router]);

  // Login page — render without shell
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // Auth guard loading
  if (isAuthChecking) {
    return (
      <div className="min-h-screen bg-sidebar flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-primary mb-3" size={36} />
        <p className="text-xs  uppercase tracking-widest text-muted-foreground">
          Authenticating Portal…
        </p>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <AdminSidebarContent />
      <SidebarInset>
        {/* Top bar */}
        <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex flex-1 items-center justify-between">
            <div className="flex items-center gap-2">
              <h1 className="text-foreground text-lg">{currentTitle}</h1>
              <Badge variant="outline" className="text-[10px] uppercase tracking-wider text-primary border-primary/30">
                CMS
              </Badge>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground font-medium">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>AWS Connected</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="flex flex-1 flex-col gap-4 p-6 bg-sidebar/30 min-h-[calc(100svh-4rem)]">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
