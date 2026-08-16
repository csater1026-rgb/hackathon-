// Class of One — front-end logic.
// No framework, no build step. Runs on a locked-down school Chromebook.
// Progress lives in localStorage, so there is no login and nothing to set up.

// ---------------------------------------------------------------------------
// The curriculum. A student with no teacher doesn't just lack answers — they
// lack a MAP of the whole field. Anyone can find "learn to code" tutorials.
// What's invisible to a kid with no CS teacher is the REST of computer
// science — security, networking, how machines work, data. So the map here is
// not one path but several fields, each a short guided track. Every lesson has
// a plain-language goal the teacher keeps the student moving toward.
// ---------------------------------------------------------------------------
const TRACKS = [
  {
    id: "prog",
    icon: "⌨",
    title: "Programming",
    blurb: "Make a computer do what you say, one instruction at a time.",
    field: "programming and writing code",
    lessons: [
      {
        id: "prog-what-is-code",
        title: "What even is code?",
        sub: "The big idea",
        goal: "Understand that code is just precise instructions a computer follows in order — nothing magic.",
        opener:
          "Welcome! I'm your teacher. Before we touch any code, one question: if you had to explain to a friend how to make a peanut butter sandwich — every single step — how would you start? Type it out however you like. (This is secretly your first lesson in coding.)",
      },
      {
        id: "prog-first-output",
        title: "Making the computer talk",
        sub: "Your first line",
        goal: "Write a line that makes the computer print a message back to you.",
        opener:
          "Every programmer's first victory is making the computer say something back. In Python, there's one word that prints a message to the screen. Have you ever seen the word `print` used that way? Take a guess at how you'd make it say the word hello — even a rough guess is perfect. (Try it in the Code Lab too!)",
      },
      {
        id: "prog-variables",
        title: "Boxes that hold things",
        sub: "Variables",
        goal: "Store a value in a variable and use it — understand a variable as a labelled box.",
        opener:
          "Imagine a box with a label on it, and you can put something inside. That's basically a variable. If you wanted a box labelled `age` holding the number 15, what do you think you'd type? Give it a shot before I say anything.",
      },
      {
        id: "prog-decisions",
        title: "Making choices",
        sub: "if / else",
        goal: "Use an if-statement so the program does different things depending on a condition.",
        opener:
          "Real programs make decisions: IF it's raining, bring an umbrella, otherwise don't. Computers do the same with `if`. In your own words first — no code yet — describe one decision you'd want a program to make.",
      },
      {
        id: "prog-loops",
        title: "Doing things again and again",
        sub: "Loops",
        goal: "Use a loop to repeat an action without copy-pasting it.",
        opener:
          "If you wanted the computer to count from 1 to 10, you could write ten lines… or you could use a loop and write about two. Why do you think repeating things by hand is a bad idea in code? What could go wrong?",
      },
      {
        id: "prog-first-program",
        title: "Build your first real thing",
        sub: "Putting it together",
        goal: "Combine printing, variables, a decision, and a loop into one small working program you designed.",
        opener:
          "You now know the four building blocks that almost every program is made of. Let's build something tiny that's YOURS — a number guessing game, a quiz, a tip calculator, anything. What sounds fun to you? We'll design it together, but you'll write it.",
      },
    ],
  },
  {
    id: "sec",
    icon: "🔐",
    title: "Cybersecurity",
    blurb: "How systems get broken into — and how they're defended.",
    field: "cybersecurity and how systems are attacked and defended",
    lessons: [
      {
        id: "sec-what-is",
        title: "What security really means",
        sub: "The mindset",
        goal: "Understand security as protecting something valuable by imagining how it could be misused.",
        opener:
          "Cybersecurity sounds like hoodies and green text, but it starts with one everyday question. Think of something you'd never want a sibling to read — a diary, your phone. In your own words: what are the different ways someone could get to it? List as many as you can. That list is called a 'threat model', and you just made your first one.",
      },
      {
        id: "sec-think-attacker",
        title: "Think like an attacker",
        sub: "Threat modeling",
        goal: "Learn the three questions that drive all security: what are you protecting, from whom, and how could they get in?",
        opener:
          "Defenders who only think like defenders lose, because attackers don't play fair. Pick anything — your school's front office, an online game account. If you WANTED to break in and you didn't care about the rules, what's the laziest, sneakiest way in you can think of? Don't hold back — this is the exercise.",
      },
      {
        id: "sec-passwords",
        title: "Why passwords break",
        sub: "Brute force",
        goal: "Understand why length beats complexity, by reasoning about how many guesses an attacker must try.",
        opener:
          "Everyone says 'use a strong password', but almost no one explains what makes one strong. Quick instinct check: which do you think is harder to crack — `P@ss1!` or `correct horse battery staple` — and why? Give me your gut answer, then we'll actually count the possibilities in the Code Lab and see if you're right.",
      },
      {
        id: "sec-hashing",
        title: "How sites store passwords",
        sub: "Hashing",
        goal: "Understand hashing as a one-way scramble, and why good sites store hashes, not your actual password.",
        opener:
          "Here's something that surprises people: a well-built website does NOT know your password. It can check it, but it can't read it. How is that even possible? Take a guess at how a site could confirm you typed the right password without storing the password itself. We'll try a real hash in the Code Lab.",
      },
      {
        id: "sec-encryption",
        title: "Scrambling secrets",
        sub: "Encryption & keys",
        goal: "Understand encryption via a Caesar cipher — and the idea of a 'key' that locks and unlocks a message.",
        opener:
          "The oldest trick in cryptography is over 2000 years old and you can do it in your head. Take the word `HELLO` and shift every letter forward by 3 in the alphabet. What do you get? Work it out by hand first — then we'll teach the computer to do it (and to undo it).",
      },
    ],
  },
  {
    id: "net",
    icon: "🌐",
    title: "Networking",
    blurb: "What actually happens when you open a website.",
    field: "computer networking and how the internet moves information",
    lessons: [
      {
        id: "net-what-happens",
        title: "What happens when you open a website",
        sub: "The whole journey",
        goal: "Trace, at a high level, the journey from typing a web address to seeing the page.",
        opener:
          "You type a website and it appears in under a second — but a LOT happens in that second, across the whole planet. Before I explain any of it: walk me through what YOU think happens between pressing Enter and the page showing up. Guesses are perfect. We'll fill in the real steps together.",
      },
      {
        id: "net-addresses",
        title: "The internet's phone book",
        sub: "IP addresses & DNS",
        goal: "Understand that every device has an IP address, and DNS turns names like google.com into those addresses.",
        opener:
          "Computers don't actually know what `google.com` means — they only understand numbers. So how does a name get turned into the right computer, out of billions? Here's a hint: your phone does the same trick every time you tap a contact's name instead of dialing digits. What do you think has to happen behind the scenes?",
      },
      {
        id: "net-packets",
        title: "Everything travels in packets",
        sub: "Packets",
        goal: "Understand that data is split into small packets that travel separately and get reassembled.",
        opener:
          "A movie, a message, a photo — none of it crosses the internet in one piece. It's chopped into thousands of tiny chunks called packets. Why on earth would breaking data into pieces be BETTER than sending it whole? Think about a huge moving job with lots of small trucks vs one giant one. What advantages do the small trucks have?",
      },
      {
        id: "net-client-server",
        title: "Who asks, who answers",
        sub: "Client & server",
        goal: "Understand the request/response model: a client asks, a server answers.",
        opener:
          "Almost everything online is one of two roles: the one asking, or the one answering. When you load Instagram, which is your phone — the asker or the answerer? And what's on the other side? Describe it however makes sense to you, and we'll give the roles their real names.",
      },
      {
        id: "net-ports-protocols",
        title: "The rules of the road",
        sub: "Ports & protocols",
        goal: "Understand protocols (like HTTP/HTTPS) as agreed rules, and ports as numbered doors on a computer.",
        opener:
          "Two computers that have never met can talk perfectly — because they agree on rules in advance. Those rule-sets are called protocols. Think about a phone call: what unspoken 'rules' do both people follow so it works (who speaks, how you start, how you know it ended)? Networking has the exact same idea.",
      },
    ],
  },
  {
    id: "sys",
    icon: "⚙",
    title: "How Computers Work",
    blurb: "Under the hood: from 1s and 0s to a running program.",
    field: "how computers work under the hood, from hardware to running code",
    lessons: [
      {
        id: "sys-binary",
        title: "Everything is 1s and 0s",
        sub: "Binary",
        goal: "Understand why computers use binary, and how numbers can be built from just on/off.",
        opener:
          "A computer, deep down, only knows two things: on and off, 1 and 0. That's it. Yet it can show video and run games. Here's the puzzle to chew on first: if you could only use switches that are ON or OFF, how would you represent the number 5? You have as many switches as you want. Have a go — there's a neat pattern waiting.",
      },
      {
        id: "sys-inside",
        title: "Inside the machine",
        sub: "CPU, memory, storage",
        goal: "Understand the roles of the CPU (does the work), memory/RAM (short-term), and storage (long-term).",
        opener:
          "Three parts do almost everything inside a computer, and they map surprisingly well onto a person doing homework at a desk. There's your brain doing the thinking, the desk you spread papers on right now, and the backpack you store finished work in. Which real computer parts do you think match the brain, the desk, and the backpack?",
      },
      {
        id: "sys-how-code-runs",
        title: "How your code actually runs",
        sub: "Source → machine",
        goal: "Understand that human-readable code must be translated into instructions the CPU can execute.",
        opener:
          "You write `print(\"hi\")` in English-ish words, but the CPU only understands numbers. So something in the middle has to translate. Do you think that translation happens all at once before running, or line by line as it goes? There are actually two approaches with different tradeoffs — take a guess at what they might be.",
      },
      {
        id: "sys-os",
        title: "The manager: your OS",
        sub: "Operating systems",
        goal: "Understand the operating system as the manager that shares the hardware among all your programs.",
        opener:
          "Right now your device runs many programs at once, all wanting the same screen, memory, and processor. Something has to referee so they don't crash into each other — that's the operating system. What do you think would go wrong if there were NO referee and every app just grabbed whatever it wanted?",
      },
      {
        id: "sys-files",
        title: "How data is stored",
        sub: "Files, bytes, formats",
        goal: "Understand that all files are just bytes, and formats are agreements about what those bytes mean.",
        opener:
          "A photo, a song, and an essay are all stored as nothing but numbers — bytes. So how does your computer know one is a picture and another is music? Here's a hint hiding in plain sight: look at the end of any filename. What do you notice, and why might that matter?",
      },
    ],
  },
  {
    id: "data",
    icon: "🗃",
    title: "Databases & Data",
    blurb: "How apps remember everything — and answer questions fast.",
    field: "databases and how structured data is stored and queried",
    lessons: [
      {
        id: "data-what-is",
        title: "What a database really is",
        sub: "The idea",
        goal: "Understand a database as organized storage you can ask precise questions of.",
        opener:
          "Every app you use remembers things — your messages, your scores, your friends. They live in a database. But here's the thing: a database isn't just a place to DUMP data, it's built so you can ASK it questions fast. Think of a giant school with 5000 students. How would you organize their records so you could find one specific kid in seconds?",
      },
      {
        id: "data-tables",
        title: "Tables, rows, and columns",
        sub: "Structure",
        goal: "Understand how data is structured into tables of rows (records) and columns (fields).",
        opener:
          "Most databases organize data like a spreadsheet: a table, with rows and columns. Say we're storing students. What columns (pieces of info) would each student need? And what would one single row represent? Sketch it out in words — you're doing real data design.",
      },
      {
        id: "data-queries",
        title: "Asking questions",
        sub: "Queries",
        goal: "Understand querying — and read the basic shape of a SQL SELECT without memorizing syntax.",
        opener:
          "The magic of a database is the question you can ask it, like 'show me every student in 10th grade, sorted by name.' Databases have a language for this. Before I show you any of it: if you had to invent your OWN way to write that request so a computer understands it exactly, what words would you use and in what order?",
      },
      {
        id: "data-modeling",
        title: "When data connects to data",
        sub: "Relationships",
        goal: "Understand why we split data across related tables instead of repeating it everywhere.",
        opener:
          "Imagine storing every student AND their whole class schedule in one giant table. The teacher's name would get typed in hundreds of times — and if that teacher's name changes, you'd have to fix all of them. That's a nightmare. What do you think a smarter design would do instead of repeating the teacher's name everywhere?",
      },
      {
        id: "data-why",
        title: "Why this powers everything",
        sub: "The big picture",
        goal: "Connect database ideas to the real apps the student uses every day.",
        opener:
          "You now know tables, queries, and relationships — the same ideas behind Instagram, your school's grade portal, and your bank. Pick any app you use a lot. Let's reverse-engineer it together: what tables do you think it secretly has, and how are they connected? Take the first guess.",
      },
    ],
  },
];

