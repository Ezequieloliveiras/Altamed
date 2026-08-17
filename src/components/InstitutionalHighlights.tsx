"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Reveal } from "./Reveal";

const highlights = [
  {
    number: "01",
    title: "Tecnologia aplicada",
    description:
      "Equipamentos e soluções selecionados para atender às exigências do ambiente cirúrgico.",
  },
  {
    number: "02",
    title: "Qualidade e segurança",
    description:
      "Produtos selecionados com foco em confiabilidade, desempenho e segurança.",
  },
  {
    number: "03",
    title: "Atendimento especializado",
    description:
      "Suporte próximo para encontrar soluções adequadas às necessidades de cada instituição.",
  },
];

export function InstitutionalHighlights() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!section || reduceMotion.matches) return;

    let frame = 0;
    const updateParallax = () => {
      const bounds = section.getBoundingClientRect();
      const progress =
        (window.innerHeight - bounds.top) /
        (window.innerHeight + bounds.height);
      const offset = Math.max(-40, Math.min(40, (progress - 0.5) * 80));
      section.style.setProperty("--parallax-y", `${offset.toFixed(1)}px`);
      frame = 0;
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateParallax);
    };

    updateParallax();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      className="quality-section"
      aria-labelledby="quality-title"
      ref={sectionRef}
    >
      <div className="quality-background" aria-hidden="true">
        <Image
          src="/images/hero-cirurgico.png"
          alt=""
          fill
          sizes="100vw"
          priority={false}
        />
      </div>
      <div className="quality-overlay" aria-hidden="true" />
      <div className="container quality-layout">
        <Reveal className="quality-content">
          <p className="quality-label">Qualidade e tecnologia</p>
          <h2 id="quality-title">
            Precisão, tecnologia e confiança em cada solução.
          </h2>
          <p className="quality-description">
            A ALTAMED reúne soluções confiáveis para apoiar profissionais e
            instituições de saúde em cada etapa da rotina cirúrgica.
          </p>
          <div className="quality-highlights">
            {highlights.map((highlight) => (
              <article className="quality-item" key={highlight.number}>
                <span className="quality-number" aria-hidden="true">
                  {highlight.number}
                </span>
                <div>
                  <h3>{highlight.title}</h3>
                  <p>{highlight.description}</p>
                </div>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
