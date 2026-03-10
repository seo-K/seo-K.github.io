import "./reset.css";
import "./globals.css";
import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import Navbar from "../components/Navbar";
import ThemeProvider from "../components/ThemeProvider";

export const metadata: Metadata = {
  title: "강서영 | Web Publisher",
  description: "강서영 웹 퍼블리셔 포트폴리오 - 프로젝트, 블로그, UI 라이브러리 기록",
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
        <ThemeProvider attribute="data-color-theme" defaultTheme="dark" enableSystem={false}>
          <div className="skip-links">
            <a href="#main-content">본문으로 바로가기</a>
            <a href="#site-nav">메뉴로 바로가기</a>
          </div>
          <Navbar />
          <main id="main-content" className="page-container">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
