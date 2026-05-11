export const operatingSystems = {
  languageSlug: "operating-systems",
  displayName: "Operating Systems",
  nodes: [
    {
      id: "os-01", position: { x: 0, y: 0 }, type: "roadmapNode",
      data: {
        title: "Processes & Threads",
        description: "Process lifecycle, PCB, context switching, threads vs processes. How the OS manages running programs.",
        time: "4 hours", status: "pending",
        resources: [
          { type: "video", title: "Neso Academy — Processes", url: "https://www.youtube.com/watch?v=OrM7nZcxXZU" },
          { type: "doc", title: "OSTEP — Processes", url: "https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-intro.pdf" },
        ],
      },
    },
    {
      id: "os-02", position: { x: 0, y: 150 }, type: "roadmapNode",
      data: {
        title: "CPU Scheduling",
        description: "FCFS, SJF, Round Robin, priority scheduling, multilevel queues. Trade-offs between throughput and latency.",
        time: "4 hours", status: "pending",
        resources: [
          { type: "video", title: "Gate Smashers — CPU Scheduling", url: "https://www.youtube.com/watch?v=EWkQl0n0web" },
          { type: "doc", title: "OSTEP — Scheduling", url: "https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched.pdf" },
        ],
      },
    },
    {
      id: "os-03", position: { x: 0, y: 300 }, type: "roadmapNode",
      data: {
        title: "Synchronisation & Deadlocks",
        description: "Mutex, semaphores, monitors, Banker's algorithm. Prevent race conditions and deadlocks.",
        time: "6 hours", status: "pending",
        resources: [
          { type: "video", title: "Neso Academy — Deadlocks", url: "https://www.youtube.com/watch?v=onkWXaXAgbY" },
          { type: "doc", title: "OSTEP — Concurrency", url: "https://pages.cs.wisc.edu/~remzi/OSTEP/threads-intro.pdf" },
        ],
      },
    },
    {
      id: "os-04", position: { x: 0, y: 450 }, type: "roadmapNode",
      data: {
        title: "Memory Management",
        description: "Paging, segmentation, page tables, TLBs. How the OS maps virtual addresses to physical memory.",
        time: "6 hours", status: "pending",
        resources: [
          { type: "video", title: "Neso Academy — Memory Management", url: "https://www.youtube.com/watch?v=dz9Tk6KCMlQ" },
          { type: "doc", title: "OSTEP — Address Spaces", url: "https://pages.cs.wisc.edu/~remzi/OSTEP/vm-intro.pdf" },
        ],
      },
    },
    {
      id: "os-05", position: { x: 0, y: 600 }, type: "roadmapNode",
      data: {
        title: "Virtual Memory",
        description: "Page replacement algorithms (LRU, FIFO, Optimal), thrashing, working set model.",
        time: "4 hours", status: "pending",
        resources: [
          { type: "video", title: "Gate Smashers — Virtual Memory", url: "https://www.youtube.com/watch?v=o2nSXQh3touch" },
          { type: "doc", title: "OSTEP — Virtual Memory Policies", url: "https://pages.cs.wisc.edu/~remzi/OSTEP/vm-beyondphys-policy.pdf" },
        ],
      },
    },
    {
      id: "os-06", position: { x: 0, y: 750 }, type: "roadmapNode",
      data: {
        title: "File Systems",
        description: "Inodes, directory structure, journaling, ext4, NTFS. How the OS organises persistent storage.",
        time: "4 hours", status: "pending",
        resources: [
          { type: "video", title: "Neso Academy — File Systems", url: "https://www.youtube.com/watch?v=KN8YgJnShPM" },
          { type: "doc", title: "OSTEP — File Systems", url: "https://pages.cs.wisc.edu/~remzi/OSTEP/file-intro.pdf" },
        ],
      },
    },
    {
      id: "os-07", position: { x: 0, y: 900 }, type: "roadmapNode",
      data: {
        title: "I/O Systems",
        description: "Device drivers, DMA, interrupt handling, disk scheduling. The bridge between software and hardware.",
        time: "3 hours", status: "pending",
        resources: [
          { type: "video", title: "Neso Academy — I/O Systems", url: "https://www.youtube.com/watch?v=F18RiREDkwE" },
          { type: "doc", title: "OSDev Wiki — I/O", url: "https://wiki.osdev.org/I/O_Ports" },
        ],
      },
    },
  ],
  edges: [
    { id: "oe1-2", source: "os-01", target: "os-02", animated: true },
    { id: "oe2-3", source: "os-02", target: "os-03", animated: true },
    { id: "oe3-4", source: "os-03", target: "os-04", animated: true },
    { id: "oe4-5", source: "os-04", target: "os-05", animated: true },
    { id: "oe5-6", source: "os-05", target: "os-06", animated: true },
    { id: "oe6-7", source: "os-06", target: "os-07", animated: true },
  ],
};
