export const css = {
  languageSlug: "css",
  displayName: "CSS",
  nodes: [
    {
      id: "css-01",
      position: { x: 0, y: 0 },
      data: {
        title: "CSS Basics",
        description:
          "Selectors, Specificity, Colors, Fonts, and the Box Model (Margin/Padding).",
        time: "5 hours",
        status: "pending",
        resources: [
          {
            type: "doc",
            title: "MDN: First Steps",
            url: "https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps",
          },
        ],
      },
      type: "roadmapNode",
    },
    {
      id: "css-02",
      position: { x: 0, y: 150 },
      data: {
        title: "Layouts: Flexbox",
        description:
          "Building one-dimensional layouts. Justify-content, align-items, etc.",
        time: "5 hours",
        status: "pending",
        resources: [
          {
            type: "video",
            title: "Learn Flexbox the Easy Way (Kevin Powell)",
            url: "https://www.youtube.com/watch?v=u044iM9xsWU",
          },
          {
            type: "doc",
            title: "CSS Tricks: Guide to Flexbox",
            url: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/",
          },
        ],
      },
      type: "roadmapNode",
    },
    {
      id: "css-03",
      position: { x: 0, y: 300 },
      data: {
        title: "Layouts: Grid",
        description:
          "Two-dimensional layouts using CSS Grid. Rows, Columns, Areas.",
        time: "6 hours",
        status: "pending",
        resources: [
          {
            type: "video",
            title: "Learn CSS Grid in 20 Minutes (Web Dev Simplified)",
            url: "https://www.youtube.com/watch?v=9zBsdzdE4sM",
          },
          {
            type: "doc",
            title: "CSS Tricks: Guide to Grid",
            url: "https://css-tricks.com/snippets/css/complete-guide-grid/",
          },
        ],
      },
      type: "roadmapNode",
    },
    {
      id: "css-04",
      position: { x: 0, y: 450 },
      data: {
        title: "Responsive Design",
        description: "Media Queries, Mobile-first approach, and Fluid layouts.",
        time: "5 hours",
        status: "pending",
        resources: [
          {
            type: "doc",
            title: "MDN: Responsive Design",
            url: "https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design",
          },
        ],
      },
      type: "roadmapNode",
    },
    {
      id: "css-05",
      position: { x: 0, y: 600 },
      data: {
        title: "Transitions & Animations",
        description: "Adding movement and interactivity with pure CSS.",
        time: "4 hours",
        status: "pending",
        resources: [
          {
            type: "doc",
            title: "MDN: CSS Animations",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animations/Using_CSS_animations",
          },
        ],
      },
      type: "roadmapNode",
    },
  ],
  edges: [
    { id: "e1", source: "css-01", target: "css-02", animated: true },
    { id: "e2", source: "css-02", target: "css-03", animated: true },
    { id: "e3", source: "css-03", target: "css-04", animated: true },
    { id: "e4", source: "css-04", target: "css-05", animated: true },
  ],
};
