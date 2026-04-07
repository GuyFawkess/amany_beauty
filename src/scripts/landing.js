/**
 * AMANI BEAUTY - Landing Page Scroll Animations
 * Handles intersection observer animations and smooth scrolling
 */

(function() {
  'use strict';

  console.log('🎬 Landing animations initialized');

  // Configuration for the intersection observer
  const OBSERVER_CONFIG = {
    root: null, // viewport
    rootMargin: '0px 0px -50px 0px', // Trigger before element is fully visible
    threshold: 0.15 // Trigger when 15% visible
  };

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
        console.log('No animated elements found');
        return;
      }

      console.log(`🎯 Found ${animatedElements.length} elements to animate`);

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
     * Clean up observer
     */
    destroy() {
      if (this.observer) {
        this.observer.disconnect();
        console.log('🧹 Animation observer destroyed');
      }
    }
  }

  /**
   * Smooth Scroll Handler
   * Handles smooth scrolling for anchor links
   */
  class SmoothScroll {
    constructor() {
      this.init();
    }

    init() {
      // Get all anchor links
      const anchorLinks = document.querySelectorAll('a[href^="#"]');

      anchorLinks.forEach(link => {
        link.addEventListener('click', this.handleClick.bind(this));
      });

      console.log(`🔗 Smooth scroll enabled for ${anchorLinks.length} anchor links`);
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
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      new ScrollAnimator();
      new SmoothScroll();
    });
  } else {
    // DOM already ready
    new ScrollAnimator();
    new SmoothScroll();
  }

  // Export for potential external use
  window.LandingAnimations = {
    ScrollAnimator,
    SmoothScroll
  };

})();
