import { useState, useEffect, useRef } from "react";

/* ── helpers ──────────────────────────────────────────────── */
function useCounter(t,d=1200,a=true){const[v,s]=useState(0);useEffect(()=>{if(!a){s(0);return}let st=null;const fn=ts=>{if(!st)st=ts;const p=Math.min((ts-st)/d,1);s(Math.floor(p*t));if(p<1)requestAnimationFrame(fn)};requestAnimationFrame(fn)},[t,d,a]);return v}

const C={bg:"#0c0a1a",surface:"#151229",card:"#1c1839",border:"#2d2755",accent:"#7c3aed",magenta:"#d946ef",cyan:"#06b6d4",green:"#10b981",orange:"#f59e0b",red:"#ef4444",text:"#e8e4f0",muted:"#9590ab",dim:"#6b6588",yellow:"#eab308"};

const pill=(c)=>({display:"inline-block",padding:"2px 10px",borderRadius:999,fontSize:11,fontWeight:600,background:c+"22",color:c,border:`1px solid ${c}44`});
const codeBox=(c=C.accent)=>({fontFamily:"'Fira Code','Consolas',monospace",fontSize:13,background:C.surface,borderRadius:10,padding:"14px 18px",border:`1px solid ${c}33`,lineHeight:1.7,overflowX:"auto"});
const hn=(v,c=C.cyan)=><span style={{fontWeight:800,color:c,fontFamily:"'Fira Code',monospace"}}>{v}</span>;
const decBox=(p,t)=><div style={{padding:"8px 14px",borderRadius:8,fontSize:13,fontWeight:600,background:(p?C.green:C.red)+"15",border:`1px solid ${(p?C.green:C.red)}33`,color:p?C.green:C.red,display:"flex",alignItems:"center",gap:8,marginTop:8}}><span style={{fontSize:16}}>{p?"✓":"✗"}</span>{t}</div>;
const note=(c,t)=><div style={{marginTop:12,padding:"10px 14px",background:c+"0d",borderRadius:8,borderLeft:`3px solid ${c}`,fontSize:13,color:C.text,lineHeight:1.65}}>{t}</div>;
const arrDown=(c=C.dim)=><div style={{textAlign:"center",padding:"6px 0",color:c,fontSize:18}}>↓</div>;
const stepBadge=(n,c)=><span style={{display:"inline-flex",alignItems:"center",justifyContent:"center",width:22,height:22,borderRadius:99,fontSize:11,fontWeight:800,background:c+"22",color:c,border:`1.5px solid ${c}55`,flexShrink:0}}>{n}</span>;

/* ── Tab switcher component ──────────────────────────────── */
function TabSwitcher({tabs,active,onChange,color=C.accent}){
  return <div style={{display:"flex",gap:4,marginBottom:20,background:C.surface,borderRadius:10,padding:3,border:`1px solid ${C.border}`}}>
    {tabs.map(t=><button key={t.id} onClick={()=>onChange(t.id)} style={{flex:1,padding:"8px 16px",fontSize:13,fontWeight:600,borderRadius:8,cursor:"pointer",background:active===t.id?color+"22":"transparent",border:`1.5px solid ${active===t.id?color+"55":"transparent"}`,color:active===t.id?color:C.muted,transition:"all 0.2s"}}>{t.icon} {t.label}</button>)}
  </div>;
}

/* ── Step nav ────────────────────────────────────────────── */
function StepNav({steps,active,onChange,color}){
  return <div style={{display:"flex",gap:6,marginBottom:20,flexWrap:"wrap"}}>
    {steps.map((s,i)=><button key={i} onClick={()=>onChange(i)} style={{padding:"7px 12px",fontSize:12,fontWeight:600,borderRadius:8,cursor:"pointer",background:active===i?color+"22":C.card,border:`1.5px solid ${active===i?color:C.border}`,color:active===i?color:C.muted,display:"flex",alignItems:"center",gap:5,transition:"all 0.2s"}}>{stepBadge(i+1,active===i?color:C.dim)}{s}</button>)}
  </div>;
}

const SECTIONS=[{id:"overview",label:"Overview"},{id:"qdc",label:"QDC Clustering"},{id:"splitmerge",label:"Split-Merge"},{id:"hierarchy",label:"Hierarchy Building"},{id:"refinement",label:"Refinement"},{id:"results",label:"Results"}];

