"use client";
import React, { useState, useEffect } from "react";
import { Plus, Trash2, ExternalLink, Loader2, FileText, Upload, Calendar } from "lucide-react";
import { getAllItems, createItem, deleteItem } from "@/lib/cms-actions";
import { uploadAsset } from "@/lib/upload-action";
import { TABLES } from "@/lib/database-schema";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function NewslettersCMS() {
  const [newsletters, setNewsletters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [formData, setFormData] = useState({ title: "", date: "", description: "", link: "" });

  useEffect(() => { fetchNewsletters(); }, []);

  const fetchNewsletters = async () => {
    setLoading(true);
    const data = await getAllItems(TABLES.NEWSLETTERS);
    setNewsletters(data.sort((a, b) => (b.date > a.date ? 1 : -1)));
    setLoading(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleAdd = async (e: any) => {
    e.preventDefault();
    setSaving(true);
    try {
      let finalLink = formData.link;
      
      if (selectedFile) {
        setUploading(true);
        const uploadData = new FormData();
        uploadData.append("file", selectedFile);
        const { url } = await uploadAsset(uploadData, "newsletters");
        finalLink = url;
        setUploading(false);
      }
      
      const finalData = { ...formData, link: finalLink };
      await createItem(TABLES.NEWSLETTERS, finalData);
      setFormData({ title: "", date: "", description: "", link: "" });
      setSelectedFile(null);
      setPreviewUrl(null);
      fetchNewsletters();
    } catch (err: any) { 
       alert("Error adding newsletter: " + err.message); 
    }
    finally { setSaving(false); setUploading(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this newsletter?")) return;
    await deleteItem(TABLES.NEWSLETTERS, id);
    setNewsletters(newsletters.filter(n => n.id !== id));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl  ">Newsletters</h2>
        <p className="text-sm text-muted-foreground mt-1">Upload and manage monthly/quarterly newsletter editions</p>
      </div>

      {/* Stat row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {[
          { label: "Total Editions", value: newsletters.length },
          { label: "This Year", value: newsletters.filter(n => n.date?.includes(String(new Date().getFullYear()))).length },
          { label: "Latest Issue", value: newsletters[0]?.date || "—" },
        ].map((s, i) => (
          <Card key={i} className="border-border/50">
            <CardContent className="p-4">
              <p className="text-2xl  text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground font-medium mt-1">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* List */}
        <div className="lg:col-span-7 space-y-3">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="animate-spin text-primary" size={32} />
            </div>
          ) : newsletters.length === 0 ? (
            <Card className="border-dashed border-2 border-border/50">
              <CardContent className="py-16 flex flex-col items-center gap-3">
                <FileText size={40} className="text-muted-foreground/30" />
                <p className="text-muted-foreground ">No newsletters uploaded yet</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {newsletters.map(n => (
                <Card key={n.id} className="border-border/50 group hover:border-primary/30 hover:shadow-md transition-all duration-300">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 flex-shrink-0 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                      <FileText size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className=" text-sm text-foreground group-hover:text-primary transition-colors mb-1">{n.title}</p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="outline" className="text-[10px]  rounded-lg gap-1">
                          <Calendar size={9} /> {n.date}
                        </Badge>
                        {n.description && <p className="text-xs text-muted-foreground italic truncate max-w-[200px]">{n.description}</p>}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      {n.link && (
                        <Button render={<Link href={n.link} target="_blank" />} variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-muted-foreground hover:text-primary">
                          <ExternalLink size={14} />
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-muted-foreground hover:text-destructive" onClick={() => handleDelete(n.id)}>
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Upload Form */}
        <div className="lg:col-span-5">
          <Card className="sticky top-4 border-border/50 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="text-base  flex items-center gap-2">
                <div className="w-7 h-7 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600"><Upload size={14} /></div>
                Upload Edition
              </CardTitle>
              <CardDescription>Add a new newsletter issue to the public gallery</CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="pt-5">
              <form onSubmit={handleAdd} className="space-y-4">
                <div className="space-y-1.5">
                  <label htmlFor="edition_title" className="text-[11px]  text-muted-foreground uppercase tracking-widest">Edition Title *</label>
                  <Input id="edition_title" required placeholder="e.g. Q3 2025 Newsletter" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="rounded-xl" />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="publication-date" className="text-[11px]  text-muted-foreground uppercase tracking-widest">Publication Date *</label>
                  <Input id="publication-date" required placeholder="e.g. September 2025" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} className="rounded-xl" />
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] text-muted-foreground uppercase tracking-widest">PDF / Link *</label>
                    <button 
                      type="button"
                      onClick={() => document.getElementById("newsletter-upload")?.click()}
                      disabled={uploading}
                      className="text-[10px] text-emerald-600 hover:underline flex items-center gap-1 cursor-pointer disabled:opacity-50"
                    >
                      {uploading ? <Loader2 size={10} className="animate-spin" /> : <Upload size={10} />}
                      {uploading ? "Uploading..." : "Upload PDF"}
                    </button>
                  </div>
                  
                  {(previewUrl || formData.link) ? (
                    <div className="relative mt-2 h-32 w-full rounded-xl overflow-hidden border border-border group bg-muted/30">
                      {selectedFile?.type.includes("pdf") || formData.link?.endsWith(".pdf") ? (
                         <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground">
                            <FileText size={32} className="mb-2 text-emerald-600/50" />
                            <span className="text-[10px] break-all px-4 text-center font-medium max-w-full">
                              {selectedFile?.name || formData.link.split('/').pop() || "PDF Document"}
                            </span>
                         </div>
                      ) : (
                         <img src={previewUrl || formData.link} alt="Preview" className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" />
                      )}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setPreviewUrl(null);
                            setSelectedFile(null);
                            setFormData({ ...formData, link: "" });
                          }}
                          className="bg-red-500/90 hover:bg-red-500 text-white p-2 rounded-lg backdrop-blur-sm transition-colors text-xs flex items-center gap-2 cursor-pointer"
                        >
                          <Trash2 size={14} /> Remove File
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div 
                      onClick={() => document.getElementById("newsletter-upload")?.click()}
                      className="mt-2 h-32 w-full border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center text-muted-foreground hover:bg-muted/50 hover:border-emerald-500/30 transition-all cursor-pointer"
                    >
                      <FileText size={24} className="mb-2 opacity-30" />
                      <span className="text-xs">Click to browse file</span>
                    </div>
                  )}
                  <input 
                    id="newsletter-upload"
                    type="file" 
                    accept="application/pdf,image/*,.svg,.webp,.avif"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px]  text-muted-foreground uppercase tracking-widest">Summary (optional)</label>
                  <textarea
                    placeholder="Brief summary of content..."
                    className="flex min-h-[80px] w-full rounded-xl border border-input bg-background px-3 py-2 text-xs ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 shadow-none resize-none"
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
                <Button type="submit" disabled={saving} className="w-full rounded-xl gap-2 bg-emerald-600 hover:bg-emerald-700">
                  {saving ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                  {saving ? "Uploading..." : "Publish Newsletter"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
