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
    <div className="container mx-auto py-12 px-4 max-w-6xl">
      <Button variant="ghost" className="mb-10 hover:bg-primary/5 -ml-4" asChild>
        <Link href="/explore">
          <ArrowLeft className="mr-2 h-4 w-4" /> Return to Intelligence Database
        </Link>
      </Button>

      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.2em]">
                Case Study ID: {failure.id.toString().padStart(4, '0')}
              </span>
              <span className="px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent-foreground text-[10px] font-black uppercase tracking-[0.2em]">
                Status: Archived
              </span>
            </div>
            <h1 className="text-6xl md:text-7xl font-serif font-black tracking-tighter text-foreground mb-8 leading-tight">
              {failure.title}
            </h1>
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center px-4 py-2 glass rounded-2xl">
                <Tag className="mr-2 h-4 w-4 text-primary" /> 
                <span className="font-bold text-foreground/80 uppercase tracking-wider text-[11px]">{failure.category}</span>
              </div>
              <div className="flex items-center px-4 py-2 glass rounded-2xl">
                <Building2 className="mr-2 h-4 w-4 text-primary" /> 
                <span className="font-bold text-foreground/80 uppercase tracking-wider text-[11px]">{failure.industry}</span>
              </div>
              <div className="flex items-center px-4 py-2 glass rounded-2xl">
                <Calendar className="mr-2 h-4 w-4 text-primary" /> 
                <span className="font-bold text-foreground/80 uppercase tracking-wider text-[11px]">{failure.year}</span>
              </div>
            </div>
          </div>

          <Card className="glass overflow-hidden border-none rounded-[2rem] hover-lift">
            <CardHeader className="bg-primary/[0.03] border-b border-primary/5 py-6">
              <CardTitle className="flex items-center font-serif text-2xl">
                <Info className="mr-3 h-6 w-6 text-primary" />
                Strategic Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <p className="text-muted-foreground leading-relaxed text-xl font-light">
                {failure.description}
              </p>
            </CardContent>
          </Card>

          <Card className="glass border-none rounded-[2rem] hover-lift">
            <CardHeader className="py-6">
              <CardTitle className="flex items-center font-serif text-2xl">
                <Calendar className="mr-3 h-6 w-6 text-accent" />
                Failure Vectors & Timeline
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
                {[
                  { year: failure.year - 2, title: "Capital Injection & Strategic Deployment" },
                  { year: failure.year - 1, title: "Market Friction & Intelligence Pivot" },
                  { year: failure.year, title: "Operational Shutdown & Archive Entry", active: true }
                ].map((item, i) => (
                  <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                    <div className={`flex items-center justify-center w-12 h-12 rounded-2xl border-4 border-background ${item.active ? 'bg-destructive text-white' : 'bg-primary text-white'} shadow-xl z-10 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-transform group-hover:scale-110`}>
                      <Zap className="h-5 w-5" />
                    </div>
                    <div className={`w-[calc(100%-4rem)] md:w-[45%] p-6 rounded-3xl glass border-none shadow-lg transition-all duration-300 group-hover:shadow-2xl ${item.active ? 'bg-destructive/5' : ''}`}>
                      <div className="flex items-center justify-between space-x-2 mb-2">
                        <div className={`text-2xl font-serif font-black ${item.active ? 'text-destructive' : 'text-primary'}`}>{item.year}</div>
                      </div>
                      <div className={`font-bold tracking-tight leading-snug ${item.active ? 'text-destructive' : 'text-foreground'}`}>{item.title}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-none rounded-[2rem] hover-lift">
            <CardHeader className="bg-destructive/[0.03] border-b border-destructive/5 py-6">
              <CardTitle className="flex items-center font-serif text-2xl text-destructive">
                <FileText className="mr-3 h-6 w-6" />
                Root Cause Identification
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <p className="text-muted-foreground leading-relaxed text-lg">
                {failure.failure_reason}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-primary border-none rounded-[2rem] shadow-2xl relative overflow-hidden group hover-lift">
            <div className="absolute inset-0 grid-pattern opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <CardHeader className="py-8 relative z-10">
              <CardTitle className="flex items-center text-primary-foreground font-serif text-3xl">
                <CheckCircle className="mr-4 h-8 w-8 text-accent" />
                Intelligence Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="p-10 pt-0 relative z-10">
              <div className="text-primary-foreground leading-relaxed text-2xl font-serif italic opacity-90">
                "{failure.lesson}"
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-700 delay-300">
          <Card className="bg-foreground text-background border-none rounded-[2rem] shadow-2xl overflow-hidden group hover-lift">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
            <CardHeader className="py-8 border-b border-white/10">
              <CardTitle className="text-xl font-serif">AI Neural Insight</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <p className="text-background/80 text-lg leading-relaxed font-light mb-8">
                The primary failure vector for <span className="text-white font-bold">{failure.title}</span> was identified as <span className="text-primary-foreground font-black underline decoration-primary decoration-4 underline-offset-4">{failure.category.toLowerCase()} instability</span>. 
              </p>
              <Button size="lg" className="w-full bg-white text-foreground hover:bg-white/90 rounded-2xl h-14 font-bold" asChild>
                <Link href="/analyzer">Generate Deep Analysis</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="glass border-none rounded-[2rem] hover-lift">
            <CardHeader className="py-6 border-b border-border/50">
              <CardTitle className="text-xs uppercase tracking-[0.3em] font-black text-muted-foreground">Market Ecosystem</CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <div className="group">
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-2">Market Saturation Index</div>
                <div className="text-2xl font-serif font-bold text-foreground">Critical Level</div>
                <div className="text-xs text-muted-foreground mt-1">High Volatility in {failure.year}</div>
              </div>
              <div className="group pt-6 border-t border-border/50">
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-2">Sector Mortality Rate</div>
                <div className="text-2xl font-serif font-bold text-foreground">78.4%</div>
                <div className="text-xs text-muted-foreground mt-1">Historical avg for {failure.industry}</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
