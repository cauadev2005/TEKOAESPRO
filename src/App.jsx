import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Reveal, SectionTitle } from "./components/UI";

const BI = ({ name }) => <i className={`bi bi-${name}`} />;
function useModalBehavior(open, close) {
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const key = (e) => e.key === "Escape" && close();
    document.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", key);
    };
  }, [open, close]);
}
const identity = [
  {
    icon: "flower1",
    n: "01",
    title: "Missão",
    text: "Conscientizar a população sobre o cuidado e o convívio do ser humano com o meio ambiente.",
  },
  {
    icon: "eye",
    n: "02",
    title: "Visão",
    text: "Ser o primeiro passo para uma sociedade que entenda a importância de ações sustentáveis.",
  },
  {
    icon: "heart",
    n: "03",
    title: "Valores",
    text: "Incentivar métodos sustentáveis e a colaboração para um meio ambiente saudável.",
  },
];
const tags = [
  ["mortarboard", "Escolas"],
  ["buildings", "Empresas"],
  ["people", "Comunidades"],
  ["recycle", "Reciclagem"],
  ["flower1", "Consumo consciente"],
];

const heroItem = { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0 } };
function Hero() {
  const videoRef = useRef(null);
  const [videoReady, setVideoReady] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [motionEnabled, setMotionEnabled] = useState(
    () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
    if (!motionEnabled) {
      video.pause();
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) =>
        entry.isIntersecting
          ? video.play().catch(() => setVideoPlaying(false))
          : video.pause(),
      { threshold: 0.15 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [motionEnabled]);
  const toggleMotion = () => {
    if (videoPlaying) {
      setMotionEnabled(false);
      videoRef.current?.pause();
    } else {
      setMotionEnabled(true);
      if (videoRef.current) {
        videoRef.current.muted = true;
        videoRef.current.play().catch(() => setVideoPlaying(false));
      }
    }
  };
  return (
    <section id="inicio" className="hero">
      <div className="hero-bg" />
      <video
        ref={videoRef}
        className={`hero-video ${videoReady ? "is-ready" : ""}`}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/images/hero-vale-tekoa.png"
        disablePictureInPicture
        tabIndex={-1}
        aria-hidden="true"
        onLoadedData={() => {
          setVideoReady(true);
          if (motionEnabled)
            videoRef.current?.play().catch(() => setVideoPlaying(false));
        }}
        onCanPlay={() =>
          motionEnabled &&
          videoRef.current?.play().catch(() => setVideoPlaying(false))
        }
        onPlay={() => setVideoPlaying(true)}
        onPause={() => setVideoPlaying(false)}
      >
        <source
          src="https://v6qbtzuporw1cqzj.public.blob.vercel-storage.com/videoplayback.mp4"
          type="video/mp4"
        />
      </video>
      <div className="hero-shade" />
      <motion.div
        className="hero-content"
        initial="hidden"
        animate="show"
        variants={{
          show: { transition: { staggerChildren: 0.14, delayChildren: 0.15 } },
        }}
      >
        <motion.div variants={heroItem} className="hero-mark">
          <BI name="leaf" /> Projeto ambiental
        </motion.div>
        <motion.h1 variants={heroItem}>TEKOÁ</motion.h1>
        <motion.p variants={heroItem}>
          Conscientização, Educação e<br />
          Harmonia com a Natureza
        </motion.p>
        <motion.small variants={heroItem}>
          PROJETO GESTORES DO FUTURO <i /> ESPRO
        </motion.small>
        <motion.div variants={heroItem} className="hero-actions">
          <a href="#essencia" className="btn primary">
            Conheça o projeto <BI name="arrow-right" />
          </a>
          <a href="#identidade" className="btn ghost">
            Nossa missão
          </a>
        </motion.div>
      </motion.div>
      <a className="scroll-cue" href="#nossa-identidade">
        <span>Descubra</span>
        <BI name="arrow-down" />
      </a>
      <button
        className="hero-motion"
        onClick={toggleMotion}
        aria-label={
          videoPlaying ? "Pausar vídeo de fundo" : "Ativar vídeo de fundo"
        }
      >
        <BI name={videoPlaying ? "pause-fill" : "play-fill"} />
        <span>{videoPlaying ? "Pausar movimento" : "Ativar movimento"}</span>
      </button>
    </section>
  );
}
function IdentityIntro() {
  return (
    <section id="nossa-identidade" className="intro">
      <Reveal>
        <span className="leafline">
          <BI name="leaf" /> Quem somos
        </span>
        <h2>Nossa Identidade</h2>
        <p>O coração e a alma do nosso projeto</p>
      </Reveal>
    </section>
  );
}
function Essencia() {
  return (
    <section id="essencia" className="section split">
      <Reveal className="split-copy">
        <SectionTitle eyebrow="Origem e propósito" title="Nossa Essência" />
        <p className="lead">
          Tekoá é uma palavra Guarani que representa o lugar onde vivemos em
          harmonia com nossos costumes e a natureza.
        </p>
        <p>
          Nossa base filosófica é clara: o homem não domina a natureza, mas sim{" "}
          <strong>cuida e faz parte dela.</strong>
        </p>
        <div className="origin">
          <span>TEKOÁ</span>
          <p>
            <b>te·ko·á</b>
            <br />
            Lugar onde somos quem somos.
          </p>
        </div>
      </Reveal>
      <Reveal className="photo-card" delay={0.15}>
        <img
          src="/images/essencia-rio.png"
          alt="Rio entre pedras na Mata Atlântica"
        />
        <span>Harmonia em cada detalhe</span>
      </Reveal>
    </section>
  );
}
function Why() {
  return (
    <section className="why">
      <Reveal>
        <span className="leafline">
          <BI name="leaf" /> Por que o TEKOÁ?
        </span>
        <h2>
          Conhecimento que
          <br />
          <em>cultiva mudança.</em>
        </h2>
      </Reveal>
      <Reveal className="why-copy">
        <p>
          Educação ambiental não é apenas aprender sobre a natureza. É
          reconhecer o nosso lugar dentro dela e transformar consciência em
          atitude.
        </p>
        <div>
          <span>
            <BI name="check2" /> Educação
          </span>
          <span>
            <BI name="check2" /> Cuidado
          </span>
          <span>
            <BI name="check2" /> Participação
          </span>
        </div>
      </Reveal>
    </section>
  );
}
function Identidade() {
  return (
    <section id="identidade" className="section identity">
      <Reveal>
        <SectionTitle
          eyebrow="O que nos orienta"
          title="Identidade Estratégica"
        />
      </Reveal>
      <div className="card-grid">
        {identity.map(({ icon, n, title, text }, i) => (
          <Reveal key={title} delay={i * 0.1} className="identity-card">
            <div className="card-top">
              <span>{n}</span>
              <BI name={icon} />
            </div>
            <h3>{title}</h3>
            <p>{text}</p>
            <div className="card-line" />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
function Pilares() {
  return (
    <section id="pilares" className="pillars">
      <Reveal>
        <SectionTitle
          light
          eyebrow="Nossa base"
          title="Pilares de Conhecimento"
        />
      </Reveal>
      <div className="pillar-grid">
        <Reveal className="pillar-card">
          <span>01</span>
          <BI name="tree" />
          <h3>
            Sabedoria
            <br />
            Ancestral
          </h3>
          <p>
            Resgate do conhecimento passado por gerações sobre o equilíbrio da
            terra.
          </p>
        </Reveal>
        <Reveal className="pillar-card accent" delay={0.12}>
          <span>02</span>
          <BI name="recycle" />
          <h3>
            Uso
            <br />
            Responsável
          </h3>
          <p>
            Retirar apenas o necessário para o presente, garantindo o{" "}
            <b>AMANHÃ.</b>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
function Atuacao() {
  return (
    <>
      <section className="impact-intro">
        <Reveal>
          <span>Ações e impacto</span>
          <h2>
            Como transformamos
            <br />
            informação em <em>mudança.</em>
          </h2>
        </Reveal>
      </section>
      <section id="atuacao" className="section action">
        <Reveal className="action-photo">
          <img
            src="/images/atuacao-campo.png"
            alt="Jovens em atividade de educação ambiental"
          />
          <div>
            <b>Educar para preservar</b>
            <span>Da informação nasce a ação.</span>
          </div>
        </Reveal>
        <Reveal className="action-copy">
          <SectionTitle eyebrow="Palestras e campanhas" title="Como Atuamos" />
          <p className="lead">
            Realizamos apresentações interativas focadas em escolas, empresas e
            comunidades locais.
          </p>
          <div className="direct">
            <h3>Linguagem Direta</h3>
            <p>
              Traduzimos conceitos complexos em informações práticas sobre
              reciclagem e consumo consciente.
            </p>
          </div>
          <div className="tags">
            {tags.map(([icon, t]) => (
              <span key={t}>
                <BI name={icon} />
                {t}
              </span>
            ))}
          </div>
        </Reveal>
      </section>
    </>
  );
}
function Commitment() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let seen = false;
    const el = document.getElementById("impact");
    const ob = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !seen) {
          seen = true;
          let n = 0;
          const timer = setInterval(() => {
            n += 2;
            setCount(n);
            if (n >= 100) clearInterval(timer);
          }, 18);
        }
      },
      { threshold: 0.4 },
    );
    if (el) ob.observe(el);
    return () => ob.disconnect();
  }, []);
  return (
    <section id="impact" className="commit">
      <Reveal className="score">
        <span>
          {count}
          <sup>%</sup>
        </span>
        <p>
          Foco na
          <br />
          Informação
        </p>
      </Reveal>
      <Reveal className="mindset">
        <span>Nosso compromisso</span>
        <h2>
          Mudança de
          <br />
          <em>Mindset</em>
        </h2>
        <p>
          Acreditamos que a educação ambiental é a ferramenta mais poderosa para
          reverter danos ecológicos. Nosso trabalho foca em transformar cada
          indivíduo em um agente de mudança.
        </p>
      </Reveal>
    </section>
  );
}
function Quote() {
  return (
    <section className="quote">
      <Reveal>
        <span>“</span>
        <blockquote>
          O homem não domina a natureza,
          <br />
          mas sim <em>cuida e faz parte dela.</em>
        </blockquote>
        <p>— Filosofia Ancestral Tekoá</p>
      </Reveal>
    </section>
  );
}
const faqs = [
  [
    "O que significa Tekoá?",
    "Tekoá é uma palavra Guarani que representa o lugar onde vivemos em harmonia com nossos costumes e a natureza.",
  ],
  [
    "Como o projeto atua?",
    "Por meio de palestras e campanhas com linguagem direta, voltadas a escolas, empresas e comunidades locais.",
  ],
  [
    "Quem faz parte da equipe?",
    "A Tekoá reúne profissionais de Direção, Comunicação, RH e Financeiro, Marketing, T.I e Jurídico.",
  ],
  [
    "Como enviar uma avaliação?",
    "Acesse a área Avaliação, preencha as três etapas e confirme. O site preparará a mensagem no seu aplicativo de e-mail.",
  ],
  [
    "Como publicar um comunicado?",
    "Neste momento os comunicados são atualizados no projeto. Uma área administrativa segura poderá ser adicionada na próxima etapa.",
  ],
];
function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="faq">
      <Reveal className="faq__intro">
        <span>
          <BI name="question-circle" /> Dúvidas frequentes
        </span>
        <h2>
          Informação clara,
          <br />
          sempre.
        </h2>
        <p>Respostas rápidas sobre o projeto e as ferramentas internas.</p>
      </Reveal>
      <Reveal className="faq__list">
        {faqs.map(([question, answer], index) => (
          <article className={open === index ? "open" : ""} key={question}>
            <button
              onClick={() => setOpen(open === index ? null : index)}
              aria-expanded={open === index}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <b>{question}</b>
              <BI name={open === index ? "dash" : "plus"} />
            </button>
            <motion.div
              initial={false}
              animate={{
                height: open === index ? "auto" : 0,
                opacity: open === index ? 1 : 0,
              }}
            >
              <p>{answer}</p>
            </motion.div>
          </article>
        ))}
      </Reveal>
    </section>
  );
}
function Privacy() {
  return (
    <section className="privacy">
      <div>
        <BI name="shield-lock" />
        <span>Privacidade e transparência</span>
        <p>
          Este site não armazena avaliações em banco de dados. Ao concluir o
          formulário, as informações são encaminhadas ao aplicativo de e-mail do
          próprio usuário.
        </p>
      </div>
      <a href="mailto:tekoa.espro@gmail.com?subject=Privacidade%20TEKOÁ">
        Falar sobre privacidade <BI name="arrow-up-right" />
      </a>
    </section>
  );
}
const departments = [
  {
    name: "Comunicação",
    icon: "chat-square-text",
    members: ["Arthur Alves", "Jenifer", "Quésia", "Laís"],
    description:
      "Conecta a Tekoá ao seu público por meio de mensagens claras, relacionamento e comunicação interna.",
  },
  {
    name: "RH / Financeiro",
    icon: "bar-chart",
    members: ["Joelma", "Isabele"],
    description:
      "Cuida das pessoas, dos processos internos e da organização financeira do projeto.",
  },
  {
    name: "Marketing",
    icon: "megaphone",
    members: ["Janaina", "Leticia", "Greice"],
    description:
      "Transforma ideias em campanhas e fortalece a presença e o propósito da Tekoá.",
  },
  {
    name: "T.I",
    icon: "code-square",
    members: ["Caua"],
    description:
      "Desenvolve e mantém as soluções digitais que apoiam as ações e a comunicação do projeto.",
  },
  {
    name: "Jurídico",
    icon: "briefcase",
    members: ["Ivo Arthur", "Carlisson", "Ludmila"],
    description:
      "Orienta decisões e contribui para que as atividades sigam princípios legais e responsáveis.",
  },
];
function Organization() {
  const [selected, setSelected] = useState(null),
    [query, setQuery] = useState(""),
    [area, setArea] = useState("Todos"),
    [profile, setProfile] = useState(null);
  const filtered = departments.filter(
    (d) =>
      (area === "Todos" || d.name === area) &&
      (!query ||
        d.name.toLowerCase().includes(query.toLowerCase()) ||
        d.members.some((m) => m.toLowerCase().includes(query.toLowerCase()))),
  );
  const current = departments.find((d) => d.name === selected);
  useModalBehavior(profile, () => setProfile(null));
  return (
    <section id="equipe" className="organization">
      <div className="organization__head">
        <Reveal>
          <SectionTitle
            eyebrow="Quem faz acontecer"
            title="Nossa Organização"
          />
          <p>
            Uma equipe multidisciplinar trabalhando em conjunto para transformar
            consciência em ação.
          </p>
        </Reveal>
      </div>
      <Reveal className="team-tools">
        <label>
          <BI name="search" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar integrante ou área"
          />
        </label>
        <select
          value={area}
          onChange={(e) => setArea(e.target.value)}
          aria-label="Filtrar por departamento"
        >
          <option>Todos</option>
          {departments.map((d) => (
            <option key={d.name}>{d.name}</option>
          ))}
        </select>
      </Reveal>
      <div className="org-chart">
        <Reveal className="org-ceo">
          <button
            className="org-card org-card--ceo"
            onClick={() =>
              setProfile({ member: "Vanessa", department: "Direção executiva" })
            }
          >
            <span>Direção executiva</span>
            <BI name="person-badge" />
            <h3>Vanessa</h3>
            <p>CEO</p>
          </button>
          <i className="org-line org-line--vertical" />
        </Reveal>
        <div className="org-departments">
          {filtered.map((department, index) => (
            <Reveal
              className={`org-unit ${selected === department.name ? "is-selected" : ""}`}
              delay={index * 0.07}
              key={department.name}
            >
              <button
                className="org-card"
                onClick={() =>
                  setSelected(
                    selected === department.name ? null : department.name,
                  )
                }
                aria-expanded={selected === department.name}
              >
                <div className="org-card__icon">
                  <BI name={department.icon} />
                </div>
                <span>Departamento</span>
                <h3>{department.name}</h3>
                <div className="org-card__members">
                  {department.members.length}{" "}
                  {department.members.length === 1
                    ? "integrante"
                    : "integrantes"}
                </div>
                <div className="org-card__action">
                  {selected === department.name ? "Fechar" : "Conhecer equipe"}{" "}
                  <BI name={selected === department.name ? "dash" : "plus"} />
                </div>
              </button>
            </Reveal>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="team-empty">
            <BI name="search" />
            <p>Nenhum integrante encontrado.</p>
          </div>
        )}
        <motion.div
          className="org-detail"
          initial={false}
          animate={{ height: current ? "auto" : 0, opacity: current ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        >
          {current && (
            <div className="org-detail__inner">
              <div>
                <span>Área selecionada</span>
                <h3>{current.name}</h3>
                <p>{current.description}</p>
              </div>
              <ul>
                {current.members.map((member, index) => (
                  <motion.li
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.06 }}
                    key={member}
                  >
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <button
                      onClick={() =>
                        setProfile({ member, department: current.name })
                      }
                    >
                      <i>
                        {member
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)}
                      </i>
                      {member}
                      <BI name="arrow-up-right" />
                    </button>
                  </motion.li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      </div>
      {profile && (
        <div
          className="profile-modal"
          onMouseDown={(e) => e.target === e.currentTarget && setProfile(null)}
        >
          <motion.article
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <button onClick={() => setProfile(null)} aria-label="Fechar perfil">
              <BI name="x-lg" />
            </button>
            <div className="profile-avatar">
              {profile.member
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </div>
            <span>{profile.department}</span>
            <h2>{profile.member}</h2>
            <p>
              Integrante da equipe TEKOÁ, contribuindo para o desenvolvimento e
              o propósito do projeto.
            </p>
            <div>
              <BI name="leaf" /> Pessoas que cultivam mudança.
            </div>
          </motion.article>
        </div>
      )}
    </section>
  );
}
const notices = [
  {
    type: "Organização",
    icon: "diagram-3",
    title: "Estrutura organizacional atualizada",
    text: "Conheça os integrantes e os departamentos que formam a Tekoá.",
    detail:
      "O organograma reúne a direção executiva e as áreas de Comunicação, RH e Financeiro, Marketing, T.I e Jurídico. Selecione cada departamento para conhecer sua equipe e sua atuação.",
    date: "29 ago 2026",
    author: "Equipe Tekoá",
    featured: true,
  },
  {
    type: "Pessoas",
    icon: "clipboard2-check",
    title: "Avaliação de desempenho disponível",
    text: "O novo formulário já pode ser utilizado para registrar feedbacks profissionais.",
    detail:
      "A avaliação foi organizada em etapas para facilitar o preenchimento. Ela considera colaboração, comunicação e comprometimento, além de registrar pontos fortes e oportunidades de melhoria.",
    date: "29 ago 2026",
    author: "RH / Financeiro",
  },
  {
    type: "Comunicados",
    icon: "bell",
    title: "Este é o nosso canal interno",
    text: "Novos avisos, ações e notícias da Tekoá serão publicados neste espaço.",
    detail:
      "O jornal interno passa a concentrar os comunicados da equipe. Use os filtros para encontrar rapidamente informações sobre organização, pessoas e avisos gerais.",
    date: "29 ago 2026",
    author: "Comunicação",
  },
];
function InternalNews() {
  const [filter, setFilter] = useState("Todos"),
    [opened, setOpened] = useState(null),
    [query, setQuery] = useState("");
  const categories = ["Todos", ...new Set(notices.map((n) => n.type))];
  const visible = notices.filter(
    (n) =>
      (filter === "Todos" || n.type === filter) &&
      (!query ||
        `${n.title} ${n.text} ${n.author}`
          .toLowerCase()
          .includes(query.toLowerCase())),
  );
  useModalBehavior(opened, () => setOpened(null));
  return (
    <section id="jornal" className="internal-news">
      <Reveal className="internal-news__head">
        <span>
          <BI name="newspaper" /> Jornal interno
        </span>
        <h2>
          Últimas notícias
          <br />
          da Tekoá
        </h2>
        <p>Informações importantes para manter toda a equipe conectada.</p>
      </Reveal>
      <Reveal className="news-toolbar">
        <div className="news-filters">
          {categories.map((category) => (
            <button
              className={filter === category ? "active" : ""}
              onClick={() => setFilter(category)}
              key={category}
            >
              {category}
            </button>
          ))}
        </div>
        <label>
          <BI name="search" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar notícia"
          />
        </label>
      </Reveal>
      <motion.div layout className="news-grid">
        {visible.map((notice, index) => (
          <motion.article
            layout
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06 }}
            className={`news-card ${notice.featured ? "news-card--featured" : ""}`}
            key={notice.title}
          >
            {notice.featured && (
              <b className="news-featured">
                <BI name="pin-angle-fill" /> Destaque
              </b>
            )}
            <div className="news-card__meta">
              <span>
                <BI name={notice.icon} />
                {notice.type}
              </span>
              <small>{notice.date}</small>
            </div>
            <h3>{notice.title}</h3>
            <p>{notice.text}</p>
            <div className="news-author">Por {notice.author}</div>
            <button
              className="news-card__foot"
              onClick={() => setOpened(notice)}
            >
              <span>Ler comunicado</span>
              <BI name="arrow-up-right" />
            </button>
          </motion.article>
        ))}
      </motion.div>
      {visible.length === 0 && (
        <div className="news-empty">
          <BI name="search" /> Nenhuma notícia encontrada.
        </div>
      )}
      {opened && (
        <motion.div
          className="news-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => e.target === e.currentTarget && setOpened(null)}
        >
          <motion.article
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
          >
            <button
              className="news-modal__close"
              onClick={() => setOpened(null)}
              aria-label="Fechar notícia"
            >
              <BI name="x-lg" />
            </button>
            <span>
              <BI name={opened.icon} />
              {opened.type}
            </span>
            <small>
              {opened.date} · {opened.author}
            </small>
            <h2>{opened.title}</h2>
            <p>{opened.detail}</p>
            <div>
              <BI name="leaf" /> Informação que conecta nossa equipe.
            </div>
          </motion.article>
        </motion.div>
      )}
    </section>
  );
}
function Rating({ name, label }) {
  return (
    <fieldset>
      <legend>{label}</legend>
      <div className="rating-options">
        {[1, 2, 3, 4, 5].map((value) => (
          <label key={value}>
            <input type="radio" name={name} value={value} required />
            <span>{value}</span>
          </label>
        ))}
      </div>
      <div className="rating-hints">
        <span>Precisa evoluir</span>
        <span>Excelente</span>
      </div>
    </fieldset>
  );
}
function FeedbackTextarea({ name, label, placeholder }) {
  const [value, setValue] = useState("");
  return (
    <label>
      {label}
      <textarea
        name={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        maxLength={500}
        required
      />
      <small className="char-count">{value.length}/500</small>
    </label>
  );
}
function PerformanceReview() {
  const [step, setStep] = useState(1),
    [summary, setSummary] = useState(null),
    [reviewDepartment, setReviewDepartment] = useState("");
  const reviewMembers =
    reviewDepartment === "Direção executiva"
      ? ["Vanessa"]
      : departments.find((department) => department.name === reviewDepartment)
          ?.members || [];
  const validateStep = (e) => {
    const form = e.currentTarget.closest("form");
    const fields = [
      ...form.querySelectorAll(
        `[data-step="${step}"] input,[data-step="${step}"] select,[data-step="${step}"] textarea`,
      ),
    ];
    if (!fields.every((field) => field.reportValidity())) return;
    const data = new FormData(form);
    if (step === 2) setSummary(Object.fromEntries(data));
    setStep(step + 1);
  };
  const submit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = `Avaliação de desempenho — ${data.get("colaborador")}`;
    const body = `AVALIAÇÃO DE DESEMPENHO TEKOÁ\n\nColaborador(a): ${data.get("colaborador")}\nDepartamento: ${data.get("departamento")}\nAvaliador(a): ${data.get("avaliador")}\n\nColaboração: ${data.get("colaboracao")}/5\nComunicação: ${data.get("comunicacao")}/5\nComprometimento: ${data.get("comprometimento")}/5\n\nPontos fortes:\n${data.get("pontosFortes")}\n\nOportunidades de melhoria:\n${data.get("melhorias")}`;
    window.location.href = `mailto:tekoa.espro@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };
  return (
    <section id="avaliacao" className="performance">
      <Reveal className="performance__intro">
        <span>
          <BI name="clipboard-data" /> Desenvolvimento de pessoas
        </span>
        <h2>
          Avaliação de
          <br />
          <em>desempenho</em>
        </h2>
        <p>
          Um espaço para reconhecer pontos fortes, alinhar expectativas e apoiar
          o crescimento de cada integrante.
        </p>
        <div className="performance__note">
          <BI name="shield-check" />
          <p>
            <b>Feedback responsável</b>
            <br />
            Seja claro, respeitoso e construtivo em sua avaliação.
          </p>
        </div>
      </Reveal>
      <Reveal className="review-panel" delay={0.12}>
        <div className="review-progress">
          <div>
            <span>Etapa {step} de 3</span>
            <b>
              {step === 1
                ? "Identificação"
                : step === 2
                  ? "Desempenho"
                  : "Confirmação"}
            </b>
          </div>
          <div className="review-progress__track">
            <motion.i animate={{ width: `${(step / 3) * 100}%` }} />
          </div>
        </div>
        <form onSubmit={submit}>
          <div
            className={`review-step ${step === 1 ? "active" : ""}`}
            data-step="1"
          >
            <div className="form-row">
              <label>
                Departamento
                <select
                  name="departamento"
                  value={reviewDepartment}
                  onChange={(event) => setReviewDepartment(event.target.value)}
                  required
                >
                  <option value="" disabled>
                    Selecione
                  </option>
                  {departments.map((d) => (
                    <option key={d.name}>{d.name}</option>
                  ))}
                  <option>Direção executiva</option>
                </select>
              </label>
              <label>
                Colaborador(a)
                <select
                  name="colaborador"
                  defaultValue=""
                  key={reviewDepartment}
                  disabled={!reviewDepartment}
                  required
                >
                  <option value="" disabled>
                    {reviewDepartment
                      ? "Selecione o integrante"
                      : "Escolha o departamento"}
                  </option>
                  {reviewMembers.map((member) => (
                    <option key={member}>{member}</option>
                  ))}
                </select>
              </label>
            </div>
            <label>
              Avaliador(a)
              <input name="avaliador" placeholder="Seu nome" required />
            </label>
            <button
              className="review-submit"
              type="button"
              onClick={validateStep}
            >
              Continuar <BI name="arrow-right" />
            </button>
          </div>
          <div
            className={`review-step ${step === 2 ? "active" : ""}`}
            data-step="2"
          >
            <div className="ratings">
              <Rating name="colaboracao" label="Colaboração" />
              <Rating name="comunicacao" label="Comunicação" />
              <Rating name="comprometimento" label="Comprometimento" />
            </div>
            <FeedbackTextarea
              name="pontosFortes"
              label="Pontos fortes"
              placeholder="O que deve ser reconhecido e mantido?"
            />
            <FeedbackTextarea
              name="melhorias"
              label="Oportunidades de melhoria"
              placeholder="Quais pontos podem evoluir?"
            />
            <div className="review-nav">
              <button type="button" onClick={() => setStep(1)}>
                <BI name="arrow-left" /> Voltar
              </button>
              <button
                className="review-submit"
                type="button"
                onClick={validateStep}
              >
                Revisar <BI name="arrow-right" />
              </button>
            </div>
          </div>
          <div
            className={`review-step ${step === 3 ? "active" : ""}`}
            data-step="3"
          >
            {summary && (
              <div className="review-summary">
                <div>
                  <span>Colaborador(a)</span>
                  <b>{summary.colaborador}</b>
                </div>
                <div>
                  <span>Departamento</span>
                  <b>{summary.departamento}</b>
                </div>
                <div>
                  <span>Avaliador(a)</span>
                  <b>{summary.avaliador}</b>
                </div>
                <div className="review-summary__ratings">
                  <span>Notas</span>
                  <p>
                    Colaboração <b>{summary.colaboracao}/5</b>
                  </p>
                  <p>
                    Comunicação <b>{summary.comunicacao}/5</b>
                  </p>
                  <p>
                    Comprometimento <b>{summary.comprometimento}/5</b>
                  </p>
                </div>
              </div>
            )}
            <div className="review-nav">
              <button type="button" onClick={() => setStep(2)}>
                <BI name="arrow-left" /> Editar
              </button>
              <button className="review-submit" type="submit">
                Preparar avaliação <BI name="send" />
              </button>
            </div>
          </div>
          <small className="form-help">
            <BI name="info-circle" /> Ao concluir, seu aplicativo de e-mail será
            aberto com a avaliação preenchida.
          </small>
        </form>
      </Reveal>
    </section>
  );
}
function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = () =>
    navigator.clipboard.writeText("tekoa.espro@gmail.com").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  return (
    <section id="contato" className="contact">
      <Reveal>
        <span className="leafline">
          <BI name="leaf" /> Entre em contato
        </span>
        <h2>
          Vamos construir o<br />
          <em>amanhã juntos?</em>
        </h2>
        <p>Estamos prontos para construir o amanhã com você.</p>
        <div className="contact-actions">
          <a className="btn primary" href="mailto:tekoa.espro@gmail.com">
            <BI name="envelope" /> Entrar em contato
          </a>
          <button className="copy" onClick={copy}>
            <BI name="copy" />
            {copied ? "E-mail copiado!" : "Copiar e-mail"}
          </button>
        </div>
        <a className="email" href="mailto:tekoa.espro@gmail.com">
          tekoa.espro@gmail.com
        </a>
      </Reveal>
    </section>
  );
}
function DeveloperFeedback() {
  return (
    <aside
      className="developer-feedback"
      aria-label="Feedback para o desenvolvedor"
    >
      <Reveal className="developer-feedback__inner">
        <div className="developer-feedback__icon">
          <BI name="code-slash" />
        </div>
        <div className="developer-feedback__copy">
          <span>Feedback sobre o site</span>
          <h2>Encontrou algo que podemos melhorar?</h2>
          <p>
            Envie uma sugestão diretamente para quem desenvolveu esta
            experiência.
          </p>
        </div>
        <a
          className="developer-feedback__link"
          href="https://github.com/cauadev2005"
          target="_blank"
          rel="noreferrer"
        >
          <BI name="github" />
          <span>
            <small>Desenvolvedor</small>@cauadev2005
          </span>
          <BI name="arrow-up-right" />
        </a>
      </Reveal>
    </aside>
  );
}
function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const update = () => setVisible(window.scrollY > 700);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <button
      className={`back-to-top ${visible ? "is-visible" : ""}`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Voltar ao início"
    >
      <BI name="arrow-up" />
      <span>Topo</span>
    </button>
  );
}
function SiteLoader() {
  return (
    <motion.div
      className="site-loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.45 } }}
    >
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <BI name="leaf" />
        <strong>TEKOÁ</strong>
        <span>Consciência que transforma</span>
        <i />
      </motion.div>
    </motion.div>
  );
}
function CursorAura() {
  useEffect(() => {
    const move = (event) => {
      document.documentElement.style.setProperty(
        "--pointer-x",
        `${event.clientX}px`,
      );
      document.documentElement.style.setProperty(
        "--pointer-y",
        `${event.clientY}px`,
      );
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);
  return <div className="cursor-aura" aria-hidden="true" />;
}
export default function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1350);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <AnimatePresence>{loading && <SiteLoader />}</AnimatePresence>
      <CursorAura />
      <Navbar />
      <main>
        <Hero />
        <IdentityIntro />
        <Essencia />
        <Why />
        <Identidade />
        <Organization />
        <Pilares />
        <Atuacao />
        <Commitment />
        <InternalNews />
        <PerformanceReview />
        <Quote />
        <FAQ />
        <Contact />
        <Privacy />
        <DeveloperFeedback />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
