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
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center text-primary">
                    <CheckCircle2 className="mr-2 h-5 w-5" />
                    Root Cause Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(analysis.root_cause_analysis).map(([cause, percent]: any) => (
                      <div key={cause}>
                        <div className="flex justify-between text-sm mb-1 text-foreground/80">
                          <span className="font-medium">{cause}</span>
                          <span>{percent}%</span>
                        </div>
                        <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                          <div 
                            className="bg-primary h-full rounded-full transition-all duration-1000" 
                            style={{ width: `${percent}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center text-accent-foreground">
                    <AlertTriangle className="mr-2 h-5 w-5 text-accent" />
                    Failure Score: {analysis.risk_score}/10
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground italic">
                    Based on your story, this project had a high risk profile in its {Object.keys(analysis.root_cause_analysis)[0].toLowerCase()} phase.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-accent/20 bg-accent/5">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center text-accent-foreground">
                    <Lightbulb className="mr-2 h-5 w-5 text-accent" />
                    How to Avoid This Next Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {analysis.recommendations.map((rec: string, i: number) => (
                      <li key={i} className="flex items-start text-sm text-foreground/90">
                        <span className="mr-2 font-bold text-accent">{i+1}.</span>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="h-full min-h-[400px] border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center p-10 text-center text-muted-foreground">
              <Brain className="h-16 w-16 mb-4 opacity-20" />
              <p>Your analysis will appear here after you describe your story and click the analyze button.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
