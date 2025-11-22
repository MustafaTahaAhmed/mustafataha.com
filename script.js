(function() {
    'use strict';
    
    // --- 1. Particle System ---
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        const particleCount = window.innerWidth < 768 ? 25 : 60;
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            const size = Math.random() * 3 + 1;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            const duration = (Math.random() * 20 + 15) + 's';
            const delay = Math.random() * 5 + 's';
            particle.style.animation = `float ${duration} infinite linear ${delay}`;
            particle.style.opacity = Math.random() * 0.5;
            fragment.appendChild(particle);
        }
        particlesContainer.appendChild(fragment);
        const styleSheet = document.createElement("style");
        styleSheet.innerText = `@keyframes float { 0% { transform: translateY(0) translateX(0); opacity: 0; } 50% { opacity: 0.6; } 100% { transform: translateY(-100vh) translateX(20px); opacity: 0; } }`;
        document.head.appendChild(styleSheet);
    }

    // --- 2. Scroll Reveal Animation ---
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    const animatedElements = document.querySelectorAll('.hero-content, .gis-feature, .skill-card, .contact-container');
    animatedElements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
        observer.observe(el);
    });

    // --- 3. Scroll-Hide Logic ---
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        // If menu is active, DO NOT hide nav based on scroll
        if (nav.classList.contains('menu-active')) return;

        if (window.scrollY > 50) {
            nav.classList.add('scrolled-hidden');
        } else {
            nav.classList.remove('scrolled-hidden');
        }
    });

    // --- 4. Mobile Menu Logic (IPHONE FIX - SIMPLE VERSION) ---
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('#nav-links');
    const navLinksItems = document.querySelectorAll('#nav-links li a');

    if (mobileToggle && navLinks) {
        // Simple toggle function
        function toggleMenu() {
            mobileToggle.classList.toggle('active');
            navLinks.classList.toggle('mobile-visible');
            nav.classList.toggle('menu-active');
            document.body.style.overflow = navLinks.classList.contains('mobile-visible') ? 'hidden' : '';
        }

        // Close menu function
        function closeMenu() {
            mobileToggle.classList.remove('active');
            navLinks.classList.remove('mobile-visible');
            nav.classList.remove('menu-active');
            document.body.style.overflow = '';
        }

         // Toggle on click - works for both desktop and mobile
        mobileToggle.onclick = function(e) {
         if (window.innerWidth <= 768) {
        e.preventDefault();
        e.stopPropagation();
        toggleMenu();
        }
    
        };
        // Close when clicking a link
        navLinksItems.forEach(link => {
            link.onclick = closeMenu;
        });

        // Close when clicking outside
        document.onclick = function(e) {
            if (navLinks.classList.contains('mobile-visible') && 
                !mobileToggle.contains(e.target) && 
                !navLinks.contains(e.target)) {
                closeMenu();
            }
        };
    }
})();

