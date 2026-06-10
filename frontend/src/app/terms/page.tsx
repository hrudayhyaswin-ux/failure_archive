"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function TermsPage() {
  return (
    <div className="container mx-auto py-20 px-4 max-w-4xl">
      <Card className="glass border-primary/20">
        <CardHeader>
          <CardTitle className="text-3xl font-black uppercase tracking-widest text-primary">Legal Protocols</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-invert max-w-none">
          <h2 className="text-xl font-bold text-foreground mt-6">1. Usage Rights</h2>
          <p className="text-muted-foreground">This system is provided for educational and forensic intelligence purposes only.</p>
          
          <h2 className="text-xl font-bold text-foreground mt-6">2. Data Privacy</h2>
          <p className="text-muted-foreground">All analysis is performed using neural processing units. Data submitted to the analyzer may be used to improve the forensic models.</p>
          
          <h2 className="text-xl font-bold text-foreground mt-6">3. Liability</h2>
          <p className="text-muted-foreground">The Failure Archive is not liable for any strategic decisions made based on AI-generated forensic reports.</p>
        </CardContent>
      </Card>
    </div>
  );
}
