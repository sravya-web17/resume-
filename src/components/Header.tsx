import React, { useEffect, useState } from 'react';
import { Menu, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by only rendering once mounted on client
  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const ThemeToggle = () => (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-secondary/20 hover:bg-secondary/30 transition-colors text-foreground"
      aria-label="Toggle dark mode"
    >
      {mounted && (theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />)}
    </button>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-40 glass-card border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full tech-gradient flex items-center justify-center text-white font-bold text-lg logo-glow">
            PS
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Pallesi Sravya</h1>
            <p className="text-sm text-muted-foreground">Digital Marketing • Content Creator</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          {['about', 'education', 'experience', 'skills', 'projects'].map((section) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className="text-foreground hover:text-primary transition-colors capitalize"
            >
              {section}
            </button>
          ))}
          <ThemeToggle />
          <button
            onClick={() => scrollToSection('contact')}
            className="px-4 py-2 tech-gradient text-white rounded-lg hover:opacity-90 transition-all"
          >
            Contact
          </button>
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-foreground hover:text-primary"
          >
            <Menu size={24} />
          </button>
        </div>

        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 glass-card border-t border-white/10 md:hidden">
            <nav className="flex flex-col p-4 space-y-3">
              {['about', 'education', 'experience', 'skills', 'projects'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="text-left text-foreground hover:text-primary transition-colors py-2 capitalize"
                >
                  {section}
                </button>
              ))}
              <button
                onClick={() => scrollToSection('contact')}
                className="text-left px-4 py-2 tech-gradient text-white rounded-lg hover:opacity-90 transition-all"
              >
                Contact
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;