import { useState, useEffect, useRef } from "react";

/* ─── GLOBAL STYLES ─────────────────────────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,300&family=Playfair+Display:wght@400;600;700&family=DM+Mono:wght@400;500&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg: #080c14;
      --bg2: #0d1220;
      --bg3: #111827;
      --surface: #161d2e;
      --surface2: #1c2540;
      --border: rgba(255,255,255,0.07);
      --border2: rgba(255,255,255,0.12);
      --teal: #00d4aa;
      --teal2: #00b894;
      --blue: #4f8fff;
      --blue2: #3b7de8;
      --purple: #8b5cf6;
      --amber: #f59e0b;
      --rose: #f43f5e;
      --green: #10b981;
      --text: #f0f4ff;
      --text2: #8892a4;
      --text3: #4a5568;
      --font: 'DM Sans', sans-serif;
      --display: 'Playfair Display', serif;
      --mono: 'DM Mono', monospace;
    }

    html { scroll-behavior: smooth; }
    body { background: var(--bg); color: var(--text); font-family: var(--font); overflow-x: hidden; }

    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: var(--bg2); }
    ::-webkit-scrollbar-thumb { background: var(--surface2); border-radius: 2px; }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(24px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:.5; } }
    @keyframes spin { to { transform: rotate(360deg); } }
    @keyframes shimmer {
      0%   { background-position: -200% 0; }
      100% { background-position:  200% 0; }
    }
    @keyframes floatY {
      0%,100% { transform: translateY(0); }
      50%      { transform: translateY(-8px); }
    }
    @keyframes glow {
      0%,100% { box-shadow: 0 0 20px rgba(0,212,170,0.2); }
      50%      { box-shadow: 0 0 40px rgba(0,212,170,0.5); }
    }
    @keyframes orb1 {
      0%,100% { transform: translate(0,0) scale(1); }
      33%      { transform: translate(60px,-40px) scale(1.1); }
      66%      { transform: translate(-40px,30px) scale(0.9); }
    }
    @keyframes orb2 {
      0%,100% { transform: translate(0,0) scale(1); }
      33%      { transform: translate(-80px,50px) scale(0.9); }
      66%      { transform: translate(50px,-30px) scale(1.1); }
    }
    @keyframes progressFill {
      from { width: 0%; }
      to   { width: var(--target-w); }
    }
    @keyframes countUp {
      from { opacity: 0; transform: translateY(10px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes dashAnim {
      from { stroke-dashoffset: 440; }
      to   { stroke-dashoffset: var(--target-offset); }
    }
    @keyframes slideIn {
      from { transform: translateX(-100%); opacity: 0; }
      to   { transform: translateX(0); opacity: 1; }
    }
    @keyframes toastIn {
      from { transform: translateX(120%); opacity: 0; }
      to   { transform: translateX(0); opacity: 1; }
    }
    @keyframes ripple {
      from { transform: scale(0); opacity: 0.5; }
      to   { transform: scale(4); opacity: 0; }
    }

    .animate-fadeUp { animation: fadeUp 0.6s ease both; }
    .animate-float  { animation: floatY 4s ease-in-out infinite; }
    .animate-glow   { animation: glow 2s ease-in-out infinite; }

    .glass {
      background: rgba(22, 29, 46, 0.7);
      backdrop-filter: blur(16px);
      border: 1px solid var(--border);
    }
    .glass-strong {
      background: rgba(28, 37, 64, 0.85);
      backdrop-filter: blur(24px);
      border: 1px solid var(--border2);
    }
    .gradient-text {
      background: linear-gradient(135deg, var(--teal), var(--blue), var(--purple));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .shimmer-bg {
      background: linear-gradient(90deg, var(--surface) 25%, var(--surface2) 50%, var(--surface) 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
    }
    .btn-primary {
      display: inline-flex; align-items: center; gap: 8px;
      background: linear-gradient(135deg, var(--teal), var(--blue));
      color: #000; font-weight: 600; font-family: var(--font);
      border: none; border-radius: 10px; padding: 12px 24px;
      cursor: pointer; font-size: 14px; position: relative; overflow: hidden;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(0,212,170,0.35); }
    .btn-primary:active { transform: translateY(0); }
    .btn-ghost {
      display: inline-flex; align-items: center; gap: 8px;
      background: transparent; color: var(--text2); font-weight: 500;
      border: 1px solid var(--border2); border-radius: 10px; padding: 11px 22px;
      cursor: pointer; font-size: 14px; font-family: var(--font);
      transition: all 0.2s;
    }
    .btn-ghost:hover { background: var(--surface); color: var(--text); border-color: var(--teal); }
    .card {
      background: var(--surface); border: 1px solid var(--border);
      border-radius: 16px; padding: 24px;
      transition: border-color 0.2s, box-shadow 0.2s;
    }
    .card:hover { border-color: var(--border2); box-shadow: 0 8px 32px rgba(0,0,0,0.3); }
    .tag {
      display: inline-flex; align-items: center;
      background: rgba(79,143,255,0.1); color: var(--blue);
      border: 1px solid rgba(79,143,255,0.2);
      border-radius: 6px; padding: 3px 10px; font-size: 12px; font-weight: 500;
    }
    .tag-teal {
      background: rgba(0,212,170,0.1); color: var(--teal);
      border-color: rgba(0,212,170,0.2);
    }
    .tag-purple {
      background: rgba(139,92,246,0.1); color: var(--purple);
      border-color: rgba(139,92,246,0.2);
    }
    .tag-rose {
      background: rgba(244,63,94,0.1); color: var(--rose);
      border-color: rgba(244,63,94,0.2);
    }
    .tag-amber {
      background: rgba(245,158,11,0.1); color: var(--amber);
      border-color: rgba(245,158,11,0.2);
    }
    input, select, textarea {
      font-family: var(--font); font-size: 14px;
      background: var(--bg2); color: var(--text);
      border: 1px solid var(--border2); border-radius: 10px; padding: 10px 14px;
      outline: none; width: 100%;
      transition: border-color 0.2s, box-shadow 0.2s;
    }
    input:focus, select:focus, textarea:focus {
      border-color: var(--teal); box-shadow: 0 0 0 3px rgba(0,212,170,0.1);
    }
    input::placeholder { color: var(--text3); }

    .kanban-col { min-height: 200px; transition: background 0.2s; }
    .kanban-card { cursor: grab; transition: transform 0.15s, box-shadow 0.15s; }
    .kanban-card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.4); }

    .nav-item {
      display: flex; align-items: center; gap: 10px;
      padding: 10px 14px; border-radius: 10px;
      color: var(--text2); font-size: 14px; font-weight: 500;
      cursor: pointer; transition: all 0.15s; text-decoration: none;
      border: none; background: none; width: 100%;
    }
    .nav-item:hover { background: var(--surface2); color: var(--text); }
    .nav-item.active {
      background: rgba(0,212,170,0.1); color: var(--teal);
      border: 1px solid rgba(0,212,170,0.15);
    }
    .progress-bar {
      height: 6px; background: var(--bg3); border-radius: 3px; overflow: hidden;
    }
    .progress-fill {
      height: 100%; border-radius: 3px;
      background: linear-gradient(90deg, var(--teal), var(--blue));
      animation: progressFill 1.2s ease both;
    }
    .tooltip {
      position: absolute; bottom: calc(100% + 8px); left: 50%;
      transform: translateX(-50%);
      background: var(--surface2); border: 1px solid var(--border2);
      color: var(--text); font-size: 12px; padding: 6px 10px;
      border-radius: 6px; white-space: nowrap; pointer-events: none;
      opacity: 0; transition: opacity 0.15s; z-index: 100;
    }
    [data-tooltip]:hover .tooltip { opacity: 1; }

    @media (max-width: 768px) {
      .sidebar { transform: translateX(-100%); position: fixed; z-index: 50; }
      .sidebar.open { transform: translateX(0); }
      .main-content { margin-left: 0 !important; }
    }
  `}</style>
);

/* ─── ICONS (inline SVG) ────────────────────────────────────────────────── */
const Icon = ({ name, size = 18, color = "currentColor" }) => {
  const icons = {
    dashboard: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
    jobs: <><circle cx="12" cy="12" r="9"/><path d="M9 10h6M9 14h4"/><path d="M15 6V4a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v2"/></>,
    applications: <><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></>,
    resume: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10,9 9,9 8,9"/></>,
    analytics: <><polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/></>,
    interview: <><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></>,
    insights: <><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93l-1.41 1.41M4.93 4.93l1.41 1.41M2 12h2M20 12h2M19.07 19.07l-1.41-1.41M4.93 19.07l1.41-1.41M12 2v2M12 20v2"/></>,
    bell: <><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></>,
    search: <><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>,
    star: <><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></>,
    bookmark: <><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></>,
    send: <><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22,2 15,22 11,13 2,9"/></>,
    upload: <><polyline points="16,16 12,12 8,16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></>,
    brain: <><path d="M9.5 2a2.5 2.5 0 0 1 5 0v.5a2.5 2.5 0 0 1-5 0V2z"/><path d="M9.5 21.5a2.5 2.5 0 0 1-5 0V19a2.5 2.5 0 0 1 5 0v2.5z"/><path d="M14.5 21.5a2.5 2.5 0 0 0 5 0V19a2.5 2.5 0 0 0-5 0v2.5z"/><path d="M4 10a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v4a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-4z"/></>,
    zap: <><polygon points="13,2 3,14 12,14 11,22 21,10 12,10"/></>,
    trending: <><polyline points="23,6 13.5,15.5 8.5,10.5 1,18"/><polyline points="17,6 23,6 23,12"/></>,
    user: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>,
    check: <><polyline points="20,6 9,17 4,12"/></>,
    x: <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
    plus: <><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
    arrow_right: <><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/></>,
    mic: <><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8"/></>,
    globe: <><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>,
    sparkle: <><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z"/><path d="M5 3l.75 2.25L8 6l-2.25.75L5 9l-.75-2.25L2 6l2.25-.75z"/></>,
    map: <><polygon points="1,6 1,22 8,18 16,22 23,18 23,2 16,6 8,2"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></>,
    award: <><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></>,
    chevron_down: <><polyline points="6,9 12,15 18,9"/></>,
    menu: <><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></>,
    close: <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      {icons[name]}
    </svg>
  );
};

