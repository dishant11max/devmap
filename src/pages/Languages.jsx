import { useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { languages } from "../data/languages";
import { Input } from "../components/ui/Input";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../components/ui/Card";

export default function Languages() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...new Set(languages.map((l) => l.category))];

  const filteredLanguages = languages.filter((lang) => {
    const matchesSearch = lang.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || lang.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container py-10">
      <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Languages</h1>
          <p className="text-muted-foreground">
            Explore our curated learning paths.
          </p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search languages..."
            className="pl-10 h-11 rounded-full bg-secondary/50 border-transparent focus:bg-background transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="mb-10 flex flex-nowrap overflow-x-auto pb-4 gap-2 no-scrollbar md:flex-wrap">
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={selectedCategory === cat ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(cat)}
            className="rounded-full flex-shrink-0"
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredLanguages.map((lang) => (
          <Link
            key={lang.id}
            to={`/roadmap/${lang.id}`}
            className="group h-full"
          >
            <Card className="flex h-full flex-col border-muted-foreground/10 bg-background/50 transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <Badge
                    variant="secondary"
                    className="mb-2 bg-secondary/50 text-muted-foreground"
                  >
                    {lang.category}
                  </Badge>
                  <div className="h-8 w-8 rounded-lg bg-primary/5 flex items-center justify-center text-xs font-bold text-primary">
                    {lang.name.substring(0, 2)}
                  </div>
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {lang.name}
                </CardTitle>
                <CardDescription className="line-clamp-2 min-h-[2.5rem]">
                  {lang.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary/50"></span>
                    {lang.steps} Steps
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary/50"></span>
                    {lang.estimatedTime}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <div className="w-full h-1 bg-secondary rounded-full overflow-hidden mt-2">
                  <div className="h-full bg-primary/20 w-0 group-hover:w-full transition-all duration-500"></div>
                </div>
              </CardFooter>
            </Card>
          </Link>
        ))}

        {filteredLanguages.length === 0 && (
          <div className="col-span-full py-12 text-center">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4">
              <Search className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium">No results found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