const STORAGE_KEY = "classofone.v2";
const ALL_LESSONS = TRACKS.flatMap((t) => t.lessons);

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------
let state = loadState();

function defaultState() {
  return {
    currentTrackId: TRACKS[0].id,
    currentId: TRACKS[0].lessons[0].id,
    done: {},
    chats: {},
  };
}
function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const s = JSON.parse(raw);
      // Heal partial/old state so a stray value never blanks the app.
      if (!s.currentTrackId || !TRACKS.find((t) => t.id === s.currentTrackId)) {
        s.currentTrackId = TRACKS[0].id;
      }
      if (!s.currentId || !ALL_LESSONS.find((l) => l.id === s.currentId)) {
        s.currentId = currentTrackFrom(s.currentTrackId).lessons[0].id;
      }
      s.done = s.done || {};
      s.chats = s.chats || {};
      return s;
    }
  } catch (_) {}
  return defaultState();
}
function saveState() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (_) {}
}

function currentTrackFrom(id) {
  return TRACKS.find((t) => t.id === id) || TRACKS[0];
}
function currentTrack() {
  return currentTrackFrom(state.currentTrackId);
}
function currentLesson() {
  return ALL_LESSONS.find((l) => l.id === state.currentId) || currentTrack().lessons[0];
}
function chatFor(id) {
  if (!state.chats[id]) state.chats[id] = [];
  return state.chats[id];
}

