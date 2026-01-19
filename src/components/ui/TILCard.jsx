import { Calendar, Tag } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./Card";

export function TILCard({ entry, onClick }) {
  return (
    <Card
      onClick={onClick}
      className="h-full border-border/40 bg-card/30 backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-card/50 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5 cursor-pointer group"
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2 font-mono">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3 w-3" />
            <span>{entry.date}</span>
          </div>
          <span className="uppercase tracking-widest text-[10px] font-semibold border border-border px-1.5 py-0.5 rounded-sm">
            {entry.category}
          </span>
        </div>
        <CardTitle className="text-lg font-bold leading-tight group-hover:text-primary transition-colors">
          {entry.title}
        </CardTitle>
      </CardHeader>

      <CardContent>
        {/* We limit the content text here to keep the card size uniform */}
        <div className="prose prose-sm dark:prose-invert text-muted-foreground line-clamp-3 text-sm leading-relaxed whitespace-pre-line font-sans">
          {entry.content}
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {entry.tags.map((tag) => (
            <div
              key={tag}
              className="inline-flex items-center gap-1 rounded-sm bg-secondary/30 px-2 py-1 text-[10px] font-mono font-medium text-secondary-foreground ring-1 ring-inset ring-white/5 transition-colors hover:bg-secondary/50"
            >
              <Tag className="h-2.5 w-2.5 opacity-50" />
              {tag}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
