/**
 * Dark Mode Toggle and Enhanced Scroll Animations
 * Features:
 * - Light/dark mode toggle with proper state management
 * - Smooth animations and interactions
 * - Accessibility support
 */

class ThemeManager {
  constructor() {
    this.themeToggle = document.getElementById('theme-toggle');
    this.init();
  }
  
  init() {
    this.setupThemeToggle();
    this.loadSavedTheme();
  }
  
  setupThemeToggle() {
    this.themeToggle.addEventListener('click', () => {
      this.toggleTheme();
    });
    
    // Keyboard accessibility for theme toggle
    this.themeToggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.toggleTheme();
      }
    });
  }
  
  toggleTheme() {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    this.setTheme(newTheme);
    this.saveTheme(newTheme);
  }
  
  setTheme(theme) {
    if (theme === 'light') {
      document.body.setAttribute('data-theme', 'light');
      this.themeToggle.querySelector('.theme-icon').textContent = '☀️';
      this.themeToggle.setAttribute('aria-label', 'Switch to dark mode');
    } else {
      document.body.setAttribute('data-theme', 'dark');
      this.themeToggle.querySelector('.theme-icon').textContent = '🌙';
      this.themeToggle.setAttribute('aria-label', 'Switch to light mode');
    }
    
    // Add a subtle animation effect when theme changes
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
  }
  
  saveTheme(theme) {
    try {
      localStorage.setItem('fancy-variant-theme', theme);
    } catch (e) {
      // Handle cases where localStorage is not available
      console.warn('Could not save theme preference:', e);
    }
  }
  
  loadSavedTheme() {
    try {
      const savedTheme = localStorage.getItem('fancy-variant-theme');
      if (savedTheme) {
        this.setTheme(savedTheme);
      } else {
        // Default to light theme
        this.setTheme('light');
      }
    } catch (e) {
      // Default to light theme if localStorage is not available
      this.setTheme('light');
    }
  }
}

/**
 * Enhanced scroll animations for page elements
 */
class ScrollAnimations {
  constructor() {
    this.observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    this.init();
  }
  
  init() {
    this.setupIntersectionObserver();
    this.addParallaxEffects();
  }
  
  setupIntersectionObserver() {
    if (!window.IntersectionObserver) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, this.observerOptions);
    
    // Observe elements that should animate in
    const animateElements = document.querySelectorAll('.card, .pub-list li, .section h2');
    animateElements.forEach(el => {
      el.classList.add('animate-on-scroll');
      observer.observe(el);
    });
  }
  
  addParallaxEffects() {
    // Add subtle parallax effect to hero section
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    let ticking = false;
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrolled = window.pageYOffset;
          const parallax = scrolled * 0.5;
          hero.style.transform = `translateY(${parallax}px)`;
          ticking = false;
        });
        ticking = true;
      }
    });
  }
}

/**
 * Additional CSS for scroll animations
 */
function addScrollAnimationStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .animate-on-scroll {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .animate-on-scroll.animate-in {
      opacity: 1;
      transform: translateY(0);
    }
    
    .card.animate-on-scroll {
      transition-delay: 0.1s;
    }
    
    .card.animate-on-scroll:nth-child(2) {
      transition-delay: 0.2s;
    }
    
    .card.animate-on-scroll:nth-child(3) {
      transition-delay: 0.3s;
    }
    
    .pub-list li.animate-on-scroll:nth-child(odd) {
      transition-delay: 0.1s;
    }
    
    .pub-list li.animate-on-scroll:nth-child(even) {
      transition-delay: 0.2s;
    }
  `;
  document.head.appendChild(style);
}

/**
 * Initialize everything when DOM is ready
 */
function initializeFancyVariant() {
  addScrollAnimationStyles();
  
  // Initialize theme manager
  new ThemeManager();
  
  // Initialize scroll animations
  new ScrollAnimations();
  
  // Add smooth scrolling for anchor links
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
  
  console.log('🎨 Fancy variant with dark mode theme toggle initialized!');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeFancyVariant);
} else {
  initializeFancyVariant();
}