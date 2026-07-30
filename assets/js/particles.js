class GoldenParticles {
  constructor() {
    this.canvas = document.getElementById('particles-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.confetti = [];
    this.particleCount = 50;

    this.init();
    this.animate();

    window.addEventListener('resize', () => this.init());
  }

  init() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.particles = [];

    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        // 🔍 Taille moyenne / équilibrée (entre 2px et 5px)
        radius: Math.random() * 3 + 2, 
        // 🟩 Mélange subtil de carrés et de cercles
        shape: Math.random() > 0.5 ? 'square' : 'circle', 
        color: 'rgba(166, 138, 109, ' + (Math.random() * 0.5 + 0.3) + ')',
        vx: (Math.random() - 0.5) * 0.3,
        vy: -Math.random() * 0.4 - 0.1
      });
    }
  }

  // ✨ Déclencher les confettis dorés
  burstConfetti() {
    const goldColors = ['#A68A6D', '#D4C3B3', '#E5DDD3', '#B89775', '#FFF'];
    for (let i = 0; i < 80; i++) {
      this.confetti.push({
        x: this.canvas.width / 2,
        y: this.canvas.height / 2,
        w: Math.random() * 8 + 6,
        h: Math.random() * 6 + 5,
        color: goldColors[Math.floor(Math.random() * goldColors.length)],
        vx: (Math.random() - 0.5) * 14,
        vy: (Math.random() - 0.5) * 14 - 5,
        rotation: Math.random() * 360,
        vRot: (Math.random() - 0.5) * 10,
        opacity: 1
      });
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Particules classiques (Cercle ou Carré)
    this.particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.y < 0) {
        p.y = this.canvas.height;
        p.x = Math.random() * this.canvas.width;
      }

      this.ctx.beginPath();
      this.ctx.fillStyle = p.color;

      if (p.shape === 'circle') {
        this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        this.ctx.fill();
      } else {
        const size = p.radius * 1.5;
        this.ctx.fillRect(p.x - size / 2, p.y - size / 2, size, size);
      }
    });

    // Animation des confettis
    for (let i = this.confetti.length - 1; i >= 0; i--) {
      const c = this.confetti[i];
      c.x += c.vx;
      c.y += c.vy;
      c.vy += 0.2; // gravité
      c.rotation += c.vRot;
      c.opacity -= 0.012;

      if (c.opacity <= 0) {
        this.confetti.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.translate(c.x, c.y);
      this.ctx.rotate((c.rotation * Math.PI) / 180);
      this.ctx.globalAlpha = c.opacity;
      this.ctx.fillStyle = c.color;
      this.ctx.fillRect(-c.w / 2, -c.h / 2, c.w, c.h);
      this.ctx.restore();
    }

    requestAnimationFrame(() => this.animate());
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.goldenParticles = new GoldenParticles();
});