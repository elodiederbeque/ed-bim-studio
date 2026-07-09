/*==================================================
 ED BIM STUDIO V6 PREMIUM
==================================================*/

"use strict";

/*==================================================
 ELEMENTS
==================================================*/

const header = document.querySelector(".header");

const cursorGlow = document.getElementById("cursorGlow");

const backToTop = document.getElementById("backToTop");

const heroVisual = document.querySelector(".heroVisual");

const heroContent = document.querySelector(".heroContent");

const meshes = document.querySelectorAll(".mesh");

const floatingCards = document.querySelectorAll(".floatingCard");

const sections = document.querySelectorAll("section");

const menuLinks = document.querySelectorAll(".menu a");

const ENABLE_HEAVY_MOTION = false;

document.body.classList.add("performanceMode");

let scrollYPos = 0;

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

function isCompactViewport(){

    return window.innerWidth < 900;

}


/*==================================================
 CURSOR GLOW
==================================================*/

if(ENABLE_HEAVY_MOTION && cursorGlow){

    document.addEventListener("mousemove",(e)=>{

        mouseX=e.clientX;

        mouseY=e.clientY;

    });

    function updateCursor(){

        cursorGlow.style.transform=
            `translate(${mouseX}px,${mouseY}px) translate(-50%,-50%)`;

        requestAnimationFrame(updateCursor);

    }

    updateCursor();

}

else if(cursorGlow){

    cursorGlow.remove();

}


/*==================================================
 HIDE CURSOR GLOW MOBILE
==================================================*/

function checkGlow(){

    if(window.innerWidth<900){

        document.body.classList.add("hideGlow");

    }

    else{

        document.body.classList.remove("hideGlow");

    }

}

checkGlow();

window.addEventListener("resize",checkGlow);


/*==================================================
 HEADER
==================================================*/

function updateHeader(){

    scrollYPos=window.scrollY;

    if(scrollYPos>40){

        header.classList.add("scrolled");

    }

    else{

        header.classList.remove("scrolled");

    }

}

updateHeader();


/*==================================================
 BACK TO TOP
==================================================*/

function updateBackButton(){

    if(scrollYPos>700){

        backToTop.classList.add("show");

    }

    else{

        backToTop.classList.remove("show");

    }

}

updateBackButton();

backToTop.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});


/*==================================================
 HERO PARALLAX
==================================================*/

function heroParallax(){

    if(heroVisual) heroVisual.style.transform="";
    if(heroContent) heroContent.style.transform="";

    meshes.forEach((mesh,index)=>{

        mesh.style.transform="";

    });

}

heroParallax();


/*==================================================
 FLOATING CARDS
==================================================*/

if(ENABLE_HEAVY_MOTION){

floatingCards.forEach((card,index)=>{

    card.addEventListener("mouseenter",()=>{

        card.style.transform=

            "translateY(-12px) scale(1.04)";

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform="";

    });

});

}


/*==================================================
 RAF LOOP
==================================================*/

let ticking=false;

function onScroll(){

    if(!ticking){

        requestAnimationFrame(()=>{

            updateHeader();

            updateBackButton();

            heroParallax();

            ticking=false;

        });

        ticking=true;

    }

}

window.addEventListener("scroll",onScroll,{passive:true});
/*==================================================
 SCROLL REVEAL
==================================================*/

const revealElements = document.querySelectorAll(

    ".reveal, .revealLeft, .revealRight, .revealScale"

);

const revealObserver = new IntersectionObserver(

(entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},

{

    threshold:.18

});

revealElements.forEach(element=>{

    revealObserver.observe(element);

});


/*==================================================
 STAGGER ANIMATION
==================================================*/

const staggerGroups=document.querySelectorAll(

    ".problemList div,.chip,.timelineItem,.workflowItem,.finderCard,.stat"

);

const staggerObserver=new IntersectionObserver(

(entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},

{

    threshold:.12

});

staggerGroups.forEach(item=>{

    staggerObserver.observe(item);

});


/*==================================================
 ACTIVE MENU
==================================================*/

const sectionObserver=new IntersectionObserver(

(entries)=>{

    entries.forEach(entry=>{

        if(!entry.isIntersecting) return;

        const id=entry.target.getAttribute("id");

        menuLinks.forEach(link=>{

            link.classList.remove("active");

            if(link.getAttribute("href")==="#"+id){

                link.classList.add("active");

            }

        });

    });

},

{

    threshold:.55

});

sections.forEach(section=>{

    if(section.id){

        sectionObserver.observe(section);

    }

});


/*==================================================
 STATS FADE
==================================================*/

const stats=document.querySelectorAll(".stat");

stats.forEach(stat=>{

    stat.style.opacity=0;

    stat.style.transform="translateY(40px)";

});

