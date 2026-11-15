import { useState, useMemo, useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight, ChevronDown } from "lucide-react";
import { roadmaps } from "../../data/roadmaps";
import { languages } from "../../data/languages";
import { csCoreRoadmaps } from "../../data/csCore";

const TABS = [
  { id: 1, label: "[1] Languages" },
  { id: 2, label: "[2] CS Core" },
  { id: 3, label: "[3] TIL" },
  { id: 4, label: "[4] Resources" },
  { id: 5, label: "[5] Dashboard" },
];

export function TerminalWindow() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(1);
  const [expandedGroups, setExpandedGroups] = useState(
    () => new Set(["rust", "algorithms", "til-systems", "res-docs", "dash-core"])
  );
  const [selectedId, setSelectedId] = useState("rust-node-0");

  // 1. Languages Tree
  const languageTree = useMemo(() => {
    const targetLangs = ["rust", "python", "go", "javascript", "cpp"];
    return targetLangs.map((slug) => {
      const meta = languages.find((l) => l.id === slug) || { name: slug, category: "Systems" };
      const rm = roadmaps[slug];
      const nodes = (rm?.nodes || []).slice(0, 8).map((node, idx) => ({
        id: `${slug}-node-${idx}`,
        cliSlug: `${slug}:${(node.data?.title || `step-${idx + 1}`).toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
        title: node.data?.title || `Topic ${idx + 1}`,
        description: node.data?.description || "Curated topic guide and implementation steps.",
        time: node.data?.time || "1-2 days",
        status: "pending · step " + String(idx + 1).padStart(2, "0"),
        resourcesCount: (node.data?.resources || []).length || 2,
        track: slug,
        category: meta.category || "General",
        link: `/roadmap/${slug}`,
      }));
      return {
        id: slug,
        label: slug,
        count: rm?.nodes?.length || 10,
        children: nodes,
      };
    });
  }, []);

  // 2. CS Core Tree
  const csCoreTree = useMemo(() => {
    const targetTracks = ["algorithms", "operating-systems", "networks", "databases", "system-design"];
    return targetTracks.map((slug) => {
      const meta = csCoreRoadmaps.find((t) => t.id === slug) || { name: slug };
      const rm = roadmaps[slug];
      const nodes = (rm?.nodes || []).slice(0, 7).map((node, idx) => ({
        id: `cs-${slug}-node-${idx}`,
        cliSlug: `${slug}:${(node.data?.title || `topic-${idx + 1}`).toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
        title: node.data?.title || `Topic ${idx + 1}`,
        description: node.data?.description || "Core foundational computer science knowledge.",
        time: node.data?.time || "1 week",
        status: "pending · track " + String(idx + 1).padStart(2, "0"),
        resourcesCount: (node.data?.resources || []).length || 3,
        track: meta.name || slug,
        category: "CS Core",
        link: `/roadmap/${slug}`,
      }));
      return {
        id: slug,
        label: slug,
        count: rm?.nodes?.length || 8,
        children: nodes,
      };
    });
  }, []);

  // 3. TIL Tree
  const tilTree = useMemo(() => [
    {
      id: "til-systems",
      label: "systems / kernel",
      count: 3,
      children: [
        {
          id: "til-splice",
          cliSlug: "kernel:splice-zero-copy",
          title: "splice() zero-copy I/O",
          description: "Moving bytes between pipe buffers and socket descriptors without traversing userspace memory.",
          time: "today",
          status: "verified · kernel 6.x",
          resourcesCount: 2,
          track: "Linux Kernel",
          category: "Systems",
          link: "/til",
        },
        {
          id: "til-rust-lifetimes",
          cliSlug: "rust:struct-lifetimes",
          title: "Rust struct lifetime elision",
          description: "Anonymous lifetimes '_ and borrowing semantics when nesting references inside structs.",
          time: "yesterday",
          status: "verified · rustc 1.82",
          resourcesCount: 1,
          track: "Rust",
          category: "Languages",
          link: "/til",
        },
        {
          id: "til-page-tables",
          cliSlug: "x86_64:4-level-paging",
          title: "4-level x86_64 page walk",
          description: "CR3 register down through PML4, PDPT, PD, and PT. 4KB vs 2MB huge page TLB efficiency.",
          time: "3d ago",
          status: "verified · hardware",
          resourcesCount: 2,
          track: "Hardware",
          category: "Architecture",
          link: "/til",
        },
      ],
    },
    {
      id: "til-networking",
      label: "networking",
      count: 2,
      children: [
        {
          id: "til-quic",
          cliSlug: "quic:connection-migration",
          title: "QUIC connection migration",
          description: "Preserving stream state across NAT rebinding and Wi-Fi to cellular cell handover using Connection IDs.",
          time: "4d ago",
          status: "verified · RFC 9000",
          resourcesCount: 2,
          track: "Protocols",
          category: "Transport",
          link: "/til",
        },
        {
          id: "til-tfo",
          cliSlug: "tcp:fast-open-tfo",
          title: "TCP Fast Open (TFO)",
          description: "Data exchange in the SYN packet via TFO cookie, cutting one whole round-trip on repeat handshakes.",
          time: "5d ago",
          status: "verified · RFC 7413",
          resourcesCount: 1,
          track: "Protocols",
          category: "Transport",
          link: "/til",
        },
      ],
    },
    {
      id: "til-databases",
      label: "databases",
      count: 2,
      children: [
        {
          id: "til-wal",
          cliSlug: "postgres:wal-checkpoints",
          title: "PostgreSQL WAL checkpoints",
          description: "Checkpointing dirty buffers from shared_buffers to disk while WAL ensures crash-safe durability.",
          time: "1w ago",
          status: "verified · pg 16",
          resourcesCount: 2,
          track: "PostgreSQL",
          category: "Storage",
          link: "/til",
        },
        {
          id: "til-btree",
          cliSlug: "storage:btree-fillfactor",
          title: "B-tree fillfactor & splits",
          description: "Balancing read cache locality against high page-split frequency during random inserts.",
          time: "1w ago",
          status: "verified · storage",
          resourcesCount: 2,
          track: "Indexing",
          category: "Databases",
          link: "/til",
        },
      ],
    },
  ], []);

  // 4. Resources Tree
  const resourcesTree = useMemo(() => [
    {
      id: "res-docs",
      label: "official documentation",
      count: 4,
      children: [
        {
          id: "res-rust-book",
          cliSlug: "doc:the-rust-book",
          title: "The Rust Programming Language",
          description: "The authoritative book on Rust ownership, concurrency, memory models, and pattern matching.",
          time: "Reference",
          status: "official",
          resourcesCount: 20,
          track: "Rust Official",
          category: "Documentation",
          link: "/resources",
        },
        {
          id: "res-py-docs",
          cliSlug: "doc:python-stdlib",
          title: "Python Standard Library Docs",
          description: "Complete module reference for built-in types, asyncio, multiprocessing, and standard tooling.",
          time: "Reference",
          status: "official",
          resourcesCount: 15,
          track: "Python Official",
          category: "Documentation",
          link: "/resources",
        },
        {
          id: "res-go-tour",
          cliSlug: "doc:tour-of-go",
          title: "A Tour of Go & Standard Library",
          description: "Interactive language walkthrough, goroutines, channels, interfaces, and packages.",
          time: "Reference",
          status: "official",
          resourcesCount: 10,
          track: "Go Official",
          category: "Documentation",
          link: "/resources",
        },
        {
          id: "res-mdn",
          cliSlug: "doc:mdn-web-docs",
          title: "MDN Web Docs Reference",
          description: "Comprehensive documentation of JavaScript, DOM, CSS, Web APIs, and browser standards.",
          time: "Reference",
          status: "official",
          resourcesCount: 30,
          track: "Web Standards",
          category: "Documentation",
          link: "/resources",
        },
      ],
    },
    {
      id: "res-books",
      label: "canonical textbooks",
      count: 3,
      children: [
        {
          id: "res-ddia",
          cliSlug: "book:ddia-kleppmann",
          title: "Designing Data-Intensive Apps",
          description: "Martin Kleppmann's masterpiece on distributed systems, replication, partitioning, and consistency.",
          time: "Textbook",
          status: "book",
          resourcesCount: 12,
          track: "Distributed Systems",
          category: "Books",
          link: "/resources",
        },
        {
          id: "res-csapp",
          cliSlug: "book:csapp-bryant",
          title: "Computer Systems: Programmer's Perspective",
          description: "Bryant & O'Hallaron on machine-level representation, virtual memory, caching, and linking.",
          time: "Textbook",
          status: "book",
          resourcesCount: 12,
          track: "Architecture",
          category: "Books",
          link: "/resources",
        },
        {
          id: "res-ostep",
          cliSlug: "book:ostep-remzi",
          title: "Operating Systems: Three Easy Pieces",
          description: "Virtualization, concurrency, and persistence explained with clarity and complete C examples.",
          time: "Textbook",
          status: "book",
          resourcesCount: 10,
          track: "Operating Systems",
          category: "Books",
          link: "/resources",
        },
      ],
    },
  ], []);

  // 5. Dashboard Tree
  const dashboardTree = useMemo(() => [
    {
      id: "dash-core",
      label: "workspace session",
      count: 4,
      children: [
        {
          id: "dash-track",
          cliSlug: "session:active-track",
          title: "Active Roadmap: Rust",
          description: "Currently tracking 13 core nodes. 6 completed, 7 pending verification.",
          time: "In progress",
          status: "synced · 6/13 done",
          resourcesCount: 13,
          track: "Roadmaps",
          category: "Progress",
          link: "/dashboard",
        },
        {
          id: "dash-streak",
          cliSlug: "session:til-streak",
          title: "TIL Daily Streak: 14 Days",
          description: "14 consecutive days of documented learnings and system architecture notes.",
          time: "14 days",
          status: "active streak",
          resourcesCount: 14,
          track: "Daily Log",
          category: "Streak",
          link: "/dashboard",
        },
        {
          id: "dash-saved",
          cliSlug: "session:saved-bookmarks",
          title: "Saved Bookmarks: 8 Items",
          description: "8 curated documentation chapters and textbooks pinned for quick access.",
          time: "8 items",
          status: "pinned",
          resourcesCount: 8,
          track: "Library",
          category: "Bookmarks",
          link: "/dashboard",
        },
        {
          id: "dash-supabase",
          cliSlug: "auth:supabase-session",
          title: "OAuth Authentication",
          description: "Session synchronized with GitHub OAuth provider. Cloud sync active.",
          time: "Online",
          status: "connected",
          resourcesCount: 1,
          track: "Security",
          category: "Auth",
          link: "/dashboard",
        },
      ],
    },
  ], []);

  // Active tree
  const currentTree = useMemo(() => {
    switch (activeTab) {
      case 1:
        return languageTree;
      case 2:
        return csCoreTree;
      case 3:
        return tilTree;
      case 4:
        return resourcesTree;
      case 5:
        return dashboardTree;
      default:
        return languageTree;
    }
  }, [activeTab, languageTree, csCoreTree, tilTree, resourcesTree, dashboardTree]);

  // Flattened visible items
  const visibleItems = useMemo(() => {
    const list = [];
    currentTree.forEach((group) => {
      const isExpanded = expandedGroups.has(group.id);
      if (isExpanded) {
        group.children.forEach((child) => {
          list.push(child);
        });
      }
    });
    return list;
  }, [currentTree, expandedGroups]);

  // Selected item
  const selectedItem = useMemo(() => {
    for (const group of currentTree) {
      for (const child of group.children) {
        if (child.id === selectedId) return child;
      }
    }
    return visibleItems[0] || currentTree[0]?.children[0] || null;
  }, [currentTree, selectedId, visibleItems]);

  const toggleGroup = useCallback((groupId) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(groupId)) {
        next.delete(groupId);
      } else {
        next.add(groupId);
      }
      return next;
    });
  }, []);

  const handleTabChange = useCallback((tabId) => {
    setActiveTab(tabId);
    let targetTree = languageTree;
    if (tabId === 2) targetTree = csCoreTree;
    else if (tabId === 3) targetTree = tilTree;
    else if (tabId === 4) targetTree = resourcesTree;
    else if (tabId === 5) targetTree = dashboardTree;

    if (targetTree[0]) {
      setExpandedGroups((prev) => new Set([...prev, targetTree[0].id]));
      if (targetTree[0].children[0]) {
        setSelectedId(targetTree[0].children[0].id);
      }
    }
  }, [languageTree, csCoreTree, tilTree, resourcesTree, dashboardTree]);

  // Keyboard navigation: 1-5 keys switch tabs, arrows navigate tree, Enter opens
  useEffect(() => {
    function handleKeyDown(e) {
      if (["INPUT", "TEXTAREA"].includes(e.target.tagName)) return;

      if (e.key >= "1" && e.key <= "5") {
        e.preventDefault();
        handleTabChange(parseInt(e.key, 10));
        return;
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (visibleItems.length === 0) return;
        const currentIndex = visibleItems.findIndex((item) => item.id === selectedId);
        const nextIndex = currentIndex < visibleItems.length - 1 ? currentIndex + 1 : 0;
        setSelectedId(visibleItems[nextIndex].id);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (visibleItems.length === 0) return;
        const currentIndex = visibleItems.findIndex((item) => item.id === selectedId);
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : visibleItems.length - 1;
        setSelectedId(visibleItems[prevIndex].id);
      } else if (e.key === "Enter" && selectedItem?.link) {
        e.preventDefault();
        navigate(selectedItem.link);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [visibleItems, selectedId, selectedItem, handleTabChange, navigate]);

  return (
    <div className="w-full lg:w-[640px] xl:w-[680px] rounded-[10px] border border-border bg-[var(--window-bg)] text-[var(--window-text)] shadow-2xl overflow-hidden font-mono text-xs select-none">
      {/* Title Bar (macOS style dots + devmap title) */}
      <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-border bg-[color-mix(in_srgb,var(--window-bg)_80%,black)]">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
        </div>
        <div className="text-[11px] text-muted tracking-widest uppercase">
          devmap
        </div>
      </div>

      {/* Tabs Row (no duplicate DEVMAP badge, clean mono tabs with amber active indicator) */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-border bg-[color-mix(in_srgb,var(--window-bg)_90%,black)] overflow-x-auto no-scrollbar">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleTabChange(tab.id)}
              className={`px-2 py-1 transition-colors cursor-pointer whitespace-nowrap text-xs ${
                isActive
                  ? "text-accent font-medium underline underline-offset-4 decoration-accent"
                  : "text-muted hover:text-[var(--window-text)]"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Split Panes (Left Tree + Right Metadata Inspector) */}
      <div className="grid grid-cols-1 md:grid-cols-12 min-h-[340px] divide-y md:divide-y-0 md:divide-x divide-border">
        {/* Left Pane: CLI Tree */}
        <div className="md:col-span-7 p-3 overflow-y-auto max-h-[380px] space-y-1">
          {currentTree.map((group) => {
            const isExpanded = expandedGroups.has(group.id);
            return (
              <div key={group.id} className="space-y-0.5">
                {/* Category Header */}
                <button
                  type="button"
                  onClick={() => toggleGroup(group.id)}
                  className="w-full flex items-center gap-1.5 px-1.5 py-0.5 text-left text-[var(--window-text)] hover:text-ink transition-colors cursor-pointer"
                >
                  {isExpanded ? (
                    <ChevronDown className="h-3 w-3 text-accent shrink-0" />
                  ) : (
                    <ChevronRight className="h-3 w-3 text-muted shrink-0" />
                  )}
                  <span className="font-medium">{group.label}</span>
                  <span className="text-muted text-[11px]">({group.count})</span>
                </button>

                {/* Nodes in Group */}
                {isExpanded && (
                  <div className="ml-3 pl-2.5 border-l border-border space-y-0.5">
                    {group.children.map((child) => {
                      const isSelected = selectedItem?.id === child.id;
                      return (
                        <button
                          key={child.id}
                          type="button"
                          onClick={() => setSelectedId(child.id)}
                          className={`w-full flex items-center gap-2 px-2 py-1 rounded-[2px] text-left transition-colors cursor-pointer truncate ${
                            isSelected
                              ? "bg-border/60 text-[var(--window-text)] font-medium border-l-2 border-ink"
                              : "text-muted hover:text-[var(--window-text)] hover:bg-border/30"
                          }`}
                        >
                          <span className={`text-[10px] ${isSelected ? "text-ink" : "text-muted/40"}`}>
                            {isSelected ? "●" : "○"}
                          </span>
                          <span className="truncate">{child.title}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right Pane: bast.sh-style Metadata Inspector */}
        <div className="md:col-span-5 p-4 bg-[color-mix(in_srgb,var(--window-bg)_80%,black)] flex flex-col justify-between overflow-y-auto max-h-[380px]">
          {selectedItem ? (
            <div className="space-y-3.5">
              {/* Node CLI Identifier & Action Button */}
              <div className="flex items-start justify-between gap-2 pb-2 border-b border-border">
                <div className="truncate">
                  <div className="text-[10px] text-muted uppercase tracking-wider">
                    {selectedItem.track}
                  </div>
                  <div className="text-xs font-bold text-ink truncate mt-0.5">
                    {selectedItem.cliSlug}
                  </div>
                </div>
                <Link
                  to={selectedItem.link}
                  className="px-2.5 py-1 rounded-[2px] bg-accent hover:opacity-90 text-on-accent font-bold text-[11px] transition-opacity shrink-0 shadow-sm"
                >
                  Start
                </Link>
              </div>

              {/* Monospace Metadata Table (bast.sh style) */}
              <div className="space-y-1.5 text-[11px] font-mono">
                <div className="grid grid-cols-12 gap-1">
                  <span className="col-span-4 text-muted">track</span>
                  <span className="col-span-8 text-[var(--window-text)] truncate">{selectedItem.track}</span>
                </div>
                <div className="grid grid-cols-12 gap-1">
                  <span className="col-span-4 text-muted">category</span>
                  <span className="col-span-8 text-[var(--window-text)] truncate">{selectedItem.category}</span>
                </div>
                <div className="grid grid-cols-12 gap-1">
                  <span className="col-span-4 text-muted">status</span>
                  <span className="col-span-8 text-ink truncate">{selectedItem.status}</span>
                </div>
                <div className="grid grid-cols-12 gap-1">
                  <span className="col-span-4 text-muted">estimate</span>
                  <span className="col-span-8 text-[var(--window-text)] truncate">{selectedItem.time}</span>
                </div>
                <div className="grid grid-cols-12 gap-1">
                  <span className="col-span-4 text-muted">curated</span>
                  <span className="col-span-8 text-[var(--window-text)] truncate">
                    {selectedItem.resourcesCount} resources
                  </span>
                </div>
              </div>

              {/* Notes / Description */}
              <div className="pt-2 border-t border-border">
                <span className="text-[10px] uppercase text-muted tracking-wider block mb-1">
                  notes
                </span>
                <p className="text-[11px] text-muted leading-relaxed">
                  {selectedItem.description}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-10 text-muted">
              select a topic
            </div>
          )}

          {/* Bottom CLI Help */}
          <div className="mt-3 pt-2.5 border-t border-border flex items-center justify-between text-[10px] text-muted">
            <span>1-5 tabs · &uarr;&darr; select</span>
            <span>&crarr; start</span>
          </div>
        </div>
      </div>
    </div>
  );
}
