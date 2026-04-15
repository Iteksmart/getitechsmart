'use client';
import { useState, useEffect, useRef } from 'react';

/* ─────────────────────────────────────────────────────────────────────────────
   PRODUCTION — getitechsmart.com homepage
   Exact match to itechsmart.dev:
   · Font:        Inter (all weights)
   · Logo:        "iTech" rgb(255,255,255) + "Smart" rgb(153,51,255) — confirmed live
   · Gradient:    linear-gradient(135deg, #fff, #C4B5FD 40%, #7C3AED) — confirmed live
   · Text glow:   rgba(106,0,255,0.55) 0 0 30px — confirmed live
   · Primary btn: #6A00FF — confirmed live
   · H1 tracking: -1.5px letter-spacing — confirmed live
   · Fully mobile responsive (320px → 1440px)
───────────────────────────────────────────────────────────────────────────── */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }

:root {
  --bg:           #05050f;
  --fg:           #f8fafc;
  --muted:        #8075A6;
  --muted-light:  rgba(255,255,255,0.5);
  --purple:       #9933FF;
  --purple-cta:   #6A00FF;
  --purple-sm:    rgba(153,51,255,0.08);
  --purple-md:    rgba(153,51,255,0.14);
  --purple-bd:    rgba(153,51,255,0.28);
  --purple-bd2:   rgba(153,51,255,0.4);
  --green:        #22C55E;
  --teal:         #0FF4C6;
  --blue:         #3366FF;
  --red:          #FF404D;
  --divider:      rgba(255,255,255,0.06);
  --nav-bg:       rgba(5,5,15,0.94);
  --card-bg:      rgba(255,255,255,0.025);
  --card-bd:      rgba(255,255,255,0.07);
}

body {
  background: var(--bg);
  color: var(--fg);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}

