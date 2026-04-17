"use client";
import React, { useState, useEffect } from "react";

const BG = "#0f0f12";
const BG2 = "#141419";
const BG3 = "#1a1a20";
const TEXT = "#c5c1b9";
const TEXT2 = "#8a8780";
const ACCENT = "#9933FF";
const W = "#eceae5";
const GREEN = "#4ade80";

const CYCLE = ["Fires.", "Incidents.", "Outages.", "Tickets.", "Alert Fatigue."];

/* ── NAV ─────────────────────────────────────────────────────────────────── */
function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <nav style={{ position:"fixed",top:0,left:0,right:0,zIndex:100,background:"rgba(15,15,18,0.92)",backdropFilter:"blur(16px)",borderBottom:"1px solid rgba(255,255,255,0.04)",height:56,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 clamp(16px,4vw,48px)" }}>
      <a href="/" style={{ display:"flex",alignItems:"center",gap:8,textDecoration:"none" }}>
        <img src="/itechsmart_icon.png" alt="iTechSmart" width={24} height={24} style={{ borderRadius:"50%" }} />
        <span style={{ color:W,fontWeight:600,fontSize:15,letterSpacing:"-0.3px" }}>iTechSmart <span style={{ color:TEXT2,fontWeight:400,fontSize:11 }}>UAIO</span></span>
      </a>
      <div className="dl" style={{ display:"flex",gap:24,alignItems:"center" }}>
        {[["Live Proof Ledger","https://itechsmart.dev/proof"],["Integrations","https://itechsmart.dev/integrations"],["Security & Gov","https://itechsmart.dev/credibility"],["Docs","https://docs.itechsmart.dev"]].map(([l,h])=>(
          <a key={l} href={h} target="_blank" rel="noopener noreferrer" style={{ color:TEXT2,fontSize:12,textDecoration:"none",fontWeight:500 }}>{l}</a>
        ))}
      </div>
      <div style={{ display:"flex",alignItems:"center",gap:10 }}>
        <a href="https://www.nvidia.com/en-us/startups/" target="_blank" rel="noopener noreferrer" className="nc"><img src="/nvidia-inception-badge.svg" alt="NVIDIA Inception" style={{ height:18,width:"auto" }} /></a>
        <a href="https://itechsmart.dev/pulse" target="_blank" rel="noopener noreferrer" className="nc" style={{ background:ACCENT,color:W,borderRadius:6,padding:"7px 16px",fontSize:12,fontWeight:600,textDecoration:"none" }}>Run Free Pulse Scan</a>
      </div>
      <button onClick={()=>setOpen(!open)} className="nb" style={{ display:"none",background:"none",border:"1px solid rgba(255,255,255,0.1)",borderRadius:6,padding:"6px 12px",color:W,fontSize:16,cursor:"pointer",marginRight:4 }}>{open?"\u2715":"\u2630"}</button>
      {open&&<div style={{ position:"absolute",top:56,left:0,right:0,background:BG2,borderBottom:"1px solid rgba(255,255,255,0.04)",padding:20,display:"flex",flexDirection:"column",gap:16 }}>
        {[["Live Proof Ledger","https://itechsmart.dev/proof"],["Integrations","https://itechsmart.dev/integrations"],["Security & Gov","https://itechsmart.dev/credibility"],["Docs","https://docs.itechsmart.dev"]].map(([l,h])=>(
          <a key={l} href={h} onClick={()=>setOpen(false)} target="_blank" rel="noopener noreferrer" style={{ color:TEXT,fontSize:14,textDecoration:"none" }}>{l}</a>
        ))}
        <a href="https://itechsmart.dev/pulse" target="_blank" rel="noopener noreferrer" style={{ background:ACCENT,color:W,borderRadius:6,padding:"12px",fontSize:14,fontWeight:600,textDecoration:"none",textAlign:"center" }}>Run Free Pulse Scan</a>
      </div>}
      <style>{`@media(max-width:768px){.dl,.nc{display:none!important}.nb{display:block!important}}`}</style>
    </nav>
  );
}