const statObserver=new IntersectionObserver(

(entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.style.transition=

            "all .8s cubic-bezier(.22,.61,.36,1)";

            entry.target.style.opacity=1;

            entry.target.style.transform="translateY(0)";

        }

    });

},

{

    threshold:.2

});

stats.forEach(stat=>{

    statObserver.observe(stat);

});


/*==================================================
 WORKFLOW ANIMATION
==================================================*/

const workflowIcons=document.querySelectorAll(".workflowIcon");

workflowIcons.forEach(icon=>{

    icon.addEventListener("mouseenter",()=>{

        icon.style.transform=

        "translateY(-8px) rotate(-5deg) scale(1.05)";

    });

    icon.addEventListener("mouseleave",()=>{

        icon.style.transform="";

    });

});


/*==================================================
 CHIP HOVER
==================================================*/

document.querySelectorAll(".chip").forEach(chip=>{

    chip.addEventListener("mouseenter",()=>{

        chip.style.transform="translateY(-6px)";

    });

    chip.addEventListener("mouseleave",()=>{

        chip.style.transform="";

    });

});


/*==================================================
 FINDER CARD EFFECT
==================================================*/

document.querySelectorAll(".finderCard").forEach(card=>{

    card.addEventListener("mousemove",(e)=>{

        const rect=card.getBoundingClientRect();

        const x=e.clientX-rect.left;

        const y=e.clientY-rect.top;

        card.style.transform=

        `perspective(900px)
         rotateY(${(x-rect.width/2)/30}deg)
         rotateX(${-(y-rect.height/2)/30}deg)
         translateY(-8px)`;

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform="";

    });

});


/*==================================================
 IMAGE PARALLAX
==================================================*/

const pluginImage=document.querySelector(".pluginPreview img");

window.addEventListener("mousemove",(e)=>{

    if(!pluginImage) return;

    const x=(e.clientX-window.innerWidth/2)/90;

    const y=(e.clientY-window.innerHeight/2)/90;

    pluginImage.style.transform=

    `translate(${x}px,${y}px)`;

});
/*==================================================
 PREMIUM MOTION ENGINE
==================================================*/

const hero = document.querySelector(".hero");
const halo = document.querySelector(".heroHalo");

let targetX = 0;
let targetY = 0;

let currentX = 0;
let currentY = 0;


/*==================================================
 MOUSE TRACKING
==================================================*/

if(ENABLE_HEAVY_MOTION){

    window.addEventListener("mousemove",(e)=>{

        if(isCompactViewport()){

            targetX=0;
            targetY=0;

            return;

        }

        targetX = (e.clientX / window.innerWidth - .5) * 30;
        targetY = (e.clientY / window.innerHeight - .5) * 30;

    });

}


/*==================================================
 HERO PARALLAX RAF
==================================================*/

function animateHero(){

    if(!ENABLE_HEAVY_MOTION || isCompactViewport()){

        currentX=0;
        currentY=0;

        if(heroVisual) heroVisual.style.transform="";
        if(heroContent) heroContent.style.transform="";
        if(halo) halo.style.transform="translateY(-50%)";

        return;

    }

    currentX += (targetX-currentX)*0.08;
    currentY += (targetY-currentY)*0.08;

    if(heroVisual){

        heroVisual.style.transform=

        `translate3d(${currentX}px,${currentY}px,0)`;

    }

    if(heroContent){

        heroContent.style.transform=

        `translate3d(${-currentX*.15}px,${-currentY*.15}px,0)`;

    }

    if(halo){

        halo.style.transform=

        `translate3d(${currentX*.4}px,
                     calc(-50% + ${currentY*.4}px),
                     0)`;

    }

    requestAnimationFrame(animateHero);

}

animateHero();


/*==================================================
 MESH ANIMATION
==================================================*/

meshes.forEach((mesh,index)=>{

    mesh.style.animationDuration=
        `${18+index*6}s`;

});


/*==================================================
 MAGNET BUTTON
==================================================*/

document.querySelectorAll(

".primaryButton,.secondaryButton,.navButton"

).forEach(button=>{

    button.addEventListener("mousemove",(e)=>{

        const rect=button.getBoundingClientRect();

        const x=e.clientX-rect.left-rect.width/2;
        const y=e.clientY-rect.top-rect.height/2;

        button.style.transform=

        `translate(${x*.18}px,${y*.18}px)`;

    });

    button.addEventListener("mouseleave",()=>{

        button.style.transform="";

    });

});


/*==================================================
 FLOATING CARDS
==================================================*/

