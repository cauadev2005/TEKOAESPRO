import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { QRCodeSVG } from "qrcode.react";

const regions = [
  ["Sudeste", 94.9],
  ["Nordeste", 70.49],
  ["Centro-Oeste", 68.95],
  ["Sul", 56.09],
  ["Norte", 29.94],
];

const habits = [
  [
    "basket2",
    "Alimentação saudável",
    "Frutas, verduras, legumes, grãos e cereais integrais fazem parte de uma rotina protetora.",
  ],
  [
    "activity",
    "Corpo em movimento",
    "A prática regular de atividade física contribui para a saúde e ajuda no controle do peso.",
  ],
  [
    "person-check",
    "Peso corporal adequado",
    "Sobrepeso e obesidade estão associados a maior risco de doença em estágio avançado.",
  ],
  [
    "slash-circle",
    "Sem tabaco e menos álcool",
    "Não fumar e evitar bebidas alcoólicas reduz riscos para diferentes tipos de câncer.",
  ],
];

const symptoms = [
  ["droplet", "Sangue na urina"],
  ["hourglass-split", "Demora para começar ou terminar de urinar"],
  ["arrow-down-circle", "Diminuição do jato urinário"],
  ["moon-stars", "Necessidade de urinar mais vezes, inclusive à noite"],
  ["exclamation-diamond", "Dificuldade ou mudança no padrão urinário"],
];

const chapters = [
  ["saude-topo", "Início"],
  ["panorama-prostata", "Números"],
  ["anatomia-prostata", "Anatomia"],
  ["prevencao-prostata", "Prevenção"],
  ["sinais-prostata", "Sinais"],
  ["investigacao-prostata", "Exames"],
  ["mitos-prostata", "Mitos"],
];

const presentationSlides = [
  [
    "01",
    "77.920",
    "novos casos estimados por ano no Brasil entre 2026 e 2028",
    "O tamanho da conversa",
  ],
  [
    "02",
    "9 em 10",
    "homens diagnosticados têm mais de 55 anos",
    "A idade merece atenção",
  ],
  [
    "03",
    "Pode ser silencioso",
    "no início, o câncer de próstata pode não apresentar sintomas",
    "Atenção ao corpo",
  ],
  [
    "04",
    "PSA não confirma sozinho",
    "toque retal e PSA auxiliam; a biópsia confirma o diagnóstico",
    "Investigar com orientação",
  ],
  [
    "05",
    "Cuidar é coragem",
    "informação não substitui o médico, mas pode ser o primeiro passo",
    "A mensagem final",
  ],
];

export default function ProstateAwareness({ onBack }) {
  const [activeChapter, setActiveChapter] = useState("saude-topo");
  const [presentationOpen, setPresentationOpen] = useState(false);
  const [audienceOpen, setAudienceOpen] = useState(false);

  useEffect(() => {
    const nodes = chapters
      .map(([id]) => document.getElementById(id))
      .filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (entry) => entry.isIntersecting && setActiveChapter(entry.target.id),
        ),
      { rootMargin: "-38% 0px -52%" },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const shortcut = (event) => {
      if (
        event.key.toLowerCase() === "p" &&
        !["INPUT", "TEXTAREA"].includes(event.target.tagName)
      ) {
        setPresentationOpen(true);
      }
    };
    window.addEventListener("keydown", shortcut);
    return () => window.removeEventListener("keydown", shortcut);
  }, []);

  return (
    <div className="health-page">
      <HealthNav
        onBack={onBack}
        onPresent={() => setPresentationOpen(true)}
        onAudience={() => setAudienceOpen(true)}
      />
      <ChapterProgress active={activeChapter} />
      <main className="health-main">
        <HealthHero />
        <Panorama />
        <AnatomyFocus />
        <Prevention />
        <Signs />
        <Investigation />
        <Myths />
        <Closing onBack={onBack} />
      </main>
      <Presentation
        open={presentationOpen}
        onClose={() => setPresentationOpen(false)}
      />
      <AudienceExperience
        open={audienceOpen}
        onClose={() => setAudienceOpen(false)}
      />
    </div>
  );
}

