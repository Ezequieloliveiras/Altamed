import Link from "next/link";
export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div>
          <strong>ALTAMED</strong>
          <p>Soluções e materiais para a área cirúrgica.</p>
        </div>
        <div>
          <Link href="/produtos">Produtos</Link>
          <Link href="/sobre">Sobre</Link>
          <Link href="/contato">Contato</Link>
        </div>
      </div>
      <div className="container copyright">
        © {new Date().getFullYear()} Altamed. Todos os direitos reservados.
      </div>
    </footer>
  );
}
