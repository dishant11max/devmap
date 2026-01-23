export const typescript = {
  languageSlug: "typescript",
  displayName: "TypeScript",
  nodes: [
    {
      id: "1",
      type: "roadmapNode",
      data: {
        title: "Introduction",
        description:
          "Understand what TypeScript is: a superset of JavaScript with static typing.",
        status: "pending",
        resources: [
          {
            title: "TS for JS Programmers",
            url: "https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html",
          },
        ],
      },
      position: { x: 250, y: 0 },
    },
    {
      id: "2",
      type: "roadmapNode",
      data: {
        title: "Environment Setup",
        description:
          "Install Node.js and the TypeScript compiler (tsc). Configure tsconfig.json.",
        status: "pending",
        resources: [
          {
            title: "TypeScript Tooling in 5 minutes",
            url: "https://www.typescriptlang.org/docs/handbook/typescript-tooling-in-5-minutes.html",
          },
        ],
      },
      position: { x: 250, y: 150 },
    },
    {
      id: "3",
      type: "roadmapNode",
      data: {
        title: "Basic Types",
        description:
          "string, number, boolean, arrays, tuples, enums, any, void, null/undefined.",
        status: "pending",
        resources: [
          {
            title: "Everyday Types",
            url: "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html",
          },
        ],
      },
      position: { x: 250, y: 300 },
    },
    {
      id: "4",
      type: "roadmapNode",
      data: {
        title: "Interfaces & Types",
        description:
          "Defining shapes of objects. Differences between interface and type aliases.",
        status: "pending",
        resources: [
          {
            title: "Interfaces",
            url: "https://www.typescriptlang.org/docs/handbook/2/objects.html",
          },
        ],
      },
      position: { x: 250, y: 450 },
    },
    {
      id: "5",
      type: "roadmapNode",
      data: {
        title: "Functions",
        description:
          "Typing function parameters, return types, and optional parameters.",
        status: "pending",
        resources: [
          {
            title: "More on Functions",
            url: "https://www.typescriptlang.org/docs/handbook/2/functions.html",
          },
        ],
      },
      position: { x: 250, y: 600 },
    },
    {
      id: "6",
      type: "roadmapNode",
      data: {
        title: "Union & Intersection",
        description: "Combining types using | and & operators.",
        status: "pending",
        resources: [
          {
            title: "Unions and Intersection Types",
            url: "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types",
          },
        ],
      },
      position: { x: 150, y: 750 },
    },
    {
      id: "7",
      type: "roadmapNode",
      data: {
        title: "Classes",
        description:
          "Access modifiers (public, private, protected), readonly properties, and inheritance.",
        status: "pending",
        resources: [
          {
            title: "Classes",
            url: "https://www.typescriptlang.org/docs/handbook/2/classes.html",
          },
        ],
      },
      position: { x: 350, y: 750 },
    },
    {
      id: "8",
      type: "roadmapNode",
      data: {
        title: "Generics",
        description:
          "Creating reusable components that work with a variety of data types.",
        status: "pending",
        resources: [
          {
            title: "Generics",
            url: "https://www.typescriptlang.org/docs/handbook/2/generics.html",
          },
        ],
      },
      position: { x: 250, y: 900 },
    },
    {
      id: "9",
      type: "roadmapNode",
      data: {
        title: "Utility Types",
        description: "Partial, Pick, Omit, Record, Readonly, Required.",
        status: "pending",
        resources: [
          {
            title: "Utility Types Docs",
            url: "https://www.typescriptlang.org/docs/handbook/utility-types.html",
          },
        ],
      },
      position: { x: 250, y: 1050 },
    },
    {
      id: "10",
      type: "roadmapNode",
      data: {
        title: "Modules",
        description: "Importing and exporting code. Managing namespaces.",
        status: "pending",
        resources: [
          {
            title: "Modules",
            url: "https://www.typescriptlang.org/docs/handbook/2/modules.html",
          },
        ],
      },
      position: { x: 250, y: 1200 },
    },
    {
      id: "11",
      type: "roadmapNode",
      data: {
        title: "Advanced Types",
        description:
          "Type Guards, Type Assertions, keyof, typeof, Mapped Types.",
        status: "pending",
        resources: [
          {
            title: "Advanced Types",
            url: "https://www.typescriptlang.org/docs/handbook/2/types-from-types.html",
          },
        ],
      },
      position: { x: 250, y: 1350 },
    },
  ],
  edges: [
    { id: "e1-2", source: "1", target: "2", type: "smoothstep" },
    { id: "e2-3", source: "2", target: "3", type: "smoothstep" },
    { id: "e3-4", source: "3", target: "4", type: "smoothstep" },
    { id: "e4-5", source: "4", target: "5", type: "smoothstep" },
    { id: "e5-6", source: "5", target: "6", type: "smoothstep" },
    { id: "e5-7", source: "5", target: "7", type: "smoothstep" },
    { id: "e6-8", source: "6", target: "8", type: "smoothstep" },
    { id: "e7-8", source: "7", target: "8", type: "smoothstep" },
    { id: "e8-9", source: "8", target: "9", type: "smoothstep" },
    { id: "e9-10", source: "9", target: "10", type: "smoothstep" },
    { id: "e10-11", source: "10", target: "11", type: "smoothstep" },
  ],
};
