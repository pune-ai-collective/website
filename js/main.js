/**
 * Pune AI Collective - Main JavaScript
 * Core functionality including smooth scrolling, scroll animations, and utilities
 * Vanilla JS with modern ES6+ syntax and progressive enhancement
 */

'use strict';

// Site configuration
const siteConfig = {
    siteName: "Pune AI Collective",
    mission: "To empower Pune's AI community by facilitating knowledge sharing, collaborative projects, and skill development through accessible events and resources, enabling members to innovate, grow professionally, and apply AI solutions that address local and global needs.",
    vision: "To establish Pune as a globally recognized epicenter of AI innovation, where a thriving ecosystem of diverse talents propels groundbreaking advancements, inspires the next generation of AI leaders, and positions the city at the forefront of technological transformation.",
    social: {
        linkedin: "https://www.linkedin.com/groups/11802260/",
        whatsapp: "https://chat.whatsapp.com/JKVSE67goMv2baHH4RYkDl",
        github: "https://github.com/pune-ai-collective"
    },
    theme: {
        primaryColor: "#000000",
        secondaryColor: "#666666",
        backgroundColor: "#ffffff",
        fontFamily: "'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif"
    }
};

// Main application class
class PuneAICollective {
    constructor() {
        this.isInitialized = false;
        this.scrollPosition = 0;
        this.isScrolling = false;
        
        // Feature detection
        this.features = {
            smoothScroll: 'scrollBehavior' in document.documentElement.style,
            intersectionObserver: 'IntersectionObserver' in window,
            webAnimations: 'animate' in document.createElement('div')
        };
        
        this.init();
    }
    
