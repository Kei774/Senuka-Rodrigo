import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  Activity,
  ArrowRight,
  Brain,
  CheckCircle2,
  Cloud,
  Cpu,
  HeartPulse,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Waves,
  X,
} from "lucide-react";
import "./App.css";

/* ─────────────────────────────────────────
   Data
───────────────────────────────────────── */
const statCards = [
  { value: "2024", label: "Started BSc (Hons) Computer Science", },
  { value: "4+",   label: "Major full stack and frontend projects", },
  { value: "Full Stack", label: "React, Next.js, Node.js, Java, Python", },
  { value: "GitHub", label: "Branching, pull requests, and code reviews", },
];

const projectCards = [
  {
    title: "ReViveX",
    stack: "JavaScript, TypeScript, HTML, Next.js",
    repo: "https://github.com/ReViveX-Team-Build",
    text: "A digital rehabilitation platform where patients track their exercises with a collaborative full stack workflow.",
    points: [
      "Team-based development using Git and GitHub",
      "Version control, branching, pull requests, and code reviews",
      "UI development and component structuring",
      "Worked with real project deadlines and team coordination",
    ],
    icon: Brain,
  },
  {
    title: "Estate-Agent",
    stack: "React.js, JavaScript, HTML, CSS",
    repo: "https://github.com/Kei774/University-Projects/tree/main/esateAgent",
    text: "React-based frontend web application built using Vite for fast development and optimized builds.",
    points: [
      "Modular and scalable user interface",
      "Reusable components and clean folder organization",
      "Structured component-based architecture",
    ],
    icon: Cpu,
  },
  {
    title: "Ocean Realm Website",
    stack: "HTML, CSS, JavaScript",
    repo: "https://github.com/Kei774/University-Projects/tree/main/Ocean%20Realm%20website%20(Group%20Project%20)",
    text: "Fully structured multi-page website with consistent navigation, layout, and styling.",
    points: [
      "Applied semantic HTML across pages",
      "Organised CSS and maintained validation standards",
      "Developed in a team environment",
    ],
    icon: Waves,
  },
  {
    title: "Post Office System",
    stack: "Java, SQL, XML",
    repo: "https://github.com/Kei774/University-Projects/tree/main/Ocean%20Realm%20website%20(Group%20Project%20)",
    text: "REST API style system for post offices, parcels, and parcel history with layered architecture and database integration.",
    points: [
      "Backend development with layered architecture",
      "Error handling and database integration",
      "Maven project management",
    ],
    icon: Cloud,
  },
];

const educationCards = [
  {
    institute: "University of Westminster, UK (Affiliated with Informatics Institute of Technology)",
    qualification: "BSc (Hons) in Computer Science",
    period: "September 2024 – Present",
  },
  {
    institute: "Informatics Institute of Technology (IIT), Sri Lanka",
    qualification: "Foundation in Information Technology (Merit)",
    period: "September 2023 – May 2024",
  },
  {
    institute: "Lyceum International School, Panadura",
    qualification: "Primary Education – Ordinary Level",
    period: "January 2009 – May 2024",
  },
];

const toolSkills = [
  "Git", "Microsoft Office", "Documentation Tools", "React",
  "ClickUp", "Figma", "Next.js", "Node.js", "Java", "Python", "SQL",
];

const softSkills = [
  "Leadership", "Communication", "Collaboration",
  "Fast Learner", "Time Management", "Adaptability",
];

const extracurricular = [
  "Swimming – Regular training and recreational participation",
  "Chess – Strategy based gameplay and problem solving",
  "Football – Team participation and collaboration",
];

const references = [
  {
    name: "Mr. Niyomal Boteju",
    role: "Assistant Lecturer",
    org: "Informatics Institute of Technology",
    email: "niyomal.b@iit.ac.lk",
    phone: "+94 77 737 7313",
  },
  {
    name: "Mr. Janod Umayanga",
    role: "Software Engineer",
    org: "Inivos Technology (pvt) ltd",
    email: "janod.umayanga@inivosglobal.com",
    phone: "+94 71 056 0492",
  },
];

