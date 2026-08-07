export default function ProductsLoading() {
  return (
    <section className="section container" aria-live="polite" aria-busy="true">
      <div className="section-heading">
        <p className="eyebrow">Catálogo</p>
        <h1>Produtos</h1>
      </div>
      <div className="catalogue-skeleton">
        <span />
        <span />
      </div>
      <div className="product-grid" aria-label="Carregando produtos">
        {[1, 2, 3, 4].map((item) => (
          <div className="card skeleton-card" key={item} />
        ))}
      </div>
    </section>
  );
}
