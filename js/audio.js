/**
 * SANVI'S RAKSHA BANDHAN - AUDIO & CHIMES SYNTHESIZER
 * Implemented with pure Web Audio API for high reliability, zero lag & offline compatibility.
 */

class SoundEffects {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.bgmPlaying = false;
    this.bgmInterval = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Sweet Auspicious Chime / Temple Bell for Rakhi Tying
  playChime() {
    if (this.isMuted) return;
    this.init();

    const freqs = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
    freqs.forEach((f, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, this.ctx.currentTime + idx * 0.08);

      gain.gain.setValueAtTime(0.001, this.ctx.currentTime + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.18, this.ctx.currentTime + idx * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + idx * 0.08 + 1.6);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(this.ctx.currentTime + idx * 0.08);
      osc.stop(this.ctx.currentTime + idx * 0.08 + 1.8);
    });
  }

  // Sparkle / Magic sound for buttons & easter eggs
  playSparkle() {
    if (this.isMuted) return;
    this.init();

    const freqs = [1046.5, 1318.5, 1567.98, 2093.0];
    freqs.forEach((f, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(f, this.ctx.currentTime + i * 0.06);

      gain.gain.setValueAtTime(0.001, this.ctx.currentTime + i * 0.06);
      gain.gain.linearRampToValueAtTime(0.12, this.ctx.currentTime + i * 0.06 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + i * 0.06 + 0.5);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(this.ctx.currentTime + i * 0.06);
      osc.stop(this.ctx.currentTime + i * 0.06 + 0.6);
    });
  }

  // Gift Unboxing Fanfare
  playFanfare() {
    if (this.isMuted) return;
    this.init();

    const notes = [
      { f: 523.25, d: 0.15, t: 0 },
      { f: 659.25, d: 0.15, t: 0.15 },
      { f: 783.99, d: 0.15, t: 0.3 },
      { f: 1046.5, d: 0.5,  t: 0.45 }
    ];

    notes.forEach(n => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(n.f, this.ctx.currentTime + n.t);

      gain.gain.setValueAtTime(0.001, this.ctx.currentTime + n.t);
      gain.gain.linearRampToValueAtTime(0.2, this.ctx.currentTime + n.t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + n.t + n.d + 0.8);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(this.ctx.currentTime + n.t);
      osc.stop(this.ctx.currentTime + n.t + n.d + 1.0);
    });
  }

  // Heart pop sound
  playPop() {
    if (this.isMuted) return;
    this.init();

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(this.ctx.currentTime);
    osc.stop(this.ctx.currentTime + 0.16);
  }

  // Soft Indian Flute / Kalimba Ambient Background Melody Loop
  toggleBGM() {
    this.init();
    if (this.bgmPlaying) {
      this.stopBGM();
      return false;
    } else {
      this.startBGM();
      return true;
    }
  }

  startBGM() {
    this.bgmPlaying = true;
    // Soothing Indian Raag / Pentatonic Scale (Raga Bhupali / Desh style notes: C, D, E, G, A)
    const melody = [523.25, 587.33, 659.25, 783.99, 880.00, 783.99, 659.25, 587.33, 523.25, 659.25, 783.99, 1046.50];
    let noteIdx = 0;

    const playNextNote = () => {
      if (!this.bgmPlaying || this.isMuted) return;
      
      const freq = melody[noteIdx % melody.length];
      noteIdx++;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.04, this.ctx.currentTime + 0.2); // Very gentle background volume
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.8);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(this.ctx.currentTime);
      osc.stop(this.ctx.currentTime + 2.0);
    };

    playNextNote();
    this.bgmInterval = setInterval(playNextNote, 1400);
  }

  stopBGM() {
    this.bgmPlaying = false;
    if (this.bgmInterval) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
  }
}

window.soundFx = new SoundEffects();