const TICKER_ITEMS = [
  "Full Stack", "React", "Node.js", "Java", "Python",
  "GitHub", "Sri Lanka", "Next.js", "SQL", "Figma",
  "Full Stack", "React", "Node.js", "Java", "Python",
  "GitHub", "Sri Lanka", "Next.js", "SQL", "Figma",
];

/* ─────────────────────────────────────────
   Signature paths
───────────────────────────────────────── */
const SIG_LETTERS =
  "M 45,95 C 32,55 54,18 88,36 C 110,48 104,78 80,88 C 56,98 42,122 70,134 C 96,144 128,114 148,80 C 168,46 195,40 222,55 C 242,67 240,95 220,108 C 200,121 196,142 218,148 C 250,118 282,78 316,86 C 340,93 342,122 318,130 C 296,137 288,154 312,158 M 358,95 C 355,44 368,17 399,22 C 428,27 430,58 412,72 C 400,82 374,88 406,100 C 436,112 466,70 490,86 C 512,74 540,62 564,78 C 588,94 582,125 560,135 C 538,145 524,128 528,110 C 532,92 542,80 562,78 C 584,76 606,96 608,120 C 610,144 594,165 572,170 C 550,175 530,162 532,145 M 628,108 C 648,84 670,76 686,90 L 684,162 M 716,84 C 714,56 726,46 740,53 C 754,60 752,78 740,90 L 738,164";
const SIG_UNDERLINE = "M 32,182 C 220,196 490,202 870,186";

/* ─────────────────────────────────────────
   Components
───────────────────────────────────────── */
function Preloader({ onDone }) {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPct((p) => {
        if (p >= 100) { clearInterval(timer); return 100; }
        return p + 2;
      });
    }, 40);
    const done = setTimeout(onDone, 2600);
    return () => { clearInterval(timer); clearTimeout(done); };
  }, [onDone]);

  return (
    <motion.div
      className="preloader"
      exit={{ opacity: 0, y: "-100%", transition: { duration: 0.8 } }}>
      <div className="preloader-grid" />
      <HeartPulse className="preloader-heart" />
      <p className="mono-tag">Senuka Rodrigo — Portfolio</p>
      <h1 className="brand">SENUKA</h1>
      <div className="loader-track">
        <motion.div className="loader-fill" animate={{ width: `${pct}%` }} />
      </div>
      <p className="mono-value">{String(pct).padStart(3, "0")}%</p>
    </motion.div>
  );
}

function MedicalCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    const onMove = (e) => setPos({ x: e.clientX, y: e.clientY });
    const onDown = () => setActive(true);
    const onUp   = () => setActive(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup",   onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup",   onUp);
    };
  }, []);

  return (
    <>
      <div className={`cursor-ring ${active ? "cursor-active" : ""}`} style={{ left: pos.x, top: pos.y }} />
      <div className="cursor-dot" style={{ left: pos.x, top: pos.y }} />
    </>
  );
}

