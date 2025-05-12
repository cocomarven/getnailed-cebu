// Mobile Menu Toggle
const navToggle = document.querySelector('.nav__toggle');
const navMenu = document.querySelector('.nav__menu');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scroll for anchor links
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

// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (entry.target.classList.contains('gallery__item')) {
                const img = entry.target.querySelector('img');
                if (img) {
                    img.classList.add('loaded');
                }
            }
        }
    });
}, observerOptions);

// Observe all animated elements
document.addEventListener('DOMContentLoaded', () => {
    // Observe section headers
    document.querySelectorAll('.section__header').forEach(el => {
        el.classList.add('animate-on-scroll', 'animate-up');
        observer.observe(el);
    });

    // Observe service cards
    document.querySelectorAll('.service-card').forEach(el => {
        observer.observe(el);
    });

    // Observe gallery items
    document.querySelectorAll('.gallery__item').forEach(el => {
        observer.observe(el);
    });

    // Observe contact cards
    document.querySelectorAll('.contact__card').forEach(el => {
        observer.observe(el);
    });

    // Add scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    // Update scroll progress
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        if (hero) {
            hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
        }
    });

    // Add loading animation for images
    document.querySelectorAll('.gallery__item img').forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
    });
});

// Form validation
const contactForm = document.querySelector('.contact__form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Basic form validation
        const formData = new FormData(contactForm);
        let isValid = true;
        
        for (let [key, value] of formData.entries()) {
            if (!value && key !== 'phone') {
                isValid = false;
                const input = contactForm.querySelector(`[name="${key}"]`);
                input.classList.add('error');
            }
        }
        
        if (isValid) {
            // Here you would typically send the form data to a server
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        } else {
            alert('Please fill in all required fields.');
        }
    });
    
    // Remove error class on input
    contactForm.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('input', () => {
            input.classList.remove('error');
        });
    });
}

// Messenger button handling
const messengerBtn = document.getElementById('messengerBtn');
if (messengerBtn) {
    messengerBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Show loading state
        const originalText = this.textContent;
        this.textContent = 'Opening Messenger...';
        this.style.pointerEvents = 'none';
        
        // Create and show loading overlay
        const overlay = document.createElement('div');
        overlay.className = 'messenger-overlay';
        document.body.appendChild(overlay);
        
        // Delay the redirect slightly to show the loading state
        setTimeout(() => {
            window.open(this.href, '_blank');
            
            // Reset button state
            this.textContent = originalText;
            this.style.pointerEvents = 'auto';
            
            // Remove overlay
            overlay.remove();
        }, 1000);
    });
} 