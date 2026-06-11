import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search, Zap, Globe, Shield, TrendingUp } from "lucide-react";

export default function Home() {
  const t = useTranslations("Home");

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="hero-shell relative w-full py-24 lg:py-40 flex flex-col items-center text-center px-4 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/10 rounded-full blur-[120px] animate-pulse delay-700"></div>
        </div>
        <div className="hero-gradient-bg" aria-hidden="true"></div>
        <div className="hero-particles" aria-hidden="true">
          {Array.from({ length: 18 }).map((_, i) => (
            <span key={i}></span>
          ))}
        </div>

        <div className="container mx-auto max-w-5xl relative hero-content">
          <div className="hero-kicker inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-widest uppercase mb-8">
            <TrendingUp className="h-3 w-3" />
            {t("heroKicker")}
          </div>
          
          <h1 className="hero-title text-6xl md:text-8xl font-serif font-black tracking-tight text-foreground mb-8 leading-[1.1]">
            {t.rich("heroTitle", {
              br: () => <br />,
              span: (chunks) => <span className="text-gradient">{chunks}</span>
            })}
          </h1>
          
          <p className="hero-copy text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            {t("heroCopy")}
          </p>
          
          <div className="hero-actions flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button size="lg" className="px-10 h-14 text-lg rounded-full glow-primary glow-cta hover-lift hover-scale" asChild>
              <Link href="/explore">
                {t("exploreButton")} <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="px-10 h-14 text-lg rounded-full glass glow-cta-subtle hover-lift hover-scale" asChild>
              <Link href="/analyzer">
                {t("analyzerButton")}
              </Link>
            </Button>
          </div>
          
          <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-12 border-t border-border/50 pt-12 animate-in fade-in duration-1000 delay-700">
            {[
              { label: t("stats.cases"), value: "1,200+" },
              { label: t("stats.industries"), value: "85+" },
              { label: t("stats.insights"), value: "25k+" },
              { label: t("stats.conversion"), value: "94%" },
            ].map((stat, i) => (
              <div key={i} className="group">
                <p className="text-4xl font-serif font-bold text-foreground group-hover:text-primary transition-colors">{stat.value}</p>
                <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Features Section */}
      <section className="w-full py-32 px-4 bg-foreground/[0.02]">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-foreground">{t("featuresTitle")}</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t("featuresCopy")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Search className="h-7 w-7" />,
                title: t("features.repository.title"),
                desc: t("features.repository.desc"),
                color: "bg-blue-500/10 text-blue-600"
              },
              {
                icon: <Zap className="h-7 w-7" />,
                title: t("features.analysis.title"),
                desc: t("features.analysis.desc"),
                color: "bg-amber-500/10 text-amber-600"
              },
              {
                icon: <Shield className="h-7 w-7" />,
                title: t("features.mitigation.title"),
                desc: t("features.mitigation.desc"),
                color: "bg-teal-500/10 text-teal-600"
              }
            ].map((feature, i) => (
              <div key={i} className="group p-8 glass hover:bg-white transition-all duration-500 rounded-3xl border-border/50 hover:shadow-2xl hover:-translate-y-2">
                <div className={`h-14 w-14 ${feature.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-serif font-bold mb-4 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Statement */}
      <section className="w-full py-40 flex flex-col items-center text-center px-4 relative overflow-hidden bg-primary">
        <div className="absolute inset-0 opacity-10 grid-pattern"></div>
        <div className="container mx-auto max-w-4xl relative z-10">
          <Globe className="h-16 w-16 text-primary-foreground/40 mx-auto mb-10" />
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-primary-foreground mb-10 leading-tight">
            &quot;{t("vision")}&quot;
          </h2>
          <p className="text-primary-foreground/70 text-xl font-medium uppercase tracking-[0.3em]">
            {t("visionAuthor")}
          </p>
        </div>
      </section>
    </div>
  );
}
