import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Component, Map, Menu, X } from "lucide-react";
import { ThemeToggle } from "../ui/ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { to: "/languages", label: "Languages" },
    { to: "/resources", label: "Resources" },
    { to: "/dashboard", label: "Dashboard" },
    { to: "/about", label: "About" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container relative flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Map className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg hidden sm:inline-block">
              DevMap
            </span>
          </Link>
        </div>

        {/* Desktop Navigation - Centered */}
        <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 transform items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                isActive
                  ? "text-sm font-medium text-primary"
                  : "text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMenu}
            className="flex items-center justify-center p-2 rounded-md md:hidden hover:bg-accent hover:text-accent-foreground"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-b border-border bg-background"
          >
            <nav className="container flex flex-col gap-4 py-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center text-sm font-bold text-primary px-2 py-1.5 rounded-md bg-accent/50"
                      : "flex items-center text-sm font-medium text-muted-foreground px-2 py-1.5 rounded-md transition-colors hover:text-primary hover:bg-accent/30"
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
