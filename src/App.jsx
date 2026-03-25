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

const sectionRise = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
  },
};

const statCards = [
  { value: "2024", label: "Started BSc (Hons) Computer Science", tone: "teal" },
  {
    value: "4+",
    label: "Major full stack and frontend projects",
    tone: "violet",
  },
  {
    value: "Full Stack",
    label: "React, Next.js, Node.js, Java, Python",
    tone: "gold",
  },
  {
    value: "GitHub",
    label: "Branching, pull requests, and code reviews",
    tone: "danger",
  },
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
      "Organized CSS and maintained validation standards",
      "Developed in a team environment",
    ],
    icon: Waves,
  },
  {
    title: "Post Office Management System",
    stack: "Java, SQL, XML",
    repo: "https://github.com/Kei774/University-Projects/tree/main/Ocean%20Realm%20website%20(Group%20Project%20)",
    text: "REST API style system for post offices, parcels, and parcel history with layered architecture and database integration.",
    points: [
      "Backend development",
      "Layered architecture and error handling",
      "Database integration and Maven project management",
    ],
    icon: Cloud,
  },
];

const educationCards = [
  {
    institute:
      "University of Westminster, UK (Affiliated with Informatics Institute of Technology)",
    qualification: "BSc (Hons) in Computer Science",
    period: "September 2024 - Present",
  },
  {
    institute: "Informatics Institute of Technology (IIT), Sri Lanka",
    qualification: "Foundation in Information Technology (Merit)",
    period: "September 2023 - May 2024",
  },
  {
    institute: "Lyceum International School, Panadura",
    qualification: "Primary Education - Ordinary Level",
    period: "January 2009 - May 2024",
  },
];

const toolSkills = [
  "Git",
  "Microsoft Office",
  "Documentation Tools",
  "React",
  "ClickUp",
  "Figma",
  "Next.js",
  "Node.js",
  "Java",
  "Python",
  "SQL",
];

const softSkills = [
  "Leadership",
  "Communication",
  "Collaboration",
  "Fast Learner",
  "Time Management",
  "Adaptability",
];

const extracurricular = [
  "Swimming - Regular training and recreational participation",
  "Chess - Strategy based gameplay and problem solving",
  "Football - Team participation and collaboration",
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

function Preloader({ onDone }) {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPct((p) => {
        if (p >= 100) {
          clearInterval(timer);
          return 100;
        }
        return p + 2;
      });
    }, 40);

    const done = setTimeout(onDone, 2600);
    return () => {
      clearInterval(timer);
      clearTimeout(done);
    };
  }, [onDone]);

  return (
    <motion.div
      className="preloader"
      exit={{ opacity: 0, y: "-100%", transition: { duration: 0.8 } }}>
      <div className="preloader-grid" />
      <HeartPulse className="preloader-heart" />
      <p className="mono-tag">SENUKA PORTFOLIO BOOT</p>
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
    const onUp = () => setActive(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  return (
    <>
      <div
        className={`cursor-ring ${active ? "cursor-active" : ""}`}
        style={{ left: pos.x, top: pos.y }}
      />
      <div className="cursor-dot" style={{ left: pos.x, top: pos.y }} />
    </>
  );
}

function RoleModal({ open, onClose }) {
  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="modal-wrap"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}>
        <button
          className="modal-backdrop"
          aria-label="Close"
          onClick={onClose}
        />
        <motion.div
          className="modal-card"
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.96 }}>
          <button
            className="icon-btn"
            onClick={onClose}
            aria-label="Close modal">
            <X size={18} />
          </button>
          <p className="mono-tag">Quick Contact</p>
          <h3>Get in touch</h3>
          <div className="modal-grid">
            <a
              className="role-card role-patient"
              href="mailto:senukarrodrigo.07@gmail.com">
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

