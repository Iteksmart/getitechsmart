"use client";
import { useEffect, useRef, useState } from "react";

const B = {
  purple:"#9933ff", blue:"#3366ff", red:"#ff404d", teal:"#0ff4c6",
  green:"#22c55e",  bg:"#05050f",   text:"#ffffff",
  muted:"rgba(255,255,255,0.55)", dim:"rgba(255,255,255,0.32)",
  border:"rgba(153,51,255,0.18)",  surface:"rgba(255,255,255,0.04)",
};

function LiveCounter({end,label,suffix=""}:{end:number;label:string;suffix?:string}) {
  const [n,setN]=useState(0); const ref=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{
      if(!e.isIntersecting)return; obs.disconnect();
      let v=0; const step=Math.ceil(end/70);
      const t=setInterval(()=>{ v=Math.min(v+step,end); setN(v); if(v>=end)clearInterval(t); },14);
    },{threshold:0.3});
    if(ref.current)obs.observe(ref.current);
    return()=>obs.disconnect();
  },[end]);
  return(
    <div ref={ref} style={{textAlign:"center"}}>
      <div className="counter-val">
        {n>=1000000?(n/1000000).toFixed(1)+"M":n.toLocaleString()}{suffix}
      </div>
      <div className="counter-label">{label}</div>
    </div>
  );
}

function Typewriter({lines}:{lines:string[]}) {
  const [idx,setIdx]=useState(0); const [ch,setCh]=useState(0); const [del,setDel]=useState(false);
  useEffect(()=>{
    const delay=del?28:ch===lines[idx].length?2400:50;
    const t=setTimeout(()=>{
      if(!del&&ch===lines[idx].length){setDel(true);return;}
      if(del&&ch===0){setDel(false);setIdx(i=>(i+1)%lines.length);return;}
      setCh(c=>c+(del?-1:1));
    },delay);
    return()=>clearTimeout(t);
  },[ch,del,idx,lines]);
  return(
    <span style={{color:B.purple}}>
      {lines[idx].slice(0,ch)}
      <span className="cursor"/>
    </span>
  );
}

function UaioLoop() {
  const [a,setA]=useState(0);
  useEffect(()=>{ const t=setInterval(()=>setA(x=>(x+1)%6),1000); return()=>clearInterval(t); },[]);
  const steps=[
    {icon:"📡",label:"DETECT",   color:B.blue},
    {icon:"🌐",label:"SIMULATE", color:B.purple},
    {icon:"🧠",label:"DECIDE",   color:"#a855f7"},
    {icon:"⚡",label:"FIX",      color:B.teal},
    {icon:"✓", label:"VERIFY",   color:"#4ade80"},
    {icon:"🔐",label:"RECEIPT",  color:B.green},
  ];
  return(
    <div className="uaio-loop">
      {steps.map((s,i)=>(
        <div key={s.label} style={{display:"flex",alignItems:"center"}}>
          <div className="uaio-step" style={{
            border:`1px solid ${a===i?s.color:"rgba(255,255,255,0.07)"}`,
            background:a===i?`${s.color}18`:"rgba(255,255,255,0.02)",
            boxShadow:a===i?`0 0 28px ${s.color}33`:"none",
            transition:"all 0.45s ease",
          }}>
            <span style={{fontSize:20}}>{s.icon}</span>
            <span className="uaio-label" style={{color:a===i?s.color:B.dim}}>{s.label}</span>
          </div>
          {i<5&&<div className="uaio-connector" style={{background:a>i?B.purple:"rgba(255,255,255,0.07)"}}/>}
        </div>
      ))}
    </div>
  );
}

function ProofWidget() {
  const [vis,setVis]=useState(false); const ref=useRef<HTMLDivElement>(null);
  useEffect(()=>{ const o=new IntersectionObserver(([e])=>{if(e.isIntersecting)setVis(true)},{threshold:0.2}); if(ref.current)o.observe(ref.current); return()=>o.disconnect(); },[]);
  const rows=[["Receipt","f0b71cc0970c96e2"],["Container","suite-itsm"],["Trigger","Health check failed"],["Detected","10 seconds"],["Recovery","20 seconds"],["Human input","ZERO"],["SHA-256","verified ✓"],["tamper_detected","false"]];
  return(
    <div ref={ref} style={{borderRadius:22,border:`1px solid rgba(34,197,94,0.28)`,background:"linear-gradient(135deg,rgba(34,197,94,0.07),rgba(153,51,255,0.07))",padding:22,transform:vis?"translateY(0)":"translateY(40px)",opacity:vis?1:0,transition:"all 0.8s cubic-bezier(0.16,1,0.3,1)"}}>
      <div style={{borderRadius:14,background:"rgba(0,0,0,0.78)",border:"1px solid rgba(255,255,255,0.07)",padding:22}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:18}}>
          <div style={{width:7,height:7,borderRadius:"50%",background:B.green,boxShadow:`0 0 10px ${B.green}`,animation:"pulse-g 2s infinite"}}/>
          <span style={{fontSize:10,fontWeight:800,color:B.green,letterSpacing:"0.14em",textTransform:"uppercase",fontFamily:"Inter"}}>Live ProofLink · April 5 2026</span>
        </div>
        {rows.map(([k,v],i)=>(
          <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:i<rows.length-1?"1px solid rgba(255,255,255,0.04)":"none",transform:vis?"translateX(0)":"translateX(-16px)",opacity:vis?1:0,transition:`all 0.5s cubic-bezier(0.16,1,0.3,1) ${i*0.06}s`}}>
            <span style={{fontSize:12,color:B.dim,fontFamily:"monospace"}}>{k}</span>
            <span style={{fontSize:12,color:v==="ZERO"||v==="false"||v==="verified ✓"?B.green:B.text,fontWeight:700,fontFamily:"monospace"}}>{v}</span>
          </div>
        ))}
        <div style={{marginTop:16,padding:"9px 14px",borderRadius:8,background:"rgba(34,197,94,0.09)",border:"1px solid rgba(34,197,94,0.22)",fontSize:11,color:"#4ade80",fontWeight:800,textAlign:"center",letterSpacing:"0.06em",fontFamily:"Inter"}}>
          CRYPTOGRAPHICALLY SEALED · itechsmart.dev/verify
        </div>
      </div>
    </div>
  );
}

