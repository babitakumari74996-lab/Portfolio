import { lazy, Suspense, useEffect, useRef, useState, type CSSProperties, type FormEvent, type PointerEvent as ReactPointerEvent } from "react";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Routes, Route } from "react-router-dom";
import {
  ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronDown,
  Copy, GitBranch, Mail, Menu, MessageCircle, Minus, Phone, Plus, Send, Star, X,
} from "lucide-react";
import type { SceneKind } from "./components/ThreeScenes";

import Home from "./pages/Home";
import HeroPage from "./pages/HeroPage";
import AboutPage from "./pages/AboutPage";
import SkillsPage from "./pages/SkillsPage";
import WorkPage from "./pages/WorkPage";
import ProcessPage from "./pages/ProcessPage";
import ServicesPage from "./pages/ServicesPage";
import TestimonialsPage from "./pages/TestimonialsPage";
import StatsPage from "./pages/StatsPage";
import FAQPage from "./pages/FAQPage";
import ContactPage from "./pages/ContactPage";

gsap.registerPlugin(ScrollTrigger);

const ThreeScene = lazy(() => import("./components/ThreeScenes"));

// Replace these destinations with the freelancer's details before client launch.
const CONTACT = {
  email: "babitakumari74996@gmail.com",
  phone: "+91 92628 56086",
  phoneRaw: "919262856086",
  whatsapp: "https://wa.me/919262856086?text=Hi%2C%20I%27d%20like%20to%20discuss%20a%20website%20project.",
};

const liveCapture = (url: string) => `https://image.thum.io/get/noanimate/width/1280/crop/800/${url}`;
const backupCapture = (url: string) => `https://s0.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=1280&h=800`;

const projects = [
  {
    number: "01", name: "Gupta Furniture", category: "FURNITURE / E-COMMERCE",
    url: "https://gupta-furniture-frontend.onrender.com/",
    description: "A full furniture e-commerce experience with an in-browser 3D customization engine. Users can swap textures, adjust pricing in real time, and visualize products from every angle before they buy.",
    tech: ["React", "Three.js", "CSS 3D Transforms"], accent: "#ffb347", orbit: "amber",
    localImage: "/projects/gupta-furniture.png",
    image: backupCapture("https://gupta-furniture-frontend.onrender.com/"),
    backup: liveCapture("https://gupta-furniture-frontend.onrender.com/"),
  },
  {
    number: "02", name: "OMEX Exclusive", category: "LUXURY / FASHION",
    url: "https://omex-exclusive.vercel.app/",
    description: "A dark, editorial-grade landing page for a bespoke tailoring house. Built with a cinematic scroll narrative, a featured collection showcase, and a lookbook that feels like a fashion film.",
    tech: ["Next.js", "Tailwind CSS", "Framer Motion"], accent: "#d9b76b", orbit: "amber",
    localImage: "/projects/omex-exclusive.png",
    image: liveCapture("https://omex-exclusive.vercel.app/"),
    backup: backupCapture("https://omex-exclusive.vercel.app/"),
  },
  {
    number: "03", name: "Neonsutra", category: "CUSTOM PRODUCT / D2C",
    url: "https://neonsutra.vercel.app/",
    description: "A real-time LED neon sign customizer with live preview, template gallery, and a full checkout flow. Handcrafted-in-India branding meets a modern e-commerce engine.",
    tech: ["React", "Vite", "Tailwind CSS"], accent: "#b58cff", orbit: "violet",
    localImage: "/projects/neonsutra.png",
    image: liveCapture("https://neonsutra.vercel.app/"),
    backup: backupCapture("https://neonsutra.vercel.app/"),
  },
];

const steps = [
  { name: "Discover", code: "01", detail: "We get clear on your business, audience, goals, and what the site actually needs to do. The outcome is a focused scope, not a pile of assumptions." },
  { name: "Design", code: "02", detail: "I turn the strategy into a visual direction and responsive experience. Every layout choice has a reason, from the first impression to the final click." },
  { name: "Build", code: "03", detail: "The design becomes a fast, accessible, production-ready website with clean components, thoughtful interactions, and the details that make it feel finished." },
  { name: "AI-Polish", code: "04", detail: "AI accelerates iteration and quality checks, while I review the code, refine the copy and interactions, and make the final decisions by hand." },
  { name: "Ship", code: "05", detail: "I test across devices, connect the pieces, deploy the site, and hand over a real live URL. You leave with something your customers can use." },
];

