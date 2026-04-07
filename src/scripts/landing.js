/**
 * AMANI BEAUTY - Landing Page Scroll Animations
 * Handles intersection observer animations and smooth scrolling
 */

(function() {
  'use strict';

  // Check if we're in development mode
  const isDev = import.meta.env?.DEV ?? false;

  const log = {
    info: (...args) => { if (isDev) console.log('[Landing]', ...args); },
    warn: (...args) => { if (isDev) console.warn('[Landing]', ...args); },
  };

  // Configuration for the intersection observer
  const OBSERVER_CONFIG = {
    root: null, // viewport
    rootMargin: '0px 0px -50px 0px', // Trigger before element is fully visible
    threshold: 0.15 // Trigger when 15% visible
  };

  // Store instances for cleanup
  let scrollAnimator = null;
  let smoothScroll = null;

  /**
   * Scroll Animation Observer
   * Animates elements with [data-animate] attribute when they enter viewport
   */
  class ScrollAnimator {
    constructor() {
      this.init();
    }

    init() {
      // Get all elements with data-animate attribute
      const animatedElements = document.querySelectorAll('[data-animate]');

      if (animatedElements.length === 0) {
        log.info('No animated elements found');
        return;
      }

      log.info(`Found ${animatedElements.length} elements to animate`);

      // Set up initial state for all animated elements
      animatedElements.forEach(el => {
        // Set initial hidden state
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
      });

      // Create intersection observer
      this.observer = new IntersectionObserver(
        this.handleIntersect.bind(this),
        OBSERVER_CONFIG
      );

      // Observe all animated elements
      animatedElements.forEach(el => {
        this.observer.observe(el);
      });
    }

    /**
     * Handle intersection observer callback
     */
    handleIntersect(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Animate in
          const element = entry.target;
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';

          // Add is-animated class for potential CSS hooks
          element.classList.add('is-animated');

          // Stop observing this element once animated
          this.observer.unobserve(element);
        }
      });
    }

    /**
     * Clean up observer to prevent memory leaks
     */
    destroy() {
      if (this.observer) {
        this.observer.disconnect();
        log.info('Animation observer cleaned up');
      }
    }
  }

  /**
   * Smooth Scroll Handler
   * Handles smooth scrolling for anchor links
   */
  class SmoothScroll {
    constructor() {
      this.handlers = [];
      this.init();
    }

    init() {
      // Get all anchor links
      const anchorLinks = document.querySelectorAll('a[href^="#"]');

      anchorLinks.forEach(link => {
        const handler = this.handleClick.bind(this);
        link.addEventListener('click', handler);
        this.handlers.push({ element: link, handler });
      });

      log.info(`Smooth scroll enabled for ${anchorLinks.length} anchor links`);
    }

    handleClick(e) {
      const href = e.currentTarget.getAttribute('href');

      // Ignore empty anchors or #only
      if (!href || href === '#') {
        return;
      }

      const targetElement = document.querySelector(href);

      if (targetElement) {
        e.preventDefault();

        // Smooth scroll to target
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

        // Update focus for accessibility
        targetElement.focus({ preventScroll: true });
      }
    }

    /**
     * Clean up event listeners to prevent memory leaks
     */
    destroy() {
      this.handlers.forEach(({ element, handler }) => {
        element.removeEventListener('click', handler);
      });
      this.handlers = [];
      log.info('Smooth scroll handlers cleaned up');
    }
  }

  /**
   * Clean up all animations before page navigation
   * This prevents memory leaks when using Astro's View Transitions
   */
  function cleanup() {
    if (scrollAnimator) {
      scrollAnimator.destroy();
      scrollAnimator = null;
    }
    if (smoothScroll) {
      smoothScroll.destroy();
      smoothScroll = null;
    }
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      scrollAnimator = new ScrollAnimator();
      smoothScroll = new SmoothScroll();
    });
  } else {
    // DOM already ready
    scrollAnimator = new ScrollAnimator();
    smoothScroll = new SmoothScroll();
  }

  // Clean up before navigation (for Astro View Transitions)
  document.addEventListener('astro:before-preparation', cleanup);
  document.addEventListener('astro:after-swap', cleanup);

  // Also clean up on page unload
  window.addEventListener('beforeunload', cleanup);

  // Export for potential external use
  window.LandingAnimations = {
    ScrollAnimator,
    SmoothScroll,
    cleanup
  };

})();