function LiveFeed() {
  const events=[
    {fix:"Container outage",time:"18s",hash:"a3f9b2c1"},
    {fix:"Disk pressure (8% free)",time:"14s",hash:"b7d2f4a1"},
    {fix:"Failed health check",time:"20s",hash:"f0b71cc0"},
    {fix:"Memory leak detected",time:"22s",hash:"d4f1b8c2"},
    {fix:"Slow query killed",time:"11s",hash:"e5a2c7d8"},
    {fix:"Service restart loop",time:"19s",hash:"c3e8a2d5"},
  ];
  const [i,setI]=useState(0);
  useEffect(()=>{ const t=setInterval(()=>setI(x=>(x+1)%events.length),3200); return()=>clearInterval(t); },[events.length]);
  const e=events[i];
  return(
    <div style={{display:"inline-flex",alignItems:"center",gap:14,padding:"10px 20px",borderRadius:100,border:`1px solid ${B.green}33`,background:`${B.green}0a`,fontFamily:"Inter",maxWidth:"100%",flexWrap:"wrap",justifyContent:"center"}}>
      <span style={{display:"flex",alignItems:"center",gap:6}}>
        <span style={{width:7,height:7,borderRadius:"50%",background:B.green,boxShadow:`0 0 8px ${B.green}`,animation:"pulse-g 2s infinite"}}/>
        <span style={{fontSize:10,fontWeight:800,color:B.green,letterSpacing:".14em",textTransform:"uppercase"}}>Latest autonomous fix</span>
      </span>
      <span key={i} style={{fontSize:13,color:"#fff",fontWeight:600,animation:"fadeIn 0.6s ease"}}>
        {e.fix} <span style={{color:B.dim}}>→</span> resolved in <span style={{color:"#4ade80",fontWeight:800}}>{e.time}</span> <span style={{color:B.dim}}>→</span> receipt <span style={{color:B.purple,fontFamily:"monospace",fontSize:12}}>{e.hash}</span>
      </span>
    </div>
  );
}

function Reveal({children,delay=0}:{children:React.ReactNode;delay?:number}) {
  const [v,setV]=useState(false); const ref=useRef<HTMLDivElement>(null);
  useEffect(()=>{ const o=new IntersectionObserver(([e])=>{if(e.isIntersecting)setV(true)},{threshold:0.08}); if(ref.current)o.observe(ref.current); return()=>o.disconnect(); },[]);
  return(<div ref={ref} style={{transform:v?"translateY(0)":"translateY(28px)",opacity:v?1:0,transition:`all 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`}}>{children}</div>);
}

