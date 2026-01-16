export const rust = {
  nodes: [
    {
      id: "1",
      type: "custom",
      data: {
        title: "Install Rust",
        description:
          "Install Rust using rustup, the official installer and version manager.",
        status: "pending",
        resources: [
          {
            title: "Official Install Guide",
            url: "https://www.rust-lang.org/tools/install",
          },
          { title: "Rustup docs", url: "https://rust-lang.github.io/rustup/" },
        ],
      },
      position: { x: 250, y: 0 },
    },
    {
      id: "2",
      type: "custom",
      data: {
        title: "Hello World",
        description:
          "Write your first Rust program and understand the main function and println! macro.",
        status: "pending",
        resources: [
          {
            title: "Hello World",
            url: "https://doc.rust-lang.org/book/ch01-02-hello-world.html",
          },
        ],
      },
      position: { x: 250, y: 150 },
    },
    {
      id: "3",
      type: "custom",
      data: {
        title: "Cargo",
        description:
          "Learn about Cargo, Rust's package manager and build system.",
        status: "pending",
        resources: [
          {
            title: "Hello, Cargo!",
            url: "https://doc.rust-lang.org/book/ch01-03-hello-cargo.html",
          },
        ],
      },
      position: { x: 250, y: 300 },
    },
    {
      id: "4",
      type: "custom",
      data: {
        title: "Variables & Mutability",
        description:
          "Understand immutability by default, the 'mut' keyword, and shadowing.",
        status: "pending",
        resources: [
          {
            title: "Variables",
            url: "https://doc.rust-lang.org/book/ch03-01-variables-and-mutability.html",
          },
        ],
      },
      position: { x: 100, y: 450 },
    },
    {
      id: "5",
      type: "custom",
      data: {
        title: "Data Types",
        description:
          "Scalar and Compound types: integers, floats, booleans, chars, tuples, arrays.",
        status: "pending",
      },
      position: { x: 400, y: 450 },
    },
    {
      id: "6",
      type: "custom",
      data: {
        title: "Ownership",
        description:
          "The core concept of Rust. Understand stack vs heap, ownership rules, and scope.",
        status: "pending",
        resources: [
          {
            title: "Understanding Ownership",
            url: "https://doc.rust-lang.org/book/ch04-01-what-is-ownership.html",
          },
        ],
      },
      position: { x: 250, y: 600 },
    },
    {
      id: "7",
      type: "custom",
      data: {
        title: "Borrowing & References",
        description:
          "Learn how to access data without taking ownership using references (&).",
        status: "pending",
        resources: [
          {
            title: "References and Borrowing",
            url: "https://doc.rust-lang.org/book/ch04-02-references-and-borrowing.html",
          },
        ],
      },
      position: { x: 250, y: 750 },
    },
    {
      id: "8",
      type: "custom",
      data: {
        title: "Structs & Enums",
        description:
          "Define custom data structures. Learn about Option<T> and pattern matching.",
        status: "pending",
      },
      position: { x: 250, y: 900 },
    },
    {
      id: "9",
      type: "custom",
      data: {
        title: "Collections",
        description: "Work with Vectors, Strings, and Hash Maps.",
        status: "pending",
      },
      position: { x: 250, y: 1050 },
    },
    {
      id: "10",
      type: "custom",
      data: {
        title: "Error Handling",
        description:
          "Learn unrecoverable errors with panic! and recoverable errors with Result.",
        status: "pending",
      },
      position: { x: 250, y: 1200 },
    },
    {
      id: "11",
      type: "custom",
      data: {
        title: "Traits & Generics",
        description:
          "Define shared behavior using traits and write flexible code with generics.",
        status: "pending",
      },
      position: { x: 250, y: 1350 },
    },
    {
      id: "12",
      type: "custom",
      data: {
        title: "Smart Pointers",
        description:
          "Box<T>, Rc<T>, RefCell<T>, and the Deref and Drop traits.",
        status: "pending",
      },
      position: { x: 250, y: 1500 },
    },
    {
      id: "13",
      type: "custom",
      data: {
        title: "Async Rust",
        description: "Asynchronous programming with async/await and Futures.",
        status: "pending",
      },
      position: { x: 250, y: 1650 },
    },
  ],
  edges: [
    { id: "e1-2", source: "1", target: "2", type: "smoothstep" },
    { id: "e2-3", source: "2", target: "3", type: "smoothstep" },
    { id: "e3-4", source: "3", target: "4", type: "smoothstep" },
    { id: "e3-5", source: "3", target: "5", type: "smoothstep" },
    { id: "e4-6", source: "4", target: "6", type: "smoothstep" },
    { id: "e5-6", source: "5", target: "6", type: "smoothstep" },
    { id: "e6-7", source: "6", target: "7", type: "smoothstep" },
    { id: "e7-8", source: "7", target: "8", type: "smoothstep" },
    { id: "e8-9", source: "8", target: "9", type: "smoothstep" },
    { id: "e9-10", source: "9", target: "10", type: "smoothstep" },
    { id: "e10-11", source: "10", target: "11", type: "smoothstep" },
    { id: "e11-12", source: "11", target: "12", type: "smoothstep" },
    { id: "e12-13", source: "12", target: "13", type: "smoothstep" },
  ],
};
