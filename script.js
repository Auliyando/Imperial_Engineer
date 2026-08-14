// Interactive navigation menu for mobile devices
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const navItems = document.querySelectorAll('.nav-links a');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Premium visual pattern: Hide navbar on scroll down, show on scroll up
let lastScroll = 0;
const nav = document.querySelector('.glass-nav');

if (nav) {
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            nav.classList.remove('scroll-down');
            nav.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !nav.classList.contains('scroll-down')) {
            // Scrolling down - hide navigation bar
            nav.classList.remove('scroll-up');
            nav.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && nav.classList.contains('scroll-down')) {
            // Scrolling up - show navigation bar
            nav.classList.remove('scroll-down');
            nav.classList.add('scroll-up');
        }
        
        lastScroll = currentScroll;
    }, { passive: true });
}

// Smooth scroll reveal observer
document.addEventListener('DOMContentLoaded', () => {
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.05,
        rootMargin: '0px 0px -40px 0px' // Trigger slightly before element enters viewport
    });

    reveals.forEach(reveal => revealOnScroll.observe(reveal));
});

// Interactive Star Constellation Background Animation
document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // GLOBAL STARFIELD CANVAS SETUP
    // ----------------------------------------------------
    const canvas = document.getElementById('space-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    let stars = [];
    let starCount = Math.min(130, Math.floor((width * height) / 10000));
    
    const mouse = {
        x: null,
        y: null,
        active: false,
        radius: 150
    };

    class Star {
        constructor() {
            this.reset();
            this.x = Math.random() * width;
            this.y = Math.random() * height;
        }

        reset() {
            this.size = Math.random() * 1.8 + 1.2; // Stars 1.2px to 3px
            this.baseOpacity = Math.random() * 0.5 + 0.15;
            this.opacity = this.baseOpacity;
            this.twinkleSpeed = Math.random() * 0.015 + 0.005;
            this.twinkleAngle = Math.random() * Math.PI * 2;
            
            const colors = [
                '255, 255, 255',
                '56, 189, 248',
                '186, 230, 253'
            ];
            this.color = colors[Math.floor(Math.random() * colors.length)];
            
            this.vx = (Math.random() - 0.5) * 0.15;
            this.vy = (Math.random() - 0.5) * 0.15;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < -10) this.x = width + 10;
            if (this.x > width + 10) this.x = -10;
            if (this.y < -10) this.y = height + 10;
            if (this.y > height + 10) this.y = -10;

            this.twinkleAngle += this.twinkleSpeed;
            this.opacity = this.baseOpacity + Math.sin(this.twinkleAngle) * 0.15;
            this.opacity = Math.max(0.1, Math.min(0.9, this.opacity));
        }

        draw() {
            ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initStars() {
        stars = [];
        starCount = Math.min(130, Math.floor((width * height) / 10000));
        for (let i = 0; i < starCount; i++) {
            stars.push(new Star());
        }
    }

    function drawConstellations() {
        const maxDist = 115;
        for (let i = 0; i < stars.length; i++) {
            const s1 = stars[i];

            for (let j = i + 1; j < stars.length; j++) {
                const s2 = stars[j];
                const dx = s1.x - s2.x;
                const dy = s1.y - s2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < maxDist) {
                    const alpha = (1 - dist / maxDist) * 0.15;
                    ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
                    ctx.lineWidth = 0.6;
                    ctx.beginPath();
                    ctx.moveTo(s1.x, s1.y);
                    ctx.lineTo(s2.x, s2.y);
                    ctx.stroke();
                }
            }

            if (mouse.active && mouse.x !== null && mouse.y !== null) {
                const dx = s1.x - mouse.x;
                const dy = s1.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < mouse.radius) {
                    const alpha = (1 - dist / mouse.radius) * 0.35;
                    ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
                    ctx.lineWidth = 1.1;
                    ctx.beginPath();
                    ctx.moveTo(s1.x, s1.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }
            }
        }
    }

    // ----------------------------------------------------
    // LOCALIZED SECTION CANVASES SETUP
    // ----------------------------------------------------
    const sectionCanvases = document.querySelectorAll('.section-space-canvas');
    const sectionsData = [];

    class NebulaCloud {
        constructor(w, h, color) {
            this.w = w;
            this.h = h;
            this.color = color;
            this.reset();
        }

        reset() {
            this.x = Math.random() * this.w;
            this.y = Math.random() * this.h;
            this.radius = Math.random() * (Math.min(this.w, this.h) * 0.25) + (Math.min(this.w, this.h) * 0.2);
            this.opacity = Math.random() * 0.12 + 0.08; // Increased opacity range for high visibility
            this.vx = (Math.random() - 0.5) * 0.06;
            this.vy = (Math.random() - 0.5) * 0.06;
            this.growth = Math.random() * 0.04 - 0.02;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.radius += this.growth;

            if (this.x < 0 || this.x > this.w || this.y < 0 || this.y > this.h || this.radius < 40 || this.radius > Math.min(this.w, this.h) * 0.6) {
                this.reset();
            }
        }

        draw(sCtx) {
            const grad = sCtx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
            grad.addColorStop(0, `rgba(${this.color}, ${this.opacity})`);
            grad.addColorStop(1, 'transparent');
            sCtx.fillStyle = grad;
            sCtx.beginPath();
            sCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            sCtx.fill();
        }
    }

    class LocalShootingStar {
        constructor(w, h) {
            this.w = w;
            this.h = h;
            this.reset();
        }

        reset() {
            this.x = Math.random() * this.w;
            this.y = Math.random() * (this.h * 0.35); // Starts in upper third
            this.dx = (Math.random() - 0.5) * 2 - 4.5; // Stretched trajectory
            this.dy = Math.random() * 2 + 4.5;
            this.opacity = 1.0;
            this.fadeSpeed = Math.random() * 0.015 + 0.008;
        }

        update() {
            this.x += this.dx;
            this.y += this.dy;
            this.opacity -= this.fadeSpeed;
        }

        draw(sCtx) {
            sCtx.strokeStyle = `rgba(56, 189, 248, ${this.opacity * 1.0})`; // Full opacity start
            sCtx.lineWidth = 2.0; // Thicker meteor stroke for high visibility
            sCtx.beginPath();
            sCtx.moveTo(this.x, this.y);
            sCtx.lineTo(this.x - this.dx * 6, this.y - this.dy * 6);
            sCtx.stroke();
        }
    }

    function initSectionCanvases() {
        sectionsData.length = 0;
        
        sectionCanvases.forEach(sCanvas => {
            const parent = sCanvas.parentElement;
            const w = sCanvas.width = parent.clientWidth;
            const h = sCanvas.height = parent.clientHeight;
            const effect = sCanvas.getAttribute('data-effect');
            const sCtx = sCanvas.getContext('2d');
            
            const data = {
                canvas: sCanvas,
                ctx: sCtx,
                w: w,
                h: h,
                effect: effect,
                elements: []
            };

            if (effect === 'nebula') {
                // Skills & Contact get floating nebula clouds
                data.elements.push(new NebulaCloud(w, h, '99, 102, 241')); // Indigo
                data.elements.push(new NebulaCloud(w, h, '56, 189, 248')); // Cyan
            } else if (effect === 'shooting-stars') {
                // Timeline gets falling meteors
                for (let i = 0; i < 2; i++) {
                    data.elements.push(new LocalShootingStar(w, h));
                }
            }
            
            sectionsData.push(data);
        });
    }

    // ----------------------------------------------------
    // UNIFIED ANIMATION & RESIZE LOOPS
    // ----------------------------------------------------
    function animate() {
        // Clear global canvas
        ctx.clearRect(0, 0, width, height);

        // A. Draw global starfields
        stars.forEach(star => {
            star.update();
            star.draw();
        });
        drawConstellations();

        // B. Clear, update, and draw each localized canvas in parallel
        sectionsData.forEach(sData => {
            sData.ctx.clearRect(0, 0, sData.w, sData.h);
            
            if (sData.effect === 'nebula') {
                sData.elements.forEach(cloud => {
                    cloud.update();
                    cloud.draw(sData.ctx);
                });
            } else if (sData.effect === 'shooting-stars') {
                // Spawning check inside timeline section
                if (Math.random() < 0.018 && sData.elements.length < 4) { // Increased spawn probability to 1.8% per frame
                    sData.elements.push(new LocalShootingStar(sData.w, sData.h));
                }
                
                for (let i = sData.elements.length - 1; i >= 0; i--) {
                    const star = sData.elements[i];
                    star.update();
                    if (star.opacity <= 0) {
                        sData.elements.splice(i, 1);
                    } else {
                        star.draw(sData.ctx);
                    }
                }
            }
        });

        requestAnimationFrame(animate);
    }

    // Unified window resize handler
    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        initStars();
        initSectionCanvases();
    }, { passive: true });

    // Interactive mouse listeners
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        mouse.active = true;
    }, { passive: true });

    window.addEventListener('mouseleave', () => {
        mouse.active = false;
    }, { passive: true });

    // Touch screen support
    window.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) {
            mouse.x = e.touches[0].clientX;
            mouse.y = e.touches[0].clientY;
            mouse.active = true;
        }
    }, { passive: true });

    window.addEventListener('touchend', () => {
        mouse.active = false;
    }, { passive: true });

    // Initialize all canvas assets & start rendering
    initStars();
    initSectionCanvases();
    animate();
});