if(ENABLE_HEAVY_MOTION){

floatingCards.forEach((card,index)=>{

    let angle=index*20;

    function animate(){

        angle+=0.02;

        card.style.translate=

            `${Math.sin(angle)*6}px ${Math.cos(angle)*5}px`;

        requestAnimationFrame(animate);

    }

    animate();

});

}


/*==================================================
 HERO TILT
==================================================*/

if(hero){

hero.addEventListener("mousemove",(e)=>{

    if(isCompactViewport()) return;

    const x=e.clientX/window.innerWidth-.5;

    const y=e.clientY/window.innerHeight-.5;

    hero.style.transform=

    `perspective(1600px)
     rotateX(${y*-1.2}deg)
     rotateY(${x*1.2}deg)`;

});

hero.addEventListener("mouseleave",()=>{

    hero.style.transform="";

});

}


/*==================================================
 WINDOW RESIZE
==================================================*/

window.addEventListener("resize",()=>{

    targetX=0;
    targetY=0;

});


/*==================================================
 PERFORMANCE
==================================================*/

let lastScroll=0;

window.addEventListener("scroll",()=>{

    lastScroll=window.scrollY;

},{passive:true});


/*==================================================
 FPS FRIENDLY LOOP
==================================================*/

function render(){

    // réservé aux futures animations


}



/*==================================================
 END PART 3
==================================================*/
/*==================================================
 NAVBAR AUTO HIDE
==================================================*/

let previousScroll = 0;

if(ENABLE_HEAVY_MOTION){

window.addEventListener("scroll",()=>{

    const current = window.scrollY;

    if(current > previousScroll && current > 180){

        header.style.transform =
            "translateY(-120%)";

    }else{

        header.style.transform =
            "translateY(0)";

    }

    previousScroll = current;

},{passive:true});

}


/*==================================================
 STATS (affichage direct, sans compteur)
==================================================*/

/* Les valeurs (20+, 1, 100%, Revit API) restent statiques :
   aucune animation de comptage, affichage immédiat. */


/*==================================================
 TECHNOLOGY CHIPS
==================================================*/

document.querySelectorAll(".chip").forEach((chip,index)=>{

    chip.style.animationDelay =
        `${index*80}ms`;

});


/*==================================================
 WORKFLOW APPEAR
==================================================*/

const workflowItems =
document.querySelectorAll(".workflowItem");

const workflowObserver =
new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.animate([

                {

                    opacity:0,

                    transform:"translateY(60px)"

                },

                {

                    opacity:1,

                    transform:"translateY(0)"

                }

            ],{

                duration:800,

                fill:"forwards",

                easing:"cubic-bezier(.22,.61,.36,1)"

            });

        }

    });

},{threshold:.25});

workflowItems.forEach(item=>{

    workflowObserver.observe(item);

});


/*==================================================
 FINDER GLOW
==================================================*/

document.querySelectorAll(".finderCard").forEach(card=>{

    card.addEventListener("mouseenter",()=>{

        card.style.boxShadow =

        "0 60px 120px rgba(6,150,215,.20)";

    });

    card.addEventListener("mouseleave",()=>{

        card.style.boxShadow = "";

    });

});


/*==================================================
 TIMELINE EFFECT
==================================================*/

document.querySelectorAll(".timelineItem")

.forEach(item=>{

    item.addEventListener("mouseenter",()=>{

        item.style.transform =

        "translateY(-10px)";

    });

    item.addEventListener("mouseleave",()=>{

        item.style.transform = "";

    });

});


/*==================================================
 BUTTON RIPPLE
==================================================*/

document.querySelectorAll(

".primaryButton,.secondaryButton"

).forEach(button=>{

    button.addEventListener("click",(e)=>{

        const ripple = document.createElement("span");

        ripple.style.position="absolute";

        ripple.style.width="20px";

        ripple.style.height="20px";

        ripple.style.borderRadius="50%";

        ripple.style.background="rgba(255,255,255,.45)";

        ripple.style.pointerEvents="none";

        ripple.style.left=

            e.offsetX+"px";

        ripple.style.top=

            e.offsetY+"px";

        ripple.animate([

            {

                transform:"scale(0)",

                opacity:1

            },

            {

                transform:"scale(18)",

                opacity:0

            }

        ],{

            duration:650,

            easing:"ease-out"

        });

        button.appendChild(ripple);

        setTimeout(()=>{

            ripple.remove();

        },650);

    });

});


/*==================================================
 IMAGE PRELOAD
==================================================*/

["Actifs/Photo.png",

 "Actifs/plugin.png",

 "Actifs/logo-cv.png"]

.forEach(src=>{

    const img = new Image();

    img.src = src;

});


/*==================================================
 END PART 4
==================================================*/
/*==================================================
 LOADER
==================================================*/

