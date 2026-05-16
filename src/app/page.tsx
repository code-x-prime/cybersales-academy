"use client";

import { useState } from "react";
import {
  FaWhatsapp, FaBars, FaTimes, FaArrowRight,
  FaShieldAlt, FaHandshake, FaChartLine,
  FaCertificate, FaTrophy, FaUsers,
  FaChevronRight, FaDownload, FaCheckCircle,
  FaGraduationCap, FaBriefcase, FaTools,
  FaRocket, FaPlus, FaStar,
} from "react-icons/fa";
import { MdBusinessCenter } from "react-icons/md";
import { BsGraphUpArrow, BsShieldCheck, BsPeopleFill } from "react-icons/bs";

/* ══════════════════════════════════════════════
   CONFIG — Update these before going live
══════════════════════════════════════════════ */
const WA_NUMBER = "919999999999";               // 91 + 10-digit number
const ADMIN_EMAIL = "admissions@cybersalesacademy.in";
const BROCHURE_URL = "/brochure.pdf";              // PDF in /public/
/* ══════════════════════════════════════════════ */

interface FormState {
  name: string; email: string;
  phone: string; role: string; city: string;
}
const BLANK: FormState = { name: "", email: "", phone: "", role: "", city: "" };

/* ─── DATA ─── */
const WHY_CARDS = [
  { Icon: FaShieldAlt, bg: "bg-cyan-faint", title: "Deep Domain Knowledge", desc: "Learn cybersecurity from a business lens — CISOs, CIOs, and CFOs all think differently. Speak their language fluently." },
  { Icon: MdBusinessCenter, bg: "bg-gold-faint", title: "Consultative Sales Mastery", desc: "MEDDIC, SPIN, Challenger — master the enterprise sales frameworks used by top sellers globally." },
  { Icon: FaHandshake, bg: "bg-green-faint", title: "Channel Ecosystem Selling", desc: "Navigate MSSPs, OEMs, and distributors. Learn how to co-sell and win in India's partner landscape." },
  { Icon: BsGraphUpArrow, bg: "bg-cyan-faint", title: "Real Placement Outcomes", desc: "Top graduates receive direct interview referrals and internship placements at leading cybersecurity firms." },
];

const STAGES = [
  {
    num: "Stage 01", weeks: "Weeks 1–4", title: "Foundation",
    sub: "Building the Cybersecurity Sales Mindset",
    accent: "var(--cyan)", theme: "Core Mindset & Domain", themeColor: "c-cyan",
    items: ["Cybersecurity Landscape & Market Dynamics", "Buyer Psychology & Decision Ecosystem", "Sales Frameworks: MEDDIC, SPIN, Challenger", "From Product Pusher to Trusted Advisor"],
  },
  {
    num: "Stage 02", weeks: "Weeks 5–10", title: "Skills",
    sub: "The Consultative Sales Engine",
    accent: "var(--gold)", theme: "Hands-on Execution", themeColor: "c-gold",
    items: ["Prospecting Mastery in Cybersecurity", "Discovery & Qualification Deep Dive", "Solution Positioning & Storytelling", "Proposal to Closure & Negotiation", "Channel & Partner Ecosystem Selling", "Running Demos, PoCs & Proof of Value"],
  },
  {
    num: "Stage 03", weeks: "Weeks 11–14", title: "Performance",
    sub: "Growth & Leadership Execution",
    accent: "var(--green)", theme: "Strategic Leadership", themeColor: "c-green",
    items: ["Strategic Account Management", "Executive Presence & CXO Communication", "Data-Driven Selling & Personal Branding", "Capstone: CISO Panel Pitch + Certification"],
  },
];

