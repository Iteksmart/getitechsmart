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
const RED = "#ef4444";

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
        {[["Live Proof","https://itechsmart.dev/proof"],["Integrations","https://itechsmart.dev/integrations"],["Security","https://itechsmart.dev/credibility"],["API","https://api.itechsmart.dev/docs"]].map(([l,h])=>(
          <a key={l} href={h} target="_blank" rel="noopener noreferrer" style={{ color:TEXT2,fontSize:12,textDecoration:"none",fontWeight:500 }}>{l}</a>
        ))}
      </div>
      <div style={{ display:"flex",alignItems:"center",gap:10 }}>
        <a href="https://www.nvidia.com/en-us/startups/" target="_blank" rel="noopener noreferrer" className="nc"><img src="/nvidia-inception-badge.svg" alt="NVIDIA Inception" style={{ height:18,width:"auto" }} /></a>
        <a href="https://itechsmart.dev/pulse" target="_blank" rel="noopener noreferrer" className="nc" style={{ background:ACCENT,color:W,borderRadius:6,padding:"7px 16px",fontSize:12,fontWeight:600,textDecoration:"none" }}>Run Free Scan</a>
      </div>
      <button onClick={()=>setOpen(!open)} className="nb" style={{ display:"none",background:"none",border:"1px solid rgba(255,255,255,0.1)",borderRadius:6,padding:"6px 12px",color:W,fontSize:16,cursor:"pointer",marginRight:4 }}>{open?"\u2715":"\u2630"}</button>
      {open&&<div style={{ position:"absolute",top:56,left:0,right:0,background:BG2,borderBottom:"1px solid rgba(255,255,255,0.04)",padding:20,display:"flex",flexDirection:"column",gap:16 }}>
        {[["Live Proof","https://itechsmart.dev/proof"],["Integrations","https://itechsmart.dev/integrations"],["Security","https://itechsmart.dev/credibility"],["API","https://api.itechsmart.dev/docs"]].map(([l,h])=>(
          <a key={l} href={h} onClick={()=>setOpen(false)} target="_blank" rel="noopener noreferrer" style={{ color:TEXT,fontSize:14,textDecoration:"none" }}>{l}</a>
        ))}
        <a href="https://itechsmart.dev/pulse" target="_blank" rel="noopener noreferrer" style={{ background:ACCENT,color:W,borderRadius:6,padding:"12px",fontSize:14,fontWeight:600,textDecoration:"none",textAlign:"center" }}>Run Free Scan</a>
      </div>}
      <style>{`@media(max-width:768px){.dl,.nc{display:none!important}.nb{display:block!important}}`}</style>
    </nav>
  );
}

