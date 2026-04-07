"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthChecking, setIsAuthChecking] = useState(true);

  useEffect(() => {
    if (pathname === "/cms/login") {
      setIsAuthChecking(false);
      return;
    }
    
    // Check both potential keys used during migration
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true" || 
                       localStorage.getItem("adminSession_ele") === "active";
                       
    if (!isLoggedIn) {
      router.push("/cms/login");
    } else {
      setIsAuthChecking(false);
    }
  }, [pathname, router]);

  // Login page — render without shell or loading state
  if (pathname === "/cms/login") {
    return <>{children}</>;
  }

  // Auth guard loading
  if (isAuthChecking) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-[#FF5C19] mb-3" size={36} />
        <p className="text-xs uppercase tracking-widest text-gray-400 font-medium">
          Authenticating Portal…
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {children}
    </div>
  );
}

