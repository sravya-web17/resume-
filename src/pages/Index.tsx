import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, MessageSquareCode, SearchCode, Home, CreditCard, Leaf, 
  Stethoscope, MapPin, Sprout, TrendingUp, ShieldAlert, Activity,
  Award, GraduationCap, Briefcase, Code2, ExternalLink, 
  Github, Linkedin, Mail, FileText, CheckCircle2, Terminal,
  Sparkles, MapPin as MapPinIcon, Calendar, CheckSquare, ChevronDown,
  Send
} from 'lucide-react';
import LoadingScreen from '@/components/LoadingScreen';
import Header from '@/components/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import sravyaIllustration from '@/assets/sravya_illustration.png';
import sravyaProfile from '@/assets/sravya-photo.jpeg';
import kecNavigationImage from '@/assets/kec_indoor_navigation.png';
import waterLevelImage from '@/assets/kec_water_level_monitor.png';
import glowAiImage from '@/assets/kec_glow_ai.png';
import sampleBrand from '@/assets/sample-brand.jpg';
import sampleInstagram from '@/assets/sample-instagram.jpg';
import sampleService from '@/assets/sample-service.jpg';
import sampleWebinar from '@/assets/sample-webinar.jpg';

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const targets = entry.target.querySelectorAll('.scroll-fade-up, .scroll-fade-left, .scroll-fade-right, .scroll-scale-in');
            targets.forEach((t) => t.classList.add('scroll-visible'));
            entry.target.classList.add('scroll-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useScrollReveal();
  return <div ref={ref} className={className}>{children}</div>;
}

