import type { Track } from "./questions";

export interface Lesson {
  id: string;
  track: Track;
  topic: string;
  title: string;
  minutes: number;
  blocks: LessonBlock[];
}

export type LessonBlock =
  | { type: "text"; content: string }
  | { type: "code"; content: string; caption?: string }
  | { type: "tip"; content: string }
  | { type: "try"; content: string };

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
  },
  {
    id: "py-l-8", track: "python", topic: "OOP", minutes: 5,
    title: "Classes: your own types",
    blocks: [
      { type: "text", content: "A class is a blueprint. Instances are objects built from it." },
      { type: "code", content: 'class Dog:\n    def __init__(self, name):\n        self.name = name\n    def bark(self):\n        print(self.name, "says woof")\n\nd = Dog("Rex")\nd.bark()' },
      { type: "text", content: "self is how the object refers to itself. __init__ runs when the object is created." },
    ],
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
  },
  {
    id: "cad-l-2", track: "cad", topic: "Fundamentals", minutes: 4,
    title: "Parametric Modeling",
    blocks: [
      { type: "text", content: "Modern CAD is parametric: every model is a recipe of steps (the feature tree). Change a number, and the model rebuilds." },
      { type: "text", content: "Example recipe for a bolt:\n1. Sketch a circle (Ø10 mm)\n2. Extrude 50 mm → shaft\n3. Sketch hexagon on top\n4. Extrude 6 mm → head" },
      { type: "tip", content: "Because it's a recipe, you can edit step 1 to Ø12 and everything updates." },
    ],
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
  },
  {
    id: "cad-l-4", track: "cad", topic: "Features", minutes: 5,
    title: "Core 3D Features",
    blocks: [
      { type: "text", content: "Once you have a sketch, you turn it into 3D with a feature:" },
      { type: "text", content: "• Extrude — push a profile in a straight line (a circle → a cylinder).\n• Revolve — spin a profile around an axis (a half-bottle → a bottle).\n• Sweep — drag a profile along a path (handlebars).\n• Loft — blend between two or more profiles (a boat hull)." },
      { type: "tip", content: "Combine with Cut versions of the same tools to remove material — that's how you make holes and pockets." },
    ],
  },
  {
    id: "cad-l-5", track: "cad", topic: "Fusion 360", minutes: 5,
    title: "Your First Fusion 360 Part",
    blocks: [
      { type: "text", content: "Try this in Fusion 360:" },
      { type: "text", content: "1. Create → New Design.\n2. Click the top plane, press S, search 'Line' (or press L).\n3. Draw a rectangle 50 × 30 mm. Press D to add dimensions.\n4. Stop Sketch.\n5. Press E (Extrude) → 10 mm. OK.\nYou just made a parametric plate." },
      { type: "tip", content: "Useful shortcuts: L = Line, R = Rectangle, C = Circle, D = Dimension, E = Extrude, S = Search." },
    ],
  },
  {
    id: "cad-l-6", track: "cad", topic: "AutoCAD", minutes: 4,
    title: "AutoCAD by command line",
    blocks: [
      { type: "text", content: "AutoCAD is driven by typing commands. After each command, watch the prompt at the bottom and follow it." },
      { type: "code", content: 'L  (Line)        → pick two points\nC  (Circle)      → pick centre, type radius\nO  (Offset)      → distance, then pick line\nTR (Trim)        → cut overlapping ends' },
      { type: "tip", content: "Press ESC to cancel a command. Spacebar repeats the last command." },
    ],
  },
  {
    id: "cad-l-7", track: "cad", topic: "Assemblies", minutes: 5,
    title: "Assemblies & Joints",
    blocks: [
      { type: "text", content: "Real products are many parts working together. An assembly groups them and defines how they move." },
      { type: "text", content: "Fusion 360 uses Joints. The common ones:\n• Rigid — locks parts together (a bolted bracket)\n• Revolute — rotates around an axis (a hinge)\n• Slider — moves along an axis (a drawer)\n• Cylindrical — rotate + slide (a piston)" },
      { type: "tip", content: "SolidWorks calls these Mates (Concentric, Coincident, Distance, etc.) — same idea, different name." },
    ],
  },
  {
    id: "cad-l-8", track: "cad", topic: "Drafting", minutes: 4,
    title: "From Model to Drawing",
    blocks: [
      { type: "text", content: "A 3D model isn't enough to make something — the workshop needs a 2D drawing with views and dimensions." },
      { type: "text", content: "A drawing typically shows:\n• Front, Top, Side views (orthographic projection)\n• An isometric view in the corner\n• Dimensions, tolerances, material, scale\n• A title block with part number" },
      { type: "tip", content: "First-angle (Europe/Asia) and third-angle (USA) just rearrange where views go around the front view." },
    ],
  },
];

export function lessonsFor(track: Track | "mixed"): Lesson[] {
  if (track === "mixed") return LESSONS;
  return LESSONS.filter(l => l.track === track);
}
