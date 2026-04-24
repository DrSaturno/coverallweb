document.addEventListener("DOMContentLoaded", () => {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -10% 0px" // Trigger slightly before it enters the viewport
    };

    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                // Option: observer.unobserve(entry.target); // Keep it to only animate once
            }
        });
    }, observerOptions);

    function initAnimations() {
        const animatedElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger');
        animatedElements.forEach(el => animationObserver.observe(el));
    }

    // Expose to window
    window.initAnimations = initAnimations;

    // Initial run
    initAnimations();
    initMobileMenu();

    // Still listen for dynamic loads just in case
    document.addEventListener("componentsLoaded", () => {
        initAnimations();
        initMobileMenu();
    });

    function initMobileMenu() {
        const toggle = document.getElementById('mobile-menu-toggle');
        const close = document.getElementById('mobile-menu-close');
        const menu = document.getElementById('mobile-menu');
        const links = document.querySelectorAll('.mobile-nav-link');

        if (toggle && menu) {
            toggle.addEventListener('click', () => {
                menu.classList.remove('translate-x-full');
            });

            const closeMenu = () => {
                menu.classList.add('translate-x-full');
            };

            if (close) close.addEventListener('click', closeMenu);
            links.forEach(link => link.addEventListener('click', closeMenu));
        }
    }

    window.initMobileMenu = initMobileMenu;

    // Smooth reveal for the entire body on load
    document.body.style.opacity = "0";
    document.body.style.transition = "opacity 0.8s ease-out";

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80, // Substract header height
                    behavior: 'smooth'
                });
            }
        });
    });

    // Page Load trigger
    requestAnimationFrame(() => {
        document.body.style.opacity = "1";
    });
});
