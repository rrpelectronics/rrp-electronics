"use client";
import React, { useState, useEffect } from "react";
import newslettersData from "../../../data/rrp_newsletter.json";
import { Mail, Download, ExternalLink, FileText, Search } from "lucide-react";
import Link from "next/link";

const NewslettersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const newsletters = React.useMemo(() => {
    const data = [...newslettersData];
    return data.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, []);

  const filteredNewsletters = newsletters.filter((n: any) =>
    n.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    n.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-whiteBg pt-32 pb-20 px-3.5 md:px-5 lg:px-10 font-neueMontreal animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 overflow-hidden">
          <div className="space-y-4 max-w-2xl">
            <h1 className="text-heading1 text-black tracking-heading1 leading-[90%]">
              Our <span className="text-primary italic">Newsletters</span>
            </h1>
            <p className="text-bodyBase text-gray-600 leading-relaxed">
              Stay updated with the latest insights, breakthroughs, and corporate milestones from RRP Electronics. Browse our archival editions below.
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search issues..."
              className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-full outline-none focus:border-primary transition-all text-sm font-medium shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {filteredNewsletters.length === 0 ? (
          <div className="py-40 text-center space-y-4">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto text-gray-300">
              <Mail size={40} />
            </div>
            <h3 className="text-xl  text-gray-400">No newsletters found</h3>
            <button onClick={() => setSearchTerm("")} className="text-primary  hover:underline cursor-pointer">Clear search</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNewsletters.map((n, i) => (
              <div
                key={n.id}
                className="group bg-white rounded-[2rem] p-8 border border-gray-100 shadow-xl shadow-gray-200/20 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2 transition-all duration-500 flex flex-col items-start h-full"
              >
                <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  <FileText size={32} />
                </div>

                <div className="space-y-3 flex-1">
                  <p className="text-xs  text-primary uppercase tracking-[0.2em]">{n.date}</p>
                  <h3 className="text-2xl  text-gray-900 group-hover:text-primary transition-colors leading-tight">{n.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 italic">
                    {n.description || "In-depth insights into our latest electronic manufacturing advancements and strategic growth."}
                  </p>
                </div>

                <div className="w-full pt-10 mt-auto">
                  <Link
                    href={n.link}
                    target="_blank"
                    className="w-full group/btn flex items-center justify-between bg-gray-900 text-white rounded-2xl p-5 hover:bg-primary transition-all duration-300  tracking-wide"
                  >
                    <span>View Edition</span>
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center group-hover/btn:rotate-45 transition-transform">
                      <ExternalLink size={18} />
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default NewslettersPage;
