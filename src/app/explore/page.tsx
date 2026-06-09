"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getFailures, Failure } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Search, ArrowRight } from "lucide-react";

export default function ExplorePage() {
  const [failures, setFailures] = useState<Failure[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getFailures()
      .then((data) => {
        setFailures(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(`Failed to connect to backend. Error: ${err.message}`);
        setLoading(false);
      });
  }, []);

  const filteredFailures = failures.filter(f => 
    f.title.toLowerCase().includes(search.toLowerCase()) ||
    f.category.toLowerCase().includes(search.toLowerCase()) ||
    f.industry.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Explore Failures</h1>
          <p className="text-muted-foreground">Browse real-world failure cases and insights.</p>
        </div>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <input 
            type="text" 
            placeholder="Search by name, industry or category..." 
            className="w-full pl-10 pr-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background text-foreground"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {error && (
        <div className="bg-destructive/10 border border-destructive/20 text-destructive p-4 rounded-lg mb-10 text-sm">
          {error}
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-64 bg-muted animate-pulse rounded-xl border"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredFailures.map((failure) => (
            <div key={failure.id} className="group relative glass p-10 h-full flex flex-col transition-all duration-500 hover-lift rounded-[2rem] border-white/5 bg-white/[0.02] animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="flex justify-between items-start mb-8">
                <span className="text-[9px] font-black px-4 py-1.5 bg-primary/10 text-primary border border-primary/20 rounded-full uppercase tracking-[0.2em]">
                  {failure.category}
                </span>
                <span className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em] opacity-40">{failure.year}</span>
              </div>
              
              <h3 className="text-3xl font-black text-foreground mb-6 tracking-tighter group-hover:text-gradient transition-all leading-tight">
                {failure.title}
              </h3>
              
              <p className="text-muted-foreground/70 text-sm line-clamp-3 mb-10 font-medium leading-relaxed italic">
                "{failure.description}"
              </p>
              
              <div className="mt-auto pt-8 border-t border-white/5 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[8px] font-black uppercase tracking-[0.2em] text-primary/60 mb-1">Sector</span>
                  <span className="text-xs font-bold text-foreground/80 tracking-tight">{failure.industry}</span>
                </div>
                
                <Link 
                  href={`/explore/${failure.id}`} 
                  className="inline-flex items-center justify-center h-12 w-12 rounded-2xl border border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-500 shadow-lg shadow-primary/5 hover:shadow-primary/20"
                >
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && filteredFailures.length === 0 && (
        <div className="text-center py-20">
          <p className="text-muted-foreground">No failures found matching your search.</p>
        </div>
      )}
    </div>
  );
}
