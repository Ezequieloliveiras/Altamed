"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { urlFor } from "@/sanity/image";
import type { HomeHeroSlide, SanityImage } from "@/sanity/types";

const AUTOPLAY_DELAY = 6000;
const FALLBACK_SLIDE: HomeHeroSlide = {
  _id: "fallback-home-hero",
  title: "Tecnologia e precisão para o ambiente cirúrgico",
  eyebrow: "Precisão que cuida",
  description:
    "Soluções e equipamentos selecionados para oferecer qualidade, segurança e eficiência aos profissionais da saúde.",
  primaryButtonLabel: "Conheça nossos produtos",
  primaryButtonHref: "/produtos",
  secondaryButtonLabel: "Fale conosco",
  secondaryButtonHref: "/contato",
};

function isExternalHref(href: string) {
  return /^[a-z][a-z0-9+.-]*:/i.test(href) || href.startsWith("//");
}

function getImageUrl(image?: SanityImage, width = 2200) {
  if (!image?.asset) return null;

  try {
    return urlFor(image)
      .width(width)
      .quality(82)
      .fit("crop")
      .auto("format")
      .url();
  } catch {
    return null;
  }
}

function HeroAction({
  href,
  label,
  variant = "primary",
}: {
  href?: string;
  label?: string;
  variant?: "primary" | "secondary";
}) {
  if (!href || !label) return null;

  const className = variant === "primary" ? "button" : "button button-outline";

  if (isExternalHref(href)) {
    return (
      <a
        className={className}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {label}
      </a>
    );
  }

  return (
    <Link className={className} href={href}>
      {label}
    </Link>
  );
}

function HeroImage({
  slide,
  active,
  priority,
}: {
  slide: HomeHeroSlide;
  active: boolean;
  priority: boolean;
}) {
  const desktopUrl = getImageUrl(slide.desktopImage);
  const mobileUrl = getImageUrl(slide.mobileImage, 900);
  const alt =
    slide.desktopImage?.alt?.trim() ||
    slide.mobileImage?.alt?.trim() ||
    slide.title;

  if (!desktopUrl) return null;

  return (
    <>
      <Image
        className={`hero-slide-image hero-slide-image-desktop ${
          mobileUrl ? "hero-slide-image-with-mobile" : ""
        }`}
        src={desktopUrl}
        alt={alt}
        fill
        priority={priority}
        quality={82}
        sizes="100vw"
      />
      {mobileUrl ? (
        <Image
          className="hero-slide-image hero-slide-image-mobile"
          src={mobileUrl}
          alt={alt}
          fill
          priority={priority}
          quality={82}
          sizes="100vw"
        />
      ) : null}
      {!active ? <span className="sr-only">Slide inativo</span> : null}
    </>
  );
}

export function HomeHeroCarousel({ slides }: { slides: HomeHeroSlide[] }) {
  const hasSanitySlides = slides.length > 0;
  const heroSlides = hasSanitySlides ? slides : [FALLBACK_SLIDE];
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const hasMultipleSlides = heroSlides.length > 1;

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const goToSlide = (index: number) => {
    const nextIndex = (index + heroSlides.length) % heroSlides.length;
    setActiveIndex(nextIndex);
  };

  useEffect(() => {
    if (!hasMultipleSlides || paused || prefersReducedMotion) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % heroSlides.length);
    }, AUTOPLAY_DELAY);

    return () => window.clearInterval(timer);
  }, [hasMultipleSlides, heroSlides.length, paused, prefersReducedMotion]);

  return (
    <section
      className={`hero hero-carousel ${hasSanitySlides ? "" : "hero-fallback"}`}
      aria-label="Banners principais da Altamed"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onPointerDown={(event) => {
        touchStartX.current = event.clientX;
      }}
      onPointerUp={(event) => {
        if (!hasMultipleSlides || touchStartX.current === null) return;
        const distance = event.clientX - touchStartX.current;
        touchStartX.current = null;
        if (Math.abs(distance) < 45) return;
        goToSlide(activeIndex + (distance < 0 ? 1 : -1));
      }}
    >
      <div className="hero-slides">
        {heroSlides.map((slide, index) => {
          const active = index === activeIndex;

          return (
            <div
              className={`hero-slide ${active ? "hero-slide-active" : ""}`}
              aria-hidden={!active}
              key={slide._id}
            >
              {hasSanitySlides ? (
                <HeroImage
                  slide={slide}
                  active={active}
                  priority={index === 0}
                />
              ) : null}
            </div>
          );
        })}
      </div>

      <div className="container hero-content">
        {heroSlides.map((slide, index) => {
          const active = index === activeIndex;

          return (
            <div
              className={`hero-copy ${active ? "hero-copy-active" : ""}`}
              aria-hidden={!active}
              key={`${slide._id}-copy`}
            >
              {slide.eyebrow ? (
                <p className="eyebrow">{slide.eyebrow}</p>
              ) : null}
              {index === activeIndex ? (
                <h1>{slide.title}</h1>
              ) : (
                <h2>{slide.title}</h2>
              )}
              {slide.description ? <p>{slide.description}</p> : null}
              {(slide.primaryButtonHref && slide.primaryButtonLabel) ||
              (slide.secondaryButtonHref && slide.secondaryButtonLabel) ? (
                <div className="hero-actions">
                  <HeroAction
                    href={slide.primaryButtonHref}
                    label={slide.primaryButtonLabel}
                  />
                  <HeroAction
                    href={slide.secondaryButtonHref}
                    label={slide.secondaryButtonLabel}
                    variant="secondary"
                  />
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      {hasMultipleSlides ? (
        <>
          <div className="hero-indicators" aria-label="Selecionar banner">
            {heroSlides.map((slide, index) => (
              <button
                type="button"
                aria-label={`Ir para o banner ${index + 1}`}
                aria-current={index === activeIndex ? "true" : undefined}
                key={`${slide._id}-indicator`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </>
      ) : null}
    </section>
  );
}
