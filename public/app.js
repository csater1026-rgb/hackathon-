// Class of One — front-end logic.
// No framework, no build step. Runs on a locked-down school Chromebook.
// Progress lives in localStorage, so there is no login and nothing to set up.

// ---------------------------------------------------------------------------
// Icons — simple white line-drawn SVGs, one per topic, instead of emoji.
// stroke="currentColor" so every icon just inherits whatever text color
// surrounds it, working cleanly in both light and dark themes.
// ---------------------------------------------------------------------------
function svgIcon(inner, viewBox = "0 0 24 24") {
  return `<svg class="icn" viewBox="${viewBox}" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`;
}
const ICON = {
  code: svgIcon('<polyline points="8 6 3 12 8 18"/><polyline points="16 6 21 12 16 18"/>'),
  lock: svgIcon('<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>'),
  globe: svgIcon('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 4 5.5 4 9s-1.5 6.5-4 9c-2.5-2.5-4-5.5-4-9s1.5-6.5 4-9z"/>'),
  cpu: svgIcon('<rect x="8" y="8" width="8" height="8" rx="1"/><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2"/>'),
  database: svgIcon('<ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6"/><path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"/>'),
  brain: svgIcon('<circle cx="12" cy="12" r="8.5"/><circle cx="9" cy="10" r="1"/><circle cx="15" cy="10" r="1"/><circle cx="12" cy="15" r="1"/><path d="M9 10l3 5M15 10l-3 5M9 10h6"/>'),
  branch: svgIcon('<circle cx="12" cy="4" r="2"/><circle cx="6" cy="20" r="2"/><circle cx="18" cy="20" r="2"/><path d="M12 6v4M12 10l-6 8M12 10l6 8"/>'),
  gamepad: svgIcon('<rect x="3" y="8" width="18" height="9" rx="4"/><path d="M8 11v4M6 13h4M16 12h.01M18 14h.01"/>'),
  atom: svgIcon('<circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none"/><ellipse cx="12" cy="12" rx="9" ry="3.6"/><ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(120 12 12)"/>'),
  terminal: svgIcon('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 9l3 3-3 3M12 15h5"/>'),
  speaker: svgIcon('<path d="M5 9v6h4l5 4V5l-5 4H5z"/><path d="M16 9a4 4 0 0 1 0 6M19 7a7 7 0 0 1 0 10"/>'),
  mic: svgIcon('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3M9 21h6"/>'),
  map: svgIcon('<path d="M4 6l6-2 6 2 4-1v14l-4 1-6-2-6 2V6z"/><path d="M10 4v14M16 6v14"/>'),
  sparkle: svgIcon('<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6.5 6.5l2 2M15.5 15.5l2 2M6.5 17.5l2-2M15.5 8.5l2-2"/>'),
  picture: svgIcon('<rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="9" cy="10" r="1.5"/><path d="M3 16l5-5 4 4 3-3 6 6"/>'),
  hammer: svgIcon('<path d="M14 6l4 4-8.5 8.5-4-4L14 6z"/><path d="M3 21l4-4"/>'),
  trend: svgIcon('<path d="M3 17l6-6 4 4 8-8"/><path d="M15 6h6v6"/>'),
  cap: svgIcon('<path d="M12 3l10 5-10 5L2 8l10-5z"/><path d="M6 11v5c0 1.7 3 3 6 3s6-1.3 6-3v-5"/>'),
  compass: svgIcon('<circle cx="12" cy="12" r="9"/><path d="M15 9l-2 6-6 2 2-6 6-2z"/>'),
};

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
    icon: ICON.code,
    title: "Programming",
    blurb: "Make a computer do what you say, one instruction at a time.",
    field: "programming and writing code",
    resources: [
      { name: "freeCodeCamp", url: "https://www.freecodecamp.org/learn", note: "Full free curriculum", cert: true },
      { name: "Harvard CS50x", url: "https://cs50.harvard.edu/x/", note: "The famous intro to CS", cert: true },
      { name: "The Odin Project", url: "https://www.theodinproject.com/", note: "Free full-stack path" },
      { name: "Python for Everybody", url: "https://www.py4e.com/", note: "Free Python course", cert: true },
    ],
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
    icon: ICON.lock,
    title: "Cybersecurity",
    blurb: "How systems get broken into — and how they're defended.",
    field: "cybersecurity and how systems are attacked and defended",
    resources: [
      { name: "TryHackMe", url: "https://tryhackme.com/", note: "Hands-on hacking labs (free tier)" },
      { name: "picoCTF", url: "https://picoctf.org/", note: "Beginner security puzzles" },
      { name: "OverTheWire: Bandit", url: "https://overthewire.org/wargames/bandit/", note: "Learn by playing" },
      { name: "Cisco: Intro to Cybersecurity", url: "https://www.netacad.com/courses/cybersecurity/introduction-cybersecurity", note: "Free course", cert: true },
    ],
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
        widget: "caesar",
        goal: "Understand encryption via a Caesar cipher — and the idea of a 'key' that locks and unlocks a message.",
        opener:
          "The oldest trick in cryptography is over 2000 years old and you can do it in your head. Take the word `HELLO` and shift every letter forward by 3 in the alphabet. What do you get? Work it out by hand first — then we'll teach the computer to do it (and to undo it).",
      },
    ],
  },
  {
    id: "net",
    icon: ICON.globe,
    title: "Networking",
    blurb: "What actually happens when you open a website.",
    field: "computer networking and how the internet moves information",
    resources: [
      { name: "Professor Messer", url: "https://www.professormesser.com/", note: "Free Network+ video course" },
      { name: "Cisco Networking Academy", url: "https://www.netacad.com/", note: "Free networking courses", cert: true },
      { name: "Computer Networks (Kurose)", url: "https://gaia.cs.umass.edu/kurose_ross/interactive/", note: "Free interactive textbook" },
      { name: "Khan Academy: The Internet", url: "https://www.khanacademy.org/computing/computers-and-internet", note: "Clear beginner videos" },
    ],
    lessons: [
      {
        id: "net-what-happens",
        title: "What happens when you open a website",
        sub: "The whole journey",
        diagram: "website",
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
        diagram: "packets",
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
    icon: ICON.cpu,
    title: "How Computers Work",
    blurb: "Under the hood: from 1s and 0s to a running program.",
    field: "how computers work under the hood, from hardware to running code",
    resources: [
      { name: "Crash Course: Computer Science", url: "https://www.youtube.com/playlist?list=PL8dPuuaLjXtNlUrzyH5r6jN9ulIgZBpdo", note: "Fantastic free video series" },
      { name: "nand2tetris", url: "https://www.nand2tetris.org/", note: "Build a computer from scratch", cert: true },
      { name: "Ben Eater", url: "https://eater.net/", note: "How hardware really works" },
      { name: "Harvard CS50x", url: "https://cs50.harvard.edu/x/", note: "Great on low-level basics", cert: true },
    ],
    lessons: [
      {
        id: "sys-binary",
        title: "Everything is 1s and 0s",
        sub: "Binary",
        widget: "binary",
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
    icon: ICON.database,
    title: "Databases & Data",
    blurb: "How apps remember everything — and answer questions fast.",
    field: "databases and how structured data is stored and queried",
    resources: [
      { name: "SQLBolt", url: "https://sqlbolt.com/", note: "Interactive SQL lessons" },
      { name: "Khan Academy: SQL", url: "https://www.khanacademy.org/computing/computer-programming/sql", note: "Free intro with exercises" },
      { name: "Mode SQL Tutorial", url: "https://mode.com/sql-tutorial/", note: "Beginner → advanced SQL" },
      { name: "PostgreSQL Tutorial", url: "https://www.postgresqltutorial.com/", note: "A real database, free" },
    ],
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
        diagram: "table",
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
  {
    id: "ai",
    icon: ICON.brain,
    title: "Artificial Intelligence",
    blurb: "How machines actually learn — and where they go wrong.",
    field: "artificial intelligence and machine learning, at a conceptual level",
    resources: [
      { name: "Elements of AI", url: "https://www.elementsofai.com/", note: "Famous free intro", cert: true },
      { name: "Google ML Crash Course", url: "https://developers.google.com/machine-learning/crash-course", note: "Free, hands-on" },
      { name: "Kaggle Learn", url: "https://www.kaggle.com/learn", note: "Short free courses", cert: true },
      { name: "3Blue1Brown: Neural Nets", url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi", note: "Beautiful visual explainer" },
    ],
    lessons: [
      {
        id: "ai-what-is",
        title: "What AI actually is",
        sub: "No magic",
        goal: "Understand AI as finding patterns from many examples, not a thinking brain.",
        opener:
          "AI gets talked about like a genius robot brain, but the real idea is simpler and stranger. Imagine teaching a little kid to tell cats from dogs — but you're NOT allowed to give any rules, only to show them picture after picture and say 'cat' or 'dog'. Do you think they'd eventually get it? And if so… how? That 'how' is basically all of AI.",
      },
      {
        id: "ai-learning",
        title: "How machines learn from examples",
        sub: "Training",
        goal: "Understand training as adjusting guesses using feedback over many examples.",
        opener:
          "Here's the core trick of machine 'learning': guess, check how wrong you were, adjust, repeat — millions of times. Think about learning to shoot a basketball. When you miss short, what do you change on the next shot? That tiny adjust-from-the-error loop is exactly how a model trains. Walk me through your basketball adjustment.",
      },
      {
        id: "ai-neural",
        title: "The idea of a neural network",
        sub: "Neurons & layers",
        diagram: "neural",
        goal: "Get an intuition for a network as layers of simple units that vote and pass signals on.",
        opener:
          "A 'neural network' sounds intimidating, but picture a huge crowd guessing how many jellybeans are in a jar. Each person is bad alone, but if you combine everyone's guesses in a smart weighted way, the group gets scarily accurate. Why do you think a big group of simple guessers can beat one expert? Sit with that — it's the whole intuition.",
      },
      {
        id: "ai-llms",
        title: "How chatbots predict words",
        sub: "Language models",
        goal: "Understand a language model as a very good next-word predictor.",
        opener:
          "The chatbot you're talking to right now works on one deceptively simple job: predict the next word. Try it yourself — finish this: 'peanut butter and ___'. How did you know? Now here's the real question: if a machine got REALLY good at that one guessing game, across billions of sentences, why might it start to seem like it 'understands'?",
      },
      {
        id: "ai-limits",
        title: "Where AI goes wrong",
        sub: "Bias & hallucination",
        goal: "Understand why AI can be confidently wrong, and how to use it responsibly.",
        opener:
          "This is the most important AI lesson almost no one teaches: the machine can be totally confident and totally wrong — it can even make up facts that sound perfect. Given that it's just predicting likely words, why do you think it might invent a fake but convincing answer? And when should YOU double-check it instead of trusting it?",
      },
    ],
  },
  {
    id: "algo",
    icon: ICON.branch,
    title: "Algorithms",
    blurb: "How to solve problems in clever, fast ways.",
    field: "algorithms and computational problem-solving",
    resources: [
      { name: "Khan Academy: Algorithms", url: "https://www.khanacademy.org/computing/computer-science/algorithms", note: "Free, with practice" },
      { name: "VisuAlgo", url: "https://visualgo.net/", note: "See algorithms animate" },
      { name: "MIT 6.006 (OCW)", url: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/", note: "Free university lectures" },
      { name: "LeetCode", url: "https://leetcode.com/", note: "Practice problems (free tier)" },
    ],
    lessons: [
      {
        id: "algo-what-is",
        title: "What an algorithm really is",
        sub: "Recipes for computers",
        goal: "Understand an algorithm as a precise step-by-step method — and that some methods are far better than others.",
        opener:
          "An algorithm is just a recipe: exact steps to get a result. But here's what makes it interesting — some recipes are WAY better than others. Imagine finding 'Zhang' in a paper phone book. One way: start at page one and read every name. Is that how YOU would actually do it? Describe your real strategy — you're about to discover it has a famous name.",
      },
      {
        id: "algo-search",
        title: "Finding things fast",
        sub: "Binary search",
        goal: "Understand binary search: halving the possibilities each step beats checking one by one.",
        opener:
          "Let's play. I'm thinking of a number from 1 to 100. You get to guess, and I'll say 'higher' or 'lower'. What's your very first guess — and why that one? Your instinct here is one of the most powerful ideas in all of computing. Make your guess and tell me your reasoning.",
      },
      {
        id: "algo-sorting",
        title: "Putting things in order",
        sub: "Sorting",
        goal: "Understand why sorting matters and get intuition for how sorting algorithms work.",
        opener:
          "Sorting sounds boring until you realize that being IN ORDER is what makes everything else fast (like that number-guessing trick — it only works because the numbers are ordered). Picture a shuffled deck of cards in your hands. Describe, step by step, how you'd actually sort them. There's no wrong method — I just want your natural process.",
      },
      {
        id: "algo-bigo",
        title: "Why some code is slow",
        sub: "Big-O intuition",
        goal: "Get an intuition for how an algorithm's work grows as the input grows.",
        opener:
          "Two programs both work — but one finishes instantly and the other takes an hour on a big list. The difference is how the work GROWS as the input gets bigger. Quick thought experiment: if checking every name in a list of 100 takes 1 second, roughly how long for a list of 1000? Now — what about that number-halving search instead? Guess both.",
      },
      {
        id: "algo-thinking",
        title: "Breaking problems down",
        sub: "Decomposition",
        goal: "Learn to break a big, scary problem into small solvable pieces.",
        opener:
          "The real skill behind algorithms isn't memorizing them — it's taking a huge messy problem and chopping it into small pieces you actually know how to solve. Give me any big task you find overwhelming (planning a trip, organizing an event, anything). Let's practice slicing it into small steps together — that exact muscle is what programmers use every day.",
      },
    ],
  },
  {
    id: "game",
    icon: ICON.gamepad,
    title: "Game Dev & Graphics",
    blurb: "How computers draw moving worlds on a screen.",
    field: "game development and computer graphics",
    resources: [
      { name: "Harvard CS50 Games", url: "https://cs50.harvard.edu/games/", note: "Free game-dev course", cert: true },
      { name: "Godot Engine", url: "https://docs.godotengine.org/en/stable/getting_started/introduction/", note: "Free engine + great docs" },
      { name: "The Coding Train", url: "https://www.youtube.com/@TheCodingTrain", note: "Fun creative-coding videos" },
      { name: "MDN Canvas Tutorial", url: "https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial", note: "Draw graphics in the browser" },
    ],
    lessons: [
      {
        id: "game-loop",
        title: "The heartbeat: the game loop",
        sub: "Update, then draw",
        goal: "Understand that games run a loop many times a second: update the world, then draw it.",
        opener:
          "Every video game, from Pong to the biggest 3D world, secretly does the same two things over and over, dozens of times a second. Think about a flipbook animation — a stack of slightly different drawings you flip through fast. What are the two repeating steps you think a game does each 'flip' to make things move? Take a guess.",
      },
      {
        id: "game-pixels",
        title: "Everything is a grid of pixels",
        sub: "Pixels & coordinates",
        goal: "Understand the screen as a grid of colored dots addressed by coordinates.",
        opener:
          "Your screen, up close, is just a giant grid of tiny colored dots called pixels. So if you wanted to tell the computer 'put a red dot near the top-left corner', what information do you think it needs from you? Hint: think about how you'd describe a single square's location on a piece of graph paper.",
      },
      {
        id: "game-coords",
        title: "Making things move",
        sub: "Position & velocity",
        goal: "Understand motion as changing an object's coordinates a little each frame.",
        opener:
          "Nothing on a screen really 'moves' — the computer just redraws it in a slightly different spot each frame, and your eyes do the rest. So if a dot is at position x = 10, and you want it to slide to the right, what should happen to that number on the next frame? What about the frame after that? Describe the pattern.",
      },
      {
        id: "game-collision",
        title: "Did they hit?",
        sub: "Collision detection",
        goal: "Get an intuition for detecting when two objects overlap.",
        opener:
          "In a game, how does the computer KNOW when the player touched the coin, or the ball hit the paddle? It has to check, every frame, whether two shapes overlap. Imagine two rectangles on graph paper. Without any math yet — just describe: how can you tell by looking whether two rectangles are overlapping or not?",
      },
      {
        id: "game-3d",
        title: "Faking a 3D world",
        sub: "3D on a 2D screen",
        goal: "Understand that 3D graphics are a 2D screen tricked into looking deep.",
        opener:
          "Here's a mind-bender: your screen is completely flat, yet 3D games look deep and real. It's an illusion built from clever tricks your eyes fall for. Think about drawing a cube on paper, or how far-away things look. What visual tricks make a flat picture FEEL 3D? Name every one you can think of — artists and game engines use the same ones.",
      },
    ],
  },
  {
    id: "quantum",
    icon: ICON.atom,
    title: "Quantum Computing",
    blurb: "Computing with the strange rules of the very small.",
    field: "quantum computing, at a beginner-friendly conceptual level",
    resources: [
      { name: "IBM Quantum Learning", url: "https://learning.quantum.ibm.com/", note: "Free courses + real quantum computers" },
      { name: "Qiskit Textbook", url: "https://qiskit.org/learn/", note: "Free, hands-on with code" },
      { name: "Quantum Country", url: "https://quantum.country/", note: "Beautiful memorable essays" },
      { name: "Microsoft Quantum Katas", url: "https://quantum.microsoft.com/en-us/tools/quantum-katas", note: "Learn by solving" },
    ],
    lessons: [
      {
        id: "q-why",
        title: "Why quantum computers exist",
        sub: "The motivation",
        goal: "Understand that some problems have too many combinations for any normal computer.",
        opener:
          "Before any weird physics, one plain question: why would anyone WANT a totally new kind of computer? Imagine a lock with 300 switches, each on or off, and only one exact combination opens it. A normal computer tries combinations one after another. Do you think it could ever try them all? Guess how bad it gets — that impossibility is why quantum computing was invented.",
      },
      {
        id: "q-qubit",
        title: "Bits that are both at once",
        sub: "Superposition",
        widget: "qubit",
        goal: "Get an intuition for a qubit being a blend of 0 and 1 until measured.",
        opener:
          "A normal bit is either 0 or 1. A quantum bit — a qubit — can be a blend of both at the same time, until you look at it. Picture a coin spinning in the air: while it spins, is it heads or tails? What would you even call that in-between state? Sit with the spinning coin — that's the closest everyday thing to superposition.",
      },
      {
        id: "q-entangle",
        title: "Spooky connections",
        sub: "Entanglement",
        goal: "Get an intuition for entanglement: linked qubits whose results are correlated.",
        opener:
          "Einstein called this one 'spooky action at a distance' because it bothered him so much. Imagine two magic coins: you flip one here and one on the Moon, and somehow they ALWAYS land the same way, instantly. No message could travel that fast. Why do you think that idea drove physicists a little crazy? What feels impossible about it to you?",
      },
      {
        id: "q-interference",
        title: "How it finds the answer",
        sub: "Interference",
        goal: "Understand quantum computing as amplifying right answers and canceling wrong ones.",
        opener:
          "A quantum computer doesn't just 'try everything at once and magically pick the right one' — that's the myth. It's more like waves in water: waves can add up to get taller, or meet and cancel to nothing. Have you ever seen ripples cancel each other out? If you could make the WRONG answers cancel away and the RIGHT one add up loud, why would that be powerful?",
      },
      {
        id: "q-reality",
        title: "What they're really good at",
        sub: "Hype vs reality",
        goal: "Get a realistic picture: quantum computers are specialists, not a faster laptop.",
        opener:
          "Time to bust the hype. A quantum computer is NOT just a super-fast laptop — it's a strange specialist tool, amazing at a few specific problems and useless (even worse) at most everyday ones. Given what you now know about it, what KINDS of problems do you think it'd shine at — and what would still be better on your normal phone? Take your best guess.",
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
    profile: { name: "", about: "" },
    seenWelcome: false,
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
      s.profile = s.profile || { name: "", about: "" };
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

// A short summary of what the student has already learned with this teacher,
// so it can genuinely refer back ("remember hashing? entanglement is similar").
function buildRecall() {
  const doneLessons = ALL_LESSONS.filter((l) => state.done[l.id]);
  if (doneLessons.length === 0) return "";
  const titles = doneLessons.slice(-10).map((l) => l.title);
  return titles.join("; ");
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
  lessonEyebrow.innerHTML = `${t.icon} ${t.title}`;
  lessonTitle.textContent = l.title;
  lessonGoal.textContent = l.goal;
}

function bubbleHTML(text) {
  // Minimal, safe markdown: escape everything, then re-enable code spans/blocks.
  const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  let out = esc(text);
  out = out.replace(/```([\s\S]*?)```/g, (_, code) => `<pre><code>${code.trim()}</code></pre>`);
  out = out.replace(/`([^`]+)`/g, (_, code) => `<code>${code}</code>`);
  out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  out = out.replace(/(?<![*\w])\*([^*]+)\*(?![*\w])/g, "<em>$1</em>");
  out = out.replace(/(?<![_\w])_([^_]+)_(?![_\w])/g, "<em>$1</em>");
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
  renderWidget(l);
  renderDiagram(l);
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
        profile: state.profile,
        recall: buildRecall(),
      }),
    });
    const data = await res.json();
    const reply =
      data.reply ||
      (data.error ? `${data.error}${data.detail ? `\n\n(debug: ${data.detail})` : ""}` : "Hmm, I didn't catch that — try again?");
    typing.remove();
    history.push({ role: "assistant", content: reply });
    addMessage("assistant", reply);
    speak(reply);
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
    addMessage("assistant", `That's the whole ${track.title} track finished — every lesson done. ✓ You just taught yourself a field of computer science with no teacher in your school. That's the entire point. Now open "Your roadmap" on the left — it shows exactly what to build next, what to learn after this, free courses (some with real certificates), and where this path can take you.`);
  }
}

// ---------------------------------------------------------------------------
// Mode pill (live model vs demo mode) — honest about "built vs mocked"
// ---------------------------------------------------------------------------
function setMode(mode) {
  // Always resolve to a definite state — a missing/unexpected mode must never
  // leave the pill stuck on "checking..." forever.
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

// A middle ground between "go back" (nothing lost) and the big reset button
// (everything lost): clear just the chat for the lesson you're on right now.
$("#restart-lesson-btn").addEventListener("click", () => {
  const l = currentLesson();
  if (confirm(`Restart "${l.title}"? This clears just this lesson's chat — your other lessons and progress stay as they are.`)) {
    state.chats[l.id] = [];
    saveState();
    renderChat();
  }
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
// Teacher's notes — a memory that makes the teacher know YOU, across fields.
// ---------------------------------------------------------------------------
const notesModal = $("#notes-modal");
const notesName = $("#notes-name");
const notesAbout = $("#notes-about");
const notesRecall = $("#notes-recall");

function openNotes(open) {
  if (open) {
    notesName.value = state.profile.name || "";
    notesAbout.value = state.profile.about || "";
    const doneCount = ALL_LESSONS.filter((l) => state.done[l.id]).length;
    const fieldsTouched = TRACKS.filter((t) => t.lessons.some((l) => state.done[l.id])).length;
    notesRecall.innerHTML = doneCount
      ? `<b>Your teacher also remembers your learning:</b> ${doneCount} lesson${doneCount > 1 ? "s" : ""} finished across ${fieldsTouched} field${fieldsTouched > 1 ? "s" : ""}. It'll connect new ideas back to these.`
      : `<b>Your teacher will also remember your progress</b> as you finish lessons, and connect new ideas back to them.`;
  }
  notesModal.hidden = !open;
  if (open) notesName.focus();
}
$("#notes-toggle").addEventListener("click", () => openNotes(true));
$("#notes-close").addEventListener("click", () => openNotes(false));
notesModal.addEventListener("click", (e) => { if (e.target === notesModal) openNotes(false); });
$("#notes-save").addEventListener("click", () => {
  state.profile = { name: notesName.value.trim(), about: notesAbout.value.trim() };
  saveState();
  openNotes(false);
  if (state.profile.name) {
    addMessage("assistant", `Got it — I'll remember that, ${state.profile.name}.`);
  }
});
// Two-step forget: ask "are you sure?" before wiping the memory.
const forgetConfirm = $("#forget-confirm");
$("#notes-forget").addEventListener("click", () => { forgetConfirm.hidden = false; });
$("#forget-cancel").addEventListener("click", () => { forgetConfirm.hidden = true; });
$("#forget-yes").addEventListener("click", () => {
  state.profile = { name: "", about: "" };
  saveState();
  notesName.value = "";
  notesAbout.value = "";
  forgetConfirm.hidden = true;
});
// Reset the confirm prompt whenever the notes modal is opened fresh.
$("#notes-toggle").addEventListener("click", () => { forgetConfirm.hidden = true; });

// ---------------------------------------------------------------------------
// Go further — free, reputable resources for the current field, so a student
// with no teacher also knows WHERE to keep learning (and earn free certs).
// ---------------------------------------------------------------------------
const roadmapModal = $("#roadmap-modal");
function stageHTML({ state: st, icon, title, sub, inner }) {
  return `<div class="rm-stage ${st || ""}">
    <div class="rm-dot">${icon}</div>
    <div class="rm-content">
      <div class="rm-title">${title}</div>
      <div class="rm-sub">${sub}</div>
      ${inner}
    </div>
  </div>`;
}
function openRoadmap(open) {
  if (open) {
    const t = currentTrack();
    const rm = ROADMAPS[t.id] || { build: [], deeper: [], careers: [] };
    const doneCount = t.lessons.filter((l) => state.done[l.id]).length;
    const allDone = doneCount === t.lessons.length;

    $("#roadmap-heading").innerHTML = `${ICON.map} ${t.title} roadmap`;
    $("#roadmap-sub").textContent = "Stage 1 is built into Class of One. Everything after that is up to you — this just shows you where to go.";

    const foundations = `<div class="rm-lessons">` + t.lessons.map((l) =>
      `<div class="rm-lesson ${state.done[l.id] ? "done" : ""}"><span class="mk">${state.done[l.id] ? "✓" : "○"}</span>${l.title}</div>`
    ).join("") + `</div>`;

    const buildChips = `<div class="chips">` + rm.build.map((b) => `<span class="chip build">${ICON.hammer} ${b}</span>`).join("") + `</div>`;
    const deeperChips = `<div class="chips">` + rm.deeper.map((d) => `<span class="chip">${d}</span>`).join("") + `</div>`;
    const careerChips = `<div class="chips">` + rm.careers.map((c) => `<span class="chip career">${ICON.compass} ${c}</span>`).join("") + `</div>`;
    const resList = `<div class="resource-list">` + (t.resources || []).map((r) =>
      `<a class="resource" href="${r.url}" target="_blank" rel="noopener noreferrer">
        <span class="r-main"><span class="r-name">${r.name}</span><span class="r-note">${r.note}</span></span>
        ${r.cert ? `<span class="r-cert">${ICON.cap} free cert</span>` : ""}
        <span class="r-arrow" aria-hidden="true">↗</span></a>`
    ).join("") + `</div>`;

    $("#roadmap-body").innerHTML =
      stageHTML({ state: allDone ? "done" : "active", icon: allDone ? "✓" : "1",
        title: "Learn the foundations", sub: `Included in Class of One — ${doneCount} of ${t.lessons.length} lessons done`, inner: foundations }) +
      stageHTML({ icon: ICON.hammer, title: "Then, build something with it",
        sub: "On your own, once you finish above — small projects that make it stick", inner: buildChips }) +
      stageHTML({ icon: ICON.trend, title: "Topics to learn after this",
        sub: "Not covered in Class of One yet — the natural next things to study once the basics click", inner: deeperChips }) +
      stageHTML({ icon: ICON.cap, title: "Optional: free courses elsewhere", state: "optional",
        sub: "Not required, not made by us — other people's free courses if you want more structure. A certificate icon means you can earn a real one.", inner: resList }) +
      stageHTML({ icon: ICON.compass, title: "Where this can eventually lead",
        sub: "Real careers this path opens up, someday, not a next step", inner: careerChips });
  }
  roadmapModal.hidden = !open;
}
$("#roadmap-btn").addEventListener("click", () => openRoadmap(true));
$("#roadmap-close").addEventListener("click", () => openRoadmap(false));
roadmapModal.addEventListener("click", (e) => { if (e.target === roadmapModal) openRoadmap(false); });

// ---------------------------------------------------------------------------
// Interactive widgets (manipulatives) — some ideas you have to PLAY with to
// get. When a lesson has a widget, it appears at the top of the chat.
// ---------------------------------------------------------------------------
function renderWidget(lesson) {
  if (!lesson.widget) return;
  const card = document.createElement("div");
  card.className = "widget-card";
  const meta = WIDGET_META[lesson.widget];
  card.innerHTML = `
    <div class="widget-head"><span class="widget-spark">${ICON.sparkle}</span><span class="widget-title">${meta.title}</span></div>
    <p class="widget-hint">${meta.hint}</p>
    <div class="widget-body"></div>`;
  const body = card.querySelector(".widget-body");
  WIDGET_BUILDERS[lesson.widget](body);
  messagesEl.insertBefore(card, messagesEl.firstChild);
}

// ---------------------------------------------------------------------------
// Diagrams — hand-drawn inline SVG illustrations for structural ideas that a
// picture explains better than words. Tiny, always load (no external images),
// and theme-aware via CSS variables. Companions to the Socratic chat, not
// spoilers: they show the shape of an idea while the teacher still probes it.
// ---------------------------------------------------------------------------
function renderDiagram(lesson) {
  if (!lesson.diagram) return;
  const d = DIAGRAMS[lesson.diagram];
  if (!d) return;
  const card = document.createElement("div");
  card.className = "diagram-card";
  card.innerHTML = `
    <div class="diagram-head"><span class="widget-spark">${ICON.picture}</span><span class="diagram-title">${d.title}</span></div>
    ${d.svg}
    <p class="diagram-caption">${d.caption}</p>`;
  messagesEl.insertBefore(card, messagesEl.firstChild);
}

// ---------------------------------------------------------------------------
// Roadmaps — the part self-learners miss most: what to do NEXT. For each field,
// concrete projects to build, topics to learn next, and where it can lead.
// Combined with the lessons (foundations) and free resources into one path.
// ---------------------------------------------------------------------------
const ROADMAPS = {
  prog: {
    build: ["A number-guessing game", "A quiz that scores itself", "A tip or grade calculator"],
    deeper: ["Functions & reusing code", "Lists and dictionaries", "Reading & writing files", "A first web page with JavaScript"],
    careers: ["Software developer", "Web developer", "Automation engineer"],
  },
  sec: {
    build: ["A password-strength checker", "A Caesar-cipher encoder/decoder", "A quiz that spots phishing emails"],
    deeper: ["Hashing & salting", "Common web attacks (XSS, SQL injection)", "Capture-the-flag challenges", "Networking for security"],
    careers: ["Security analyst", "Penetration tester", "Security engineer"],
  },
  net: {
    build: ["Map what happens when you load a site", "Diagram your home network", "Look up a domain's real address"],
    deeper: ["The OSI model", "TCP vs UDP", "How HTTPS keeps you safe", "Subnets & IP addressing"],
    careers: ["Network engineer", "Systems administrator", "Cloud / infrastructure engineer"],
  },
  sys: {
    build: ["Convert numbers to binary in code", "A calculator that shows its steps", "Explain how a program runs to a friend"],
    deeper: ["Logic gates & how a CPU adds", "How memory stores variables", "Assembly basics", "How an OS shares the processor"],
    careers: ["Embedded / hardware engineer", "Systems programmer", "Computer engineer"],
  },
  data: {
    build: ["Design tables for an app you use", "Write queries to answer questions", "A tiny grade or contacts tracker"],
    deeper: ["SQL joins", "Primary & foreign keys", "Indexes & why queries are fast", "Spreadsheets → real databases"],
    careers: ["Data analyst", "Database administrator", "Backend developer"],
  },
  ai: {
    build: ["Train an image classifier (Teachable Machine)", "A chatbot with its own personality", "Predict something from a small dataset"],
    deeper: ["How training actually works", "Neural networks in depth", "Prompting & using LLMs well", "Bias, safety & ethics"],
    careers: ["Machine-learning engineer", "Data scientist", "AI researcher"],
  },
  algo: {
    build: ["Code binary search yourself", "Visualize a sorting algorithm", "Solve 5 beginner practice problems"],
    deeper: ["Big-O notation", "Recursion", "Stacks, queues & trees", "Graph algorithms"],
    careers: ["Software engineer", "Competitive programmer", "Backend / systems engineer"],
  },
  game: {
    build: ["A Pong or Snake clone", "A dot you move with arrow keys", "A simple collision game"],
    deeper: ["Game loops & frame timing", "Sprites & animation", "Physics & collisions", "2D → 3D in an engine like Godot"],
    careers: ["Game developer", "Graphics / engine programmer", "Technical artist"],
  },
  quantum: {
    build: ["Build a circuit in IBM Quantum Composer", "Run a coin-flip qubit experiment", "Explain superposition to a friend"],
    deeper: ["Qubits & the Bloch sphere", "Quantum gates", "Entanglement & teleportation", "Grover's & Shor's algorithms"],
    careers: ["Quantum software developer", "Research scientist", "Quantum hardware engineer"],
  },
};

const DIAGRAMS = {
  website: {
    title: "How a website reaches you",
    caption: "You ask for a name, it gets turned into an address, the server sends the page back — split into packets that reassemble on your screen.",
    svg: `<svg viewBox="0 0 620 150" role="img" aria-label="A browser asks DNS for an address, then requests a page from a server, which replies.">
      <rect class="dg-box" x="8" y="45" width="120" height="60" rx="10"/>
      <text class="dg-label" x="68" y="72" text-anchor="middle">You</text>
      <text class="dg-sub" x="68" y="90" text-anchor="middle">type a web name</text>
      <rect class="dg-box" x="250" y="8" width="120" height="50" rx="10"/>
      <text class="dg-label" x="310" y="30" text-anchor="middle">DNS</text>
      <text class="dg-sub" x="310" y="46" text-anchor="middle">name → address</text>
      <rect class="dg-box" x="492" y="45" width="120" height="60" rx="10"/>
      <text class="dg-label" x="552" y="72" text-anchor="middle">Server</text>
      <text class="dg-sub" x="552" y="90" text-anchor="middle">has the page</text>
      <path class="dg-line-accent" stroke-width="2" d="M128 60 Q190 30 250 33" marker-end="url(#ar)"/>
      <path class="dg-line-accent" stroke-width="2" d="M370 40 Q430 60 492 68" marker-end="url(#ar)"/>
      <path class="dg-line" stroke-width="2" stroke-dasharray="5 4" d="M492 90 Q310 140 128 92" marker-end="url(#ar2)"/>
      <text class="dg-mono" x="310" y="132" text-anchor="middle">the page comes back in packets</text>
      <defs>
        <marker id="ar" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" class="dg-line-accent" stroke-width="1.5"/></marker>
        <marker id="ar2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" class="dg-line" stroke-width="1.5"/></marker>
      </defs>
    </svg>`,
  },
  packets: {
    title: "One message → many packets → back together",
    caption: "Big data is chopped into small numbered packets. They travel separately (maybe by different routes) and are reassembled in order at the other end.",
    svg: `<svg viewBox="0 0 620 130" role="img" aria-label="A message splits into four numbered packets that travel and reassemble.">
      <rect class="dg-box" x="8" y="45" width="90" height="40" rx="8"/>
      <text class="dg-label" x="53" y="70" text-anchor="middle">message</text>
      <g>
        <rect class="dg-accent" x="200" y="18" width="34" height="26" rx="5"/><text class="dg-mono" x="217" y="36" text-anchor="middle" style="fill:#0b1220">1</text>
        <rect class="dg-accent" x="250" y="52" width="34" height="26" rx="5"/><text class="dg-mono" x="267" y="70" text-anchor="middle" style="fill:#0b1220">2</text>
        <rect class="dg-accent" x="200" y="86" width="34" height="26" rx="5"/><text class="dg-mono" x="217" y="104" text-anchor="middle" style="fill:#0b1220">3</text>
        <rect class="dg-accent" x="300" y="30" width="34" height="26" rx="5"/><text class="dg-mono" x="317" y="48" text-anchor="middle" style="fill:#0b1220">4</text>
      </g>
      <rect class="dg-box" x="470" y="30" width="34" height="26" rx="5"/><text class="dg-mono" x="487" y="48" text-anchor="middle">1</text>
      <rect class="dg-box" x="470" y="60" width="34" height="26" rx="5"/><text class="dg-mono" x="487" y="78" text-anchor="middle">2</text>
      <rect class="dg-box" x="510" y="30" width="34" height="26" rx="5"/><text class="dg-mono" x="527" y="48" text-anchor="middle">3</text>
      <rect class="dg-box" x="510" y="60" width="34" height="26" rx="5"/><text class="dg-mono" x="527" y="78" text-anchor="middle">4</text>
      <text class="dg-sub" x="507" y="104" text-anchor="middle">reassembled</text>
      <path class="dg-line" stroke-width="2" stroke-dasharray="4 4" d="M98 65 L196 65" marker-end="url(#pa)"/>
      <path class="dg-line" stroke-width="2" stroke-dasharray="4 4" d="M338 65 L466 60" marker-end="url(#pa)"/>
      <defs><marker id="pa" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" class="dg-line" stroke-width="1.5"/></marker></defs>
    </svg>`,
  },
  neural: {
    title: "A neural network: layers of simple units",
    caption: "Signals enter on the left, pass through layers of little units that each weigh what they receive, and combine into an answer on the right. No single unit is smart — the network is.",
    svg: `<svg viewBox="0 0 620 180" role="img" aria-label="Three layers of nodes connected left to right: inputs, a hidden layer, and an output.">
      <g class="dg-line" stroke-width="1">
        <path d="M110 40 L300 30"/><path d="M110 40 L300 90"/><path d="M110 40 L300 150"/>
        <path d="M110 90 L300 30"/><path d="M110 90 L300 90"/><path d="M110 90 L300 150"/>
        <path d="M110 140 L300 30"/><path d="M110 140 L300 90"/><path d="M110 140 L300 150"/>
        <path d="M300 30 L510 90"/><path d="M300 90 L510 90"/><path d="M300 150 L510 90"/>
      </g>
      <g><circle class="dg-box" cx="110" cy="40" r="16"/><circle class="dg-box" cx="110" cy="90" r="16"/><circle class="dg-box" cx="110" cy="140" r="16"/></g>
      <g><circle class="dg-accent" cx="300" cy="30" r="16"/><circle class="dg-accent" cx="300" cy="90" r="16"/><circle class="dg-accent" cx="300" cy="150" r="16"/></g>
      <circle class="dg-good" cx="510" cy="90" r="18"/>
      <text class="dg-sub" x="110" y="172" text-anchor="middle">inputs</text>
      <text class="dg-sub" x="300" y="172" text-anchor="middle">hidden layer</text>
      <text class="dg-sub" x="510" y="172" text-anchor="middle">answer</text>
    </svg>`,
  },
  table: {
    title: "A database table",
    caption: "Columns are the kinds of info you store; each row is one record. Simple — but this shape is what lets a database answer questions fast.",
    svg: `<svg viewBox="0 0 620 170" role="img" aria-label="A table with a header row of columns and three data rows.">
      <rect class="dg-accent" x="60" y="20" width="500" height="30"/>
      <text class="dg-label" x="120" y="40" text-anchor="middle" style="fill:#0b1220">name</text>
      <text class="dg-label" x="260" y="40" text-anchor="middle" style="fill:#0b1220">grade</text>
      <text class="dg-label" x="420" y="40" text-anchor="middle" style="fill:#0b1220">favorite subject</text>
      <g class="dg-mono">
        <rect class="dg-box" x="60" y="50" width="500" height="30"/><text x="120" y="70" text-anchor="middle">Marcus</text><text x="260" y="70" text-anchor="middle">10</text><text x="420" y="70" text-anchor="middle">CS</text>
        <rect class="dg-box" x="60" y="80" width="500" height="30"/><text x="120" y="100" text-anchor="middle">Aisha</text><text x="260" y="100" text-anchor="middle">11</text><text x="420" y="100" text-anchor="middle">Physics</text>
        <rect class="dg-box" x="60" y="110" width="500" height="30"/><text x="120" y="130" text-anchor="middle">Leo</text><text x="260" y="130" text-anchor="middle">9</text><text x="420" y="130" text-anchor="middle">Art</text>
      </g>
      <text class="dg-sub" x="310" y="12" text-anchor="middle">columns  →  the kinds of info</text>
      <text class="dg-sub" x="30" y="98" text-anchor="middle" transform="rotate(-90 30 98)">one row = one record</text>
    </svg>`,
  },
};

const WIDGET_META = {
  binary: { title: "Try it: build a number from 1s and 0s", hint: "Flip the switches on. Each switch is worth double the one to its right. Can you make the number 5? How about 42?" },
  caesar: { title: "Try it: a Caesar cipher", hint: "Type a message and drag the shift. Every letter slides that many steps through the alphabet. The shift is your secret 'key' — the same number unscrambles it." },
  qubit: { title: "Try it: a qubit", hint: "Spin it to put it in 'superposition' — both 0 and 1 at once. Then measure it: it randomly collapses to just one. Measure a bunch and watch the pattern." },
};

const WIDGET_BUILDERS = {
  binary(el) {
    const places = [128, 64, 32, 16, 8, 4, 2, 1];
    const bits = places.map(() => 0);
    el.innerHTML = `<div class="bits"></div>
      <div class="widget-readout">In binary: <span class="bin">00000000</span> &nbsp;=&nbsp; <span class="big">0</span> in the numbers you know</div>`;
    const bitsEl = el.querySelector(".bits");
    const binEl = el.querySelector(".bin");
    const bigEl = el.querySelector(".big");
    places.forEach((p, i) => {
      const b = document.createElement("button");
      b.className = "bit";
      b.innerHTML = `<span class="bit-val">0</span><span class="bit-place">${p}</span>`;
      b.addEventListener("click", () => {
        bits[i] = bits[i] ? 0 : 1;
        b.classList.toggle("on", !!bits[i]);
        b.querySelector(".bit-val").textContent = bits[i];
        const total = bits.reduce((s, on, j) => s + (on ? places[j] : 0), 0);
        binEl.textContent = bits.join("");
        bigEl.textContent = total;
      });
      bitsEl.appendChild(b);
    });
  },
  caesar(el) {
    el.innerHTML = `
      <div class="cipher-row">
        <div class="cipher-io"><label>Your message</label>
          <input class="cipher-input" type="text" value="HELLO" maxlength="40" /></div>
        <div class="cipher-slider-row">
          <input type="range" min="0" max="25" value="3" />
          <span class="cipher-shift">shift = 3</span>
        </div>
        <div class="cipher-io"><label>Scrambled (encrypted)</label>
          <div class="cipher-output"></div></div>
      </div>`;
    const inp = el.querySelector(".cipher-input");
    const slider = el.querySelector("input[type=range]");
    const shiftLabel = el.querySelector(".cipher-shift");
    const out = el.querySelector(".cipher-output");
    const enc = (text, k) =>
      text.replace(/[a-z]/gi, (c) => {
        const base = c <= "Z" ? 65 : 97;
        return String.fromCharCode(((c.charCodeAt(0) - base + k) % 26) + base);
      });
    const update = () => {
      const k = Number(slider.value);
      shiftLabel.textContent = `shift = ${k}`;
      out.textContent = enc(inp.value, k) || "…";
    };
    inp.addEventListener("input", update);
    slider.addEventListener("input", update);
    update();
  },
  qubit(el) {
    el.innerHTML = `
      <div class="qubit-wrap">
        <div class="coin" id="qcoin">?</div>
        <div class="qubit-controls">
          <div class="qubit-btns">
            <button class="lab-ghost q-spin">Spin (superposition)</button>
            <button class="lab-run q-measure">Measure</button>
          </div>
          <div class="qubit-state">Right now it's undecided — spinning between 0 and 1.</div>
          <div class="qubit-tally">measured so far → 0: 0 &nbsp; 1: 0</div>
        </div>
      </div>`;
    const coin = el.querySelector("#qcoin");
    const stateEl = el.querySelector(".qubit-state");
    const tally = el.querySelector(".qubit-tally");
    let spinning = true;
    let counts = { 0: 0, 1: 0 };
    coin.classList.add("spinning");
    el.querySelector(".q-spin").addEventListener("click", () => {
      spinning = true;
      coin.classList.add("spinning");
      coin.textContent = "?";
      stateEl.textContent = "In superposition — both 0 and 1 at once, until you measure it.";
    });
    el.querySelector(".q-measure").addEventListener("click", () => {
      const r = Math.random() < 0.5 ? 0 : 1;
      spinning = false;
      coin.classList.remove("spinning");
      coin.textContent = r;
      counts[r]++;
      stateEl.textContent = `Measured! It collapsed to |${r}⟩. Before you looked, it was genuinely both — measuring forced it to pick.`;
      tally.textContent = `measured so far → 0: ${counts[0]}   1: ${counts[1]}`;
    });
  },
};

// ---------------------------------------------------------------------------
// Voice — a real teacher talks, and you can talk back. Uses the browser's
// built-in Web Speech API (no server, no cost). Both degrade gracefully:
// the buttons stay hidden on browsers that don't support them.
// ---------------------------------------------------------------------------
const voiceToggle = $("#voice-toggle");
const micBtn = $("#mic-btn");

// --- Text to speech: the teacher reads its replies aloud ---
const synth = window.speechSynthesis;
let readAloud = false;
if (synth) {
  voiceToggle.hidden = false;
  voiceToggle.innerHTML = `${ICON.speaker} Read aloud`;
  voiceToggle.addEventListener("click", () => {
    readAloud = !readAloud;
    voiceToggle.setAttribute("aria-pressed", String(readAloud));
    voiceToggle.innerHTML = readAloud ? `${ICON.speaker} Reading aloud` : `${ICON.speaker} Read aloud`;
    if (!readAloud) synth.cancel();
  });
}
// Chrome's voice list loads asynchronously — calling speak() before it's
// ready can silently drop the first attempt (the "worked after a few
// seconds" bug). Warm it up immediately instead of waiting for a click.
let voices = [];
function loadVoices() { voices = synth ? synth.getVoices() : []; }
if (synth) {
  loadVoices();
  synth.addEventListener("voiceschanged", loadVoices);
}
function pickVoice() {
  if (!voices.length) return null;
  const preferences = [
    (v) => /Google US English/i.test(v.name),
    (v) => /Natural|Enhanced|Premium/i.test(v.name) && /^en/i.test(v.lang),
    (v) => /^en-US/i.test(v.lang) && !v.localService,
    (v) => /^en-US/i.test(v.lang),
    (v) => /^en/i.test(v.lang),
  ];
  for (const test of preferences) {
    const found = voices.find(test);
    if (found) return found;
  }
  return voices[0];
}
function speak(text) {
  if (!synth || !readAloud || !text) return;
  // Strip code blocks / markdown so it reads naturally.
  const clean = text.replace(/```[\s\S]*?```/g, " (see the code) ").replace(/[`*_#>]/g, "");
  synth.cancel();
  const u = new SpeechSynthesisUtterance(clean);
  u.rate = 1.02;
  u.pitch = 1.0;
  const voice = pickVoice();
  if (voice) u.voice = voice;
  synth.speak(u);
}

// --- Speech to text: the student speaks instead of typing ---
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
let recog = null;
let listening = false;
if (SR) {
  micBtn.hidden = false;
  recog = new SR();
  recog.lang = "en-US";
  recog.interimResults = true;
  recog.continuous = false;
  recog.addEventListener("result", (e) => {
    let txt = "";
    for (let i = 0; i < e.results.length; i++) txt += e.results[i][0].transcript;
    input.value = txt;
    input.style.height = "auto";
    input.style.height = Math.min(input.scrollHeight, 160) + "px";
    if (e.results[e.results.length - 1].isFinal) {
      stopListening();
      if (input.value.trim()) composer.requestSubmit();
    }
  });
  recog.addEventListener("end", stopListening);
  recog.addEventListener("error", stopListening);
  micBtn.addEventListener("click", () => {
    if (listening) { stopListening(); return; }
    try { recog.start(); listening = true; micBtn.classList.add("listening"); micBtn.title = "Listening… click to stop"; input.focus(); }
    catch (_) { /* already started */ }
  });
}
function stopListening() {
  listening = false;
  micBtn.classList.remove("listening");
  micBtn.title = "Speak instead of typing";
  try { recog && recog.stop(); } catch (_) {}
}

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
    labStatus.textContent = "a shared scratchpad — same code no matter which lesson you're on";
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

// ---------------------------------------------------------------------------
// First-visit welcome + optional guided tour.
// ---------------------------------------------------------------------------
const welcomeModal = $("#welcome-modal");
function dismissWelcome() {
  welcomeModal.hidden = true;
  state.seenWelcome = true;
  saveState();
}
$("#welcome-skip").addEventListener("click", dismissWelcome);
$("#welcome-tour").addEventListener("click", () => {
  dismissWelcome();
  startTour();
});
// A persistent way back in — for "wait, what does Teacher's notes do again?"
// or anyone who wants to replay the intro and tour later.
$("#help-btn").addEventListener("click", () => { welcomeModal.hidden = false; });

const TOUR_STEPS = [
  { sel: "#track-picker", pos: "right", text: "Start here: pick a field. There are nine — from coding and cybersecurity to AI and quantum. Each one is a short guided path." },
  { sel: "#messages", pos: "left", text: "Your teacher opens every lesson with a question. Just talk to it like a real tutor — there's genuinely no such thing as a dumb question." },
  { sel: "#stuck-row", pos: "top", text: "Stuck? Ask for a small nudge or a bigger hint — it won't just hand you the answer. Hit “I think I've got it” to move on." },
  { sel: "#lab-toggle", pos: "bottom", text: "The Code Lab runs real Python right in your browser — nothing to install, even on a school Chromebook." },
  { sel: "#roadmap-btn", pos: "right", text: "Not sure what's next? Your roadmap shows what to build, what to learn next, free courses with certificates, and the careers it leads to." },
  { sel: "#notes-toggle", pos: "bottom", text: "Tell your teacher about you here — your name and interests. It remembers you across every field." },
  { sel: "#voice-toggle", pos: "bottom", text: "Prefer listening? Have the teacher read aloud — and use the mic to talk instead of type." },
];

let tourIdx = 0;
let tourBackdrop = null;
const tourEl = $("#tour");
const tourBox = $("#tour-box");
let tourTarget = null;

function startTour() {
  tourIdx = 0;
  tourBackdrop = document.createElement("div");
  tourBackdrop.className = "tour-backdrop";
  tourBackdrop.addEventListener("click", endTour);
  document.body.appendChild(tourBackdrop);
  tourEl.hidden = false;
  showTourStep();
}
function clearHighlight() {
  if (tourTarget) { tourTarget.classList.remove("tour-highlight"); tourTarget = null; }
}
function endTour() {
  clearHighlight();
  tourEl.hidden = true;
  if (tourBackdrop) { tourBackdrop.remove(); tourBackdrop = null; }
}
function showTourStep() {
  clearHighlight();
  // Skip steps whose target is missing or hidden (e.g. voice on unsupported browsers).
  while (tourIdx < TOUR_STEPS.length) {
    const el = document.querySelector(TOUR_STEPS[tourIdx].sel);
    if (el && el.offsetParent !== null) break;
    tourIdx++;
  }
  if (tourIdx >= TOUR_STEPS.length) { endTour(); return; }

  const step = TOUR_STEPS[tourIdx];
  const el = document.querySelector(step.sel);
  tourTarget = el;
  el.classList.add("tour-highlight");
  el.scrollIntoView({ block: "center", behavior: "smooth" });

  $("#tour-text").textContent = step.text;
  $("#tour-count").textContent = `${tourIdx + 1} / ${TOUR_STEPS.length}`;
  $("#tour-next").textContent = tourIdx === TOUR_STEPS.length - 1 ? "Done" : "Next";

  // Position the tooltip after the scroll settles.
  setTimeout(() => positionTour(el, step.pos), 260);
}
function positionTour(el, pos) {
  const r = el.getBoundingClientRect();
  const box = tourBox;
  const bw = Math.min(300, window.innerWidth - 24);
  box.style.maxWidth = bw + "px";
  const bh = box.offsetHeight || 120;
  let top, left;
  if (pos === "right") { left = r.right + 14; top = r.top; }
  else if (pos === "left") { left = r.left - bw - 14; top = r.top + 20; }
  else if (pos === "top") { left = r.left; top = r.top - bh - 14; }
  else { left = r.left; top = r.bottom + 14; } // bottom
  // Clamp into the viewport.
  left = Math.max(12, Math.min(left, window.innerWidth - bw - 12));
  top = Math.max(12, Math.min(top, window.innerHeight - bh - 12));
  box.style.left = left + "px";
  box.style.top = top + "px";
}
$("#tour-next").addEventListener("click", () => { tourIdx++; showTourStep(); });
$("#tour-skip").addEventListener("click", endTour);
window.addEventListener("resize", () => {
  if (!tourEl.hidden && tourTarget) positionTour(tourTarget, TOUR_STEPS[tourIdx].pos);
});

// ---------------------------------------------------------------------------
// Mobile drawer: on small screens the sidebar is off-canvas by default (see
// CSS) so it doesn't just vanish. This opens/closes it as a slide-in drawer.
// ---------------------------------------------------------------------------
const sidebarEl = $("#sidebar");
const sidebarBackdrop = $("#sidebar-backdrop");
const mobileMenuBtn = $("#mobile-menu-btn");
function setSidebarOpen(open) {
  sidebarEl.classList.toggle("open", open);
  sidebarBackdrop.hidden = !open;
  mobileMenuBtn.setAttribute("aria-expanded", String(open));
}
mobileMenuBtn.addEventListener("click", () => setSidebarOpen(true));
$("#sidebar-close").addEventListener("click", () => setSidebarOpen(false));
sidebarBackdrop.addEventListener("click", () => setSidebarOpen(false));
// Close the drawer once a student picks a field or lesson on mobile.
pathEl.addEventListener("click", () => setSidebarOpen(false));
trackPickerEl.addEventListener("click", () => setSidebarOpen(false));

// Boot
renderTracks();
renderPath();
renderLessonHeader();
renderChat();
if (!state.seenWelcome) welcomeModal.hidden = false;
