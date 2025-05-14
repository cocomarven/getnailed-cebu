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

// Gallery Carousel
document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.gallery__track');
    const items = document.querySelectorAll('.gallery__item');
    const prevButton = document.querySelector('.gallery__button--prev');
    const nextButton = document.querySelector('.gallery__button--next');
    const dotsContainer = document.querySelector('.gallery__dots');
    
    let currentIndex = 0;
    let itemsPerView = 4;
    let autoScrollInterval;
    
    // Create dots
    const totalDots = Math.ceil(items.length / itemsPerView);
    for (let i = 0; i < totalDots; i++) {
        const dot = document.createElement('button');
        dot.classList.add('gallery__dot');
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        dotsContainer.appendChild(dot);
    }
    
    const dots = document.querySelectorAll('.gallery__dot');
    
    // Update dots
    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Update active items
    function updateActiveItems() {
        items.forEach((item, index) => {
            const isActive = index >= currentIndex * itemsPerView && 
                           index < (currentIndex * itemsPerView) + itemsPerView;
            item.classList.toggle('active', isActive);
        });
    }
    
    // Scroll to position
    function scrollToPosition(index) {
        const itemWidth = items[0].offsetWidth + parseInt(getComputedStyle(items[0]).marginRight);
        track.style.transform = `translateX(-${index * itemWidth * itemsPerView}px)`;
        currentIndex = index;
        updateDots();
        updateActiveItems();
    }
    
    // Next slide
    function nextSlide() {
        const maxIndex = Math.ceil(items.length / itemsPerView) - 1;
        currentIndex = currentIndex === maxIndex ? 0 : currentIndex + 1;
        scrollToPosition(currentIndex);
    }
    
    // Previous slide
    function prevSlide() {
        const maxIndex = Math.ceil(items.length / itemsPerView) - 1;
        currentIndex = currentIndex === 0 ? maxIndex : currentIndex - 1;
        scrollToPosition(currentIndex);
    }
    
    // Auto scroll
    function startAutoScroll() {
        stopAutoScroll();
        autoScrollInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }
    
    function stopAutoScroll() {
        if (autoScrollInterval) {
            clearInterval(autoScrollInterval);
        }
    }
    
    // Event listeners
    nextButton.addEventListener('click', () => {
        nextSlide();
        startAutoScroll(); // Reset timer when manually changing slides
    });
    
    prevButton.addEventListener('click', () => {
        prevSlide();
        startAutoScroll(); // Reset timer when manually changing slides
    });
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            scrollToPosition(index);
            startAutoScroll(); // Reset timer when manually changing slides
        });
    });
    
    // Pause auto-scroll on hover
    track.addEventListener('mouseenter', stopAutoScroll);
    track.addEventListener('mouseleave', startAutoScroll);
    
    // Update items per view based on screen size
    function updateItemsPerView() {
        if (window.innerWidth <= 480) {
            itemsPerView = 1;
        } else if (window.innerWidth <= 768) {
            itemsPerView = 2;
        } else if (window.innerWidth <= 1024) {
            itemsPerView = 3;
        } else {
            itemsPerView = 4;
        }
        scrollToPosition(0); // Reset position when screen size changes
    }
    
    // Initialize
    updateItemsPerView();
    updateDots();
    updateActiveItems();
    startAutoScroll();
    
    // Update on window resize
    window.addEventListener('resize', updateItemsPerView);
}); 