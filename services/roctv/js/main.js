// RocTV Main JavaScript Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
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
                    // Show hamburger menu icon
                    menuIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
                } else {
                    // Show X close icon
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
                    // Reset to hamburger icon
                    menuIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
                }
            }
        });
        
        // Prevent menu from closing when clicking inside it
        mobileMenu.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }

    // Close mobile menu when clicking on a link
    const mobileLinks = mobileMenu?.querySelectorAll('a');
    if (mobileLinks) {
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                const menuIcon = mobileMenuBtn?.querySelector('svg');
                if (menuIcon) {
                    // Reset to hamburger icon
                    menuIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
                }
            });
        });
    }

    // Initialize back to top button
    initBackToTopButton();

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
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

    // Initialize page-specific functionality
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    switch (currentPage) {
        case 'schedule.html':
            initSchedulePage();
            break;
        case 'events.html':
            initEventsPage();
            break;
        case 'reviews.html':
            initReviewsPage();
            break;
        case 'contact.html':
            initContactPage();
            break;
        case 'live.html':
            initLivePage();
            break;
    }

    // Add scroll animations
    initScrollAnimations();
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
    backToTopBtn.className = 'fixed bottom-8 right-8 bg-roc-red hover:bg-roc-dark-red text-white p-3 rounded-full shadow-lg transition-all duration-300 opacity-0 invisible z-50 transform hover:scale-110';
    backToTopBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
    `;
    
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    backToTopBtn.setAttribute('title', 'Back to top');
    
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

// Schedule Page Functionality
function initSchedulePage() {
    const dayFilters = document.querySelectorAll('.day-filter');
    const scheduleRows = document.querySelectorAll('.schedule-row');
    
    dayFilters?.forEach(filter => {
        filter.addEventListener('click', function() {
            const day = this.dataset.day;
            
            // Update active filter
            dayFilters.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            
            // Filter schedule rows
            scheduleRows?.forEach(row => {
                if (day === 'all' || row.dataset.day === day) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    });
}

// Events Page Functionality
function initEventsPage() {
    const countdownElements = document.querySelectorAll('.countdown');
    
    countdownElements?.forEach(element => {
        const eventDate = new Date(element.dataset.date);
        startCountdown(element, eventDate);
    });
}

function startCountdown(element, targetDate) {
    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = targetDate.getTime() - now;
        
        if (distance < 0) {
            element.innerHTML = '<div class="text-center"><span class="text-roc-red font-bold">Event Started!</span></div>';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        element.innerHTML = `
            <div class="countdown-timer">
                <div class="countdown-item">
                    <span class="countdown-number">${days}</span>
                    <span class="countdown-label">Days</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-number">${hours}</span>
                    <span class="countdown-label">Hours</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-number">${minutes}</span>
                    <span class="countdown-label">Minutes</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-number">${seconds}</span>
                    <span class="countdown-label">Seconds</span>
                </div>
            </div>
        `;
    };
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Reviews Page Functionality
function initReviewsPage() {
    const reviewForm = document.getElementById('reviewForm');
    const reviewsList = document.getElementById('reviewsList');
    
    if (reviewForm) {
        // Star rating functionality
        const stars = document.querySelectorAll('.star');
        let selectedRating = 0;
        
        stars.forEach((star, index) => {
            star.addEventListener('click', function() {
                selectedRating = index + 1;
                updateStarDisplay();
            });
            
            star.addEventListener('mouseover', function() {
                highlightStars(index + 1);
            });
        });
        
        const starContainer = document.querySelector('.star-rating');
        if (starContainer) {
            starContainer.addEventListener('mouseleave', function() {
                updateStarDisplay();
            });
        }
        
        function highlightStars(rating) {
            stars.forEach((star, index) => {
                star.classList.toggle('active', index < rating);
            });
        }
        
        function updateStarDisplay() {
            highlightStars(selectedRating);
        }
        
        // Form submission
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('reviewName').value;
            const comment = document.getElementById('reviewComment').value;
            
            if (!name || !comment || selectedRating === 0) {
                showAlert('Please fill in all fields and select a rating.', 'error');
                return;
            }
            
            const review = {
                id: Date.now(),
                name: name,
                rating: selectedRating,
                comment: comment,
                date: new Date().toLocaleDateString()
            };
            
            saveReview(review);
            displayReview(review);
            reviewForm.reset();
            selectedRating = 0;
            updateStarDisplay();
            showAlert('Thank you for your review!', 'success');
        });
    }
    
    // Load existing reviews
    loadReviews();
}

function saveReview(review) {
    const reviews = getReviews();
    reviews.unshift(review); // Add to beginning
    localStorage.setItem('roctv_reviews', JSON.stringify(reviews));
}

function getReviews() {
    const reviews = localStorage.getItem('roctv_reviews');
    return reviews ? JSON.parse(reviews) : [];
}

function loadReviews() {
    const reviews = getReviews();
    const reviewsList = document.getElementById('reviewsList');
    
    if (reviewsList) {
        reviewsList.innerHTML = '';
        
        if (reviews.length === 0) {
            reviewsList.innerHTML = '<p class="text-gray-400 text-center">No reviews yet. Be the first to leave a review!</p>';
        } else {
            reviews.forEach(review => displayReview(review));
        }
    }
}

function displayReview(review) {
    const reviewsList = document.getElementById('reviewsList');
    if (!reviewsList) return;
    
    const reviewElement = document.createElement('div');
    reviewElement.className = 'review-card mb-6';
    reviewElement.innerHTML = `
        <div class="flex justify-between items-start mb-3">
            <div>
                <h4 class="font-bold text-white">${escapeHtml(review.name)}</h4>
                <div class="flex items-center gap-2">
                    <div class="star-rating">
                        ${generateStars(review.rating)}
                    </div>
                    <span class="text-sm text-gray-400">${review.date}</span>
                </div>
            </div>
        </div>
        <p class="text-gray-300">${escapeHtml(review.comment)}</p>
    `;
    
    reviewsList.prepend(reviewElement);
}

function generateStars(rating) {
    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
        starsHtml += `<span class="star ${i <= rating ? 'active' : ''}" style="pointer-events: none;">★</span>`;
    }
    return starsHtml;
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

// Contact Page Functionality
function initContactPage() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('contactName').value;
            const email = document.getElementById('contactEmail').value;
            const message = document.getElementById('contactMessage').value;
            
            if (!name || !email || !message) {
                showAlert('Please fill in all fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showAlert('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission
            showAlert('Thank you for your message! We will get back to you soon.', 'success');
            contactForm.reset();
        });
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Live Page Functionality
function initLivePage() {
    const liveStatus = document.getElementById('liveStatus');
    const currentShow = document.getElementById('currentShow');
    
    // Simulate live status updates
    if (liveStatus) {
        setInterval(() => {
            const isLive = Math.random() > 0.2; // 80% chance of being live
            liveStatus.textContent = isLive ? 'LIVE' : 'OFFLINE';
            liveStatus.className = isLive ? 
                'live-indicator bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold' : 
                'bg-gray-600 text-white px-3 py-1 rounded-full text-sm font-bold';
        }, 10000); // Update every 10 seconds
    }
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeInUp');
            }
        });
    }, observerOptions);
    
    // Observe elements with animation classes
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Utility Functions
function showAlert(message, type = 'info') {
    const alertContainer = document.getElementById('alertContainer') || createAlertContainer();
    
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.innerHTML = `
        <div class="flex justify-between items-center">
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" class="text-lg font-bold hover:opacity-75">&times;</button>
        </div>
    `;
    
    alertContainer.appendChild(alert);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (alert.parentElement) {
            alert.remove();
        }
    }, 5000);
}

function createAlertContainer() {
    const container = document.createElement('div');
    container.id = 'alertContainer';
    container.className = 'fixed top-20 right-4 z-50 max-w-md';
    document.body.appendChild(container);
    return container;
}

// Show/Hide loading spinner
function showLoading(element) {
    const spinner = document.createElement('div');
    spinner.className = 'spinner mx-auto';
    spinner.id = 'loadingSpinner';
    element.appendChild(spinner);
}

function hideLoading() {
    const spinner = document.getElementById('loadingSpinner');
    if (spinner) {
        spinner.remove();
    }
}

// Format date helper
function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Show category filter functionality for shows page
function filterShows(category) {
    const shows = document.querySelectorAll('.show-card');
    const filters = document.querySelectorAll('.category-filter');
    
    // Update active filter
    filters.forEach(filter => {
        filter.classList.remove('bg-roc-red', 'text-white');
        filter.classList.add('bg-roc-gray', 'text-gray-300');
    });
    
    const activeFilter = document.querySelector(`[data-category="${category}"]`);
    if (activeFilter) {
        activeFilter.classList.remove('bg-roc-gray', 'text-gray-300');
        activeFilter.classList.add('bg-roc-red', 'text-white');
    }
    
    // Filter shows
    shows.forEach(show => {
        if (category === 'all' || show.dataset.category === category) {
            show.style.display = 'block';
            show.classList.add('animate-fadeInUp');
        } else {
            show.style.display = 'none';
        }
    });
}

// Search functionality
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    
    if (searchInput) {
        let searchTimeout;
        
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            const query = this.value.trim().toLowerCase();
            
            if (query.length < 2) {
                searchResults.innerHTML = '';
                return;
            }
            
            searchTimeout = setTimeout(() => {
                performSearch(query);
            }, 300);
        });
    }
}

function performSearch(query) {
    const searchableElements = document.querySelectorAll('[data-searchable]');
    const results = [];
    
    searchableElements.forEach(element => {
        const text = element.textContent.toLowerCase();
        if (text.includes(query)) {
            results.push({
                title: element.dataset.title || element.textContent.substring(0, 50),
                url: element.dataset.url || '#',
                type: element.dataset.type || 'content'
            });
        }
    });
    
    displaySearchResults(results, query);
}

function displaySearchResults(results, query) {
    const searchResults = document.getElementById('searchResults');
    if (!searchResults) return;
    
    if (results.length === 0) {
        searchResults.innerHTML = `<p class="text-gray-400 p-4">No results found for "${query}"</p>`;
        return;
    }
    
    const resultsHTML = results.map(result => `
        <a href="${result.url}" class="block p-4 hover:bg-roc-gray transition-colors">
            <div class="font-semibold text-white">${result.title}</div>
            <div class="text-sm text-gray-400">${result.type}</div>
        </a>
    `).join('');
    
    searchResults.innerHTML = resultsHTML;
}