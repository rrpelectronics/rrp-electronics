"use client";
import React, { useState, useEffect } from "react";
import { Plus, Search, Trash2, ExternalLink, Globe, Edit2, Loader2, Newspaper, BarChart2, ImageIcon } from "lucide-react";
import { getAllItems, createItem, deleteItem } from "@/lib/cms-actions";
import { uploadAsset } from "@/lib/upload-action";
import { TABLES } from "@/lib/aws";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function NewsCMS() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({ title: "", date: "", source: "", link: "", newsEventImg: "" });
  const [selectedThumbnail, setSelectedThumbnail] = useState<File | null>(null);
  const [previewThumbnail, setPreviewThumbnail] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => { fetchNews(); }, []);

  const fetchNews = async () => {
    setLoading(true);
    const data = await getAllItems(TABLES.NEWS);
    setNews(data);
    setLoading(false);
  };

  const handleThumbnailChange = (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedThumbnail(file);
    setPreviewThumbnail(URL.createObjectURL(file));
  };

  const handleAdd = async (e: any) => {
    e.preventDefault();
    setSaving(true);
    try {
      let finalImg = formData.newsEventImg;
      if (selectedThumbnail) {
        setUploading(true);
        const uploadData = new FormData();
        uploadData.append("file", selectedThumbnail);
        const { url } = await uploadAsset(uploadData, "news");
        finalImg = url;
        setUploading(false);
      }
      await createItem(TABLES.NEWS, { ...formData, newsEventImg: finalImg });
      setFormData({ title: "", date: "", source: "", link: "", newsEventImg: "" });
      setSelectedThumbnail(null);
      setPreviewThumbnail(null);
      setIsAdding(false);
      fetchNews();
    } catch { alert("Error saving news"); }
    finally { setSaving(false); setUploading(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this article?")) return;
    await deleteItem(TABLES.NEWS, id);
    setNews(news.filter(n => n.id !== id));
  };

  const filtered = news.filter(n => n.title?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl ">News Articles</h2>
          <p className="text-sm text-muted-foreground mt-1">Manage press releases and newsroom content</p>
        </div>
        <Button onClick={() => setIsAdding(true)} className="gap-2 rounded-xl shadow-lg shadow-primary/20">
          <Plus size={16} /> Add Article
        </Button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {[
          { label: "Total Articles", value: news.length, icon: Newspaper, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "This Month", value: news.filter(n => n.date?.includes(new Date().getFullYear())).length, icon: BarChart2, color: "text-purple-600", bg: "bg-purple-50" },
          { label: "Sources", value: [...new Set(news.map(n => n.source))].length, icon: Globe, color: "text-emerald-600", bg: "bg-emerald-50" },
        ].map((s, i) => (
          <Card key={i} className="border-border/50">
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`w-9 h-9 ${s.bg} rounded-xl flex items-center justify-center ${s.color} flex-shrink-0`}>
                <s.icon size={18} />
              </div>
              <div>
                <p className="text-2xl leading-none">{s.value}</p>
                <p className="text-xs text-muted-foreground font-medium mt-0.5">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Article List */}
        <div className="lg:col-span-8 space-y-4">
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search articles..."
              className="pl-9 rounded-xl bg-background"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="animate-spin text-primary" size={32} />
            </div>
          ) : filtered.length === 0 ? (
            <Card className="border-dashed border-2 border-border/50">
              <CardContent className="py-16 flex flex-col items-center gap-3">
                <Newspaper size={40} className="text-muted-foreground/30" />
                <p className="text-muted-foreground ">No articles found</p>
                <Button variant="outline" size="sm" onClick={() => setIsAdding(true)} className="rounded-xl gap-1.5">
                  <Plus size={14} /> Add first article
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {filtered.map(item => (
                <Card key={item.id} className="border-border/50 group hover:border-primary/30 hover:shadow-md transition-all duration-300">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-muted flex-shrink-0 border border-border/50">
                      {item.newsEventImg ? (
                        <img src={item.newsEventImg} alt="" className="w-full h-full object-contain p-1" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          <Newspaper size={20} />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-foreground truncate group-hover:text-primary transition-colors text-sm">{item.title}</p>
                      <div className="flex items-center gap-3 mt-1.5">
                        <Badge variant="outline" className="text-[10px] rounded-lg ">{item.date}</Badge>
                        {item.source && <span className="text-xs text-muted-foreground font-medium flex items-center gap-1"><Globe size={10} /> {item.source}</span>}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      {item.link && (
                        <Button render={<Link href={item.link} target="_blank" />} variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-muted-foreground hover:text-primary">
                          <ExternalLink size={14} />
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-muted-foreground hover:text-destructive" onClick={() => handleDelete(item.id)}>
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Side Form */}
        {isAdding && (
          <div className="lg:col-span-4">
            <Card className="sticky top-4 border-border/50 shadow-xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-base flex items-center gap-2">
                  <div className="w-7 h-7 bg-primary/10 rounded-lg flex items-center justify-center text-primary"><Plus size={14} /></div>
                  New Article
                </CardTitle>
                <CardDescription>Fill in the details to publish a news piece</CardDescription>
              </CardHeader>
              <Separator />
              <CardContent className="pt-5">
                <form onSubmit={handleAdd} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] text-muted-foreground uppercase tracking-[0.1em]">Headline *</label>
                    <Input required placeholder="Article headline..." value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="rounded-xl" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-[11px] text-muted-foreground uppercase tracking-[0.1em]">Date *</label>
                      <Input required placeholder="e.g. March 2024" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} className="rounded-xl" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] text-muted-foreground uppercase tracking-[0.1em]">Source</label>
                      <Input placeholder="e.g. ET" value={formData.source} onChange={e => setFormData({ ...formData, source: e.target.value })} className="rounded-xl" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] text-muted-foreground uppercase tracking-[0.1em]">Article URL</label>
                    <Input type="url" placeholder="https://..." value={formData.link} onChange={e => setFormData({ ...formData, link: e.target.value })} className="rounded-xl" />
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] text-muted-foreground uppercase tracking-[0.1em]">Thumbnail</label>
                    </div>
                    {(previewThumbnail || formData.newsEventImg) ? (
                      <div className="relative mt-2 h-32 w-full rounded-xl overflow-hidden border border-border group bg-muted/30">
                        <img src={previewThumbnail || formData.newsEventImg} alt="Preview" className="w-full h-full object-contain p-2 group-hover:scale-105 transition-all duration-500" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                          <button type="button" onClick={() => { setPreviewThumbnail(null); setSelectedThumbnail(null); setFormData(f => ({...f, newsEventImg: ""})); }} className="bg-red-500/90 text-white p-2 text-xs flex items-center gap-2 cursor-pointer rounded-lg">
                            <Trash2 size={14} /> Remove
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div onClick={() => document.getElementById("thumb-upload")?.click()} className="mt-2 h-32 w-full border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center text-muted-foreground hover:bg-muted/50 transition-all cursor-pointer">
                        <ImageIcon size={24} className="mb-2 opacity-30" />
                        <span className="text-xs">Browse Image</span>
                      </div>
                    )}
                    <input id="thumb-upload" type="file" accept="image/*,.svg,.webp,.avif" className="hidden" onChange={handleThumbnailChange} />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button type="submit" disabled={saving || uploading} className="flex-1 rounded-xl gap-2">
                      {(saving || uploading) ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
                      {(saving || uploading) ? "Saving..." : "Publish"}
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setIsAdding(false)} className="rounded-xl">Cancel</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