// ---------------------------------------------------------------------------
// DOM refs
// ---------------------------------------------------------------------------
const $ = (s) => document.querySelector(s);
const trackPickerEl = $("#track-picker");
const trackTitleEl = $("#track-title");
const trackBlurbEl = $("#track-blurb");
const pathEl = $("#path");
const messagesEl = $("#messages");
const composer = $("#composer");
const input = $("#chat-input");
const sendBtn = $("#send-btn");
const lessonEyebrow = $("#lesson-eyebrow");
const lessonTitle = $("#lesson-title");
const lessonGoal = $("#lesson-goal");
const modePill = $("#mode-pill");
const progressText = $("#progress-text");
const progressFill = $("#progress-fill");
const progressOuter = $("#progress-bar-outer");

// ---------------------------------------------------------------------------
// Render
// ---------------------------------------------------------------------------
function renderTracks() {
  trackPickerEl.innerHTML = "";
  TRACKS.forEach((track) => {
    const btn = document.createElement("button");
    btn.className = "track-btn" + (track.id === state.currentTrackId ? " active" : "");
    btn.setAttribute("role", "tab");
    btn.setAttribute("aria-selected", String(track.id === state.currentTrackId));
    btn.title = track.blurb;
    const doneInTrack = track.lessons.filter((l) => state.done[l.id]).length;
    btn.innerHTML = `
      <span class="track-icon" aria-hidden="true">${track.icon}</span>
      <span class="track-name">${track.title}</span>
      ${doneInTrack ? `<span class="track-badge">${doneInTrack}/${track.lessons.length}</span>` : ""}`;
    btn.addEventListener("click", () => selectTrack(track.id));
    trackPickerEl.appendChild(btn);
  });
}

