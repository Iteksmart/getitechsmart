"use client";
import { useEffect, useRef, useState } from "react";

/* ─── EXACT ITECHSMART BRAND (from Figma S3agmqaO2wxtH6NP7Wbjzq) ──────
   Font:   Inter Extra Bold / Bold / Semi Bold / Regular
   Purple: #9933ff  ·  Blue: #3366ff  ·  Red: #ff404d
   Bg:     #05050f  ·  Teal: #0ff4c6
   ──────────────────────────────────────────────────────────────────────*/

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
      <div style={{fontSize:"clamp(2.2rem,4.5vw,3.4rem)",fontWeight:900,color:B.purple,fontFamily:"Inter",letterSpacing:"-0.045em",lineHeight:1}}>
        {n>=1000000?(n/1000000).toFixed(1)+"M":n.toLocaleString()}{suffix}
      </div>
      <div style={{fontSize:12,color:B.dim,marginTop:6,fontWeight:600,fontFamily:"Inter",letterSpacing:"0.02em"}}>{label}</div>
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
      <span style={{display:"inline-block",width:4,background:B.purple,marginLeft:3,verticalAlign:"middle",height:"0.85em",animation:"blink 1s step-end infinite"}}/>
    </span>
  );
}

function UaioLoop() {
  const [a,setA]=useState(0);
  useEffect(()=>{ const t=setInterval(()=>setA(x=>(x+1)%5),1100); return()=>clearInterval(t); },[]);
  const steps=[
    {icon:"📡",label:"DETECT",   color:B.blue},
    {icon:"🌐",label:"SIMULATE", color:B.purple},
    {icon:"🧠",label:"DECIDE",   color:"#a855f7"},
    {icon:"⚡",label:"FIX",      color:B.teal},
    {icon:"🔐",label:"PROVE",    color:B.green},
  ];
  return(
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:0,overflowX:"auto",padding:"4px 0"}}>
      {steps.map((s,i)=>(
        <div key={s.label} style={{display:"flex",alignItems:"center"}}>
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:8,padding:"14px 18px",borderRadius:14,border:`1px solid ${a===i?s.color:"rgba(255,255,255,0.07)"}`,background:a===i?`${s.color}18`:"rgba(255,255,255,0.02)",transition:"all 0.45s ease",boxShadow:a===i?`0 0 28px ${s.color}33`:"none",minWidth:84}}>
            <span style={{fontSize:22}}>{s.icon}</span>
            <span style={{fontSize:9,fontWeight:800,letterSpacing:"0.13em",color:a===i?s.color:B.dim,fontFamily:"Inter"}}>{s.label}</span>
          </div>
          {i<4&&<div style={{width:28,height:2,background:a>i?B.purple:"rgba(255,255,255,0.07)",transition:"background 0.45s",flexShrink:0}}/>}
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

function Reveal({children,delay=0}:{children:React.ReactNode;delay?:number}) {
  const [v,setV]=useState(false); const ref=useRef<HTMLDivElement>(null);
  useEffect(()=>{ const o=new IntersectionObserver(([e])=>{if(e.isIntersecting)setV(true)},{threshold:0.08}); if(ref.current)o.observe(ref.current); return()=>o.disconnect(); },[]);
  return(<div ref={ref} style={{transform:v?"translateY(0)":"translateY(28px)",opacity:v?1:0,transition:`all 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`}}>{children}</div>);
}

export default function Page() {
  const cvs=useRef<HTMLCanvasElement>(null);
  const [sy,setSy]=useState(0);

  useEffect(()=>{
    const c=cvs.current; if(!c)return;
    const ctx=c.getContext("2d"); if(!ctx)return;
    const resize=()=>{c.width=window.innerWidth;c.height=window.innerHeight;};
    resize(); window.addEventListener("resize",resize);
    const nodes=Array.from({length:90},()=>({x:Math.random()*c.width,y:Math.random()*c.height,vx:(Math.random()-.5)*.32,vy:(Math.random()-.5)*.32,r:Math.random()*1.6+.4,p:Math.random()*Math.PI*2}));
    let raf:number;
    const draw=()=>{
      ctx.clearRect(0,0,c.width,c.height);
      nodes.forEach(n=>{n.x=(n.x+n.vx+c.width)%c.width;n.y=(n.y+n.vy+c.height)%c.height;n.p+=.018;});
      for(let i=0;i<nodes.length;i++)for(let j=i+1;j<nodes.length;j++){
        const dx=nodes[i].x-nodes[j].x,dy=nodes[i].y-nodes[j].y,d=Math.hypot(dx,dy);
        if(d<145){const a=(1-d/145)*.11;const g=ctx.createLinearGradient(nodes[i].x,nodes[i].y,nodes[j].x,nodes[j].y);g.addColorStop(0,`rgba(153,51,255,${a})`);g.addColorStop(1,`rgba(51,102,255,${a})`);ctx.beginPath();ctx.strokeStyle=g;ctx.lineWidth=.65;ctx.moveTo(nodes[i].x,nodes[i].y);ctx.lineTo(nodes[j].x,nodes[j].y);ctx.stroke();}
      }
      nodes.forEach(n=>{const p=Math.sin(n.p)*.4+1;ctx.beginPath();ctx.arc(n.x,n.y,n.r*p,0,Math.PI*2);ctx.fillStyle="rgba(153,51,255,0.55)";ctx.fill();});
      raf=requestAnimationFrame(draw);
    };
    draw();
    return()=>{cancelAnimationFrame(raf);window.removeEventListener("resize",resize);};
  },[]);

  useEffect(()=>{ const h=()=>setSy(window.scrollY); window.addEventListener("scroll",h,{passive:true}); return()=>window.removeEventListener("scroll",h); },[]);

  const sec:React.CSSProperties={padding:"100px 24px",borderTop:`1px solid ${B.border}`};
  const wrap:React.CSSProperties={maxWidth:1160,margin:"0 auto"};
  const eye:React.CSSProperties={fontSize:10,fontWeight:800,letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:20,fontFamily:"Inter"};
  const h2:React.CSSProperties={fontSize:"clamp(2rem,4.5vw,3.5rem)",fontWeight:900,letterSpacing:"-0.038em",color:B.text,margin:"0 0 20px",fontFamily:"Inter",lineHeight:1.07};
  const body:React.CSSProperties={fontSize:17,color:B.muted,lineHeight:1.72,fontFamily:"Inter"};
  const card:React.CSSProperties={padding:"26px 22px",borderRadius:18,border:`1px solid ${B.border}`,background:B.surface,fontFamily:"Inter"};
  const cta1:React.CSSProperties={padding:"16px 40px",borderRadius:12,background:`linear-gradient(135deg,${B.purple},${B.blue})`,color:"#fff",fontSize:16,fontWeight:800,textDecoration:"none",display:"inline-block",boxShadow:`0 0 52px ${B.purple}44`,fontFamily:"Inter",letterSpacing:"-0.01em",transition:"all 0.2s"};
  const cta2:React.CSSProperties={padding:"16px 36px",borderRadius:12,border:`1px solid ${B.border}`,color:"rgba(255,255,255,0.72)",fontSize:16,fontWeight:600,textDecoration:"none",display:"inline-block",fontFamily:"Inter",transition:"all 0.2s"};

  return(
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        body{background:${B.bg};color:${B.text};font-family:Inter,sans-serif;overflow-x:hidden}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes pulse-g{0%,100%{box-shadow:0 0 10px #22c55e}50%{box-shadow:0 0 22px #22c55e,0 0 44px #22c55e44}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
        @keyframes scanline{0%{transform:translateY(-100%)}100%{transform:translateY(100vh)}}
        @keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
        .lift{transition:transform .3s ease,box-shadow .3s ease}.lift:hover{transform:translateY(-5px);box-shadow:0 20px 56px rgba(153,51,255,.22)}
        .cta-g:hover{transform:scale(1.03);box-shadow:0 0 80px ${B.purple}66!important}
        ::-webkit-scrollbar{width:3px;background:transparent}::-webkit-scrollbar-thumb{background:${B.purple}44;border-radius:4px}
      `}</style>

      {/* Neural BG */}
      <canvas ref={cvs} style={{position:"fixed",inset:0,zIndex:0,opacity:.48,pointerEvents:"none"}}/>

      {/* Scanline */}
      <div style={{position:"fixed",inset:0,zIndex:0,pointerEvents:"none",overflow:"hidden",opacity:.025}}>
        <div style={{position:"absolute",top:0,left:0,right:0,height:180,background:"linear-gradient(transparent,rgba(153,51,255,.9),transparent)",animation:"scanline 9s linear infinite"}}/>
      </div>

      <main style={{position:"relative",zIndex:1}}>

        {/* NAV */}
        <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:200,height:64,borderBottom:`1px solid ${B.border}`,background:"rgba(5,5,15,.9)",backdropFilter:"blur(18px)",display:"flex",alignItems:"center",padding:"0 32px",justifyContent:"space-between"}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <img src="/itechsmart_icon.png" alt="iTechSmart" width="30" height="30" style={{filter:"drop-shadow(0 0 6px #9933ff88)",animation:"float 4s ease-in-out infinite"}}/>
            <span style={{fontWeight:900,fontSize:16,color:"#fff",letterSpacing:"-0.03em",fontFamily:"Inter"}}>iTechSmart</span>
          </div>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            <a href="https://itechsmart.dev" target="_blank" style={{padding:"7px 16px",borderRadius:8,border:`1px solid ${B.border}`,color:B.muted,fontSize:13,fontWeight:600,textDecoration:"none",fontFamily:"Inter"}}>Platform</a>
            <a href="https://itechsmart.dev/whitepaper" target="_blank" style={{padding:"7px 16px",borderRadius:8,color:B.dim,fontSize:13,fontWeight:600,textDecoration:"none",fontFamily:"Inter"}}>Whitepaper</a>
            <a href="https://pulse.itechsmart.dev" target="_blank" className="cta-g" style={{...cta1,padding:"8px 20px",fontSize:13,boxShadow:`0 0 24px ${B.purple}44`}}>Try Free →</a>
          </div>
        </nav>

        {/* HERO */}
        <section style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",paddingTop:64,position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",top:"12%",left:"50%",transform:"translateX(-50%)",width:"90vw",height:"65vh",background:`radial-gradient(ellipse,${B.purple}15 0%,transparent 68%)`,pointerEvents:"none"}}/>
          <div style={{position:"absolute",top:"35%",right:"6%",width:300,height:300,borderRadius:"50%",background:`radial-gradient(circle,${B.blue}10,transparent 70%)`,transform:`translateY(${sy*.12}px)`,transition:"transform .1s",animation:"float 7s ease-in-out infinite",pointerEvents:"none"}}/>
          <div style={{position:"absolute",bottom:"20%",left:"4%",width:200,height:200,borderRadius:"50%",background:`radial-gradient(circle,${B.teal}08,transparent 70%)`,animation:"float 9s ease-in-out infinite .5s",pointerEvents:"none"}}/>

          <div style={{...wrap,textAlign:"center",padding:"60px 24px"}}>
            {/* Live status badge */}
            <div style={{display:"inline-flex",alignItems:"center",gap:10,padding:"8px 20px",borderRadius:100,border:`1px solid ${B.border}`,background:`${B.purple}0e`,marginBottom:40}}>
              <div style={{width:7,height:7,borderRadius:"50%",background:B.green,boxShadow:`0 0 9px ${B.green}`,animation:"pulse-g 2s infinite"}}/>
              <span style={{fontSize:11,fontWeight:800,color:"rgba(255,255,255,.65)",letterSpacing:"0.13em",textTransform:"uppercase",fontFamily:"Inter"}}>
                131 containers live · 20s self-heal · zero human intervention
              </span>
            </div>

            <h1 style={{fontSize:"clamp(3rem,8.5vw,7.5rem)",fontWeight:900,lineHeight:.97,letterSpacing:"-0.05em",color:"#fff",fontFamily:"Inter",margin:"0 0 32px"}}>
              Stop Fighting<br/>
              <Typewriter lines={["IT Fires.","Alert Fatigue.","Downtime.","Manual Work.","Audit Gaps."]}/>
              <br/>
              <span style={{background:`linear-gradient(135deg,${B.purple} 0%,${B.blue} 55%,${B.teal} 100%)`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>
                Start Preventing Them.
              </span>
            </h1>

            <p style={{...body,fontSize:"clamp(1.05rem,2.2vw,1.3rem)",maxWidth:620,margin:"0 auto 52px",color:"rgba(255,255,255,.6)"}}>
              iTechSmart uses <strong style={{color:"#fff",fontWeight:800}}>Nemotron 49B AI</strong> to detect, simulate, fix, and cryptographically prove IT issues — automatically, before they touch your business.
            </p>

            <div style={{display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap",marginBottom:64}}>
              <a href="https://pulse.itechsmart.dev" target="_blank" className="cta-g" style={cta1}>
                👉 Try It Free — 2 Min Setup
              </a>
              <a href="https://itechsmart.dev/contact" target="_blank" style={cta2}>Book a Live Demo</a>
            </div>

            {/* Stats strip */}
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:14,maxWidth:740,margin:"0 auto 72px"}}>
              {[["85%","MTTR reduction"],["30–70%","fewer tickets"],["SHA-256","proof on every action"],["#6","of 2M+ AI startups · F6S"]].map(([v,l])=>(
                <div key={l} className="lift" style={{padding:"14px 16px",borderRadius:12,border:`1px solid ${B.border}`,background:`${B.purple}07`,textAlign:"center"}}>
                  <div style={{fontSize:20,fontWeight:900,color:B.purple,fontFamily:"Inter",letterSpacing:"-0.03em"}}>{v}</div>
                  <div style={{fontSize:11,color:B.dim,marginTop:4,fontWeight:500,fontFamily:"Inter"}}>{l}</div>
                </div>
              ))}
            </div>

            {/* Animated loop */}
            <div style={{maxWidth:680,margin:"0 auto"}}>
              <div style={{fontSize:10,fontWeight:800,letterSpacing:"0.18em",textTransform:"uppercase",color:B.dim,marginBottom:20,fontFamily:"Inter"}}>UAIO Autonomous Loop — Running Live</div>
              <UaioLoop/>
            </div>
          </div>
        </section>

        {/* COUNTERS */}
        <section style={{...sec,background:`${B.purple}06`}}>
          <div style={wrap}>
            <Reveal>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:40}}>
                <LiveCounter end={131}     suffix=""    label="Production containers"/>
                <LiveCounter end={20}      suffix="s"   label="Mean time to self-heal"/>
                <LiveCounter end={88}      suffix="/88"  label="Prometheus targets UP"/>
                <LiveCounter end={96}      suffix="%"   label="NIST CSF score"/>
                <LiveCounter end={2000000} suffix="+"   label="AI startups ranked above (F6S #6)"/>
              </div>
            </Reveal>
          </div>
        </section>

        {/* PROBLEM */}
        <section style={sec}>
          <div style={wrap}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:64,alignItems:"center"}}>
              <Reveal>
                <div style={{...eye,color:B.red}}>⚠ The Problem</div>
                <h2 style={h2}>IT Teams Aren't Failing.<br/><span style={{color:B.red}}>The System Is.</span></h2>
                <p style={{...body,marginBottom:24}}>Alerts everywhere. Tickets piling up. Engineers guessing under pressure. No defensible proof of what actually happened.</p>
                <p style={{fontSize:18,fontWeight:800,color:"#fff",fontFamily:"Inter",letterSpacing:"-0.02em"}}>You don't have a people problem.<br/>You have an <span style={{color:B.purple}}>operations problem.</span></p>
              </Reveal>
              <div style={{display:"grid",gap:12}}>
                {[["🔔","Alert fatigue killing productivity","Thousands of alerts daily. Most are noise. Engineers are desensitized."],["🔁","Repeat tickets draining your team","Same issues. Different tickets. Every week. Forever."],["🔍","Slow root cause during live incidents","Mean time to understand: 30–90 minutes. Your users can't wait."],["❓","No proof of what actually happened","Auditors ask. You can't answer definitively. That's a compliance gap."]].map(([icon,title,desc],i)=>(
                  <Reveal key={title} delay={i*.09}>
                    <div className="lift" style={{...card,border:`1px solid rgba(255,64,77,.2)`,background:"rgba(255,64,77,.04)",display:"flex",gap:16,alignItems:"flex-start"}}>
                      <span style={{fontSize:22,flexShrink:0}}>{icon}</span>
                      <div>
                        <div style={{fontWeight:700,fontSize:15,color:"#fff",fontFamily:"Inter",marginBottom:4}}>{title}</div>
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
        <section style={{...sec,background:`${B.purple}04`}}>
          <div style={wrap}>
            <Reveal><div style={{textAlign:"center",marginBottom:60}}>
              <div style={{...eye,color:B.purple}}>⚡ The Solution</div>
              <h2 style={{...h2,textAlign:"center"}}>Meet Autonomous IT Operations</h2>
              <p style={{...body,maxWidth:580,margin:"0 auto"}}>The only platform that closes the full loop — detect, simulate, decide, fix, and prove — without a human in the loop.</p>
            </div></Reveal>
            <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:16,marginBottom:48}}>
              {[
                {n:"01",icon:"📡",t:"Detect",   d:"Real-time signals from servers, containers, and endpoints in seconds.",c:B.blue},
                {n:"02",icon:"🌐",t:"Simulate", d:"Digital Twin models the fix. Risk score calculated before action.",c:B.purple},
                {n:"03",icon:"🧠",t:"Decide",   d:"Nemotron 49B reasons root cause. Explainable AI. No black boxes.",c:"#a855f7"},
                {n:"04",icon:"⚡",t:"Fix",      d:"WinRM, Docker API, SSH. Autonomous remediation across any endpoint.",c:B.teal},
                {n:"05",icon:"🔐",t:"Prove",    d:"SHA-256 ProofLink receipt. Tamper-evident. Publicly verifiable.",c:B.green},
              ].map((s,i)=>(
                <Reveal key={s.t} delay={i*.07}>
                  <div className="lift" style={{...card,border:`1px solid ${s.c}22`,background:`${s.c}06`,height:"100%",position:"relative",overflow:"hidden"}}>
                    <div style={{position:"absolute",top:-14,right:-6,fontSize:60,opacity:.05,fontWeight:900,color:s.c,fontFamily:"Inter"}}>{s.n}</div>
                    <div style={{fontSize:26,marginBottom:14}}>{s.icon}</div>
                    <div style={{fontSize:9,fontWeight:800,letterSpacing:"0.14em",textTransform:"uppercase",color:s.c,marginBottom:8,fontFamily:"Inter"}}>{s.n} · {s.t}</div>
                    <div style={{fontSize:13,color:B.muted,lineHeight:1.62,fontFamily:"Inter"}}>{s.d}</div>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal><div style={{textAlign:"center",fontSize:22,fontWeight:900,color:"#fff",fontFamily:"Inter",letterSpacing:"-0.03em"}}>
              Not just automation.{" "}
              <span style={{background:`linear-gradient(90deg,${B.purple},${B.blue})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>Accountable automation.</span>
            </div></Reveal>
          </div>
        </section>

        {/* PROOF */}
        <section style={sec}>
          <div style={wrap}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:64,alignItems:"center"}}>
              <Reveal>
                <div style={{...eye,color:B.green}}>🔐 Cryptographic Proof</div>
                <h2 style={h2}>Don't Trust AI.<br/><span style={{color:"#4ade80"}}>Verify It.</span></h2>
                <p style={{...body,marginBottom:24}}>Every action iTechSmart takes generates a SHA-256 tamper-proof receipt. Your team can prove to any auditor, client, or regulator exactly what happened — with a public verify URL.</p>
                <div style={{padding:"14px 18px",borderRadius:12,border:"1px solid rgba(34,197,94,.2)",background:"rgba(34,197,94,.06)",marginBottom:28}}>
                  <div style={{fontSize:11,color:B.green,fontWeight:800,marginBottom:5,fontFamily:"Inter",letterSpacing:"0.06em"}}>PROVEN LIVE — April 5 2026</div>
                  <div style={{fontSize:14,color:"#fff",fontFamily:"Inter",fontWeight:600,lineHeight:1.5}}>suite-itsm killed → detected 10s → recovered 20s → zero human input</div>
                </div>
                <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
                  <a href="https://verify.itechsmart.dev" target="_blank" style={{padding:"11px 22px",borderRadius:10,background:"rgba(34,197,94,.12)",border:"1px solid rgba(34,197,94,.35)",color:"#4ade80",fontWeight:700,fontSize:14,textDecoration:"none",fontFamily:"Inter"}}>Verify a Receipt →</a>
                  <a href="https://proof-library.itechsmart.dev" target="_blank" style={{...cta2,padding:"11px 20px",fontSize:14}}>View Proof Library →</a>
                </div>
              </Reveal>
              <ProofWidget/>
            </div>
          </div>
        </section>

        {/* PULSE */}
        <section style={{...sec,background:`${B.purple}06`}}>
          <div style={wrap}>
            <Reveal>
              <div style={{borderRadius:28,border:`1px solid ${B.border}`,background:`linear-gradient(135deg,${B.purple}12,${B.blue}08)`,padding:"56px 48px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:48,flexWrap:"wrap"}}>
                <div style={{flex:1,minWidth:280}}>
                  <div style={{...eye,color:B.purple}}>⚡ Live Demo</div>
                  <h2 style={{...h2,fontSize:"clamp(1.8rem,3.5vw,2.8rem)"}}>See It Work — Right Now</h2>
                  <p style={{...body,marginBottom:0}}>Run a free Pulse scan. See issues detected, root cause reasoned by Nemotron 49B, and a cryptographic receipt generated — in under 2 minutes. No credit card. No setup.</p>
                </div>
                <div>
                  {["Real infrastructure scan","Nemotron 49B reasoning","ProofLink receipt generated","No credit card required"].map(item=>(
                    <div key={item} style={{display:"flex",alignItems:"center",gap:10,fontSize:14,color:"rgba(255,255,255,.72)",marginBottom:12,fontFamily:"Inter"}}>
                      <span style={{color:B.green,fontSize:16,fontWeight:700}}>✓</span> {item}
                    </div>
                  ))}
                  <a href="https://pulse.itechsmart.dev" target="_blank" className="cta-g" style={{...cta1,marginTop:8}}>Try Pulse Free →</a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* WHO IT'S FOR */}
        <section style={sec}>
          <div style={wrap}>
            <Reveal><div style={{textAlign:"center",marginBottom:52}}>
              <div style={{...eye,color:B.purple}}>🏢 Who It's For</div>
              <h2 style={{...h2,textAlign:"center"}}>Built for Teams That Can't Afford Downtime</h2>
            </div></Reveal>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:20}}>
              {[
                {icon:"🏢",t:"MSPs",       c:B.blue,   d:"Monitor and auto-remediate across every client. One platform. ProofLink receipts per client SLA.",  bs:["Multi-tenant","Per-client ledger","Auto-escalation"]},
                {icon:"🏭",t:"Enterprise", c:B.purple, d:"Eliminate alert fatigue. 85% MTTR reduction. Full autonomous loop across Windows, Linux, containers.", bs:["WinRM remediation","131 containers","Grafana dashboards"]},
                {icon:"🏥",t:"Healthcare", c:B.teal,   d:"HL7 interface monitoring. HIPAA-aligned audit. Auto-tickets on interface failure. Mirth/Rhapsody/Epic.", bs:["HL7 Pro","HIPAA 89%","INC auto-creation"]},
                {icon:"🏛",t:"Government", c:"#f59e0b", d:"SDVOSB-certified. Air-gap capable. NIST 96%, FIPS 100%, STIG 94%. FedRAMP pathway active.",          bs:["CAGE 172W2","UEI ZCPFX4N86G36","Citadel product"]},
              ].map((item,i)=>(
                <Reveal key={item.t} delay={i*.09}>
                  <div className="lift" style={{...card,border:`1px solid ${item.c}22`,background:`${item.c}06`,height:"100%"}}>
                    <div style={{fontSize:38,marginBottom:16}}>{item.icon}</div>
                    <div style={{fontSize:18,fontWeight:900,color:"#fff",marginBottom:10,fontFamily:"Inter"}}>{item.t}</div>
                    <p style={{fontSize:14,color:B.muted,lineHeight:1.65,marginBottom:18,fontFamily:"Inter"}}>{item.d}</p>
                    <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                      {item.bs.map(b=><span key={b} style={{padding:"4px 10px",borderRadius:100,border:`1px solid ${item.c}33`,background:`${item.c}10`,fontSize:11,fontWeight:700,color:item.c,fontFamily:"Inter"}}>{b}</span>)}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* OUTCOMES */}
        <section style={{...sec,background:`${B.purple}04`}}>
          <div style={wrap}>
            <Reveal><div style={{textAlign:"center",marginBottom:52}}>
              <div style={{...eye,color:B.purple}}>💰 Outcomes</div>
              <h2 style={{...h2,textAlign:"center"}}>What Happens When IT Runs Itself?</h2>
            </div></Reveal>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:16}}>
              {[["⚡","Faster resolution","Hours → seconds"],["🎫","Fewer tickets","30–70% reduction"],["😌","Less burnout","AI handles first response"],["📋","Audit-ready","Every action receipted"],["💵","Reduced costs","85% MTTR improvement"]].map(([icon,t,sub],i)=>(
                <Reveal key={t} delay={i*.08}>
                  <div className="lift" style={{...card,textAlign:"center"}}>
                    <div style={{fontSize:30,marginBottom:14}}>{icon}</div>
                    <div style={{fontSize:14,fontWeight:800,color:"#fff",fontFamily:"Inter",marginBottom:6}}>{t}</div>
                    <div style={{fontSize:12,color:B.dim,fontFamily:"Inter"}}>{sub}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section style={{...sec,position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse 80% 100% at 50% 100%,${B.purple}1e 0%,transparent 68%)`,pointerEvents:"none"}}/>
          <div style={{...wrap,textAlign:"center",position:"relative",zIndex:1}}>
            <Reveal>
              <div style={{display:"inline-block",padding:"6px 20px",borderRadius:100,border:`1px solid ${B.border}`,background:`${B.purple}0e`,marginBottom:32,fontSize:11,fontWeight:800,color:"rgba(255,255,255,.58)",letterSpacing:"0.14em",textTransform:"uppercase",fontFamily:"Inter"}}>
                SDVOSB · Veteran-Owned · Irvine CA · F6S #6 Globally
              </div>
              <h2 style={{...h2,fontSize:"clamp(2.4rem,6vw,5.2rem)",textAlign:"center",margin:"0 0 24px"}}>
                You Don't Need More Tools.<br/>
                <span style={{background:`linear-gradient(135deg,${B.purple} 0%,${B.blue} 50%,${B.teal} 100%)`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>
                  You Need a System That Works.
                </span>
              </h2>
              <p style={{...body,maxWidth:520,margin:"0 auto 52px",fontSize:18}}>
                Try iTechSmart free or book a live walkthrough. See autonomous IT operations. Verify the proof yourself.
              </p>
              <div style={{display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap"}}>
                <a href="https://pulse.itechsmart.dev" target="_blank" className="cta-g" style={{...cta1,fontSize:18,padding:"20px 56px"}}>Try It Free</a>
                <a href="https://itechsmart.dev/contact" target="_blank" style={{...cta2,fontSize:18,padding:"20px 48px"}}>Book a Demo</a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{borderTop:`1px solid ${B.border}`,padding:"40px 32px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:20}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <img src="/itechsmart_icon.png" alt="iTechSmart" width="24" height="24" style={{filter:"drop-shadow(0 0 4px #9933ff66)"}}/>
            <span style={{fontWeight:800,fontSize:14,color:"#fff",fontFamily:"Inter"}}>iTechSmart Inc.</span>
            <span style={{fontSize:12,color:B.dim,fontFamily:"Inter"}}>SDVOSB · Irvine, CA</span>
          </div>
          <div style={{display:"flex",gap:24,flexWrap:"wrap"}}>
            {[["Platform","https://itechsmart.dev"],["Whitepaper","https://itechsmart.dev/whitepaper"],["Verify Proof","https://verify.itechsmart.dev"],["UAIO Category","https://uaio.itechsmart.dev"],["Docs","https://docs.itechsmart.dev"]].map(([l,h])=>(
              <a key={l} href={h} target="_blank" style={{fontSize:13,color:B.dim,textDecoration:"none",fontWeight:500,fontFamily:"Inter"}}>{l}</a>
            ))}
          </div>
          <div style={{fontSize:12,color:"rgba(255,255,255,.18)",fontFamily:"Inter"}}>© 2026 iTechSmart Inc. All rights reserved.</div>
        </footer>
      </main>
    </>
  );
}