const services = [
  { number: "01", title: "Landing Pages", description: "A sharp first impression built to turn interest into action.", price: "8k - 10k", timeline: "3 days", included: ["Responsive custom design", "Motion and interactions", "SEO basics and deployment"], variant: "landing", image: "/projects/omex-exclusive.png" },
  { number: "02", title: "E-Commerce Stores", description: "A considered storefront that makes browsing and buying effortless.", price: "35k - 45k", timeline: "7 - 9 days", included: ["Product and collection pages", "Cart and checkout flow", "Admin-ready structure"], variant: "commerce", image: "/projects/gupta-furniture.png" },
  { number: "03", title: "3D Web Experiences", description: "Interactive products and spaces your customers can explore.", price: "45k - 50k", timeline: "10 - 12 days", included: ["Interactive WebGL scenes", "Product configuration", "Performance-minded delivery"], variant: "experience", image: "/projects/neonsutra.png" },
];

const testimonials = [
  { quote: "The website feels like our brand finally caught up with our ambition. It is beautiful, fast, and actually ready to sell.", name: "Aarav S.", role: "D2C Founder" },
  { quote: "The whole process felt considered. From the first idea to the live site, every detail was handled with real care.", name: "Mira P.", role: "Atelier Owner" },
  { quote: "We needed more than a pretty page. We got a working experience that our customers genuinely enjoy using.", name: "Nikhil R.", role: "Retail Founder" },
];

const faqs = [
  { question: "How long does it take?", answer: "A focused landing page usually takes 3 to 7 days. More involved stores or 3D experiences typically take 1 to 4 weeks. Once I understand your scope, I will give you a clear timeline before we begin." },
  { question: "Do you work with existing designs?", answer: "Absolutely. I can build from your Figma files or an existing design system, refine a direction you already have, or create the design and development together from scratch." },
  { question: "Can you deploy it for me?", answer: "Yes. Deployment is part of the handoff. I can put your site live on Vercel, Netlify, or a suitable host, connect your domain, and make sure the launch is working as expected." },
  { question: "What's your revision policy?", answer: "Every project includes an agreed revision window so we can refine the result together. The exact number of rounds depends on the scope and is confirmed before the project starts." },
  { question: "Do you offer ongoing support?", answer: "Yes. I can help with updates, improvements, new features, and post-launch fixes. We can set up a support arrangement that fits your site and how often it changes." },
];

function SceneSlot({ kind, className = "", variant, selected, progress, onSelect, eager = false }: {
  kind: SceneKind; className?: string; variant?: string; selected?: number; progress?: number; onSelect?: (index: number) => void; eager?: boolean;
}) {
  const element = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(eager);

  useEffect(() => {
    if (eager) return;
    if (!element.current || !("IntersectionObserver" in window)) { setNear(true); return; }
    const observer = new IntersectionObserver(([entry]) => setNear(entry.isIntersecting), { rootMargin: "280px 0px" });
    observer.observe(element.current);
    return () => observer.disconnect();
  }, [eager]);

  return <div ref={element} className={`scene-slot ${className}`} aria-hidden="true">{near && <Suspense fallback={null}><ThreeScene kind={kind} variant={variant} selected={selected} progress={progress} onSelect={onSelect} /></Suspense>}</div>;
}

export function Preloader({ onFinish }: { onFinish: () => void }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let frame = 0;
    let timeout = 0;
    const start = performance.now();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reduced ? 250 : 850;
    const tick = (now: number) => {
      const fraction = Math.min((now - start) / duration, 1);
      setProgress(Math.round((1 - Math.pow(1 - fraction, 2.3)) * 100));
      if (fraction < 1) frame = requestAnimationFrame(tick);
      else timeout = window.setTimeout(onFinish, reduced ? 100 : 150);
    };
    frame = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(frame); window.clearTimeout(timeout); };
  }, [onFinish]);

  return <motion.div className="preloader" initial={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }} role="status" aria-label="Loading portfolio">
    <div className="preloader-top"><span>SHIPMODE.</span><span>INITIALIZING EXPERIENCE</span></div>
    <SceneSlot kind="preloader" className="preloader-scene" progress={progress} eager />
    <div className="preloader-bottom"><span>BUILDING THE NEXT FRAME</span><strong>{String(progress).padStart(3, "0")}<small>%</small></strong></div>
    <div className="preloader-track"><span style={{ transform: `scaleX(${progress / 100})` }} /></div>
  </motion.div>;
}