/* ═══════════════════════════════════════════════════════════ */
/*  HERO                                                      */
/* ═══════════════════════════════════════════════════════════ */
function Hero({onStart}){
  return <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"40px 20px",position:"relative",overflow:"hidden"}}>
    <div style={{position:"absolute",top:-120,left:-120,width:400,height:400,borderRadius:"50%",background:`radial-gradient(circle,${C.accent}18,transparent 70%)`,animation:"float 8s ease-in-out infinite"}}/>
    <div style={{position:"absolute",bottom:-80,right:-80,width:350,height:350,borderRadius:"50%",background:`radial-gradient(circle,${C.magenta}15,transparent 70%)`,animation:"float 10s ease-in-out infinite reverse"}}/>
    <div style={pill(C.cyan)}>IEM-ICDC 2026 • Interactive Demo</div>
    <h1 style={{fontSize:"clamp(28px,5vw,50px)",fontWeight:800,lineHeight:1.15,margin:"24px 0 16px",maxWidth:800,background:`linear-gradient(135deg,${C.text},${C.accent},${C.magenta})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",fontFamily:"'Georgia',serif"}}>Query-Context Aware Topic Hierarchy Generation</h1>
    <p style={{fontSize:17,color:C.muted,maxWidth:620,lineHeight:1.6,margin:"0 0 20px"}}>Interactive visualizations and step-by-step dry runs with real numbers — explore how each algorithm transforms raw search logs into organized educational hierarchies</p>

    {/* 3-Test Visual */}
    <div style={{display:"flex",gap:8,marginBottom:20,flexWrap:"wrap",justifyContent:"center",maxWidth:640}}>
      {[
        {num:"1",name:"Category Entropy",q:"Do they share enough information?",color:C.accent},
        {num:"2",name:"Importance Measure",q:"Are shared concepts meaningful?",color:C.magenta},
        {num:"3",name:"Coverage Degree",q:"What is the hierarchical direction?",color:C.green},
      ].map(t=><div key={t.num} style={{flex:"1 1 180px",background:C.surface,border:`1px solid ${t.color}44`,borderRadius:12,padding:"12px 14px",textAlign:"left"}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
          <span style={{display:"inline-flex",alignItems:"center",justifyContent:"center",width:22,height:22,borderRadius:99,fontSize:11,fontWeight:800,background:t.color+"22",color:t.color,border:`1.5px solid ${t.color}55`}}>{t.num}</span>
          <span style={{fontSize:13,fontWeight:700,color:t.color}}>{t.name}</span>
        </div>
        <div style={{fontSize:11,color:C.dim,lineHeight:1.4}}>{t.q}</div>
      </div>)}
    </div>

    <p style={{fontSize:13,color:C.dim,marginBottom:24}}>Divyansh Bhatia (eBay Inc.) &amp; N. Mehala (Vidyashilp University)</p>

    <div style={{display:"flex",gap:12,flexWrap:"wrap",justifyContent:"center"}}>
      <button onClick={onStart} style={{padding:"14px 36px",fontSize:16,fontWeight:700,background:`linear-gradient(135deg,${C.accent},${C.magenta})`,color:"#fff",border:"none",borderRadius:12,cursor:"pointer",boxShadow:`0 4px 24px ${C.accent}44`,transition:"transform 0.2s,box-shadow 0.2s"}} onMouseEnter={e=>{e.target.style.transform="translateY(-2px)";e.target.style.boxShadow=`0 8px 32px ${C.accent}66`}} onMouseLeave={e=>{e.target.style.transform="";e.target.style.boxShadow=`0 4px 24px ${C.accent}44`}}>Explore the Approach →</button>
      <a href="https://github.com/DivyanshBhatia/qca-hierarchy-framework" target="_blank" rel="noopener noreferrer" style={{padding:"14px 28px",fontSize:15,fontWeight:600,background:C.surface,color:C.text,border:`1.5px solid ${C.border}`,borderRadius:12,cursor:"pointer",textDecoration:"none",display:"inline-flex",alignItems:"center",gap:8,transition:"border-color 0.2s"}} onMouseEnter={e=>e.currentTarget.style.borderColor=C.accent} onMouseLeave={e=>e.currentTarget.style.borderColor=C.border}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill={C.text}><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
        View Code &amp; Run Locally
      </a>
    </div>

    <style>{`@keyframes float{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-30px) scale(1.05)}}`}</style>
  </div>;
}

/* ═══════════════════════════════════════════════════════════ */
/*  PIPELINE OVERVIEW                                         */
/* ═══════════════════════════════════════════════════════════ */
function PipelineOverview(){
  const[as,setAs]=useState(null);
  const steps=[{id:1,label:"Click-Through\nLog Collection",color:C.cyan,desc:"Collect user queries and their clicked documents from search engine logs. This captures real user behavior.",detail:"Source: AOL500k — 20M queries, 650k users, 3 months"},{id:2,label:"QDC\nClustering",color:C.accent,desc:"Build a Query-Document-Concept (QDC) tripartite graph and apply agglomerative hierarchical clustering.",detail:"spaCy + BERT for concept extraction, TF-IDF for weighting"},{id:3,label:"Split-Merge\nRefinement",color:C.magenta,desc:"Transform hard clusters into soft, homogeneous clusters through SPLIT and MERGE phases.",detail:"Resolves ambiguity, noise, and hard-clustering constraints"},{id:4,label:"Hierarchy\nInsertion",color:C.green,desc:"Insert clusters into DMOZ base hierarchy using a 3-test sequence: Category Entropy → Importance Measure → Coverage Degree.",detail:"Determines Parent-Child, Sibling, Disjoint, or Exact Match relationships"},{id:5,label:"Refinement\nModule",color:C.orange,desc:"Phase 1 groups related siblings under new parents; Phase 2 merges equivalent categories via Mutual Information.",detail:"Bottom-up processing handles concept drift over time"}];
  return <div>
    <h2 style={{fontSize:28,fontWeight:800,marginBottom:8,fontFamily:"'Georgia',serif"}}>System Pipeline</h2>
    <p style={{color:C.muted,marginBottom:28,fontSize:15}}>Click each stage for a summary. Each section below has both an <strong style={{color:C.cyan}}>interactive visualization</strong> and a <strong style={{color:C.magenta}}>numerical dry run</strong>.</p>
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:0,flexWrap:"wrap",marginBottom:28}}>
      {steps.map((s,i)=><div key={s.id} style={{display:"flex",alignItems:"center"}}>
        <div onClick={()=>setAs(as===s.id?null:s.id)} style={{width:110,height:110,borderRadius:16,background:as===s.id?s.color+"33":C.card,border:`2px solid ${as===s.id?s.color:C.border}`,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",transition:"all 0.3s",flexDirection:"column",padding:8,textAlign:"center",boxShadow:as===s.id?`0 0 20px ${s.color}33`:"none"}}>
          <div style={{fontSize:11,fontWeight:700,color:s.color,background:s.color+"22",borderRadius:99,padding:"1px 8px",marginBottom:6}}>{s.id}</div>
          <div style={{fontSize:12,fontWeight:600,color:C.text,whiteSpace:"pre-line",lineHeight:1.3}}>{s.label}</div>
        </div>
        {i<4&&<svg width="32" height="20" style={{margin:"0 2px"}}><defs><linearGradient id={`a${i}`} x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor={steps[i].color} stopOpacity="0.6"/><stop offset="100%" stopColor={steps[i+1].color} stopOpacity="0.6"/></linearGradient></defs><path d="M2 10 L22 10 M18 5 L24 10 L18 15" fill="none" stroke={`url(#a${i})`} strokeWidth="2"/></svg>}
      </div>)}
    </div>
    {as&&(()=>{const s=steps.find(x=>x.id===as);return <div style={{background:C.card,border:`1px solid ${s.color}44`,borderRadius:16,padding:24,animation:"fadeIn 0.3s ease"}}><div style={{display:"flex",alignItems:"center",gap:12,marginBottom:12}}><div style={pill(s.color)}>Stage {s.id}</div><span style={{fontSize:18,fontWeight:700}}>{s.label.replace("\n"," ")}</span></div><p style={{color:C.text,lineHeight:1.7,fontSize:15,margin:"0 0 12px"}}>{s.desc}</p><p style={{color:s.color,fontSize:13,fontStyle:"italic",padding:"8px 14px",background:s.color+"11",borderRadius:8,borderLeft:`3px solid ${s.color}`}}>{s.detail}</p></div>})()}

    {/* 3-Test Sequence Callout */}
    <div style={{marginTop:28,background:C.card,borderRadius:16,border:`1px solid ${C.border}`,padding:24,position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:`linear-gradient(90deg,${C.accent},${C.magenta},${C.green})`}}/>
      <div style={{fontSize:16,fontWeight:700,color:C.text,marginBottom:16}}>The 3-Test Insertion Sequence</div>
      <p style={{fontSize:13,color:C.muted,marginBottom:16}}>When placing a new cluster into the hierarchy, it must pass three sequential tests against each existing category:</p>
      <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
        {[
          {num:"1",name:"Category Entropy",q:"Do they share enough information?",detail:"Gate test — if shared concept overlap is too low, categories are DISJOINT and we skip further tests.",color:C.accent,emoji:"🔍"},
          {num:"2",name:"Importance Measure",q:"Are shared concepts meaningful?",detail:"Checks if shared terms are domain-specific (not generic words). High confidence → Test 3. Low → SIBLING.",color:C.magenta,emoji:"⚖️"},
          {num:"3",name:"Coverage Degree",q:"What is the hierarchical direction?",detail:"Measures containment: if cluster's concepts are well-covered by category → CHILD. If bidirectional → SIBLING.",color:C.green,emoji:"🧭"},
        ].map(t=><div key={t.num} style={{flex:"1 1 240px",background:C.surface,border:`1.5px solid ${t.color}33`,borderRadius:12,padding:16}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
            <span style={{display:"inline-flex",alignItems:"center",justifyContent:"center",width:28,height:28,borderRadius:99,fontSize:13,fontWeight:800,background:t.color+"22",color:t.color,border:`2px solid ${t.color}55`}}>{t.num}</span>
            <span style={{fontSize:14,fontWeight:700,color:t.color}}>{t.name}</span>
          </div>
          <div style={{fontSize:13,fontWeight:600,color:C.text,marginBottom:6}}>{t.q}</div>
          <div style={{fontSize:12,color:C.dim,lineHeight:1.5}}>{t.detail}</div>
        </div>)}
      </div>
      <div style={{display:"flex",alignItems:"center",gap:6,marginTop:16,fontSize:12,color:C.dim}}>
        <span>Possible outcomes:</span>
        <span style={pill(C.green)}>Parent-Child</span>
        <span style={pill(C.orange)}>Related Sibling</span>
        <span style={pill(C.red)}>Disjoint</span>
        <span style={pill(C.magenta)}>Exact Match → Merge</span>
      </div>
    </div>
    <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}`}</style>
  </div>;
}

/* ═══════════════════════════════════════════════════════════ */
/*  QDC — Interactive Graph + Dry Run                         */
/* ═══════════════════════════════════════════════════════════ */
function QDCSection(){
  const[tab,setTab]=useState("interactive");
  return <div>
    <h2 style={{fontSize:28,fontWeight:800,marginBottom:8,fontFamily:"'Georgia',serif"}}>Query-Document-Concept (QDC) Clustering</h2>
    <p style={{color:C.muted,marginBottom:16,fontSize:15}}>How raw search logs become topical clusters via a tripartite graph linking queries, their clicked documents, and extracted concepts.</p>
    <TabSwitcher tabs={[{id:"interactive",icon:"🔗",label:"Interactive Graph"},{id:"dryrun",icon:"🔢",label:"Dry Run with Numbers"}]} active={tab} onChange={setTab} color={C.cyan}/>
    {tab==="interactive"?<QDCInteractive/>:<QDCDryRun/>}
  </div>;
}

function QDCInteractive(){
  const[sq,setSq]=useState(null);
  const queries=[{id:"q1",label:"solar panel efficiency",x:50,y:50},{id:"q2",label:"wind turbine design",x:50,y:145},{id:"q3",label:"renewable energy cost",x:50,y:240}];
  const docs=[{id:"d1",label:"Photovoltaic Cells Guide",x:285,y:30},{id:"d2",label:"Energy Conversion Tech",x:285,y:110},{id:"d3",label:"Aerodynamics of Turbines",x:285,y:190},{id:"d4",label:"Green Energy Economics",x:285,y:270}];
  const concepts=[{id:"c1",label:"photovoltaic",x:530,y:20},{id:"c2",label:"energy conversion",x:530,y:85},{id:"c3",label:"aerodynamics",x:530,y:150},{id:"c4",label:"cost analysis",x:530,y:215},{id:"c5",label:"renewable",x:530,y:280}];
  const edges=[{f:"q1",t:"d1",tp:"qd"},{f:"q1",t:"d2",tp:"qd"},{f:"q2",t:"d3",tp:"qd"},{f:"q2",t:"d2",tp:"qd"},{f:"q3",t:"d4",tp:"qd"},{f:"q3",t:"d2",tp:"qd"},{f:"d1",t:"c1",tp:"dc"},{f:"d1",t:"c2",tp:"dc"},{f:"d2",t:"c2",tp:"dc"},{f:"d2",t:"c5",tp:"dc"},{f:"d3",t:"c3",tp:"dc"},{f:"d3",t:"c5",tp:"dc"},{f:"d4",t:"c4",tp:"dc"},{f:"d4",t:"c5",tp:"dc"}];
  const all=[...queries.map(n=>({...n,type:"query"})),...docs.map(n=>({...n,type:"doc"})),...concepts.map(n=>({...n,type:"concept"}))];
  const nm=Object.fromEntries(all.map(n=>[n.id,n]));
  const getHl=()=>{if(!sq)return new Set();const h=new Set([sq]);edges.forEach(e=>{if(e.f===sq)h.add(e.t)});edges.forEach(e=>{if(h.has(e.f)&&e.tp==="dc")h.add(e.t)});return h};
  const hl=getHl();
  const nc=t=>t==="query"?C.cyan:t==="doc"?C.accent:C.magenta;

  return <div>
    <div style={{display:"flex",gap:24,marginBottom:16}}>{[["Queries",C.cyan],["Documents",C.accent],["Concepts",C.magenta]].map(([l,c])=><div key={l} style={{display:"flex",alignItems:"center",gap:6}}><div style={{width:12,height:12,borderRadius:4,background:c}}/><span style={{fontSize:13,color:C.muted}}>{l}</span></div>)}</div>
    <p style={{color:C.dim,fontSize:13,marginBottom:12}}>👆 Click a <strong style={{color:C.cyan}}>query node</strong> to trace its path through documents to concepts</p>
    <div style={{position:"relative",height:330,background:C.card,borderRadius:16,border:`1px solid ${C.border}`,overflow:"hidden"}}>
      <svg width="100%" height="100%" style={{position:"absolute",top:0,left:0}}>
        {edges.map((e,i)=>{const f=nm[e.f],t=nm[e.t];if(!f||!t)return null;const a=hl.has(e.f)&&hl.has(e.t);return <line key={i} x1={f.x+90} y1={f.y+16} x2={t.x} y2={t.y+16} stroke={a?(e.tp==="qd"?C.cyan:C.magenta):C.border} strokeWidth={a?2.5:1} strokeOpacity={a?0.8:0.3} style={{transition:"all 0.4s"}}/>})}
      </svg>
      {all.map(n=>{const col=nc(n.type);const a=!sq||hl.has(n.id);const click=n.type==="query";
        return <div key={n.id} onClick={()=>click&&setSq(sq===n.id?null:n.id)} style={{position:"absolute",left:n.x,top:n.y,padding:"6px 12px",borderRadius:8,fontSize:12,fontWeight:600,background:a?col+"22":C.surface,border:`1.5px solid ${a?col:C.border}`,color:a?col:C.dim,cursor:click?"pointer":"default",transition:"all 0.4s",whiteSpace:"nowrap",boxShadow:a&&sq?`0 0 12px ${col}22`:"none",opacity:a?1:0.35}}>{n.label}</div>})}
    </div>
    {sq&&<div style={{marginTop:12,padding:"12px 16px",background:C.cyan+"11",borderRadius:12,borderLeft:`3px solid ${C.cyan}`,fontSize:14,color:C.text,lineHeight:1.6}}>
      <strong>Tracing "{queries.find(q=>q.id===sq)?.label}":</strong> User clicked documents shown in purple, which contain concepts shown in pink. Doc₂ (Energy Conversion Tech) is shared by all queries — this is how the QDC (Query-Document-Concept) approach discovers that seemingly different queries belong to the same topical neighborhood.
    </div>}
    {!sq&&<div style={{marginTop:12,padding:"12px 16px",background:C.surface,borderRadius:12,border:`1px solid ${C.border}`,fontSize:13,color:C.dim,textAlign:"center"}}>Click any query on the left to highlight its connections through the tripartite graph</div>}
  </div>;
}

function QDCDryRun(){
  const[step,setStep]=useState(0);
  const names=["Raw Click-Through Logs","TF-IDF Feature Extraction","Agglomerative Clustering"];
  const content=[
    <div key={0}><div style={codeBox(C.cyan)}><div style={{color:C.cyan}}>User A: <span style={{color:C.text,fontWeight:700}}>"solar panel efficiency"</span></div><div style={{color:C.dim,marginLeft:20}}>→ clicks: <span style={{color:C.accent}}>Doc₁</span> (Photovoltaic Cells Guide), <span style={{color:C.accent}}>Doc₂</span> (Energy Conversion Tech)</div><div style={{height:8}}/><div style={{color:C.cyan}}>User B: <span style={{color:C.text,fontWeight:700}}>"wind turbine design"</span></div><div style={{color:C.dim,marginLeft:20}}>→ clicks: <span style={{color:C.accent}}>Doc₃</span> (Aerodynamics of Turbines), <span style={{color:C.accent}}>Doc₂</span> (Energy Conversion Tech)</div><div style={{height:8}}/><div style={{color:C.cyan}}>User C: <span style={{color:C.text,fontWeight:700}}>"renewable energy cost"</span></div><div style={{color:C.dim,marginLeft:20}}>→ clicks: <span style={{color:C.accent}}>Doc₄</span> (Green Energy Economics), <span style={{color:C.accent}}>Doc₂</span> (Energy Conversion Tech)</div></div>{note(C.cyan,<span><strong>Doc₂</strong> is clicked by all three queries — this shared document is the key signal that connects these queries topically.</span>)}</div>,
    <div key={1}><p style={{color:C.muted,marginBottom:10,fontSize:14}}>spaCy + BERT extract concepts, then TF-IDF weights them:</p><div style={codeBox(C.orange)}><div style={{color:C.orange,fontWeight:600,marginBottom:6}}>WF(Q₁, "photovoltaic") = (n₁₁ / Σnₖ₁) × log(N / m₁)</div><div style={{color:C.dim}}>  n₁₁=3 (freq in Doc₁), Σnₖ₁=45 (total terms), N=4 (total docs), m₁=1 (docs with term)</div><div style={{color:C.text,fontWeight:700}}>  = (3/45) × log(4/1) = 0.067 × 0.602 = {hn("0.040")}</div><div style={{height:8}}/><div style={{color:C.orange,fontWeight:600}}>WF(Q₁, "renewable") in Doc₂:</div><div style={{color:C.dim}}>  n=2, Σnₖ=38, N=4, m=2</div><div style={{color:C.text,fontWeight:700}}>  = (2/38) × log(4/2) = 0.053 × 0.301 = {hn("0.016")} ← lower weight (less specific)</div></div>{note(C.accent,<span>"photovoltaic" scores 2.5× higher than "renewable" because it appears in fewer documents — higher IDF makes it more discriminative for clustering.</span>)}</div>,
    <div key={2}><div style={codeBox(C.green)}><div style={{color:C.green,fontWeight:600,marginBottom:6}}>Pairwise Similarity (Jaccard on shared doc+concept sets):</div><div style={{color:C.dim}}>  sim(Q₁, Q₂) = |shared| / |union| = 3/9 = {hn("0.33",C.green)}</div><div style={{color:C.dim}}>  sim(Q₁, Q₃) = 3/10 = {hn("0.30",C.green)}  |  sim(Q₂, Q₃) = 3/10 = {hn("0.30",C.green)}</div><div style={{height:8}}/><div style={{color:C.green,fontWeight:600}}>Agglomerative steps (threshold=0.25):</div><div style={{color:C.text}}>  Step 1: Merge Q₁+Q₂ (highest sim=0.33) → {"{Q₁, Q₂}"}</div><div style={{color:C.text}}>  Step 2: Merge {"{Q₁, Q₂}"}+Q₃ (sim=0.30 &gt; 0.25)</div><div style={{color:C.yellow,fontWeight:700,marginTop:8}}>  Result: ONE hard cluster = {"{Q₁, Q₂, Q₃}"} with all 11 concepts mixed</div></div>{note(C.green,<span>All queries land in one cluster because they share Doc₂. But "solar panels" ≠ "wind turbines" — this <strong>hard clustering problem</strong> is what Split-Merge fixes next.</span>)}</div>,
  ];
  return <div>
    <StepNav steps={names} active={step} onChange={setStep} color={C.cyan}/>
    <div key={step} style={{animation:"fadeIn 0.3s ease"}}>{content[step]}</div>
    <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}`}</style>
  </div>;
}

