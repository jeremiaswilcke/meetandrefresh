"use client";

import { useEffect, useRef } from "react";

type ParallaxQuoteDividerProps = {
  src: string;
  quote: string;
  author: string;
  position?: string;
};

export function ParallaxQuoteDivider({
  src,
  quote,
  author,
  position = "center",
}: ParallaxQuoteDividerProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const content = contentRef.current;

    if (!section || !image || !content) {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      return;
    }

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;

      if (rect.bottom < -120 || rect.top > viewportHeight + 120) {
        return;
      }

      const centerDistance = (rect.top + rect.height / 2 - viewportHeight / 2) / viewportHeight;
      const imageShift = Math.max(-95, Math.min(95, centerDistance * -120));
      const contentShift = Math.max(-18, Math.min(18, centerDistance * 28));

      image.style.transform = `translate3d(0, ${imageShift}px, 0) scale(1.18)`;
      content.style.transform = `translate3d(0, ${contentShift}px, 0)`;
    };

    const requestUpdate = () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <section ref={sectionRef} className="quote-divider image-divider" aria-label={`Zitat von ${author}`}>
      <div
        ref={imageRef}
        className="quote-divider__bg"
        style={{
          backgroundImage: `url(${src})`,
          backgroundPosition: position,
        }}
        aria-hidden
      />
      <div className="quote-divider__overlay" />
      <figure ref={contentRef} className="quote-divider__content">
        <blockquote>{quote}</blockquote>
        <figcaption>{author}</figcaption>
      </figure>
    </section>
  );
}
