import { ExternalLink, Youtube, BookOpen, PenTool } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../components/ui/Card";

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
    category: "Documentation & references",
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
    <div className="container max-w-5xl py-12 mx-auto">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Curated Resources</h1>
        <p className="text-muted-foreground mt-4 text-lg">
          The best free learning material from around the web.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {resources.map((section) => (
          <Card key={section.category} className="flex flex-col">
            <CardHeader>
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <section.icon className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-xl">{section.category}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-4">
                {section.items.map((item) => (
                  <li key={item.title}>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block rounded-md border p-3 transition-colors hover:bg-accent hover:border-accent-foreground/50"
                    >
                      <div className="flex items-center justify-between font-medium group-hover:text-accent-foreground">
                        {item.title}
                        <ExternalLink className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {item.description}
                      </p>
                    </a>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
