/* ============================================================
   CINEMATIC.JS � GSAP + ScrollTrigger Engine
   Explore Ithihaas 3D Temple Experience
   ============================================================ */

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// 1. CINEMATIC HERO � ENTRANCE SEQUENCE
// ============================================================
const heroTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });

// 1a. Hero image slowly scales in (camera flying in)
heroTimeline.to("#heroImg", {
    scale: 1.0,
    duration: 3.5,
    ease: "power2.out"
}, 0);

// 1b. Fade in tag, title lines, subtitle, CTA in sequence
heroTimeline
    .to("#heroTag", { opacity: 1, y: 0, duration: 1 }, 0.8)
    .to(".line1", { opacity: 1, y: 0, duration: 1.2 }, 1.2)
    .to(".line2", { opacity: 1, y: 0, duration: 1.2 }, 1.6)
    .to("#heroSub", { opacity: 1, y: 0, duration: 1 }, 2.0)
    .to("#heroCta", { opacity: 1, y: 0, duration: 1 }, 2.4);

// ============================================================
// 2. HERO PARALLAX DEPTH ON SCROLL
// ============================================================
gsap.to("#heroImg", {
    yPercent: 25,
    ease: "none",
    scrollTrigger: {
        trigger: ".cin-hero",
        start: "top top",
        end: "bottom top",
        scrub: true
    }
});

// ============================================================
// 3. DESTINATION PANELS � PARALLAX IMAGES
// ============================================================
document.querySelectorAll(".cin-panel").forEach((panel, i) => {
    const img = panel.querySelector(".cin-panel-img");
    const content = panel.querySelector(".cin-panel-content");

    // Parallax on each panel image
    gsap.to(img, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
            trigger: panel,
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });

    // Content fades in from left
    gsap.from(content, {
        x: -80,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
            trigger: panel,
            start: "top 75%",
            toggleActions: "play none none reverse"
        }
    });
});

// ============================================================
// 4. ABOUT SECTION � PARALLAX
// ============================================================
gsap.to("#aboutParallax", {
    yPercent: 20,
    ease: "none",
    scrollTrigger: {
        trigger: ".cin-about",
        start: "top bottom",
        end: "bottom top",
        scrub: true
    }
});

gsap.from(".cin-about-content", {
    x: 80,
    opacity: 0,
    duration: 1.4,
    ease: "power3.out",
    scrollTrigger: {
        trigger: ".cin-about",
        start: "top 65%",
        toggleActions: "play none none reverse"
    }
});

// ============================================================
// 5. FINAL CTA � PARALLAX
// ============================================================
gsap.to("#finalParallax", {
    yPercent: 20,
    ease: "none",
    scrollTrigger: {
        trigger: ".cin-final-cta",
        start: "top bottom",
        end: "bottom top",
        scrub: true
    }
});

gsap.from(".cin-final-content", {
    y: 60,
    opacity: 0,
    duration: 1.4,
    ease: "power3.out",
    scrollTrigger: {
        trigger: ".cin-final-cta",
        start: "top 70%",
        toggleActions: "play none none reverse"
    }
});

// ============================================================
// 6. SECTION HEADERS � FADE UP
// ============================================================
document.querySelectorAll(".cin-section-header").forEach(header => {
    gsap.from(header, {
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
            trigger: header,
            start: "top 80%",
            toggleActions: "play none none reverse"
        }
    });
});

// ============================================================
// 7. 3D CARDS � STAGGER REVEAL
// ============================================================
gsap.from(".cin-card", {
    y: 80,
    opacity: 0,
    duration: 1,
    stagger: 0.15,
    ease: "power3.out",
    scrollTrigger: {
        trigger: ".cin-cards-grid",
        start: "top 75%",
        toggleActions: "play none none reverse"
    }
});

// ============================================================
// 8. TIMELINE � ITEMS SLIDE IN
// ============================================================
document.querySelectorAll(".cin-timeline-item").forEach((item, i) => {
    gsap.from(item, {
        x: i % 2 === 0 ? -60 : 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none reverse"
        }
    });
});

// ============================================================
// 9. GALLERY ITEMS � STAGGER
// ============================================================
gsap.from(".cin-gallery-item", {
    y: 60,
    opacity: 0,
    duration: 1,
    stagger: 0.1,
    ease: "power3.out",
    scrollTrigger: {
        trigger: ".cin-gallery-strip",
        start: "top 80%",
        toggleActions: "play none none reverse"
    }
});

// ============================================================
// 10. NAV � SCROLL STATE
// ============================================================
window.addEventListener("scroll", () => {
    const nav = document.getElementById("cin-nav");
    if (window.scrollY > 60) {
        nav.classList.add("scrolled");
    } else {
        nav.classList.remove("scrolled");
    }
});

// ============================================================
// 11. FLOATING PARTICLES IN HERO
// ============================================================
(function createParticles() {
    const container = document.getElementById("particles");
    if (!container) return;
    for (let i = 0; i < 24; i++) {
        const p = document.createElement("div");
        p.className = "particle";
        p.style.left = Math.random() * 100 + "%";
        p.style.top = Math.random() * 100 + "%";
        p.style.animationDelay = Math.random() * 6 + "s";
        p.style.animationDuration = (4 + Math.random() * 4) + "s";
        p.style.opacity = Math.random() * 0.6;
        container.appendChild(p);
    }
})();

// ============================================================
// 12. SMOOTH SCROLL FOR IN-PAGE ANCHORS
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    });
});

// ============================================================
// 13. SOUND TOGGLE
// ============================================================
const soundBtn = document.getElementById("soundBtn");
const audio = document.getElementById("ambientAudio");
let soundOn = false;

if (soundBtn && audio) {
    soundBtn.addEventListener("click", () => {
        soundOn = !soundOn;
        if (soundOn) {
            audio.volume = 0.2;
            audio.play().catch(() => {});
            soundBtn.querySelector(".sound-icon").textContent = "??";
        } else {
            audio.pause();
            soundBtn.querySelector(".sound-icon").textContent = "??";
        }
    });
}

// ============================================================
// 14. VANILLA TILT (Already loaded via CDN in HTML)
// ============================================================
if (typeof VanillaTilt !== "undefined") {
    VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
        max: 8,
        speed: 400,
        glare: true,
        "max-glare": 0.3
    });
}


