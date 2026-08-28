/**
 * harika's RAKSHA BANDHAN - POLAROID MEMORIES SCRAPBOOK & LIGHTBOX
 */

const MEMORIES_DATA = [
  {
    id: 5,
    img: 'assets/images/memory_5.jpg',
    caption: 'My absolute favorite picture with you ✨',
    badge: '🌟 Favorite Picture',
    date: 'A timeless classic',
    note: "Harika, this picture captures how effortlessly graceful, fun, and radiant you are! No matter how much we tease each other, having you as my sister is the best gift in the world. Always cherish this one! 🌸✨"
  },
  {
    id: 1,
    img: 'assets/images/memory_1.jpg',
    caption: 'One of those moments ❤️',
    badge: '✨ Sweet Times',
    date: 'Unfiltered smiles',
    note: "One of those candid, genuine moments that bring an instant smile to my face. Even miles apart today, it feels like this was just yesterday. ❤️"
  },
  {
    id: 2,
    img: 'assets/images/memory_2.jpg',
    caption: 'A memory worth keeping.',
    badge: '💖 Pure Joy',
    date: 'Best sibling duo',
    note: "Through all the late talks, shared jokes, and random life updates, having a sister like you makes life so much brighter. Never stop smiling!"
  },
  {
    id: 3,
    img: 'assets/images/memory_3.jpg',
    caption: 'Always a little chaotic 😂',
    badge: '🎉 Pure Chaos',
    date: 'Laughter overload',
    note: "Proof that wherever we go, pure fun and chaotic laughter follow us! Still waiting for you to hold your own shopping bags though 😜 (just kidding)!"
  },
  {
    id: 4,
    img: 'assets/images/memory_4.jpg',
    caption: 'Some moments never get old.',
    badge: '🌈 Unbreakable Bond',
    date: 'Forever team',
    note: "Time flies, places change, but the comfort and warmth of our bond stays rock solid. Can't wait until our next in-person feast and celebration! 🍕💫"
  }
];

document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.polaroid-card');
  const modal = document.getElementById('photo-modal');
  const modalInner = document.getElementById('modal-card-inner');
  const modalImg = document.getElementById('modal-photo-img');
  const modalCaption = document.getElementById('modal-caption-text');
  const modalNoteText = document.getElementById('modal-note-content');
  const modalDate = document.getElementById('modal-date-text');
  const closeBtn = document.getElementById('modal-close-btn');
  const flipBtn = document.getElementById('btn-flip-note');
  const flipBackBtn = document.getElementById('btn-flip-back');

  // Open Lightbox Modal
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const id = parseInt(card.getAttribute('data-id'), 10);
      const data = MEMORIES_DATA.find(m => m.id === id);
      if (!data) return;

      modalImg.src = data.img;
      modalCaption.textContent = data.caption;
      modalNoteText.textContent = data.note;
      if (modalDate) modalDate.textContent = data.date;

      modalInner.classList.remove('flipped');
      modal.classList.add('active');

      if (window.soundFx) window.soundFx.playPop();
    });
  });

  // Flip to read back-of-photo note
  if (flipBtn) {
    flipBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      modalInner.classList.toggle('flipped');
      if (window.soundFx) window.soundFx.playSparkle();
    });
  }

  if (flipBackBtn) {
    flipBackBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      modalInner.classList.remove('flipped');
      if (window.soundFx) window.soundFx.playPop();
    });
  }

  // Close Modal
  function closeModal() {
    modal.classList.remove('active');
    modalInner.classList.remove('flipped');
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // 3D Parallax Tilt on Hover
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      card.style.transform = `perspective(800px) rotateY(${x * 0.04}deg) rotateX(${-y * 0.04}deg) translateY(-8px) scale(1.03)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
});
