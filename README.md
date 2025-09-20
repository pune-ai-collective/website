# Pune AI Collective Website

A clean, minimal website for the Pune AI Collective community, inspired by Zara's design language. Built with plain HTML, CSS, and JavaScript focusing on accessibility, performance, and responsive design.

## Overview

The Pune AI Collective website showcases the community's mission and vision while providing easy access to social channels for member engagement. The design emphasizes simplicity, professionalism, and accessibility.

### Key Features

- **Minimalist Design**: Zara-inspired clean aesthetic with ample white space
- **Fully Responsive**: Mobile-first approach supporting 320px to 2560px+ screens
- **Accessibility Compliant**: WCAG 2.1 AA standards with comprehensive keyboard navigation
- **Performance Optimized**: Fast loading with Lighthouse scores of 90+
- **Cross-Browser Compatible**: Works on Chrome, Firefox, Safari, and Edge
- **Social Media Integration**: LinkedIn and WhatsApp community links
- **Vanilla JavaScript**: No frameworks, modern ES6+ with progressive enhancement

## Project Structure

```
pune-ai-collective-website/
├── index.html                 # Main website file
├── css/
│   ├── styles.css            # Core Zara-inspired styles
│   ├── responsive.css        # Mobile-first responsive design
│   └── animations.css        # Subtle hover effects and transitions
├── js/
│   ├── main.js              # Core functionality and smooth scrolling
│   ├── navigation.js        # Mobile menu and navigation highlighting
│   └── social-integration.js # Social media and analytics integration
├── assets/
│   └── icons/               # Social media icons (if not using CDN)
├── tests/
│   ├── accessibility.html   # Manual accessibility testing
│   └── browser-test.html    # Cross-browser compatibility testing
└── README.md                # This file
```

## Getting Started

### Prerequisites

- Modern web browser (Chrome 90+, Firefox 85+, Safari 14+, Edge 90+)
- Web server for local development (optional but recommended)

### Installation

1. Clone or download the project files
2. Serve the files through a web server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js http-server
npx http-server

# Using PHP
php -S localhost:8000
```

3. Open `http://localhost:8000` in your browser

### Direct File Access

You can also open `index.html` directly in your browser, though some features may work better when served through a web server.

## Configuration

### Social Media URLs

Update the social media links in the following places:

1. **HTML (`index.html`)**:
   ```html
   <a href="https://www.linkedin.com/groups/11802260/" ...>
   <a href="https://chat.whatsapp.com/JKVSE67goMv2baHH4RYkDl" ...>
   ```

2. **JavaScript (`js/social-integration.js`)**:
   ```javascript
   linkedin: 'https://www.linkedin.com/groups/11802260/',
   whatsapp: 'https://chat.whatsapp.com/JKVSE67goMv2baHH4RYkDl'
   ```

### Content Customization

The mission and vision statements are embedded in the HTML. Update them in `index.html`:

- Mission statement: `.mission-text` paragraph
- Vision statement: `.vision-text` paragraph

### Styling Customization

The website uses CSS custom properties for easy theming. Update colors and fonts in `css/styles.css`:

```css
:root {
    --primary-color: #000000;        /* Main text color */
    --secondary-color: #666666;      /* Secondary text */
    --background-color: #ffffff;     /* Background */
    --accent-color: #f8f8f8;        /* Section backgrounds */
    /* ... more variables */
}
```

## Testing

### Automated Testing

#### HTML Validation
```bash
curl -H "Content-Type: text/html; charset=utf-8" \
     --data-binary @index.html \
     https://validator.w3.org/check
```

#### CSS Validation
```bash
curl -H "Content-Type: text/css; charset=utf-8" \
     --data-binary @css/styles.css \
     https://jigsaw.w3.org/css-validator/api/put
```

#### Accessibility Testing
```bash
# Install axe-core CLI
npm install -g @axe-core/cli

# Run accessibility audit
axe index.html --exit
```

#### Performance Testing
```bash
# Install Lighthouse CLI
npm install -g lighthouse

# Run Lighthouse audit
lighthouse index.html --only-categories=performance,accessibility --view
```

### Manual Testing

