import type { Track } from "./questions";

export interface Lesson {
  id: string;
  track: Track;
  topic: string;
  title: string;
  minutes: number;
  blocks: LessonBlock[];
  practice: Practice;
}

export type LessonBlock =
  | { type: "text"; content: string }
  | { type: "code"; content: string; caption?: string }
  | { type: "tip"; content: string }
  | { type: "try"; content: string };

export interface Practice {
  prompt: string;
  starter?: string;
  /** The canonical correct answer (shown in "see my mistake"). */
  expected: string;
  /** Optional extra accepted variants. All compared with normalized whitespace. */
  acceptable?: string[];
  /** Friendly explanation shown when the user asks to see their mistake. */
  hint: string;
  /** "code" uses a monospace textarea; "text" uses a normal one-liner. */
  kind: "code" | "text";
}

/** Loose equality: strips trailing spaces, collapses runs of spaces, ignores blank lines & case. */
export function practiceMatches(input: string, p: Practice): boolean {
  const norm = (s: string) =>
    s
      .replace(/\r/g, "")
      .split("\n")
      .map(l => l.replace(/\s+/g, " ").trim())
      .filter(Boolean)
      .join("\n")
      .toLowerCase();
  const target = [p.expected, ...(p.acceptable ?? [])].map(norm);
  return target.includes(norm(input));
}

