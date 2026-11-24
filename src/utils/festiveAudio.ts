// Synthesized Web Audio API holiday soundscape: gentle celesta music box + distant hearth crackle

const MELODY_NOTES: Array<{freq: number; duration: number}> = [
  // Gentle Silent Night inspired celesta phrase in G major
  {freq: 392.0, duration: 1.2}, // G4
  {freq: 440.0, duration: 0.5}, // A4
  {freq: 392.0, duration: 0.9}, // G4
  {freq: 329.63, duration: 2.0}, // E4
  {freq: 392.0, duration: 1.2}, // G4
  {freq: 440.0, duration: 0.5}, // A4
  {freq: 392.0, duration: 0.9}, // G4
  {freq: 329.63, duration: 2.0}, // E4
  {freq: 587.33, duration: 1.4}, // D5
  {freq: 587.33, duration: 0.7}, // D5
  {freq: 493.88, duration: 2.1}, // B4
  {freq: 523.25, duration: 1.4}, // C5
  {freq: 523.25, duration: 0.7}, // C5
  {freq: 392.0, duration: 2.2}, // G4
  {freq: 440.0, duration: 1.4}, // A4
  {freq: 440.0, duration: 0.7}, // A4
  {freq: 523.25, duration: 1.2}, // C5
  {freq: 493.88, duration: 0.5}, // B4
  {freq: 440.0, duration: 0.9}, // A4
  {freq: 392.0, duration: 1.2}, // G4
  {freq: 440.0, duration: 0.5}, // A4
  {freq: 392.0, duration: 0.9}, // G4
  {freq: 329.63, duration: 2.4}, // E4
];

class FestiveAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private noiseSource: AudioBufferSourceNode | null = null;
  private timerId: number | null = null;
  private crackleTimerId: number | null = null;
  private noteIndex = 0;
  private running = false;

  public start(): void {
    if (this.running) return;
    const AudioCtx = window.AudioContext || (window as unknown as {webkitAudioContext: typeof AudioContext}).webkitAudioContext;
    if (!AudioCtx) return;

    this.ctx = new AudioCtx();
    if (this.ctx.state === 'suspended') {
      void this.ctx.resume();
    }

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    this.masterGain.gain.exponentialRampToValueAtTime(0.35, this.ctx.currentTime + 1.2);
    this.masterGain.connect(this.ctx.destination);

    this.running = true;
    this.noteIndex = 0;
    this.startHearthBed();
    this.scheduleNextNote();
  }

  public stop(): void {
    this.running = false;
    if (this.timerId !== null) {
      window.clearTimeout(this.timerId);
      this.timerId = null;
    }
    if (this.crackleTimerId !== null) {
      window.clearTimeout(this.crackleTimerId);
      this.crackleTimerId = null;
    }
    if (this.noiseSource) {
      try {
        this.noiseSource.stop();
      } catch {
        // Ignore already stopped buffer
      }
      this.noiseSource = null;
    }
    if (this.ctx) {
      void this.ctx.close();
      this.ctx = null;
    }
    this.masterGain = null;
  }

  private startHearthBed(): void {
    if (!this.ctx || !this.masterGain) return;
    const sampleRate = this.ctx.sampleRate;
    const bufferLength = sampleRate * 3;
    const buffer = this.ctx.createBuffer(1, bufferLength, sampleRate);
    const data = buffer.getChannelData(0);

    // Warm brown noise bed for distant fireplace rumble
    let lastOut = 0;
    for (let i = 0; i < bufferLength; i++) {
      const white = Math.random() * 2 - 1;
      lastOut = (lastOut + 0.02 * white) / 1.02;
      data[i] = lastOut * 1.4;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 340;

    const bedGain = this.ctx.createGain();
    bedGain.gain.value = 0.08;

    noise.connect(filter);
    filter.connect(bedGain);
    bedGain.connect(this.masterGain);
    noise.start();
    this.noiseSource = noise;

    this.scheduleCrackle();
  }

  private scheduleCrackle(): void {
    if (!this.running || !this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const popGain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(900 + Math.random() * 1400, now);
    osc.frequency.exponentialRampToValueAtTime(140, now + 0.035);

    filter.type = 'bandpass';
    filter.frequency.value = 1800;
    filter.Q.value = 1.5;

    const peak = 0.015 + Math.random() * 0.025;
    popGain.gain.setValueAtTime(0.0001, now);
    popGain.gain.exponentialRampToValueAtTime(peak, now + 0.004);
    popGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

    osc.connect(filter);
    filter.connect(popGain);
    popGain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.045);

    const nextDelay = 180 + Math.random() * 820;
    this.crackleTimerId = window.setTimeout(() => this.scheduleCrackle(), nextDelay);
  }

  private scheduleNextNote(): void {
    if (!this.running || !this.ctx || !this.masterGain) return;

    const note = MELODY_NOTES[this.noteIndex % MELODY_NOTES.length];
    this.playCelestaNote(note.freq, note.duration);
    this.noteIndex = (this.noteIndex + 1) % MELODY_NOTES.length;

    const pauseAfterPhrase = this.noteIndex === 0 ? 1200 : 0;
    this.timerId = window.setTimeout(
      () => this.scheduleNextNote(),
      note.duration * 1000 + pauseAfterPhrase,
    );
  }

  private playCelestaNote(freq: number, duration: number): void {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    const oscFundamental = this.ctx.createOscillator();
    const oscHarmonic = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();
    const harmonicGain = this.ctx.createGain();

    oscFundamental.type = 'sine';
    oscFundamental.frequency.setValueAtTime(freq, now);

    oscHarmonic.type = 'triangle';
    oscHarmonic.frequency.setValueAtTime(freq * 2, now);

    harmonicGain.gain.setValueAtTime(0.14, now);
    harmonicGain.gain.exponentialRampToValueAtTime(0.001, now + Math.min(duration, 1.1));

    noteGain.gain.setValueAtTime(0.0001, now);
    noteGain.gain.exponentialRampToValueAtTime(0.16, now + 0.025);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration + 0.9);

    oscFundamental.connect(noteGain);
    oscHarmonic.connect(harmonicGain);
    harmonicGain.connect(noteGain);
    noteGain.connect(this.masterGain);

    oscFundamental.start(now);
    oscHarmonic.start(now);
    oscFundamental.stop(now + duration + 1.0);
    oscHarmonic.stop(now + duration + 1.0);
  }
}

export const festiveAudio = new FestiveAudioEngine();