const anatomyParts = {
  bexiga: {
    number: "01",
    title: "Abaixo da bexiga",
    text: "A próstata está posicionada logo abaixo da bexiga, o órgão responsável por armazenar a urina.",
  },
  uretra: {
    number: "02",
    title: "Ao redor da uretra",
    text: "A parte inicial da uretra passa pela próstata. Isso ajuda a entender por que alterações na glândula podem modificar o fluxo urinário.",
  },
  reto: {
    number: "03",
    title: "À frente do reto",
    text: "A próstata fica à frente do reto. Essa proximidade permite que parte dela seja avaliada durante o toque retal.",
  },
  funcao: {
    number: "04",
    title: "Função reprodutiva",
    text: "A próstata produz um líquido que compõe parte do sêmen e ajuda a nutrir e proteger os espermatozoides.",
  },
};

function AnatomyFocus() {
  const [part, setPart] = useState("bexiga");
  const active = anatomyParts[part];
  return (
    <section
      className="anatomy-focus anatomy-focus--concept"
      id="anatomia-prostata"
    >
      <div className="anatomy-copy">
        <span>02 · Anatomia em foco</span>
        <h2>
          Pequena no tamanho.
          <br />
          Importante na localização.
        </h2>
        <p>
          Este mapa conceitual mostra quatro relações simples que ajudam a
          entender a próstata sem usar uma ilustração médica confusa.
        </p>
        <motion.div
          className="anatomy-detail"
          key={part}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span>{active.number}</span>
          <div>
            <strong>{active.title}</strong>
            <p>{active.text}</p>
          </div>
        </motion.div>
      </div>
      <div className="anatomy-stage anatomy-stage--map">
        <div
          className="anatomy-map"
          role="group"
          aria-label="Relações anatômicas da próstata"
        >
          <div className="anatomy-core">
            <i className="bi bi-circle-fill" />
            <strong>PRÓSTATA</strong>
            <small>glândula do sistema reprodutor</small>
          </div>
          {Object.entries(anatomyParts).map(([id, item], index) => (
            <button
              key={id}
              className={`anatomy-node node-${index + 1} ${part === id ? "active" : ""}`}
              onClick={() => setPart(id)}
            >
              <small>{item.number}</small>
              <span>{item.title}</span>
            </button>
          ))}
          <i className="anatomy-line line-1" />
          <i className="anatomy-line line-2" />
          <i className="anatomy-line line-3" />
          <i className="anatomy-line line-4" />
        </div>
        <small className="anatomy-disclaimer">
          Mapa conceitual educativo · não representa proporções anatômicas
        </small>
      </div>
    </section>
  );
}

function HealthNav({ onBack, onPresent, onAudience }) {
  return (
    <header className="health-nav">
      <button className="health-brand" onClick={onBack}>
        <i className="bi bi-leaf" /> TEKOÁ
      </button>
      <span>Especial · Saúde do Homem</span>
      <div className="health-nav__actions">
        <button className="health-audience" onClick={onAudience}>
          <i className="bi bi-stars" /> Experiência
        </button>
        <button className="health-present" onClick={onPresent}>
          <i className="bi bi-easel2" /> Apresentar <kbd>P</kbd>
        </button>
        <button className="health-back" onClick={onBack}>
          <i className="bi bi-arrow-left" /> Voltar ao projeto
        </button>
      </div>
    </header>
  );
}

function ChapterProgress({ active }) {
  return (
    <aside className="chapter-progress" aria-label="Progresso da página">
      {chapters.map(([id, label], index) => (
        <a
          key={id}
          href={`#${id}`}
          className={active === id ? "active" : ""}
          aria-label={label}
        >
          <span>0{index + 1}</span>
          <i />
          <b>{label}</b>
        </a>
      ))}
    </aside>
  );
}

