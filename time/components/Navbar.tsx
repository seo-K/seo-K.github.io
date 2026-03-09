"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { href: "/blog", label: "Blog" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/library", label: "Library" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const pathname = usePathname();
  const currentPath = pathname ?? "";

  return (
    <header className="site-header">
      <nav className="navbar" aria-label="Main navigation">
        <Link href="/" className="logo-link">
          Logo
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
          <button type="button" className="icon-button" aria-label="Search">
            <Image src="/icons/search.svg" alt="" width={18} height={18} aria-hidden="true" />
          </button>
          <ThemeToggle />
          <a
            href="https://github.com"
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
