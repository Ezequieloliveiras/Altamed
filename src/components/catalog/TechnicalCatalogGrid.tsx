import type { TechnicalCatalog } from "@/sanity/types";
import { Reveal } from "@/components/Reveal";
import { TechnicalCatalogCard } from "./TechnicalCatalogCard";

export function TechnicalCatalogGrid({
  catalogs,
}: {
  catalogs: TechnicalCatalog[];
}) {
  return (
    <div className="technical-grid">
      {catalogs.map((catalog, index) => (
        <Reveal key={catalog._id} delay={index * 80}>
          <TechnicalCatalogCard catalog={catalog} />
        </Reveal>
      ))}
    </div>
  );
}
