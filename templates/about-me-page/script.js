// ===================================
// Mobile Menu Toggle
// ===================================

const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const isExpanded = navMenu.classList.contains('active');
    mobileMenuToggle.setAttribute('aria-expanded', isExpanded);
  });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    mobileMenuToggle.setAttribute('aria-expanded', 'false');
  });
});

// ===================================
// Smooth Scroll with Offset for Fixed Header
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');

    if (targetId === '#') return;

    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ===================================
// Active Navigation Link Highlighting
// ===================================

const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLink?.classList.add('active');
    } else {
      navLink?.classList.remove('active');
    }
  });
}

window.addEventListener('scroll', highlightNavigation);

// ===================================
// Intersection Observer for Fade-in Animations
// ===================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in-up');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all project cards and sections
const animatedElements = document.querySelectorAll(
  '.project-card, .about-content, .contact-content'
);

animatedElements.forEach(el => observer.observe(el));

// ===================================
// Contact Form Handling
// ===================================

const contactForm = document.getElementById('contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message')
    };

    // Log form data (replace with actual submission logic)
    console.log('Form submitted:', data);

    // Show success message
    alert('Thank you for your message! I will get back to you soon.');

    // Reset form
    contactForm.reset();

    // TODO: Replace with actual form submission
    // Example with fetch:
    /*
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
      } else {
        alert('Something went wrong. Please try again later.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again later.');
    }
    */
  });
}

// ===================================
// Header Background on Scroll
// ===================================

const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  // Add shadow when scrolled
  if (currentScroll > 0) {
    header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
  } else {
    header.style.boxShadow = 'none';
  }

  lastScroll = currentScroll;
});

// ===================================
// Dark Mode Toggle (Optional Enhancement)
// ===================================

// Uncomment to add manual dark mode toggle
/*
const darkModeToggle = document.createElement('button');
darkModeToggle.innerHTML = '🌙';
darkModeToggle.className = 'dark-mode-toggle';
darkModeToggle.setAttribute('aria-label', 'Toggle dark mode');
document.querySelector('.nav-container').appendChild(darkModeToggle);

darkModeToggle.addEventListener('click', () => {
  document.documentElement.classList.toggle('dark-mode');
  const isDark = document.documentElement.classList.contains('dark-mode');
  darkModeToggle.innerHTML = isDark ? '☀️' : '🌙';
  localStorage.setItem('darkMode', isDark);
});

// Load saved preference
if (localStorage.getItem('darkMode') === 'true') {
  document.documentElement.classList.add('dark-mode');
  darkModeToggle.innerHTML = '☀️';
}
*/

// ===================================
// Performance: Lazy Load Images
// ===================================

if ('loading' in HTMLImageElement.prototype) {
  // Browser supports native lazy loading
  const images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach(img => {
    img.src = img.dataset.src || img.src;
  });
} else {
  // Fallback for older browsers
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img').forEach(img => imageObserver.observe(img));
}

// ===================================
// Utility: Copy Email to Clipboard
// ===================================

const emailLink = document.querySelector('.contact-link[href^="mailto:"]');

if (emailLink) {
  emailLink.addEventListener('click', (e) => {
    const email = emailLink.textContent;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(email).then(() => {
        const originalText = emailLink.textContent;
        emailLink.textContent = 'Copied!';

        setTimeout(() => {
          emailLink.textContent = originalText;
        }, 2000);
      });
    }
  });
}

// ===================================
// Console Easter Egg
// ===================================

console.log(`
%c 👋 Hello Developer!
%c Thanks for checking out my site.
%c Built with HTML, CSS, and vanilla JavaScript.
%c GitHub: https://github.com/yourusername
`,
'font-size: 20px; font-weight: bold; color: #4f46e5;',
'font-size: 14px; color: #6b7280;',
'font-size: 12px; color: #9ca3af;',
'font-size: 12px; color: #4f46e5;'
);
