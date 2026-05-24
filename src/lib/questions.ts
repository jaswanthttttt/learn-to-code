export type Track =
  | "python"
  | "cad"
  | "c"
  | "cpp"
  | "java"
  | "html"
  | "javascript"
  | "typescript"
  | "sql"
  | "go"
  | "rust"
  | "swift";

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

  // ---------- C ----------
  { id: "c-1", track: "c", topic: "Basics", difficulty: 1, prompt: "Which header is needed for printf?", choices: ["<stdlib.h>", "<stdio.h>", "<string.h>", "<math.h>"], answer: 1, explanation: "printf lives in stdio.h." },
  { id: "c-2", track: "c", topic: "Types", difficulty: 2, prompt: "Size of int on most modern systems?", choices: ["1 byte", "2 bytes", "4 bytes", "8 bytes"], answer: 2, explanation: "int is typically 4 bytes (32-bit)." },
  { id: "c-3", track: "c", topic: "Pointers", difficulty: 3, prompt: "What does *p do given int *p?", choices: ["Address of p", "Value pointed to", "Multiplies p", "Declares p"], answer: 1, explanation: "* dereferences a pointer to access the value." },
  { id: "c-4", track: "c", topic: "Memory", difficulty: 3, prompt: "Which frees heap memory?", choices: ["delete", "free()", "release()", "dealloc()"], answer: 1, explanation: "free() releases memory allocated by malloc/calloc." },

  // ---------- C++ ----------
  { id: "cpp-1", track: "cpp", topic: "I/O", difficulty: 1, prompt: "How do you print in C++?", choices: ["print()", "printf()", "std::cout << ...", "console.log()"], answer: 2, explanation: "C++ uses std::cout with the << operator." },
  { id: "cpp-2", track: "cpp", topic: "STL", difficulty: 2, prompt: "Which container is a dynamic array?", choices: ["std::list", "std::vector", "std::set", "std::map"], answer: 1, explanation: "std::vector is a contiguous, resizable array." },
  { id: "cpp-3", track: "cpp", topic: "OOP", difficulty: 3, prompt: "What does 'virtual' enable?", choices: ["Inlining", "Polymorphism via vtable", "Memory safety", "Templates"], answer: 1, explanation: "virtual methods support runtime polymorphism." },
  { id: "cpp-4", track: "cpp", topic: "Modern", difficulty: 3, prompt: "auto x = 3.14; — type of x?", choices: ["int", "float", "double", "auto"], answer: 2, explanation: "Floating literals default to double." },

  // ---------- Java ----------
  { id: "java-1", track: "java", topic: "Basics", difficulty: 1, prompt: "Entry method signature?", choices: ["void main()", "public static void main(String[] args)", "static main(args)", "int main()"], answer: 1, explanation: "JVM looks for public static void main(String[] args)." },
  { id: "java-2", track: "java", topic: "Types", difficulty: 2, prompt: "Which is NOT a primitive?", choices: ["int", "boolean", "String", "double"], answer: 2, explanation: "String is a class, not a primitive." },
  { id: "java-3", track: "java", topic: "OOP", difficulty: 2, prompt: "Keyword to inherit a class?", choices: ["implements", "extends", "inherits", "super"], answer: 1, explanation: "extends is used for class inheritance." },
  { id: "java-4", track: "java", topic: "Collections", difficulty: 3, prompt: "Which is an ordered, indexable list?", choices: ["HashSet", "ArrayList", "HashMap", "TreeMap"], answer: 1, explanation: "ArrayList offers indexed access." },

  // ---------- HTML ----------
  { id: "html-1", track: "html", topic: "Basics", difficulty: 1, prompt: "Tag for the largest heading?", choices: ["<head>", "<h6>", "<h1>", "<heading>"], answer: 2, explanation: "<h1> is the top-level heading." },
  { id: "html-2", track: "html", topic: "Links", difficulty: 1, prompt: "Attribute for a hyperlink URL?", choices: ["src", "href", "link", "url"], answer: 1, explanation: "<a href=\"...\"> sets the link target." },
  { id: "html-3", track: "html", topic: "Forms", difficulty: 2, prompt: "Input type for an email field?", choices: ["text", "mail", "email", "string"], answer: 2, explanation: "type=\"email\" gives validation and mobile keyboards." },
  { id: "html-4", track: "html", topic: "Semantic", difficulty: 2, prompt: "Which tag marks the main content?", choices: ["<div>", "<main>", "<section>", "<body>"], answer: 1, explanation: "<main> denotes the dominant content of a document." },

  // ---------- JavaScript ----------
  { id: "js-1", track: "javascript", topic: "Basics", difficulty: 1, prompt: "Which declares a block-scoped variable?", choices: ["var", "let", "def", "dim"], answer: 1, explanation: "let (and const) are block-scoped; var is function-scoped." },
  { id: "js-2", track: "javascript", topic: "Types", difficulty: 2, prompt: "typeof null returns?", choices: ["'null'", "'object'", "'undefined'", "'number'"], answer: 1, explanation: "Famous quirk: typeof null === 'object'." },
  { id: "js-3", track: "javascript", topic: "Functions", difficulty: 2, prompt: "Shortest arrow function returning x*2?", choices: ["x => x*2", "function(x){x*2}", "(x){return x*2}", "=> x*2"], answer: 0, explanation: "Single-expression arrows return implicitly." },
  { id: "js-4", track: "javascript", topic: "Async", difficulty: 3, prompt: "await can only be used inside…", choices: ["any function", "async functions or top-level modules", "Promises", "generators"], answer: 1, explanation: "await needs async context (or top-level in modules)." },

  // ---------- TypeScript ----------
  { id: "ts-1", track: "typescript", topic: "Basics", difficulty: 1, prompt: "Annotate a string parameter:", choices: ["name: string", "string name", "name as string", "name :: string"], answer: 0, explanation: "TS uses identifier: Type." },
  { id: "ts-2", track: "typescript", topic: "Types", difficulty: 2, prompt: "Which represents 'string OR number'?", choices: ["string & number", "string | number", "string + number", "Union<string,number>"], answer: 1, explanation: "| is a union type." },
  { id: "ts-3", track: "typescript", topic: "Generics", difficulty: 3, prompt: "function id<T>(x: T): T { return x } — what is T?", choices: ["A class", "A type parameter", "An interface", "Any value"], answer: 1, explanation: "T is a generic type parameter." },
  { id: "ts-4", track: "typescript", topic: "Tooling", difficulty: 2, prompt: "Which compiles TS to JS?", choices: ["node", "tsc", "babel-only", "esm"], answer: 1, explanation: "tsc is the TypeScript compiler." },

  // ---------- SQL ----------
  { id: "sql-1", track: "sql", topic: "Basics", difficulty: 1, prompt: "Read all rows from users:", choices: ["GET * FROM users", "SELECT * FROM users", "READ users", "FETCH users"], answer: 1, explanation: "SELECT * FROM table." },
  { id: "sql-2", track: "sql", topic: "Filter", difficulty: 2, prompt: "Keyword that filters rows?", choices: ["IF", "WHERE", "HAVING ONLY", "FILTER"], answer: 1, explanation: "WHERE filters rows; HAVING filters groups." },
  { id: "sql-3", track: "sql", topic: "Joins", difficulty: 3, prompt: "Default JOIN type when you write just 'JOIN'?", choices: ["LEFT", "RIGHT", "INNER", "FULL"], answer: 2, explanation: "Bare JOIN is INNER JOIN." },
  { id: "sql-4", track: "sql", topic: "Aggregates", difficulty: 2, prompt: "Count rows in a table?", choices: ["LEN(*)", "COUNT(*)", "SIZE()", "TOTAL()"], answer: 1, explanation: "COUNT(*) returns row count." },

  // ---------- Go ----------
  { id: "go-1", track: "go", topic: "Basics", difficulty: 1, prompt: "Print Hello in Go uses which package?", choices: ["console", "fmt", "io", "log"], answer: 1, explanation: "fmt.Println(\"Hello\")." },
  { id: "go-2", track: "go", topic: "Types", difficulty: 2, prompt: "Short variable declaration operator?", choices: ["=", ":=", "let", "var :="], answer: 1, explanation: ":= declares and infers the type." },
  { id: "go-3", track: "go", topic: "Concurrency", difficulty: 3, prompt: "Keyword to start a goroutine?", choices: ["async", "go", "spawn", "thread"], answer: 1, explanation: "go funcCall() launches a goroutine." },
  { id: "go-4", track: "go", topic: "Errors", difficulty: 2, prompt: "Go signals errors via…", choices: ["exceptions", "return values", "panics only", "callbacks"], answer: 1, explanation: "Functions return (value, error)." },

  // ---------- Rust ----------
  { id: "rs-1", track: "rust", topic: "Basics", difficulty: 1, prompt: "Variables are immutable by default. Make mutable with…", choices: ["var", "let mut", "mutable let", "const"], answer: 1, explanation: "let mut x = ...;" },
  { id: "rs-2", track: "rust", topic: "Ownership", difficulty: 3, prompt: "Borrow a value immutably with…", choices: ["@x", "&x", "*x", "ref x"], answer: 1, explanation: "&x creates an immutable reference." },
  { id: "rs-3", track: "rust", topic: "Types", difficulty: 2, prompt: "Owned, heap-allocated string type?", choices: ["str", "&str", "String", "CString"], answer: 2, explanation: "String is the growable, owned string." },
  { id: "rs-4", track: "rust", topic: "Errors", difficulty: 3, prompt: "Idiomatic recoverable-error type?", choices: ["Option<T>", "Result<T,E>", "Error", "Try<T>"], answer: 1, explanation: "Result<T,E> represents Ok(T) or Err(E)." },

  // ---------- Swift ----------
  { id: "sw-1", track: "swift", topic: "Basics", difficulty: 1, prompt: "Declare a constant in Swift:", choices: ["const x = 1", "let x = 1", "val x = 1", "final x = 1"], answer: 1, explanation: "let = constant, var = variable." },
  { id: "sw-2", track: "swift", topic: "Optionals", difficulty: 2, prompt: "Type meaning 'String or nil'?", choices: ["String", "String?", "String!", "Optional[String]"], answer: 1, explanation: "String? is shorthand for Optional<String>." },
  { id: "sw-3", track: "swift", topic: "Functions", difficulty: 2, prompt: "Return-type syntax for Int:", choices: ["func f(): Int", "func f() -> Int", "func f() => Int", "Int func f()"], answer: 1, explanation: "Swift uses -> for return types." },
  { id: "sw-4", track: "swift", topic: "Closures", difficulty: 3, prompt: "Trailing closure syntax goes…", choices: ["before the call", "outside the parens after the call", "inside [ ]", "in a separate file"], answer: 1, explanation: "Last closure arg can move outside ()." },
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
