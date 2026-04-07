"use client";

import React from "react";

/**
 * Admin Layout
 * Provides a clean container for the CMS. Auth is handled internally by the dashboard page.
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {children}
    </div>
  );
}

