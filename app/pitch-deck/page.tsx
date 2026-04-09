'use client';
import { useState, useEffect, useCallback } from 'react';

const SLIDES = [
  { num: 1,  title: 'Infrastructure That Runs Itself.',                           section: 'COVER' },
  { num: 2,  title: 'IT Infrastructure Has Outgrown Human Management.',           section: 'THE PROBLEM' },
  { num: 3,  title: 'Three Eras of IT Operations. Only One Closes the Loop.',     section: 'MARKET EVOLUTION' },
  { num: 4,  title: 'UAIO: The First Platform to Close the Entire Loop.',         section: 'THE SOLUTION' },
  { num: 5,  title: 'Two Innovations Competitors Cannot Replicate.',              section: 'CORE INNOVATION' },
  { num: 6,  title: 'We Are Not Competing in AIOps. We Are Replacing It.',        section: 'MARKET OPPORTUNITY' },
  { num: 7,  title: 'The Federal Market Is Already Open to Us.',                  section: 'GOVERNMENT ADVANTAGE' },
  { num: 8,  title: 'The Magic Quadrant Has One Name in the Top Right.',          section: 'COMPETITIVE LANDSCAPE' },
  { num: 9,  title: 'Not a Point Solution. A Platform That Replaces Your Stack.', section: 'PRODUCT SUITE' },
  { num: 10, title: 'Priced for the Environments It Protects.',                   section: 'BUSINESS MODEL' },
  { num: 11, title: 'We Did Not Build a Demo. We Launched a Platform.',           section: 'TRACTION & VALIDATION' },
  { num: 12, title: "Built by the People Who've Lived the Problem.",              section: 'THE TEAM' },
  { num: 13, title: '$3M\u2013$5M Seed Round. Open Now.',                         section: 'THE ASK' },
];

function slideImg(n: number) {
  return `https://itechsmart.dev/pitch-deck/slide-${String(n).padStart(2, '0')}.jpg`;
}

