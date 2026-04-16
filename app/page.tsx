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
const PURPLE = "#6b00ff";

/* ── NAV ─────────────────────────────────────────────────────────────────── */
function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <nav style={{ position:"fixed",top:0,left:0,right:0,zIndex:100,background:"rgba(15,15,18,0.92)",backdropFilter:"blur(16px)",borderBottom:"1px solid rgba(255,255,255,0.04)",height:56,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 clamp(16px,4vw,48px)" }}>
      <a href="/" style={{ display:"flex",alignItems:"center",gap:8,textDecoration:"none" }}>
        <img src="/itechsmart_icon.png" alt="iTechSmart" width={24} height={24} style={{ borderRadius:"50%" }} />
        <span style={{ color:W,fontWeight:600,fontSize:15,letterSpacing:"-0.3px" }}>iTechSmart <span style={{ color:TEXT2,fontWeight:400,fontSize:12 }}>UAIO</span></span>
      </a>
      <div className="dl" style={{ display:"flex",gap:28,alignItems:"center" }}>
        {[["Integration","#integration"],["The Loop","#loop"],["Trust","#trust"],["Deploy","#deploy"]].map(([l,h])=>(
          <a key={l} href={h} style={{ color:TEXT2,fontSize:12,textDecoration:"none",fontWeight:500,letterSpacing:"0.5px",textTransform:"uppercase" }}>{l}</a>
        ))}
        <a href="https://api.itechsmart.dev/docs" target="_blank" rel="noopener noreferrer" style={{ color:TEXT2,fontSize:12,textDecoration:"none",fontWeight:500,letterSpacing:"0.5px",textTransform:"uppercase" }}>API</a>
      </div>
      <div style={{ display:"flex",alignItems:"center",gap:12 }}>
        <a href="https://www.nvidia.com/en-us/startups/" target="_blank" rel="noopener noreferrer"><img src="/nvidia-inception-badge.svg" alt="NVIDIA Inception" style={{ height:18,width:"auto" }} /></a>
        <a href="https://calendly.com/djuane-itechsmart/new-meeting" target="_blank" rel="noopener noreferrer" className="nc" style={{ background:ACCENT,color:W,borderRadius:6,padding:"7px 16px",fontSize:12,fontWeight:600,textDecoration:"none",letterSpacing:"0.3px" }}>Book a Demo</a>
      </div>
      <button onClick={()=>setOpen(!open)} className="nb" style={{ display:"none",background:"none",border:`1px solid rgba(255,255,255,0.1)`,borderRadius:6,padding:"6px 12px",color:W,fontSize:16,cursor:"pointer",marginRight:4 }}>{open?"\u2715":"\u2630"}</button>
      {open&&<div style={{ position:"absolute",top:56,left:0,right:0,background:BG2,borderBottom:"1px solid rgba(255,255,255,0.04)",padding:20,display:"flex",flexDirection:"column",gap:16 }}>
        {[["Integration","#integration"],["The Loop","#loop"],["Trust","#trust"],["Deploy","#deploy"],["API","https://api.itechsmart.dev/docs"]].map(([l,h])=>(
          <a key={l} href={h} onClick={()=>setOpen(false)} style={{ color:TEXT,fontSize:14,textDecoration:"none" }}>{l}</a>
        ))}
        <a href="https://calendly.com/djuane-itechsmart/new-meeting" target="_blank" rel="noopener noreferrer" style={{ background:ACCENT,color:W,borderRadius:6,padding:"12px",fontSize:14,fontWeight:600,textDecoration:"none",textAlign:"center" }}>Book a Demo</a>
      </div>}
      <style>{`@media(max-width:768px){.dl,.nc{display:none!important}.nb{display:block!important}}`}</style>
    </nav>
  );
}

/* ── HERO ─────────────────────────────────────────────────────────────────── */
const CYCLE = ["Fires.","Incidents.","Outages.","Tickets.","Alert Fatigue."];