/* ── HERO ─────────────────────────────────────────────────────────────────── */
function Hero() {
  const [ci, setCi] = useState(0);
  const [show, setShow] = useState(true);
  const TYPED = "And Proves It.";
  const [typed, setTyped] = useState("");
  const [doneOnce, setDoneOnce] = useState(false);

  // Typing animation on mount
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTyped(TYPED.slice(0, i));
      if (i >= TYPED.length) { clearInterval(id); setDoneOnce(true); }
    }, 80);
    return () => clearInterval(id);
  }, []);

  // Cycling words
  useEffect(() => {
    const t = setInterval(() => {
      setShow(false);
      setTimeout(() => { setCi(i => (i + 1) % CYCLE.length); setShow(true); }, 300);
    }, 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <section style={{ background:BG,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"clamp(100px,14vh,140px) clamp(20px,5vw,80px) 0",position:"relative",minHeight:"100vh" }}>
      <h1 style={{ fontSize:"clamp(36px,6.5vw,68px)",fontWeight:700,color:W,lineHeight:1.08,margin:"0 0 6px",letterSpacing:"-2px",maxWidth:800 }}>
        Infrastructure That Fixes Itself.
      </h1>
      <div style={{ marginBottom:6,minHeight:"1.1em" }}>
        <h1 style={{ fontSize:"clamp(36px,6.5vw,68px)",fontWeight:700,color:ACCENT,lineHeight:1.08,margin:0,letterSpacing:"-2px",display:"inline" }}>
          {typed}
          {!doneOnce && <span style={{ borderRight:`3px solid ${ACCENT}`,marginLeft:2,animation:"blink 0.7s step-end infinite" }}/>}
        </h1>
      </div>
      <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}`}</style>
      <p style={{ fontSize:"clamp(15px,1.8vw,18px)",color:TEXT,lineHeight:1.7,maxWidth:660,margin:"24px auto 36px" }}>
        The world{"\u2019"}s first verifiable autonomous execution system. We sit on top of your existing tools to detect issues, fix them instantly, and generate cryptographic proof of every action in under 20 seconds.
      </p>
      <div style={{ display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap",marginBottom:12 }}>
        <a href="https://itechsmart.dev/break-it" target="_blank" rel="noopener noreferrer" style={{ background:ACCENT,color:W,borderRadius:10,padding:"15px 32px",fontSize:15,fontWeight:600,textDecoration:"none",boxShadow:"0 0 40px rgba(153,51,255,0.35)" }}>{"\u25B6"}  Watch a 20-Second Live Fix</a>
        <a href="https://verify.itechsmart.dev" target="_blank" rel="noopener noreferrer" style={{ background:"transparent",color:TEXT,border:"1px solid rgba(255,255,255,0.12)",borderRadius:10,padding:"15px 32px",fontSize:15,fontWeight:500,textDecoration:"none" }}>{"\uD83D\uDD0D"}  Verify a Live Ledger Receipt</a>
      </div>

      {/* Cycling words below CTAs */}
      <p style={{ color:TEXT2,fontSize:13,marginBottom:60 }}>
        Stop fighting IT{" "}
        <span style={{ color:ACCENT,fontWeight:600,transition:"opacity 0.3s",opacity:show?1:0.3 }}>{CYCLE[ci]}</span>
      </p>

      {/* Trust Bar */}
      <div style={{ width:"100vw",borderTop:"1px solid rgba(255,255,255,0.04)",background:BG2,padding:"14px clamp(20px,5vw,60px)",display:"flex",justifyContent:"center",gap:0,flexWrap:"wrap" }}>
        {["CAGE: 172W2","SDVOSB & Minority-Owned","FedRAMP Pathway Active","Anchored to Bitcoin","F6S #6 of 2M+ AI Startups"].map((t,i)=>(
          <React.Fragment key={i}>
            <span style={{ color:TEXT2,fontSize:11,padding:"2px clamp(6px,1.5vw,18px)",whiteSpace:"nowrap" }}>{t}</span>
            {i<4&&<span style={{ color:"rgba(153,51,255,0.3)" }}>{"\u00B7"}</span>}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}

/* ── THE WEDGE ────────────────────────────────────────────────────────────── */
function Wedge() {
  return (
    <section style={{ background:BG,padding:"clamp(48px,8vw,100px) clamp(20px,5vw,80px)",borderTop:"1px solid rgba(255,255,255,0.04)" }}>
      <div style={{ maxWidth:1100,margin:"0 auto" }}>
        <h2 style={{ fontSize:"clamp(28px,4vw,44px)",fontWeight:700,color:W,margin:"0 0 8px",letterSpacing:"-1px" }}>AIOps tells you what{"\u2019"}s broken.</h2>
        <h2 style={{ fontSize:"clamp(28px,4vw,44px)",fontWeight:700,color:ACCENT,margin:"0 0 48px",letterSpacing:"-1px" }}>UAIO actually fixes it.</h2>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(min(100%, 300px), 1fr))",gap:20 }}>
          {[
            { n:"01",title:"Detect",sub:"The Sensors",body:"We ingest telemetry from your existing monitoring stack in real-time. Anomalies are caught and mapped in milliseconds \u2014 no new agents required." },
            { n:"02",title:"Fix",sub:"The Execution",body:"Our engine reasons the root cause and autonomously executes the precise remediation sequence via SSH, WinRM, or API. Zero human intervention." },
            { n:"03",title:"Prove",sub:"The Audit",tag:"THE NUCLEAR OPTION",body:"Every action generates an immutable cryptographic receipt attached directly to your ITSM ticket. Math, not promises." },
          ].map(c=>(
            <div key={c.n} style={{ background:BG2,border:"1px solid rgba(255,255,255,0.06)",borderRadius:14,padding:"28px 24px" }}>
              <p style={{ color:TEXT2,fontSize:10,fontWeight:600,letterSpacing:"2px",margin:"0 0 8px" }}>{c.n}</p>
              <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:4,flexWrap:"wrap" }}>
                <h3 style={{ fontSize:22,fontWeight:700,color:W,margin:0 }}>{c.title}</h3>
                <span style={{ color:TEXT2,fontSize:12 }}>{c.sub}</span>
                {c.tag&&<span style={{ background:"rgba(153,51,255,0.15)",border:"1px solid rgba(153,51,255,0.3)",borderRadius:4,padding:"2px 8px",fontSize:9,fontWeight:700,color:ACCENT,letterSpacing:"1px" }}>{c.tag}</span>}
              </div>
              <div style={{ height:1,background:"rgba(255,255,255,0.04)",margin:"12px 0" }}/>
              <p style={{ color:TEXT,fontSize:13,lineHeight:1.7,margin:0 }}>{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── THE NUCLEAR OPTION ───────────────────────────────────────────────────── */
function NuclearOption() {
  return (
    <section style={{ background:BG2,padding:"clamp(48px,8vw,100px) clamp(20px,5vw,80px)",borderTop:"1px solid rgba(255,255,255,0.04)" }}>
      <div style={{ maxWidth:1100,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(min(100%, 440px), 1fr))",gap:48,alignItems:"center" }}>
        {/* Left: Copy */}
        <div>
          <p style={{ color:ACCENT,fontSize:11,fontWeight:600,letterSpacing:"2px",textTransform:"uppercase",marginBottom:16 }}>YOUR UNFAIR ADVANTAGE</p>
          <h2 style={{ fontSize:"clamp(28px,4vw,44px)",fontWeight:700,color:W,margin:"0 0 16px",letterSpacing:"-1px" }}>AI You Can Actually Audit.</h2>
          <p style={{ fontSize:15,color:TEXT,lineHeight:1.7,margin:"0 0 28px" }}>
            Enterprise IT doesn{"\u2019"}t trust black-box AI. Neither do we. We solved the AI accountability gap by anchoring every autonomous remediation to the Bitcoin blockchain via OpenTimestamps. When auditors or CISOs ask what happened, you don{"\u2019"}t give them a log file. You give them a mathematical proof.
          </p>
          <div style={{ display:"flex",flexDirection:"column",gap:12,marginBottom:28 }}>
            {[
              ["\uD83D\uDD12","Immutable Receipts","Verify any fix at verify.itechsmart.dev."],
              ["\u2708\uFE0F","Air-Gapped Ready","\u201CCitadel\u201D deployment for classified environments."],
              ["\uD83C\uDFDB\uFE0F","Compliance First","Built for strict NIST, CMMC, and HIPAA mandates."],
            ].map(([icon,title,body])=>(
              <div key={title} style={{ display:"flex",gap:12,alignItems:"flex-start" }}>
                <span style={{ fontSize:18,flexShrink:0 }}>{icon}</span>
                <div>
                  <span style={{ color:W,fontWeight:600,fontSize:13 }}>{title}:</span>{" "}
                  <span style={{ color:TEXT,fontSize:13 }}>{body}</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display:"flex",gap:12,flexWrap:"wrap" }}>
            <a href="https://itechsmart.dev/proof" target="_blank" rel="noopener noreferrer" style={{ background:ACCENT,color:W,borderRadius:8,padding:"12px 24px",fontSize:13,fontWeight:600,textDecoration:"none" }}>View Live Ledger {"\u2192"}</a>
            <a href="https://whitepaper.itechsmart.dev" target="_blank" rel="noopener noreferrer" style={{ color:TEXT,border:"1px solid rgba(255,255,255,0.1)",borderRadius:8,padding:"12px 24px",fontSize:13,fontWeight:500,textDecoration:"none" }}>Read the Whitepaper {"\u2197"}</a>
          </div>
        </div>

        {/* Right: Receipt Card */}
        <div style={{ background:BG3,border:"1px solid rgba(153,51,255,0.2)",borderRadius:14,overflow:"hidden",boxShadow:"0 0 60px rgba(153,51,255,0.08)" }}>
          <div style={{ padding:"14px 20px",borderBottom:"1px solid rgba(255,255,255,0.04)",display:"flex",justifyContent:"space-between",alignItems:"center" }}>
            <div style={{ display:"flex",alignItems:"center",gap:8 }}>
              <div style={{ width:6,height:6,borderRadius:"50%",background:GREEN }}/>
              <span style={{ color:GREEN,fontSize:11,fontWeight:600 }}>Live ProofLink Receipt</span>
            </div>
            <span style={{ color:TEXT2,fontSize:10,fontFamily:"monospace" }}>#A7F2-91C4</span>
          </div>
          {[
            ["ALERT","wazuh.cpu.spike \u2192 web-prod-04","detected"],
            ["DIAGNOSIS","runaway nginx worker (PID 8821)","reasoned"],
            ["ACTION","ssh exec: systemctl restart nginx","executed"],
            ["ANCHOR","opentimestamps \u2192 btc block 871,204","proven"],
          ].map(([label,value,status])=>(
            <div key={label} style={{ padding:"10px 20px",borderBottom:"1px solid rgba(255,255,255,0.03)",display:"flex",justifyContent:"space-between",alignItems:"center",gap:8 }}>
              <span style={{ color:TEXT2,fontSize:10,fontWeight:600,letterSpacing:"0.5px",flexShrink:0,minWidth:65 }}>{label}</span>
              <span style={{ color:TEXT,fontSize:12,flex:1,overflow:"hidden",textOverflow:"ellipsis" }}>{value}</span>
              <span style={{ color:ACCENT,fontSize:10,fontWeight:600,flexShrink:0 }}>{status}</span>
            </div>
          ))}
          <div style={{ padding:"14px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8 }}>
            <span style={{ color:W,fontSize:13,fontWeight:600 }}>MTTR: 17.4s {"\u2713"} Verified</span>
            <code style={{ color:TEXT2,fontSize:10 }}>sha256: 9f3c...ab17</code>
          </div>
          <div style={{ padding:"12px 20px",background:"rgba(153,51,255,0.06)",borderTop:"1px solid rgba(153,51,255,0.1)" }}>
            <span style={{ color:TEXT2,fontSize:9,fontWeight:600,letterSpacing:"1px",display:"block",marginBottom:4 }}>BITCOIN ANCHOR</span>
            <code style={{ color:ACCENT,fontSize:10,wordBreak:"break-all",lineHeight:1.6,display:"block" }}>btc:871204:9f3c4d8a2b1e7c5f9a3b6d2e8c1f4a7b09e5d3c8ab17</code>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── INTEGRATIONS (RISK REMOVER) ──────────────────────────────────────────── */
function Chip({label}:{label:string}) {
  return <span style={{ background:"rgba(153,51,255,0.1)",border:"1px solid rgba(153,51,255,0.2)",borderRadius:6,padding:"4px 10px",fontSize:11,fontWeight:500,color:TEXT }}>{label}</span>;
}

function Integrations() {
  return (
    <section style={{ background:BG,padding:"clamp(48px,8vw,100px) clamp(20px,5vw,80px)",borderTop:"1px solid rgba(255,255,255,0.04)" }}>
      <div style={{ maxWidth:1100,margin:"0 auto" }}>
        <p style={{ color:ACCENT,fontSize:11,fontWeight:600,letterSpacing:"2px",textTransform:"uppercase",marginBottom:16 }}>FRICTIONLESS INTEGRATION</p>
        <h2 style={{ fontSize:"clamp(28px,4vw,44px)",fontWeight:700,color:W,margin:"0 0 8px",letterSpacing:"-1px" }}>Keep Your Stack.</h2>
        <h2 style={{ fontSize:"clamp(28px,4vw,44px)",fontWeight:700,color:ACCENT,margin:"0 0 20px",letterSpacing:"-1px" }}>We Provide the Nervous System.</h2>
        <p style={{ fontSize:15,color:TEXT,lineHeight:1.7,maxWidth:640,margin:"0 0 48px" }}>
          No rip and replace. No massive implementation. iTechSmart orchestrates the tools you already pay for. We pull alerts from your current observability platforms and push cryptographic receipts directly into your existing ServiceNow or Jira workflows.
        </p>
        <div style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:"clamp(12px,3vw,28px)",flexWrap:"wrap" }}>
          <div style={{ background:BG2,border:"1px solid rgba(255,255,255,0.06)",borderRadius:12,padding:"20px",maxWidth:220,textAlign:"left" }}>
            <p style={{ color:ACCENT,fontSize:9,fontWeight:700,letterSpacing:"2px",margin:"0 0 12px" }}>INGEST</p>
            <div style={{ display:"flex",flexWrap:"wrap",gap:6 }}>{["Datadog","Prometheus","Splunk","Wazuh","PagerDuty"].map(t=><Chip key={t} label={t}/>)}</div>
          </div>
          <span style={{ color:ACCENT,fontSize:20,fontWeight:300 }}>{"\u2192"}</span>
          <div style={{ background:BG2,border:`1.5px solid ${ACCENT}`,borderRadius:14,padding:"24px",maxWidth:220,textAlign:"center",boxShadow:`0 0 40px rgba(153,51,255,0.12)` }}>
            <p style={{ color:W,fontWeight:700,fontSize:16,margin:"0 0 4px" }}>iTechSmart</p>
            <p style={{ color:TEXT2,fontSize:10,margin:0 }}>Autonomous Engine</p>
          </div>
          <span style={{ color:ACCENT,fontSize:20,fontWeight:300 }}>{"\u2192"}</span>
          <div style={{ background:BG2,border:"1px solid rgba(255,255,255,0.06)",borderRadius:12,padding:"20px",maxWidth:220,textAlign:"left" }}>
            <p style={{ color:ACCENT,fontSize:9,fontWeight:700,letterSpacing:"2px",margin:"0 0 12px" }}>EXECUTE & RECORD</p>
            <div style={{ display:"flex",flexWrap:"wrap",gap:6 }}>{["AWS","Azure","GCP","ServiceNow","Jira","Slack"].map(t=><Chip key={t} label={t}/>)}</div>
          </div>
        </div>
        <div style={{ textAlign:"center",marginTop:32 }}>
          <a href="https://itechsmart.dev/integrations" target="_blank" rel="noopener noreferrer" style={{ color:ACCENT,fontSize:13,fontWeight:500,textDecoration:"none" }}>View all 40+ Integrations {"\u2192"}</a>
        </div>
      </div>
    </section>
  );
}

/* ── FINAL CTA ────────────────────────────────────────────────────────────── */
function FinalCTA() {
  return (
    <section style={{ background:BG2,padding:"clamp(48px,8vw,100px) clamp(20px,5vw,80px)",borderTop:"1px solid rgba(255,255,255,0.04)",textAlign:"center" }}>
      <div style={{ maxWidth:700,margin:"0 auto" }}>
        <h2 style={{ fontSize:"clamp(32px,5vw,52px)",fontWeight:700,color:W,margin:"0 0 16px",letterSpacing:"-1px" }}>Stop Triaging.<br/><span style={{ color:ACCENT }}>Start Executing.</span></h2>
        <p style={{ fontSize:16,color:TEXT,lineHeight:1.7,margin:"0 0 36px" }}>
          Deploy our lightweight scanner and watch the system map out autonomous fixes in your environment before you ever grant execution permissions.
        </p>
        <div style={{ display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap" }}>
          <a href="https://itechsmart.dev/pulse" target="_blank" rel="noopener noreferrer" style={{ background:ACCENT,color:W,borderRadius:10,padding:"15px 32px",fontSize:15,fontWeight:600,textDecoration:"none",boxShadow:"0 0 40px rgba(153,51,255,0.3)" }}>Run Free Pulse Scan {"\u2192"}</a>
          <a href="https://calendly.com/djuane-itechsmart/new-meeting" target="_blank" rel="noopener noreferrer" style={{ color:TEXT,border:"1px solid rgba(255,255,255,0.1)",borderRadius:10,padding:"15px 32px",fontSize:15,fontWeight:500,textDecoration:"none" }}>Book a Technical Deep Dive</a>
        </div>
        <p style={{ color:TEXT2,fontSize:12,marginTop:14 }}>No credit card required {"\u00B7"} Read-only mode by default {"\u00B7"} Air-gapped available</p>
      </div>
    </section>
  );
}

/* ── FOOTER ───────────────────────────────────────────────────────────────── */
function Footer() {
  const cols = [
    { t:"PLATFORM",links:[["Main Platform","https://itechsmart.dev"],["Free Pulse Scanner","https://itechsmart.dev/pulse"],["Break-It Challenge","https://itechsmart.dev/break-it"],["Integrations","https://itechsmart.dev/integrations"],["Pricing","https://itechsmart.dev/pricing"],["Pitch Deck","https://itechsmart.dev/pitch-deck"]] },
    { t:"PROOF & TRUST",links:[["Verify a Receipt","https://verify.itechsmart.dev"],["ProofLink Ledger","https://itechsmart.dev/proof"],["Bitcoin Verification","https://opentimestamps.org"],["Credibility","https://itechsmart.dev/credibility"],["Public API Docs","https://api.itechsmart.dev/docs"],["API Health","https://api.itechsmart.dev/v1/health"]] },
    { t:"RESOURCES",links:[["Whitepaper v3.6","https://whitepaper.itechsmart.dev"],["Changelog","https://itechsmart.dev/changelog"],["Blog","https://itechsmart.dev/blog"],["State of Autonomous IT","https://itechsmart.dev/state-of-autonomous-it-2026"],["Security","https://itechsmart.dev/security"],["FAQ","https://itechsmart.dev/faq"]] },
    { t:"COMPANY",links:[["About","https://itechsmart.dev/about"],["Press Release","https://itechsmart.dev/press-release"],["Executive Bios","https://itechsmart.dev/news/executive-bios"],["News","https://itechsmart.dev/news"],["Contact","https://itechsmart.dev/contact"],["Book a Call","https://calendly.com/djuane-itechsmart/new-meeting"]] },
  ];
  return (
    <footer style={{ background:BG,borderTop:"1px solid rgba(255,255,255,0.04)",padding:"clamp(40px,6vw,64px) clamp(20px,5vw,80px) clamp(24px,3vw,40px)" }}>
      <div style={{ maxWidth:1100,margin:"0 auto" }}>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(min(100%, 200px), 1fr))",gap:"clamp(24px,3vw,40px)",marginBottom:40 }}>
          {cols.map(c=>(
            <div key={c.t}>
              <p style={{ color:ACCENT,fontSize:10,fontWeight:700,letterSpacing:"1.5px",margin:"0 0 14px" }}>{c.t}</p>
              {c.links.map(([l,h])=>(
                <a key={l} href={h} target="_blank" rel="noopener noreferrer" style={{ display:"block",color:TEXT2,fontSize:12,textDecoration:"none",marginBottom:9,lineHeight:1.4 }}>{l}</a>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop:"1px solid rgba(255,255,255,0.04)",paddingTop:24,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:16 }}>
          <div style={{ display:"flex",alignItems:"center",gap:12 }}>
            <img src="/itechsmart_icon.png" alt="iTechSmart" width={20} height={20} style={{ borderRadius:"50%" }} />
            <span style={{ color:W,fontWeight:600,fontSize:13 }}>iTechSmart Inc.</span>
            <span style={{ color:TEXT2,fontSize:10 }}>UAIO {"\u2014"} Unified Autonomous IT Operations</span>
          </div>
          <div style={{ display:"flex",alignItems:"center",gap:12 }}>
            <a href="https://www.nvidia.com/en-us/startups/" target="_blank" rel="noopener noreferrer"><img src="/nvidia-inception-badge.svg" alt="NVIDIA Inception" style={{ height:18,width:"auto" }} /></a>
            <span style={{ color:TEXT2,fontSize:10 }}>CAGE 172W2 {"\u00B7"} SDVOSB {"\u00B7"} SDB {"\u00B7"} {"\u00A9"} 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ── PAGE ─────────────────────────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <main style={{ background:BG,fontFamily:"'Inter',system-ui,-apple-system,sans-serif",margin:0,padding:0,overflowX:"hidden",color:TEXT }}>
      <Nav/>
      <Hero/>
      <Wedge/>
      <NuclearOption/>
      <Integrations/>
      <FinalCTA/>
      <Footer/>
    </main>
  );
}
