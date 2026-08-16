// Serverless chat endpoint for Class of One.
//
// This is a thin, safe proxy between the browser and an OpenAI-compatible
// model API. The API key never reaches the browser — it lives only in a
// Vercel environment variable — so judges can open the demo with zero setup
// and no login, exactly as the submission rules require.
//
// It works with ANY OpenAI-compatible provider. By default it targets
// Featherless AI (the hackathon's presenting sponsor), but you can point it
// at OpenAI or anything else by changing two environment variables.
//
// If no API key is configured, the endpoint falls back to a scripted "demo
// mode" so the live link is never blank. Demo mode is clearly labelled in the
// UI and in the README under "built vs mocked".

const DEFAULT_BASE_URL = "https://api.featherless.ai/v1";
const DEFAULT_MODEL = "mistralai/Mistral-Nemo-Instruct-2407";

// The heart of the product. This is what turns a generic answer-machine into
// a patient teacher for a student who has none. Every rule here traces back
// to Marcus: 15, rural high school, no CS teacher, nobody to ask when stuck.
const TEACHER_SYSTEM_PROMPT = `You are the teacher a student never had.

Your student is a curious beginner, likely a teenager, learning computer
science on their own. Their school has no CS teacher and no one they can ask
when they get stuck. You are the only teacher they have. Act like the best
teacher they could hope for — not like a search engine, and not like an
answer machine.

THE ONE RULE THAT MATTERS MOST:
Do not hand over finished answers or complete, working code. A student who
copies a solution learns nothing. Your job is to get THEM to the answer.

How a good teacher actually behaves:
- Start by finding out what they already know and what they have tried.
  Ask "What have you tried so far?" or "What do you think should happen?"
  before you explain anything.
- Teach in the smallest possible steps. One idea at a time. Never lecture.
  Keep replies short — a real tutor sitting next to you says a sentence or
  two, then waits.
- When they are stuck, give a HINT, not the solution. Point at the next
  small step. If they are still stuck after the hint, give a bigger hint.
  Only reveal a full answer if they have genuinely tried and explicitly ask
  you to walk through it — and even then, explain every line and end by
  asking them to change one thing themselves so they own it.
- Assume ZERO prior knowledge. Never use a technical word without explaining
  it in plain language the first time. No jargon-dropping.
- Be warm, patient, and encouraging. Celebrate small wins. Never make them
  feel dumb for asking. "Great question" is often true.
- When they write code, don't just say if it's right. Ask them to predict
  what it will do, then have them run it and tell you what happened. Learning
  to run code and read errors is part of the lesson.
- You can be wrong, and so can any AI. Encourage them to actually run their
  code and check, rather than trusting your word. Teach them that verifying
  is a skill, not a lack of trust.
- Stay on their learning path. If they wander far off, gently bring them
  back to the step they were on, or note it as something to explore next.

Never break character as their teacher. You have all the time in the world
for them.`;

// A tiny scripted teacher for demo mode, so the live link always works even
// before an API key is added. Intentionally simple and clearly not the real
// model — the README is honest about this.
function demoTeacherReply(userText) {
  const t = (userText || "").toLowerCase();
  if (/error|not work|broken|stuck|help/.test(t)) {
    return "I can tell you're stuck — that's completely normal, it happens to every programmer. Before I say anything: what did you *expect* to happen, and what actually happened instead? Even the exact error message helps. Let's look at it together.";
  }
  if (/answer|solution|just tell|give me the code/.test(t)) {
    return "I could hand you the code — but then it'd be my code, not yours, and you wouldn't be able to write the next one alone. Let's get you there instead. What's the very first small step you think this needs?";
  }
  if (/hello|hi|hey|start|begin/.test(t)) {
    return "Hi! I'm really glad you're here. I'm your teacher for as long as you want one. There's no such thing as a dumb question with me. What would you like to learn or work on today?";
  }
  return "Good — tell me more about your thinking there. What made you try that? (Heads up: I'm running in demo mode right now, so I'm a bit scripted. With an API key connected, I respond to anything you say.)";
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  let body = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  const messages = Array.isArray(body?.messages) ? body.messages : [];
  const lessonContext = typeof body?.lessonContext === "string" ? body.lessonContext : "";

  const apiKey = process.env.AI_API_KEY;

  // Demo mode: no key configured.
  if (!apiKey) {
    const lastUser = [...messages].reverse().find((m) => m.role === "user");
    return res.status(200).json({
      reply: demoTeacherReply(lastUser?.content || ""),
      mode: "demo",
    });
  }

  const baseUrl = process.env.AI_BASE_URL || DEFAULT_BASE_URL;
  const model = process.env.AI_MODEL || DEFAULT_MODEL;

  const system = lessonContext
    ? `${TEACHER_SYSTEM_PROMPT}\n\nThe student is currently on this lesson:\n${lessonContext}\nKeep them moving forward on it.`
    : TEACHER_SYSTEM_PROMPT;

  try {
    const upstream = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [{ role: "system", content: system }, ...messages],
        temperature: 0.7,
        max_tokens: 600,
      }),
    });

    if (!upstream.ok) {
      const detail = await upstream.text();
      return res.status(502).json({
        error: "The teacher couldn't be reached right now.",
        detail: detail.slice(0, 500),
      });
    }

    const data = await upstream.json();
    const reply =
      data?.choices?.[0]?.message?.content?.trim() ||
      "Sorry — I lost my train of thought. Could you say that again?";
    return res.status(200).json({ reply, mode: "live" });
  } catch (err) {
    return res.status(502).json({
      error: "The teacher couldn't be reached right now.",
      detail: String(err).slice(0, 300),
    });
  }
}
