"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Newspaper,
  CalendarDays,
  Briefcase,
  Mail,
  TrendingUp,
  Plus,
  ArrowRight,
  Eye,
  Activity,
  Zap,
  Globe,
  Layers,
  Upload,
  Clock,
  CheckCircle2,
  AlertCircle,
  Edit3,
  BarChart3,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getAllItems } from "@/lib/cms-actions";
import { TABLES } from "@/lib/aws";

// ── Stat Card ──────────────────────────────────────────────────
const StatCard = ({ title, value, icon: Icon, trend, accent, href, description }) => (
  <Link href={href}>
    <Card className="group hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer border-border/50 h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
            style={{ backgroundColor: `${accent}18`, color: accent }}
          >
            <Icon size={22} />
          </div>
          <Badge
            variant="secondary"
            className="text-emerald-600 bg-emerald-50 border-0  gap-1"
          >
            <TrendingUp size={10} />
            {trend}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-4xl text-foreground leading-none er">
          {value}
        </p>
        <p className="text-sm font-medium text-muted-foreground mt-2">{title}</p>
        <p className="text-xs text-muted-foreground/60 mt-1">{description}</p>
        <div
          className="flex items-center gap-1 mt-4 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ color: accent }}
        >
          Manage <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </CardContent>
    </Card>
  </Link>
);

// ── Activity Item ──────────────────────────────────────────────
const ActivityItem = ({ icon: Icon, title, time, tag, tagColor }) => (
  <div className="flex items-start gap-3 py-3.5 group">
    <div className="mt-0.5 w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground flex-shrink-0 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
      <Icon size={14} />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium text-foreground leading-snug truncate">{title}</p>
      <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
        <Clock size={10} /> {time}
      </p>
    </div>
    <Badge variant="outline" className={`text-[10px] flex-shrink-0 ${tagColor}`}>
      {tag}
    </Badge>
  </div>
);

// ── Quick Action ───────────────────────────────────────────────
const QuickAction = ({ label, icon: Icon, href, description }) => (
  <Link href={href}>
    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer group">
      <div className="w-9 h-9 bg-background border border-border rounded-lg flex items-center justify-center text-muted-foreground group-hover:border-primary/30 group-hover:text-primary transition-colors flex-shrink-0">
        <Icon size={16} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground truncate">{description}</p>
      </div>
      <ArrowRight size={14} className="text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
    </div>
  </Link>
);