function RoleModal({ open, onClose }) {
  if (!open) return null;
  return (
    <AnimatePresence>
      <motion.div className="modal-wrap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <button className="modal-backdrop" aria-label="Close" onClick={onClose} />
        <motion.div
          className="modal-card"
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.96 }}>
          <button className="icon-btn" onClick={onClose} aria-label="Close modal"><X size={18} /></button>
          <p className="mono-tag">Quick Contact</p>
          <h3>Get in touch</h3>
          <div className="modal-grid">
            <a className="role-card role-patient" href="mailto:senukarrodrigo.07@gmail.com">
              <Activity size={24} />
              <strong>Email</strong>
              <span>senukarrodrigo.07@gmail.com</span>
            </a>
            <a className="role-card role-doctor" href="tel:+94773847510">
              <Stethoscope size={24} />
              <strong>Phone</strong>
              <span>+94 77 384 7510</span>
            </a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function Marquee() {
  return (
    <div className="ticker-wrap">
      <div className="ticker-track">
        {TICKER_ITEMS.map((item, i) => (
          <span key={i} className="ticker-item">
            {item}<span className="tick-dot">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function ScrollBackdrop() {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 88, damping: 24, mass: 0.4 });

  const orbAY = useTransform(smooth, [0, 1], [0, 380]);
  const orbAX = useTransform(smooth, [0, 1], [0, -140]);
  const orbAS = useTransform(smooth, [0, 1], [1, 1.32]);
  const orbBY = useTransform(smooth, [0, 1], [0, -300]);
  const orbBX = useTransform(smooth, [0, 1], [0, 110]);
  const orbBS = useTransform(smooth, [0, 1], [1, 1.2]);
  const sweepY = useTransform(smooth, [0, 1], ["-20%", "120%"]);
  const sweepO = useTransform(smooth, [0, 0.12, 0.92, 1], [0.2, 0.48, 0.48, 0.25]);

  // Signature draw progress
  const sigProgress       = useTransform(smooth, [0, 0.88], [0, 1]);
  const underlineProgress = useTransform(smooth, [0.72, 0.96], [0, 1]);
  const dotOpacity        = useTransform(smooth, [0.38, 0.48], [0, 1]);

  return (
    <div className="scroll-bg" aria-hidden>
      <motion.div className="scroll-orb scroll-orb-a" style={{ y: orbAY, x: orbAX, scale: orbAS }} />
      <motion.div className="scroll-orb scroll-orb-b" style={{ y: orbBY, x: orbBX, scale: orbBS }} />
      <motion.div className="scroll-sweep" style={{ y: sweepY, opacity: sweepO }} />

      {/* Scroll-driven signature */}
      <div className="signature-rail signature-rail-left">
        <svg
          className="signature-svg"
          viewBox="0 0 900 200"
          preserveAspectRatio="xMidYMid meet"
          xmlns="http://www.w3.org/2000/svg">
          <motion.path
            className="signature-path"
            d={SIG_LETTERS}
            pathLength={1}
            style={{ pathLength: sigProgress }}
          />
          <motion.circle
            cx="740" cy="66" r="7"
            fill="rgba(255,120,0,0.82)"
            stroke="none"
            style={{ opacity: dotOpacity, filter: "drop-shadow(0 0 9px rgba(255,110,0,0.44))" }}
          />
          <motion.path
            className="signature-path signature-path-underline"
            d={SIG_UNDERLINE}
            pathLength={1}
            style={{ pathLength: underlineProgress }}
          />
        </svg>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   App
───────────────────────────────────────── */
function App() {
  const [booted, setBooted]           = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [navSolid, setNavSolid]       = useState(false);
  const words = useMemo(() => ["FULL STACK", "REACT", "NODE.JS", "BACKEND"], []);
  const [wordIndex, setWordIndex]     = useState(0);
  const handleBootDone = useCallback(() => setBooted(true), []);

  useEffect(() => {
    if (!booted) return;
    const id = setInterval(() => setWordIndex((i) => (i + 1) % words.length), 1800);
    return () => clearInterval(id);
  }, [booted, words.length]);

  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const fade   = { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.66, ease: [0.22,1,0.36,1] } } };
  const fadeUp = (delay = 0) => ({ initial: { opacity:0, y:20 }, whileInView: { opacity:1, y:0 }, viewport: { once: true }, transition: { duration: 0.6, ease:[0.22,1,0.36,1], delay } });

  return (
    <div className="app-shell">
      <ScrollBackdrop />
      <MedicalCursor />

      <AnimatePresence>
        {!booted && <Preloader onDone={handleBootDone} />}
      </AnimatePresence>

      <RoleModal open={showRoleModal} onClose={() => setShowRoleModal(false)} />

      <AnimatePresence>
        {booted && (
          <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}>

            {/* ── Nav ── */}
            <header className={`top-nav ${navSolid ? "nav-solid" : ""}`}>
              <div className="logo-lockup">
                <HeartPulse size={18} />
                <span>Senuka Rodrigo</span>
              </div>
              <nav>
                <a href="#summary">Summary</a>
                <a href="#projects">Projects</a>
                <a href="#education">Education</a>
                <a href="#skills">Skills</a>
                <a href="#references">References</a>
                <a href="#contact">Contact</a>
              </nav>
              <button className="btn btn-primary" onClick={() => setShowRoleModal(true)}>
                Quick Contact
              </button>
            </header>

            {/* ── Hero ── */}
            <section className="hero">
              <motion.p className="hero-eyebrow" variants={fade} initial="hidden" animate="show">
                Full Stack Developer — Kaluthara, Sri Lanka
              </motion.p>
              <motion.h1 variants={fade} initial="hidden" animate="show" transition={{ delay: 0.08 }}>
                SENUKA<span>RODRIGO.</span>
              </motion.h1>
              <motion.div
                className="hero-bottom"
                variants={fade} initial="hidden" animate="show" transition={{ delay: 0.18 }}>
                <p className="hero-copy">
                  Motivated Software Engineering undergraduate with practical experience
                  building web applications and backend systems. Worked with React, Next.js,
                  Node.js, Java, and Python using modern development workflows.
                </p>
                <div className="hero-actions">
                  <a className="btn btn-primary" href="mailto:senukarrodrigo.07@gmail.com">
                    Email Me <ArrowRight size={14} />
                  </a>
                  <a className="btn btn-ghost" href="tel:+94773847510">
                    Call Me <Stethoscope size={14} />
                  </a>
                </div>
              </motion.div>
              <span className="hero-scroll-hint">Scroll to explore</span>
            </section>

            {/* ── Ticker ── */}
            <Marquee />

            {/* ── Summary ── */}
            <section id="summary" className="section">
              <motion.p className="section-num" {...fadeUp()}>01 — Summary</motion.p>
              <motion.h2 {...fadeUp(0.06)}>
                Building products with practical team execution.
              </motion.h2>
              <motion.p className="summary-copy" {...fadeUp(0.1)}>
                Experienced in Git-based team collaboration, version control,
                and component-based frontend development with hands-on backend project experience.
                Specialises in {words[wordIndex]}.
              </motion.p>
              <div className="stats-row">
                {statCards.map((card, i) => (
                  <motion.div key={card.label} className="stat-item" {...fadeUp(i * 0.07)}>
                    <h3>{card.value}</h3>
                    <p>{card.label}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* ── Projects ── */}
            <section id="projects" className="section section-alt">
              <motion.p className="section-num" {...fadeUp()}>02 — Projects</motion.p>
              <motion.h2 {...fadeUp(0.06)}>Full stack and frontend systems.</motion.h2>
              <div className="projects-list">
                {projectCards.map((item, i) => (
                  <motion.div key={item.title} className="project-row" {...fadeUp(i * 0.07)}>
                    <span className="project-num">0{i + 1}</span>
                    <div className="project-body">
                      <h3>{item.title}</h3>
                      <p className="stack-line">{item.stack}</p>
                      <p>{item.text}</p>
                      <ul className="bullet-list">
                        {item.points.map((pt) => <li key={pt}>{pt}</li>)}
                      </ul>
                    </div>
                    <div className="project-meta">
                      <a className="repo-link" href={item.repo} target="_blank" rel="noreferrer">
                        View Repo
                      </a>
                      <a className="project-arrow" href={item.repo} target="_blank" rel="noreferrer">
                        →
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* ── Education ── */}
            <section id="education" className="section">
              <motion.p className="section-num" {...fadeUp()}>03 — Education</motion.p>
              <motion.h2 {...fadeUp(0.06)}>Academic and technical foundation.</motion.h2>
              <div className="edu-grid">
                {educationCards.map((edu) => (
                  <div key={edu.institute} className="edu-card">
                    <ShieldCheck size={20} />
                    <h3>{edu.qualification}</h3>
                    <p>{edu.institute}</p>
                    <p className="stack-line">{edu.period}</p>
                  </div>
                ))}
                <div className="edu-card">
                  <Sparkles size={20} />
                  <h3>Java Programming</h3>
                  <p className="stack-line">2025 • Distinction</p>
                  <p>
                    Completed a structured programme on core Java development and
                    object-oriented design principles, including encapsulation,
                    inheritance, polymorphism, and abstraction.
                  </p>
                </div>
              </div>
            </section>

            {/* ── Skills ── */}
            <section id="skills" className="section section-alt">
              <motion.p className="section-num" {...fadeUp()}>04 — Skills &amp; Activities</motion.p>
              <motion.h2 {...fadeUp(0.06)}>Technical, soft skills, and extracurricular.</motion.h2>
              <div className="skills-split">
                <div>
                  <div className="skills-col">
                    <h3>Tools &amp; Technologies</h3>
                    <div className="chip-list">
                      {toolSkills.map((item) => <span key={item} className="chip-item">{item}</span>)}
                    </div>
                  </div>
                  <div className="skills-col">
                    <h3>Soft Skills</h3>
                    <div className="chip-list">
                      {softSkills.map((item) => <span key={item} className="chip-item">{item}</span>)}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="skills-col">
                    <h3>Extracurricular</h3>
                    <ul className="bullet-list">
                      {extracurricular.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  </div>
                  <div className="skills-col">
                    <h3>Professional Focus</h3>
                    <p style={{ color: "var(--muted)", lineHeight: 1.7, fontSize: "0.95rem" }}>
                      Continuing to strengthen full stack development across frontend architecture,
                      backend systems, team collaboration, and software delivery workflows.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* ── References ── */}
            <section id="references" className="section">
              <motion.p className="section-num" {...fadeUp()}>05 — References</motion.p>
              <motion.h2 {...fadeUp(0.06)}>Academic and industry references.</motion.h2>
              <div className="ref-grid">
                {references.map((ref, i) => (
                  <motion.div key={ref.email} className="ref-card" {...fadeUp(i * 0.08)}>
                    <CheckCircle2 size={22} />
                    <h3>{ref.name}</h3>
                    <p>{ref.role}</p>
                    <p>{ref.org}</p>
                    <p className="stack-line">Email: {ref.email}</p>
                    <p className="stack-line">Phone: {ref.phone}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* ── Footer ── */}
            <footer id="contact" className="footer">
              <div className="footer-top">
                <motion.h2 {...fadeUp()}>
                  Let&apos;s build
                  <span>together.</span>
                </motion.h2>
                <div className="hero-actions" style={{ flexDirection: "column", alignItems: "flex-end", gap: 10 }}>
                  <a className="btn btn-primary" href="mailto:senukarrodrigo.07@gmail.com">
                    Email Me <ArrowRight size={14} />
                  </a>
                  <a className="btn btn-ghost" href="tel:+94773847510">Call Me</a>
                  <a className="btn btn-ghost" href="http://www.linkedin.com/in/senuka-rodrigo" target="_blank" rel="noreferrer">
                    LinkedIn
                  </a>
                  <a className="btn btn-ghost" href="https://github.com/Kei774" target="_blank" rel="noreferrer">
                    GitHub
                  </a>
                </div>
              </div>
              <div className="footer-meta">
                <p>Kaluthara, Sri Lanka</p>
                <p>senukarrodrigo.07@gmail.com • +94 77 384 7510</p>
                <p>© 2025 Senuka Rodrigo</p>
              </div>
            </footer>

          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
