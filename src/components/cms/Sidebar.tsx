"use client";
import React from "react";
import Link from "next/link";
import {
  Newspaper,
  ChevronRight,
  LogOut,
  Zap,
  X,
  Mail,
  CalendarDays,
  Briefcase
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  view: string;
  category: string;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
  setCategory: (category: string) => void;
  setView: (view: any) => void;
  handleLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  view,
  category,
  isSidebarOpen,
  setIsSidebarOpen,
  setCategory,
  setView,
  handleLogout,
}) => {
  const menuItems = [
    { id: "news", label: "News", icon: Newspaper },
    { id: "newsletters", label: "Newsletters", icon: Mail },
    { id: "events", label: "Events", icon: CalendarDays },
    { id: "careers", label: "Careers", icon: Briefcase },
  ];

  return (
    <>
      <div
        onClick={() => setIsSidebarOpen(false)}
        className={cn(
          "fixed inset-0 bg-black/50 z-[45] lg:hidden transition-opacity duration-300",
          isSidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      />

      <aside
        className={cn(
          "fixed inset-y-0 left-0 w-[280px] lg:w-[260px] bg-[#F5F5F5] border-r border-gray-200 flex flex-col z-50 transition-transform duration-300 lg:translate-x-0 lg:sticky lg:top-0 h-screen shrink-0",
          isSidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        )}
      >
        <div className="h-16 flex items-center px-4 sm:px-8 border-b border-gray-100 shrink-0 bg-white">
          <Link href="/cms" className="flex items-center gap-3 cursor-pointer">
            <Zap className="w-[18px] h-[18px] text-[#FF5C19]" />
            <span className="text-body4 font-neueMontreal tracking-normal text-gray-900 border-b border-orange-500/20">
              RRP Electronics CMS
            </span>
          </Link>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden ml-auto p-2 text-gray-400 hover:text-gray-900"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 px-4 py-8 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setCategory(item.id);
                setView("list");
                setIsSidebarOpen(false);
              }}
              className={cn(
                "w-full flex items-center justify-between px-4 py-3 rounded-md transition-all cursor-pointer",
                category === item.id
                  ? "bg-white text-[#FF5C19] shadow-sm border border-gray-100 font-medium"
                  : "text-gray-400 hover:text-gray-900 font-normal"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-[16px] h-[16px]" />
                <span className="text-body4 font-neueMontreal tracking-normal">{item.label}</span>
              </div>
              {category === item.id && <ChevronRight className="w-[14px] h-[14px] text-orange-600" />}
            </button>
          ))}
        </div>

        <div className="px-4 sm:px-6 py-6 border-t border-gray-200 mt-auto bg-gray-100">
          <button
            onClick={handleLogout}
            className="shadow-sm w-full flex items-center gap-2 px-4 py-3 text-body4 font-neueMontreal tracking-normal text-gray-400 hover:text-red-500 transition-colors cursor-pointer bg-white/20 rounded-md border border-gray-100"
          >
            <LogOut className="w-[16px] h-[16px]" />
            Sign out
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
