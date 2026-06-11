"use client";

import { useState } from "react";
import { usePathname, useRouter, Link } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Brain, Menu, X, Globe } from "lucide-react";

const navItems = [
  { nameKey: "explore", href: "/explore" },
  { nameKey: "analyzer", href: "/analyzer" },
  { nameKey: "dashboard", href: "/dashboard" },
  { nameKey: "submit", href: "/submit" },
];

export default function Navbar() {
  const t = useTranslations("Navbar");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  const toggleLanguage = () => {
    const nextLocale = locale === "en" ? "te" : "en";
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-background/70 shadow-[0_1px_0_rgba(255,255,255,0.06),0_10px_35px_rgba(86,45,170,0.18)] backdrop-blur-2xl backdrop-saturate-150 before:pointer-events-none before:absolute before:inset-x-0 before:bottom-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-primary/60 before:to-transparent after:pointer-events-none after:absolute after:inset-x-8 after:bottom-[-1px] after:h-px after:bg-primary/35 after:blur-sm">
      <div className="container mx-auto flex min-h-20 max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 md:flex-nowrap md:gap-8 md:py-0">
        <div className="flex min-w-0 flex-1 items-center gap-6 lg:gap-12">
          <Link href="/" className="group flex min-w-0 items-center space-x-3" onClick={() => setIsMobileOpen(false)}>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 shadow-lg shadow-primary/10 transition-all duration-300 ease-out group-hover:-translate-y-0.5 group-hover:border-primary/60 group-hover:bg-primary/15 group-hover:shadow-primary/25">
              <Brain className="h-5 w-5 text-primary transition-transform duration-300 ease-out group-hover:scale-110" />
            </div>
            <div className="flex min-w-0 flex-col">
              <span className="truncate text-xs font-black uppercase tracking-[0.3em] text-foreground">{t("title")}</span>
              <span className="text-[8px] font-bold tracking-[0.1em] uppercase text-primary/60">{t("subtitle")}</span>
            </div>
          </Link>
          <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] p-1 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href as string}
                className={cn(
                  "relative rounded-full px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-primary/10 hover:text-primary hover:shadow-[0_8px_24px_rgba(126,87,255,0.18)]",
                  isActive(item.href)
                    ? "bg-primary/15 text-primary shadow-[inset_0_0_0_1px_rgba(168,135,255,0.24),0_8px_24px_rgba(126,87,255,0.2)] after:absolute after:inset-x-4 after:bottom-1 after:h-px after:rounded-full after:bg-primary"
                    : "text-muted-foreground/70"
                )}
              >
                {t(item.nameKey)}
              </Link>
            ))}
          </div>
        </div>
        <div className="hidden items-center gap-3 md:flex">
          <Button 
            variant="ghost" 
            size="sm" 
            className="rounded-full px-3 text-[10px] font-black uppercase tracking-widest transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-primary/10 hover:text-primary"
            onClick={toggleLanguage}
          >
            <Globe className="mr-2 h-4 w-4" /> {locale === "en" ? "Telugu" : "English"}
          </Button>
          <Button variant="ghost" size="sm" className="rounded-full px-5 text-[10px] font-black uppercase tracking-widest transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-primary/10 hover:text-primary" asChild>
            <Link href="/login">{t("accessSystem")}</Link>
          </Button>
          <Button size="sm" className="h-11 rounded-full border-none bg-primary px-7 text-[10px] font-black uppercase tracking-widest text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-primary/40" asChild>
            <Link href="/login">{t("initialize")}</Link>
          </Button>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full border border-white/10 bg-white/[0.03] text-foreground transition-all duration-300 ease-out hover:bg-primary/10 hover:text-primary md:hidden"
          aria-label={isMobileOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMobileOpen}
          onClick={() => setIsMobileOpen((open) => !open)}
        >
          {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
        <div
          className={cn(
            "grid w-full overflow-hidden transition-all duration-300 ease-out md:hidden",
            isMobileOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          )}
        >
          <div className="min-h-0">
            <div className="mt-2 flex flex-col gap-2 border-t border-white/10 pt-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href as string}
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    "rounded-lg px-4 py-3 text-[11px] font-black uppercase tracking-[0.18em] transition-all duration-300 ease-out",
                    isActive(item.href)
                      ? "bg-primary/15 text-primary shadow-[inset_2px_0_0_var(--primary)]"
                      : "text-muted-foreground/75 hover:bg-primary/10 hover:text-primary"
                  )}
                >
                  {t(item.nameKey)}
                </Link>
              ))}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-primary/10 hover:text-primary"
                  onClick={toggleLanguage}
                >
                  <Globe className="mr-2 h-4 w-4" /> {locale === "en" ? "TE" : "EN"}
                </Button>
                <Button variant="ghost" size="sm" className="rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-primary/10 hover:text-primary" asChild>
                  <Link href="/login" onClick={() => setIsMobileOpen(false)}>{t("accessSystem")}</Link>
                </Button>
                <Button size="sm" className="rounded-full border-none bg-primary text-[10px] font-black uppercase tracking-widest text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90" asChild>
                  <Link href="/login" onClick={() => setIsMobileOpen(false)}>{t("initialize")}</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

