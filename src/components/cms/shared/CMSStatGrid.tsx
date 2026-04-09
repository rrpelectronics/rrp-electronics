"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface Stat {
  label: string;
  value: number | string;
  icon?: LucideIcon;
  color?: string;
  bg?: string;
}

interface CMSStatGridProps {
  stats: Stat[];
}

export const CMSStatGrid: React.FC<CMSStatGridProps> = ({ stats }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
    {stats.map((s, i) => (
      <Card key={i} className="border-border/50">
        <CardContent className="p-4 flex items-center gap-3">
          {s.icon && (
            <div className={`w-9 h-9 ${s.bg || "bg-muted"} rounded-xl flex items-center justify-center ${s.color || "text-foreground"} flex-shrink-0`}>
              <s.icon size={18} />
            </div>
          )}
          <div>
            <p className="text-2xl leading-none">{s.value}</p>
            <p className="text-xs text-muted-foreground font-medium mt-0.5">{s.label}</p>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);
