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

// Export functions for use in other scripts
window.B3Utils = {
    showNotification
};