/* ═══════════════════════════════════════════════════════════ */
/*  SPLIT-MERGE — Interactive + Dry Run                       */
/* ═══════════════════════════════════════════════════════════ */
function SplitMergeSection(){
  const[tab,setTab]=useState("interactive");
  return <div>
    <h2 style={{fontSize:28,fontWeight:800,marginBottom:8,fontFamily:"'Georgia',serif"}}>Split-Merge Refinement</h2>
    <p style={{color:C.muted,marginBottom:16,fontSize:15}}>Transforming hard clusters into soft, homogeneous clusters through SPLIT and MERGE phases.</p>
    <TabSwitcher tabs={[{id:"interactive",icon:"🔀",label:"Interactive Phase Toggle"},{id:"dryrun",icon:"🔢",label:"Dry Run with Numbers"}]} active={tab} onChange={setTab} color={C.magenta}/>
    {tab==="interactive"?<SplitMergeInteractive/>:<SplitMergeDryRun/>}
  </div>;
}

function SplitMergeInteractive(){
  const[phase,setPhase]=useState(0);
  const data=[[{label:"Cluster A (mixed)",items:["photovoltaic","solar cell","efficiency","energy conversion","renewable","aerodynamics","turbine blade","wind","cost analysis","economics","power"],color:C.orange}],[{label:"A₁: Solar",items:["photovoltaic","solar cell","efficiency"],color:C.cyan},{label:"A₂: Wind",items:["aerodynamics","turbine blade","wind"],color:C.green},{label:"A₃: Energy General",items:["energy conversion","renewable","power"],color:C.orange},{label:"A₄: Economics",items:["cost analysis","economics"],color:C.magenta}],[{label:"Solar Energy",items:["photovoltaic","solar cell","efficiency"],color:C.cyan},{label:"Wind Energy",items:["aerodynamics","turbine blade","wind"],color:C.green},{label:"Energy General",items:["energy conversion","renewable","power"],color:C.orange},{label:"Energy Economics",items:["cost analysis","economics"],color:C.magenta}]];
  const labels=["Hard Clusters (QDC Output)","After SPLIT Phase","After MERGE Phase"];
  const descs=["The QDC clustering produces hard clusters where each concept belongs to exactly one cluster. Notice: 11 unrelated concepts are forced together because all queries shared a common document.","SPLIT-1 checks cluster homogeneity (average internal correlation = 0.34 < 0.50 threshold) → splits by topic sets. SPLIT-2 verifies each sub-cluster is now homogeneous (all above 0.50).","MERGE checks pairwise topic overlap between sub-clusters: overlap(Solar, Wind) = 0.00 → no merge. overlap(General, Economics) = 0.20 but combined homogeneity 0.48 < 0.50 → no merge. Final: 4 clean, homogeneous clusters."];

  return <div>
    <div style={{display:"flex",gap:8,marginBottom:20}}>
      {labels.map((l,i)=><button key={i} onClick={()=>setPhase(i)} style={{flex:1,padding:"10px 8px",fontSize:12,fontWeight:600,background:phase===i?C.magenta+"22":C.card,border:`1.5px solid ${phase===i?C.magenta:C.border}`,color:phase===i?C.magenta:C.muted,borderRadius:10,cursor:"pointer",transition:"all 0.3s"}}>{l}</button>)}
    </div>
    <div style={{display:"flex",flexWrap:"wrap",gap:12,marginBottom:16,minHeight:140}}>
      {data[phase].map((cl,i)=><div key={cl.label+phase} style={{flex:"1 1 180px",maxWidth:phase===0?"100%":240,background:C.card,borderRadius:14,border:`1.5px solid ${cl.color}44`,padding:14,animation:"fadeIn 0.4s ease",animationDelay:`${i*80}ms`,animationFillMode:"both"}}>
        <div style={{fontSize:13,fontWeight:700,color:cl.color,marginBottom:8,display:"flex",alignItems:"center",gap:6}}><div style={{width:8,height:8,borderRadius:4,background:cl.color}}/>{cl.label} <span style={{fontSize:10,color:C.dim}}>({cl.items.length})</span></div>
        <div style={{display:"flex",flexWrap:"wrap",gap:5}}>{cl.items.map(item=><span key={item} style={{padding:"3px 9px",borderRadius:6,fontSize:11,background:cl.color+"15",color:cl.color,border:`1px solid ${cl.color}22`,fontWeight:500}}>{item}</span>)}</div>
      </div>)}
    </div>
    <div style={{padding:"12px 16px",background:C.magenta+"0d",borderRadius:12,borderLeft:`3px solid ${C.magenta}`,fontSize:13,color:C.text,lineHeight:1.6}}>{descs[phase]}</div>
    <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}`}</style>
  </div>;
}

function SplitMergeDryRun(){
  const[step,setStep]=useState(0);
  const names=["Topic Set Identification","SPLIT: Homogeneity Check","MERGE: Overlap Check"];
  const content=[
    <div key={0}><p style={{color:C.muted,marginBottom:10,fontSize:14}}>For Q₁, compute concept correlation matrix and partition into topic sets:</p><div style={codeBox(C.magenta)}><div style={{color:C.text,fontWeight:600}}>Correlation Matrix for Q₁'s concepts (co-occurrence in docs):</div><div style={{fontFamily:"monospace",fontSize:11,color:C.dim,marginLeft:8,lineHeight:1.9,marginTop:4}}><div>{"             "}photov.  solar_c  effic.  energy_c  renew.</div><div>photovoltaic  {hn("1.00",C.green)}    {hn("0.92",C.green)}    {hn("0.88",C.green)}    0.21      0.18</div><div>solar_cell    {hn("0.92",C.green)}    {hn("1.00",C.green)}    {hn("0.85",C.green)}    0.19      0.16</div><div>energy_conv   0.21     0.19     0.23    {hn("1.00",C.cyan)}      {hn("0.78",C.cyan)}</div><div>renewable     0.18     0.16     0.20    {hn("0.78",C.cyan)}      {hn("1.00",C.cyan)}</div></div><div style={{height:8}}/><div style={{color:C.yellow,fontWeight:700}}>Partition (threshold=0.5):</div><div style={{color:C.green}}>  T₁ = {"{photovoltaic, solar cell, efficiency}"} (internal corr: 0.85–0.92)</div><div style={{color:C.cyan}}>  T₂ = {"{energy conversion, renewable, power}"} (internal: 0.68–0.78)</div></div>{note(C.magenta,<span>Cross-group correlations (0.16–0.23) are far below 0.5, confirming two distinct topic clusters within Q₁'s results.</span>)}</div>,
    <div key={1}><div style={codeBox(C.magenta)}><div style={{color:C.magenta,fontWeight:600,marginBottom:6}}>SPLIT-1: Homogeneity of Hard Cluster C₁</div><div style={{color:C.dim}}>  Avg intra-cluster correlation = mean of all pairwise = {hn("0.34",C.red)}</div><div style={{color:C.dim}}>  Homogeneity threshold = 0.50</div><div style={{color:C.red,fontWeight:600}}>  0.34 &lt; 0.50 → HETEROGENEOUS → SPLIT</div><div style={{height:10}}/><div style={{color:C.text,fontWeight:600}}>Split by dominant topic sets:</div><div style={{color:C.cyan}}>  C₁ₐ = {"{photovoltaic, solar cell, efficiency}"}      homogeneity = {hn("0.88",C.green)} ✓</div><div style={{color:C.green}}>  C₁ᵦ = {"{aerodynamics, turbine blade, wind}"}          homogeneity = {hn("0.91",C.green)} ✓</div><div style={{color:C.orange}}>  C₁ᵧ = {"{energy conversion, renewable, power}"}        homogeneity = {hn("0.72",C.green)} ✓</div><div style={{color:C.magenta}}>  C₁ᵨ = {"{cost analysis, economics}"}                   homogeneity = {hn("0.85",C.green)} ✓</div><div style={{color:C.green,fontWeight:700,marginTop:6}}>  SPLIT-2: All sub-clusters &gt; 0.50 → no further splitting needed</div></div></div>,
    <div key={2}><div style={codeBox(C.green)}><div style={{color:C.green,fontWeight:600,marginBottom:6}}>Pairwise topic overlap O(T,Tⱼ) = |T∩Tⱼ| / |T∪Tⱼ|:</div><div style={{color:C.dim}}>  overlap(C₁ₐ, C₁ᵦ) = |{"{}"}| / |{"{6}"}| = {hn("0.00",C.red)} → no merge</div><div style={{color:C.dim}}>  overlap(C₁ₐ, C₁ᵧ) = {hn("0.00",C.red)} → no merge</div><div style={{color:C.dim}}>  overlap(C₁ᵧ, C₁ᵨ) = |{"{renewable}"}| / |{"{5}"}| = {hn("0.20",C.orange)} → borderline</div><div style={{color:C.text,marginTop:6}}>  Combined homogeneity(C₁ᵧ+C₁ᵨ) = 0.48 &lt; 0.50 → {hn("no merge",C.red)}</div><div style={{color:C.yellow,fontWeight:700,marginTop:8}}>  Final: 4 clean, soft clusters ready for hierarchy insertion</div></div>{note(C.green,<span>Each concept can now appear in multiple clusters (soft clustering). The "renewable" concept connects Energy General and Economics semantically, but they're kept separate because merging would reduce homogeneity.</span>)}</div>,
  ];
  return <div>
    <StepNav steps={names} active={step} onChange={setStep} color={C.magenta}/>
    <div key={step} style={{animation:"fadeIn 0.3s ease"}}>{content[step]}</div>
    <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}`}</style>
  </div>;
}

