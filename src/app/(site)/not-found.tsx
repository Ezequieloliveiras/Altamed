import Link from "next/link";
export default function NotFound() {
  return (
    <section className="section container not-found">
      <p className="eyebrow">Erro 404</p>
      <h1>Esta página não foi encontrada.</h1>
      <p>
        O produto pode ter sido removido ou estar temporariamente indisponível.
      </p>
      <Link className="button" href="/produtos">
        Ver produtos
      </Link>
    </section>
  );
}
