/**
 * Navbar & Navigation Logic (Literal Restored Version)
 */
export const initNavigation = () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    function isMobileViewport() {
        return window.matchMedia('(max-width: 768px)').matches;
    }

    function getMenuFocusableElements() {
        if (!navMenu) return [];
        return Array.from(navMenu.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'));
    }

    function openMobileMenu() {
        if (!hamburger || !navMenu) return;
        hamburger.classList.add('active');
        navMenu.classList.add('active');
        hamburger.setAttribute('aria-expanded', 'true');
        navMenu.setAttribute('aria-hidden', 'false');
        document.body.classList.add('menu-open');
        const firstFocusable = getMenuFocusableElements()[0];
        if (firstFocusable) firstFocusable.focus();
    }

    function closeMobileMenu(returnFocus = false) {
        if (!hamburger || !navMenu) return;
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        navMenu.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('menu-open');
        if (returnFocus) hamburger.focus();
    }

    if (hamburger && navMenu) {
        if (!navMenu.id) navMenu.id = 'primary-navigation';
        hamburger.setAttribute('aria-controls', navMenu.id);
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Toggle navigation menu');
        navMenu.setAttribute('aria-hidden', 'true');

        hamburger.addEventListener('click', () => {
            navMenu.classList.contains('active') ? closeMobileMenu(false) : openMobileMenu();
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => closeMobileMenu(false));
    });

    document.addEventListener('click', (event) => {
        if (!isMobileViewport() || !navMenu || !navMenu.classList.contains('active') || !navbar) return;
        if (!navbar.contains(event.target)) closeMobileMenu(false);
    });

    document.addEventListener('keydown', (event) => {
        if (!navMenu || !navMenu.classList.contains('active')) return;
        if (event.key === 'Escape') { closeMobileMenu(true); return; }
        if (event.key !== 'Tab') return;
        const focusable = getMenuFocusableElements();
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault(); last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault(); first.focus();
        }
    });

    window.addEventListener('resize', () => {
        if (!isMobileViewport()) closeMobileMenu(false);
    });

    window.addEventListener('scroll', () => {
        if (navbar) {
            window.scrollY > 50 ? navbar.classList.add('scrolled') : navbar.classList.remove('scrolled');
        }
        
        let current = '';
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= (sectionTop - 200)) current = section.getAttribute('id');
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) link.classList.add('active');
        });
    });

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
};
