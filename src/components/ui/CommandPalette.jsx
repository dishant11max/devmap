import { useState, useEffect } from "react";
import { Command } from "cmdk";
import { useNavigate } from "react-router-dom";
import { FileText, Map, Settings, Compass, Search, Terminal } from "lucide-react";
import { roadmaps } from "../../data/roadmaps";
import { tilEntries } from "../../data/til";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (command) => {
    setOpen(false);
    command();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] bg-black/60 backdrop-blur-sm px-4">
      <div 
        className="fixed inset-0" 
        onClick={() => setOpen(false)}
      />
      <Command
        className="relative z-50 w-full max-w-2xl overflow-hidden rounded-xl border border-[rgba(255,255,255,0.1)] bg-[#111213] shadow-2xl animate-in fade-in zoom-in-95 duration-200"
        label="Global Command Menu"
      >
        <div className="flex items-center border-b border-[rgba(255,255,255,0.06)] px-4">
          <Search className="h-4 w-4 text-[#555] mr-3" />
          <Command.Input 
            autoFocus
            placeholder="Type a command or search..."
            className="flex h-14 w-full bg-transparent text-white placeholder-[#555] outline-none text-sm"
          />
          <div className="text-[10px] uppercase font-mono text-[#555] border border-[rgba(255,255,255,0.1)] rounded px-1.5 py-0.5 ml-2">ESC</div>
        </div>

        <Command.List className="max-h-[60vh] overflow-y-auto p-2 overscroll-contain no-scrollbar">
          <Command.Empty className="py-12 text-center text-sm text-[#555]">
            No results found.
          </Command.Empty>

          <Command.Group heading="Navigation" className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.2em] [&_[cmdk-group-heading]]:text-[#555]">
            <Command.Item 
              onSelect={() => runCommand(() => navigate('/'))}
              className="flex items-center gap-2 px-3 py-3 text-sm text-white rounded-lg aria-selected:bg-[#1A1A1A] cursor-pointer"
            >
              <Compass className="h-4 w-4 text-[#888]" />
              <span>Home</span>
            </Command.Item>
            <Command.Item 
              onSelect={() => runCommand(() => navigate('/languages'))}
              className="flex items-center gap-2 px-3 py-3 text-sm text-white rounded-lg aria-selected:bg-[#1A1A1A] cursor-pointer"
            >
              <Terminal className="h-4 w-4 text-[#888]" />
              <span>Languages</span>
            </Command.Item>
            <Command.Item 
              onSelect={() => runCommand(() => navigate('/cs-core'))}
              className="flex items-center gap-2 px-3 py-3 text-sm text-white rounded-lg aria-selected:bg-[#1A1A1A] cursor-pointer"
            >
              <Map className="h-4 w-4 text-[#888]" />
              <span>CS Core</span>
            </Command.Item>
            <Command.Item 
              onSelect={() => runCommand(() => navigate('/resources'))}
              className="flex items-center gap-2 px-3 py-3 text-sm text-white rounded-lg aria-selected:bg-[#1A1A1A] cursor-pointer"
            >
              <FileText className="h-4 w-4 text-[#888]" />
              <span>Resources</span>
            </Command.Item>
            <Command.Item 
              onSelect={() => runCommand(() => navigate('/dashboard'))}
              className="flex items-center gap-2 px-3 py-3 text-sm text-white rounded-lg aria-selected:bg-[#1A1A1A] cursor-pointer"
            >
              <Settings className="h-4 w-4 text-[#888]" />
              <span>Dashboard</span>
            </Command.Item>
          </Command.Group>

          <Command.Separator className="h-px bg-[rgba(255,255,255,0.06)] my-1" />

          <Command.Group heading="Roadmaps" className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.2em] [&_[cmdk-group-heading]]:text-[#555]">
            {Object.entries(roadmaps).map(([id, rm]) => (
              <Command.Item
                key={`roadmap-${id}`}
                value={`roadmap ${rm.displayName || id}`}
                onSelect={() => runCommand(() => navigate(`/roadmap/${id}`))}
                className="flex items-center gap-2 px-3 py-3 text-sm text-white rounded-lg aria-selected:bg-[#1A1A1A] cursor-pointer group"
              >
                <div className="flex h-5 w-5 items-center justify-center rounded border border-[rgba(255,255,255,0.06)] bg-[#222] text-[9px] font-bold uppercase text-[#888] group-aria-selected:text-white">
                  {rm.abbreviation || id.substring(0, 2)}
                </div>
                <span>{rm.displayName || id} Roadmap</span>
              </Command.Item>
            ))}
          </Command.Group>

          <Command.Separator className="h-px bg-[rgba(255,255,255,0.06)] my-1" />

          <Command.Group heading="Today I Learned" className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.2em] [&_[cmdk-group-heading]]:text-[#555]">
            {tilEntries.map((til) => (
              <Command.Item
                key={til.id}
                value={`til ${til.title} ${til.tags.join(" ")}`}
                onSelect={() => runCommand(() => navigate('/til'))}
                className="flex flex-col items-start px-3 py-3 text-sm text-white rounded-lg aria-selected:bg-[#1A1A1A] cursor-pointer"
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="font-medium text-white">{til.title}</span>
                  <span className="text-[10px] text-[#555] uppercase tracking-wider">{til.category}</span>
                </div>
                <span className="text-xs text-[#888] line-clamp-1">{til.content}</span>
              </Command.Item>
            ))}
          </Command.Group>
        </Command.List>
      </Command>
    </div>
  );
}
