import { Link, NavLink } from "react-router-dom";
import { Component, Map } from "lucide-react";
import { ThemeToggle } from "../ui/ThemeToggle";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Map className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg hidden sm:inline-block">
              DevMap
            </span>
          </Link>
        </div>

        <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 transform items-center gap-8 md:flex">
          <NavLink
            to="/languages"
            className={({ isActive }) =>
              isActive
                ? "text-sm font-medium text-primary"
                : "text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            }
          >
            Languages
          </NavLink>
          <NavLink
            to="/resources"
            className={({ isActive }) =>
              isActive
                ? "text-sm font-medium text-primary"
                : "text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            }
          >
            Resources
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? "text-sm font-medium text-primary"
                : "text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "text-sm font-medium text-primary"
                : "text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            }
          >
            About
          </NavLink>
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
