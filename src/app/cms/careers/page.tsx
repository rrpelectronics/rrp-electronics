"use client";
import React, { useState } from "react";
import { Plus, MapPin, Users, Briefcase, Loader2 } from "lucide-react";
import { TABLES } from "@/lib/database-schema";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { CMSHeader } from "@/components/cms/shared/CMSHeader";
import { CMSStatGrid } from "@/components/cms/shared/CMSStatGrid";
import { CMSItemCard } from "@/components/cms/shared/CMSItemCard";
import { useCMSManager } from "@/hooks/useCMSManager";

const typeColors = {
  "Full-time": "bg-green-50 text-green-700 border-green-200",
  "Part-time": "bg-blue-50 text-blue-700 border-blue-200",
  "Contract": "bg-purple-50 text-purple-700 border-blue-200",
  "Internship": "bg-orange-50 text-orange-700 border-orange-200",
};

export default function CareersCMS() {
  const {
     items: jobs,
     loading,
     saving,
     isAdding,
     setIsAdding,
     refresh: fetchJobs,
     add,
     remove
  } = useCMSManager(TABLES.CAREERS);

  const [formData, setFormData] = useState({ title: "", location: "Mumbai, India", type: "Full-time", link: "", department: "Engineering", description: "" });

  const handleAdd = async (e: any) => {
    e.preventDefault();
    await add(formData);
    setFormData({ title: "", location: "Mumbai, India", type: "Full-time", link: "", department: "Engineering", description: "" });
  };

  const handleDelete = (id: string) => {
     remove(id, "Remove this job posting?");
  };

  const stats = [
    { label: "Total Openings", value: jobs.length, icon: Briefcase, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Full-Time", value: jobs.filter(j => j.type === "Full-time").length, icon: Users, color: "text-green-600", bg: "bg-green-50" },
    { label: "Departments", value: [...new Set(jobs.map(j => j.department))].length, icon: MapPin, color: "text-purple-600", bg: "bg-purple-50" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <CMSHeader 
        title="Career Postings" 
        subtitle="Manage open roles and job listings for RRP Electronics" 
        onAdd={() => setIsAdding(true)} 
        buttonText="Add Role" 
      />

      <CMSStatGrid stats={stats} />

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
                <Button variant="outline" size="sm" onClick={() => setIsAdding(true)} className="rounded-xl gap-1.5">
                  <Plus size={14} /> Add first role
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {jobs.map(job => (
                <CMSItemCard 
                  key={job.id} 
                  item={{
                    ...job,
                    date: job.type,
                    source: job.department
                  }} 
                  icon={Briefcase}
                  onDelete={handleDelete} 
                />
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
