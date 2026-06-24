"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { ArrowLeft } from "lucide-react";

export default function LoginPage() {
  const t = useTranslations("Login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    alert(t("comingSoon"));
  };

  return (
    <div className="container mx-auto flex items-center justify-center min-h-[80vh] px-4">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> {t("backToHome")}
        </Link>

        <Card className="border-border shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              {t("title")}
            </CardTitle>
            <CardDescription className="text-center">
              {t("description")}
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <label
                htmlFor="email"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {t("email")}
              </label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <label
                htmlFor="password"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {t("password")}
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button className="w-full h-11" onClick={handleLogin}>
              {t("loginButton")}
            </Button>
            <p className="mt-4 text-center text-sm text-muted-foreground">
              {t("noAccount")}{" "}
              <Link href="/login" className="text-primary hover:underline">
                {t("signUp")}
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
