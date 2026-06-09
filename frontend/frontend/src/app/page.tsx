import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, Search, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-20 lg:py-32 flex flex-col items-center text-center px-4 bg-white border-b">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6">
            Learn From Failures <br />
            <span className="text-primary">Before Making Them</span>
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            Explore thousands of real-world failures, understand why they happened, 
            and discover how to avoid them with AI-powered insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-8 h-12" asChild>
              <Link href="/explore">
                Explore Database <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="px-8 h-12" asChild>
              <Link href="/analyzer">
                Try AI Analyzer
              </Link>
            </Button>
          </div>
          
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 border-t pt-10">
            <div>
              <p className="text-3xl font-bold text-slate-900">500+</p>
              <p className="text-sm text-slate-500 uppercase tracking-wider">Failures</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-slate-900">50+</p>
              <p className="text-sm text-slate-500 uppercase tracking-wider">Industries</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-slate-900">1000+</p>
              <p className="text-sm text-slate-500 uppercase tracking-wider">Lessons</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-slate-900">10k+</p>
              <p className="text-sm text-slate-500 uppercase tracking-wider">Analyses</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm border">
              <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-6">
                <Search className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Failure Database</h3>
              <p className="text-slate-600">
                Access a curated library of historical startup and product failures with deep analysis.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm border">
              <div className="h-12 w-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-6">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">AI Analysis</h3>
              <p className="text-slate-600">
                Use GPT-powered intelligence to identify the hidden root causes behind every failure story.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm border">
              <div className="h-12 w-12 bg-teal-100 text-teal-600 rounded-lg flex items-center justify-center mb-6">
                <BarChart3 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Failure Heatmap</h3>
              <p className="text-slate-600">
                Visualize trends and common pitfalls across different industries and sectors.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
