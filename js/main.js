// Main JavaScript for B3 Company LTD website

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Services dropdown functionality
    const servicesDropdown = document.getElementById('servicesDropdown');
    const servicesMenu = document.getElementById('servicesMenu');
    
    if (servicesDropdown && servicesMenu) {
        let timeoutId;
        
        servicesDropdown.addEventListener('mouseenter', function() {
            clearTimeout(timeoutId);
            servicesMenu.classList.remove('opacity-0', 'invisible');
            servicesMenu.classList.add('opacity-100', 'visible');
        });
        
        servicesDropdown.addEventListener('mouseleave', function() {
            timeoutId = setTimeout(() => {
                servicesMenu.classList.remove('opacity-100', 'visible');
                servicesMenu.classList.add('opacity-0', 'invisible');
            }, 150);
        });
        
        servicesMenu.addEventListener('mouseenter', function() {
            clearTimeout(timeoutId);
        });
        
        servicesMenu.addEventListener('mouseleave', function() {
            servicesMenu.classList.remove('opacity-100', 'visible');
            servicesMenu.classList.add('opacity-0', 'invisible');
        });
    }

    // Form submission handling
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // Basic validation
            if (!name || !email || !message) {
                alert('Please fill in all fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Thank you for your message! We will get back to you soon.');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    // Advanced Scroll Animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const scrollObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all elements with animation classes
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        scrollObserver.observe(el);
    });

    // Parallax effect for hero sections
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax-bg');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Typing animation effect
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Initialize typing animations
    const typingElements = document.querySelectorAll('.typing-effect');
    typingElements.forEach(element => {
        const text = element.textContent;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter(entry.target, text, 50);
                    observer.unobserve(entry.target);
                }
            });
        });
        observer.observe(element);
    });

    // Navbar background change on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('nav');
        if (window.scrollY > 50) {
            navbar.classList.add('bg-opacity-95');
            navbar.classList.add('backdrop-blur-sm');
        } else {
            navbar.classList.remove('bg-opacity-95');
            navbar.classList.remove('backdrop-blur-sm');
        }
    });

    // Add loading animation to external links
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
        link.addEventListener('click', function() {
            const originalText = this.textContent;
            this.innerHTML = '<span class="loading"></span> Loading...';
            
            setTimeout(() => {
                this.textContent = originalText;
            }, 1000);
        });
    });

    // Back to Top Button functionality
    const backToTopBtn = document.querySelector('.back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Language Switcher functionality
    const languageSwitcherBtn = document.querySelector('.language-switcher-btn');
    const languageDropdown = document.querySelector('.language-dropdown');
    
    if (languageSwitcherBtn && languageDropdown) {
        languageSwitcherBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            languageDropdown.classList.toggle('show');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function() {
            languageDropdown.classList.remove('show');
        });

        // Language switching
        document.querySelectorAll('.language-option').forEach(option => {
            option.addEventListener('click', function(e) {
                e.preventDefault();
                const lang = this.dataset.lang;
                switchLanguage(lang);
                languageDropdown.classList.remove('show');
                
                // Update active state
                document.querySelectorAll('.language-option').forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');
                
                // Update button text
                const currentLang = lang === 'en' ? 'EN' : 'FR';
                languageSwitcherBtn.innerHTML = `🌐<span style="font-size: 12px; margin-left: 2px;">${currentLang}</span>`;
            });
        });
    }

    // Initialize language on page load
    initializeLanguage();
});