export default function PitchDeckInvestorPage() {
  const [current, setCurrent]     = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', firm: '', message: '' });

  const prev = useCallback(() => setCurrent(c => Math.max(0, c - 1)), []);
  const next = useCallback(() => setCurrent(c => Math.min(SLIDES.length - 1, c + 1)), []);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft')  prev();
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [next, prev]);

  const slide = SLIDES[current];

  const STATS = [
    ['117',  'Containers Live'],
    ['100%', 'Actions Receipted'],
    ['#6',   'F6S Global Rank'],
    ['$57B', 'Market by 2030'],
  ];

  const CREDS = [
    ['UEI',           'ZCPFX4N86G36'],
    ['CAGE Code',     '172W2'],
    ['Certifications','SDVOSB \u00b7 VOSB \u00b7 Minority-Owned \u00b7 SDB'],
    ['FedRAMP',       'Active Pathway'],
    ['NIST CSF',      '96 / 100'],
    ['HIPAA',         '89 / 100'],
    ['F6S Rank',      '#6 of 2M+ AI startups'],
    ['TRL',           '7 \u2014 Production deployed'],
  ];

  return (
    <div style={{ background: '#05050f', minHeight: '100vh', color: '#fff', fontFamily: 'Inter, sans-serif' }}>

      <div style={{ background: 'linear-gradient(135deg,#0D0320 0%,#05050f 60%)', borderBottom: '1px solid rgba(107,0,255,0.2)', padding: '48px 40px 40px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(107,0,255,0.14)', border: '1px solid rgba(107,0,255,0.28)', borderRadius: 20, padding: '5px 14px', marginBottom: 20 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22C55E', boxShadow: '0 0 6px #22C55E' }} />
            <span style={{ fontSize: 11, color: '#9933FF', fontWeight: 700, letterSpacing: '0.08em' }}>SERIES SEED \u00b7 OPEN FOR INVESTMENT</span>
          </div>
          <h1 style={{ fontSize: 40, fontWeight: 900, margin: '0 0 12px', lineHeight: 1.1 }}>
            iTechSmart <span style={{ color: '#9933FF' }}>Investor</span> Presentation
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 16, margin: '0 0 28px', lineHeight: 1.6, maxWidth: 600, marginLeft: 'auto', marginRight: 'auto' }}>
            The world{"'"}s first Unified Autonomous IT Operations platform. Production-deployed, cryptographically proven. Raising $3M\u2013$5M seed.
          </p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            {STATS.map(([val, label]) => (
              <div key={label} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, padding: '10px 18px', textAlign: 'center', minWidth: 90 }}>
                <div style={{ fontSize: 20, fontWeight: 900, color: '#9933FF' }}>{val}</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.38)', letterSpacing: '0.05em', textTransform: 'uppercase', marginTop: 2 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '40px 24px' }}>

        <div style={{ position: 'relative', borderRadius: 10, overflow: 'hidden', boxShadow: '0 0 60px rgba(107,0,255,0.18), 0 0 0 1px rgba(255,255,255,0.08)', marginBottom: 14 }}>
          <img src={slideImg(current + 1)} alt={slide.title}
            style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', display: 'block' }} />
          <button onClick={prev} disabled={current === 0}
            style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: '50%', width: 44, height: 44, color: current === 0 ? 'rgba(255,255,255,0.14)' : '#fff', cursor: current === 0 ? 'default' : 'pointer', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'inherit' }}>{'\u2190'}</button>
          <button onClick={next} disabled={current === SLIDES.length - 1}
            style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: '50%', width: 44, height: 44, color: current === SLIDES.length - 1 ? 'rgba(255,255,255,0.14)' : '#fff', cursor: current === SLIDES.length - 1 ? 'default' : 'pointer', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'inherit' }}>{'\u2192'}</button>
          <div style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(0,0,0,0.6)', borderRadius: 20, padding: '4px 10px', fontSize: 11, color: 'rgba(255,255,255,0.55)' }}>{current + 1} / {SLIDES.length}</div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 8 }}>
          <div>
            <span style={{ fontSize: 10, color: '#9933FF', fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', marginRight: 8 }}>{slide.section}</span>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{slide.title}</span>
          </div>
          <div style={{ display: 'flex', gap: 5 }}>
            {SLIDES.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)}
                style={{ width: i === current ? 18 : 5, height: 5, borderRadius: 3, background: i === current ? '#9933FF' : 'rgba(255,255,255,0.12)', border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.2s' }} />
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 7, overflowX: 'auto', paddingBottom: 8, marginBottom: 48 }}>
          {SLIDES.map((s, i) => (
            <button key={i} onClick={() => setCurrent(i)}
              style={{ minWidth: 96, background: 'transparent', border: `1px solid ${i === current ? 'rgba(107,0,255,0.55)' : 'rgba(255,255,255,0.06)'}`, borderRadius: 6, padding: 0, cursor: 'pointer', overflow: 'hidden', flexShrink: 0 }}>
              <img src={slideImg(i + 1)} alt={s.title}
                style={{ width: 96, aspectRatio: '16/9', objectFit: 'cover', display: 'block', opacity: i === current ? 1 : 0.45 }} />
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 40 }}>

          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: 26 }}>
            <h3 style={{ fontSize: 15, fontWeight: 800, margin: '0 0 18px' }}>Company Credentials</h3>
            {CREDS.map(([label, val]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '7px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.38)', fontWeight: 600 }}>{label}</span>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.75)', textAlign: 'right', maxWidth: '58%' }}>{val}</span>
              </div>
            ))}
            <div style={{ marginTop: 18, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <a href="https://itechsmart.dev/proof" style={{ background: '#9933FF', color: '#fff', padding: '8px 16px', borderRadius: 6, fontSize: 12, fontWeight: 700, textDecoration: 'none' }}>View Live Proof {'\u2192'}</a>
              <a href="https://itechsmart.dev/whitepaper" style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.65)', padding: '8px 14px', borderRadius: 6, fontSize: 12, fontWeight: 600, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.1)' }}>Whitepaper</a>
            </div>
          </div>

          <div style={{ background: 'rgba(107,0,255,0.08)', border: '1px solid rgba(107,0,255,0.2)', borderRadius: 12, padding: 26 }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>{'\u2705'}</div>
                <h3 style={{ fontSize: 18, fontWeight: 800, margin: '0 0 8px' }}>Message Received</h3>
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13, margin: 0 }}>DJuane will respond within 24 hours.<br />djuane@itechsmart.dev</p>
              </div>
            ) : (
              <>
                <h3 style={{ fontSize: 15, fontWeight: 800, margin: '0 0 5px' }}>Request Full Data Room</h3>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.38)', margin: '0 0 18px', lineHeight: 1.5 }}>Financial model, cap table, and technical documentation available to qualified investors.</p>
                {(['name','email','firm'] as const).map(id => (
                  <div key={id} style={{ marginBottom: 10 }}>
                    <label style={{ display: 'block', fontSize: 10, color: 'rgba(255,255,255,0.38)', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 4 }}>
                      {id === 'name' ? 'Your Name' : id === 'email' ? 'Email' : 'Firm / Organization'}
                    </label>
                    <input type={id === 'email' ? 'email' : 'text'}
                      placeholder={id === 'name' ? 'Jane Smith' : id === 'email' ? 'jane@vc.com' : 'Acme Ventures'}
                      value={form[id]}
                      onChange={e => setForm(p => ({ ...p, [id]: e.target.value }))}
                      style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6, padding: '9px 12px', color: '#fff', fontSize: 13, boxSizing: 'border-box', outline: 'none', fontFamily: 'inherit' }} />
                  </div>
                ))}
                <div style={{ marginBottom: 14 }}>
                  <label style={{ display: 'block', fontSize: 10, color: 'rgba(255,255,255,0.38)', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 4 }}>Message (optional)</label>
                  <textarea placeholder="Investment thesis, check size, timeline..." value={form.message}
                    onChange={e => setForm(p => ({ ...p, message: e.target.value }))} rows={3}
                    style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6, padding: '9px 12px', color: '#fff', fontSize: 13, boxSizing: 'border-box', outline: 'none', resize: 'none', fontFamily: 'inherit' }} />
                </div>
                <button onClick={() => { if (form.name && form.email) setSubmitted(true); }}
                  style={{ width: '100%', background: '#9933FF', border: 'none', borderRadius: 7, color: '#fff', padding: 12, fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
                  Request Data Room Access {'\u2192'}
                </button>
                <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.22)', margin: '8px 0 0', textAlign: 'center' }}>Or email directly: djuane@itechsmart.dev</p>
              </>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', paddingBottom: 48 }}>
          <a href="https://itechsmart.dev/pitch-deck" style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', padding: '10px 20px', borderRadius: 8, fontSize: 13, fontWeight: 600, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.1)' }}>View Full Interactive Deck</a>
          <a href="https://itechsmart.dev/iTechSmart_UAIO_Pitch_Deck_2026.pptx" download style={{ background: 'rgba(107,0,255,0.14)', color: '#9933FF', padding: '10px 20px', borderRadius: 8, fontSize: 13, fontWeight: 700, textDecoration: 'none', border: '1px solid rgba(107,0,255,0.28)' }}>{'\u2193'} Download .PPTX</a>
          <a href="https://itechsmart.dev/whitepaper" style={{ background: 'rgba(255,255,255,0.03)', color: 'rgba(255,255,255,0.5)', padding: '10px 20px', borderRadius: 8, fontSize: 13, fontWeight: 600, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.07)' }}>Technical Whitepaper</a>
        </div>
      </div>
    </div>
  );
}
