/**
 * Harika'S RAKSHA BANDHAN - VIRTUAL RAKHI TYING CONTROLLER
 */

document.addEventListener('DOMContentLoaded', () => {
  const tieBtn = document.getElementById('btn-tie-rakhi');
  const rakhiWrapper = document.getElementById('rakhi-graphic-wrapper');
  const tiedCard = document.getElementById('rakhi-tied-card');
  const thali = document.querySelector('.puja-thali');
  let isTied = false;

  if (!tieBtn || !rakhiWrapper) return;

  function performRakhiTying() {
    if (isTied) return;
    isTied = true;

    // Visual tying feedback
    rakhiWrapper.classList.add('tying-active');
    tieBtn.innerHTML = '<span>Tying with Love... ✨</span>';
    tieBtn.disabled = true;

    // Audio & Confetti burst
    if (window.soundFx) window.soundFx.playChime();
    if (window.particleEngine) {
      const rect = rakhiWrapper.getBoundingClientRect();
      window.particleEngine.burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 80);
    }

    // Diya warm glow effect
    if (thali) {
      thali.style.boxShadow = '0 0 80px rgba(255, 182, 36, 0.6), inset 0 0 50px rgba(255, 215, 0, 0.5)';
    }

    // Unfold reveal message card after subtle delay
    setTimeout(() => {
      rakhiWrapper.classList.remove('tying-active');
      rakhiWrapper.style.transform = 'scale(1.12)';
      tieBtn.innerHTML = '<span>Rakhi Tied with Eternal Love ❤️</span>';
      tieBtn.style.background = 'linear-gradient(135deg, #2ED573, #10AC84)';
      tieBtn.style.cursor = 'default';

      if (tiedCard) {
        tiedCard.classList.add('show');
        tiedCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      // Second celebratory sparkle
      if (window.particleEngine) {
        setTimeout(() => {
          const cardRect = tiedCard.getBoundingClientRect();
          window.particleEngine.burst(cardRect.left + cardRect.width / 2, cardRect.top + cardRect.height / 2, 50);
        }, 300);
      }
    }, 1200);
  }

  tieBtn.addEventListener('click', performRakhiTying);
  rakhiWrapper.addEventListener('click', performRakhiTying);
});