// Utility functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
        type === 'success' ? 'bg-green-600' : 
        type === 'error' ? 'bg-red-600' : 'bg-blue-600'
    } text-white`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Language switching functionality
const translations = {
    en: {
        // Navigation
        'nav-home': 'Home',
        'nav-about': 'About Us',
        'nav-services': 'Services',
        'nav-contact': 'Contact',
        
        // Home page
        'hero-title': 'B3 Company LTD',
        'hero-subtitle': 'Innovation through Diversity',
        'hero-description': 'Pioneering excellence across multiple industries with our diverse portfolio of innovative services and solutions.',
        'learn-more': 'Learn More',
        'get-in-touch': 'Get In Touch',
        
        'welcome-title': 'Welcome to B3 Company LTD',
        'welcome-subtitle': 'Your gateway to innovation across multiple industries',
        
        'innovation-title': 'Innovation',
        'innovation-desc': 'Leading the way with cutting-edge solutions and forward-thinking approaches across all our ventures.',
        
        'diversity-title': 'Diversity',
        'diversity-desc': 'Embracing diverse industries and perspectives to create comprehensive solutions for our clients.',
        
        'excellence-title': 'Excellence',
        'excellence-desc': 'Committed to delivering exceptional quality and service in everything we do.',
        
        'ventures-title': 'Our Ventures',
        'ventures-subtitle': 'Discover the diverse portfolio of B3 Company LTD',
        
        'barnakap-title': 'B3 Barnakap City',
        'barnakap-desc': 'Premium dining experience',
        'rock-tivi-title': 'B3 Rock Tivi',
        'rock-tivi-desc': 'Dynamic television channel',
        'music-title': 'B3 Music Industry',
        'music-desc': 'Music production services',
        'future-title': 'Future Ventures',
        'future-desc': 'Exciting developments ahead',
        
        'cta-title': 'Ready to Innovate Together?',
        'cta-subtitle': 'Join us in shaping the future across multiple industries. Let\'s create something extraordinary.',
        'discover-story': 'Discover Our Story',
        'start-conversation': 'Start a Conversation',
        
        'footer-description': 'Innovation through Diversity - Leading the way in multiple industries with excellence and innovation.',
        'quick-links': 'Quick Links',
        'our-services': 'Our Services',
        'copyright': '© 2024 B3 Company LTD. All rights reserved. Innovation through Diversity.'
    },
    fr: {
        // Navigation
        'nav-home': 'Accueil',
        'nav-about': 'À Propos',
        'nav-services': 'Services',
        'nav-contact': 'Contact',
        
        // Home page
        'hero-title': 'B3 Company LTD',
        'hero-subtitle': 'Innovation par la Diversité',
        'hero-description': 'Pionnier de l\'excellence dans plusieurs industries avec notre portefeuille diversifié de services et solutions innovants.',
        'learn-more': 'En Savoir Plus',
        'get-in-touch': 'Nous Contacter',
        
        'welcome-title': 'Bienvenue chez B3 Company LTD',
        'welcome-subtitle': 'Votre passerelle vers l\'innovation dans plusieurs industries',
        
        'innovation-title': 'Innovation',
        'innovation-desc': 'Ouvrir la voie avec des solutions de pointe et des approches avant-gardistes dans toutes nos entreprises.',
        
        'diversity-title': 'Diversité',
        'diversity-desc': 'Embrasser des industries et perspectives diverses pour créer des solutions complètes pour nos clients.',
        
        'excellence-title': 'Excellence',
        'excellence-desc': 'Engagé à fournir une qualité et un service exceptionnels dans tout ce que nous faisons.',
        
        'ventures-title': 'Nos Entreprises',
        'ventures-subtitle': 'Découvrez le portefeuille diversifié de B3 Company LTD',
        
        'barnakap-title': 'B3 Barnakap City',
        'barnakap-desc': 'Expérience culinaire premium',
        'rock-tivi-title': 'B3 Rock Tivi',
        'rock-tivi-desc': 'Chaîne de télévision dynamique',
        'music-title': 'B3 Music Industry',
        'music-desc': 'Services de production musicale',
        'future-title': 'Futures Entreprises',
        'future-desc': 'Développements passionnants à venir',
        
        'cta-title': 'Prêt à Innover Ensemble?',
        'cta-subtitle': 'Rejoignez-nous pour façonner l\'avenir dans plusieurs industries. Créons quelque chose d\'extraordinaire.',
        'discover-story': 'Découvrir Notre Histoire',
        'start-conversation': 'Commencer une Conversation',
        
        'footer-description': 'Innovation par la Diversité - Ouvrir la voie dans plusieurs industries avec excellence et innovation.',
        'quick-links': 'Liens Rapides',
        'our-services': 'Nos Services',
        'copyright': '© 2024 B3 Company LTD. Tous droits réservés. Innovation par la Diversité.'
    }
};

function switchLanguage(lang) {
    localStorage.setItem('selectedLanguage', lang);
    
    // Update all translatable elements
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    // Update document language attribute
    document.documentElement.lang = lang;
}

// Initialize language on page load
function initializeLanguage() {
    const savedLang = localStorage.getItem('selectedLanguage') || 'en';
    switchLanguage(savedLang);
    
    // Set active language option
    const activeOption = document.querySelector(`[data-lang="${savedLang}"]`);
    if (activeOption) {
        document.querySelectorAll('.language-option').forEach(opt => opt.classList.remove('active'));
        activeOption.classList.add('active');
    }
}

// Export functions for use in other scripts
window.B3Utils = {
    showNotification,
    switchLanguage,
    initializeLanguage
};
