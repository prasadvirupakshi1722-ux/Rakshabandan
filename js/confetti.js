/**
 * SANVI'S RAKSHA BANDHAN - PARTICLE & CONFETTI ENGINE
 */

class ParticleEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.fireworks = [];
    this.mouseParticles = [];
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.initCanvas();
    this.createAmbientPetals();
    this.setupListeners();
    this.loop();
  }

  initCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
  }

  createAmbientPetals() {
    const petalColors = [
      'rgba(255, 182, 193, 0.65)',  // Soft pink sakura
      'rgba(255, 105, 180, 0.55)',  // Rose
      'rgba(255, 215, 0, 0.45)',    // Golden sparkle dust
      'rgba(200, 182, 255, 0.55)',  // Lavender
      'rgba(255, 159, 26, 0.55)'    // Marigold
    ];

    const count = window.innerWidth < 768 ? 22 : 45;
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        size: Math.random() * 8 + 4,
        speedY: Math.random() * 0.8 + 0.3,
        speedX: Math.sin(Math.random() * Math.PI) * 0.6,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 1.5,
        color: petalColors[Math.floor(Math.random() * petalColors.length)],
        type: Math.random() > 0.4 ? 'petal' : 'star'
      });
    }
  }

  setupListeners() {
    window.addEventListener('resize', () => {
      this.initCanvas();
    });

    // Mouse movement sparkles
    let lastMove = 0;
    window.addEventListener('mousemove', (e) => {
      const now = Date.now();
      if (now - lastMove > 35) { // Throttle for performance
        this.addMouseSparkle(e.clientX, e.clientY);
        lastMove = now;
      }
    });

    // Touch support for sparkles
    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        this.addMouseSparkle(touch.clientX, touch.clientY);
      }
    }, { passive: true });
  }

  addMouseSparkle(x, y) {
    if (this.mouseParticles.length > 30) return;
    const colors = ['#FF4D6D', '#FFD700', '#FFCCD5', '#C8B6FF'];
    this.mouseParticles.push({
      x: x + (Math.random() - 0.5) * 10,
      y: y + (Math.random() - 0.5) * 10,
      size: Math.random() * 4 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1,
      speedX: (Math.random() - 0.5) * 1.5,
      speedY: (Math.random() - 0.5) * 1.5 - 0.8,
      life: 1
    });
  }

  // Trigger Burst of Confetti & Hearts
  burst(x, y, count = 70) {
    const colors = ['#FF4D6D', '#FF758F', '#FFD700', '#FFA834', '#C8B6FF', '#FFFFFF'];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 7 + 3;
      this.fireworks.push({
        x: x || this.width / 2,
        y: y || this.height / 2,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 10,
        alpha: 1,
        gravity: 0.15,
        shape: Math.random() > 0.3 ? 'rect' : 'heart'
      });
    }
  }

  // Grand Finale Firework Rocket
  launchFirework(x) {
    const targetY = Math.random() * (this.height * 0.4) + this.height * 0.15;
    const rocket = {
      x: x || Math.random() * (this.width * 0.8) + this.width * 0.1,
      y: this.height,
      targetY: targetY,
      speed: Math.random() * 4 + 7,
      color: '#FFE57F'
    };

    const animateRocket = () => {
      rocket.y -= rocket.speed;
      this.addMouseSparkle(rocket.x, rocket.y);
      if (rocket.y <= rocket.targetY) {
        this.burst(rocket.x, rocket.y, 80);
        if (window.soundFx) window.soundFx.playChime();
      } else {
        requestAnimationFrame(animateRocket);
      }
    };
    animateRocket();
  }

  // Spawn Sky Lantern
  spawnLantern() {
    const lantern = document.createElement('div');
    lantern.className = 'floating-sky-lantern';
    lantern.style.left = `${Math.random() * 85 + 5}%`;
    lantern.style.animationDuration = `${Math.random() * 6 + 10}s`;
    document.body.appendChild(lantern);

    setTimeout(() => {
      lantern.remove();
    }, 16000);
  }

  loop() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // 1. Ambient Floating Petals
    this.particles.forEach(p => {
      p.y += p.speedY;
      p.x += Math.sin(p.y * 0.01) * 0.5;
      p.rotation += p.rotSpeed;

      if (p.y > this.height + 20) {
        p.y = -20;
        p.x = Math.random() * this.width;
      }

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rotation * Math.PI) / 180);
      this.ctx.fillStyle = p.color;

      if (p.type === 'petal') {
        // Draw petal shape
        this.ctx.beginPath();
        this.ctx.ellipse(0, 0, p.size, p.size * 0.5, 0, 0, Math.PI * 2);
        this.ctx.fill();
      } else {
        // Draw tiny 4-point golden star
        this.ctx.beginPath();
        this.ctx.arc(0, 0, p.size * 0.35, 0, Math.PI * 2);
        this.ctx.fill();
      }
      this.ctx.restore();
    });

    // 2. Mouse Sparkles
    for (let i = this.mouseParticles.length - 1; i >= 0; i--) {
      const sp = this.mouseParticles[i];
      sp.x += sp.speedX;
      sp.y += sp.speedY;
      sp.alpha -= 0.025;

      if (sp.alpha <= 0) {
        this.mouseParticles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = sp.alpha;
      this.ctx.fillStyle = sp.color;
      this.ctx.beginPath();
      this.ctx.arc(sp.x, sp.y, sp.size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }

    // 3. Fireworks & Confetti Burst
    for (let i = this.fireworks.length - 1; i >= 0; i--) {
      const fw = this.fireworks[i];
      fw.x += fw.vx;
      fw.y += fw.vy;
      fw.vy += fw.gravity;
      fw.rotation += fw.rotSpeed;
      fw.alpha -= 0.012;

      if (fw.alpha <= 0 || fw.y > this.height) {
        this.fireworks.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = fw.alpha;
      this.ctx.translate(fw.x, fw.y);
      this.ctx.rotate((fw.rotation * Math.PI) / 180);
      this.ctx.fillStyle = fw.color;

      if (fw.shape === 'heart') {
        this.ctx.beginPath();
        const s = fw.size * 0.7;
        this.ctx.moveTo(0, s * 0.3);
        this.ctx.bezierCurveTo(-s, -s * 0.6, -s * 1.2, s * 0.4, 0, s * 1.2);
        this.ctx.bezierCurveTo(s * 1.2, s * 0.4, s, -s * 0.6, 0, s * 0.3);
        this.ctx.fill();
      } else {
        this.ctx.fillRect(-fw.size / 2, -fw.size / 2, fw.size, fw.size * 0.6);
      }
      this.ctx.restore();
    }

    requestAnimationFrame(() => this.loop());
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.particleEngine = new ParticleEngine('particles-canvas');
});
