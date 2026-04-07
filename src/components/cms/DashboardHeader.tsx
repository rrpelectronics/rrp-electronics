"use client";
import React from "react";
import Link from "next/link";
import { Zap, Menu, Globe } from "lucide-react";

interface HeaderProps {
    setIsSidebarOpen: (isOpen: boolean) => void;
}

const DashboardHeader: React.FC<HeaderProps> = ({ setIsSidebarOpen }) => {
    return (
        <header className="h-16 shrink-0 border-b border-gray-200 flex items-center justify-between px-4 lg:px-10 bg-white sticky top-0 z-[40] shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
            <div className="flex items-center gap-3 lg:gap-4">
                <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="lg:hidden p-2 -ml-2 text-gray-500 hover:bg-gray-100 rounded-md transition-colors"
                >
                    <Menu className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-3 text-body4 font-medium text-gray-400 tracking-tight">
                    <Zap className="hidden sm:block w-[18px] h-[18px]" />
                    <span className="hidden sm:block">Console</span>
                    <span className="hidden sm:block opacity-30">/</span>
                    <span className="text-gray-900 border-b border-gray-200 hidden sm:block">Dashboard</span>
                    <Link href="/" className="flex sm:hidden items-center gap-3 cursor-pointer">
                        <span className="text-body4 font-medium tracking-tight text-gray-900 border-b border-orange-500/20">
                            RRP Electronics CMS
                        </span>
                    </Link>
                </div>
            </div>
            <Link
                href="/"
                className="text-[12px] sm:text-body4 font-medium text-[#FF5C19] hover:underline tracking-tight cursor-pointer flex items-center gap-2 bg-orange-50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full transition-colors shrink-0"
            >
                <span>View live site</span>
                <Globe className="w-[14px] h-[14px]" />
            </Link>
        </header>
    );
};

export default DashboardHeader;
