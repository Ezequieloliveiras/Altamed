"use client";
import Image from "next/image";
import { useState } from "react";
import { urlFor } from "@/sanity/image";
import type { SanityImage } from "@/sanity/types";
export function ProductGallery({
  images = [],
  name,
}: {
  images?: SanityImage[];
  name: string;
}) {
  const [selected, setSelected] = useState(0);
  const main = images[selected];
  let source: string | undefined;
  try {
    source = main?.asset
      ? urlFor(main).width(1000).height(750).fit("crop").url()
      : undefined;
  } catch {
    /* placeholder */
  }
  return (
    <section className="gallery">
      {" "}
      <div className="gallery-main">
        {source ? (
          <Image
            src={source}
            alt={main.alt?.trim() || name || "Imagem do produto"}
            fill
            priority
            sizes="(max-width: 800px) 100vw, 50vw"
          />
        ) : (
          <span>Imagem do produto indisponível</span>
        )}
      </div>
      {images.length > 1 && (
        <div className="thumbnails">
          {images.map((image, i) => {
            let thumb: string | undefined;
            try {
              thumb = image.asset
                ? urlFor(image).width(160).height(120).fit("crop").url()
                : undefined;
            } catch {}
            return (
              <button
                aria-label={`Ver imagem ${i + 1}`}
                className={i === selected ? "selected" : ""}
                onClick={() => setSelected(i)}
                key={i}
              >
                {thumb ? (
                  <Image
                    src={thumb}
                    alt={image.alt?.trim() || `${name || "Produto"} ${i + 1}`}
                    fill
                    sizes="100px"
                  />
                ) : (
                  "Imagem"
                )}
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}