export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const current = { x: -100, y: -100 };
    const target = { x: -100, y: -100 };
    let frame = 0;
    const move = (event: PointerEvent) => {
      target.x = event.clientX; target.y = event.clientY;
      const active = Boolean((event.target as HTMLElement).closest("a, button, input, textarea, select, [data-cursor]"));
      if (dot.current) dot.current.style.transform = `translate3d(${target.x - 3}px, ${target.y - 3}px, 0)`;
      ring.current?.classList.toggle("cursor-active", active);
      dot.current?.classList.add("cursor-visible"); ring.current?.classList.add("cursor-visible");
    };
    const leave = () => { dot.current?.classList.remove("cursor-visible"); ring.current?.classList.remove("cursor-visible"); };
    const animate = () => {
      current.x += (target.x - current.x) * 0.16; current.y += (target.y - current.y) * 0.16;
      if (ring.current) ring.current.style.transform = `translate3d(${current.x - 19}px, ${current.y - 19}px, 0)`;
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("pointermove", move); document.removeEventListener("pointerleave", leave); };
  }, []);
  return <><div ref={ring} className="cursor-ring" /><div ref={dot} className="cursor-dot" /></>;
}

import { Link, useLocation } from "react-router-dom";

export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  const links = [{ label: "Home", href: "/" }, { label: "About", href: "/about" }, { label: "Expertise", href: "/skills" }, { label: "Work", href: "/work" }, { label: "Process", href: "/process" }];
  return <header className={`site-header ${scrolled ? "site-header-scrolled" : ""}`}>
    <nav className="nav-shell site-container" aria-label="Main navigation">
      <Link to="/" className="nav-brand" aria-label="Shipmode, back to home" onClick={() => setMenuOpen(false)}><span className="brand-orbit"><span /></span><span>SHIPMODE<span className="brand-dot">.</span></span></Link>
      <div className="nav-links">{links.map((link) => <Link key={link.href} to={link.href}>{link.label}</Link>)}</div>
      <Link className="nav-contact" to="/contact">LET'S TALK <ArrowUpRight size={15} strokeWidth={1.8} /></Link>
      <button className="menu-toggle" type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}>{menuOpen ? <X size={23} /> : <Menu size={23} />}</button>
    </nav>
    <AnimatePresence>{menuOpen && <motion.div className="mobile-menu" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
      {links.map((link) => <Link key={link.href} to={link.href} onClick={() => setMenuOpen(false)}>{link.label}<ArrowUpRight size={18} /></Link>)}
      <Link to="/contact" onClick={() => setMenuOpen(false)}>Start a project<ArrowUpRight size={18} /></Link>
    </motion.div>}</AnimatePresence>
  </header>;
}

function SectionLabel({ number, children }: { number: string; children: string }) {
  return <p className="section-label"><span>{number}</span><span className="label-line" />{children}</p>;
}

