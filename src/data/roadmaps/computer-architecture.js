export const computerArchitecture = {
  languageSlug: "computer-architecture",
  displayName: "Computer Architecture",
  nodes: [
    { id: "ca-01", position: { x: 0, y: 0 }, type: "roadmapNode", data: { title: "Binary & Number Systems", description: "Binary, hex, octal, two's complement, IEEE 754 floating point. The language machines speak.", time: "3 hours", status: "pending", resources: [{ type: "video", title: "Crash Course CS — Binary", url: "https://www.youtube.com/watch?v=1GSjbWt0c9M" }, { type: "doc", title: "nand2tetris — Chapter 1", url: "https://www.nand2tetris.org/" }] } },
    { id: "ca-02", position: { x: 0, y: 150 }, type: "roadmapNode", data: { title: "Logic Gates & Boolean Algebra", description: "AND, OR, NOT, XOR, NAND. De Morgan's laws, truth tables, combinational circuits.", time: "4 hours", status: "pending", resources: [{ type: "video", title: "Ben Eater — Logic Gates", url: "https://www.youtube.com/watch?v=QZwneRb-zqA" }, { type: "doc", title: "nand2tetris — Boolean Logic", url: "https://www.nand2tetris.org/" }] } },
    { id: "ca-03", position: { x: 0, y: 300 }, type: "roadmapNode", data: { title: "CPU Architecture", description: "ALU, registers, control unit, data path. How a processor fetches, decodes, and executes instructions.", time: "6 hours", status: "pending", resources: [{ type: "video", title: "Crash Course CS — CPU", url: "https://www.youtube.com/watch?v=FZGugFqdr60" }, { type: "video", title: "Ben Eater — 8-bit CPU", url: "https://www.youtube.com/playlist?list=PLowKtXNTBypGqImE405J2565dvjafglHU" }] } },
    { id: "ca-04", position: { x: 0, y: 450 }, type: "roadmapNode", data: { title: "Instruction Sets", description: "RISC vs CISC, x86 vs ARM, opcode encoding, addressing modes. The CPU's API.", time: "4 hours", status: "pending", resources: [{ type: "video", title: "Crash Course CS — Instruction Sets", url: "https://www.youtube.com/watch?v=Mv2XQgpbTNE" }, { type: "doc", title: "MIT 6.004 — ISA", url: "https://ocw.mit.edu/courses/6-004-computation-structures-spring-2017/" }] } },
    { id: "ca-05", position: { x: 0, y: 600 }, type: "roadmapNode", data: { title: "Memory Hierarchy", description: "Registers → L1 → L2 → L3 → RAM → SSD → HDD. Locality of reference, access latencies.", time: "3 hours", status: "pending", resources: [{ type: "video", title: "Crash Course CS — Memory", url: "https://www.youtube.com/watch?v=fpnE6UAfbtU" }] } },
    { id: "ca-06", position: { x: 0, y: 750 }, type: "roadmapNode", data: { title: "Pipelining", description: "Instruction pipelining, hazards (data, control, structural), branch prediction. Parallelism inside the CPU.", time: "4 hours", status: "pending", resources: [{ type: "video", title: "Ben Eater — Pipelining", url: "https://www.youtube.com/watch?v=_zSsEfAv0go" }, { type: "doc", title: "CS:APP — Pipelining", url: "https://csapp.cs.cmu.edu/" }] } },
    { id: "ca-07", position: { x: 0, y: 900 }, type: "roadmapNode", data: { title: "Caches", description: "Direct-mapped, set-associative, fully-associative. Cache lines, write policies, coherence protocols.", time: "4 hours", status: "pending", resources: [{ type: "doc", title: "CS:APP — Cache Memories", url: "https://csapp.cs.cmu.edu/" }, { type: "video", title: "MIT 6.004 — Caches", url: "https://ocw.mit.edu/courses/6-004-computation-structures-spring-2017/" }] } },
    { id: "ca-08", position: { x: 0, y: 1050 }, type: "roadmapNode", data: { title: "Assembly Basics", description: "x86/ARM assembly, stack frames, function calls, system calls. See what the compiler actually produces.", time: "1 week", status: "pending", resources: [{ type: "video", title: "Ben Eater — Assembly Language", url: "https://www.youtube.com/watch?v=wA8vVHA20po" }, { type: "doc", title: "nand2tetris — Machine Language", url: "https://www.nand2tetris.org/" }] } },
  ],
  edges: [
    { id: "ce1-2", source: "ca-01", target: "ca-02", animated: true },
    { id: "ce2-3", source: "ca-02", target: "ca-03", animated: true },
    { id: "ce3-4", source: "ca-03", target: "ca-04", animated: true },
    { id: "ce4-5", source: "ca-04", target: "ca-05", animated: true },
    { id: "ce5-6", source: "ca-05", target: "ca-06", animated: true },
    { id: "ce6-7", source: "ca-06", target: "ca-07", animated: true },
    { id: "ce7-8", source: "ca-07", target: "ca-08", animated: true },
  ],
};
