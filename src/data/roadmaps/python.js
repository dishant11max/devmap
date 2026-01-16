export const python = {
  languageSlug: "python",
  displayName: "Python",
  nodes: [
    {
      id: "py-01",
      position: { x: 0, y: 0 },
      data: {
        title: "Python Basics",
        description:
          "Syntax, Variables, Data Types (int, float, str, bool), and basic I/O.",
        time: "5 hours",
        status: "pending",
        resources: [
          {
            type: "video",
            title: "Python for Beginners (Mosh)",
            url: "https://www.youtube.com/watch?v=_uQrJ0TkZlc",
          },
          {
            type: "doc",
            title: "Python.org Tutorial",
            url: "https://docs.python.org/3/tutorial/",
          },
        ],
      },
      type: "roadmapNode",
    },
    {
      id: "py-02",
      position: { x: 0, y: 150 },
      data: {
        title: "Control Flow",
        description:
          "If/Else statements, For loops, While loops, and break/continue.",
        time: "4 hours",
        status: "pending",
        resources: [
          {
            type: "doc",
            title: "Real Python: Loops",
            url: "https://realpython.com/python-for-loop/",
          },
        ],
      },
      type: "roadmapNode",
    },
    {
      id: "py-03",
      position: { x: 0, y: 300 },
      data: {
        title: "Data Structures",
        description:
          "Lists, Tuples, Sets, and Dictionaries. List comprehensions.",
        time: "6 hours",
        status: "pending",
        resources: [
          {
            type: "video",
            title: "Python Lists & Tuples",
            url: "https://www.youtube.com/watch?v=W8KRzm-HUcc",
          },
        ],
      },
      type: "roadmapNode",
    },
    {
      id: "py-04",
      position: { x: 0, y: 450 },
      data: {
        title: "Functions & Modules",
        description:
          "Defining functions, arguments, return values, lambda functions, and importing modules.",
        time: "5 hours",
        status: "pending",
        resources: [],
      },
      type: "roadmapNode",
    },
    {
      id: "py-05",
      position: { x: 0, y: 600 },
      data: {
        title: "OOP in Python",
        description:
          "Classes, Objects, Inheritance, Encapsulation, and Polymorphism.",
        time: "8 hours",
        status: "pending",
        resources: [
          {
            type: "video",
            title: "Python OOP - Corey Schafer",
            url: "https://www.youtube.com/watch?v=ZDa-Z5JzLYM",
          },
        ],
      },
      type: "roadmapNode",
    },
    {
      id: "py-06",
      position: { x: 0, y: 750 },
      data: {
        title: "File Handling & Error Handling",
        description:
          "Reading/Writing files, Try/Except blocks, Context Managers (with statement).",
        time: "4 hours",
        status: "pending",
        resources: [],
      },
      type: "roadmapNode",
    },
    {
      id: "py-07",
      position: { x: 0, y: 900 },
      data: {
        title: "Advanced Topics",
        description:
          "Decorators, Generators, Iterators, and Virtual Environments.",
        time: "8 hours",
        status: "pending",
        resources: [
          {
            type: "doc",
            title: "Real Python: Decorators",
            url: "https://realpython.com/primer-on-python-decorators/",
          },
        ],
      },
      type: "roadmapNode",
    },
  ],
  edges: [
    { id: "e1", source: "py-01", target: "py-02", animated: true },
    { id: "e2", source: "py-02", target: "py-03", animated: true },
    { id: "e3", source: "py-03", target: "py-04", animated: true },
    { id: "e4", source: "py-04", target: "py-05", animated: true },
    { id: "e5", source: "py-05", target: "py-06", animated: true },
    { id: "e6", source: "py-06", target: "py-07", animated: true },
  ],
};
