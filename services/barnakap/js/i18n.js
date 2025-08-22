// i18n Configuration for Barnakap City
const i18n = {
    // Default language (English)
    defaultLang: 'en',
    currentLang: 'en',
    
    // Available languages
    languages: ['en', 'fr'],
    
    // Translations
    translations: {
        en: {
            // Navigation
            'nav.home': 'Home',
            'nav.menu': 'Menu',
            'nav.reservations': 'Reservations',
            'nav.about': 'About Us',
            'nav.contact': 'Contact',
            'nav.specials': 'Specials',
            'nav.nightclub': 'Night Club',
            'nav.cookhouse': 'Cook House',
            'nav.events': 'Events & Offers',
            'nav.reviews': 'Reviews',
            
            // Hero Section
            'hero.title': 'Barnakap City',
            'hero.subtitle': 'Dine, Dance & Delight',
            'hero.description': 'Experience the ultimate fusion of fine dining, electrifying nightlife, and authentic cuisine',
            'hero.cta.reservation': 'Make Reservation',
            'hero.cta.menu': 'View Menu',
            
            // Footer
            'footer.about.title': 'About Barnakap',
            'footer.about.description': 'Your ultimate destination for fine dining, entertainment, and unforgettable experiences in the heart of the city.',
            'footer.quicklinks.title': 'Quick Links',
            'footer.contact.title': 'Contact Us',
            'footer.contact.address': '123 Barnakap Street, City, Country',
            'footer.contact.phone': '+1 234 567 890',
            'footer.contact.email': 'info@barnakapcity.com',
            'footer.hours.title': 'Opening Hours',
            'footer.hours.weekdays': 'Mon - Fri: 10:00 AM - 2:00 AM',
            'footer.hours.weekend': 'Sat - Sun: 12:00 PM - 4:00 AM',
            'footer.copyright': '© 2023 Barnakap City. All rights reserved.'
        },
        fr: {
            // Navigation
            'nav.home': 'Accueil',
            'nav.menu': 'Menu',
            'nav.reservations': 'Réservations',
            'nav.about': 'À Propos',
            'nav.contact': 'Contact',
            'nav.specials': 'Spéciaux',
            'nav.nightclub': 'Boîte de Nuit',
            'nav.cookhouse': 'Restaurant',
            'nav.events': 'Événements & Offres',
            'nav.reviews': 'Avis',
            
            // Hero Section
            'hero.title': 'Barnakap City',
            'hero.subtitle': 'Dîner, Danser & Se Délasser',
            'hero.description': 'Découvrez la fusion ultime de la gastronomie raffinée, de la vie nocturne électrisante et de la cuisine authentique',
            'hero.cta.reservation': 'Réserver',
            'hero.cta.menu': 'Voir le Menu',
            
            // Footer
            'footer.about.title': 'À Propos de Barnakap',
            'footer.about.description': 'Votre destination ultime pour une cuisine raffinée, des divertissements et des expériences inoubliables au cœur de la ville.',
            'footer.quicklinks.title': 'Liens Rapides',
            'footer.contact.title': 'Contactez-nous',
            'footer.contact.address': '123 Rue Barnakap, Ville, Pays',
            'footer.contact.phone': '+1 234 567 890',
            'footer.contact.email': 'info@barnakapcity.com',
            'footer.hours.title': 'Heures d\'Ouverture',
            'footer.hours.weekdays': 'Lun - Ven: 10h00 - 2h00',
            'footer.hours.weekend': 'Sam - Dim: 12h00 - 4h00',
            'footer.copyright': '© 2023 Barnakap City. Tous droits réservés.'
        }
    },
    
    // Initialize i18n
    init() {
        // Load saved language or use browser language
        this.currentLang = localStorage.getItem('barnakap-lang') || 
                          (navigator.language.startsWith('fr') ? 'fr' : this.defaultLang);
        
        // Apply translations
        this.applyTranslations();
        
        // Set up event listeners for language switcher
        this.setupLanguageSwitcher();
    },
    
    // Apply translations to the page
    applyTranslations() {
        // Update html lang attribute
        document.documentElement.lang = this.currentLang;
        
        // Find all elements with data-i18n attribute and update their content
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (key in this.translations[this.currentLang]) {
                element.textContent = this.translations[this.currentLang][key];
            } else if (key in this.translations[this.defaultLang]) {
                element.textContent = this.translations[this.defaultLang][key];
            }
        });
        
        // Update all elements with data-i18n-attr
        document.querySelectorAll('[data-i18n-attr]').forEach(element => {
            const attrMap = JSON.parse(element.getAttribute('data-i18n-attr'));
            Object.entries(attrMap).forEach(([attr, key]) => {
                if (key in this.translations[this.currentLang]) {
                    element.setAttribute(attr, this.translations[this.currentLang][key]);
                } else if (key in this.translations[this.defaultLang]) {
                    element.setAttribute(attr, this.translations[this.defaultLang][key]);
                }
            });
        });
        
        // Update the active language indicator in the language switcher
        this.updateLanguageSwitcher();
    },
    
    // Set up the language switcher
    setupLanguageSwitcher() {
        // Desktop language switcher
        const languageSwitcher = document.getElementById('languageSwitcher');
        const languageMenu = document.getElementById('languageMenu');
        
        if (languageSwitcher && languageMenu) {
            // Toggle language menu
            languageSwitcher.addEventListener('click', (e) => {
                e.stopPropagation();
                languageMenu.classList.toggle('hidden');
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', () => {
                languageMenu.classList.add('hidden');
            });
            
            // Prevent menu from closing when clicking inside it
            languageMenu.addEventListener('click', (e) => {
                e.stopPropagation();
            });
            
            // Handle language selection
            languageMenu.querySelectorAll('button[data-lang]').forEach(button => {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    const lang = button.getAttribute('data-lang');
                    this.setLanguage(lang);
                    languageMenu.classList.add('hidden');
                });
            });
        }
        
        // Mobile language switcher
        document.querySelectorAll('#mobileMenu button[data-lang]').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = button.getAttribute('data-lang');
                this.setLanguage(lang);
            });
        });
    },
    
    // Update the active language in the language switcher
    updateLanguageSwitcher() {
        // Update desktop language switcher
        const languageSwitcher = document.getElementById('languageSwitcher');
        if (languageSwitcher) {
            const flagClass = this.currentLang === 'fr' ? 'fi-fr' : 'fi-gb';
            languageSwitcher.innerHTML = `
                <span class="fi ${flagClass} mr-1"></span> ${this.currentLang.toUpperCase()}
                <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            `;
        }
        
        // Update mobile language switcher active state
        document.querySelectorAll('#mobileMenu [data-lang]').forEach(button => {
            if (button.getAttribute('data-lang') === this.currentLang) {
                button.classList.add('font-bold', 'text-gold');
            } else {
                button.classList.remove('font-bold', 'text-gold');
            }
        });
    },
    
    // Change the current language
    setLanguage(lang) {
        if (this.languages.includes(lang) && lang !== this.currentLang) {
            this.currentLang = lang;
            localStorage.setItem('barnakap-lang', lang);
            this.applyTranslations();
        }
    },
    
    // Get a translation by key
    t(key) {
        return this.translations[this.currentLang][key] || 
               this.translations[this.defaultLang][key] || 
               key;
    }
};

// Initialize i18n when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    i18n.init();
});

// Make i18n available globally
window.i18n = i18n;