function Hero() {
  const [ci, setCi] = useState(0);
  const [show, setShow] = useState(true);
  useEffect(() => {
    const t = setInterval(() => {
      setShow(false);
      setTimeout(() => { setCi(i => (i + 1) % CYCLE.length); setShow(true); }, 300);
    }, 2800);
    return () => clearInterval(t);
  }, []);
  return (
    <section style={{ background:BG,minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:"clamp(80px,12vh,120px) clamp(20px,5vw,80px) 0",position:"relative" }}>
      <div style={{ maxWidth:1100,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr",gap:48,textAlign:"center" }}>
        <div>
          <p style={{ color:TEXT2,fontSize:12,fontWeight:500,letterSpacing:"2px",textTransform:"uppercase",marginBottom:20 }}>UNIFIED AUTONOMOUS IT OPERATIONS</p>
          <h1 style={{ fontSize:"clamp(40px,7vw,72px)",fontWeight:700,color:W,lineHeight:1.08,margin:"0 0 8px",letterSpacing:"-2px" }}>
            Stop Fighting IT
          </h1>
          <div style={{ overflow:"hidden",marginBottom:8 }}>
            <div style={{ transition:"transform 0.35s cubic-bezier(.22,1,.36,1), opacity 0.3s",transform:show?"translateY(0)":"translateY(30px)",opacity:show?1:0 }}>
              <h1 style={{ fontSize:"clamp(40px,7vw,72px)",fontWeight:700,color:ACCENT,lineHeight:1.08,margin:0,letterSpacing:"-2px" }}>{CYCLE[ci]}</h1>
            </div>
          </div>
          <h2 style={{ fontSize:"clamp(28px,4vw,48px)",fontWeight:700,color:ACCENT,margin:"0 0 24px",letterSpacing:"-1px",opacity:0.7 }}>
            Start Executing.
          </h2>
          <p style={{ fontSize:"clamp(15px,1.8vw,18px)",color:TEXT,lineHeight:1.7,maxWidth:640,margin:"0 auto 36px" }}>
            The world{"\u2019"}s first verifiable autonomous execution system for infrastructure. Sits on top of your existing tools. Detects, fixes, and cryptographically proves resolution in under 20 seconds.
          </p>
          <div style={{ display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap",marginBottom:48 }}>
            <a href="https://itechsmart.dev/break-it" target="_blank" rel="noopener noreferrer" style={{ background:ACCENT,color:W,borderRadius:8,padding:"13px 28px",fontSize:14,fontWeight:600,textDecoration:"none",letterSpacing:"0.3px" }}>{"\u25B6"}  Watch a Live Fix <span style={{ color:"rgba(255,255,255,0.5)",fontSize:11 }}>20 SEC</span></a>
            <a href="https://verify.itechsmart.dev" target="_blank" rel="noopener noreferrer" style={{ background:"transparent",color:TEXT,border:"1px solid rgba(255,255,255,0.1)",borderRadius:8,padding:"13px 28px",fontSize:14,fontWeight:500,textDecoration:"none" }}>Verify a Ledger Receipt</a>
          </div>

          {/* Live Receipt Card */}
          <div style={{ maxWidth:480,margin:"0 auto",background:BG2,border:"1px solid rgba(255,255,255,0.06)",borderRadius:12,overflow:"hidden",textAlign:"left" }}>
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
              <div key={label} style={{ padding:"10px 20px",borderBottom:"1px solid rgba(255,255,255,0.03)",display:"flex",justifyContent:"space-between",alignItems:"center",gap:12 }}>
                <span style={{ color:TEXT2,fontSize:11,fontWeight:600,letterSpacing:"0.5px",flexShrink:0,minWidth:70 }}>{label}</span>
                <span style={{ color:TEXT,fontSize:12,flex:1 }}>{value}</span>
                <span style={{ color:ACCENT,fontSize:10,fontWeight:600,flexShrink:0 }}>{status}</span>
              </div>
            ))}
            <div style={{ padding:"12px 20px",display:"flex",justifyContent:"space-between",alignItems:"center" }}>
              <span style={{ color:W,fontSize:13,fontWeight:600 }}>Mean Time to Resolve: 17.4s {"\u2713"} Verified</span>
              <span style={{ color:TEXT2,fontSize:10,fontFamily:"monospace" }}>sha256: 9f3c...ab17</span>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Bar */}
      <div style={{ position:"absolute",bottom:0,left:0,right:0,borderTop:"1px solid rgba(255,255,255,0.04)",background:BG2,padding:"14px clamp(20px,5vw,80px)",display:"flex",justifyContent:"center",gap:0,flexWrap:"wrap" }}>
        {["Trusted by Federal Agencies","CAGE 172W2","Bitcoin-Anchored Proof","MTTR: 20s","SDVOSB Certified","FedRAMP / CMMC Ready"].map((t,i)=>(
          <React.Fragment key={i}>
            <span style={{ color:TEXT2,fontSize:11,padding:"2px clamp(8px,1.5vw,20px)",whiteSpace:"nowrap" }}>{t}</span>
            {i<5&&<span style={{ color:"rgba(255,255,255,0.12)",fontSize:11 }}>{"\u25C6"}</span>}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}

/* ── INTEGRATION ──────────────────────────────────────────────────────────── */
function Chip({label}:{label:string}) {
  return <span style={{ background:"rgba(87,94,207,0.12)",border:"1px solid rgba(87,94,207,0.2)",borderRadius:6,padding:"4px 10px",fontSize:11,fontWeight:500,color:TEXT }}>{label}</span>;
}

function Integration() {
  return (
    <section id="integration" style={{ background:BG,padding:"clamp(48px,8vw,100px) clamp(20px,5vw,80px)",borderTop:"1px solid rgba(255,255,255,0.04)" }}>
      <div style={{ maxWidth:1100,margin:"0 auto" }}>
        <p style={{ color:ACCENT,fontSize:11,fontWeight:600,letterSpacing:"2px",textTransform:"uppercase",marginBottom:12 }}>02 {"\u00B7"} INTEGRATION REALITY</p>
        <h2 style={{ fontSize:"clamp(28px,4vw,44px)",fontWeight:700,color:W,margin:"0 0 12px",letterSpacing:"-1px" }}>You already have the sensors.</h2>
        <h2 style={{ fontSize:"clamp(28px,4vw,44px)",fontWeight:700,color:ACCENT,margin:"0 0 20px",letterSpacing:"-1px" }}>We provide the nervous system.</h2>
        <p style={{ fontSize:15,color:TEXT,lineHeight:1.7,maxWidth:640,marginBottom:48 }}>
          Don{"\u2019"}t replace your stack. Upgrade it. iTechSmart ingests alerts from your existing observability tools, autonomously executes remediation, and logs cryptographic proof into your ITSM tickets.
        </p>
        <div style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:"clamp(12px,3vw,28px)",flexWrap:"wrap" }}>
          <div style={{ background:BG2,border:"1px solid rgba(255,255,255,0.06)",borderRadius:12,padding:"20px 24px",maxWidth:240,textAlign:"left" }}>
            <p style={{ color:ACCENT,fontSize:9,fontWeight:700,letterSpacing:"2px",margin:"0 0 12px" }}>INGEST</p>
            <div style={{ display:"flex",flexWrap:"wrap",gap:6 }}>{["Datadog","Prometheus","Splunk","Wazuh"].map(t=><Chip key={t} label={t}/>)}</div>
          </div>
          <span style={{ color:ACCENT,fontSize:20,fontWeight:300 }}>{"\u2192"}</span>
          <div style={{ background:BG2,border:`1.5px solid ${ACCENT}`,borderRadius:14,padding:"24px 28px",maxWidth:240,textAlign:"center",boxShadow:`0 0 40px rgba(87,94,207,0.15)` }}>
            <p style={{ color:W,fontWeight:700,fontSize:16,margin:"0 0 4px" }}>iTechSmart Engine</p>
            <p style={{ color:TEXT2,fontSize:11,margin:0 }}>OctoAI {"\u00B7"} Ultra 253B {"\u00B7"} NeMo RAG</p>
          </div>
          <span style={{ color:ACCENT,fontSize:20,fontWeight:300 }}>{"\u2192"}</span>
          <div style={{ background:BG2,border:"1px solid rgba(255,255,255,0.06)",borderRadius:12,padding:"20px 24px",maxWidth:240,textAlign:"left" }}>
            <p style={{ color:ACCENT,fontSize:9,fontWeight:700,letterSpacing:"2px",margin:"0 0 12px" }}>EXECUTE</p>
            <div style={{ display:"flex",flexWrap:"wrap",gap:6 }}>{["AWS","Azure","ServiceNow","Slack"].map(t=><Chip key={t} label={t}/>)}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── DETECT FIX PROVE ────────────────────────────────────────────────────── */
function DetectFixProve() {
  return (
    <section id="loop" style={{ background:BG2,padding:"clamp(48px,8vw,100px) clamp(20px,5vw,80px)",borderTop:"1px solid rgba(255,255,255,0.04)" }}>
      <div style={{ maxWidth:1100,margin:"0 auto" }}>
        <p style={{ color:ACCENT,fontSize:11,fontWeight:600,letterSpacing:"2px",textTransform:"uppercase",marginBottom:12 }}>03 {"\u00B7"} THE CORE WEDGE</p>
        <h2 style={{ fontSize:"clamp(32px,5vw,48px)",fontWeight:700,color:W,margin:"0 0 48px",letterSpacing:"-1px" }}>The 20-second autonomous loop.</h2>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(min(100%, 300px), 1fr))",gap:20 }}>
          {[
            { n:"STEP 01",title:"Detect",body:"Ingest telemetry from your existing environment. Map anomalies against 131+ historical incidents using NVIDIA NeMo RAG. No agents to install. No rewrites." },
            { n:"STEP 02",title:"Fix",body:"Reason to root cause. Execute the precise remediation via SSH, WinRM, or cloud API. Scoped. Sandboxed. Reversible. OctoAI 8-agent engine powered by Nemotron Ultra 253B." },
            { n:"STEP 03",title:"Prove",tag:"THE NUCLEAR OPTION",body:"Generate a cryptographic receipt. Anchor it to the Bitcoin blockchain via OpenTimestamps. Attach it to your ServiceNow ticket. Math, not promises." },
          ].map(c=>(
            <div key={c.n} style={{ background:BG3,border:"1px solid rgba(255,255,255,0.06)",borderRadius:14,padding:"28px 24px" }}>
              <p style={{ color:TEXT2,fontSize:10,fontWeight:600,letterSpacing:"2px",margin:"0 0 8px" }}>{c.n}</p>
              <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:16 }}>
                <h3 style={{ fontSize:24,fontWeight:700,color:W,margin:0 }}>{c.title}</h3>
                {c.tag&&<span style={{ background:"rgba(153,51,255,0.15)",border:"1px solid rgba(153,51,255,0.25)",borderRadius:4,padding:"2px 8px",fontSize:9,fontWeight:700,color:ACCENT,letterSpacing:"1px" }}>{c.tag}</span>}
              </div>
              <p style={{ color:TEXT,fontSize:13,lineHeight:1.7,margin:0 }}>{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── TRUST ────────────────────────────────────────────────────────────────── */
function Trust() {
  return (
    <section id="trust" style={{ background:BG,padding:"clamp(48px,8vw,100px) clamp(20px,5vw,80px)",borderTop:"1px solid rgba(255,255,255,0.04)" }}>
      <div style={{ maxWidth:1100,margin:"0 auto" }}>
        <p style={{ color:ACCENT,fontSize:11,fontWeight:600,letterSpacing:"2px",textTransform:"uppercase",marginBottom:12 }}>04 {"\u00B7"} TRUST & COMPLIANCE ANCHOR</p>
        <h2 style={{ fontSize:"clamp(32px,5vw,48px)",fontWeight:700,color:W,margin:"0 0 12px",letterSpacing:"-1px" }}>AI you can audit.</h2>
        <p style={{ fontSize:15,color:TEXT,lineHeight:1.7,maxWidth:600,margin:"0 0 32px" }}>
          Every autonomous action generates an immutable cryptographic receipt {"\u2014"} publicly verifiable at <a href="https://verify.itechsmart.dev" target="_blank" rel="noopener noreferrer" style={{ color:ACCENT,textDecoration:"none" }}>verify.itechsmart.dev</a>.
        </p>
        <div style={{ display:"flex",gap:14,flexWrap:"wrap",marginBottom:40 }}>
          <a href="https://whitepaper.itechsmart.dev" target="_blank" rel="noopener noreferrer" style={{ color:TEXT,border:"1px solid rgba(255,255,255,0.1)",borderRadius:8,padding:"11px 22px",fontSize:13,fontWeight:500,textDecoration:"none" }}>Read the Whitepaper {"\u2197"}</a>
          <a href="https://itechsmart.dev/proof" target="_blank" rel="noopener noreferrer" style={{ background:ACCENT,color:W,borderRadius:8,padding:"11px 22px",fontSize:13,fontWeight:600,textDecoration:"none" }}>View Live Ledger</a>
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(min(100%, 300px), 1fr))",gap:14,marginBottom:32 }}>
          {[
            { icon:"\u2708\uFE0F",title:"Citadel Deployment",body:"Air-gapped option. FIPS-aligned. Zero cloud dependency." },
            { icon:"\uD83C\uDFDB\uFE0F",title:"Compliance Ready",body:"FedRAMP / CMMC pathway active. CAGE 172W2." },
            { icon:"\u2713",title:"Verified Status",body:"SDVOSB. Minority-Owned. SDB. Full gov credentials." },
          ].map(f=>(
            <div key={f.title} style={{ background:BG2,border:"1px solid rgba(255,255,255,0.06)",borderRadius:12,padding:"20px",display:"flex",gap:14,alignItems:"flex-start" }}>
              <span style={{ fontSize:20,flexShrink:0 }}>{f.icon}</span>
              <div>
                <p style={{ color:W,fontWeight:600,fontSize:14,margin:"0 0 4px" }}>{f.title} <span style={{ color:GREEN,fontSize:11 }}>{"\u2713"}</span></p>
                <p style={{ color:TEXT2,fontSize:12,lineHeight:1.6,margin:0 }}>{f.body}</p>
              </div>
            </div>
          ))}
        </div>
        <div style={{ background:BG2,border:"1px solid rgba(255,255,255,0.06)",borderRadius:10,padding:"14px 16px",maxWidth:"100%" }}>
          <span style={{ color:TEXT2,fontSize:10,fontWeight:600,letterSpacing:"1px",display:"block",marginBottom:6 }}>LATEST ANCHOR</span>
          <code style={{ color:ACCENT,fontSize:11,wordBreak:"break-all",lineHeight:1.6,display:"block" }}>btc:871204:9f3c4d8a2b1e7c5f9a3b6d2e8c1f4a7b09e5d3c8ab17</code>
        </div>
      </div>
    </section>
  );
}

/* ── ONBOARDING ───────────────────────────────────────────────────────────── */
function Onboarding() {
  return (
    <section id="deploy" style={{ background:BG2,padding:"clamp(48px,8vw,100px) clamp(20px,5vw,80px)",borderTop:"1px solid rgba(255,255,255,0.04)" }}>
      <div style={{ maxWidth:900,margin:"0 auto" }}>
        <p style={{ color:ACCENT,fontSize:11,fontWeight:600,letterSpacing:"2px",textTransform:"uppercase",marginBottom:12 }}>05 {"\u00B7"} FRICTIONLESS ONBOARDING</p>
        <h2 style={{ fontSize:"clamp(28px,4vw,44px)",fontWeight:700,color:W,margin:"0 0 12px",letterSpacing:"-1px" }}>Prove it in your environment today.</h2>
        <p style={{ fontSize:15,color:TEXT,lineHeight:1.7,maxWidth:560,margin:"0 0 36px" }}>
          Start with a zero-risk deployment. Read-only mode by default. We classify and map fixes {"\u2014"} you decide when to grant execution.
        </p>
        <div style={{ display:"flex",flexDirection:"column",gap:16,marginBottom:36 }}>
          {[
            ["01","Connect telemetry","Wazuh, Datadog, Splunk, or Prometheus. One integration. Five minutes."],
            ["02","Map your fixes","The engine builds a remediation graph of your environment. Read-only."],
            ["03","Grant execution","Only when you{'\u2019'}re ready. Scoped permissions. Full audit trail."],
          ].map(([n,title,body])=>(
            <div key={n} style={{ display:"flex",gap:16,alignItems:"flex-start" }}>
              <span style={{ color:ACCENT,fontSize:12,fontWeight:700,fontFamily:"monospace",minWidth:24,paddingTop:2 }}>{n}</span>
              <div>
                <p style={{ color:W,fontWeight:600,fontSize:14,margin:"0 0 4px" }}>{title}</p>
                <p style={{ color:TEXT2,fontSize:13,lineHeight:1.6,margin:0 }}>{body}</p>
              </div>
            </div>
          ))}
        </div>
        <div style={{ display:"flex",gap:14,flexWrap:"wrap",justifyContent:"center" }}>
          <a href="https://itechsmart.dev/pulse" target="_blank" rel="noopener noreferrer" style={{ background:ACCENT,color:W,borderRadius:8,padding:"13px 28px",fontSize:14,fontWeight:600,textDecoration:"none" }}>Deploy Free Pulse Scanner {"\u2192"}</a>
          <a href="https://calendly.com/djuane-itechsmart/new-meeting" target="_blank" rel="noopener noreferrer" style={{ color:TEXT,border:"1px solid rgba(255,255,255,0.1)",borderRadius:8,padding:"13px 28px",fontSize:14,fontWeight:500,textDecoration:"none" }}>Book a Demo</a>
        </div>
        <p style={{ color:TEXT2,fontSize:11,marginTop:12,textAlign:"center" }}>No credit card required</p>
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
      <Integration/>
      <DetectFixProve/>
      <Trust/>
      <Onboarding/>
      <Footer/>
    </main>
  );
}