/* ── Exact itechsmart.dev gradient + glow ─────────────────────────── */
.gradient-text {
  background-image: linear-gradient(135deg, #ffffff, #C4B5FD 40%, #7C3AED);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}
.text-glow {
  text-shadow: rgba(106,0,255,0.55) 0px 0px 30px, rgba(106,0,255,0.2) 0px 0px 60px;
}

/* ── Typography ───────────────────────────────────────────────────── */
.display {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  letter-spacing: -1.5px;
  line-height: 1.05;
}
.section-label {
  font-size: 10px; font-weight: 700;
  letter-spacing: .1em; text-transform: uppercase;
}

/* ── Keyframes ────────────────────────────────────────────────────── */
@keyframes fadeUp    { from { opacity:0; transform:translateY(22px); } to { opacity:1; transform:translateY(0); } }
@keyframes fadeIn    { from { opacity:0; } to { opacity:1; } }
@keyframes blink     { 0%,100%{ opacity:1; } 50%{ opacity:0; } }
@keyframes pulse     { 0%,100%{ opacity:1; } 50%{ opacity:.3; } }
@keyframes glowBtn   { 0%,100%{ box-shadow:0 0 22px rgba(106,0,255,.35); } 50%{ box-shadow:0 0 44px rgba(106,0,255,.65); } }
@keyframes ticker    { from{ transform:translateX(0); } to{ transform:translateX(-50%); } }
@keyframes borderPulse{ 0%,100%{ border-color:rgba(34,197,94,0.2); } 50%{ border-color:rgba(34,197,94,0.5); } }
@keyframes slideIn  { from{ opacity:0; transform:translateY(100%); } to{ opacity:1; transform:translateY(0); } }
@keyframes slideOut { from{ opacity:1; transform:translateY(0); } to{ opacity:0; transform:translateY(-100%); } }
@keyframes countUp   { from{ opacity:0; transform:translateY(8px); } to{ opacity:1; transform:translateY(0); } }

.fade-up { animation: fadeUp .65s cubic-bezier(.22,1,.36,1) both; }
.fade-in { animation: fadeIn .5s ease both; }
.d1{ animation-delay:.06s; } .d2{ animation-delay:.14s; } .d3{ animation-delay:.24s; }
.d4{ animation-delay:.36s; } .d5{ animation-delay:.50s; } .d6{ animation-delay:.66s; } .d7{ animation-delay:.82s; }

a { text-decoration:none; color:inherit; }
button { cursor:pointer; font-family:inherit; border:none; background:none; }

/* ── Nav links ────────────────────────────────────────────────────── */
.nav-link {
  font-size:14px; font-weight:400; color:var(--muted-light);
  transition:color .15s; white-space:nowrap;
}
.nav-link:hover { color:var(--fg); }

/* ── Buttons ──────────────────────────────────────────────────────── */
.btn-cta {
  display:inline-flex; align-items:center; gap:8px;
  background: var(--purple-cta); color:#fff;
  font-weight:700; font-size:15px;
  padding:13px 26px; border-radius:10px; border:none;
  transition:filter .18s, transform .12s;
  animation: glowBtn 3.5s ease-in-out infinite;
  white-space:nowrap;
}
.btn-cta:hover { filter:brightness(1.12); transform:translateY(-1px); }

.btn-ghost {
  display:inline-flex; align-items:center; gap:8px;
  background:var(--purple-sm); color:rgba(224,209,255,.9);
  font-weight:600; font-size:15px;
  padding:13px 22px; border-radius:10px;
  border:1px solid var(--purple-bd);
  transition:background .18s, border-color .18s; white-space:nowrap;
}
.btn-ghost:hover { background:var(--purple-md); border-color:var(--purple); }

/* ── Cards ────────────────────────────────────────────────────────── */
.card {
  background:var(--card-bg); border:1px solid var(--card-bd);
  border-radius:14px;
  transition:transform .2s, box-shadow .2s, border-color .2s;
}
.card:hover {
  transform:translateY(-3px);
  box-shadow:0 16px 48px rgba(153,51,255,.12);
  border-color:rgba(153,51,255,.3);
}

/* ── Proof card ───────────────────────────────────────────────────── */
.proof-card {
  background:rgba(0,0,0,.84); border:1px solid rgba(34,197,94,.22);
  border-radius:16px; overflow:hidden;
  animation: borderPulse 3.5s ease infinite;
}
.proof-row {
  display:flex; justify-content:space-between; align-items:center;
  padding:9px 16px; border-bottom:1px solid var(--divider); font-size:12px;
}
.proof-row:last-of-type { border-bottom:none; }

/* ── Live ticker ──────────────────────────────────────────────────── */
.ticker-wrap { overflow:hidden; white-space:nowrap; mask:linear-gradient(90deg,transparent,black 5%,black 95%,transparent); }
.ticker-inner { display:inline-flex; gap:52px; animation:ticker 30s linear infinite; }

/* ── Background mesh ─────────────────────────────────────────────── */
.mesh { position:absolute; border-radius:50%; filter:blur(100px); pointer-events:none; z-index:0; }

/* ── Scanlines ────────────────────────────────────────────────────── */
.scanlines {
  position:absolute; inset:0; pointer-events:none; z-index:1;
  background-image:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(153,51,255,0.012) 2px,rgba(153,51,255,0.012) 4px);
}

/* ── UAIO step ────────────────────────────────────────────────────── */
.step-card {
  width:88px; height:84px; border-radius:13px; cursor:pointer;
  display:flex; flex-direction:column; align-items:center; justify-content:center;
  transition:transform .25s, box-shadow .25s, border-color .25s;
}
.step-card.active { transform:scale(1.1); }

/* ── Cursor blink ─────────────────────────────────────────────────── */
.cursor { display:inline-block; width:2px; height:1em; background:var(--purple); margin-left:2px; animation:blink .8s step-end infinite; vertical-align:text-bottom; }

/* ══ RESPONSIVE ═══════════════════════════════════════════════════════
   Mobile-first breakpoints matching itechsmart.dev patterns */

/* Base: mobile (< 640px) */
.hero-grid   { flex-direction:column; }
.hero-right  { display:none; }
.two-col     { grid-template-columns:1fr; }
.four-col    { grid-template-columns:repeat(2,1fr); }
.five-col    { grid-template-columns:repeat(2,1fr); }
.three-col   { grid-template-columns:1fr; }
.section     { padding:52px 20px; }
.nav-links   { display:none; }
.nav-cta-sm  { font-size:12px; padding:7px 14px; }

.display-xl  { font-size:44px; min-height:1.12em; }
.display-lg  { font-size:30px; }
.display-md  { font-size:24px; }
.body-lg     { font-size:16px; line-height:1.7; color:var(--muted); }

/* Tablet (≥ 768px) */
@media (min-width: 768px) {
  .section     { padding:64px 32px; }
  .four-col    { grid-template-columns:repeat(4,1fr); }
  .three-col   { grid-template-columns:repeat(2,1fr); }
  .display-xl  { font-size:62px; }
  .display-lg  { font-size:40px; }
  .display-md  { font-size:30px; }
  .two-col     { grid-template-columns:1fr 1fr; }
}

/* Desktop (≥ 1024px) */
@media (min-width: 1024px) {
  .section     { padding:72px 48px; }
  .nav-links   { display:flex; }
  .hero-grid   { flex-direction:row; }
  .hero-right  { display:flex; }
  .five-col    { grid-template-columns:repeat(5,1fr); }
  .three-col   { grid-template-columns:repeat(3,1fr); }
  .display-xl  { font-size:82px; }
  .display-lg  { font-size:52px; }
  .display-md  { font-size:36px; }
}

/* Large desktop (≥ 1280px) */
@media (min-width: 1280px) {
  .display-xl  { font-size:88px; }
}

/* Mobile nav adjustments */
@media (max-width: 767px) {
  .ticker-inner { animation-duration:18s; }
  .four-col     { grid-template-columns:repeat(2,1fr); }
  .btn-cta, .btn-ghost { font-size:14px; padding:11px 18px; }
}

@media (max-width: 479px) {
  .display-xl  { font-size:36px; letter-spacing:-1px; }
  .display-lg  { font-size:26px; }
  .display-md  { font-size:22px; }
  .four-col    { grid-template-columns:1fr 1fr; }
  .cta-row     { flex-direction:column; align-items:stretch; }
  .cta-row a, .cta-row button { width:100%; justify-content:center; }
}

/* ── Hamburger nav ───────────────────────────────────────────────── */
.nav-desktop {
  display: none;
  align-items: center;
  gap: 24px;
}
@media (min-width: 1024px) {
  .nav-desktop { display: flex; }
  .hamburger   { display: none !important; }
}

.hamburger {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: 40px;
  height: 40px;
  padding: 0;
  flex-shrink: 0;
  background: transparent;
  border: 1px solid rgba(153,51,255,0.3);
  border-radius: 8px;
  cursor: pointer;
  transition: border-color .2s;
}
.hamburger:hover { border-color: rgba(153,51,255,0.6); }

.bar {
  display: block;
  width: 18px;
  height: 2px;
  border-radius: 2px;
  background: var(--fg);
  transition: transform .25s ease, opacity .2s ease;
  transform-origin: center;
}

/* Open state — animate to ✕ */
.bar-top.open  { transform: translateY(7px) rotate(45deg); }
.bar-mid.open  { opacity: 0; transform: scaleX(0); }
.bar-bot.open  { transform: translateY(-7px) rotate(-45deg); }

/* Mobile dropdown */
.mobile-menu {
  position: fixed;
  top: 64px;
  left: 0;
  right: 0;
  z-index: 99;
  background: rgba(5,5,15,0.98);
  border-bottom: 1px solid rgba(153,51,255,0.18);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  padding: 4px 0 16px;
  animation: fadeUp .2s ease both;
}
.mobile-menu a {
  display: block;
  font-size: 16px;
  font-weight: 500;
  color: rgba(255,255,255,0.55);
  padding: 14px 24px;
  border-bottom: 1px solid rgba(255,255,255,0.04);
  transition: color .15s, background .15s;
  text-decoration: none;
}
.mobile-menu a:hover {
  color: var(--fg);
  background: rgba(153,51,255,0.06);
}
.mobile-menu-cta {
  padding: 14px 20px 0;
}
`;

/* ─── Data ───────────────────────────────────────────────────────────────── */
// Hero cycling words — "Stop Fighting IT ___."
const CYCLE_WORDS = ['Fires.', 'Outages.', 'Alerts.', 'Tickets.', 'Downtime.', 'Burnout.'];

const STEPS = [
  { key:'DETECT',   icon:'📡', color:'#3366FF', bg:'rgba(51,102,255,.1)',  bd:'rgba(51,102,255,.35)'  },
  { key:'SIMULATE', icon:'🌐', color:'#9933FF', bg:'rgba(153,51,255,.1)', bd:'rgba(153,51,255,.35)'  },
  { key:'DECIDE',   icon:'🧠', color:'#A854F7', bg:'rgba(168,84,247,.1)', bd:'rgba(168,84,247,.35)'  },
  { key:'FIX',      icon:'⚡', color:'#0FF4C6', bg:'rgba(15,244,198,.1)', bd:'rgba(15,244,198,.35)'  },
  { key:'VERIFY',   icon:'✓',  color:'#22C55E', bg:'rgba(34,197,94,.1)',  bd:'rgba(34,197,94,.35)'   },
  { key:'RECEIPT',  icon:'🔐', color:'#22C55E', bg:'rgba(34,197,94,.07)', bd:'rgba(34,197,94,.25)'   },
];

const TICKER_EVENTS = [
  { type:'FIX',    color:'#0FF4C6', msg:'Container suite-itsm → healed in 18s',    hash:'a3f9b2c1' },
  { type:'DETECT', color:'#3366FF', msg:'Prometheus target down → alerted in 4s',   hash:'b7e2d091' },
  { type:'PROVE',  color:'#22C55E', msg:'Receipt f0b71cc0 sealed · tamper=false',    hash:'f0b71cc0' },
  { type:'FIX',    color:'#0FF4C6', msg:'Kubernetes pod crashloop → resolved 22s',  hash:'c9d3a812' },
  { type:'DECIDE', color:'#A854F7', msg:'Root cause: OOM kill · confidence 97%',     hash:'d4f18b73' },
  { type:'DETECT', color:'#3366FF', msg:'HL7 interface failure → detected 6s',       hash:'e5a29c04' },
];

const STATS = [
  { val:'85%',    label:'MTTR reduction'   },
  { val:'30–70%', label:'fewer tickets'    },
  { val:'SHA-256',label:'proof on actions' },
  { val:'#6',     label:'F6S globally'     },
];

const PROBLEMS = [
  { icon:'🔔', title:'Alert fatigue killing productivity',  desc:'Thousands of alerts daily. Most are noise. Your engineers can\'t tell signal from static.' },
  { icon:'🔁', title:'Repeat tickets draining your team',   desc:'Same issues. Different tickets. Every week. No root cause. No resolution.' },
  { icon:'🔍', title:'Slow root cause during incidents',    desc:'30–90 min mean time to understand. Too long. Every minute costs $5,600.' },
  { icon:'❓', title:'No proof of what happened',           desc:'Auditors ask. You can\'t answer definitively. No tamper-proof trail of what was done.' },
];

const SOLUTIONS = [
  { n:'01', icon:'📡', title:'Detect',   color:'#3366FF', desc:'Real-time signals from servers, containers, and endpoints. Anomalies caught in seconds across every stack layer.' },
  { n:'02', icon:'🌐', title:'Simulate', color:'#9933FF', desc:'Digital Twin models the fix against a live digital replica before touching production. No guesswork.' },
  { n:'03', icon:'🧠', title:'Decide',   color:'#A854F7', desc:'8-agent cognitive OS evaluates root cause and selects the optimal remediation path with full explainability.' },
  { n:'04', icon:'⚡', title:'Fix',      color:'#0FF4C6', desc:'Zero-touch execution via SSH, WinRM, Kubernetes, or cloud APIs. No human intervention required.' },
  { n:'05', icon:'🔐', title:'Prove',    color:'#22C55E', desc:'Cryptographic receipt generated. Tamper-evident SHA-256 ProofLink. Verifiable by anyone, anywhere.' },
];

const VERTICALS = [
  { icon:'🏢', title:'MSPs',       color:'#9933FF', desc:'Monitor and auto-remediate across every client.',       items:['Multi-tenant isolation','Per-client ProofLink ledger','Auto-escalation rules'] },
  { icon:'🏭', title:'Enterprise', color:'#3366FF', desc:'Eliminate alert fatigue. 85% MTTR reduction.',           items:['WinRM remediation','132 containers live','Grafana dashboards'] },
  { icon:'🏥', title:'Healthcare', color:'#0FF4C6', desc:'HL7 interface monitoring. HIPAA-aligned audit.',         items:['HL7 Pro product','HIPAA 100/100','INC auto-creation'] },
  { icon:'🏛', title:'Government', color:'#22C55E', desc:'SDVOSB-certified. Air-gap capable. FedRAMP pathway.',    items:['CAGE 172W2 · UEI ZCPFX4N86G36','NIST 96% · FIPS 100%','Citadel product'] },
];

const OUTCOMES = [
  { icon:'⚡', title:'Faster resolution', desc:'Hours → seconds' },
  { icon:'🎫', title:'Fewer tickets',     desc:'30–70% reduction' },
  { icon:'😌', title:'Less burnout',      desc:'AI handles first response' },
  { icon:'📋', title:'Audit-ready',       desc:'Every action receipted' },
  { icon:'💵', title:'Reduced costs',     desc:'85% MTTR improvement' },
];

/* ─── Audit Ledger (Aggressive Proof-Forward) ──────────────────────────── */

interface LedgerEntry {
  id: string; timestamp: string; category: string; actor: string;
  subject: string; action: string; outcome: string; hash_sha256: string;
  verify_url: string; tamper_detected: boolean; prev_hash: string;
}

interface LedgerData {
  total_entries: number; last_updated: string; entries: LedgerEntry[];
}

const CAT: Record<string, { color: string; bg: string; label: string; icon: string }> = {
  self_healing: { color: '#10b981', bg: 'rgba(16,185,129,0.15)', label: 'SELF-HEAL', icon: '\u26A1' },
  platform_fix: { color: '#3b82f6', bg: 'rgba(59,130,246,0.15)', label: 'FIX', icon: '\uD83D\uDD27' },
  security:     { color: '#ef4444', bg: 'rgba(239,68,68,0.15)', label: 'SECURITY', icon: '\uD83D\uDEE1' },
  compliance:   { color: '#f59e0b', bg: 'rgba(245,158,11,0.15)', label: 'COMPLIANCE', icon: '\uD83D\uDCCB' },
  deployment:   { color: '#8b5cf6', bg: 'rgba(139,92,246,0.15)', label: 'DEPLOY', icon: '\uD83D\uDE80' },
};
function getCat(c: string) { return CAT[c] || { color: '#6b7280', bg: 'rgba(107,114,128,0.15)', label: c.replace(/_/g, ' ').toUpperCase(), icon: '\u2699' }; }
function timeAgo(ts: string) { const s = Math.floor((Date.now() - new Date(ts).getTime()) / 1000); if (s < 60) return `${s}s ago`; if (s < 3600) return `${Math.floor(s / 60)}m ago`; if (s < 86400) return `${Math.floor(s / 3600)}h ago`; return `${Math.floor(s / 86400)}d ago`; }
function isLast24h(ts: string) { return (Date.now() - new Date(ts).getTime()) < 86400000; }

function AnimCounter({ target, duration = 1800 }: { target: number; duration?: number }) {
  const [val, setVal] = useState(0);
  const animated = useRef(false);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (target === 0) { setVal(0); return; }
    animated.current = false; // reset so new target triggers animation
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !animated.current) {
        animated.current = true;
        const t0 = Date.now();
        const tick = () => { const p = Math.min((Date.now() - t0) / duration, 1); setVal(Math.floor((1 - Math.pow(1 - p, 3)) * target)); if (p < 1) requestAnimationFrame(tick); };
        tick();
      }
    }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, duration]);
  return <span ref={ref}>{val.toLocaleString()}</span>;
}

function LiveTicker({ entries }: { entries: LedgerEntry[] }) {
  const items = entries.slice(0, 20).map(e => { const c = getCat(e.category); return `${c.icon} ${c.label}: ${e.subject} \u2192 ${e.outcome} \u00B7 #${e.id}`; });
  const all = [...items, ...items];
  return (
    <div style={{ background: '#000', borderTop: '1px solid #10b98130', borderBottom: '1px solid #10b98130', padding: '10px 0', overflow: 'hidden', position: 'relative' }}>
      <div style={{ position: 'absolute', left: 0, top: 0, width: 80, height: '100%', zIndex: 2, background: 'linear-gradient(to right, #000, transparent)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', right: 0, top: 0, width: 80, height: '100%', zIndex: 2, background: 'linear-gradient(to left, #000, transparent)', pointerEvents: 'none' }} />
      <div style={{ display: 'flex', gap: 48, whiteSpace: 'nowrap', animation: 'ticker-scroll 60s linear infinite', paddingLeft: '100%' }}>
        {all.map((item, i) => <span key={i} style={{ fontSize: 12, color: '#10b981', fontFamily: 'monospace', fontWeight: 600, flexShrink: 0 }}>{item}</span>)}
      </div>
      <style>{`@keyframes ticker-scroll { 0% { transform: translateX(0) } 100% { transform: translateX(-50%) } }`}</style>
    </div>
  );
}

