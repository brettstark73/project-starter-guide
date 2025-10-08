# 📄 Static Sites & Portfolios

## Overview

Static sites are perfect for content that doesn't change frequently and doesn't require user-specific data. They're fast, secure, SEO-friendly, and cost-effective to host.

**Complexity Level:** 1-2
**Timeline:** 1-7 days
**Budget:** $0-20/month

---

## When to Choose Static Sites

### ✅ Perfect For:
- Personal portfolios and about-me pages
- Company websites and landing pages
- Documentation sites
- Blogs and news sites
- Event websites
- Product showcase sites

### ❌ Not Suitable For:
- User accounts and authentication
- Real-time data updates
- Complex form processing
- E-commerce with inventory
- User-generated content

---

## Technology Stacks

### Option 1: Pure HTML/CSS/JS (Level 1)
**Best for:** Ultimate simplicity, full control

```
Technologies:
- HTML5 for structure
- CSS3 (or Tailwind CSS) for styling
- Vanilla JavaScript for interactivity
- Vite or Parcel for bundling (optional)

File Structure:
├── index.html
├── styles.css
├── script.js
├── assets/
│   ├── images/
│   └── fonts/
└── pages/
    ├── about.html
    └── contact.html
```

**Pros:** No build process, fast loading, easy to understand
**Cons:** No templating, manual repetition, limited tooling

### Option 2: Static Site Generator (Level 1-2)
**Best for:** Content-heavy sites, blogs, documentation

#### Astro (Recommended)
```bash
npm create astro@latest my-site
```

**Benefits:**
- Multi-framework support (React, Vue, Svelte)
- Zero JS by default
- Great performance
- Component islands architecture

#### Next.js Static Export
```bash
npx create-next-app@latest my-site  # Configure for static export in next.config.js
```

**Benefits:**
- React ecosystem
- TypeScript support
- Image optimization
- API routes for build-time data

**Note for Next.js 15:**
- App Router (default): Use `generateStaticParams()` for SSG with dynamic routes
- Pages Router: Use `getStaticProps()` and `getStaticPaths()`
- For static export: Add `output: 'export'` to `next.config.js`
- App Router provides better performance with React Server Components

#### Hugo (Recommended for Blogs)
```bash
brew install hugo  # Install Hugo (macOS)

hugo new site my-blog  # Create new site
cd my-blog
```

**Benefits:**
- **Fastest build times** (built in Go)
- Zero dependencies (single binary)
- Excellent for blogs and documentation
- Huge theme ecosystem
- Markdown-native with powerful templating
- Live reload during development

**Perfect for:**
- Personal blogs (like brettstark.com)
- Documentation sites
- Portfolio with blog
- Content-heavy sites

#### Gatsby
```bash
npm install -g gatsby-cli
gatsby new my-site
```

**Benefits:**
- GraphQL data layer
- Plugin ecosystem
- Image processing
- Progressive Web App features

### Option 3: Hybrid Approach (Level 2)
**Best for:** Static with some dynamic features

```
Static Site + Serverless Functions:
- Astro/Next.js for static content
- Vercel/Netlify functions for forms
- External APIs for dynamic data
- Headless CMS for content management
```

---

## Implementation Guide

### Step 1: Choose Your Approach

**Pure HTML/CSS/JS** if:
- You want maximum control
- You're learning web fundamentals
- You need zero build complexity
- Your site is very simple

**Static Site Generator** if:
- You have multiple pages
- You want templating and components
- You need SEO optimization
- You plan to add content regularly

**Hybrid Approach** if:
- You need contact forms
- You want dynamic content sections
- You need CMS integration
- You want room to grow

### Step 2: Set Up Your Development Environment

#### For Pure HTML/CSS/JS:
```bash
mkdir my-portfolio
cd my-portfolio
touch index.html styles.css script.js
```

#### For Astro:
```bash
npm create astro@latest my-portfolio
cd my-portfolio
npm run dev
```

#### For Next.js:
```bash
npx create-next-app@latest my-portfolio
cd my-portfolio
npm run dev
```

### Step 3: Essential Features Implementation

#### SEO Optimization
```html
<!-- Essential meta tags -->
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Name - Web Developer</title>
  <meta name="description" content="Experienced web developer specializing in...">
  
  <!-- Open Graph for social sharing -->
  <meta property="og:title" content="Your Name - Web Developer">
  <meta property="og:description" content="Experienced web developer...">
  <meta property="og:image" content="/og-image.png">
  
  <!-- Favicon -->
  <link rel="icon" href="/favicon.ico">
</head>
```