const Typewriter = () => {
  const words = ["ECE Graduate", "Data Analyst", "Product Manager"];
  const [currentWordIdx, setCurrentWordIdx] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: any;
    const activeWord = words[currentWordIdx];
    
    if (isDeleting) {
      timer = setTimeout(() => {
        setCurrentText(activeWord.substring(0, currentText.length - 1));
      }, 40);
    } else {
      timer = setTimeout(() => {
        setCurrentText(activeWord.substring(0, currentText.length + 1));
      }, 100);
    }

    if (!isDeleting && currentText === activeWord) {
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setCurrentWordIdx((prev) => (prev + 1) % words.length);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIdx]);

  return (
    <div className="absolute left-0 right-0 top-full mt-2 sm:mt-3 md:mt-4 flex items-center justify-center min-h-[24px] z-20">
      <span className="font-mono text-[10px] sm:text-xs md:text-sm tracking-[0.25em] font-bold uppercase text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-fuchsia-500 to-purple-600 drop-shadow-[0_0_8px_rgba(234,179,8,0.25)] select-none">
        {currentText}
      </span>
      <span className="w-[2px] h-3 sm:h-3.5 bg-fuchsia-500 ml-1 animate-pulse" />
    </div>
  );
};

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'error' | 'success'>('idle');

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
      return;
    }
    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    );
    window.location.href = `mailto:sravssravyachinni@gmail.com?subject=${subject}&body=${body}`;
    setStatus('success');
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setStatus('idle'), 4000);
  };

  if (loading) {
    return <LoadingScreen onComplete={() => setLoading(false)} />;
  }

  const projects = [
    {
      title: "Glow AI",
      description: "An AI-powered luxury beauty assistant suggesting personalized skincare and cosmetics recommendations.",
      tech: ["React", "TypeScript", "Google AI Studio", "Vite", "Tailwind CSS"],
      icon: Sparkles,
      color: "from-amber-600/20 to-orange-900/20 border-amber-500/20",
      keyPoints: [
        "Google AI Studio API integration for interactive luxury beauty consultancies.",
        "Sleek and responsive user interface built using React, TypeScript, and Vite.",
        "Custom beauty profile recommendation logic and automated AI skincare chat."
      ],
      github: "https://github.com/uday0438/glow-AI",
      image: glowAiImage
    },
    {
      title: "Indoor Campus Navigation",
      description: "An AI-powered, sensor-driven wayfinding application designed to solve GPS blind-spots for KEC campus.",
      tech: ["React Native", "Node.js", "MongoDB", "Socket.io"],
      icon: MapPin,
      color: "from-purple-600/20 to-violet-900/20 border-purple-500/20",
      keyPoints: [
        "Sensor Fusion Navigation: Uses phone gyroscopes, accelerometers, and magnetometers for PDR tracking.",
        "Dijkstra's Algorithm: Custom spatial graph routing through halls, stairways, and elevators.",
        "Multi-lingual voice guidance in 5 languages with interactive, multi-floor offline SVG mapping."
      ],
      github: "https://github.com/uday0438/Indoor_Navigation",
      image: kecNavigationImage
    },
    {
      title: "Water Level Monitor",
      description: "A C++ microcontroller-based IoT system to monitor tank levels in real time and prevent overflows.",
      tech: ["Arduino Uno", "C++", "Ultrasonic Sensor", "I2C LCD", "Hardware"],
      icon: Activity,
      color: "from-teal-600/20 to-emerald-900/20 border-teal-500/20",
      keyPoints: [
        "Ultrasonic distance detection: Real-time calculation and percentage tracking of tank levels.",
        "LCD status output & buzzer alarm system triggered at critical 80% threshold.",
        "Custom C++ noise filtering and sensor signal calibration for high measurement accuracy."
      ],
      github: "https://github.com/uday0438/water-level-monitor-ultrasonic",
      image: waterLevelImage
    }
  ];

  const certificates = [
    {
      name: "Computer Architecture",
      details: "NPTEL • Jul-Oct 2024",
      link: "https://nptel.ac.in"
    },
    {
      name: "Introduction to Internet of Things",
      details: "NPTEL • Jul-Oct 2025",
      link: "https://nptel.ac.in"
    }
  ];



  const achievements = [
    { title: "Smart India Hackathon Winner", details: "Won the Smart India Hackathon (SIH) 2026 for IoT solution.", color: "bg-amber-500/10 border-amber-500/30 text-amber-400" },
    { title: "Abacus State Rank Holder", details: "Achieved top state ranking in mental arithmetic competitions.", color: "bg-purple-500/10 border-purple-500/30 text-purple-400" },
    { title: "Technical Presentation Winner", details: "Won first prize for presenting an IoT Smart Agriculture model.", color: "bg-cyan-500/10 border-cyan-500/30 text-cyan-400" }
  ];



  return (
    <div className="min-h-screen bg-[#030209] text-foreground relative pb-20">
      {/* Starry background layer */}
      <div className="stars-bg" />

      {/* Floating Nebula Highlights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-[35%] right-[10%] w-[500px] h-[500px] rounded-full bg-amber-500/[0.04] blur-[130px] pointer-events-none z-0" />
      <div className="absolute top-[60%] left-[8%] w-[550px] h-[550px] rounded-full bg-yellow-500/[0.03] blur-[140px] pointer-events-none z-0" />
      <div className="absolute top-3/4 left-1/3 w-[500px] h-[500px] rounded-full bg-secondary/5 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[8%] right-[15%] w-[450px] h-[450px] rounded-full bg-amber-400/[0.04] blur-[120px] pointer-events-none z-0" />

      <Header />
      
      <main className="relative z-10 pt-28 w-full max-w-[94%] xl:max-w-[1280px] 2xl:max-w-[1440px] mx-auto px-4 sm:px-6">
        
        {/* HERO SECTION */}
        <section id="home" className="min-h-[calc(100vh-112px)] flex flex-col justify-center items-center relative py-12 scroll-mt-28">
          <div className="flex items-center justify-center z-10 flex-1 w-full max-w-[94%] xl:max-w-[1280px] 2xl:max-w-[1440px] mx-auto px-4 -mt-16 sm:-mt-24">
            <div className="relative inline-block select-none">
              {/* Centered Name */}
              <h1 className="font-serif-display text-[52px] xs:text-[68px] sm:text-[120px] md:text-[170px] lg:text-[220px] xl:text-[254px] font-bold tracking-tight text-white leading-none text-glow-white relative z-20 pr-2">
                Sravya
              </h1>

              {/* Typewriter subtitle under Sravya name */}
              <Typewriter />

              {/* Right side: Illustration Image absolute positioned beside letter 'a' */}
              <div className="absolute bottom-0 left-[63%] w-[120px] xs:w-[150px] sm:w-[270px] md:w-[360px] lg:w-[460px] xl:w-[520px] aspect-[3/2] z-10 pb-1 xs:pb-1.5 sm:pb-4 md:pb-6 pointer-events-none group hover:scale-[1.03] transition-all duration-500 transform origin-bottom-left">
                <img 
                  src={sravyaIllustration} 
                  alt="Sravya Illustration" 
                  className="w-full h-full object-contain filter drop-shadow-[0_15px_20px_rgba(138,43,226,0.35)] transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          </div>

          <button 
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 flex items-center justify-center text-white hover:text-primary transition-all duration-300 animate-bounce cursor-pointer group z-10"
            aria-label="Scroll down"
          >
            <ChevronDown className="w-6 h-6 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </section>

        {/* PROJECTS SECTION */}
        <AnimatedSection>
          <section id="projects" className="py-20 border-t border-white/5 scroll-mt-24">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4 text-white font-serif-display tracking-wide text-glow-primary">PROJECTS</h2>
              <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
                Core portfolio projects featuring advanced AI integrations, sensor-driven navigation systems, and IoT hardware.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => {
                const ProjectIcon = project.icon;
                return (
                  <Card key={index} className={`glass-card hover-lift border border-white/10 relative overflow-hidden flex flex-col justify-between scroll-fade-up`}>
                    <div className={`absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r ${project.color.includes('red') ? 'from-red-500 to-pink-500' : project.color.includes('amber') ? 'from-amber-500 to-orange-500' : project.color.includes('blue') ? 'from-blue-500 to-indigo-500' : project.color.includes('teal') ? 'from-teal-500 to-emerald-500' : project.color.includes('purple') ? 'from-purple-500 to-violet-500' : project.color.includes('emerald') ? 'from-emerald-500 to-green-500' : project.color.includes('cyan') ? 'from-cyan-500 to-sky-500' : project.color.includes('rose') ? 'from-rose-500 to-pink-500' : project.color.includes('sprout') || project.color.includes('green') ? 'from-green-500 to-emerald-500' : project.color.includes('violet') ? 'from-violet-500 to-fuchsia-500' : project.color.includes('indigo') ? 'from-indigo-500 to-blue-500' : 'from-pink-500 to-rose-500'}`} />
                    
                    <CardContent className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center border`}>
                              <ProjectIcon className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="text-lg md:text-xl font-bold text-white tracking-wide">{project.title}</h3>
                          </div>
                          <a 
                            href={project.github} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="text-muted-foreground hover:text-white transition-colors"
                          >
                            <Github className="w-5.5 h-5.5" />
                          </a>
                        </div>
                        
                        <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                          {project.description}
                        </p>

                        {project.image && (
                          <div className="mb-5 w-full aspect-[2.4/1] rounded-xl overflow-hidden border border-white/10 relative group/img shadow-md">
                            <img 
                              src={project.image} 
                              alt={project.title} 
                              className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 pointer-events-none" />
                          </div>
                        )}
 
                        <div className="mb-6">
                          <h4 className="text-xs tracking-wider uppercase font-bold text-primary mb-2.5">Key Highlights:</h4>
                          <ul className="space-y-2 pl-4 list-disc text-xs text-muted-foreground leading-relaxed">
                            {project.keyPoints.map((point, pIdx) => (
                              <li key={pIdx}>{point}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
 
                      <div className="flex flex-wrap gap-1.5 mt-auto">
                        {project.tech.map((tag, tagIdx) => (
                          <Badge key={tagIdx} variant="secondary" className="bg-white/5 hover:bg-white/10 text-[10px] md:text-xs font-semibold text-white/80 py-1 px-2.5 rounded-md border border-white/5">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>
        </AnimatedSection>

        {/* EXPERIENCE SECTION */}
        <AnimatedSection>
          <section id="experience" className="py-20 border-t border-white/5 scroll-mt-24">
            <div className="text-center mb-16">
              <span className="text-[10px] uppercase tracking-widest text-primary font-bold">Work History</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4 text-white font-serif-display tracking-wide text-glow-primary">EXPERIENCE</h2>
              <p className="text-muted-foreground max-w-xl mx-auto text-sm">
                Professional experience through developer internships and technical coordination roles.
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-8">
              {[
                {
                  role: "INTERN",
                  company: "Aaviza Electronics",
                  period: "Dec 2025 - Mar 2026",
                  subtitle: "Wiring Harness & Electromechanical Assemblies",
                  points: [
                    "Gained hands-on experience in wiring harness assembly, cable routing, and electromechanical integration for industrial electronic systems.",
                    "Performed assembly testing, continuity checks, and quality inspection while ensuring compliance with industrial safety standards.",
                    "Developed practical knowledge in electrical and electronic components, production workflows, and troubleshooting methodologies."
                  ]
                }
              ].map((exp, index) => (
                <div key={index} className="py-6 flex flex-col md:flex-row md:items-start gap-6 text-left border-b border-white/5 last:border-b-0">
                  <div className="flex-shrink-0 flex items-center md:items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 text-white">
                      <Briefcase className="w-5 h-5 text-primary" />
                    </div>
                    <div className="md:hidden">
                      <h3 className="text-lg font-bold text-white tracking-wide">{exp.role}</h3>
                      <p className="text-sm text-primary font-semibold">{exp.company}</p>
                      {exp.subtitle && <p className="text-xs text-muted-foreground font-semibold mt-0.5">{exp.subtitle}</p>}
                    </div>
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <div className="hidden md:flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold text-white tracking-wide">{exp.role}</h3>
                        <p className="text-sm text-primary font-semibold mt-1">{exp.company}</p>
                        {exp.subtitle && <p className="text-xs text-muted-foreground font-semibold mt-1">{exp.subtitle}</p>}
                      </div>
                      <span className={`text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full border bg-white/5`}>
                        {exp.period}
                      </span>
                    </div>

                    <div className="md:hidden flex justify-between items-center">
                      <span className={`text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full border bg-white/5`}>
                        {exp.period}
                      </span>
                    </div>

                    <ul className="space-y-2.5 pl-4 list-disc text-sm text-muted-foreground leading-relaxed">
                      {exp.points.map((pt, pIdx) => (
                        <li key={pIdx}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </AnimatedSection>

        {/* CERTIFICATES SECTION */}
        <AnimatedSection>
          <section id="certificates" className="py-20 border-t border-white/5 scroll-mt-24">
            <div className="text-center mb-16">
              <span className="text-[10px] uppercase tracking-widest text-primary font-bold">Credentials</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4 text-white font-serif-display tracking-wide">CERTIFICATES</h2>
              <p className="text-muted-foreground max-w-xl mx-auto text-sm">
                Certified knowledge validation across software paradigms, programming languages, and databases.
              </p>
            </div>

            {certificates.length > 0 ? (
              <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                {certificates.map((cert, index) => (
                  <div key={index} className={`glass-card py-6 px-7 rounded-2xl border border-white/5 hover:border-white/10 hover-lift flex items-center gap-5.5 text-left scroll-fade-up stagger-${Math.min((index % 3) + 1, 9)} shadow-md`}>
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 border border-primary/20">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h3 className="text-base font-bold text-white tracking-wide leading-snug">{cert.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{cert.details}</p>
                      {cert.link && (
                        <a 
                          href={cert.link} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="text-xs text-primary hover:text-primary-glow font-bold flex items-center gap-1 transition-colors mt-2.5 w-fit"
                        >
                          View Certificate
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-muted-foreground text-sm max-w-md mx-auto">
                  Certificates are currently being verified and updated. Please check back soon!
                </p>
              </div>
            )}
          </section>
        </AnimatedSection>

        {/* ABOUT ME SECTION */}
        <AnimatedSection>
          <section id="about" className="py-20 border-t border-white/5 scroll-mt-24">
            <div className="text-center mb-16">
              <span className="text-[10px] uppercase tracking-widest text-primary font-bold">Profile</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4 text-white font-serif-display tracking-wide">ABOUT ME</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              
              {/* Photo Column */}
              <div className="lg:col-span-5 flex items-center justify-center">
                <div className="relative group w-full max-w-[380px] md:max-w-[420px]">
                  {/* Subtle soft gradient glow behind the glass panel */}
                  <div className="absolute -inset-4 bg-gradient-to-tr from-purple-600/10 to-amber-500/10 rounded-[32px] opacity-40 group-hover:opacity-70 blur-2xl transition duration-700" />
                  
                  {/* Glassmorphic Panel Container */}
                  <div className="w-full aspect-[4/5] relative rounded-[28px] overflow-hidden border border-white/10 p-3 bg-white/[0.02] backdrop-blur-md group-hover:border-white/20 transition-all duration-700 ease-out group-hover:scale-[1.02] shadow-[0_30px_70px_rgba(0,0,0,0.85)] group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.95)]">
                    
                    {/* Inner image container */}
                    <div className="w-full h-full rounded-[20px] overflow-hidden relative">
                      <img 
                        src={sravyaProfile} 
                        alt="Sravya" 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out"
                      />

                      {/* Micro-reflective sheen gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-white/[0.12] mix-blend-overlay pointer-events-none" />
                      
                      {/* Sweeping diagonal glass reflection on hover */}
                      <div className="absolute -inset-[100%] bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-45 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out pointer-events-none" />
                      
                      {/* Soft dark vignette bottom fade */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80 pointer-events-none" />
                    </div>

                  </div>
                </div>
              </div>

              {/* Bio Column */}
              <div className="lg:col-span-7 flex flex-col justify-center text-left">
                <p className="font-serif-display italic text-lg md:text-xl leading-relaxed text-white/90 mb-6">
                  I am a <span className="font-sans not-italic font-bold bg-gradient-to-r from-amber-400 to-fuchsia-500 bg-clip-text text-transparent">Electronics and Communication Engineering</span> graduate from Kuppam Engineering College (CGPA: 8.3) with a strong foundation in Electronics and IOT . I have a focused commitment to smart mobility solutions and hardware-software integration. I have more Intrested in <span className="font-sans not-italic font-bold bg-gradient-to-r from-fuchsia-400 to-purple-500 bg-clip-text text-transparent">Data Analytics</span> And <span className="font-sans not-italic font-bold bg-gradient-to-r from-fuchsia-400 to-purple-500 bg-clip-text text-transparent">Product Management</span> skills.
                </p>
                <p className="font-serif-display italic text-lg md:text-xl leading-relaxed text-white/90">
                  My work centers on rapid prototyping, AI-assisted development, and connected systems. Through my electromechanical assembly and testing Internship at <span className="font-sans not-italic font-bold bg-gradient-to-r from-amber-400 to-fuchsia-500 bg-clip-text text-transparent">Aaviza Electronics</span>, national hackathons, and research, I am dedicated to bridging the gap between theoretical electrical concepts and high-impact, real-world engineering solutions.
                </p>
              </div>

            </div>
          </section>
        </AnimatedSection>

        {/* SKILLS SECTION */}
        <AnimatedSection>
          <section id="skills" className="py-20 border-t border-white/5 scroll-mt-24">
            <div className="text-center mb-16">
              <span className="text-[10px] uppercase tracking-widest text-primary font-bold">Expertise</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4 text-white font-serif-display tracking-wide">TECHNICAL SKILLS</h2>
              <p className="text-muted-foreground max-w-xl mx-auto text-sm">
                Structured skill sets across programming languages, software frameworks, databases, and IoT hardware integration.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              
              {/* Languages Card */}
              <div className="glass-card p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-all flex flex-col justify-between shadow-md">
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 border border-amber-500/20">
                      <Code2 className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-white tracking-wide">Languages</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["Python", "Java", "Kotlin", "C", "SQL", "HTML", "CSS", "JavaScript", "PHP"].map((skill, sIdx) => (
                      <span key={sIdx} className="bg-white/5 hover:bg-white/10 text-xs text-white/80 py-1.5 px-3 rounded-xl border border-white/5 hover:border-amber-400/20 transition-all hover:scale-[1.03] select-none">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Frameworks & Tools Card */}
              <div className="glass-card p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-all flex flex-col justify-between shadow-md">
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-500/20">
                      <Terminal className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-white tracking-wide">Frameworks & Tools</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["React", "Node.js", "Express", "Tailwind CSS", "Android Studio", "VS Code", "Git", "GitHub"].map((skill, sIdx) => (
                      <span key={sIdx} className="bg-white/5 hover:bg-white/10 text-xs text-white/80 py-1.5 px-3 rounded-xl border border-white/5 hover:border-purple-400/20 transition-all hover:scale-[1.03] select-none">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Databases & Hardware Card */}
              <div className="glass-card p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-all flex flex-col justify-between shadow-md">
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 border border-cyan-500/20">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-white tracking-wide">Databases & IoT</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["MySQL", "PostgreSQL", "MongoDB", "IoT", "Arduino", "Hardware Integration", "Networking"].map((skill, sIdx) => (
                      <span key={sIdx} className="bg-white/5 hover:bg-white/10 text-xs text-white/80 py-1.5 px-3 rounded-xl border border-white/5 hover:border-cyan-400/20 transition-all hover:scale-[1.03] select-none">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </section>
        </AnimatedSection>

        {/* MY WORK SECTION */}
        <AnimatedSection>
          <section id="work" className="py-20 border-t border-white/5 scroll-mt-24">
            <div className="text-center mb-16">
              <span className="text-[10px] uppercase tracking-widest text-primary font-bold">Creative Assets</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4 text-white font-serif-display tracking-wide text-glow-primary">MY WORK</h2>
              <p className="text-muted-foreground max-w-xl mx-auto text-sm">
                A selection of creative banners, social media layouts, and branding concepts crafted to drive engagement.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {[
                {
                  title: "Brand Identity Design",
                  category: "Branding",
                  desc: "Modern visual identity showcasing typography pairings, guidelines, and responsive logo variations.",
                  image: sampleBrand
                },
                {
                  title: "Social Media Layout",
                  category: "Marketing",
                  desc: "High-engagement Instagram grid layout template designed for storytelling and aesthetic consistency.",
                  image: sampleInstagram
                },
                {
                  title: "Service Promotion ad",
                  category: "Advertising",
                  desc: "Conversion-focused promotional campaign banner optimized for mobile & web platform placements.",
                  image: sampleService
                },
                {
                  title: "Webinar Event banner",
                  category: "Event Design",
                  desc: "Sleek, tech-themed promotional banner for virtual webinars and coding fests.",
                  image: sampleWebinar
                }
              ].map((post, index) => (
                <div key={index} className="glass-card overflow-hidden rounded-2xl border border-white/5 hover:border-white/10 hover-lift flex flex-col h-full shadow-md group">
                  <div className="aspect-[4/3] w-full overflow-hidden relative border-b border-white/5 bg-white/[0.01]">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030209]/80 via-transparent to-transparent opacity-60 pointer-events-none" />
                    <span className="absolute top-3 right-3 text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-md bg-primary/20 backdrop-blur-md text-white border border-white/10">
                      {post.category}
                    </span>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-base font-bold text-white tracking-wide mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{post.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </AnimatedSection>

        {/* ACHIEVEMENTS SECTION */}
        <AnimatedSection>
          <section id="achievements" className="py-20 border-t border-white/5 scroll-mt-24">
            <div className="text-center mb-16">
              <span className="text-[10px] uppercase tracking-widest text-primary font-bold">Milestones</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4 text-white font-serif-display tracking-wide">ACHIEVEMENTS</h2>
              <p className="text-muted-foreground max-w-xl mx-auto text-sm">
                Honors, recognitions, and competitive victories representing technical excellence and leadership.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {achievements.map((ach, index) => (
                <div key={index} className={`glass-card py-6 px-7 rounded-2xl border border-white/5 hover:border-white/10 hover-lift text-left flex items-start gap-5 scroll-fade-up stagger-${Math.min(index + 1, 9)} shadow-md`}>
                  <div className={`w-10 h-10 rounded-lg ${ach.color} flex items-center justify-center border border-white/5 flex-shrink-0 font-bold text-sm`}>
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white tracking-wide">{ach.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{ach.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </AnimatedSection>

        {/* JOURNEY SECTION */}
        <AnimatedSection>
          <section id="journey" className="py-20 border-t border-white/5 scroll-mt-24">
            <div className="text-center mb-16">
              <span className="text-[10px] uppercase tracking-widest text-primary font-bold">Academic Pathway</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4 text-white font-serif-display tracking-wide text-glow-primary">JOURNEY</h2>
              <p className="text-muted-foreground max-w-xl mx-auto text-sm">
                My path from student to aspiring design engineer.
              </p>
            </div>

            <div className="max-w-3xl mx-auto relative px-4">
              {/* Vertical timeline line */}
              <div className="absolute left-6 sm:left-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-amber-400 via-fuchsia-500 to-purple-600 opacity-40 -translate-x-1/2" />

              {[
                {
                  period: "2022 - 2026",
                  title: "B.Tech in ECE",
                  institution: "Kuppam Engineering College (JNTUA)",
                  metric: "CGPA: 8.3",
                  desc: "Graduated in Electronics and Communication Engineering with a focus on digital electronics, VLSI design, and embedded systems.",
                  icon: GraduationCap,
                  color: "border-purple-500/20 text-purple-400 bg-purple-500/10",
                  align: "left"
                },
                {
                  period: "2020 - 2022",
                  title: "Intermediate (XII) - MPC",
                  institution: "Narayana Junior College, Tirupati",
                  metric: "91%",
                  desc: "Higher secondary education with a focus on Mathematics, Physics, and Chemistry.",
                  icon: GraduationCap,
                  color: "border-amber-500/20 text-amber-400 bg-amber-500/10",
                  align: "right"
                },
                {
                  period: "2015 - 2020",
                  title: "Secondary School Certificate (SSC)",
                  institution: "Varadhi International School",
                  metric: "GPA: 9.7",
                  desc: "Completed secondary education with a strong foundation in science and mathematics.",
                  icon: GraduationCap,
                  color: "border-cyan-500/20 text-cyan-400 bg-cyan-500/10",
                  align: "left"
                }
              ].map((item, index) => {
                const ItemIcon = item.icon;
                return (
                  <div key={index} className={`relative flex flex-col sm:flex-row items-center justify-between mb-12 last:mb-0 group`}>
                    
                    {/* Timeline Node */}
                    <div className="absolute left-6 sm:left-1/2 w-10 h-10 rounded-full border-2 border-white/20 bg-[#030209] flex items-center justify-center -translate-x-1/2 z-20 group-hover:border-primary transition-all duration-300 shadow-md">
                      <ItemIcon className="w-5 h-5 text-white" />
                    </div>

                    {/* Timeline Card */}
                    <div className={`w-full sm:w-[calc(50%-28px)] pl-16 sm:pl-0 ${
                      item.align === 'left' ? 'sm:mr-auto sm:text-right' : 'sm:ml-auto sm:text-left'
                    }`}>
                      <div className="glass-card p-6 rounded-2xl border border-white/5 hover:border-white/10 hover-lift text-left shadow-md relative">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                          <span className={`text-[10px] font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-full border ${item.color}`}>
                            {item.period}
                          </span>
                          <span className="text-xs font-semibold text-primary">{item.metric}</span>
                        </div>
                        <h3 className="text-lg font-bold text-white tracking-wide mb-1">{item.title}</h3>
                        <h4 className="text-sm text-muted-foreground font-semibold mb-3">{item.institution}</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          </section>
        </AnimatedSection>

        {/* STAY CONNECTED SECTION */}
        <AnimatedSection>
          <section id="contact" className="py-20 border-t border-white/5 text-center scroll-mt-24">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-serif-display tracking-wide text-white mb-2">Stay connected</h2>
              <p className="text-muted-foreground text-sm max-w-md mx-auto mb-10 leading-relaxed">
                Feel free to reach out for collaborations, project opportunities, or technical discussions.
              </p>

              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <a 
                  href="https://www.linkedin.com/in/pallesi-sravya" 
                  target="_blank" 
                  rel="noreferrer"
                  className="px-6 py-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white font-semibold text-xs tracking-wider uppercase flex items-center gap-2 hover:border-white/20 transition-all"
                >
                  <Linkedin className="w-4 h-4 text-[#0A66C2]" />
                  LinkedIn
                </a>

                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="px-6 py-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white font-semibold text-xs tracking-wider uppercase flex items-center gap-2 hover:border-white/20 transition-all"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>

                <a 
                  href="https://leetcode.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="px-6 py-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white font-semibold text-xs tracking-wider uppercase flex items-center gap-2 hover:border-white/20 transition-all"
                >
                  <Terminal className="w-4 h-4 text-amber-500" />
                  LeetCode
                </a>

                <a 
                  href="mailto:sravssravyachinni@gmail.com" 
                  className="px-6 py-3 rounded-full tech-gradient text-white font-semibold text-xs tracking-wider uppercase flex items-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-primary/20"
                >
                  <Mail className="w-4 h-4" />
                  Email Me
                </a>
              </div>

              {/* STAY CONNECTED FORM */}
              <div className="max-w-lg mx-auto glass-card p-6 sm:p-8 rounded-2xl border border-white/5 text-left shadow-lg bg-white/[0.01]">
                <h3 className="text-lg font-bold text-white tracking-wide mb-6">Send a Message</h3>
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Your Name</label>
                    <input 
                      id="contact-name"
                      type="text" 
                      name="name"
                      value={form.name}
                      onChange={handleFormChange}
                      placeholder="Enter your name" 
                      className="w-full bg-[#0d0a1b]/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Email Address</label>
                    <input 
                      id="contact-email"
                      type="email" 
                      name="email"
                      value={form.email}
                      onChange={handleFormChange}
                      placeholder="your.email@example.com" 
                      className="w-full bg-[#0d0a1b]/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Message</label>
                    <textarea 
                      id="contact-message"
                      name="message"
                      value={form.message}
                      onChange={handleFormChange}
                      placeholder="Tell me about your project, opportunities, or just say hello..." 
                      rows={4}
                      className="w-full bg-[#0d0a1b]/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-muted-foreground focus:outline-none focus:border-primary/50 transition-colors resize-none"
                      required
                    ></textarea>
                  </div>
                  
                  {status === 'success' && (
                    <p className="text-xs font-semibold text-emerald-400">Email client opened with prefilled message!</p>
                  )}
                  {status === 'error' && (
                    <p className="text-xs font-semibold text-rose-400">Please fill in all fields before submitting.</p>
                  )}

                  <button 
                    type="submit" 
                    className="w-full py-3.5 px-6 rounded-xl tech-gradient text-white font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-primary/20 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </section>
        </AnimatedSection>

      </main>

      <footer className="py-10 border-t border-white/5 text-center mt-20 relative z-10">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Sravya • ECE Graduate
        </p>
      </footer>
    </div>
  );
};

export default Index;