function renderPath() {
  const track = currentTrack();
  trackTitleEl.textContent = track.title;
  trackBlurbEl.textContent = track.blurb;

  pathEl.innerHTML = "";
  track.lessons.forEach((lesson, i) => {
    const li = document.createElement("li");
    li.className =
      (lesson.id === state.currentId ? "active " : "") +
      (state.done[lesson.id] ? "done" : "");
    li.setAttribute("role", "button");
    li.tabIndex = 0;
    const isDone = !!state.done[lesson.id];
    li.innerHTML = `
      <span class="dot">${isDone ? "✓" : i + 1}</span>
      <span>
        <span class="l-title">${lesson.title}</span><br />
        <span class="l-sub">${lesson.sub}</span>
      </span>`;
    const go = () => selectLesson(lesson.id);
    li.addEventListener("click", go);
    li.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); }
    });
    pathEl.appendChild(li);
  });

  const doneCount = track.lessons.filter((l) => state.done[l.id]).length;
  const pct = Math.round((doneCount / track.lessons.length) * 100);
  progressText.textContent = `${doneCount} of ${track.lessons.length} in ${track.title}`;
  progressFill.style.width = pct + "%";
  progressOuter.setAttribute("aria-valuenow", String(pct));
}

function renderLessonHeader() {
  const l = currentLesson();
  const t = currentTrack();
  lessonEyebrow.textContent = `${t.icon} ${t.title}`;
  lessonTitle.textContent = l.title;
  lessonGoal.textContent = l.goal;
}