function ScrollBackdrop() {
  const { scrollYProgress } = useScroll();
  const sideInfoText =
    "SENUKA RODRIGO • FULL STACK DEVELOPER • KALUTHARA, SRI LANKA • REACT • NODE.JS • JAVA • PYTHON • GITHUB: KEI774 • ";
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 88,
    damping: 24,
    mass: 0.4,
  });
  const orbAY = useTransform(smoothScroll, [0, 1], [0, 380]);
  const orbAX = useTransform(smoothScroll, [0, 1], [0, -140]);
  const orbAS = useTransform(smoothScroll, [0, 1], [1, 1.32]);

  const orbBY = useTransform(smoothScroll, [0, 1], [0, -300]);
  const orbBX = useTransform(smoothScroll, [0, 1], [0, 110]);
  const orbBS = useTransform(smoothScroll, [0, 1], [1, 1.2]);

  const sweepY = useTransform(smoothScroll, [0, 1], ["-20%", "120%"]);
  const sweepO = useTransform(
    smoothScroll,
    [0, 0.12, 0.92, 1],
    [0.2, 0.48, 0.48, 0.25],
  );

  return (
    <div className="scroll-bg" aria-hidden>
      <motion.div
        className="scroll-orb scroll-orb-a"
        style={{ y: orbAY, x: orbAX, scale: orbAS }}
      />
      <motion.div
        className="scroll-orb scroll-orb-b"
        style={{ y: orbBY, x: orbBX, scale: orbBS }}
      />
      <motion.div
        className="scroll-sweep"
        style={{ y: sweepY, opacity: sweepO }}
      />
      <div className="side-strip side-strip-left">
        <div className="side-strip-track">
          <span className="side-strip-item">{sideInfoText}</span>
          <span className="side-strip-item">{sideInfoText}</span>
        </div>
      </div>
      <div className="side-strip side-strip-right">
        <div className="side-strip-track">
          <span className="side-strip-item">{sideInfoText}</span>
          <span className="side-strip-item">{sideInfoText}</span>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [booted, setBooted] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const words = useMemo(
    () => ["FULL STACK", "REACT", "NODE.JS", "BACKEND"],
    [],
  );
  const [wordIndex, setWordIndex] = useState(0);
  const handleBootDone = useCallback(() => {
    setBooted(true);
  }, []);

  useEffect(() => {
    if (!booted) return undefined;
    const id = setInterval(() => {
      setWordIndex((i) => (i + 1) % words.length);
    }, 1800);
    return () => clearInterval(id);
  }, [booted, words.length]);

  const handleLogoNavToggle = useCallback(() => {
    if (window.innerWidth > 980) return;
    setMobileMenuOpen((open) => !open);
  }, []);

  const handleMobileNavClose = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  const handleNavItemClick = useCallback(
    (event) => {
      const href = event.currentTarget.getAttribute("href");
      if (!href || !href.startsWith("#")) return;

      const target = document.querySelector(href);
      if (!target) {
        handleMobileNavClose();
        return;
      }

      event.preventDefault();
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      target.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
      });
      handleMobileNavClose();
    },
    [handleMobileNavClose],
  );

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
          <motion.main
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9 }}>
            <header className={`top-nav ${mobileMenuOpen ? "menu-open" : ""}`}>
              <button
                type="button"
                className="logo-lockup"
                onClick={handleLogoNavToggle}
                aria-expanded={mobileMenuOpen}
                aria-controls="primary-nav">
                <HeartPulse size={18} />
                <span>Senuka Rodrigo</span>
              </button>
              <nav id="primary-nav">
                <a href="#summary" onClick={handleNavItemClick}>
                  Summary
                </a>
                <a href="#projects" onClick={handleNavItemClick}>
                  Projects
                </a>
                <a href="#education" onClick={handleNavItemClick}>
                  Education
                </a>
                <a href="#skills" onClick={handleNavItemClick}>
                  Skills
                </a>
                <a href="#references" onClick={handleNavItemClick}>
                  References
                </a>
                <a href="#contact" onClick={handleNavItemClick}>
                  Contact
                </a>
              </nav>
              <button
                className="btn btn-primary"
                onClick={() => setShowRoleModal(true)}>
                Quick Contact
              </button>
            </header>

            <section className="hero">
              <div className="hero-overlay hero-grid" />
              <motion.p
                className="mono-tag"
                initial="hidden"
                animate="show"
                variants={sectionRise}>
                Full Stack Developer • Kaluthara, Sri Lanka
              </motion.p>
              <motion.h1 initial="hidden" animate="show" variants={sectionRise}>
                SENUKA <span>RODRIGO.</span>
              </motion.h1>
              <motion.p
                initial="hidden"
                animate="show"
                variants={sectionRise}
                className="hero-copy">
                Motivated Software Engineering undergraduate with practical
                experience building web applications and backend systems. Worked
                with React, Next.js, Node.js, Java, and Python using modern
                development workflows.
              </motion.p>
              <motion.div
                className="hero-actions"
                initial="hidden"
                animate="show"
                variants={sectionRise}>
                <a
                  className="btn btn-primary"
                  href="mailto:senukarrodrigo.07@gmail.com">
                  Email Me <ArrowRight size={14} />
                </a>
                <a className="btn btn-ghost" href="tel:+94773847510">
                  Call Me <Stethoscope size={14} />
                </a>
              </motion.div>
              <motion.p
                className="mono-tag"
                initial="hidden"
                animate="show"
                variants={sectionRise}
                style={{ marginTop: 18 }}>
                SPECIALIZES IN {words[wordIndex]}
              </motion.p>
            </section>

            <section id="summary" className="section block-danger">
              <motion.p
                className="mono-tag"
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}>
                Professional Summary
              </motion.p>
              <motion.h2
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}>
                Building products with practical team execution.
              </motion.h2>
              <motion.p
                className="hero-copy"
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 18 }}
                style={{ marginBottom: 16 }}>
                Experienced in Git-based team collaboration, version control,
                and component-based frontend development with hands-on backend
                project experience.
              </motion.p>
              <div className="stats-grid">
                {statCards.map((card, i) => (
                  <motion.article
                    key={card.label}
                    className={`stat-card stat-${card.tone}`}
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}>
                    <h3>{card.value}</h3>
                    <p>{card.label}</p>
                  </motion.article>
                ))}
              </div>
            </section>

            <section id="projects" className="section block-teal">
              <motion.p
                className="mono-tag"
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}>
                Projects
              </motion.p>
              <motion.h2
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}>
                Full stack and frontend systems.
              </motion.h2>
              <div className="offer-grid">
                {projectCards.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.article
                      key={item.title}
                      className="offer-card"
                      initial={{ opacity: 0, y: 26 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.09 }}>
                      <Icon size={22} />
                      <h3>{item.title}</h3>
                      <p className="stack-line">{item.stack}</p>
                      <a
                        className="repo-link"
                        href={item.repo}
                        target="_blank"
                        rel="noreferrer">
                        View Repo
                      </a>
                      <p>{item.text}</p>
                      <ul className="bullet-list">
                        {item.points.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </motion.article>
                  );
                })}
              </div>
            </section>

            <section id="education" className="section block-violet">
              <motion.p
                className="mono-tag"
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}>
                Education and Courses
              </motion.p>
              <motion.h2
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}>
                Academic and technical foundation.
              </motion.h2>
              <div className="why-grid">
                {educationCards.map((edu) => (
                  <article key={edu.institute}>
                    <ShieldCheck size={20} />
                    <h3>{edu.qualification}</h3>
                    <p>{edu.institute}</p>
                    <p className="stack-line">{edu.period}</p>
                  </article>
                ))}
                <article>
                  <Sparkles size={20} />
                  <h3>Java Programming</h3>
                  <p className="stack-line">2025 • Distinction</p>
                  <p>
                    Completed a structured program on core Java development and
                    object-oriented design principles, including encapsulation,
                    inheritance, polymorphism, and abstraction.
                  </p>
                </article>
              </div>
            </section>

            <section id="skills" className="section block-neutral">
              <motion.p
                className="mono-tag"
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}>
                Skills and Activities
              </motion.p>
              <motion.h2
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}>
                Technical, soft skills, and extracurricular activities.
              </motion.h2>
              <div className="why-grid">
                <article>
                  <ShieldCheck size={20} />
                  <h3>Tools and Technologies</h3>
                  <div className="chip-list">
                    {toolSkills.map((item) => (
                      <span key={item} className="chip-item">
                        {item}
                      </span>
                    ))}
                  </div>
                </article>
                <article>
                  <Sparkles size={20} />
                  <h3>Soft Skills</h3>
                  <div className="chip-list">
                    {softSkills.map((item) => (
                      <span key={item} className="chip-item">
                        {item}
                      </span>
                    ))}
                  </div>
                </article>
                <article>
                  <Waves size={20} />
                  <h3>Extracurricular Activities</h3>
                  <ul className="bullet-list">
                    {extracurricular.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
                <article>
                  <CheckCircle2 size={20} />
                  <h3>Professional Focus</h3>
                  <p>
                    Continuing to strengthen full stack development across
                    frontend architecture, backend systems, team collaboration,
                    and software delivery workflows.
                  </p>
                </article>
              </div>
            </section>

            <section id="references" className="section block-danger">
              <motion.p
                className="mono-tag"
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}>
                References
              </motion.p>
              <motion.h2
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}>
                Academic and industry references.
              </motion.h2>
              <div className="offer-grid">
                {references.map((ref) => (
                  <article key={ref.email} className="offer-card">
                    <CheckCircle2 size={22} />
                    <h3>{ref.name}</h3>
                    <p>{ref.role}</p>
                    <p>{ref.org}</p>
                    <p className="stack-line">Email: {ref.email}</p>
                    <p className="stack-line">Phone: {ref.phone}</p>
                  </article>
                ))}
              </div>
            </section>

            <footer id="contact" className="footer">
              <h2>Let&apos;s build together.</h2>
              <p>
                Kaluthara, Sri Lanka • senukarrodrigo.07@gmail.com • +94 77 384
                7510
              </p>
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}>
                <a
                  className="btn btn-primary"
                  href="mailto:senukarrodrigo.07@gmail.com">
                  Email
                </a>
                <a className="btn btn-ghost" href="tel:+94773847510">
                  Phone
                </a>
                <a
                  className="btn btn-ghost"
                  href="http://www.linkedin.com/in/senuka-rodrigo"
                  target="_blank"
                  rel="noreferrer">
                  LinkedIn
                </a>
                <a
                  className="btn btn-ghost"
                  href="https://github.com/Kei774"
                  target="_blank"
                  rel="noreferrer">
                  GitHub
                </a>
              </div>
            </footer>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
