'use client';
import { useState, useEffect, useRef } from 'react';

const SYSTEM = `You are an elite digital marketing strategist and sales consultant for a local business growth agency.

AGENCY POSITIONING: We help local businesses capture and convert more leads automatically — through systems, not guesswork. We do NOT sell websites. We sell more leads, better follow-up, and increased revenue.

PACKAGES (anchor high → close on Lead Gen → Starter as fallback):

1. STARTER PRESENCE — $500–$1,200 setup. Outcome: Professional presence that captures leads automatically.
2. LEAD GENERATION SYSTEM (PRIMARY CLOSE) — $1,200–$2,500 setup + $150–$300/month. Outcome: A system that brings in leads and follows up automatically.
3. GROWTH ENGINE (PREMIUM ANCHOR) — $2,500–$5,000 setup + $300–$1,000/month. Outcome: Complete customer acquisition machine.

When recommending a package output this JSON block:
[PACKAGE:{"name":"Lead Generation System","price":"$1,200–$2,500 setup + $150–$300/mo","badge":"Recommended for you","outcome":"A system that brings in leads and follows up automatically","features":["Conversion-optimized landing pages","Local SEO setup","Automated review system","CRM + lead tracking","SMS + email follow-up","Missed call text-back"]}]

RULES: Never pitch before diagnosing. Keep replies to 2–4 short paragraphs. Sound like a trusted strategist. Always tie recommendations to their specific pain.`;

