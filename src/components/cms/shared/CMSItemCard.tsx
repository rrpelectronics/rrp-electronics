"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2, Globe, ExternalLink, Newspaper, Edit2 } from "lucide-react";
import Link from "next/link";

interface CMSItemCardProps {
  item: any;
  onEdit?: (item: any) => void;
  onDelete: (id: string) => void;
  icon?: any;
  imageKey?: string;
}

export const CMSItemCard: React.FC<CMSItemCardProps> = ({ item, onEdit, onDelete, icon: Icon = Newspaper, imageKey = "newsEventImg" }) => (
  <Card key={item.id} className="border-border/50 group hover:border-primary/30 hover:shadow-md transition-all duration-300">
    <CardContent className="p-4 flex items-center gap-4">
      <div className="w-14 h-14 rounded-xl overflow-hidden bg-muted flex-shrink-0 border border-border/50">
        {item[imageKey] ? (
          <img src={item[imageKey]} alt="" className="w-full h-full object-contain p-1" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <Icon size={20} />
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-foreground truncate group-hover:text-primary transition-colors text-sm">{item.title}</p>
        <div className="flex items-center gap-3 mt-1.5">
          <Badge variant="outline" className="text-[10px] rounded-lg">{item.date}</Badge>
          {item.source && <span className="text-xs text-muted-foreground font-medium flex items-center gap-1"><Globe size={10} /> {item.source}</span>}
        </div>
      </div>
      <div className="flex items-center gap-1 flex-shrink-0">
        {item.link && (
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-muted-foreground hover:text-primary" render={(
            <Link href={item.link} target="_blank">
               <ExternalLink size={14} />
            </Link>
          )} />
        )}
        {onEdit && (
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-muted-foreground hover:text-primary" onClick={() => onEdit(item)}>
            <Edit2 size={14} />
          </Button>
        )}
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-muted-foreground hover:text-destructive" onClick={() => onDelete(item.id)}>
          <Trash2 size={14} />
        </Button>
      </div>
    </CardContent>
  </Card>
);
