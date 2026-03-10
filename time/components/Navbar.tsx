"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/library", label: "Library" },
];

export default function Navbar() {
  const pathname = usePathname();
  const currentPath = pathname ?? "";

  return (
    <header className="site-header">
      <nav id="site-nav" className="navbar" aria-label="Main navigation">
        <Link href="/" className="logo-link">
          KANG SEOYOUNG
        </Link>

        <div className="nav-scroll">
          <ul className="nav-list">
            {navItems.map((item) => {
              const isActive =
                currentPath === item.href || currentPath.startsWith(`${item.href}/`);

              return (
                <li key={item.href}>
                  <Link href={item.href} className={`nav-link ${isActive ? "active" : ""}`}>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="nav-actions">
          <ThemeToggle />
          <a
            href="https://github.com/seo-K"
            className="icon-button"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <Image src="/icons/github.svg" alt="" width={18} height={18} aria-hidden="true" />
          </a>
        </div>
      </nav>
    </header>
  );
}
