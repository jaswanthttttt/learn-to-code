export type Track = "python" | "cad";

export interface Question {
  id: string;
  track: Track;
  topic: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  prompt: string;
  code?: string;
  choices: string[];
  answer: number;
  explanation: string;
}

export const QUESTIONS: Question[] = [
  // ---------- PYTHON ----------
  {
    id: "py-1", track: "python", topic: "Basics", difficulty: 1,
    prompt: "What is the output?",
    code: "print(2 ** 3)",
    choices: ["6", "8", "9", "23"],
    answer: 1,
    explanation: "** is the exponent operator. 2³ = 8.",
  },
  {
    id: "py-2", track: "python", topic: "Strings", difficulty: 1,
    prompt: "Which gives the length of a string s?",
    choices: ["s.length()", "len(s)", "size(s)", "s.size"],
    answer: 1,
    explanation: "Python uses the built-in len() function.",
  },
  {
    id: "py-3", track: "python", topic: "Lists", difficulty: 2,
    prompt: "What does this print?",
    code: "a = [1,2,3,4]\nprint(a[-2])",
    choices: ["2", "3", "4", "Error"],
    answer: 1,
    explanation: "Negative indices count from the end. -2 → 3.",
  },
  {
    id: "py-4", track: "python", topic: "Slicing", difficulty: 2,
    prompt: "Result of 'hello'[1:4]?",
    choices: ["'hel'", "'ell'", "'ello'", "'hell'"],
    answer: 1,
    explanation: "Slice [1:4] → indices 1,2,3 = 'ell'.",
  },
  {
    id: "py-5", track: "python", topic: "Dicts", difficulty: 2,
    prompt: "How do you safely get a key, defaulting to 0?",
    choices: ["d['k'] or 0", "d.get('k', 0)", "d.fetch('k', 0)", "d.default('k')"],
    answer: 1,
    explanation: "dict.get(key, default) returns default if the key is missing.",
  },
  {
    id: "py-6", track: "python", topic: "Comprehensions", difficulty: 3,
    prompt: "What does this produce?",
    code: "[x*x for x in range(4) if x % 2]",
    choices: ["[0,1,4,9]", "[1,9]", "[1,4,9]", "[0,4]"],
    answer: 1,
    explanation: "Only odd x (1,3) are kept; squared → [1, 9].",
  },
  {
    id: "py-7", track: "python", topic: "Functions", difficulty: 2,
    prompt: "What is *args used for?",
    choices: ["Pointer", "Variable positional arguments", "Type hint", "Default values"],
    answer: 1,
    explanation: "*args collects extra positional arguments into a tuple.",
  },
  {
    id: "py-8", track: "python", topic: "Errors", difficulty: 2,
    prompt: "Which keyword runs cleanup whether or not an exception occurred?",
    choices: ["except", "else", "finally", "raise"],
    answer: 2,
    explanation: "finally always executes after try/except.",
  },
  {
    id: "py-9", track: "python", topic: "OOP", difficulty: 3,
    prompt: "What is the first parameter of an instance method?",
    choices: ["this", "self", "cls", "me"],
    answer: 1,
    explanation: "By convention the first arg of instance methods is self.",
  },
  {
    id: "py-10", track: "python", topic: "OOP", difficulty: 3,
    prompt: "Which decorator marks a method that doesn't need self or cls?",
    choices: ["@classmethod", "@staticmethod", "@property", "@abstractmethod"],
    answer: 1,
    explanation: "@staticmethod defines a method that needs no instance/class reference.",
  },
  {
    id: "py-11", track: "python", topic: "Iterators", difficulty: 4,
    prompt: "What does yield do?",
    choices: ["Returns and exits", "Pauses and yields a value from a generator", "Throws an error", "Imports a module"],
    answer: 1,
    explanation: "yield turns a function into a generator that produces values lazily.",
  },
  {
    id: "py-12", track: "python", topic: "Files", difficulty: 3,
    prompt: "Best practice to open a file?",
    choices: ["open(f); ...; close(f)", "with open(f) as x:", "file = read(f)", "os.read(f)"],
    answer: 1,
    explanation: "The with-statement ensures the file is closed automatically.",
  },
  {
    id: "py-13", track: "python", topic: "Numpy", difficulty: 4,
    prompt: "np.zeros((2,3)) returns an array of shape?",
    choices: ["(3,2)", "(2,3)", "(6,)", "(2,2,3)"],
    answer: 1,
    explanation: "Shape tuple (rows, cols) → 2×3 matrix of zeros.",
  },
  {
    id: "py-14", track: "python", topic: "Pandas", difficulty: 4,
    prompt: "Which selects rows by label?",
    choices: ["df.iloc[0]", "df.loc['a']", "df[0]", "df.at(0)"],
    answer: 1,
    explanation: ".loc is label-based; .iloc is integer-position based.",
  },
  {
    id: "py-15", track: "python", topic: "Async", difficulty: 5,
    prompt: "What keyword waits on a coroutine?",
    choices: ["yield", "await", "wait", "future"],
    answer: 1,
    explanation: "await suspends until the awaited coroutine completes.",
  },
  {
    id: "py-16", track: "python", topic: "Tricky", difficulty: 5,
    prompt: "Output?",
    code: "a = [[]] * 3\na[0].append(1)\nprint(a)",
    choices: ["[[1], [], []]", "[[1], [1], [1]]", "Error", "[[1,1,1]]"],
    answer: 1,
    explanation: "All three references point to the SAME inner list.",
  },

  // ---------- CAD ----------
  {
    id: "cad-1", track: "cad", topic: "Fundamentals", difficulty: 1,
    prompt: "CAD stands for…",
    choices: ["Computer-Assisted Drawing", "Computer-Aided Design", "Central Axis Design", "Computed Architectural Drafting"],
    answer: 1,
    explanation: "CAD = Computer-Aided Design.",
  },
  {
    id: "cad-2", track: "cad", topic: "Fundamentals", difficulty: 1,
    prompt: "Which is a parametric, history-based CAD package?",
    choices: ["Photoshop", "SolidWorks", "Blender (default)", "Notepad++"],
    answer: 1,
    explanation: "SolidWorks builds models from a feature tree with parameters.",
  },
  {
    id: "cad-3", track: "cad", topic: "Sketching", difficulty: 2,
    prompt: "A fully-defined sketch in SolidWorks/Fusion is shown in what color (default)?",
    choices: ["Blue", "Black", "Red", "Green"],
    answer: 1,
    explanation: "Under-defined entities are blue; fully-defined turn black.",
  },
  {
    id: "cad-4", track: "cad", topic: "Features", difficulty: 2,
    prompt: "Which feature sweeps a profile along a straight distance?",
    choices: ["Revolve", "Extrude", "Loft", "Sweep"],
    answer: 1,
    explanation: "Extrude pushes a 2D profile linearly to form a 3D body.",
  },
  {
    id: "cad-5", track: "cad", topic: "Features", difficulty: 2,
    prompt: "Which feature rotates a profile around an axis?",
    choices: ["Extrude", "Revolve", "Pattern", "Mirror"],
    answer: 1,
    explanation: "Revolve sweeps a profile around a chosen axis.",
  },
  {
    id: "cad-6", track: "cad", topic: "Fusion 360", difficulty: 2,
    prompt: "Shortcut to start a Line in Fusion 360?",
    choices: ["L", "P", "D", "R"],
    answer: 0,
    explanation: "L starts the Line tool in Fusion 360's sketch mode.",
  },
  {
    id: "cad-7", track: "cad", topic: "AutoCAD", difficulty: 2,
    prompt: "AutoCAD command to draw a circle?",
    choices: ["CIR", "C", "CRCL", "O"],
    answer: 1,
    explanation: "Type C (or CIRCLE) at the command line.",
  },
  {
    id: "cad-8", track: "cad", topic: "AutoCAD", difficulty: 2,
    prompt: "Command for parallel copy at a distance?",
    choices: ["COPY", "OFFSET", "MIRROR", "ARRAY"],
    answer: 1,
    explanation: "OFFSET creates a parallel curve at a specified distance.",
  },
  {
    id: "cad-9", track: "cad", topic: "Constraints", difficulty: 3,
    prompt: "Which constraint forces two lines to meet at 90°?",
    choices: ["Coincident", "Tangent", "Perpendicular", "Concentric"],
    answer: 2,
    explanation: "Perpendicular = 90° between entities.",
  },
  {
    id: "cad-10", track: "cad", topic: "Assemblies", difficulty: 3,
    prompt: "In SolidWorks assemblies, what relates parts to each other?",
    choices: ["Mates", "Joints", "Links", "Bonds"],
    answer: 0,
    explanation: "Mates (e.g., coincident, concentric) define part relationships.",
  },
  {
    id: "cad-11", track: "cad", topic: "Fusion 360", difficulty: 3,
    prompt: "Fusion 360 calls assembly relationships…",
    choices: ["Mates", "Joints", "Couplings", "Links"],
    answer: 1,
    explanation: "Fusion uses Joints (rigid, revolute, slider, etc.).",
  },
  {
    id: "cad-12", track: "cad", topic: "Drafting", difficulty: 3,
    prompt: "First-angle vs third-angle projection differs in…",
    choices: ["Color", "View arrangement", "Units", "Scale"],
    answer: 1,
    explanation: "They place orthographic views differently around the front view.",
  },
  {
    id: "cad-13", track: "cad", topic: "Surfacing", difficulty: 4,
    prompt: "A 'Loft' feature requires at least…",
    choices: ["1 profile", "2 profiles", "3 profiles", "A path only"],
    answer: 1,
    explanation: "Loft blends between 2+ profiles (optionally along a guide).",
  },
  {
    id: "cad-14", track: "cad", topic: "Sheet Metal", difficulty: 4,
    prompt: "K-factor describes…",
    choices: ["Material color", "Neutral axis position in a bend", "Sheet thickness", "Tool radius"],
    answer: 1,
    explanation: "K-factor locates the neutral axis used for flat-pattern calc.",
  },
  {
    id: "cad-15", track: "cad", topic: "GD&T", difficulty: 5,
    prompt: "The symbol ⌖ represents…",
    choices: ["Flatness", "Position (true position)", "Cylindricity", "Runout"],
    answer: 1,
    explanation: "⌖ is the Position tolerance from the GD&T standard.",
  },
  {
    id: "cad-16", track: "cad", topic: "CAM", difficulty: 5,
    prompt: "G-code 'G01' means…",
    choices: ["Rapid move", "Linear feed move", "Circular CW", "Tool change"],
    answer: 1,
    explanation: "G00 = rapid, G01 = linear interpolation at feedrate.",
  },
];

export const RANKS = [
  { name: "Novice Drafter", min: 0, color: "oklch(0.7 0.05 250)" },
  { name: "Apprentice Coder", min: 50, color: "oklch(0.75 0.12 180)" },
  { name: "Sketch Initiate", min: 150, color: "oklch(0.78 0.15 200)" },
  { name: "Script Adept", min: 300, color: "oklch(0.78 0.18 155)" },
  { name: "Feature Engineer", min: 500, color: "oklch(0.78 0.2 130)" },
  { name: "Design Specialist", min: 800, color: "oklch(0.75 0.22 80)" },
  { name: "Master Modeler", min: 1200, color: "oklch(0.72 0.22 40)" },
  { name: "Architect of Logic", min: 1800, color: "oklch(0.7 0.24 320)" },
  { name: "Grandmaster", min: 2500, color: "oklch(0.85 0.2 90)" },
] as const;

export type Rank = (typeof RANKS)[number];

export function getRank(xp: number): { current: Rank; next: Rank | undefined; index: number } {
  let idx = 0;
  for (let i = 0; i < RANKS.length; i++) if (xp >= RANKS[i].min) idx = i;
  return { current: RANKS[idx], next: RANKS[idx + 1], index: idx };
}
