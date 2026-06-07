import React, { useEffect, useState, useRef } from 'react';
import { Menu } from 'lucide-react';
import { useTheme } from 'next-themes';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const { setTheme } = useTheme();

  // Avoid hydration mismatch by only rendering once mounted on client
  useEffect(() => {
    setTheme('dark'); // Force dark theme
  }, [setTheme]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
      setActiveSection(sectionId);
    }
  };

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'Projects', id: 'projects' },
    { label: 'Experience', id: 'experience' },
    { label: 'Certificates', id: 'certificates' },
    { label: 'About Me', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'My Work', id: 'work' },
    { label: 'Achievements', id: 'achievements' },
    { label: 'Journey', id: 'journey' },
  ];

  // Scroll spy to track active section in viewport
  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = ['home', 'projects', 'experience', 'certificates', 'about', 'skills', 'work', 'achievements', 'journey', 'contact'];
      let currentSection = 'home';
      
      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the top of the section is near or above the navbar
          if (rect.top <= 140 && rect.bottom >= 140) {
            currentSection = id;
            break;
          }
        }
      }

      // Check if we are at the very bottom of the page
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50) {
        currentSection = 'contact';
      }

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initialize on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update sliding bar indicator coordinates
  useEffect(() => {
    const updateIndicator = () => {
      const container = containerRef.current;
      if (!container) return;
      const activeButton = container.querySelector(`[data-section="${activeSection}"]`) as HTMLButtonElement;
      if (activeButton) {
        setIndicatorStyle({
          left: activeButton.offsetLeft,
          width: activeButton.offsetWidth,
        });
      } else {
        // Hide indicator if no match found
        setIndicatorStyle({ left: 0, width: 0 });
      }
    };

    // Delay slightly to ensure layout and rendering are fully completed
    const timer = setTimeout(updateIndicator, 50);

    window.addEventListener('resize', updateIndicator);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateIndicator);
    };
  }, [activeSection]);

  return (
    <>
      {/* Top-left corner PS logo (text only, yellow & purple mix text gradient) */}
      <div className="fixed top-6 left-6 md:left-10 z-50 select-none">
        <span className="bg-gradient-to-r from-amber-400 via-fuchsia-500 to-purple-600 bg-clip-text text-transparent font-extrabold text-[24px] tracking-wider text-glow-primary hover:scale-105 transition-transform duration-300 block">
          PS
        </span>
      </div>

      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-40 w-fit max-w-[95%] rounded-full glass-navbar shadow-lg border border-white/5 hover:border-white/10 transition-all duration-300">
        <div className="px-5 py-2 flex items-center justify-center">
          
          <nav className="hidden lg:flex items-center gap-4 relative" ref={containerRef}>
            {navItems.map((item) => (
              <button
                key={item.id}
                data-section={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`transition-all text-[11px] font-bold tracking-wider uppercase py-1 px-1 relative z-10 ${
                  activeSection === item.id 
                    ? 'text-white text-glow-primary' 
                    : 'text-foreground/70 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              data-section="contact"
              onClick={() => scrollToSection('contact')}
              className="px-4 py-1.5 tech-gradient text-white rounded-full hover:opacity-90 transition-all text-[11px] font-bold tracking-wider uppercase relative z-10"
            >
              Stay Connected
            </button>

            {/* The sliding mixed color bar */}
            <div 
              className="absolute bottom-[-4px] h-[3px] bg-gradient-to-r from-amber-400 via-fuchsia-500 to-purple-600 rounded-full transition-all duration-300 ease-out pointer-events-none"
              style={{
                left: `${indicatorStyle.left}px`,
                width: `${indicatorStyle.width}px`
              }}
            />
          </nav>

          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-1 text-foreground hover:text-primary transition-colors"
              aria-label="Toggle menu"
            >
              <Menu size={18} />
            </button>
          </div>

          {isMenuOpen && (
            <div className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 w-[240px] glass-navbar rounded-2xl p-2.5 lg:hidden border border-white/10 shadow-2xl">
              <nav className="flex flex-col space-y-1.5">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="text-center text-foreground/80 hover:text-white hover:bg-white/5 rounded-lg transition-colors py-2 text-[11px] font-bold tracking-wider uppercase"
                  >
                    {item.label}
                  </button>
                ))}
                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-center px-4 py-2 tech-gradient text-white rounded-xl hover:opacity-90 transition-all text-[11px] font-bold tracking-wider uppercase w-full"
                >
                  Stay Connected
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;