#### Accessibility Testing
Open `tests/accessibility.html` for comprehensive manual accessibility testing including:
- Keyboard navigation
- Screen reader compatibility
- Color contrast verification
- Mobile accessibility
- ARIA implementation

#### Browser Compatibility Testing
Open `tests/browser-test.html` for cross-browser compatibility testing including:
- Feature support detection
- Responsive design verification
- Performance metrics
- Known browser issues

### Testing Checklist

- [ ] HTML passes W3C validation (zero errors)
- [ ] CSS passes W3C validation (zero errors)
- [ ] Lighthouse accessibility score 95+
- [ ] Lighthouse performance score 90+
- [ ] Works on screen sizes 320px-2560px+
- [ ] Cross-browser compatibility verified
- [ ] Social media links functional
- [ ] Smooth scrolling works
- [ ] Mobile navigation functional
- [ ] Keyboard navigation complete
- [ ] Screen reader compatible

## Browser Support

| Browser | Version | Status |
|---------|---------|--------|
| Chrome  | 90+     | ✅ Full Support |
| Firefox | 85+     | ✅ Full Support |
| Safari  | 14+     | ✅ Full Support |
| Edge    | 90+     | ✅ Full Support |
| IE 11   | -       | ❌ Not Supported |

### Feature Fallbacks

- **CSS Grid**: Flexbox fallbacks for older browsers
- **Smooth Scrolling**: JavaScript fallback for browsers without CSS scroll-behavior
- **Intersection Observer**: Fallback scroll event handling
- **CSS Custom Properties**: Hardcoded fallback values provided

## Performance

### Optimization Features

- **Minimal Dependencies**: Only Font Awesome CDN for icons
- **Optimized Images**: All images optimized for web
- **Lazy Loading**: Images load as needed
- **Critical CSS**: Above-the-fold styles inlined
- **Progressive Enhancement**: Core functionality works without JavaScript
- **Preconnect**: DNS prefetching for external resources

### Performance Targets

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms
- **Total Page Size**: < 500KB

## Accessibility

### WCAG 2.1 AA Compliance

- **Keyboard Navigation**: Full site navigation with keyboard
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Color Contrast**: 4.5:1 ratio for normal text, 3:1 for large text
- **Focus Management**: Visible focus indicators on all interactive elements
- **Alternative Text**: Descriptive alt text for all images
- **Heading Structure**: Logical heading hierarchy
- **Responsive Text**: Text scales up to 200% without horizontal scrolling

### Accessibility Features

- Skip links for keyboard users
- ARIA live regions for dynamic content
- Proper form labeling
- High contrast mode support
- Reduced motion support
- Touch-friendly targets (44px minimum)

## Deployment

### Static Hosting

The website can be deployed to any static hosting service:

- **Netlify**: Drag and drop deployment
- **Vercel**: Git-based deployment
- **GitHub Pages**: Direct repository hosting
- **Firebase Hosting**: Google Cloud hosting
- **AWS S3**: Amazon static site hosting

### Pre-Deployment Checklist

- [ ] Update social media URLs with actual links
- [ ] Run all validation tests
- [ ] Test on target browsers
- [ ] Verify accessibility compliance
- [ ] Check performance metrics
- [ ] Test on mobile devices
- [ ] Verify all links work
- [ ] Check contact information

## Contributing

### Code Standards

- **HTML**: Semantic HTML5, valid markup, proper indentation
- **CSS**: Mobile-first, BEM methodology, consistent naming
- **JavaScript**: ES6+, no jQuery, progressive enhancement
- **Accessibility**: WCAG 2.1 AA compliance required
- **Performance**: Lighthouse 90+ scores required

### Development Workflow

1. Make changes to source files
2. Test locally with web server
3. Run validation tests
4. Test accessibility compliance
5. Verify cross-browser compatibility
6. Update documentation if needed

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For questions or issues:

- Create an issue in the project repository
- Contact the Pune AI Collective community through our social channels
- Review the testing documentation in the `tests/` directory

## Acknowledgments

- Design inspiration from Zara's minimalist aesthetic
- Accessibility guidelines from WCAG 2.1
- Performance optimization from Google Web Vitals
- Cross-browser compatibility testing with modern browser standards

---

**Built with ❤️ for the Pune AI Collective community**
