const footerLinks = [
  ["Início", "inicio"],
  ["Equipe", "equipe"],
  ["Jornal", "jornal"],
  ["Avaliação", "avaliacao"],
  ["Contato", "contato"],
];
export default function Footer() {
  const go = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <footer>
      <div className="footer-main">
        <div>
          <div className="footer-brand">
            <i className="bi bi-leaf" /> TEKOÁ
          </div>
          <p>Conscientização, Educação e Harmonia com a Natureza</p>
          <p>Projeto Gestores do Futuro | ESPRO</p>
        </div>
        <nav aria-label="Links do rodapé">
          {footerLinks.map(([label, id]) => (
            <button key={id} onClick={() => go(id)}>
              {label}
            </button>
          ))}
        </nav>
        <div className="footer-contact">
          <span>Contato institucional</span>
          <a href="mailto:tekoa.espro@gmail.com">
            tekoa.espro@gmail.com <i className="bi bi-arrow-up-right" />
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <small>© 2026 TEKOÁ</small>
        <small>Educação para transformar o amanhã.</small>
      </div>
    </footer>
  );
}
