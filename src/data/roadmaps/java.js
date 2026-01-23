export const java = {
  languageSlug: "java",
  displayName: "Java",
  nodes: [
    {
      id: "java-01",
      position: { x: 0, y: 0 },
      data: {
        title: "Java Fundamentals",
        description:
          "JVM, JRE, JDK, Syntax, Main Method, Variables, Data Types.",
        time: "6 hours",
        status: "pending",
        resources: [
          {
            type: "video",
            title: "Java Full Course (Bro Code)",
            url: "https://www.youtube.com/watch?v=xk4_1vDrixo",
          },
          {
            type: "doc",
            title: "Java Documentation",
            url: "https://docs.oracle.com/en/java/",
          },
        ],
      },
      type: "roadmapNode",
    },
    {
      id: "java-02",
      position: { x: 0, y: 150 },
      data: {
        title: "Control Flow & Arrays",
        description:
          "Loops, Conditionals, Switch Expressions, and Single/Multi-dimensional Arrays.",
        time: "5 hours",
        status: "pending",
        resources: [
          {
            type: "doc",
            title: "Java Control Flow - Baeldung",
            url: "https://www.baeldung.com/java-control-structures",
          },
        ],
      },
      type: "roadmapNode",
    },
    {
      id: "java-03",
      position: { x: 0, y: 300 },
      data: {
        title: "Object-Oriented Programming I",
        description: "Classes, Objects, Methods, Constructors, 'this' keyword.",
        time: "8 hours",
        status: "pending",
        resources: [
          {
            type: "video",
            title: "Java OOP Basics",
            url: "https://www.youtube.com/watch?v=sJN5f8q_670",
          },
        ],
      },
      type: "roadmapNode",
    },
    {
      id: "java-04",
      position: { x: 0, y: 450 },
      data: {
        title: "Object-Oriented Programming II",
        description:
          "Inheritance, Polymorphism, Abstraction, Interfaces, Encapsulation.",
        time: "10 hours",
        status: "pending",
        resources: [
          {
            type: "doc",
            title: "Java Inheritance - W3Schools",
            url: "https://www.w3schools.com/java/java_inheritance.asp",
          },
        ],
      },
      type: "roadmapNode",
    },
    {
      id: "java-05",
      position: { x: 0, y: 600 },
      data: {
        title: "Exception Handling",
        description: "Try/Catch, Throw, Throws, Custom Exceptions.",
        time: "4 hours",
        status: "pending",
        resources: [
          {
            type: "doc",
            title: "Java Exception Handling - Jenkov",
            url: "https://jenkov.com/tutorials/java-exception-handling/index.html",
          },
        ],
      },
      type: "roadmapNode",
    },
    {
      id: "java-06",
      position: { x: 0, y: 750 },
      data: {
        title: "Collections Framework",
        description: "List, Set, Map, ArrayList, HashMap, Generics.",
        time: "12 hours",
        status: "pending",
        resources: [
          {
            type: "doc",
            title: "Java Collections Tutorial",
            url: "https://www.javatpoint.com/collections-in-java",
          },
        ],
      },
      type: "roadmapNode",
    },
    {
      id: "java-07",
      position: { x: 0, y: 900 },
      data: {
        title: "Streams & Lambdas",
        description:
          "Functional programming in Java, Stream API, Lambda Expressions.",
        time: "6 hours",
        status: "pending",
        resources: [
          {
            type: "doc",
            title: "Introduction to Java Streams - Baeldung",
            url: "https://www.baeldung.com/java-8-streams",
          },
        ],
      },
      type: "roadmapNode",
    },
  ],
  edges: [
    { id: "e1", source: "java-01", target: "java-02", animated: true },
    { id: "e2", source: "java-02", target: "java-03", animated: true },
    { id: "e3", source: "java-03", target: "java-04", animated: true },
    { id: "e4", source: "java-04", target: "java-05", animated: true },
    { id: "e5", source: "java-05", target: "java-06", animated: true },
    { id: "e6", source: "java-06", target: "java-07", animated: true },
  ],
};
