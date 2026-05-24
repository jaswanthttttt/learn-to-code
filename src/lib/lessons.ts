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

  // ============ C PATH ============
  {
    id: "c-l-1", track: "c", topic: "Basics", minutes: 4, title: "Hello, C",
    blocks: [
      { type: "text", content: "C is a small, fast, low-level language. Every C program starts in main() and you must include headers for the features you use." },
      { type: "code", content: '#include <stdio.h>\n\nint main(void) {\n    printf("Hello, C\\n");\n    return 0;\n}' },
      { type: "tip", content: "\\n is a newline. Every statement ends with a semicolon ;" },
    ],
    practice: { kind: "code", prompt: "Write the printf line that outputs:  Hello, C  followed by a newline.", expected: 'printf("Hello, C\\n");', hint: 'Use printf with the text in double quotes and end with a semicolon: printf("Hello, C\\n");' },
  },
  {
    id: "c-l-2", track: "c", topic: "Variables", minutes: 4, title: "Variables & printf",
    blocks: [
      { type: "text", content: "Declare a variable with its type, then a name. int holds whole numbers." },
      { type: "code", content: 'int age = 25;\nprintf("%d\\n", age);' },
      { type: "tip", content: "%d prints an int, %f a float, %s a string." },
    ],
    practice: { kind: "code", prompt: "Declare an int called age set to 25 (one line, with the type and semicolon).", expected: "int age = 25;", hint: "Type first, then name, then = value, then ;  →  int age = 25;" },
  },
  {
    id: "c-l-3", track: "c", topic: "Pointers", minutes: 5, title: "Pointers 101",
    blocks: [
      { type: "text", content: "A pointer stores the memory address of another variable. & gets an address, * follows it." },
      { type: "code", content: 'int x = 10;\nint *p = &x;\nprintf("%d\\n", *p);  // 10' },
    ],
    practice: { kind: "code", prompt: "Given int x = 10; declare a pointer p that points to x.", expected: "int *p = &x;", hint: "Pointer type uses *, address-of uses &  →  int *p = &x;" },
  },

  // ============ C++ PATH ============
  {
    id: "cpp-l-1", track: "cpp", topic: "Basics", minutes: 4, title: "Hello, C++",
    blocks: [
      { type: "text", content: "C++ extends C with classes and the Standard Template Library (STL). Output uses std::cout with the << operator." },
      { type: "code", content: '#include <iostream>\n\nint main() {\n    std::cout << "Hello, C++" << std::endl;\n    return 0;\n}' },
    ],
    practice: { kind: "code", prompt: "Write the single line that prints Hello, C++ followed by std::endl using std::cout.", expected: 'std::cout << "Hello, C++" << std::endl;', hint: 'std::cout, then <<, then the string in quotes, then << std::endl;' },
  },
  {
    id: "cpp-l-2", track: "cpp", topic: "STL", minutes: 4, title: "std::vector",
    blocks: [
      { type: "text", content: "std::vector is a dynamic array. Add items with push_back, read with [] or .at()." },
      { type: "code", content: '#include <vector>\nstd::vector<int> v;\nv.push_back(1);\nv.push_back(2);' },
    ],
    practice: { kind: "code", prompt: "Declare an empty std::vector<int> called v (one line).", expected: "std::vector<int> v;", hint: "std::vector<int> v;  — angle brackets hold the element type." },
  },
  {
    id: "cpp-l-3", track: "cpp", topic: "OOP", minutes: 5, title: "Classes",
    blocks: [
      { type: "text", content: "Classes bundle data and methods. Use access specifiers public:/private:." },
      { type: "code", content: 'class Dog {\npublic:\n    std::string name;\n    void bark() { std::cout << name << " woof\\n"; }\n};' },
    ],
    practice: { kind: "code", prompt: "Start a class called Dog with an opening brace (one line).", expected: "class Dog {", hint: "class keyword, capitalised name, opening brace  →  class Dog {" },
  },

  // ============ JAVA PATH ============
  {
    id: "java-l-1", track: "java", topic: "Basics", minutes: 5, title: "Hello, Java",
    blocks: [
      { type: "text", content: "Every Java program needs a class with a main method. The file name must match the public class." },
      { type: "code", content: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, Java");\n    }\n}' },
    ],
    practice: { kind: "code", prompt: "Write the line that prints  Hello, Java  using System.out.println.", expected: 'System.out.println("Hello, Java");', hint: 'System.out.println("Hello, Java");  — note the semicolon.' },
  },
  {
    id: "java-l-2", track: "java", topic: "Types", minutes: 4, title: "Variables",
    blocks: [
      { type: "text", content: "Java is statically typed. Common types: int, double, boolean, String." },
      { type: "code", content: 'int age = 30;\nString name = "Ada";' },
    ],
    practice: { kind: "code", prompt: "Declare an int variable called age set to 30.", expected: "int age = 30;", hint: "Java needs the type first:  int age = 30;" },
  },
  {
    id: "java-l-3", track: "java", topic: "OOP", minutes: 5, title: "Classes",
    blocks: [
      { type: "text", content: "Class fields go inside the class body. Constructors share the class name." },
      { type: "code", content: 'class Dog {\n    String name;\n    Dog(String n) { this.name = n; }\n}' },
    ],
    practice: { kind: "code", prompt: "Start a class called Dog with an opening brace (one line).", expected: "class Dog {", hint: "class Dog {  — same idea as in many languages." },
  },

  // ============ HTML PATH ============
  {
    id: "html-l-1", track: "html", topic: "Basics", minutes: 3, title: "Your first page",
    blocks: [
      { type: "text", content: "HTML describes the structure of a web page using tags wrapped in angle brackets." },
      { type: "code", content: '<!DOCTYPE html>\n<html>\n  <body>\n    <h1>Hello</h1>\n    <p>My first page.</p>\n  </body>\n</html>' },
    ],
    practice: { kind: "code", prompt: "Write a level-1 heading containing the word Hello.", expected: "<h1>Hello</h1>", hint: "Open with <h1>, the text, then close with </h1>." },
  },
  {
    id: "html-l-2", track: "html", topic: "Links", minutes: 3, title: "Links & images",
    blocks: [
      { type: "text", content: "Use <a href=\"...\"> for links and <img src=\"...\" alt=\"...\"> for images." },
      { type: "code", content: '<a href="https://example.com">Example</a>\n<img src="cat.jpg" alt="A cat" />' },
    ],
    practice: { kind: "code", prompt: 'Write an <a> link to https://example.com with the text  Example .', expected: '<a href="https://example.com">Example</a>', hint: '<a href="https://example.com">Example</a> — href is the URL, text goes between tags.' },
  },
  {
    id: "html-l-3", track: "html", topic: "Forms", minutes: 4, title: "Forms & inputs",
    blocks: [
      { type: "text", content: "Forms collect user input. Each <input> has a type and a name." },
      { type: "code", content: '<form>\n  <input type="email" name="email" />\n  <button type="submit">Send</button>\n</form>' },
    ],
    practice: { kind: "code", prompt: "Write a self-closing <input> of type email with name=\"email\".", expected: '<input type="email" name="email" />', acceptable: ['<input type="email" name="email">'], hint: '<input type="email" name="email" />  — attribute order does not matter.' },
  },

  // ============ JAVASCRIPT PATH ============
  {
    id: "js-l-1", track: "javascript", topic: "Basics", minutes: 3, title: "Hello, JS",
    blocks: [
      { type: "text", content: "JavaScript runs in browsers and Node.js. console.log prints to the console." },
      { type: "code", content: 'console.log("Hello, JS");' },
    ],
    practice: { kind: "code", prompt: "Print  Hello, JS  using console.log.", expected: 'console.log("Hello, JS");', acceptable: ["console.log('Hello, JS');", 'console.log("Hello, JS")'], hint: 'console.log("Hello, JS");' },
  },
  {
    id: "js-l-2", track: "javascript", topic: "Variables", minutes: 3, title: "let & const",
    blocks: [
      { type: "text", content: "Use const for values that never get reassigned, let for ones that do." },
      { type: "code", content: 'const PI = 3.14;\nlet count = 0;\ncount = count + 1;' },
    ],
    practice: { kind: "code", prompt: "Declare a constant called PI with value 3.14.", expected: "const PI = 3.14;", acceptable: ["const PI = 3.14"], hint: "const PI = 3.14;" },
  },
  {
    id: "js-l-3", track: "javascript", topic: "Functions", minutes: 4, title: "Arrow functions",
    blocks: [
      { type: "text", content: "Arrow functions are a compact way to write functions. A single expression is returned implicitly." },
      { type: "code", content: 'const add = (a, b) => a + b;\nconsole.log(add(2, 3));  // 5' },
    ],
    practice: { kind: "code", prompt: "Define an arrow function  add  that takes a, b and returns a + b (one line, with const).", expected: "const add = (a, b) => a + b;", acceptable: ["const add = (a, b) => a + b"], hint: "const add = (a, b) => a + b;  — single expression returns implicitly." },
  },

  // ============ TYPESCRIPT PATH ============
  {
    id: "ts-l-1", track: "typescript", topic: "Basics", minutes: 3, title: "Type annotations",
    blocks: [
      { type: "text", content: "TypeScript = JavaScript + types. Annotate variables and parameters with : Type." },
      { type: "code", content: 'let name: string = "Ada";\nfunction greet(n: string): string {\n  return "Hi " + n;\n}' },
    ],
    practice: { kind: "code", prompt: "Declare a let variable name typed as string with value \"Ada\" (one line).", expected: 'let name: string = "Ada";', acceptable: ['let name: string = "Ada"'], hint: 'let name: string = "Ada";  — colon then type.' },
  },
  {
    id: "ts-l-2", track: "typescript", topic: "Types", minutes: 4, title: "Interfaces & unions",
    blocks: [
      { type: "text", content: "An interface describes the shape of an object. A union allows multiple types." },
      { type: "code", content: 'interface User { name: string; age: number }\nlet id: string | number = 7;' },
    ],
    practice: { kind: "code", prompt: "Write a union type variable id that can be string or number, initialised to 7 (use let).", expected: "let id: string | number = 7;", acceptable: ["let id: string | number = 7"], hint: "let id: string | number = 7;  — | separates the union members." },
  },
  {
    id: "ts-l-3", track: "typescript", topic: "Generics", minutes: 4, title: "Generics",
    blocks: [
      { type: "text", content: "Generics let functions and types work with any type while staying type-safe." },
      { type: "code", content: 'function id<T>(x: T): T { return x; }\nid<number>(5);' },
    ],
    practice: { kind: "code", prompt: "Define a generic identity function  id  that takes x of type T and returns T.", expected: "function id<T>(x: T): T { return x; }", hint: "function id<T>(x: T): T { return x; }  — type parameter goes in <>." },
  },

  // ============ SQL PATH ============
  {
    id: "sql-l-1", track: "sql", topic: "Basics", minutes: 3, title: "SELECT",
    blocks: [
      { type: "text", content: "SQL queries data from tables. The basic shape is SELECT columns FROM table." },
      { type: "code", content: 'SELECT name, age FROM users;' },
    ],
    practice: { kind: "code", prompt: "Select every column from the users table.", expected: "SELECT * FROM users;", acceptable: ["SELECT * FROM users"], hint: "SELECT * FROM users;  — * means all columns." },
  },
  {
    id: "sql-l-2", track: "sql", topic: "Filter", minutes: 4, title: "WHERE",
    blocks: [
      { type: "text", content: "WHERE filters rows based on a condition." },
      { type: "code", content: "SELECT * FROM users WHERE age >= 18;" },
    ],
    practice: { kind: "code", prompt: "Select all users older than 18 (age > 18).", expected: "SELECT * FROM users WHERE age > 18;", acceptable: ["SELECT * FROM users WHERE age > 18"], hint: "SELECT * FROM users WHERE age > 18;" },
  },
  {
    id: "sql-l-3", track: "sql", topic: "Joins", minutes: 5, title: "INNER JOIN",
    blocks: [
      { type: "text", content: "JOIN combines rows from two tables using a relationship." },
      { type: "code", content: 'SELECT u.name, o.total\nFROM users u\nINNER JOIN orders o ON o.user_id = u.id;' },
    ],
    practice: { kind: "code", prompt: "Write the INNER JOIN clause that links orders.user_id to users.id (start with  INNER JOIN orders ).", expected: "INNER JOIN orders ON orders.user_id = users.id", hint: "INNER JOIN orders ON orders.user_id = users.id" },
  },

  // ============ GO PATH ============
  {
    id: "go-l-1", track: "go", topic: "Basics", minutes: 4, title: "Hello, Go",
    blocks: [
      { type: "text", content: "Every Go file declares its package. main is the entry program." },
      { type: "code", content: 'package main\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, Go")\n}' },
    ],
    practice: { kind: "code", prompt: "Write the line that prints  Hello, Go  using fmt.Println.", expected: 'fmt.Println("Hello, Go")', hint: 'fmt.Println("Hello, Go")  — no semicolons in Go.' },
  },
  {
    id: "go-l-2", track: "go", topic: "Variables", minutes: 3, title: ":= short declaration",
    blocks: [
      { type: "text", content: "Inside functions, := declares and infers a type in one go." },
      { type: "code", content: 'name := "Ada"\nage := 25' },
    ],
    practice: { kind: "code", prompt: "Use the short declaration to set age to 25.", expected: "age := 25", hint: "age := 25  — colon-equals." },
  },
  {
    id: "go-l-3", track: "go", topic: "Concurrency", minutes: 4, title: "Goroutines",
    blocks: [
      { type: "text", content: "Prefix any function call with  go  to run it concurrently as a goroutine." },
      { type: "code", content: 'go sayHi()' },
    ],
    practice: { kind: "code", prompt: "Launch sayHi() as a goroutine (one line).", expected: "go sayHi()", hint: "go sayHi()  — just the word go before the call." },
  },

  // ============ RUST PATH ============
  {
    id: "rs-l-1", track: "rust", topic: "Basics", minutes: 4, title: "Hello, Rust",
    blocks: [
      { type: "text", content: "Rust programs start in fn main(). println! is a macro (note the !)." },
      { type: "code", content: 'fn main() {\n    println!("Hello, Rust");\n}' },
    ],
    practice: { kind: "code", prompt: "Write the println! line that prints  Hello, Rust .", expected: 'println!("Hello, Rust");', hint: 'println!("Hello, Rust");  — macros end with ! and the statement with ;' },
  },
  {
    id: "rs-l-2", track: "rust", topic: "Variables", minutes: 4, title: "let & mut",
    blocks: [
      { type: "text", content: "let bindings are immutable by default. Add  mut  to allow reassignment." },
      { type: "code", content: 'let x = 5;\nlet mut y = 0;\ny = y + 1;' },
    ],
    practice: { kind: "code", prompt: "Declare a mutable variable count initialised to 0.", expected: "let mut count = 0;", hint: "let mut count = 0;  — keyword mut between let and the name." },
  },
  {
    id: "rs-l-3", track: "rust", topic: "Ownership", minutes: 5, title: "Borrowing",
    blocks: [
      { type: "text", content: "Pass an immutable reference with &value to let a function read without taking ownership." },
      { type: "code", content: 'fn len(s: &String) -> usize { s.len() }\nlet s = String::from("hi");\nlen(&s);' },
    ],
    practice: { kind: "code", prompt: "Call len passing an immutable reference to s.", expected: "len(&s);", hint: "len(&s);  — & creates an immutable borrow." },
  },

  // ============ SWIFT PATH ============
  {
    id: "sw-l-1", track: "swift", topic: "Basics", minutes: 3, title: "Hello, Swift",
    blocks: [
      { type: "text", content: "Swift uses print() to write to the console. No semicolons needed." },
      { type: "code", content: 'print("Hello, Swift")' },
    ],
    practice: { kind: "code", prompt: "Print  Hello, Swift  using print().", expected: 'print("Hello, Swift")', hint: 'print("Hello, Swift")' },
  },
  {
    id: "sw-l-2", track: "swift", topic: "Variables", minutes: 3, title: "let & var",
    blocks: [
      { type: "text", content: "let creates a constant. var creates a variable you can reassign." },
      { type: "code", content: 'let pi = 3.14\nvar count = 0\ncount = count + 1' },
    ],
    practice: { kind: "code", prompt: "Declare a constant pi set to 3.14.", expected: "let pi = 3.14", hint: "let pi = 3.14  — let = constant in Swift." },
  },
  {
    id: "sw-l-3", track: "swift", topic: "Optionals", minutes: 4, title: "Optionals",
    blocks: [
      { type: "text", content: "An Optional<T>, written T?, may hold a value or be nil." },
      { type: "code", content: 'var name: String? = nil\nname = "Ada"' },
    ],
    practice: { kind: "code", prompt: "Declare a variable name of type String? initialised to nil.", expected: "var name: String? = nil", hint: "var name: String? = nil  — the ? makes the type optional." },
  },
];


export function lessonsFor(track: Track | "mixed"): Lesson[] {
  if (track === "mixed") return LESSONS;
  return LESSONS.filter(l => l.track === track);
}
