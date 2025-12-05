import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Headphones, Menu, X, LogIn, LogOut, Shield } from "lucide-react";
import { Button } from "./ui/button";
import { useAuth } from "@/hooks/useAuth";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  const handleSignOut = async () => {
    await signOut();
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/90 backdrop-blur-xl border-b border-border/50" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button onClick={() => scrollTo("hero")} className="flex items-center gap-3 group">
            <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <Headphones className="w-6 h-6 text-primary" />
            </div>
            <span className="font-display text-xl tracking-wider hidden sm:block">Audio Producer</span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => scrollTo("about")} className="text-muted-foreground hover:text-primary transition-colors">
              About
            </button>
            <button onClick={() => scrollTo("portfolio")} className="text-muted-foreground hover:text-primary transition-colors">
              Portfolio
            </button>
            <Button onClick={() => scrollTo("contact")} variant="outline" className="border-primary/50 hover:bg-primary/10">
              Get in Touch
            </Button>
            
            {user ? (
              <>
                {isAdmin && (
                  <Button
                    onClick={() => navigate("/admin")}
                    variant="ghost"
                    className="text-primary hover:bg-primary/10"
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    Admin
                  </Button>
                )}
                <Button onClick={handleSignOut} variant="ghost" className="text-muted-foreground hover:text-foreground">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <Button onClick={() => navigate("/auth")} variant="ghost" className="text-muted-foreground hover:text-foreground">
                <LogIn className="w-4 h-4 mr-2" />
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-foreground"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50 animate-fade-in">
            <div className="flex flex-col gap-4">
              <button onClick={() => scrollTo("about")} className="text-muted-foreground hover:text-primary transition-colors py-2">
                About
              </button>
              <button onClick={() => scrollTo("portfolio")} className="text-muted-foreground hover:text-primary transition-colors py-2">
                Portfolio
              </button>
              <Button onClick={() => scrollTo("contact")} className="bg-primary hover:bg-primary/90 text-primary-foreground w-full">
                Get in Touch
              </Button>
              
              {user ? (
                <>
                  {isAdmin && (
                    <Button
                      onClick={() => { navigate("/admin"); setIsMobileMenuOpen(false); }}
                      variant="outline"
                      className="w-full"
                    >
                      <Shield className="w-4 h-4 mr-2" />
                      Admin Dashboard
                    </Button>
                  )}
                  <Button onClick={handleSignOut} variant="ghost" className="w-full">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <Button onClick={() => { navigate("/auth"); setIsMobileMenuOpen(false); }} variant="ghost" className="w-full">
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
