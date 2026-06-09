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
  Database
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
    "SYNTHESIZING REMEDIATION PROTOCOLS..."
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
      setError(err.response?.data?.detail || err.message || "SYSTEM ERROR: FAILED TO CONNECT TO NEURAL ENGINE");
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = () => {
    if (!analysis) return;
    const content = `[NEURAL INTELLIGENCE REPORT - CLASSIFIED]\n` +
      `TIMESTAMP: ${new Date().toISOString()}\n\n` +
      `FORENSIC SUMMARY: ${analysis.forensic_summary}\n\n` +
      `RISK INDEX: ${analysis.risk_score}/10.0\n\n` +
      `MARKET SENTIMENT: ${analysis.market_sentiment}\n` +
      `COMPETITOR DYNAMICS: ${analysis.competitor_dynamics}\n\n` +
      `STRATEGIC RECOMMENDATIONS:\n${analysis.recommendations.map((r: any, i: number) => `> [PROTOCOL ${i+1}] ${r}`).join('\n')}`;
    
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Neural-Intelligence-Report.txt";
    a.click();
  };

  return (
    <div className="container mx-auto py-12 px-4 max-w-7xl font-mono">
      {/* HUD Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 border-b border-primary/20 pb-8 gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-3 text-primary">
            <Terminal className="h-5 w-5" />
            <span className="text-xs font-bold tracking-[0.3em] uppercase">System: Neural Analyzer v4.0.2</span>
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-foreground uppercase">Intelligence Suite</h1>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="terminal-box p-3 min-w-[140px]">
            <div className="text-[10px] text-muted-foreground uppercase mb-1">Status</div>
            <div className="flex items-center gap-2 text-accent text-xs font-bold">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              OPERATIONAL
            </div>
          </div>
          <div className="terminal-box p-3 min-w-[140px]">
            <div className="text-[10px] text-muted-foreground uppercase mb-1">Neural Load</div>
            <div className="text-primary text-xs font-bold italic">0.02ms / GFLOP</div>
          </div>
        </div>
      </div>

      {error && (
        <div className="terminal-box border-destructive/50 bg-destructive/5 p-6 mb-12 flex items-center gap-4 text-destructive animate-pulse">
          <ShieldAlert className="h-6 w-6" />
          <span className="font-bold tracking-tight">{error}</span>
        </div>
      )}

      <div className="grid lg:grid-cols-12 gap-10">
        {/* Input Terminal */}
        <div className="lg:col-span-5 space-y-6">
          <div className="terminal-box p-6 border-primary/30 shadow-[0_0_30px_rgba(56,189,248,0.05)]">
            <div className="flex items-center justify-between mb-6 border-b border-primary/10 pb-4">
              <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase">
                <Database className="h-4 w-4" />
                Raw Data Input
              </div>
              <div className="flex gap-1.5">
                <div className="h-2 w-2 rounded-full bg-red-500/30" />
                <div className="h-2 w-2 rounded-full bg-yellow-500/30" />
                <div className="h-2 w-2 rounded-full bg-green-500/30" />
              </div>
            </div>
            
            <Textarea 
              placeholder="Enter venture narrative, architectural specs, and failure points..." 
              className="min-h-[450px] mb-8 bg-black/40 border-primary/20 text-foreground font-mono text-sm leading-relaxed p-6 focus:border-primary/50 transition-all resize-none scrollbar-hide"
              value={story}
              onChange={(e) => setStory(e.target.value)}
            />
            
            <Button 
              className="w-full h-14 rounded-none bg-primary text-primary-foreground hover:bg-primary/90 transition-all group relative overflow-hidden" 
              onClick={handleAnalyze} 
              disabled={loading || !story}
            >
              <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
              {loading ? (
                <div className="flex items-center gap-3">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span className="tracking-widest uppercase text-xs">{steps[loadingStep]}</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-3 uppercase font-bold tracking-widest text-xs">
                  <span>Execute Analysis</span>
                  <Cpu className="h-4 w-4" />
                </div>
              )}
            </Button>
          </div>
          
          <div className="terminal-box p-4 border-muted/30 opacity-50 text-[10px] leading-relaxed">
            <span className="text-primary mr-2">NOTICE:</span>
            By executing this command, you are granting the Neural Engine temporary access to proprietary venture data for the purpose of forensic pattern matching. All analysis is ephemeral and strictly localized to this session.
          </div>
        </div>

        {/* Output HUD */}
        <div className="lg:col-span-7 space-y-8">
          {analysis ? (
            <div className="animate-in fade-in slide-in-from-right-8 duration-1000 space-y-8">
              <div className="flex justify-between items-center border-b border-primary/20 pb-4">
                <div className="flex items-center gap-2 text-accent">
                  <Activity className="h-4 w-4" />
                  <span className="text-xs font-bold uppercase tracking-widest">Analysis Results Output</span>
                </div>
                <Button variant="ghost" size="sm" className="h-8 rounded-none border border-primary/30 text-[10px] uppercase font-bold tracking-widest hover:bg-primary/10 gap-2" onClick={downloadReport}>
                  <Download className="h-3 w-3" /> Get Decrypted Report
                </Button>
              </div>

              {/* Main Summary */}
              <div className="terminal-box p-8 border-accent/30 shadow-[0_0_40px_rgba(34,211,238,0.05)]">
                <div className="flex items-center gap-3 text-accent mb-6">
                  <ShieldAlert className="h-6 w-6" />
                  <h3 className="text-lg font-bold uppercase tracking-widest">Forensic Summary</h3>
                </div>
                <p className="text-foreground text-xl font-bold leading-tight mb-8">
                  {analysis.forensic_summary}
                </p>
                
                <div className="grid grid-cols-2 gap-8 pt-8 border-t border-primary/10">
                  <div className="space-y-3">
                    <div className="text-[10px] text-muted-foreground uppercase flex items-center gap-2">
                      <Search className="h-3 w-3" /> Market Signal
                    </div>
                    <div className="text-sm font-bold border-l-2 border-primary/30 pl-3 py-1 bg-primary/5">
                      {analysis.market_sentiment}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="text-[10px] text-muted-foreground uppercase flex items-center gap-2">
                      <Globe className="h-3 w-3" /> Competition Dynamics
                    </div>
                    <div className="text-sm font-bold border-l-2 border-accent/30 pl-3 py-1 bg-accent/5">
                      {analysis.competitor_dynamics}
                    </div>
                  </div>
                </div>
              </div>

              {/* Data Markers */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="terminal-box p-6 space-y-6">
                  <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase mb-4 border-b border-primary/10 pb-2">
                    <Layers className="h-4 w-4" /> Root Causes
                  </div>
                  <div className="space-y-6">
                    {Object.entries(analysis.root_cause_analysis).map(([cause, percent]: any) => (
                      <div key={cause}>
                        <div className="flex justify-between items-end mb-2">
                          <span className="text-[10px] uppercase text-muted-foreground font-bold">{cause}</span>
                          <span className="text-sm font-bold text-primary">{percent}%</span>
                        </div>
                        <div className="w-full bg-primary/5 h-1.5 border border-primary/10 p-0.5 overflow-hidden">
                          <div 
                            className="bg-primary h-full transition-all duration-1000 ease-out" 
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="terminal-box p-8 flex flex-col items-center justify-center text-center">
                  <div className="text-[10px] text-muted-foreground uppercase mb-6 tracking-[0.4em]">Critical Risk Index</div>
                  <div className="relative">
                    <div className="h-32 w-32 rounded-full border-4 border-primary/20 flex items-center justify-center">
                      <span className="text-5xl font-black text-foreground">{analysis.risk_score}</span>
                      <span className="text-xs text-muted-foreground absolute bottom-4">/10.0</span>
                    </div>
                    {/* SVG Progress Circle would go here for more impact */}
                    <div className="absolute inset-0 rounded-full border-t-4 border-accent animate-spin duration-[3s]" style={{ borderRightColor: 'transparent', borderBottomColor: 'transparent' }} />
                  </div>
                  <div className="mt-6 text-[10px] text-accent font-bold uppercase tracking-widest">Hazard Level: {Number(analysis.risk_score) > 7 ? 'CRITICAL' : 'MODERATE'}</div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="terminal-box p-8 border-primary/40 bg-primary/5">
                <div className="flex items-center gap-3 text-primary mb-8">
                  <Zap className="h-6 w-6" />
                  <h3 className="text-lg font-bold uppercase tracking-widest">Remediation Protocols</h3>
                </div>
                <div className="space-y-6">
                  {analysis.recommendations.map((rec: string, i: number) => (
                    <div key={i} className="flex gap-4 group cursor-default">
                      <div className="text-primary font-bold text-sm mt-1">{`[${i+1}]`}</div>
                      <div className="flex-1 text-sm leading-relaxed border-l border-primary/20 pl-4 group-hover:border-primary/60 transition-colors">
                        {rec}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="terminal-box h-full min-h-[600px] flex flex-col items-center justify-center p-12 text-center opacity-80 border-dashed border-primary/20">
              {loading ? (
                 <div className="space-y-10 flex flex-col items-center w-full max-w-sm">
                   <div className="relative h-24 w-24">
                      <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
                      <div className="absolute inset-0 rounded-full border-t-2 border-primary animate-spin" />
                      <div className="absolute inset-4 rounded-full border-b-2 border-accent animate-spin-reverse opacity-50" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Activity className="h-8 w-8 text-primary animate-pulse" />
                      </div>
                   </div>
                   <div className="space-y-4 w-full">
                     <div className="text-sm font-bold text-primary animate-pulse tracking-widest">{steps[loadingStep]}</div>
                     <div className="w-full h-1 bg-primary/10 overflow-hidden">
                       <div className="h-full bg-primary animate-progress-linear" />
                     </div>
                     <div className="flex justify-between text-[8px] text-muted-foreground uppercase font-bold tracking-widest">
                       <span>Neural Sync</span>
                       <span>Processing...</span>
                     </div>
                   </div>
                 </div>
              ) : (
                <div className="space-y-6">
                  <div className="h-20 w-20 terminal-box flex items-center justify-center mx-auto bg-primary/5">
                    <Brain className="h-10 w-10 text-primary/40" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground uppercase tracking-widest mb-2">Awaiting System Input</h3>
                    <p className="text-xs text-muted-foreground max-w-[280px] mx-auto leading-relaxed">
                      Initialize deep forensic analysis by providing venture architecture in the primary input terminal.
                    </p>
                  </div>
                  <div className="flex gap-2 justify-center">
                    <div className="h-1 w-8 bg-primary/20" />
                    <div className="h-1 w-8 bg-primary/10" />
                    <div className="h-1 w-8 bg-primary/5" />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* HUD Footer */}
      <div className="mt-12 pt-6 border-t border-primary/10 flex justify-between text-[8px] text-muted-foreground uppercase font-bold tracking-[0.2em]">
        <div>Connection: Encrypted TLS v1.3</div>
        <div>Data Node: SECURE-ALPHA-9</div>
        <div>Session ID: NF-{Math.random().toString(36).substring(7).toUpperCase()}</div>
      </div>
    </div>
  );
}