/* ═══════════════════════════════════════════════════════════ */
/*  HIERARCHY — Interactive Tree + Dry Run                    */
/* ═══════════════════════════════════════════════════════════ */
function HierarchySection(){
  const[tab,setTab]=useState("interactive");
  return <div>
    <h2 style={{fontSize:28,fontWeight:800,marginBottom:8,fontFamily:"'Georgia',serif"}}>Hierarchy Building</h2>
    <p style={{color:C.muted,marginBottom:12,fontSize:15}}>Insert refined clusters into the DMOZ base hierarchy using the 3-test insertion sequence:</p>
    <div style={{display:"flex",gap:6,marginBottom:16,flexWrap:"wrap",alignItems:"center"}}>
      <span style={{...pill(C.accent),fontSize:12,padding:"4px 12px"}}>① Category Entropy — shared information?</span>
      <span style={{color:C.dim,fontSize:14}}>→</span>
      <span style={{...pill(C.magenta),fontSize:12,padding:"4px 12px"}}>② Importance Measure — meaningful terms?</span>
      <span style={{color:C.dim,fontSize:14}}>→</span>
      <span style={{...pill(C.green),fontSize:12,padding:"4px 12px"}}>③ Coverage Degree — hierarchical direction?</span>
    </div>
    <TabSwitcher tabs={[{id:"interactive",icon:"🌳",label:"Interactive Tree"},{id:"dryrun",icon:"🔢",label:"3-Test Dry Run"}]} active={tab} onChange={setTab} color={C.green}/>
    {tab==="interactive"?<HierarchyInteractive/>:<HierarchyDryRun/>}
  </div>;
}

function HierarchyInteractive(){
  const[step,setStep]=useState(0);
  const renderTree=(node,depth=0)=><div key={node.name+depth} style={{marginLeft:depth*28,marginTop:6}}>
    <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"5px 14px",borderRadius:8,background:node.highlight?node.highlight+"18":node.isRefined?C.orange+"18":node.isNew?C.green+"18":C.surface,border:`1.5px solid ${node.highlight?(node.highlight+"66"):node.isRefined?C.orange+"44":node.isNew?C.green+"44":C.border}`,transition:"all 0.4s",boxShadow:node.highlight?`0 0 12px ${node.highlight}22`:"none"}}>
      {depth>0&&<span style={{color:C.dim,fontSize:12}}>└─</span>}
      <span style={{fontSize:14,fontWeight:600,color:node.highlight||(node.isRefined?C.orange:node.isNew?C.green:C.text)}}>{node.name}</span>
      {node.isNew&&!node.tag&&<span style={pill(C.green)}>new</span>}
      {node.tag&&<span style={pill(node.highlight||C.green)}>{node.tag}</span>}
      {node.isRefined&&<span style={pill(C.orange)}>Phase 1</span>}
    </div>
    {node.children?.map(c=>renderTree(c,depth+1))}
  </div>;
  const trees=[
    {tree:{name:"Science",children:[{name:"Energy",children:[{name:"Fossil Fuels"},{name:"Nuclear"}]},{name:"Physics",children:[{name:"Mechanics"}]}]},
     desc:"Base hierarchy from DMOZ Open Directory Project. We'll insert clusters one by one and watch the 3-test sequence determine where each one goes."},

    {tree:{name:"Science",children:[{name:"Energy",highlight:C.accent,children:[{name:"Fossil Fuels"},{name:"Nuclear"},{name:"Solar Energy",isNew:true,highlight:C.green,tag:"CHILD of Energy"}]},{name:"Physics",children:[{name:"Mechanics"}]}]},
     desc:<span><strong style={{color:C.green}}>Parent-Child Insertion — Solar Energy:</strong><br/>① Category Entropy = 0.72 ✓ (shares "photovoltaic", "energy conversion", "renewable" with Energy)<br/>② Importance = 0.65 &gt; high threshold 0.50 ✓ → proceed to Test 3<br/>③ Coverage Degree: Solar→Energy = <strong>0.63</strong> vs Energy→Solar = <strong>0.21</strong><br/>↳ <strong>Asymmetric</strong>: Solar's concepts live inside Energy, but Energy is much broader → Solar is <strong>CHILD</strong></span>},

    {tree:{name:"Science",children:[{name:"Energy",highlight:C.accent,children:[{name:"Fossil Fuels"},{name:"Nuclear"},{name:"Solar Energy",isNew:true},{name:"Wind Energy",isNew:true,highlight:C.green,tag:"CHILD of Energy"}]},{name:"Physics",children:[{name:"Mechanics"}]}]},
     desc:<span><strong style={{color:C.green}}>Parent-Child Insertion — Wind Energy:</strong><br/>① Category Entropy = 0.68 ✓ (shares "turbine", "renewable", "energy conversion" with Energy)<br/>② Importance = 0.59 &gt; high threshold 0.50 ✓ → proceed to Test 3<br/>③ Coverage Degree: Wind→Energy = <strong>0.59</strong> vs Energy→Wind = <strong>0.19</strong><br/>↳ <strong>Same pattern</strong> as Solar: asymmetric coverage → Wind is <strong>CHILD</strong> of Energy<br/><br/><em style={{color:C.dim}}>Note: Wind was also tested against Solar Energy — Category Entropy = 0.32 ✓ but Coverage Degree was symmetric (0.31 vs 0.28) → sibling, not child. So Wind goes under Energy, not under Solar.</em></span>},

    {tree:{name:"Science",children:[{name:"Energy",children:[{name:"Fossil Fuels"},{name:"Nuclear"},{name:"Solar Energy",isNew:true},{name:"Wind Energy",isNew:true}]},{name:"Physics",highlight:C.accent,children:[{name:"Mechanics"},{name:"Thermodynamics",isNew:true,highlight:C.yellow,tag:"SIBLING of Mechanics"}]}]},
     desc:<span><strong style={{color:C.yellow}}>Sibling Insertion — Thermodynamics:</strong><br/>① Category Entropy vs Mechanics = 0.45 ✓ (shares "force", "energy", "motion")<br/>② Importance = <strong>0.35</strong> → between low (0.20) and high (0.50)<br/>↳ <strong>Stops here</strong>: moderate importance means they're related but no containment evidence<br/>→ Classified as <strong>RELATED SIBLING</strong> — placed beside Mechanics, not under it<br/><br/><em style={{color:C.dim}}>Key difference from Solar/Wind: Importance didn't reach the high threshold, so Test 3 (Coverage Degree) was never run.</em></span>},

    {tree:{name:"Science",children:[{name:"Energy",children:[{name:"Fossil Fuels"},{name:"Nuclear"},{name:"Renewable",isRefined:true,children:[{name:"Solar Energy",isNew:true},{name:"Wind Energy",isNew:true}]}]},{name:"Physics",children:[{name:"Mechanics"},{name:"Thermodynamics",isNew:true}]}]},
     desc:<span><strong style={{color:C.orange}}>After Refinement Phase 1:</strong> Solar↔Wind detected as related siblings (Category Entropy = 0.52, Importance = 0.41, Coverage Degree = 0.28/0.25 &gt; relaxed threshold 0.20). Grouped under new 'Renewable' parent.<br/>Thermodynamics stays as a sibling of Mechanics — not related enough to Mechanics to be grouped (different sub-domains of physics).</span>},
  ];
  return <div>
    <div style={{display:"flex",gap:6,marginBottom:20,flexWrap:"wrap"}}>
      {["Base Hierarchy","+ Solar (Child)","+ Wind (Child)","+ Thermo (Sibling)","After Refinement"].map((l,i)=><button key={i} onClick={()=>setStep(i)} style={{padding:"8px 14px",fontSize:12,fontWeight:600,borderRadius:8,cursor:"pointer",background:step===i?C.green+"22":C.card,border:`1.5px solid ${step===i?C.green:C.border}`,color:step===i?C.green:C.muted,transition:"all 0.2s"}}>{l}</button>)}
    </div>
    <div style={{background:C.card,borderRadius:16,padding:24,border:`1px solid ${C.border}`,minHeight:200}}>{renderTree(trees[step].tree)}</div>
    <div style={{marginTop:12,padding:"12px 16px",background:C.green+"0d",borderRadius:12,borderLeft:`3px solid ${C.green}`,fontSize:13,color:C.text,lineHeight:1.7}}>{trees[step].desc}</div>
  </div>;
}

