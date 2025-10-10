# About-Me Page Template

**Complexity Level:** 1
**Timeline:** 1-2 days
**Tech Stack:** HTML5 + CSS3 + Vanilla JavaScript

## Quick Start

1. Download or copy the template files
2. Customize the content in `index.html`
3. Update styling in `styles.css`
4. Deploy to Vercel, Netlify, or GitHub Pages

## Files Included

```
about-me-page/
├── index.html          # Main page structure
├── styles.css          # All styling and responsive design
├── script.js           # Optional JavaScript enhancements
├── assets/
│   └── placeholder-avatar.png
└── README.md          # This file
```

## Customization Guide

### 1. Update Personal Information
Edit these sections in `index.html`:
- Hero section (name, title, tagline)
- About section (background, skills)
- Projects section (your work)
- Contact section (email, social links)

### 2. Styling
The CSS uses custom properties for easy theming:
```css
:root {
  --primary-color: #4f46e5;
  --text-color: #1f2937;
  --bg-color: #ffffff;
  --accent-color: #f3f4f6;
}
```

### 3. SEO Optimization
Update these meta tags:
- `<title>` - Your name and title
- `<meta name="description">` - Brief description
- Open Graph tags for social sharing
- Add your own `favicon.ico`

## Deployment Options

### Vercel (Recommended)
1. Push to GitHub repository
2. Connect to Vercel
3. Deploy automatically

### Netlify
1. Drag and drop the folder to Netlify
2. Or connect via Git

### GitHub Pages
1. Push to GitHub repository
2. Enable GitHub Pages in repository settings

## Features Included

- ✅ Responsive design (mobile-first)
- ✅ SEO optimized meta tags
- ✅ Accessibility features (ARIA labels, skip links)
- ✅ Performance optimized (minimal JS, optimized CSS)
- ✅ Social media preview cards
- ✅ Dark mode support (automatic)
- ✅ Fast loading (<2 seconds)

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## ♿ Accessibility Checklist

This template includes accessibility features out-of-the-box. Verify these remain intact:

### Keyboard Navigation
- [ ] All interactive elements focusable via Tab key
- [ ] Focus indicators visible on all elements
- [ ] Skip navigation link works (try Tab on page load)
- [ ] No keyboard traps

### Screen Readers
- [ ] All images have meaningful `alt` text
- [ ] Headings follow logical hierarchy (H1 → H2 → H3)
- [ ] Landmarks present (`<nav>`, `<main>`, `<footer>`)
- [ ] `aria-label` on navigation and icons
- [ ] Form inputs have associated `<label>` elements

### Visual Accessibility
- [ ] Color contrast meets WCAG AA (4.5:1 for text)
- [ ] Text resizable up to 200% without breaking layout
- [ ] No content relies solely on color
- [ ] Focus indicators clearly visible

### Testing
```bash
# Test with Lighthouse
npx lighthouse http://localhost:8000 --view

# Test with axe
npx @axe-core/cli http://localhost:8000

# Manual keyboard test
# Tab through entire page, ensure all links/buttons reachable
```

## License

MIT License - feel free to use for personal or commercial projects.