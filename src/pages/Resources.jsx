import { useState, useMemo } from "react";
import { ExternalLink, Search, X } from "lucide-react";
import { Input } from "../components/ui/Input";

const resourceData = [
  {
    category: "CS Fundamentals",
    subcategories: [
      {
        name: "Algorithms & DSA",
        description: "Sorting, searching, trees, graphs, dynamic programming",
        resources: [
          { name: "Abdul Bari", url: "youtube.com/@abdul_bari", desc: "Clear algorithm explanations with visual walkthroughs", tags: ["Free", "Video"] },
          { name: "NeetCode", url: "neetcode.io", desc: "Structured DSA roadmap with LeetCode problem sets", tags: ["Free", "Interactive"] },
          { name: "CP-algorithms", url: "cp-algorithms.com", desc: "Competitive programming algorithm reference", tags: ["Free", "Docs"] },
          { name: "LeetCode", url: "leetcode.com", desc: "Algorithm challenges for technical interviews", tags: ["Free", "Interactive"] },
          { name: "CLRS Reference", url: "mitpress.mit.edu", desc: "Introduction to Algorithms — the standard textbook", tags: ["Docs"] },
        ],
      },
      {
        name: "Computer Networks",
        description: "Protocols, HTTP, DNS, TLS, network security",
        resources: [
          { name: "Kurose & Ross Lectures", url: "youtube.com", desc: "University-level networking lectures", tags: ["Free", "Video"] },
          { name: "Computerphile", url: "youtube.com/@Computerphile", desc: "Accessible deep dives into networking concepts", tags: ["Free", "Video"] },
          { name: "MDN Web Docs", url: "developer.mozilla.org", desc: "HTTP, WebSockets, and web API references", tags: ["Free", "Docs"] },
          { name: "Cloudflare Learning Center", url: "cloudflare.com/learning", desc: "DNS, CDN, TLS, DDoS explained clearly", tags: ["Free", "Docs"] },
        ],
      },
      {
        name: "Operating Systems",
        description: "Processes, memory, scheduling, file systems",
        resources: [
          { name: "Neso Academy", url: "youtube.com/@nesoacademy", desc: "Comprehensive OS video lectures", tags: ["Free", "Video"] },
          { name: "OSTEP", url: "ostep.org", desc: "Operating Systems: Three Easy Pieces — free textbook", tags: ["Free", "Docs"] },
          { name: "MIT 6.004", url: "ocw.mit.edu", desc: "Computation Structures — MIT OpenCourseWare", tags: ["Free", "Video"] },
        ],
      },
      {
        name: "Databases",
        description: "SQL, indexing, transactions, query optimisation",
        resources: [
          { name: "CMU Database Group", url: "youtube.com/@CMUDatabaseGroup", desc: "Andy Pavlo's database systems lectures", tags: ["Free", "Video"] },
          { name: "Use The Index, Luke", url: "use-the-index-luke.com", desc: "SQL indexing and tuning guide", tags: ["Free", "Docs"] },
          { name: "PostgreSQL Docs", url: "postgresql.org/docs", desc: "Official PostgreSQL documentation", tags: ["Free", "Docs"] },
          { name: "SQLZoo", url: "sqlzoo.net", desc: "Interactive SQL tutorials and exercises", tags: ["Free", "Interactive"] },
        ],
      },
      {
        name: "System Design",
        description: "Scalability, load balancing, caching, distributed systems",
        resources: [
          { name: "ByteByteGo", url: "youtube.com/@ByteByteGo", desc: "Visual system design explanations by Alex Xu", tags: ["Free", "Video"] },
          { name: "system-design-primer", url: "github.com/donnemartin/system-design-primer", desc: "Comprehensive system design study guide", tags: ["Free", "Docs"] },
          { name: "Gaurav Sen", url: "youtube.com/@gaborsen", desc: "System design interview walkthroughs", tags: ["Free", "Video"] },
          { name: "High Scalability", url: "highscalability.com", desc: "Real-world architecture case studies", tags: ["Free", "Docs"] },
        ],
      },
      {
        name: "Computer Architecture",
        description: "Binary, CPU, caches, pipelines, assembly",
        resources: [
          { name: "Ben Eater", url: "youtube.com/@BenEater", desc: "Build a CPU from scratch on breadboards", tags: ["Free", "Video"] },
          { name: "nand2tetris", url: "nand2tetris.org", desc: "Build a computer from first principles", tags: ["Free", "Interactive"] },
          { name: "Crash Course CS", url: "youtube.com/playlist?list=PL8dPuuaLjXtNlUrzyH5r6jN9ulIgZBpdo", desc: "Accessible introduction to computer science", tags: ["Free", "Video"] },
          { name: "MIT 6.004", url: "ocw.mit.edu", desc: "Computation Structures — MIT OpenCourseWare", tags: ["Free", "Video"] },
        ],
      },
    ],
  },
  {
    category: "Web Development",
    subcategories: [
      {
        name: "Frontend",
        description: "HTML, CSS, JavaScript, React, browser APIs",
        resources: [
          { name: "MDN Web Docs", url: "developer.mozilla.org", desc: "The definitive web platform reference", tags: ["Free", "Docs"] },
          { name: "Fireship", url: "youtube.com/@Fireship", desc: "High-intensity code explainers — 100 seconds format", tags: ["Free", "Video"] },
          { name: "Kevin Powell", url: "youtube.com/@KevinPowell", desc: "CSS deep dives and modern layout techniques", tags: ["Free", "Video"] },
          { name: "web.dev", url: "web.dev", desc: "Google's web performance and best practices", tags: ["Free", "Docs"] },
          { name: "Josh Comeau", url: "joshwcomeau.com", desc: "Interactive CSS and React tutorials", tags: ["Free", "Docs"] },
        ],
      },
      {
        name: "Backend",
        description: "Node.js, APIs, server architecture, databases",
        resources: [
          { name: "Hussein Nasser", url: "youtube.com/@haborsen", desc: "Backend engineering deep dives", tags: ["Free", "Video"] },
          { name: "Node.js Docs", url: "nodejs.org/docs", desc: "Official Node.js documentation", tags: ["Free", "Docs"] },
          { name: "Express Docs", url: "expressjs.com", desc: "Minimalist Node.js web framework", tags: ["Free", "Docs"] },
          { name: "REST API Tutorial", url: "restfulapi.net", desc: "RESTful API design guide", tags: ["Free", "Docs"] },
        ],
      },
      {
        name: "Full Stack Courses",
        description: "Complete web development curricula",
        resources: [
          { name: "The Odin Project", url: "theodinproject.com", desc: "Free, open-source full-stack curriculum", tags: ["Free", "Interactive"] },
          { name: "freeCodeCamp", url: "freecodecamp.org", desc: "Certifications across web, Python, data science", tags: ["Free", "Interactive"] },
          { name: "CS50 Web", url: "cs50.harvard.edu/web", desc: "Harvard's web programming with Python and JavaScript", tags: ["Free", "Video"] },
          { name: "Full Stack Open", url: "fullstackopen.com", desc: "Modern web dev with React, Node, GraphQL. University of Helsinki", tags: ["Free", "Interactive"] },
        ],
      },
    ],
  },
  {
    category: "AI & Machine Learning",
    subcategories: [
      {
        name: "Foundations",
        description: "Math, statistics, and introductory ML",
        resources: [
          { name: "3Blue1Brown", url: "youtube.com/@3blue1brown", desc: "Visual math explanations — linear algebra, calculus, neural networks", tags: ["Free", "Video"] },
          { name: "fast.ai", url: "course.fast.ai", desc: "Practical deep learning for coders", tags: ["Free", "Interactive"] },
          { name: "Kaggle Learn", url: "kaggle.com/learn", desc: "Micro-courses on ML, pandas, feature engineering", tags: ["Free", "Interactive"] },
          { name: "StatQuest", url: "youtube.com/@statquest", desc: "Statistics and ML explained simply", tags: ["Free", "Video"] },
        ],
      },
      {
        name: "Deep Learning",
        description: "Neural networks, transformers, architectures",
        resources: [
          { name: "Karpathy — Zero to Hero", url: "youtube.com/@AndrejKarpathy", desc: "Neural networks from scratch, GPT from scratch", tags: ["Free", "Video"] },
          { name: "fast.ai Part 2", url: "course.fast.ai/Lessons/part2.html", desc: "Stable diffusion, transformers from foundations", tags: ["Free", "Video"] },
          { name: "Hugging Face Docs", url: "huggingface.co/docs", desc: "Transformers, tokenizers, datasets documentation", tags: ["Free", "Docs"] },
        ],
      },
      {
        name: "AI Engineering",
        description: "LLMs, agents, RAG, deployment",
        resources: [
          { name: "AI Engineering from Scratch", url: "aiengineeringfromscratch.com", desc: "MIT-licensed open AI engineering curriculum", tags: ["Free", "Interactive"] },
          { name: "LangChain Docs", url: "docs.langchain.com", desc: "Framework for LLM application development", tags: ["Free", "Docs"] },
          { name: "OpenAI Cookbook", url: "cookbook.openai.com", desc: "Practical examples for OpenAI API usage", tags: ["Free", "Docs"] },
        ],
      },
    ],
  },
  {
    category: "Practice & Interview Prep",
    subcategories: [
      {
        name: "Coding Challenges",
        description: "Algorithm and data structure practice",
        resources: [
          { name: "LeetCode", url: "leetcode.com", desc: "Algorithm challenges for technical interviews", tags: ["Free", "Interactive"] },
          { name: "NeetCode.io", url: "neetcode.io", desc: "Curated LeetCode roadmap with video solutions", tags: ["Free", "Interactive"] },
          { name: "Codewars", url: "codewars.com", desc: "Community-created code katas ranked by difficulty", tags: ["Free", "Interactive"] },
          { name: "Exercism", url: "exercism.org", desc: "Code exercises with mentorship in 70+ languages", tags: ["Free", "Interactive"] },
          { name: "HackerRank", url: "hackerrank.com", desc: "Competitive programming, SQL, and data challenges", tags: ["Free", "Interactive"] },
        ],
      },
      {
        name: "System Design Practice",
        description: "Mock interviews and design exercises",
        resources: [
          { name: "Pramp", url: "pramp.com", desc: "Free peer-to-peer mock interviews", tags: ["Free", "Interactive"] },
          { name: "Interviewing.io", url: "interviewing.io", desc: "Anonymous mock interviews with engineers", tags: ["Interactive"] },
          { name: "system-design-primer", url: "github.com/donnemartin/system-design-primer", desc: "Comprehensive system design study guide", tags: ["Free", "Docs"] },
        ],
      },
      {
        name: "Frontend Challenges",
        description: "UI/UX implementation practice",
        resources: [
          { name: "Frontend Mentor", url: "frontendmentor.io", desc: "Real-world frontend challenges with design specs", tags: ["Free", "Interactive"] },
          { name: "CSS Battle", url: "cssbattle.dev", desc: "Competitive CSS code-golfing challenges", tags: ["Free", "Interactive"] },
          { name: "100 Days of CSS", url: "100dayscss.com", desc: "Daily CSS challenges for skill building", tags: ["Free", "Interactive"] },
        ],
      },
    ],
  },
  {
    category: "University & Free Courses",
    subcategories: [
      {
        name: "Complete Programs",
        description: "Full curricula from top institutions",
        resources: [
          { name: "CS50", url: "cs50.harvard.edu", desc: "Harvard's legendary intro to computer science", tags: ["Free", "Video"] },
          { name: "MIT OpenCourseWare", url: "ocw.mit.edu", desc: "6.006 Algorithms, 6.004 Architecture, 6.042 Math for CS", tags: ["Free", "Video"] },
          { name: "fast.ai", url: "course.fast.ai", desc: "Practical deep learning, free", tags: ["Free", "Video"] },
          { name: "The Odin Project", url: "theodinproject.com", desc: "Full-stack web dev, fully free and open source", tags: ["Free", "Interactive"] },
          { name: "freeCodeCamp", url: "freecodecamp.org", desc: "Certifications across web, Python, data science", tags: ["Free", "Interactive"] },
          { name: "Full Stack Open", url: "fullstackopen.com", desc: "Modern web dev with React, Node, GraphQL. University of Helsinki", tags: ["Free", "Interactive"] },
        ],
      },
    ],
  },
  {
    category: "Documentation & References",
    subcategories: [
      {
        name: "Reference Material",
        description: "Official docs and knowledge bases",
        resources: [
          { name: "MDN Web Docs", url: "developer.mozilla.org", desc: "The bible of web development", tags: ["Free", "Docs"] },
          { name: "DevDocs.io", url: "devdocs.io", desc: "Offline-capable unified documentation browser", tags: ["Free", "Docs"] },
          { name: "Roadmap.sh", url: "roadmap.sh", desc: "Role-based interactive developer roadmaps", tags: ["Free", "Interactive"] },
          { name: "OSTEP", url: "ostep.org", desc: "Free operating systems textbook", tags: ["Free", "Docs"] },
          { name: "CP-algorithms", url: "cp-algorithms.com", desc: "Competitive programming algorithm reference", tags: ["Free", "Docs"] },
          { name: "nand2tetris", url: "nand2tetris.org", desc: "Build a computer from first principles, free course", tags: ["Free", "Interactive"] },
        ],
      },
    ],
  },
];