    /**
     * Initialize the application
     */
    init() {
        if (this.isInitialized) return;
        
        try {
            console.log('Initializing Pune AI Collective website...');
            
            // Wait for DOM to be ready
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.setupApplication());
            } else {
                this.setupApplication();
            }
            
        } catch (error) {
            console.error('Error initializing application:', error);
            this.handleError(error);
        }
    }
    
    /**
     * Setup the main application functionality
     */
    setupApplication() {
        try {
            // Core functionality setup
            this.setupSmoothScrolling();
            this.setupScrollAnimations();
            this.setupNavigationHighlighting();
            this.setupPerformanceOptimizations();
            this.setupAccessibilityEnhancements();
            
            // Mark as initialized
            this.isInitialized = true;
            console.log('Pune AI Collective website initialized successfully');
            
            // Dispatch custom event for other modules
            document.dispatchEvent(new CustomEvent('siteInitialized', {
                detail: { config: siteConfig, features: this.features }
            }));
            
        } catch (error) {
            console.error('Error setting up application:', error);
            this.handleError(error);
        }
    }
    
    /**
     * Setup smooth scrolling functionality
     */
    setupSmoothScrolling() {
        // Enable CSS smooth scrolling if supported
        if (this.features.smoothScroll) {
            document.documentElement.style.scrollBehavior = 'smooth';
        }
        
        // Enhanced smooth scrolling for navigation links
        this.setupNavigationScrolling();
    }
    
    /**
     * Setup navigation link scrolling with enhanced UX
     */
    setupNavigationScrolling() {
        // Handle all navigation links with hash targets
        document.addEventListener('click', (event) => {
            const link = event.target.closest('a[href^="#"]');
            if (!link) return;
            
            const targetId = link.getAttribute('href').slice(1);
            if (!targetId) return;
            
            const targetElement = document.getElementById(targetId);
            if (!targetElement) return;
            
            event.preventDefault();
            
            // Smooth scroll to target with offset for sticky navigation
            this.scrollToElement(targetElement);
            
            // Update browser history
            if (history.replaceState) {
                history.replaceState(null, null, `#${targetId}`);
            }
            
            // Update navigation active state
            this.updateActiveNavigation(targetId);
            
            // Set focus for accessibility
            this.setAccessibleFocus(targetElement);
        });
    }
    
    /**
     * Scroll to element with proper offset and timing
     */
    scrollToElement(element, offset = 80) {
        const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
        const targetPosition = elementTop - offset;
        
        if (this.features.smoothScroll) {
            // Use native smooth scrolling
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        } else {
            // Fallback smooth scrolling animation
            this.animateScroll(targetPosition);
        }
    }
    
    /**
     * Fallback smooth scrolling animation for older browsers
     */
    animateScroll(targetPosition, duration = 800) {
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const startTime = performance.now();
        
        const animation = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (ease-out-quart)
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            
            window.scrollTo(0, startPosition + (distance * easeOutQuart));
            
            if (progress < 1) {
                requestAnimationFrame(animation);
            }
        };
        
        requestAnimationFrame(animation);
    }
    
    /**
     * Setup scroll-triggered animations
     */
    setupScrollAnimations() {
        if (!this.features.intersectionObserver) {
            // Fallback for browsers without IntersectionObserver
            this.setupFallbackScrollAnimations();
            return;
        }
        
        // Observer for section reveal animations
        const observerOptions = {
            root: null,
            rootMargin: '-10% 0px -10% 0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    
                    // Unobserve after animation to improve performance
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe all content sections
        const sections = document.querySelectorAll('.content-section');
        sections.forEach(section => observer.observe(section));
        
        // Observer for navigation highlighting
        this.setupNavigationObserver();
    }
    
    /**
     * Setup navigation highlighting based on scroll position
     */
    setupNavigationObserver() {
        const sections = document.querySelectorAll('section[id]');
        if (sections.length === 0) return;
        
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -70% 0px',
            threshold: 0
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.updateActiveNavigation(entry.target.id);
                }
            });
        }, observerOptions);
        
        sections.forEach(section => observer.observe(section));
    }
    
    /**
     * Update active navigation state
     */
    updateActiveNavigation(activeId) {
        // Remove active class from all nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => link.classList.remove('active'));
        
        // Add active class to current section link
        const activeLink = document.querySelector(`.nav-link[href="#${activeId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
    
    /**
     * Set accessible focus for screen readers
     */
    setAccessibleFocus(element) {
        // Set tabindex for focus and remove after blur
        element.setAttribute('tabindex', '-1');
        element.focus();
        
        const removeFocus = () => {
            element.removeAttribute('tabindex');
            element.removeEventListener('blur', removeFocus);
        };
        
        element.addEventListener('blur', removeFocus);
    }
    
    /**
     * Fallback scroll animations for browsers without IntersectionObserver
     */
    setupFallbackScrollAnimations() {
        let ticking = false;
        
        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.updateScrollAnimations();
                    ticking = false;
                });
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', handleScroll, { passive: true });
    }
    
    /**
     * Update scroll animations for fallback
     */
    updateScrollAnimations() {
        const sections = document.querySelectorAll('.content-section');
        const scrollTop = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        sections.forEach(section => {
            const elementTop = section.getBoundingClientRect().top + scrollTop;
            const elementBottom = elementTop + section.offsetHeight;
            
            // Check if element is in view
            if (scrollTop + windowHeight > elementTop + 100 && 
                scrollTop < elementBottom - 100) {
                section.classList.add('in-view');
            }
        });
    }
    
    /**
     * Setup performance optimizations
     */
    setupPerformanceOptimizations() {
        // Lazy load images if any are added later
        this.setupLazyLoading();
        
        // Throttle resize events
        this.setupResizeThrottling();
        
        // Preload critical resources
        this.preloadCriticalResources();
    }
    
    /**
     * Setup lazy loading for images
     */
    setupLazyLoading() {
        if ('loading' in HTMLImageElement.prototype) {
            // Native lazy loading support
            const images = document.querySelectorAll('img[data-src]');
            images.forEach(img => {
                img.loading = 'lazy';
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            });
        } else if (this.features.intersectionObserver) {
            // IntersectionObserver fallback for lazy loading
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            const lazyImages = document.querySelectorAll('img[data-src]');
            lazyImages.forEach(img => imageObserver.observe(img));
        }
    }
    
    /**
     * Setup throttled resize handling
     */
    setupResizeThrottling() {
        let resizeTimer = null;
        
        window.addEventListener('resize', () => {
            if (resizeTimer) {
                clearTimeout(resizeTimer);
            }
            
            resizeTimer = setTimeout(() => {
                this.handleResize();
            }, 150);
        }, { passive: true });
    }
    
    /**
     * Handle window resize events
     */
    handleResize() {
        // Dispatch custom resize event for other modules
        document.dispatchEvent(new CustomEvent('optimizedResize', {
            detail: {
                width: window.innerWidth,
                height: window.innerHeight
            }
        }));
    }
    
    /**
     * Preload critical resources
     */
    preloadCriticalResources() {
        // Preload Google Fonts if not already loaded
        if (!document.querySelector('link[href*="fonts.googleapis.com"]')) {
            const fontLink = document.createElement('link');
            fontLink.rel = 'preload';
            fontLink.as = 'style';
            fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap';
            document.head.appendChild(fontLink);
        }
    }
    
    /**
     * Setup accessibility enhancements
     */
    setupAccessibilityEnhancements() {
        // Enhanced keyboard navigation
        this.setupKeyboardNavigation();
        
        // Skip link functionality
        this.setupSkipLink();
        
        // ARIA live regions for dynamic content
        this.setupLiveRegions();
    }
    
    /**
     * Setup enhanced keyboard navigation
     */
    setupKeyboardNavigation() {
        // Handle escape key to close mobile menu (handled in navigation.js)
        // Handle arrow keys for navigation (optional enhancement)
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Tab') {
                // Ensure focus is visible
                document.body.classList.add('using-keyboard');
            }
        });
        
        // Remove keyboard class on mouse use
        document.addEventListener('mousedown', () => {
            document.body.classList.remove('using-keyboard');
        });
    }
    
    /**
     * Setup skip link functionality
     */
    setupSkipLink() {
        const skipLink = document.querySelector('.skip-link');
        if (!skipLink) return;
        
        skipLink.addEventListener('click', (event) => {
            event.preventDefault();
            const target = document.getElementById('main-content');
            if (target) {
                target.setAttribute('tabindex', '-1');
                target.focus();
                target.addEventListener('blur', () => {
                    target.removeAttribute('tabindex');
                }, { once: true });
            }
        });
    }
    
    /**
     * Setup ARIA live regions for dynamic content
     */
    setupLiveRegions() {
        // Create a live region for announcements
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        liveRegion.id = 'live-region';
        document.body.appendChild(liveRegion);
        
        // Store reference for other modules to use
        this.liveRegion = liveRegion;
    }
    
    /**
     * Announce message to screen readers
     */
    announce(message, priority = 'polite') {
        if (!this.liveRegion) return;
        
        this.liveRegion.setAttribute('aria-live', priority);
        this.liveRegion.textContent = message;
        
        // Clear after announcement
        setTimeout(() => {
            this.liveRegion.textContent = '';
        }, 1000);
    }
    
    /**
     * Error handling
     */
    handleError(error) {
        console.error('Pune AI Collective Error:', error);
        
        // Report to analytics if available
        if (typeof gtag === 'function') {
            gtag('event', 'exception', {
                description: error.toString(),
                fatal: false
            });
        }
    }
    
    /**
     * Get site configuration
     */
    getConfig() {
        return siteConfig;
    }
    
    /**
     * Get feature support information
     */
    getFeatures() {
        return this.features;
    }
}

// Initialize the application
const puneAICollective = new PuneAICollective();

// Export for other modules (if using modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { puneAICollective, siteConfig };
}

// Make available globally for other scripts
window.PuneAICollective = puneAICollective;

// Log initialization complete
console.log('Pune AI Collective main.js loaded successfully');
