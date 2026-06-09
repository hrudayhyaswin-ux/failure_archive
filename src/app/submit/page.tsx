"use client";

import { useState } from "react";
import { submitFailure } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle2, UploadCloud } from "lucide-react";
import Link from "next/link";

export default function SubmitPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitFailure({ title, description });
      setSubmitted(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="container mx-auto py-20 px-4 flex flex-col items-center justify-center">
        <div className="bg-teal-50 border border-teal-100 p-10 rounded-2xl text-center max-w-md">
          <CheckCircle2 className="h-16 w-16 text-teal-600 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-teal-900 mb-2">Submission Received!</h2>
          <p className="text-teal-700 mb-8">
            Thank you for contributing to the Failure Archive. Our team will review your submission and add it to the database shortly.
          </p>
          <div className="flex flex-col gap-3">
            <Button asChild>
              <Link href="/explore">Explore Other Failures</Link>
            </Button>
            <Button variant="outline" onClick={() => setSubmitted(false)}>
              Submit Another
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">Submit a Failure</h1>
        <p className="text-slate-600">Help the community learn by sharing a failure story you've analyzed.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Case Information</CardTitle>
          <CardDescription>Provide the core details of the project or startup failure.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title of Case</label>
              <Input 
                placeholder="e.g. My Food Delivery Startup" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Detailed Description</label>
              <Textarea 
                placeholder="Describe what happened, the industry, the timeline, and the key reasons for failure..." 
                className="min-h-[200px]"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="p-4 bg-slate-50 rounded-lg border border-dashed flex flex-col items-center justify-center text-slate-500">
              <UploadCloud className="h-8 w-8 mb-2 opacity-50" />
              <p className="text-sm">Upload supporting documents or images (Optional)</p>
            </div>

            <Button type="submit" className="w-full h-12 text-lg" disabled={loading}>
              {loading ? "Submitting..." : "Submit for Review"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
