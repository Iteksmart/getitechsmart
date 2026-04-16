"use client";
import React, { useState } from "react";

const P = "#6b00ff";
const P2 = "#9933ff";
const BG = "#05050f";
const BG2 = "#08031a";
const G = "#8b919a";
const GR = "#2bd98c";
const OR = "#ff8c33";
const BL = "#3366ff";
const W = "#fafaff";

function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <nav style={{ position:"fixed",top:0,left:0,right:0,zIndex:100,background:"rgba(5,5,15,0.88)",backdropFilter:"blur(12px)",borderBottom:"1px solid rgba(107,0,255,0.15)",height:64,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 clamp(16px,4vw,80px)" }}>
      <div style={{ display:"flex",alignItems:"center",gap:12 }}>
        <a href="/" style={{ display:"flex",alignItems:"center",gap:8,textDecoration:"none" }}>
          <img src="/itechsmart_icon.png" alt="iTechSmart" width={28} height={28} style={{ borderRadius:"50%" }} />
          <span style={{ color:W,fontWeight:700,fontSize:17 }}>iTechSmart</span>
        </a>
        <div style={{ display:"flex",alignItems:"center",gap:5,background:"#111",border:"1px solid rgba(118,185,0,0.4)",borderRadius:5,padding:"3px 8px" }}>
          <div style={{ width:6,height:6,borderRadius:"50%",background:"#76b900" }}/>
          <span style={{ color:"#76b900",fontSize:10,fontWeight:600 }}>NVIDIA Inception</span>
        </div>
      </div>
      <div className="nav-links" style={{ display:"flex",gap:32 }}>
        {[["Platform","https://itechsmart.dev"],["API","https://api.itechsmart.dev/docs"],["Whitepaper","https://whitepaper.itechsmart.dev"],["Compliance","https://itechsmart.dev/credibility"]].map(([l,h])=>(
          <a key={l} href={h} target="_blank" rel="noopener noreferrer" style={{ color:G,fontSize:13,textDecoration:"none",fontWeight:500 }}>{l}</a>
        ))}
      </div>
      <a href="https://calendly.com/djuane-itechsmart/new-meeting" target="_blank" rel="noopener noreferrer" className="nav-cta" style={{ background:P,color:W,borderRadius:8,padding:"9px 18px",fontSize:13,fontWeight:600,textDecoration:"none" }}>Book a Demo</a>
      <button onClick={()=>setOpen(!open)} className="nav-burger" style={{ display:"none",background:"none",border:`1px solid ${P}40`,borderRadius:8,padding:"8px 12px",color:W,fontSize:18,cursor:"pointer" }}>{open?"\u2715":"\u2630"}</button>
      {open && (
        <div className="nav-mobile" style={{ position:"absolute",top:64,left:0,right:0,background:BG2,borderBottom:`1px solid ${P}30`,padding:20,display:"flex",flexDirection:"column",gap:16 }}>
          {[["Platform","https://itechsmart.dev"],["API","https://api.itechsmart.dev/docs"],["Whitepaper","https://whitepaper.itechsmart.dev"],["Compliance","https://itechsmart.dev/credibility"]].map(([l,h])=>(
            <a key={l} href={h} target="_blank" rel="noopener noreferrer" style={{ color:G,fontSize:15,textDecoration:"none" }}>{l}</a>
          ))}
          <a href="https://calendly.com/djuane-itechsmart/new-meeting" target="_blank" rel="noopener noreferrer" style={{ background:P,color:W,borderRadius:8,padding:"12px",fontSize:14,fontWeight:600,textDecoration:"none",textAlign:"center" }}>Book a Demo</a>
        </div>
      )}
      <style>{`
        @media(max-width:768px){
          .nav-links,.nav-cta{display:none!important}
          .nav-burger{display:block!important}
        }
      `}</style>
    </nav>
  );
}

