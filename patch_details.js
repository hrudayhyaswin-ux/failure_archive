const fs = require('fs');

let page = fs.readFileSync('src/app/[locale]/explore/[id]/page.tsx', 'utf8');

// Ensure useTranslations is imported
if (!page.includes('useTranslations')) {
  page = page.replace('import { useParams } from "next/navigation";', 'import { useParams } from "next/navigation";\nimport { useTranslations } from "next-intl";');
}

// Ensure Link is imported from routing
page = page.replace('import Link from "next/link";', 'import { Link } from "@/i18n/routing";');

// Inject the hook
page = page.replace('export default function FailureDetailsPage() {', 'export default function FailureDetailsPage() {\n  const t = useTranslations("ExploreDetails");');

// Replacements
const replaces = [
  [/"Decrypting Archive..."/g, '{t("loading")}'],
  [/"Archive entry not found."/g, '{t("notFound")}'],
  [/"\[ESC\] Return to Database"/g, '{t("backButton")}'],
  [/"CASE: #"/g, '`CASE: #${failure.id.toString().padStart(4, "0")}`'],
  [/"Archive Status: SECURE"/g, '{t("archiveStatus")}'],
  [/"Forensic Overview"/g, '{t("forensicOverview")}'],
  [/"Failure Vectors & Timeline"/g, '{t("failureVectors")}'],
  [/"CAPITAL DEPLOYMENT"/g, 't("timelineCapital")'],
  [/"Initial architecture and funding sequence."/g, 't("timelineCapitalDesc")'],
  [/"MARKET FRICTION"/g, 't("timelineMarket")'],
  [/"Detected anomalies in market penetration."/g, 't("timelineMarketDesc")'],
  [/"TERMINAL SHUTDOWN"/g, 't("timelineTerminal")'],
  [/"System collapse and asset liquidation."/g, 't("timelineTerminalDesc")'],
  [/"Terminal Failure Cause"/g, '{t("terminalCause")}'],
  [/"Strategic Intelligence Summary"/g, '{t("intelligenceSummary")}'],
  [/"Predictive Insight"/g, '{t("predictiveInsight")}'],
  [/>Forensic vectors for </g, '>{t("forensicVectorsFor")} <'],
  [/> indicate structural </g, '>{t("indicateStructural")} <'],
  [/> instability<\/span> during the /g, '>{t("instability")}</span> {t("duringThe")} '],
  [/ cycle\./g, ' {t("cycle")}.'],
  [/"Run Simulator"/g, '{t("runSimulator")}'],
  [/"Market Metrics"/g, '{t("marketMetrics")}'],
  [/"Saturation Load"/g, '{t("saturationLoad")}'],
  [/"CRITICAL SATURATION"/g, '{t("criticalSaturation")}'],
  [/"STATUS: VOLATILE"/g, '{t("statusVolatile")}'],
  [/"Sector Mortality"/g, '{t("sectorMortality")}'],
  [/"ECOSYSTEM: "/g, '`${t("ecosystem")}: `']
];

replaces.forEach(([regex, str]) => {
  page = page.replace(regex, str);
});

fs.writeFileSync('src/app/[locale]/explore/[id]/page.tsx', page);
console.log("Details page patched.");
