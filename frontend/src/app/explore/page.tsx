"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getFailures, Failure } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function ExplorePage() {
  const [failures, setFailures] = useState<Failure[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getFailures().then((data) => {
      setFailures(data);
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
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Explore Failures</h1>
          <p className="text-slate-600">Browse real-world failure cases and insights.</p>
        </div>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
          <input 
            type="text" 
            placeholder="Search by name, industry or category..." 
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-64 bg-slate-100 animate-pulse rounded-xl border"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFailures.map((failure) => (
            <div key={failure.id} className="bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-semibold px-2 py-1 bg-slate-100 text-slate-600 rounded uppercase tracking-wider">
                    {failure.category}
                  </span>
                  <span className="text-xs text-slate-400">{failure.year}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{failure.title}</h3>
                <p className="text-slate-600 text-sm line-clamp-3 mb-6">
                  {failure.description}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <div className="text-xs text-slate-500">
                    Industry: <span className="font-medium">{failure.industry}</span>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/explore/${failure.id}`}>View Details</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && filteredFailures.length === 0 && (
        <div className="text-center py-20">
          <p className="text-slate-500">No failures found matching your search.</p>
        </div>
      )}
    </div>
  );
}
