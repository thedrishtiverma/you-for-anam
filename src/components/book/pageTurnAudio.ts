// Ambient page-turn sound: a soft paper rustle synthesized with the Web Audio API.
// Two layered voices — a filtered noise "sweep" (the paper) and a very low
// thump (the page settling) — timed to match the 0.7s page-flip animation.
// No external assets; nothing autoplays; volume is intentionally gentle.

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let noiseBuffer: AudioBuffer | null = null;
let lastPlayedAt = 0;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const AC =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!AC) return null;
  if (!ctx) {
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0.28; // gentle overall ceiling
    master.connect(ctx.destination);
  }
  return ctx;
}

function getNoiseBuffer(context: AudioContext): AudioBuffer {
  if (noiseBuffer && noiseBuffer.sampleRate === context.sampleRate) {
    return noiseBuffer;
  }
  // ~1s of pink-ish noise (Voss-McCartney approximation) — softer than white.
  const length = Math.floor(context.sampleRate * 1.0);
  const buffer = context.createBuffer(1, length, context.sampleRate);
  const data = buffer.getChannelData(0);
  let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
  for (let i = 0; i < length; i++) {
    const white = Math.random() * 2 - 1;
    b0 = 0.99886 * b0 + white * 0.0555179;
    b1 = 0.99332 * b1 + white * 0.0750759;
    b2 = 0.96900 * b2 + white * 0.1538520;
    b3 = 0.86650 * b3 + white * 0.3104856;
    b4 = 0.55000 * b4 + white * 0.5329522;
    b5 = -0.7616 * b5 - white * 0.0168980;
    data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
    b6 = white * 0.115926;
  }
  noiseBuffer = buffer;
  return buffer;
}

export function playPageTurn(direction: 1 | -1 = 1) {
  const context = getCtx();
  if (!context || !master) return;

  const now = context.currentTime;
  // Debounce so rapid swipes don't stack into a roar.
  if (now - lastPlayedAt < 0.32) return;
  lastPlayedAt = now;

  if (context.state === "suspended") {
    void context.resume();
  }

  const buffer = getNoiseBuffer(context);

  // --- Voice 1: paper rustle (filtered noise sweep) ---
  const rustle = context.createBufferSource();
  rustle.buffer = buffer;
  rustle.playbackRate.value = direction > 0 ? 1.0 : 0.85;

  const bandpass = context.createBiquadFilter();
  bandpass.type = "bandpass";
  bandpass.Q.value = 0.9;
  // Sweep the "brightness" of the rustle across the animation window.
  const startHz = direction > 0 ? 1800 : 1400;
  const endHz = direction > 0 ? 3200 : 2400;
  bandpass.frequency.setValueAtTime(startHz, now);
  bandpass.frequency.exponentialRampToValueAtTime(endHz, now + 0.35);
  bandpass.frequency.exponentialRampToValueAtTime(900, now + 0.7);

  const highpass = context.createBiquadFilter();
  highpass.type = "highpass";
  highpass.frequency.value = 700;

  const rustleGain = context.createGain();
  rustleGain.gain.setValueAtTime(0.0001, now);
  rustleGain.gain.exponentialRampToValueAtTime(0.22, now + 0.06);
  rustleGain.gain.exponentialRampToValueAtTime(0.14, now + 0.28);
  rustleGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.72);

  rustle.connect(bandpass).connect(highpass).connect(rustleGain).connect(master);
  rustle.start(now);
  rustle.stop(now + 0.8);

  // --- Voice 2: page settling (very low, short thump) ---
  const thump = context.createOscillator();
  thump.type = "sine";
  thump.frequency.setValueAtTime(120, now);
  thump.frequency.exponentialRampToValueAtTime(60, now + 0.22);

  const thumpGain = context.createGain();
  thumpGain.gain.setValueAtTime(0.0001, now);
  thumpGain.gain.exponentialRampToValueAtTime(0.06, now + 0.03);
  thumpGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

  thump.connect(thumpGain).connect(master);
  thump.start(now);
  thump.stop(now + 0.4);
}