function HealthHero() {
  return (
    <section className="health-hero" id="saude-topo">
      <div className="health-hero__glow" />
      <motion.div
        className="health-hero__copy"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <span>
          <i className="bi bi-heart-pulse" /> Novembro Azul · informação sem
          tabu
        </span>
        <h1>
          Cuidar
          <br />é <em>coragem.</em>
        </h1>
        <p>
          Entender os riscos, perceber mudanças no corpo e procurar orientação
          profissional são atitudes de cuidado — não de medo.
        </p>
        <a href="#panorama-prostata">
          Conheça os números <i className="bi bi-arrow-down" />
        </a>
      </motion.div>
      <motion.div
        className="health-hero__number"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.25, duration: 0.7 }}
      >
        <small>Estimativa anual no Brasil</small>
        <strong>
          <AnimatedNumber value={77920} />
        </strong>
        <span>
          novos casos por ano
          <br />
          entre 2026 e 2028
        </span>
        <i>Fonte: INCA</i>
      </motion.div>
      <div className="health-scroll">
        <span>Role para explorar</span>
        <i className="bi bi-mouse" />
      </div>
    </section>
  );
}

function Panorama() {
  const max = regions[0][1];
  return (
    <section className="health-section health-panorama" id="panorama-prostata">
      <div className="health-section__intro">
        <span>01 · O tamanho da conversa</span>
        <h2>Um assunto que precisa ser visto.</h2>
        <p>
          Sem considerar os tumores de pele não melanoma, o câncer de próstata é
          o câncer mais incidente entre os homens no Brasil.
        </p>
      </div>
      <div className="health-stats">
        <article className="health-stat health-stat--dark">
          <small>Casos estimados</small>
          <strong>
            <AnimatedNumber value={77920} />
          </strong>
          <p>por ano no triênio 2026–2028</p>
        </article>
        <article className="health-stat">
          <small>Óbitos registrados</small>
          <strong>
            <AnimatedNumber value={17258} />
          </strong>
          <p>no Brasil em 2023</p>
        </article>
        <article className="health-stat">
          <small>Idade importa</small>
          <strong>9 em 10</strong>
          <p>diagnosticados têm mais de 55 anos</p>
        </article>
      </div>
      <div className="health-chart">
        <header>
          <div>
            <span>Estimativa de incidência · 2026</span>
            <h3>Casos por 100 mil homens</h3>
          </div>
          <i className="bi bi-bar-chart-line" />
        </header>
        <div>
          {regions.map(([name, value], index) => (
            <div className="health-chart__row" key={name}>
              <span>{name}</span>
              <div>
                <motion.i
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(value / max) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: index * 0.09 }}
                />
              </div>
              <strong>{String(value).replace(".", ",")}</strong>
            </div>
          ))}
        </div>
        <p>
          Os números regionais refletem diferenças demográficas, acesso ao
          diagnóstico e qualidade dos registros. Eles não calculam o risco
          individual.
        </p>
      </div>
      <RegionMap />
    </section>
  );
}

function AnimatedNumber({ value }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const node = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        const start = performance.now();
        const frame = (now) => {
          const progress = Math.min((now - start) / 1300, 1);
          setDisplay(Math.round(value * (1 - Math.pow(1 - progress, 3))));
          if (progress < 1) requestAnimationFrame(frame);
        };
        requestAnimationFrame(frame);
        observer.disconnect();
      },
      { threshold: 0.4 },
    );
    if (node) observer.observe(node);
    return () => observer.disconnect();
  }, [value]);
  return <span ref={ref}>{display.toLocaleString("pt-BR")}</span>;
}

function RegionMap() {
  const [active, setActive] = useState(regions[0]);
  const positions = ["southeast", "northeast", "center", "south", "north"];
  return (
    <div className="region-map">
      <div className="region-map__copy">
        <span>Explore os dados</span>
        <h3>
          Um Brasil,
          <br />
          diferentes realidades.
        </h3>
        <p>
          Passe o cursor ou toque nas regiões para comparar as estimativas de
          incidência.
        </p>
        <div>
          <strong>{active[0]}</strong>
          <b>{String(active[1]).replace(".", ",")}</b>
          <small>casos estimados por 100 mil homens</small>
        </div>
      </div>
      <div
        className="region-map__visual"
        role="img"
        aria-label="Representação interativa das regiões do Brasil"
      >
        {regions.map((region, index) => (
          <button
            key={region[0]}
            className={`${positions[index]} ${active[0] === region[0] ? "active" : ""}`}
            onMouseEnter={() => setActive(region)}
            onFocus={() => setActive(region)}
            onClick={() => setActive(region)}
          >
            <span>{region[0]}</span>
            <i>{String(region[1]).replace(".", ",")}</i>
          </button>
        ))}
        <small>Representação visual por regiões</small>
      </div>
    </div>
  );
}

