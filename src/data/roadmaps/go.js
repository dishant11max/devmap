export const go = {
  languageSlug: "go",
  displayName: "Go",
  nodes: [
    {
      id: "go-01",
      position: { x: 0, y: 0 },
      data: {
        title: "Hello Go",
        description:
          "Installation, GOPATH vs Go Modules, Basic syntax, Packages.",
        time: "2 hours",
        status: "pending",
        resources: [
          {
            type: "doc",
            title: "A Tour of Go",
            url: "https://go.dev/tour/welcome/1",
          },
          {
            type: "video",
            title: "Get Started with Go",
            url: "https://www.youtube.com/watch?v=YS4e4q9oBaU",
          },
        ],
      },
      type: "roadmapNode",
    },
    {
      id: "go-02",
      position: { x: 0, y: 150 },
      data: {
        title: "Basics",
        description: "Variables, Functions, Loop (only for), Switch, Defer.",
        time: "4 hours",
        status: "pending",
        resources: [],
      },
      type: "roadmapNode",
    },
    {
      id: "go-03",
      position: { x: 0, y: 300 },
      data: {
        title: "Data Structures",
        description: "Arrays, Slices (len/cap), Maps, Structs.",
        time: "5 hours",
        status: "pending",
        resources: [
          {
            type: "doc",
            title: "Go Slices: usage and internals",
            url: "https://go.dev/blog/slices-intro",
          },
        ],
      },
      type: "roadmapNode",
    },
    {
      id: "go-04",
      position: { x: 0, y: 450 },
      data: {
        title: "Methods & Interfaces",
        description:
          "Receivers on types, Interface implementation (implicit), Error interface.",
        time: "6 hours",
        status: "pending",
        resources: [],
      },
      type: "roadmapNode",
    },
    {
      id: "go-05",
      position: { x: 0, y: 600 },
      data: {
        title: "Concurrency",
        description:
          "Goroutines, Channels, Select, WaitGroups, Mutexes. The killer feature of Go.",
        time: "10 hours",
        status: "pending",
        resources: [
          {
            type: "video",
            title: "Go Concurrency Patterns",
            url: "https://www.youtube.com/watch?v=f6kdp27TYZs",
          },
        ],
      },
      type: "roadmapNode",
    },
    {
      id: "go-06",
      position: { x: 0, y: 750 },
      data: {
        title: "Testing & Tooling",
        description: "Go test, go fmt, go vet, benchmarks.",
        time: "4 hours",
        status: "pending",
        resources: [],
      },
      type: "roadmapNode",
    },
  ],
  edges: [
    { id: "e1", source: "go-01", target: "go-02", animated: true },
    { id: "e2", source: "go-02", target: "go-03", animated: true },
    { id: "e3", source: "go-03", target: "go-04", animated: true },
    { id: "e4", source: "go-04", target: "go-05", animated: true },
    { id: "e5", source: "go-05", target: "go-06", animated: true },
  ],
};
