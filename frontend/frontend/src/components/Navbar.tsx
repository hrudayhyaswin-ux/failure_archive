"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Terminal } from "lucide-react";

const navItems = [
  { name: "Explore", href: "/explore" },
  { name: "AI Analyzer", href: "/analyzer" },
  { name: "Dashboard", href: "/dashboard" },
  { name: "Submit", href: "/submit" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-primary/10 bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between px-4 mx-auto max-w-7xl">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="h-8 w-8 bg-primary/10 border border-primary/20 flex items-center justify-center rounded-sm group-hover:border-primary/50 transition-colors">
              <Terminal className="h-4 w-4 text-primary" />
            </div>
            <span className="text-sm font-black tracking-[0.2em] uppercase text-foreground">Failure Archive</span>
          </Link>
          <div className="hidden md:flex gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-[10px] font-bold uppercase tracking-[0.15em] transition-all hover:text-primary relative py-1",
                  pathname === item.href 
                    ? "text-primary after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-primary" 
                    : "text-muted-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="text-[10px] uppercase font-bold tracking-widest hover:bg-primary/5" asChild>
            <Link href="/login">Access System</Link>
          </Button>
          <Button size="sm" className="h-9 px-6 rounded-none bg-primary text-primary-foreground text-[10px] uppercase font-bold tracking-widest hover:bg-primary/90" asChild>
            <Link href="/login">Initialize</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
