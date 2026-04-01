"use client";
import React, { useState, useEffect } from "react";
import { Plus, Trash2, ExternalLink, Loader2, MapPin, Users, Briefcase } from "lucide-react";
import { getAllItems, createItem, deleteItem } from "@/lib/cms-actions";
import { TABLES } from "@/lib/aws";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const typeColors = {
  "Full-time": "bg-green-50 text-green-700 border-green-200",
  "Part-time": "bg-blue-50 text-blue-700 border-blue-200",
  "Contract": "bg-purple-50 text-purple-700 border-purple-200",
  "Internship": "bg-orange-50 text-orange-700 border-orange-200",
};

export default function CareersCMS() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({ title: "", location: "Mumbai, India", type: "Full-time", link: "", department: "Engineering", description: "" });

  useEffect(() => { fetchJobs(); }, []);

  const fetchJobs = async () => {
    setLoading(true);
    const data = await getAllItems(TABLES.CAREERS);
    setJobs(data);
    setLoading(false);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await createItem(TABLES.CAREERS, formData);
      setFormData({ title: "", location: "Mumbai, India", type: "Full-time", link: "", department: "Engineering", description: "" });
      fetchJobs();
    } catch { alert("Error adding job"); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm("Remove this job posting?")) return;
    await deleteItem(TABLES.CAREERS, id);
    setJobs(jobs.filter(j => j.id !== id));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl  ">Career Postings</h2>
        <p className="text-sm text-muted-foreground mt-1">Manage open roles and job listings for RRP Electronics</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {[
          { label: "Total Openings", value: jobs.length },
          { label: "Full-Time", value: jobs.filter(j => j.type === "Full-time").length },
          { label: "Departments", value: [...new Set(jobs.map(j => j.department))].length },
        ].map((s, i) => (
          <Card key={i} className="border-border/50">
            <CardContent className="p-4">
              <p className="text-3xl  text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground font-medium mt-1">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Job List */}
        <div className="lg:col-span-7 space-y-3">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="animate-spin text-primary" size={32} />
            </div>
          ) : jobs.length === 0 ? (
            <Card className="border-dashed border-2 border-border/50">
              <CardContent className="py-16 flex flex-col items-center gap-3">
                <Briefcase size={40} className="text-muted-foreground/30" />
                <p className="text-muted-foreground ">No active job postings</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {jobs.map(job => (
                <Card key={job.id} className="border-border/50 group hover:border-primary/30 hover:shadow-md transition-all duration-300">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center text-muted-foreground flex-shrink-0 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                      <Briefcase size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1.5">
                        <p className=" text-sm text-foreground group-hover:text-primary transition-colors">{job.title}</p>
                        <Badge variant="outline" className={`text-[10px]  rounded-lg ${typeColors[job.type] || ""}`}>
                          {job.type}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><MapPin size={10} /> {job.location}</span>
                        <span className="flex items-center gap-1"><Users size={10} /> {job.department}</span>
                      </div>
                      {job.description && <p className="text-xs text-muted-foreground mt-1.5 line-clamp-1 italic">{job.description}</p>}
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      {job.link && (
                        <Link href={job.link} target="_blank" className="inline-flex h-8 w-8 items-center justify-center rounded-lg hover:bg-muted text-muted-foreground hover:text-primary transition-colors">
                          <ExternalLink size={14} />
                        </Link>
                      )}
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-muted-foreground hover:text-destructive" onClick={() => handleDelete(job.id)}>
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Create Form */}
        <div className="lg:col-span-5">
          <Card className="sticky top-4 border-border/50 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="text-base  flex items-center gap-2">
                <div className="w-7 h-7 bg-primary/10 rounded-lg flex items-center justify-center text-primary"><Plus size={14} /></div>
                Post a Role
              </CardTitle>
              <CardDescription>Create a new job opening for the careers page</CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="pt-5">
              <form onSubmit={handleAdd} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[11px]  text-muted-foreground uppercase tracking-widest">Job Title *</label>
                  <Input required placeholder="e.g. Senior Backend Engineer" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="rounded-xl" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-[11px]  text-muted-foreground uppercase tracking-widest">Location</label>
                    <Input placeholder="Mumbai, India" value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} className="rounded-xl" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px]  text-muted-foreground uppercase tracking-widest">Type</label>
                    <select className="flex h-9 w-full rounded-xl border border-input bg-background px-3 text-xs ring-offset-background outline-none focus:ring-0 shadow-none" value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })}>
                      <option>Full-time</option>
                      <option>Part-time</option>
                      <option>Contract</option>
                      <option>Internship</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px]  text-muted-foreground uppercase tracking-widest">Department</label>
                  <Input placeholder="e.g. Engineering" value={formData.department} onChange={e => setFormData({ ...formData, department: e.target.value })} className="rounded-xl" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px]  text-muted-foreground uppercase tracking-widest">Application URL</label>
                  <Input type="url" placeholder="https://..." value={formData.link} onChange={e => setFormData({ ...formData, link: e.target.value })} className="rounded-xl" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px]  text-muted-foreground uppercase tracking-widest">Role Summary</label>
                  <textarea
                    placeholder="Brief description of the role..."
                    className="flex min-h-[80px] w-full rounded-xl border border-input bg-background px-3 py-2 text-xs ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 shadow-none resize-none"
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
                <Button type="submit" disabled={saving} className="w-full rounded-xl gap-2">
                  {saving ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
                  {saving ? "Posting..." : "Post Job"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
