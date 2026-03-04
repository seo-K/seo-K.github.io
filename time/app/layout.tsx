import "./reset.css";
import "./globals.css";
import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import Navbar from "../components/Navbar";
import ThemeProvider from "../components/ThemeProvider";

export const metadata: Metadata = {
  title: "Personal Site",
  description: "Personal website built with Next.js",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/logo192.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="data-color-theme" defaultTheme="light" enableSystem={false}>
          <Navbar />
          <main className="page-container">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
