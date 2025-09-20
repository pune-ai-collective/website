/**
 * Pune AI Collective - Navigation JavaScript
 * Mobile menu toggle, navigation highlighting, and keyboard navigation
 * Modular architecture with event delegation for performance
 */

'use strict';

/**
 * Navigation Manager Class
 * Handles all navigation-related functionality
 */
class NavigationManager {
    constructor() {
        this.isInitialized = false;
        this.mobileMenuOpen = false;
        this.currentActiveLink = null;
        
        // DOM elements (will be set during initialization)
        this.navbar = null;
        this.mobileToggle = null;
        this.navMenu = null;
        this.navLinks = null;
        this.socialIcons = null;
        
        // Touch and interaction state
        this.touchStartY = 0;
        this.touchStartX = 0;
        
        // Throttling
        this.scrollThrottled = false;
        this.resizeThrottled = false;
        
        this.init();
    }
    
    /**
     * Initialize the navigation system
     */
    init() {
        if (this.isInitialized) return;
        
        // Wait for DOM and main application
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupNavigation());
        } else {
            this.setupNavigation();
        }
        
        // Listen for main app initialization
        document.addEventListener('siteInitialized', () => {
            this.onSiteInitialized();
        });
    }
    
    /**
     * Setup navigation functionality
     */
    setupNavigation() {
        try {
            // Cache DOM elements
            this.cacheElements();
            
            if (!this.navbar) {
                console.warn('Navigation elements not found');
                return;
            }
            
            // Setup event listeners
            this.setupEventListeners();
            
            // Setup mobile menu functionality
            this.setupMobileMenu();
            
            // Setup keyboard navigation
            this.setupKeyboardNavigation();
            
            // Setup accessibility features
            this.setupAccessibilityFeatures();
            
            // Initialize navigation state
            this.updateNavigationState();
            
            this.isInitialized = true;
            console.log('Navigation manager initialized successfully');
            
        } catch (error) {
            console.error('Error setting up navigation:', error);
        }
    }
    
    /**
     * Cache DOM elements for performance
     */
    cacheElements() {
        this.navbar = document.querySelector('.navbar');
        this.mobileToggle = document.querySelector('.mobile-menu-toggle');
        this.navMenu = document.querySelector('.nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.socialIcons = document.querySelector('.social-icons');
        this.navContainer = document.querySelector('.nav-container');
    }
    
    /**
     * Setup event listeners with proper delegation
     */
    setupEventListeners() {
        // Mobile menu toggle
        if (this.mobileToggle) {
            this.mobileToggle.addEventListener('click', (event) => {
                event.preventDefault();
                this.toggleMobileMenu();
            });
        }
        
        // Navigation link clicks
        if (this.navMenu) {
            this.navMenu.addEventListener('click', (event) => {
                const navLink = event.target.closest('.nav-link');
                const dropdownLink = event.target.closest('.dropdown-link');
                
                if (dropdownLink) {
                    this.handleDropdownClick(event, dropdownLink);
                } else if (navLink) {
                    this.handleNavigationClick(event, navLink);
                }
            });
        }

        // Dropdown hover handling for desktop
        this.setupDropdownHandling();
        
        // Close mobile menu on outside click
        document.addEventListener('click', (event) => {
            if (this.mobileMenuOpen && !this.navContainer.contains(event.target)) {
                this.closeMobileMenu();
            }
        });
        
        // Close mobile menu on escape key
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && this.mobileMenuOpen) {
                this.closeMobileMenu();
                this.mobileToggle.focus();
            }
        });
        
        // Touch events for mobile menu
        this.setupTouchEvents();
        
        // Window resize handling
        window.addEventListener('resize', () => this.handleResize(), { passive: true });
        
        // Scroll handling for navigation state
        window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
    }
    
    /**
     * Setup mobile menu functionality
     */
    setupMobileMenu() {
        if (!this.mobileToggle || !this.navMenu) return;
        
        // Set initial ARIA attributes
        this.mobileToggle.setAttribute('aria-expanded', 'false');
        this.mobileToggle.setAttribute('aria-controls', 'nav-menu');
        
        // Add mobile menu class for styling
        this.navMenu.classList.add('mobile-menu');
        
        // Setup menu item focus trap
        this.setupFocusTrap();
    }
    
    /**
     * Toggle mobile menu state
     */
    toggleMobileMenu() {
        if (this.mobileMenuOpen) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    }
    
    /**
     * Open mobile menu
     */
    openMobileMenu() {
        this.mobileMenuOpen = true;
        
        // Update classes
        this.navMenu.classList.add('is-open');
        document.body.classList.add('mobile-menu-open');
        
        // Update ARIA attributes
        this.mobileToggle.setAttribute('aria-expanded', 'true');
        
        // Focus first navigation link
        const firstNavLink = this.navMenu.querySelector('.nav-link');
        if (firstNavLink) {
            setTimeout(() => firstNavLink.focus(), 100);
        }
        
        // Prevent body scroll
        this.preventBodyScroll(true);
        
        // Announce to screen readers
        this.announceToScreenReader('Navigation menu opened');
        
        console.log('Mobile menu opened');
    }
    
    /**
     * Close mobile menu
     */
    closeMobileMenu() {
        this.mobileMenuOpen = false;
        
        // Update classes
        this.navMenu.classList.remove('is-open');
        document.body.classList.remove('mobile-menu-open');
        
        // Close all dropdowns
        const allDropdowns = document.querySelectorAll('.nav-item.has-dropdown');
        allDropdowns.forEach(item => {
            item.classList.remove('active');
            const navLink = item.querySelector('.nav-link');
            if (navLink) {
                navLink.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Update ARIA attributes
        this.mobileToggle.setAttribute('aria-expanded', 'false');
        
        // Allow body scroll
        this.preventBodyScroll(false);
        
        // Announce to screen readers
        this.announceToScreenReader('Navigation menu closed');
        
        console.log('Mobile menu closed');
    }
    
    /**
     * Handle navigation link clicks
     */
    handleNavigationClick(event, navLink) {
        const href = navLink.getAttribute('href');
        const parentItem = navLink.closest('.nav-item');
        
        // Handle dropdown toggle on mobile
        if (parentItem && parentItem.classList.contains('has-dropdown')) {
            const isMobile = window.innerWidth < 768;
            if (isMobile) {
                event.preventDefault();
                this.toggleDropdown(parentItem);
                return;
            }
        }
        
        // Close mobile menu if open
        if (this.mobileMenuOpen) {
            this.closeMobileMenu();
        }
        
        // Update active state
        this.updateActiveNavLink(navLink);
        
        // Let the main app handle smooth scrolling
        // (This is handled by main.js smooth scrolling)
        
        console.log('Navigation clicked:', href);
    }

    /**
     * Handle dropdown link clicks
     */
    handleDropdownClick(event, dropdownLink) {
        const href = dropdownLink.getAttribute('href');
        
        // Close mobile menu if open
        if (this.mobileMenuOpen) {
            this.closeMobileMenu();
        }
        
        // If it's an external link, let it open naturally
        if (href && (href.startsWith('http') || href.endsWith('.pdf'))) {
            console.log('External dropdown link clicked:', href);
            return; // Let browser handle the link
        }
        
        console.log('Dropdown link clicked:', href);
    }

    /**
     * Setup dropdown handling for desktop hover
     */
    setupDropdownHandling() {
        const dropdownItems = document.querySelectorAll('.nav-item.has-dropdown');
        
        dropdownItems.forEach(item => {
            let hoverTimeout;
            
            // Mouse enter
            item.addEventListener('mouseenter', () => {
                clearTimeout(hoverTimeout);
                if (window.innerWidth >= 768) { // Desktop only
                    item.classList.add('active');
                }
            });
            
            // Mouse leave
            item.addEventListener('mouseleave', () => {
                hoverTimeout = setTimeout(() => {
                    if (window.innerWidth >= 768) { // Desktop only
                        item.classList.remove('active');
                    }
                }, 100);
            });
        });
    }

    /**
     * Toggle dropdown on mobile
     */
    toggleDropdown(parentItem) {
        // Close other dropdowns first
        const allDropdowns = document.querySelectorAll('.nav-item.has-dropdown');
        allDropdowns.forEach(item => {
            if (item !== parentItem) {
                item.classList.remove('active');
            }
        });
        
        // Toggle current dropdown
        parentItem.classList.toggle('active');
        
        // Update aria-expanded
        const navLink = parentItem.querySelector('.nav-link');
        if (navLink) {
            const isExpanded = parentItem.classList.contains('active');
            navLink.setAttribute('aria-expanded', isExpanded.toString());
        }
    }
    
    /**
     * Update active navigation link
     */
    updateActiveNavLink(activeLink) {
        // Remove active class from all links
        this.navLinks.forEach(link => link.classList.remove('active'));
        
        // Add active class to current link
        if (activeLink) {
            activeLink.classList.add('active');
            this.currentActiveLink = activeLink;
        }
    }
    
    /**
     * Setup touch events for better mobile interaction
     */
    setupTouchEvents() {
        if (!this.navMenu) return;
        
        // Touch events for swipe to close
        this.navMenu.addEventListener('touchstart', (event) => {
            this.touchStartY = event.touches[0].clientY;
            this.touchStartX = event.touches[0].clientX;
        }, { passive: true });
        
        this.navMenu.addEventListener('touchend', (event) => {
            const touchEndY = event.changedTouches[0].clientY;
            const touchEndX = event.changedTouches[0].clientX;
            
            const deltaY = this.touchStartY - touchEndY;
            const deltaX = this.touchStartX - touchEndX;
            
            // Detect swipe left to close menu
            if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX > 50) {
                if (this.mobileMenuOpen) {
                    this.closeMobileMenu();
                }
            }
        }, { passive: true });
    }
    
    /**
     * Setup keyboard navigation
     */
    setupKeyboardNavigation() {
        if (!this.navMenu) return;
        
        this.navMenu.addEventListener('keydown', (event) => {
            if (!this.mobileMenuOpen) return;
            
            const focusableElements = this.navMenu.querySelectorAll(
                'a, button, [tabindex]:not([tabindex="-1"])'
            );
            
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            switch (event.key) {
                case 'Tab':
                    // Trap focus within mobile menu
                    if (event.shiftKey) {
                        if (document.activeElement === firstElement) {
                            event.preventDefault();
                            lastElement.focus();
                        }
                    } else {
                        if (document.activeElement === lastElement) {
                            event.preventDefault();
                            firstElement.focus();
                        }
                    }
                    break;
                    
                case 'ArrowDown':
                case 'ArrowUp':
                    event.preventDefault();
                    this.navigateWithArrows(event.key === 'ArrowDown', focusableElements);
                    break;

                case 'Enter':
                    // Handle dropdown toggle with Enter key
                    const currentItem = document.activeElement.closest('.nav-item');
                    if (currentItem && currentItem.classList.contains('has-dropdown')) {
                        event.preventDefault();
                        this.toggleDropdown(currentItem);
                    }
                    break;
            }
        });
    }
    
    /**
     * Navigate with arrow keys
     */
    navigateWithArrows(isDown, focusableElements) {
        const currentIndex = Array.from(focusableElements).indexOf(document.activeElement);
        let nextIndex;
        
        if (isDown) {
            nextIndex = currentIndex + 1;
            if (nextIndex >= focusableElements.length) {
                nextIndex = 0;
            }
        } else {
            nextIndex = currentIndex - 1;
            if (nextIndex < 0) {
                nextIndex = focusableElements.length - 1;
            }
        }
        
        focusableElements[nextIndex].focus();
    }
    
    /**
     * Setup focus trap for mobile menu
     */
    setupFocusTrap() {
        // This is handled in the keyboard navigation setup
        // Additional focus trap logic can be added here if needed
    }
    
    /**
     * Setup accessibility features
     */
    setupAccessibilityFeatures() {
        // Ensure proper ARIA labels
        if (this.mobileToggle) {
            if (!this.mobileToggle.getAttribute('aria-label')) {
                this.mobileToggle.setAttribute('aria-label', 'Toggle mobile menu');
            }
        }
        
        // Add role="navigation" if not present
        if (this.navbar && !this.navbar.getAttribute('role')) {
            this.navbar.setAttribute('role', 'navigation');
        }
        
        // Setup screen reader announcements
        this.setupScreenReaderSupport();
    }
    
    /**
     * Setup screen reader support
     */
    setupScreenReaderSupport() {
        // Create announcement region if it doesn't exist
        if (!document.getElementById('nav-announcements')) {
            const announceRegion = document.createElement('div');
            announceRegion.id = 'nav-announcements';
            announceRegion.setAttribute('aria-live', 'polite');
            announceRegion.setAttribute('aria-atomic', 'true');
            announceRegion.className = 'sr-only';
            document.body.appendChild(announceRegion);
        }
    }
    
    /**
     * Announce message to screen readers
     */
    announceToScreenReader(message) {
        const announceRegion = document.getElementById('nav-announcements');
        if (announceRegion) {
            announceRegion.textContent = message;
            
            // Clear after announcement
            setTimeout(() => {
                announceRegion.textContent = '';
            }, 1000);
        }
    }
    
    /**
     * Prevent/allow body scroll
     */
    preventBodyScroll(prevent) {
        if (prevent) {
            // Store current scroll position
            this.scrollPosition = window.pageYOffset;
            
            // Prevent scroll
            document.body.style.position = 'fixed';
            document.body.style.top = `-${this.scrollPosition}px`;
            document.body.style.width = '100%';
        } else {
            // Restore scroll
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            
            // Restore scroll position
            window.scrollTo(0, this.scrollPosition);
        }
    }
    
    /**
     * Handle window resize
     */
    handleResize() {
        if (this.resizeThrottled) return;
        
        this.resizeThrottled = true;
        requestAnimationFrame(() => {
            this.updateNavigationState();
            this.resizeThrottled = false;
        });
    }
    
    /**
     * Handle window scroll
     */
    handleScroll() {
        if (this.scrollThrottled) return;
        
        this.scrollThrottled = true;
        requestAnimationFrame(() => {
            this.updateScrollState();
            this.scrollThrottled = false;
        });
    }
    
    /**
     * Update navigation state based on viewport
     */
    updateNavigationState() {
        const isMobile = window.innerWidth < 768;
        
        // Close mobile menu if switching to desktop
        if (!isMobile && this.mobileMenuOpen) {
            this.closeMobileMenu();
        }
        
        // Update navbar classes for different states
        this.updateNavbarClasses();
    }
    
    /**
     * Update scroll state for navbar styling
     */
    updateScrollState() {
        if (!this.navbar) return;
        
        const scrollTop = window.pageYOffset;
        
        // Add/remove scrolled class for styling
        if (scrollTop > 50) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
    }
    
    /**
     * Update navbar classes
     */
    updateNavbarClasses() {
        if (!this.navbar) return;
        
        // Add classes based on current state
        const isMobile = window.innerWidth < 768;
        
        if (isMobile) {
            this.navbar.classList.add('mobile-view');
        } else {
            this.navbar.classList.remove('mobile-view');
        }
    }
    
    /**
     * Called when main site is initialized
     */
    onSiteInitialized() {
        console.log('Navigation manager received site initialized event');
        
        // Any additional setup that depends on the main app
        this.updateNavigationState();
    }
    
    /**
     * Public API methods
     */
    
    /**
     * Programmatically open mobile menu
     */
    openMenu() {
        if (!this.mobileMenuOpen) {
            this.openMobileMenu();
        }
    }
    
    /**
     * Programmatically close mobile menu
     */
    closeMenu() {
        if (this.mobileMenuOpen) {
            this.closeMobileMenu();
        }
    }
    
    /**
     * Check if mobile menu is open
     */
    isMenuOpen() {
        return this.mobileMenuOpen;
    }
    
    /**
     * Get current active navigation link
     */
    getActiveLink() {
        return this.currentActiveLink;
    }
    
    /**
     * Set active navigation link by href
     */
    setActiveLink(href) {
        const link = document.querySelector(`.nav-link[href="${href}"]`);
        if (link) {
            this.updateActiveNavLink(link);
        }
    }
    
    /**
     * Destroy navigation manager
     */
    destroy() {
        // Close mobile menu if open
        if (this.mobileMenuOpen) {
            this.closeMobileMenu();
        }
        
        // Remove event listeners
        // (In a more complex implementation, we'd store references and remove them)
        
        this.isInitialized = false;
        console.log('Navigation manager destroyed');
    }
}

// Initialize the navigation manager
const navigationManager = new NavigationManager();

// Export for other modules (if using modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = navigationManager;
}

// Make available globally
window.NavigationManager = navigationManager;

// Log initialization complete
console.log('Pune AI Collective navigation.js loaded successfully');
