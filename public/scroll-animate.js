// public/scroll-animate.js
document.addEventListener("DOMContentLoaded", initAnimations);
document.addEventListener('astro:page-load', initAnimations);

function initAnimations() {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const duration = el.dataset.duration || "700";

          el.style.transition = `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`;
          el.classList.add("scroll-anim-visible");

          observer.unobserve(el);

          setTimeout(() => {
            el.style.transition = "";
          }, parseInt(duration) + 100);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll("[data-animate]").forEach(el => {
    const animation = el.dataset.animate;
    if (!animation) return;
    observer.observe(el);
  });
}
