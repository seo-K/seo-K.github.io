"use client";

import { useEffect, useRef } from "react";

type HomeHeroProps = {
  eyebrow: string;
  lines: string[];
  statement: string;
  supporting: string;
  scrollLabel: string;
};

export default function HomeHero({
  eyebrow,
  lines,
  statement,
  supporting,
  scrollLabel,
}: HomeHeroProps) {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let active = true;
    let context: { revert: () => void } | undefined;

    const init = async () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const root = rootRef.current;
      if (!root) return;

      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (!active) return;

      gsap.registerPlugin(ScrollTrigger);

      context = gsap.context(() => {
        const intro = gsap.timeline({ defaults: { ease: "power3.out" } });

        intro
          .from(".home-visual__eyebrow", { autoAlpha: 0, y: 20, duration: 0.5 })
          .from(
            ".home-visual__line",
            {
              autoAlpha: 0,
              yPercent: 115,
              rotateX: -28,
              transformOrigin: "50% 100%",
              duration: 0.9,
              stagger: 0.1,
            },
            "-=0.15",
          )
          .from(
            [".home-visual__statement", ".home-visual__supporting"],
            { autoAlpha: 0, y: 22, duration: 0.55, stagger: 0.08 },
            "-=0.28",
          )
          .from(".home-visual__scroll", { autoAlpha: 0, y: 16, duration: 0.45 }, "-=0.2");

        gsap.to(".home-visual__orb--lg", {
          xPercent: 8,
          yPercent: -6,
          duration: 12,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.to(".home-visual__orb--sm", {
          xPercent: -10,
          yPercent: 10,
          duration: 9,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.to(".home-visual__ring", {
          rotate: 18,
          duration: 16,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.to(".home-visual__stack", {
          yPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom top",
            scrub: 0.8,
          },
        });

        gsap.to(".home-visual__backdrop", {
          yPercent: 18,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });

        document.querySelectorAll<HTMLElement>("[data-reveal='section']").forEach((section) => {
          const items = section.querySelectorAll(".home-section__heading, .home-card");
          if (items.length === 0) return;

          gsap.from(items, {
            autoAlpha: 0,
            y: 28,
            duration: 0.75,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 78%",
            },
          });
        });
      }, root);
    };

    void init();

    return () => {
      active = false;
      context?.revert();
    };
  }, []);

  return (
    <section ref={rootRef} className="home-visual">
      <div className="home-visual__backdrop" aria-hidden="true">
        <span className="home-visual__noise" />
        <span className="home-visual__orb home-visual__orb--lg" />
        <span className="home-visual__orb home-visual__orb--sm" />
        <span className="home-visual__ring" />
        <span className="home-visual__line-grid home-visual__line-grid--x" />
        <span className="home-visual__line-grid home-visual__line-grid--y" />
      </div>

      <div className="home-visual__inner">
        <p className="home-visual__eyebrow">{eyebrow}</p>
        <div className="home-visual__stack" aria-label={statement}>
          {lines.map((line) => (
            <div key={line} className="home-visual__line-wrap">
              <span className="home-visual__line">{line}</span>
            </div>
          ))}
        </div>
        <div className="home-visual__copy">
          <p className="home-visual__statement">{statement}</p>
          <p className="home-visual__supporting">{supporting}</p>
        </div>
        <a href="#selected-work" className="home-visual__scroll">
          <span>Scroll</span>
          <strong>{scrollLabel}</strong>
        </a>
      </div>
    </section>
  );
}