export function Hero() {
  return <section id="hero" className="hero-section" aria-labelledby="hero-title">
    <div className="hero-ambient" /><div className="hero-video"><video autoPlay muted loop={false} playsInline preload="metadata" src="/cropped.mp4" poster="" /></div><div className="hero-grain" />
    <div className="site-container hero-inner"><motion.div className="hero-copy" initial={{ opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.95, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}>
      <div className="hero-identity"><span className="hero-identity-line" /> INDEPENDENT AI-NATIVE WEB STUDIO</div>
      <p className="hero-brand-name">SHIPMODE<span>.</span></p>
      <h1 id="hero-title">I Build Websites<br />That <em>Ship.</em></h1>
      <p className="hero-subtitle">From idea to live URL &mdash; AI-assisted, human-polished, production-ready.</p>
      <div className="hero-actions"><Link to="/work" className="button button-primary">View My Work <ArrowUpRight size={19} strokeWidth={1.8} /></Link><a href={CONTACT.fiverr} target="_blank" rel="noopener noreferrer" className="button button-ghost">Hire Me on Fiverr <ArrowUpRight size={19} strokeWidth={1.8} /></a></div>
    </motion.div></div>
    <div className="hero-bottom site-container"><span className="hero-side-note">CREATIVE CODE / REAL-WORLD RESULTS</span><Link to="/about" className="scroll-cue" aria-label="Go to about page"><span>SCROLL TO EXPLORE</span><span className="scroll-cue-icon"><ArrowDown size={15} /></span></Link><span className="hero-side-note hero-side-note-right">INDIA / AVAILABLE WORLDWIDE</span></div>
  </section>;
}

export function About() {
  const [copied, setCopied] = useState(false);
  const copyEmail = async () => {
    try { await navigator.clipboard.writeText(CONTACT.email); }
    catch {
      const field = document.createElement("textarea"); field.value = CONTACT.email; document.body.appendChild(field); field.select(); document.execCommand("copy"); field.remove();
    }
    setCopied(true); window.setTimeout(() => setCopied(false), 2200);
  };
  return <section id="about" className="section about-section" aria-labelledby="about-title"><div className="site-container">
    <SectionLabel number="01 /">THE PERSON BEHIND THE PIXELS</SectionLabel>
    <div className="section-heading-row"><h2 id="about-title" className="section-title">Built with intuition.<br /><span>Backed by engineering.</span></h2><p className="section-intro">I turn ambitious ideas into websites that look exceptional and work just as hard.</p></div>
    <div className="about-grid">
      <motion.div className="about-bio about-panel" initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.7 }}>
        <span className="panel-micro">01. THE APPROACH</span><div className="about-bio-content"><span className="about-asterisk">*</span><p>I'm a freelance developer building thoughtful digital experiences for small businesses and D2C brands. I use AI to move faster, then bring the human eye to every interaction, edge case, and final detail.</p></div><span className="about-bio-foot">DESIGN THINKING <span>/</span> PRODUCTION ENGINEERING</span>
      </motion.div>
      <div className="about-globe about-panel"><span className="panel-micro">02. BASED IN INDIA</span><SceneSlot kind="globe" className="about-globe-scene" /><div className="globe-caption"><span className="location-pulse" /> INDIA <span>20.5937 N / 78.9629 E</span></div></div>
      <div className="about-metric about-panel"><span className="panel-micro">03. THE EXPERIENCE</span><div><strong>3<span>+</span></strong><p>Years building for the web</p></div></div>
      <div className="about-metric about-panel"><span className="panel-micro">04. THE OUTPUT</span><div><strong>15<span>+</span></strong><p>Projects shipped</p></div></div>
      <button className="about-email about-panel" type="button" onClick={copyEmail} aria-live="polite"><span className="panel-micro">05. LET'S CONNECT</span><span className="about-email-bottom"><span>{copied ? "Copied to clipboard" : "Copy my email"}</span>{copied ? <Check size={23} /> : <Copy size={23} strokeWidth={1.5} />}</span></button>
    </div>
    <div className="stack-marquee" aria-label="Technology stack: React, Next.js, Three.js, Tailwind, GSAP, Node.js"><span className="stack-marquee-label">TOOLS I REACH FOR</span><div className="marquee-window"><div className="marquee-track">{[0, 1].map((copy) => <div className="marquee-set" key={copy} aria-hidden={copy === 1}>{"React,Next.js,Three.js,Tailwind,GSAP,Node.js".split(",").map((item) => <span key={`${copy}-${item}`}>{item}<i /></span>)}</div>)}</div></div></div>
  </div></section>;
}

export function Skills() {
  return <section id="skills" className="section skills-section" aria-labelledby="skills-title"><div className="site-container skills-container">
    <SectionLabel number="02 /">THE TOOLKIT</SectionLabel><div className="skills-heading"><h2 id="skills-title" className="section-title">The right tools.<br /><span>For the right reasons.</span></h2><p className="section-intro">Modern frameworks, expressive motion, and a relentless focus on the finished product.</p></div>
    <div className="skills-stage" data-cursor><SceneSlot kind="skills" className="skills-scene" /><span className="skills-axis skills-axis-left">FORM / FUNCTION</span><span className="skills-axis skills-axis-right">HOVER TO EXPLORE</span></div>
  </div></section>;
}

type Project = (typeof projects)[number];

function ProjectScreenshot({ project }: { project: Project }) {
  const [source, setSource] = useState(project.localImage);
  const [failed, setFailed] = useState(false);
  const retries = useRef(0);
  const retryTimer = useRef<number | null>(null);
  useEffect(() => () => { if (retryTimer.current !== null) window.clearTimeout(retryTimer.current); }, []);

  const checkCapture = (image: HTMLImageElement) => {
    // mShots serves a small "generating preview" GIF on the first request.
    if (!source.includes("wordpress.com/mshots") || image.naturalWidth >= 800) return;
    if (retries.current >= 2) { setSource(project.backup); return; }
    retries.current += 1;
    retryTimer.current = window.setTimeout(() => setSource(`${project.image}&refresh=${Date.now()}`), 3500);
  };

  const fallback = () => {
    if (source === project.localImage) setSource(project.image);
    else if (source !== project.backup) setSource(project.backup);
    else setFailed(true);
  };

  return failed ? <div className="project-image-unavailable"><span>LIVE PREVIEW UNAVAILABLE</span><a href={project.url} target="_blank" rel="noopener noreferrer">Open the live site <ArrowUpRight size={15} /></a></div> : <img src={source} alt={`Screenshot preview of the live ${project.name} website`} loading={project.number === "01" ? "eager" : "lazy"} decoding="async" onLoad={(event) => checkCapture(event.currentTarget)} onError={fallback} />;
}