function HierarchyDryRun(){
  const[step,setStep]=useState(0);
  const names=["Test 1: Category Entropy","Test 2: Importance Measure","Test 3: Coverage Degree","Parent-Child vs Sibling"];
  const content=[
    <div key={0}><p style={{color:C.muted,marginBottom:10,fontSize:14}}>Gate test: Do "Solar Energy" (X) and "Energy" (Y) share enough information to warrant further comparison?</p><div style={codeBox(C.accent)}><div style={{color:C.accent,fontWeight:600,marginBottom:8}}>Category Entropy (document frequency-based) — measures how much concept information is shared:</div><div style={{color:C.dim,marginLeft:16}}>"photovoltaic": in 3 of 12 Energy docs → m/N = 0.25</div><div style={{color:C.dim,marginLeft:16}}>"solar cell": 4/12 → 0.33  |  "efficiency": 6/12 → 0.50</div><div style={{color:C.text,fontWeight:600,marginTop:6}}>Category Entropy (doc-based) = -Σ (m/N)×log(m/N) = {hn("0.72")}  |  Category Entropy (concept-based) = {hn("0.68")}</div><div style={{color:C.yellow,fontWeight:700,marginTop:8}}>Thresholds: low = 0.30 (doc-based), 0.25 (concept-based)</div></div>{decBox(true,"Category Entropy: 0.72 > 0.30 AND 0.68 > 0.25 → PASS (sufficient shared info) → Proceed to Test 2")}<div style={{marginTop:12,padding:"10px 14px",background:C.red+"0d",borderRadius:8,borderLeft:`3px solid ${C.red}`,fontSize:13,color:C.text}}><strong>Contrast:</strong> "Solar Energy" vs "Physics" → Category Entropy = 0.08 and 0.05 → both FAIL → <span style={{color:C.red}}>DISJOINT</span> (no meaningful shared info)</div></div>,
    <div key={1}><p style={{color:C.muted,marginBottom:10,fontSize:14}}>Are the shared concepts meaningful domain terms (not generic words like "data" or "system")?</p><div style={codeBox(C.accent)}><div style={{color:C.accent,fontWeight:600,marginBottom:8}}>Importance Measure — sums inverse document frequency (1/M) for each shared concept. Rare terms score higher:</div><div style={{color:C.dim,marginLeft:16}}>"photovoltaic": appears in M=3 docs across entire hierarchy → 1/3 = {hn("0.33",C.green)} (specific, high importance)</div><div style={{color:C.dim,marginLeft:16}}>"solar cell": M=4 → {hn("0.25",C.green)} (fairly specific)</div><div style={{color:C.dim,marginLeft:16}}>"efficiency": M=15 → {hn("0.07",C.orange)} (generic word, low importance)</div><div style={{color:C.text,fontWeight:600,marginTop:6}}>Importance Measure = 0.33 + 0.25 + 0.07 = {hn("0.65")}</div><div style={{height:6}}/><div style={{color:C.accent,fontWeight:600}}>Variance-based Importance — concepts with high frequency variation across docs are more discriminative:</div><div style={{color:C.text,fontWeight:600}}>Variance-based Importance = {hn("0.58")}</div><div style={{color:C.yellow,fontWeight:700,marginTop:8}}>Thresholds: low = 0.20, high = 0.50</div></div>{decBox(true,"Importance = 0.65 > high threshold (0.50) → HIGH confidence (shared terms are meaningful) → Proceed to Test 3")}{note(C.orange,<span><strong>What if Importance was between low and high?</strong> e.g., Importance = 0.35, Variance = 0.28 → meaningful but not strong enough for parent-child → classified as <strong>RELATED SIBLING</strong> (skip Test 3).</span>)}</div>,
    <div key={2}><p style={{color:C.muted,marginBottom:10,fontSize:14}}>Which category contains the other? Coverage Degree measures what fraction of one category's concepts appear in the other — the <em>asymmetry</em> reveals the parent-child direction.</p><div style={codeBox(C.green)}><div style={{color:C.green,fontWeight:600}}>Coverage Degree (Solar → Energy) = what fraction of Solar's concepts appear within Energy's documents:</div><div style={{color:C.dim,marginLeft:16}}>"photovoltaic": 3/12 docs, wt 0.6 → 0.15 | "solar cell": 4/12, wt 0.7 → 0.23 | "efficiency": 6/12, wt 0.5 → 0.25</div><div style={{color:C.text,fontWeight:600}}>Coverage Degree (Solar → Energy) = {hn("0.63",C.green)} — most of Solar's concepts ARE found in Energy</div><div style={{height:8}}/><div style={{color:C.green,fontWeight:600}}>Coverage Degree (Energy → Solar) = what fraction of Energy's concepts appear in Solar:</div><div style={{color:C.dim,marginLeft:16}}>Energy has 18 concepts; Solar only covers 5 of them partially</div><div style={{color:C.text,fontWeight:600}}>Coverage Degree (Energy → Solar) = {hn("0.21",C.orange)} — Energy's concepts are NOT mostly in Solar</div><div style={{height:8}}/><div style={{color:C.yellow,fontWeight:700}}>Threshold = 0.40</div><div style={{color:C.text,fontWeight:700,marginTop:6}}>0.63 &gt; 0.40 ✓ AND 0.63 &gt; 0.21 → Solar is CONTAINED within Energy (asymmetric coverage)</div></div>{decBox(true,"Coverage Degree confirms: Solar Energy → CHILD of Energy (Solar's concepts live inside Energy, but Energy is much broader)")}{arrDown()}<div style={{fontFamily:"monospace",fontSize:13,color:C.dim,lineHeight:2,background:C.card,padding:16,borderRadius:12,border:`1px solid ${C.border}`}}><div style={{color:C.text}}>Science/</div><div style={{marginLeft:20}}>├─ Energy/</div><div style={{marginLeft:40}}>├─ Fossil Fuels/ | ├─ Nuclear/</div><div style={{marginLeft:40}}>├─ <span style={{color:C.green,fontWeight:700}}>Solar Energy/</span> <span style={pill(C.green)}>INSERTED as child</span></div></div></div>,

    /* NEW: Parent-Child vs Sibling comparison */
    <div key={3}>
      <p style={{color:C.muted,marginBottom:16,fontSize:14}}>The same 3-test sequence produces <strong>different outcomes</strong> based on the numbers. Here are two real insertions side by side:</p>

      <div style={{display:"flex",gap:16,flexWrap:"wrap",marginBottom:16}}>
        {/* Parent-Child card */}
        <div style={{flex:"1 1 300px",background:C.surface,borderRadius:14,border:`2px solid ${C.green}44`,padding:18,position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:C.green}}/>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
            <span style={{...pill(C.green),fontSize:12,padding:"4px 10px"}}>PARENT-CHILD</span>
            <span style={{fontSize:14,fontWeight:700,color:C.text}}>Solar Energy → Energy</span>
          </div>
          <div style={{fontSize:12,color:C.dim,lineHeight:1.8,fontFamily:"'Fira Code','Consolas',monospace"}}>
            <div>Test 1: Category Entropy = {hn("0.72",C.green)} ✓</div>
            <div style={{color:C.dim,fontSize:11,marginLeft:16,lineHeight:1.4,marginBottom:4}}>Shared concepts: "photovoltaic", "energy conversion", "renewable", "efficiency"</div>
            <div>Test 2: Importance     = {hn("0.65",C.green)} &gt; high(0.50) ✓</div>
            <div style={{color:C.dim,fontSize:11,marginLeft:16,lineHeight:1.4,marginBottom:4}}>Shared terms are domain-specific → proceed to Test 3</div>
            <div>Test 3: Coverage Degree</div>
            <div style={{marginLeft:16}}>Solar → Energy = {hn("0.63",C.green)} <span style={{color:C.dim}}>(Solar's concepts found in Energy)</span></div>
            <div style={{marginLeft:16}}>Energy → Solar = {hn("0.21",C.orange)} <span style={{color:C.dim}}>(Energy is much broader)</span></div>
            <div style={{marginTop:6,color:C.green,fontWeight:700}}>→ Asymmetric: 0.63 ≫ 0.21 → Solar is CHILD</div>
          </div>
          <div style={{marginTop:12,fontFamily:"monospace",fontSize:12,color:C.dim,lineHeight:1.8,background:C.bg,borderRadius:8,padding:10}}>
            <div>Energy/</div>
            <div style={{marginLeft:16}}>├─ Fossil Fuels/</div>
            <div style={{marginLeft:16}}>├─ Nuclear/</div>
            <div style={{marginLeft:16}}>└─ <span style={{color:C.green,fontWeight:700}}>Solar Energy/ ← inserted UNDER Energy</span></div>
          </div>
          <div style={{marginTop:10,fontSize:11,color:C.green,fontStyle:"italic"}}>Key insight: high asymmetry in Coverage Degree means one category "contains" the other → parent-child</div>
        </div>

        {/* Sibling card */}
        <div style={{flex:"1 1 300px",background:C.surface,borderRadius:14,border:`2px solid ${C.yellow}44`,padding:18,position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:C.yellow}}/>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
            <span style={{...pill(C.yellow),fontSize:12,padding:"4px 10px"}}>RELATED SIBLING</span>
            <span style={{fontSize:14,fontWeight:700,color:C.text}}>Thermodynamics → Mechanics</span>
          </div>
          <div style={{fontSize:12,color:C.dim,lineHeight:1.8,fontFamily:"'Fira Code','Consolas',monospace"}}>
            <div>Test 1: Category Entropy = {hn("0.45",C.green)} ✓</div>
            <div style={{color:C.dim,fontSize:11,marginLeft:16,lineHeight:1.4,marginBottom:4}}>Shared concepts: "force", "energy", "motion", "physics"</div>
            <div>Test 2: Importance     = {hn("0.35",C.yellow)} → between low(0.20) and high(0.50)</div>
            <div style={{color:C.dim,fontSize:11,marginLeft:16,lineHeight:1.4,marginBottom:4}}>Shared terms are meaningful but not strong enough for containment</div>
            <div style={{color:C.yellow,fontWeight:600}}>→ STOP at Test 2 — skip Test 3 entirely</div>
            <div style={{marginTop:4,color:C.dim,fontSize:11}}>Importance between low and high = related but no parent-child evidence</div>
          </div>
          <div style={{marginTop:12,fontFamily:"monospace",fontSize:12,color:C.dim,lineHeight:1.8,background:C.bg,borderRadius:8,padding:10}}>
            <div>Physics/</div>
            <div style={{marginLeft:16}}>├─ Mechanics/</div>
            <div style={{marginLeft:16}}>└─ <span style={{color:C.yellow,fontWeight:700}}>Thermodynamics/ ← inserted BESIDE Mechanics</span></div>
          </div>
          <div style={{marginTop:10,fontSize:11,color:C.yellow,fontStyle:"italic"}}>Key insight: moderate Importance means they're related but neither contains the other → sibling</div>
        </div>
      </div>

      {/* Decision flowchart */}
      <div style={{background:C.card,borderRadius:12,padding:16,border:`1px solid ${C.border}`}}>
        <div style={{fontSize:13,fontWeight:700,color:C.text,marginBottom:10}}>Decision Flowchart Summary</div>
        <div style={{fontSize:12,color:C.muted,lineHeight:2.0,fontFamily:"'Fira Code','Consolas',monospace"}}>
          <div>Test 1 (Category Entropy) <span style={{color:C.dim}}>──── FAIL ──→</span> <span style={{color:C.red,fontWeight:600}}>DISJOINT</span> <span style={{color:C.dim}}>(e.g., Solar vs Physics = 0.08)</span></div>
          <div><span style={{color:C.dim}}>  │ PASS</span></div>
          <div>Test 2 (Importance)       <span style={{color:C.dim}}>──── FAIL ──→</span> <span style={{color:C.red,fontWeight:600}}>DISJOINT</span></div>
          <div><span style={{color:C.dim}}>  │ PASS (low-mid)</span> <span style={{color:C.dim}}>─────────→</span> <span style={{color:C.yellow,fontWeight:600}}>RELATED SIBLING</span> <span style={{color:C.dim}}>(e.g., Thermo: IM=0.35)</span></div>
          <div><span style={{color:C.dim}}>  │ PASS (high)</span></div>
          <div>Test 3 (Coverage Degree)  <span style={{color:C.dim}}>── asymmetric →</span> <span style={{color:C.green,fontWeight:600}}>PARENT-CHILD</span> <span style={{color:C.dim}}>(e.g., Solar: CD=0.63 vs 0.21)</span></div>
          <div><span style={{color:C.dim}}>                          ── symmetric ──→</span> <span style={{color:C.yellow,fontWeight:600}}>SIBLING</span> <span style={{color:C.dim}}>(e.g., CD=0.35 vs 0.32)</span></div>
          <div><span style={{color:C.dim}}>                          ── both high ──→</span> <span style={{color:C.magenta,fontWeight:600}}>EXACT MATCH → MERGE</span> <span style={{color:C.dim}}>(via Mutual Information)</span></div>
        </div>
      </div>
    </div>,
  ];
  return <div>
    <StepNav steps={names} active={step} onChange={setStep} color={C.green}/>
    <div key={step} style={{animation:"fadeIn 0.3s ease"}}>{content[step]}</div>
    <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}`}</style>
  </div>;
}

/* ═══════════════════════════════════════════════════════════ */
/*  REFINEMENT — Interactive + Dry Run                        */
/* ═══════════════════════════════════════════════════════════ */
function RefinementSection(){
  const[tab,setTab]=useState("interactive");
  return <div>
    <h2 style={{fontSize:28,fontWeight:800,marginBottom:8,fontFamily:"'Georgia',serif"}}>Refinement Module</h2>
    <p style={{color:C.muted,marginBottom:16,fontSize:15}}>Phase 1 (Grouping) identifies related siblings and groups them under new parent categories. Phase 2 (Merging) detects and merges duplicate categories using Mutual Information.</p>
    <TabSwitcher tabs={[{id:"interactive",icon:"🔧",label:"Interactive Before/After"},{id:"dryrun",icon:"🔢",label:"Phase 1 & 2 Dry Run"}]} active={tab} onChange={setTab} color={C.orange}/>
    {tab==="interactive"?<RefinementInteractive/>:<RefinementDryRun/>}
  </div>;
}

function RefinementInteractive(){
  const[phase,setPhase]=useState(0);
  const[selectedPair,setSelectedPair]=useState(null);

  /* Phase 0: Before — flat siblings */
  /* Phase 1: Click pairwise comparisons */
  /* Phase 2: After Phase 1 — grouped under new parent */
  /* Phase 3: Existing category absorbs children (Algorithms example) */
  /* Phase 4: After Phase 2 — merge duplicates */

  const pairData={
    "Solar↔Wind":{ce:0.52,im:0.41,cd1:0.28,cd2:0.25,result:"related",reason:"Both share 'renewable', 'energy conversion', 'power generation' — related renewable sources"},
    "Solar↔Geo":{ce:0.45,im:0.38,cd1:0.22,cd2:0.19,result:"related",reason:"Share 'renewable energy', 'power plant', 'electricity generation' — different renewable technologies"},
    "Solar↔Fossil":{ce:0.15,im:0.08,cd1:0.05,cd2:0.04,result:"disjoint",reason:"Category Entropy 0.15 < 0.30 threshold — FAIL at gate. Fossil fuels and solar have almost no concept overlap"},
    "Wind↔Geo":{ce:0.48,im:0.36,cd1:0.24,cd2:0.21,result:"related",reason:"Share 'renewable', 'power capacity', 'environmental impact' — similar renewable energy profile"},
    "Wind↔Nuclear":{ce:0.12,im:0.06,cd1:0.03,cd2:0.03,result:"disjoint",reason:"Category Entropy 0.12 < 0.30 — FAIL. Wind and nuclear use completely different technologies"},
    "Fossil↔Nuclear":{ce:0.22,im:0.14,cd1:0.10,cd2:0.08,result:"disjoint",reason:"Category Entropy 0.22 < 0.30 — FAIL at gate. Different energy sources with different concept vocabularies"},
  };

  const allPairs=Object.keys(pairData);

  const phases=[
    // Phase 0: Before
    <div key={0}>
      <div style={{fontFamily:"monospace",fontSize:13,color:C.dim,lineHeight:2.1,background:C.card,borderRadius:12,padding:16,border:`1px solid ${C.border}`}}>
        <div style={{color:C.text}}>Science/</div>
        <div style={{marginLeft:20}}>├─ Energy/</div>
        <div style={{marginLeft:40}}>├─ Fossil Fuels/</div>
        <div style={{marginLeft:40}}>├─ Nuclear/</div>
        <div style={{marginLeft:40}}>├─ <span style={{color:C.cyan}}>Solar Energy/</span> <span style={{fontSize:10,color:C.dim}}>(inserted round 1)</span></div>
        <div style={{marginLeft:40}}>├─ <span style={{color:C.green}}>Wind Energy/</span> <span style={{fontSize:10,color:C.dim}}>(inserted round 2)</span></div>
        <div style={{marginLeft:40}}>├─ <span style={{color:C.magenta}}>Geothermal/</span> <span style={{fontSize:10,color:C.dim}}>(inserted round 3)</span></div>
        <div style={{marginLeft:40}}>├─ <span style={{color:C.orange}}>Hydropower/</span> <span style={{fontSize:10,color:C.dim}}>(inserted round 3)</span></div>
      </div>
      {note(C.orange,<span>After multiple insertion rounds, six categories sit as flat siblings under Energy. The hierarchy needs reorganization — Solar, Wind, Geothermal, Hydropower are all renewable sources and should be grouped together.</span>)}
    </div>,

    // Phase 1: Interactive pairwise comparison
    <div key={1}>
      <p style={{color:C.muted,marginBottom:12,fontSize:14}}>Phase 1 tests <strong>every pair</strong> of siblings. Click any pair below to see the comparison:</p>
      <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:16}}>
        {allPairs.map(pair=>{
          const d=pairData[pair];const active=selectedPair===pair;
          const col=d.result==="related"?C.green:C.red;
          return <button key={pair} onClick={()=>setSelectedPair(active?null:pair)} style={{padding:"8px 14px",fontSize:12,fontWeight:600,borderRadius:8,cursor:"pointer",background:active?col+"22":C.card,border:`1.5px solid ${active?col:C.border}`,color:active?col:C.muted,transition:"all 0.2s"}}>{pair} {d.result==="related"?"✓":"✗"}</button>;
        })}
      </div>
      {selectedPair&&(()=>{
        const d=pairData[selectedPair];const isRelated=d.result==="related";const col=isRelated?C.green:C.red;
        return <div style={{animation:"fadeIn 0.3s ease"}}>
          <div style={{background:C.surface,borderRadius:12,padding:16,border:`1.5px solid ${col}33`,marginBottom:12}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
              <span style={{fontSize:15,fontWeight:700,color:C.text}}>{selectedPair}</span>
              <span style={pill(col)}>{isRelated?"RELATED":"DISJOINT"}</span>
            </div>
            <div style={{fontFamily:"'Fira Code','Consolas',monospace",fontSize:12,lineHeight:2,color:C.dim}}>
              <div>Category Entropy     = {hn(d.ce.toFixed(2),d.ce>=0.30?C.green:C.red)} {d.ce>=0.30?"✓ > 0.30":<span style={{color:C.red}}>✗ &lt; 0.30 → FAIL (gate test)</span>}</div>
              {d.ce>=0.30&&<div>Importance Measure   = {hn(d.im.toFixed(2),d.im>=0.20?C.green:C.red)} {d.im>=0.20?"✓ > 0.20":"✗"}</div>}
              {d.ce>=0.30&&d.im>=0.20&&<div>Coverage Degree      = {hn(d.cd1.toFixed(2),C.cyan)} / {hn(d.cd2.toFixed(2),C.cyan)} {d.cd1>=0.20&&d.cd2>=0.20?"✓ both > 0.20 (relaxed threshold)":"✗"}</div>}
            </div>
            <div style={{marginTop:8,fontSize:12,color:col,fontStyle:"italic"}}>{d.reason}</div>
          </div>
        </div>;
      })()}
      {!selectedPair&&<div style={{background:C.surface,borderRadius:12,padding:16,border:`1px solid ${C.border}`,textAlign:"center",color:C.dim,fontSize:13}}>Click any pair above to see the pairwise comparison with actual measure values</div>}
      <div style={{marginTop:12,padding:"10px 14px",background:C.green+"0d",borderRadius:8,borderLeft:`3px solid ${C.green}`,fontSize:13,color:C.text}}>
        <strong>Result:</strong> Solar↔Wind ✓, Solar↔Geo ✓, Wind↔Geo ✓, Solar↔Hydro ✓, Wind↔Hydro ✓, Geo↔Hydro ✓ → they form a <strong>connected group</strong>. Fossil↔any ✗, Nuclear↔any ✗ → stay separate.
      </div>
    </div>,

    // Phase 2: Grouped under new parent
    <div key={2}>
      <div style={{fontFamily:"monospace",fontSize:13,color:C.dim,lineHeight:2.1,background:C.card,borderRadius:12,padding:16,border:`1px solid ${C.border}`}}>
        <div style={{color:C.text}}>Science/</div>
        <div style={{marginLeft:20}}>├─ Energy/</div>
        <div style={{marginLeft:40}}>├─ Fossil Fuels/</div>
        <div style={{marginLeft:40}}>├─ Nuclear/</div>
        <div style={{marginLeft:40}}>├─ <span style={{color:C.orange,fontWeight:700}}>Renewable Energy/</span> <span style={pill(C.orange)}>NEW PARENT</span></div>
        <div style={{marginLeft:60}}>├─ <span style={{color:C.cyan}}>Solar Energy/</span></div>
        <div style={{marginLeft:60}}>├─ <span style={{color:C.green}}>Wind Energy/</span></div>
        <div style={{marginLeft:60}}>├─ <span style={{color:C.magenta}}>Geothermal/</span></div>
        <div style={{marginLeft:60}}>├─ <span style={{color:C.orange}}>Hydropower/</span></div>
      </div>
      {note(C.orange,<span>Phase 1 creates "Renewable Energy" as a new parent from the <strong>common concepts</strong> of the related group (renewable, power generation, clean energy). Fossil Fuels and Nuclear remain direct children of Energy — they failed the gate test against the renewable group.</span>)}
    </div>,

    // Phase 3: Existing category absorbs children
    <div key={3}>
      <p style={{color:C.muted,marginBottom:12,fontSize:14}}>Phase 1 doesn't always create <em>new</em> parents — it can also detect that an <strong>existing base category</strong> should absorb related clusters:</p>
      <div style={{display:"flex",gap:16,flexWrap:"wrap",marginBottom:12}}>
        <div style={{flex:"1 1 280px",fontFamily:"monospace",fontSize:12,color:C.dim,lineHeight:2,background:C.surface,borderRadius:10,padding:14,border:`1px solid ${C.red}33`}}>
          <div style={{fontFamily:"sans-serif",fontSize:13,fontWeight:700,color:C.red,marginBottom:6}}>Before (flat siblings under Science/)</div>
          <div>Science/</div>
          <div style={{marginLeft:16}}>├─ <span style={{color:C.accent}}>Theory and Algorithms/</span> <span style={{fontSize:10,color:C.dim}}>← existing</span></div>
          <div style={{marginLeft:16}}>├─ <span style={{color:C.cyan}}>Sorting Algorithms/</span> <span style={{fontSize:10,color:C.dim}}>← new cluster</span></div>
          <div style={{marginLeft:16}}>├─ <span style={{color:C.green}}>Graph Algorithms/</span> <span style={{fontSize:10,color:C.dim}}>← new cluster</span></div>
          <div style={{marginLeft:16}}>├─ <span style={{color:C.magenta}}>Data Structures/</span> <span style={{fontSize:10,color:C.dim}}>← new cluster</span></div>
        </div>
        <div style={{flex:"1 1 280px",fontFamily:"monospace",fontSize:12,color:C.dim,lineHeight:2,background:C.surface,borderRadius:10,padding:14,border:`1px solid ${C.green}33`}}>
          <div style={{fontFamily:"sans-serif",fontSize:13,fontWeight:700,color:C.green,marginBottom:6}}>After (existing category becomes parent)</div>
          <div>Science/</div>
          <div style={{marginLeft:16}}>├─ <span style={{color:C.accent,fontWeight:700}}>Theory and Algorithms/</span> <span style={pill(C.accent)}>EXISTING → parent</span></div>
          <div style={{marginLeft:32}}>├─ <span style={{color:C.cyan}}>Sorting Algorithms/</span></div>
          <div style={{marginLeft:32}}>├─ <span style={{color:C.green}}>Graph Algorithms/</span></div>
          <div style={{marginLeft:32}}>├─ <span style={{color:C.magenta}}>Data Structures/</span></div>
        </div>
      </div>
      <div style={{background:C.card,borderRadius:12,padding:16,border:`1px solid ${C.border}`,marginBottom:12}}>
        <div style={{fontSize:13,fontWeight:700,color:C.accent,marginBottom:8}}>How it works:</div>
        <div style={{fontSize:12,color:C.muted,lineHeight:1.8}}>
          <div>1. Phase 1 finds {`{Sorting, Graph, Data Structures}`} are all related (Category Entropy ≥ 0.30 pairwise)</div>
          <div>2. Before creating a <em>new</em> parent, it checks: <strong>does any existing sibling already match this group?</strong></div>
          <div>3. Tests "Theory and Algorithms" against the group's aggregated concepts:</div>
          <div style={{marginLeft:16}}>Category Entropy({hn("Theory & Algo",C.accent)}, {hn("group",C.green)}) = {hn("0.71",C.green)} ✓ | Importance = {hn("0.55",C.green)} ✓ | Coverage Degree = {hn("0.48",C.green)} &gt; {hn("0.15",C.dim)} ✓</div>
          <div>4. <strong>Match found!</strong> → moves the group under the existing "Theory and Algorithms" instead of creating a new parent</div>
        </div>
      </div>
      {note(C.accent,<span>This is a key advantage: the refinement module reuses existing hierarchy structure when possible, keeping the tree clean instead of creating redundant intermediate categories.</span>)}
    </div>,

    // Phase 4: Phase 2 merge
    <div key={4}>
      <div style={{fontFamily:"monospace",fontSize:13,color:C.dim,lineHeight:2.1,background:C.card,borderRadius:12,padding:16,border:`1px solid ${C.border}`}}>
        <div style={{color:C.text}}>Science/</div>
        <div style={{marginLeft:20}}>├─ Energy/</div>
        <div style={{marginLeft:40}}>├─ Fossil Fuels/</div>
        <div style={{marginLeft:40}}>├─ Nuclear/</div>
        <div style={{marginLeft:40}}>├─ <span style={{color:C.orange,fontWeight:700}}>Renewable Energy/</span></div>
        <div style={{marginLeft:60}}>├─ <span style={{color:C.cyan}}>Solar Energy/</span> <span style={pill(C.magenta)}>merged "Solar Power" (MI=0.82)</span></div>
        <div style={{marginLeft:60}}>├─ <span style={{color:C.green}}>Wind Energy/</span></div>
        <div style={{marginLeft:60}}>├─ <span style={{color:C.magenta}}>Geothermal/</span></div>
        <div style={{marginLeft:60}}>├─ <span style={{color:C.orange}}>Hydropower/</span></div>
        <div style={{marginLeft:20}}>├─ Physics/</div>
        <div style={{marginLeft:40}}>├─ Mechanics/</div>
        <div style={{marginLeft:40}}>├─ <del style={{color:C.red}}>Solar Power/</del> <span style={{fontSize:10,color:C.red}}>REMOVED (MI = 0.82 &gt; 0.70 → equivalent to Solar Energy)</span></div>
      </div>
      {note(C.magenta,<span><strong>Phase 2 (Merging):</strong> "Solar Power" was incorrectly placed under Physics in a previous round. Mutual Information between "Solar Energy" and "Solar Power" = 0.82 &gt; threshold 0.70 → they share 80%+ of their concept vocabulary → <strong>equivalent categories → merge</strong>. Solar Power's concepts and documents are absorbed into Solar Energy.</span>)}
    </div>,
  ];

  const labels=["Before","Pairwise Comparison","After Grouping","Existing Cat as Parent","After Merging"];

  return <div>
    <div style={{display:"flex",gap:6,marginBottom:20,flexWrap:"wrap"}}>
      {labels.map((l,i)=><button key={i} onClick={()=>{setPhase(i);setSelectedPair(null)}} style={{padding:"8px 12px",fontSize:12,fontWeight:600,background:phase===i?C.orange+"22":C.card,border:`1.5px solid ${phase===i?C.orange:C.border}`,color:phase===i?C.orange:C.muted,borderRadius:8,cursor:"pointer",transition:"all 0.2s"}}>{l}</button>)}
    </div>
    {phases[phase]}
    <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}`}</style>
  </div>;
}

