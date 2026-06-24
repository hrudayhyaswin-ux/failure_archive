"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Shield, Lock, Eye } from "lucide-react";

export default function SecurityPage() {
  return (
    <div className="container mx-auto py-20 px-4 max-w-4xl">
      <Card className="glass border-primary/20">
        <CardHeader>
          <CardTitle className="text-3xl font-black uppercase tracking-widest text-primary flex items-center gap-4">
            <Shield className="h-8 w-8" />
            Security Architecture
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-12">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-foreground font-bold">
                <Lock className="h-4 w-4 text-primary" />
                <span>Encryption</span>
              </div>
              <p className="text-sm text-muted-foreground">
                All data in transit is encrypted using TLS 1.3 with AES-256-GCM
                protocols.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-foreground font-bold">
                <Eye className="h-4 w-4 text-primary" />
                <span>Neural Isolation</span>
              </div>
              <p className="text-sm text-muted-foreground">
                AI processing occurs in isolated sandboxes to prevent
                cross-leakage of forensic data.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
