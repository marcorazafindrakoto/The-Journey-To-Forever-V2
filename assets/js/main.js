document.addEventListener('DOMContentLoaded', () => {
  // 1. 📅 BOUTON "ADD TO CALENDAR"
  const btnAddCalendar = document.getElementById('btn-add-calendar');
  if (btnAddCalendar) {
    btnAddCalendar.addEventListener('click', () => {
      const title = encodeURIComponent("Mariage Marco & Anaël");
      const details = encodeURIComponent("Célébration du mariage de Marco et Anaël");
      const location = encodeURIComponent("Ekar Soamiandalana/ Jardin d'Alicia Antsapandrano");
      const startDate = "20270911T070000Z";
      const endDate = "20270912T050000Z";

      const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&location=${location}`;
      window.open(googleCalendarUrl, '_blank');
    });
  }

  // 2. ⏳ COMPTE À REBOURS
  const targetDate = new Date('September 11, 2027 10:00:00').getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      const dEl = document.getElementById('cd-days');
      const hEl = document.getElementById('cd-hours');
      const mEl = document.getElementById('cd-minutes');
      const sEl = document.getElementById('cd-seconds');

      if (dEl) dEl.innerText = String(days).padStart(2, '0');
      if (hEl) hEl.innerText = String(hours).padStart(2, '0');
      if (mEl) mEl.innerText = String(minutes).padStart(2, '0');
      if (sEl) sEl.innerText = String(seconds).padStart(2, '0');
    }
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();

  // 3. ✨ ANIMATIONS D'APPARITION AU SCROLL (ScrollTrigger / GSAP)
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray('.timeline-item').forEach((item) => {
      gsap.from(item, {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 85%'
        }
      });
    });

    gsap.utils.toArray('.detail-card').forEach((card) => {
      gsap.from(card, {
        opacity: 0,
        scale: 0.95,
        y: 30,
        duration: 0.8,
        ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%'
        }
      });
    });
  }
});