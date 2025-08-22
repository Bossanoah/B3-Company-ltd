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
            
            // Page Titles
            'page.reservations.title': 'Make a Reservation',
            'page.reservations.subtitle': 'Reserve your table for an unforgettable dining experience',
            'page.menu.title': 'Our Menu',
            'page.menu.subtitle': 'Discover our exquisite culinary offerings',
            'page.about.title': 'About Us',
            'page.about.subtitle': 'Learn more about Barnakap City',
            'page.contact.title': 'Contact Us',
            'page.contact.subtitle': 'Get in touch with us',
            'page.nightclub.title': 'Night Club',
            'page.nightclub.subtitle': 'Experience electrifying nightlife',
            'page.cookhouse.title': 'Cook House',
            'page.cookhouse.subtitle': 'Traditional authentic cuisine',
            'page.events.title': 'Events & Offers',
            'page.events.subtitle': 'Special events and exclusive offers',
            'page.reviews.title': 'Reviews',
            'page.reviews.subtitle': 'What our guests say about us',
            
            // Form Labels
            'form.name': 'Full Name',
            'form.email': 'Email',
            'form.phone': 'Phone Number',
            'form.date': 'Date',
            'form.time': 'Time',
            'form.guests': 'Number of Guests',
            'form.message': 'Message',
            'form.subject': 'Subject',
            'form.submit': 'Submit',
            'form.required': 'Required',
            
            // Buttons
            'btn.backToTop': 'Back to Top',
            'btn.selectLanguage': 'Select Language',
            'btn.english': 'English',
            'btn.french': 'Français',
            'btn.bookTable': 'Book Table',
            'btn.getTickets': 'Get Tickets',
            'btn.reserveNow': 'Reserve Now',
            'btn.bookPremium': 'Book Premium',
            'btn.contactUs': 'Contact Us',
            'btn.joinParty': 'Join Party',
            'btn.loadMore': 'Load More Reviews',
            'btn.submitReview': 'Submit Review',
            
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
            'footer.copyright': '© 2023 Barnakap City. All rights reserved.',
            
            // Content Sections
            'content.whereNightComesAlive': 'Where the night comes alive',
            'content.clubGallery': 'Club Gallery',
            'content.experienceElectrifying': 'Experience the electrifying atmosphere',
            'content.weeklyEvents': 'Weekly Events',
            'content.somethingExciting': 'Something exciting every night',
            'content.vipServices': 'VIP Services',
            'content.elevateYourNight': 'Elevate your night with exclusive experiences',
            'content.specialEvents': 'Special Events',
            'content.dontMissExclusive': 'Don\'t miss these exclusive nights',
            'content.clubGuidelines': 'Club Guidelines',
            'content.reviewPolicies': 'Please review our policies for a safe and enjoyable experience',
            'content.dressCode': 'Dress Code',
            'content.entryRequirements': 'Entry Requirements',
            'content.guestReviews': 'GUEST REVIEWS',
            'content.shareExperience': 'Share your experience with us',
            'content.feedbackHelps': 'Your feedback helps us serve you better',
            'content.leaveReview': 'Leave a Review',
            'content.whatGuestsSay': 'What Our Guests Say',
            'content.realReviews': 'Real reviews from real customers',
            'content.reviewGuidelines': 'Review Guidelines',
            'content.helpMaintain': 'Help us maintain a respectful community',
            'content.pleaseDo': '✓ Please Do',
            'content.pleaseDont': '✗ Please Don\'t',
            
            // Additional content translations
            'content.fineDining': 'Fine Dining Experience',
            'content.indulgeCulinary': 'Indulge in our exquisite culinary creations crafted by world-class chefs. Our restaurant offers an elegant atmosphere perfect for romantic dinners, business meetings, and special celebrations.',
            'content.premiumIngredients': 'Premium ingredients sourced locally',
            'content.awardWinningChef': 'Award-winning chef team',
            'content.elegantAtmosphere': 'Elegant dining atmosphere',
            'content.electrifyingNightlife': 'Electrifying Nightlife',
            'content.danceNightAway': 'Dance the night away in our state-of-the-art nightclub featuring top DJs, premium sound systems, and an atmosphere that pulses with energy. VIP sections available for the ultimate experience.',
            'content.liveDJ': 'Live DJ performances every night',
            'content.premiumSound': 'Premium sound and lighting systems',
            'content.vipBottleService': 'VIP bottle service available',
            'content.traditionalCookHouse': 'Traditional Cook House',
            'content.authenticFlavors': 'Experience authentic local flavors in our traditional cook house. We serve time-honored recipes passed down through generations, perfect for family gatherings and cultural dining experiences.',
            'content.authenticDishes': 'Authentic local dishes',
            'content.familyStyle': 'Family-style dining',
            'content.weekendSpecials': 'Weekend specials',
            'content.upcomingEvents': 'Upcoming Events',
            'content.dontMissEvents': 'Don\'t miss out on our exciting events and special offers',
            'content.djNight': 'DJ Night',
            'content.everyFriday': 'Every Friday - Live DJ performances with the hottest beats',
            'content.karaokeNight': 'Karaoke Night',
            'content.singHeartOut': 'Sing your heart out every Saturday night',
            'content.afroBeats': 'Afro Beats',
            'content.authenticRhythms': 'Authentic African rhythms and dance',
            
            // Gallery items
            'content.mainDanceFloor': 'Main Dance Floor',
            'content.vipLounge': 'VIP Lounge',
            'content.djBooth': 'DJ Booth',
            'content.barArea': 'Bar Area',
            'content.privateBooths': 'Private Booths',
            'content.lightShow': 'Light Show'
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
            
            // Page Titles
            'page.reservations.title': 'Faire une Réservation',
            'page.reservations.subtitle': 'Réservez votre table pour une expérience culinaire inoubliable',
            'page.menu.title': 'Notre Menu',
            'page.menu.subtitle': 'Découvrez nos offres culinaires exquises',
            'page.about.title': 'À Propos',
            'page.about.subtitle': 'En savoir plus sur Barnakap City',
            'page.contact.title': 'Contactez-nous',
            'page.contact.subtitle': 'Entrez en contact avec nous',
            'page.nightclub.title': 'Boîte de Nuit',
            'page.nightclub.subtitle': 'Découvrez une vie nocturne électrisante',
            'page.cookhouse.title': 'Restaurant',
            'page.cookhouse.subtitle': 'Cuisine traditionnelle authentique',
            'page.events.title': 'Événements & Offres',
            'page.events.subtitle': 'Événements spéciaux et offres exclusives',
            'page.reviews.title': 'Avis',
            'page.reviews.subtitle': 'Ce que nos clients disent de nous',
            
            // Form Labels
            'form.name': 'Nom Complet',
            'form.email': 'Email',
            'form.phone': 'Numéro de Téléphone',
            'form.date': 'Date',
            'form.time': 'Heure',
            'form.guests': 'Nombre d\'Invités',
            'form.message': 'Message',
            'form.subject': 'Sujet',
            'form.submit': 'Envoyer',
            'form.required': 'Requis',
            
            // Buttons
            'btn.backToTop': 'Retour en Haut',
            'btn.selectLanguage': 'Sélectionner la Langue',
            'btn.english': 'English',
            'btn.french': 'Français',
            'btn.bookTable': 'Réserver une Table',
            'btn.getTickets': 'Obtenir des Billets',
            'btn.reserveNow': 'Réserver Maintenant',
            'btn.bookPremium': 'Réserver Premium',
            'btn.contactUs': 'Nous Contacter',
            'btn.joinParty': 'Rejoindre la Fête',
            'btn.loadMore': 'Charger Plus d\'Avis',
            'btn.submitReview': 'Soumettre un Avis',
            
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
            'footer.copyright': '© 2023 Barnakap City. Tous droits réservés.',
            
            // Content Sections
            'content.whereNightComesAlive': 'Où la nuit prend vie',
            'content.clubGallery': 'Galerie du Club',
            'content.experienceElectrifying': 'Découvrez l\'atmosphère électrisante',
            'content.weeklyEvents': 'Événements Hebdomadaires',
            'content.somethingExciting': 'Quelque chose d\'excitant chaque nuit',
            'content.vipServices': 'Services VIP',
            'content.elevateYourNight': 'Élevez votre nuit avec des expériences exclusives',
            'content.specialEvents': 'Événements Spéciaux',
            'content.dontMissExclusive': 'Ne manquez pas ces nuits exclusives',
            'content.clubGuidelines': 'Directives du Club',
            'content.reviewPolicies': 'Veuillez consulter nos politiques pour une expérience sûre et agréable',
            'content.dressCode': 'Code Vestimentaire',
            'content.entryRequirements': 'Exigences d\'Entrée',
            'content.guestReviews': 'AVIS DES CLIENTS',
            'content.shareExperience': 'Partagez votre expérience avec nous',
            'content.feedbackHelps': 'Vos commentaires nous aident à mieux vous servir',
            'content.leaveReview': 'Laisser un Avis',
            'content.whatGuestsSay': 'Ce que nos clients disent',
            'content.realReviews': 'De vrais avis de vrais clients',
            'content.reviewGuidelines': 'Directives d\'Avis',
            'content.helpMaintain': 'Aidez-nous à maintenir une communauté respectueuse',
            'content.pleaseDo': '✓ Veuillez Faire',
            'content.pleaseDont': '✗ Veuillez Ne Pas Faire',
            
            // Additional content translations
            'content.fineDining': 'Expérience de Gastronomie',
            'content.indulgeCulinary': 'Savourez nos créations culinaires exquises préparées par des chefs de classe mondiale. Notre restaurant offre une atmosphère élégante parfaite pour les dîners romantiques, les réunions d\'affaires et les célébrations spéciales.',
            'content.premiumIngredients': 'Ingrédients premium d\'origine locale',
            'content.awardWinningChef': 'Équipe de chefs primés',
            'content.elegantAtmosphere': 'Atmosphère de restauration élégante',
            'content.electrifyingNightlife': 'Vie Nocturne Électrisante',
            'content.danceNightAway': 'Dansez toute la nuit dans notre boîte de nuit de pointe avec les meilleurs DJ, des systèmes audio premium et une atmosphère qui pulse d\'énergie. Sections VIP disponibles pour l\'expérience ultime.',
            'content.liveDJ': 'Performances DJ en direct tous les soirs',
            'content.premiumSound': 'Systèmes audio et d\'éclairage premium',
            'content.vipBottleService': 'Service de bouteilles VIP disponible',
            'content.traditionalCookHouse': 'Restaurant Traditionnel',
            'content.authenticFlavors': 'Découvrez des saveurs locales authentiques dans notre restaurant traditionnel. Nous servons des recettes transmises de génération en génération, parfaites pour les rassemblements familiaux et les expériences culinaires culturelles.',
            'content.authenticDishes': 'Plats locaux authentiques',
            'content.familyStyle': 'Restauration familiale',
            'content.weekendSpecials': 'Spéciaux du week-end',
            'content.upcomingEvents': 'Événements à Venir',
            'content.dontMissEvents': 'Ne manquez pas nos événements passionnants et offres spéciales',
            'content.djNight': 'Soirée DJ',
            'content.everyFriday': 'Tous les vendredis - Performances DJ en direct avec les meilleurs rythmes',
            'content.karaokeNight': 'Soirée Karaoké',
            'content.singHeartOut': 'Chantez à cœur ouvert tous les samedis soir',
            'content.afroBeats': 'Rythmes Afro',
            'content.authenticRhythms': 'Rythmes africains authentiques et danse',
            
            // Gallery items
            'content.mainDanceFloor': 'Piste de Danse Principale',
            'content.vipLounge': 'Salon VIP',
            'content.djBooth': 'Cabine DJ',
            'content.barArea': 'Zone Bar',
            'content.privateBooths': 'Loges Privées',
            'content.lightShow': 'Spectacle de Lumières'
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
        const languageDropdown = document.getElementById('languageDropdown');
        
        if (languageSwitcher && languageDropdown) {
            // Toggle language dropdown
            languageSwitcher.addEventListener('click', (e) => {
                e.stopPropagation();
                languageDropdown.classList.toggle('hidden');
            });
            
            // Close dropdown when clicking outside
            document.addEventListener('click', () => {
                languageDropdown.classList.add('hidden');
            });
            
            // Prevent dropdown from closing when clicking inside it
            languageDropdown.addEventListener('click', (e) => {
                e.stopPropagation();
            });
            
            // Handle language selection
            languageDropdown.querySelectorAll('a[data-lang]').forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const lang = link.getAttribute('data-lang');
                    this.setLanguage(lang);
                    languageDropdown.classList.add('hidden');
                });
            });
        }
        
        // Mobile language switcher
        document.querySelectorAll('#mobileMenu a[data-lang]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = link.getAttribute('data-lang');
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
            const langText = this.currentLang.toUpperCase();
            languageSwitcher.innerHTML = `
                <span class="fi ${flagClass} mr-1"></span>
                <span class="text-sm">${langText}</span>
                <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            `;
        }
        
        // Update mobile language switcher active state
        document.querySelectorAll('#mobileMenu [data-lang]').forEach(link => {
            if (link.getAttribute('data-lang') === this.currentLang) {
                link.classList.add('font-bold', 'text-gold');
            } else {
                link.classList.remove('font-bold', 'text-gold');
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

// Make i18n available globally
window.i18n = i18n;
