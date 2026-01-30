export const html = {
  languageSlug: "html",
  displayName: "HTML",
  nodes: [
    {
      id: "html-01",
      position: { x: 0, y: 0 },
      data: {
        title: "HTML Basics",
        description: "Structure of a webpage, Tags, Elements, and Attributes.",
        time: "3 hours",
        status: "pending",
        resources: [
          {
            type: "doc",
            title: "MDN: Getting Started with HTML",
            url: "https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Getting_started",
          },
          {
            type: "video",
            title: "HTML Crash Course For Absolute Beginners (Traversy Media)",
            url: "https://www.youtube.com/watch?v=kUMe1FH4CHE",
          },
        ],
      },
      type: "roadmapNode",
    },
    {
      id: "html-02",
      position: { x: 0, y: 150 },
      data: {
        title: "Semantic HTML",
        description:
          "Better structure, SEO, and Accessibility using semantic tags.",
        time: "2 hours",
        status: "pending",
        resources: [
          {
            type: "doc",
            title: "MDN: HTML Text Fundamentals",
            url: "https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/HTML_text_fundamentals",
          },
        ],
      },
      type: "roadmapNode",
    },
    {
      id: "html-03",
      position: { x: 0, y: 300 },
      data: {
        title: "Forms & Input",
        description:
          "Creating interactive forms, input types, labels, and validation.",
        time: "4 hours",
        status: "pending",
        resources: [
          {
            type: "doc",
            title: "MDN: Your First Form",
            url: "https://developer.mozilla.org/en-US/docs/Learn/Forms/Your_first_form",
          },
        ],
      },
      type: "roadmapNode",
    },
    {
      id: "html-04",
      position: { x: 0, y: 450 },
      data: {
        title: "Accessibility (a11y)",
        description:
          "Writing HTML that is usable by everyone, including screen readers.",
        time: "3 hours",
        status: "pending",
        resources: [
          {
            type: "doc",
            title: "MDN: Accessibility Guide",
            url: "https://developer.mozilla.org/en-US/docs/Learn/Accessibility/HTML",
          },
        ],
      },
      type: "roadmapNode",
    },
    {
      id: "html-05",
      position: { x: 0, y: 600 },
      data: {
        title: "SEO Basics",
        description:
          "Meta tags, Open Graph, and structuring content for search engines.",
        time: "2 hours",
        status: "pending",
        resources: [
          {
            type: "doc",
            title: "Google SEO Starter Guide",
            url: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide",
          },
        ],
      },
      type: "roadmapNode",
    },
  ],
  edges: [
    { id: "e1", source: "html-01", target: "html-02", animated: true },
    { id: "e2", source: "html-02", target: "html-03", animated: true },
    { id: "e3", source: "html-03", target: "html-04", animated: true },
    { id: "e4", source: "html-04", target: "html-05", animated: true },
  ],
};
