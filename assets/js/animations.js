class SceneManager {
  constructor() {
    this.currentScene = 1;
    this.initListeners();
  }

  initListeners() {
    // Bouton Départ
    const btnStart = document.getElementById('btn-start');
    if (btnStart) {
      btnStart.addEventListener('click', () => {
        this.playAudio();
        this.goToScene(3);
      });
    }

    // Sceau de Cire (Ouverture enveloppe)
    const waxSeal = document.getElementById('wax-seal');
    if (waxSeal) {
      waxSeal.addEventListener('click', () => {
        this.openEnvelope();
      });
    }

    // 📍 NAVIGATION 1-2-3 CLIQUABLE
    document.querySelectorAll('.progress-step').forEach(stepBtn => {
      stepBtn.addEventListener('click', () => {
        const targetStep = parseInt(stepBtn.getAttribute('data-step'));
        if (targetStep === 1) this.goToScene(1);
        if (targetStep === 2) this.goToScene(3);
        if (targetStep === 3) {
          this.goToScene(5);
          this.revealScrollSections();
        }
      });
    });
  }

  playAudio() {
    const audio = document.getElementById('bg-music');
    const audioCtrl = document.getElementById('audio-control');
    if (audio) {
      audio.play().then(() => {
        if (audioCtrl) audioCtrl.classList.remove('hidden');
      }).catch(err => console.log("Audio play blocked"));
    }
  }

  updateProgress(sceneNum) {
    const progressContainer = document.getElementById('progress-bar');
    if (!progressContainer) return;

    progressContainer.classList.remove('hidden');

    let activeStep = 1;
    if (sceneNum === 3) activeStep = 2;
    if (sceneNum >= 5) activeStep = 3;

    document.querySelectorAll('.progress-step').forEach(el => {
      const stepVal = parseInt(el.getAttribute('data-step'));
      if (stepVal === activeStep) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });
  }

  goToScene(targetSceneNumber) {
    const currentSceneEl = document.getElementById(`scene-${this.currentScene}`);
    const targetSceneEl = document.getElementById(`scene-${targetSceneNumber}`);

    if (currentSceneEl && targetSceneEl && this.currentScene !== targetSceneNumber) {
      gsap.to(currentSceneEl, {
        opacity: 0,
        duration: 0.6,
        onComplete: () => {
          currentSceneEl.classList.add('hidden');
          targetSceneEl.classList.remove('hidden');
          gsap.fromTo(targetSceneEl, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.8 });
          this.currentScene = targetSceneNumber;
          this.updateProgress(targetSceneNumber);
        }
      });
    }
  }

  openEnvelope() {
    const flap = document.getElementById('envelope-flap');
    const seal = document.getElementById('wax-seal');
    const card = document.querySelector('.envelope-card');

    // 🎉 Déclenchement de l'effet confettis !
    if (window.goldenParticles) {
      window.goldenParticles.burstConfetti();
    }

    if (seal) gsap.to(seal, { scale: 0, opacity: 0, duration: 0.4 });
    if (flap) flap.classList.add('open');

    setTimeout(() => {
      if (card) {
        gsap.to(card, {
          y: -140,
          duration: 0.9,
          ease: "power2.out",
          onComplete: () => {
            setTimeout(() => {
              this.goToScene(5);
              this.revealScrollSections();
            }, 600);
          }
        });
      }
    }, 500);
  }

  revealScrollSections() {
    setTimeout(() => {
      document.getElementById('scene-6')?.classList.remove('hidden');
      document.getElementById('scene-7')?.classList.remove('hidden');
    }, 600);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.sceneManager = new SceneManager();
});