function ProjectCard({ project }: { project: Project }) {
  const tilt = useRef<HTMLDivElement>(null);
  const move = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || !tilt.current) return;
    const rect = tilt.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    tilt.current.style.setProperty("--tilt-x", `${-y * 5}deg`);
    tilt.current.style.setProperty("--tilt-y", `${x * 7}deg`);
  };
  const reset = () => { tilt.current?.style.setProperty("--tilt-x", "0deg"); tilt.current?.style.setProperty("--tilt-y", "0deg"); };
  return <article className="project-article" style={{ "--project-accent": project.accent } as CSSProperties}>
    <div className="project-visual-wrap"><SceneSlot kind="project" variant={project.orbit} className="project-orbit-scene" /><a href={project.url} target="_blank" rel="noopener noreferrer" className="project-browser-link"><div className="project-browser" ref={tilt} onPointerMove={move} onPointerLeave={reset}><div className="browser-bar"><div className="browser-dots"><i /><i /><i /></div><span>{new URL(project.url).host}</span><ArrowUpRight size={12} /></div><div className="browser-image"><ProjectScreenshot project={project} /></div></div></a></div>
    <div className="project-info"><div className="project-title-row"><div><span className="project-category">{project.number} / {project.category}</span><h3>{project.name}</h3></div><span className="project-corner-mark">{project.number}</span></div><p>{project.description}</p><div className="project-bottom"><div className="project-tech">{project.tech.map((tech) => <span key={tech}>{tech}</span>)}</div><div className="project-actions"><a href={project.url} target="_blank" rel="noopener noreferrer" className="project-live">View Live Site <ArrowUpRight size={16} /></a></div></div></div>
  </article>;
}

export function Work() {
  const stage = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!stage.current || !track.current) return;
    const stageElement = stage.current;
    const trackElement = track.current;
    const matcher = gsap.matchMedia();
    matcher.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const travel = () => Math.max(0, trackElement.scrollWidth - window.innerWidth);
      const tween = gsap.to(trackElement, { x: () => -travel(), ease: "none", scrollTrigger: {
        trigger: stageElement, start: "top top", end: () => `+=${travel() + window.innerHeight * 0.45}`,
        pin: true, scrub: 1, anticipatePin: 1, invalidateOnRefresh: true,
        onUpdate: (self) => { if (progress.current) progress.current.style.transform = `scaleX(${self.progress})`; },
      } });
      gsap.utils.toArray<HTMLElement>(".project-article", trackElement).forEach((card, index) => {
        gsap.fromTo(card,
          { y: index === 0 ? 0 : index % 2 ? 65 : -65, rotationY: index === 0 ? 0 : index % 2 ? -7 : 7, opacity: index === 0 ? 1 : 0.65 },
          { y: 0, rotationY: 0, opacity: 1, ease: "none", scrollTrigger: { trigger: card, containerAnimation: tween, start: "left right", end: "left 55%", scrub: true } },
        );
      });
    });
    document.fonts.ready.then(() => ScrollTrigger.refresh());
    return () => matcher.revert();
  }, []);
  return <section id="work" className="work-section" aria-labelledby="work-title"><div className="work-stage" ref={stage}>
    <div className="site-container work-heading"><SectionLabel number="03 /">SELECTED WORK</SectionLabel><div className="section-heading-row"><h2 id="work-title" className="section-title">Live work.<br /><span>Zero guesswork.</span></h2><p className="section-intro">Three different businesses. Three real websites. Click through and see the work for yourself.</p></div></div>
    <div className="projects-viewport"><div className="projects-track" ref={track}>{projects.map((project) => <ProjectCard project={project} key={project.name} />)}</div></div>
    <div className="work-navigation site-container"><span>01 <i /> 03</span><div className="work-progress-bar"><span ref={progress} /></div><span className="work-scroll-hint">SCROLL TO EXPLORE <ArrowRight size={14} /></span></div>
  </div></section>;
}

