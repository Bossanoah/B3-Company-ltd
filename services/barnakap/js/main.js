// Barnakap City JavaScript Functionality

// Initialize footer functionality
function initFooter() {
    // Add any footer-specific JavaScript here
    console.log('Footer initialized');
}

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        // Toggle mobile menu
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            mobileMenu.classList.toggle('hidden');
            
            // Toggle between menu and close icon
            const menuIcon = mobileMenuBtn.querySelector('svg');
            if (menuIcon) {
                if (mobileMenu.classList.contains('hidden')) {
                    menuIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
                } else {
                    menuIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>';
                }
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                mobileMenu.classList.add('hidden');
                const menuIcon = mobileMenuBtn.querySelector('svg');
                if (menuIcon) {
                    menuIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
                }
            }
        });
        
        // Prevent menu from closing when clicking inside it
        mobileMenu.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }

    // Specials dropdown toggle
    const specialsDropdown = document.getElementById('specialsDropdown');
    const specialsMenu = document.getElementById('specialsMenu');
    
    if (specialsDropdown && specialsMenu) {
        specialsDropdown.addEventListener('click', function(e) {
            e.preventDefault();
            specialsMenu.classList.toggle('hidden');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!specialsDropdown.contains(e.target) && !specialsMenu.contains(e.target)) {
                specialsMenu.classList.add('hidden');
            }
        });
    }

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

        // Initialize page-specific functionality
    initializePageSpecific();
    
    // Initialize back to top button
    initBackToTopButton();
    
    // Initialize language switcher if i18n is available
    if (typeof i18n !== 'undefined') {
        i18n.init();
    } else {
        // If i18n is not available yet, wait for it
        const checkI18n = setInterval(() => {
            if (typeof i18n !== 'undefined') {
                i18n.init();
                clearInterval(checkI18n);
            }
        }, 100);
        
        // Stop checking after 5 seconds to prevent infinite loop
        setTimeout(() => {
            clearInterval(checkI18n);
        }, 5000);
    }
});

