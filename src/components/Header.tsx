import Link from "next/link";
export function Header() {
  return (
    <header className="header">
      <div className="container nav">
        <Link className="brand" href="/">
          ALTAMED<span>.</span>
        </Link>
        <nav aria-label="Navegação principal">
          <Link href="/">Início</Link>
          <Link href="/produtos">Produtos</Link>
          <Link href="/sobre">Sobre</Link>
          <Link href="/contato">Contato</Link>
        </nav>
      </div>
    </header>
  );
}
