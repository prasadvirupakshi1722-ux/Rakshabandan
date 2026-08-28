/**
 * harika'S RAKSHA BANDHAN - VIRTUAL GIFT BOX CONTROLLER
 */

document.addEventListener('DOMContentLoaded', () => {
  const giftBox = document.getElementById('interactive-gift-box');
  const openGiftBtn = document.getElementById('btn-open-gift');
  const giftRevealedCard = document.getElementById('gift-revealed-card');
  let isOpened = false;

  function unboxGift() {
    if (isOpened) return;
    isOpened = true;

    giftBox.classList.add('opened');

    if (openGiftBtn) {
      openGiftBtn.innerHTML = '<span>Gift Unboxed! 🎁✨</span>';
      openGiftBtn.style.background = 'linear-gradient(135deg, #2ED573, #10AC84)';
      openGiftBtn.style.cursor = 'default';
      openGiftBtn.disabled = true;
    }

    // Audio & Confetti
    if (window.soundFx) window.soundFx.playFanfare();
    if (window.particleEngine) {
      const rect = giftBox.getBoundingClientRect();
      window.particleEngine.burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 90);
    }

    setTimeout(() => {
      if (giftRevealedCard) {
        giftRevealedCard.classList.add('show');
        giftRevealedCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      if (window.particleEngine) {
        setTimeout(() => {
          const cardRect = giftRevealedCard.getBoundingClientRect();
          window.particleEngine.burst(cardRect.left + cardRect.width / 2, cardRect.top + cardRect.height / 2, 60);
        }, 400);
      }
    }, 700);
  }

  if (giftBox) giftBox.addEventListener('click', unboxGift);
  if (openGiftBtn) openGiftBtn.addEventListener('click', unboxGift);
});
