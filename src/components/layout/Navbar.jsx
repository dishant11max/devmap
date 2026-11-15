import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, LogIn, LogOut, LayoutDashboard, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
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
  const [scrolled, setScrolled] = useState(false);
  const { user, signInWithGithub, signOut } = useAuth();
  const navigate = useNavigate();

  // Scroll listener for sticky solid background after 24px
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scrolling when mobile full-screen menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const navLinks = [
    { to: "/languages", label: "Languages" },
    { to: "/cs-core", label: "CS Core" },
    { to: "/til", label: "TIL" },
    { to: "/resources", label: "Resources" },
    { to: "/dashboard", label: "Dashboard" },
    { to: "/about", label: "About" },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const openCommandPalette = () => {
    document.dispatchEvent(
      new KeyboardEvent("keydown", { key: "k", metaKey: true, bubbles: true })
    );
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-colors duration-150 ${
        scrolled
          ? "bg-bg border-b border-border"
          : "bg-transparent border-b-0"
      }`}
    >
      <div className="w-full max-w-[1440px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* Wordmark */}
        <div className="flex items-center">
          <Link
            to="/"
            className="font-mono text-base font-bold tracking-tight text-text hover:text-ink transition-colors uppercase"
          >
            DEVMAP
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6">
          <nav className="flex items-center gap-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `relative font-mono text-[14px] tracking-wide transition-colors ${
                    isActive
                      ? "text-text font-medium after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-[1px] after:bg-accent"
                      : "text-muted hover:text-text"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Search Pill */}
          <button
            type="button"
            onClick={openCommandPalette}
            className="flex items-center gap-2 h-8 px-2.5 rounded-[2px] border border-border bg-surface text-muted text-xs font-mono hover:border-muted hover:text-text transition-all cursor-pointer"
            aria-label="Open command palette"
          >
            <Search className="h-3 w-3" />
            <span className="text-[12px]">Search</span>
            <kbd className="text-[10px] bg-bg border border-border px-1 py-0.5 rounded-[2px]">
              ⌘K
            </kbd>
          </button>

          {/* User Chip */}
          <div className="flex items-center">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="flex items-center gap-2 h-8 px-2.5 rounded-[2px] border border-border bg-surface text-text font-mono text-xs hover:border-muted hover:text-ink transition-all cursor-pointer outline-none"
                  >
                    {user.user_metadata?.avatar_url ? (
                      <img
                        src={user.user_metadata.avatar_url}
                        alt={user.user_metadata?.full_name || "User"}
                        className="h-4 w-4 rounded-[2px] object-cover"
                      />
                    ) : (
                      <span className="h-4 w-4 rounded-[2px] bg-border flex items-center justify-center text-[10px] font-bold">
                        {(user.email?.[0] || "U").toUpperCase()}
                      </span>
                    )}
                    <span className="max-w-[110px] truncate text-xs">
                      {user.user_metadata?.user_name ||
                        user.user_metadata?.full_name ||
                        user.email?.split("@")[0]}
                    </span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56 rounded-[2px] border border-border bg-surface p-1 font-mono text-xs shadow-xl"
                  align="end"
                  forceMount
                >
                  <DropdownMenuLabel className="font-normal px-2 py-2">
                    <div className="flex flex-col space-y-1">
                      <p className="text-xs font-semibold text-text leading-none truncate">
                        {user.user_metadata?.full_name || "Developer"}
                      </p>
                      <p className="text-[11px] leading-none text-muted truncate">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-border" />
                  <DropdownMenuItem
                    onClick={() => navigate("/dashboard")}
                    className="cursor-pointer text-muted hover:text-text hover:bg-border/60 rounded-[2px] px-2 py-1.5 flex items-center gap-2"
                  >
                    <LayoutDashboard className="h-3.5 w-3.5" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleSignOut}
                    className="cursor-pointer text-muted hover:text-text hover:bg-border/60 rounded-[2px] px-2 py-1.5 flex items-center gap-2"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <button
                type="button"
                onClick={signInWithGithub}
                className="flex items-center gap-1.5 h-8 px-3 rounded-[2px] border border-border bg-surface text-text font-mono text-xs hover:border-accent hover:text-ink transition-all cursor-pointer"
              >
                <LogIn className="h-3.5 w-3.5" />
                <span>Sign in</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            type="button"
            onClick={openCommandPalette}
            className="p-1.5 rounded-[2px] border border-border text-muted hover:text-text"
            aria-label="Open search"
          >
            <Search className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="p-1.5 rounded-[2px] border border-border text-muted hover:text-text"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Full-Screen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 lg:hidden bg-bg flex flex-col justify-between p-6"
          >
            <div>
              <div className="flex items-center justify-between border-b border-border pb-4 mb-6">
                <span className="font-mono text-base font-bold uppercase tracking-tight text-text">
                  DEVMAP
                </span>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-[2px] border border-border text-muted hover:text-text"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="flex flex-col gap-4 font-mono">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `text-base py-2 border-b border-border/60 tracking-wide transition-colors ${
                        isActive
                          ? "text-accent font-semibold"
                          : "text-muted hover:text-text"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </nav>
            </div>

            <div className="border-t border-border pt-6 flex flex-col gap-4 font-mono">
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  openCommandPalette();
                }}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-[2px] border border-border bg-surface text-muted text-xs"
              >
                <span className="flex items-center gap-2">
                  <Search className="h-4 w-4" /> Search command palette
                </span>
                <kbd className="text-[10px] border border-border px-1.5 py-0.5 rounded-[2px]">
                  ⌘K
                </kbd>
              </button>

              {user ? (
                <div className="flex items-center justify-between px-2 py-1">
                  <div className="flex items-center gap-3">
                    {user.user_metadata?.avatar_url && (
                      <img
                        src={user.user_metadata.avatar_url}
                        alt="Avatar"
                        className="h-8 w-8 rounded-[2px] object-cover"
                      />
                    )}
                    <div>
                      <p className="text-xs font-semibold text-text">
                        {user.user_metadata?.full_name || "Developer"}
                      </p>
                      <p className="text-[10px] text-muted truncate max-w-[180px]">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      handleSignOut();
                    }}
                    className="p-2 border border-border rounded-[2px] text-muted hover:text-text"
                    title="Sign out"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    signInWithGithub();
                  }}
                  className="w-full py-2.5 rounded-[2px] border border-accent bg-accent text-on-accent text-xs font-mono font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2"
                >
                  <LogIn className="h-4 w-4" />
                  Sign in with GitHub
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
