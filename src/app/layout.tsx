import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

/* Self-hosted JetBrains Mono (variable 300-800) — no runtime Google fetch */
const jetbrains = localFont({
  variable: "--font-jetbrains",
  display: "swap",
  src: [
    {
      path: "../fonts/jetbrains-mono-latin.woff2",
      weight: "300 800",
      style: "normal",
    },
    {
      path: "../fonts/jetbrains-mono-latin-ext.woff2",
      weight: "300 800",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: "SNOWFLAKE // NEXUS — Visual Lab Console",
  description:
    "Fully graphical interactive web experience for Snowflake: architecture, virtual warehouses, ingestion, staging, Snowpipe pipelines, governance and hands-on labs from Data Warehousing & Data Engineering — visualized in real-time 3D and animated flow diagrams.",
  keywords: [
    "Snowflake",
    "visualizer",
    "data warehouse",
    "Three.js",
    "interactive",
    "Snowpipe",
    "virtual warehouse",
    "labs",
    "DORA",
  ],
  icons: {
    icon: "/icon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#04070d",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${jetbrains.variable} antialiased bg-background text-foreground font-mono min-h-screen flex flex-col`}
      >
        {children}
      </body>
    </html>
  );
}