export default function Consult() {
  const [messages, setMessages] = useState<any[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [chips, setChips] = useState<string[]>([]);
  const bottom = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const opener = "Hey! Good to meet you.\n\nI help local businesses build lead generation systems that run automatically — so instead of chasing referrals or hoping someone calls, you've got a reliable pipeline.\n\nWhat kind of business do you run, and how are you currently getting new customers?";
    setMessages([{ role: 'assistant', text: opener, pkg: null }]);
    setHistory([{ role: 'assistant', content: opener }]);
    setChips(['I run a local service business', 'I own a restaurant or café', 'I run a spa or salon', "I'm a solo contractor"]);
  }, []);

  useEffect(() => { bottom.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, loading]);

  function parse(raw: string) {
    const m = raw.match(/\[PACKAGE:(\{[\s\S]*?\})\]/);
    let pkg = null;
    if (m) { try { pkg = JSON.parse(m[1]); } catch(e) {} }
    return { text: raw.replace(/\[PACKAGE:[\s\S]*?\]/, '').trim(), pkg };
  }

  function updateChips(text: string) {
    const lo = text.toLowerCase();
    if (history.length <= 2) setChips(['I run a local service business', 'I own a restaurant', 'I run a spa or salon', "I'm a contractor"]);
    else if (lo.includes('get') || lo.includes('customer')) setChips(['Mostly word of mouth', 'Some Google + referrals', "I don't have a system", 'I run occasional ads']);
    else if (lo.includes('package') || lo.includes('recommend')) setChips(['Tell me the price', "What's the monthly fee?", 'How fast can we launch?', "I'm ready to move forward"]);
    else if (lo.includes('price') || lo.includes('cost')) setChips(['That sounds reasonable', 'Can I start smaller?', "What's the ROI?", "Let's do it"]);
    else setChips([]);
  }

  async function send(text: string) {
    if (!text.trim() || loading) return;
    setLoading(true); setChips([]);
    const newHistory = [...history, { role: 'user', content: text }];
    setHistory(newHistory);
    setMessages(prev => [...prev, { role: 'user', text, pkg: null }]);
    setInput('');
    try {
      const res = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: newHistory, system: SYSTEM }) });
      const data = await res.json();
      const raw = data.content?.[0]?.text || 'Something went wrong.';
      const { text: parsed, pkg } = parse(raw);
      setHistory(prev => [...prev, { role: 'assistant', content: raw }]);
      setMessages(prev => [...prev, { role: 'assistant', text: parsed, pkg }]);
      updateChips(parsed);
    } catch { setMessages(prev => [...prev, { role: 'assistant', text: 'Connection issue — please refresh.', pkg: null }]); }
    setLoading(false);
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0f0f10', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ width: '100%', maxWidth: 480, height: 680, background: '#1a1a1d', border: '0.5px solid rgba(255,255,255,0.14)', borderRadius: 14, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '0.5px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'rgba(79,124,255,0.12)', border: '0.5px solid rgba(79,124,255,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 600, color: '#4f7cff' }}>AI</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 500, color: '#f0efea' }}>Marketing Advisor</div>
            <div style={{ fontSize: 12, color: '#2ecc71', display: 'flex', alignItems: 'center', gap: 5 }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: '#2ecc71', display: 'inline-block' }}/>Online now</div>
          </div>
          <div style={{ fontSize: 11, padding: '3px 10px', borderRadius: 20, background: 'rgba(46,204,113,0.1)', color: '#2ecc71', border: '0.5px solid rgba(46,204,113,0.25)' }}>Free Consultation</div>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {messages.map((msg, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-end', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
              {msg.role === 'assistant' && <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'rgba(79,124,255,0.12)', border: '0.5px solid rgba(79,124,255,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 600, color: '#4f7cff', flexShrink: 0 }}>AI</div>}
              <div style={{ maxWidth: '85%' }}>
                <div style={{ padding: '11px 15px', borderRadius: 16, ...(msg.role === 'assistant' ? { borderBottomLeftRadius: 4, background: '#232327', border: '0.5px solid rgba(255,255,255,0.08)', color: '#f0efea' } : { borderBottomRightRadius: 4, background: 'rgba(79,124,255,0.12)', border: '0.5px solid rgba(79,124,255,0.35)', color: '#c8d8ff' }), fontSize: 14, lineHeight: 1.55 }}>
                  {msg.text.split('\n').map((l: string, j: number) => <span key={j}>{l}{j < msg.text.split('\n').length - 1 && <br/>}</span>)}
                </div>
                {msg.pkg && (
                  <div style={{ marginTop: 10, background: '#0f0f10', border: '0.5px solid rgba(255,255,255,0.14)', borderRadius: 8, overflow: 'hidden', fontSize: 13 }}>
                    <div style={{ padding: '10px 14px', background: '#232327', borderBottom: '0.5px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontWeight: 500, color: '#f0efea' }}>{msg.pkg.name}</span>
                      <span style={{ fontSize: 12, color: '#8a8a8a' }}>{msg.pkg.price}</span>
                    </div>
                    <div style={{ padding: '12px 14px' }}>
                      {msg.pkg.badge && <div style={{ display: 'inline-block', marginBottom: 8, fontSize: 10, padding: '3px 9px', borderRadius: 20, background: 'rgba(46,204,113,0.1)', color: '#2ecc71', border: '0.5px solid rgba(46,204,113,0.3)', textTransform: 'uppercase' as const, fontWeight: 500 }}>{msg.pkg.badge}</div>}
                      <div style={{ color: '#8a8a8a', fontSize: 12, marginBottom: 8 }}>{msg.pkg.outcome}</div>
                      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 5 }}>
                        {msg.pkg.features.map((f: string, fi: number) => <li key={fi} style={{ fontSize: 12, color: '#f0efea', display: 'flex', gap: 7 }}><span style={{ width: 5, height: 5, borderRadius: '50%', background: '#4f7cff', marginTop: 5, flexShrink: 0, display: 'inline-block' }}/>{f}</li>)}
                      </ul>
                    </div>
                    <div style={{ padding: '0 14px 12px' }}>
                      <button onClick={() => send(`I want to learn more about the ${msg.pkg.name}`)} style={{ width: '100%', padding: 8, fontSize: 13, fontWeight: 500, borderRadius: 8, border: '0.5px solid rgba(79,124,255,0.35)', background: 'rgba(79,124,255,0.12)', color: '#4f7cff', cursor: 'pointer' }}>I'm interested — what's next? →</button>
                    </div>
                  </div>
                )}
              </div>
              {msg.role === 'user' && <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#232327', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 600, color: '#888', flexShrink: 0 }}>You</div>}
            </div>
          ))}
          {loading && (
            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
              <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'rgba(79,124,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: '#4f7cff' }}>AI</div>
              <div style={{ padding: '11px 15px', borderRadius: 16, borderBottomLeftRadius: 4, background: '#232327', border: '0.5px solid rgba(255,255,255,0.08)' }}>
                <div style={{ display: 'flex', gap: 4 }}>
                  {[0,200,400].map((d,i) => <div key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: '#666', animation: 'blink 1.2s infinite', animationDelay: `${d}ms` }}/>)}
                </div>
              </div>
            </div>
          )}
          <div ref={bottom}/>
        </div>
        {chips.length > 0 && <div style={{ padding: '0 14px 10px', display: 'flex', gap: 6, flexWrap: 'wrap' as const }}>{chips.map((c, i) => <button key={i} onClick={() => send(c)} style={{ fontSize: 12, padding: '5px 12px', borderRadius: 20, border: '0.5px solid rgba(255,255,255,0.14)', background: '#232327', color: '#8a8a8a', cursor: 'pointer' }}>{c}</button>)}</div>}
        <div style={{ padding: '12px 16px', borderTop: '0.5px solid rgba(255,255,255,0.08)', display: 'flex', gap: 8, alignItems: 'flex-end' }}>
          <textarea value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send(input);}}} placeholder="Tell me about your business..." rows={1} style={{ flex: 1, padding: '10px 16px', fontSize: 14, borderRadius: 22, border: '0.5px solid rgba(255,255,255,0.14)', background: '#232327', color: '#f0efea', resize: 'none', minHeight: 40, outline: 'none', fontFamily: 'inherit' }}/>
          <button onClick={() => send(input)} style={{ width: 38, height: 38, borderRadius: '50%', background: 'rgba(79,124,255,0.12)', border: '0.5px solid rgba(79,124,255,0.35)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="#4f7cff"><path d="M2 8l12-6-4 12-3-4-5-2z"/></svg>
          </button>
        </div>
        <style>{`@keyframes blink{0%,80%,100%{opacity:.2}40%{opacity:1}}`}</style>
      </div>
    </div>
  );
}
