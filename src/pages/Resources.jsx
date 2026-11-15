import { useState, useMemo } from "react";
import { ExternalLink, Search, X } from "lucide-react";
import { Input } from "../components/ui/Input";
import { resourceData, getAllResources } from "../data/resources";

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
    <div className="min-h-screen bg-bg text-text py-16 relative">
      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="mb-10 border-b border-border pb-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted mb-4 font-mono">
            RESOURCES
          </p>
          <h1 className="text-3xl font-black tracking-tight text-text mb-3">
            Curated Resources
          </h1>
          <p className="text-muted max-w-lg leading-relaxed">
            {totalCount} vetted resources. No filler, no courses you need to pay for.
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-12">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
          <Input
            type="text"
            placeholder="Search by name, tag, or category..."
            className="pl-11 h-12 w-full bg-surface border-border text-text focus:border-accent transition-all rounded-xl placeholder:text-muted text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-text transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Search Results */}
        {isSearching ? (
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted mb-6 font-mono">
              {filteredResources.length} RESULTS
            </p>
            {filteredResources.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredResources.map((r, i) => (
                  <ResourceCard key={`${r.name}-${i}`} resource={r} showMeta />
                ))}
              </div>
            ) : (
              <p className="text-muted text-sm">No resources match your search.</p>
            )}
          </div>
        ) : (
          /* Category Browse */
          <div className="space-y-16">
            {resourceData.map((cat) => (
              <section key={cat.category}>
                <div className="flex items-baseline justify-between mb-6 border-b border-border pb-4">
                  <div>
                    <h2 className="text-lg font-bold text-text">{cat.category}</h2>
                    <p className="text-xs text-muted mt-1">
                      {cat.subcategories.reduce((sum, s) => sum + s.resources.length, 0)} resources
                    </p>
                  </div>
                </div>

                <div className="space-y-10">
                  {cat.subcategories.map((sub) => (
                    <div key={sub.name}>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-0.5 h-5 bg-border rounded-full" />
                        <div>
                          <h3 className="text-sm font-semibold text-text uppercase tracking-wide">{sub.name}</h3>
                          <p className="text-xs text-muted">{sub.description}</p>
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
      className="group block rounded-xl border border-border bg-surface p-4 transition-all hover:border-muted hover:bg-surface/80"
    >
      <div className="flex items-start justify-between gap-2 mb-1">
        <p className="font-semibold text-sm text-text group-hover:text-ink">{resource.name}</p>
        <ExternalLink className="h-3.5 w-3.5 text-muted group-hover:text-ink transition-colors shrink-0 mt-0.5" />
      </div>
      <p className="text-[11px] text-muted font-mono mb-2 truncate">{resource.url}</p>
      <p className="text-xs text-muted leading-relaxed mb-3">{resource.desc}</p>
      <div className="flex flex-wrap gap-1.5">
        {resource.tags.map((tag) => (
          <span key={tag} className="text-[10px] font-medium uppercase tracking-wider px-1.5 py-0.5 rounded bg-bg text-muted border border-border">
            {tag}
          </span>
        ))}
        {showMeta && (
          <span className="text-[10px] font-medium uppercase tracking-wider px-1.5 py-0.5 rounded bg-bg text-muted border border-border">
            {resource.subcategory}
          </span>
        )}
      </div>
    </a>
  );
}
