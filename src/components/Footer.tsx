import Link from "next/link";
export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <strong>ALTAMED</strong>
          <p>Soluções e materiais para o ambiente cirúrgico.</p>
        </div>
        <div className="footer-links">
          <strong>Navegação</strong>
          <Link href="/produtos">Produtos</Link>
          <Link href="/sobre">Sobre</Link>
          <Link href="/contato">Contato</Link>
        </div>
        <div className="footer-links">
          <strong>Atendimento</strong>
          <a href="/contato">Solicitar atendimento</a>
          <a href="/contato">Fale conosco</a>
        </div>
      </div>
      <div className="container copyright">
        © {new Date().getFullYear()} Altamed. Todos os direitos reservados.
      </div>
    </footer>
  );
}