function ReceiptRow({ entry, index }: { entry: LedgerEntry; index: number }) {
  const [open, setOpen] = useState(false);
  const c = getCat(entry.category);
  const fresh = isLast24h(entry.timestamp);
  return (
    <div style={{ border: `1px solid ${open ? c.color + '50' : '#ffffff10'}`, borderRadius: 8, overflow: 'hidden', background: open ? c.bg : 'rgba(255,255,255,0.02)', transition: 'all 0.2s' }}>
      <button onClick={() => setOpen(!open)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
        <span style={{ width: 7, height: 7, borderRadius: '50%', flexShrink: 0, background: fresh ? '#10b981' : '#374151', boxShadow: fresh ? '0 0 6px #10b981' : 'none', animation: fresh ? 'pulse-dot 2s infinite' : 'none' }} />
        <span style={{ fontSize: 10, fontWeight: 700, padding: '1px 6px', borderRadius: 4, background: c.bg, color: c.color, flexShrink: 0, fontFamily: 'monospace' }}>{c.icon} {c.label}</span>
        <span style={{ fontSize: 12, fontWeight: 600, color: '#f9fafb', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{entry.subject}</span>
        <span style={{ fontSize: 10, fontWeight: 700, color: entry.tamper_detected ? '#ef4444' : '#10b981', flexShrink: 0 }}>{entry.tamper_detected ? '\u26A0 TAMPERED' : '\u2713 VERIFIED'}</span>
        <span style={{ fontSize: 10, color: '#4b5563', flexShrink: 0, minWidth: 52, textAlign: 'right' }}>{timeAgo(entry.timestamp)}</span>
        <span style={{ color: '#4b5563', fontSize: 11, transition: 'transform 0.2s', flexShrink: 0, transform: open ? 'rotate(180deg)' : 'none' }}>{'\u25BE'}</span>
      </button>
      {open && (
        <div style={{ padding: '0 12px 12px', borderTop: `1px solid ${c.color}20` }}>
          <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.6, margin: '10px 0 8px' }}>{entry.action}</div>
          <div style={{ fontSize: 11, color: '#10b981', marginBottom: 8 }}>{'\u2713'} {entry.outcome}</div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
            <code style={{ fontSize: 10, color: '#7c3aed', background: 'rgba(124,58,237,0.1)', padding: '2px 8px', borderRadius: 4, fontFamily: 'monospace' }}>SHA-256: {entry.hash_sha256.slice(0, 16)}</code>
            {entry.verify_url && <a href={entry.verify_url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 10, color: '#3b82f6', fontWeight: 700, textDecoration: 'none' }}>Verify on-chain {'\u2197'}</a>}
            <span style={{ fontSize: 10, color: '#374151', marginLeft: 'auto' }}>{new Date(entry.timestamp).toLocaleString()}</span>
          </div>
        </div>
      )}
    </div>
  );
}