export default function Page() {
  const cvs=useRef<HTMLCanvasElement>(null);

  useEffect(()=>{
    const c=cvs.current; if(!c)return;
    const ctx=c.getContext("2d"); if(!ctx)return;
    const resize=()=>{c.width=window.innerWidth;c.height=window.innerHeight;};
    resize(); window.addEventListener("resize",resize);
    const nodes=Array.from({length:70},()=>({x:Math.random()*c.width,y:Math.random()*c.height,vx:(Math.random()-.5)*.32,vy:(Math.random()-.5)*.32,r:Math.random()*1.6+.4,p:Math.random()*Math.PI*2}));
    let raf:number;
    const draw=()=>{
      ctx.clearRect(0,0,c.width,c.height);
      nodes.forEach(n=>{n.x=(n.x+n.vx+c.width)%c.width;n.y=(n.y+n.vy+c.height)%c.height;n.p+=.018;});
      for(let i=0;i<nodes.length;i++)for(let j=i+1;j<nodes.length;j++){
        const dx=nodes[i].x-nodes[j].x,dy=nodes[i].y-nodes[j].y,d=Math.hypot(dx,dy);
        if(d<130){const a=(1-d/130)*.1;ctx.beginPath();ctx.strokeStyle=`rgba(153,51,255,${a})`;ctx.lineWidth=.65;ctx.moveTo(nodes[i].x,nodes[i].y);ctx.lineTo(nodes[j].x,nodes[j].y);ctx.stroke();}
      }
      nodes.forEach(n=>{const p=Math.sin(n.p)*.4+1;ctx.beginPath();ctx.arc(n.x,n.y,n.r*p,0,Math.PI*2);ctx.fillStyle="rgba(153,51,255,0.55)";ctx.fill();});
      raf=requestAnimationFrame(draw);
    };
    draw();
    return()=>{cancelAnimationFrame(raf);window.removeEventListener("resize",resize);};
  },[]);

  return(
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        body{background:${B.bg};color:${B.text};font-family:Inter,sans-serif;overflow-x:hidden}

        /* ── ANIMATIONS ── */
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes fadeIn{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pulse-g{0%,100%{box-shadow:0 0 10px #22c55e}50%{box-shadow:0 0 22px #22c55e,0 0 44px #22c55e44}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
        @keyframes scanline{0%{transform:translateY(-100%)}100%{transform:translateY(100vh)}}
        .cursor{display:inline-block;width:3px;background:${B.purple};margin-left:3px;vertical-align:middle;height:.85em;animation:blink 1s step-end infinite}
        .lift{transition:transform .3s ease,box-shadow .3s ease}
        .lift:hover{transform:translateY(-4px);box-shadow:0 20px 56px rgba(153,51,255,.22)}
        .cta-g{transition:all .2s}
        .cta-g:hover{transform:scale(1.03);box-shadow:0 0 80px ${B.purple}66!important}
        ::-webkit-scrollbar{width:3px;background:transparent}
        ::-webkit-scrollbar-thumb{background:${B.purple}44;border-radius:4px}

        /* ── LAYOUT ── */
        .wrap{max-width:1160px;margin:0 auto;width:100%}
        .section{padding:80px 24px;border-top:1px solid ${B.border}}
        .eyebrow{font-size:10px;font-weight:800;letter-spacing:.2em;text-transform:uppercase;margin-bottom:16px;font-family:Inter}
        .h2{font-size:clamp(1.8rem,4.5vw,3.2rem);font-weight:900;letter-spacing:-.035em;color:#fff;margin:0 0 20px;font-family:Inter;line-height:1.08}
        .body-text{font-size:16px;color:${B.muted};line-height:1.72;font-family:Inter}
        .card{padding:24px 20px;border-radius:18px;border:1px solid ${B.border};background:${B.surface};font-family:Inter}
        .cta1{padding:15px 28px;border-radius:12px;background:linear-gradient(135deg,${B.purple},${B.blue});color:#fff;font-size:14px;font-weight:800;text-decoration:none;display:inline-block;box-shadow:0 0 48px ${B.purple}44;font-family:Inter;letter-spacing:-.01em;line-height:1.35;text-align:center;max-width:520px}
        .cta2{padding:15px 28px;border-radius:12px;border:1px solid ${B.border};color:rgba(255,255,255,.72);font-size:15px;font-weight:600;text-decoration:none;display:inline-block;font-family:Inter}

        /* ── NAV ── */
        .nav{position:fixed;top:0;left:0;right:0;z-index:200;height:60px;border-bottom:1px solid ${B.border};background:rgba(5,5,15,.92);backdrop-filter:blur(18px);display:flex;align-items:center;padding:0 20px;justify-content:space-between}
        .nav-logo{display:flex;align-items:center;gap:8px}
        .nav-links{display:flex;gap:6px;align-items:center}
        .nav-link{padding:6px 12px;border-radius:8px;border:1px solid ${B.border};color:${B.muted};font-size:13px;font-weight:600;text-decoration:none;font-family:Inter}

        /* ── HERO ── */
        .hero{min-height:100vh;display:flex;align-items:center;justify-content:center;padding-top:60px;position:relative;overflow:hidden}
        .hero-content{text-align:center;padding:48px 20px 40px;width:100%}
        .hero-h1{font-size:clamp(2.4rem,8vw,7rem);font-weight:900;line-height:.97;letter-spacing:-.05em;color:#fff;font-family:Inter;margin:0 0 24px}
        .hero-sub{font-size:clamp(1rem,2.2vw,1.25rem);color:rgba(255,255,255,.6);max-width:580px;margin:0 auto 44px;line-height:1.68;font-family:Inter}
        .hero-ctas{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-bottom:52px}
        .stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;max-width:680px;margin:0 auto 60px}
        .stat-card{padding:12px 14px;border-radius:12px;border:1px solid ${B.border};background:${B.purple}07;text-align:center}
        .stat-val{font-size:18px;font-weight:900;color:${B.purple};font-family:Inter;letter-spacing:-.03em}
        .stat-lbl{font-size:10px;color:${B.dim};margin-top:3px;font-weight:500;font-family:Inter}
        .live-badge{display:inline-flex;align-items:center;gap:8px;padding:7px 16px;border-radius:100px;border:1px solid ${B.border};background:${B.purple}0e;margin-bottom:32px}
        .live-text{font-size:10px;font-weight:800;color:rgba(255,255,255,.62);letter-spacing:.12em;text-transform:uppercase;font-family:Inter}

        /* ── UAIO LOOP ── */
        .uaio-loop{display:flex;align-items:center;justify-content:center;gap:0;overflow-x:auto;padding:4px 8px;scrollbar-width:none;-webkit-overflow-scrolling:touch}
        .uaio-loop::-webkit-scrollbar{display:none}
        .uaio-step{display:flex;flex-direction:column;align-items:center;gap:6px;padding:12px 14px;border-radius:12px;min-width:72px;flex-shrink:0}
        .uaio-label{font-size:8px;font-weight:800;letter-spacing:.12em;font-family:Inter}
        .uaio-connector{width:20px;height:2px;flex-shrink:0;transition:background .45s}

        /* ── COUNTERS ── */
        .counters-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:32px}
        .counter-val{font-size:clamp(1.8rem,4vw,3rem);font-weight:900;color:${B.purple};font-family:Inter;letter-spacing:-.045em;line-height:1}
        .counter-label{font-size:11px;color:${B.dim};margin-top:6px;font-weight:600;font-family:Inter;letter-spacing:.02em}

        /* ── TWO COLUMN ── */
        .two-col{display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:center}
        .one-col{display:grid;grid-template-columns:1fr;gap:24px}

        /* ── CARDS GRIDS ── */
        .steps-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:16px;margin-bottom:40px}
        .who-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px}
        .outcomes-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:14px}
        .problem-cards{display:grid;gap:12px}

        /* ── PULSE BLOCK ── */
        .pulse-block{border-radius:24px;border:1px solid ${B.border};background:linear-gradient(135deg,${B.purple}12,${B.blue}08);padding:48px 40px;display:flex;align-items:center;justify-content:space-between;gap:40px;flex-wrap:wrap}
        .pulse-left{flex:1;min-width:260px}
        .pulse-right{display:flex;flex-direction:column;gap:0}
        .pulse-check{display:flex;align-items:center;gap:10px;font-size:14px;color:rgba(255,255,255,.72);margin-bottom:12px;font-family:Inter}

        /* ── FOOTER ── */
        .footer{border-top:1px solid ${B.border};padding:36px 24px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:18px}
        .footer-links{display:flex;gap:20px;flex-wrap:wrap}

        /* ════════════════════════════════════════
           TABLET  (≤ 1024px)
        ════════════════════════════════════════ */
        @media(max-width:1024px){
          .counters-grid{grid-template-columns:repeat(3,1fr);gap:24px}
          .steps-grid{grid-template-columns:repeat(3,1fr)}
          .who-grid{grid-template-columns:repeat(2,1fr)}
          .outcomes-grid{grid-template-columns:repeat(3,1fr)}
          .two-col{gap:40px}
        }

        /* ════════════════════════════════════════
           MOBILE  (≤ 768px)
        ════════════════════════════════════════ */
        @media(max-width:768px){
          /* Before/After */
          .ba-grid{grid-template-columns:1fr!important;gap:14px!important}
          /* Nav */
          .nav{padding:0 16px;height:56px}
          .nav-link:not(.nav-try){display:none}
          .nav-logo span{font-size:15px}

          /* Hero */
          .hero{padding-top:56px}
          .hero-content{padding:36px 16px 32px}
          .hero-h1{font-size:clamp(2.2rem,9vw,3.6rem)}
          .hero-sub{font-size:15px;margin-bottom:32px}
          .hero-ctas{flex-direction:column;align-items:center;gap:12px;margin-bottom:40px}
          .cta1,.cta2{width:100%;max-width:320px;text-align:center;padding:15px 24px}
          .live-badge{padding:6px 12px}
          .live-text{font-size:9px;letter-spacing:.08em}

          /* Stats */
          .stats-grid{grid-template-columns:repeat(2,1fr);gap:10px;max-width:100%}
          .stat-val{font-size:16px}

          /* UAIO */
          .uaio-step{padding:10px 10px;min-width:60px}
          .uaio-connector{width:12px}

          /* Sections */
          .section{padding:60px 16px}
          .h2{font-size:clamp(1.6rem,6vw,2.4rem)}
          .body-text{font-size:15px}

          /* Counters */
          .counters-grid{grid-template-columns:repeat(2,1fr);gap:20px}

          /* Grids → single column */
          .two-col{grid-template-columns:1fr;gap:32px}
          .steps-grid{grid-template-columns:1fr 1fr;gap:12px}
          .who-grid{grid-template-columns:1fr 1fr;gap:14px}
          .outcomes-grid{grid-template-columns:1fr 1fr;gap:12px}

          /* Cards */
          .card{padding:20px 16px}

          /* Pulse */
          .pulse-block{padding:32px 20px;flex-direction:column;gap:28px}
          .pulse-left{min-width:unset}

          /* Footer */
          .footer{flex-direction:column;align-items:flex-start;gap:20px;padding:32px 16px}
          .footer-links{gap:14px}
        }

        /* ════════════════════════════════════════
           SMALL MOBILE  (≤ 480px)
        ════════════════════════════════════════ */
        @media(max-width:480px){
          .hero-h1{font-size:clamp(2rem,10vw,3rem);line-height:1.0}
          .steps-grid{grid-template-columns:1fr}
          .who-grid{grid-template-columns:1fr}
          .outcomes-grid{grid-template-columns:1fr}
          .counters-grid{grid-template-columns:1fr 1fr}
          .stats-grid{grid-template-columns:1fr 1fr}
          .uaio-step{min-width:54px;padding:8px}
        }
      `}</style>

      <canvas ref={cvs} style={{position:"fixed",inset:0,zIndex:0,opacity:.42,pointerEvents:"none"}}/>
      <div style={{position:"fixed",inset:0,zIndex:0,pointerEvents:"none",overflow:"hidden",opacity:.022}}>
        <div style={{position:"absolute",top:0,left:0,right:0,height:160,background:"linear-gradient(transparent,rgba(153,51,255,.9),transparent)",animation:"scanline 9s linear infinite"}}/>
      </div>

      <main style={{position:"relative",zIndex:1}}>

        {/* NAV */}
        <nav className="nav">
          <div className="nav-logo">
            <img src="/itechsmart_icon.png" alt="iTechSmart" width="28" height="28" style={{filter:"drop-shadow(0 0 5px #9933ff88)",animation:"float 4s ease-in-out infinite"}}/>
            <span style={{fontWeight:900,fontSize:16,color:"#fff",letterSpacing:"-0.03em",fontFamily:"Inter"}}>iTechSmart</span>
          </div>
          <div className="nav-links">
            <a href="https://itechsmart.dev" target="_blank" className="nav-link">Platform</a>
            <a href="https://itechsmart.dev/proof" target="_blank" className="nav-link">Proof</a>
            <a href="https://itechsmart.dev/whitepaper" target="_blank" className="nav-link">Whitepaper</a>
            <a href="https://itechsmart.dev/start" target="_blank" className="nav-try" style={{padding:"8px 18px",fontSize:13,fontWeight:700,borderRadius:8,border:`1px solid ${B.purple}55`,background:`${B.purple}14`,color:B.purple,textDecoration:"none",fontFamily:"Inter"}}>Start Here</a>
            <a href="https://itechsmart.dev/pulse" target="_blank" className="cta1 cta-g nav-try" style={{padding:"8px 18px",fontSize:13,boxShadow:`0 0 22px ${B.purple}44`}}>Try Free →</a>
          </div>
        </nav>

        {/* HERO */}
        <section className="hero">
          <div style={{position:"absolute",top:"12%",left:"50%",transform:"translateX(-50%)",width:"90vw",height:"60vh",background:`radial-gradient(ellipse,${B.purple}14 0%,transparent 68%)`,pointerEvents:"none"}}/>
          <div className="wrap hero-content">
            <div style={{display:"inline-flex",flexDirection:"column",alignItems:"center",gap:6,padding:"10px 20px",borderRadius:14,border:`1px solid ${B.green}33`,background:`${B.green}0a`,marginBottom:24}}>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <div style={{width:7,height:7,borderRadius:"50%",background:B.green,boxShadow:`0 0 10px ${B.green}`,animation:"pulse-g 2s infinite"}}/>
                <span style={{fontSize:10,fontWeight:900,color:B.green,letterSpacing:".18em",textTransform:"uppercase",fontFamily:"Inter"}}>Live System Status: Active</span>
              </div>
              <span style={{fontSize:11,color:"rgba(255,255,255,.7)",fontFamily:"Inter",fontWeight:500,letterSpacing:".02em"}}>
                Monitoring 131 containers across 84 services — right now
              </span>
            </div>

            <div style={{fontSize:12,color:B.muted,fontFamily:"Inter",fontWeight:600,marginBottom:24,letterSpacing:".02em"}}>
              Analyzing infrastructure like yours · <span style={{color:B.purple}}>Kubernetes</span> · <span style={{color:B.blue}}>Cloud</span> · <span style={{color:B.teal}}>Hybrid</span> environments
            </div>

            <h1 className="hero-h1">
              Stop Fighting<br/>
              <Typewriter lines={["IT Fires.","Alert Fatigue.","Downtime.","Manual Work.","Audit Gaps."]}/>
              <br/>
              <span style={{background:`linear-gradient(135deg,${B.purple} 0%,${B.blue} 55%,${B.teal} 100%)`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>
                Start Preventing Them.
              </span>
            </h1>

            <p className="hero-sub">
              AI that automatically fixes production IT issues — and proves it to your auditors. Built for healthcare systems, MSPs, and enterprise IT teams.
            </p>

            <div style={{maxWidth:620,margin:"0 auto 30px"}}>
              <p style={{fontSize:"clamp(1rem,2vw,1.18rem)",color:"#fff",fontFamily:"Inter",fontWeight:700,lineHeight:1.5,letterSpacing:"-.01em",marginBottom:6}}>
                Right now, your system is waiting for a human to fix the next outage.
              </p>
              <p style={{fontSize:"clamp(.95rem,1.8vw,1.05rem)",color:B.muted,fontFamily:"Inter",fontWeight:500,lineHeight:1.5}}>
                That&apos;s the risk. <span style={{color:B.purple,fontWeight:800}}>We removed it.</span>
              </p>
            </div>

            <div style={{maxWidth:600,margin:"0 auto 28px",padding:"18px 24px",borderRadius:12,border:`1px solid ${B.green}33`,background:`${B.green}0c`,textAlign:"center"}}>
              <div style={{fontSize:14,fontWeight:700,color:"#fff",fontFamily:"Inter",lineHeight:1.6}}>
                Downtime costs <span style={{color:"#4ade80"}}>~$5,600 per minute</span>.
              </div>
              <div style={{fontSize:14,fontWeight:700,color:"#fff",fontFamily:"Inter",lineHeight:1.6}}>
                Most incidents take <span style={{color:"#4ade80"}}>45–90 minutes</span>.
              </div>
              <div style={{fontSize:14,fontWeight:800,color:"#4ade80",fontFamily:"Inter",lineHeight:1.6,marginTop:4}}>
                We resolve them in ~20 seconds.
              </div>
              <div style={{fontSize:12,color:B.muted,fontFamily:"Inter",marginTop:10,paddingTop:10,borderTop:"1px solid rgba(255,255,255,.06)",fontStyle:"italic",lineHeight:1.5}}>
                Every unresolved incident costs time, money, and trust.
              </div>
            </div>

            <div style={{maxWidth:600,margin:"0 auto 24px",textAlign:"center"}}>
              <div style={{fontSize:11,fontWeight:800,color:B.dim,letterSpacing:".14em",textTransform:"uppercase",fontFamily:"Inter",marginBottom:10}}>Built for</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:8,justifyContent:"center"}}>
                {[
                  "MSPs managing 100–10,000 endpoints",
                  "Enterprise IT teams under SLA pressure",
                  "Healthcare & regulated environments",
                ].map(t=>(
                  <span key={t} style={{padding:"6px 14px",borderRadius:100,border:`1px solid ${B.border}`,background:`${B.purple}0c`,fontSize:12,fontWeight:600,color:"rgba(255,255,255,.78)",fontFamily:"Inter"}}>{t}</span>
                ))}
              </div>
            </div>

            <div style={{maxWidth:600,margin:"0 auto 24px",padding:"14px 22px",borderRadius:12,border:`1px solid ${B.purple}33`,background:`${B.purple}0a`,textAlign:"center"}}>
              <div style={{fontSize:14,fontWeight:800,color:"#fff",fontFamily:"Inter",lineHeight:1.5,letterSpacing:"-.01em"}}>
                <span style={{color:B.purple}}>No rip and replace.</span> Works with your existing stack.
              </div>
              <div style={{fontSize:12,color:B.muted,fontFamily:"Inter",marginTop:4,lineHeight:1.5}}>
                Layers on top of ServiceNow, Jira, Splunk, Datadog, AWS, Azure — no migration required.
              </div>
            </div>

            <div style={{maxWidth:600,margin:"0 auto 18px",textAlign:"center"}}>
              <div style={{fontSize:14,fontWeight:800,color:"#fff",fontFamily:"Inter",letterSpacing:"-.01em"}}>
                Live in minutes. <span style={{color:B.teal}}>Value in the first incident.</span>
              </div>
            </div>

            <div style={{maxWidth:600,margin:"0 auto 18px",textAlign:"center"}}>
              <div style={{fontSize:12,color:B.muted,fontFamily:"Inter",fontWeight:600,letterSpacing:".06em",textTransform:"uppercase"}}>
                This is how modern IT teams operate.
              </div>
            </div>

            <div style={{maxWidth:600,margin:"0 auto 18px",textAlign:"center"}}>
              <div style={{fontSize:"clamp(1.05rem,2.2vw,1.35rem)",color:"#fff",fontFamily:"Inter",fontWeight:800,letterSpacing:"-.02em",lineHeight:1.4}}>
                If your infrastructure could fix itself — <span style={{color:B.purple}}>would you let it?</span>
              </div>
            </div>

            <div style={{maxWidth:600,margin:"0 auto 16px",textAlign:"center"}}>
              <div style={{fontSize:13,color:B.muted,fontFamily:"Inter",fontWeight:600,marginBottom:8}}>
                Want to see how your system behaves?
              </div>
              <a href="https://itechsmart.dev/pulse" target="_blank" style={{display:"inline-block",padding:"7px 18px",borderRadius:100,border:`1px solid ${B.purple}55`,background:`${B.purple}10`,color:B.purple,fontSize:12,fontWeight:800,fontFamily:"Inter",textDecoration:"none",letterSpacing:".02em"}}>
                ✓ Yes — Show Me
              </a>
            </div>

            <div style={{maxWidth:600,margin:"0 auto 16px",textAlign:"center"}}>
              <div style={{fontSize:13,color:"#4ade80",fontFamily:"Inter",fontWeight:700,letterSpacing:"-.01em"}}>
                See your first autonomous fix in minutes.
              </div>
              <div style={{fontSize:11,color:B.dim,fontFamily:"Inter",marginTop:4,letterSpacing:".02em"}}>
                No setup. No risk. Nothing to install.
              </div>
            </div>

            <div className="hero-ctas">
              <a href="https://itechsmart.dev/pulse" target="_blank" className="cta1 cta-g">Run Free Production Scan → See What YOUR Infrastructure Would Fix Automatically (No Setup • Results in Minutes)</a>
              <a href="https://docs.itechsmart.dev/demo" target="_blank" className="cta2">Watch Demo</a>
              <a href="https://itechsmart.dev/proof" target="_blank" className="cta2">View Live Proof →</a>
            </div>
            <div style={{fontSize:12,color:B.dim,fontFamily:"Inter",marginTop:10,marginBottom:20,letterSpacing:".02em"}}>
              No setup · No risk · Results in 2 minutes
            </div>
            <div style={{fontSize:12,color:B.muted,fontFamily:"Inter",marginBottom:14,fontStyle:"italic",lineHeight:1.6}}>
              Designed with NIST &amp; Zero Trust principles · SDVOSB · F6S #6 globally
            </div>
            <div style={{fontSize:11,color:"#f59e0b",fontFamily:"Inter",fontWeight:700,marginBottom:36,letterSpacing:".04em"}}>
              ⚠ Early access environments filling for enterprise pilots
            </div>

            <div className="stats-grid">
              {[["85%","MTTR reduction"],["30–70%","fewer tickets"],["SHA-256","proof on actions"],["#6","F6S globally"]].map(([v,l])=>(
                <div key={l} className="stat-card lift">
                  <div className="stat-val">{v}</div>
                  <div className="stat-lbl">{l}</div>
                </div>
              ))}
            </div>

            <div>
              <div style={{fontSize:10,fontWeight:800,letterSpacing:"0.18em",textTransform:"uppercase",color:B.dim,marginBottom:16,fontFamily:"Inter"}}>UAIO Autonomous Loop — Running Live</div>
              <UaioLoop/>
            </div>

            <div style={{marginTop:36,display:"flex",justifyContent:"center"}}>
              <LiveFeed/>
            </div>

            <div style={{marginTop:24,fontSize:12,color:B.dim,fontFamily:"Inter",letterSpacing:".06em",textTransform:"uppercase",fontWeight:700}}>
              See how it works ↓
            </div>
          </div>
        </section>

        {/* COUNTERS */}
        <section className="section" style={{background:`${B.purple}06`}}>
          <div className="wrap">
            <Reveal>
              <div className="counters-grid">
                <LiveCounter end={131}     suffix=""    label="Production containers"/>
                <LiveCounter end={20}      suffix="s"   label="Self-heal time"/>
                <LiveCounter end={88}      suffix="/88"  label="Prometheus targets UP"/>
                <LiveCounter end={96}      suffix="%"   label="NIST CSF score"/>
                <LiveCounter end={2000000} suffix="+"   label="AI startups ranked above (F6S #6)"/>
              </div>
            </Reveal>
          </div>
        </section>

        {/* CLOSED LOOP */}
        <section className="section">
          <div className="wrap">
            <Reveal>
              <div style={{textAlign:"center",marginBottom:36}}>
                <div className="eyebrow" style={{color:B.purple}}>♾ The Autonomous Loop</div>
                <h2 className="h2" style={{textAlign:"center"}}>A complete autonomous loop. <span style={{color:B.purple}}>No gaps. No handoffs.</span></h2>
                <p className="body-text" style={{maxWidth:600,margin:"16px auto 0",textAlign:"center"}}>
                  Every phase runs autonomously. Humans set policy — the loop handles execution.
                </p>
              </div>
            </Reveal>
            <Reveal delay={.1}>
              <div style={{padding:"32px 20px",borderRadius:18,border:`1px solid ${B.border}`,background:`${B.purple}05`,maxWidth:920,margin:"0 auto"}}>
                <UaioLoop/>
                <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:8,marginTop:24,fontSize:12,color:B.muted,fontFamily:"Inter"}}>
                  <span style={{color:"#4ade80",fontWeight:800}}>✓</span>
                  <span>Production-tested across real infrastructure scenarios</span>
                  <span style={{color:B.dim}}>·</span>
                  <span>Designed for NIST-aligned environments</span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* PROBLEM */}
        <section className="section">
          <div className="wrap">
            <div className="two-col">
              <Reveal>
                <div className="eyebrow" style={{color:B.red}}>⚠ The Problem</div>
                <h2 className="h2">IT Teams Aren't Failing.<br/><span style={{color:B.red}}>The System Is.</span></h2>
                <p className="body-text" style={{marginBottom:24}}>Alerts everywhere. Tickets piling up. Engineers guessing under pressure. No defensible proof of what actually happened.</p>
                <p style={{fontSize:17,fontWeight:800,color:"#fff",fontFamily:"Inter",letterSpacing:"-0.02em"}}>
                  You don't have a people problem.<br/>You have an <span style={{color:B.purple}}>operations problem.</span>
                </p>
              </Reveal>
              <div className="problem-cards">
                {[["🔔","Alert fatigue killing productivity","Thousands of alerts daily. Most are noise."],["🔁","Repeat tickets draining your team","Same issues. Different tickets. Every week."],["🔍","Slow root cause during incidents","30–90 min mean time to understand. Too long."],["❓","No proof of what happened","Auditors ask. You can't answer definitively."]].map(([icon,title,desc],i)=>(
                  <Reveal key={title} delay={i*.09}>
                    <div className="card lift" style={{border:`1px solid rgba(255,64,77,.2)`,background:"rgba(255,64,77,.04)",display:"flex",gap:14,alignItems:"flex-start"}}>
                      <span style={{fontSize:20,flexShrink:0}}>{icon}</span>
                      <div>
                        <div style={{fontWeight:700,fontSize:14,color:"#fff",fontFamily:"Inter",marginBottom:3}}>{title}</div>
                        <div style={{fontSize:13,color:B.dim,fontFamily:"Inter"}}>{desc}</div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SOLUTION */}
        <section className="section" style={{background:`${B.purple}04`}}>
          <div className="wrap">
            <Reveal>
              <div style={{textAlign:"center",marginBottom:48}}>
                <div className="eyebrow" style={{color:B.purple}}>⚡ The Solution</div>
                <h2 className="h2" style={{textAlign:"center"}}>Meet Autonomous IT Operations</h2>
                <p className="body-text" style={{maxWidth:560,margin:"0 auto"}}>The only platform that closes the full loop — detect, simulate, decide, fix, and prove — without a human in the loop.</p>
              </div>
            </Reveal>
            <div className="steps-grid">
              {[
                {n:"01",icon:"📡",t:"Detect",   d:"Real-time signals from servers, containers, and endpoints.",c:B.blue},
                {n:"02",icon:"🌐",t:"Simulate", d:"Digital Twin models the fix before anything executes.",c:B.purple},
                {n:"03",icon:"🧠",t:"Decide",   d:"AI reasons root cause with full explainability.",c:"#a855f7"},
                {n:"04",icon:"⚡",t:"Fix",      d:"Autonomous remediation across any endpoint.",c:B.teal},
                {n:"05",icon:"🔐",t:"Prove",    d:"SHA-256 ProofLink receipt. Tamper-evident.",c:B.green},
              ].map((s,i)=>(
                <Reveal key={s.t} delay={i*.07}>
                  <div className="card lift" style={{border:`1px solid ${s.c}22`,background:`${s.c}06`,height:"100%",position:"relative",overflow:"hidden"}}>
                    <div style={{position:"absolute",top:-10,right:-4,fontSize:52,opacity:.05,fontWeight:900,color:s.c,fontFamily:"Inter"}}>{s.n}</div>
                    <div style={{fontSize:24,marginBottom:12}}>{s.icon}</div>
                    <div style={{fontSize:9,fontWeight:800,letterSpacing:"0.13em",textTransform:"uppercase",color:s.c,marginBottom:8,fontFamily:"Inter"}}>{s.n} · {s.t}</div>
                    <div style={{fontSize:13,color:B.muted,lineHeight:1.6,fontFamily:"Inter"}}>{s.d}</div>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal>
              <div style={{textAlign:"center",fontSize:18,fontWeight:900,color:"#fff",fontFamily:"Inter",letterSpacing:"-0.02em",marginTop:8}}>
                Not just automation.{" "}
                <span style={{background:`linear-gradient(90deg,${B.purple},${B.blue})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>Accountable automation.</span>
              </div>
            </Reveal>
          </div>
        </section>

        {/* PROOF */}
        <section className="section">
          <div className="wrap">
            <div style={{textAlign:"center",marginBottom:32,fontSize:12,color:B.dim,fontFamily:"Inter",letterSpacing:".06em",textTransform:"uppercase",fontWeight:700}}>
              Watch the fix happen ↓
            </div>
            <div className="two-col">
              <Reveal>
                <div className="eyebrow" style={{color:B.green}}>🔐 Cryptographic Proof</div>
                <h2 className="h2">Don't Trust AI.<br/><span style={{color:"#4ade80"}}>Verify It.</span></h2>
                <p className="body-text" style={{marginBottom:20}}>Every action generates a SHA-256 tamper-proof receipt. Prove to any auditor what happened, why, and what was done — with a public verify URL.</p>
                <div style={{padding:"14px 16px",borderRadius:12,border:"1px solid rgba(34,197,94,.2)",background:"rgba(34,197,94,.06)",marginBottom:16}}>
                  <div style={{fontSize:11,color:B.green,fontWeight:800,marginBottom:4,fontFamily:"Inter"}}>PROVEN LIVE — April 5 2026</div>
                  <div style={{fontSize:14,color:"#fff",fontFamily:"Inter",fontWeight:600,lineHeight:1.5}}>suite-itsm killed → detected 10s → recovered 20s → zero human input</div>
                </div>
                <div style={{padding:"14px 16px",borderRadius:12,border:"1px solid rgba(255,255,255,.08)",background:"rgba(255,255,255,.03)",marginBottom:16}}>
                  <div style={{fontSize:14,color:"#fff",fontFamily:"Inter",fontWeight:600,lineHeight:1.55}}>That 20 seconds isn&apos;t just fast.</div>
                  <div style={{fontSize:13,color:B.muted,fontFamily:"Inter",lineHeight:1.6,marginTop:4}}>It&apos;s the difference between a minor event and a major outage.</div>
                </div>
                <p style={{fontSize:13,color:B.dim,fontFamily:"Inter",fontStyle:"italic",marginBottom:20,lineHeight:1.6}}>This is what auditors, security teams, and executives rely on.</p>
                <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
                  <a href="https://verify.itechsmart.dev" target="_blank" className="cta-g" style={{padding:"11px 20px",borderRadius:10,background:"rgba(34,197,94,.12)",border:"1px solid rgba(34,197,94,.35)",color:"#4ade80",fontWeight:700,fontSize:14,textDecoration:"none",fontFamily:"Inter"}}>Verify a Receipt →</a>
                  <a href="https://proof-library.itechsmart.dev" target="_blank" className="cta2" style={{padding:"11px 18px",fontSize:14}}>View Proof Library →</a>
                  <a href="https://whitepaper.itechsmart.dev" target="_blank" className="cta2" style={{padding:"11px 18px",fontSize:14}}>Read the Architecture Whitepaper →</a>
                </div>
              </Reveal>
              <ProofWidget/>
            </div>
          </div>
        </section>

        {/* BEFORE / AFTER TRANSFORMATION */}
        <section className="section">
          <div className="wrap">
            <div style={{textAlign:"center",marginBottom:32,display:"flex",justifyContent:"center"}}>
              <LiveFeed/>
            </div>
            <Reveal>
              <div style={{textAlign:"center",marginBottom:44}}>
                <div className="eyebrow" style={{color:B.purple}}>⚡ The Hard Contrast</div>
                <h2 className="h2" style={{textAlign:"center"}}>Traditional IT Ops vs iTechSmart UAIO</h2>
              </div>
            </Reveal>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:24,maxWidth:880,margin:"0 auto"}} className="ba-grid">
              <Reveal>
                <div style={{padding:"28px 26px",borderRadius:18,border:"1px solid rgba(255,64,77,.22)",background:"rgba(255,64,77,.05)",height:"100%"}}>
                  <div style={{fontSize:11,fontWeight:800,color:B.red,letterSpacing:".14em",textTransform:"uppercase",fontFamily:"Inter",marginBottom:18}}>🚫 Traditional IT Ops</div>
                  {[
                    ["47","alerts firing"],
                    ["2","engineers paged"],
                    ["90 min","mean time to resolve"],
                    ["—","no clear root cause"],
                    ["—","no audit trail"],
                  ].map(([v,l])=>(
                    <div key={l} style={{display:"flex",alignItems:"baseline",gap:14,padding:"10px 0",borderBottom:"1px solid rgba(255,64,77,.1)"}}>
                      <span style={{fontSize:22,fontWeight:900,color:B.red,fontFamily:"Inter",minWidth:80,letterSpacing:"-.02em"}}>{v}</span>
                      <span style={{fontSize:13,color:B.muted,fontFamily:"Inter"}}>{l}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={.1}>
                <div style={{padding:"28px 26px",borderRadius:18,border:`1px solid ${B.green}3a`,background:`${B.green}08`,height:"100%",position:"relative",overflow:"hidden"}}>
                  <div style={{position:"absolute",top:0,right:0,padding:"4px 12px",borderRadius:"0 18px 0 12px",background:B.green,color:"#05050f",fontSize:9,fontWeight:900,letterSpacing:".12em",fontFamily:"Inter"}}>AUTONOMOUS</div>
                  <div style={{fontSize:11,fontWeight:800,color:"#4ade80",letterSpacing:".14em",textTransform:"uppercase",fontFamily:"Inter",marginBottom:18}}>⚡ iTechSmart UAIO</div>
                  {[
                    ["1","alert (deduplicated)"],
                    ["0","engineers paged"],
                    ["20 sec","mean time to resolve"],
                    ["✓","root cause reasoned"],
                    ["✓","ProofLink receipt"],
                  ].map(([v,l])=>(
                    <div key={l} style={{display:"flex",alignItems:"baseline",gap:14,padding:"10px 0",borderBottom:`1px solid ${B.green}1a`}}>
                      <span style={{fontSize:22,fontWeight:900,color:"#4ade80",fontFamily:"Inter",minWidth:80,letterSpacing:"-.02em"}}>{v}</span>
                      <span style={{fontSize:13,color:B.muted,fontFamily:"Inter"}}>{l}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
            <Reveal>
              <div style={{textAlign:"center",fontSize:15,fontWeight:700,color:"#fff",fontFamily:"Inter",marginTop:32,letterSpacing:"-.01em"}}>
                Same incident. <span style={{color:B.purple}}>Different outcome.</span>
              </div>
              <div style={{textAlign:"center",fontSize:14,color:B.muted,fontFamily:"Inter",marginTop:12,maxWidth:600,marginLeft:"auto",marginRight:"auto",lineHeight:1.55}}>
                Doing nothing means your next outage still depends on <span style={{color:B.red,fontWeight:700}}>someone waking up.</span>
              </div>
            </Reveal>
          </div>
        </section>

        {/* FORCING FUNCTION */}
        <section className="section" style={{background:`linear-gradient(180deg,transparent,${B.purple}0e,transparent)`,paddingTop:60,paddingBottom:60}}>
          <div className="wrap" style={{textAlign:"center"}}>
            <Reveal>
              <h2 className="h2" style={{fontSize:"clamp(1.6rem,4vw,2.6rem)",margin:"0 0 24px"}}>
                Run this on your environment in under <span style={{color:B.purple}}>60 seconds.</span>
              </h2>
              <a href="https://itechsmart.dev/pulse" target="_blank" className="cta1 cta-g" style={{padding:"20px 40px",fontSize:15,letterSpacing:"-.01em",lineHeight:1.4,maxWidth:600}}>
                Run Free Production Scan → See What YOUR Infrastructure Would Fix Automatically (No Setup • Results in Minutes)
              </a>
              <div style={{fontSize:12,color:B.dim,fontFamily:"Inter",marginTop:14,letterSpacing:".02em"}}>
                No setup · No risk · Results in 2 minutes
              </div>
            </Reveal>
          </div>
        </section>

        {/* PULSE */}
        <section className="section" style={{background:`${B.purple}06`}}>
          <div className="wrap">
            <Reveal>
              <div className="pulse-block">
                <div className="pulse-left">
                  <div className="eyebrow" style={{color:B.purple}}>⚡ Live Demo</div>
                  <h2 className="h2" style={{fontSize:"clamp(1.6rem,3.5vw,2.6rem)"}}>See It Work — Right Now</h2>
                  <p className="body-text">Run a free Pulse scan. Issues detected, root cause reasoned, and a cryptographic receipt generated in under 2 minutes.</p>
                </div>
                <div className="pulse-right">
                  {["Real infrastructure scan","AI root cause reasoning","ProofLink receipt generated","No credit card required"].map(item=>(
                    <div key={item} className="pulse-check">
                      <span style={{color:B.green,fontSize:16,fontWeight:700,flexShrink:0}}>✓</span> {item}
                    </div>
                  ))}
                  <a href="https://itechsmart.dev/pulse" target="_blank" className="cta1 cta-g" style={{marginTop:8,textAlign:"center"}}>Try Pulse Free →</a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* WHO IT'S FOR */}
        <section className="section">
          <div className="wrap">
            <Reveal>
              <div style={{textAlign:"center",marginBottom:44}}>
                <div className="eyebrow" style={{color:B.purple}}>🏢 The Shift Is Already Happening</div>
                <h2 className="h2" style={{textAlign:"center"}}>Who is already moving to this model</h2>
              </div>
            </Reveal>
            <div className="who-grid">
              {[
                {icon:"🏢",t:"MSPs",       c:B.blue,   d:"Monitor and auto-remediate across every client. ProofLink receipts per client SLA.", bs:["Multi-tenant","Per-client ledger","Auto-escalation"]},
                {icon:"🏭",t:"Enterprise", c:B.purple, d:"Eliminate alert fatigue. 85% MTTR reduction. Full autonomous loop across all endpoints.", bs:["WinRM remediation","131 containers","Grafana dashboards"]},
                {icon:"🏥",t:"Healthcare", c:B.teal,   d:"HL7 interface monitoring. HIPAA-aligned audit. Auto-tickets on interface failure.", bs:["HL7 Pro","HIPAA 89%","INC auto-creation"]},
                {icon:"🏛",t:"Government", c:"#f59e0b", d:"SDVOSB-certified. Air-gap capable. NIST 96%, FIPS 100%, FedRAMP pathway active.", bs:["CAGE 172W2","UEI ZCPFX4N86G36","Citadel product"]},
              ].map((item,i)=>(
                <Reveal key={item.t} delay={i*.09}>
                  <div className="card lift" style={{border:`1px solid ${item.c}22`,background:`${item.c}06`,height:"100%"}}>
                    <div style={{fontSize:34,marginBottom:14}}>{item.icon}</div>
                    <div style={{fontSize:16,fontWeight:900,color:"#fff",marginBottom:10,fontFamily:"Inter"}}>{item.t}</div>
                    <p style={{fontSize:13,color:B.muted,lineHeight:1.65,marginBottom:16,fontFamily:"Inter"}}>{item.d}</p>
                    <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
                      {item.bs.map(b=><span key={b} style={{padding:"3px 9px",borderRadius:100,border:`1px solid ${item.c}33`,background:`${item.c}10`,fontSize:11,fontWeight:700,color:item.c,fontFamily:"Inter"}}>{b}</span>)}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* OUTCOMES */}
        <section className="section" style={{background:`${B.purple}04`}}>
          <div className="wrap">
            <Reveal>
              <div style={{textAlign:"center",marginBottom:44}}>
                <div className="eyebrow" style={{color:B.purple}}>💰 Outcomes</div>
                <h2 className="h2" style={{textAlign:"center"}}>What Happens When IT Runs Itself?</h2>
              </div>
            </Reveal>
            <div className="outcomes-grid">
              {[["⚡","Faster resolution","Hours → seconds"],["🎫","Fewer tickets","30–70% reduction"],["😌","Less burnout","AI handles first response"],["📋","Audit-ready","Every action receipted"],["💵","Reduced costs","85% MTTR improvement"]].map(([icon,t,sub],i)=>(
                <Reveal key={t} delay={i*.08}>
                  <div className="card lift" style={{textAlign:"center"}}>
                    <div style={{fontSize:28,marginBottom:12}}>{icon}</div>
                    <div style={{fontSize:13,fontWeight:800,color:"#fff",fontFamily:"Inter",marginBottom:5}}>{t}</div>
                    <div style={{fontSize:12,color:B.dim,fontFamily:"Inter"}}>{sub}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="section" style={{position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse 80% 100% at 50% 100%,${B.purple}1e 0%,transparent 68%)`,pointerEvents:"none"}}/>
          <div className="wrap" style={{textAlign:"center",position:"relative",zIndex:1}}>
            <Reveal>
              <div style={{display:"inline-block",padding:"5px 18px",borderRadius:100,border:`1px solid ${B.border}`,background:`${B.purple}0e`,marginBottom:28,fontSize:10,fontWeight:800,color:"rgba(255,255,255,.55)",letterSpacing:"0.14em",textTransform:"uppercase",fontFamily:"Inter"}}>
                SDVOSB · Veteran-Owned · Irvine CA · F6S #6 Globally
              </div>
              <h2 className="h2" style={{fontSize:"clamp(2rem,6vw,4.8rem)",textAlign:"center",margin:"0 0 20px"}}>
                You Don't Need More Tools.<br/>
                <span style={{background:`linear-gradient(135deg,${B.purple} 0%,${B.blue} 50%,${B.teal} 100%)`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>
                  You Need a System That Works.
                </span>
              </h2>
              <p className="body-text" style={{maxWidth:500,margin:"0 auto 44px",fontSize:17}}>
                Try iTechSmart free or book a live walkthrough. See autonomous IT operations. Verify the proof yourself.
              </p>
              <div className="hero-ctas">
                <a href="https://itechsmart.dev/start" target="_blank" className="cta1 cta-g" style={{fontSize:17,padding:"18px 48px"}}>Start Here →</a>
                <a href="https://itechsmart.dev/pulse" target="_blank" className="cta2" style={{fontSize:17,padding:"18px 36px"}}>Run Free Scan</a>
                <a href="https://docs.itechsmart.dev/demo" target="_blank" className="cta2" style={{fontSize:17,padding:"18px 36px"}}>Watch Demo</a>
                <a href="https://whitepaper.itechsmart.dev" target="_blank" className="cta2" style={{fontSize:17,padding:"18px 32px"}}>Download Whitepaper</a>
              </div>
              <div style={{marginTop:64,paddingTop:48,borderTop:`1px solid ${B.border}`}}>
                <p style={{fontSize:"clamp(1.3rem,3vw,2rem)",fontWeight:800,color:"#fff",fontFamily:"Inter",lineHeight:1.35,letterSpacing:"-.02em",maxWidth:720,margin:"0 auto"}}>
                  The question is no longer <span style={{color:B.muted,fontWeight:600}}>if</span> infrastructure can run itself.
                </p>
                <p style={{fontSize:"clamp(1.3rem,3vw,2rem)",fontWeight:800,fontFamily:"Inter",lineHeight:1.35,letterSpacing:"-.02em",maxWidth:720,margin:"16px auto 0",background:`linear-gradient(135deg,${B.purple} 0%,${B.blue} 60%,${B.teal} 100%)`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>
                  The question is why yours doesn&apos;t.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="footer">
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <img src="/itechsmart_icon.png" alt="iTechSmart" width="22" height="22" style={{filter:"drop-shadow(0 0 4px #9933ff66)"}}/>
            <span style={{fontWeight:800,fontSize:14,color:"#fff",fontFamily:"Inter"}}>iTechSmart Inc.</span>
            <span style={{fontSize:12,color:B.dim,fontFamily:"Inter"}}>SDVOSB · Irvine, CA</span>
          </div>
          <div className="footer-links">
            {[["Platform","https://itechsmart.dev"],["Whitepaper","https://itechsmart.dev/whitepaper"],["Verify Proof","https://verify.itechsmart.dev"],["UAIO Category","https://uaio.itechsmart.dev"],["Docs","https://docs.itechsmart.dev"]].map(([l,h])=>(
              <a key={l} href={h} target="_blank" style={{fontSize:13,color:B.dim,textDecoration:"none",fontWeight:500,fontFamily:"Inter"}}>{l}</a>
            ))}
          </div>
          <div style={{fontSize:12,color:"rgba(255,255,255,.18)",fontFamily:"Inter"}}>© 2026 iTechSmart Inc.</div>
        </footer>
      </main>
    </>
  );
}
