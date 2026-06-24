"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Brain } from "lucide-react";

const navItems = [
  { name: "Explore", href: "/explore" },
  { name: "AI Analyzer", href: "/analyzer" },
  { name: "Dashboard", href: "/dashboard" },
  { name: "Submit", href: "/submit" },
  { name: "Security", href: "/security" },
  { name: "Legal", href: "/terms" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-white/5 bg-background/60 backdrop-blur-xl sticky top-0 z-50">
      <div className="container flex h-20 items-center justify-between px-4 mx-auto max-w-7xl">
        <div className="flex items-center gap-12">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="h-10 w-10 bg-primary/10 border border-primary/20 flex items-center justify-center rounded-xl group-hover:border-primary/50 transition-all shadow-lg shadow-primary/5 group-hover:shadow-primary/10">
              <Brain className="h-5 w-5 text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-black tracking-[0.3em] uppercase text-foreground">
                Failure Archive
              </span>
              <span className="text-[8px] font-bold tracking-[0.1em] uppercase text-primary/60">
                Intelligence Suite
              </span>
            </div>
          </Link>
          <div className="hidden md:flex gap-10">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:text-primary relative py-2",
                  pathname === item.href
                    ? "text-primary after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-primary after:rounded-full"
                    : "text-muted-foreground/60",
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-6">
          <Button
            variant="ghost"
            size="sm"
            className="text-[10px] uppercase font-black tracking-widest hover:bg-primary/5 rounded-full px-6"
            asChild
          >
            <Link href="/login">Access System</Link>
          </Button>
          <Button
            size="sm"
            className="h-11 px-8 rounded-full bg-primary text-primary-foreground text-[10px] uppercase font-black tracking-widest hover:bg-primary/90 shadow-lg shadow-primary/20 border-none"
            asChild
          >
            <Link href="/login">Initialize</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
