document.addEventListener('DOMContentLoaded', () => {
  // Enregistrement de GSAP ScrollTrigger
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  initTimelineAnimations();
});

/**
 * Animate timeline elements as they scroll into view
 */
function initTimelineAnimations() {
  const items = document.querySelectorAll('.timeline-item');

  items.forEach((item) => {
    const isLeft = item.classList.contains('left');

    gsap.from(item.querySelector('.timeline-content'), {
      scrollTrigger: {
        trigger: item,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      },
      x: isLeft ? -50 : 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });

    gsap.from(item.querySelector('.timeline-dot'), {
      scrollTrigger: {
        trigger: item,
        start: 'top 80%'
      },
      scale: 0,
      opacity: 0,
      duration: 0.6,
      ease: 'back.out(1.7)'
    });
  });
}