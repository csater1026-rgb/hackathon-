// Class of One — front-end logic.
// No framework, no build step. Runs on a locked-down school Chromebook.
// Progress lives in localStorage, so there is no login and nothing to set up.

// ---------------------------------------------------------------------------
// The learning path. A student with no teacher doesn't just lack answers —
// they lack a MAP. This is the map: a first real path into coding, in small
// steps, each with a plain-language goal the teacher keeps them moving toward.
// ---------------------------------------------------------------------------
const CURRICULUM = [
  {
    id: "what-is-code",
    title: "What even is code?",
    sub: "The big idea",
    goal: "Understand that code is just precise instructions a computer follows in order — nothing magic.",
    opener:
      "Welcome! I'm your teacher. Before we touch any code, one question: if you had to explain to a friend how to make a peanut butter sandwich — every single step — how would you start? Type it out however you like. (This is secretly your first lesson in coding.)",
  },
  {
    id: "first-output",
    title: "Making the computer talk",
    sub: "Your first line",
    goal: "Write a line that makes the computer print a message back to you.",
    opener:
      "Every programmer's first victory is making the computer say something back. In Python, there's one word that prints a message to the screen. Have you ever seen the word `print` used that way? Take a guess at how you'd make it say the word hello — even a rough guess is perfect.",
  },
  {
    id: "variables",
    title: "Boxes that hold things",
    sub: "Variables",
    goal: "Store a value in a variable and use it — understand a variable as a labelled box.",
    opener:
      "Imagine a box with a label on it, and you can put something inside. That's basically a variable. If you wanted a box labelled `age` holding the number 15, what do you think you'd type? Give it a shot before I say anything.",
  },
  {
    id: "decisions",
    title: "Making choices",
    sub: "if / else",
    goal: "Use an if-statement so the program does different things depending on a condition.",
    opener:
      "Real programs make decisions: IF it's raining, bring an umbrella, otherwise don't. Computers do the same with `if`. In your own words first — no code yet — describe one decision you'd want a program to make.",
  },
  {
    id: "loops",
    title: "Doing things again and again",
    sub: "Loops",
    goal: "Use a loop to repeat an action without copy-pasting it.",
    opener:
      "If you wanted the computer to count from 1 to 10, you could write ten lines… or you could use a loop and write about two. Why do you think repeating things by hand is a bad idea in code? What could go wrong?",
  },
  {
    id: "first-program",
    title: "Build your first real thing",
    sub: "Putting it together",
    goal: "Combine printing, variables, a decision, and a loop into one small working program you designed.",
    opener:
      "You now know the four building blocks that almost every program is made of. Let's build something tiny that's YOURS — a number guessing game, a quiz, a tip calculator, anything. What sounds fun to you? We'll design it together, but you'll write it.",
  },
];

const STORAGE_KEY = "classofone.v1";

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------
let state = loadState();

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (_) {}
  return { currentId: CURRICULUM[0].id, done: {}, chats: {} };
}
function saveState() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (_) {}
}

function currentLesson() {
  return CURRICULUM.find((l) => l.id === state.currentId) || CURRICULUM[0];
}
function chatFor(id) {
  if (!state.chats[id]) state.chats[id] = [];
  return state.chats[id];
}

// ---------------------------------------------------------------------------
// DOM refs
// ---------------------------------------------------------------------------
const $ = (s) => document.querySelector(s);
const pathEl = $("#path");
const messagesEl = $("#messages");
const composer = $("#composer");
const input = $("#chat-input");
const sendBtn = $("#send-btn");
const lessonTitle = $("#lesson-title");
const lessonGoal = $("#lesson-goal");
const modePill = $("#mode-pill");
const progressText = $("#progress-text");
const progressFill = $("#progress-fill");
const progressOuter = $("#progress-bar-outer");

// ---------------------------------------------------------------------------
// Render
// ---------------------------------------------------------------------------
function renderPath() {
  pathEl.innerHTML = "";
  CURRICULUM.forEach((lesson, i) => {
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

  const doneCount = CURRICULUM.filter((l) => state.done[l.id]).length;
  const pct = Math.round((doneCount / CURRICULUM.length) * 100);
  progressText.textContent = `${doneCount} of ${CURRICULUM.length} done`;
  progressFill.style.width = pct + "%";
  progressOuter.setAttribute("aria-valuenow", String(pct));
}

function renderLessonHeader() {
  const l = currentLesson();
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
        lessonContext: `Title: ${l.title}. Goal: ${l.goal}`,
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
  lot: "I'm really stuck and I've been trying. Can you give me a bigger hint? Still, I'd like to write it myself.",
  done: "I think I've got this lesson. Can you give me one quick question to check I really understand it before I move on?",
};

function markDoneAndAdvance() {
  const l = currentLesson();
  state.done[l.id] = true;
  const idx = CURRICULUM.findIndex((x) => x.id === l.id);
  const next = CURRICULUM[idx + 1];
  saveState();
  renderPath();
  if (next) {
    addMessage("assistant", `Nice work — that's "${l.title}" done. ✓ Whenever you're ready, click "${next.title}" on the left and we'll keep going.`);
  } else {
    addMessage("assistant", "You just finished the whole path. Seriously — you taught yourself to code, with no teacher in your school. That's the entire point. Go build something. 🎉");
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
  if (confirm("Start the whole path over? This clears your progress and chats on this device.")) {
    state = { currentId: CURRICULUM[0].id, done: {}, chats: {} };
    saveState();
    renderPath();
    renderLessonHeader();
    renderChat();
  }
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
renderPath();
renderLessonHeader();
renderChat();
