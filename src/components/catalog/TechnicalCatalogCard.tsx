import Image from "next/image";
import { urlFor } from "@/sanity/image";
import type { TechnicalCatalog } from "@/sanity/types";

export function TechnicalCatalogCard({
  catalog,
}: {
  catalog: TechnicalCatalog;
}) {
  let coverUrl: string | undefined;

  try {
    coverUrl = catalog.coverImage?.asset
      ? urlFor(catalog.coverImage).width(640).height(860).fit("crop").url()
      : undefined;
  } catch {
    /* placeholder */
  }

  return (
    <article className="technical-card">
      <div className="technical-card-cover">
        {coverUrl ? (
          <Image
            src={coverUrl}
            alt={
              catalog.coverImage?.alt?.trim() ||
              `Capa do catálogo ${catalog.title}`
            }
            fill
            sizes="(max-width: 640px) 92vw, (max-width: 980px) 44vw, 30vw"
          />
        ) : (
          <span>Capa indisponível</span>
        )}
      </div>
      <div className="technical-card-body">
        <p className="eyebrow">{catalog.specialty}</p>
        <h3>{catalog.title}</h3>
        {catalog.description ? <p>{catalog.description}</p> : null}
      </div>
    </article>
  );
}
