"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getFailure, Failure } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Calendar, Building2, Tag, ArrowLeft, Info, Zap, Activity, ShieldAlert, Brain, ChevronRight } from "lucide-react";
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
    <div className="container mx-auto py-12 px-4 max-w-7xl font-sans relative">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-[120px] -z-10" />

      <Button variant="ghost" className="mb-12 hover:bg-primary/10 text-[10px] uppercase font-black tracking-widest gap-3 rounded-full px-6 transition-all" asChild>
        <Link href="/explore">
          <ArrowLeft className="h-4 w-4" /> [ESC] Return to Database
        </Link>
      </Button>

      <div className="grid lg:grid-cols-12 gap-16">
        <div className="lg:col-span-8 space-y-16">
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="flex items-center gap-4 mb-8">
              <div className="px-4 py-1.5 bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.3em] rounded-full">
                CASE: #{failure.id.toString().padStart(4, '0')}
              </div>
              <div className="px-4 py-1.5 bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-[0.3em] rounded-full">
                Archive Status: SECURE
              </div>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-foreground mb-10 leading-[0.9] uppercase">
              {failure.title}
            </h1>
            <div className="flex flex-wrap gap-4 text-[10px] font-black">
              <div className="flex items-center px-6 py-2.5 glass rounded-2xl hover-lift">
                <Tag className="mr-3 h-4 w-4 text-primary" /> 
                <span className="text-foreground uppercase tracking-widest">{failure.category}</span>
              </div>
              <div className="flex items-center px-6 py-2.5 glass rounded-2xl hover-lift">
                <Building2 className="mr-3 h-4 w-4 text-primary" /> 
                <span className="text-foreground uppercase tracking-widest">{failure.industry}</span>
              </div>
              <div className="flex items-center px-6 py-2.5 glass rounded-2xl hover-lift">
                <Calendar className="mr-3 h-4 w-4 text-primary" /> 
                <span className="text-foreground uppercase tracking-widest">{failure.year}</span>
              </div>
            </div>
          </div>

          <div className="glass p-12 rounded-[3rem] border-primary/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-12 opacity-5">
              <Info className="h-40 w-40 text-primary" />
            </div>
            <div className="flex items-center gap-4 mb-10 text-primary uppercase text-xs font-black tracking-[0.4em] border-b border-primary/10 pb-6">
              <Info className="h-5 w-5" /> Forensic Overview
            </div>
            <p className="text-foreground/90 leading-relaxed text-xl font-medium">
              {failure.description}
            </p>
          </div>

          <div className="glass p-12 rounded-[3rem] border-accent/20">
             <div className="flex items-center gap-4 mb-12 text-accent uppercase text-xs font-black tracking-[0.4em] border-b border-accent/10 pb-6">
              <Activity className="h-5 w-5" /> Failure Vectors & Timeline
            </div>
            <div className="space-y-16 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-[2px] before:bg-gradient-to-b before:from-primary/20 before:via-accent/20 before:to-transparent">
              {[
                { year: failure.year - 2, title: "CAPITAL DEPLOYMENT", desc: "Initial architecture and funding sequence." },
                { year: failure.year - 1, title: "MARKET FRICTION", desc: "Detected anomalies in market penetration." },
                { year: failure.year, title: "TERMINAL SHUTDOWN", active: true, desc: "System collapse and asset liquidation." }
              ].map((item, i) => (
                <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-2xl border ${item.active ? 'bg-destructive/20 border-destructive text-destructive shadow-[0_0_20px_rgba(239,68,68,0.3)]' : 'bg-primary/20 border-primary text-primary shadow-[0_0_20px_rgba(99,102,241,0.2)]'} z-10 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-all duration-500 group-hover:scale-125`}>
                    <Zap className="h-5 w-5" />
                  </div>
                  <div className={`w-[calc(100%-4.5rem)] md:w-[45%] p-8 glass rounded-[2rem] border-white/5 hover:border-primary/40 transition-all duration-500 ${item.active ? 'border-destructive/40' : ''}`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`text-2xl font-black ${item.active ? 'text-destructive' : 'text-primary'}`}>{item.year}</div>
                    </div>
                    <div className={`text-[10px] font-black tracking-[0.3em] mb-3 ${item.active ? 'text-destructive/80' : 'text-primary/70'}`}>{item.title}</div>
                    <p className="text-xs text-muted-foreground leading-relaxed font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-dark p-12 rounded-[3rem] border-destructive/20 bg-destructive/5 shadow-2xl">
            <div className="flex items-center gap-4 mb-10 text-destructive uppercase text-xs font-black tracking-[0.4em] border-b border-destructive/10 pb-6">
              <ShieldAlert className="h-5 w-5" /> Terminal Failure Cause
            </div>
            <p className="text-foreground/90 leading-relaxed text-sm font-mono font-bold tracking-tight bg-black/40 p-8 rounded-2xl border border-white/5">
              {failure.failure_reason}
            </p>
          </div>

          <div className="glass p-12 rounded-[3.5rem] border-primary/40 bg-primary/5 relative overflow-hidden group shadow-2xl">
            <div className="absolute inset-0 grid-pattern opacity-10"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-10 text-primary uppercase text-xs font-black tracking-[0.4em] border-b border-primary/20 pb-6">
                <Brain className="h-5 w-5" /> Strategic Intelligence Summary
              </div>
              <div className="text-foreground leading-relaxed text-2xl font-bold tracking-tight italic opacity-95">
                &quot;{failure.lesson}&quot;
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-10 animate-in fade-in slide-in-from-right-12 duration-700 delay-300">
          <div className="glass-dark p-10 rounded-[2.5rem] border-primary/30 shadow-2xl neural-pulse">
            <div className="flex items-center gap-3 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-8">
               <Activity className="h-4 w-4" /> Predictive Insight
            </div>
            <p className="text-foreground/80 text-sm leading-relaxed mb-10 font-medium">
              Forensic vectors for <span className="text-foreground font-black">{failure.title}</span> indicate structural <span className="text-primary font-black uppercase tracking-widest">{failure.category} instability</span> during the {failure.year} cycle. 
            </p>
            <Button size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-2xl h-16 text-[10px] font-black uppercase tracking-[0.3em] shadow-lg shadow-primary/20 border-none transition-all group" asChild>
              <Link href="/analyzer">
                <span>Run Simulator</span>
                <ChevronRight className="ml-3 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          <div className="glass p-10 rounded-[2.5rem]">
            <div className="text-[10px] uppercase tracking-[0.4em] font-black text-muted-foreground mb-10 border-b border-white/5 pb-6">Market Metrics</div>
            <div className="space-y-10">
              <div className="group">
                <div className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 mb-2">Saturation Load</div>
                <div className="text-xl font-black text-foreground tracking-tighter">CRITICAL SATURATION</div>
                <div className="text-[9px] text-accent font-black uppercase mt-2 tracking-widest">STATUS: VOLATILE</div>
              </div>
              <div className="group pt-8 border-t border-white/5">
                <div className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 mb-2">Sector Mortality</div>
                <div className="text-3xl font-black text-gradient tracking-tighter">84.2%</div>
                <div className="text-[9px] text-muted-foreground/40 font-black uppercase mt-2 tracking-widest">ECOSYSTEM: {failure.industry}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
