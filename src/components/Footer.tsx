import Image from "next/image";
import Link from "next/link";
export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <Link className="footer-logo" href="/" aria-label="Altamed — página inicial">
            <Image
              src="/images/logoaltamed.svg"
              alt="Altamed — Produtos cirúrgicos e hospitalares"
              width={205}
              height={49}
            />
          </Link>
          <p>Soluções e materiais para o ambiente cirúrgico.</p>
        </div>
        <div className="footer-links">
          <strong>Navegação</strong>
          <Link href="/produtos">Produtos</Link>
          <Link href="/sobre">Sobre</Link>
          <Link href="/licencas-e-certificacoes">Licenças e Certificações</Link>
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
