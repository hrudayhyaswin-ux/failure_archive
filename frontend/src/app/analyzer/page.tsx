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

  const handleAnalyze = async () => {
    if (!story) return;
    setLoading(true);
    try {
      const result = await analyzeFailure(story);
      setAnalysis(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10 px-4 max-w-5xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">AI Failure Analyzer</h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Describe your failed project or business venture, and our AI will analyze 
          the root causes and provide actionable insights to help you succeed next time.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* Input Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Describe Your Story</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea 
                placeholder="Example: I created an online food delivery startup and failed after six months because..." 
                className="min-h-[300px] mb-4 text-base"
                value={story}
                onChange={(e) => setStory(e.target.value)}
              />
              <Button 
                className="w-full h-12 text-lg" 
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
                  <CardTitle className="text-lg flex items-center">
                    <CheckCircle2 className="mr-2 h-5 w-5 text-primary" />
                    Root Cause Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(analysis.root_cause_analysis).map(([cause, percent]: any) => (
                      <div key={cause}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium">{cause}</span>
                          <span>{percent}%</span>
                        </div>
                        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
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

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <AlertTriangle className="mr-2 h-5 w-5 text-amber-500" />
                    Failure Score: {analysis.risk_score}/10
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600 italic">
                    Based on your story, this project had a high risk profile in its {Object.keys(analysis.root_cause_analysis)[0].toLowerCase()} phase.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-teal-100 bg-teal-50">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center text-teal-900">
                    <Lightbulb className="mr-2 h-5 w-5 text-teal-600" />
                    How to Avoid This Next Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {analysis.recommendations.map((rec: string, i: number) => (
                      <li key={i} className="flex items-start text-sm text-teal-800">
                        <span className="mr-2 font-bold text-teal-600">{i+1}.</span>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="h-full min-h-[400px] border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-10 text-center text-slate-400">
              <Brain className="h-16 w-16 mb-4 opacity-20" />
              <p>Your analysis will appear here after you describe your story and click the analyze button.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
