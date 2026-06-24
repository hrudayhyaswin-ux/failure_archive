"use client";

import { useState, useEffect } from "react";
import { analyzeFailure } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Brain,
  Terminal,
  Cpu,
  Layers,
  Activity,
  Download,
  ShieldAlert,
  Zap,
  Search,
  Globe,
  Loader2,
  ChevronRight,
  Database,
} from "lucide-react";

export default function AnalyzerPage() {
  const [story, setStory] = useState("");
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingStep, setLoadingStep] = useState(0);

  const steps = [
    "INITIALIZING NEURAL LINK...",
    "DECRYPTING VENTURE ARCHITECTURE...",
    "SCANNING GLOBAL FAILURE DATABASE...",
    "RUNNING MONTE CARLO SIMULATIONS...",
    "SYNTHESIZING REMEDIATION PROTOCOLS...",
  ];

  useEffect(() => {
    let interval: any;
    if (loading) {
      setLoadingStep(0);
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleAnalyze = async () => {
    if (!story) return;
    setLoading(true);
    setError(null);
    setAnalysis(null);
    try {
      const result = await analyzeFailure(story);
      setAnalysis(result);
    } catch (err: any) {
      console.error(err);
      setError(
        err.response?.data?.detail ||
          err.message ||
          "SYSTEM ERROR: FAILED TO CONNECT TO NEURAL ENGINE",
      );
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = () => {
    if (!analysis) return;
    const content =
      `[NEURAL INTELLIGENCE REPORT - CLASSIFIED]\n` +
      `TIMESTAMP: ${new Date().toISOString()}\n\n` +
      `FORENSIC SUMMARY: ${analysis.forensic_summary}\n\n` +
      `RISK INDEX: ${analysis.risk_score}/10.0\n\n` +
      `MARKET SENTIMENT: ${analysis.market_sentiment}\n` +
      `COMPETITOR DYNAMICS: ${analysis.competitor_dynamics}\n\n` +
      `STRATEGIC RECOMMENDATIONS:\n${analysis.recommendations.map((r: any, i: number) => `> [PROTOCOL ${i + 1}] ${r}`).join("\n")}`;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Neural-Intelligence-Report.txt";
    a.click();
  };

  return (
    <div className="container mx-auto py-12 px-4 max-w-7xl font-sans relative">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-[120px] -z-10" />

      {/* Modern Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 pb-8 border-b border-primary/10 gap-8">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-primary bg-primary/5 w-fit px-4 py-1.5 rounded-full border border-primary/10">
            <Brain className="h-4 w-4 animate-pulse" />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase">
              Neural Engine Active
            </span>
          </div>
          <h1 className="text-5xl font-black tracking-tighter text-foreground">
            AI <span className="text-gradient">Analyzer</span>
          </h1>
          <p className="text-muted-foreground text-sm max-w-md font-medium leading-relaxed">
            Deconstruct venture failures using our proprietary neural forensic
            models. Identify patterns invisible to the human eye.
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="glass p-4 min-w-[160px] rounded-2xl hover-lift">
            <div className="text-[9px] text-muted-foreground uppercase font-bold tracking-widest mb-1">
              System Status
            </div>
            <div className="flex items-center gap-2 text-primary text-xs font-black">
              <span className="h-2 w-2 rounded-full bg-primary animate-ping" />
              HIGH PERFORMANCE
            </div>
          </div>
          <div className="glass p-4 min-w-[160px] rounded-2xl hover-lift">
            <div className="text-[9px] text-muted-foreground uppercase font-bold tracking-widest mb-1">
              Neural Latency
            </div>
            <div className="text-accent text-xs font-black">
              0.004ms / CYCLE
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="glass border-destructive/30 bg-destructive/5 p-6 mb-12 rounded-2xl flex items-center gap-4 text-destructive animate-in fade-in zoom-in duration-300">
          <div className="h-10 w-10 bg-destructive/10 rounded-full flex items-center justify-center">
            <ShieldAlert className="h-5 w-5" />
          </div>
          <span className="font-bold tracking-tight">{error}</span>
        </div>
      )}

      <div className="grid lg:grid-cols-12 gap-12">
        {/* Input Terminal */}
        <div className="lg:col-span-5 space-y-8">
          <div className="glass-dark p-8 rounded-3xl neural-pulse border-white/5 shadow-2xl overflow-hidden group">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3 text-foreground font-black text-xs uppercase tracking-widest">
                <div className="h-2 w-2 bg-primary rounded-full shadow-[0_0_10px_var(--primary)]" />
                Input Narrative
              </div>
              <div className="flex gap-2">
                <div className="h-1 w-8 bg-primary/20 rounded-full" />
                <div className="h-1 w-4 bg-accent/20 rounded-full" />
              </div>
            </div>

            <Textarea
              placeholder="Describe the venture architecture, market conditions, and primary failure vectors..."
              className="min-h-[400px] mb-8 bg-black/20 border-white/5 text-foreground font-mono text-sm leading-relaxed p-6 focus:border-primary/30 transition-all resize-none rounded-2xl placeholder:text-muted-foreground/30 shadow-inner"
              value={story}
              onChange={(e) => setStory(e.target.value)}
            />

            <Button
              className="w-full h-16 rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all group relative overflow-hidden shadow-lg shadow-primary/20 border-none"
              onClick={handleAnalyze}
              disabled={loading || !story}
            >
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
              {loading ? (
                <div className="flex items-center gap-4">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span className="tracking-widest uppercase text-[10px] font-black">
                    {steps[loadingStep]}
                  </span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-4 uppercase font-black tracking-[0.2em] text-[10px]">
                  <span>Begin Forensic Sequence</span>
                  <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              )}
            </Button>
          </div>

          <div className="glass p-5 rounded-2xl border-white/5 opacity-60 text-[9px] leading-relaxed font-bold tracking-tight text-muted-foreground uppercase">
            <span className="text-primary mr-2 underline decoration-primary/30">
              System Protocol:
            </span>
            By initiating this sequence, you acknowledge that the neural engine
            will perform high-intensity pattern matching across 40M+ data
            points. Results are deterministic and non-reversible.
          </div>
        </div>

        {/* Output HUD */}
        <div className="lg:col-span-7 space-y-10">
          {analysis ? (
            <div className="animate-in fade-in slide-in-from-right-12 duration-1000 space-y-10">
              <div className="flex justify-between items-center border-b border-white/5 pb-6">
                <div className="flex items-center gap-3">
                  <Activity className="h-5 w-5 text-accent animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">
                    Analysis Output Stream
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-10 rounded-full border-white/10 text-[10px] uppercase font-black tracking-widest hover:bg-white/5 gap-3 px-6 transition-all"
                  onClick={downloadReport}
                >
                  <Download className="h-3 w-3" /> Secure Export
                </Button>
              </div>

              {/* Main Summary */}
              <div className="glass p-10 rounded-[2.5rem] border-accent/20 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Activity className="h-32 w-32 text-accent" />
                </div>
                <div className="flex items-center gap-4 text-accent mb-8">
                  <div className="h-12 w-12 bg-accent/10 rounded-2xl flex items-center justify-center border border-accent/20">
                    <ShieldAlert className="h-6 w-6" />
                  </div>
                  <h3 className="text-sm font-black uppercase tracking-[0.3em]">
                    Forensic Summary
                  </h3>
                </div>
                <p className="text-foreground text-3xl font-black leading-[1.1] mb-10 tracking-tighter">
                  {analysis.forensic_summary}
                </p>

                <div className="grid grid-cols-2 gap-10 pt-10 border-t border-white/5">
                  <div className="space-y-4">
                    <div className="text-[9px] text-muted-foreground uppercase font-black tracking-widest flex items-center gap-2">
                      <Search className="h-3 w-3 text-primary" /> Market
                      Sentiment
                    </div>
                    <div className="text-sm font-bold bg-primary/5 border border-primary/10 rounded-xl p-4 leading-relaxed">
                      {analysis.market_sentiment}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="text-[9px] text-muted-foreground uppercase font-black tracking-widest flex items-center gap-2">
                      <Globe className="h-3 w-3 text-accent" /> Competitor Load
                    </div>
                    <div className="text-sm font-bold bg-accent/5 border border-accent/10 rounded-xl p-4 leading-relaxed">
                      {analysis.competitor_dynamics}
                    </div>
                  </div>
                </div>
              </div>

              {/* Data Markers */}
              <div className="grid md:grid-cols-2 gap-10">
                <div className="glass p-8 rounded-3xl space-y-8">
                  <div className="flex items-center gap-3 text-foreground text-xs font-black uppercase tracking-widest mb-2">
                    <Layers className="h-4 w-4 text-primary" /> Root Cause
                    Vectors
                  </div>
                  <div className="space-y-8">
                    {Object.entries(analysis.root_cause_analysis).map(
                      ([cause, percent]: any) => (
                        <div key={cause} className="group/item">
                          <div className="flex justify-between items-end mb-3">
                            <span className="text-[10px] uppercase text-muted-foreground font-black tracking-widest group-hover/item:text-primary transition-colors">
                              {cause}
                            </span>
                            <span className="text-sm font-black text-primary">
                              {percent}%
                            </span>
                          </div>
                          <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden p-0.5 border border-white/5">
                            <div
                              className="bg-gradient-to-r from-primary to-accent h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                              style={{ width: `${percent}%` }}
                            />
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                <div className="glass p-10 rounded-3xl flex flex-col items-center justify-center text-center group">
                  <div className="text-[9px] text-muted-foreground uppercase mb-10 font-black tracking-[0.5em] group-hover:text-accent transition-colors">
                    Risk Index
                  </div>
                  <div className="relative">
                    <div className="h-40 w-40 rounded-full border border-white/5 flex items-center justify-center bg-white/[0.02]">
                      <div className="flex flex-col items-center">
                        <span className="text-6xl font-black text-foreground tracking-tighter">
                          {analysis.risk_score}
                        </span>
                        <span className="text-[10px] text-muted-foreground font-black tracking-widest mt-1 uppercase">
                          Points
                        </span>
                      </div>
                    </div>
                    <svg className="absolute inset-0 h-40 w-40 -rotate-90 scale-110">
                      <circle
                        cx="80"
                        cy="80"
                        r="76"
                        fill="transparent"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-white/5"
                      />
                      <circle
                        cx="80"
                        cy="80"
                        r="76"
                        fill="transparent"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeDasharray={477}
                        strokeDashoffset={
                          477 - (477 * Number(analysis.risk_score)) / 10
                        }
                        className="text-accent drop-shadow-[0_0_8px_rgba(232,121,249,0.5)] transition-all duration-1000"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <div className="mt-10 px-6 py-2 bg-accent/10 border border-accent/20 rounded-full text-[10px] text-accent font-black uppercase tracking-[0.2em]">
                    Threat:{" "}
                    {Number(analysis.risk_score) > 7 ? "CRITICAL" : "MODERATE"}
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="glass-dark p-10 rounded-[2.5rem] border-primary/20 bg-primary/5 shadow-2xl">
                <div className="flex items-center gap-4 text-primary mb-10">
                  <div className="h-12 w-12 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20">
                    <Zap className="h-6 w-6" />
                  </div>
                  <h3 className="text-sm font-black uppercase tracking-[0.3em]">
                    Remediation Protocols
                  </h3>
                </div>
                <div className="space-y-8">
                  {analysis.recommendations.map((rec: string, i: number) => (
                    <div key={i} className="flex gap-6 group cursor-default">
                      <div className="text-primary font-black text-xs h-8 w-8 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/10 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                        {i + 1}
                      </div>
                      <div className="flex-1 text-sm font-medium leading-relaxed text-foreground/90 py-1 border-b border-white/5 group-hover:border-primary/30 transition-all pb-6">
                        {rec}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="glass h-full min-h-[650px] flex flex-col items-center justify-center p-16 text-center rounded-[3rem] border-dashed border-primary/20 transition-all duration-500">
              {loading ? (
                <div className="space-y-12 flex flex-col items-center w-full max-w-sm">
                  <div className="relative h-32 w-32">
                    <div className="absolute inset-0 rounded-full border border-primary/10" />
                    <div className="absolute inset-0 rounded-full border-t border-primary animate-spin" />
                    <div className="absolute inset-4 rounded-full border-b border-accent animate-spin-reverse opacity-40" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Activity className="h-10 w-10 text-primary animate-pulse" />
                    </div>
                  </div>
                  <div className="space-y-6 w-full">
                    <div className="text-xs font-black text-primary animate-pulse tracking-[0.4em] uppercase">
                      {steps[loadingStep]}
                    </div>
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden border border-white/5">
                      <div className="h-full bg-gradient-to-r from-primary to-accent animate-progress-linear shadow-[0_0_10px_var(--primary)]" />
                    </div>
                    <div className="flex justify-between text-[8px] text-muted-foreground uppercase font-black tracking-widest opacity-50">
                      <span>Secure Connection Established</span>
                      <span>Processing...</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-8 max-w-sm">
                  <div className="h-28 w-28 glass flex items-center justify-center mx-auto rounded-[2rem] bg-white/[0.02] border-white/5 shadow-2xl group-hover:scale-110 transition-transform">
                    <Brain className="h-12 w-12 text-primary/30 group-hover:text-primary transition-colors" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-black text-foreground uppercase tracking-[0.2em]">
                      Awaiting Uplink
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                      Initialize deep forensic analysis by providing venture
                      architecture in the primary input terminal.
                    </p>
                  </div>
                  <div className="flex gap-1.5 justify-center">
                    <div className="h-1 w-10 bg-primary/20 rounded-full" />
                    <div className="h-1 w-1 bg-primary/10 rounded-full" />
                    <div className="h-1 w-1 bg-primary/10 rounded-full" />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* HUD Footer */}
      <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between gap-4 text-[9px] text-muted-foreground uppercase font-black tracking-[0.3em]">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-2">
            <div className="h-1 w-1 rounded-full bg-green-500" />{" "}
            SECURE-NODE-ALPHA
          </span>
          <span className="opacity-40">TLS v1.3 AES-256</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden sm:block">
            Session: NF-{Math.random().toString(36).substring(7).toUpperCase()}{" "}
            • {new Date().toLocaleTimeString()}
          </div>
          <div className="text-primary/60">Neural v4.0.2</div>
        </div>
      </div>
    </div>
  );
}
