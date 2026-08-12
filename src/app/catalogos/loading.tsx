import { CatalogNavigation } from "@/components/catalog/CatalogNavigation";

export default function TechnicalCatalogsLoading() {
  return (
    <section className="section container" aria-live="polite" aria-busy="true">
      <div className="section-heading">
        <h1>Catálogos Técnicos</h1>
      </div>
      <CatalogNavigation active="technical" />
      <div className="technical-grid" aria-label="Carregando catálogos">
        {[1, 2, 3].map((item) => (
          <div className="card skeleton-card" key={item} />
        ))}
      </div>
    </section>
  );
}