export function Process() {
  const [selected, setSelected] = useState(0);
  return <section id="process" className="section process-section" aria-labelledby="process-title"><div className="site-container">
    <SectionLabel number="04 /">HOW IT GETS DONE</SectionLabel>
    <div className="section-heading-row"><h2 id="process-title" className="section-title">From first thought<br /><span>to final launch.</span></h2><p className="section-intro">A clear, collaborative path from idea to a working website your business can grow with.</p></div>
    <div className="process-visual"><SceneSlot kind="process" selected={selected} onSelect={setSelected} className="process-scene" /></div>
    <div className="process-steps" role="tablist" aria-label="Project process">{steps.map((step, index) => <button key={step.name} type="button" role="tab" aria-selected={selected === index} aria-controls="process-detail" className={`process-step ${selected === index ? "process-step-active" : ""}`} onClick={() => setSelected(index)}><small>{step.code}</small><span>{step.name}</span><ArrowUpRight size={16} /></button>)}</div>
    <div id="process-detail" className="process-detail" role="tabpanel" aria-live="polite"><AnimatePresence mode="wait"><motion.div key={selected} initial={{ opacity: 0, y: 18, rotateX: -9 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} exit={{ opacity: 0, y: -12, rotateX: 8 }} transition={{ duration: 0.33 }}><span>STEP {steps[selected].code} / 05</span><h3>{steps[selected].name}</h3><p>{steps[selected].detail}</p></motion.div></AnimatePresence></div>
  </div></section>;
}

export function Services() {
  return <section id="services" className="section services-section" aria-labelledby="services-title"><div className="site-container">
    <SectionLabel number="05 /">WHAT I CAN BUILD</SectionLabel>
    <div className="section-heading-row"><h2 id="services-title" className="section-title">Good ideas deserve<br /><span>great execution.</span></h2><p className="section-intro">Whether you need a focused launch or a more ambitious digital experience, I build the whole thing.</p></div>
    <div className="services-grid">{services.map((service) => <motion.article key={service.title} className="service-card" whileHover={{ y: -10, rotateX: 2, rotateY: service.number === "02" ? 0 : service.number === "01" ? 2 : -2 }} transition={{ type: "spring", stiffness: 230, damping: 22 }}>
      <div className="service-top"><span>{service.number} / 03</span><ArrowUpRight size={17} strokeWidth={1.5} /></div>
      <div className="service-image-wrap"><img src={service.image} alt={service.title} className="service-image" /></div>
      <h3>{service.title}</h3><p className="service-description">{service.description}</p>
      <div className="service-specs"><div><span>ESTIMATED RANGE</span><strong>{service.price}</strong></div><div><span>TYPICAL DELIVERY</span><strong>{service.timeline}</strong></div></div>
      <div className="service-included"><span>WHAT'S INCLUDED</span>{service.included.map((item) => <p key={item}><Check size={14} />{item}</p>)}</div>
      <a href="#contact" className="service-link">Discuss this project <ArrowUpRight size={17} /></a>
    </motion.article>)}</div>
    <p className="services-note">Indicative ranges only. Every project is scoped and quoted individually.</p>
  </div></section>;
}

export function Testimonials() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const next = () => setActive((value) => (value + 1) % testimonials.length);
  const previous = () => setActive((value) => (value - 1 + testimonials.length) % testimonials.length);
  useEffect(() => {
    if (paused) return;
    const interval = window.setInterval(next, 5200);
    return () => window.clearInterval(interval);
  }, [paused]);
  const onDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x < -45) next();
    else if (info.offset.x > 45) previous();
  };

  return <section id="testimonials" className="section testimonials-section" aria-labelledby="testimonials-title">
    <div className="site-container testimonial-header"><SectionLabel number="06 /">KIND WORDS</SectionLabel><div className="section-heading-row"><h2 id="testimonials-title" className="section-title">The best work<br /><span>travels further.</span></h2><p className="section-intro">A space for the people behind the projects. Sample reviews shown until verified client feedback is added.</p></div></div>
    <div className="testimonial-stage" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={() => setPaused(false)}>
      <SceneSlot kind="testimonials" className="testimonial-scene" />
      <div className="testimonial-ring" aria-live="polite">{testimonials.map((item, index) => {
        const offset = ((index - active + testimonials.length + 1) % testimonials.length) - 1;
        return <motion.article key={item.name} className={`testimonial-card ${offset === 0 ? "testimonial-card-active" : ""}`}
          animate={{ x: `${offset * 84}%`, rotateY: offset * -34, scale: offset === 0 ? 1 : 0.76, opacity: offset === 0 ? 1 : 0.33, z: offset === 0 ? 90 : -140 }}
          transition={{ type: "spring", stiffness: 170, damping: 24 }}
          style={{ zIndex: offset === 0 ? 3 : 1, pointerEvents: offset === 0 ? "auto" : "none" }}
          drag={offset === 0 ? "x" : false} dragConstraints={{ left: 0, right: 0 }} dragElastic={0.4} onDragEnd={onDragEnd}>
          <div className="testimonial-stars" aria-label="5 out of 5 stars">{Array.from({ length: 5 }, (_, star) => <Star key={star} size={16} fill="currentColor" strokeWidth={1} />)}</div>
          <blockquote>"{item.quote}"</blockquote><div className="testimonial-person"><span className="testimonial-avatar">{item.name.charAt(0)}</span><div><strong>{item.name}</strong><small>{item.role} / Sample review</small></div></div>
        </motion.article>;
      })}</div>
    </div>
    <div className="testimonial-controls site-container"><span>0{active + 1} <i>/</i> 0{testimonials.length}</span><div><button type="button" onClick={previous} aria-label="Previous testimonial"><ArrowLeft size={20} /></button><button type="button" onClick={next} aria-label="Next testimonial"><ArrowRight size={20} /></button></div></div>
  </section>;
}