// Flatten all resources for search
function getAllResources() {
  const all = [];
  resourceData.forEach((cat) => {
    cat.subcategories.forEach((sub) => {
      sub.resources.forEach((r) => {
        all.push({ ...r, category: cat.category, subcategory: sub.name });
      });
    });
  });
  return all;
}

export default function Resources() {
  const [search, setSearch] = useState("");
  const allResources = useMemo(() => getAllResources(), []);

  const isSearching = search.trim().length > 0;
  const searchLower = search.toLowerCase();

  const filteredResources = useMemo(() => {
    if (!isSearching) return [];
    return allResources.filter(
      (r) =>
        r.name.toLowerCase().includes(searchLower) ||
        r.desc.toLowerCase().includes(searchLower) ||
        r.tags.some((t) => t.toLowerCase().includes(searchLower)) ||
        r.category.toLowerCase().includes(searchLower) ||
        r.subcategory.toLowerCase().includes(searchLower)
    );
  }, [searchLower, isSearching, allResources]);

  const totalCount = allResources.length;

  return (
    <div className="min-h-screen bg-[#08090A] text-white py-16 relative">
      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="mb-10 border-b border-[rgba(255,255,255,0.06)] pb-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#555] mb-4 font-mono">
            RESOURCES
          </p>
          <h1 className="text-3xl font-black tracking-tight text-white mb-3">
            Curated Resources
          </h1>
          <p className="text-[#555] max-w-lg leading-relaxed">
            {totalCount} vetted resources. No filler, no courses you need to pay for.
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-12">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#555]" />
          <Input
            type="text"
            placeholder="Search by name, tag, or category..."
            className="pl-11 h-12 w-full bg-[#111213] border-[rgba(255,255,255,0.06)] text-white focus:border-[rgba(255,255,255,0.12)] focus:bg-[#1A1A1A] transition-all rounded-xl placeholder:text-[#555] text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#555] hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Search Results */}
        {isSearching ? (
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#555] mb-6 font-mono">
              {filteredResources.length} RESULTS
            </p>
            {filteredResources.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredResources.map((r, i) => (
                  <ResourceCard key={`${r.name}-${i}`} resource={r} showMeta />
                ))}
              </div>
            ) : (
              <p className="text-[#555] text-sm">No resources match your search.</p>
            )}
          </div>
        ) : (
          /* Category Browse */
          <div className="space-y-16">
            {resourceData.map((cat) => (
              <section key={cat.category}>
                <div className="flex items-baseline justify-between mb-6 border-b border-[rgba(255,255,255,0.06)] pb-4">
                  <div>
                    <h2 className="text-lg font-bold text-white">{cat.category}</h2>
                    <p className="text-xs text-[#555] mt-1">
                      {cat.subcategories.reduce((sum, s) => sum + s.resources.length, 0)} resources
                    </p>
                  </div>
                </div>

                <div className="space-y-10">
                  {cat.subcategories.map((sub) => (
                    <div key={sub.name}>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-0.5 h-5 bg-[rgba(255,255,255,0.2)] rounded-full" />
                        <div>
                          <h3 className="text-sm font-semibold text-white uppercase tracking-wide">{sub.name}</h3>
                          <p className="text-xs text-[#555]">{sub.description}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {sub.resources.map((r, i) => (
                          <ResourceCard key={`${r.name}-${i}`} resource={r} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ResourceCard({ resource, showMeta }) {
  return (
    <a
      href={`https://${resource.url}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#111213] p-4 transition-all hover:border-[rgba(255,255,255,0.12)] hover:bg-[#1A1A1A]"
    >
      <div className="flex items-start justify-between gap-2 mb-1">
        <p className="font-semibold text-sm text-white group-hover:text-white">{resource.name}</p>
        <ExternalLink className="h-3.5 w-3.5 text-[#333] group-hover:text-[#888] transition-colors shrink-0 mt-0.5" />
      </div>
      <p className="text-[11px] text-[#555] font-mono mb-2 truncate">{resource.url}</p>
      <p className="text-xs text-[#888] leading-relaxed mb-3">{resource.desc}</p>
      <div className="flex flex-wrap gap-1.5">
        {resource.tags.map((tag) => (
          <span key={tag} className="text-[10px] font-medium uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#222] text-[#888] border border-[rgba(255,255,255,0.06)]">
            {tag}
          </span>
        ))}
        {showMeta && (
          <span className="text-[10px] font-medium uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#1A1A1A] text-[#555] border border-[rgba(255,255,255,0.06)]">
            {resource.subcategory}
          </span>
        )}
      </div>
    </a>
  );
}