interface CurriculumRow {
  wk: string; dot: string; title: string; desc: string; tag: string; label: string;
  dotStyle?: React.CSSProperties; cardStyle?: React.CSSProperties;
}
const CURRICULUM: CurriculumRow[] = [
  { wk: "WK 1", dot: "dot-cyan", title: "Cybersecurity Landscape & Market Dynamics", desc: "Map OEMs, MSSPs, Distributors, Regulators. Speak the language of cyber.", tag: "bg-cyan-faint", label: "Foundation" },
  { wk: "WK 2", dot: "dot-cyan", title: "Buyer Psychology & Decision Ecosystem", desc: "Understand CISO, CIO, CFO, CEO — their KPIs, fears, and buying triggers.", tag: "bg-cyan-faint", label: "Foundation" },
  { wk: "WK 3", dot: "dot-cyan", title: "Sales Frameworks & Consultative Approach", desc: "MEDDIC, SPIN, and Challenger — structured sales discipline for enterprise deals.", tag: "bg-cyan-faint", label: "Foundation" },
  { wk: "WK 4", dot: "dot-cyan", title: "From Product Pusher to Problem Solver", desc: "Build the Trusted Advisor mindset. Connect features → benefits → business outcomes.", tag: "bg-cyan-faint", label: "Foundation" },
  { wk: "WK 5", dot: "dot-gold", title: "Prospecting Mastery in Cybersecurity", desc: "ICPs, LinkedIn, cold email, cold calls — build a consistent lead generation rhythm.", tag: "bg-gold-faint", label: "Skills" },
  { wk: "WK 6", dot: "dot-gold", title: "Discovery & Qualification Mastery", desc: "Lead powerful 20-min discovery calls. Identify pain, urgency, and technical fit.", tag: "bg-gold-faint", label: "Skills" },
  { wk: "WK 7", dot: "dot-gold", title: "Solution Positioning & Storytelling", desc: "Craft narratives: Problem → Solution → Outcome. Win non-technical CXO audiences.", tag: "bg-gold-faint", label: "Skills" },
  { wk: "WK 8", dot: "dot-gold", title: "Proposal to Closure & Negotiation", desc: "Handle objections on cost, priority, trust. Protect value while closing deals.", tag: "bg-gold-faint", label: "Skills" },
  { wk: "WK 9", dot: "dot-gold", title: "Partner & Channel Ecosystem Selling", desc: "Co-sell with MSSPs, OEMs, distributors. Understand margin models and programs.", tag: "bg-gold-faint", label: "Skills" },
  { wk: "WK 10", dot: "dot-gold", title: "Running Demos, PoCs & Proof of Value", desc: "Align PoC scope with customer pain. Convert technical success to business wins.", tag: "bg-gold-faint", label: "Skills" },
  { wk: "WK 11", dot: "dot-green", title: "Strategic Account Management", desc: "Build account intelligence. Drive cross-sell and upsell with data-backed plans.", tag: "bg-green-faint", label: "Performance" },
  { wk: "WK 12", dot: "dot-green", title: "Executive Presence & CXO Communication", desc: "Master boardroom storytelling. Present confidently to senior CISOs and leadership.", tag: "bg-green-faint", label: "Performance" },
  { wk: "WK 13", dot: "dot-green", title: "Data-Driven Selling & Personal Branding", desc: "Pipeline metrics, forecasting accuracy, LinkedIn authority for the modern seller.", tag: "bg-green-faint", label: "Performance" },
  {
    wk: "WK 14", dot: "dot-gold", title: "🏆 Capstone Project & CCSP™ Certification", desc: "Full GTM plan + live pitch to CISO Panel. Top performers get interview placement.", tag: "bg-gold-faint", label: "Capstone",
    dotStyle: { borderColor: "var(--gold)", background: "var(--gold)" },
    cardStyle: { borderColor: "rgba(245,166,35,0.35)" },
  },
];

const WHO_CARDS = [
  { Icon: FaGraduationCap, title: "Fresh Graduates", desc: "MBA, BCA, or tech grads wanting to break into high-growth cybersecurity sales." },
  { Icon: FaBriefcase, title: "IT / Tech Sales Reps", desc: "Sales professionals wanting to specialise and earn premium compensation in cyber." },
  { Icon: FaTools, title: "Pre-Sales Engineers", desc: "Technical professionals transitioning to strategic, relationship-led sales roles." },
  { Icon: FaRocket, title: "Sales Managers", desc: "Team leaders who want to upskill and drive better pipeline performance." },
];

const OUTCOMES = [
  { Icon: FaChartLine, bg: "bg-cyan-faint", title: "Sales Ready from Day One", desc: "Complete prospecting-to-close capability. Run discovery calls, handle objections, and close enterprise deals." },
  { Icon: FaCertificate, bg: "bg-gold-faint", title: "CCSP™ Certification", desc: "Earn India's premier Certified Cybersecurity Sales Professional credential — recognised across OEMs and MSSPs." },
  { Icon: FaUsers, bg: "bg-green-faint", title: "Industry Network & Placement", desc: "Top performers receive interview referrals and internship placements at cybersecurity firms across India." },
  { Icon: BsGraphUpArrow, bg: "bg-purple-faint", title: "Pipeline & Brand Mastery", desc: "Sales dashboards, accurate forecasting, and a LinkedIn personal brand that attracts inbound opportunities." },
];

