// ── TYPING ANIMATION ──
const words = ["Future Engineer","CSE Student","Project maker","Operating system maintain"];
let i=0,j=0,isDeleting=false;
function type(){
    const current=words[i];
    document.getElementById("typing").textContent=current.substring(0,j);
    if(!isDeleting){
        j++;
        if(j>current.length){isDeleting=true;setTimeout(type,1200);return;}
    } else {
        j--;
        if(j===0){isDeleting=false;i=(i+1)%words.length;}
    }
    setTimeout(type,isDeleting?50:110);
}
type();

// ── YEAR ──
const yearEl=document.getElementById("year");
if(yearEl) yearEl.textContent=new Date().getFullYear();

// ── MOUSE GLOW ──
const glow=document.getElementById("mouseGlow");
document.addEventListener("mousemove",e=>{
    glow.style.left=e.clientX+"px";
    glow.style.top=e.clientY+"px";
});

// ── SCROLL INDICATOR ──
const scrollBar=document.getElementById("scrollIndicator");
window.addEventListener("scroll",()=>{
    const scrolled=(window.scrollY/(document.body.scrollHeight-window.innerHeight))*100;
    scrollBar.style.width=scrolled+"%";
    const nav=document.getElementById("navbar");
    if(window.scrollY>60) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
});

// ── SCROLL REVEAL ──
const reveals=document.querySelectorAll(".glass-card,.section-header");
reveals.forEach(el=>el.classList.add("reveal"));
const observer=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting) e.target.classList.add("visible");});
},{threshold:0.12});
reveals.forEach(el=>observer.observe(el));

// ── PARTICLE SYSTEM ──
const canvas=document.getElementById("particleCanvas");
const ctx=canvas.getContext("2d");
let particles=[];
let W,H;

function resize(){
    W=canvas.width=window.innerWidth;
    H=canvas.height=window.innerHeight;
}
resize();
window.addEventListener("resize",resize);

class Particle{
    constructor(){this.reset();}
    reset(){
        this.x=Math.random()*W;
        this.y=Math.random()*H;
        this.size=Math.random()*1.8+0.4;
        this.speedX=(Math.random()-0.5)*0.4;
        this.speedY=(Math.random()-0.5)*0.4;
        this.opacity=Math.random()*0.5+0.1;
        this.color=Math.random()>0.5?"rgba(0,224,255,":"rgba(0,89,255,";
    }
    update(){
        this.x+=this.speedX;
        this.y+=this.speedY;
        if(this.x<0||this.x>W||this.y<0||this.y>H) this.reset();
    }
    draw(){
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
        ctx.fillStyle=this.color+this.opacity+")";
        ctx.fill();
    }
}

function initParticles(){
    particles=[];
    const count=Math.floor(W*H/8000);
    for(let k=0;k<count;k++) particles.push(new Particle());
}
initParticles();
window.addEventListener("resize",initParticles);

// Draw connecting lines between nearby particles
function connectParticles(){
    for(let a=0;a<particles.length;a++){
        for(let b=a+1;b<particles.length;b++){
            const dx=particles[a].x-particles[b].x;
            const dy=particles[a].y-particles[b].y;
            const dist=Math.sqrt(dx*dx+dy*dy);
            if(dist<120){
                ctx.beginPath();
                ctx.moveTo(particles[a].x,particles[a].y);
                ctx.lineTo(particles[b].x,particles[b].y);
                ctx.strokeStyle="rgba(0,224,255,"+(0.08*(1-dist/120))+")";
                ctx.lineWidth=0.5;
                ctx.stroke();
            }
        }
    }
}

function animate(){
    ctx.clearRect(0,0,W,H);
    particles.forEach(p=>{p.update();p.draw();});
    connectParticles();
    requestAnimationFrame(animate);
}
animate();

// ── HAMBURGER MENU ──
const ham=document.getElementById("hamburger");
const navUl=document.querySelector("nav ul");
if(ham){
    ham.addEventListener("click",()=>{
        navUl.style.display=navUl.style.display==="flex"?"none":"flex";
        navUl.style.flexDirection="column";
        navUl.style.position="absolute";
        navUl.style.top="70px";
        navUl.style.right="6%";
        navUl.style.background="rgba(9,9,9,0.97)";
        navUl.style.padding="20px 30px";
        navUl.style.borderRadius="12px";
        navUl.style.border="1px solid rgba(0,224,255,0.15)";
        navUl.style.backdropFilter="blur(20px)";
    });
  
    document.querySelectorAll("nav a").forEach(a=>{
        a.addEventListener("click",()=>{
            if(window.innerWidth<=900) navUl.style.display="none";
        });
    });
}