// Back to top button functionality
function initBackToTopButton() {
    // Check if button already exists
    if (document.getElementById('backToTopBtn')) {
        return;
    }
    
    // Create back to top button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.id = 'backToTopBtn';
    backToTopBtn.className = 'fixed bottom-8 right-8 bg-b3-red hover:bg-b3-dark-red text-white p-3 rounded-full shadow-lg transition-all duration-300 opacity-0 invisible z-50';
    backToTopBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
    `;
    
    // Set aria-label with translation support
    const ariaLabel = typeof i18n !== 'undefined' ? i18n.t('btn.backToTop') : 'Back to top';
    backToTopBtn.setAttribute('aria-label', ariaLabel);
    backToTopBtn.setAttribute('title', ariaLabel);
    
    document.body.appendChild(backToTopBtn);
    
    // Show/hide button based on scroll position
    function toggleBackToTopButton() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.remove('opacity-0', 'invisible');
            backToTopBtn.classList.add('opacity-100', 'visible');
        } else {
            backToTopBtn.classList.remove('opacity-100', 'visible');
            backToTopBtn.classList.add('opacity-0', 'invisible');
        }
    }
    
    // Scroll to top when button is clicked
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add scroll event listener
    window.addEventListener('scroll', toggleBackToTopButton);
    
    // Initial check
    toggleBackToTopButton();
}

function initializePageSpecific() {
    const currentPage = window.location.pathname.split('/').pop();
    
    switch(currentPage) {
        case 'reservations.html':
            initializeReservationForm();
            break;
        case 'contact.html':
            initializeContactForm();
            break;
        case 'reviews.html':
            initializeReviewSystem();
            break;
        case 'events.html':
            initializeEventCountdown();
            break;
        default:
            // Home page or other pages
            initializeHomePageFeatures();
    }
}

// Reservation Form Functionality
function initializeReservationForm() {
    const reservationForm = document.getElementById('reservationForm');
    if (!reservationForm) return;

    reservationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            date: document.getElementById('date').value,
            time: document.getElementById('time').value,
            guests: document.getElementById('guests').value,
            type: document.getElementById('reservationType').value,
            specialRequests: document.getElementById('specialRequests').value
        };

        if (validateReservationForm(formData)) {
            submitReservation(formData);
        }
    });

    // Set minimum date to today
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
}

function validateReservationForm(data) {
    const errors = [];

    if (!data.name.trim()) errors.push('Name is required');
    if (!data.email.trim()) errors.push('Email is required');
    if (!isValidEmail(data.email)) errors.push('Please enter a valid email');
    if (!data.phone.trim()) errors.push('Phone number is required');
    if (!data.date) errors.push('Date is required');
    if (!data.time) errors.push('Time is required');
    if (!data.guests || data.guests < 1) errors.push('Number of guests is required');

    if (errors.length > 0) {
        showMessage(errors.join('<br>'), 'error');
        return false;
    }

    return true;
}

function submitReservation(data) {
    showLoadingSpinner();
    
    // Simulate API call
    setTimeout(() => {
        hideLoadingSpinner();
        showMessage('Reservation submitted successfully! We will confirm your booking within 24 hours.', 'success');
        document.getElementById('reservationForm').reset();
        
        // Store reservation in localStorage for demo purposes
        const reservations = JSON.parse(localStorage.getItem('barnakap_reservations') || '[]');
        reservations.push({
            ...data,
            id: Date.now(),
            status: 'pending',
            createdAt: new Date().toISOString()
        });
        localStorage.setItem('barnakap_reservations', JSON.stringify(reservations));
    }, 2000);
}

// Contact Form Functionality
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('contactName').value,
            email: document.getElementById('contactEmail').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        if (validateContactForm(formData)) {
            submitContactForm(formData);
        }
    });
}

function validateContactForm(data) {
    const errors = [];

    if (!data.name.trim()) errors.push('Name is required');
    if (!data.email.trim()) errors.push('Email is required');
    if (!isValidEmail(data.email)) errors.push('Please enter a valid email');
    if (!data.subject.trim()) errors.push('Subject is required');
    if (!data.message.trim()) errors.push('Message is required');

    if (errors.length > 0) {
        showMessage(errors.join('<br>'), 'error');
        return false;
    }

    return true;
}

function submitContactForm(data) {
    showLoadingSpinner();
    
    // Simulate API call
    setTimeout(() => {
        hideLoadingSpinner();
        showMessage('Thank you for your message! We will get back to you soon.', 'success');
        document.getElementById('contactForm').reset();
    }, 2000);
}

// Review System Functionality
function initializeReviewSystem() {
    const reviewForm = document.getElementById('reviewForm');
    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            submitReview();
        });
    }

    initializeStarRating();
    initializeCategoryRatings();
    initializeReviewFilters();
    displayReviews();
    updateReviewStats();
}

function initializeStarRating() {
    const stars = document.querySelectorAll('.star-rating .star');
    let currentRating = 0;

    stars.forEach((star, index) => {
        star.addEventListener('click', function() {
            currentRating = index + 1;
            updateMainStarDisplay(currentRating);
            document.getElementById('rating').value = currentRating;
        });

        star.addEventListener('mouseover', function() {
            updateMainStarDisplay(index + 1);
        });
    });

    const starContainer = document.querySelector('.star-rating');
    if (starContainer) {
        starContainer.addEventListener('mouseleave', function() {
            updateMainStarDisplay(currentRating);
        });
    }
}

function initializeCategoryRatings() {
    const categories = ['food', 'service', 'atmosphere'];
    
    categories.forEach(category => {
        const stars = document.querySelectorAll(`[data-category="${category}"]`);
        let categoryRating = 0;

        stars.forEach((star, index) => {
            star.addEventListener('click', function() {
                categoryRating = index + 1;
                updateCategoryStarDisplay(category, categoryRating);
                document.getElementById(`${category}Rating`).value = categoryRating;
            });

            star.addEventListener('mouseover', function() {
                updateCategoryStarDisplay(category, index + 1);
            });
        });

        const categoryContainer = stars[0]?.parentElement;
        if (categoryContainer) {
            categoryContainer.addEventListener('mouseleave', function() {
                updateCategoryStarDisplay(category, categoryRating);
            });
        }
    });
}

function updateMainStarDisplay(rating) {
    const stars = document.querySelectorAll('.star-rating .star');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
            star.style.color = '#F59E0B';
        } else {
            star.classList.remove('active');
            star.style.color = '#6B7280';
        }
    });
}

function updateCategoryStarDisplay(category, rating) {
    const stars = document.querySelectorAll(`[data-category="${category}"]`);
    stars.forEach((star, index) => {
        if (index < rating) {
            star.style.color = '#F59E0B';
        } else {
            star.style.color = '#6B7280';
        }
    });
}

function submitReview() {
    const reviewData = {
        name: document.getElementById('reviewerName').value,
        visitDate: document.getElementById('visitDate').value,
        rating: parseInt(document.getElementById('rating').value),
        venue: document.getElementById('venue').value,
        comment: document.getElementById('reviewComment').value,
        foodRating: parseInt(document.getElementById('foodRating').value) || 0,
        serviceRating: parseInt(document.getElementById('serviceRating').value) || 0,
        atmosphereRating: parseInt(document.getElementById('atmosphereRating').value) || 0,
        recommend: document.getElementById('recommend').checked,
        date: new Date().toLocaleDateString(),
        timestamp: Date.now(),
        id: Date.now()
    };

    if (!reviewData.name.trim() || !reviewData.rating || !reviewData.comment.trim()) {
        showMessage('Please fill in all required fields and select a rating.', 'error');
        return;
    }

    // Store review in localStorage
    const reviews = JSON.parse(localStorage.getItem('barnakap_reviews') || '[]');
    reviews.unshift(reviewData);
    localStorage.setItem('barnakap_reviews', JSON.stringify(reviews));

    showMessage('Thank you for your review! Your feedback helps us improve.', 'success');
    document.getElementById('reviewForm').reset();
    resetAllStarRatings();
    
    displayReviews();
    updateReviewStats();
}

function resetAllStarRatings() {
    updateMainStarDisplay(0);
    updateCategoryStarDisplay('food', 0);
    updateCategoryStarDisplay('service', 0);
    updateCategoryStarDisplay('atmosphere', 0);
    document.getElementById('rating').value = '';
    document.getElementById('foodRating').value = '';
    document.getElementById('serviceRating').value = '';
    document.getElementById('atmosphereRating').value = '';
}

function initializeReviewFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            filterReviews(filter);
            
            // Update active button
            filterButtons.forEach(b => {
                b.classList.remove('bg-barnakap-red');
                b.classList.add('bg-gray-700');
            });
            this.classList.remove('bg-gray-700');
            this.classList.add('bg-barnakap-red');
        });
    });
}

function filterReviews(filter) {
    const reviews = JSON.parse(localStorage.getItem('barnakap_reviews') || '[]');
    let filteredReviews = reviews;

    switch(filter) {
        case 'restaurant':
        case 'nightclub':
        case 'cookhouse':
            filteredReviews = reviews.filter(review => review.venue === filter);
            break;
        case '5-star':
            filteredReviews = reviews.filter(review => review.rating === 5);
            break;
        case 'recent':
            filteredReviews = reviews.sort((a, b) => b.timestamp - a.timestamp).slice(0, 10);
            break;
        case 'all':
        default:
            filteredReviews = reviews;
    }

    displayFilteredReviews(filteredReviews);
}

function displayReviews() {
    const reviews = JSON.parse(localStorage.getItem('barnakap_reviews') || '[]');
    displayFilteredReviews(reviews);
}

function displayFilteredReviews(reviews) {
    const reviewsContainer = document.getElementById('reviewsContainer');
    if (!reviewsContainer) return;

    // Keep the sample reviews at the top, then add user reviews
    const sampleReviewsHtml = `
        <div class="bg-gray-900 rounded-lg p-6 border border-gray-700">
            <div class="flex justify-between items-start mb-3">
                <div>
                    <h4 class="text-lg font-semibold text-barnakap-gold">Sarah Johnson</h4>
                    <span class="text-sm text-gray-400">Restaurant • 2 days ago</span>
                </div>
                <div class="flex items-center">
                    <span class="star active">★</span>
                    <span class="star active">★</span>
                    <span class="star active">★</span>
                    <span class="star active">★</span>
                    <span class="star active">★</span>
                </div>
            </div>
            <p class="text-gray-300 mb-3">
                Absolutely incredible dining experience! The wagyu ribeye was cooked to perfection, 
                and the service was impeccable. The ambiance is perfect for a romantic dinner. 
                Will definitely be returning soon!
            </p>
            <div class="flex space-x-4 text-sm text-gray-400">
                <span>Food: ★★★★★</span>
                <span>Service: ★★★★★</span>
                <span>Atmosphere: ★★★★★</span>
            </div>
        </div>

        <div class="bg-gray-900 rounded-lg p-6 border border-gray-700">
            <div class="flex justify-between items-start mb-3">
                <div>
                    <h4 class="text-lg font-semibold text-barnakap-gold">Michael Chen</h4>
                    <span class="text-sm text-gray-400">Night Club • 1 week ago</span>
                </div>
                <div class="flex items-center">
                    <span class="star active">★</span>
                    <span class="star active">★</span>
                    <span class="star active">★</span>
                    <span class="star active">★</span>
                    <span class="star">★</span>
                </div>
            </div>
            <p class="text-gray-300 mb-3">
                Great night out with friends! The DJ was fantastic, and the VIP service was top-notch. 
                The cocktails were creative and delicious. Only minor complaint is it gets quite crowded 
                on weekends, but that's expected for such a popular spot.
            </p>
            <div class="flex space-x-4 text-sm text-gray-400">
                <span>Music: ★★★★★</span>
                <span>Service: ★★★★☆</span>
                <span>Atmosphere: ★★★★☆</span>
            </div>
        </div>

        <div class="bg-gray-900 rounded-lg p-6 border border-gray-700">
            <div class="flex justify-between items-start mb-3">
                <div>
                    <h4 class="text-lg font-semibold text-barnakap-gold">Amara Okafor</h4>
                    <span class="text-sm text-gray-400">Cook House • 3 days ago</span>
                </div>
                <div class="flex items-center">
                    <span class="star active">★</span>
                    <span class="star active">★</span>
                    <span class="star active">★</span>
                    <span class="star active">★</span>
                    <span class="star active">★</span>
                </div>
            </div>
            <p class="text-gray-300 mb-3">
                Mama Sarah's cooking brings back so many childhood memories! The jollof rice was 
                authentic and perfectly seasoned. The family-style dining really creates a warm, 
                communal atmosphere. This place is a treasure for anyone wanting genuine traditional cuisine.
            </p>
            <div class="flex space-x-4 text-sm text-gray-400">
                <span>Food: ★★★★★</span>
                <span>Service: ★★★★★</span>
                <span>Atmosphere: ★★★★★</span>
            </div>
        </div>
    `;
    
    if (reviews.length === 0) {
        reviewsContainer.innerHTML = sampleReviewsHtml;
        return;
    }

    const userReviewsHtml = reviews.map(review => `
        <div class="bg-gray-900 rounded-lg p-6 border border-gray-700">
            <div class="flex justify-between items-start mb-3">
                <div>
                    <h4 class="text-lg font-semibold text-barnakap-gold">${escapeHtml(review.name)}</h4>
                    <span class="text-sm text-gray-400">${getVenueDisplayName(review.venue)} • ${review.date}</span>
                </div>
                <div class="flex items-center">
                    ${generateStars(review.rating)}
                </div>
            </div>
            <p class="text-gray-300 mb-3">${escapeHtml(review.comment)}</p>
            ${review.foodRating || review.serviceRating || review.atmosphereRating ? `
                <div class="flex space-x-4 text-sm text-gray-400">
                    ${review.foodRating ? `<span>Food: ${generateStars(review.foodRating)}</span>` : ''}
                    ${review.serviceRating ? `<span>Service: ${generateStars(review.serviceRating)}</span>` : ''}
                    ${review.atmosphereRating ? `<span>Atmosphere: ${generateStars(review.atmosphereRating)}</span>` : ''}
                </div>
            ` : ''}
            ${review.recommend ? '<div class="mt-2 text-green-400 text-sm">✓ Recommends Barnakap City</div>' : ''}
        </div>
    `).join('');

    reviewsContainer.innerHTML = sampleReviewsHtml + userReviewsHtml;
}

function updateReviewStats() {
    const reviews = JSON.parse(localStorage.getItem('barnakap_reviews') || '[]');
    const totalReviewsElement = document.getElementById('totalReviews');
    const recommendPercentageElement = document.getElementById('recommendPercentage');
    
    if (totalReviewsElement) {
        totalReviewsElement.textContent = reviews.length;
    }
    
    if (recommendPercentageElement && reviews.length > 0) {
        const recommendCount = reviews.filter(review => review.recommend).length;
        const percentage = Math.round((recommendCount / reviews.length) * 100);
        recommendPercentageElement.textContent = `${percentage}%`;
    }
}

function getVenueDisplayName(venue) {
    const venueNames = {
        'restaurant': 'Restaurant',
        'nightclub': 'Night Club',
        'cookhouse': 'Cook House',
        'multiple': 'Multiple Venues'
    };
    return venueNames[venue] || 'Barnakap City';
}

function generateStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        stars += `<span class="star ${i <= rating ? 'active' : ''}" style="pointer-events: none;">★</span>`;
    }
    return stars;
}

// Event Countdown Functionality
function initializeEventCountdown() {
    const countdownElements = document.querySelectorAll('[data-countdown]');
    
    countdownElements.forEach(element => {
        const targetDate = new Date(element.getAttribute('data-countdown'));
        updateCountdown(element, targetDate);
        
        setInterval(() => {
            updateCountdown(element, targetDate);
        }, 1000);
    });
}

function updateCountdown(element, targetDate) {
    const now = new Date().getTime();
    const distance = targetDate.getTime() - now;

    if (distance < 0) {
        element.innerHTML = 'Event Started!';
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    element.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

// Home Page Features
function initializeHomePageFeatures() {
    // Add fade-in animation to sections
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        observer.observe(section);
    });
}

// Utility Functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `${type}-message fixed top-4 right-4 z-50 max-w-md`;
    messageDiv.innerHTML = message;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

function showLoadingSpinner() {
    const spinner = document.createElement('div');
    spinner.id = 'loadingSpinner';
    spinner.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    spinner.innerHTML = '<div class="loading-spinner"></div>';
    
    document.body.appendChild(spinner);
}

function hideLoadingSpinner() {
    const spinner = document.getElementById('loadingSpinner');
    if (spinner) {
        spinner.remove();
    }
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

// Menu filtering functionality
function filterMenu(category) {
    const menuItems = document.querySelectorAll('.menu-item');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Update active button
    filterButtons.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-filter="${category}"]`).classList.add('active');
    
    // Filter items
    menuItems.forEach(item => {
        if (category === 'all' || item.classList.contains(category)) {
            item.style.display = 'block';
            item.classList.add('fade-in-up');
        } else {
            item.style.display = 'none';
        }
    });
}

// Initialize menu filtering if on menu page
if (window.location.pathname.includes('menu.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const category = this.getAttribute('data-filter');
                filterMenu(category);
            });
        });
    });
}
