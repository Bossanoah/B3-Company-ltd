// Main JavaScript for B3 Company LTD website

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle with close (X) icon + outside click to close
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        // Store the original hamburger icon HTML
        const hamburgerIcon = mobileMenuBtn.innerHTML;
        const closeIcon = '<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>';
        let isMenuOpen = false;

        // Function to toggle menu state
        function toggleMenu() {
            isMenuOpen = !isMenuOpen;
            if (isMenuOpen) {
                mobileMenu.classList.remove('hidden');
                mobileMenuBtn.innerHTML = closeIcon;
                mobileMenuBtn.setAttribute('aria-expanded', 'true');
                document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
            } else {
                mobileMenu.classList.add('hidden');
                mobileMenuBtn.innerHTML = hamburgerIcon;
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = ''; // Re-enable scrolling
            }
        }

        // Toggle menu on button click
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMenu();
        });

        // Close menu when clicking on a menu item
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                toggleMenu();
            });
        });

        // Prevent clicks inside the menu from closing it
        mobileMenu.addEventListener('click', function(e) {
            e.stopPropagation();
        });

        // Click outside closes the mobile menu
        document.addEventListener('click', function() {
            if (isMenuOpen) {
                toggleMenu();
            }
        });

        // Close menu when window is resized to desktop view
        function handleResize() {
            if (window.innerWidth >= 768 && isMenuOpen) {
                toggleMenu();
            }
        }

        // Add resize event listener
        window.addEventListener('resize', handleResize);
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
    const contactForm = document.querySelector('#contactForm') || document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const firstName = formData.get('firstName') || '';
            const lastName = formData.get('lastName') || '';
            const name = `${firstName} ${lastName}`.trim();
            const email = formData.get('email') || '';
            const phone = formData.get('phone') || '';
            const company = formData.get('company') || '';
            const inquiry = formData.get('inquiry') || '';
            const message = formData.get('message') || '';
            
            // Basic validation
            if (!name || !email || !message) {
                const lang = localStorage.getItem('selectedLanguage') || 'en';
                alert(translations[lang]?.['err-fill-fields'] || 'Please fill in all fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                const lang = localStorage.getItem('selectedLanguage') || 'en';
                alert(translations[lang]?.['err-email'] || 'Please enter a valid email address.');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            const lang = localStorage.getItem('selectedLanguage') || 'en';
            submitBtn.textContent = translations[lang]?.['sending'] || 'Sending...';
            submitBtn.disabled = true;
            
            // Build WhatsApp prefilled message
            const waText = encodeURIComponent(
                `New contact inquiry\n\n` +
                `Name: ${name}\n` +
                `Email: ${email}\n` +
                (phone ? `Phone: ${phone}\n` : '') +
                (company ? `Company: ${company}\n` : '') +
                (inquiry ? `Inquiry: ${inquiry}\n` : '') +
                `Message:\n${message}`
            );

            // Cameroon country code 237
            const whatsappNumber = '237674179413';
            const waUrl = `https://wa.me/${whatsappNumber}?text=${waText}`;

            // Open WhatsApp in new tab
            window.open(waUrl, '_blank');

            // Finish UX
            setTimeout(() => {
                alert(translations[lang]?.['thank-you'] || 'Thank you for your message! We will get back to you soon.');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 500);
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
    const switcherContainers = document.querySelectorAll('.language-switcher');
    if (switcherContainers.length > 0) {
        switcherContainers.forEach(container => {
            const btn = container.querySelector('.language-switcher-btn');
            const dropdown = container.querySelector('.language-dropdown');
            if (!btn || !dropdown) return;

            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                // Close all others
                document.querySelectorAll('.language-dropdown').forEach(d => d.classList.remove('show'));
                dropdown.classList.toggle('show');
            });

            container.querySelectorAll('.language-option').forEach(option => {
                option.addEventListener('click', function(e) {
                    e.preventDefault();
                    const lang = this.dataset.lang;
                    switchLanguage(lang);
                    dropdown.classList.remove('show');
                    
                    // Update active state in all switchers
                    document.querySelectorAll('.language-option').forEach(opt => opt.classList.remove('active'));
                    document.querySelectorAll(`.language-option[data-lang="${lang}"]`).forEach(opt => opt.classList.add('active'));
                    
                    // Update all buttons text
                    const currentLang = lang === 'en' ? 'EN' : 'FR';
                    document.querySelectorAll('.language-switcher-btn').forEach(b => {
                        b.innerHTML = `🌐<span class="lang-code">${currentLang}</span>`;
                    });
                });
            });
        });

        // Close any dropdown when clicking outside
        document.addEventListener('click', function() {
            document.querySelectorAll('.language-dropdown').forEach(d => d.classList.remove('show'));
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
        'nav-services-label': 'Services:',
        'nav-contact': 'Contact',
        'explore': 'Explore',
        'coming-soon': 'Coming Soon',
        'services-barnakap': 'B3 Barnakap City (Restaurant)',
        'services-rock': 'B3 Rock Tivi (Television)',
        'services-music': 'B3 Music Industry',
        'services-future': 'Future Service',
        
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
        'copyright': '© 2024 B3 Company LTD. All rights reserved. Innovation through Diversity.',

        // Footer quick links items
        'footer-home': 'Home',
        'footer-about': 'About Us',
        'footer-contact': 'Contact',

        // About page
        'about-hero-subtitle': 'Pioneering innovation across diverse industries with excellence and integrity',
        'our-story-title': 'Our Story',
        'our-story-p1': 'Founded with a vision to revolutionize multiple industries, B3 Company LTD has grown from a small startup to a diversified conglomerate. Our journey began with a simple belief: innovation thrives when diverse talents and industries converge.',
        'our-story-p2': 'Since our inception, we have consistently pushed boundaries, embraced new technologies, and fostered creativity across all our ventures. From premium dining experiences to cutting-edge entertainment, we bring excellence to every sector we touch.',
        'our-story-p3': 'Today, B3 Company LTD stands as a testament to the power of diversification, innovation, and unwavering commitment to quality.',
        'established': 'Established 2015',
        'established-desc': 'Nearly a decade of innovation and growth',
        'stats-industries': 'Industries',
        'stats-employees': 'Employees',
        'stats-revenue': 'Revenue',
        'stats-countries': 'Countries',
        'foundation-title': 'Our Foundation',
        'foundation-subtitle': 'The principles that guide everything we do',
        'mission-title': 'Mission',
        'mission-desc': 'To create exceptional value across diverse industries by leveraging innovation, fostering talent, and delivering unparalleled experiences that exceed expectations and drive sustainable growth.',
        'vision-title': 'Vision',
        'vision-desc': 'To be the world\'s most innovative and respected diversified company, setting industry standards and inspiring positive change through our commitment to excellence and social responsibility.',
        'values-title': 'Values',
        'values-item-1': '• Innovation & Creativity',
        'values-item-2': '• Integrity & Transparency',
        'values-item-3': '• Excellence & Quality',
        'values-item-4': '• Diversity & Inclusion',
        'values-item-5': '• Sustainability & Responsibility',
        'leadership-title': 'Leadership Team',
        'leadership-subtitle': 'Visionary leaders driving innovation across all our ventures',
        'position-ceo': 'Chief Executive Officer',
        'position-cto': 'Chief Technology Officer',
        'position-coo': 'Chief Operating Officer',
        'position-cfo': 'Chief Financial Officer',
        'position-cmo': 'Chief Marketing Officer',
        'position-chro': 'Chief Human Resources Officer',
        'our-culture-title': 'Our Culture',
        'our-culture-subtitle': 'Building an environment where innovation thrives and people excel',
        'culture-innovation-first': 'Innovation First',
        'culture-innovation-first-desc': 'We encourage creative thinking and provide resources for breakthrough innovations.',
        'culture-collaboration': 'Collaboration',
        'culture-collaboration-desc': 'Cross-functional teamwork drives our success across all business units.',
        'culture-learning': 'Continuous Learning',
        'culture-learning-desc': 'We invest in our people\'s growth through training and development programs.',
        'culture-global-impact': 'Global Impact',
        'culture-global-impact-desc': 'Our work creates positive change in communities around the world.',
        'awards-title': 'Awards & Recognition',
        'awards-subtitle': 'Industry recognition for our commitment to excellence',

        // Contact page
        'contact-hero-subtitle': 'Let\'s start a conversation about your next big opportunity',
        'contact-hq': 'Headquarters',
        'label-address': 'Address',
        'label-phone': 'Phone',
        'label-email': 'Email',
        'label-hours': 'Hours',
        'contact-regional-offices': 'Regional Offices',
        'ny-office': 'New York Office',
        'london-office': 'London Office',
        'tokyo-office': 'Tokyo Office',
        'contact-support-title': '24/7 Support',
        'label-emergency': 'Emergency',
        'label-support': 'Support',
        'label-media': 'Media',
        'label-careers': 'Careers',
        'contact-form-title': 'Get In Touch',
        'contact-form-subtitle': 'Ready to explore opportunities with B3 Company LTD?',
        'ph-first-name': 'First Name *',
        'ph-last-name': 'Last Name *',
        'ph-email': 'Email Address *',
        'ph-phone': 'Phone Number',
        'ph-company': 'Company/Organization',
        'select-inquiry': 'Select Inquiry Type',
        'opt-general': 'General Information',
        'opt-partnership': 'Partnership Opportunities',
        'opt-investment': 'Investment Inquiries',
        'opt-media': 'Media & Press',
        'opt-careers': 'Career Opportunities',
        'opt-support': 'Technical Support',
        'ph-message': 'Your Message *',
        'send-message': 'Send Message',
        'sending': 'Sending...',
        'thank-you': 'Thank you for your message! We will get back to you soon.',
        'err-fill-fields': 'Please fill in all fields.',
        'err-email': 'Please enter a valid email address.',

        // Barnakap page
        'barnakap-hero-subtitle': 'Premium Dining Experience',
        'view-menu': 'View Menu',
        'make-reservation': 'Make Reservation',
        'about-barnakap-title': 'About Barnakap City',
        'about-barnakap-subtitle': 'Where culinary artistry meets exceptional hospitality',
        'menu-title': 'Our Menu',
        'menu-subtitle': 'Discover our signature dishes and seasonal specialties',
        'appetizers': 'Appetizers',
        'main-courses': 'Main Courses',
        'reservations-title': 'Reservations',
        'reservations-subtitle': 'Book your table for an unforgettable dining experience',
        'restaurant-info-title': 'Restaurant Information',
        'address-label': 'Address',
        'reservations-label': 'Reservations',
        'hours-label': 'Hours',
        'reservation-form-title': 'Make a Reservation',
        'ph-name': 'Name',
        'guests-2': '2 Guests',
        'guests-4': '4 Guests',
        'guests-6': '6 Guests',
        'guests-8': '8+ Guests',
        'ph-special-requests': 'Special Requests',
        'make-reservation-btn': 'Make Reservation',
        'back-to-company': 'Back to B3 Company'
    },
    fr: {
        // Navigation
        'nav-home': 'Accueil',
        'nav-about': 'À Propos',
        'nav-services': 'Services',
        'nav-services-label': 'Services :',
        'nav-contact': 'Contact',
        'explore': 'Explorer',
        'coming-soon': 'Bientôt disponible',
        'services-barnakap': 'B3 Barnakap City (Restaurant)',
        'services-rock': 'B3 Rock Tivi (Télévision)',
        'services-music': 'B3 Music Industry',
        'services-future': 'Service Futur',
        
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
        'copyright': '© 2024 B3 Company LTD. Tous droits réservés. Innovation par la Diversité.',

        // Footer quick links items
        'footer-home': 'Accueil',
        'footer-about': 'À Propos',
        'footer-contact': 'Contact',

        // About page
        'about-hero-subtitle': 'Pionnier de l\'innovation dans diverses industries avec excellence et intégrité',
        'our-story-title': 'Notre Histoire',
        'our-story-p1': 'Fondée avec la vision de révolutionner plusieurs industries, B3 Company LTD est passée d\'une petite start-up à un conglomérat diversifié. Notre parcours a commencé avec une simple conviction : l\'innovation prospère lorsque des talents et des industries divers se rencontrent.',
        'our-story-p2': 'Depuis nos débuts, nous repoussons constamment les limites, adoptons de nouvelles technologies et favorisons la créativité dans toutes nos activités. Des expériences culinaires haut de gamme au divertissement de pointe, nous apportons l\'excellence à chaque secteur.',
        'our-story-p3': 'Aujourd\'hui, B3 Company LTD est la preuve de la puissance de la diversification, de l\'innovation et d\'un engagement indéfectible envers la qualité.',
        'established': 'Fondée en 2015',
        'established-desc': 'Près d\'une décennie d\'innovation et de croissance',
        'stats-industries': 'Industries',
        'stats-employees': 'Employés',
        'stats-revenue': 'Revenus',
        'stats-countries': 'Pays',
        'foundation-title': 'Nos Fondations',
        'foundation-subtitle': 'Les principes qui guident tout ce que nous faisons',
        'mission-title': 'Mission',
        'mission-desc': 'Créer une valeur exceptionnelle dans diverses industries en tirant parti de l\'innovation, en développant les talents et en offrant des expériences inégalées qui dépassent les attentes et stimulent une croissance durable.',
        'vision-title': 'Vision',
        'vision-desc': 'Être l\'entreprise diversifiée la plus innovante et respectée au monde, fixant les standards du secteur et inspirant un changement positif grâce à notre engagement envers l\'excellence et la responsabilité sociale.',
        'values-title': 'Valeurs',
        'values-item-1': '• Innovation & Créativité',
        'values-item-2': '• Intégrité & Transparence',
        'values-item-3': '• Excellence & Qualité',
        'values-item-4': '• Diversité & Inclusion',
        'values-item-5': '• Durabilité & Responsabilité',
        'leadership-title': 'Équipe de Direction',
        'leadership-subtitle': 'Des leaders visionnaires qui stimulent l\'innovation dans toutes nos activités',
        'position-ceo': 'Directrice Générale',
        'position-cto': 'Directeur Technique',
        'position-coo': 'Directrice des Opérations',
        'position-cfo': 'Directeur Financier',
        'position-cmo': 'Directrice Marketing',
        'position-chro': 'Directeur des Ressources Humaines',
        'our-culture-title': 'Notre Culture',
        'our-culture-subtitle': 'Créer un environnement où l\'innovation prospère et où les personnes excellent',
        'culture-innovation-first': 'L\'innovation d\'abord',
        'culture-innovation-first-desc': 'Nous encourageons la pensée créative et fournissons des ressources pour des innovations majeures.',
        'culture-collaboration': 'Collaboration',
        'culture-collaboration-desc': 'Le travail d\'équipe interfonctionnel stimule notre réussite dans toutes les unités commerciales.',
        'culture-learning': 'Apprentissage continu',
        'culture-learning-desc': 'Nous investissons dans la croissance de nos équipes grâce à des programmes de formation et de développement.',
        'culture-global-impact': 'Impact mondial',
        'culture-global-impact-desc': 'Notre travail crée un changement positif dans les communautés du monde entier.',
        'awards-title': 'Prix & Distinctions',
        'awards-subtitle': 'Reconnaissance du secteur pour notre engagement envers l\'excellence',

        // Contact page
        'contact-hero-subtitle': 'Commençons une conversation à propos de votre prochaine grande opportunité',
        'contact-hq': 'Siège social',
        'label-address': 'Adresse',
        'label-phone': 'Téléphone',
        'label-email': 'E-mail',
        'label-hours': 'Horaires',
        'contact-regional-offices': 'Bureaux régionaux',
        'ny-office': 'Bureau de New York',
        'london-office': 'Bureau de Londres',
        'tokyo-office': 'Bureau de Tokyo',
        'contact-support-title': 'Support 24/7',
        'label-emergency': 'Urgences',
        'label-support': 'Support',
        'label-media': 'Médias',
        'label-careers': 'Carrières',
        'contact-form-title': 'Nous Contacter',
        'contact-form-subtitle': 'Prêt à explorer des opportunités avec B3 Company LTD ?',
        'ph-first-name': 'Prénom *',
        'ph-last-name': 'Nom *',
        'ph-email': 'Adresse e-mail *',
        'ph-phone': 'Numéro de téléphone',
        'ph-company': 'Entreprise/Organisation',
        'select-inquiry': 'Choisir le type de demande',
        'opt-general': 'Informations générales',
        'opt-partnership': 'Opportunités de partenariat',
        'opt-investment': 'Demandes d\'investissement',
        'opt-media': 'Médias & Presse',
        'opt-careers': 'Opportunités de carrière',
        'opt-support': 'Support technique',
        'ph-message': 'Votre message *',
        'send-message': 'Envoyer le message',
        'sending': 'Envoi...',
        'thank-you': 'Merci pour votre message ! Nous vous répondrons prochainement.',
        'err-fill-fields': 'Veuillez remplir tous les champs.',
        'err-email': 'Veuillez saisir une adresse e-mail valide.',

        // Barnakap page
        'barnakap-hero-subtitle': 'Expérience culinaire premium',
        'view-menu': 'Voir le menu',
        'make-reservation': 'Réserver',
        'about-barnakap-title': 'À propos de Barnakap City',
        'about-barnakap-subtitle': 'Quand l\'art culinaire rencontre une hospitalité d\'exception',
        'menu-title': 'Notre Menu',
        'menu-subtitle': 'Découvrez nos plats signatures et nos spécialités de saison',
        'appetizers': 'Entrées',
        'main-courses': 'Plats principaux',
        'reservations-title': 'Réservations',
        'reservations-subtitle': 'Réservez votre table pour une expérience inoubliable',
        'restaurant-info-title': 'Informations du restaurant',
        'address-label': 'Adresse',
        'reservations-label': 'Réservations',
        'hours-label': 'Horaires',
        'reservation-form-title': 'Faire une réservation',
        'ph-name': 'Nom',
        'guests-2': '2 personnes',
        'guests-4': '4 personnes',
        'guests-6': '6 personnes',
        'guests-8': '8+ personnes',
        'ph-special-requests': 'Demandes particulières',
        'make-reservation-btn': 'Réserver',
        'back-to-company': 'Retour à B3 Company'
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

    // Update placeholders
    document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
        const key = element.getAttribute('data-translate-placeholder');
        if (translations[lang] && translations[lang][key]) {
            element.setAttribute('placeholder', translations[lang][key]);
        }
    });

    // Update option values/text for selects
    document.querySelectorAll('option[data-translate]').forEach(option => {
        const key = option.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            option.textContent = translations[lang][key];
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

    // Update language switcher button labels (all instances)
    const currentLang = savedLang === 'en' ? 'EN' : 'FR';
    document.querySelectorAll('.language-switcher-btn').forEach(btn => {
        btn.innerHTML = `🌐<span class="lang-code">${currentLang}</span>`;
    });
}

// Export functions for use in other scripts
window.B3Utils = {
    showNotification,
    switchLanguage,
    initializeLanguage
};