const CAPSTONE_ITEMS = [
  { title: "ICP + Persona", desc: "Identify and articulate the ideal customer profile and buyer personas." },
  { title: "Discovery Framework", desc: "Run a structured discovery session based on real pain points." },
  { title: "Proposal & ROI Model", desc: "Build a business case that justifies cybersecurity spend to the CFO." },
  { title: "CISO Panel Pitch", desc: "Present your solution live to a panel of senior industry CISOs." },
  { title: "60% Practical", desc: "Majority of assessment is based on real execution, not just theory." },
  { title: "Interview Placement", desc: "Top performers get direct access to interviews at leading firms." },
];

const TESTIMONIALS = [
  {
    quote: "The MEDDIC framework they taught changed the way I approach every enterprise deal. I closed my first ₹40L contract within 3 months of completing the program.",
    name: "Rahul Mehra",
    role: "Cybersecurity AE · Bangalore",
    emoji: "🧑‍💻",
    bg: "bg-cyan-faint",
  },
  {
    quote: "Coming from a pre-sales background, I had no idea how to handle C-suite conversations. This program gave me the confidence and the playbook to actually close.",
    name: "Priya Nair",
    role: "Enterprise Sales · Mumbai",
    emoji: "👩‍💼",
    bg: "bg-gold-faint",
  },
  {
    quote: "The CISO panel pitch in Week 14 was the most realistic sales simulation I've ever experienced. Employers instantly recognised that I was job-ready.",
    name: "Aditya Sinha",
    role: "Sales Manager · Pune",
    emoji: "🚀",
    bg: "bg-green-faint",
  },
];

const FAQS = [
  { q: "Who is this program designed for?", a: "The program is for anyone who wants to build a career in cybersecurity sales — fresh graduates, IT/tech sales reps, pre-sales engineers, and sales managers looking to specialise." },
  { q: "Do I need a technical background to enrol?", a: "No prior technical background is required. The program teaches cybersecurity concepts from a business and buyer perspective, so you learn what you need to sell effectively." },
  { q: "What is the CCSP™ certification?", a: "CCSP™ (Certified Cybersecurity Sales Professional) is India's premier credential for cybersecurity sales professionals, recognised by leading OEMs and MSSPs across the country." },
  { q: "Is the program online or in-person?", a: "The program is offered in a hybrid format — live online sessions with in-person workshops and the final CISO Panel Pitch assessment." },
  { q: "What placement support is provided?", a: "Top performers receive direct interview referrals to our partner cybersecurity companies. We also provide resume reviews, LinkedIn profile coaching, and mock interview sessions." },
  { q: "When does the next cohort start?", a: "Applications are open now. Cohorts start on a rolling basis. Fill in the enquiry form or contact us on WhatsApp to know the next available date." },
];

