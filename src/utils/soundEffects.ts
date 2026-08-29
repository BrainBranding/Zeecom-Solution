// Audio synthesizer utility using Web Audio API for interactive IP-Audio simulator
class SoundSynthesizer {
  private ctx: AudioContext | null = null;

  private getContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // Play standard professional dual-tone public address chime (e.g. 587Hz -> 880Hz)
  playChime() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;

      // First chime tone (D5 ~ 587 Hz)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(587.33, now);
      gain1.gain.setValueAtTime(0, now);
      gain1.gain.linearRampToValueAtTime(0.25, now + 0.05);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.8);

      // Second chime tone (A5 ~ 880 Hz)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(880, now + 0.35);
      gain2.gain.setValueAtTime(0, now + 0.35);
      gain2.gain.linearRampToValueAtTime(0.3, now + 0.4);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 1.3);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.35);
      osc2.stop(now + 1.3);
    } catch {
      // Audio context policy fallback
    }
  }

  playDualToneChime() {
    this.playChime();
  }

  // Play emergency alert siren warble (simulating 123dB industrial warning sound)
  playEmergencySiren() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      // Siren frequency modulation
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.linearRampToValueAtTime(1100, now + 0.5);
      osc.frequency.linearRampToValueAtTime(600, now + 1.0);
      osc.frequency.linearRampToValueAtTime(1100, now + 1.5);
      osc.frequency.linearRampToValueAtTime(600, now + 2.0);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.1);
      gain.gain.setValueAtTime(0.18, now + 1.9);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 2.2);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 2.2);
    } catch {
      // Audio fallback
    }
  }

  // Play phone ringtone
  playPhoneRing() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;

      // Dual-frequency US standard ringback tone (440Hz + 480Hz)
      [440, 480].forEach(freq => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);
        
        // Ring pulse 1 (0 to 1.2s)
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.1, now + 0.05);
        gain.gain.setValueAtTime(0.1, now + 1.2);
        gain.gain.linearRampToValueAtTime(0, now + 1.25);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 1.5);
      });
    } catch {
      // Audio fallback
    }
  }
}

export const soundFx = new SoundSynthesizer();
