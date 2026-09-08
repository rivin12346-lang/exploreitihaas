/* ============================================================
   EFFECTS3D.JS - Global 3D effects & Contact Buttons for Explore Ithihaas
   ============================================================ */
(function() {
    "use strict";

    // 0. FLOATING CONTACT BUTTONS (WhatsApp & Phone Call) ON EVERY PAGE
    function initFloatingContactButtons() {
        if (document.getElementById("global-wa-float-btn")) return;

        // Pulse Animation Styles
        if (!document.getElementById("float-btn-pulse-css")) {
            const st = document.createElement("style");
            st.id = "float-btn-pulse-css";
            st.textContent = `
                @keyframes pulseWa {
                    0%, 100% { box-shadow: 0 6px 20px rgba(37,211,102,0.5); }
                    50% { box-shadow: 0 6px 32px rgba(37,211,102,0.85), 0 0 0 12px rgba(37,211,102,0.18); }
                }
                @keyframes pulseCall {
                    0%, 100% { box-shadow: 0 6px 20px rgba(212,168,64,0.55); }
                    50% { box-shadow: 0 6px 32px rgba(212,168,64,0.9), 0 0 0 12px rgba(212,168,64,0.22); }
                }
            `;
            document.head.appendChild(st);
        }

        // 🟢 WhatsApp Button (Bottom-Right: 30px)
        const wa = document.createElement("a");
        wa.id = "global-wa-float-btn";
        wa.href = "https://wa.me/916369643150";
        wa.target = "_blank";
        wa.rel = "noopener noreferrer";
        wa.title = "Chat on WhatsApp (+91 6369643150)";
        Object.assign(wa.style, {
            position: "fixed", bottom: "30px", right: "30px",
            width: "58px", height: "58px",
            backgroundColor: "#25D366", borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: "999999", textDecoration: "none", cursor: "pointer",
            transition: "transform 0.3s ease",
            animation: "pulseWa 3s infinite ease-in-out"
        });
        wa.innerHTML = '<svg width="30" height="30" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>';
        wa.onmouseenter = () => { wa.style.transform = "scale(1.15)"; };
        wa.onmouseleave = () => { wa.style.transform = "scale(1)"; };

        // 🟡 Phone Call Button (Bottom-Right: 100px)
        const call = document.createElement("a");
        call.id = "global-call-float-btn";
        call.href = "tel:+916369643150";
        call.title = "Call Us (+91 6369643150)";
        Object.assign(call.style, {
            position: "fixed", bottom: "30px", right: "100px",
            width: "58px", height: "58px",
            backgroundColor: "#D4A840", borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: "999999", textDecoration: "none", cursor: "pointer",
            fontSize: "26px", lineHeight: "1",
            transition: "transform 0.3s ease",
            animation: "pulseCall 3s infinite ease-in-out"
        });
        call.innerHTML = "&#128222;";
        call.onmouseenter = () => { call.style.transform = "scale(1.15)"; };
        call.onmouseleave = () => { call.style.transform = "scale(1)"; };

        document.body.appendChild(wa);
        document.body.appendChild(call);
    }

    // 1. SCROLL REVEAL
    function initScrollReveal() {
        const els = document.querySelectorAll(
            ".cin-card, .cin-timeline-item, .cin-gallery-item, .test-card, .why-cin-item, .cin-about-content, .cin-final-content"
        );
        els.forEach(el => {
            el.style.opacity = "0";
            el.style.transform = "translateY(50px)";
            el.style.transition = "opacity 0.9s ease, transform 0.9s cubic-bezier(0.34,1.56,0.64,1)";
        });
        const io = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.style.opacity = "1";
                    e.target.style.transform = "translateY(0)";
                    io.unobserve(e.target);
                }
            });
        }, { threshold: 0.12 });
        els.forEach(el => io.observe(el));
    }

    // 2. GLOBAL 3D TILT on cards
    function initTilt() {
        const tiltEls = document.querySelectorAll(".cin-card, .test-card, .why-cin-item, .cin-gallery-item");
        tiltEls.forEach(el => {
            el.addEventListener("mousemove", (e) => {
                const r  = el.getBoundingClientRect();
                const rx = ((e.clientY - r.top  - r.height/2) / r.height) * -14;
                const ry = ((e.clientX - r.left - r.width /2) / r.width ) *  14;
                el.style.transform = "perspective(800px) rotateX("+rx+"deg) rotateY("+ry+"deg) translateZ(20px)";
                el.style.boxShadow = (-ry*1.5)+"px "+(rx*1.5)+"px 40px rgba(0,0,0,0.16)";
            });
            el.addEventListener("mouseleave", () => {
                el.style.transform = "perspective(800px) rotateX(0) rotateY(0) translateZ(0)";
                el.style.boxShadow = "";
            });
        });
    }

    // 3. PARALLAX backgrounds
    function initParallax() {
        const els = document.querySelectorAll(".cin-about-parallax, .cin-final-img");
        if (!els.length) return;
        window.addEventListener("scroll", () => {
            els.forEach(el => {
                const section = el.closest("section") || el.parentElement;
                if (!section) return;
                const rect = section.getBoundingClientRect();
                const pct = (rect.top + rect.height / 2) / window.innerHeight;
                el.style.transform = "translateY("+((pct - 0.5) * -60)+"px)";
            });
        }, { passive: true });
    }

    // 4. NAV active highlight
    function initNavHighlight() {
        const current = window.location.pathname.split("/").pop() || "index.html";
        document.querySelectorAll(".cin-nav-links a").forEach(a => {
            if (a.getAttribute("href") === current || (current === "" && a.getAttribute("href") === "index.html")) {
                a.style.color = "#B8860B";
                a.style.fontWeight = "700";
            }
        });
    }

    // 5. Heading reveal
    function initHeadingReveal() {
        const headings = document.querySelectorAll(".cin-section-title, .cin-about-title, .cin-final-title");
        const io = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.style.transition = "opacity 1s ease, transform 1s cubic-bezier(0.34,1.56,0.64,1)";
                    e.target.style.opacity = "1";
                    e.target.style.transform = "translateY(0)";
                    io.unobserve(e.target);
                }
            });
        }, { threshold: 0.3 });
        headings.forEach(h => {
            h.style.opacity = "0";
            h.style.transform = "translateY(40px)";
            io.observe(h);
        });
    }

    // 6. Floating gold particles
    function initParticles() {
        if (document.getElementById("global-particles")) return;
        const canvas = document.createElement("canvas");
        canvas.id = "global-particles";
        Object.assign(canvas.style, {
            position: "fixed", inset: "0", width: "100%", height: "100%",
            pointerEvents: "none", zIndex: "1", opacity: "0.4"
        });
        document.body.prepend(canvas);
        const ctx = canvas.getContext("2d");
        canvas.width = window.innerWidth; canvas.height = window.innerHeight;
        window.addEventListener("resize", () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; });
        const pts = Array.from({ length: 40 }, () => ({
            x: Math.random() * canvas.width, y: Math.random() * canvas.height,
            r: Math.random() * 1.8 + 0.4,
            dx: (Math.random() - 0.5) * 0.35, dy: -Math.random() * 0.45 - 0.15,
            a: Math.random() * 0.5 + 0.15
        }));
        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            pts.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(184,134,11,"+p.a+")";
                ctx.fill();
                p.x += p.dx; p.y += p.dy;
                if (p.y < -5) { p.y = canvas.height + 5; p.x = Math.random() * canvas.width; }
                if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
            });
            requestAnimationFrame(draw);
        }
        draw();
    }

    document.addEventListener("DOMContentLoaded", function() {
        initFloatingContactButtons();
        initScrollReveal();
        initTilt();
        initParallax();
        initNavHighlight();
        initHeadingReveal();
        initParticles();
    });
})();