function bubbleHTML(text) {
  // Minimal, safe markdown: escape everything, then re-enable code spans/blocks.
  const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  let out = esc(text);
  out = out.replace(/```([\s\S]*?)```/g, (_, code) => `<pre><code>${code.trim()}</code></pre>`);
  out = out.replace(/`([^`]+)`/g, (_, code) => `<code>${code}</code>`);
  return out;
}

function addMessage(role, text, opts = {}) {
  const wrap = document.createElement("div");
  wrap.className = `msg ${role === "user" ? "student" : "teacher"}` + (opts.typing ? " typing" : "");
  const avatar = role === "user" ? "You" : "◆";
  wrap.innerHTML = `
    <div class="avatar" aria-hidden="true">${avatar}</div>
    <div class="bubble">${opts.typing ? "your teacher is thinking…" : bubbleHTML(text)}</div>`;
  messagesEl.appendChild(wrap);
  messagesEl.scrollTop = messagesEl.scrollHeight;
  return wrap;
}

function renderChat() {
  messagesEl.innerHTML = "";
  const l = currentLesson();
  const history = chatFor(l.id);
  if (history.length === 0) {
    // First time on this lesson: the teacher opens with the lesson's hook.
    history.push({ role: "assistant", content: l.opener });
    saveState();
  }
  history.forEach((m) => addMessage(m.role, m.content));
}

// ---------------------------------------------------------------------------
// Actions
// ---------------------------------------------------------------------------
function selectTrack(trackId) {
  if (trackId === state.currentTrackId) return;
  state.currentTrackId = trackId;
  // Resume where they were in this track, or start it at lesson one.
  const track = currentTrack();
  const inTrack = track.lessons.find((l) => l.id === state.currentId);
  if (!inTrack) {
    const firstUndone = track.lessons.find((l) => !state.done[l.id]);
    state.currentId = (firstUndone || track.lessons[0]).id;
  }
  saveState();
  renderTracks();
  renderPath();
  renderLessonHeader();
  renderChat();
  input.focus();
}

function selectLesson(id) {
  state.currentId = id;
  saveState();
  renderPath();
  renderLessonHeader();
  renderChat();
  input.focus();
}

async function send(text) {
  const l = currentLesson();
  const t = currentTrack();
  const history = chatFor(l.id);

  history.push({ role: "user", content: text });
  addMessage("user", text);
  saveState();

  sendBtn.disabled = true;
  const typing = addMessage("assistant", "", { typing: true });

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: history.slice(-12), // keep context small & fast
        lessonContext: `Field: ${t.title} — ${t.field}. Lesson: ${l.title}. Goal: ${l.goal}`,
      }),
    });
    const data = await res.json();
    const reply = data.reply || data.error || "Hmm, I didn't catch that — try again?";
    typing.remove();
    history.push({ role: "assistant", content: reply });
    addMessage("assistant", reply);
    saveState();
    setMode(data.mode);
  } catch (err) {
    typing.remove();
    addMessage("assistant", "I couldn't reach my brain just now — check your connection and try again in a moment.");
  } finally {
    sendBtn.disabled = false;
    input.focus();
  }
}

const STUCK_PROMPTS = {
  little: "I'm a little stuck. Can you give me a small nudge in the right direction — but please don't tell me the whole answer?",
  lot: "I'm really stuck and I've been trying. Can you give me a bigger hint? Still, I'd like to figure it out myself.",
  done: "I think I've got this lesson. Can you give me one quick question to check I really understand it before I move on?",
};

function markDoneAndAdvance() {
  const l = currentLesson();
  const track = currentTrack();
  state.done[l.id] = true;
  const idx = track.lessons.findIndex((x) => x.id === l.id);
  const next = track.lessons[idx + 1];
  saveState();
  renderTracks();
  renderPath();
  if (next) {
    addMessage("assistant", `Nice work — that's "${l.title}" done. ✓ Whenever you're ready, click "${next.title}" on the left and we'll keep going.`);
  } else {
    addMessage("assistant", `That's the whole ${track.title} track finished — every lesson done. ✓ You just taught yourself a field of computer science with no teacher in your school. That's the entire point. Pick another field at the top left and keep going. 🎉`);
  }
}

