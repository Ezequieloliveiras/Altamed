"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export interface GalleryImage { id?: string; src: string; alt: string; title?: string; description?: string }

export function AboutGallery({ images }: { images: GalleryImage[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const close = useCallback(() => setActiveIndex(null), []);
  const previous = useCallback(() => setActiveIndex((current) => current === null ? null : (current - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setActiveIndex((current) => current === null ? null : (current + 1) % images.length), [images.length]);
  useEffect(() => {
    if (activeIndex === null) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") close(); if (event.key === "ArrowLeft") previous(); if (event.key === "ArrowRight") next(); };
    document.addEventListener("keydown", onKeyDown); document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKeyDown); document.body.style.overflow = ""; };
  }, [activeIndex, close, next, previous]);
  const active = activeIndex === null ? null : images[activeIndex];
  return <>
    <div className="about-gallery">{images.map((image, index) => <button className="about-gallery-item" type="button" key={image.id || `${image.src}-${index}`} onClick={() => setActiveIndex(index)} aria-label={`Ampliar imagem ${index + 1}: ${image.alt}`}><Image src={image.src} alt={image.alt} fill sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 35vw" />{image.title && <span>{image.title}</span>}</button>)}</div>
    {active && activeIndex !== null && <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label="Visualização ampliada da galeria" onClick={close}>
      <button className="lightbox-close" type="button" onClick={close} aria-label="Fechar galeria">×</button><button className="lightbox-arrow lightbox-previous" type="button" onClick={(event) => { event.stopPropagation(); previous(); }} aria-label="Imagem anterior">‹</button>
      <figure className="lightbox-figure" onClick={(event) => event.stopPropagation()}><div className="lightbox-image"><Image src={active.src} alt={active.alt} fill sizes="90vw" priority /></div><figcaption>{active.title && <strong>{active.title}</strong>}{active.description && <span>{active.description}</span>}<small>{activeIndex + 1} / {images.length}</small></figcaption></figure>
      <button className="lightbox-arrow lightbox-next" type="button" onClick={(event) => { event.stopPropagation(); next(); }} aria-label="Próxima imagem">›</button>
    </div>}
  </>;
}
