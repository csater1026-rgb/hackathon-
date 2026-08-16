# Class of One — the teacher you never had

**Suvidha AI Virtual Hackathon 2026 submission.**

> Everyone keeps saying AI gives kids *access to answers*. That's true — and
> it's the problem. **Class of One** turns the answer machine into a *teacher*
> for the student who doesn't have one.

---

## Who we built this for

**Marcus, 15, at a rural high school with no computer science teacher.** He's
curious about coding and AI. He has a Chromebook and wifi. What he doesn't
have is a single person to ask when he gets stuck.

When Marcus pastes his broken code into a normal chatbot, it hands him the
finished, fixed code. He pastes it back, it works, and he learned *nothing*.
The next problem, he's just as stuck. An answer machine can't teach — it can
only answer.

## The barrier we remove

**"There is no one to ask when I get stuck."**

Not "he doesn't have access to AI" — he does. The barrier is that access to
*answers* is not the same as access to a *teacher*. A good teacher does the
opposite of an answer machine: they find out what you tried, hand you a hint
instead of the solution, and refuse to let you copy your way past the actual
learning.

## What it does

A web app with three parts, each traceable straight back to Marcus:

1. **A Socratic teacher, not an answer bot.** The AI is instructed to withhold
   finished solutions on purpose. It asks what you tried, teaches one small
   step at a time, and gives escalating *hints* — a nudge, then a bigger hint —
   only revealing a full walkthrough after you've genuinely struggled and asked.
2. **The whole field, not just "learn to code."** Anyone can find a Python
   tutorial. What's invisible to a student with no CS teacher is the *rest* of
   computer science — the subjects with no on-ramp and no one to explain they
   even exist. So there are five guided field tracks, each a short path of
   lessons with a plain-language goal:
   **Programming**, **Cybersecurity** (think like an attacker, passwords,
   hashing, encryption), **Networking** (what happens when you open a website,
   IP/DNS, packets, client/server), **How Computers Work** (binary, the CPU,
   how code runs, the OS), and **Databases & Data** (tables, queries,
   relationships). The teacher adapts to each field and won't force code where
   a good analogy teaches better.
3. **A Code Lab that runs real Python in the browser.** Marcus's locked-down
   school Chromebook can't install Python — so we brought Python to him. Using
   Pyodide (Python compiled to WebAssembly), he writes code, runs it, and sees
   the real output or error, with nothing to install. When he's stuck, one
   button sends his exact code *and* its error to the teacher, turning every
   bug into a lesson instead of a dead end.
4. **Progress that just works.** No login, no account, no setup. Progress and
   chats are saved in the browser (`localStorage`), so it loads instantly on a
   locked-down school Chromebook and works with zero friction.

The **"Feeling stuck?"** buttons are the heart of it: *Give me a nudge* /
*I'm really stuck* / *I think I've got it*. That's a student steering how much
help they get — which is exactly what a real teacher sitting next to them
would offer, and exactly what an answer machine never does.

## Try it

- **Live demo:** _(add your Vercel URL here after deploying)_
- No setup, no install, no login. Open it and start talking to your teacher.

The demo works out of the box in **demo mode** (scripted sample replies, so the
link is never blank). With an API key connected, the full AI teacher is live —
see below.

---

## Stack

- **Front end:** plain HTML, CSS, and vanilla JavaScript. No framework, no
  build step — deliberately, so it loads fast on a weak device.
- **Back end:** a single Vercel serverless function (`api/chat.js`) that proxies
  to any OpenAI-compatible model API. The API key stays server-side and never
  reaches the browser.
- **Model provider:** works with **Featherless AI** (the hackathon's presenting
  sponsor) by default, or any OpenAI-compatible provider (e.g. OpenAI) by
  changing two environment variables.
- **Code Lab:** [Pyodide](https://pyodide.org) (CPython compiled to
  WebAssembly), loaded lazily from a CDN on first run. Runs entirely in the
  student's browser — no server, no install, no account.
- **Storage:** browser `localStorage`. No database, no accounts.

## Run it yourself

```bash
npm i -g vercel      # if you don't have it
vercel dev           # runs the static site + the /api function locally
```

To switch on the real AI teacher, copy `.env.example` to `.env.local` and set
`AI_API_KEY` (plus optionally `AI_BASE_URL` and `AI_MODEL`). To deploy, push to
a Vercel project and set the same variables under
**Settings → Environment Variables**.

## What is fully built vs. mocked

We're being honest here, because the rubric rewards it.

| Part | Status |
| --- | --- |
| Socratic teacher chat, full conversation, per-lesson memory | **Fully built.** Live when an API key is set. |
| The teaching behavior (hint escalation, withholding answers, zero-jargon) | **Fully built** — it's the system prompt in `api/chat.js`. |
| Five CS field tracks (26 lessons), field picker, lesson goals, per-lesson chat + progress | **Fully built.** |
| Code Lab — real in-browser Python (Pyodide/WASM), run + read errors | **Fully built.** Runs actual CPython in the browser; needs the CDN to load on first run. |
| "Ask teacher about this" — sends real code + real output into the chat | **Fully built.** |
| Progress tracking + "stuck" controls, saved locally | **Fully built.** |
| Serverless proxy that keeps the API key private | **Fully built.** |
| **Demo mode** (scripted replies when no key is set) | **Mocked on purpose** — a small scripted fallback so the public link is never blank. Clearly labelled "demo mode" in the UI. The real teacher is the live path. |

Nothing else is faked. The learning path content is real, the teaching prompt
is real, and with a key connected every reply comes from a live model.

## Required disclosures

**AI tools / models used**

- **Model provider — Featherless AI** (OpenAI-compatible API), default model
  `mistralai/Mistral-Nemo-Instruct-2407`, used as the live "teacher" that
  generates every tutoring reply. Swappable to any provider/model via env vars.
- **Claude Code (Anthropic)** — used as a coding assistant to help write and
  structure this project during the build window.
- **Pyodide** — not an AI tool, but disclosed for completeness: it's the
  open-source WebAssembly build of CPython that powers the Code Lab. No model
  or training data is involved.

**Datasets**

- **None.** This project uses no training data, no scraped data, and no
  collected data. The only content we authored is the six-lesson learning path
  in `public/app.js` and the teaching instructions in `api/chat.js`, both
  written by us during the event.

---

_Built during the Suvidha AI Virtual Hackathon 2026 (Aug 15–21). One team, two
people. Every commit is inside the build window._
