/**
 * Scroll Progress Indicator with 3D Printing Animation
 * Features:
 * - Circular progress bar showing scroll percentage
 * - 3D printer animation that responds to scroll
 * - Light/dark mode toggle
 * - Smooth animations and interactions
 */

class ScrollProgressIndicator {
  constructor() {
    this.progressContainer = document.getElementById('scroll-progress');
    this.progressRing = document.querySelector('.progress-ring-progress');
    this.themeToggle = document.getElementById('theme-toggle');
    
    this.circumference = 2 * Math.PI * 36; // radius is 36
    this.scrollThreshold = 100; // Show indicator after 100px scroll
    
    this.init();
  }
  
  init() {
    this.setupProgressRing();
    this.setupEventListeners();
    this.setupThemeToggle();
    this.loadSavedTheme();
  }
  
  setupProgressRing() {
    // Set up the progress ring with full dasharray
    this.progressRing.style.strokeDasharray = this.circumference;
    this.progressRing.style.strokeDashoffset = this.circumference;
  }
  
  setupEventListeners() {
    // Throttled scroll listener for better performance
    let ticking = false;
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.updateProgress();
          ticking = false;
        });
        ticking = true;
      }
    });
    
    // Click to scroll to top
    this.progressContainer.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
    
    // Add keyboard accessibility
    this.progressContainer.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    });
    
    // Make it focusable for accessibility
    this.progressContainer.setAttribute('tabindex', '0');
    this.progressContainer.setAttribute('role', 'button');
    this.progressContainer.setAttribute('aria-label', 'Scroll to top');
  }
  
  updateProgress() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;
    
    // Show/hide the indicator based on scroll position
    if (scrollTop > this.scrollThreshold) {
      this.progressContainer.classList.add('visible');
    } else {
      this.progressContainer.classList.remove('visible');
    }
    
    // Update progress ring
    const offset = this.circumference - (scrollPercentage / 100) * this.circumference;
    this.progressRing.style.strokeDashoffset = offset;
    
    // Add extra animation effects based on scroll speed
    this.animateBenchyBasedOnScroll(scrollPercentage);
  }
  
  animateBenchyBasedOnScroll(percentage) {
    const benchyHull = document.querySelector('.benchy-hull');
    const hullInfill = document.querySelector('.hull-infill');
    const chimneyBridge = document.querySelector('.chimney-bridge');
    const waterRipples = document.querySelector('.water-ripples');
    
    if (!benchyHull || !hullInfill || !chimneyBridge || !waterRipples) return;
    
    // Phase 1: Early scroll (0-40%) - Hull infill becomes visible
    if (percentage <= 40) {
      const infillOpacity = Math.min(0.8, percentage / 40 * 0.8);
      hullInfill.style.opacity = infillOpacity;
      hullInfill.style.animation = `infillPattern ${Math.max(1, 3 - percentage / 20)}s ease-in-out infinite`;
    }
    
    // Phase 2: Mid scroll (40-80%) - Chimney bridge printing
    if (percentage > 40 && percentage <= 80) {
      const bridgeProgress = (percentage - 40) / 40;
      chimneyBridge.style.width = `${bridgeProgress * 8}px`;
      chimneyBridge.style.opacity = Math.min(1, bridgeProgress * 2);
    }
    
    // Phase 3: Late scroll (80-100%) - Gentle bobbing motion
    if (percentage > 80) {
      const bobIntensity = (percentage - 80) / 20;
      benchyHull.style.animation = `benchyBob ${Math.max(2, 4 - bobIntensity * 2)}s ease-in-out infinite`;
      waterRipples.style.opacity = Math.min(0.8, 0.3 + bobIntensity * 0.5);
    } else {
      benchyHull.style.animation = 'none';
    }
    
    // Continuous water ripple adjustment based on scroll speed
    const rippleSpeed = Math.max(2, 4 - (percentage / 25));
    waterRipples.style.animationDuration = `${rippleSpeed}s`;
    
    // Enhanced progress ring color transition for Benchy theme
    const hue = 200 + (percentage * 1.2); // Blue to cyan with subtle shift
    this.progressRing.style.stroke = `hsl(${hue}, 70%, ${60 + percentage * 0.2}%)`;
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
      document.body.removeAttribute('data-theme');
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
  
  // Initialize scroll progress indicator
  new ScrollProgressIndicator();
  
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
  
  console.log('⛵ Fancy variant with 3D Benchy scroll progress initialized!');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeFancyVariant);
} else {
  initializeFancyVariant();
}