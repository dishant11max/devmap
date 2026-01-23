export const tilEntries = [
  {
    id: "til-1",
    date: "2026-03-20",
    title: "React.memo vs useMemo",
    content:
      "Make sure not to confuse `React.memo` and `useMemo`.\n\n`React.memo` is a Higher Order Component (HOC) to wrap components. It prevents re-renders if the props passed to the component haven't changed.\n\n`useMemo` is a hook to memoize expensive calculations within a component. It runs the function only when one of its dependencies has changed.",
    tags: ["React", "Performance", "Hooks"],
    category: "Frontend",
  },
  {
    id: "til-2",
    date: "2026-03-19",
    title: "CSS :has() Pseudo-class",
    content:
      "The `:has()` pseudo-class represents an element if any of the selectors passed as parameters match at least one element relative to it.\n\nIt's often called the 'parent selector'. For example, `div:has(p)` selects all `div` elements that contain a `p` element. This eliminates the need for complex JavaScript for simple parent styling.",
    tags: ["CSS", "Modern Web"],
    category: "Design",
  },
  {
    id: "til-3",
    date: "2026-03-18",
    title: "JavaScript Structured Clone",
    content:
      "Stop using `JSON.parse(JSON.stringify(obj))` to deep copy objects.\n\nUse the native `structuredClone(obj)` instead. It supports more data types (like `Date`, `Map`, `Set`, `RegExp`) and is more performant. It also correctly handles circular references, which JSON methods fail on.",
    tags: ["JavaScript", "Best Practices"],
    category: "Languages",
  },
  {
    id: "til-4",
    date: "2026-03-17",
    title: "Git Commit Fixup",
    content:
      "If you need to fix a previous commit without adding a new 'fix' commit, use `git commit --fixup <commit-hash>`.\n\nLater, when you run `git rebase -i --autosquash`, Git will automatically merge these fixup commits into the original commit, keeping your history clean.",
    tags: ["Git", "Workflow"],
    category: "Tools",
  },
  {
    id: "til-5",
    date: "2026-03-15",
    title: "TypeScript Satisfies Operator",
    content:
      "The `satisfies` operator checks if an expression matches a type, without changing the resulting type of that expression.\n\nFor example: `const palette = { red: [255, 0, 0] } satisfies Record<string, string | number[]>`. It ensures `palette` matches the Record type, but TypeScript still knows that `palette.red` is an array specifically, not just `string | number[]`.",
    tags: ["TypeScript", "Types"],
    category: "Frontend",
  },
  {
    id: "til-6",
    date: "2026-03-12",
    title: "HTML dialog Element",
    content:
      "native `<dialog>` elements are now widely supported. They come with built-in accessibility features like focus trapping and `Esc` key closing.\n\nUse `dialog.showModal()` to open it as a modal (with backdrop) or `dialog.show()` for a non-modal dialog. Style the backdrop with `::backdrop`.",
    tags: ["HTML", "Accessibility"],
    category: "Frontend",
  },
  {
    id: "til-7",
    date: "2026-03-10",
    title: "Reduce vs Map + Filter",
    content:
      "While `reduce` is powerful, chaining `filter` and `map` is often more readable.\n\nHowever, if you are iterating over a very large dataset, `reduce` allows you to filter and map in a single pass (transducer pattern), which can be significantly faster.",
    tags: ["JavaScript", "Performance"],
    category: "Languages",
  },
  {
    id: "til-8",
    date: "2026-03-09",
    title: "Vim Motions within VS Code",
    content:
      "You can speed up coding significantly by learning Vim motions. \n\n`ciw` (change inner word) to delete a word and enter insert mode.\n`dd` to delete a line.\n`shift + a` to append at the end of the line.\nExtensions like VSCodeVim bring these powers to your modern editor.",
    tags: ["Productivity", "Editors"],
    category: "Tools",
  },
  {
    id: "til-9",
    date: "2026-03-08",
    title: "PostgreSQL JSONB",
    content:
      "Postgres supports JSON types. Use `JSONB` (binary) over `JSON` (text) for almost all use cases.\n\n`JSONB` supports indexing, which makes querying nested data incredibly fast, bridging the gap between SQL and NoSQL databases.",
    tags: ["Database", "SQL"],
    category: "Backend",
  },
  {
    id: "til-10",
    date: "2026-03-07",
    title: "ARIA Labels vs Titles",
    content:
      "Don't rely on `title` attributes for accessibility. They are often ignored by screen readers and don't appear on mobile.\n\nUse `aria-label` or `aria-labelledby` to provide descriptive text for interactive elements that don't have visible text (like icon buttons).",
    tags: ["Accessibility", "HTML"],
    category: "Frontend",
  },
  {
    id: "til-11",
    date: "2026-03-06",
    title: "Python List Comprehensions",
    content:
      "List comprehensions provide a concise way to create lists.\n\nInstead of:\n`sq = []`\n`for x in range(10): sq.append(x**2)`\n\nUse:\n`sq = [x**2 for x in range(10)]`\nIt's more readable and often faster.",
    tags: ["Python", "Syntax"],
    category: "Languages",
  },
  {
    id: "til-12",
    date: "2026-03-05",
    title: "Docker Multi-stage Builds",
    content:
      "Keep your production images small by using multi-stage builds.\n\nStage 1: Build the app (has Node.js, compilers, etc.)\nStage 2: Copy only the artifacts to a slim runtime image (e.g., Nginx or Alpine).\nThis effectively discards all build tools from the final image.",
    tags: ["Docker", "DevOps"],
    category: "Tools",
  },
  {
    id: "til-13",
    date: "2026-03-04",
    title: "Atomic Design Methodology",
    content:
      "Atomic Design creates robust systems by breaking UI down into:\n\n1. Atoms (Labels, Inputs)\n2. Molecules (Search Form)\n3. Organisms (Header)\n4. Templates\n5. Pages\n\nThinking this way helps create reusable React components.",
    tags: ["Design System", "Architecture"],
    category: "Design",
  },
  {
    id: "til-14",
    date: "2026-03-03",
    title: "HTTP Status 418",
    content:
      "HTTP 418 I'm a teapot is a legitimate status code defined in RFC 2324 (Hyper Text Coffee Pot Control Protocol).\n\nWhile mostly a joke, some servers actually implement it as an easter egg.",
    tags: ["HTTP", "Trivia"],
    category: "Web",
  },
  {
    id: "til-15",
    date: "2026-03-02",
    title: "Defer vs Async Scripts",
    content:
      "`<script async>` downloads the file during HTML parsing and pauses the parser to execute it when ready.\n\n`<script defer>` downloads it during parsing but only executes it *after* the HTML parsing is complete. \n\nPrefer `defer` for scripts that rely on the DOM.",
    tags: ["HTML", "Performance"],
    category: "Frontend",
  },
  {
    id: "til-16",
    date: "2026-03-01",
    title: "Go Goroutines",
    content:
      "Goroutines are lightweight threads managed by the Go runtime.\n\nYou can start thousands of them with the `go` keyword (e.g., `go doWork()`) without exhausting system memory, unlike OS threads. Channels are used to communicate safely between them.",
    tags: ["Go", "Concurrency"],
    category: "Languages",
  },
  {
    id: "til-17",
    date: "2026-02-28",
    title: "Semver (Semantic Versioning)",
    content:
      "Format: MAJOR.MINOR.PATCH\n\n- MAJOR: Incompatible API changes.\n- MINOR: Backwards-compatible functionality.\n- PATCH: Backwards-compatible bug fixes.\n\nUsing carets `^1.2.3` in package.json allows updates to any version `<2.0.0`.",
    tags: ["Standards", "npm"],
    category: "Tools",
  },
  {
    id: "til-18",
    date: "2026-02-27",
    title: "CSS Custom Properties (Variables)",
    content:
      "CSS variables (`--main-color`) cascade and can be manipulated by JavaScript.\n\nUnlike SASS variables which compile away, CSS variables exist at runtime. This makes them perfect for theming (like Dark Mode) where you just change the value on the `root` element.",
    tags: ["CSS", "Theming"],
    category: "Design",
  },
  {
    id: "til-19",
    date: "2026-02-26",
    title: "Immutability in React State",
    content:
      "Never mutate state directly (e.g., `state.value = 5`).\n\nReact relies on reference equality checks to determine if a re-render is needed. If you mutate the object in place, the reference doesn't change, and React won't realize updates happened.",
    tags: ["React", "Concepts"],
    category: "Frontend",
  },
  {
    id: "til-20",
    date: "2026-02-25",
    title: "REST vs GraphQL",
    content:
      "REST exposes multiple endpoints for different resources. Over-fetching or under-fetching data is common.\n\nGraphQL exposes a single endpoint. The client specifies exactly what data structure it needs. This shifts complexity to the backend but optimizes network usage.",
    tags: ["API", "Architecture"],
    category: "Backend",
  },
  {
    id: "til-21",
    date: "2026-02-24",
    title: "Design Pattern: Singleton",
    content:
      "Ensures a class has only one instance and provides a global point of access to it.\n\nUseful for things like Database Connections or Configuration Managers, but be careful—it introduces global state which can make testing difficult.",
    tags: ["Patterns", "Architecture"],
    category: "Programming",
  },
  {
    id: "til-22",
    date: "2026-02-23",
    title: "The Box Model",
    content:
      "Every element in creating a web page is a rectangular box.\n\nIt consists of definitions for: Content, Padding, Border, and Margin. Understanding how these stack (specifically `box-sizing: border-box` vs `content-box`) is crucial for layout control.",
    tags: ["CSS", "Fundamentals"],
    category: "Design",
  },
  {
    id: "til-23",
    date: "2026-02-22",
    title: "Big O Notation",
    content:
      "A way to describe the performance or complexity of an algorithm.\n\nO(1) = Constant time (Hash map lookup)\nO(n) = Linear time (Looping through list)\nO(n^2) = Quadratic time (Nested loops)\n\nKnowing this helps you identify bottlenecks.",
    tags: ["CS Theory", "Algorithms"],
    category: "Programming",
  },
  {
    id: "til-24",
    date: "2026-02-21",
    title: "JWT (JSON Web Tokens)",
    content:
      "A compact, URL-safe means of representing claims to be transferred between two parties.\n\nComposed of Header, Payload, and Signature. Since the payload is just Base64 encoded (not encrypted), never put sensitive secrets inside a JWT.",
    tags: ["Security", "Auth"],
    category: "Backend",
  },
  {
    id: "til-25",
    date: "2026-02-20",
    title: "Progressive Web Apps (PWA)",
    content:
      "Web apps that use modern web capabilities (Manifest, Service Workers) to deliver an app-like experience.\n\nThey can run offline, send push notifications, and be installed on the home screen, blurring the line between native and web.",
    tags: ["Web", "Mobile"],
    category: "Frontend",
  },
  {
    id: "til-26",
    date: "2026-02-19",
    title: "SQL Injection",
    content:
      "A code injection technique where an attacker destroys your database.\n\nPrevention: Never concatenate user input directly into query strings. Always use Parameterized Queries or Prepared Statements provided by your DB driver or ORM.",
    tags: ["Security", "Database"],
    category: "Backend",
  },
  {
    id: "til-27",
    date: "2026-02-18",
    title: "Pure Functions",
    content:
      "A function where the return value is determined only by its input values, without observable side effects.\n\nThey are easier to test and debug. Key concept in Functional Programming and Redux reducers.",
    tags: ["Functional Programming", "Concepts"],
    category: "Programming",
  },
  {
    id: "til-28",
    date: "2026-02-17",
    title: "Tree Shaking",
    content:
      "A term used by bundlers (like Webpack or Rollup) to remove unused code.\n\nIt relies on the static structure of ES2015 module syntax (import and export). Dead code elimination results in smaller bundle sizes.",
    tags: ["Performance", "Build Tools"],
    category: "Frontend",
  },
  {
    id: "til-29",
    date: "2026-02-16",
    title: "CORS (Cross-Origin Resource Sharing)",
    content:
      "A security mechanism that restricts HTTP requests from scripts running in the browser to a different domain.\n\nIf you see a CORS error, it means the SERVER needs to send the `Access-Control-Allow-Origin` header to tell the browser it's okay to accept the response.",
    tags: ["Web", "Security"],
    category: "Backend",
  },
  {
    id: "til-30",
    date: "2026-02-15",
    title: "SOLID Principles",
    content:
      "Five design principles intended to make software designs more understandable, flexible, and maintainable.\n\nS - Single Responsibility\nO - Open/Closed\nL - Liskov Substitution\nI - Interface Segregation\nD - Dependency Inversion",
    tags: ["Architecture", "Patterns"],
    category: "Programming",
  },
];
