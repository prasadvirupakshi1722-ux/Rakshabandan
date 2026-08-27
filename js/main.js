/**
 * SANVI'S RAKSHA BANDHAN - MAIN CONTROLLER
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Landing "Open Your Surprise" CTA
  const openSurpriseBtn = document.getElementById('btn-open-surprise');
  if (openSurpriseBtn) {
    openSurpriseBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (window.soundFx) window.soundFx.playSparkle();
      if (window.particleEngine) {
        const rect = openSurpriseBtn.getBoundingClientRect();
        window.particleEngine.burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 70);
      }
      const targetSection = document.getElementById('rakhi');
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // 2. Personal Letter Envelope Wax Seal Click
  const envelopeCover = document.getElementById('envelope-cover');
  const letterContent = document.getElementById('letter-content');
  const letterFoldBack = document.getElementById('letter-toggle-back');

  if (envelopeCover && letterContent) {
    envelopeCover.addEventListener('click', () => {
      if (window.soundFx) window.soundFx.playSparkle();
      envelopeCover.style.display = 'none';
      letterContent.classList.add('show');
      if (window.particleEngine) {
        const rect = letterContent.getBoundingClientRect();
        window.particleEngine.burst(rect.left + rect.width / 2, rect.top + 80, 40);
      }
    });

    if (letterFoldBack) {
      letterFoldBack.addEventListener('click', () => {
        letterContent.classList.remove('show');
        envelopeCover.style.display = 'block';
        if (window.soundFx) window.soundFx.playPop();
      });
    }
  }

  // 3. Audio & Music Toggle in Navbar
  const musicToggleBtn = document.getElementById('nav-music-toggle');
  if (musicToggleBtn) {
    musicToggleBtn.addEventListener('click', () => {
      if (window.soundFx) {
        const isPlaying = window.soundFx.toggleBGM();
        if (isPlaying) {
          musicToggleBtn.classList.add('active');
          musicToggleBtn.innerHTML = '🎵';
          showToast('Playing gentle Rakhi ambient chimes 🌸');
        } else {
          musicToggleBtn.classList.remove('active');
          musicToggleBtn.innerHTML = '🔇';
          showToast('Sound muted');
        }
      }
    });
  }

  // 4. "Things That Make Sanvi Special" Tap-To-Agree
  const agreeBtns = document.querySelectorAll('.special-agree-btn');
  agreeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      btn.classList.add('agreed');
      const countEl = btn.querySelector('.agree-count');
      if (countEl) {
        let count = parseInt(countEl.textContent || '0', 10);
        countEl.textContent = `${count + 1}`;
      }
      btn.innerHTML = `<span>100% True! ❤️</span>`;
      if (window.soundFx) window.soundFx.playPop();
      if (window.particleEngine) {
        const rect = btn.getBoundingClientRect();
        window.particleEngine.burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 25);
      }
    });
  });

  // 5. Grand Finale "One Last Surprise ✨"
  const finaleSurpriseBtn = document.getElementById('btn-finale-surprise');
  const keepsakeContainer = document.getElementById('keepsake-container');

  if (finaleSurpriseBtn) {
    finaleSurpriseBtn.addEventListener('click', () => {
      if (window.soundFx) {
        window.soundFx.playFanfare();
      }

      // Launch multiple fireworks
      for (let i = 0; i < 6; i++) {
        setTimeout(() => {
          if (window.particleEngine) {
            window.particleEngine.launchFirework();
            window.particleEngine.spawnLantern();
          }
        }, i * 600);
      }

      if (keepsakeContainer) {
        setTimeout(() => {
          keepsakeContainer.classList.add('show');
          keepsakeContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 1200);
      }

      finaleSurpriseBtn.innerHTML = '<span>Happy Raksha Bandhan Sanvi! ❤️✨</span>';
      finaleSurpriseBtn.style.background = 'linear-gradient(135deg, #2ED573, #10AC84)';
    });
  }

  // 6. Sibling Easter Eggs
  // A. Lucky Star in Navbar
  const easterStar = document.getElementById('nav-easter-star');
  if (easterStar) {
    let starClicks = 0;
    easterStar.addEventListener('click', () => {
      starClicks++;
      if (window.soundFx) window.soundFx.playSparkle();
      if (starClicks === 1) {
        showToast("🌟 Easter Egg #1: Sanvi, you're officially the cool sister (don't let it get to your head 😜)!");
      } else {
        showToast("✨ Wishing you infinite smiles, success & endless happiness, Sanvi! ❤️");
      }
      if (window.particleEngine) {
        const rect = easterStar.getBoundingClientRect();
        window.particleEngine.burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 35);
      }
    });
  }

  // B. Cheeky "Don't Click This 👀" button
  const secretBtn = document.getElementById('secret-easter-btn');
  if (secretBtn) {
    secretBtn.addEventListener('click', () => {
      if (window.soundFx) window.soundFx.playPop();
      showToast("👀 Caught you! I knew you couldn't resist clicking! 😂 Love you Sanvi! ❤️");
      if (window.particleEngine) {
        const rect = secretBtn.getBoundingClientRect();
        window.particleEngine.burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 40);
      }
    });
  }

  // C. Floating "Send a Virtual Hug" Button
  const virtualHugBtn = document.getElementById('float-hug-btn');
  if (virtualHugBtn) {
    virtualHugBtn.addEventListener('click', () => {
      if (window.soundFx) window.soundFx.playSparkle();
      showToast("🤗 Sending a warm, big virtual hug across the miles straight to you! ❤️");
      if (window.particleEngine) {
        for (let i = 0; i < 3; i++) {
          setTimeout(() => {
            window.particleEngine.burst(window.innerWidth / 2, window.innerHeight / 2, 60);
          }, i * 300);
        }
      }
    });
  }

  // 7. Toast Message Helper
  function showToast(message) {
    let toast = document.getElementById('easter-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'easter-toast';
      toast.className = 'easter-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  }

  // 8. Active Nav Link on Scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.pageYOffset >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
});
