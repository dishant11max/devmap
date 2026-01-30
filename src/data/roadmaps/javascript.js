export const javascript = {
  languageSlug: "javascript",
  displayName: "JavaScript",
  nodes: [
    {
      id: "js-01",
      position: { x: 0, y: 0 },
      data: {
        title: "Introduction to JavaScript",
        description:
          "Understand what JavaScript is, its history, and its role in web development.",
        time: "1 hour",
        status: "pending",
        resources: [
          {
            type: "video",
            title: "JavaScript in 100 Seconds",
            url: "https://www.youtube.com/watch?v=DHjqpvDnNGE",
          },
          {
            type: "doc",
            title: "MDN: What is JavaScript?",
            url: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/What_is_JavaScript",
          },
        ],
      },
      type: "roadmapNode",
    },
    {
      id: "js-02",
      position: { x: 0, y: 150 },
      data: {
        title: "Variables & Data Types",
        description:
          "Learn about var, let, const, strings, numbers, booleans, null, and undefined.",
        time: "2 hours",
        status: "pending",
        resources: [
          {
            type: "video",
            title: "JavaScript Let vs Var vs Constant (Mosh)",
            url: "https://www.youtube.com/watch?v=XgSjoHgy3Rk",
          },
        ],
      },
      type: "roadmapNode",
    },
    {
      id: "js-03",
      position: { x: 0, y: 300 },
      data: {
        title: "Control Flow",
        description:
          "Conditional statements (if/else), switches, and loops (for, while).",
        time: "3 hours",
        status: "pending",
        resources: [
          {
            type: "doc",
            title: "MDN: Control Flow and Error Handling",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling",
          },
        ],
      },
      type: "roadmapNode",
    },
    {
      id: "js-04",
      position: { x: 0, y: 450 },
      data: {
        title: "Functions",
        description:
          "Function declarations, expressions, arrow functions, and scope.",
        time: "4 hours",
        status: "pending",
        resources: [
          {
            type: "video",
            title: "Arrow Functions - Web Dev Simplified",
            url: "https://www.youtube.com/watch?v=h33Srr5J9nY",
          },
        ],
      },
      type: "roadmapNode",
    },
    {
      id: "js-05",
      position: { x: 0, y: 600 },
      data: {
        title: "DOM Manipulation",
        description:
          "Selecting elements, changing content, styling, and event listeners.",
        time: "5 hours",
        status: "pending",
        resources: [
          {
            type: "doc",
            title: "MDN: Introduction to the DOM",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction",
          },
        ],
      },
      type: "roadmapNode",
    },
    {
      id: "js-06",
      position: { x: 0, y: 750 },
      data: {
        title: "Asynchronous JavaScript",
        description:
          "Callbacks, Promises, and Async/Await. Understanding the Event Loop.",
        time: "6 hours",
        status: "pending",
        resources: [
          {
            type: "video",
            title: "Async JavaScript Course - freeCodeCamp",
            url: "https://www.youtube.com/watch?v=ZYb_ZU8LNxs",
          },
        ],
      },
      type: "roadmapNode",
    },
  ],
  edges: [
    { id: "e1-2", source: "js-01", target: "js-02", animated: true },
    { id: "e2-3", source: "js-02", target: "js-03", animated: true },
    { id: "e3-4", source: "js-03", target: "js-04", animated: true },
    { id: "e4-5", source: "js-04", target: "js-05", animated: true },
    { id: "e5-6", source: "js-05", target: "js-06", animated: true },
  ],
};