/* ─── CIRCULAR PROGRESS ─────────────────────────────────────────────────── */
const CircularProgress = ({ value, size = 120, stroke = 8, color = "var(--teal)", label }) => {
  const r = (size - stroke * 2) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / 100) * circ;
  return (
    <div style={{ position: "relative", width: size, height: size, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--bg3)" strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(.4,0,.2,1)" }} />
      </svg>
      <div style={{ position: "absolute", textAlign: "center" }}>
        <div style={{ fontSize: size < 100 ? 18 : 26, fontWeight: 700, color: "var(--text)" }}>{value}</div>
        {label && <div style={{ fontSize: 11, color: "var(--text2)", marginTop: 2 }}>{label}</div>}
      </div>
    </div>
  );
};

/* ─── SPARKLINE ─────────────────────────────────────────────────────────── */
const Sparkline = ({ data, color = "var(--teal)", height = 40 }) => {
  const w = 120, h = height;
  const max = Math.max(...data), min = Math.min(...data);
  const px = (i) => (i / (data.length - 1)) * w;
  const py = (v) => h - ((v - min) / (max - min + 1)) * h * 0.8 - h * 0.1;
  const d = data.map((v, i) => `${i === 0 ? "M" : "L"} ${px(i)} ${py(v)}`).join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <path d={d} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

/* ─── TOAST ─────────────────────────────────────────────────────────────── */
const Toast = ({ message, type = "success", onClose }) => (
  <div style={{
    position: "fixed", bottom: 24, right: 24, zIndex: 1000,
    display: "flex", alignItems: "center", gap: 12,
    background: "var(--surface2)", border: `1px solid ${type === "success" ? "var(--teal)" : "var(--rose)"}`,
    borderRadius: 12, padding: "14px 20px", minWidth: 280,
    animation: "toastIn 0.35s cubic-bezier(.34,1.56,.64,1) both",
    boxShadow: "0 16px 40px rgba(0,0,0,0.4)"
  }}>
    <div style={{ width: 8, height: 8, borderRadius: "50%", background: type === "success" ? "var(--teal)" : "var(--rose)", flexShrink: 0 }} />
    <span style={{ fontSize: 14, color: "var(--text)", flex: 1 }}>{message}</span>
    <button onClick={onClose} style={{ background: "none", border: "none", color: "var(--text2)", cursor: "pointer" }}>
      <Icon name="x" size={16} />
    </button>
  </div>
);

/* ─── BADGE DOT ─────────────────────────────────────────────────────────── */
const BadgeDot = ({ color = "var(--teal)" }) => (
  <span style={{
    display: "inline-block", width: 8, height: 8,
    borderRadius: "50%", background: color,
    boxShadow: `0 0 6px ${color}`, flexShrink: 0
  }} />
);

/* ══════════════════════════════════════════════════════════════════════════ */
/*  PAGES                                                                     */
/* ══════════════════════════════════════════════════════════════════════════ */

/* ─── LANDING PAGE ────────────────────────────────────────────────────────── */
const LandingPage = ({ onEnter }) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const features = [
    { icon: "brain", title: "Semantic Job Matching", desc: "Vector embeddings match you to jobs by meaning, not just keywords. 94% accuracy vs traditional search.", color: "var(--teal)" },
    { icon: "zap", title: "Auto-Apply Agent", desc: "Playwright-powered browser agent fills applications intelligently across 50+ job boards.", color: "var(--blue)" },
    { icon: "trending", title: "Selection Probability", desc: "XGBoost model predicts your shortlist chance before you apply, so you focus on winning roles.", color: "var(--purple)" },
    { icon: "sparkle", title: "Dynamic Resume Tailoring", desc: "Claude AI rewrites your resume per JD in seconds. A/B test multiple versions.", color: "var(--amber)" },
    { icon: "map", title: "Career Path Intelligence", desc: "RAG-powered engine learns hiring trends and maps your next 3 roles with skills roadmap.", color: "var(--teal)" },
    { icon: "interview", title: "AI Interview Trainer", desc: "Practice with an AI interviewer. Voice analysis scores your confidence and clarity in real time.", color: "var(--blue)" },
  ];

  const stats = [
    { val: "3.2×", label: "More interviews" },
    { val: "94%", label: "Match accuracy" },
    { val: "40min", label: "Saved daily" },
    { val: "12k+", label: "Active users" },
  ];

  const testimonials = [
    { name: "Priya Sharma", role: "SDE-2 @ Google", text: "Got 4 interview calls in my first week. The resume tailoring is genuinely magical.", avatar: "PS" },
    { name: "Arjun Mehta", role: "ML Engineer @ Meesho", text: "The selection probability score helped me skip 60% of applications and focus on real opportunities.", avatar: "AM" },
    { name: "Kavya Reddy", role: "Product Manager @ Razorpay", text: "Interview trainer gave me confidence I never had. Answered STAR questions like a pro.", avatar: "KR" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      {/* BG orbs */}
      <div style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", top: "10%", left: "20%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,212,170,0.06) 0%, transparent 70%)", animation: "orb1 20s ease-in-out infinite" }} />
        <div style={{ position: "absolute", top: "50%", right: "10%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(79,143,255,0.06) 0%, transparent 70%)", animation: "orb2 25s ease-in-out infinite" }} />
      </div>

      {/* NAVBAR */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "16px 48px",
        background: scrolled ? "rgba(8,12,20,0.9)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "none",
        transition: "all 0.3s"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg, var(--teal), var(--blue))", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name="zap" size={16} color="#000" />
          </div>
          <span style={{ fontFamily: "var(--display)", fontSize: 20, fontWeight: 700, color: "var(--text)" }}>HireAI</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {["Features","Pricing","Blog"].map(l => (
            <a key={l} href="#" style={{ color: "var(--text2)", fontSize: 14, fontWeight: 500, textDecoration: "none", transition: "color 0.15s" }}
              onMouseEnter={e => e.target.style.color = "var(--text)"}
              onMouseLeave={e => e.target.style.color = "var(--text2)"}>{l}</a>
          ))}
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <button className="btn-ghost" onClick={onEnter}>Sign in</button>
          <button className="btn-primary" onClick={onEnter}>
            Get started free <Icon name="arrow_right" size={14} color="#000" />
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ position: "relative", zIndex: 1, padding: "180px 48px 100px", textAlign: "center", maxWidth: 960, margin: "0 auto" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(0,212,170,0.08)", border: "1px solid rgba(0,212,170,0.2)", borderRadius: 100, padding: "6px 16px", marginBottom: 32, animation: "fadeUp 0.6s ease both" }}>
          <BadgeDot />
          <span style={{ fontSize: 13, color: "var(--teal)", fontWeight: 500 }}>Now in public beta · 12,000+ job seekers</span>
        </div>
        <h1 style={{ fontFamily: "var(--display)", fontSize: "clamp(42px, 6vw, 80px)", fontWeight: 700, lineHeight: 1.1, marginBottom: 28, animation: "fadeUp 0.6s 0.1s ease both", opacity: 0, animationFillMode: "both" }}>
          Automate Your<br />
          <span className="gradient-text">Job Search</span> with AI
        </h1>
        <p style={{ fontSize: 20, color: "var(--text2)", lineHeight: 1.7, maxWidth: 560, margin: "0 auto 48px", animation: "fadeUp 0.6s 0.2s ease both", opacity: 0, animationFillMode: "both" }}>
          Semantic matching, auto-apply agents, and dynamic resume tailoring — powered by Claude and GPT-4. Land 3× more interviews.
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", animation: "fadeUp 0.6s 0.3s ease both", opacity: 0, animationFillMode: "both" }}>
          <button className="btn-primary" style={{ fontSize: 16, padding: "14px 32px" }} onClick={onEnter}>
            <Icon name="upload" size={16} color="#000" />
            Upload Resume — it's free
          </button>
          <button className="btn-ghost" style={{ fontSize: 16, padding: "14px 32px" }} onClick={onEnter}>
            View live demo
          </button>
        </div>

        {/* Hero UI preview */}
        <div style={{ marginTop: 80, position: "relative", animation: "fadeUp 0.8s 0.4s ease both", opacity: 0, animationFillMode: "both" }}>
          <div className="glass" style={{ borderRadius: 20, padding: 24, maxWidth: 780, margin: "0 auto", boxShadow: "0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px var(--border)" }}>
            <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
              {["#f43f5e","#f59e0b","#10b981"].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />)}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12, marginBottom: 16 }}>
              {[
                { label: "Jobs Matched", val: "247", delta: "+12 today", color: "var(--teal)" },
                { label: "Applied", val: "34", delta: "this week", color: "var(--blue)" },
                { label: "Interview Rate", val: "41%", delta: "↑ 8% avg", color: "var(--purple)" },
                { label: "ATS Score", val: "87/100", delta: "excellent", color: "var(--amber)" },
              ].map(s => (
                <div key={s.label} style={{ background: "var(--bg2)", borderRadius: 12, padding: 14, border: "1px solid var(--border)" }}>
                  <div style={{ fontSize: 11, color: "var(--text2)", marginBottom: 6 }}>{s.label}</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: s.color }}>{s.val}</div>
                  <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 4 }}>{s.delta}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[
                { title: "Senior ML Engineer", company: "Swiggy", match: 94, tag: "teal" },
                { title: "AI Product Manager", company: "Razorpay", match: 88, tag: "blue" },
              ].map(j => (
                <div key={j.title} style={{ background: "var(--bg2)", borderRadius: 10, padding: 12, border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", marginBottom: 2 }}>{j.title}</div>
                    <div style={{ fontSize: 11, color: "var(--text2)" }}>{j.company}</div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
                    <span className={`tag tag-${j.tag}`}>{j.match}% match</span>
                    <button className="btn-primary" style={{ padding: "4px 12px", fontSize: 11 }}>Apply</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ position: "absolute", inset: -1, borderRadius: 21, background: "linear-gradient(135deg, rgba(0,212,170,0.15), rgba(79,143,255,0.1))", pointerEvents: "none", zIndex: -1, filter: "blur(20px)" }} />
        </div>
      </section>

      {/* STATS */}
      <section style={{ padding: "60px 48px", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32, maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          {stats.map((s, i) => (
            <div key={s.label} style={{ animation: `fadeUp 0.5s ${i * 0.1}s ease both`, opacity: 0, animationFillMode: "both" }}>
              <div style={{ fontFamily: "var(--display)", fontSize: 40, fontWeight: 700, color: "var(--teal)", marginBottom: 4 }}>{s.val}</div>
              <div style={{ fontSize: 14, color: "var(--text2)" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding: "100px 48px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div className="tag" style={{ marginBottom: 20 }}>Platform capabilities</div>
          <h2 style={{ fontFamily: "var(--display)", fontSize: 44, fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>
            Every tool you need to<br /><span className="gradient-text">land your dream role</span>
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {features.map((f, i) => (
            <div key={f.title} className="card" style={{ animation: `fadeUp 0.5s ${i * 0.08}s ease both`, opacity: 0, animationFillMode: "both" }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: `color-mix(in srgb, ${f.color} 12%, transparent)`, border: `1px solid color-mix(in srgb, ${f.color} 25%, transparent)`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                <Icon name={f.icon} size={20} color={f.color} />
              </div>
              <div style={{ fontSize: 16, fontWeight: 600, color: "var(--text)", marginBottom: 8 }}>{f.title}</div>
              <div style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.6 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: "80px 48px", background: "var(--bg2)", borderTop: "1px solid var(--border)" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <h2 style={{ fontFamily: "var(--display)", fontSize: 40, fontWeight: 700, color: "var(--text)" }}>
            What job seekers say
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, maxWidth: 1000, margin: "0 auto" }}>
          {testimonials.map((t, i) => (
            <div key={t.name} className="card" style={{ animation: `fadeUp 0.5s ${i * 0.1}s ease both` }}>
              <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
                {[1,2,3,4,5].map(s => <Icon key={s} name="star" size={14} color="var(--amber)" />)}
              </div>
              <p style={{ fontSize: 15, color: "var(--text)", lineHeight: 1.7, marginBottom: 20, fontStyle: "italic" }}>"{t.text}"</p>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg, var(--teal), var(--blue))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#000" }}>{t.avatar}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text)" }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: "var(--text2)" }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "120px 48px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 300, background: "radial-gradient(ellipse, rgba(0,212,170,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
        <h2 style={{ fontFamily: "var(--display)", fontSize: 52, fontWeight: 700, color: "var(--text)", marginBottom: 20 }}>
          Ready to automate<br />your job search?
        </h2>
        <p style={{ color: "var(--text2)", fontSize: 18, marginBottom: 40 }}>Start for free. No credit card required.</p>
        <button className="btn-primary" style={{ fontSize: 16, padding: "16px 40px" }} onClick={onEnter}>
          <Icon name="zap" size={16} color="#000" />
          Start for free today
        </button>
      </section>
    </div>
  );
};

/* ─── MAIN APP (dashboard shell) ────────────────────────────────────────── */
const AppShell = () => {
  const [page, setPage] = useState("dashboard");
  const [toast, setToast] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const navItems = [
    { id: "dashboard", icon: "dashboard", label: "Dashboard" },
    { id: "jobs", icon: "jobs", label: "Job Matches" },
    { id: "applications", icon: "applications", label: "Applications" },
    { id: "resume", icon: "resume", label: "Resume Analyzer" },
    { id: "insights", icon: "insights", label: "AI Insights" },
    { id: "interview", icon: "interview", label: "Interview Trainer" },
    { id: "analytics", icon: "analytics", label: "Analytics" },
    { id: "settings", icon: "settings", label: "Settings" },
  ];

  return (
    <div style={{ display: "flex", height: "100vh", background: "var(--bg)", overflow: "hidden" }}>
      {/* SIDEBAR */}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`} style={{
        width: 240, background: "var(--bg2)", borderRight: "1px solid var(--border)",
        display: "flex", flexDirection: "column", flexShrink: 0,
        transition: "transform 0.3s", zIndex: 50,
        position: "relative"
      }}>
        {/* Logo */}
        <div style={{ padding: "20px 20px 16px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg, var(--teal), var(--blue))", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Icon name="zap" size={16} color="#000" />
          </div>
          <span style={{ fontFamily: "var(--display)", fontSize: 18, fontWeight: 700 }}>HireAI</span>
          <div style={{ marginLeft: "auto" }}>
            <div className="tag tag-teal" style={{ fontSize: 10, padding: "2px 7px" }}>Beta</div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ padding: 12, flex: 1, overflowY: "auto" }}>
          {navItems.map(item => (
            <button key={item.id} className={`nav-item ${page === item.id ? "active" : ""}`}
              onClick={() => setPage(item.id)}>
              <Icon name={item.icon} size={16} color={page === item.id ? "var(--teal)" : "currentColor"} />
              {item.label}
              {item.id === "jobs" && <span style={{ marginLeft: "auto", background: "var(--teal)", color: "#000", borderRadius: 10, padding: "1px 7px", fontSize: 11, fontWeight: 700 }}>12</span>}
            </button>
          ))}
        </nav>

        {/* User */}
        <div style={{ padding: 12, borderTop: "1px solid var(--border)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg, var(--teal), var(--blue))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#000", flexShrink: 0 }}>NS</div>
            <div style={{ overflow: "hidden" }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", whiteSpace: "nowrap" }}>Narasimha</div>
              <div style={{ fontSize: 11, color: "var(--text2)", whiteSpace: "nowrap" }}>AI Engineer track</div>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* TOP NAV */}
        <header style={{ height: 60, background: "var(--bg2)", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", padding: "0 24px", gap: 16, flexShrink: 0 }}>
          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10, padding: "8px 14px", maxWidth: 360, flex: 1 }}>
              <Icon name="search" size={15} color="var(--text2)" />
              <input placeholder="Search jobs, companies, skills…" style={{ border: "none", background: "transparent", padding: 0, width: "100%", fontSize: 13 }} />
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button className="btn-primary" style={{ padding: "8px 16px", fontSize: 13 }} onClick={() => showToast("Resume uploaded successfully!")}>
              <Icon name="upload" size={13} color="#000" /> Upload Resume
            </button>
            <div style={{ position: "relative", cursor: "pointer" }}>
              <Icon name="bell" size={20} color="var(--text2)" />
              <div style={{ position: "absolute", top: -2, right: -2, width: 8, height: 8, borderRadius: "50%", background: "var(--teal)", border: "2px solid var(--bg2)" }} />
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main style={{ flex: 1, overflowY: "auto", background: "var(--bg)" }}>
          <div style={{ animation: "fadeIn 0.3s ease" }} key={page}>
            {page === "dashboard" && <DashboardPage showToast={showToast} />}
            {page === "jobs" && <JobsPage showToast={showToast} />}
            {page === "applications" && <ApplicationsPage showToast={showToast} />}
            {page === "resume" && <ResumePage showToast={showToast} />}
            {page === "insights" && <InsightsPage />}
            {page === "interview" && <InterviewPage showToast={showToast} />}
            {page === "analytics" && <AnalyticsPage />}
            {page === "settings" && <SettingsPage showToast={showToast} />}
          </div>
        </main>
      </div>

      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

/* ─── DASHBOARD PAGE ─────────────────────────────────────────────────────── */
const DashboardPage = ({ showToast }) => {
  const metrics = [
    { label: "Jobs Matched", value: "247", delta: "+12 today", icon: "jobs", color: "var(--teal)", spark: [30,45,28,60,55,80,65,90,75,95] },
    { label: "Applications Sent", value: "34", delta: "7 this week", icon: "send", color: "var(--blue)", spark: [5,8,12,10,15,18,22,20,28,34] },
    { label: "Interview Rate", value: "41%", delta: "↑ 8% vs avg", icon: "award", color: "var(--purple)", spark: [20,25,22,30,28,35,33,38,40,41] },
    { label: "ATS Score", value: "87", delta: "Excellent", icon: "star", color: "var(--amber)", spark: [60,65,68,70,72,75,78,82,85,87] },
  ];

  const recentJobs = [
    { title: "Senior ML Engineer", company: "Swiggy", location: "Bangalore", match: 94, salary: "₹28–38 LPA", type: "Full-time" },
    { title: "AI Research Scientist", company: "Microsoft Research", location: "Hyderabad", match: 91, salary: "₹35–50 LPA", type: "Full-time" },
    { title: "LLM Engineer", company: "Krutrim AI", location: "Bangalore", match: 88, salary: "₹20–32 LPA", type: "Full-time" },
    { title: "MLOps Engineer", company: "Flipkart", location: "Bangalore", match: 85, salary: "₹22–34 LPA", type: "Full-time" },
  ];

  const activities = [
    { action: "Applied to", target: "Swiggy ML Engineer", time: "2 min ago", color: "var(--teal)" },
    { action: "Resume tailored for", target: "Microsoft Research", time: "1 hr ago", color: "var(--blue)" },
    { action: "Interview scheduled at", target: "Razorpay", time: "3 hr ago", color: "var(--purple)" },
    { action: "Shortlisted by", target: "Zepto AI team", time: "Yesterday", color: "var(--green)" },
  ];

  return (
    <div style={{ padding: 28 }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: "var(--text)", fontFamily: "var(--display)", marginBottom: 4 }}>
          Good morning, Narasimha ✦
        </h1>
        <p style={{ color: "var(--text2)", fontSize: 14 }}>12 new job matches since yesterday. Your ATS score improved by 5 points.</p>
      </div>

      {/* METRIC CARDS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        {metrics.map((m, i) => (
          <div key={m.label} className="card" style={{ animation: `fadeUp 0.4s ${i * 0.08}s ease both`, opacity: 0, animationFillMode: "both" }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: `color-mix(in srgb, ${m.color} 12%, transparent)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name={m.icon} size={17} color={m.color} />
              </div>
              <Sparkline data={m.spark} color={m.color} />
            </div>
            <div style={{ fontSize: 30, fontWeight: 700, color: "var(--text)", letterSpacing: "-0.5px", marginBottom: 4 }}>{m.value}</div>
            <div style={{ fontSize: 12, color: "var(--text2)", marginBottom: 4 }}>{m.label}</div>
            <div style={{ fontSize: 11, color: m.color, fontWeight: 500 }}>{m.delta}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 16, marginBottom: 16 }}>
        {/* RECENT MATCHES */}
        <div className="card">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600 }}>Top matches for you</h3>
            <span className="tag">Updated now</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {recentJobs.map((job, i) => (
              <div key={job.title} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px", background: "var(--bg2)", borderRadius: 12, border: "1px solid var(--border)", transition: "border-color 0.15s", cursor: "pointer" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "var(--teal)"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: "var(--surface2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "var(--teal)", flexShrink: 0 }}>
                  {job.company[0]}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text)", marginBottom: 3 }}>{job.title}</div>
                  <div style={{ fontSize: 12, color: "var(--text2)" }}>{job.company} · {job.location} · {job.salary}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
                  <span className="tag tag-teal" style={{ fontSize: 11 }}>{job.match}% match</span>
                  <button className="btn-primary" style={{ padding: "5px 14px", fontSize: 11 }} onClick={() => showToast(`Applying to ${job.title} at ${job.company}...`)}>
                    Auto Apply
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ACTIVITY + PROGRESS */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="card" style={{ flex: 1 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>Recent activity</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {activities.map((a, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <BadgeDot color={a.color} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, color: "var(--text2)" }}>{a.action} <span style={{ color: "var(--text)", fontWeight: 500 }}>{a.target}</span></div>
                    <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 2 }}>{a.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>Weekly goal</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { label: "Applications", done: 7, total: 10, color: "var(--teal)" },
                { label: "Resume tailors", done: 4, total: 5, color: "var(--blue)" },
                { label: "Mock interviews", done: 2, total: 3, color: "var(--purple)" },
              ].map(g => (
                <div key={g.label}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 12 }}>
                    <span style={{ color: "var(--text2)" }}>{g.label}</span>
                    <span style={{ color: "var(--text)", fontWeight: 600 }}>{g.done}/{g.total}</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ "--target-w": `${(g.done / g.total) * 100}%`, background: g.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── JOBS PAGE ────────────────────────────────────────────────────────── */
const JobsPage = ({ showToast }) => {
  const [filter, setFilter] = useState({ role: "", location: "", salary: "" });
  const [saved, setSaved] = useState(new Set());

  const jobs = [
    { id: 1, title: "Senior ML Engineer", company: "Swiggy", location: "Bangalore", salary: "₹28–38 LPA", match: 94, exp: "3–6 yrs", type: "Full-time", tags: ["PyTorch", "MLOps", "AWS"], posted: "2 hr ago" },
    { id: 2, title: "AI Research Scientist", company: "Microsoft Research", location: "Hyderabad", salary: "₹35–50 LPA", match: 91, exp: "4–8 yrs", type: "Full-time", tags: ["LLMs", "Research", "Python"], posted: "5 hr ago" },
    { id: 3, title: "LLM Engineer", company: "Krutrim AI", location: "Bangalore", salary: "₹20–32 LPA", match: 88, exp: "2–5 yrs", type: "Full-time", tags: ["LangChain", "RAG", "FastAPI"], posted: "1 day ago" },
    { id: 4, title: "MLOps Engineer", company: "Flipkart", location: "Bangalore", salary: "₹22–34 LPA", match: 85, exp: "2–4 yrs", type: "Full-time", tags: ["Kubernetes", "Kubeflow", "CI/CD"], posted: "1 day ago" },
    { id: 5, title: "Data Scientist", company: "PhonePe", location: "Bangalore", salary: "₹18–28 LPA", match: 82, exp: "2–5 yrs", type: "Full-time", tags: ["Python", "SQL", "Statistics"], posted: "2 days ago" },
    { id: 6, title: "AI Product Manager", company: "Razorpay", location: "Bangalore", salary: "₹25–40 LPA", match: 79, exp: "3–6 yrs", type: "Full-time", tags: ["Product", "AI/ML", "Strategy"], posted: "2 days ago" },
  ];

  const matchColor = (m) => m >= 90 ? "var(--teal)" : m >= 80 ? "var(--blue)" : "var(--purple)";

  return (
    <div style={{ padding: 28 }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, fontFamily: "var(--display)", marginBottom: 4 }}>Job Matches</h1>
        <p style={{ color: "var(--text2)", fontSize: 14 }}>247 jobs matched to your profile · Updated 2 minutes ago</p>
      </div>

      {/* FILTERS */}
      <div className="card" style={{ marginBottom: 20, padding: 16 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", gap: 12, alignItems: "end" }}>
          <div>
            <label style={{ fontSize: 12, color: "var(--text2)", display: "block", marginBottom: 6 }}>Role</label>
            <input placeholder="e.g. ML Engineer" value={filter.role} onChange={e => setFilter(p => ({ ...p, role: e.target.value }))} />
          </div>
          <div>
            <label style={{ fontSize: 12, color: "var(--text2)", display: "block", marginBottom: 6 }}>Location</label>
            <input placeholder="City or remote" value={filter.location} onChange={e => setFilter(p => ({ ...p, location: e.target.value }))} />
          </div>
          <div>
            <label style={{ fontSize: 12, color: "var(--text2)", display: "block", marginBottom: 6 }}>Min. salary (LPA)</label>
            <select value={filter.salary} onChange={e => setFilter(p => ({ ...p, salary: e.target.value }))}>
              <option value="">Any</option>
              <option value="10">10+</option>
              <option value="20">20+</option>
              <option value="30">30+</option>
            </select>
          </div>
          <button className="btn-primary" style={{ height: 40 }}>
            <Icon name="search" size={14} color="#000" /> Search
          </button>
        </div>
      </div>

      {/* JOB CARDS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
        {jobs.map((job, i) => (
          <div key={job.id} className="card" style={{ animation: `fadeUp 0.4s ${i * 0.06}s ease both`, opacity: 0, animationFillMode: "both", cursor: "pointer" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: "var(--bg2)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700, color: "var(--teal)" }}>
                  {job.company[0]}
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: "var(--text)" }}>{job.title}</div>
                  <div style={{ fontSize: 13, color: "var(--text2)" }}>{job.company} · {job.location}</div>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: matchColor(job.match) }}>{job.match}%</div>
                <div style={{ fontSize: 10, color: "var(--text3)", textAlign: "right" }}>match</div>
              </div>
            </div>

            <div className="progress-bar" style={{ marginBottom: 14 }}>
              <div className="progress-fill" style={{ "--target-w": `${job.match}%`, background: `linear-gradient(90deg, ${matchColor(job.match)}, var(--blue))` }} />
            </div>

            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
              {job.tags.map(t => <span key={t} className="tag" style={{ fontSize: 11 }}>{t}</span>)}
              <span className="tag tag-teal" style={{ fontSize: 11 }}>{job.type}</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 13, color: "var(--text)", fontWeight: 600 }}>{job.salary}</div>
                <div style={{ fontSize: 11, color: "var(--text3)" }}>{job.exp} · {job.posted}</div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button className="btn-ghost" style={{ padding: "7px 12px" }}
                  onClick={() => { setSaved(s => { const n = new Set(s); n.has(job.id) ? n.delete(job.id) : n.add(job.id); return n; }); }}>
                  <Icon name="bookmark" size={14} color={saved.has(job.id) ? "var(--teal)" : "currentColor"} />
                </button>
                <button className="btn-primary" style={{ padding: "7px 16px", fontSize: 12 }}
                  onClick={() => showToast(`Auto-applying to ${job.title} at ${job.company}...`)}>
                  Auto Apply
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─── APPLICATIONS (KANBAN) ──────────────────────────────────────────────── */
const ApplicationsPage = ({ showToast }) => {
  const [cols, setCols] = useState({
    applied: [
      { id: 1, title: "Senior ML Engineer", company: "Swiggy", match: 94, date: "Jan 28" },
      { id: 2, title: "AI Research Scientist", company: "Microsoft", match: 91, date: "Jan 26" },
      { id: 3, title: "LLM Engineer", company: "Krutrim", match: 88, date: "Jan 24" },
    ],
    interview: [
      { id: 4, title: "Data Scientist", company: "Razorpay", match: 86, date: "Jan 20", interview: "Feb 2, 2pm" },
      { id: 5, title: "ML Platform Eng.", company: "Meesho", match: 82, date: "Jan 18", interview: "Feb 4, 11am" },
    ],
    rejected: [
      { id: 6, title: "AI Engineer", company: "PhonePe", match: 72, date: "Jan 15" },
    ],
    offer: [
      { id: 7, title: "MLOps Engineer", company: "Flipkart", match: 91, date: "Jan 10", offer: "₹32 LPA" },
    ]
  });

  const columns = [
    { key: "applied", label: "Applied", color: "var(--blue)", count: cols.applied.length },
    { key: "interview", label: "Interview", color: "var(--purple)", count: cols.interview.length },
    { key: "rejected", label: "Rejected", color: "var(--rose)", count: cols.rejected.length },
    { key: "offer", label: "Offer", color: "var(--teal)", count: cols.offer.length },
  ];

  const [dragging, setDragging] = useState(null);
  const [dragOver, setDragOver] = useState(null);

  const onDragStart = (card, from) => setDragging({ card, from });
  const onDrop = (to) => {
    if (!dragging || dragging.from === to) { setDragging(null); setDragOver(null); return; }
    setCols(prev => {
      const n = { ...prev };
      n[dragging.from] = n[dragging.from].filter(c => c.id !== dragging.card.id);
      n[to] = [...n[to], dragging.card];
      return n;
    });
    showToast(`Moved to ${to.charAt(0).toUpperCase() + to.slice(1)}`);
    setDragging(null); setDragOver(null);
  };

  return (
    <div style={{ padding: 28 }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, fontFamily: "var(--display)", marginBottom: 4 }}>Application Tracker</h1>
        <p style={{ color: "var(--text2)", fontSize: 14 }}>34 applications · Drag cards to update status</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, alignItems: "start" }}>
        {columns.map(col => (
          <div key={col.key}
            className="kanban-col"
            onDragOver={e => { e.preventDefault(); setDragOver(col.key); }}
            onDrop={() => onDrop(col.key)}
            onDragLeave={() => setDragOver(null)}
            style={{ background: dragOver === col.key ? `color-mix(in srgb, ${col.color} 5%, transparent)` : "transparent", borderRadius: 14, padding: 4, transition: "background 0.2s" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 8px", marginBottom: 14 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: col.color }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>{col.label}</span>
              <span style={{ marginLeft: "auto", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, padding: "1px 8px", fontSize: 12, color: "var(--text2)" }}>{col.count}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {cols[col.key].map(card => (
                <div key={card.id} className="kanban-card card"
                  draggable onDragStart={() => onDragStart(card, col.key)}
                  style={{ padding: 16, cursor: "grab" }}>
                  <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
                    <div style={{ width: 34, height: 34, borderRadius: 8, background: "var(--bg2)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: col.color, flexShrink: 0 }}>
                      {card.company[0]}
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", lineHeight: 1.3 }}>{card.title}</div>
                      <div style={{ fontSize: 11, color: "var(--text2)" }}>{card.company}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 11, color: "var(--text3)" }}>{card.date}</span>
                    <span className="tag" style={{ fontSize: 10 }}>{card.match}%</span>
                  </div>
                  {card.interview && (
                    <div style={{ marginTop: 10, padding: "6px 10px", background: `color-mix(in srgb, ${col.color} 8%, transparent)`, borderRadius: 6, fontSize: 11, color: col.color, fontWeight: 500 }}>
                      📅 {card.interview}
                    </div>
                  )}
                  {card.offer && (
                    <div style={{ marginTop: 10, padding: "6px 10px", background: "rgba(0,212,170,0.1)", borderRadius: 6, fontSize: 11, color: "var(--teal)", fontWeight: 600 }}>
                      🎉 Offer: {card.offer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─── RESUME ANALYZER ────────────────────────────────────────────────────── */
const ResumePage = ({ showToast }) => {
  const [uploaded, setUploaded] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [drag, setDrag] = useState(false);
  const [atsScore, setAtsScore] = useState(0);

  const doAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false); setAnalyzed(true); setAtsScore(87);
    }, 2000);
  };

  const suggestions = [
    { type: "Missing keyword", text: "Add 'MLOps' and 'Kubeflow' — appear in 78% of matched JDs", priority: "high" },
    { type: "Quantify impact", text: "Add metrics to your project bullets (e.g. 'reduced latency by 40%')", priority: "high" },
    { type: "Skills section", text: "Move technical skills above work experience for ATS parsing", priority: "medium" },
    { type: "Formatting", text: "Use standard section headers: 'Work Experience', 'Education'", priority: "medium" },
    { type: "Action verbs", text: "Replace 'worked on' with 'engineered', 'designed', 'deployed'", priority: "low" },
  ];

  const priorityColor = { high: "var(--rose)", medium: "var(--amber)", low: "var(--teal)" };

  return (
    <div style={{ padding: 28 }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, fontFamily: "var(--display)", marginBottom: 4 }}>Resume Analyzer</h1>
        <p style={{ color: "var(--text2)", fontSize: 14 }}>AI-powered ATS scoring and intelligent improvement suggestions</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: analyzed ? "1fr 380px" : "1fr", gap: 20 }}>
        <div>
          {/* DROP ZONE */}
          {!uploaded ? (
            <div onDragOver={e => { e.preventDefault(); setDrag(true); }}
              onDragLeave={() => setDrag(false)}
              onDrop={e => { e.preventDefault(); setDrag(false); setUploaded(true); }}
              style={{
                border: `2px dashed ${drag ? "var(--teal)" : "var(--border2)"}`,
                borderRadius: 20, padding: 64, textAlign: "center",
                background: drag ? "rgba(0,212,170,0.04)" : "var(--surface)",
                transition: "all 0.2s", cursor: "pointer",
                animation: "fadeUp 0.4s ease both"
              }}
              onClick={() => setUploaded(true)}>
              <div className="animate-float" style={{ marginBottom: 20 }}>
                <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(0,212,170,0.1)", border: "1px solid rgba(0,212,170,0.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto" }}>
                  <Icon name="upload" size={28} color="var(--teal)" />
                </div>
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: "var(--text)", marginBottom: 8 }}>Drop your resume here</h3>
              <p style={{ color: "var(--text2)", fontSize: 14, marginBottom: 16 }}>PDF, DOC, DOCX · Max 5MB</p>
              <button className="btn-primary" onClick={() => setUploaded(true)}>
                <Icon name="upload" size={14} color="#000" /> Browse files
              </button>
            </div>
          ) : (
            <div style={{ animation: "fadeUp 0.4s ease both" }}>
              <div className="card" style={{ marginBottom: 16, display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: "rgba(0,212,170,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon name="resume" size={20} color="var(--teal)" />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>Narasimha_Resume_2025.pdf</div>
                  <div style={{ fontSize: 12, color: "var(--text2)" }}>2.3 MB · Uploaded just now</div>
                </div>
                {!analyzed && (
                  <button className="btn-primary" onClick={doAnalyze} disabled={analyzing}
                    style={{ opacity: analyzing ? 0.7 : 1 }}>
                    {analyzing ? (
                      <><div style={{ width: 14, height: 14, border: "2px solid rgba(0,0,0,0.3)", borderTopColor: "#000", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />Analyzing…</>
                    ) : (
                      <><Icon name="brain" size={14} color="#000" />Analyze with AI</>
                    )}
                  </button>
                )}
              </div>

              {analyzed && (
                <>
                  {/* JD Input */}
                  <div className="card" style={{ marginBottom: 16 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                      <Icon name="jobs" size={16} color="var(--teal)" />
                      <h3 style={{ fontSize: 14, fontWeight: 600 }}>Tailor to a specific JD</h3>
                    </div>
                    <textarea placeholder="Paste a job description here to get role-specific suggestions…" rows={4}
                      style={{ resize: "vertical", marginBottom: 12 }} />
                    <div style={{ display: "flex", gap: 10 }}>
                      <button className="btn-primary" onClick={() => showToast("Generating tailored resume…")}>
                        <Icon name="sparkle" size={13} color="#000" /> Tailor Resume with AI
                      </button>
                      <button className="btn-ghost" onClick={() => showToast("Cover letter generated!")}>
                        Generate Cover Letter
                      </button>
                    </div>
                  </div>

                  {/* Suggestions */}
                  <div className="card">
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                      <h3 style={{ fontSize: 14, fontWeight: 600 }}>AI Suggestions ({suggestions.length})</h3>
                      <button className="btn-primary" style={{ padding: "6px 14px", fontSize: 12 }} onClick={() => showToast("All suggestions applied!")}>
                        <Icon name="sparkle" size={12} color="#000" /> Apply All
                      </button>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      {suggestions.map((s, i) => (
                        <div key={i} style={{ display: "flex", gap: 12, padding: 14, background: "var(--bg2)", borderRadius: 10, border: "1px solid var(--border)" }}>
                          <div style={{ width: 3, background: priorityColor[s.priority], borderRadius: 2, flexShrink: 0 }} />
                          <div style={{ flex: 1 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                              <span className="tag" style={{ fontSize: 10, color: priorityColor[s.priority], background: `color-mix(in srgb, ${priorityColor[s.priority]} 12%, transparent)`, borderColor: `color-mix(in srgb, ${priorityColor[s.priority]} 25%, transparent)` }}>{s.type}</span>
                              <span className="tag" style={{ fontSize: 10 }}>{s.priority}</span>
                            </div>
                            <p style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.5 }}>{s.text}</p>
                          </div>
                          <button style={{ background: "none", border: "none", color: "var(--teal)", cursor: "pointer", fontSize: 12, fontWeight: 500, flexShrink: 0 }}
                            onClick={() => showToast("Suggestion applied!")}>Fix</button>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* ATS SCORE PANEL */}
        {analyzed && (
          <div style={{ animation: "fadeUp 0.5s ease both" }}>
            <div className="card" style={{ textAlign: "center", marginBottom: 16 }}>
              <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 20, color: "var(--text2)" }}>ATS Score</h3>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
                <CircularProgress value={atsScore} size={140} label="/ 100" color="var(--teal)" />
              </div>
              <div className="tag tag-teal" style={{ marginBottom: 12 }}>Excellent</div>
              <p style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.6 }}>Your resume scores above 91% of candidates in your field.</p>
            </div>

            <div className="card" style={{ marginBottom: 16 }}>
              <h3 style={{ fontSize: 13, fontWeight: 600, marginBottom: 14, color: "var(--text2)" }}>Score breakdown</h3>
              {[
                { label: "Keywords", score: 88, color: "var(--teal)" },
                { label: "Format", score: 95, color: "var(--green)" },
                { label: "Sections", score: 80, color: "var(--blue)" },
                { label: "Quantification", score: 72, color: "var(--amber)" },
                { label: "Action verbs", score: 91, color: "var(--purple)" },
              ].map(s => (
                <div key={s.label} style={{ marginBottom: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5, fontSize: 12 }}>
                    <span style={{ color: "var(--text2)" }}>{s.label}</span>
                    <span style={{ fontWeight: 600, color: s.color }}>{s.score}</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ "--target-w": `${s.score}%`, background: s.color }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="card">
              <h3 style={{ fontSize: 13, fontWeight: 600, marginBottom: 14, color: "var(--text2)" }}>Resume versions</h3>
              {["Original v1", "AI Tailored — Swiggy", "AI Tailored — Microsoft"].map((v, i) => (
                <div key={v} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: i < 2 ? "1px solid var(--border)" : "none" }}>
                  <Icon name="resume" size={14} color="var(--text2)" />
                  <span style={{ fontSize: 13, flex: 1 }}>{v}</span>
                  {i === 0 && <span className="tag tag-teal" style={{ fontSize: 10 }}>Active</span>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* ─── AI INSIGHTS ────────────────────────────────────────────────────────── */
const InsightsPage = () => {
  const skills = [
    { name: "PyTorch", have: true, demand: 96 }, { name: "MLOps", have: false, demand: 92 },
    { name: "LangChain", have: true, demand: 88 }, { name: "Kubernetes", have: false, demand: 85 },
    { name: "RAG", have: true, demand: 83 }, { name: "AWS SageMaker", have: false, demand: 80 },
    { name: "FastAPI", have: true, demand: 78 }, { name: "Kubeflow", have: false, demand: 74 },
  ];
  const roadmap = [
    { step: "Now", role: "AI/ML Engineer", status: "current" },
    { step: "6–12 mo", role: "Senior ML Engineer", status: "next" },
    { step: "1–2 yr", role: "Staff AI Engineer", status: "future" },
    { step: "3–5 yr", role: "Principal Engineer / ML Lead", status: "future" },
  ];

  return (
    <div style={{ padding: 28 }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, fontFamily: "var(--display)", marginBottom: 4 }}>AI Career Insights</h1>
        <p style={{ color: "var(--text2)", fontSize: 14 }}>Powered by RAG over 50,000+ job descriptions and hiring trends</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        {/* Skill gap */}
        <div className="card">
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
            <Icon name="zap" size={16} color="var(--teal)" />
            <h3 style={{ fontSize: 15, fontWeight: 600 }}>Skill Gap Analysis</h3>
          </div>
          {skills.map((s, i) => (
            <div key={s.name} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <div style={{ width: 24, height: 24, borderRadius: 6, background: s.have ? "rgba(0,212,170,0.1)" : "rgba(244,63,94,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name={s.have ? "check" : "x"} size={12} color={s.have ? "var(--teal)" : "var(--rose)"} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, fontSize: 13 }}>
                  <span style={{ color: "var(--text)", fontWeight: 500 }}>{s.name}</span>
                  <span style={{ color: "var(--text2)", fontSize: 11 }}>{s.demand}% demand</span>
                </div>
                <div className="progress-bar" style={{ height: 4 }}>
                  <div className="progress-fill" style={{ "--target-w": `${s.demand}%`, background: s.have ? "var(--teal)" : "var(--rose)" }} />
                </div>
              </div>
              {!s.have && (
                <button className="btn-ghost" style={{ padding: "4px 10px", fontSize: 11, flexShrink: 0 }}>Learn</button>
              )}
            </div>
          ))}
        </div>

        {/* Suggested skills */}
        <div>
          <div className="card" style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <Icon name="sparkle" size={16} color="var(--blue)" />
              <h3 style={{ fontSize: 15, fontWeight: 600 }}>Top Skills to Add</h3>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {[
                { skill: "MLOps", reason: "92% of target JDs", color: "var(--teal)" },
                { skill: "Kubernetes", reason: "Ops + ML deployment", color: "var(--blue)" },
                { skill: "AWS SageMaker", reason: "High salary premium", color: "var(--purple)" },
                { skill: "Kubeflow", reason: "Fast growing demand", color: "var(--amber)" },
              ].map(s => (
                <div key={s.skill} className="card" style={{ padding: 14, border: `1px solid color-mix(in srgb, ${s.color} 20%, transparent)` }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: s.color, marginBottom: 4 }}>{s.skill}</div>
                  <div style={{ fontSize: 11, color: "var(--text2)", marginBottom: 10 }}>{s.reason}</div>
                  <button className="btn-primary" style={{ padding: "5px 10px", fontSize: 11, width: "100%", justifyContent: "center" }}>
                    Find courses
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
              <Icon name="map" size={16} color="var(--purple)" />
              <h3 style={{ fontSize: 15, fontWeight: 600 }}>Career Roadmap</h3>
            </div>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: 16, top: 20, bottom: 20, width: 2, background: "var(--border2)", borderRadius: 1 }} />
              {roadmap.map((r, i) => (
                <div key={i} style={{ display: "flex", gap: 16, marginBottom: i < roadmap.length - 1 ? 24 : 0, position: "relative" }}>
                  <div style={{ width: 34, height: 34, borderRadius: "50%", flexShrink: 0, background: r.status === "current" ? "var(--teal)" : r.status === "next" ? "rgba(0,212,170,0.2)" : "var(--surface2)", border: `2px solid ${r.status === "current" ? "var(--teal)" : "var(--border2)"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>
                    {r.status === "current" ? <Icon name="check" size={14} color="#000" /> : i + 1}
                  </div>
                  <div style={{ paddingTop: 6 }}>
                    <div style={{ fontSize: 11, color: "var(--text2)", marginBottom: 2 }}>{r.step}</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: r.status === "current" ? "var(--teal)" : "var(--text)" }}>{r.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── INTERVIEW TRAINER ──────────────────────────────────────────────────── */
const InterviewPage = ({ showToast }) => {
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hello! I'm your AI interview coach. I'll ask you questions based on a Senior ML Engineer role at Swiggy. Ready to begin?" },
  ]);
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const [scores, setScores] = useState({ clarity: 82, confidence: 75, technical: 88, relevance: 91 });
  const chatRef = useRef(null);

  const questions = [
    "Tell me about a machine learning model you built end-to-end. What was the business impact?",
    "How would you design an ML pipeline for real-time fraud detection at scale?",
    "Describe a time your model failed in production. What happened and how did you fix it?",
    "What's your approach to feature engineering for sparse, high-dimensional data?",
  ];

  const sendMsg = () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", text: input };
    const q = questions[Math.floor(Math.random() * questions.length)];
    const aiMsg = { role: "ai", text: q };
    setMessages(m => [...m, userMsg, aiMsg]);
    setInput("");
    setScores(s => ({ clarity: Math.min(100, s.clarity + Math.floor(Math.random() * 5)), confidence: Math.min(100, s.confidence + Math.floor(Math.random() * 3)), technical: Math.min(100, s.technical + 1), relevance: Math.min(100, s.relevance + Math.floor(Math.random() * 4)) }));
    setTimeout(() => { if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight; }, 100);
  };

  return (
    <div style={{ padding: 28, height: "calc(100vh - 60px)", display: "flex", flexDirection: "column" }}>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, fontFamily: "var(--display)", marginBottom: 4 }}>AI Interview Trainer</h1>
        <p style={{ color: "var(--text2)", fontSize: 14 }}>Practice for Senior ML Engineer · Swiggy</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 16, flex: 1, overflow: "hidden" }}>
        {/* CHAT */}
        <div className="card" style={{ display: "flex", flexDirection: "column", overflow: "hidden", padding: 0 }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, var(--teal), var(--blue))", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name="brain" size={16} color="#000" />
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>AI Interviewer</div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "var(--teal)" }}>
                <BadgeDot color="var(--teal)" /> Online
              </div>
            </div>
          </div>

          <div ref={chatRef} style={{ flex: 1, overflowY: "auto", padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>
            {messages.map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", animation: "fadeUp 0.3s ease both" }}>
                {m.role === "ai" && (
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg, var(--teal), var(--blue))", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginRight: 8 }}>
                    <Icon name="brain" size={12} color="#000" />
                  </div>
                )}
                <div style={{
                  maxWidth: "75%", padding: "12px 16px", borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                  background: m.role === "user" ? "linear-gradient(135deg, var(--teal), var(--blue))" : "var(--surface2)",
                  color: m.role === "user" ? "#000" : "var(--text)",
                  fontSize: 14, lineHeight: 1.6,
                  border: m.role === "ai" ? "1px solid var(--border)" : "none"
                }}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <div style={{ padding: 16, borderTop: "1px solid var(--border)", display: "flex", gap: 10 }}>
            <button onClick={() => { setListening(!listening); if (!listening) setTimeout(() => { setListening(false); setInput("I built a recommendation engine using collaborative filtering and deployed it on AWS SageMaker, reducing customer churn by 23%."); }, 2500); }}
              style={{ width: 44, height: 44, borderRadius: "50%", background: listening ? "var(--rose)" : "var(--surface2)", border: `1px solid ${listening ? "var(--rose)" : "var(--border2)"}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0, transition: "all 0.2s", animation: listening ? "pulse 1s ease infinite" : "none" }}>
              <Icon name="mic" size={16} color={listening ? "#fff" : "var(--text2)"} />
            </button>
            <input value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMsg()}
              placeholder="Type your answer, or click the mic to speak…" />
            <button className="btn-primary" onClick={sendMsg} style={{ flexShrink: 0, height: 44, aspectRatio: 1 }}>
              <Icon name="send" size={14} color="#000" />
            </button>
          </div>
        </div>

        {/* SCORE PANEL */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="card">
            <h3 style={{ fontSize: 13, fontWeight: 600, color: "var(--text2)", marginBottom: 16 }}>Live Performance</h3>
            {Object.entries(scores).map(([k, v]) => (
              <div key={k} style={{ marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 12 }}>
                  <span style={{ color: "var(--text)", textTransform: "capitalize" }}>{k}</span>
                  <span style={{ fontWeight: 700, color: v >= 85 ? "var(--teal)" : v >= 70 ? "var(--amber)" : "var(--rose)" }}>{v}</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ "--target-w": `${v}%`, background: v >= 85 ? "var(--teal)" : v >= 70 ? "var(--amber)" : "var(--rose)" }} />
                </div>
              </div>
            ))}
          </div>

          <div className="card">
            <h3 style={{ fontSize: 13, fontWeight: 600, color: "var(--text2)", marginBottom: 12 }}>AI Feedback</h3>
            <div style={{ fontSize: 13, color: "var(--text)", lineHeight: 1.7 }}>
              Strong technical depth. Try to open with the business context before diving into implementation. Use the STAR format: <span style={{ color: "var(--teal)" }}>Situation → Task → Action → Result</span>.
            </div>
          </div>

          <div className="card">
            <h3 style={{ fontSize: 13, fontWeight: 600, color: "var(--text2)", marginBottom: 12 }}>Session stats</h3>
            {[["Questions answered", "3"], ["Avg response", "1m 24s"], ["Session score", "84/100"]].map(([l, v]) => (
              <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid var(--border)", fontSize: 13 }}>
                <span style={{ color: "var(--text2)" }}>{l}</span>
                <span style={{ fontWeight: 600 }}>{v}</span>
              </div>
            ))}
          </div>

          <button className="btn-ghost" style={{ width: "100%", justifyContent: "center" }}
            onClick={() => showToast("Full report downloaded!")}>
            <Icon name="analytics" size={14} /> Export Report
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─── ANALYTICS ─────────────────────────────────────────────────────────── */
const AnalyticsPage = () => {
  const weekData = [8, 12, 6, 15, 18, 10, 14];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const maxBar = Math.max(...weekData);

  return (
    <div style={{ padding: 28 }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, fontFamily: "var(--display)", marginBottom: 4 }}>Analytics</h1>
        <p style={{ color: "var(--text2)", fontSize: 14 }}>Your job search performance over the last 30 days</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 16 }}>
        {[
          { label: "Response rate", value: "41%", sub: "↑ 8% vs industry avg", color: "var(--teal)" },
          { label: "Avg match score", value: "87.4", sub: "Top 12% of candidates", color: "var(--blue)" },
          { label: "Time to interview", value: "6.2 days", sub: "↓ 3 days faster w/ AI", color: "var(--purple)" },
        ].map(s => (
          <div key={s.label} className="card">
            <div style={{ fontSize: 13, color: "var(--text2)", marginBottom: 8 }}>{s.label}</div>
            <div style={{ fontSize: 32, fontWeight: 700, color: s.color, marginBottom: 4 }}>{s.value}</div>
            <div style={{ fontSize: 12, color: "var(--text2)" }}>{s.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16 }}>
        {/* BAR CHART */}
        <div className="card">
          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 20 }}>Applications this week</h3>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 160 }}>
            {weekData.map((v, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <div style={{ fontSize: 11, color: "var(--text2)" }}>{v}</div>
                <div style={{ width: "100%", borderRadius: "6px 6px 0 0", background: `linear-gradient(180deg, var(--teal), var(--blue))`, height: `${(v / maxBar) * 120}px`, transition: "height 1s ease", minHeight: 4 }} />
                <div style={{ fontSize: 11, color: "var(--text3)" }}>{days[i]}</div>
              </div>
            ))}
          </div>
        </div>

        {/* FUNNEL */}
        <div className="card">
          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 20 }}>Application funnel</h3>
          {[
            { label: "Matched", val: 247, pct: 100, color: "var(--teal)" },
            { label: "Applied", val: 34, pct: 14, color: "var(--blue)" },
            { label: "Responded", val: 14, pct: 41, color: "var(--purple)" },
            { label: "Interview", val: 5, pct: 36, color: "var(--amber)" },
            { label: "Offer", val: 1, pct: 20, color: "var(--green)" },
          ].map((f, i) => (
            <div key={f.label} style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5, fontSize: 12 }}>
                <span style={{ color: "var(--text2)" }}>{f.label}</span>
                <span style={{ fontWeight: 600 }}>{f.val}</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ "--target-w": `${f.pct}%`, background: f.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ─── SETTINGS ───────────────────────────────────────────────────────────── */
const SettingsPage = ({ showToast }) => {
  const [prefs, setPrefs] = useState({ roles: "ML Engineer, AI Engineer, LLM Engineer", locations: "Bangalore, Hyderabad, Remote", minSalary: "20", autoApply: true, emailAlerts: true, smsAlerts: false });

  return (
    <div style={{ padding: 28, maxWidth: 760 }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, fontFamily: "var(--display)", marginBottom: 4 }}>Settings</h1>
        <p style={{ color: "var(--text2)", fontSize: 14 }}>Manage your profile and job search preferences</p>
      </div>

      {/* PROFILE */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
          <div style={{ position: "relative" }}>
            <div style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg, var(--teal), var(--blue))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, fontWeight: 700, color: "#000" }}>NS</div>
            <div style={{ position: "absolute", bottom: 0, right: 0, width: 22, height: 22, borderRadius: "50%", background: "var(--teal)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", border: "2px solid var(--bg)" }}>
              <Icon name="plus" size={12} color="#000" />
            </div>
          </div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700 }}>Narasimha</div>
            <div style={{ fontSize: 13, color: "var(--teal)" }}>AI Engineer Track · Hyderabad</div>
            <div className="tag tag-teal" style={{ marginTop: 6, fontSize: 11 }}>Pro plan · Active</div>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          {[
            { label: "Full name", val: "Narasimha" }, { label: "Email", val: "narasimha@email.com" },
            { label: "Phone", val: "+91 98765 43210" }, { label: "LinkedIn", val: "linkedin.com/in/narasimha" },
          ].map(f => (
            <div key={f.label}>
              <label style={{ fontSize: 12, color: "var(--text2)", display: "block", marginBottom: 6 }}>{f.label}</label>
              <input defaultValue={f.val} />
            </div>
          ))}
        </div>
      </div>

      {/* JOB PREFS */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
          <Icon name="jobs" size={16} color="var(--blue)" />
          <h3 style={{ fontSize: 15, fontWeight: 600 }}>Job Preferences</h3>
        </div>
        <div style={{ display: "grid", gap: 14 }}>
          {[
            { label: "Target roles", key: "roles" },
            { label: "Preferred locations", key: "locations" },
            { label: "Min. salary (LPA)", key: "minSalary" },
          ].map(f => (
            <div key={f.key}>
              <label style={{ fontSize: 12, color: "var(--text2)", display: "block", marginBottom: 6 }}>{f.label}</label>
              <input value={prefs[f.key]} onChange={e => setPrefs(p => ({ ...p, [f.key]: e.target.value }))} />
            </div>
          ))}
        </div>
      </div>

      {/* TOGGLES */}
      <div className="card" style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
          <Icon name="bell" size={16} color="var(--purple)" />
          <h3 style={{ fontSize: 15, fontWeight: 600 }}>Automation & Alerts</h3>
        </div>
        {[
          { label: "Auto-Apply Agent", sub: "Automatically apply to high-match jobs", key: "autoApply" },
          { label: "Email alerts", sub: "Notify me of new matches and status changes", key: "emailAlerts" },
          { label: "SMS alerts", sub: "Text me for interview calls only", key: "smsAlerts" },
        ].map(t => (
          <div key={t.key} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 0", borderBottom: "1px solid var(--border)" }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 500 }}>{t.label}</div>
              <div style={{ fontSize: 12, color: "var(--text2)" }}>{t.sub}</div>
            </div>
            <div onClick={() => setPrefs(p => ({ ...p, [t.key]: !p[t.key] }))}
              style={{ width: 44, height: 24, borderRadius: 12, background: prefs[t.key] ? "var(--teal)" : "var(--surface2)", cursor: "pointer", position: "relative", transition: "background 0.2s", flexShrink: 0 }}>
              <div style={{ position: "absolute", top: 3, left: prefs[t.key] ? 23 : 3, width: 18, height: 18, borderRadius: "50%", background: "#fff", transition: "left 0.2s", boxShadow: "0 1px 4px rgba(0,0,0,0.3)" }} />
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 12 }}>
        <button className="btn-primary" onClick={() => showToast("Settings saved successfully!")}>
          <Icon name="check" size={14} color="#000" /> Save changes
        </button>
        <button className="btn-ghost">Cancel</button>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════════════════ */
/*  ROOT                                                                      */
/* ══════════════════════════════════════════════════════════════════════════ */
export default function App() {
  const [view, setView] = useState("landing");
  return (
    <>
      <GlobalStyles />
      {view === "landing" ? (
        <LandingPage onEnter={() => setView("app")} />
      ) : (
        <AppShell />
      )}
    </>
  );
}