export const LESSONS: Lesson[] = [
  // ============ PYTHON PATH ============
  {
    id: "py-l-1", track: "python", topic: "Basics", minutes: 3,
    title: "Hello, Python",
    blocks: [
      { type: "text", content: "Python is a programming language designed to read almost like English. You write instructions in a .py file and Python runs them top to bottom." },
      { type: "text", content: "The simplest instruction is print() — it shows text on the screen." },
      { type: "code", content: 'print("Hello, world!")', caption: "Your very first program." },
      { type: "text", content: "Anything inside quotes is a string (text). Anything that is a number doesn't need quotes." },
      { type: "code", content: 'print(7)\nprint(2 + 3)' },
      { type: "tip", content: "The + operator adds numbers but also joins strings: \"hi \" + \"there\"." },
    ],
    practice: {
      kind: "code",
      prompt: "Write a single line of Python that prints the text:  Hello, Python",
      starter: "",
      expected: 'print("Hello, Python")',
      acceptable: ["print('Hello, Python')"],
      hint: "Use the print() function and pass the text inside quotes — exactly: print(\"Hello, Python\")",
    },
  },
  {
    id: "py-l-2", track: "python", topic: "Basics", minutes: 4,
    title: "Variables & Types",
    blocks: [
      { type: "text", content: "A variable is a labelled box that holds a value. You create it with =." },
      { type: "code", content: 'age = 25\nname = "Ada"\nprint(name, age)' },
      { type: "text", content: "Common types: int (whole numbers), float (decimals), str (text), bool (True/False)." },
      { type: "code", content: 'price = 9.99    # float\nin_stock = True # bool' },
      { type: "tip", content: "Type names matter: True and False are capitalised in Python." },
    ],
    practice: {
      kind: "code",
      prompt: "Create a variable called age with the value 30, then print it.",
      starter: "",
      expected: "age = 30\nprint(age)",
      hint: "Two lines:\n  age = 30\n  print(age)\nNo quotes around 30 — it's a number, not text.",
    },
  },
  {
    id: "py-l-3", track: "python", topic: "Strings", minutes: 3,
    title: "Working with Strings",
    blocks: [
      { type: "text", content: "Strings have lots of helpful tools. len(s) tells you how long a string is." },
      { type: "code", content: 's = "python"\nprint(len(s))     # 6\nprint(s.upper())  # PYTHON' },
      { type: "text", content: "You can grab parts of a string by index (starting at 0) or with a slice [start:end]." },
      { type: "code", content: 'word = "hello"\nprint(word[0])    # h\nprint(word[1:4])  # ell' },
      { type: "try", content: "Predict: what does \"banana\"[2:5] print?" },
    ],
    practice: {
      kind: "code",
      prompt: 'Given  word = "python", print the length of the word and the word in UPPERCASE on two lines.',
      starter: 'word = "python"\n',
      expected: 'word = "python"\nprint(len(word))\nprint(word.upper())',
      hint: "Use len(word) for the length, and word.upper() to get PYTHON. Print each on its own line.",
    },
  },
  {
    id: "py-l-4", track: "python", topic: "Lists", minutes: 4,
    title: "Lists: ordered collections",
    blocks: [
      { type: "text", content: "A list stores many items in order. Use square brackets." },
      { type: "code", content: 'fruits = ["apple", "pear", "kiwi"]\nprint(fruits[0])     # apple\nprint(fruits[-1])    # kiwi (last)' },
      { type: "text", content: "Lists can grow and shrink." },
      { type: "code", content: 'fruits.append("mango")  # add to end\nfruits.remove("pear")   # remove value' },
      { type: "tip", content: "Negative indices count from the end: -1 is last, -2 is second-to-last." },
    ],
    practice: {
      kind: "code",
      prompt: 'Create a list called nums with 1, 2, 3, then append 4 to it, then print the list.',
      expected: "nums = [1, 2, 3]\nnums.append(4)\nprint(nums)",
      hint: "Three lines:\n  nums = [1, 2, 3]\n  nums.append(4)\n  print(nums)\nappend() adds to the end of the list.",
    },
  },
  {
    id: "py-l-5", track: "python", topic: "Dicts", minutes: 4,
    title: "Dictionaries: key → value",
    blocks: [
      { type: "text", content: "A dictionary maps keys to values. Use curly braces." },
      { type: "code", content: 'user = {"name": "Sam", "age": 30}\nprint(user["name"])         # Sam' },
      { type: "text", content: "Reading a missing key crashes. .get() lets you set a fallback." },
      { type: "code", content: 'print(user.get("email", "unknown"))' },
    ],
    practice: {
      kind: "code",
      prompt: 'Make a dictionary user with name "Sam" and age 30, then print the name.',
      expected: 'user = {"name": "Sam", "age": 30}\nprint(user["name"])',
      acceptable: ["user = {'name': 'Sam', 'age': 30}\nprint(user['name'])"],
      hint: 'Curly braces for the dict, square brackets to read a key:\n  user = {"name": "Sam", "age": 30}\n  print(user["name"])',
    },
  },
  {
    id: "py-l-6", track: "python", topic: "Flow", minutes: 4,
    title: "If, Else & Loops",
    blocks: [
      { type: "text", content: "Use if to make decisions. Indentation (4 spaces) defines the block." },
      { type: "code", content: 'temp = 28\nif temp > 25:\n    print("hot")\nelse:\n    print("cool")' },
      { type: "text", content: "A for-loop walks through a collection." },
      { type: "code", content: 'for fruit in ["apple", "pear"]:\n    print(fruit)' },
      { type: "tip", content: "range(5) gives 0,1,2,3,4 — handy for counting loops." },
    ],
    practice: {
      kind: "code",
      prompt: 'Given  x = 10, print "big" if x is greater than 5, otherwise print "small".',
      expected: 'x = 10\nif x > 5:\n    print("big")\nelse:\n    print("small")',
      hint: 'Use if / else with a colon at the end of each, and indent the print line:\n  if x > 5:\n      print("big")\n  else:\n      print("small")',
    },
  },
  {
    id: "py-l-7", track: "python", topic: "Functions", minutes: 4,
    title: "Functions: reusable blocks",
    blocks: [
      { type: "text", content: "A function bundles steps under a name so you can run them anytime." },
      { type: "code", content: 'def greet(name):\n    return "Hi, " + name\n\nprint(greet("Ada"))' },
      { type: "text", content: "Parameters are inputs; return sends a value back to the caller." },
      { type: "tip", content: "Functions keep code DRY — Don't Repeat Yourself." },
    ],
    practice: {
      kind: "code",
      prompt: "Define a function add(a, b) that returns a + b, then print add(2, 3).",
      expected: "def add(a, b):\n    return a + b\nprint(add(2, 3))",
      hint: "Start with def, indent the return line, then call the function inside print:\n  def add(a, b):\n      return a + b\n  print(add(2, 3))",
    },
  },
  {
    id: "py-l-8", track: "python", topic: "OOP", minutes: 5,
    title: "Classes: your own types",
    blocks: [
      { type: "text", content: "A class is a blueprint. Instances are objects built from it." },
      { type: "code", content: 'class Dog:\n    def __init__(self, name):\n        self.name = name\n    def bark(self):\n        print(self.name, "says woof")\n\nd = Dog("Rex")\nd.bark()' },
      { type: "text", content: "self is how the object refers to itself. __init__ runs when the object is created." },
    ],
    practice: {
      kind: "code",
      prompt: 'Create a class Dog whose __init__ stores name on self. Then create d = Dog("Rex") and print d.name.',
      expected: 'class Dog:\n    def __init__(self, name):\n        self.name = name\nd = Dog("Rex")\nprint(d.name)',
      hint: "Inside __init__ assign self.name = name. Then build the object and read the attribute:\n  class Dog:\n      def __init__(self, name):\n          self.name = name\n  d = Dog(\"Rex\")\n  print(d.name)",
    },
  },

  // ============ CAD PATH ============
  {
    id: "cad-l-1", track: "cad", topic: "Fundamentals", minutes: 3,
    title: "What is CAD?",
    blocks: [
      { type: "text", content: "CAD = Computer-Aided Design. Instead of drawing on paper, you build precise 2D drawings and 3D models on a computer." },
      { type: "text", content: "Two big families:\n• 2D drafting (AutoCAD) — floor plans, schematics.\n• 3D modeling (Fusion 360, SolidWorks, Onshape) — parts and assemblies you can manufacture." },
      { type: "tip", content: "If you're starting from zero, Fusion 360 is free for hobbyists and runs on Mac & Windows." },
    ],
    practice: {
      kind: "text",
      prompt: "What does the acronym CAD stand for? (Write it out in full.)",
      expected: "Computer-Aided Design",
      acceptable: ["Computer Aided Design"],
      hint: "CAD = Computer-Aided Design.",
    },
  },
  {
    id: "cad-l-2", track: "cad", topic: "Fundamentals", minutes: 4,
    title: "Parametric Modeling",
    blocks: [
      { type: "text", content: "Modern CAD is parametric: every model is a recipe of steps (the feature tree). Change a number, and the model rebuilds." },
      { type: "text", content: "Example recipe for a bolt:\n1. Sketch a circle (Ø10 mm)\n2. Extrude 50 mm → shaft\n3. Sketch hexagon on top\n4. Extrude 6 mm → head" },
      { type: "tip", content: "Because it's a recipe, you can edit step 1 to Ø12 and everything updates." },
    ],
    practice: {
      kind: "text",
      prompt: "In a parametric CAD system, the ordered list of steps that builds your model is called the ____ tree.",
      expected: "feature",
      hint: "It's called the feature tree — each step is one feature in the recipe.",
    },
  },
  {
    id: "cad-l-3", track: "cad", topic: "Sketching", minutes: 5,
    title: "Sketches & Constraints",
    blocks: [
      { type: "text", content: "All 3D parts start as a 2D sketch on a plane. You draw lines, arcs, circles, then lock them down." },
      { type: "text", content: "Constraints tell the sketch how things relate:\n• Coincident — two points meet\n• Horizontal / Vertical\n• Perpendicular / Parallel\n• Equal — same length/radius\n• Tangent — curves touch smoothly" },
      { type: "text", content: "Dimensions add the numbers (e.g. 40 mm). A sketch is fully-defined when nothing can move — usually shown in black." },
      { type: "tip", content: "Blue line = under-defined. Add constraints or dimensions until it turns black." },
    ],
    practice: {
      kind: "text",
      prompt: "Which constraint forces two lines to meet at a 90° angle?",
      expected: "perpendicular",
      hint: "Perpendicular — it locks two lines at 90° to each other.",
    },
  },
  {
    id: "cad-l-4", track: "cad", topic: "Features", minutes: 5,
    title: "Core 3D Features",
    blocks: [
      { type: "text", content: "Once you have a sketch, you turn it into 3D with a feature:" },
      { type: "text", content: "• Extrude — push a profile in a straight line (a circle → a cylinder).\n• Revolve — spin a profile around an axis (a half-bottle → a bottle).\n• Sweep — drag a profile along a path (handlebars).\n• Loft — blend between two or more profiles (a boat hull)." },
      { type: "tip", content: "Combine with Cut versions of the same tools to remove material — that's how you make holes and pockets." },
    ],
    practice: {
      kind: "text",
      prompt: "Which 3D feature spins a 2D profile around an axis (e.g. to make a bottle)?",
      expected: "revolve",
      hint: "Revolve — it sweeps a profile around an axis of rotation.",
    },
  },
  {
    id: "cad-l-5", track: "cad", topic: "Fusion 360", minutes: 5,
    title: "Your First Fusion 360 Part",
    blocks: [
      { type: "text", content: "Try this in Fusion 360:" },
      { type: "text", content: "1. Create → New Design.\n2. Click the top plane, press S, search 'Line' (or press L).\n3. Draw a rectangle 50 × 30 mm. Press D to add dimensions.\n4. Stop Sketch.\n5. Press E (Extrude) → 10 mm. OK.\nYou just made a parametric plate." },
      { type: "tip", content: "Useful shortcuts: L = Line, R = Rectangle, C = Circle, D = Dimension, E = Extrude, S = Search." },
    ],
    practice: {
      kind: "text",
      prompt: "Which Fusion 360 keyboard shortcut starts the Extrude command?",
      expected: "E",
      hint: "Press E for Extrude. (L = Line, R = Rectangle, C = Circle, D = Dimension.)",
    },
  },
  {
    id: "cad-l-6", track: "cad", topic: "AutoCAD", minutes: 4,
    title: "AutoCAD by command line",
    blocks: [
      { type: "text", content: "AutoCAD is driven by typing commands. After each command, watch the prompt at the bottom and follow it." },
      { type: "code", content: 'L  (Line)        → pick two points\nC  (Circle)      → pick centre, type radius\nO  (Offset)      → distance, then pick line\nTR (Trim)        → cut overlapping ends' },
      { type: "tip", content: "Press ESC to cancel a command. Spacebar repeats the last command." },
    ],
    practice: {
      kind: "text",
      prompt: "Which AutoCAD command (the short letters you type) trims overlapping line ends?",
      expected: "TR",
      acceptable: ["trim"],
      hint: "Type TR for the Trim command — it cuts away overlapping ends.",
    },
  },
  {
    id: "cad-l-7", track: "cad", topic: "Assemblies", minutes: 5,
    title: "Assemblies & Joints",
    blocks: [
      { type: "text", content: "Real products are many parts working together. An assembly groups them and defines how they move." },
      { type: "text", content: "Fusion 360 uses Joints. The common ones:\n• Rigid — locks parts together (a bolted bracket)\n• Revolute — rotates around an axis (a hinge)\n• Slider — moves along an axis (a drawer)\n• Cylindrical — rotate + slide (a piston)" },
      { type: "tip", content: "SolidWorks calls these Mates (Concentric, Coincident, Distance, etc.) — same idea, different name." },
    ],
    practice: {
      kind: "text",
      prompt: "Which Fusion 360 joint type would you use for a door hinge (rotation around one axis)?",
      expected: "revolute",
      hint: "Revolute — it allows rotation around a single axis, perfect for a hinge.",
    },
  },
  {
    id: "cad-l-8", track: "cad", topic: "Drafting", minutes: 4,
    title: "From Model to Drawing",
    blocks: [
      { type: "text", content: "A 3D model isn't enough to make something — the workshop needs a 2D drawing with views and dimensions." },
      { type: "text", content: "A drawing typically shows:\n• Front, Top, Side views (orthographic projection)\n• An isometric view in the corner\n• Dimensions, tolerances, material, scale\n• A title block with part number" },
      { type: "tip", content: "First-angle (Europe/Asia) and third-angle (USA) just rearrange where views go around the front view." },
    ],
    practice: {
      kind: "text",
      prompt: "What is the name of the projection system that shows Front, Top, and Side views of a part?",
      expected: "orthographic",
      acceptable: ["orthographic projection"],
      hint: "Orthographic projection — the standard 2D view system for engineering drawings.",
    },
  },
];

export function lessonsFor(track: Track | "mixed"): Lesson[] {
  if (track === "mixed") return LESSONS;
  return LESSONS.filter(l => l.track === track);
}
