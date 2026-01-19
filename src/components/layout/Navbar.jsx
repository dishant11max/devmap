import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Component, Map, Menu, X, LogIn, LogOut, User } from "lucide-react";
import { ThemeToggle } from "../ui/ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signInWithGithub, signOut } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { to: "/languages", label: "Languages" },
    { to: "/til", label: "TIL" },
    { to: "/resources", label: "Resources" },
    { to: "/dashboard", label: "Dashboard" },
    { to: "/about", label: "About" },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

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

          {/* Auth Button (Desktop) */}
          <div className="hidden md:block">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <img
                      src={user.user_metadata.avatar_url}
                      alt={user.email}
                      className="h-8 w-8 rounded-full border border-border"
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user.user_metadata.full_name || "Developer"}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                onClick={signInWithGithub}
                variant="default"
                size="sm"
                className="gap-2"
              >
                <LogIn className="h-4 w-4" />
                <span>Login</span>
              </Button>
            )}
          </div>

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

              <div className="border-t border-border pt-4 mt-2">
                {user ? (
                  <div className="flex items-center justify-between px-2">
                    <div className="flex items-center gap-3">
                      <img
                        src={user.user_metadata.avatar_url}
                        alt={user.email}
                        className="h-8 w-8 rounded-full"
                      />
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">
                          {user.user_metadata.full_name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Logged in
                        </span>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={handleSignOut}>
                      <LogOut className="h-5 w-5" />
                    </Button>
                  </div>
                ) : (
                  <Button onClick={signInWithGithub} className="w-full gap-2">
                    <LogIn className="h-4 w-4" />
                    Login with GitHub
                  </Button>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