#### Performance Optimization
```css
/* Use CSS custom properties for consistency */
:root {
  --primary-color: #4f46e5;
  --text-color: #1f2937;
  --bg-color: #ffffff;
}

/* Optimize fonts */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');

/* Responsive design */
@media (max-width: 768px) {
  /* Mobile styles */
}
```

#### Accessibility
```html
<!-- Skip navigation link -->
<a href="#main-content" class="skip-link">Skip to main content</a>

<!-- Semantic HTML -->
<nav aria-label="Main navigation">
  <ul role="list">
    <li><a href="#about">About</a></li>
    <li><a href="#projects">Projects</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
</nav>

<main id="main-content">
  <h1>Welcome to My Portfolio</h1>
</main>
```

### Step 4: Content Structure

#### About-Me Page Structure:
```
1. Hero Section
   - Name and title
   - Brief tagline
   - Profile photo
   - Call-to-action

2. About Section
   - Professional background
   - Skills and expertise
   - Personal interests

3. Projects/Work Section
   - Featured projects
   - Brief descriptions
   - Links to live demos/repos

4. Contact Section
   - Contact form or email
   - Social media links
   - Location (optional)

5. Footer
   - Copyright
   - Additional links
```

---

## Hosting Options

### Free Hosting (Recommended for Level 1)

#### Vercel
```bash
npm i -g vercel  # Install Vercel CLI

vercel  # Deploy

vercel --prod  # Custom domain (free)
```

**Pros:** Automatic deployments, CDN, great performance
**Cons:** Limited to JAMstack

#### Netlify
```bash
# Deploy via Git or drag-and-drop - netlify.toml for configuration
```

**Pros:** Form handling, split testing, edge functions
**Cons:** Build minutes limit on free plan

#### GitHub Pages
```yaml
name: Deploy to GitHub Pages  # .github/workflows/deploy.yml
on:
  push:
    branches: [ main ]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

**Pros:** Free for public repos, simple setup
**Cons:** No server-side processing, slower builds

---

## Performance Checklist

### Images
- [ ] Use modern formats (WebP, AVIF)
- [ ] Optimize file sizes
- [ ] Implement lazy loading
- [ ] Provide alt text for accessibility

### CSS
- [ ] Minify CSS files
- [ ] Use critical CSS for above-the-fold content
- [ ] Minimize unused CSS
- [ ] Use efficient selectors

### JavaScript
- [ ] Minimize JavaScript for static sites
- [ ] Use modern ES6+ features
- [ ] Implement code splitting if needed
- [ ] Defer non-critical scripts

### General
- [ ] Enable GZIP compression
- [ ] Use CDN for assets
- [ ] Implement caching headers
- [ ] Test mobile performance

---

## SEO Checklist

### Technical SEO
- [ ] XML sitemap
- [ ] Robots.txt file
- [ ] Clean URL structure
- [ ] Fast loading times
- [ ] Mobile responsiveness

### Content SEO
- [ ] Unique page titles
- [ ] Meta descriptions
- [ ] Header tag structure (H1, H2, H3)
- [ ] Internal linking
- [ ] Image alt attributes

### Social Media
- [ ] Open Graph tags
- [ ] Twitter Card tags
- [ ] Social media preview images
- [ ] Structured data (JSON-LD)

---

## Example: About-Me Page Template

### Minimal HTML Structure
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>John Doe - Web Developer</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header>
    <nav>
      <ul>
        <li><a href="#about">About</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <section class="hero">
      <h1>John Doe</h1>
      <p>Full-Stack Web Developer</p>
      <a href="#contact" class="cta-button">Get In Touch</a>
    </section>

    <section id="about">
      <h2>About Me</h2>
      <p>I'm a passionate web developer with 5 years of experience...</p>
    </section>

    <section id="projects">
      <h2>Featured Projects</h2>
      <!-- Project cards here -->
    </section>

    <section id="contact">
      <h2>Contact</h2>
      <a href="mailto:john@example.com">john@example.com</a>
    </section>
  </main>

  <footer>
    <p>&copy; 2024 John Doe. All rights reserved.</p>
  </footer>
</body>
</html>
```

---

## Next Steps

Once your static site is live:

1. **Analytics:** Add Plausible or Google Analytics
2. **Performance:** Test with Lighthouse and PageSpeed Insights
3. **SEO:** Submit to Google Search Console
4. **Social Media:** Create social media cards
5. **Monitoring:** Set up uptime monitoring

**Ready to add more complexity?** Consider moving to [Level 2 with dynamic features](../complexity-levels.md#level-2-dynamic-frontend-) or explore [SaaS application development](saas-applications.md).

---

*Example implementation: [About-Me Page Template](../../templates/about-me-page/)*