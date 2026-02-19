import { useState, useEffect, useCallback } from "react";

const G = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Nunito:wght@300;400;600;700;800;900&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'Nunito',sans-serif;overflow-x:hidden;}
input,button,textarea{font-family:'Nunito',sans-serif;}
@keyframes fadeUp    {from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn    {from{opacity:0}to{opacity:1}}
@keyframes fadeOut   {from{opacity:1;transform:scale(1)}to{opacity:0;transform:scale(0.82)}}
@keyframes floatY    {0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
@keyframes floatFast {0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
@keyframes bounce    {0%,100%{transform:translateY(0)}30%{transform:translateY(-20px)}60%{transform:translateY(-8px)}}
@keyframes shake     {0%,100%{transform:translateX(0)}20%{transform:translateX(-10px)}40%{transform:translateX(10px)}60%{transform:translateX(-7px)}80%{transform:translateX(7px)}}
@keyframes runRight  {from{transform:translateX(-110px)}to{transform:translateX(0)}}
@keyframes popIn     {0%{transform:scale(0.5);opacity:0}70%{transform:scale(1.1)}100%{transform:scale(1);opacity:1}}
@keyframes glowPulse {0%,100%{filter:drop-shadow(0 0 10px #fbbf2455)}50%{filter:drop-shadow(0 0 28px #fbbf24cc)}}
@keyframes glowText  {0%,100%{text-shadow:0 0 12px #fde68a77}50%{text-shadow:0 0 30px #fde68add}}
@keyframes swordIdle {0%,100%{transform:rotate(-12deg) translateY(0)}50%{transform:rotate(-8deg) translateY(-4px)}}
@keyframes spinIn    {0%{transform:rotate(-180deg) scale(0);opacity:0}100%{transform:rotate(0deg) scale(1);opacity:1}}
@keyframes streakPop {0%{transform:scale(0.3) rotate(-20deg);opacity:0}60%{transform:scale(1.2) rotate(5deg)}100%{transform:scale(1) rotate(0deg);opacity:1}}
@keyframes traitSlide{from{transform:translateX(-20px) scale(0.9);opacity:0}to{transform:translateX(0) scale(1);opacity:1}}
@keyframes oathShine {0%{background-position:200% center}100%{background-position:-200% center}}
@keyframes bossHitFlash  {0%{filter:brightness(1)}30%{filter:brightness(5) saturate(0)}100%{filter:brightness(0.75) saturate(0.5)}}
@keyframes bossKnockback {0%{transform:translateX(0) rotate(0)}45%{transform:translateX(28px) rotate(10deg)}100%{transform:translateX(0) rotate(0)}}
@keyframes bossFall      {0%{transform:translateY(0) rotate(0deg);opacity:1}100%{transform:translateY(40px) rotate(88deg);opacity:0.3}}
@keyframes bossRise      {0%{transform:translateY(40px) rotate(88deg);opacity:0.3}100%{transform:translateY(0) rotate(0deg);opacity:1}}
@keyframes bossDead      {0%{transform:translateY(0) rotate(0deg);opacity:1}55%{transform:translateY(50px) rotate(92deg);opacity:0.45}100%{transform:translateY(65px) rotate(96deg);opacity:0}}
@keyframes newYouLunge   {0%{transform:translateX(0)}45%{transform:translateX(-30px)}100%{transform:translateX(0)}}
@keyframes newYouGlowAnim{0%,100%{filter:drop-shadow(0 0 8px #fbbf2444)}50%{filter:drop-shadow(0 0 32px #fbbf24cc)}}
@keyframes celebrate     {0%,100%{transform:translateY(0) scale(1)}30%{transform:translateY(-16px) scale(1.07)}60%{transform:translateY(-6px)}}
@keyframes swordSwingNew {0%{transform:rotate(0deg)}40%{transform:rotate(-60deg) translateX(-12px)}100%{transform:rotate(0deg)}}
@keyframes swordSwingOld {0%{transform:scaleX(-1) rotate(0deg)}40%{transform:scaleX(-1) rotate(60deg) translateX(12px)}100%{transform:scaleX(-1) rotate(0deg)}}
@keyframes slideUp       {from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
.fadeUp {animation:fadeUp 0.45s ease both}
.fadeIn {animation:fadeIn 0.4s ease both}
.floatY {animation:floatY 3s ease-in-out infinite}
.floatFast{animation:floatFast 1.7s ease-in-out infinite}
.bounce {animation:bounce 0.6s ease}
.shake  {animation:shake 0.5s ease}
.popIn  {animation:popIn 0.42s ease both}
.glowPulse{animation:glowPulse 2s ease-in-out infinite}
.glowText {animation:glowText 2.5s ease-in-out infinite}
.spinIn {animation:spinIn 0.6s cubic-bezier(.34,1.56,.64,1) both}
.streakPop{animation:streakPop 0.5s cubic-bezier(.34,1.56,.64,1) both}
`;

const AV = {
  f1:{skin:"#F7C89B",hair:"#7c3aed",top:"#ec4899",eyes:"#4ade80",cheek:"#f9a8d4",shoe:"#1e1b4b",hs:"bun"},
  f2:{skin:"#C68642",hair:"#3b82f6",top:"#06b6d4",eyes:"#f472b6",cheek:"#fca5a5",shoe:"#1e1b4b",hs:"long"},
  f3:{skin:"#8D5524",hair:"#ef4444",top:"#f59e0b",eyes:"#a78bfa",cheek:"#fcd34d",shoe:"#1e1b4b",hs:"curly"},
  m1:{skin:"#D4956A",hair:"#92400e",top:"#7c3aed",eyes:"#34d399",cheek:"#fca5a5",shoe:"#1e1b4b",hs:"short"},
  m2:{skin:"#7B5B3A",hair:"#1d4ed8",top:"#1d4ed8",eyes:"#fbbf24",cheek:"#d97706",shoe:"#1e1b4b",hs:"fade"},
  m3:{skin:"#4A2C17",hair:"#059669",top:"#059669",eyes:"#f472b6",cheek:"#6ee7b7",shoe:"#1e1b4b",hs:"locs"},
  f1e:{skin:"#F7C89B",hair:"#fbbf24",top:"#a855f7",eyes:"#fbbf24",cheek:"#fde68a",shoe:"#4c1d95",hs:"bun"},
  f2e:{skin:"#C68642",hair:"#34d399",top:"#0891b2",eyes:"#86efac",cheek:"#6ee7b7",shoe:"#164e63",hs:"long"},
  f3e:{skin:"#8D5524",hair:"#fbbf24",top:"#d97706",eyes:"#fde68a",cheek:"#fcd34d",shoe:"#78350f",hs:"curly"},
  m1e:{skin:"#D4956A",hair:"#fbbf24",top:"#4f46e5",eyes:"#fbbf24",cheek:"#fde68a",shoe:"#312e81",hs:"short"},
  m2e:{skin:"#7B5B3A",hair:"#22d3ee",top:"#0e7490",eyes:"#22d3ee",cheek:"#67e8f9",shoe:"#164e63",hs:"fade"},
  m3e:{skin:"#4A2C17",hair:"#f472b6",top:"#be185d",eyes:"#fde68a",cheek:"#fbcfe8",shoe:"#831843",hs:"locs"},
};
const HAIR={
  bun: c=><><ellipse cx="60" cy="22" rx="27" ry="21" fill={c}/><ellipse cx="60" cy="7" rx="15" ry="13" fill={c}/><circle cx="73" cy="5" r="8" fill={c}/></>,
  long:c=><><ellipse cx="60" cy="24" rx="29" ry="23" fill={c}/><rect x="33" y="30" width="11" height="44" rx="6" fill={c}/><rect x="76" y="30" width="11" height="44" rx="6" fill={c}/></>,
  curly:c=><><ellipse cx="60" cy="22" rx="28" ry="22" fill={c}/>{[0,1,2,3,4].map(i=><circle key={i} cx={36+i*12} cy={14+Math.sin(i)*5} r="10" fill={c}/>)}</>,
  short:c=><><ellipse cx="60" cy="26" rx="27" ry="21" fill={c}/><rect x="34" y="20" width="52" height="15" rx="5" fill={c}/></>,
  fade: c=><><ellipse cx="60" cy="26" rx="27" ry="21" fill={c}/><ellipse cx="60" cy="32" rx="21" ry="13" fill={c} opacity=".7"/></>,
  locs: c=><><ellipse cx="60" cy="22" rx="27" ry="21" fill={c}/>{[0,1,2,3].map(i=><rect key={i} x={38+i*11} y="36" width="7" height="36" rx="4" fill={c}/>)}</>,
};

function BitmojiAvatar({id="f1",size=120,shadow=false,evolved=false,dead=false}){
  const c=AV[id]||AV.f1;
  const sf=dead?"grayscale(1) brightness(0.25) opacity(0.12)":shadow?"grayscale(0.75) brightness(0.5)":evolved?"drop-shadow(0 0 14px #fbbf24aa)":"none";
  return(
    <svg width={size} height={size*1.18} viewBox="0 0 120 142" style={{display:"block",filter:sf}}>
      <ellipse cx="60" cy="139" rx="30" ry="5" fill="rgba(0,0,0,0.22)"/>
      <rect x="37" y="82" width="46" height="44" rx="15" fill={c.top}/>
      <rect x="20" y="84" width="19" height="11" rx="6" fill={c.top}/>
      <rect x="81" y="84" width="19" height="11" rx="6" fill={c.top}/>
      <circle cx="20" cy="95" r="8" fill={c.skin}/><circle cx="100" cy="95" r="8" fill={c.skin}/>
      <rect x="42" y="122" width="15" height="20" rx="7" fill={c.hair}/>
      <rect x="63" y="122" width="15" height="20" rx="7" fill={c.hair}/>
      <ellipse cx="49" cy="141" rx="11" ry="4" fill={c.shoe}/>
      <ellipse cx="70" cy="141" rx="11" ry="4" fill={c.shoe}/>
      <rect x="53" y="70" width="14" height="14" rx="6" fill={c.skin}/>
      <ellipse cx="60" cy="52" rx="29" ry="31" fill={c.skin}/>
      {HAIR[c.hs]?.(c.hair)}
      <ellipse cx="31" cy="52" rx="6" ry="8" fill={c.skin}/>
      <ellipse cx="89" cy="52" rx="6" ry="8" fill={c.skin}/>
      <circle cx="49" cy="50" r="6" fill="white"/><circle cx="71" cy="50" r="6" fill="white"/>
      <circle cx="50" cy="50" r="3.5" fill={c.eyes}/><circle cx="72" cy="50" r="3.5" fill={c.eyes}/>
      <circle cx="51" cy="49" r="1.4" fill="white"/><circle cx="73" cy="49" r="1.4" fill="white"/>
      <path d="M43 42 Q49 39 55 42" stroke={c.hair} strokeWidth="2.2" fill="none" strokeLinecap="round"/>
      <path d="M65 42 Q71 39 77 42" stroke={c.hair} strokeWidth="2.2" fill="none" strokeLinecap="round"/>
      <ellipse cx="60" cy="58" rx="3" ry="2.2" fill="rgba(0,0,0,0.12)"/>
      <path d="M51 65 Q60 73 69 65" stroke="#b91c1c" strokeWidth="2.8" fill="none" strokeLinecap="round"/>
      <ellipse cx="42" cy="59" rx="9" ry="6" fill={c.cheek} opacity=".38"/>
      <ellipse cx="78" cy="59" rx="9" ry="6" fill={c.cheek} opacity=".38"/>
      {evolved&&<ellipse cx="60" cy="52" rx="33" ry="35" fill="none" stroke="#fbbf24" strokeWidth="2.2" strokeDasharray="7 5" opacity=".75"/>}
    </svg>
  );
}

function Sword({size=44,color="#a78bfa",anim="swordIdle 2.5s ease-in-out infinite"}){
  const gid=`sw${color.replace(/[^a-z0-9]/gi,"")}`;
  return(
    <svg width={size} height={size*2.4} viewBox="0 0 32 76" style={{display:"block",animation:anim,transformOrigin:"50% 90%"}}>
      <defs><linearGradient id={gid} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#cbd5e1"/><stop offset="50%" stopColor="#ffffff"/><stop offset="100%" stopColor="#94a3b8"/>
      </linearGradient></defs>
      <polygon points="13,4 19,4 21,54 11,54" fill={`url(#${gid})`}/>
      <polygon points="11,54 16,70 21,54" fill="#94a3b8"/>
      <rect x="5" y="50" width="22" height="7" rx="3.5" fill={color}/>
      <rect x="13" y="57" width="6" height="16" rx="3" fill="#92400e"/>
      <line x1="15" y1="8" x2="15" y2="50" stroke="white" strokeWidth="1.8" opacity=".5"/>
    </svg>
  );
}

/* DATA */
const AVATAR_OPTIONS={
  female:[{id:"f1",eid:"f1e",label:"Bubbly Vibe",color:"#ec4899"},{id:"f2",eid:"f2e",label:"Cool Energy",color:"#06b6d4"},{id:"f3",eid:"f3e",label:"Golden Spirit",color:"#f59e0b"}],
  male:  [{id:"m1",eid:"m1e",label:"Chill Vibe", color:"#7c3aed"},{id:"m2",eid:"m2e",label:"Bold Energy", color:"#1d4ed8"},{id:"m3",eid:"m3e",label:"Rare Spirit", color:"#059669"}],
};
const CLASSES=["Overworked Student","Procrastinator","Dreamer Who Never Starts","\"I'll Start Monday\" Type"];
const REGRETS=[
  {id:"phone",  label:"Phone addiction",           bubble:"Ugh… we're basically glued 📱"},
  {id:"start",  label:"Not starting things",       bubble:"The ideas exist. The start… not so much 😶"},
  {id:"sleep",  label:"Bad sleep schedule",        bubble:"3am again? The ceiling knows everything 😴"},
  {id:"compare",label:"Comparing myself to others",bubble:"Their highlight reel vs your real life 💔"},
  {id:"conf",   label:"Low confidence",            bubble:"You're more capable than you believe 🌟"},
  {id:"scroll", label:"Wasting time scrolling",    bubble:"One more reel… 2 hours later 😬"},
];
const QUESTIONS=[
  {q:"You have a free evening. What do you actually do?",choices:[
    {text:"Scroll for 3 hours",      mood:"negative",delta:{Energy:-10,Focus:-15,Discipline:-10,Motivation:-10}},
    {text:"Work on a side project",  mood:"positive",delta:{Focus:10,Discipline:8,Motivation:5}},
    {text:"Guilt-spiral, do nothing",mood:"negative",delta:{Energy:-5,Rest:-5,Motivation:-15}},
    {text:"Rest intentionally",      mood:"neutral", delta:{Energy:15,Rest:20,Motivation:8}},
  ]},
  {q:"Your alarm goes off 30 min early. You…",choices:[
    {text:"Snooze 4 times",    mood:"negative",delta:{Energy:-10,Discipline:-10,Rest:-8}},
    {text:"Get up and journal",mood:"positive",delta:{Energy:12,Focus:15,Discipline:12}},
    {text:"Lie there on phone",mood:"negative",delta:{Focus:-10,Discipline:-8}},
    {text:"Use the extra time",mood:"positive",delta:{Energy:10,Focus:10,Discipline:15,Motivation:8}},
  ]},
  {q:"Someone posts a huge win online. You feel…",choices:[
    {text:"Bad about yourself", mood:"negative",delta:{Motivation:-15,Energy:-8}},
    {text:"Inspired to do more",mood:"positive",delta:{Motivation:15,Focus:8}},
    {text:"Numb, keep scrolling",mood:"negative",delta:{Motivation:-8,Focus:-10}},
    {text:"Happy, stay focused",mood:"neutral", delta:{Motivation:12,Energy:8,Discipline:5}},
  ]},
];
const MOOD_BUBBLE={
  positive:{text:"Yayyy let's gooo ✨",color:"#86efac"},
  negative:{text:"Ayyayooo not again 😭",color:"#fca5a5"},
  neutral: {text:"Okay okay balanced queen 👑",color:"#fde68a"},
};
const DAILY_CHALLENGES=[
  {day:1,icon:"🌅",title:"Morning Ignition",challenge:"Your first morning without snoozing. What do you do with the extra time?",
   options:[{text:"Journal for 10 min",correct:true,xp:30,msg:"💛 Written words become real plans."},{text:"Check Instagram immediately",correct:false,xp:0,msg:"❌ You handed your morning brain to an algorithm."},{text:"5-min stretch + glass of water",correct:true,xp:25,msg:"💚 Body first. Mind follows."},{text:"Lie in bed thinking about the day",correct:false,xp:5,msg:"⚠️ Thinking isn't doing. Close, though."}]},
  {day:2,icon:"🎯",title:"Focus Gauntlet",challenge:"You have 2 hours free. No obligations. How do you spend them?",
   options:[{text:"Deep work on one thing",correct:true,xp:40,msg:"🔥 Single-tasking is a superpower."},{text:"Multitask everything",correct:false,xp:5,msg:"❌ Multitasking = doing nothing well."},{text:"Plan the next week",correct:true,xp:30,msg:"✅ Clarity is a competitive edge."},{text:"Binge-watch one more ep",correct:false,xp:0,msg:"😬 You'll never 'just watch one.'"}]},
  {day:3,icon:"🌙",title:"Night Protocol",challenge:"It's 10pm. What's your wind-down move?",
   options:[{text:"Screen off, read a book",correct:true,xp:35,msg:"💙 Your future self sleeps better."},{text:"Scroll until you pass out",correct:false,xp:0,msg:"❌ Blue light stole your sleep quality."},{text:"Plan tomorrow's top 3 tasks",correct:true,xp:40,msg:"⚡ Morning-you just got an unfair advantage."},{text:"Doom-watch news for an hour",correct:false,xp:5,msg:"😰 Anxiety isn't a sleep aid."}]},
];
const MINDSET_QUESTIONS=[
  {q:"Someone criticizes your work harshly. You…",icon:"💬",traits:[{text:"Shut down & hide",trait:"Avoidant",neg:true,color:"#ef4444"},{text:"Get angry but keep going",trait:"Resilient",neg:false,color:"#fbbf24"},{text:"Ask what they'd improve",trait:"Curious",neg:false,color:"#34d399"},{text:"Take notes & iterate",trait:"Disciplined",neg:false,color:"#a78bfa"}]},
  {q:"You've failed at a goal 3 times. Your next move?",icon:"🔁",traits:[{text:"Give up. It wasn't meant",trait:"Fixed",neg:true,color:"#ef4444"},{text:"Blame outside things",trait:"External",neg:true,color:"#f97316"},{text:"Change the approach",trait:"Adaptive",neg:false,color:"#22d3ee"},{text:"Study WHY you failed",trait:"Strategic",neg:false,color:"#a78bfa"}]},
  {q:"Your dream is 5 years away. Today you…",icon:"🌠",traits:[{text:"Wait until you're ready",trait:"Waiting",neg:true,color:"#ef4444"},{text:"Do ONE tiny thing toward it",trait:"Builder",neg:false,color:"#34d399"},{text:"Tell everyone your plan",trait:"Talker",neg:true,color:"#f97316"},{text:"Build a system for it",trait:"Architect",neg:false,color:"#fbbf24"}]},
  {q:"How do you feel about where you are right now?",icon:"🪞",traits:[{text:"Stuck and frustrated",trait:"Aware",neg:false,color:"#fbbf24"},{text:"Fine, things are okay",trait:"Settled",neg:true,color:"#94a3b8"},{text:"Ready to level up",trait:"Hungry",neg:false,color:"#34d399"},{text:"Lost but searching",trait:"Seeker",neg:false,color:"#a78bfa"}]},
];
const POWERS=[
  {id:"discipline",icon:"🧱",name:"Iron Discipline", desc:"You finish what you start, no matter what.",         color:"#6366f1",stat:"Discipline"},
  {id:"focus",     icon:"🎯",name:"Laser Focus",      desc:"Distractions bounce off you like rain.",            color:"#06b6d4",stat:"Focus"},
  {id:"energy",    icon:"⚡",name:"Unlimited Energy", desc:"You wake up ready. Every. Single. Day.",            color:"#fbbf24",stat:"Energy"},
  {id:"vision",    icon:"🔭",name:"Vision Clarity",   desc:"You see 5 moves ahead while others react.",         color:"#a78bfa",stat:"Motivation"},
  {id:"rest",      icon:"🌙",name:"Recovery Mode",    desc:"You protect your peace like it's precious.",        color:"#34d399",stat:"Rest"},
  {id:"courage",   icon:"🦁",name:"Raw Courage",      desc:"You act before you feel ready.",                    color:"#f59e0b",stat:"Motivation"},
  {id:"system",    icon:"⚙️",name:"Systems Thinker",  desc:"You build routines that work even when you don't.",color:"#64748b",stat:"Discipline"},
  {id:"identity",  icon:"🌟",name:"Identity Shift",   desc:"You stopped performing growth. You ARE growth.",    color:"#ec4899",stat:"Focus"},
];
const SC=[
  {icon:"🌑",title:"Day 1", text:"You said you'd start tomorrow. Tomorrow came. You opened Instagram instead."},
  {icon:"😮‍💨",title:"Day 7", text:"The to-do list is still there. You moved it to next week. Again."},
  {icon:"🥀",title:"Day 30",text:"A month passed. Nothing changed. You're not even surprised anymore."},
  {icon:"🪞",title:"Day 90",text:"You look in the mirror. Same version. Still waiting for Monday."},
];
const GC=[
  {icon:"🌱",title:"Day 1", text:"You did one small thing. Tiny. Almost embarrassing. But you did it."},
  {icon:"🔥",title:"Day 7", text:"The streak is real. It feels weird NOT to do the thing."},
  {icon:"⚡",title:"Day 30",text:"People notice something different. You don't say what. You just smile."},
  {icon:"✨",title:"Day 90",text:"This is the version of you that past-you was too scared to believe in."},
];
const ROUNDS=[
  {habit:{icon:"⏱️",text:"20 minutes daily",   desc:"Small effort, massive compound."},  excuses:[{icon:"💭",text:"I'm too tired today"},{icon:"💭",text:"I'll do it later tonight"}]},
  {habit:{icon:"📵",text:"Phone down, goals up",desc:"Your attention is your currency."}, excuses:[{icon:"💭",text:"One more scroll won't hurt"},{icon:"💭",text:"I need this to relax first"}]},
  {habit:{icon:"✅",text:"Done beats perfect",  desc:"Ship it. Fix it. Repeat."},         excuses:[{icon:"💭",text:"It's not ready yet"},{icon:"💭",text:"I need more motivation"}]},
  {habit:{icon:"🌅",text:"Own your mornings",   desc:"The first hour shapes the day."},   excuses:[{icon:"💭",text:"I'm not a morning person"},{icon:"💭",text:"Five more minutes..."}]},
  {habit:{icon:"🧠",text:"Feed your mind daily",desc:"Read, learn, reflect. Every day."}, excuses:[{icon:"💭",text:"I don't have time for that"},{icon:"💭",text:"I'll do a course someday"}]},
];
const EXCUSE_LINES=["That's just an excuse 👀 Next round, do better!","Nah that ain't it 😭 The Old You is still standing!","An excuse? Really? You know better 🙄 Try again!"];
const OATH_PROMPTS=["I will stop waiting for the perfect moment and…","I commit to showing up even when I don't feel like it because…","The version of me I'm becoming will…"];

/* PRIMITIVES */
const clamp=v=>Math.max(5,Math.min(98,v));
function useAnimKey(dep){const[k,setK]=useState(0);useEffect(()=>setK(x=>x+1),[dep]);return k;}

function ProgressTrail({current}){
  const SCREENS=["character","gender","regrets","statq","fork","shadow","shadowStats","glow","glowStats","dailyChallenge","mindset","mindsetDone","powers","transform","boss","oath","victory"];
  const idx=Math.max(0,SCREENS.indexOf(current));
  const pct=Math.round((idx/(SCREENS.length-1))*100);
  return(<div style={{position:"fixed",top:0,left:0,right:0,zIndex:999,height:3,background:"rgba(255,255,255,0.06)"}}>
    <div style={{height:"100%",width:`${pct}%`,transition:"width 0.7s ease",background:"linear-gradient(90deg,#7c3aed,#fbbf24,#34d399)",boxShadow:"0 0 12px rgba(251,191,36,0.6)"}}/>
  </div>);
}
function ChapterBadge({n,label}){
  return(<div style={{display:"inline-flex",alignItems:"center",gap:8,marginBottom:14}}>
    <div style={{width:26,height:26,borderRadius:"50%",background:"linear-gradient(135deg,#6d28d9,#a78bfa)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:900,color:"#fff",boxShadow:"0 0 16px rgba(109,40,217,0.6)"}}>{n}</div>
    <span style={{fontSize:11,letterSpacing:2.5,color:"#7e6ea8",fontWeight:700}}>{label}</span>
  </div>);
}
function XPBadge({xp}){
  return <span style={{display:"inline-block",background:"linear-gradient(135deg,#b45309,#fbbf24)",color:"#1a0a00",borderRadius:999,padding:"3px 10px",fontSize:11,fontWeight:800}}>+{xp} XP</span>;
}
function StatBar({label,value,color="#a78bfa",delay=0}){
  const[w,setW]=useState(0);
  useEffect(()=>{const t=setTimeout(()=>setW(value),delay+60);return()=>clearTimeout(t);},[value,delay]);
  return(<div style={{marginBottom:10}}>
    <div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:"#c4b5fd",fontWeight:700,marginBottom:4}}><span>{label}</span><span>{value}%</span></div>
    <div style={{background:"rgba(255,255,255,0.08)",borderRadius:999,height:9,overflow:"hidden"}}>
      <div style={{width:`${w}%`,height:"100%",borderRadius:999,background:`linear-gradient(90deg,${color}55,${color})`,boxShadow:`0 0 8px ${color}77`,transition:"width 0.9s cubic-bezier(.4,0,.2,1)"}}/>
    </div>
  </div>);
}
function Btn({children,onClick,disabled,variant="purple",full,small}){
  const V={
    purple:{background:"linear-gradient(135deg,#6d28d9,#a78bfa)",color:"#fff",boxShadow:"0 4px 20px #7c3aed44"},
    red:   {background:"linear-gradient(135deg,#7f1d1d,#ef4444)",color:"#fff",boxShadow:"0 4px 20px #ef444444"},
    amber: {background:"linear-gradient(135deg,#b45309,#fbbf24)",color:"#1a0a00",boxShadow:"0 4px 20px #fbbf2444"},
    ghost: {background:"rgba(255,255,255,0.07)",color:"#c4b5fd",border:"1px solid rgba(255,255,255,0.15)",boxShadow:"none"},
    green: {background:"linear-gradient(135deg,#065f46,#34d399)",color:"#fff",boxShadow:"0 4px 20px #34d39944"},
    cyan:  {background:"linear-gradient(135deg,#0e7490,#22d3ee)",color:"#fff",boxShadow:"0 4px 20px #22d3ee44"},
  };
  const v=V[variant]||V.purple;
  return(<button disabled={disabled} onClick={onClick}
    onMouseEnter={e=>{if(!disabled)e.currentTarget.style.transform="translateY(-2px) scale(1.02)";}}
    onMouseLeave={e=>{e.currentTarget.style.transform="";}}
    style={{...v,padding:small?"9px 18px":"12px 26px",borderRadius:14,border:v.border||"none",fontWeight:800,fontSize:small?12:14,cursor:disabled?"not-allowed":"pointer",opacity:disabled?0.38:1,transition:"transform 0.15s,opacity 0.15s",width:full?"100%":undefined,letterSpacing:0.3}}>
    {children}
  </button>);
}
function Glass({children,style={},glow=false,shadow=false,cyan=false}){
  const bc=shadow?"rgba(239,68,68,0.25)":glow?"rgba(251,191,36,0.28)":cyan?"rgba(34,211,238,0.28)":"rgba(255,255,255,0.11)";
  const bg=shadow?"rgba(239,68,68,0.07)":glow?"rgba(251,191,36,0.07)":cyan?"rgba(34,211,238,0.07)":"rgba(255,255,255,0.05)";
  const bs=shadow?"0 0 32px rgba(239,68,68,0.1)":glow?"0 0 32px rgba(251,191,36,0.12)":cyan?"0 0 32px rgba(34,211,238,0.1)":"0 8px 32px rgba(0,0,0,0.28)";
  return(<div style={{background:bg,border:`1px solid ${bc}`,borderRadius:20,padding:22,backdropFilter:"blur(16px)",boxShadow:bs,...style}}>{children}</div>);
}
function Wrap({bg,children,animKey,style={}}){
  return(<div key={animKey} style={{minHeight:"100vh",background:bg,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"50px 20px 36px",animation:"fadeUp 0.42s ease both",...style}}>{children}</div>);
}
const BG={
  neutral:"linear-gradient(135deg,#0f0c29 0%,#302b63 55%,#24243e 100%)",
  shadow: "linear-gradient(135deg,#0a0000 0%,#1a0505 60%,#0d0012 100%)",
  glow:   "linear-gradient(135deg,#0d1117 0%,#0f2027 50%,#1a0533 100%)",
  boss:   "linear-gradient(135deg,#060010 0%,#1a0533 50%,#0a0a0a 100%)",
  arena:  "linear-gradient(135deg,#001a1a 0%,#003333 50%,#001a2e 100%)",
  power:  "linear-gradient(135deg,#0d0d2b 0%,#1a0533 40%,#002200 100%)",
};
const LBL={display:"block",textAlign:"left",color:"#c4b5fd",fontSize:11,fontWeight:700,letterSpacing:1,marginBottom:8};
const HD={fontFamily:"'Cinzel Decorative',serif",color:"#e8e0ff",marginBottom:6};

/* ═══════════════ APP ═══════════════ */
export default function App(){
  /* ALL hooks at top — never inside conditionals */
  const[screen,       setScreen]      =useState("character");
  const[name,         setName]        =useState("");
  const[cls,          setCls]         =useState(null);
  const[gender,       setGender]      =useState(null);
  const[avatar,       setAvatar]      =useState(null);
  const[evolvedAv,    setEvolvedAv]   =useState(null);
  const[regrets,      setRegrets]     =useState([]);
  const[lastRegret,   setLastRegret]  =useState(null);
  const[stats,        setStats]       =useState({Energy:50,Focus:50,Discipline:50,Rest:50,Motivation:50});
  const[answered,     setAnswered]    =useState([]);
  const[mood,         setMood]        =useState(null);
  const[shadowIdx,    setShadowIdx]   =useState(0);
  const[glowIdx,      setGlowIdx]     =useState(0);
  const[totalXP,      setTotalXP]     =useState(0);
  const[dcDay,        setDcDay]       =useState(0);
  const[dcPicked,     setDcPicked]    =useState(null);
  const[dcResults,    setDcResults]   =useState([]);
  const[dcStreak,     setDcStreak]    =useState(0);
  const[mindsetIdx,   setMindsetIdx]  =useState(0);
  const[mindsetPicks, setMindsetPicks]=useState([]);
  const[mPending,     setMPending]    =useState(false);
  const[selPowers,    setSelPowers]   =useState([]);
  const[oath,         setOath]        =useState("");
  const[oathPrompt,   setOathPrompt]  =useState(0);
  const[bossHP,       setBossHP]      =useState(100);
  const[bossRound,    setBossRound]   =useState(0);
  const[bossPhase,    setBossPhase]   =useState("idle");
  const[nyPhase,      setNyPhase]     =useState("idle");
  const[cards,        setCards]       =useState([]);
  const[roundState,   setRoundState]  =useState("choosing");
  const[excuseMsg,    setExcuseMsg]   =useState("");
  const[showNext,     setShowNext]    =useState(false);

  const animKey=useAnimKey(screen);
  const go=s=>setScreen(s);
  const addXP=v=>setTotalXP(p=>p+v);
  const applyDelta=delta=>setStats(p=>{const n={...p};Object.entries(delta).forEach(([k,d])=>{if(n[k]!==undefined)n[k]=clamp(n[k]+d);});return n;});

  const shuffleCards=useCallback(r=>{
    if(r>=ROUNDS.length)return;
    const rd=ROUNDS[r];
    setCards([{...rd.habit,isHabit:true},...rd.excuses.map(e=>({...e,isHabit:false}))].sort(()=>Math.random()-0.5));
    setRoundState("choosing");setShowNext(false);
  },[]);

  useEffect(()=>{if(screen==="boss")shuffleCards(bossRound);},[screen,bossRound,shuffleCards]);

  /* mindset auto-advance via effect — no hook inside conditional */
  useEffect(()=>{
    if(!mPending)return;
    const t=setTimeout(()=>{
      setMPending(false);
      const next=mindsetIdx+1;
      if(next>=MINDSET_QUESTIONS.length){go("mindsetDone");}
      else{setMindsetIdx(next);}
    },1800);
    return()=>clearTimeout(t);
  },[mPending,mindsetIdx]);

  const handleBossChoice=isHabit=>{
    if(roundState!=="choosing")return;
    if(!isHabit){
      setExcuseMsg(EXCUSE_LINES[Math.floor(Math.random()*EXCUSE_LINES.length)]);
      setRoundState("excuse");setBossPhase("hit");
      setTimeout(()=>setBossPhase("idle"),700);return;
    }
    setRoundState("correct");
    const isFinal=bossRound>=ROUNDS.length-1;
    const hpDrop=Math.floor(100/ROUNDS.length);
    const nextHP=Math.max(0,bossHP-hpDrop);
    setNyPhase("lunge");
    setTimeout(()=>{setBossPhase("hit");setNyPhase("glow");},300);
    setTimeout(()=>{setBossPhase("falling");setBossHP(isFinal?0:nextHP);},720);
    if(isFinal){
      setTimeout(()=>{setBossPhase("dead");setNyPhase("celebrate");setShowNext(true);addXP(50);},1500);
    }else{
      setTimeout(()=>setBossPhase("rising"),1600);
      setTimeout(()=>{setBossPhase("idle");setNyPhase("idle");setShowNext(true);addXP(20);},2600);
    }
  };

  const goNextRound=()=>{
    const next=bossRound+1;
    if(next>=ROUNDS.length){go("oath");return;}
    setBossRound(next);shuffleCards(next);setBossPhase("idle");setNyPhase("idle");setShowNext(false);
  };

  const bossStyleObj=()=>{
    if(bossPhase==="dead")    return{display:"inline-block",animation:"bossDead 0.9s ease forwards",transformOrigin:"50% 95%"};
    if(bossPhase==="falling") return{display:"inline-block",animation:"bossFall 0.65s ease forwards",transformOrigin:"50% 95%"};
    if(bossPhase==="rising")  return{display:"inline-block",animation:"bossRise 0.75s ease forwards",transformOrigin:"50% 95%"};
    if(bossPhase==="hit")     return{display:"inline-block",animation:"bossHitFlash 0.42s ease, bossKnockback 0.42s ease"};
    return{display:"inline-block",animation:"floatFast 2.2s ease-in-out infinite"};
  };
  const nyStyleObj=()=>{
    if(nyPhase==="lunge")     return{display:"inline-block",animation:"newYouLunge 0.5s ease"};
    if(nyPhase==="glow")      return{display:"inline-block",animation:"newYouGlowAnim 1s ease-in-out"};
    if(nyPhase==="celebrate") return{display:"inline-block",animation:"celebrate 0.7s ease-in-out infinite"};
    return{display:"inline-block",animation:"floatY 3s ease-in-out infinite"};
  };

  const resetAll=()=>{
    setScreen("character");setName("");setCls(null);setGender(null);setAvatar(null);setEvolvedAv(null);
    setRegrets([]);setLastRegret(null);setStats({Energy:50,Focus:50,Discipline:50,Rest:50,Motivation:50});
    setAnswered([]);setMood(null);setShadowIdx(0);setGlowIdx(0);setTotalXP(0);
    setDcDay(0);setDcPicked(null);setDcResults([]);setDcStreak(0);
    setMindsetIdx(0);setMindsetPicks([]);setMPending(false);
    setSelPowers([]);setOath("");setOathPrompt(0);
    setBossHP(100);setBossRound(0);setBossPhase("idle");setNyPhase("idle");
    setCards([]);setRoundState("choosing");setExcuseMsg("");setShowNext(false);
  };

  /* ── SCREENS ── */

  if(screen==="character")return(
    <Wrap bg={BG.neutral} animKey={animKey}>
      <style>{G}</style><ProgressTrail current={screen}/>
      <div style={{maxWidth:460,width:"100%",textAlign:"center"}}>
        <div className="floatY" style={{fontSize:56,marginBottom:6}}>🪞</div>
        <h1 style={{fontFamily:"'Cinzel Decorative',serif",fontSize:28,color:"#e8e0ff",marginBottom:2}}>MirrorMe</h1>
        <p style={{color:"#7e6ea8",fontSize:13,marginBottom:8}}>A gamified self-improvement RPG</p>
        <div style={{display:"flex",gap:6,justifyContent:"center",marginBottom:28,flexWrap:"wrap"}}>
          {["16 Levels","5-Round Boss","Power Unlocks","Final Oath"].map(t=>(
            <span key={t} style={{background:"rgba(167,139,250,0.12)",border:"1px solid rgba(167,139,250,0.3)",borderRadius:999,padding:"3px 10px",fontSize:10,color:"#c4b5fd",fontWeight:700}}>{t}</span>
          ))}
        </div>
        <Glass>
          <label style={LBL}>YOUR NAME</label>
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="Enter your name…"
            style={{width:"100%",padding:"11px 14px",borderRadius:12,border:"1px solid rgba(167,139,250,0.3)",background:"rgba(167,139,250,0.07)",color:"#e8e0ff",fontSize:15,outline:"none",marginBottom:20}}/>
          <label style={LBL}>CHOOSE YOUR CLASS</label>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9,marginBottom:22}}>
            {CLASSES.map(c=>(
              <button key={c} onClick={()=>setCls(c)} style={{padding:"13px 8px",borderRadius:14,border:`2px solid ${cls===c?"#a78bfa":"rgba(255,255,255,0.1)"}`,background:cls===c?"rgba(167,139,250,0.18)":"rgba(255,255,255,0.04)",color:cls===c?"#e8e0ff":"#9d8fc4",fontSize:12,fontWeight:700,cursor:"pointer",transition:"all 0.2s"}}>{c}</button>
            ))}
          </div>
          <Btn full disabled={!name.trim()||!cls} onClick={()=>go("gender")}>Begin Your Journey →</Btn>
        </Glass>
      </div>
    </Wrap>
  );

  if(screen==="gender"){
    const opts=gender?AVATAR_OPTIONS[gender]:[];
    return(
      <Wrap bg={BG.neutral} animKey={animKey}>
        <style>{G}</style><ProgressTrail current={screen}/>
        <div style={{maxWidth:560,width:"100%",textAlign:"center"}}>
          <ChapterBadge n="1" label="CHAPTER ONE"/>
          <h2 style={{...HD,fontSize:21}}>Choose Your Identity</h2>
          <p style={{color:"#7e6ea8",fontSize:13,marginBottom:22}}>Pick gender → then your bitmoji</p>
          <Glass style={{marginBottom:14}}>
            <p style={{...LBL,textAlign:"center",marginBottom:14}}>I AM</p>
            <div style={{display:"flex",gap:14,justifyContent:"center"}}>
              {[["female","👩 Female"],["male","👨 Male"]].map(([g,lbl])=>(
                <button key={g} onClick={()=>{setGender(g);setAvatar(null);}} style={{padding:"13px 28px",borderRadius:14,border:`2px solid ${gender===g?"#a78bfa":"rgba(255,255,255,0.1)"}`,background:gender===g?"rgba(167,139,250,0.2)":"rgba(255,255,255,0.04)",color:gender===g?"#e8e0ff":"#9d8fc4",fontSize:14,fontWeight:800,cursor:"pointer",transition:"all 0.2s"}}>{lbl}</button>
              ))}
            </div>
          </Glass>
          {gender&&(
            <Glass style={{marginBottom:18}} className="fadeIn">
              <p style={{...LBL,textAlign:"center",marginBottom:16}}>CHOOSE YOUR BITMOJI</p>
              <div style={{display:"flex",gap:12,justifyContent:"center"}}>
                {opts.map(av=>{const sel=avatar?.id===av.id;return(
                  <button key={av.id} onClick={()=>setAvatar(av)} style={{padding:"16px 10px",borderRadius:20,flex:1,maxWidth:160,border:`3px solid ${sel?av.color:"rgba(255,255,255,0.1)"}`,background:sel?`${av.color}18`:"rgba(255,255,255,0.03)",cursor:"pointer",transition:"all 0.25s",boxShadow:sel?`0 0 28px ${av.color}55`:"none",transform:sel?"scale(1.04)":"scale(1)"}}>
                    <BitmojiAvatar id={av.id} size={90}/>
                    <div style={{fontSize:11,fontWeight:800,color:sel?av.color:"#7e6ea8",marginTop:8}}>{av.label}</div>
                  </button>
                );})}
              </div>
            </Glass>
          )}
          <div style={{display:"flex",gap:10}}>
            <Btn variant="ghost" onClick={()=>go("character")}>← Back</Btn>
            <Btn full disabled={!gender||!avatar} onClick={()=>go("regrets")}>Meet Your Regrets →</Btn>
          </div>
        </div>
      </Wrap>
    );
  }

  if(screen==="regrets"){
    const reg=REGRETS.find(r=>r.id===lastRegret);
    return(
      <Wrap bg={BG.neutral} animKey={animKey}>
        <style>{G}</style><ProgressTrail current={screen}/>
        <div style={{maxWidth:500,width:"100%"}}>
          <ChapterBadge n="2" label="CHAPTER TWO"/>
          <h2 style={{...HD,fontSize:20,textAlign:"center"}}>What quietly bothers you?</h2>
          <p style={{color:"#7e6ea8",fontSize:13,marginBottom:18,textAlign:"center"}}>Select all that apply</p>
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",marginBottom:16}}>
            {reg?.bubble&&<div className="popIn" style={{background:"rgba(255,255,255,0.09)",border:"1px solid rgba(167,139,250,0.3)",borderRadius:14,padding:"8px 14px",fontSize:12,color:"#c4b5fd",fontWeight:700,maxWidth:220,textAlign:"center",marginBottom:8}}>{reg.bubble}</div>}
            <div className="floatY"><BitmojiAvatar id={avatar?.id||"f1"} size={80}/></div>
          </div>
          <Glass>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9,marginBottom:18}}>
              {REGRETS.map(r=>{const on=regrets.includes(r.id);return(
                <button key={r.id} onClick={()=>{setRegrets(on?regrets.filter(x=>x!==r.id):[...regrets,r.id]);setLastRegret(r.id);}} style={{padding:"12px 8px",borderRadius:14,border:`2px solid ${on?"#a78bfa":"rgba(255,255,255,0.1)"}`,background:on?"rgba(167,139,250,0.18)":"rgba(255,255,255,0.04)",color:on?"#e8e0ff":"#9d8fc4",fontSize:12,fontWeight:700,cursor:"pointer",transition:"all 0.2s"}}>{on?"✓ ":""}{r.label}</button>
              );})}
            </div>
            <div style={{display:"flex",gap:10}}>
              <Btn variant="ghost" onClick={()=>go("gender")}>← Back</Btn>
              <Btn full disabled={regrets.length===0} onClick={()=>go("statq")}>Continue →</Btn>
            </div>
          </Glass>
        </div>
      </Wrap>
    );
  }

  if(screen==="statq"){
    const md=mood?MOOD_BUBBLE[mood]:null;
    return(
      <Wrap bg={BG.neutral} animKey={animKey}>
        <style>{G}</style><ProgressTrail current={screen}/>
        <div style={{maxWidth:620,width:"100%"}}>
          <ChapterBadge n="3" label="CHAPTER THREE"/>
          <h2 style={{...HD,fontSize:20,textAlign:"center",marginBottom:20}}>Your Stats Await</h2>
          <div style={{display:"grid",gridTemplateColumns:"1fr 170px",gap:16,alignItems:"start"}}>
            <div>
              <Glass style={{marginBottom:14}}>{Object.entries(stats).map(([k,v],i)=><StatBar key={k} label={k} value={v} delay={i*70}/>)}</Glass>
              {QUESTIONS.map((q,qi)=>{
                const locked=qi>answered.length,done=answered[qi]!==undefined;
                return(<Glass key={qi} style={{marginBottom:12,opacity:locked?0.3:1,transition:"opacity 0.3s"}}>
                  <p style={{color:"#c4b5fd",fontWeight:700,fontSize:13,marginBottom:10}}>Q{qi+1}. {q.q}</p>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7}}>
                    {q.choices.map((c,ci)=>{const chosen=answered[qi]===ci;return(
                      <button key={ci} disabled={done||locked} onClick={()=>{if(done||locked)return;setAnswered(p=>{const a=[...p];a[qi]=ci;return a;});applyDelta(c.delta);setMood(c.mood);addXP(10);}}
                        style={{padding:"9px 7px",borderRadius:11,border:`2px solid ${chosen?"#a78bfa":"rgba(255,255,255,0.1)"}`,background:chosen?"rgba(167,139,250,0.2)":"rgba(255,255,255,0.04)",color:done?(chosen?"#e8e0ff":"#4a3f6a"):"#c4b5fd",fontSize:11,fontWeight:600,cursor:(done||locked)?"default":"pointer",transition:"all 0.2s",textAlign:"left"}}>{c.text}</button>
                    );})}
                  </div>
                </Glass>);
              })}
              <div style={{display:"flex",gap:10,marginTop:4}}>
                <Btn variant="ghost" onClick={()=>go("regrets")}>← Back</Btn>
                <Btn full disabled={answered.length<QUESTIONS.length} onClick={()=>go("fork")}>See Results →</Btn>
              </div>
            </div>
            <div style={{position:"sticky",top:60,textAlign:"center"}}>
              <Glass style={{padding:16}}>
                {md&&<div className="popIn" style={{background:"rgba(255,255,255,0.08)",border:`1px solid ${md.color}44`,borderRadius:12,padding:"7px 10px",fontSize:11,color:md.color,fontWeight:700,marginBottom:10}}>{md.text}</div>}
                {!md&&<p style={{color:"#5a4f7a",fontSize:11,marginBottom:10}}>Watching your choices 👀</p>}
                <div className={mood==="positive"?"bounce":mood==="negative"?"shake":"floatY"}><BitmojiAvatar id={avatar?.id||"f1"} size={90}/></div>
                <div style={{marginTop:10,background:"rgba(251,191,36,0.1)",borderRadius:10,padding:"6px 10px"}}><div style={{fontSize:10,color:"#fbbf24",fontWeight:800}}>⚡ {totalXP} XP</div></div>
              </Glass>
            </div>
          </div>
        </div>
      </Wrap>
    );
  }

  if(screen==="fork")return(
    <Wrap bg={BG.neutral} animKey={animKey}>
      <style>{G}</style><ProgressTrail current={screen}/>
      <div style={{maxWidth:520,width:"100%",textAlign:"center"}}>
        <ChapterBadge n="4" label="CHAPTER FOUR"/>
        <div className="floatY" style={{fontSize:52,marginBottom:10}}>🍃</div>
        <h2 style={{...HD,fontSize:21}}>Fork in the Road</h2>
        <p style={{color:"#9d8fc4",marginBottom:30,lineHeight:1.8,fontSize:14}}>Your choices brought you here.<br/>See where each path leads.</p>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:20}}>
          <Glass shadow>
            <div style={{fontSize:36,marginBottom:8}}>🌑</div>
            <h3 style={{color:"#fca5a5",fontFamily:"'Cinzel Decorative',serif",fontSize:13,marginBottom:6}}>Shadow Path</h3>
            <p style={{color:"#7e6ea8",fontSize:12,lineHeight:1.6,marginBottom:12}}>What if nothing changes?</p>
            <div style={{animation:"runRight 1.1s cubic-bezier(.4,0,.2,1) both",marginBottom:10}}><BitmojiAvatar id={avatar?.id||"f1"} size={60} shadow/></div>
            <div style={{fontSize:10,color:"#fca5a5",marginBottom:12,fontWeight:700}}>"Maybe tomorrow…" 😶</div>
            <Btn full variant="red" onClick={()=>{setShadowIdx(0);go("shadow");}}>Choose</Btn>
          </Glass>
          <Glass glow style={{opacity:0.5}}>
            <div style={{fontSize:36,marginBottom:8}}>✨</div>
            <h3 style={{color:"#fde68a",fontFamily:"'Cinzel Decorative',serif",fontSize:13,marginBottom:6}}>Glow Path</h3>
            <p style={{color:"#7e6ea8",fontSize:12,lineHeight:1.6,marginBottom:12}}>What if you start today?</p>
            <div style={{marginBottom:10,opacity:0.3}}><BitmojiAvatar id={avatar?.id||"f1"} size={60}/></div>
            <div style={{fontSize:10,color:"#fde68a",marginBottom:12,fontWeight:700}}>Locked for now…</div>
            <Btn full variant="amber" disabled>Locked</Btn>
          </Glass>
        </div>
        <p style={{color:"#5a4f7a",fontSize:12}}>Your avatar ran toward Shadow. Face what happens next.</p>
      </div>
    </Wrap>
  );

  if(screen==="shadow"){
    const card=SC[shadowIdx],last=shadowIdx===3;
    return(
      <Wrap bg={BG.shadow} animKey={`sh${shadowIdx}`}>
        <style>{G}</style><ProgressTrail current={screen}/>
        <div style={{maxWidth:440,width:"100%",textAlign:"center"}}>
          <p style={{color:"#7f2020",fontSize:11,letterSpacing:2,marginBottom:10}}>SHADOW PATH • {shadowIdx+1}/4</p>
          <div style={{display:"flex",gap:6,justifyContent:"center",marginBottom:22}}>{SC.map((_,i)=><div key={i} style={{width:34,height:4,borderRadius:2,background:i<=shadowIdx?"#ef4444":"rgba(255,255,255,0.08)",transition:"background 0.3s"}}/>)}</div>
          <Glass shadow style={{position:"relative"}}>
            <div className="floatY" style={{fontSize:56,marginBottom:10}}>{card.icon}</div>
            <h3 style={{fontFamily:"'Cinzel Decorative',serif",color:"#fca5a5",fontSize:20,marginBottom:10}}>{card.title}</h3>
            <p style={{color:"#c4a4a4",lineHeight:1.85,fontSize:14,marginBottom:20}}>{card.text}</p>
            <div style={{position:"absolute",bottom:14,right:14,opacity:0.4}} className="floatFast"><BitmojiAvatar id={avatar?.id||"f1"} size={38} shadow/></div>
            {!last?<Btn full variant="red" onClick={()=>setShadowIdx(i=>i+1)}>Next →</Btn>:<Btn full variant="red" onClick={()=>go("shadowStats")}>See What Happened →</Btn>}
          </Glass>
        </div>
      </Wrap>
    );
  }

  if(screen==="shadowStats"){
    const s2=Object.fromEntries(Object.entries(stats).map(([k,v])=>[k,clamp(v-22)]));
    return(
      <Wrap bg={BG.shadow} animKey={animKey}>
        <style>{G}</style><ProgressTrail current={screen}/>
        <div style={{maxWidth:440,width:"100%",textAlign:"center"}}>
          <div className="floatY" style={{fontSize:46,marginBottom:10}}>📉</div>
          <h2 style={{fontFamily:"'Cinzel Decorative',serif",color:"#fca5a5",fontSize:20,marginBottom:6}}>Shadow Stats</h2>
          <p style={{color:"#7f3030",marginBottom:22,fontSize:13}}>"Nothing dramatic happened. Just small choices repeated."</p>
          <Glass shadow style={{marginBottom:18}}>{Object.entries(s2).map(([k,v],i)=><StatBar key={k} label={k} value={v} color="#ef4444" delay={i*90}/>)}</Glass>
          <Btn full variant="amber" onClick={()=>{setGlowIdx(0);go("glow");}}>Try the Glow Path →</Btn>
        </div>
      </Wrap>
    );
  }

  if(screen==="glow"){
    const card=GC[glowIdx],last=glowIdx===3;
    return(
      <Wrap bg={BG.glow} animKey={`gl${glowIdx}`}>
        <style>{G}</style><ProgressTrail current={screen}/>
        <div style={{maxWidth:440,width:"100%",textAlign:"center"}}>
          <p style={{color:"#92620a",fontSize:11,letterSpacing:2,marginBottom:10}}>GLOW PATH • {glowIdx+1}/4</p>
          <div style={{display:"flex",gap:6,justifyContent:"center",marginBottom:22}}>{GC.map((_,i)=><div key={i} style={{width:34,height:4,borderRadius:2,background:i<=glowIdx?"#fbbf24":"rgba(255,255,255,0.08)",transition:"background 0.3s"}}/>)}</div>
          <Glass glow style={{position:"relative"}}>
            <div className="floatY" style={{fontSize:56,marginBottom:10}}>{card.icon}</div>
            <h3 style={{fontFamily:"'Cinzel Decorative',serif",color:"#fde68a",fontSize:20,marginBottom:10}}>{card.title}</h3>
            <p style={{color:"#d4b896",lineHeight:1.85,fontSize:14,marginBottom:20}}>{card.text}</p>
            <div style={{position:"absolute",bottom:14,right:14,opacity:0.65}} className="floatFast"><BitmojiAvatar id={avatar?.id||"f1"} size={38}/></div>
            {!last?<Btn full variant="amber" onClick={()=>setGlowIdx(i=>i+1)}>Next →</Btn>:<Btn full variant="amber" onClick={()=>go("glowStats")}>See What Changed →</Btn>}
          </Glass>
        </div>
      </Wrap>
    );
  }

  if(screen==="glowStats"){
    const s2=Object.fromEntries(Object.entries(stats).map(([k,v])=>[k,clamp(v+22)]));
    return(
      <Wrap bg={BG.glow} animKey={animKey}>
        <style>{G}</style><ProgressTrail current={screen}/>
        <div style={{maxWidth:440,width:"100%",textAlign:"center"}}>
          <div className="floatY" style={{fontSize:46,marginBottom:10}}>📈</div>
          <h2 style={{fontFamily:"'Cinzel Decorative',serif",color:"#fde68a",fontSize:20,marginBottom:6}}>Glow Stats</h2>
          <p style={{color:"#92620a",marginBottom:22,fontSize:13}}>"Every small win compounded into something real."</p>
          <Glass glow style={{marginBottom:18}}>{Object.entries(s2).map(([k,v],i)=><StatBar key={k} label={k} value={v} color="#fbbf24" delay={i*90}/>)}</Glass>
          <Btn full variant="amber" onClick={()=>{setDcDay(0);setDcPicked(null);setDcResults([]);setDcStreak(0);go("dailyChallenge");}}>Enter The Daily Challenge →</Btn>
        </div>
      </Wrap>
    );
  }

  if(screen==="dailyChallenge"){
    const allDone=dcResults.length===DAILY_CHALLENGES.length;
    if(allDone){
      const correctCount=dcResults.filter(Boolean).length;
      const earnedXP=dcResults.reduce((acc,ok,i)=>acc+(ok?(DAILY_CHALLENGES[i].options.find(o=>o.correct)?.xp||30):5),0);
      const streakBonus=dcStreak>=3;
      return(
        <Wrap bg={BG.arena} animKey="dc-done">
          <style>{G}</style><ProgressTrail current={screen}/>
          <div style={{maxWidth:460,width:"100%",textAlign:"center"}}>
            <ChapterBadge n="5" label="CHAPTER FIVE"/>
            <div className="spinIn" style={{fontSize:64,marginBottom:12}}>{correctCount>=3?"🏆":correctCount>=2?"⚡":"💭"}</div>
            <h2 style={{fontFamily:"'Cinzel Decorative',serif",color:"#22d3ee",fontSize:22,marginBottom:8}}>Challenge Complete!</h2>
            <p style={{color:"#67e8f9",fontSize:13,marginBottom:24}}>{correctCount>=3?"You crushed all 3 days. Elite-level consistency.":correctCount>=2?"2 out of 3. You're building something real.":"1 day down. Every streak starts with one."}</p>
            <Glass cyan style={{marginBottom:20}}>
              <div style={{display:"flex",justifyContent:"space-around",marginBottom:16}}>
                {DAILY_CHALLENGES.map((c,i)=>(
                  <div key={i} style={{textAlign:"center"}}>
                    <div className="streakPop" style={{fontSize:28,animationDelay:`${i*0.15}s`}}>{dcResults[i]?"✅":"❌"}</div>
                    <div style={{fontSize:10,color:"#67e8f9",marginTop:4,fontWeight:700}}>Day {c.day}</div>
                  </div>
                ))}
              </div>
              <div style={{background:"rgba(34,211,238,0.1)",borderRadius:12,padding:"10px 16px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span style={{color:"#67e8f9",fontSize:12,fontWeight:700}}>Challenge XP Earned</span>
                <XPBadge xp={earnedXP}/>
              </div>
              {streakBonus&&<div style={{marginTop:10,fontSize:12,color:"#fbbf24",fontWeight:700}}>🔥 Streak Bonus: +15 XP</div>}
            </Glass>
            <Btn full variant="cyan" onClick={()=>{addXP(earnedXP+(streakBonus?15:0));setMindsetIdx(0);setMindsetPicks([]);setMPending(false);go("mindset");}}>Enter The Mindset Arena →</Btn>
          </div>
        </Wrap>
      );
    }
    const challenge=DAILY_CHALLENGES[dcDay];
    const isDone=dcPicked!==null;
    return(
      <Wrap bg={BG.arena} animKey={`dc${dcDay}`}>
        <style>{G}</style><ProgressTrail current={screen}/>
        <div style={{maxWidth:500,width:"100%"}}>
          <ChapterBadge n="5" label="DAILY CHALLENGE"/>
          <div style={{display:"flex",gap:6,justifyContent:"center",marginBottom:18}}>
            {DAILY_CHALLENGES.map((_,i)=><div key={i} style={{width:40,height:4,borderRadius:2,transition:"background 0.3s",background:i<dcResults.length?"#22d3ee":i===dcDay?"#67e8f9":"rgba(255,255,255,0.08)"}}/>)}
          </div>
          <Glass cyan style={{marginBottom:14}}>
            <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:16}}>
              <div style={{fontSize:44}}>{challenge.icon}</div>
              <div><div style={{fontSize:11,color:"#22d3ee",fontWeight:800,letterSpacing:1}}>DAY {challenge.day} OF 3</div>
                <h3 style={{fontFamily:"'Cinzel Decorative',serif",color:"#e8e0ff",fontSize:17}}>{challenge.title}</h3></div>
            </div>
            <p style={{color:"#a5f3fc",fontSize:14,lineHeight:1.75,marginBottom:20,fontWeight:600}}>{challenge.challenge}</p>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              {challenge.options.map((opt,i)=>{
                const picked=dcPicked===i,revealed=isDone,isC=opt.correct;
                let border="rgba(255,255,255,0.12)",bg="rgba(255,255,255,0.04)",color="#c4b5fd";
                if(revealed&&isC){border="#22d3ee";bg="rgba(34,211,238,0.12)";color="#67e8f9";}
                if(revealed&&picked&&!isC){border="#ef4444";bg="rgba(239,68,68,0.12)";color="#fca5a5";}
                return(<button key={i} disabled={isDone} onClick={()=>{setDcPicked(i);if(opt.correct)setDcStreak(s=>s+1);}} style={{padding:"13px 10px",borderRadius:14,border:`2px solid ${border}`,background:bg,color,fontSize:12,fontWeight:700,cursor:isDone?"default":"pointer",transition:"all 0.3s",textAlign:"left"}}>
                  {opt.text}{revealed&&<div style={{fontSize:10,marginTop:6,opacity:0.8}}>{opt.msg}</div>}
                </button>);
              })}
            </div>
          </Glass>
          {isDone&&(
            <Glass cyan style={{animation:"popIn 0.4s ease both",textAlign:"center",marginBottom:14}}>
              {challenge.options[dcPicked].correct
                ?<><div style={{fontSize:28,marginBottom:6}}>🎯</div><p style={{color:"#22d3ee",fontWeight:800,fontSize:14}}>Correct! +{challenge.options[dcPicked].xp} XP</p><p style={{color:"#67e8f9",fontSize:12,marginTop:4}}>{challenge.options[dcPicked].msg}</p></>
                :<><div style={{fontSize:28,marginBottom:6}}>💡</div><p style={{color:"#fca5a5",fontWeight:800,fontSize:13}}>Not quite — but now you know.</p><p style={{color:"#94a3b8",fontSize:12,marginTop:4}}>{challenge.options[dcPicked].msg}</p></>}
              <div style={{marginTop:12}}>
                <Btn variant="cyan" onClick={()=>{setDcResults(r=>[...r,challenge.options[dcPicked].correct]);setDcPicked(null);setDcDay(d=>d+1);}}>
                  {dcDay<DAILY_CHALLENGES.length-1?"Next Day →":"See Results →"}
                </Btn>
              </div>
            </Glass>
          )}
        </div>
      </Wrap>
    );
  }

  if(screen==="mindset"){
    const q=MINDSET_QUESTIONS[mindsetIdx];
    const lastPick=mPending?mindsetPicks[mindsetPicks.length-1]:null;
    return(
      <Wrap bg={BG.neutral} animKey={`ms${mindsetIdx}`}>
        <style>{G}</style><ProgressTrail current={screen}/>
        <div style={{maxWidth:500,width:"100%"}}>
          <ChapterBadge n="6" label="MINDSET ARENA"/>
          <div style={{display:"flex",gap:6,justifyContent:"center",marginBottom:18}}>
            {MINDSET_QUESTIONS.map((_,i)=><div key={i} style={{width:32,height:4,borderRadius:2,transition:"background 0.3s",background:i<mindsetPicks.length?"#a78bfa":i===mindsetIdx?"#c4b5fd":"rgba(255,255,255,0.08)"}}/>)}
          </div>
          <Glass style={{marginBottom:14}}>
            <div style={{fontSize:36,marginBottom:10}}>{q.icon}</div>
            <h3 style={{color:"#e8e0ff",fontWeight:800,fontSize:16,lineHeight:1.5,marginBottom:18}}>{q.q}</h3>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {q.traits.map((t,i)=>{
                const sel=mPending&&lastPick?.trait===t.trait;
                return(<button key={i} disabled={mPending} onClick={()=>{setMindsetPicks(p=>[...p,{...t}]);setMPending(true);}}
                  style={{padding:"13px 16px",borderRadius:14,textAlign:"left",cursor:mPending?"default":"pointer",border:`2px solid ${sel?t.color:"rgba(255,255,255,0.1)"}`,background:sel?`${t.color}18`:"rgba(255,255,255,0.04)",color:sel?t.color:"#c4b5fd",fontWeight:700,fontSize:13,transition:"all 0.2s",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  {t.text}
                  {sel&&<span style={{fontSize:11,background:`${t.color}22`,borderRadius:999,padding:"3px 10px",animation:"popIn 0.3s ease both"}}>{t.trait}</span>}
                </button>);
              })}
            </div>
          </Glass>
          <p style={{color:"#4b3f6a",fontSize:11,textAlign:"center"}}>Question {mindsetIdx+1} of {MINDSET_QUESTIONS.length} • Be honest with yourself 🪞</p>
        </div>
      </Wrap>
    );
  }

  if(screen==="mindsetDone"){
    const positives=mindsetPicks.filter(p=>!p.neg);
    return(
      <Wrap bg={BG.neutral} animKey="ms-done">
        <style>{G}</style><ProgressTrail current={screen}/>
        <div style={{maxWidth:480,width:"100%",textAlign:"center"}}>
          <ChapterBadge n="6" label="MINDSET PROFILE"/>
          <div className="floatY" style={{fontSize:52,marginBottom:12}}>🧠</div>
          <h2 style={{fontFamily:"'Cinzel Decorative',serif",color:"#e8e0ff",fontSize:22,marginBottom:8}}>Your Mindset DNA</h2>
          <p style={{color:"#7e6ea8",fontSize:13,marginBottom:24}}>These are the traits you revealed about yourself.</p>
          <Glass style={{marginBottom:20}}>
            <p style={{color:"#c4b5fd",fontSize:11,fontWeight:700,letterSpacing:1,marginBottom:14}}>TRAITS UNLOCKED</p>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {mindsetPicks.map((p,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 14px",borderRadius:12,background:p.neg?"rgba(239,68,68,0.08)":"rgba(34,197,94,0.08)",border:`1px solid ${p.neg?"rgba(239,68,68,0.25)":"rgba(34,197,94,0.25)"}`,animation:`traitSlide 0.4s ease ${i*0.1}s both`}}>
                  <span style={{fontSize:18}}>{p.neg?"⚠️":"✨"}</span>
                  <div style={{flex:1,textAlign:"left"}}><div style={{fontWeight:800,color:p.color,fontSize:13}}>{p.trait}</div><div style={{fontSize:11,color:"#7e6ea8"}}>Q{i+1} response</div></div>
                  <div style={{fontSize:10,color:p.neg?"#fca5a5":"#86efac",fontWeight:700}}>{p.neg?"Challenge":"Strength"}</div>
                </div>
              ))}
            </div>
          </Glass>
          {positives.length>0&&<Glass glow style={{marginBottom:20}}><p style={{color:"#fde68a",fontWeight:800,fontSize:14,marginBottom:8}}>💪 {positives.length} strength{positives.length>1?"s":""} unlocked</p><p style={{color:"#9d8fc4",fontSize:12}}>These are real. These are yours. Build on them.</p></Glass>}
          <Btn full variant="purple" onClick={()=>{addXP(positives.length*15);setSelPowers([]);go("powers");}}>Unlock Your Powers →</Btn>
        </div>
      </Wrap>
    );
  }

  if(screen==="powers"){
    const canProceed=selPowers.length===3;
    return(
      <Wrap bg={BG.power} animKey={animKey}>
        <style>{G}</style><ProgressTrail current={screen}/>
        <div style={{maxWidth:600,width:"100%"}}>
          <ChapterBadge n="7" label="POWER SELECTION"/>
          <div style={{textAlign:"center",marginBottom:24}}>
            <div className="floatY" style={{fontSize:52,marginBottom:8}}>⚡</div>
            <h2 style={{fontFamily:"'Cinzel Decorative',serif",color:"#fde68a",fontSize:22,marginBottom:8}}>Choose Your 3 Powers</h2>
            <p style={{color:"#9d8fc4",fontSize:13}}>These become your weapons for the Boss Battle. <span style={{color:"#fbbf24",fontWeight:700}}>Choose wisely.</span></p>
            <div style={{marginTop:8,fontSize:13,color:"#fbbf24",fontWeight:700}}>{selPowers.length}/3 selected</div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:20}}>
            {POWERS.map((pw,i)=>{
              const sel=selPowers.includes(pw.id),disabled=!sel&&selPowers.length>=3;
              return(<button key={pw.id} disabled={disabled} onClick={()=>{if(sel)setSelPowers(p=>p.filter(x=>x!==pw.id));else if(selPowers.length<3){setSelPowers(p=>[...p,pw.id]);applyDelta({[pw.stat]:8});}}}
                style={{padding:"18px 14px",borderRadius:18,textAlign:"left",cursor:disabled?"not-allowed":"pointer",border:`2px solid ${sel?pw.color:"rgba(255,255,255,0.09)"}`,background:sel?`${pw.color}18`:"rgba(255,255,255,0.03)",opacity:disabled?0.3:1,transition:"all 0.25s",animation:`fadeUp 0.4s ease ${i*0.06}s both`,boxShadow:sel?`0 0 24px ${pw.color}44`:"none"}}>
                <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
                  <div style={{fontSize:28}}>{pw.icon}</div>
                  <div><div style={{fontWeight:800,color:sel?pw.color:"#e8e0ff",fontSize:13}}>{pw.name}</div><div style={{fontSize:10,color:"#5a4f7a"}}>+{pw.stat}</div></div>
                  {sel&&<div style={{marginLeft:"auto",fontSize:18,animation:"popIn 0.3s ease"}}>✓</div>}
                </div>
                <p style={{color:sel?"#c4b5fd":"#5a4f7a",fontSize:11,lineHeight:1.5}}>{pw.desc}</p>
              </button>);
            })}
          </div>
          {canProceed&&(
            <Glass glow style={{marginBottom:16,textAlign:"center",animation:"popIn 0.4s ease both"}}>
              <p style={{color:"#fde68a",fontWeight:800,marginBottom:4}}>Powers locked in! 🔒</p>
              <div style={{display:"flex",justifyContent:"center",gap:8,marginBottom:12}}>
                {selPowers.map(pid=>{const pw=POWERS.find(p=>p.id===pid);return pw?<span key={pid} style={{fontSize:22,display:"inline-block",animation:"floatY 2s ease-in-out infinite"}}>{pw.icon}</span>:null;})}
              </div>
              <Btn variant="amber" onClick={()=>{addXP(30);go("transform");}}>Claim Your Transformation →</Btn>
            </Glass>
          )}
          {!canProceed&&<p style={{textAlign:"center",color:"#4b3f6a",fontSize:12}}>Select {3-selPowers.length} more power{3-selPowers.length!==1?"s":""}</p>}
        </div>
      </Wrap>
    );
  }

  if(screen==="transform"){
    const opts=gender?AVATAR_OPTIONS[gender]:AVATAR_OPTIONS.female;
    return(
      <Wrap bg={BG.boss} animKey={animKey}>
        <style>{G}</style><ProgressTrail current={screen}/>
        <div style={{maxWidth:500,width:"100%",textAlign:"center"}}>
          <ChapterBadge n="8" label="TRANSFORMATION"/>
          <div style={{fontSize:11,letterSpacing:3,color:"#fbbf24",fontWeight:800,marginBottom:10}}>✦ YOU HAVE EVOLVED ✦</div>
          <h2 style={{fontFamily:"'Cinzel Decorative',serif",fontSize:22,color:"#fde68a",marginBottom:8}}>You're Not the Same.</h2>
          <p style={{color:"#9d8fc4",fontSize:13,lineHeight:1.8,marginBottom:24}}>You're not the same version who started this journey.<br/><span style={{color:"#fde68a",fontWeight:700}}>Choose who you're becoming.</span></p>
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:24,marginBottom:24}}>
            <div style={{textAlign:"center",opacity:0.3}}><BitmojiAvatar id={avatar?.id||"f1"} size={70} shadow/><p style={{fontSize:10,color:"#5a4f7a",marginTop:4,fontWeight:700}}>Old You</p></div>
            <div style={{fontSize:24,color:"#fbbf24"}}>→</div>
            <div style={{textAlign:"center"}}><div className="floatY glowPulse"><BitmojiAvatar id={evolvedAv?evolvedAv.eid:opts[0]?.eid||"f1e"} size={70} evolved/></div><p style={{fontSize:10,color:"#fde68a",marginTop:4,fontWeight:700}}>New You</p></div>
          </div>
          <Glass glow style={{marginBottom:20}}>
            <p style={{...LBL,textAlign:"center",marginBottom:16}}>CHOOSE YOUR EVOLVED BITMOJI</p>
            <div style={{display:"flex",gap:12,justifyContent:"center"}}>
              {opts.map(av=>{const sel=evolvedAv?.id===av.id;return(
                <button key={av.id} onClick={()=>setEvolvedAv(av)} style={{padding:"16px 10px",borderRadius:20,flex:1,border:`3px solid ${sel?av.color:"rgba(255,255,255,0.1)"}`,background:sel?`${av.color}18`:"rgba(255,255,255,0.03)",cursor:"pointer",transition:"all 0.25s",boxShadow:sel?`0 0 28px ${av.color}55`:"none",transform:sel?"scale(1.05)":"scale(1)"}}>
                  <BitmojiAvatar id={av.eid} size={80} evolved={sel}/>
                  <div style={{fontSize:10,fontWeight:800,color:sel?av.color:"#7e6ea8",marginTop:6}}>{av.label}</div>
                </button>
              );})}
            </div>
          </Glass>
          <Btn full variant="amber" disabled={!evolvedAv} onClick={()=>{setBossHP(100);setBossRound(0);setBossPhase("idle");setNyPhase("idle");setShowNext(false);setRoundState("choosing");go("boss");}}>Face The Old You →</Btn>
        </div>
      </Wrap>
    );
  }

  if(screen==="boss"){
    const oldId=avatar?.id||"f1",newId=evolvedAv?.eid||"f1e";
    const dead=bossHP<=0,isFinalVictory=dead&&roundState==="correct";
    return(
      <Wrap bg={BG.boss} animKey={animKey} style={{justifyContent:"flex-start",paddingTop:50}}>
        <style>{G}</style><ProgressTrail current={screen}/>
        <div style={{maxWidth:660,width:"100%"}}>
          <div style={{textAlign:"center",marginBottom:14}}>
            <ChapterBadge n="9" label="FINAL BOSS BATTLE"/>
            <h2 style={{fontFamily:"'Cinzel Decorative',serif",color:"#e8e0ff",fontSize:22,marginBottom:3}}>The Old You</h2>
            {!dead&&<p style={{color:"#5a4f7a",fontSize:12}}>Round {bossRound+1} of {ROUNDS.length}</p>}
            <div style={{display:"flex",gap:8,justifyContent:"center",marginTop:8,flexWrap:"wrap"}}>
              {selPowers.map(pid=>{const pw=POWERS.find(p=>p.id===pid);return pw?(<span key={pid} style={{background:`${pw.color}22`,border:`1px solid ${pw.color}44`,borderRadius:999,padding:"3px 10px",fontSize:10,color:pw.color,fontWeight:700}}>{pw.icon} {pw.name}</span>):null;})}
            </div>
          </div>
          {/* Arena */}
          <div style={{background:"rgba(0,0,0,0.38)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:24,padding:"26px 20px 16px",marginBottom:14,backgroundImage:"radial-gradient(ellipse at center bottom,rgba(109,40,217,0.18) 0%,transparent 70%)"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",gap:4}}>
              <div style={{textAlign:"center",flex:1}}>
                <div style={{fontSize:10,color:"#86efac",fontWeight:800,letterSpacing:1,marginBottom:8}}>NEW YOU</div>
                <div style={{display:"flex",alignItems:"flex-end",justifyContent:"center",gap:2}}>
                  <div style={nyStyleObj()}><BitmojiAvatar id={newId} size={100} evolved/></div>
                  <div style={{marginBottom:18,transformOrigin:"50% 90%",animation:nyPhase==="lunge"?"swordSwingNew 0.5s ease":"swordIdle 2.5s ease-in-out infinite"}}>
                    <Sword size={36} color="#fbbf24"/>
                  </div>
                </div>
              </div>
              <div style={{flex:"0 0 144px",textAlign:"center",paddingBottom:16}}>
                <div style={{fontSize:12,fontWeight:800,marginBottom:6,color:dead?"#86efac":bossHP>60?"#fca5a5":bossHP>30?"#fde68a":"#86efac"}}>{dead?"DEFEATED 💀":bossHP+"/100 HP"}</div>
                <div style={{background:"rgba(255,255,255,0.07)",borderRadius:999,height:14,overflow:"hidden",border:"1px solid rgba(255,255,255,0.08)",marginBottom:8}}>
                  <div style={{width:`${bossHP}%`,height:"100%",borderRadius:999,background:bossHP>60?"linear-gradient(90deg,#7f1d1d,#ef4444)":bossHP>30?"linear-gradient(90deg,#b45309,#fbbf24)":"linear-gradient(90deg,#065f46,#34d399)",transition:"width 0.75s cubic-bezier(.4,0,.2,1),background 0.5s",boxShadow:"0 0 10px rgba(239,68,68,0.5)"}}/>
                </div>
                <div style={{display:"flex",gap:4,justifyContent:"center",marginBottom:6,flexWrap:"wrap"}}>
                  {ROUNDS.map((_,i)=><div key={i} style={{width:14,height:4,borderRadius:2,background:i<bossRound?"#34d399":i===bossRound&&!dead?"#fbbf24":"rgba(255,255,255,0.1)",transition:"background 0.3s"}}/>)}
                </div>
                <div style={{fontSize:18,color:"rgba(255,255,255,0.13)"}}>⚔️</div>
              </div>
              <div style={{textAlign:"center",flex:1}}>
                <div style={{fontSize:10,color:"#fca5a5",fontWeight:800,letterSpacing:1,marginBottom:8}}>OLD YOU</div>
                <div style={{display:"flex",alignItems:"flex-end",justifyContent:"center",gap:2}}>
                  <div style={{marginBottom:18,transform:"scaleX(-1)",transformOrigin:"50% 90%",animation:bossPhase==="hit"&&roundState==="excuse"?"swordSwingOld 0.5s ease":"swordIdle 2.8s ease-in-out infinite 0.4s"}}>
                    <Sword size={36} color="#ef4444"/>
                  </div>
                  <div style={bossStyleObj()}><BitmojiAvatar id={oldId} size={100} shadow={bossPhase!=="dead"} dead={bossPhase==="dead"}/></div>
                </div>
              </div>
            </div>
            <div style={{height:2,background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.07),transparent)",borderRadius:1,marginTop:2}}/>
          </div>
          {roundState==="choosing"&&!dead&&(
            <Glass style={{marginBottom:14,animation:"slideUp 0.38s ease both"}}>
              <p style={{color:"#c4b5fd",fontWeight:700,fontSize:13,marginBottom:14,textAlign:"center"}}>⚔️ Round {bossRound+1} — Pick your move:</p>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
                {cards.map((c,i)=>(
                  <button key={i} onClick={()=>handleBossChoice(c.isHabit)} style={{padding:"15px 8px",borderRadius:16,cursor:"pointer",textAlign:"center",border:`2px solid ${c.isHabit?"rgba(251,191,36,0.38)":"rgba(239,68,68,0.22)"}`,background:c.isHabit?"rgba(251,191,36,0.09)":"rgba(239,68,68,0.06)",color:c.isHabit?"#fde68a":"#fca5a5",fontSize:12,fontWeight:700,transition:"all 0.18s",animation:`fadeUp 0.4s ease ${i*0.07}s both`}}>
                    <div style={{fontSize:22,marginBottom:8}}>{c.icon}</div>{c.text}
                  </button>
                ))}
              </div>
              <p style={{color:"#4b3f6a",fontSize:11,textAlign:"center",marginTop:10}}>One real habit. Two excuses. Choose wisely. 👀</p>
            </Glass>
          )}
          {roundState==="excuse"&&(
            <Glass shadow style={{marginBottom:14,textAlign:"center",animation:"popIn 0.4s ease both"}}>
              <div style={{fontSize:36,marginBottom:8}}>😭</div>
              <p style={{color:"#fca5a5",fontWeight:800,fontSize:15,marginBottom:6}}>{excuseMsg}</p>
              <p style={{color:"#7f3030",fontSize:12,marginBottom:16}}>The Old You is still standing. Pick again.</p>
              <Btn variant="red" onClick={()=>shuffleCards(bossRound)}>Try Again 💪</Btn>
            </Glass>
          )}
          {roundState==="correct"&&!dead&&showNext&&(
            <Glass glow style={{marginBottom:14,textAlign:"center",animation:"popIn 0.4s ease both"}}>
              <div style={{fontSize:32,marginBottom:8}}>✨</div>
              <p style={{color:"#86efac",fontWeight:800,fontSize:15,marginBottom:4}}>Direct hit! The Old You staggers!</p>
              <p style={{color:"#9d8fc4",fontSize:12,marginBottom:16}}>{bossRound===0?"Still plenty in them. Keep pushing!":bossRound===1?"Halfway there. Don't slow down now!":bossRound===2?"Three rounds down. They're crumbling!":"One final blow. Finish it!"}</p>
              <Btn variant="amber" onClick={goNextRound}>Next Round →</Btn>
            </Glass>
          )}
          {isFinalVictory&&showNext&&(
            <Glass glow style={{textAlign:"center",animation:"popIn 0.5s ease both"}}>
              <div style={{fontSize:40,marginBottom:8}}>🎉</div>
              <p style={{color:"#fde68a",fontWeight:800,fontSize:18,marginBottom:4}}>The Old You has fallen!</p>
              <p style={{color:"#9d8fc4",fontSize:13,marginBottom:18}}>You faced yourself. You actually won. 🌟</p>
              <Btn full variant="amber" onClick={()=>go("oath")}>Write Your Oath →</Btn>
            </Glass>
          )}
        </div>
      </Wrap>
    );
  }

  if(screen==="oath"){
    const oathReady=oath.trim().length>=20;
    return(
      <Wrap bg={BG.boss} animKey={animKey}>
        <style>{G}</style><ProgressTrail current={screen}/>
        <div style={{maxWidth:500,width:"100%",textAlign:"center"}}>
          <ChapterBadge n="10" label="FINAL OATH"/>
          <div className="floatY glowPulse" style={{fontSize:56,marginBottom:12}}>🗡️</div>
          <h2 style={{fontFamily:"'Cinzel Decorative',serif",color:"#fde68a",fontSize:22,marginBottom:8}}>Swear Your Oath</h2>
          <p style={{color:"#9d8fc4",fontSize:13,lineHeight:1.8,marginBottom:24}}>Words become commitments. Commitments become identity.<br/><span style={{color:"#fbbf24",fontWeight:700}}>Write the promise you'll actually keep.</span></p>
          <Glass glow style={{marginBottom:16}}>
            <div style={{display:"flex",gap:8,marginBottom:14,flexWrap:"wrap",justifyContent:"center"}}>
              {OATH_PROMPTS.map((p,i)=>(
                <button key={i} onClick={()=>{setOathPrompt(i);setOath(p+" ");}} style={{padding:"6px 12px",borderRadius:10,fontSize:11,fontWeight:700,cursor:"pointer",border:`1px solid ${oathPrompt===i?"#fbbf24":"rgba(255,255,255,0.12)"}`,background:oathPrompt===i?"rgba(251,191,36,0.12)":"rgba(255,255,255,0.04)",color:oathPrompt===i?"#fde68a":"#7e6ea8",transition:"all 0.2s"}}>Prompt {i+1}</button>
              ))}
            </div>
            <textarea value={oath} onChange={e=>setOath(e.target.value)} placeholder="Write your oath here… (at least 20 characters)" rows={5}
              style={{width:"100%",padding:"14px",borderRadius:14,border:"1px solid rgba(251,191,36,0.3)",background:"rgba(251,191,36,0.06)",color:"#fde68a",fontSize:14,outline:"none",resize:"none",lineHeight:1.7,fontWeight:600}}/>
            <div style={{textAlign:"right",fontSize:10,color:oathReady?"#fbbf24":"#4b3f6a",marginTop:6,fontWeight:700}}>{oath.trim().length} chars {oathReady?"✓":"(min 20)"}</div>
          </Glass>
          {oathReady&&(
            <Glass glow style={{marginBottom:16,animation:"popIn 0.4s ease both"}}>
              <div style={{fontSize:14,color:"#fde68a",fontWeight:700,fontStyle:"italic",lineHeight:1.7,padding:"6px 0",background:"linear-gradient(90deg,#fbbf24,#f59e0b,#fbbf24,#fde68a,#fbbf24)",backgroundSize:"300% auto",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",animation:"oathShine 3s linear infinite"}}>"{oath.trim()}"</div>
              <div style={{marginTop:10,fontSize:11,color:"#9d8fc4"}}>— {name}, {new Date().toLocaleDateString()}</div>
            </Glass>
          )}
          <Btn full variant="amber" disabled={!oathReady} onClick={()=>{addXP(50);go("victory");}}>Seal the Oath & Claim Victory →</Btn>
        </div>
      </Wrap>
    );
  }

  if(screen==="victory"){
    const newId=evolvedAv?.eid||"f1e",oldId=avatar?.id||"f1";
    const myPowers=selPowers.map(pid=>POWERS.find(p=>p.id===pid)).filter(Boolean);
    const positiveTraits=mindsetPicks.filter(p=>!p.neg);
    return(
      <Wrap bg={BG.boss} animKey={animKey}>
        <style>{G}</style><ProgressTrail current={screen}/>
        <div style={{maxWidth:480,width:"100%",textAlign:"center"}}>
          <div style={{fontSize:13,letterSpacing:3,color:"#fbbf24",fontWeight:800,marginBottom:10}} className="glowText">✦ LEVEL UP ✦</div>
          <h2 style={{fontFamily:"'Cinzel Decorative',serif",fontSize:24,color:"#fde68a",marginBottom:4}}>Evolution Complete</h2>
          <p style={{color:"#92620a",marginBottom:20,fontSize:13}}>You've entered your Glow Era. For real this time.</p>
          <div style={{marginBottom:20,animation:"popIn 0.5s ease both"}}>
            <div style={{display:"inline-flex",alignItems:"center",gap:10,background:"linear-gradient(135deg,rgba(251,191,36,0.15),rgba(167,139,250,0.15))",border:"1px solid rgba(251,191,36,0.3)",borderRadius:20,padding:"12px 24px"}}>
              <span style={{fontSize:28}}>⚡</span>
              <div><div style={{fontSize:22,fontWeight:900,color:"#fbbf24",fontFamily:"'Cinzel Decorative',serif"}}>{totalXP} XP</div><div style={{fontSize:11,color:"#9d8fc4"}}>Total Journey XP</div></div>
            </div>
          </div>
          <div style={{display:"flex",justifyContent:"center",alignItems:"flex-end",gap:28,marginBottom:24}}>
            <div style={{textAlign:"center",animation:"fadeOut 1.4s ease both"}}><BitmojiAvatar id={oldId} size={70} dead/><p style={{fontSize:9,color:"#3a3050",fontWeight:700,marginTop:4}}>Old You</p></div>
            <div style={{color:"#fbbf24",fontSize:20,paddingBottom:20}}>✦</div>
            <div style={{textAlign:"center"}}><div className="glowPulse floatY"><BitmojiAvatar id={newId} size={100} evolved/></div><p style={{fontSize:10,color:"#fde68a",fontWeight:800,marginTop:6}}>New You ✨</p></div>
          </div>
          <Glass glow style={{marginBottom:16,position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",inset:0,background:"radial-gradient(circle at 50% 0%,rgba(251,191,36,0.14),transparent 65%)",pointerEvents:"none"}}/>
            <div style={{fontSize:9,letterSpacing:2,color:"#6d28d9",fontWeight:800,marginBottom:4}}>CHARACTER CARD</div>
            <h3 style={{fontFamily:"'Cinzel Decorative',serif",color:"#fde68a",fontSize:20,marginBottom:3}}>{name}</h3>
            <div style={{display:"inline-block",background:"rgba(251,191,36,0.14)",border:"1px solid rgba(251,191,36,0.3)",borderRadius:999,padding:"3px 14px",color:"#fbbf24",fontSize:11,fontWeight:800,marginBottom:18}}>{cls}</div>
            {myPowers.length>0&&(<>
              <p style={{color:"#5a4f7a",fontSize:9,letterSpacing:2,fontWeight:700,marginBottom:10}}>POWERS UNLOCKED</p>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:16}}>
                {myPowers.map((pw,i)=><div key={i} style={{padding:"10px 6px",background:`${pw.color}12`,border:`1px solid ${pw.color}33`,borderRadius:12}}><div style={{fontSize:20,marginBottom:3}}>{pw.icon}</div><div style={{color:pw.color,fontSize:9,fontWeight:700,lineHeight:1.4}}>{pw.name}</div></div>)}
              </div>
            </>)}
            {positiveTraits.length>0&&(<>
              <p style={{color:"#5a4f7a",fontSize:9,letterSpacing:2,fontWeight:700,marginBottom:10}}>MINDSET STRENGTHS</p>
              <div style={{display:"flex",gap:6,flexWrap:"wrap",justifyContent:"center",marginBottom:16}}>
                {positiveTraits.map((t,i)=><span key={i} style={{background:`${t.color}18`,border:`1px solid ${t.color}44`,borderRadius:999,padding:"3px 10px",fontSize:10,color:t.color,fontWeight:700}}>{t.trait}</span>)}
              </div>
            </>)}
            <p style={{color:"#5a4f7a",fontSize:9,letterSpacing:2,fontWeight:700,marginBottom:10}}>HABITS MASTERED</p>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:16}}>
              {ROUNDS.map((r,i)=><div key={i} style={{padding:"11px 6px",background:"rgba(251,191,36,0.08)",border:"1px solid rgba(251,191,36,0.2)",borderRadius:12}}><div style={{fontSize:20,marginBottom:3}}>{r.habit.icon}</div><div style={{color:"#fde68a",fontSize:9,fontWeight:700,lineHeight:1.4}}>{r.habit.desc}</div></div>)}
            </div>
            {oath&&(<>
              <p style={{color:"#5a4f7a",fontSize:9,letterSpacing:2,fontWeight:700,marginBottom:8}}>YOUR OATH</p>
              <div style={{background:"rgba(251,191,36,0.08)",border:"1px solid rgba(251,191,36,0.2)",borderRadius:12,padding:"10px 14px",marginBottom:16,fontSize:11,color:"#fde68a",fontStyle:"italic",lineHeight:1.6}}>"{oath.trim()}"</div>
            </>)}
            <div style={{background:"linear-gradient(135deg,rgba(251,191,36,0.12),rgba(167,139,250,0.12))",border:"1px solid rgba(251,191,36,0.22)",borderRadius:14,padding:"12px 16px"}}>
              <p style={{color:"#fde68a",fontWeight:800,fontSize:14}}>⚡ Level 1 of your Glow Era</p>
              <p style={{color:"#9d8fc4",fontSize:11,marginTop:3}}>The journey continues, {name}.</p>
            </div>
          </Glass>
          <Btn full variant="ghost" onClick={resetAll}>↺ Restart Journey</Btn>
        </div>
      </Wrap>
    );
  }

  return <div style={{color:"white",padding:40,textAlign:"center"}}>Loading… ({screen})</div>;
}
