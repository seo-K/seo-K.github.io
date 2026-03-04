"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

export default function HomePage() {
  const scrollSectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let cleanup: (() => void) | undefined;

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      gsap.registerPlugin(ScrollTrigger);
      const scrollItem = gsap.utils.toArray<HTMLElement>(".main-scroll__inner");
      const scrollText = gsap.timeline();
      scrollText
        // .set($("#section2 .t1"), { css: { zIndex: 1 } }) // set is basically a 0-second duration tween
        .from(scrollItem[0], { autoAlpha: 0, duration: 1, y: 100 }, "+=1")
        .from(scrollItem[1], { autoAlpha: 0, duration: 1, y: 100 }, "+=1")
        .from(scrollItem[2], { autoAlpha: 0, duration: 1, y: 100 }, "+=1")
        .from(scrollItem[3], { autoAlpha: 0, duration: 1, y: 100 }, "+=1")
      ScrollTrigger.create({
        animation: scrollText,
        trigger: "#section2",
        start: "top top",
        end: "+=4000",
        scrub: true,
        pin: true,
        anticipatePin: 1,
        markers: true,
      });
    };

    void init();

    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <>
      <section className="main-visual">
        {/* <div className="main-visual__inner"> */}
        <hgroup className="main-visual__title">
          <h1>Alex Chen</h1>
          <h2>Web Pub</h2>
        </hgroup>
        <p className="main-visual__desc">Crafting beautiful, performant web experiences with modern technologies.<br />
          Specializing in interactive UI components and smooth animations.</p>

        <div className="main-visual__badge-list">
          <div className="main-visual__badge card-line">React</div>
          <div className="main-visual__badge card-line">JavaScript</div>
          <div className="main-visual__badge card-line">CSS</div>
          <div className="main-visual__badge card-line">Three.js</div>
          <div className="main-visual__badge card-line">GSAP</div>
        </div>

        <div className="main-visual__button-wrap">
          <Link href="/blog" className="basic-button">
            <div className="basic-button-icon"></div>
            <div className="basic-button-text">Read Blog</div>
          </Link>
          <Link href="/library" className="basic-line-button">
            <div className="basic-button-icon"></div>
            <div className="basic-button-text">Explore UI Library</div>
          </Link>
        </div>
        <div className="main-visual__scroll">
          <span>Scroll</span>
          <span className="scroll-icon"></span>
        </div>
        {/* </div> */}
      </section>
      <section className="page-section">
        <h1>Home</h1>
        <p className="page-description">개인 사이트 기본 구조입니다. 아래에서 각 섹션으로 이동하세요.</p>

        <div className="card-grid">
          <Link href="/blog" className="card-link card-line">
            <h2>Blog</h2>
            <p>글 목록과 상세 페이지</p>
          </Link>
          <Link href="/portfolio" className="card-link card-line">
            <h2>Portfolio</h2>
            <p>프로젝트 목록과 상세 페이지</p>
          </Link>
          <Link href="/library" className="card-link card-line">
            <h2>Library</h2>
            <p>자료 목록과 상세 페이지</p>
          </Link>
        </div>
      </section>
      <section className="main-scroll" ref={scrollSectionRef} id="section2">
        <div className="main-scroll__inner">
          <p>Design Systems</p>
        </div>
        <div className="main-scroll__inner">
          <p>Ship Faster</p>
        </div>
        <div className="main-scroll__inner">
          <p>Craft Interactions</p>
        </div>
        <div className="main-scroll__inner">
          <p>Build Beautiful</p>
        </div>
      </section>
    </>
  );
}
