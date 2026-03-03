"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="icon-button theme-toggle" aria-label="Toggle theme" disabled type="button">
        <span className="icon-placeholder" />
      </button>
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      className="icon-button theme-toggle"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      type="button"
    >
      <Image
        src={isDark ? "/icons/sun.svg" : "/icons/moon.svg"}
        alt=""
        width={18}
        height={18}
        aria-hidden="true"
      />
    </button>
  );
}