// ── Main Dashboard ─────────────────────────────────────────────
export default function AdminDashboard() {
  const [greeting, setGreeting] = useState("Good morning");
  const [dateStr, setDateStr] = useState("");
  const [newsCount, setNewsCount] = useState<number | string>("...");
  const [eventsCount, setEventsCount] = useState<number | string>("...");
  const [careersCount, setCareersCount] = useState<number | string>("...");
  const [newslettersCount, setNewslettersCount] = useState<number | string>("...");
  const [activities, setActivities] = useState<any[]>([]);
  const [activeContentCount, setActiveContentCount] = useState<number | string>("...");
  const [thisMonthCount, setThisMonthCount] = useState<number | string>("...");
  const [pagesLiveCount, setPagesLiveCount] = useState<number | string>("...");
  const [uptimeStr, setUptimeStr] = useState<string>("...");

  useEffect(() => {
    const h = new Date().getHours();
    setGreeting(h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening");
    setDateStr(
      new Date().toLocaleDateString("en-IN", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );

    const fetchData = async () => {
      try {
        const [newsRes, eventsRes, careersRes, newslettersRes] = await Promise.all([
          getAllItems(TABLES.NEWS),
          getAllItems(TABLES.EVENTS),
          getAllItems(TABLES.CAREERS),
          getAllItems(TABLES.NEWSLETTERS),
        ]);
        
        setNewsCount(newsRes.length);
        setEventsCount(eventsRes.length);
        setCareersCount(careersRes.length);
        setNewslettersCount(newslettersRes.length);

        const totalItems = newsRes.length + eventsRes.length + careersRes.length + newslettersRes.length;
        setActiveContentCount(totalItems);
        setPagesLiveCount(8 + newsRes.length + eventsRes.length);

        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        let monthCount = 0;
        const allItems = [...newsRes, ...eventsRes, ...careersRes, ...newslettersRes];
        allItems.forEach(item => {
          if (item.createdAt) {
            const d = new Date(item.createdAt);
            if (d.getMonth() === currentMonth && d.getFullYear() === currentYear) {
              monthCount++;
            }
          }
        });
        setThisMonthCount(`+${monthCount}`);
        setUptimeStr("100%");

        const formatTime = (iso: string) => {
          if (!iso) return "Recently";
          const date = new Date(iso);
          return date.toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
        };

        const allActivities = [
          ...newsRes.map((n: any) => ({ icon: Newspaper, title: `Published: ${n.title || "News Article"}`, timeISO: n.createdAt, time: formatTime(n.createdAt), tag: "News", tagColor: "text-blue-600 border-blue-200 bg-blue-50" })),
          ...eventsRes.map((e: any) => ({ icon: CalendarDays, title: `Event Added: ${e.title || "Event"}`, timeISO: e.createdAt, time: formatTime(e.createdAt), tag: "Event", tagColor: "text-purple-600 border-purple-200 bg-purple-50" })),
          ...careersRes.map((c: any) => ({ icon: Briefcase, title: `Job Posted: ${c.title || "Role"}`, timeISO: c.createdAt, time: formatTime(c.createdAt), tag: "Careers", tagColor: "text-orange-600 border-orange-200 bg-orange-50" })),
          ...newslettersRes.map((l: any) => ({ icon: Mail, title: `Newsletter Uploaded`, timeISO: l.createdAt, time: formatTime(l.createdAt), tag: "Newsletter", tagColor: "text-emerald-600 border-emerald-200 bg-emerald-50" })),
        ];

        allActivities.sort((a, b) => new Date(b.timeISO || 0).getTime() - new Date(a.timeISO || 0).getTime());
        setActivities(allActivities.slice(0, 5));
      } catch (err) {
        console.error("Admin stats fetch error", err);
        setNewsCount("Error");
        setEventsCount("Error");
        setCareersCount("Error");
        setNewslettersCount("Error");
        setActiveContentCount("Error");
        setThisMonthCount("Error");
        setPagesLiveCount("Error");
        setUptimeStr("Failed");
      }
    };
    fetchData();
  }, []);

  const stats = [
    { title: "News Articles", value: newsCount, icon: Newspaper, trend: "+12%", accent: "#3B82F6", href: "/admin/news", description: "Press releases & newsroom" },
    { title: "Active Events", value: eventsCount, icon: CalendarDays, trend: "+8%", accent: "#8B5CF6", href: "/admin/events", description: "Upcoming & past events" },
    { title: "Job Openings", value: careersCount, icon: Briefcase, trend: "+15%", accent: "#F97316", href: "/admin/careers", description: "Open roles & positions" },
    { title: "Newsletters", value: newslettersCount, icon: Mail, trend: "+5%", accent: "#10B981", href: "/admin/newsletters", description: "Quarterly & monthly editions" },
  ];

  const quickActions = [
    { label: "Publish News Article", description: "Add a headline or press release", icon: Plus, href: "/admin/news" },
    { label: "Schedule Event", description: "Upcoming or past event listing", icon: CalendarDays, href: "/admin/events" },
    { label: "Post Job Opening", description: "New role in any department", icon: Briefcase, href: "/admin/careers" },
    { label: "Upload Newsletter", description: "Add a new quarterly edition", icon: Upload, href: "/admin/newsletters" },
  ];

  const systemStatus = [
    { label: "News Articles", status: "Healthy", icon: CheckCircle2, ok: true },
    { label: "Events Sync", status: "Up to date", icon: CheckCircle2, ok: true },
    { label: "AWS DynamoDB", status: "Connected", icon: CheckCircle2, ok: true },
    { label: "S3 Media Bucket", status: "Configure key", icon: AlertCircle, ok: false },
  ];

  const kpis = [
    { label: "Pages Live", value: pagesLiveCount, icon: Globe },
    { label: "Active Content", value: activeContentCount, icon: Layers },
    { label: "This Month", value: thisMonthCount, icon: Activity },
    { label: "Uptime", value: uptimeStr, icon: Zap },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* ── Hero banner ─────────────────────────────────── */}
      <div className="relative rounded-2xl bg-gray-950 overflow-hidden p-8 md:p-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/30 via-primary/5 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <p className="text-xs  uppercase tracking-[0.25em] text-primary mb-2">
              RRP Electronics — Admin Portal
            </p>
            <h2 className="text-3xl md:text-4xl  text-white ">
              {greeting}, <span className="text-primary">Admin</span> 👋
            </h2>
            <p className="text-sm text-gray-500 mt-2 font-medium">{dateStr}</p>
          </div>

          <div className="flex gap-3 flex-wrap">
            <Link
              href="/admin/news"
              className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl text-sm  shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all"
            >
              <Plus size={16} /> Create Content
            </Link>
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-2 bg-white/10 border border-white/10 text-white px-4 py-2 rounded-xl text-sm  hover:bg-white/20 transition-all"
            >
              <Eye size={16} /> View Site
            </Link>
          </div>
        </div>

        {/* Mini KPI strip */}
        <div className="relative mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {kpis.map((k, i) => (
            <div key={i} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
              <k.icon size={14} className="text-primary flex-shrink-0" />
              <div>
                <p className="text-white  text-base leading-none">{k.value}</p>
                <p className="text-gray-500 text-[10px]  uppercase tracking-widest mt-0.5">{k.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Stat cards ──────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s, i) => <StatCard key={i} {...s} />)}
      </div>

      {/* ── Bottom 2-column layout ──────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Activity Feed */}
        <Card className="lg:col-span-7 border-border/50">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base  flex items-center gap-2">
                <Activity size={16} className="text-primary" />
                Recent Activity
              </CardTitle>
              <Badge variant="outline" className="text-[10px]  text-muted-foreground">
                Last 7 days
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="divide-y divide-border/50">
              {activities.length > 0 ? activities.map((a, i) => <ActivityItem key={i} {...a} />) : <div className="p-6 text-center text-sm text-muted-foreground">No recent activity</div>}
            </div>
          </CardContent>
        </Card>

        {/* Right column */}
        <div className="lg:col-span-5 space-y-4">
          {/* Quick Actions */}
          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-base  flex items-center gap-2">
                <Zap size={16} className="text-orange-500" />
                Quick Actions
              </CardTitle>
              <CardDescription>Jump directly into content creation</CardDescription>
            </CardHeader>
            <CardContent className="pt-0 space-y-1">
              {quickActions.map((a, i) => <QuickAction key={i} {...a} />)}
            </CardContent>
          </Card>

          {/* System Health */}
          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-base  flex items-center gap-2">
                <BarChart3 size={16} className="text-green-500" />
                System Status
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-2">
              {systemStatus.map((s, i) => (
                <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                  <span className="text-sm  text-foreground">{s.label}</span>
                  <div className={`flex items-center gap-1.5 text-xs  ${s.ok ? "text-green-600" : "text-amber-500"}`}>
                    <s.icon size={13} />
                    {s.status}
                  </div>
                </div>
              ))}
              <Separator className="my-2" />
              <p className="text-[10px] text-center text-muted-foreground/60 font-medium uppercase tracking-widest">
                Add AWS keys in .env.local to activate live sync
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