window.addEventListener("load",()=>{

    document.body.classList.remove("loading");

    const loader=document.querySelector(".loader");

    if(loader){

        loader.classList.add("hide");

        setTimeout(()=>{

            loader.remove();

        },800);

    }

});


/*==================================================
 SMOOTH ANCHORS
==================================================*/

document.querySelectorAll('a[href^="#"]')

.forEach(anchor=>{

    anchor.addEventListener("click",(e)=>{

        const target=document.querySelector(

            anchor.getAttribute("href")

        );

        if(!target) return;

        e.preventDefault();

        target.scrollIntoView({

            behavior:"smooth",

            block:"start"

        });

    });

});


/*==================================================
 PLUGIN PREVIEW TABS
==================================================*/

const sidebarTabs = document.querySelectorAll(".windowSidebar li[data-tab]");

const tabContents = document.querySelectorAll(".tabContent");

sidebarTabs.forEach(tab=>{

    tab.addEventListener("click",()=>{

        const target = tab.getAttribute("data-tab");

        sidebarTabs.forEach(t=>t.classList.remove("active"));

        tab.classList.add("active");

        tabContents.forEach(content=>{

            content.classList.toggle(
                "active",
                content.getAttribute("data-tab")===target
            );

        });

    });

});

menuLinks.forEach(link=>{

    link.addEventListener("click",()=>{

        document.body.classList.remove("menu-open");

    });

});


/*==================================================
 HAMBURGER MENU TOGGLE
==================================================*/

const menuToggle=document.getElementById("menuToggle");

const mobileMenu=document.getElementById("mobileMenu");

if(menuToggle && mobileMenu){

    menuToggle.addEventListener("click",()=>{

        const isOpen=document.body.classList.toggle("menu-open");

        menuToggle.setAttribute("aria-expanded",isOpen);

    });

    mobileMenu.querySelectorAll("a").forEach(link=>{

        link.addEventListener("click",()=>{

            document.body.classList.remove("menu-open");

            menuToggle.setAttribute("aria-expanded","false");

        });

    });

}


/*==================================================
 DARK MODE TOGGLE
==================================================*/

const darkToggle=document.getElementById("darkToggle");

function applyDarkPreference(){

    const saved=localStorage.getItem("edbim-theme");

    if(saved==="dark"){

        document.body.classList.add("dark");

    }

}

applyDarkPreference();

if(darkToggle){

    darkToggle.addEventListener("click",()=>{

        const isDark=document.body.classList.toggle("dark");

        localStorage.setItem("edbim-theme",isDark?"dark":"light");

        darkToggle.querySelector(".darkIcon").textContent=isDark?"☀️":"🌙";

    });

    if(document.body.classList.contains("dark")){

        darkToggle.querySelector(".darkIcon").textContent="☀️";

    }

}


/*==================================================
 HERO IMAGE
==================================================*/

const portrait=document.querySelector(".portrait img");

if(portrait){

portrait.addEventListener("mousemove",(e)=>{

    const rect=portrait.getBoundingClientRect();

    const x=(e.clientX-rect.left)/rect.width-.5;

    const y=(e.clientY-rect.top)/rect.height-.5;

    portrait.style.transform=

        `rotateY(${x*8}deg)
         rotateX(${-y*8}deg)
         scale(1.03)`;

});

portrait.addEventListener("mouseleave",()=>{

    portrait.style.transform="";

});

}


/*==================================================
 FINDER BUTTONS
==================================================*/

document.querySelectorAll(".finderButton")

.forEach(button=>{

    button.addEventListener("mouseenter",()=>{

        button.style.transform=

            "translateY(-4px) scale(1.03)";

    });

    button.addEventListener("mouseleave",()=>{

        button.style.transform="";

    });

});


/*==================================================
 KEYBOARD
==================================================*/

window.addEventListener("keydown",(e)=>{

    if(e.key==="Home"){

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    }

});


/*==================================================
 VISIBILITY
==================================================*/

document.addEventListener("visibilitychange",()=>{

    if(document.hidden){

        document.body.classList.add("paused");

    }else{

        document.body.classList.remove("paused");

    }

});


/*==================================================
 RESIZE
==================================================*/

let resizeTimer;

window.addEventListener("resize",()=>{

    clearTimeout(resizeTimer);

    resizeTimer=setTimeout(()=>{

        heroParallax();

        updateHeader();

    },120);

});


/*==================================================
 CONSOLE
==================================================*/

console.clear();

console.log("%cED BIM STUDIO V6 PREMIUM",

"color:#0696D7;font-size:20px;font-weight:bold;");

console.log("%cBIM Coordinator • Revit API • C#",

"color:#64748b;font-size:13px;");


/*==================================================
 READY
==================================================*/

document.documentElement.classList.add("ready");

console.log("Application ready.");


/*==================================================
 END
==================================================*/
