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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFailures.map((failure) => (
            <div key={failure.id} className="group relative glass rounded-[2rem] border-none overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:bg-white animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12 group-hover:bg-primary/10 transition-colors"></div>
              
              <div className="p-8 h-full flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <span className="text-[10px] font-black px-3 py-1 bg-primary/10 text-primary rounded-full uppercase tracking-[0.2em] border border-primary/5">
                    {failure.category}
                  </span>
                  <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">{failure.year}</span>
                </div>
                
                <h3 className="text-3xl font-serif font-bold text-foreground mb-4 group-hover:text-primary transition-colors leading-tight">
                  {failure.title}
                </h3>
                
                <p className="text-muted-foreground text-base line-clamp-3 mb-8 font-light leading-relaxed">
                  {failure.description}
                </p>
                
                <div className="mt-auto pt-6 border-t border-border/50 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground">Sector</span>
                    <span className="text-xs font-bold text-foreground/80">{failure.industry}</span>
                  </div>
                  
                  <Link 
                    href={`/explore/${failure.id}`} 
                    className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-foreground text-background group-hover:bg-primary group-hover:scale-110 transition-all duration-300 shadow-lg"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
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
