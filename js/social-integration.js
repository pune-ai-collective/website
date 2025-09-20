/**
 * Pune AI Collective - Social Integration JavaScript
 * External link handling, analytics preparation, and social media optimization
 * Security best practices for external links and user privacy control
 */

'use strict';

/**
 * Social Integration Manager Class
 * Handles all social media and external link functionality
 */
class SocialIntegrationManager {
    constructor() {
        this.isInitialized = false;
        this.analyticsEnabled = false;
        this.trackingConsent = null;
        
        // Social media configurations
        this.socialConfig = {
            linkedin: {
                url: 'https://www.linkedin.com/groups/11802260/',
                name: 'LinkedIn Group',
                color: '#0077b5',
                trackingEvent: 'social_click',
                trackingCategory: 'Social Media',
                trackingAction: 'LinkedIn Click'
            },
            whatsapp: {
                url: 'https://chat.whatsapp.com/JKVSE67goMv2baHH4RYkDl',
                name: 'WhatsApp Community',
                color: '#25d366',
                trackingEvent: 'social_click',
                trackingCategory: 'Social Media',
                trackingAction: 'WhatsApp Click'
            },
            github: {
                url: 'https://github.com/pune-ai-collective',
                name: 'GitHub Projects',
                color: '#333333',
                trackingEvent: 'social_click',
                trackingCategory: 'Social Media',
                trackingAction: 'GitHub Click'
            }
        };
        
        // External link configurations
        this.externalLinkConfig = {
            target: '_blank',
            rel: 'noopener noreferrer',
            trackExternal: true,
            confirmExternal: false // Set to true if you want confirmation dialogs
        };
        
        // Click tracking data
        this.clickData = [];
        
        this.init();
    }
    
