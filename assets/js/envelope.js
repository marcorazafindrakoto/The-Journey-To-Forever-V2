document.addEventListener('DOMContentLoaded', () => {
  const waxSeal = document.getElementById('wax-seal');
  const flap = document.getElementById('envelope-flap');
  const card = document.getElementById('envelope-card');
  const scene3 = document.getElementById('scene-3');
  const scene5 = document.getElementById('scene-5');
  const scene6 = document.getElementById('scene-6');
  const scene7 = document.getElementById('scene-7');
  const progressBar = document.getElementById('progress-bar');

  if (waxSeal) {
    waxSeal.addEventListener('click', () => {
      const openTl = gsap.timeline();

      openTl
        // 1. Disparition du sceau
        .to(waxSeal, {
          scale: 0,
          rotation: 180,
          opacity: 0,
          duration: 0.5,
          ease: 'back.in(1.5)'
        })
        // 2. Ouverture du rabat
        .add(() => {
          if (flap) flap.classList.add('open');
        })
        .to({}, { duration: 0.6 })
        
        // 3. Glissement de la carte
        .to(card, {
          y: -140,
          duration: 1,
          ease: 'power2.out'
        })
        // 4. Disparition de l'enveloppe
        .to(scene3, {
          opacity: 0,
          duration: 0.8,
          delay: 0.4
        })
        .add(() => {
          if (scene3) scene3.classList.add('hidden');
          if (scene5) scene5.classList.remove('hidden');
          if (scene6) scene6.classList.remove('hidden');
          if (scene7) scene7.classList.remove('hidden');
          if (progressBar) progressBar.classList.remove('hidden');

          // 🔓 Rétablit le scroll sur la page
          document.body.style.overflow = 'auto';

          // 🎉 Confettis
          launchGoldConfetti();
        })
        // 5. Apparition de la Révélation
        .fromTo(scene5,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out' }
        );
    });
  }
});

function launchGoldConfetti() {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#A68A6D', '#D8C5AD', '#F3E7D6', '#CBB69D'],
      disableForReducedMotion: true
    });
  }
}