/* ── 1. HERO ──────────────────────────────────────────────────────────────── */
function Hero() {
  const TYPED = "And You Can Prove It.";
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => { i++; setTyped(TYPED.slice(0, i)); if (i >= TYPED.length) { clearInterval(id); setDone(true); } }, 70);
    return () => clearInterval(id);
  }, []);
  return (
    <section style={{ background:BG,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"clamp(100px,14vh,140px) clamp(20px,5vw,80px) 0",position:"relative",minHeight:"100vh" }}>
      <h1 style={{ fontSize:"clamp(34px,6vw,64px)",fontWeight:700,color:W,lineHeight:1.1,margin:"0 0 8px",letterSpacing:"-2px",maxWidth:820 }}>
        Your Infrastructure Just Fixed Itself {"\u2014"}
      </h1>
      <div style={{ marginBottom:20,minHeight:"1.2em" }}>
        <h1 style={{ fontSize:"clamp(34px,6vw,64px)",fontWeight:700,color:ACCENT,lineHeight:1.1,margin:0,letterSpacing:"-2px",display:"inline" }}>
          {typed}{!done && <span style={{ borderRight:`3px solid ${ACCENT}`,marginLeft:2,animation:"blink .7s step-end infinite" }} />}
        </h1>
      </div>
      <p style={{ fontSize:"clamp(16px,1.8vw,20px)",color:W,fontWeight:600,letterSpacing:"1px",margin:"0 0 16px" }}>
        Detect. Decide. Fix. Prove.
      </p>
      <p style={{ fontSize:"clamp(14px,1.5vw,17px)",color:TEXT,lineHeight:1.7,maxWidth:620,margin:"0 auto 36px" }}>
        iTechSmart autonomously resolves IT incidents in seconds {"\u2014"} and generates cryptographic proof auditors can verify independently.
      </p>
      <div style={{ display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap",marginBottom:14 }}>
        <a href="https://verify.itechsmart.dev" target="_blank" rel="noopener noreferrer" style={{ background:ACCENT,color:W,borderRadius:10,padding:"15px 30px",fontSize:15,fontWeight:600,textDecoration:"none",boxShadow:"0 0 40px rgba(153,51,255,0.35)" }}>{"\uD83D\uDD0D"}  Verify a Real Incident</a>
        <a href="https://api.itechsmart.dev/docs" target="_blank" rel="noopener noreferrer" style={{ background:"transparent",color:TEXT,border:"1px solid rgba(255,255,255,0.12)",borderRadius:10,padding:"15px 30px",fontSize:15,fontWeight:500,textDecoration:"none" }}>{"\u26A1"}  Try the API (No Signup)</a>
      </div>
      <p style={{ color:TEXT2,fontSize:12 }}>No setup {"\u00B7"} No risk {"\u00B7"} Works with your existing stack</p>
      <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}`}</style>
    </section>
  );
}

/* ── 2. INSTANT PROOF ─────────────────────────────────────────────────────── */
function InstantProof() {
  return (
    <section style={{ background:BG2,padding:"clamp(48px,8vw,100px) clamp(20px,5vw,80px)",borderTop:"1px solid rgba(255,255,255,0.04)" }}>
      <div style={{ maxWidth:900,margin:"0 auto",textAlign:"center" }}>
        <h2 style={{ fontSize:"clamp(28px,4vw,44px)",fontWeight:700,color:W,margin:"0 0 24px",letterSpacing:"-1px" }}>Don{"\u2019"}t Trust Us. Verify It Yourself.</h2>
        <p style={{ fontSize:16,color:TEXT,lineHeight:1.8,maxWidth:560,margin:"0 auto 32px" }}>
          This isn{"\u2019"}t a demo.<br/><br/>
          A real production incident was:
        </p>
        <div style={{ display:"flex",flexDirection:"column",gap:10,maxWidth:420,margin:"0 auto 32px",textAlign:"left" }}>
          {[
            [GREEN,"detected automatically"],
            [GREEN,"resolved in 20 seconds"],
            [GREEN,"verified with a cryptographic receipt"],
            [GREEN,"anchored to Bitcoin"],
          ].map(([c,t],i)=>(
            <div key={i} style={{ display:"flex",gap:10,alignItems:"center" }}>
              <span style={{ color:c as string,fontSize:14,flexShrink:0 }}>{"\u2713"}</span>
              <span style={{ color:W,fontSize:15 }}>{t}</span>
            </div>
          ))}
        </div>
        <p style={{ fontSize:15,color:TEXT2,lineHeight:1.7,margin:"0 auto 36px",maxWidth:400,fontStyle:"italic" }}>
          No logs. No screenshots. No manipulation.<br/>Just proof.
        </p>
        <div style={{ display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap" }}>
          <a href="https://itechsmart.dev/proof" target="_blank" rel="noopener noreferrer" style={{ background:ACCENT,color:W,borderRadius:8,padding:"13px 28px",fontSize:14,fontWeight:600,textDecoration:"none" }}>View Live Proof Ledger</a>
          <a href="https://verify.itechsmart.dev" target="_blank" rel="noopener noreferrer" style={{ color:TEXT,border:"1px solid rgba(255,255,255,0.1)",borderRadius:8,padding:"13px 28px",fontSize:14,fontWeight:500,textDecoration:"none" }}>Verify a Receipt Now</a>
        </div>
      </div>
    </section>
  );
}

/* ── 3. THE MOMENT ────────────────────────────────────────────────────────── */
function TheMoment() {
  return (
    <section style={{ background:BG,padding:"clamp(48px,8vw,100px) clamp(20px,5vw,80px)",borderTop:"1px solid rgba(255,255,255,0.04)" }}>
      <div style={{ maxWidth:700,margin:"0 auto" }}>
        <h2 style={{ fontSize:"clamp(28px,4vw,44px)",fontWeight:700,color:W,margin:"0 0 28px",letterSpacing:"-1px",textAlign:"center" }}>At 2:47 AM, No One Was On Call</h2>
        <div style={{ fontSize:16,color:TEXT,lineHeight:2,marginBottom:28 }}>
          <p style={{ margin:"0 0 20px" }}>A container crashed in production.</p>
          <p style={{ color:TEXT2,margin:"0 0 20px" }}>No alert fired.<br/>No ticket was created.<br/>No engineer responded.</p>
          <p style={{ margin:"0 0 8px" }}>The system:</p>
          <div style={{ display:"flex",flexDirection:"column",gap:6,marginBottom:20,paddingLeft:8 }}>
            {["detected the failure","simulated the fix","executed remediation","verified the result"].map(s=>(
              <div key={s} style={{ display:"flex",gap:10,alignItems:"center" }}>
                <span style={{ color:ACCENT }}>{"\u2192"}</span>
                <span style={{ color:W }}>{s}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background:BG2,border:"1px solid rgba(153,51,255,0.15)",borderRadius:12,padding:"20px 24px",display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:16 }}>
          <div>
            <span style={{ color:TEXT2,fontSize:11,fontWeight:600,letterSpacing:"1px" }}>TOTAL DOWNTIME</span>
            <p style={{ color:ACCENT,fontSize:28,fontWeight:700,margin:"4px 0 0" }}>20 seconds</p>
          </div>
          <div>
            <span style={{ color:TEXT2,fontSize:11,fontWeight:600,letterSpacing:"1px" }}>HUMAN INVOLVEMENT</span>
            <p style={{ color:GREEN,fontSize:28,fontWeight:700,margin:"4px 0 0" }}>Zero</p>
          </div>
        </div>
        <p style={{ color:TEXT2,fontSize:14,textAlign:"center",marginTop:20,fontStyle:"italic" }}>This is what autonomous IT actually looks like.</p>
      </div>
    </section>
  );
}

/* ── 4. PROBLEM → SOLUTION ────────────────────────────────────────────────── */
function ProblemSolution() {
  return (
    <section style={{ background:BG2,padding:"clamp(48px,8vw,100px) clamp(20px,5vw,80px)",borderTop:"1px solid rgba(255,255,255,0.04)" }}>
      <div style={{ maxWidth:1000,margin:"0 auto" }}>
        <h2 style={{ fontSize:"clamp(28px,4vw,44px)",fontWeight:700,color:W,margin:"0 0 40px",letterSpacing:"-1px",textAlign:"center" }}>The Old Model Is Broken</h2>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(min(100%, 380px), 1fr))",gap:20 }}>
          {/* Traditional */}
          <div style={{ background:BG3,border:"1px solid rgba(239,68,68,0.15)",borderRadius:14,padding:"28px 24px" }}>
            <p style={{ color:RED,fontSize:11,fontWeight:700,letterSpacing:"2px",margin:"0 0 16px" }}>TRADITIONAL IT</p>
            <div style={{ display:"flex",flexDirection:"column",gap:10,marginBottom:16 }}>
              {["Alert \u2192 Ticket \u2192 Engineer \u2192 Fix","45\u201390 minutes per incident","No verifiable audit trail"].map(s=>(
                <div key={s} style={{ display:"flex",gap:10,alignItems:"center" }}>
                  <span style={{ color:RED,fontSize:12 }}>{"\u2715"}</span>
                  <span style={{ color:TEXT,fontSize:14 }}>{s}</span>
                </div>
              ))}
            </div>
          </div>
          {/* iTechSmart */}
          <div style={{ background:BG3,border:`1px solid rgba(153,51,255,0.2)`,borderRadius:14,padding:"28px 24px",boxShadow:"0 0 30px rgba(153,51,255,0.06)" }}>
            <p style={{ color:ACCENT,fontSize:11,fontWeight:700,letterSpacing:"2px",margin:"0 0 16px" }}>iTECHSMART UAIO</p>
            <div style={{ display:"flex",flexDirection:"column",gap:10,marginBottom:16 }}>
              {["Detect \u2192 Decide \u2192 Fix \u2192 Prove","20-second recovery","Immutable, auditable proof"].map(s=>(
                <div key={s} style={{ display:"flex",gap:10,alignItems:"center" }}>
                  <span style={{ color:GREEN,fontSize:12 }}>{"\u2713"}</span>
                  <span style={{ color:W,fontSize:14 }}>{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <p style={{ color:TEXT,fontSize:16,textAlign:"center",marginTop:32,lineHeight:1.7 }}>
          Your team isn{"\u2019"}t failing.<br/><span style={{ color:ACCENT,fontWeight:600 }}>Your system is.</span>
        </p>
      </div>
    </section>
  );
}

/* ── 5. HOW IT WORKS ──────────────────────────────────────────────────────── */
function HowItWorks() {
  return (
    <section style={{ background:BG,padding:"clamp(48px,8vw,100px) clamp(20px,5vw,80px)",borderTop:"1px solid rgba(255,255,255,0.04)" }}>
      <div style={{ maxWidth:900,margin:"0 auto",textAlign:"center" }}>
        <h2 style={{ fontSize:"clamp(28px,4vw,44px)",fontWeight:700,color:W,margin:"0 0 40px",letterSpacing:"-1px" }}>A Closed Loop That Runs Itself</h2>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(min(100%, 200px), 1fr))",gap:16 }}>
          {[
            { n:"1",title:"Detect",body:"Real-time signal ingestion",color:ACCENT },
            { n:"2",title:"Decide",body:"AI-driven root cause + simulation",color:ACCENT },
            { n:"3",title:"Fix",body:"Autonomous remediation",color:ACCENT },
            { n:"4",title:"Prove",body:"Cryptographic receipt generation",color:GREEN },
          ].map(s=>(
            <div key={s.n} style={{ background:BG2,border:"1px solid rgba(255,255,255,0.06)",borderRadius:12,padding:"24px 20px",textAlign:"center" }}>
              <div style={{ width:36,height:36,borderRadius:"50%",background:`${s.color}18`,border:`1px solid ${s.color}40`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 12px" }}>
                <span style={{ color:s.color,fontWeight:700,fontSize:14 }}>{s.n}</span>
              </div>
              <p style={{ color:W,fontWeight:700,fontSize:16,margin:"0 0 4px" }}>{s.title}</p>
              <p style={{ color:TEXT2,fontSize:12,margin:0 }}>{s.body}</p>
            </div>
          ))}
        </div>
        <p style={{ color:ACCENT,fontSize:14,fontWeight:600,marginTop:28 }}>Fully autonomous. Fully verifiable.</p>
      </div>
    </section>
  );
}

/* ── 6. INTEGRATIONS ──────────────────────────────────────────────────────── */
function Integrations() {
  return (
    <section style={{ background:BG2,padding:"clamp(48px,8vw,100px) clamp(20px,5vw,80px)",borderTop:"1px solid rgba(255,255,255,0.04)" }}>
      <div style={{ maxWidth:900,margin:"0 auto" }}>
        <h2 style={{ fontSize:"clamp(28px,4vw,44px)",fontWeight:700,color:W,margin:"0 0 20px",letterSpacing:"-1px" }}>Deploy Without Breaking Anything</h2>
        <p style={{ fontSize:15,color:TEXT,lineHeight:1.7,margin:"0 0 32px",maxWidth:560 }}>
          iTechSmart connects directly to your existing environment:
        </p>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(min(100%, 200px), 1fr))",gap:14,marginBottom:28 }}>
          {[
            { cat:"Cloud",items:["AWS","Azure","GCP"] },
            { cat:"Monitoring",items:["Prometheus","Datadog","Wazuh"] },
            { cat:"ITSM",items:["ServiceNow","Jira","Slack"] },
            { cat:"Execution",items:["SSH","APIs","WinRM"] },
          ].map(g=>(
            <div key={g.cat} style={{ background:BG3,border:"1px solid rgba(255,255,255,0.06)",borderRadius:10,padding:"16px" }}>
              <p style={{ color:ACCENT,fontSize:10,fontWeight:700,letterSpacing:"1.5px",margin:"0 0 10px" }}>{g.cat.toUpperCase()}</p>
              <div style={{ display:"flex",flexWrap:"wrap",gap:6 }}>
                {g.items.map(t=>(
                  <span key={t} style={{ background:"rgba(153,51,255,0.1)",border:"1px solid rgba(153,51,255,0.2)",borderRadius:6,padding:"3px 9px",fontSize:11,color:TEXT }}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p style={{ color:TEXT2,fontSize:15,lineHeight:1.7 }}>No rip-and-replace. No migration risk.</p>
        <p style={{ color:W,fontSize:15,fontWeight:600,marginTop:8 }}>Start where you are. We handle the rest.</p>
      </div>
    </section>
  );
}

/* ── 7. TRUST / GOV ───────────────────────────────────────────────────────── */
function TrustGov() {
  return (
    <section style={{ background:BG,padding:"clamp(48px,8vw,100px) clamp(20px,5vw,80px)",borderTop:"1px solid rgba(255,255,255,0.04)" }}>
      <div style={{ maxWidth:900,margin:"0 auto" }}>
        <h2 style={{ fontSize:"clamp(28px,4vw,44px)",fontWeight:700,color:W,margin:"0 0 24px",letterSpacing:"-1px" }}>Built for the Environments That Can{"\u2019"}t Fail</h2>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(min(100%, 260px), 1fr))",gap:14,marginBottom:28 }}>
          {[
            ["SDVOSB / VOSB / Minority-Owned","\uD83C\uDFDB\uFE0F"],
            ["FedRAMP pathway active","\uD83D\uDEE1\uFE0F"],
            ["Zero Trust architecture","\uD83D\uDD10"],
            ["Air-gapped deployment (Citadel)","\u2708\uFE0F"],
          ].map(([t,icon])=>(
            <div key={t} style={{ background:BG2,border:"1px solid rgba(255,255,255,0.06)",borderRadius:10,padding:"16px 18px",display:"flex",gap:12,alignItems:"center" }}>
              <span style={{ fontSize:20,flexShrink:0 }}>{icon}</span>
              <span style={{ color:W,fontSize:13,fontWeight:500 }}>{t}</span>
            </div>
          ))}
        </div>
        <p style={{ color:TEXT2,fontSize:14 }}>Designed for enterprise infrastructure, regulated industries, and government systems.</p>
      </div>
    </section>
  );
}

/* ── 8. ROI ────────────────────────────────────────────────────────────────── */
function ROI() {
  return (
    <section style={{ background:BG2,padding:"clamp(48px,8vw,80px) clamp(20px,5vw,80px)",borderTop:"1px solid rgba(255,255,255,0.04)",textAlign:"center" }}>
      <div style={{ maxWidth:800,margin:"0 auto" }}>
        <h2 style={{ fontSize:"clamp(28px,4vw,44px)",fontWeight:700,color:W,margin:"0 0 36px",letterSpacing:"-1px" }}>From Hours to Seconds</h2>
        <div style={{ display:"flex",justifyContent:"center",gap:"clamp(20px,4vw,48px)",flexWrap:"wrap",marginBottom:32 }}>
          {[
            ["\u26A1","20s","Incident Recovery"],
            ["\uD83D\uDCC9","85%","MTTR Reduction"],
            ["\uD83D\uDD10","100%","Verifiable Audit Trail"],
          ].map(([icon,val,label])=>(
            <div key={label} style={{ textAlign:"center" }}>
              <span style={{ fontSize:24 }}>{icon}</span>
              <p style={{ color:ACCENT,fontSize:36,fontWeight:700,margin:"8px 0 4px",letterSpacing:"-1px" }}>{val}</p>
              <p style={{ color:TEXT2,fontSize:12 }}>{label}</p>
            </div>
          ))}
        </div>
        <p style={{ color:TEXT,fontSize:15 }}>Less downtime. Lower cost. Zero guesswork.</p>
      </div>
    </section>
  );
}

/* ── 9. FINAL CTA ─────────────────────────────────────────────────────────── */
function FinalCTA() {
  return (
    <section style={{ background:BG,padding:"clamp(48px,8vw,100px) clamp(20px,5vw,80px)",borderTop:"1px solid rgba(255,255,255,0.04)",textAlign:"center" }}>
      <div style={{ maxWidth:640,margin:"0 auto" }}>
        <h2 style={{ fontSize:"clamp(28px,4vw,44px)",fontWeight:700,color:W,margin:"0 0 16px",letterSpacing:"-1px" }}>See What Autonomous IT Actually Looks Like</h2>
        <p style={{ fontSize:16,color:TEXT,lineHeight:1.7,margin:"0 0 36px" }}>
          You don{"\u2019"}t need to imagine it.<br/>You can verify it right now.
        </p>
        <div style={{ display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap" }}>
          <a href="https://verify.itechsmart.dev" target="_blank" rel="noopener noreferrer" style={{ background:ACCENT,color:W,borderRadius:10,padding:"15px 28px",fontSize:15,fontWeight:600,textDecoration:"none",boxShadow:"0 0 40px rgba(153,51,255,0.3)" }}>{"\uD83D\uDD0D"}  Verify a Real Incident</a>
          <a href="https://itechsmart.dev/break-it" target="_blank" rel="noopener noreferrer" style={{ color:TEXT,border:"1px solid rgba(255,255,255,0.12)",borderRadius:10,padding:"15px 28px",fontSize:15,fontWeight:500,textDecoration:"none" }}>{"\uD83D\uDE80"}  Watch Live Demo</a>
          <a href="https://calendly.com/djuane-itechsmart/new-meeting" target="_blank" rel="noopener noreferrer" style={{ color:TEXT,border:"1px solid rgba(255,255,255,0.12)",borderRadius:10,padding:"15px 28px",fontSize:15,fontWeight:500,textDecoration:"none" }}>{"\uD83D\uDCDE"}  Book a Call</a>
        </div>
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
    <footer style={{ background:BG2,borderTop:"1px solid rgba(255,255,255,0.04)",padding:"clamp(40px,6vw,64px) clamp(20px,5vw,80px) clamp(24px,3vw,40px)" }}>
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
            <span style={{ color:TEXT2,fontSize:10 }}>UAIO</span>
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
      <InstantProof/>
      <TheMoment/>
      <ProblemSolution/>
      <HowItWorks/>
      <Integrations/>
      <TrustGov/>
      <ROI/>
      <FinalCTA/>
      <Footer/>
    </main>
  );
}
