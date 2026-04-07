document.addEventListener("DOMContentLoaded", () => {
  if (!window.gsap || !window.ScrollTrigger) return;

  const { gsap } = window;
  const { ScrollTrigger } = window;
  gsap.registerPlugin(ScrollTrigger);

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const allowMotion = !prefersReducedMotion;

  const nav = document.querySelector("#header nav");
  const menu = document.querySelector("#header .menu");
  const menuIndicator = document.querySelector("#header .menu-indicator");
  const navLinks = Array.from(document.querySelectorAll("#header .menu a"));
  const sections = navLinks.map((link) => document.querySelector(link.getAttribute("href"))).filter(Boolean);

  let currentSectionId = sections[0]?.id || "";

  const moveIndicator = (targetLink, immediate = false) => {
    if (!nav || !menu || !menuIndicator || !targetLink || window.innerWidth > 1024) return;

    const targetItem = targetLink.parentElement;
    if (!targetItem) return;

    const menuRect = menu.getBoundingClientRect();
    const targetRect = targetItem.getBoundingClientRect();
    const x = targetRect.left - menuRect.left;
    const y = targetRect.top - menuRect.top;
    const width = targetRect.width;
    const height = targetRect.height;

    if (immediate || !allowMotion || menuIndicator.dataset.ready !== "true") {
      gsap.set(menuIndicator, { x, y, width, height, autoAlpha: 1 });
      menuIndicator.dataset.ready = "true";
      return;
    }

    gsap.to(menuIndicator, {
      x,
      y,
      width,
      height,
      autoAlpha: 1,
      duration: 0.78,
      ease: "elastic.out(1, 0.72)",
    });
  };

  const setActiveNav = (id, immediate = false) => {
    currentSectionId = id;

    navLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${id}`;
      link.parentElement.classList.toggle("active", isActive);
      if (isActive) {
        moveIndicator(link, immediate);
      }
    });
  };

  const detectCurrentSection = () => {
    const triggerLine = window.innerHeight * 0.45;
    const activeSection = sections.find((section) => {
      const rect = section.getBoundingClientRect();
      return rect.top <= triggerLine && rect.bottom >= triggerLine;
    });

    setActiveNav((activeSection || sections[0])?.id || currentSectionId, true);
  };

  if (allowMotion) {
    gsap
      .timeline({ defaults: { ease: "power3.out" } })
      .from(".home_eyebrow", { autoAlpha: 0, y: 18, duration: 0.5 })
      .from(".home_name", { autoAlpha: 0, y: 24, duration: 0.6 }, "-=0.2")
      .from(".home_desc-wrap", { autoAlpha: 0, y: 30, duration: 0.7 }, "-=0.2")
      .from(".home_intro", { autoAlpha: 0, y: 24, duration: 0.6 }, "-=0.25");

    gsap.from(".profile_metrics li", {
      scrollTrigger: {
        trigger: ".profile_metrics",
        start: "top 80%",
      },
      autoAlpha: 0,
      y: 20,
      duration: 0.5,
      stagger: 0.08,
    });

    gsap.from(".info_group", {
      scrollTrigger: {
        trigger: ".info_content",
        start: "top 75%",
      },
      autoAlpha: 0,
      y: 32,
      duration: 0.7,
      stagger: 0.14,
    });

    gsap.from(".project_item", {
      scrollTrigger: {
        trigger: ".project_list",
        start: "top 78%",
      },
      autoAlpha: 0,
      y: 36,
      duration: 0.75,
      stagger: 0.12,
    });

    gsap.from(".project_archive li", {
      scrollTrigger: {
        trigger: ".project_archive",
        start: "top 82%",
      },
      autoAlpha: 0,
      y: 28,
      duration: 0.65,
      stagger: 0.1,
    });

    document.querySelectorAll(".project_thumb img").forEach((image) => {
      gsap.fromTo(
        image,
        { scale: 1.08 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: image,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    });
  }

  sections.forEach((section) => {
    ScrollTrigger.create({
      trigger: section,
      start: "top center",
      end: "bottom center",
      onEnter: () => setActiveNav(section.id),
      onEnterBack: () => setActiveNav(section.id),
    });
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const targetId = link.getAttribute("href")?.replace("#", "");
      if (targetId) {
        setActiveNav(targetId);
      }
    });
  });

  const syncIndicator = () => {
    const activeLink = document.querySelector(`#header .menu a[href="#${currentSectionId}"]`);
    moveIndicator(activeLink, true);
  };

  window.addEventListener("resize", syncIndicator);
  window.addEventListener("load", syncIndicator);

  detectCurrentSection();
  requestAnimationFrame(syncIndicator);
});
