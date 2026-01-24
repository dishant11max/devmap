import { ExternalLink, Youtube, BookOpen, PenTool } from "lucide-react";

const resources = [
  {
    category: "Video Tutorials",
    icon: Youtube,
    items: [
      {
        title: "Telusko",
        url: "https://www.youtube.com/c/Telusko",
        description: "Excellent simplified concepts. Great for Java.",
      },
      {
        title: "Bro Code",
        url: "https://www.youtube.com/c/BroCodez",
        description: "Straightforward, no-nonsense programming tutorials.",
      },
      {
        title: "Chai aur Code",
        url: "https://www.youtube.com/c/ChaiAurCode",
        description: "Deep dive into web dev (Hindi/English).",
      },
      {
        title: "freeCodeCamp",
        url: "https://www.youtube.com/c/Freecodecamp",
        description: "Massive library of full courses.",
      },
      {
        title: "Traversy Media",
        url: "https://www.youtube.com/c/TraversyMedia",
        description: "Project-based web dev tutorials.",
      },
      {
        title: "The Net Ninja",
        url: "https://www.youtube.com/c/TheNetNinja",
        description: "Structured playlists for modern stack.",
      },
      {
        title: "Fireship",
        url: "https://www.youtube.com/c/Fireship",
        description: "High-intensity code explainers.",
      },
    ],
  },
  {
    category: "Documentation & References",
    icon: BookOpen,
    items: [
      {
        title: "MDN Web Docs",
        url: "https://developer.mozilla.org/",
        description: "The bible of web development.",
      },
      {
        title: "DevDocs.io",
        url: "https://devdocs.io/",
        description: "Offline-capable documentation browser.",
      },
      {
        title: "Roadmap.sh",
        url: "https://roadmap.sh/",
        description: "Role-based developer roadmaps.",
      },
    ],
  },
  {
    category: "Practice & Challenges",
    icon: PenTool,
    items: [
      {
        title: "LeetCode",
        url: "https://leetcode.com/",
        description: "Algorithm challenges for interviews.",
      },
      {
        title: "Codewars",
        url: "https://www.codewars.com/",
        description: "Community-created code katas.",
      },
      {
        title: "Frontend Mentor",
        url: "https://www.frontendmentor.io/",
        description: "Real-world frontend challenges.",
      },
    ],
  },
];

export default function Resources() {
  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 py-16 relative">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay fixed"></div>

      <div className="container max-w-5xl mx-auto px-4 relative z-10">
        <div className="mb-16 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white">
            Curated Resources
          </h1>
          <p className="text-zinc-400 mt-4 text-lg max-w-xl mx-auto">
            The best free learning material from around the web.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {resources.map((section) => (
            <div
              key={section.category}
              className="flex flex-col border border-zinc-800 bg-zinc-900/40 backdrop-blur-sm rounded-2xl p-6 hover:border-zinc-600 transition-all"
            >
              <div className="mb-5">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-800 border border-zinc-700">
                  <section.icon className="h-5 w-5 text-zinc-300" />
                </div>
                <h2 className="text-xl font-bold text-white">
                  {section.category}
                </h2>
              </div>
              <ul className="space-y-3 flex-1">
                {section.items.map((item) => (
                  <li key={item.title}>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block rounded-lg border border-zinc-800 bg-zinc-900/50 p-3 transition-all hover:bg-zinc-800 hover:border-zinc-600"
                    >
                      <div className="flex items-center justify-between font-medium text-zinc-200 group-hover:text-white">
                        {item.title}
                        <ExternalLink className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100 text-zinc-400" />
                      </div>
                      <p className="text-xs text-zinc-500 mt-1 group-hover:text-zinc-400">
                        {item.description}
                      </p>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
