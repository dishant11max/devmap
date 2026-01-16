export const cpp = {
  languageSlug: "cpp",
  displayName: "C++",
  nodes: [
    {
      id: "cpp-01",
      position: { x: 0, y: 0 },
      data: {
        title: "Introduction",
        description:
          "Compilers (GCC/Clang), Main function, I/O (cin/cout), Namespaces.",
        time: "4 hours",
        status: "pending",
        resources: [
          {
            type: "video",
            title: "C++ Tutorial for Beginners",
            url: "https://www.youtube.com/watch?v=vLnPwxZdW4Y",
          },
        ],
      },
      type: "roadmapNode",
    },
    {
      id: "cpp-02",
      position: { x: 0, y: 150 },
      data: {
        title: "Basics & Flow Control",
        description: "Variables, Types, Arithmetic, If/Switch, Loops.",
        time: "5 hours",
        status: "pending",
        resources: [],
      },
      type: "roadmapNode",
    },
    {
      id: "cpp-03",
      position: { x: 0, y: 300 },
      data: {
        title: "Memory Management (Pointers)",
        description:
          "Pointers, References, Dynamic Memory Allocation (new/delete). Critical topic.",
        time: "10 hours",
        status: "pending",
        resources: [
          {
            type: "video",
            title: "Pointers in C++ (The Cherno)",
            url: "https://www.youtube.com/watch?v=DTxHyVn0ODg",
          },
        ],
      },
      type: "roadmapNode",
    },
    {
      id: "cpp-04",
      position: { x: 0, y: 450 },
      data: {
        title: "OOP in C++",
        description:
          "Classes, Structs, Encapsulation, Constructors/Destructors.",
        time: "8 hours",
        status: "pending",
        resources: [],
      },
      type: "roadmapNode",
    },
    {
      id: "cpp-05",
      position: { x: 0, y: 600 },
      data: {
        title: "Advanced OOP",
        description:
          "Inheritance, Polymorphism, Virtual Functions, Operator Overloading.",
        time: "10 hours",
        status: "pending",
        resources: [],
      },
      type: "roadmapNode",
    },
    {
      id: "cpp-06",
      position: { x: 0, y: 750 },
      data: {
        title: "STL (Standard Template Library)",
        description:
          "Vectors, Maps, Sets, Algorithms, Iterators. Do not reinvent the wheel.",
        time: "12 hours",
        status: "pending",
        resources: [
          {
            type: "doc",
            title: "cppreference.com - The Bible",
            url: "https://en.cppreference.com/w/",
          },
        ],
      },
      type: "roadmapNode",
    },
    {
      id: "cpp-07",
      position: { x: 0, y: 900 },
      data: {
        title: "Modern C++ (11/14/17/20)",
        description:
          "Smart Pointers (unique/shared), Lambda functions, Move Semantics.",
        time: "15 hours",
        status: "pending",
        resources: [],
      },
      type: "roadmapNode",
    },
  ],
  edges: [
    { id: "e1", source: "cpp-01", target: "cpp-02", animated: true },
    { id: "e2", source: "cpp-02", target: "cpp-03", animated: true },
    { id: "e3", source: "cpp-03", target: "cpp-04", animated: true },
    { id: "e4", source: "cpp-04", target: "cpp-05", animated: true },
    { id: "e5", source: "cpp-05", target: "cpp-06", animated: true },
    { id: "e6", source: "cpp-06", target: "cpp-07", animated: true },
  ],
};
