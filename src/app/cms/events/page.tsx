"use client";
import React, { useState, useEffect } from "react";
import { Plus, Trash2, ExternalLink, Calendar, Globe, Edit2, Loader2, ImageIcon, MapPin, Upload } from "lucide-react";
import { getAllItems, createItem, deleteItem, updateItem } from "@/lib/cms-actions";
import { uploadAsset } from "@/lib/upload-action";
import { TABLES } from "@/lib/database-schema";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function EventsCMS() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [tab, setTab] = useState("all");
  const [formData, setFormData] = useState({ title: "", date: "", source: "RRP Events", link: "", thumbnail: "", banner: "", gallery: [] as string[], eventType: "upcoming", description: "" });
  const [uploading, setUploading] = useState(false);
  
  const [selectedThumbnail, setSelectedThumbnail] = useState<File | null>(null);
  const [previewThumbnail, setPreviewThumbnail] = useState<string | null>(null);

  const [selectedBanner, setSelectedBanner] = useState<File | null>(null);
  const [previewBanner, setPreviewBanner] = useState<string | null>(null);

  const [selectedGalleryFiles, setSelectedGalleryFiles] = useState<File[]>([]);
  const [previewGallery, setPreviewGallery] = useState<string[]>([]);

  useEffect(() => { fetchEvents(); }, []);

  const fetchEvents = async () => {
    setLoading(true);
    const data = await getAllItems(TABLES.EVENTS);
    setEvents(data);
    setLoading(false);
  };

  const handleThumbnailChange = (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedThumbnail(file);
    setPreviewThumbnail(URL.createObjectURL(file));
  };
  
  const handleBannerChange = (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedBanner(file);
    setPreviewBanner(URL.createObjectURL(file));
  };

  const handleGalleryChange = (e: any) => {
    const files = Array.from(e.target.files || []) as File[];
    if (!files.length) return;
    
    const currentTotal = (formData.gallery?.length || 0) + selectedGalleryFiles.length;
    const allowed = 8 - currentTotal;
    const toAdd = files.slice(0, Math.max(0, allowed));
    
    if (files.length > allowed) {
       alert(`You can only add ${allowed} more gallery images (Max 8 total)`);
    }

    setSelectedGalleryFiles([...selectedGalleryFiles, ...toAdd]);
    setPreviewGallery([...previewGallery, ...toAdd.map(f => URL.createObjectURL(f))]);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSaving(true);
    try {
      let finalThumbnail = formData.thumbnail;
      let finalBanner = formData.banner;
      let finalGallery = [...(formData.gallery || [])];

      setUploading(true);

      if (selectedThumbnail) {
        const uploadData = new FormData();
        uploadData.append("file", selectedThumbnail);
        const { url } = await uploadAsset(uploadData, "events");
        finalThumbnail = url;
      }
      if (selectedBanner) {
        const uploadData = new FormData();
        uploadData.append("file", selectedBanner);
        const { url } = await uploadAsset(uploadData, "events");
        finalBanner = url;
      }
      if (selectedGalleryFiles.length > 0) {
        for (const file of selectedGalleryFiles) {
          const uploadData = new FormData();
          uploadData.append("file", file);
          const { url } = await uploadAsset(uploadData, "events");
          finalGallery.push(url);
        }
      }
      
      const finalData = { ...formData, thumbnail: finalThumbnail, banner: finalBanner, gallery: finalGallery, newsEventImg: finalThumbnail };

      if (editingId) {
        await updateItem(TABLES.EVENTS, editingId, finalData);
      } else {
        await createItem(TABLES.EVENTS, finalData);
      }
      resetForm();
      fetchEvents();
    } catch (err: any) { 
        alert("Error saving event: " + err.message); 
    }
    finally { setSaving(false); setUploading(false); }
  };

  const resetForm = () => {
    setFormData({ title: "", date: "", source: "RRP Events", link: "", thumbnail: "", banner: "", gallery: [], eventType: "upcoming", description: "" });
    setSelectedThumbnail(null);
    setPreviewThumbnail(null);
    setSelectedBanner(null);
    setPreviewBanner(null);
    setSelectedGalleryFiles([]);
    setPreviewGallery([]);
    setIsAdding(false);
    setEditingId(null);
  };

  const handleEdit = (ev: any) => {
    // legacy support for newsEventImg if thumbnail isn't explicitly set from previous local iterations
    const thumb = ev.thumbnail || ev.newsEventImg || "";
    setFormData({ 
      title: ev.title || "", 
      date: ev.date || "", 
      source: ev.source || "", 
      link: ev.link || "", 
      thumbnail: thumb, 
      banner: ev.banner || ev.newsEventBanner || "",
      gallery: ev.gallery || [], 
      eventType: ev.eventType || "upcoming",
      description: ev.description || ""
    });
    setEditingId(ev.id);
    setIsAdding(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this event?")) return;
    await deleteItem(TABLES.EVENTS, id);
    setEvents(events.filter(e => e.id !== id));
  };

  const filtered = tab === "all" ? events : events.filter(e => e.eventType === tab);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl  ">Events</h2>
          <p className="text-sm text-muted-foreground mt-1">Coordinate upcoming and past corporate events</p>
        </div>
        {!isAdding && (
          <Button onClick={() => setIsAdding(true)} className="gap-2 rounded-xl shadow-lg shadow-primary/20">
            <Plus size={16} /> Add Event
          </Button>
        )}
      </div>

      {/* Tab filter */}
      <div className="flex gap-2 p-1 bg-muted rounded-xl w-fit">
        {["all", "upcoming", "past"].map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-lg text-xs  uppercase tracking-widest transition-all cursor-pointer ${tab === t ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Event List */}
        <div className={`${isAdding ? "lg:col-span-7" : "lg:col-span-12"} space-y-3`}>
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="animate-spin text-primary" size={32} />
            </div>
          ) : filtered.length === 0 ? (
            <Card className="border-dashed border-2 border-border/50">
              <CardContent className="py-16 flex flex-col items-center gap-3">
                <Calendar size={40} className="text-muted-foreground/30" />
                <p className="text-muted-foreground ">No events found</p>
                <Button variant="outline" size="sm" onClick={() => setIsAdding(true)} className="rounded-xl gap-1.5">
                  <Plus size={14} /> Add first event
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className={`grid grid-cols-1 ${!isAdding ? "md:grid-cols-2 xl:grid-cols-3" : ""} gap-4`}>
              {filtered.map(ev => (
                <Card key={ev.id} className="border-border/50 group hover:border-primary/30 hover:shadow-md transition-all duration-300 overflow-hidden">
                  <div className="relative h-36 bg-muted">
                    {(ev.thumbnail || ev.newsEventImg) ? (
                      <img src={ev.thumbnail || ev.newsEventImg} alt="" className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-700" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground/30">
                        <ImageIcon size={32} />
                      </div>
                    )}
                    <div className="absolute top-3 left-3">
                      <Badge className={ev.eventType === "upcoming" ? "bg-green-500 hover:bg-green-500 text-white border-0" : "bg-secondary text-secondary-foreground"}>
                        {ev.eventType}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <p className=" text-sm text-foreground group-hover:text-primary transition-colors leading-snug mb-2">{ev.title}</p>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground flex items-center gap-1.5"><Calendar size={11} className="text-primary" /> {ev.date}</p>
                      {ev.source && <p className="text-xs text-muted-foreground flex items-center gap-1.5"><Globe size={11} className="text-primary/50" /> {ev.source}</p>}
                    </div>
                    <Separator className="my-3" />
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm" className="gap-1.5 h-7 text-xs rounded-lg flex-1" onClick={() => handleEdit(ev)}>
                        <Edit2 size={12} /> Edit
                      </Button>
                      {ev.link && (
                        <Button render={<Link href={ev.link} target="_blank" />} variant="ghost" size="icon" className="h-7 w-7 rounded-lg text-muted-foreground hover:text-primary">
                          <ExternalLink size={12} />
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg text-muted-foreground hover:text-destructive" onClick={() => handleDelete(ev.id)}>
                        <Trash2 size={12} />
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
          <div className="lg:col-span-5 animate-in slide-in-from-right-4 duration-300">
            <Card className="sticky top-4 border-border/50 shadow-xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-base  flex items-center gap-2">
                  <div className="w-7 h-7 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                    {editingId ? <Edit2 size={14} /> : <Plus size={14} />}
                  </div>
                  {editingId ? "Edit Event" : "New Event"}
                </CardTitle>
                <CardDescription>{editingId ? "Modify existing event details" : "Schedule a new event"}</CardDescription>
              </CardHeader>
              <Separator />
              <CardContent className="pt-5">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px]  text-muted-foreground uppercase tracking-widest">Event Title *</label>
                    <Input required placeholder="Event title..." value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="rounded-xl" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-[11px]  text-muted-foreground uppercase tracking-widest">Date</label>
                      <Input placeholder="e.g. October 15, 2025" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} className="rounded-xl" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px]  text-muted-foreground uppercase tracking-widest">Status</label>
                      <select className="flex h-9 w-full rounded-xl border border-input bg-background px-3 text-xs ring-offset-background outline-none focus:ring-0 shadow-none" value={formData.eventType} onChange={e => setFormData({ ...formData, eventType: e.target.value })}>
                        <option value="upcoming">Upcoming</option>
                        <option value="past">Past Event</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {/* THUMBNAIL */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-[11px] text-muted-foreground uppercase tracking-widest">Thumbnail (1:1/4:3)</label>
                      </div>
                      {(previewThumbnail || formData.thumbnail) ? (
                        <div className="relative mt-2 h-32 w-full rounded-xl overflow-hidden border border-border group bg-muted/30">
                          <img src={previewThumbnail || formData.thumbnail} alt="Preview" className="w-full h-full object-contain p-2 group-hover:scale-105 transition-all duration-500" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                            <button type="button" onClick={() => { setPreviewThumbnail(null); setSelectedThumbnail(null); setFormData(f => ({...f, thumbnail: ""})); }} className="bg-red-500/90 hover:bg-red-500 text-white p-2 rounded-lg backdrop-blur-sm transition-colors text-xs flex items-center gap-2 cursor-pointer">
                              <Trash2 size={14} /> Remove
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div onClick={() => document.getElementById("thumb-upload")?.click()} className="mt-2 h-32 w-full border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center text-muted-foreground hover:bg-muted/50 hover:border-primary/30 transition-all cursor-pointer">
                          <ImageIcon size={24} className="mb-2 opacity-30" />
                          <span className="text-xs">Browse Thumbnail</span>
                        </div>
                      )}
                      <input id="thumb-upload" type="file" accept="image/*,.svg,.webp,.avif" className="hidden" onChange={handleThumbnailChange} />
                    </div>

                    {/* BANNER */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-[11px] text-muted-foreground uppercase tracking-widest">Banner (16:9)</label>
                      </div>
                      {(previewBanner || formData.banner) ? (
                        <div className="relative mt-2 h-24 w-full rounded-xl overflow-hidden border border-border group bg-muted/30">
                          <img src={previewBanner || formData.banner} alt="Preview" className="w-full h-full object-contain p-1 group-hover:scale-105 transition-all duration-500" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                            <button type="button" onClick={() => { setPreviewBanner(null); setSelectedBanner(null); setFormData(f => ({...f, banner: ""})); }} className="bg-red-500/90 text-white p-2 rounded-lg text-xs flex items-center gap-2 cursor-pointer">
                              <Trash2 size={14} /> Remove
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div onClick={() => document.getElementById("banner-upload")?.click()} className="mt-2 h-24 w-full border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center text-muted-foreground hover:bg-muted/50 transition-all cursor-pointer">
                          <ImageIcon size={20} className="mb-2 opacity-30" />
                          <span className="text-[10px]">Browse Banner</span>
                        </div>
                      )}
                      <input id="banner-upload" type="file" accept="image/*,.svg,.webp,.avif" className="hidden" onChange={handleBannerChange} />
                    </div>

                    {/* GALLERY */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between pb-1">
                        <label className="text-[11px] text-muted-foreground uppercase tracking-widest">Gallery (Max 8)</label>
                        <span className="text-[10px] text-muted-foreground font-medium">
                          {((formData.gallery?.length || 0) + selectedGalleryFiles.length)}/8
                        </span>
                      </div>
                      <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                        {/* Existing Imgs */}
                        {(formData.gallery || []).map((img, i) => (
                          <div key={`exist-${i}`} className="relative aspect-square rounded-lg overflow-hidden border border-border group bg-muted/30">
                            <img src={img} className="w-full h-full object-contain p-1" alt="" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                                <button type="button" onClick={() => {
                                  const nx = [...formData.gallery];
                                  nx.splice(i,1);
                                  setFormData(f => ({...f, gallery: nx}));
                                }} className="text-white hover:text-red-400 cursor-pointer p-1">
                                  <Trash2 size={14} />
                                </button>
                            </div>
                          </div>
                        ))}
                        {/* New Previews */}
                        {previewGallery.map((img, i) => (
                          <div key={`new-${i}`} className="relative aspect-square rounded-lg overflow-hidden border border-border group bg-muted/30">
                            <img src={img} className="w-full h-full object-contain p-1" alt="" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                                <button type="button" onClick={() => {
                                  const nxFiles = [...selectedGalleryFiles];
                                  const nxPrev = [...previewGallery];
                                  nxFiles.splice(i,1);
                                  nxPrev.splice(i,1);
                                  setSelectedGalleryFiles(nxFiles);
                                  setPreviewGallery(nxPrev);
                                }} className="text-white hover:text-red-400 cursor-pointer p-1">
                                  <Trash2 size={14} />
                                </button>
                            </div>
                          </div>
                        ))}
                        {/* Add Button */}
                        {((formData.gallery?.length || 0) + selectedGalleryFiles.length) < 8 && (
                          <div onClick={() => document.getElementById("gallery-upload")?.click()} className="aspect-square border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center text-muted-foreground hover:bg-muted/50 hover:border-primary/30 transition-all cursor-pointer">
                            <Plus size={16} className="opacity-50" />
                          </div>
                        )}
                      </div>
                      <input id="gallery-upload" type="file" multiple accept="image/*,.svg,.webp,.avif" className="hidden" onChange={handleGalleryChange} />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px]  text-muted-foreground uppercase tracking-widest">Organizer</label>
                    <Input placeholder="e.g. Corporate Relations" value={formData.source} onChange={e => setFormData({ ...formData, source: e.target.value })} className="rounded-xl" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] text-muted-foreground uppercase tracking-widest flex items-center justify-between">
                      <span>Event Description</span>
                      <span className="text-[9px] opacity-60 normal-case tracking-normal">(Supports Markdown like **bold**, _italic_, - lists)</span>
                    </label>
                    <textarea
                      placeholder="Write event description here...&#10;Use markdown to format text."
                      className="flex min-h-[140px] w-full rounded-xl border border-input bg-background px-3 py-2 text-xs ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 shadow-none resize-y"
                      value={formData.description}
                      onChange={e => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button type="submit" disabled={saving} className="flex-1 rounded-xl gap-2">
                      {saving ? <Loader2 size={14} className="animate-spin" /> : (editingId ? <Edit2 size={14} /> : <Plus size={14} />)}
                      {saving ? "Saving..." : (editingId ? "Update" : "Publish")}
                    </Button>
                    <Button type="button" variant="outline" onClick={resetForm} className="rounded-xl">Cancel</Button>
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
