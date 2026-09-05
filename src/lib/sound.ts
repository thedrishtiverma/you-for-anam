// Quiet sound layer for the book: a synthesized paper rustle on each page turn,
// plus an optional ambient loop. Both are off until the reader turns sound on.

const PREF_KEY = "you-first-edition:sound";
const MUSIC_SRC = "/audio/ambience.mp3";

let ctx: AudioContext | null = null;
let music: HTMLAudioElement | null = null;
let lastRustle = 0;

export function soundEnabled(): boolean {
  try {
    return localStorage.getItem(PREF_KEY) === "on";
  } catch {
    return false;
  }
}

export function setSoundEnabled(on: boolean) {
  try {
    localStorage.setItem(PREF_KEY, on ? "on" : "off");
  } catch {
    /* storage unavailable */
  }
  if (on) startMusic();
  else stopMusic();
}

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const Ctor =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return null;
  if (!ctx) ctx = new Ctor();
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

/** A soft filtered-noise sweep — paper, not a click. Debounced so fast flipping stays gentle. */
export function playPageTurn() {
  if (!soundEnabled()) return;
  const now = Date.now();
  if (now - lastRustle < 220) return;
  lastRustle = now;

  const ac = getCtx();
  if (!ac) return;

  const dur = 0.28;
  const buffer = ac.createBuffer(1, Math.floor(ac.sampleRate * dur), ac.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) {
    const t = i / data.length;
    data[i] = (Math.random() * 2 - 1) * Math.pow(1 - t, 2.2) * Math.min(1, t * 12);
  }

  const src = ac.createBufferSource();
  src.buffer = buffer;

  const band = ac.createBiquadFilter();
  band.type = "bandpass";
  band.frequency.setValueAtTime(900, ac.currentTime);
  band.frequency.exponentialRampToValueAtTime(2600, ac.currentTime + dur);
  band.Q.value = 0.7;

  const gain = ac.createGain();
  gain.gain.value = 0.09;

  src.connect(band).connect(gain).connect(ac.destination);
  src.start();
  src.stop(ac.currentTime + dur);
}

/** Ambient loop. Silently does nothing until an audio file exists at MUSIC_SRC. */
export function startMusic() {
  if (typeof window === "undefined") return;
  if (!music) {
    music = new Audio(MUSIC_SRC);
    music.loop = true;
    music.volume = 0;
    music.addEventListener("error", () => {
      music = null;
    });
  }
  void music.play().then(
    () => fade(music!, 0.18),
    () => {
      /* blocked or missing file — stay silent */
    },
  );
}

export function stopMusic() {
  if (music) fade(music, 0, () => music?.pause());
}

function fade(el: HTMLAudioElement, to: number, done?: () => void) {
  const from = el.volume;
  const start = performance.now();
  const step = (t: number) => {
    const k = Math.min(1, (t - start) / 900);
    el.volume = from + (to - from) * k;
    if (k < 1) requestAnimationFrame(step);
    else done?.();
  };
  requestAnimationFrame(step);
}
