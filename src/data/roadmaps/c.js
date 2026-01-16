export const c = {
  languageSlug: "c",
  displayName: "C",
  nodes: [
    {
      id: "c-01",
      position: { x: 0, y: 0 },
      data: {
        title: "Introduction",
        description:
          "History of C, Compilation process, Hello World, Structure of a C program.",
        time: "3 hours",
        status: "pending",
        resources: [
          {
            type: "doc",
            title: "Learn C - Free Interactive C Tutorial",
            url: "https://www.learn-c.org/",
          },
        ],
      },
      type: "roadmapNode",
    },
    {
      id: "c-02",
      position: { x: 0, y: 150 },
      data: {
        title: "Variables & Types",
        description:
          "Primitive types (int, float, char), modifiers (long, short, unsigned).",
        time: "4 hours",
        status: "pending",
        resources: [],
      },
      type: "roadmapNode",
    },
    {
      id: "c-03",
      position: { x: 0, y: 300 },
      data: {
        title: "Pointers & Memory",
        description:
          "Pointer syntax, address-of operator, dereferencing, void pointers. The heart of C.",
        time: "10 hours",
        status: "pending",
        resources: [
          {
            type: "video",
            title: "C Programming Tutorial - Pointers",
            url: "https://www.youtube.com/watch?v=zuegQmMdy8M",
          },
        ],
      },
      type: "roadmapNode",
    },
    {
      id: "c-04",
      position: { x: 0, y: 450 },
      data: {
        title: "Arrays & Strings",
        description:
          "Array indexing, memory layout, null-terminated strings, string.h functions.",
        time: "6 hours",
        status: "pending",
        resources: [],
      },
      type: "roadmapNode",
    },
    {
      id: "c-05",
      position: { x: 0, y: 600 },
      data: {
        title: "Memory Allocation",
        description:
          "Stack vs Heap, malloc, calloc, realloc, and free. Preventing memory leaks.",
        time: "8 hours",
        status: "pending",
        resources: [],
      },
      type: "roadmapNode",
    },
    {
      id: "c-06",
      position: { x: 0, y: 750 },
      data: {
        title: "Structs & Unions",
        description:
          "Defining custom data types, padding, alignment, bit fields.",
        time: "5 hours",
        status: "pending",
        resources: [],
      },
      type: "roadmapNode",
    },
    {
      id: "c-07",
      position: { x: 0, y: 900 },
      data: {
        title: "File I/O & Preprocessor",
        description:
          "fopen, fread, fwrite. Macros, include guards, conditional compilation.",
        time: "6 hours",
        status: "pending",
        resources: [],
      },
      type: "roadmapNode",
    },
  ],
  edges: [
    { id: "e1", source: "c-01", target: "c-02", animated: true },
    { id: "e2", source: "c-02", target: "c-03", animated: true },
    { id: "e3", source: "c-03", target: "c-04", animated: true },
    { id: "e4", source: "c-04", target: "c-05", animated: true },
    { id: "e5", source: "c-05", target: "c-06", animated: true },
    { id: "e6", source: "c-06", target: "c-07", animated: true },
  ],
};
