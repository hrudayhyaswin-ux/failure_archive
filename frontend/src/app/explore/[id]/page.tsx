"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getFailure, Failure } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Building2, Tag, ArrowLeft, Info, FileText, CheckCircle, Zap } from "lucide-react";
import Link from "next/link";

export default function FailureDetailsPage() {
  const { id } = useParams();
  const [failure, setFailure] = useState<Failure | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getFailure(Number(id)).then((data) => {
        setFailure(data);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) return (
    <div className="container mx-auto py-40 text-center">
      <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
      </div>
      <p className="mt-4 text-muted-foreground font-medium">Decrypting Archive...</p>
    </div>
  );

  if (!failure) return <div className="container mx-auto py-20 text-center font-serif text-2xl">Archive entry not found.</div>;

  return (
    <div className="container mx-auto py-12 px-4 max-w-7xl font-mono">
      <Button variant="ghost" className="mb-10 hover:bg-primary/10 text-[10px] uppercase font-bold tracking-widest gap-2" asChild>
        <Link href="/explore">
          <ArrowLeft className="h-3 w-3" /> [ESC] RETURN TO DATABASE
        </Link>
      </Button>

      <div className="grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-12">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center gap-3 mb-6">
              <div className="px-3 py-1 bg-primary/10 border border-primary/20 text-primary text-[9px] font-bold uppercase tracking-[0.2em]">
                CASE_ID: {failure.id.toString().padStart(4, '0')}
              </div>
              <div className="px-3 py-1 bg-accent/10 border border-accent/20 text-accent text-[9px] font-bold uppercase tracking-[0.2em]">
                STATUS: ARCHIVED
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-foreground mb-8 leading-tight uppercase">
              {failure.title}
            </h1>
            <div className="flex flex-wrap gap-4 text-[10px] font-bold">
              <div className="flex items-center px-4 py-2 terminal-box">
                <Tag className="mr-2 h-3 w-3 text-primary" /> 
                <span className="text-foreground/80 uppercase tracking-widest">{failure.category}</span>
              </div>
              <div className="flex items-center px-4 py-2 terminal-box">
                <Building2 className="mr-2 h-3 w-3 text-primary" /> 
                <span className="text-foreground/80 uppercase tracking-widest">{failure.industry}</span>
              </div>
              <div className="flex items-center px-4 py-2 terminal-box">
                <Calendar className="mr-2 h-3 w-3 text-primary" /> 
                <span className="text-foreground/80 uppercase tracking-widest">{failure.year}</span>
              </div>
            </div>
          </div>

          <div className="terminal-box p-10 border-primary/20">
            <div className="flex items-center gap-3 mb-8 text-primary uppercase text-xs font-bold tracking-widest border-b border-primary/10 pb-4">
              <Info className="h-4 w-4" /> Strategic Overview
            </div>
            <p className="text-foreground/80 leading-relaxed text-lg font-light">
              {failure.description}
            </p>
          </div>

          <div className="terminal-box p-10 border-accent/20">
             <div className="flex items-center gap-3 mb-10 text-accent uppercase text-xs font-bold tracking-widest border-b border-accent/10 pb-4">
              <Calendar className="h-4 w-4" /> Failure Vectors & Timeline
            </div>
            <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-[1px] before:bg-primary/20">
              {[
                { year: failure.year - 2, title: "CAPITAL DEPLOYMENT" },
                { year: failure.year - 1, title: "MARKET FRICTION" },
                { year: failure.year, title: "TERMINAL SHUTDOWN", active: true }
              ].map((item, i) => (
                <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                  <div className={`flex items-center justify-center w-10 h-10 border ${item.active ? 'bg-destructive/20 border-destructive text-destructive' : 'bg-primary/10 border-primary text-primary'} z-10 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-transform group-hover:scale-110`}>
                    <Zap className="h-4 w-4" />
                  </div>
                  <div className={`w-[calc(100%-4rem)] md:w-[45%] p-6 terminal-box border-primary/10 group-hover:border-primary/30 transition-all ${item.active ? 'border-destructive/30' : ''}`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className={`text-xl font-bold ${item.active ? 'text-destructive' : 'text-primary'}`}>{item.year}</div>
                    </div>
                    <div className={`text-[10px] font-bold tracking-widest ${item.active ? 'text-destructive/80' : 'text-foreground/70'}`}>{item.title}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="terminal-box p-10 border-destructive/20 bg-destructive/5">
            <div className="flex items-center gap-3 mb-8 text-destructive uppercase text-xs font-bold tracking-widest border-b border-destructive/10 pb-4">
              <FileText className="h-4 w-4" /> Root Cause Identification
            </div>
            <p className="text-foreground/90 leading-relaxed text-sm font-mono opacity-80">
              {failure.failure_reason}
            </p>
          </div>

          <div className="terminal-box p-10 border-primary bg-primary/10 relative overflow-hidden group">
            <div className="absolute inset-0 grid-pattern opacity-30"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8 text-primary uppercase text-xs font-bold tracking-widest border-b border-primary/20 pb-4">
                <CheckCircle className="h-4 w-4" /> Intelligence Summary
              </div>
              <div className="text-foreground leading-relaxed text-xl italic opacity-90 font-serif">
                "{failure.lesson}"
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8 animate-in fade-in slide-in-from-right-8 duration-700 delay-300">
          <div className="terminal-box p-8 border-primary/50 bg-black/40 shadow-[0_0_30px_rgba(56,189,248,0.05)]">
            <div className="flex items-center gap-2 text-primary text-[10px] font-bold uppercase tracking-[0.3em] mb-6">
               Neural Insight
            </div>
            <p className="text-foreground/70 text-sm leading-relaxed mb-8">
              Failure vector for <span className="text-foreground font-bold">{failure.title}</span> identified as <span className="text-primary font-bold uppercase">{failure.category} instability</span>. 
            </p>
            <Button size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-none h-12 text-[10px] uppercase font-bold tracking-widest" asChild>
              <Link href="/analyzer">Initialize Analysis</Link>
            </Button>
          </div>

          <div className="terminal-box p-8">
            <div className="text-[9px] uppercase tracking-[0.3em] font-bold text-muted-foreground mb-8 border-b border-primary/10 pb-4">Market Ecosystem</div>
            <div className="space-y-8">
              <div className="group">
                <div className="text-[8px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-1">Saturation Index</div>
                <div className="text-lg font-bold text-foreground">CRITICAL LEVEL</div>
                <div className="text-[8px] text-accent font-bold uppercase mt-1">VOLATILE [{failure.year}]</div>
              </div>
              <div className="group pt-6 border-t border-primary/10">
                <div className="text-[8px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-1">Mortality Rate</div>
                <div className="text-lg font-bold text-foreground">78.4%</div>
                <div className="text-[8px] text-muted-foreground font-bold uppercase mt-1">SECTOR: {failure.industry}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
}