function Prevention() {
  return (
    <section
      className="health-section health-prevention"
      id="prevencao-prostata"
    >
      <div className="health-section__intro">
        <span>03 · Prevenção possível</span>
        <h2>O cuidado começa antes dos exames.</h2>
        <p>
          Não existe uma atitude isolada que garanta prevenção. Hábitos
          saudáveis ajudam a reduzir fatores de risco de vários tipos de câncer
          e outras doenças crônicas.
        </p>
      </div>
      <div className="health-habits">
        {habits.map(([icon, title, text], index) => (
          <motion.article
            key={title}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
          >
            <span>0{index + 1}</span>
            <i className={`bi bi-${icon}`} />
            <h3>{title}</h3>
            <p>{text}</p>
          </motion.article>
        ))}
      </div>
      <div className="health-risk-line">
        <div>
          <i className="bi bi-calendar3" />
          <strong>Idade</strong>
          <span>
            O risco aumenta com o envelhecimento, especialmente após os 60 anos.
          </span>
        </div>
        <div>
          <i className="bi bi-diagram-3" />
          <strong>Histórico familiar</strong>
          <span>
            Pai, avô ou irmão diagnosticado antes dos 60 anos aumenta a atenção
            necessária.
          </span>
        </div>
        <div>
          <i className="bi bi-people" />
          <strong>Homens negros</strong>
          <span>
            A ocorrência é mais frequente nessa população, segundo o INCA.
          </span>
        </div>
      </div>
    </section>
  );
}