/* ══════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════ */
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState<FormState>(BLANK);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const closeMenu = () => setMenuOpen(false);
  const openBrochure = () => { setSuccess(false); setForm(BLANK); setModalOpen(true); };

  /* ── Form Submit: email only (no WA popup, no mailto popup) ── */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) console.error("Email API error:", await res.text());
    } catch (err) {
      console.error("Network error:", err);
    }

    setSubmitting(false);
    setSuccess(true);

    // Auto-download brochure
    const a = document.createElement("a");
    a.href = BROCHURE_URL;
    a.download = "CyberSalesAcademy-Brochure.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const WA_HREF = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
    "Hi! I'm interested in the Cybersecurity Sales Academy program. Please share details."
  )}`;



  return (
    <>
      {/* ══════════ NAV ══════════ */}
      <nav className="nav-bar" role="navigation" aria-label="Main navigation">
        <a href="/" className="nav-logo-text" aria-label="CyberSales Academy home">
          CYBER<span>SALES</span> ACADEMY
        </a>

        <ul className="desktop-nav-links" style={{ display: "flex", gap: "2.2rem", listStyle: "none", margin: 0 }}>
          {[["program", "Program"], ["curriculum", "Curriculum"], ["outcomes", "Outcomes"], ["capstone", "Certification"], ["enroll", "Enroll"]].map(([id, label]) => (
            <li key={id}>
              <a href={`#${id}`} className="nav-link" onClick={closeMenu}>{label}</a>
            </li>
          ))}
        </ul>

        <button className="nav-enroll desktop-nav-cta" onClick={openBrochure}>
          Get Brochure <FaDownload size={11} />
        </button>

        <button className="hamburger-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" aria-expanded={menuOpen}>
          {menuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <div className={`mobile-drawer ${menuOpen ? "open" : ""}`} role="menu">
        {[["program", "Program"], ["curriculum", "Curriculum"], ["outcomes", "Outcomes"], ["capstone", "Certification"]].map(([id, label]) => (
          <a key={id} href={`#${id}`} className="mob-link" onClick={closeMenu} role="menuitem">
            {label} <FaChevronRight size={11} />
          </a>
        ))}
        <button className="mob-link enroll-link" onClick={() => { closeMenu(); openBrochure(); }} style={{ background: "none", border: "none", cursor: "pointer", width: "100%", textAlign: "left" }}>
          Get Brochure <FaDownload size={12} />
        </button>
      </div>

      {/* ══════════ HERO ══════════ */}
      <section className="hero-section" id="hero" aria-label="Hero">
        <div className="hero-glow" aria-hidden="true" />

        {/* Decorative rings */}
        <div className="hero-ring" style={{ width: 600, height: 600, top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} aria-hidden="true" />
        <div className="hero-ring" style={{ width: 400, height: 400, top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} aria-hidden="true" />

        <div className="hero-badge" role="note">
          <span className="dot" aria-hidden="true" />
          India&apos;s First Cybersecurity Sales Leadership Program
        </div>

        <h1 className="hero-title">
          Build the Next
          <span className="accent">Generation</span>
          <span className="outline">of Cyber Leaders</span>
        </h1>

        <p className="hero-sub">
          A 14-week accelerator bridging technical expertise and enterprise sales mastery —
          with a CCSP™ certification that top employers across India trust.
        </p>

        <div className="hero-actions">
          <a href="#enroll" className="btn-primary">
            Apply for Next Cohort <FaArrowRight size={13} />
          </a>
          <button className="btn-ghost" onClick={openBrochure}>
            <FaDownload size={13} /> Download Brochure
          </button>
        </div>

        {/* Trust bar */}
        <div className="hero-trust" aria-label="Program highlights">
          <span className="trust-item"><BsShieldCheck size={13} color="var(--cyan)" /> CCSP™ Certified</span>
          <span className="trust-dot" aria-hidden="true" />
          <span className="trust-item"><BsPeopleFill size={13} color="var(--cyan)" /> 500+ Alumni</span>
          <span className="trust-dot" aria-hidden="true" />
          <span className="trust-item"><FaStar size={11} color="var(--gold)" /> 4.9/5 Rating</span>
          <span className="trust-dot" aria-hidden="true" />
          <span className="trust-item"><FaChartLine size={13} color="var(--cyan)" /> 100% Placement Focused</span>
        </div>
      </section>

      {/* ══════════ STATS ══════════ */}
      <div className="stats-strip" role="list" aria-label="Program statistics">
        {[
          { num: "14", label: "Weeks Intensive" },
          { num: "3", label: "Learning Stages" },
          { num: "CCSP™", label: "Industry Cert" },
          { num: "100%", label: "Placement Focused" },
          { num: "₹0", label: "Excuse for the Gap" },
        ].map((s) => (
          <div className="stat-item" key={s.label} role="listitem">
            <span className="stat-num">{s.num}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      {/* ══════════ WHY SECTION ══════════ */}
      <section id="program" aria-labelledby="why-heading">
        <div className="section-wrap">
          <div className="why-layout">
            {/* Left text */}
            <div>
              <span className="section-tag">{"//"} The Problem We Solve</span>
              <h2 id="why-heading" style={{ fontFamily: "var(--font-barlow-condensed), sans-serif", fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.02em", lineHeight: 1.06, marginBottom: "1.2rem" }}>
                The Cybersecurity<br />Talent Gap is{" "}<span style={{ color: "var(--cyan)" }}>Real</span>
              </h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "1.02rem", fontWeight: 300, lineHeight: 1.8, maxWidth: 420, marginBottom: "1.5rem" }}>
                India&apos;s cybersecurity market is booming — but there&apos;s a critical shortage of
                sales professionals who can translate technical solutions into business value.
                <strong style={{ color: "var(--text-primary)", fontWeight: 500 }}> We fix that.</strong>
              </p>
              {/* Mini stats */}
              <div style={{ display: "flex", gap: "1.5rem", marginBottom: "2rem", flexWrap: "wrap" }}>
                {[
                  { num: "$13.8B", label: "India cyber market by 2025" },
                  { num: "47%", label: "Sales talent shortage" },
                ].map((s) => (
                  <div key={s.label} style={{ borderLeft: "2px solid var(--cyan)", paddingLeft: "0.8rem" }}>
                    <div style={{ fontFamily: "var(--font-barlow-condensed), sans-serif", fontSize: "1.6rem", fontWeight: 700, color: "var(--cyan)", lineHeight: 1 }}>{s.num}</div>
                    <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "0.2rem", fontFamily: "var(--font-outfit), sans-serif" }}>{s.label}</div>
                  </div>
                ))}
              </div>
              <a href="#curriculum" className="btn-primary">
                See Full Curriculum <FaArrowRight size={13} />
              </a>
            </div>

            {/* Right — 2×2 cards */}
            <div className="why-cards-grid">
              {WHY_CARDS.map(({ Icon, bg, title, desc }) => (
                <div className="card" key={title} style={{ padding: "1.5rem" }}>
                  <div className={`card-icon ${bg}`} style={{ marginBottom: "1rem" }}>
                    <Icon size={20} />
                  </div>
                  <h3 style={{ fontFamily: "var(--font-barlow-condensed), sans-serif", fontSize: "1rem", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "0.5rem", lineHeight: 1.2 }}>
                    {title}
                  </h3>
                  <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ STAGES ══════════ */}
      <section id="stages" className="section-dark" aria-labelledby="stages-heading">
        <div className="section-dark-inner">
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <span className="section-tag" style={{ justifyContent: "center" }}>{"//"} Program Architecture</span>
            <h2 id="stages-heading" style={{ fontFamily: "var(--font-barlow-condensed), sans-serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.02em" }}>
              Three Stages. One <span style={{ color: "var(--cyan)" }}>Mission.</span>
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "1rem", fontWeight: 300, maxWidth: 500, margin: "0.8rem auto 0" }}>
              From foundational mindset to performance leadership — every stage builds on the last.
            </p>
          </div>

          <div className="stages-grid">
            {STAGES.map((s) => (
              <div className="card" key={s.title} style={{ overflow: "hidden" }}>
                <div className="accent-bar" style={{ background: s.accent }} />
                <div style={{ padding: "1.6rem 1.6rem 1.2rem", borderBottom: "1px solid var(--border)" }}>
                  <span style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: "0.6rem", color: "var(--text-muted)", letterSpacing: "0.15em", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>
                    {s.num} · {s.weeks}
                  </span>
                  <div style={{ fontFamily: "var(--font-barlow-condensed), sans-serif", fontSize: "1.5rem", fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                    {s.title}
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>{s.sub}</div>
                </div>
                <div style={{ padding: "1.4rem 1.6rem" }}>
                  <div className={s.themeColor} style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: "0.64rem", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1rem" }}>
                    {"//"} {s.theme}
                  </div>
                  <ul className="week-list">
                    {s.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ CURRICULUM ══════════ */}
      <section id="curriculum" aria-labelledby="curriculum-heading">
        <div className="section-wrap">
          <span className="section-tag">{"//"} Week-by-Week Breakdown</span>
          <h2 id="curriculum-heading" style={{ fontFamily: "var(--font-barlow-condensed), sans-serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.02em" }}>
            The Full <span style={{ color: "var(--cyan)" }}>14-Week</span> Journey
          </h2>

          <div className="timeline-wrap">
            <div className="tl-line" aria-hidden="true" />
            {CURRICULUM.map((row, i) => (
              <div className="tl-row" key={i}>
                <span className="tl-label" aria-label={`Week ${i + 1}`}>{row.wk}</span>
                <div className={`tl-dot ${row.dot}`} style={row.dotStyle} aria-hidden="true" />
                <div className="tl-card" style={row.cardStyle}>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <h4>{row.title}</h4>
                    <p>{row.desc}</p>
                  </div>
                  <span className={`tl-tag ${row.tag}`} aria-label={`Stage: ${row.label}`}>{row.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ WHO IS THIS FOR ══════════ */}
      <section className="section-dark" aria-labelledby="who-heading">
        <div className="section-dark-inner">
          <span className="section-tag">{"//"} Who Should Enroll</span>
          <h2 id="who-heading" style={{ fontFamily: "var(--font-barlow-condensed), sans-serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.02em" }}>
            Built for Ambitious <span style={{ color: "var(--cyan)" }}>Professionals</span>
          </h2>
          <div className="who-grid">
            {WHO_CARDS.map(({ Icon, title, desc }) => (
              <div className="card" key={title} style={{ padding: "2rem 1.5rem", textAlign: "center" }}>
                <div style={{ width: 58, height: 58, borderRadius: "50%", background: "rgba(0,212,255,0.08)", border: "1.5px solid var(--border-strong)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.1rem", color: "var(--cyan)" }}>
                  <Icon size={22} />
                </div>
                <h3 style={{ fontFamily: "var(--font-barlow-condensed), sans-serif", fontSize: "1.1rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.6rem" }}>
                  {title}
                </h3>
                <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.65 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ OUTCOMES ══════════ */}
      <section id="outcomes" aria-labelledby="outcomes-heading">
        <div className="section-wrap">
          <span className="section-tag">{"//"} What You Walk Away With</span>
          <h2 id="outcomes-heading" style={{ fontFamily: "var(--font-barlow-condensed), sans-serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.02em" }}>
            Real Skills. Real <span style={{ color: "var(--cyan)" }}>Outcomes.</span>
          </h2>
          <div className="outcomes-grid">
            {OUTCOMES.map(({ Icon, bg, title, desc }) => (
              <div className="card" key={title} style={{ padding: "2rem", display: "flex", gap: "1.2rem", alignItems: "flex-start" }}>
                <div className={`card-icon ${bg}`} style={{ marginTop: "0.1rem" }}>
                  <Icon size={20} />
                </div>
                <div>
                  <h3 style={{ fontFamily: "var(--font-barlow-condensed), sans-serif", fontSize: "1.1rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.55rem" }}>
                    {title}
                  </h3>
                  <p style={{ fontSize: "0.83rem", color: "var(--text-secondary)", lineHeight: 1.65 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ TESTIMONIALS ══════════ */}
      <section className="section-dark" aria-labelledby="testimonials-heading">
        <div className="section-dark-inner">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span className="section-tag" style={{ justifyContent: "center" }}>{"//"} From Our Alumni</span>
            <h2 id="testimonials-heading" style={{ fontFamily: "var(--font-barlow-condensed), sans-serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.02em" }}>
              Results That <span style={{ color: "var(--cyan)" }}>Speak.</span>
            </h2>
          </div>
          <div className="proof-grid">
            {TESTIMONIALS.map((t) => (
              <div className="proof-card" key={t.name}>
                <div className="stars">★★★★★</div>
                <p className="proof-quote">&ldquo;{t.quote}&rdquo;</p>
                <div className="proof-author">
                  <div className={`proof-avatar ${t.bg}`}>{t.emoji}</div>
                  <div>
                    <span className="proof-name">{t.name}</span>
                    <span className="proof-role">{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ CAPSTONE ══════════ */}
      <section id="capstone" aria-labelledby="capstone-heading">
        <div className="section-wrap">
          <div style={{ maxWidth: 880, margin: "0 auto", textAlign: "center" }}>
            <span className="section-tag" style={{ justifyContent: "center" }}>{"//"} Week 14 · Final Assessment</span>
            <h2 id="capstone-heading" style={{ fontFamily: "var(--font-barlow-condensed), sans-serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.02em" }}>
              The <span style={{ color: "var(--cyan)" }}>Capstone</span> Challenge
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "1rem", fontWeight: 300, maxWidth: 520, margin: "0.8rem auto 0" }}>
              A live, end-to-end customer engagement simulation judged by a real CISO panel.
            </p>
            <div className="capstone-box">
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", background: "rgba(245,166,35,0.1)", border: "1px solid rgba(245,166,35,0.3)", color: "var(--gold)", fontFamily: "var(--font-barlow-condensed), sans-serif", fontSize: "1.05rem", fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", padding: "0.55rem 1.3rem", borderRadius: 5, marginBottom: "1.3rem" }}>
                <FaTrophy size={15} />
                Certified Cybersecurity Sales Professional (CCSP™)
              </div>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.88rem", maxWidth: 560, margin: "0 auto 2rem", lineHeight: 1.7 }}>
                Teams select a real cybersecurity solution (MDR, XDR, DLP, IAM, SOC) and build a
                complete Go-to-Market &amp; Sales Plan — then pitch it live to the CISO panel.
              </p>
              <div className="capstone-items-grid">
                {CAPSTONE_ITEMS.map((item) => (
                  <div key={item.title} style={{ textAlign: "left" }}>
                    <h4 style={{ fontFamily: "var(--font-outfit), sans-serif", fontSize: "0.88rem", fontWeight: 600, color: "var(--cyan)", marginBottom: "0.35rem" }}>
                      {item.title}
                    </h4>
                    <p style={{ fontSize: "0.79rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ FAQ ══════════ */}
      <section className="section-dark" aria-labelledby="faq-heading">
        <div className="section-dark-inner">
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <span className="section-tag" style={{ justifyContent: "center" }}>{"//"} Common Questions</span>
              <h2 id="faq-heading" style={{ fontFamily: "var(--font-barlow-condensed), sans-serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.02em" }}>
                Frequently Asked <span style={{ color: "var(--cyan)" }}>Questions</span>
              </h2>
            </div>
            {FAQS.map((faq, i) => (
              <div className="faq-item" key={i}>
                <button
                  className="faq-q"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span>{faq.q}</span>
                  <span className={`faq-icon ${openFaq === i ? "open" : ""}`} aria-hidden="true">
                    <FaPlus size={10} />
                  </span>
                </button>
                {openFaq === i && (
                  <div className="faq-body" role="region">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ CTA ══════════ */}
      <section id="enroll" style={{ position: "relative", zIndex: 1, padding: "8rem 1.5rem", textAlign: "center", overflow: "hidden" }} aria-labelledby="cta-heading">
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 600, background: "radial-gradient(ellipse,rgba(0,212,255,0.08) 0%,transparent 70%)", pointerEvents: "none" }} aria-hidden="true" />
        <span className="section-tag" style={{ justifyContent: "center" }}>{"//"} Applications Open Now</span>
        <h2 id="cta-heading" style={{ fontFamily: "var(--font-barlow-condensed), sans-serif", fontSize: "clamp(2.4rem,5.5vw,4.5rem)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.02em", lineHeight: 0.98, marginBottom: "1.3rem" }}>
          Ready to Own the<br />
          <span style={{ color: "var(--cyan)" }}>Cybersecurity Sales</span> Space?
        </h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", maxWidth: 500, margin: "0 auto 2.8rem", fontWeight: 300, lineHeight: 1.75 }}>
          Seats are limited. Join India&apos;s most focused program for
          cybersecurity sales leaders of tomorrow.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <a href={`mailto:${ADMIN_EMAIL}`} className="btn-primary">
            Apply for Next Cohort <FaArrowRight size={13} />
          </a>
          <button className="btn-ghost" onClick={openBrochure}>
            <FaDownload size={13} /> Download Brochure
          </button>
        </div>

        {/* Bottom reassurance */}
        <div style={{ display: "flex", gap: "2rem", justifyContent: "center", marginTop: "2.5rem", flexWrap: "wrap" }}>
          {["14-Week Program", "CCSP™ Certified", "Placement Support", "Limited Seats"].map((item) => (
            <span key={item} style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.78rem", color: "var(--text-muted)", fontFamily: "var(--font-outfit), sans-serif" }}>
              <FaCheckCircle size={12} color="var(--green)" /> {item}
            </span>
          ))}
        </div>
      </section>

      {/* ══════════ FOOTER ══════════ */}
      <footer
        role="contentinfo"
        style={{ position: "relative", zIndex: 1, borderTop: "1px solid var(--border)", background: "rgba(0,0,0,0.32)", padding: "2.5rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1.2rem" }}
      >
        <a href="/" className="nav-logo-text" aria-label="CyberSales Academy home">
          CYBER<span>SALES</span> ACADEMY
        </a>
        <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "var(--font-outfit), sans-serif" }}>
          © 2025 Cybersecurity Sales Academy. All rights reserved.
        </p>
        <span style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: "0.64rem", color: "var(--text-muted)", letterSpacing: "0.12em" }}>
          CCSP™ · 14 WEEKS · INDIA
        </span>
      </footer>

      {/* ══════════ WHATSAPP FLOAT ══════════ */}
      <a href={WA_HREF} target="_blank" rel="noopener noreferrer" className="wa-btn" aria-label="Chat on WhatsApp">
        <FaWhatsapp size={27} color="white" />
      </a>

      {/* ══════════ ENQUIRY MODAL ══════════ */}
      {modalOpen && (
        <div
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          onClick={(e) => { if (e.target === e.currentTarget) setModalOpen(false); }}
        >
          <div className="modal-panel">
            <button className="modal-close" onClick={() => setModalOpen(false)} aria-label="Close dialog">
              <FaTimes size={13} />
            </button>

            {!success ? (
              <>
                <span className="section-tag" style={{ marginBottom: "0.5rem" }}>{"//"} Brochure Request</span>
                <h3 id="modal-title" style={{ fontFamily: "var(--font-barlow-condensed), sans-serif", fontSize: "1.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "0.4rem", lineHeight: 1 }}>
                  Get the Full Program Guide
                </h3>
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "1.8rem", lineHeight: 1.6 }}>
                  Fill in your details — the brochure will be sent to your email &amp; our team will follow up shortly.
                </p>

                <form onSubmit={handleSubmit} noValidate>
                  <div className="form-group">
                    <label className="form-label" htmlFor="f-name">Full Name *</label>
                    <input id="f-name" className="form-ctrl" type="text" placeholder="Your full name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="f-email">Email Address *</label>
                    <input id="f-email" className="form-ctrl" type="email" placeholder="you@example.com" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="f-phone">Phone / WhatsApp *</label>
                    <input id="f-phone" className="form-ctrl" type="tel" placeholder="+91 98765 43210" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="f-role">Current Role *</label>
                    <select id="f-role" className="form-ctrl" required value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
                      <option value="">Select your role</option>
                      <option value="Fresh Graduate">Fresh Graduate (MBA / BCA / B.Tech)</option>
                      <option value="IT Tech Sales">IT / Tech Sales Representative</option>
                      <option value="Pre-Sales Engineer">Pre-Sales / Solutions Engineer</option>
                      <option value="Sales Manager">Sales Manager / Team Lead</option>
                      <option value="Cybersecurity Professional">Cybersecurity Technical Professional</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="f-city">City</label>
                    <input id="f-city" className="form-ctrl" type="text" placeholder="Mumbai, Delhi, Bangalore..." value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary"
                    style={{ width: "100%", justifyContent: "center", marginTop: "0.6rem", opacity: submitting ? 0.7 : 1 }}
                  >
                    {submitting
                      ? "Sending..."
                      : <><FaDownload size={13} /> Download Brochure</>
                    }
                  </button>

                  <p style={{ textAlign: "center", fontSize: "0.7rem", color: "var(--text-muted)", fontFamily: "var(--font-jetbrains-mono), monospace", marginTop: "0.9rem" }}>
                    🔒 Your info is only shared with our admissions team.
                  </p>
                </form>
              </>
            ) : (
              <div style={{ textAlign: "center", padding: "2rem 0" }}>
                <div style={{ width: 66, height: 66, borderRadius: "50%", background: "rgba(0,230,118,0.12)", border: "2px solid var(--green)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.3rem", color: "var(--green)" }}>
                  <FaCheckCircle size={28} />
                </div>
                <h3 style={{ fontFamily: "var(--font-barlow-condensed), sans-serif", fontSize: "1.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--green)", marginBottom: "0.6rem" }}>
                  You&apos;re All Set!
                </h3>
                <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", maxWidth: 340, margin: "0 auto 0.8rem", lineHeight: 1.7 }}>
                  The brochure download has started. Our admissions team will reach out to you shortly.
                </p>
                <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "1.8rem" }}>
                  Check your email for program details.
                </p>
                <button className="btn-primary" onClick={() => setModalOpen(false)} style={{ margin: "0 auto" }}>
                  Close <FaTimes size={12} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}