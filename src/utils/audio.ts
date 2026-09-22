/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Subtle Synthesized Web Audio Manager
// High-tech, non-intrusive sensory interface sounds generated dynamically via Web Audio API.
// No external MP3 files or network requests required.

let audioCtx: AudioContext | null = null;
let soundEnabled = false;
let masterVolume = 0.5; // 0.0 to 1.0
let lastHoverTime = 0;
const HOVER_THROTTLE_MS = 45; // Prevents audio stuttering during rapid cursor movement

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export const audioManager = {
  /**
   * Set global audio enable/disable state
   */
  setEnabled(enabled: boolean) {
    soundEnabled = enabled;
    if (enabled) {
      getAudioContext();
    }
  },

  /**
   * Get current sound toggle state
   */
  isEnabled(): boolean {
    return soundEnabled;
  },

  /**
   * Adjust master volume (0.0 to 1.0)
   */
  setVolume(vol: number) {
    masterVolume = Math.max(0, Math.min(1, vol));
  },

  /**
   * Get current volume level
   */
  getVolume(): number {
    return masterVolume;
  },

  /**
   * Soft, high-tech hover ping for navigation links, buttons, and command chips
   */
  playHoverPing(freq = 1450, duration = 0.03) {
    if (!soundEnabled) return;
    const now = performance.now();
    if (now - lastHoverTime < HOVER_THROTTLE_MS) return;
    lastHoverTime = now;

    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      // Gentle bandpass to give it a refined, high-tech glass ping
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(freq, ctx.currentTime);
      filter.Q.setValueAtTime(2.5, ctx.currentTime);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.08, ctx.currentTime + duration);

      const targetGain = 0.018 * masterVolume;
      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(targetGain, ctx.currentTime + 0.005);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Graceful fallback
    }
  },

  /**
   * Tactile micro-switch click for interactive buttons and tab switches
   */
  playNavClick(frequency = 720, duration = 0.035) {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(frequency * 0.45, ctx.currentTime + duration);

      const targetGain = 0.035 * masterVolume;
      gain.gain.setValueAtTime(targetGain, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Ignore audio errors
    }
  },

  /**
   * Organic terminal typing keystroke sound
   * Randomizes pitch subtly around 880Hz to mimic high-end tactile terminal switches
   */
  playTerminalKeystroke() {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      // Slight natural pitch jitter (±40Hz)
      const jitter = (Math.random() - 0.5) * 80;
      const baseFreq = 840 + jitter;
      const duration = 0.022;

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1800, ctx.currentTime);

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.65, ctx.currentTime + duration);

      const targetGain = 0.022 * masterVolume;
      gain.gain.setValueAtTime(targetGain, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Ignore
    }
  },

  /**
   * Futuristic confirmation chirp for terminal command execution
   */
  playCommandExecute() {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(560, now);
      osc.frequency.exponentialRampToValueAtTime(980, now + 0.06);

      const targetGain = 0.038 * masterVolume;
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(targetGain, now + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.09);
    } catch {
      // Ignore
    }
  },

  /**
   * Dual-tone notification sound when toggling audio on or off
   */
  playToggleChime(enabled: boolean) {
    if (!soundEnabled && !enabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const freq1 = enabled ? 520 : 740;
      const freq2 = enabled ? 780 : 420;

      [
        { f: freq1, t: now },
        { f: freq2, t: now + 0.055 },
      ].forEach(({ f, t }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, t);
        osc.frequency.exponentialRampToValueAtTime(f * 0.95, t + 0.05);

        gain.gain.setValueAtTime(0.03 * masterVolume, t);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.05);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(t);
        osc.stop(t + 0.055);
      });
    } catch {
      // Ignore
    }
  },

  /**
   * Harmonious tri-tone chord for completions, imports, and milestones
   */
  playSuccessChime() {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      [523.25, 659.25, 783.99].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.065);

        gain.gain.setValueAtTime(0.028 * masterVolume, now + idx * 0.065);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.065 + 0.16);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.065);
        osc.stop(now + idx * 0.065 + 0.16);
      });
    } catch {
      // Ignore
    }
  },
};

// Backward-compatibility wrappers for existing components
export function setSoundEnabled(enabled: boolean) {
  audioManager.setEnabled(enabled);
}

export function isSoundEnabled(): boolean {
  return audioManager.isEnabled();
}

export function playCyberClick(frequency = 600, duration = 0.04) {
  audioManager.playNavClick(frequency, duration);
}

export function playTerminalBeep() {
  audioManager.playCommandExecute();
}

export function playSuccessChime() {
  audioManager.playSuccessChime();
}
