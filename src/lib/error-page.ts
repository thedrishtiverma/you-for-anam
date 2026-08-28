export function renderErrorPage(): string {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>A page came loose — YOU, A First Edition</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;1,400&family=EB+Garamond:wght@400&family=JetBrains+Mono:wght@400&display=swap" rel="stylesheet" />
    <style>
      :root { --paper:#F7F3EC; --ink:#1A1A1A; --ink-soft:#5c574f; --wax:#9B2226; --gold:#D4AF37; }
      * { box-sizing: border-box; }
      body {
        margin: 0; min-height: 100vh; display: grid; place-items: center; padding: 1.5rem;
        background-color: var(--paper);
        background-image:
          radial-gradient(at 20% 10%, rgba(214,203,182,.5), transparent 55%),
          radial-gradient(at 80% 85%, rgba(200,186,160,.45), transparent 60%);
        color: var(--ink);
        font-family: "EB Garamond", Georgia, serif;
      }
      .card {
        max-width: 30rem; width: 100%; text-align: center; padding: 3rem 2.5rem;
        border: 1px solid rgba(26,26,26,.14); border-radius: 3px;
        box-shadow: 0 30px 60px -20px rgba(26,26,26,.22);
        background: rgba(255,253,248,.7);
      }
      .kicker { font-family: "JetBrains Mono", ui-monospace, monospace; font-size: 10px;
        letter-spacing: .4em; text-transform: uppercase; color: var(--ink-soft); margin: 0 0 1.25rem; }
      h1 { font-family: "Cormorant Garamond", Georgia, serif; font-weight: 400; font-style: italic;
        font-size: 2rem; margin: 0 0 .75rem; line-height: 1.2; }
      p { color: var(--ink-soft); margin: 0 auto 2rem; max-width: 24rem; line-height: 1.7; }
      .rule { width: 3rem; height: 1px; background: rgba(26,26,26,.2); margin: 0 auto 1.5rem; }
      .actions { display: flex; gap: 1.5rem; justify-content: center; flex-wrap: wrap; }
      a, button {
        font-family: "JetBrains Mono", ui-monospace, monospace; font-size: 10px;
        letter-spacing: .3em; text-transform: uppercase; cursor: pointer;
        background: none; border: 0; border-bottom: 1px solid rgba(26,26,26,.25);
        padding: .35rem .1rem; color: var(--ink-soft); text-decoration: none;
      }
      a:hover, button:hover { color: var(--ink); border-bottom-color: var(--ink); }
      .seal { color: var(--wax); font-size: 11px; letter-spacing: .3em;
        font-family: "JetBrains Mono", ui-monospace, monospace; margin-top: 2rem; }
    </style>
  </head>
  <body>
    <div class="card">
      <p class="kicker">Printing Error</p>
      <h1>A page came loose.</h1>
      <div class="rule"></div>
      <p>The press jammed for a moment. Nothing is lost &mdash; the book is still bound. Try turning back to the beginning.</p>
      <div class="actions">
        <button onclick="location.reload()">Reprint this page</button>
        <a href="/">Back to the cover</a>
      </div>
      <p class="seal">&#8756; FIRST EDITION &#183; 001 OF 001</p>
    </div>
  </body>
</html>`;
}
