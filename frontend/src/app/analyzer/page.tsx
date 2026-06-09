"use client";

import { useState } from "react";
import { analyzeFailure } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, CheckCircle2, AlertTriangle, Lightbulb } from "lucide-react";

export default function AnalyzerPage() {
  const [story, setStory] = useState("");
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!story) return;
    setLoading(true);
    setError(null);
    try {
      const result = await analyzeFailure(story);
      setAnalysis(result);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.detail || err.message || "Failed to connect to AI service");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10 px-4 max-w-5xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">AI Failure Analyzer</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Describe your failed project or business venture, and our AI will analyze 
          the root causes and provide actionable insights to help you succeed next time.
        </p>
      </div>

      {error && (
        <div className="bg-destructive/10 border border-destructive/20 text-destructive p-4 rounded-lg mb-8 text-sm text-center">
          {error}
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-10">
        {/* Input Section */}
        <div className="space-y-6">
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-lg text-card-foreground">Describe Your Story</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea 
                placeholder="Example: I created an online food delivery startup and failed after six months because..." 
                className="min-h-[300px] mb-4 text-base bg-background text-foreground border-input"
                value={story}
                onChange={(e) => setStory(e.target.value)}
              />
              <Button 
                className="w-full h-12 text-lg bg-primary text-primary-foreground hover:bg-primary/90" 
                onClick={handleAnalyze} 
                disabled={loading || !story}
              >
                {loading ? "Analyzing..." : "Run AI Analysis"}
                {!loading && <Brain className="ml-2 h-5 w-5" />}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {analysis ? (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
              <Card className="glass border-none rounded-[2rem] overflow-hidden hover-lift shadow-2xl">
                <CardHeader className="bg-primary/5 border-b border-primary/5 py-8">
                  <CardTitle className="text-2xl font-serif flex items-center text-primary">
                    <CheckCircle2 className="mr-3 h-7 w-7" />
                    Neural Diagnostic Report
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-8">
                    {Object.entries(analysis.root_cause_analysis).map(([cause, percent]: any) => (
                      <div key={cause} className="group">
                        <div className="flex justify-between items-end mb-3">
                          <span className="text-sm font-black uppercase tracking-[0.2em] text-foreground/70">{cause}</span>
                          <span className="text-xl font-serif font-bold text-primary">{percent}%</span>
                        </div>
                        <div className="w-full bg-primary/5 h-3 rounded-full overflow-hidden p-0.5 border border-primary/10">
                          <div 
                            className="bg-gradient-to-r from-primary to-accent h-full rounded-full transition-all duration-1500 ease-out shadow-[0_0_10px_rgba(79,70,229,0.3)]" 
                            style={{ width: `${percent}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="glass border-none rounded-[2rem] hover-lift">
                <CardHeader className="py-8">
                  <CardTitle className="text-2xl font-serif flex items-center text-foreground">
                    <AlertTriangle className="mr-3 h-7 w-7 text-accent" />
                    Critical Risk Index: {analysis.risk_score}/10
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <div className="p-6 bg-accent/5 rounded-2xl border border-accent/10 italic text-muted-foreground text-lg font-serif">
                    "This venture demonstrated a high-volatility risk profile, primarily concentrated in its initial {Object.keys(analysis.root_cause_analysis)[0].toLowerCase()} deployment phase."
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-primary border-none rounded-[2rem] shadow-2xl relative overflow-hidden group hover-lift">
                <div className="absolute inset-0 grid-pattern opacity-20"></div>
                <CardHeader className="py-8 relative z-10">
                  <CardTitle className="text-2xl font-serif flex items-center text-primary-foreground">
                    <Lightbulb className="mr-3 h-7 w-7 text-accent" />
                    Strategic Remediation
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 pt-0 relative z-10">
                  <ul className="space-y-6">
                    {analysis.recommendations.map((rec: string, i: number) => (
                      <li key={i} className="flex items-start group/item">
                        <div className="mr-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-accent font-black text-sm border border-white/20 group-hover/item:scale-110 transition-transform">
                          {i+1}
                        </div>
                        <span className="text-lg text-primary-foreground/90 font-light leading-snug">
                          {rec}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="h-full min-h-[500px] border-2 border-dashed border-border/50 rounded-[2rem] glass flex flex-col items-center justify-center p-12 text-center animate-pulse">
              <div className="h-24 w-24 bg-primary/5 rounded-full flex items-center justify-center mb-6">
                <Brain className="h-12 w-12 text-primary/30" />
              </div>
              <h3 className="text-xl font-serif font-bold text-muted-foreground/60 mb-2">Awaiting Intelligence Story</h3>
              <p className="text-muted-foreground/40 max-w-xs font-light">Input your venture data and click analyze to generate a neural diagnostic report.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