    /**
     * Initialize social integration
     */
    init() {
        if (this.isInitialized) return;
        
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupSocialIntegration());
        } else {
            this.setupSocialIntegration();
        }
        
        // Listen for main app initialization
        document.addEventListener('siteInitialized', (event) => {
            this.onSiteInitialized(event.detail);
        });
    }
    
    /**
     * Setup social integration functionality
     */
    setupSocialIntegration() {
        try {
            console.log('Setting up social integration...');
            
            // Setup external link handling
            this.setupExternalLinks();
            
            // Setup social media links
            this.setupSocialMediaLinks();
            
            // Setup analytics preparation
            this.setupAnalytics();
            
            // Setup privacy controls
            this.setupPrivacyControls();
            
            // Setup link security
            this.setupLinkSecurity();
            
            // Setup sharing functionality
            this.setupSharing();
            
            this.isInitialized = true;
            console.log('Social integration manager initialized successfully');
            
        } catch (error) {
            console.error('Error setting up social integration:', error);
        }
    }
    
    /**
     * Setup external link handling
     */
    setupExternalLinks() {
        // Handle all external links
        document.addEventListener('click', (event) => {
            const link = event.target.closest('a');
            if (!link) return;
            
            const href = link.getAttribute('href');
            if (!href) return;
            
            // Check if it's an external link
            if (this.isExternalLink(href)) {
                this.handleExternalLinkClick(event, link, href);
            }
        });
    }
    
    /**
     * Check if a link is external
     */
    isExternalLink(href) {
        // Internal links (hash, relative, same domain)
        if (href.startsWith('#') || href.startsWith('/') || href.startsWith('./') || href.startsWith('../')) {
            return false;
        }
        
        // Check if it's the same domain
        try {
            const linkURL = new URL(href, window.location.origin);
            return linkURL.hostname !== window.location.hostname;
        } catch (error) {
            // If URL parsing fails, treat as internal for safety
            return false;
        }
    }
    
    /**
     * Handle external link clicks
     */
    handleExternalLinkClick(event, link, href) {
        console.log('External link clicked:', href);
        
        // Ensure proper security attributes
        this.ensureLinkSecurity(link);
        
        // Track the click
        this.trackExternalLinkClick(link, href);
        
        // Show confirmation if configured
        if (this.externalLinkConfig.confirmExternal) {
            event.preventDefault();
            this.confirmExternalLink(href, () => {
                window.open(href, this.externalLinkConfig.target, 'noopener,noreferrer');
            });
        }
        
        // Add visual feedback
        this.addClickFeedback(link);
    }
    
    /**
     * Setup social media links with enhanced functionality
     */
    setupSocialMediaLinks() {
        const socialLinks = document.querySelectorAll('.social-icon, .social-link, .linkedin-icon, .whatsapp-icon, .linkedin-link, .whatsapp-link');
        
        socialLinks.forEach(link => {
            // Determine social platform
            const platform = this.identifySocialPlatform(link);
            if (!platform) return;
            
            // Enhanced click handling for social links
            link.addEventListener('click', (event) => {
                this.handleSocialLinkClick(event, link, platform);
            });
            
            // Add hover effects
            this.setupSocialHoverEffects(link, platform);
            
            // Ensure accessibility
            this.enhanceSocialAccessibility(link, platform);
        });
    }
    
    /**
     * Identify social platform from link element
     */
    identifySocialPlatform(link) {
        const href = link.getAttribute('href') || '';
        const className = link.className || '';
        
        if (href.includes('linkedin.com') || className.includes('linkedin')) {
            return 'linkedin';
        } else if (href.includes('whatsapp.com') || href.includes('wa.me') || className.includes('whatsapp')) {
            return 'whatsapp';
        } else if (href.includes('github.com') || className.includes('github')) {
            return 'github';
        }
        
        return null;
    }
    
    /**
     * Handle social media link clicks
     */
    handleSocialLinkClick(event, link, platform) {
        const config = this.socialConfig[platform];
        if (!config) return;
        
        console.log(`${config.name} link clicked`);
        
        // Track social media click
        this.trackSocialClick(platform, config);
        
        // Add visual feedback
        this.addSocialClickFeedback(link, platform);
        
        // Update link href if needed (for dynamic URLs)
        this.updateSocialLink(link, platform);
    }
    
    /**
     * Setup social hover effects
     */
    setupSocialHoverEffects(link, platform) {
        const config = this.socialConfig[platform];
        if (!config) return;
        
        // Store original color
        const originalColor = link.style.color;
        
        link.addEventListener('mouseenter', () => {
            if (window.matchMedia('(hover: hover)').matches) {
                link.style.setProperty('color', config.color, 'important');
            }
        });
        
        link.addEventListener('mouseleave', () => {
            if (originalColor) {
                link.style.color = originalColor;
            } else {
                link.style.removeProperty('color');
            }
        });
    }
    
    /**
     * Enhance social media link accessibility
     */
    enhanceSocialAccessibility(link, platform) {
        const config = this.socialConfig[platform];
        if (!config) return;
        
        // Ensure proper aria-label
        if (!link.getAttribute('aria-label')) {
            link.setAttribute('aria-label', `Join our ${config.name} (opens in new tab)`);
        }
        
        // Ensure proper target and rel attributes
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    }
    
    /**
     * Update social media links (for dynamic URLs)
     */
    updateSocialLink(link, platform) {
        const config = this.socialConfig[platform];
        if (!config) return;
        
        // Update href if different from config
        const currentHref = link.getAttribute('href');
        if (currentHref !== config.url) {
            // Only update if we have a valid URL in config
            if (config.url && config.url !== 'https://www.linkedin.com/groups/pune-ai-collective' && config.url !== 'https://chat.whatsapp.com/ai-collective-invite') {
                link.setAttribute('href', config.url);
            }
        }
    }
    
    /**
     * Setup analytics preparation
     */
    setupAnalytics() {
        // Check for existing analytics
        this.detectAnalytics();
        
        // Setup analytics event queue for when analytics loads
        this.setupAnalyticsQueue();
        
        // Prepare custom tracking
        this.prepareCustomTracking();
    }
    
    /**
     * Detect existing analytics services
     */
    detectAnalytics() {
        // Google Analytics
        if (typeof gtag === 'function') {
            this.analyticsEnabled = true;
            console.log('Google Analytics detected');
        }
        
        // Google Tag Manager
        if (typeof dataLayer !== 'undefined') {
            this.analyticsEnabled = true;
            console.log('Google Tag Manager detected');
        }
        
        // Adobe Analytics
        if (typeof s === 'object' && s.t) {
            this.analyticsEnabled = true;
            console.log('Adobe Analytics detected');
        }
        
        // Custom analytics can be detected here
    }
    
    /**
     * Setup analytics event queue
     */
    setupAnalyticsQueue() {
        if (!window.analyticsQueue) {
            window.analyticsQueue = [];
        }
        
        // Function to push events to queue
        window.pushAnalyticsEvent = (eventData) => {
            window.analyticsQueue.push(eventData);
            
            // Try to send immediately if analytics is available
            this.processAnalyticsQueue();
        };
    }
    
    /**
     * Process analytics event queue
     */
    processAnalyticsQueue() {
        if (!this.analyticsEnabled || !window.analyticsQueue) return;
        
        while (window.analyticsQueue.length > 0) {
            const event = window.analyticsQueue.shift();
            this.sendAnalyticsEvent(event);
        }
    }
    
    /**
     * Send analytics event
     */
    sendAnalyticsEvent(eventData) {
        // Google Analytics 4
        if (typeof gtag === 'function') {
            gtag('event', eventData.action, {
                event_category: eventData.category,
                event_label: eventData.label,
                value: eventData.value
            });
        }
        
        // Google Tag Manager
        if (typeof dataLayer !== 'undefined') {
            dataLayer.push({
                event: eventData.event || 'custom_event',
                event_category: eventData.category,
                event_action: eventData.action,
                event_label: eventData.label,
                event_value: eventData.value
            });
        }
        
        // Custom analytics can be sent here
        console.log('Analytics event sent:', eventData);
    }
    
    /**
     * Track external link click
     */
    trackExternalLinkClick(link, href) {
        const eventData = {
            event: 'external_link_click',
            category: 'External Links',
            action: 'Click',
            label: href,
            timestamp: Date.now()
        };
        
        // Store locally
        this.clickData.push(eventData);
        
        // Send to analytics if available
        if (this.analyticsEnabled) {
            this.sendAnalyticsEvent(eventData);
        } else {
            window.pushAnalyticsEvent(eventData);
        }
    }
    
    /**
     * Track social media click
     */
    trackSocialClick(platform, config) {
        const eventData = {
            event: config.trackingEvent,
            category: config.trackingCategory,
            action: config.trackingAction,
            label: platform,
            timestamp: Date.now()
        };
        
        // Store locally
        this.clickData.push(eventData);
        
        // Send to analytics if available
        if (this.analyticsEnabled) {
            this.sendAnalyticsEvent(eventData);
        } else {
            window.pushAnalyticsEvent(eventData);
        }
    }
    
    /**
     * Setup privacy controls
     */
    setupPrivacyControls() {
        // Check for privacy consent
        this.checkPrivacyConsent();
        
        // Setup consent handling
        this.setupConsentHandling();
    }
    
    /**
     * Check privacy consent status
     */
    checkPrivacyConsent() {
        // Check localStorage for consent
        try {
            this.trackingConsent = localStorage.getItem('tracking-consent');
        } catch (error) {
            console.warn('Unable to check tracking consent:', error);
        }
        
        // Check for common consent management platforms
        if (typeof cookieConsent !== 'undefined') {
            console.log('Cookie consent platform detected');
        }
    }
    
    /**
     * Setup consent handling
     */
    setupConsentHandling() {
        // Listen for consent changes
        document.addEventListener('privacy-consent-changed', (event) => {
            this.trackingConsent = event.detail.consent;
            
            if (this.trackingConsent === 'granted') {
                this.enableTracking();
            } else {
                this.disableTracking();
            }
        });
    }
    
    /**
     * Enable tracking
     */
    enableTracking() {
        this.analyticsEnabled = true;
        console.log('Tracking enabled');
        
        // Process queued events
        this.processAnalyticsQueue();
    }
    
    /**
     * Disable tracking
     */
    disableTracking() {
        this.analyticsEnabled = false;
        console.log('Tracking disabled');
        
        // Clear stored data if requested
        this.clickData = [];
    }
    
    /**
     * Setup link security
     */
    setupLinkSecurity() {
        // Ensure all external links have proper security attributes
        const externalLinks = document.querySelectorAll('a[href^="http"]:not([href*="' + window.location.hostname + '"])');
        
        externalLinks.forEach(link => {
            this.ensureLinkSecurity(link);
        });
    }
    
    /**
     * Ensure link has proper security attributes
     */
    ensureLinkSecurity(link) {
        // Ensure target="_blank" for external links
        if (!link.getAttribute('target')) {
            link.setAttribute('target', '_blank');
        }
        
        // Ensure proper rel attribute
        const rel = link.getAttribute('rel') || '';
        const relValues = rel.split(' ').filter(v => v.length > 0);
        
        if (!relValues.includes('noopener')) {
            relValues.push('noopener');
        }
        if (!relValues.includes('noreferrer')) {
            relValues.push('noreferrer');
        }
        
        link.setAttribute('rel', relValues.join(' '));
    }
    
    /**
     * Setup sharing functionality
     */
    setupSharing() {
        // Check for Web Share API support
        if (navigator.share) {
            this.setupNativeSharing();
        }
        
        // Setup custom sharing
        this.setupCustomSharing();
    }
    
    /**
     * Setup native sharing
     */
    setupNativeSharing() {
        // This can be used for future sharing buttons
        console.log('Web Share API supported');
    }
    
    /**
     * Setup custom sharing
     */
    setupCustomSharing() {
        // Prepare sharing data
        this.sharingData = {
            title: document.title,
            url: window.location.href,
            description: document.querySelector('meta[name="description"]')?.getAttribute('content') || ''
        };
    }
    
    /**
     * Add click feedback
     */
    addClickFeedback(element) {
        element.classList.add('clicked');
        
        setTimeout(() => {
            element.classList.remove('clicked');
        }, 200);
    }
    
    /**
     * Add social click feedback
     */
    addSocialClickFeedback(element, platform) {
        const config = this.socialConfig[platform];
        if (!config) return;
        
        element.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            element.style.transform = '';
        }, 150);
    }
    
    /**
     * Confirm external link navigation
     */
    confirmExternalLink(href, callback) {
        const confirmed = confirm(`This link will take you to an external website: ${href}\n\nDo you want to continue?`);
        
        if (confirmed) {
            callback();
        }
    }
    
    /**
     * Prepare custom tracking
     */
    prepareCustomTracking() {
        // Setup custom tracking that doesn't depend on third-party analytics
        this.customTracking = {
            enabled: true,
            events: [],
            maxEvents: 100
        };
    }
    
    /**
     * Called when main site is initialized
     */
    onSiteInitialized(detail) {
        console.log('Social integration manager received site initialized event');
        
        // Update configuration with any site-specific settings
        if (detail.config && detail.config.social) {
            Object.assign(this.socialConfig, detail.config.social);
        }
    }
    
    /**
     * Public API methods
     */
    
    /**
     * Update social media URLs
     */
    updateSocialURLs(urls) {
        Object.keys(urls).forEach(platform => {
            if (this.socialConfig[platform]) {
                this.socialConfig[platform].url = urls[platform];
                
                // Update all links for this platform
                const links = document.querySelectorAll(`.${platform}-icon, .${platform}-link`);
                links.forEach(link => {
                    link.setAttribute('href', urls[platform]);
                });
            }
        });
        
        console.log('Social URLs updated:', urls);
    }
    
    /**
     * Get click data
     */
    getClickData() {
        return [...this.clickData];
    }
    
    /**
     * Clear click data
     */
    clearClickData() {
        this.clickData = [];
    }
    
    /**
     * Manually track event
     */
    trackEvent(category, action, label, value) {
        const eventData = {
            event: 'custom_event',
            category,
            action,
            label,
            value,
            timestamp: Date.now()
        };
        
        this.clickData.push(eventData);
        
        if (this.analyticsEnabled) {
            this.sendAnalyticsEvent(eventData);
        } else {
            window.pushAnalyticsEvent(eventData);
        }
    }
}

// Initialize the social integration manager
const socialIntegrationManager = new SocialIntegrationManager();

// Export for other modules (if using modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = socialIntegrationManager;
}

// Make available globally
window.SocialIntegrationManager = socialIntegrationManager;

// Log initialization complete
console.log('Pune AI Collective social-integration.js loaded successfully');
