"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getFailure, Failure } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Building2, Tag, ArrowLeft, Info, FileText, CheckCircle } from "lucide-react";
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

  if (loading) return <div className="container mx-auto py-20 text-center">Loading details...</div>;
  if (!failure) return <div className="container mx-auto py-20 text-center">Failure not found.</div>;

  return (
    <div className="container mx-auto py-10 px-4 max-w-5xl">
      <Button variant="ghost" className="mb-6" asChild>
        <Link href="/explore">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Explore
        </Link>
      </Button>

      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h1 className="text-5xl font-bold text-slate-900 mb-4">{failure.title}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-slate-500">
              <div className="flex items-center">
                <Tag className="mr-1 h-4 w-4" /> {failure.category}
              </div>
              <div className="flex items-center">
                <Building2 className="mr-1 h-4 w-4" /> {failure.industry}
              </div>
              <div className="flex items-center">
                <Calendar className="mr-1 h-4 w-4" /> {failure.year}
              </div>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Info className="mr-2 h-5 w-5 text-primary" />
                Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700 leading-relaxed text-lg">
                {failure.description}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5 text-red-500" />
                Root Causes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700 leading-relaxed">
                {failure.failure_reason}
              </p>
            </CardContent>
          </Card>

          <Card className="border-teal-100 bg-teal-50">
            <CardHeader>
              <CardTitle className="flex items-center text-teal-900">
                <CheckCircle className="mr-2 h-5 w-5 text-teal-600" />
                Key Lessons Learned
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-teal-800 leading-relaxed font-medium">
                {failure.lesson}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-slate-900 text-white border-slate-800">
            <CardHeader>
              <CardTitle className="text-lg">AI Quick Insight</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 text-sm leading-relaxed">
                The primary failure vector for {failure.title} was a combination of 
                <span className="text-white font-bold"> {failure.category.toLowerCase()} instability </span> 
                and market misalignment.
              </p>
              <Button className="w-full mt-6 bg-white text-slate-900 hover:bg-slate-100" asChild>
                <Link href="/analyzer">Analyze Similar Cases</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm uppercase tracking-wider text-slate-500">Industry Context</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-sm">
                  <div className="font-bold text-slate-900">Market Saturation</div>
                  <div className="text-slate-600">Moderate in {failure.year}</div>
                </div>
                <div className="text-sm">
                  <div className="font-bold text-slate-900">Typical Failure Rate</div>
                  <div className="text-slate-600">75% in {failure.industry}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
