import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Menu", path: "/menu" },
  { name: "Book a Table", path: "/book" },
  { name: "About Us", path: "/about" },
  { name: "Gallery", path: "/gallery" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl md:text-3xl font-heading font-bold text-gradient-gold">
              <img
                src="src/assets/logo-navbar.png"
                alt="Barkaas Logo"
                className="h-24 w-24"
              />
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "text-sm font-medium transition-colors duration-300 relative",
                  "after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-gold after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left",
                  location.pathname === link.path
                    ? "text-gold after:scale-x-100"
                    : "text-foreground/80 hover:text-foreground"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button variant="gold" size="sm" asChild>
              <Link to="/book">Reserve Now</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-base font-medium py-2 transition-colors duration-300",
                    location.pathname === link.path
                      ? "text-gold"
                      : "text-foreground/80"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <Button variant="gold" size="sm" className="mt-2" asChild>
                <Link to="/book" onClick={() => setIsOpen(false)}>
                  Reserve Now
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