// ---------------------------------------------------------------------------
// Mode pill (live model vs demo mode) — honest about "built vs mocked"
// ---------------------------------------------------------------------------
function setMode(mode) {
  if (!mode) return;
  modePill.classList.remove("live", "demo");
  if (mode === "live") {
    modePill.classList.add("live");
    modePill.textContent = "● live AI";
    modePill.title = "A live AI model is connected and responding.";
  } else {
    modePill.classList.add("demo");
    modePill.textContent = "demo mode";
    modePill.title = "No API key connected yet, so the teacher is running scripted sample replies.";
  }
}

// ---------------------------------------------------------------------------
// Wire up
// ---------------------------------------------------------------------------
composer.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  input.value = "";
  input.style.height = "auto";
  send(text);
});

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    composer.requestSubmit();
  }
});
input.addEventListener("input", () => {
  input.style.height = "auto";
  input.style.height = Math.min(input.scrollHeight, 160) + "px";
});

document.querySelectorAll(".stuck-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const kind = btn.dataset.stuck;
    if (kind === "done") {
      // Mark progress locally AND ask the teacher to check understanding.
      send(STUCK_PROMPTS.done);
      markDoneAndAdvance();
    } else {
      send(STUCK_PROMPTS[kind]);
    }
  });
});

$("#reset-btn").addEventListener("click", () => {
  if (confirm("Start everything over? This clears your progress and chats on this device.")) {
    state = defaultState();
    saveState();
    renderTracks();
    renderPath();
    renderLessonHeader();
    renderChat();
  }
});

// ---------------------------------------------------------------------------
// Code Lab: a real Python runner in the browser via Pyodide (Python -> WASM).
// Marcus can't install Python on a locked-down Chromebook, so this is where he
// actually runs and debugs code — and hands his errors straight to the teacher.
// Pyodide is loaded lazily on first Run, so the app stays fast until it's used.
// ---------------------------------------------------------------------------
const PYODIDE_URL = "https://cdn.jsdelivr.net/pyodide/v0.26.2/full/pyodide.js";
let pyodidePromise = null;
let lastRun = { code: "", output: "" };

