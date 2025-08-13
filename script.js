// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Update ARIA attributes
            const isExpanded = navMenu.classList.contains('active');
            navToggle.setAttribute('aria-expanded', isExpanded);
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header background on scroll
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = 'none';
            }
        });
    }
    
    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // WhatsApp float button animation
    const whatsappFloat = document.querySelector('.whatsapp-float');
    if (whatsappFloat) {
        // Add pulse animation on page load
        setTimeout(() => {
            whatsappFloat.style.animation = 'pulse 2s infinite';
        }, 3000);
        
        // Remove animation on hover
        whatsappFloat.addEventListener('mouseenter', function() {
            this.style.animation = 'none';
        });
        
        whatsappFloat.addEventListener('mouseleave', function() {
            this.style.animation = 'pulse 2s infinite';
        });
    }
    
    // Form validation and enhancement (if forms are added later)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                    field.setAttribute('aria-invalid', 'true');
                } else {
                    field.classList.remove('error');
                    field.setAttribute('aria-invalid', 'false');
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                const firstError = form.querySelector('.error');
                if (firstError) {
                    firstError.focus();
                }
            }
        });
    });
    
    // Keyboard navigation enhancement
    document.addEventListener('keydown', function(e) {
        // Skip to main content with Tab key
        if (e.key === 'Tab' && !e.shiftKey && document.activeElement === document.body) {
            const mainContent = document.querySelector('main');
            if (mainContent) {
                mainContent.focus();
            }
        }
        
        // Close mobile menu with Escape key
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.focus();
        }
    });
    
    // Performance optimization: Debounced scroll handler
    let scrollTimeout;
    function debounceScroll(func, wait) {
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(scrollTimeout);
                func(...args);
            };
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(later, wait);
        };
    }
    
    // Scroll-based animations (subtle)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Apply fade-in animation to sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeInObserver.observe(section);
    });
    
    // Preload critical resources
    const criticalImages = [
        'img/hero-contemplative.jpg'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
});

// CSS Animation for WhatsApp button pulse
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% {
            transform: scale(1);
            box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3);
        }
        50% {
            transform: scale(1.05);
            box-shadow: 0 6px 20px rgba(37, 211, 102, 0.4);
        }
        100% {
            transform: scale(1);
            box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3);
        }
    }
`;
document.head.appendChild(style);