function Signs() {
  return (
    <section className="health-section health-signs" id="sinais-prostata">
      <div className="health-signs__lead">
        <span>04 · Atenção ao corpo</span>
        <h2>No começo, o silêncio é comum.</h2>
        <p>
          O câncer de próstata pode não apresentar sintomas em suas fases
          iniciais. Quando surgem mudanças, elas também podem estar relacionadas
          a condições benignas — por isso, investigar é essencial.
        </p>
        <div>
          <i className="bi bi-hospital" />
          <p>
            <strong>Percebeu algo diferente?</strong> Procure uma Unidade Básica
            de Saúde. Não espere piorar e não interprete exames sozinho.
          </p>
        </div>
      </div>
      <div className="health-symptoms">
        {symptoms.map(([icon, text], index) => (
          <motion.article
            key={text}
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.07 }}
          >
            <span>0{index + 1}</span>
            <i className={`bi bi-${icon}`} />
            <p>{text}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function Investigation() {
  return (
    <section
      className="health-section health-investigation"
      id="investigacao-prostata"
    >
      <div className="health-section__intro">
        <span>05 · Como se investiga</span>
        <h2>Um exame sozinho não conta toda a história.</h2>
        <p>
          PSA e toque retal ajudam na investigação. Alterações podem levar a
          outros exames, mas somente a biópsia confirma o diagnóstico.
        </p>
      </div>
      <div className="health-path">
        <article>
          <b>01</b>
          <i className="bi bi-chat-square-heart" />
          <h3>Conversa e avaliação</h3>
          <p>
            O profissional considera sintomas, idade, histórico familiar e
            outros fatores.
          </p>
        </article>
        <i className="bi bi-arrow-right" />
        <article>
          <b>02</b>
          <i className="bi bi-droplet-half" />
          <h3>PSA + toque retal</h3>
          <p>
            São exames iniciais complementares. PSA elevado também pode indicar
            condições benignas.
          </p>
        </article>
        <i className="bi bi-arrow-right" />
        <article className="health-path__final">
          <b>03</b>
          <i className="bi bi-microscope" />
          <h3>Biópsia</h3>
          <p>
            Quando indicada, analisa pequenas amostras e confirma ou descarta o
            diagnóstico.
          </p>
        </article>
      </div>
      <aside className="health-decision">
        <i className="bi bi-info-circle" />
        <div>
          <strong>E quem não apresenta sintomas?</strong>
          <p>
            O Ministério da Saúde não recomenda rastreamento populacional
            automático. Cada pessoa deve conhecer benefícios e riscos e
            conversar com um profissional para tomar uma decisão informada.
          </p>
        </div>
      </aside>
    </section>
  );
}

function Myths() {
  const [revealed, setRevealed] = useState([]);
  const cards = [
    [
      "MITO",
      "“Se não sinto nada, não preciso cuidar da saúde.”",
      "O cuidado inclui hábitos saudáveis, acompanhamento profissional e atenção às mudanças do corpo.",
    ],
    [
      "FATO",
      "PSA alto não significa automaticamente câncer.",
      "Outras alterações da próstata podem elevar o PSA. O resultado precisa ser avaliado por um profissional.",
    ],
    [
      "FATO",
      "Falar cedo diminui o medo e o tabu.",
      "Informação confiável ajuda homens e famílias a procurar atendimento no momento adequado.",
    ],
  ];
  const reveal = (index) =>
    setRevealed((items) => (items.includes(index) ? items : [...items, index]));
  return (
    <section className="health-section health-myths" id="mitos-prostata">
      <div className="health-section__intro">
        <span>06 · Informação combate o preconceito</span>
        <h2>Antes de virar o card: mito ou fato?</h2>
      </div>
      <div className="health-myth-grid">
        {cards.map(([answer, title, text], index) => (
          <button
            key={title}
            className={revealed.includes(index) ? "revealed" : ""}
            onClick={() => reveal(index)}
          >
            <div className="myth-front">
              <span>AFIRMAÇÃO 0{index + 1}</span>
              <h3>{title}</h3>
              <small>
                Clique para revelar <i className="bi bi-arrow-repeat" />
              </small>
            </div>
            <div className="myth-back">
              <span>{answer}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

function Presentation({ open, onClose }) {
  const [slide, setSlide] = useState(0);
  const slideIcons = [
    "bar-chart-line",
    "calendar3",
    "volume-mute",
    "clipboard2-pulse",
    "heart-pulse",
  ];
  useEffect(() => {
    if (!open) return;
    setSlide(0);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const key = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight" || event.key === " ")
        setSlide((value) => Math.min(presentationSlides.length - 1, value + 1));
      if (event.key === "ArrowLeft")
        setSlide((value) => Math.max(0, value - 1));
    };
    window.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", key);
    };
  }, [open, onClose]);
  const current = presentationSlides[slide];
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="presentation-mode"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <header>
            <span>
              <i className="bi bi-heart-pulse" /> Saúde do Homem
            </span>
            <div>
              <small>Use ← → ou espaço</small>
              <button onClick={onClose}>
                <i className="bi bi-x-lg" />
              </button>
            </div>
          </header>
          <AnimatePresence mode="wait">
            <motion.section
              key={slide}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.35 }}
            >
              <div className="presentation-copy">
                <span>
                  {current[0]} · {current[3]}
                </span>
                <strong>{current[1]}</strong>
                <p>{current[2]}</p>
              </div>
              <div className="presentation-visual">
                <i className={`bi bi-${slideIcons[slide]}`} />
                <span>0{slide + 1}</span>
                <div />
                <div />
                <div />
              </div>
            </motion.section>
          </AnimatePresence>
          <footer className="presentation-controls">
            <div>
              {presentationSlides.map((_, index) => (
                <i key={index} className={index === slide ? "active" : ""} />
              ))}
            </div>
            <span>
              {current[0]} / 0{presentationSlides.length}
            </span>
            <nav>
              <button
                onClick={() => setSlide(Math.max(0, slide - 1))}
                disabled={slide === 0}
              >
                <i className="bi bi-arrow-left" />
              </button>
              <button
                onClick={() =>
                  setSlide(Math.min(presentationSlides.length - 1, slide + 1))
                }
                disabled={slide === presentationSlides.length - 1}
              >
                <i className="bi bi-arrow-right" />
              </button>
            </nav>
          </footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const silenceWords = ["Vergonha", "Medo", "Preconceito", "Desinformação"];
const commitments = [
  ["chat-heart", "Conversar com alguém"],
  ["share", "Compartilhar informação"],
  ["heart-pulse", "Cuidar da própria saúde"],
  ["hospital", "Procurar orientação"],
];

function AudienceExperience({ open, onClose }) {
  const [step, setStep] = useState(0);
  const [numberOpen, setNumberOpen] = useState(false);
  const [broken, setBroken] = useState([]);
  const [chosen, setChosen] = useState([]);

  useEffect(() => {
    if (!open) return;
    setStep(0);
    setNumberOpen(false);
    setBroken([]);
    setChosen([]);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const key = (event) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", key);
    };
  }, [open, onClose]);

  const toggleCommitment = (index) =>
    setChosen((items) =>
      items.includes(index)
        ? items.filter((item) => item !== index)
        : [...items, index],
    );
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="audience-experience"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <header>
            <span>
              <i className="bi bi-stars" /> Experiência com a turma
            </span>
            <button onClick={onClose}>
              <i className="bi bi-x-lg" />
            </button>
          </header>
          <div className="audience-progress">
            {[0, 1, 2, 3].map((item) => (
              <i
                key={item}
                className={item === step ? "active" : item < step ? "done" : ""}
              />
            ))}
          </div>
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.section
                className="audience-act mystery-act"
                key="mystery"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <span>ATO 01 · O NÚMERO MISTERIOSO</span>
                <p>Antes de revelar, pergunte à turma:</p>
                <h2>77.920</h2>
                <h3>O que este número representa?</h3>
                <AnimatePresence>
                  {numberOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <strong>novos casos estimados por ano</strong>
                      <small>
                        de câncer de próstata no Brasil, entre 2026 e 2028 ·
                        INCA
                      </small>
                    </motion.div>
                  )}
                </AnimatePresence>
                <button
                  onClick={() =>
                    numberOpen ? setStep(1) : setNumberOpen(true)
                  }
                >
                  {numberOpen ? "Continuar" : "Revelar resposta"}{" "}
                  <i className="bi bi-arrow-right" />
                </button>
              </motion.section>
            )}
            {step === 1 && (
              <motion.section
                className="audience-act silence-act"
                key="silence"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <span>ATO 02 · QUEBRE O SILÊNCIO</span>
                <h2>O que impede tantos homens de falar sobre saúde?</h2>
                <p>
                  Peça à turma para escolher uma palavra. Clique para quebrá-la.
                </p>
                <div>
                  {silenceWords.map((word, index) => (
                    <motion.button
                      key={word}
                      className={broken.includes(index) ? "broken" : ""}
                      onClick={() =>
                        setBroken((items) =>
                          items.includes(index) ? items : [...items, index],
                        )
                      }
                      animate={
                        broken.includes(index)
                          ? {
                              opacity: 0,
                              scale: 0.7,
                              rotate: index % 2 ? 8 : -8,
                            }
                          : { opacity: 1, scale: 1 }
                      }
                    >
                      {word}
                      <i className="bi bi-lightning-fill" />
                    </motion.button>
                  ))}
                </div>
                <AnimatePresence>
                  {broken.length === silenceWords.length && (
                    <motion.aside
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <strong>O silêncio também é um obstáculo.</strong>
                      <span>Informação é o primeiro passo.</span>
                      <button onClick={() => setStep(2)}>
                        Construir uma atitude{" "}
                        <i className="bi bi-arrow-right" />
                      </button>
                    </motion.aside>
                  )}
                </AnimatePresence>
              </motion.section>
            )}
            {step === 2 && (
              <motion.section
                className="audience-act ribbon-act"
                key="ribbon"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="ribbon-copy">
                  <span>ATO 03 · ESCOLHA UMA ATITUDE</span>
                  <h2>Como podemos transformar informação em cuidado?</h2>
                  <p>
                    Peça à turma para escolher atitudes. Cada escolha acende uma
                    parte do laço.
                  </p>
                  <div>
                    {commitments.map(([icon, label], index) => (
                      <button
                        key={label}
                        className={chosen.includes(index) ? "active" : ""}
                        onClick={() => toggleCommitment(index)}
                      >
                        <i className={`bi bi-${icon}`} />
                        {label}
                        <span>{chosen.includes(index) ? "✓" : "+"}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="collective-ribbon">
                  <svg viewBox="0 0 360 430" aria-label="Laço azul coletivo">
                    <path
                      className="ribbon-base"
                      d="M180 70 C95 18 54 94 101 156 C130 194 166 211 180 230 C194 211 230 194 259 156 C306 94 265 18 180 70Z"
                    />
                    <path
                      className="ribbon-base"
                      d="M180 230 L96 390 L163 363 L199 265"
                    />
                    <path
                      className="ribbon-base"
                      d="M180 230 L264 390 L197 363 L161 265"
                    />
                    <path
                      className="ribbon-light"
                      style={{ opacity: chosen.length > 0 ? 1 : 0 }}
                      d="M180 70 C95 18 54 94 101 156 C130 194 166 211 180 230"
                    />
                    <path
                      className="ribbon-light"
                      style={{ opacity: chosen.length > 1 ? 1 : 0 }}
                      d="M180 70 C265 18 306 94 259 156 C230 194 194 211 180 230"
                    />
                    <path
                      className="ribbon-light"
                      style={{ opacity: chosen.length > 2 ? 1 : 0 }}
                      d="M180 230 L96 390 L163 363 L199 265"
                    />
                    <path
                      className="ribbon-light"
                      style={{ opacity: chosen.length > 3 ? 1 : 0 }}
                      d="M180 230 L264 390 L197 363 L161 265"
                    />
                  </svg>
                  <strong>{chosen.length}/4</strong>
                  <span>atitudes acesas</span>
                </div>
                {chosen.length > 0 && (
                  <button className="ribbon-next" onClick={() => setStep(3)}>
                    Levar informação adiante <i className="bi bi-arrow-right" />
                  </button>
                )}
              </motion.section>
            )}
            {step === 3 && (
              <motion.section
                className="audience-act qr-act"
                key="qr"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div>
                  <span>ATO 04 · LEVE COM VOCÊ</span>
                  <h2>A conversa não precisa terminar aqui.</h2>
                  <p>
                    Aponte a câmera para acessar informações oficiais do
                    Ministério da Saúde.
                  </p>
                  <a
                    href="https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/c/cancer-de-prostata"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Abrir fonte oficial <i className="bi bi-arrow-up-right" />
                  </a>
                </div>
                <div className="qr-card">
                  <QRCodeSVG
                    value="https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/c/cancer-de-prostata"
                    size={230}
                    bgColor="#ffffff"
                    fgColor="#171a18"
                    level="M"
                    marginSize={2}
                  />
                  <strong>INFORMAÇÃO CONFIÁVEL</strong>
                  <span>Ministério da Saúde · gov.br</span>
                </div>
                <button className="experience-finish" onClick={onClose}>
                  Encerrar experiência <i className="bi bi-check-lg" />
                </button>
              </motion.section>
            )}
          </AnimatePresence>
          <footer>
            <button
              onClick={() => setStep(Math.max(0, step - 1))}
              disabled={step === 0}
            >
              <i className="bi bi-arrow-left" /> Voltar
            </button>
            <span>0{step + 1} / 04</span>
          </footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Closing({ onBack }) {
  return (
    <section className="health-closing">
      <span>Uma conversa pode iniciar um cuidado.</span>
      <h2>
        Informação não substitui o médico.
        <br />
        <em>Mas pode ser o primeiro passo.</em>
      </h2>
      <div>
        <a
          href="https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/c/cancer-de-prostata"
          target="_blank"
          rel="noreferrer"
        >
          Saiba mais no Ministério da Saúde{" "}
          <i className="bi bi-arrow-up-right" />
        </a>
        <button onClick={onBack}>Voltar à TEKOÁ</button>
      </div>
      <footer>
        <p>
          Fontes: Instituto Nacional de Câncer (INCA) e Ministério da Saúde.
        </p>
        <p>Conteúdo educativo. Não substitui avaliação médica.</p>
      </footer>
    </section>
  );
}
