export const algorithms = {
  languageSlug: "algorithms",
  displayName: "Algorithms & Data Structures",
  nodes: [
    {
      id: "alg-01", position: { x: 0, y: 0 }, type: "roadmapNode",
      data: {
        title: "Arrays & Strings",
        description: "Two pointers, sliding window, prefix sums. The most common interview patterns start here.",
        time: "1 week",
        status: "pending",
        resources: [
          { type: "video", title: "NeetCode — Arrays & Hashing", url: "https://www.youtube.com/watch?v=KLlXCFG5TnA" },
          { type: "doc", title: "LeetCode Explore — Arrays", url: "https://leetcode.com/explore/learn/card/array-and-string/" },
        ],
      },
    },
    {
      id: "alg-02", position: { x: 0, y: 150 }, type: "roadmapNode",
      data: {
        title: "Recursion",
        description: "Base cases, recursive calls, call stack behaviour. Foundation for trees, graphs, and DP.",
        time: "3 days",
        status: "pending",
        resources: [
          { type: "video", title: "Abdul Bari — Recursion", url: "https://www.youtube.com/watch?v=kHi1DUhp9kM" },
          { type: "doc", title: "CP-algorithms — Recursion", url: "https://cp-algorithms.com/" },
        ],
      },
    },
    {
      id: "alg-03", position: { x: 0, y: 300 }, type: "roadmapNode",
      data: {
        title: "Sorting Algorithms",
        description: "Merge sort, quick sort, heap sort, counting sort. Know the trade-offs and when to use each.",
        time: "1 week",
        status: "pending",
        resources: [
          { type: "video", title: "Abdul Bari — Merge Sort", url: "https://www.youtube.com/watch?v=mB5HXBb_HY8" },
          { type: "video", title: "NeetCode — Sorting", url: "https://neetcode.io/courses/dsa-for-beginners/11" },
        ],
      },
    },
    {
      id: "alg-04", position: { x: 0, y: 450 }, type: "roadmapNode",
      data: {
        title: "Searching",
        description: "Binary search and its variations. Finding boundaries, rotated arrays, search spaces.",
        time: "4 days",
        status: "pending",
        resources: [
          { type: "video", title: "NeetCode — Binary Search", url: "https://www.youtube.com/watch?v=s4DPM8ct1pI" },
          { type: "doc", title: "LeetCode Explore — Binary Search", url: "https://leetcode.com/explore/learn/card/binary-search/" },
        ],
      },
    },
    {
      id: "alg-05", position: { x: 0, y: 600 }, type: "roadmapNode",
      data: {
        title: "Linked Lists",
        description: "Singly, doubly, circular. Fast/slow pointers, reversal, merge operations.",
        time: "4 days",
        status: "pending",
        resources: [
          { type: "video", title: "NeetCode — Linked Lists", url: "https://www.youtube.com/watch?v=TSqrXVqMCfE" },
        ],
      },
    },
    {
      id: "alg-06", position: { x: 0, y: 750 }, type: "roadmapNode",
      data: {
        title: "Stacks & Queues",
        description: "Monotonic stacks, BFS queues, deque patterns. Parentheses, histogram, sliding window max.",
        time: "4 days",
        status: "pending",
        resources: [
          { type: "video", title: "NeetCode — Stack", url: "https://neetcode.io/courses/dsa-for-beginners/5" },
        ],
      },
    },
    {
      id: "alg-07", position: { x: 0, y: 900 }, type: "roadmapNode",
      data: {
        title: "Trees",
        description: "Binary trees, BSTs, traversals, balanced trees. DFS and BFS on tree structures.",
        time: "1 week",
        status: "pending",
        resources: [
          { type: "video", title: "NeetCode — Trees", url: "https://www.youtube.com/watch?v=OnSn2XEQ4MY" },
          { type: "doc", title: "LeetCode Explore — Binary Tree", url: "https://leetcode.com/explore/learn/card/data-structure-tree/" },
        ],
      },
    },
    {
      id: "alg-08", position: { x: 0, y: 1050 }, type: "roadmapNode",
      data: {
        title: "Graphs",
        description: "BFS, DFS, topological sort, shortest paths, union-find. The most versatile data structure.",
        time: "2 weeks",
        status: "pending",
        resources: [
          { type: "video", title: "William Fiset — Graph Theory", url: "https://www.youtube.com/watch?v=DgXR2OWQnLc" },
          { type: "doc", title: "CP-algorithms — Graphs", url: "https://cp-algorithms.com/graph/breadth-first-search.html" },
        ],
      },
    },
    {
      id: "alg-09", position: { x: 0, y: 1200 }, type: "roadmapNode",
      data: {
        title: "Heaps",
        description: "Min/max heaps, priority queues. Top-K problems, merge K sorted lists, median finding.",
        time: "4 days",
        status: "pending",
        resources: [
          { type: "video", title: "NeetCode — Heap / Priority Queue", url: "https://www.youtube.com/watch?v=t0Cq6tVNRBA" },
        ],
      },
    },
    {
      id: "alg-10", position: { x: 0, y: 1350 }, type: "roadmapNode",
      data: {
        title: "Dynamic Programming",
        description: "Memoization, tabulation, state transitions. The pattern that separates good from great.",
        time: "3 weeks",
        status: "pending",
        resources: [
          { type: "video", title: "NeetCode — DP Roadmap", url: "https://www.youtube.com/watch?v=mBNrRy2_hVs" },
          { type: "video", title: "Abdul Bari — Dynamic Programming", url: "https://www.youtube.com/watch?v=5dRGRueKU3M" },
        ],
      },
    },
    {
      id: "alg-11", position: { x: 0, y: 1500 }, type: "roadmapNode",
      data: {
        title: "Greedy Algorithms",
        description: "Interval scheduling, fractional knapsack, Huffman coding. When local optimal leads to global optimal.",
        time: "4 days",
        status: "pending",
        resources: [
          { type: "video", title: "Abdul Bari — Greedy Methods", url: "https://www.youtube.com/watch?v=ARvQcqJ_-NY" },
        ],
      },
    },
    {
      id: "alg-12", position: { x: 0, y: 1650 }, type: "roadmapNode",
      data: {
        title: "Backtracking",
        description: "N-Queens, permutations, subsets, constraint satisfaction. Systematic exploration of solution spaces.",
        time: "1 week",
        status: "pending",
        resources: [
          { type: "video", title: "NeetCode — Backtracking", url: "https://www.youtube.com/watch?v=pfiQ_PS1g8E" },
          { type: "doc", title: "CP-algorithms — Backtracking", url: "https://cp-algorithms.com/" },
        ],
      },
    },
  ],
  edges: [
    { id: "ae1-2", source: "alg-01", target: "alg-02", animated: true },
    { id: "ae2-3", source: "alg-02", target: "alg-03", animated: true },
    { id: "ae3-4", source: "alg-03", target: "alg-04", animated: true },
    { id: "ae4-5", source: "alg-04", target: "alg-05", animated: true },
    { id: "ae5-6", source: "alg-05", target: "alg-06", animated: true },
    { id: "ae6-7", source: "alg-06", target: "alg-07", animated: true },
    { id: "ae7-8", source: "alg-07", target: "alg-08", animated: true },
    { id: "ae8-9", source: "alg-08", target: "alg-09", animated: true },
    { id: "ae9-10", source: "alg-09", target: "alg-10", animated: true },
    { id: "ae10-11", source: "alg-10", target: "alg-11", animated: true },
    { id: "ae11-12", source: "alg-11", target: "alg-12", animated: true },
  ],
};