function AnimatedCounter({ value, decimals = 0, suffix = "" }: { value: number; decimals?: number; suffix?: string }) {
  const element = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!element.current) return;
    const target = element.current;
    let frame = 0;
    let hasRun = false;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || hasRun) return;
      hasRun = true;
      const duration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 1500;
      const start = performance.now();
      const tick = (now: number) => {
        const fraction = duration ? Math.min((now - start) / duration, 1) : 1;
        target.textContent = `${(value * (1 - Math.pow(1 - fraction, 3))).toFixed(decimals)}${suffix}`;
        if (fraction < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick); observer.disconnect();
    }, { threshold: 0.35 });
    observer.observe(target);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [value, decimals, suffix]);
  return <span ref={element}>0{suffix}</span>;
}

export function Stats() {
  const stats = [
    { value: 15, suffix: "+", label: "Projects shipped", number: "01" },
    { value: 8, suffix: "", label: "Industries served", number: "02" },
    { value: 100, suffix: "%", label: "Client satisfaction", number: "03" },
    { value: 4.9, decimals: 1, suffix: "", label: "Average rating", number: "04", star: true },
  ];
  return <section id="stats" className="section stats-section" aria-labelledby="stats-title"><SceneSlot kind="stats" className="stats-scene" /><div className="site-container stats-content">
    <SectionLabel number="07 /">THE SIGNAL</SectionLabel><h2 id="stats-title" className="section-title">Small details.<br /><span>Measurable impact.</span></h2>
    <div className="stats-grid">{stats.map((stat) => <motion.div key={stat.label} className="stat-item" initial={{ opacity: 0, y: 32, rotateX: 25 }} whileInView={{ opacity: 1, y: 0, rotateX: 0 }} viewport={{ once: true, amount: 0.45 }} transition={{ duration: 0.65 }}><span className="stat-index">{stat.number} / 04</span><strong><AnimatedCounter value={stat.value} decimals={stat.decimals} suffix={stat.suffix} />{stat.star && <Star className="stat-star" size={34} fill="currentColor" strokeWidth={1} />}</strong><p>{stat.label}</p></motion.div>)}</div>
  </div></section>;
}

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return <section id="faq" className="section faq-section" aria-labelledby="faq-title"><div className="site-container faq-layout">
    <div className="faq-intro"><SectionLabel number="08 /">GOOD TO KNOW</SectionLabel><h2 id="faq-title" className="section-title">Before we<br /><span>begin.</span></h2><p className="section-intro">A few quick answers to the questions that usually come up first.</p><SceneSlot kind="faq" className="faq-scene" /></div>
    <div className="faq-list">{faqs.map((faq, index) => <div className={`faq-item ${open === index ? "faq-item-open" : ""}`} key={faq.question}><h3><button type="button" aria-expanded={open === index} aria-controls={`faq-answer-${index}`} onClick={() => setOpen(open === index ? null : index)}><span className="faq-number">0{index + 1}</span><span>{faq.question}</span>{open === index ? <Minus size={20} /> : <Plus size={20} />}</button></h3><AnimatePresence initial={false}>{open === index && <motion.div id={`faq-answer-${index}`} className="faq-answer" initial={{ height: 0, opacity: 0, rotateX: -8 }} animate={{ height: "auto", opacity: 1, rotateX: 0 }} exit={{ height: 0, opacity: 0, rotateX: -8 }} transition={{ duration: 0.3, ease: "easeOut" }}><p>{faq.answer}</p></motion.div>}</AnimatePresence></div>)}</div>
  </div></section>;
}

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", brief: "", budget: "" });
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = encodeURIComponent(`New website inquiry from ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\nBudget: ${form.budget || "Not specified"}\n\nProject brief:\n${form.brief}`);
    window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };
  return <section id="contact" className="section contact-section" aria-labelledby="contact-title"><div className="contact-aura" /><div className="site-container contact-content">
    <SectionLabel number="09 /">OPEN A CHANNEL</SectionLabel><div className="contact-heading"><h2 id="contact-title" className="section-title">Have something<br /><span>in mind?</span></h2><p className="section-intro">Tell me what you are building. I will help turn it into a website that is ready for the real world.</p></div>
    <div className="contact-layout"><div className="contact-form-wrap"><form onSubmit={submit} className="contact-form">
      <div className="form-two"><label htmlFor="contact-name">YOUR NAME<input id="contact-name" name="name" type="text" placeholder="What should I call you?" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required /></label><label htmlFor="contact-email">EMAIL ADDRESS<input id="contact-email" name="email" type="email" placeholder="you@company.com" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required /></label></div>
      <label htmlFor="contact-brief">THE PROJECT<textarea id="contact-brief" name="brief" rows={4} placeholder="A little about what you need to build..." value={form.brief} onChange={(event) => setForm({ ...form, brief: event.target.value })} required /></label>
      <label htmlFor="contact-budget">BUDGET RANGE<span className="select-wrap"><select id="contact-budget" name="budget" value={form.budget} onChange={(event) => setForm({ ...form, budget: event.target.value })}><option value="">Select a range (optional)</option><option value="Under $500">Under $500</option><option value="$500 - $1,000">$500 - $1,000</option><option value="$1,000 - $2,000">$1,000 - $2,000</option><option value="$2,000+">$2,000+</option></select><ChevronDown size={17} /></span></label>
      <button className="button button-primary contact-submit" type="submit">Start a Project <Send size={17} strokeWidth={1.8} /></button>
      {submitted && <p className="form-feedback" role="status">Your email app should open with your project brief ready to send.</p>}
    </form><div className="contact-direct"><span>OR REACH OUT DIRECTLY</span><div><a href={`tel:${CONTACT.phoneRaw}`} className="contact-call">Call me <Phone size={14} /><span>{CONTACT.phone}</span></a><a href={`mailto:${CONTACT.email}`}>Email <Mail size={15} /></a><a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp <MessageCircle size={15} /></a></div></div></div>
      <div className="contact-earth"><SceneSlot kind="globe" variant="contact" className="contact-globe-scene" /><div className="contact-earth-caption"><span className="location-pulse" /> TRANSMITTING FROM INDIA <span>20.5937 N / 78.9629 E</span></div></div>
    </div>
  </div></section>;
}

export function Footer() {
  return <footer className="footer" aria-label="Site footer">
    <div className="site-container footer-main"><div><Link className="footer-brand" to="/">SHIPMODE<span>.</span></Link><p>Good ideas deserve to go live.</p></div><Link className="footer-top" to="/">BACK TO TOP <ArrowUpRight size={16} /></Link></div>
    <div className="site-container footer-bottom"><span>&copy; {new Date().getFullYear()} SHIPMODE. BUILT WITH INTENTION.</span>
      <a href={`tel:${CONTACT.phoneRaw}`} className="footer-call">Call me <Phone size={14} /><span>{CONTACT.phone}</span></a>
      <span>INDIA / WORLDWIDE</span></div>
    <SceneSlot kind="footer" className="footer-wave" />
  </footer>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/hero" element={<HeroPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/skills" element={<SkillsPage />} />
      <Route path="/work" element={<WorkPage />} />
      <Route path="/process" element={<ProcessPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/testimonials" element={<TestimonialsPage />} />
      <Route path="/stats" element={<StatsPage />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
  );
}