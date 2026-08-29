import { useEffect, useRef, useState } from "react";

const links = [
  ["Início", "inicio"],
  ["Essência", "essencia"],
  ["Organização", "equipe"],
  ["Como Atuamos", "atuacao"],
  ["Jornal", "jornal"],
  ["Avaliação", "avaliacao"],
  ["Contato", "contato"],
];
export default function Navbar() {
  const [open, setOpen] = useState(false),
    [scrolled, setScrolled] = useState(false),
    [active, setActive] = useState("inicio");
  const headerRef = useRef(null);
  useEffect(() => {
    const fn = () => setScrolled(scrollY > 24);
    addEventListener("scroll", fn, { passive: true });
    return () => removeEventListener("scroll", fn);
  }, []);
  useEffect(() => {
    const sections = links
      .map(([, id]) => document.getElementById(id))
      .filter(Boolean);
    const observer = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-35% 0px -55%" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const close = (e) => {
      if (
        e.key === "Escape" ||
        (open && !headerRef.current?.contains(e.target))
      )
        setOpen(false);
    };
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", close);
    document.body.classList.toggle("menu-open", open);
    return () => {
      document.removeEventListener("keydown", close);
      document.removeEventListener("pointerdown", close);
      document.body.classList.remove("menu-open");
    };
  }, [open]);
  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };
  return (
    <header
      ref={headerRef}
      className={`nav ${scrolled ? "nav--scrolled" : ""}`}
    >
      <button
        className="brand"
        onClick={() => go("inicio")}
        aria-label="Ir ao início"
      >
        <i className="bi bi-leaf" /> TEKOÁ
      </button>
      <nav
        id="main-navigation"
        className={open ? "navlinks open" : "navlinks"}
        aria-label="Navegação principal"
      >
        <div className="mobile-nav-head">
          <span>Explorar</span>
          <small>Projeto TEKOÁ</small>
        </div>
        {links.slice(0, -1).map(([t, id], index) => (
          <button
            className={active === id ? "active" : ""}
            key={id}
            onClick={() => go(id)}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            {t}
          </button>
        ))}
        <button className="mobile-contact" onClick={() => go("contato")}>
          Fale conosco <i className="bi bi-arrow-up-right" />
        </button>
      </nav>
      <button className="nav-contact" onClick={() => go("contato")}>
        Fale conosco <i className="bi bi-arrow-up-right" />
      </button>
      <button
        className="menu"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="main-navigation"
        aria-label={open ? "Fechar menu" : "Abrir menu"}
      >
        <i className={`bi ${open ? "bi-x-lg" : "bi-list"}`} />
      </button>
    </header>
  );
}
