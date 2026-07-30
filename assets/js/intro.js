document.addEventListener('DOMContentLoaded', () => {
  // 1. Animation d'entrée Scène 1
  const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1.2 } });

  tl.from('.main-title', { y: 30, opacity: 0, delay: 0.2 })
    .from('.tagline', { y: 20, opacity: 0 }, '-=0.8')
    .from('.quote', { opacity: 0 }, '-=0.6')
    .from('#btn-begin', { y: 20, opacity: 0 }, '-=0.4');

  // 2. Particules dorées
  initGoldParticles();

  // 3. Clic sur "Begin the Journey"
  const btnBegin = document.getElementById('btn-begin');
  const bgMusic = document.getElementById('bg-music');
  const scene1 = document.getElementById('scene-1');
  const scene3 = document.getElementById('scene-3');

  if (btnBegin) {
    btnBegin.addEventListener('click', () => {
      // 🎵 Lancement audio
      if (bgMusic) {
        bgMusic.volume = 0;
        bgMusic.play().then(() => {
          gsap.to(bgMusic, { volume: 0.4, duration: 3 });
        }).catch(err => console.log("Audio autostart bloqué :", err));
      }

      // 🎥 Transition vers Scène 3
      const transitionTl = gsap.timeline();

      transitionTl
        .to('#scene-1 .scene-content', {
          scale: 1.05,
          opacity: 0,
          duration: 1,
          ease: 'power2.inOut'
        })
        .add(() => {
          scene1.classList.add('hidden');
          scene3.classList.remove('hidden');
        })
        .fromTo('#scene-3', 
          { opacity: 0 }, 
          { opacity: 1, duration: 0.6 }
        )
        .from('.envelope', {
          y: 50,
          scale: 0.85,
          opacity: 0,
          duration: 1.2,
          ease: 'back.out(1.2)'
        })
        .from('.instruction-text', {
          opacity: 0,
          y: 10,
          duration: 0.8
        }, '-=0.4');
    });
  }
});

function initGoldParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = Array.from({ length: 35 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 4 + 1.5,
    alpha: Math.random() * 0.3 + 0.1,
    speedY: -(Math.random() * 0.4 + 0.1),
    speedX: Math.random() * 0.3 - 0.15
  }));

  function animate() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach((p) => {
      p.y += p.speedY;
      p.x += p.speedX;

      if (p.y < 0) p.y = height;
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(166, 138, 109, ${p.alpha})`;
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }

  animate();
}