function Hero() {
  return (
    <section style={{ background:BG,minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"120px clamp(20px,5vw,80px) 0",position:"relative",overflow:"hidden" }}>
      <div style={{ position:"absolute",top:-200,left:"50%",transform:"translateX(-50%)",width:900,height:600,borderRadius:"50%",background:"rgba(107,0,255,0.15)",filter:"blur(120px)",pointerEvents:"none" }}/>
      <div style={{ display:"inline-flex",alignItems:"center",gap:8,background:"rgba(107,0,255,0.12)",border:"1px solid rgba(107,0,255,0.3)",borderRadius:24,padding:"7px 16px",marginBottom:28,flexWrap:"wrap",justifyContent:"center" }}>
        <div style={{ width:7,height:7,borderRadius:"50%",background:P2 }}/>
        <span style={{ color:P2,fontSize:11,fontWeight:600 }}>NVIDIA Inception {"\u00B7"} SDVOSB {"\u00B7"} CAGE 172W2 {"\u00B7"} F6S #6 Globally</span>
      </div>
      <h1 style={{ fontSize:"clamp(40px,7vw,80px)",fontWeight:900,color:W,lineHeight:1.08,margin:"0 0 24px",maxWidth:900 }}>
        Stop Triaging.<br/>Start Executing.
      </h1>
      <p style={{ fontSize:"clamp(16px,2vw,20px)",color:G,lineHeight:1.7,maxWidth:720,margin:"0 0 36px" }}>
        The world{"\u2019"}s first verifiable autonomous execution system for infrastructure. Sits on top of your existing tools. Detects, fixes, and cryptographically proves resolution in under 20 seconds.
      </p>
      <div style={{ display:"flex",gap:14,flexWrap:"wrap",justifyContent:"center",marginBottom:16 }}>
        <a href="https://itechsmart.dev/break-it" target="_blank" rel="noopener noreferrer" style={{ background:P,color:W,borderRadius:10,padding:"14px 28px",fontSize:15,fontWeight:600,textDecoration:"none",boxShadow:"0 0 40px rgba(107,0,255,0.4)" }}>{"\u25B6"}  Watch a Live Fix</a>
        <a href="https://verify.itechsmart.dev" target="_blank" rel="noopener noreferrer" style={{ background:"rgba(255,255,255,0.05)",color:W,border:"1px solid rgba(255,255,255,0.15)",borderRadius:10,padding:"14px 28px",fontSize:15,fontWeight:600,textDecoration:"none" }}>{"\uD83D\uDD0D"}  Verify a Receipt</a>
      </div>
      <p style={{ color:"rgba(139,145,154,0.6)",fontSize:12 }}>No credit card {"\u00B7"} Free Pulse scanner {"\u00B7"} Air-gapped available</p>
      <div style={{ marginTop:64,width:"100vw",borderTop:"1px solid rgba(107,0,255,0.2)",background:BG2,padding:"16px clamp(20px,5vw,80px)",display:"flex",justifyContent:"center",gap:0,flexWrap:"wrap" }}>
        {["\uD83C\uDFDB\uFE0F  Trusted by Federal (CAGE 172W2)","\u20BF  Bitcoin-Anchored Proof","\u26A1  MTTR: 20 Seconds","\uD83D\uDEE1\uFE0F  SDVOSB \u00B7 Minority-Owned"].map((t,i)=>(
          <React.Fragment key={i}>
            <span style={{ color:G,fontSize:12,padding:"4px clamp(8px,2vw,32px)",whiteSpace:"nowrap" }}>{t}</span>
            {i<3&&<span style={{ color:"rgba(107,0,255,0.3)",fontSize:18 }}>|</span>}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}

function Chip({label}:{label:string}) {
  return <span style={{ background:"rgba(107,0,255,0.15)",border:"1px solid rgba(107,0,255,0.25)",borderRadius:8,padding:"5px 11px",fontSize:12,fontWeight:500,color:W,whiteSpace:"nowrap" }}>{label}</span>;
}

function Integration() {
  return (
    <section style={{ background:BG,padding:"clamp(48px,8vw,100px) clamp(20px,5vw,80px)",textAlign:"center" }}>
      <h2 style={{ fontSize:"clamp(28px,4vw,48px)",fontWeight:900,color:W,margin:"0 0 6px" }}>You Already Have the Sensors.</h2>
      <h2 style={{ fontSize:"clamp(28px,4vw,48px)",fontWeight:900,color:P2,margin:"0 0 20px" }}>We Provide the Nervous System.</h2>
      <p style={{ fontSize:16,color:G,lineHeight:1.7,maxWidth:700,margin:"0 auto 48px" }}>
        Don{"\u2019"}t replace your stack. Upgrade it. iTechSmart ingests alerts from your existing tools, executes the remediation, and logs cryptographic proof into your ServiceNow or Jira tickets.
      </p>
      <div style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:"clamp(12px,3vw,24px)",flexWrap:"wrap" }}>
        <div style={{ background:"rgba(107,0,255,0.08)",border:"1px solid rgba(107,0,255,0.2)",borderRadius:14,padding:"20px 24px",maxWidth:260,textAlign:"left" }}>
          <p style={{ color:P2,fontSize:10,fontWeight:700,letterSpacing:"1.5px",margin:"0 0 12px" }}>TELEMETRY SOURCES</p>
          <div style={{ display:"flex",flexWrap:"wrap",gap:6 }}>{["Datadog","Wazuh","Splunk","Prometheus","PagerDuty","Grafana"].map(t=><Chip key={t} label={t}/>)}</div>
        </div>
        <div style={{ fontSize:24,fontWeight:700,color:P }}>{"\u2192"}</div>
        <div style={{ background:"rgba(107,0,255,0.14)",border:`2px solid ${P}`,borderRadius:16,padding:"24px 28px",maxWidth:260,textAlign:"center",boxShadow:"0 0 40px rgba(107,0,255,0.3)" }}>
          <div style={{ fontSize:32,marginBottom:6 }}>{"\uD83E\uDDE0"}</div>
          <p style={{ color:W,fontWeight:700,fontSize:18,margin:"0 0 4px" }}>iTechSmart</p>
          <p style={{ color:P2,fontSize:11,margin:"0 0 12px" }}>OctoAI {"\u00B7"} Ultra 253B {"\u00B7"} NeMo</p>
          <span style={{ background:"rgba(107,0,255,0.25)",borderRadius:20,padding:"5px 12px",fontSize:10,fontWeight:600,color:W }}>AUTONOMOUS ENGINE</span>
        </div>
        <div style={{ fontSize:24,fontWeight:700,color:P }}>{"\u2192"}</div>
        <div style={{ background:"rgba(107,0,255,0.08)",border:"1px solid rgba(107,0,255,0.2)",borderRadius:14,padding:"20px 24px",maxWidth:260,textAlign:"left" }}>
          <p style={{ color:P2,fontSize:10,fontWeight:700,letterSpacing:"1.5px",margin:"0 0 12px" }}>ACTION & RECORD</p>
          <div style={{ display:"flex",flexWrap:"wrap",gap:6 }}>{["AWS","Azure","GCP","ServiceNow","Jira","Slack","SSH","WinRM"].map(t=><Chip key={t} label={t}/>)}</div>
        </div>
      </div>
    </section>
  );
}

function DetectFixProve() {
  const cols = [
    { n:"01",icon:"\uD83D\uDCE1",title:"Detect",color:BL,body:"Ingest telemetry from your existing environment. Anomalies mapped using NVIDIA NeMo RAG against 131+ historical incidents." },
    { n:"02",icon:"\u26A1",title:"Fix",color:P,body:"Root cause reasoning + autonomous remediation via SSH, WinRM, or API. OctoAI 8-agent engine powered by Nemotron Ultra 253B." },
    { n:"03",icon:"\uD83D\uDD10",title:"Prove",color:OR,body:"Cryptographic receipt generated, Bitcoin-anchored via OpenTimestamps, attached to your ITSM ticket. Math, not promises." },
  ];
  return (
    <section style={{ background:BG2,padding:"clamp(48px,8vw,100px) clamp(20px,5vw,80px)",textAlign:"center",position:"relative" }}>
      <div style={{ display:"inline-flex",alignItems:"center",gap:8,background:"rgba(43,217,140,0.12)",border:"1px solid rgba(43,217,140,0.3)",borderRadius:24,padding:"6px 14px",marginBottom:24 }}>
        <span style={{ color:GR,fontSize:12,fontWeight:600 }}>THE 20-SECOND AUTONOMOUS LOOP</span>
      </div>
      <h2 style={{ fontSize:"clamp(32px,5vw,56px)",fontWeight:900,color:W,margin:"0 0 48px" }}>Detect. Fix. Prove.</h2>
      <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(min(100%, 300px), 1fr))",gap:24,maxWidth:1140,margin:"0 auto" }}>
        {cols.map(c=>(
          <div key={c.n} style={{ background:"rgba(8,3,26,0.9)",border:`1px solid ${c.color}44`,borderRadius:16,padding:"28px 24px",textAlign:"left",boxShadow:`0 8px 32px ${c.color}18` }}>
            <p style={{ color:c.color,fontSize:10,fontWeight:700,letterSpacing:"2px",margin:"0 0 10px",opacity:0.6 }}>{c.n}</p>
            <p style={{ fontSize:22,fontWeight:700,color:c.color,margin:"0 0 14px" }}>{c.icon}  {c.title}</p>
            <div style={{ height:1,background:"rgba(107,0,255,0.2)",marginBottom:14 }}/>
            <p style={{ color:G,fontSize:14,lineHeight:1.7,margin:0 }}>{c.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Trust() {
  const feats = [
    { icon:"\u2708\uFE0F",title:"Air-Gapped Citadel",body:"Fully air-gapped for classified/defense. FIPS-aligned, zero cloud dependency." },
    { icon:"\uD83C\uDFDB\uFE0F",title:"FedRAMP / CMMC Ready",body:"Compliance pathway active. SDVOSB set-aside eligible. CAGE 172W2." },
    { icon:"\u20BF",title:"Bitcoin-Anchored Proof",body:"Every receipt anchored via OpenTimestamps. Independently verifiable." },
    { icon:"\u2696\uFE0F",title:"SDVOSB Certified",body:"Service-Disabled Veteran-Owned. Minority-Owned. SDB. Full gov credentials." },
  ];
  return (
    <section style={{ background:BG,padding:"clamp(48px,8vw,100px) clamp(20px,5vw,80px)",textAlign:"center" }}>
      <div style={{ display:"inline-flex",alignItems:"center",gap:8,background:"rgba(107,0,255,0.15)",border:"1px solid rgba(107,0,255,0.3)",borderRadius:24,padding:"6px 14px",marginBottom:24 }}>
        <span style={{ color:P2,fontSize:12,fontWeight:600 }}>FOR CISOS & COMPLIANCE TEAMS</span>
      </div>
      <h2 style={{ fontSize:"clamp(32px,5vw,56px)",fontWeight:900,color:W,margin:"0 0 16px" }}>AI You Can Audit.</h2>
      <p style={{ fontSize:17,color:G,lineHeight:1.7,maxWidth:640,margin:"0 auto 48px" }}>
        Every autonomous action generates an immutable cryptographic receipt {"\u2014"} publicly verifiable on the Bitcoin blockchain.
      </p>
      <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(min(100%, 280px), 1fr))",gap:14,maxWidth:1100,margin:"0 auto 40px" }}>
        {feats.map(f=>(
          <div key={f.title} style={{ background:"rgba(107,0,255,0.06)",border:"1px solid rgba(107,0,255,0.15)",borderRadius:12,padding:"18px 20px",display:"flex",gap:14,textAlign:"left" }}>
            <span style={{ fontSize:22,flexShrink:0,marginTop:2 }}>{f.icon}</span>
            <div>
              <p style={{ color:W,fontWeight:700,fontSize:14,margin:"0 0 4px" }}>{f.title}</p>
              <p style={{ color:G,fontSize:12,lineHeight:1.6,margin:0 }}>{f.body}</p>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap" }}>
        <a href="https://whitepaper.itechsmart.dev" target="_blank" rel="noopener noreferrer" style={{ background:"rgba(255,255,255,0.05)",color:W,border:"1px solid rgba(255,255,255,0.15)",borderRadius:10,padding:"12px 24px",fontSize:14,fontWeight:600,textDecoration:"none" }}>Read the Whitepaper</a>
        <a href="https://verify.itechsmart.dev" target="_blank" rel="noopener noreferrer" style={{ background:P,color:W,borderRadius:10,padding:"12px 24px",fontSize:14,fontWeight:600,textDecoration:"none" }}>View Live Ledger {"\u2192"}</a>
      </div>
    </section>
  );
}

function Onboarding() {
  return (
    <section style={{ background:BG2,padding:"clamp(48px,8vw,100px) clamp(20px,5vw,80px)",textAlign:"center" }}>
      <div style={{ display:"inline-flex",alignItems:"center",gap:8,background:"rgba(43,217,140,0.12)",border:"1px solid rgba(43,217,140,0.3)",borderRadius:24,padding:"6px 14px",marginBottom:24 }}>
        <span style={{ color:GR,fontSize:12,fontWeight:600 }}>ZERO-RISK ENTRY POINT</span>
      </div>
      <h2 style={{ fontSize:"clamp(28px,4vw,50px)",fontWeight:900,color:W,margin:"0 0 16px" }}>Prove It In Your Environment Today.</h2>
      <p style={{ fontSize:17,color:G,lineHeight:1.7,maxWidth:640,margin:"0 auto 36px" }}>
        Start with a zero-risk deployment. Connect one telemetry source. Watch the intelligence engine map fixes before you ever grant execution permissions.
      </p>
      <div style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:10,marginBottom:36,flexWrap:"wrap" }}>
        {["1  Connect telemetry","\u2192","2  Watch classifications","\u2192","3  Grant execution"].map((s,i)=>(
          <span key={i} style={s==="\u2192"?{color:"rgba(107,0,255,0.5)",fontSize:18,fontWeight:700}:{background:"rgba(107,0,255,0.1)",border:"1px solid rgba(107,0,255,0.2)",borderRadius:20,padding:"7px 16px",color:W,fontSize:13,fontWeight:500}}>{s}</span>
        ))}
      </div>
      <div style={{ display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap" }}>
        <a href="https://itechsmart.dev/pulse" target="_blank" rel="noopener noreferrer" style={{ background:GR,color:"#031a0e",borderRadius:10,padding:"14px 28px",fontSize:15,fontWeight:700,textDecoration:"none" }}>Deploy Free Pulse Scanner {"\u2192"}</a>
        <a href="https://calendly.com/djuane-itechsmart/new-meeting" target="_blank" rel="noopener noreferrer" style={{ background:"rgba(255,255,255,0.05)",color:W,border:"1px solid rgba(255,255,255,0.15)",borderRadius:10,padding:"14px 28px",fontSize:15,fontWeight:600,textDecoration:"none" }}>Book a Demo</a>
      </div>
    </section>
  );
}

function Footer() {
  const cols = [
    { t:"PLATFORM",links:[["Main Platform","https://itechsmart.dev"],["Free Pulse Scanner","https://itechsmart.dev/pulse"],["Break-It Challenge","https://itechsmart.dev/break-it"],["Integrations","https://itechsmart.dev/integrations"],["Pricing","https://itechsmart.dev/pricing"],["Pitch Deck","https://itechsmart.dev/pitch-deck"]] },
    { t:"PROOF & TRUST",links:[["Verify a Receipt","https://verify.itechsmart.dev"],["ProofLink Ledger","https://itechsmart.dev/proof"],["Bitcoin Verification","https://opentimestamps.org"],["Credibility","https://itechsmart.dev/credibility"],["Public API Docs","https://api.itechsmart.dev/docs"],["API Health","https://api.itechsmart.dev/v1/health"]] },
    { t:"RESOURCES",links:[["Whitepaper v3.6","https://whitepaper.itechsmart.dev"],["Changelog","https://itechsmart.dev/changelog"],["Blog","https://itechsmart.dev/blog"],["State of Autonomous IT","https://itechsmart.dev/state-of-autonomous-it-2026"],["Security","https://itechsmart.dev/security"],["FAQ","https://itechsmart.dev/faq"]] },
    { t:"COMPANY",links:[["About","https://itechsmart.dev/about"],["Press Release","https://itechsmart.dev/press-release"],["Executive Bios","https://itechsmart.dev/news/executive-bios"],["News","https://itechsmart.dev/news"],["Contact","https://itechsmart.dev/contact"],["Book a Call","https://calendly.com/djuane-itechsmart/new-meeting"]] },
  ];
  return (
    <footer style={{ background:BG2,borderTop:"1px solid rgba(107,0,255,0.2)",padding:"clamp(32px,5vw,60px) clamp(20px,5vw,80px) clamp(24px,3vw,40px)" }}>
      <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(min(100%, 200px), 1fr))",gap:"clamp(20px,3vw,40px)",marginBottom:40 }}>
        {cols.map(c=>(
          <div key={c.t}>
            <p style={{ color:P2,fontSize:10,fontWeight:700,letterSpacing:"1.5px",margin:"0 0 14px" }}>{c.t}</p>
            {c.links.map(([l,h])=>(
              <a key={l} href={h} target="_blank" rel="noopener noreferrer" style={{ display:"block",color:G,fontSize:12,textDecoration:"none",marginBottom:9,lineHeight:1.4 }}>{l}</a>
            ))}
          </div>
        ))}
      </div>
      <div style={{ borderTop:"1px solid rgba(107,0,255,0.15)",paddingTop:24,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:16 }}>
        <div style={{ display:"flex",alignItems:"center",gap:16,flexWrap:"wrap" }}>
          <div style={{ display:"flex",alignItems:"center",gap:7 }}>
            <img src="/itechsmart_icon.png" alt="iTechSmart" width={22} height={22} style={{ borderRadius:"50%" }} />
            <span style={{ color:W,fontWeight:700,fontSize:14 }}>iTechSmart Inc.</span>
          </div>
          <div style={{ display:"flex",alignItems:"center",gap:5,background:"#111",border:"1px solid rgba(118,185,0,0.4)",borderRadius:5,padding:"3px 8px" }}>
            <div style={{ width:6,height:6,borderRadius:"50%",background:"#76b900" }}/>
            <span style={{ color:"#76b900",fontSize:10,fontWeight:600 }}>NVIDIA Inception</span>
          </div>
        </div>
        <p style={{ color:"rgba(139,145,154,0.5)",fontSize:11,margin:0 }}>SDVOSB {"\u00B7"} CAGE: 172W2 {"\u00B7"} UEI: ZCPFX4N86G36 {"\u00B7"} F6S #6 {"\u00B7"} {"\u00A9"} 2026 iTechSmart Inc.</p>
      </div>
    </footer>
  );
}

export default function HomePage() {
  return (
    <main style={{ background:BG,fontFamily:"'Inter',system-ui,sans-serif",margin:0,padding:0,overflowX:"hidden" }}>
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
