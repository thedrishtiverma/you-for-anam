// Quiet sound layer for the book: a synthesized paper rustle on each page turn,
// plus an optional ambient loop. Both are off until the reader turns sound on.

const PREF_KEY = "you-first-edition:sound";

let ctx: AudioContext | null = null;
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

/** Ambient music: streams the song from YouTube in a hidden, looping player. */
const MUSIC_VIDEO_ID = "BTRPBiE_1lA";
let frame: HTMLIFrameElement | null = null;

export function startMusic() {
  if (typeof window === "undefined" || frame) return;
  frame = document.createElement("iframe");
  frame.title = "Background music";
  frame.allow = "autoplay";
  frame.setAttribute("aria-hidden", "true");
  frame.src =
    `https://www.youtube-nocookie.com/embed/${MUSIC_VIDEO_ID}` +
    `?autoplay=1&loop=1&playlist=${MUSIC_VIDEO_ID}&controls=0&modestbranding=1&playsinline=1&enablejsapi=1`;
  Object.assign(frame.style, {
    position: "fixed",
    width: "1px",
    height: "1px",
    left: "-9999px",
    bottom: "0",
    border: "0",
    opacity: "0",
    pointerEvents: "none",
  } satisfies Partial<CSSStyleDeclaration>);
  document.body.appendChild(frame);

  // Soften the volume once the player is ready.
  window.setTimeout(() => {
    frame?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func: "setVolume", args: [22] }),
      "*",
    );
  }, 1500);
}

export function stopMusic() {
  frame?.remove();
  frame = null;
}