function AuditLedger() {
  const [data, setData] = useState<LedgerData | null>(null);
  const [showAll, setShowAll] = useState(false);
  const SHOW = 5;

  useEffect(() => {
    const load = async () => {
      try {
        const r = await fetch('https://itechsmart.dev/api/ledger', { cache: 'no-store' });
        if (!r.ok) throw new Error('primary failed');
        setData(await r.json());
      } catch {
        try {
          const r2 = await fetch('https://ledger.itechsmart.dev/_data/ledger.json', { cache: 'no-store' });
          if (!r2.ok) throw new Error('fallback failed');
          setData(await r2.json());
        } catch { /* silent — shows loading state */ }
      }
    };
    load();
  }, []);

  const entries = data?.entries || [];
  const last24 = entries.filter(e => isLast24h(e.timestamp)).length;
  const visible = showAll ? entries : entries.slice(0, SHOW);

  return (
    <section style={{ background: '#000', borderTop: '1px solid #ffffff08', borderBottom: '1px solid #ffffff08', fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Live ticker */}
      {entries.length > 0 && <LiveTicker entries={entries} />}

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '60px 24px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 20, padding: '6px 16px', fontSize: 11, fontWeight: 700, color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 20 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981', animation: 'pulse-dot 2s infinite', display: 'inline-block' }} />
            Live Autonomous Operations
          </div>
          <h2 style={{ fontSize: 40, fontWeight: 900, color: '#f9fafb', margin: '0 0 16px', lineHeight: 1.1 }}>
            Your IT Team Can Sleep.<br />
            <span style={{ background: 'linear-gradient(135deg, #10b981, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>The Platform Doesn{'\u2019'}t.</span>
          </h2>
          <p style={{ fontSize: 17, color: '#6b7280', maxWidth: 520, margin: '0 auto', lineHeight: 1.6 }}>
            Every fix below happened autonomously. No human woke up. No ticket was filed. Every action is cryptographically sealed and publicly verifiable.
          </p>
        </div>

        {/* Stat counters */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 48 }}>
          {[
            { val: data ? last24 : 0, label: 'Autonomous recoveries', sub: 'in the last 24 hours', color: '#10b981', glow: 'rgba(16,185,129,0.2)' },
            { val: data ? data.total_entries : 0, label: 'Cryptographic receipts', sub: 'on the public ledger', color: '#7c3aed', glow: 'rgba(124,58,237,0.2)' },
            { val: 0, label: 'Tamper events', sub: 'detected. Ever.', color: '#3b82f6', glow: 'rgba(59,130,246,0.2)' },
          ].map((stat, i) => (
            <div key={i} style={{ background: '#0a0a0a', border: `1px solid ${stat.color}30`, borderRadius: 16, padding: '28px 24px', textAlign: 'center', boxShadow: `0 0 40px ${stat.glow}`, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 50% 0%, ${stat.glow}, transparent 70%)`, pointerEvents: 'none' }} />
              <div style={{ fontSize: 52, fontWeight: 900, color: stat.color, lineHeight: 1, fontVariantNumeric: 'tabular-nums', position: 'relative' }}><AnimCounter target={stat.val} /></div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#f9fafb', marginTop: 8, position: 'relative' }}>{stat.label}</div>
              <div style={{ fontSize: 11, color: '#4b5563', marginTop: 4, position: 'relative' }}>{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* Feed header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 6px #10b981', animation: 'pulse-dot 2s infinite', display: 'inline-block' }} />
            Live Receipt Feed
          </div>
          <div style={{ fontSize: 11, color: '#4b5563' }}>{data ? `${data.total_entries} total \u00B7 append-only \u00B7 immutable` : 'Loading...'}</div>
        </div>

        {/* Receipts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 16 }}>
          {!data
            ? [...Array(5)].map((_, i) => <div key={i} style={{ height: 42, borderRadius: 8, background: 'rgba(255,255,255,0.03)', border: '1px solid #ffffff08' }} />)
            : visible.map((e, i) => <ReceiptRow key={e.id} entry={e} index={i} />)
          }
        </div>

        {/* Expand */}
        {data && entries.length > SHOW && (
          <div style={{ textAlign: 'center' }}>
            <button onClick={() => setShowAll(!showAll)} style={{ background: 'transparent', border: '1px solid #1f2937', borderRadius: 8, padding: '8px 20px', color: '#6b7280', fontSize: 12, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}>
              {showAll ? '\u2191 Show less' : `\u2193 Load all ${entries.length} receipts`}
            </button>
          </div>
        )}

        {/* Bottom CTA */}
        <div style={{ marginTop: 40, padding: 28, background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.15)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#f9fafb', marginBottom: 4 }}>Don{'\u2019'}t trust us. Verify it yourself.</div>
            <div style={{ fontSize: 13, color: '#4b5563' }}>Every receipt has a public URL. Open any hash. Verify the chain. Nothing to hide.</div>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', flexShrink: 0 }}>
            <a href="https://verify.itechsmart.dev" target="_blank" rel="noopener noreferrer" style={{ background: '#10b981', color: '#000', padding: '10px 20px', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: 13 }}>Verify a Receipt {'\u2192'}</a>
            <a href="https://itechsmart.dev/proof" target="_blank" rel="noopener noreferrer" style={{ background: 'transparent', color: '#10b981', padding: '10px 20px', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: 13, border: '1px solid rgba(16,185,129,0.3)' }}>Full Proof Ledger {'\u2197'}</a>
          </div>
        </div>
      </div>

      <style>{`@keyframes pulse-dot { 0%, 100% { opacity: 1; transform: scale(1) } 50% { opacity: 0.5; transform: scale(0.8) } }`}</style>
    </section>
  );
}

/* ─── Component ──────────────────────────────────────────────────────────── */
export default function GetITechSmartHome() {
  const [cycleIdx, setCycleIdx]   = useState(0);
  const [showCycle, setShowCycle] = useState(true);
  const [activeStep, setActiveStep] = useState(0);
  const [counters, setCounters]   = useState({ containers: 0, heal: 0, targets: 0, nist: 0 });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Cycling hero word animation
  useEffect(() => {
    const cycle = () => {
      setShowCycle(false);
      setTimeout(() => {
        setCycleIdx(i => (i + 1) % CYCLE_WORDS.length);
        setShowCycle(true);
      }, 350);
    };
    const id = setInterval(cycle, 2400);
    return () => clearInterval(id);
  }, []);

  // UAIO step auto-advance
  useEffect(() => {
    const id = setInterval(() => setActiveStep(s => (s + 1) % STEPS.length), 1700);
    return () => clearInterval(id);
  }, []);

  // Animated counters
  useEffect(() => {
    const tgt = { containers:131, heal:20, targets:88, nist:96 };
    let f = 0; const tot = 80;
    const id = setInterval(() => {
      f++;
      const ease = 1 - Math.pow(1 - Math.min(f / tot, 1), 3);
      setCounters({
        containers: Math.round(tgt.containers * ease),
        heal:       Math.round(tgt.heal       * ease),
        targets:    Math.round(tgt.targets    * ease),
        nist:       Math.round(tgt.nist       * ease),
      });
      if (f >= tot) clearInterval(id);
    }, 18);
    return () => clearInterval(id);
  }, []);

  // Close mobile menu on desktop resize
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMobileMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const NAV_LINKS = [
    ['Platform',    'https://itechsmart.dev'],
    ['Proof',       'https://itechsmart.dev/proof'],
    ['Whitepaper',  'https://whitepaper.itechsmart.dev'],
    ['Start Here',  'https://itechsmart.dev/start'],
    ['Pitch Deck',  '/pitch-deck'],
  ];

  return (
    <>
      <style>{CSS}</style>

      {/* ══ NAV ════════════════════════════════════════════════════════════ */}
      <nav style={{ position:'fixed', top:0, left:0, right:0, zIndex:100, background:'var(--nav-bg)', borderBottom:'1px solid rgba(153,51,255,0.15)', backdropFilter:'blur(18px)', WebkitBackdropFilter:'blur(18px)', height:64, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 20px', gap:12 }}>
        {/* Logo */}
        <a href="/" style={{ display:'flex', alignItems:'center', gap:8, flexShrink:0, textDecoration:'none' }}>
          <img src="/itechsmart_icon.png" alt="iTechSmart" style={{ width:26, height:26, borderRadius:'50%' }} />
          <span style={{ fontWeight:800, fontSize:16, letterSpacing:'-0.3px', whiteSpace:'nowrap' }}>
            <span style={{ color:'#ffffff' }}>iTech</span><span style={{ color:'#9933FF' }}>Smart</span>
          </span>
        </a>

        {/* Desktop nav — hidden on mobile via CSS */}
        <div className="nav-desktop">
          {NAV_LINKS.map(([l,h]) => <a key={l} href={h} className="nav-link">{l}</a>)}
          <a href="https://itechsmart.dev/pulse" className="btn-cta" style={{ animation:'none', fontSize:13, padding:'8px 16px', borderRadius:9 }}>Try Free →</a>
        </div>

        {/* Hamburger — hidden on desktop via CSS, shows on mobile */}
        <button
          className="hamburger"
          onClick={() => setMobileMenuOpen(o => !o)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
        >
          <span className={`bar bar-top${mobileMenuOpen ? ' open' : ''}`} />
          <span className={`bar bar-mid${mobileMenuOpen ? ' open' : ''}`} />
          <span className={`bar bar-bot${mobileMenuOpen ? ' open' : ''}`} />
        </button>
      </nav>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          {NAV_LINKS.map(([l,h]) => (
            <a key={l} href={h} onClick={() => setMobileMenuOpen(false)}>{l}</a>
          ))}
          <div className="mobile-menu-cta">
            <a href="https://itechsmart.dev/pulse" className="btn-cta" style={{ width:'100%', justifyContent:'center' }} onClick={() => setMobileMenuOpen(false)}>Try Free →</a>
          </div>
        </div>
      )}

      {/* ══ LIVE TICKER ════════════════════════════════════════════════════ */}
      <div style={{ position:'fixed', bottom:0, left:0, right:0, zIndex:99, background:'rgba(5,5,15,0.92)', borderTop:'1px solid rgba(153,51,255,0.1)', backdropFilter:'blur(12px)', padding:'6px 0' }}>
        <div className="ticker-wrap">
          <div className="ticker-inner">
            {[...TICKER_EVENTS,...TICKER_EVENTS].map((e,i) => (
              <span key={i} style={{ display:'inline-flex', alignItems:'center', gap:10, fontSize:11, color:'var(--muted)' }}>
                <span style={{ color:e.color, fontWeight:700, fontSize:10, letterSpacing:'.05em' }}>{e.type}</span>
                {e.msg}
                <span style={{ fontFamily:'monospace', color:'rgba(255,255,255,0.2)' }}>#{e.hash}</span>
                <span style={{ color:'rgba(153,51,255,0.22)' }}>·</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* JSON-LD Schemas */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'SoftwareApplication',
        name: 'iTechSmart UAIO Platform', applicationCategory: 'IT Operations Management',
        operatingSystem: 'Cloud / On-Premise',
        description: 'Unified Autonomous IT Operations platform that detects, remediates, and cryptographically proves every infrastructure action.',
        url: 'https://www.getitechsmart.com',
        offers: { '@type': 'AggregateOffer', priceCurrency: 'USD', lowPrice: '0', highPrice: '2499', offerCount: '4' },
        creator: { '@type': 'Organization', name: 'iTechSmart Inc.', url: 'https://itechsmart.dev' },
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Organization',
        name: 'iTechSmart Inc.', url: 'https://itechsmart.dev', logo: 'https://itechsmart.dev/logo.svg',
        description: "The world's first UAIO platform — autonomous IT operations with cryptographic proof.",
        foundingDate: '2021', award: 'Ranked #6 of 2M+ AI Startups — F6S',
        identifier: [
          { '@type': 'PropertyValue', name: 'CAGE', value: '172W2' },
          { '@type': 'PropertyValue', name: 'UEI', value: 'ZCPFX4N86G36' },
        ],
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'HowTo',
        name: 'How iTechSmart UAIO Works',
        description: 'Autonomous IT operations in 5 steps: Detect, Simulate, Decide, Fix, Prove.',
        step: [
          { '@type': 'HowToStep', name: 'Detect', text: 'Pulse Scanner identifies infrastructure anomalies in real-time' },
          { '@type': 'HowToStep', name: 'Simulate', text: 'Digital Twin simulates the fix before applying it' },
          { '@type': 'HowToStep', name: 'Decide', text: 'OctoAI determines the optimal remediation path' },
          { '@type': 'HowToStep', name: 'Fix', text: 'Automated remediation applied with zero human intervention' },
          { '@type': 'HowToStep', name: 'Prove', text: 'ProofLink generates a SHA-256 cryptographic receipt for the action' },
        ],
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'What is UAIO?', acceptedAnswer: { '@type': 'Answer', text: 'UAIO (Unified Autonomous IT Operations) is a platform category by iTechSmart that autonomously detects, fixes, and cryptographically proves every IT action — replacing fragmented monitoring, ticketing, and AIOps tools.' }},
          { '@type': 'Question', name: 'How does iTechSmart prove every fix?', acceptedAnswer: { '@type': 'Answer', text: 'Every automated action generates a ProofLink receipt — a SHA-256 cryptographic hash chained immutably, verifiable at verify.itechsmart.dev.' }},
          { '@type': 'Question', name: 'Is iTechSmart compliant for government use?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. iTechSmart Citadel is FedRAMP-pathway, FIPS-aligned, with NIST CSF 96/100. SDVOSB certified, CAGE Code 172W2.' }},
        ],
      })}} />

      {/* Server-rendered SEO content — visible to crawlers */}
      <div style={{ position:'absolute', width:1, height:1, overflow:'hidden', clip:'rect(0,0,0,0)', whiteSpace:'nowrap' }} aria-hidden="false">
        <h1>iTechSmart UAIO Platform — Autonomous IT Operations with Cryptographic Proof</h1>
        <p>iTechSmart is the world&apos;s first Unified Autonomous IT Operations (UAIO) platform. Automatically detect infrastructure issues, fix them with zero human intervention, and generate cryptographic proof of every action.</p>
        <h2>Self-Healing Infrastructure for Enterprise IT</h2>
        <p>132 containers, 115 microservices, 88 databases. Mean time to resolve: 20 seconds. Cloud-native IT automation with real-time anomaly detection.</p>
        <h2>AI-Powered IT Operations Management</h2>
        <p>Replace PagerDuty, Datadog, and ServiceNow with a single autonomous operations layer. IT incident management, DevOps automation, and compliance — unified.</p>
        <nav aria-label="Site navigation">
          <a href="https://itechsmart.dev">iTechSmart Platform</a>
          <a href="https://itechsmart.dev/industries/healthcare">Healthcare IT (HL7)</a>
          <a href="https://itechsmart.dev/industries/government">Government (Citadel)</a>
          <a href="https://itechsmart.dev/security">Security &amp; Governance</a>
          <a href="https://itechsmart.dev/pricing">Pricing</a>
          <a href="https://itechsmart.dev/pulse">Free Pulse Scan</a>
          <a href="https://itechsmart.dev/proof">Live Proof Ledger</a>
          <a href="https://itechsmart.dev/integrations">Integrations</a>
          <a href="https://itechsmart.dev/about">About iTechSmart</a>
          <a href="https://itechsmart.dev/faq">FAQ</a>
          <a href="https://itechsmart.dev/contact">Contact</a>
          <a href="https://docs.itechsmart.dev">Documentation</a>
          <a href="https://verify.itechsmart.dev">Verify Proof</a>
          <a href="https://whitepaper.itechsmart.dev">Whitepaper</a>
        </nav>
      </div>

      <main style={{ paddingTop:64, paddingBottom:48 }}>

        {/* ══ HERO ═══════════════════════════════════════════════════════ */}
        <section className="section" style={{ position:'relative', minHeight:'92vh', display:'flex', alignItems:'center', paddingTop:40, paddingBottom:40 }}>
          <div className="scanlines" />
          <div className="mesh" style={{ width:'60vw', height:'60vw', maxWidth:700, maxHeight:700, background:'rgba(153,51,255,0.1)', top:'-15%', left:'5%' }} />
          <div className="mesh" style={{ width:'40vw', height:'40vw', maxWidth:500, maxHeight:500, background:'rgba(51,102,255,0.07)', top:'30%', right:'10%' }} />

          <div className="hero-grid" style={{ position:'relative', zIndex:2, width:'100%', display:'flex', alignItems:'center', gap:48, justifyContent:'space-between' }}>

            {/* ── Left: copy ── */}
            <div style={{ flex:'1 1 0', minWidth:0, maxWidth:680 }}>
              {/* Live badge */}
              <div className="fade-up d1" style={{ display:'inline-flex', alignItems:'center', gap:8, background:'var(--purple-sm)', border:'1px solid var(--purple-bd)', borderRadius:20, padding:'5px 14px', marginBottom:28 }}>
                <div style={{ width:7, height:7, borderRadius:'50%', background:'var(--green)', boxShadow:'0 0 8px #22C55E', animation:'pulse 2s ease infinite', flexShrink:0 }} />
                <span style={{ fontSize:11, fontWeight:600, color:'rgba(224,209,255,.9)', letterSpacing:'.02em' }}>Live System Status: Active · Monitoring 132 containers across 84 services</span>
              </div>

              {/* ── HERO HEADLINE with cycling word animation ── */}
              <h2 className="display display-xl fade-up d2" style={{ color:'var(--fg)', marginBottom:6 }}>
                Stop Fighting IT
              </h2>
              {/* Cycling word — slides up/down, container sized to exactly one line of display-xl */}
              <div className="fade-up d2" style={{
                overflow: 'hidden',
                /* line-height is 1.05 × font-size; add 20px for glow bleed below baseline */
                paddingBottom: 20,
                marginBottom: -14,  /* pull next element back up to close the glow gap */
              }}>
                <div style={{
                  animation: showCycle
                    ? 'slideIn .38s cubic-bezier(.22,1,.36,1) both'
                    : 'slideOut .28s cubic-bezier(.55,0,1,.45) both',
                }}>
                  <span className="display display-xl gradient-text text-glow" style={{ display:'block' }} role="text" aria-label={CYCLE_WORDS[cycleIdx]}>
                    {CYCLE_WORDS[cycleIdx]}
                  </span>
                </div>
              </div>

              <h2 className="display display-lg fade-up d3" style={{ color:'var(--purple)', marginBottom:20, letterSpacing:'-1.5px' }}>
                Start Preventing Them.
              </h2>

              <p className="body-lg fade-up d4" style={{ marginBottom:8, maxWidth:580 }}>
                AI that automatically fixes production IT issues — and proves it to your auditors.
              </p>
              <p className="body-lg fade-up d4" style={{ fontSize:15, marginBottom:10, maxWidth:580 }}>
                Built for healthcare systems, MSPs, and enterprise IT teams.
              </p>
              <p style={{ fontSize:13, color:'rgba(128,117,166,0.75)', lineHeight:1.55, marginBottom:8, maxWidth:560 }} className="fade-up d4">
                Right now, your system is waiting for a human to fix the next outage. That's the risk. We removed it.
              </p>
              <p style={{ fontSize:13, color:'rgba(128,117,166,0.75)', lineHeight:1.55, marginBottom:8, maxWidth:560 }} className="fade-up d4">
                Downtime costs ~$5,600 per minute. Most incidents take 45–90 minutes. We resolve them in ~20 seconds.
              </p>
              <p style={{ fontSize:13, color:'rgba(128,117,166,0.6)', lineHeight:1.55, marginBottom:28, maxWidth:560 }} className="fade-up d4">
                No rip and replace. Layers on top of ServiceNow, Jira, Splunk, Datadog, AWS, Azure — no migration required.
              </p>

              <div className="cta-row fade-up d5" style={{ display:'flex', gap:12, flexWrap:'wrap', marginBottom:16 }}>
                <a href="https://itechsmart.dev/pulse" className="btn-cta">✓ Yes — Show Me</a>
                <a href="https://docs.itechsmart.dev/demo" className="btn-ghost">Watch Demo</a>
                <a href="https://itechsmart.dev/proof" className="btn-ghost">View Live Proof →</a>
              </div>

              <p style={{ fontSize:11, color:'rgba(255,255,255,0.18)', marginBottom:24 }} className="fade-up d5">
                No setup · No risk · Results in 2 minutes · NIST &amp; Zero Trust · SDVOSB · F6S #6 globally · ⚠ Early access filling for enterprise pilots
              </p>

              {/* Stat cards */}
              <div className="fade-up d6" style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
                {STATS.map(s => (
                  <div key={s.label} className="card" style={{ padding:'10px 16px', textAlign:'center', cursor:'default', minWidth:90 }}>
                    <div style={{ fontWeight:800, fontSize:20, color:'var(--purple)', letterSpacing:'-0.5px' }}>{s.val}</div>
                    <div style={{ fontSize:9, fontWeight:600, color:'var(--muted)', letterSpacing:'.06em', textTransform:'uppercase', marginTop:3 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right: UAIO loop + ProofLink card ── */}
            <div className="hero-right fade-in d3" style={{ display:'flex', gap:16, alignItems:'flex-start', flexShrink:0 }}>
              {/* UAIO step column */}
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
                {STEPS.map((step, i) => (
                  <div key={step.key} style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
                    <div
                      className={`step-card${i === activeStep ? ' active' : ''}`}
                      onClick={() => setActiveStep(i)}
                      style={{
                        background: step.bg,
                        border: `1px solid ${i === activeStep ? step.color : step.bd}`,
                        boxShadow: i === activeStep ? `0 0 22px ${step.color}44` : 'none',
                      }}
                    >
                      <span style={{ fontSize:22 }}>{step.icon}</span>
                      <span style={{ fontSize:9, fontWeight:700, color:step.color, letterSpacing:'.05em', marginTop:4 }}>{step.key}</span>
                    </div>
                    {i < STEPS.length - 1 && (
                      <div style={{ width:2, height:12, background: i < activeStep ? step.color : 'rgba(153,51,255,0.18)', transition:'background .4s' }} />
                    )}
                  </div>
                ))}
              </div>

              {/* ProofLink card */}
              <div className="proof-card" style={{ width:300 }}>
                <div style={{ padding:'11px 16px 8px', borderBottom:'1px solid var(--divider)' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:7 }}>
                    <div style={{ width:7, height:7, borderRadius:'50%', background:'var(--green)', animation:'pulse 2s ease infinite', flexShrink:0 }} />
                    <span style={{ fontSize:10, fontWeight:700, color:'var(--green)' }}>Live ProofLink Receipt</span>
                  </div>
                  <div style={{ fontFamily:'monospace', fontSize:10, color:'rgba(255,255,255,0.22)', marginTop:2 }}>f0b71cc0970c96e2</div>
                </div>
                {[
                  ['Container',       'suite-itsm',         'var(--fg)'],
                  ['Trigger',         'Health check failed', 'var(--fg)'],
                  ['Detected',        '10 seconds',          'var(--fg)'],
                  ['Recovery',        '20 seconds',          'var(--fg)'],
                  ['Human input',     'ZERO',                'var(--green)'],
                  ['SHA-256',         'verified ✓',          'var(--green)'],
                  ['tamper_detected', 'false',               'var(--green)'],
                ].map(([l,v,c]) => (
                  <div key={l} className="proof-row">
                    <span style={{ color:'var(--muted)' }}>{l}</span>
                    <span style={{ fontWeight:700, color:c }}>{v}</span>
                  </div>
                ))}
                <div style={{ margin:'7px 14px 11px', background:'rgba(34,197,94,0.08)', border:'1px solid rgba(34,197,94,0.18)', borderRadius:7, padding:'6px 11px' }}>
                  <span style={{ fontSize:9, fontWeight:700, color:'var(--green)' }}>CRYPTOGRAPHICALLY SEALED · itechsmart.dev/proof & itechsmart.dev/verify</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ LIVE COUNTERS ════════════════════════════════════════════════ */}
        <div style={{ background:'rgba(0,0,0,0.18)', padding:'36px 20px', borderTop:'1px solid var(--divider)', borderBottom:'1px solid var(--divider)' }}>
          <div style={{ maxWidth:1000, margin:'0 auto' }}>
            <div className="four-col" style={{ display:'grid', gap:12 }}>
              {[
                { val:counters.containers, sfx:'',  label:'Production containers', color:'var(--purple)' },
                { val:counters.heal,       sfx:'s', label:'Self-heal time',         color:'var(--teal)'  },
                { val:counters.targets,    sfx:'',  label:'Prometheus targets UP',  color:'var(--blue)'  },
                { val:counters.nist,       sfx:'%', label:'NIST CSF score',         color:'var(--green)' },
              ].map(c => (
                <div key={c.label} className="card" style={{ padding:'18px 16px', textAlign:'center', cursor:'default' }}>
                  <div style={{ fontWeight:800, fontSize:36, color:c.color, letterSpacing:'-1px', lineHeight:1 }}>{c.val}{c.sfx}</div>
                  <div style={{ fontSize:10, fontWeight:600, color:'var(--muted)', letterSpacing:'.05em', textTransform:'uppercase', marginTop:6 }}>{c.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══ UAIO LOOP ════════════════════════════════════════════════════ */}
        <section className="section">
          <div style={{ maxWidth:1100, margin:'0 auto' }}>
            <p className="section-label" style={{ color:'var(--purple)', marginBottom:10 }}>♾ The Autonomous Loop</p>
            <h2 className="display display-md" style={{ marginBottom:8 }}>A complete autonomous loop. No gaps. No handoffs.</h2>
            <p style={{ fontSize:14, color:'var(--muted)', marginBottom:32, maxWidth:480, lineHeight:1.6 }}>Every phase runs autonomously. Humans set policy — the loop handles execution.</p>
            <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:16 }}>
              {STEPS.map((s,i) => (
                <button key={s.key} onClick={() => setActiveStep(i)} style={{ display:'flex', alignItems:'center', gap:8, padding:'8px 14px', borderRadius:10, border:`1px solid ${i===activeStep ? s.color : 'rgba(255,255,255,0.07)'}`, background:i===activeStep ? s.bg : 'transparent', cursor:'pointer', transition:'all .2s', fontFamily:'inherit' }}>
                  <span style={{ fontSize:14 }}>{s.icon}</span>
                  <span style={{ fontSize:12, fontWeight:700, color:i===activeStep ? s.color : 'var(--muted)', letterSpacing:'.04em' }}>{s.key}</span>
                </button>
              ))}
            </div>
            <p style={{ fontSize:11, color:'var(--muted)', fontStyle:'italic' }}>✓ Production-tested across real infrastructure scenarios · Designed for NIST-aligned environments</p>
          </div>
        </section>

        {/* ══ THE PROBLEM ══════════════════════════════════════════════════ */}
        <section className="section" style={{ background:'rgba(0,0,0,0.18)' }}>
          <div style={{ maxWidth:1100, margin:'0 auto' }}>
            <p className="section-label" style={{ color:'var(--red)', marginBottom:10 }}>⚠ The Problem</p>
            <h2 className="display display-md" style={{ marginBottom:12 }}>IT Teams Aren't Failing. The System Is.</h2>
            <p style={{ fontSize:14, color:'var(--muted)', marginBottom:32, maxWidth:560, lineHeight:1.65 }}>Alerts everywhere. Tickets piling up. Engineers guessing under pressure. No defensible proof of what actually happened. You don't have a people problem. You have an operations problem.</p>
            <div className="four-col" style={{ display:'grid', gap:12 }}>
              {PROBLEMS.map(p => (
                <div key={p.title} className="card" style={{ padding:'20px 16px', background:'rgba(255,64,77,0.04)', borderColor:'rgba(255,64,77,0.18)' }}>
                  <div style={{ fontSize:22, marginBottom:10 }}>{p.icon}</div>
                  <div style={{ fontWeight:700, fontSize:14, marginBottom:6, lineHeight:1.3 }}>{p.title}</div>
                  <div style={{ fontSize:12, color:'var(--muted)', lineHeight:1.55 }}>{p.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ THE SOLUTION ═════════════════════════════════════════════════ */}
        <section className="section">
          <div style={{ maxWidth:1100, margin:'0 auto' }}>
            <p className="section-label" style={{ color:'var(--purple)', marginBottom:10 }}>⚡ The Solution</p>
            <h2 className="display display-md" style={{ marginBottom:8 }}>Meet Autonomous IT Operations</h2>
            <p style={{ fontSize:14, color:'var(--muted)', marginBottom:36, maxWidth:540, lineHeight:1.65 }}>The only platform that closes the full loop — detect, simulate, decide, fix, and prove — without a human in the loop. Not just automation. Accountable automation.</p>
            <div className="five-col" style={{ display:'grid', gap:12 }}>
              {SOLUTIONS.map(s => (
                <div key={s.n} className="card" style={{ padding:'20px 16px', position:'relative', overflow:'hidden', background:'var(--purple-sm)', borderColor:'rgba(153,51,255,0.2)' }}>
                  <div style={{ position:'absolute', top:6, right:10, fontWeight:900, fontSize:38, color:'rgba(153,51,255,0.07)', lineHeight:1, letterSpacing:'-2px', pointerEvents:'none' }}>{s.n}</div>
                  <div style={{ fontSize:24, marginBottom:10 }}>{s.icon}</div>
                  <div style={{ fontWeight:700, fontSize:14, color:s.color, marginBottom:6, letterSpacing:'-0.3px' }}>{s.title}</div>
                  <div style={{ fontSize:12, color:'var(--muted)', lineHeight:1.55 }}>{s.desc}</div>
                </div>
              ))}
            </div>
            <p style={{ fontSize:12, color:'var(--muted)', marginTop:20, textAlign:'center', fontStyle:'italic' }}>Watch the fix happen ↓</p>
          </div>
        </section>

        {/* ══ PROOF SECTION ════════════════════════════════════════════════ */}
        <section className="section" style={{ background:'rgba(0,0,0,0.18)' }}>
          <div style={{ maxWidth:1100, margin:'0 auto' }}>
            <div className="two-col" style={{ display:'grid', gap:48, alignItems:'center' }}>
              <div>
                <p className="section-label" style={{ color:'var(--green)', marginBottom:10 }}>🔐 Cryptographic Proof</p>
                <h2 className="display display-md" style={{ marginBottom:14 }}>Don't Trust AI. Verify It.</h2>
                <p className="body-lg" style={{ marginBottom:12, fontSize:16 }}>Every action generates a SHA-256 tamper-proof receipt. Prove to any auditor what happened, why, and what was done — with a public verify URL.</p>
                <div style={{ background:'rgba(34,197,94,0.06)', border:'1px solid rgba(34,197,94,0.16)', borderRadius:10, padding:'13px 16px', marginBottom:20 }}>
                  <p style={{ fontSize:11, fontWeight:700, color:'var(--green)', marginBottom:5 }}>PROVEN LIVE — April 5 2026</p>
                  <p style={{ fontSize:13, color:'var(--muted)', lineHeight:1.6 }}>suite-itsm killed → detected 10s → recovered 20s → zero human input</p>
                  <p style={{ fontSize:13, color:'var(--muted)', marginTop:6, lineHeight:1.6 }}>That 20 seconds isn't just fast. It's the difference between a minor event and a major outage. This is what auditors, security teams, and executives rely on.</p>
                </div>
                <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
                  <a href="https://verify.itechsmart.dev" className="btn-cta" style={{ animation:'none', fontSize:13, padding:'10px 18px' }}>Verify a Receipt →</a>
                  <a href="https://proof-library.itechsmart.dev" className="btn-ghost" style={{ fontSize:13, padding:'10px 16px' }}>View Proof Library →</a>
                  <a href="https://whitepaper.itechsmart.dev" className="btn-ghost" style={{ fontSize:12, padding:'10px 14px' }}>Architecture Whitepaper →</a>
                </div>
              </div>
              <div className="proof-card" style={{ boxShadow:'0 0 60px rgba(34,197,94,0.1)' }}>
                <div style={{ padding:'13px 16px 9px', borderBottom:'1px solid var(--divider)' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                    <div style={{ width:7, height:7, borderRadius:'50%', background:'var(--green)', animation:'pulse 2s ease infinite', flexShrink:0 }} />
                    <span style={{ fontSize:10, fontWeight:700, color:'var(--green)' }}>Live ProofLink · April 5 2026</span>
                  </div>
                </div>
                {[
                  ['Receipt',        'f0b71cc0970c96e2',    'rgba(255,255,255,0.38)', true],
                  ['Container',      'suite-itsm',           'var(--fg)',               false],
                  ['Trigger',        'Health check failed',  'var(--fg)',               false],
                  ['Detected',       '10 seconds',           'var(--fg)',               false],
                  ['Recovery',       '20 seconds',           'var(--fg)',               false],
                  ['Human input',    'ZERO',                 'var(--green)',            false],
                  ['SHA-256',        'verified ✓',           'var(--green)',            false],
                  ['tamper_detected','false',                'var(--green)',            false],
                ].map(([l,v,c,mono]) => (
                  <div key={l as string} className="proof-row">
                    <span style={{ color:'var(--muted)' }}>{l}</span>
                    <span style={{ fontWeight:700, color:c as string, fontFamily:mono ? 'monospace':undefined, fontSize:mono ? 11:12 }}>{v}</span>
                  </div>
                ))}
                <div style={{ margin:'8px 14px 12px', background:'rgba(34,197,94,0.07)', border:'1px solid rgba(34,197,94,0.16)', borderRadius:7, padding:'7px 12px' }}>
                  <span style={{ fontSize:9, fontWeight:700, color:'var(--green)' }}>CRYPTOGRAPHICALLY SEALED · itechsmart.dev/proof & itechsmart.dev/verify</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ VS COMPARISON ════════════════════════════════════════════════ */}
        <section className="section">
          <div style={{ maxWidth:860, margin:'0 auto' }}>
            <h2 className="display display-md" style={{ textAlign:'center', marginBottom:36 }}>⚡ Traditional IT Ops vs iTechSmart UAIO</h2>
            <div className="two-col" style={{ display:'grid', gap:14 }}>
              <div style={{ background:'rgba(255,64,77,0.05)', border:'1px solid rgba(255,64,77,0.2)', borderRadius:16, padding:'26px 22px' }}>
                <p style={{ color:'var(--red)', fontWeight:700, fontSize:11, letterSpacing:'.07em', textTransform:'uppercase', marginBottom:20 }}>🚫 Traditional IT Ops</p>
                {[['47','alerts firing'],['2','engineers paged'],['90 min','mean time to resolve'],['—','no clear root cause'],['—','no audit trail']].map(([v,l]) => (
                  <div key={l} style={{ display:'flex', gap:16, alignItems:'baseline', marginBottom:12 }}>
                    <span style={{ fontWeight:800, fontSize:24, color:'var(--red)', minWidth:58, letterSpacing:'-1px', flexShrink:0 }}>{v}</span>
                    <span style={{ fontSize:13, color:'var(--muted)' }}>{l}</span>
                  </div>
                ))}
              </div>
              <div style={{ background:'var(--purple-sm)', border:'1px solid var(--purple-bd)', borderRadius:16, padding:'26px 22px' }}>
                <p style={{ color:'var(--purple)', fontWeight:700, fontSize:11, letterSpacing:'.07em', textTransform:'uppercase', marginBottom:20 }}>⚡ iTechSmart UAIO</p>
                {[['1','alert (deduplicated)'],['0','engineers paged'],['20 sec','mean time to resolve'],['✓','root cause reasoned'],['✓','ProofLink receipt']].map(([v,l]) => (
                  <div key={l} style={{ display:'flex', gap:16, alignItems:'baseline', marginBottom:12 }}>
                    <span style={{ fontWeight:800, fontSize:24, color:'var(--purple)', minWidth:58, letterSpacing:'-1px', flexShrink:0 }}>{v}</span>
                    <span style={{ fontSize:13, color:'var(--muted)' }}>{l}</span>
                  </div>
                ))}
              </div>
            </div>
            <p style={{ textAlign:'center', color:'var(--muted)', marginTop:18, fontSize:14 }}>Same incident. Different outcome.</p>
            <p style={{ textAlign:'center', color:'rgba(255,255,255,0.25)', marginTop:6, fontSize:12 }}>Doing nothing means your next outage still depends on someone waking up.</p>
          </div>
        </section>

        {/* ══ BUILT FOR ════════════════════════════════════════════════════ */}
        <section className="section" style={{ background:'rgba(0,0,0,0.18)' }}>
          <div style={{ maxWidth:1100, margin:'0 auto' }}>
            <p style={{ fontSize:12, color:'var(--muted)', marginBottom:8 }}>Built for</p>
            <div style={{ display:'flex', flexWrap:'wrap', gap:12, marginBottom:48 }}>
              {['MSPs managing 100–10,000 endpoints','Enterprise IT teams under SLA pressure','Healthcare & regulated environments'].map(l => (
                <div key={l} style={{ padding:'8px 16px', background:'var(--purple-sm)', border:'1px solid var(--purple-bd)', borderRadius:20, fontSize:13, color:'rgba(224,209,255,.85)' }}>{l}</div>
              ))}
            </div>

            <p className="section-label" style={{ color:'var(--purple)', marginBottom:10 }}>🏢 The Shift Is Already Happening</p>
            <h2 className="display display-md" style={{ marginBottom:32 }}>Who is already moving to this model</h2>
            <div className="four-col" style={{ display:'grid', gap:12 }}>
              {VERTICALS.map(v => (
                <div key={v.title} className="card" style={{ padding:'20px 16px', background:`${v.color}0a`, borderColor:`${v.color}26` }}>
                  <div style={{ fontSize:24, marginBottom:10 }}>{v.icon}</div>
                  <div style={{ fontWeight:700, fontSize:15, color:v.color, marginBottom:6, letterSpacing:'-0.3px' }}>{v.title}</div>
                  <div style={{ fontSize:12, color:'var(--muted)', marginBottom:14, lineHeight:1.55 }}>{v.desc}</div>
                  {v.items.map(item => (
                    <div key={item} style={{ display:'flex', gap:8, alignItems:'flex-start', marginBottom:6 }}>
                      <span style={{ color:v.color, fontWeight:700, flexShrink:0, fontSize:11 }}>✓</span>
                      <span style={{ fontSize:12, color:'var(--muted)' }}>{item}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ OUTCOMES ═════════════════════════════════════════════════════ */}
        <section className="section">
          <div style={{ maxWidth:1100, margin:'0 auto' }}>
            <p className="section-label" style={{ color:'var(--purple)', marginBottom:10 }}>💰 Outcomes</p>
            <h2 className="display display-md" style={{ marginBottom:36 }}>What Happens When IT Runs Itself?</h2>
            <div className="five-col" style={{ display:'grid', gap:12 }}>
              {OUTCOMES.map(o => (
                <div key={o.title} className="card" style={{ padding:'20px 16px', textAlign:'center' }}>
                  <div style={{ fontSize:28, marginBottom:8 }}>{o.icon}</div>
                  <div style={{ fontWeight:700, fontSize:14, marginBottom:4 }}>{o.title}</div>
                  <div style={{ fontSize:12, color:'var(--muted)' }}>{o.desc}</div>
                </div>
              ))}
            </div>
            <p style={{ textAlign:'center', marginTop:24, fontSize:11, color:'rgba(255,255,255,0.18)' }}>SDVOSB · Veteran-Owned · Irvine CA · F6S #6 Globally</p>
          </div>
        </section>

        {/* ══ PUBLIC AUDIT LEDGER ════════════════════════════════════════════ */}
        <AuditLedger />

        {/* ══ FREE SCAN CTA ════════════════════════════════════════════════ */}
        <div style={{ background:'rgba(153,51,255,0.06)', borderTop:'1px solid rgba(153,51,255,0.14)', borderBottom:'1px solid rgba(153,51,255,0.14)', padding:'40px 20px', textAlign:'center' }}>
          <h3 className="display display-md" style={{ marginBottom:12 }}>Run this on your environment in under 60 seconds.</h3>
          <a href="https://itechsmart.dev/pulse" className="btn-cta" style={{ margin:'0 auto' }}>
            Run Free Production Scan → See What YOUR Infrastructure Would Fix Automatically
          </a>
          <p style={{ fontSize:11, color:'rgba(255,255,255,0.2)', marginTop:12 }}>No setup · No risk · Results in 2 minutes</p>
        </div>

        {/* ══ DEMO SECTION ═════════════════════════════════════════════════ */}
        <section className="section" style={{ background:'rgba(0,0,0,0.15)' }}>
          <div style={{ maxWidth:700, margin:'0 auto', textAlign:'center' }}>
            <p className="section-label" style={{ color:'var(--purple)', marginBottom:10 }}>⚡ Live Demo</p>
            <h2 className="display display-md" style={{ marginBottom:12 }}>See It Work — Right Now</h2>
            <p style={{ fontSize:15, color:'var(--muted)', marginBottom:28, lineHeight:1.65 }}>Run a free Pulse scan. Issues detected, root cause reasoned, and a cryptographic receipt generated in under 2 minutes.</p>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:10, maxWidth:360, margin:'0 auto 28px', textAlign:'left' }}>
              {['Real infrastructure scan','AI root cause reasoning','ProofLink receipt generated','No credit card required'].map(f => (
                <div key={f} style={{ display:'flex', gap:8, alignItems:'center', fontSize:13, color:'var(--muted)' }}>
                  <span style={{ color:'var(--green)', fontWeight:700 }}>✓</span>{f}
                </div>
              ))}
            </div>
            <a href="https://itechsmart.dev/pulse" className="btn-cta">Try Pulse Free →</a>
          </div>
        </section>

        {/* ══ FINAL CTA ════════════════════════════════════════════════════ */}
        <section className="section">
          <div style={{ maxWidth:680, margin:'0 auto', textAlign:'center' }}>
            <h2 className="display display-md" style={{ marginBottom:6 }}>You Don't Need More Tools.</h2>
            <h2 className="display display-md" style={{ color:'var(--purple)', marginBottom:18 }}>You Need a System That Works.</h2>
            <p className="body-lg" style={{ marginBottom:32, fontSize:16 }}>Try iTechSmart free or book a live walkthrough. See autonomous IT operations. Verify the proof yourself.</p>
            <div className="cta-row" style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap', marginBottom:24 }}>
              <a href="https://itechsmart.dev/start"            className="btn-cta">Start Here →</a>
              <a href="https://itechsmart.dev/pulse"            className="btn-ghost">Run Free Scan</a>
              <a href="https://docs.itechsmart.dev/demo"        className="btn-ghost">Watch Demo</a>
              <a href="https://whitepaper.itechsmart.dev"       className="btn-ghost" style={{ fontSize:13, padding:'12px 16px' }}>Download Whitepaper</a>
            </div>
            <p style={{ fontSize:13, color:'rgba(255,255,255,0.2)', fontStyle:'italic', lineHeight:1.75 }}>
              The question is no longer if infrastructure can run itself.<br />The question is why yours doesn't.
            </p>
          </div>
        </section>

        {/* ══ FOOTER ═══════════════════════════════════════════════════════ */}
        <footer style={{ padding:'28px 20px', borderTop:'1px solid var(--divider)', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:16 }}>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <img src="/itechsmart_icon.png" alt="" style={{ width:20, height:20, borderRadius:'50%' }} />
            <span style={{ fontWeight:700, fontSize:14 }}>
              <span style={{ color:'#ffffff' }}>iTech</span><span style={{ color:'#9933FF' }}>Smart</span>
              <span style={{ color:'var(--muted)', fontWeight:400, fontSize:12, marginLeft:8 }}>Inc. · SDVOSB · Irvine, CA</span>
            </span>
          </div>
          <div style={{ display:'flex', gap:20, flexWrap:'wrap' }}>
            {[['Platform','https://itechsmart.dev'],['Whitepaper','https://whitepaper.itechsmart.dev'],['Verify Proof','https://verify.itechsmart.dev'],['UAIO Category','https://uaio.itechsmart.dev'],['Docs','https://docs.itechsmart.dev'],['Pitch Deck','/pitch-deck'],['Integrations','https://itechsmart.dev/integrations'],['FAQ','https://itechsmart.dev/faq'],['Press','https://itechsmart.dev/news']].map(([l,h]) => (
              <a key={l} href={h} style={{ fontSize:12, color:'var(--muted)', transition:'color .15s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--fg)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}>{l}</a>
            ))}
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
            <img src="/nvidia-inception-badge.svg" alt="NVIDIA Inception Program Member" style={{ height:24, width:'auto', opacity:0.8, flexShrink:0 }} />
            <span style={{ fontSize:11, color:'rgba(255,255,255,0.18)' }}>{'\u00A9'} 2026 iTechSmart Inc.</span>
          </div>
        </footer>

      </main>

    </>
  );
}
