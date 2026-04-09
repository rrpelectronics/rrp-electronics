"use client";
import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CMSHeaderProps {
  title: string;
  subtitle: string;
  onAdd: () => void;
  buttonText: string;
}

export const CMSHeader: React.FC<CMSHeaderProps> = ({ title, subtitle, onAdd, buttonText }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
    <div>
      <h2 className="text-2xl">{title}</h2>
      <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
    </div>
    <Button onClick={onAdd} className="gap-2 rounded-xl shadow-lg shadow-primary/20">
      <Plus size={16} /> {buttonText}
    </Button>
  </div>
);
