"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { getFailures, Failure } from "@/lib/api";
import { translateFailure } from "@/lib/translations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#3b82f6", "#8b5cf6", "#14b8a6", "#f59e0b", "#ef4444"];
type CategoryDatum = { name: string; value: number };
type IndustryDatum = { name: string; count: number };

export default function DashboardPage() {
  const t = useTranslations("Dashboard");
  const locale = useLocale();
  const [failures, setFailures] = useState<Failure[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFailures().then((data) => {
      const translatedData = data.map((f) => translateFailure(f, locale));
      setFailures(translatedData);
      setLoading(false);
    });
  }, [locale]);

  const categoryData = failures.reduce<CategoryDatum[]>((acc, f) => {
    const existing = acc.find((item) => item.name === f.category);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: f.category, value: 1 });
    }
    return acc;
  }, []);

  const industryData = failures.reduce<IndustryDatum[]>((acc, f) => {
    const existing = acc.find((item) => item.name === f.industry);
    if (existing) {
      existing.count += 1;
    } else {
      acc.push({ name: f.industry, count: 1 });
    }
    return acc;
  }, []);

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="mb-8 flex flex-col gap-2">
        <h1 className="text-4xl font-bold text-slate-900">{t("title")}</h1>
        {loading && (
          <p className="text-sm text-muted-foreground">{t("loading")}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 uppercase tracking-wider">
              {t("totalFailures")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{failures.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 uppercase tracking-wider">
              {t("topCategory")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">
              {[...categoryData].sort((a, b) => b.value - a.value)[0]?.name ||
                "N/A"}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 uppercase tracking-wider">
              {t("lessonsLearned")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{failures.length * 3}+</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>{t("failuresByIndustry")}</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={industryData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("categoryDistribution")}</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent ? percent * 100 : 0).toFixed(0)}%`
                  }
                  outerRadius={130}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-10">
        <CardHeader>
          <CardTitle>{t("recentSubmissions")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {failures
              .slice(-3)
              .reverse()
              .map((f) => (
                <div
                  key={f.id}
                  className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                >
                  <div>
                    <div className="font-bold">{f.title}</div>
                    <div className="text-sm text-slate-500">
                      {f.industry} • {f.year}
                    </div>
                  </div>
                  <div className="text-sm font-medium text-primary">
                    {t("viewDetails")}
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
