// ==========================================
// NAVBAR FUNCTIONALITY
// ==========================================

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
    if (firstFocusable) {
        firstFocusable.focus();
    }
}

function closeMobileMenu(returnFocus = false) {
    if (!hamburger || !navMenu) return;
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    navMenu.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('menu-open');

    if (returnFocus) {
        hamburger.focus();
    }
}

if (hamburger && navMenu) {
    if (!navMenu.id) {
        navMenu.id = 'primary-navigation';
    }

    hamburger.setAttribute('aria-controls', navMenu.id);
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Toggle navigation menu');
    navMenu.setAttribute('aria-hidden', 'true');

    hamburger.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            closeMobileMenu(false);
        } else {
            openMobileMenu();
        }
    });
}

// Close menu when clicking on a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        closeMobileMenu(false);
    });
});

// Close mobile menu when clicking outside navbar
document.addEventListener('click', (event) => {
    if (!isMobileViewport() || !navMenu || !navMenu.classList.contains('active') || !navbar) return;
    if (!navbar.contains(event.target)) {
        closeMobileMenu(false);
    }
});

// Keyboard navigation and Escape support for mobile menu
document.addEventListener('keydown', (event) => {
    if (!navMenu || !navMenu.classList.contains('active')) return;

    if (event.key === 'Escape') {
        closeMobileMenu(true);
        return;
    }

    if (event.key !== 'Tab') return;
    const focusable = getMenuFocusableElements();
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
    }
});

// Reset mobile menu when resizing to desktop
window.addEventListener('resize', () => {
    if (!isMobileViewport()) {
        closeMobileMenu(false);
    }
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// Active link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Smooth scroll
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==========================================
// SCROLL-TRIGGERED ANIMATIONS
// ==========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe all sections and cards
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll(
        '.about-card, .skill-card, .project-card, .info-card, .highlight-item, .section-header'
    );

    animateElements.forEach(el => {
        el.classList.add('animate-element');
        observer.observe(el);
    });
});

// ==========================================
// TYPING ANIMATION
// ==========================================

const typingText = document.querySelector('.typing-text');
if (typingText) {
    const words = ['Computer Science Student', 'Competitive Programmer', 'Web Developer', 'Problem Solver'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            setTimeout(() => isDeleting = true, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }

        const typingSpeed = isDeleting ? 50 : 100;
        setTimeout(type, typingSpeed);
    }

    type();
}

// ==========================================
// BACK TO TOP BUTTON
// ==========================================

const backToTopBtn = document.getElementById('backToTop');

if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ==========================================
// DARK/LIGHT MODE TOGGLE
// ==========================================

const themeToggle = document.getElementById('themeToggle');
const body = document.body;

if (themeToggle) {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
    }

    // Toggle theme on click
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');

        // Save preference
        if (body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light');
            console.log('Switched to light mode');
        } else {
            localStorage.setItem('theme', 'dark');
            console.log('Switched to dark mode');
        }
    });
}

// ==========================================
// CONTACT FORM HANDLING
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;

            // Show loading state
            submitBtn.innerHTML = '<span>Sending...</span>';
            submitBtn.disabled = true;

            // Simulate sending (replace with EmailJS when ready)
            setTimeout(() => {
                // Success
                submitBtn.innerHTML = '<span>Message Sent! ✓</span>';
                submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                contactForm.reset();

                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 3000);
            }, 1000);

            /*
            // EMAILJS SETUP (Uncomment when ready)
            // 1. Sign up at https://www.emailjs.com/
            // 2. Get your Public Key, Service ID, and Template ID
            // 3. Add EmailJS script to HTML: <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
            // 4. Initialize EmailJS:

            (function() {
                emailjs.init("YOUR_PUBLIC_KEY");
            })();

            // 5. Replace the setTimeout above with this:

            emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
                .then(function() {
                    submitBtn.innerHTML = '<span>Message Sent! ✓</span>';
                    submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                    contactForm.reset();

                    setTimeout(() => {
                        submitBtn.innerHTML = originalText;
                        submitBtn.style.background = '';
                        submitBtn.disabled = false;
                    }, 3000);
                }, function(error) {
                    submitBtn.innerHTML = '<span>Failed. Try again!</span>';
                    submitBtn.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';

                    setTimeout(() => {
                        submitBtn.innerHTML = originalText;
                        submitBtn.style.background = '';
                        submitBtn.disabled = false;
                    }, 3000);
                });
            */
        });
    }
});

// ==========================================
// LIVE CP STATS (Optional - Add your usernames)
// ==========================================

// Fetch LeetCode Stats
async function fetchLeetCodeStats(username) {
    const element = document.getElementById('leetcode-solved');
    if (!element) return;

    try {
        const response = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`);
        const data = await response.json();
        element.textContent = data.totalSolved || '0';
    } catch (error) {
        element.textContent = 'N/A';
        console.error('LeetCode stats error:', error);
    }
}

// Fetch Codeforces Stats
async function fetchCodeforcesStats(username) {
    const element = document.getElementById('codeforces-rating');
    if (!element) return;

    try {
        const response = await fetch(`https://codeforces.com/api/user.info?handles=${username}`);
        const data = await response.json();
        if (data.status === 'OK') {
            const rating = data.result[0].rating || 'Unrated';
            element.textContent = rating;
        }
    } catch (error) {
        element.textContent = 'N/A';
        console.error('Codeforces stats error:', error);
    }
}

// Uncomment and add your usernames to fetch live stats
// fetchLeetCodeStats('your-leetcode-username');
// fetchCodeforcesStats('your-codeforces-handle');

// ==========================================
// PARTICLES.JS (Optional)
// ==========================================

// Add this to your HTML before </body>:
// <script src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"></script>

if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#667eea'
            },
            shape: {
                type: 'circle'
            },
            opacity: {
                value: 0.3,
                random: true
            },
            size: {
                value: 3,
                random: true
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#667eea',
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 0.5
                    }
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        retina_detect: true
    });
}

console.log('Portfolio JavaScript loaded successfully! 🚀');