function RefinementDryRun(){
  const[step,setStep]=useState(0);
  const names=["Phase 1: Pairwise Sibling Tests","Phase 1: Create New Parent","Phase 2: Mutual Information Merging"];
  const content=[
    <div key={0}><p style={{color:C.muted,marginBottom:10,fontSize:14}}>Bottom-up: test pairwise relatedness among siblings under "Energy/":</p><div style={codeBox(C.orange)}><div style={{color:C.text,fontWeight:600}}>Solar ↔ Wind:</div><div style={{color:C.dim,marginLeft:16}}>Category Entropy₁={hn("0.52",C.green)}&gt;0.30 ✓  Category Entropy₂={hn("0.48",C.green)}&gt;0.25 ✓  Importance={hn("0.41",C.green)}&gt;0.20 ✓</div><div style={{color:C.dim,marginLeft:16}}>Coverage Degree(Solar→Wind)={hn("0.28",C.green)}, Coverage Degree(Wind→Solar)={hn("0.25",C.green)} → both &gt; Coverage Degree low threshold = 0.20</div><div style={{color:C.green,fontWeight:600,marginLeft:16}}>→ RELATED SIBLINGS</div><div style={{height:8}}/><div style={{color:C.text,fontWeight:600}}>Solar ↔ Geothermal:</div><div style={{color:C.dim,marginLeft:16}}>Category Entropy₁={hn("0.45",C.green)} ✓  Importance={hn("0.38",C.green)} ✓  Coverage Degree = 0.22/0.19 → both &gt; 0.20 ✓</div><div style={{color:C.green,fontWeight:600,marginLeft:16}}>→ RELATED SIBLINGS</div><div style={{height:8}}/><div style={{color:C.text,fontWeight:600}}>Solar ↔ Fossil Fuels:</div><div style={{color:C.dim,marginLeft:16}}>Category Entropy₁={hn("0.15",C.red)}&lt;0.30 → <span style={{color:C.red}}>FAIL at Test 1 gate</span></div><div style={{color:C.red,fontWeight:600,marginLeft:16}}>→ NOT RELATED (different energy types)</div><div style={{height:8}}/><div style={{color:C.yellow,fontWeight:700}}>Related group found: {"{Solar, Wind, Geothermal, Hydropower}"}</div></div></div>,
    <div key={1}><div style={codeBox(C.orange)}><div style={{color:C.orange,fontWeight:600,marginBottom:8}}>Phase 1 Action: Create new parent "Renewable Energy"</div><div style={{color:C.dim}}>1. Create new category node "Renewable Energy"</div><div style={{color:C.dim}}>2. Insert as child of "Energy/" (same level as Fossil Fuels)</div><div style={{color:C.dim}}>3. Move Solar, Wind, Geothermal, Hydropower as children of "Renewable Energy"</div><div style={{color:C.dim}}>4. Concept set = union of all four children's concepts</div><div style={{height:8}}/><div style={{color:C.text,fontWeight:600}}>Verify: Fossil Fuels and Nuclear remain direct children of Energy/</div><div style={{color:C.dim}}>  Category Entropy(Fossil Fuels, Renewable Energy) = 0.12 &lt; 0.30 → correctly DISJOINT</div></div>{note(C.orange,<span>Phase 1 uses the <strong>same 3-test sequence</strong> as insertion but with a <strong>lower Coverage Degree threshold</strong> (low = 0.20 vs high = 0.40) to catch siblings that share a broad topic without being parent-child.</span>)}</div>,
    <div key={2}><p style={{color:C.muted,marginBottom:10,fontSize:14}}>Suppose "Solar Power" was inserted under Physics/ in an earlier round. Phase 2 checks if it's a duplicate:</p><div style={codeBox(C.magenta)}><div style={{color:C.magenta,fontWeight:600,marginBottom:8}}>Mutual Information between Solar Energy and Solar Power:</div><div style={{color:C.dim}}>Solar Energy: {"{photovoltaic, solar cell, efficiency, panel, irradiance}"}</div><div style={{color:C.dim}}>Solar Power:  {"{photovoltaic, solar panel, power output, irradiance, cell}"}</div><div style={{height:6}}/><div style={{color:C.dim}}>Mutual Information = Σ p(cᵢ,cⱼ) × log₂[ p(cᵢ,cⱼ) / (p(cᵢ) × p(cⱼ)) ]</div><div style={{color:C.dim}}>  "photovoltaic" pair: 0.18 × log₂(0.18/(0.12×0.12)) = 0.18 × 3.90 = 0.70</div><div style={{color:C.dim}}>  "irradiance" pair: 0.15 × log₂(0.15/(0.10×0.10)) = 0.15 × 3.91 = 0.59</div><div style={{color:C.dim}}>  ... (summing all matching concept pairs)</div><div style={{color:C.text,fontWeight:600,marginTop:6}}>Mutual Information(Solar Energy, Solar Power) = {hn("0.82",C.magenta)}</div><div style={{color:C.yellow,fontWeight:700,marginTop:6}}>Threshold = 0.70 → 0.82 &gt; 0.70 → <span style={{color:C.green}}>EQUIVALENT → MERGE</span></div></div><div style={{display:"flex",gap:12,flexWrap:"wrap",marginTop:12}}>{decBox(true,"Mutual Information = 0.82 > 0.70 → MERGE 'Solar Power' into 'Solar Energy'")}{decBox(false,"Mutual Information(Solar, Wind) = 0.15 < 0.70 → Different topics → NO MERGE")}</div>{note(C.magenta,<span>Phase 2 runs <strong>after</strong> Phase 1. Bottom-up processing ensures leaf-level merges happen first, preventing cascade errors at higher levels.</span>)}</div>,
  ];
  return <div>
    <StepNav steps={names} active={step} onChange={setStep} color={C.orange}/>
    <div key={step} style={{animation:"fadeIn 0.3s ease"}}>{content[step]}</div>
    <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}`}</style>
  </div>;
}

/* ═══════════════════════════════════════════════════════════ */
/*  RESULTS                                                   */
/* ═══════════════════════════════════════════════════════════ */
function ResultsPanel(){
  const[showTax,setShowTax]=useState(false);const[vis,setVis]=useState(false);useEffect(()=>{setVis(true)},[]);
  const bLF=useCounter(956,1000,vis);const bTF=useCounter(968,1000,vis);
  const lex=[{ds:"ODPDS",v1:80.7,v2:92.1,dm:"Full Science"},{ds:"ODPDS1",v1:91.1,v2:89.9,dm:"Agriculture"},{ds:"ODPDS2",v1:90.2,v2:95.6,dm:"Math"},{ds:"ODPDS3",v1:89.5,v2:89.9,dm:"Technology (Test)"},{ds:"ODPDS4",v1:85.4,v2:89.6,dm:"Astronomy (Test)"}];
  const tax=[{ds:"ODPDS",v1:83.7,v2:72.8},{ds:"ODPDS1",v1:90.7,v2:71.9},{ds:"ODPDS2",v1:96.8,v2:78.7},{ds:"ODPDS3",v1:96.1,v2:81.3},{ds:"ODPDS4",v1:94.8,v2:81.5}];
  const d=showTax?tax:lex;const c1=showTax?C.magenta:C.accent;const c2=showTax?C.orange:C.green;
  return <div>
    <h2 style={{fontSize:28,fontWeight:800,marginBottom:8,fontFamily:"'Georgia',serif"}}>Experimental Results</h2>
    <p style={{color:C.muted,marginBottom:24,fontSize:15}}>Evaluated on AOL500k, CABS120k08 &amp; DMOZ across 4 science domains.</p>
    <div style={{display:"flex",gap:16,marginBottom:28,flexWrap:"wrap"}}>
      {[{l:"Best Lexical F",v:(bLF/10).toFixed(1)+"%",s:"ODPDS2 (Math)",c:C.accent},{l:"Best Taxonomic F",v:(bTF/10).toFixed(1)+"%",s:"SC, ODPDS2",c:C.magenta},{l:"Test Domains",v:"4",s:"Cross-domain generalization",c:C.green}].map(s=><div key={s.l} style={{flex:"1 1 160px",background:C.card,borderRadius:14,padding:20,border:`1px solid ${s.c}33`,textAlign:"center"}}><div style={{fontSize:36,fontWeight:800,color:s.c,fontFamily:"'Georgia',serif"}}>{s.v}</div><div style={{fontSize:13,fontWeight:600,color:C.text,marginTop:4}}>{s.l}</div><div style={{fontSize:11,color:C.muted,marginTop:2}}>{s.s}</div></div>)}
    </div>
    <div style={{display:"flex",gap:8,marginBottom:20}}><button onClick={()=>setShowTax(false)} style={{padding:"8px 20px",fontSize:13,fontWeight:600,borderRadius:8,cursor:"pointer",background:!showTax?C.accent+"22":C.card,border:`1.5px solid ${!showTax?C.accent:C.border}`,color:!showTax?C.accent:C.muted}}>Lexical F-Measures</button><button onClick={()=>setShowTax(true)} style={{padding:"8px 20px",fontSize:13,fontWeight:600,borderRadius:8,cursor:"pointer",background:showTax?C.magenta+"22":C.card,border:`1.5px solid ${showTax?C.magenta:C.border}`,color:showTax?C.magenta:C.muted}}>Taxonomic F-Measures</button></div>
    <div style={{background:C.card,borderRadius:16,padding:24,border:`1px solid ${C.border}`}}>
      {d.map((r,i)=><div key={r.ds+showTax} style={{marginBottom:16}}>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:6}}><span style={{width:65,fontSize:13,fontWeight:700,color:C.text}}>{r.ds}</span>{r.dm&&<span style={{fontSize:11,color:C.dim}}>{r.dm}</span>}</div>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3,marginLeft:65}}><div style={{height:18,borderRadius:4,width:`${r.v1*0.78}%`,background:`linear-gradient(90deg,${c1}88,${c1})`,animation:`growBar 0.8s ease ${i*100}ms both`}}/><span style={{fontSize:12,fontWeight:600,color:c1}}>{r.v1}%</span></div>
        <div style={{display:"flex",alignItems:"center",gap:8,marginLeft:65}}><div style={{height:18,borderRadius:4,width:`${r.v2*0.78}%`,background:`linear-gradient(90deg,${c2}88,${c2})`,animation:`growBar 0.8s ease ${i*100+100}ms both`}}/><span style={{fontSize:12,fontWeight:600,color:c2}}>{r.v2}%</span></div>
      </div>)}
      <div style={{display:"flex",gap:24,marginTop:16,paddingTop:12,borderTop:`1px solid ${C.border}`}}>
        <div style={{display:"flex",alignItems:"center",gap:6}}><div style={{width:24,height:10,borderRadius:3,background:c1}}/><span style={{fontSize:12,color:C.muted}}>{showTax?"Semantic Cotopy":"After Insertion"}</span></div>
        <div style={{display:"flex",alignItems:"center",gap:6}}><div style={{width:24,height:10,borderRadius:3,background:c2}}/><span style={{fontSize:12,color:C.muted}}>{showTax?"Common Semantic Cotopy":"After Refinement"}</span></div>
      </div>
    </div>
    <style>{`@keyframes growBar{from{width:0}}`}</style>
  </div>;
}

/* ═══════════════════════════════════════════════════════════ */
/*  MAIN APP                                                  */
/* ═══════════════════════════════════════════════════════════ */
export default function App(){
  const[started,setStarted]=useState(false);const[as,setAs]=useState("overview");const refs=useRef({});
  if(!started)return <div style={{background:C.bg,color:C.text,minHeight:"100vh",fontFamily:"'Georgia','Palatino',serif"}}><Hero onStart={()=>setStarted(true)}/></div>;
  return <div style={{background:C.bg,color:C.text,minHeight:"100vh",fontFamily:"'Segoe UI','Helvetica Neue',sans-serif"}}>
    <nav style={{position:"sticky",top:0,zIndex:100,background:C.bg+"ee",backdropFilter:"blur(12px)",borderBottom:`1px solid ${C.border}`,padding:"0 20px"}}>
      <div style={{maxWidth:920,margin:"0 auto",display:"flex",alignItems:"center",gap:4,overflowX:"auto",padding:"8px 0"}}>
        <span style={{fontSize:14,fontWeight:800,color:C.accent,marginRight:12,fontFamily:"'Georgia',serif",whiteSpace:"nowrap"}}>QCA-THG</span>
        {SECTIONS.map(s=><button key={s.id} onClick={()=>{setAs(s.id);refs.current[s.id]?.scrollIntoView({behavior:"smooth",block:"start"})}} style={{padding:"6px 12px",fontSize:12.5,fontWeight:600,background:as===s.id?C.accent+"22":"transparent",border:`1px solid ${as===s.id?C.accent+"44":"transparent"}`,color:as===s.id?C.accent:C.muted,borderRadius:8,cursor:"pointer",whiteSpace:"nowrap",transition:"all 0.2s"}}>{s.label}</button>)}
        <a href="https://github.com/DivyanshBhatia/qca-hierarchy-framework" target="_blank" rel="noopener noreferrer" style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:5,padding:"5px 12px",fontSize:12,fontWeight:600,color:C.muted,textDecoration:"none",borderRadius:8,border:`1px solid ${C.border}`,whiteSpace:"nowrap",transition:"all 0.2s"}} onMouseEnter={e=>{e.currentTarget.style.borderColor=C.accent;e.currentTarget.style.color=C.accent}} onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.color=C.muted}}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
          Code
        </a>
      </div>
    </nav>
    <div style={{maxWidth:920,margin:"0 auto",padding:"32px 20px 80px"}}>
      {SECTIONS.map(s=><div key={s.id} ref={el=>refs.current[s.id]=el} style={{marginBottom:64,scrollMarginTop:64}}>
        {s.id==="overview"&&<PipelineOverview/>}
        {s.id==="qdc"&&<QDCSection/>}
        {s.id==="splitmerge"&&<SplitMergeSection/>}
        {s.id==="hierarchy"&&<HierarchySection/>}
        {s.id==="refinement"&&<RefinementSection/>}
        {s.id==="results"&&<ResultsPanel/>}
      </div>)}
      <div style={{textAlign:"center",padding:"32px 0",borderTop:`1px solid ${C.border}`,color:C.dim,fontSize:13}}>
        {/* Try the code banner */}
        <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:14,padding:"20px 24px",marginBottom:24,maxWidth:600,margin:"0 auto 24px"}}>
          <div style={{fontSize:15,fontWeight:700,color:C.text,marginBottom:8}}>Try it with your own data</div>
          <div style={{fontSize:12,color:C.muted,lineHeight:1.6,marginBottom:14}}>
            The complete Python framework lets you run the full pipeline — QDC Clustering → Split-Merge → 3-Test Insertion (Category Entropy → Importance Measure → Coverage Degree) → Refinement — on your own click-through logs.
          </div>
          <div style={{fontFamily:"'Fira Code','Consolas',monospace",fontSize:12,color:C.cyan,background:C.bg,borderRadius:8,padding:"10px 14px",textAlign:"left",marginBottom:14,lineHeight:1.7}}>
            <div style={{color:C.dim}}>$ git clone https://github.com/DivyanshBhatia/qca-hierarchy-framework.git</div>
            <div style={{color:C.dim}}>$ cd qca-hierarchy-framework</div>
            <div>$ python demo.py</div>
            <div style={{color:C.dim}}># or with your own data:</div>
            <div>$ python main.py --logs your_data.json --hierarchy your_hierarchy.json</div>
          </div>
          <a href="https://github.com/DivyanshBhatia/qca-hierarchy-framework" target="_blank" rel="noopener noreferrer" style={{display:"inline-flex",alignItems:"center",gap:8,padding:"10px 24px",background:C.accent+"22",border:`1.5px solid ${C.accent}55`,borderRadius:10,color:C.accent,fontWeight:600,fontSize:13,textDecoration:"none",transition:"background 0.2s"}} onMouseEnter={e=>e.currentTarget.style.background=C.accent+"33"} onMouseLeave={e=>e.currentTarget.style.background=C.accent+"22"}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill={C.accent}><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            View on GitHub — Run Locally with Python
          </a>
        </div>
        <div style={{marginBottom:8}}><span style={{fontWeight:700,color:C.accent}}>IEM-ICDC 2026</span> — 4th Intl. Conference on CI, Data Science &amp; Cloud Computing</div>
        <div>Bhatia &amp; Mehala • Query-Context Aware Topic Hierarchy Generation for Educational Web Resources</div>
      </div>
    </div>
  </div>;
}