const labToggle = $("#lab-toggle");
const codeLab = $("#code-lab");
const labEditor = $("#lab-editor");
const labOutput = $("#lab-output");
const labStatus = $("#lab-status");
const labRun = $("#lab-run");

function openLab(open) {
  codeLab.hidden = !open;
  labToggle.setAttribute("aria-expanded", String(open));
  if (open) labEditor.focus();
}
labToggle.addEventListener("click", () => openLab(codeLab.hidden));
$("#lab-close").addEventListener("click", () => openLab(false));
$("#lab-clear").addEventListener("click", () => {
  labEditor.value = "";
  labOutput.textContent = "Press ▶ Run to see what your code does.";
  labOutput.classList.remove("error");
  labEditor.focus();
});

// Let Tab indent instead of leaving the editor.
labEditor.addEventListener("keydown", (e) => {
  if (e.key === "Tab") {
    e.preventDefault();
    const s = labEditor.selectionStart, en = labEditor.selectionEnd;
    labEditor.value = labEditor.value.slice(0, s) + "    " + labEditor.value.slice(en);
    labEditor.selectionStart = labEditor.selectionEnd = s + 4;
  }
});

function loadPyodide() {
  if (pyodidePromise) return pyodidePromise;
  labStatus.textContent = "starting Python… (first run only)";
  pyodidePromise = new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = PYODIDE_URL;
    s.onload = async () => {
      try {
        const py = await window.loadPyodide();
        resolve(py);
      } catch (e) { reject(e); }
    };
    s.onerror = () => reject(new Error("Could not load the Python engine — check your connection."));
    document.head.appendChild(s);
  });
  return pyodidePromise;
}

labRun.addEventListener("click", async () => {
  const code = labEditor.value;
  labRun.disabled = true;
  labOutput.classList.remove("error");
  labOutput.textContent = "Running…";
  try {
    const py = await loadPyodide();
    labStatus.textContent = "runs in your browser — nothing to install";
    // Capture stdout and stderr from the student's program.
    py.setStdout({ batched: (t) => appendOut(t) });
    py.setStderr({ batched: (t) => appendOut(t) });
    labOutput.textContent = "";
    let ok = true;
    try {
      await py.runPythonAsync(code);
    } catch (err) {
      ok = false;
      labOutput.classList.add("error");
      appendOut("\n" + String(err.message || err));
    }
    if (ok && labOutput.textContent.trim() === "") {
      labOutput.textContent = "(your code ran, but didn't print anything — try adding a print(...))";
    }
    lastRun = { code, output: labOutput.textContent };
  } catch (err) {
    labOutput.classList.add("error");
    labOutput.textContent = String(err.message || err);
    labStatus.textContent = "couldn't start Python";
  } finally {
    labRun.disabled = false;
  }
});

function appendOut(t) {
  labOutput.textContent += t;
  labOutput.scrollTop = labOutput.scrollHeight;
}

// The loop-closer: take what the student actually ran and what happened, and
// ask the teacher about it — so debugging becomes a teaching moment.
$("#lab-ask").addEventListener("click", () => {
  const code = labEditor.value.trim();
  if (!code) { labEditor.focus(); return; }
  const output = (lastRun.code === labEditor.value ? lastRun.output : "").trim();
  const msg =
    "I ran this code:\n```\n" + code + "\n```\n" +
    (output ? "and got this:\n```\n" + output + "\n```\n" : "(I haven't run it yet.)\n") +
    "Can you help me understand it without just fixing it for me?";
  openLab(false);
  send(msg);
});

// Detect mode on load with a tiny ping so the pill is correct immediately.
(async function detectMode() {
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: [] }),
    });
    const data = await res.json();
    setMode(data.mode);
  } catch (_) {
    setMode("demo");
  }
})();

// Boot
renderTracks();
renderPath();
renderLessonHeader();
renderChat();
