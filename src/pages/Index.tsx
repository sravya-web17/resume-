import React, { useState, useEffect, useRef } from 'react';
import { Megaphone, TrendingUp, Palette, Search, PenTool, BarChart3, Globe, Award, GraduationCap, Briefcase, Instagram, Target } from 'lucide-react';
import LoadingScreen from '@/components/LoadingScreen';
import Header from '@/components/Header';
import ContactForm from '@/components/ContactForm';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import sravyaPhoto from '@/assets/sravya-photo.jpeg';


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

const Index = () => {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <LoadingScreen onComplete={() => setLoading(false)} />;
  }

  const skills = [
    { name: "Social Media Marketing", icon: Megaphone, level: "Advanced" },
    { name: "Content Creation", icon: PenTool, level: "Advanced" },
    { name: "SEO Fundamentals", icon: Search, level: "Intermediate" },
    { name: "Canva Design", icon: Palette, level: "Advanced" },
    { name: "Instagram Strategy", icon: Instagram, level: "Advanced" },
    { name: "Audience Targeting", icon: Target, level: "Intermediate" },
    { name: "Communication", icon: Globe, level: "Advanced" },
    { name: "Content Strategy", icon: BarChart3, level: "Intermediate" },
    { name: "Brand Growth", icon: TrendingUp, level: "Intermediate" },
  ];

  const projects = [
    {
      title: "Social Media Content Campaigns",
      description: "Created engaging social media content targeting student audiences. Designed marketing posters and educational creatives using Canva.",
      tech: ["Canva", "Instagram", "Content Design", "Audience Targeting"],
      icon: Megaphone
    },
    {
      title: "Instagram Growth Strategy",
      description: "Explored Instagram growth strategies and audience engagement techniques. Gained foundational knowledge of SEO and audience targeting.",
      tech: ["Instagram", "SEO", "Analytics", "Engagement"],
      icon: TrendingUp
    },
    {
      title: "Health & Hygiene Awareness Campaign",
      description: "Led community awareness project on health and hygiene, creating impactful messaging and outreach materials.",
      tech: ["Campaign Design", "Community Outreach", "Content Writing"],
      icon: Globe
    },
    {
      title: "Smart Locking System with Bluetooth",
      description: "Developed a smart lock controlled via Bluetooth using Arduino — showcasing technical + creative problem-solving skills.",
      tech: ["Arduino", "Bluetooth", "IoT", "Problem Solving"],
      icon: Target
    },
    {
      title: "SIH 2026 Hackathon Winner",
      description: "Participated in and won the Smart India Hackathon (SIH) 2026 — demonstrating innovation and teamwork.",
      tech: ["Innovation", "Teamwork", "Problem Solving", "Presentation"],
      icon: Award
    },
  ];

  const achievements = [
    "Won Smart India Hackathon (SIH) 2026",
    "Abacus State Rank Holder",
    "NPTEL Certification (CA0)",
    "MongoDB Basics Certification",
    "Learnathon Completion Certificate",
    "Volunteered in health awareness programs",
    "Active participant in college fests & workshops",
  ];


  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 px-6 text-center">
          <div className="max-w-4xl mx-auto animate-slide-up">
            <div className="mb-8">
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                Hi, I'm <span className="bg-gradient-to-r from-tech-blue to-tech-teal bg-clip-text text-transparent">Pallesi Sravya</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-6">
                Aspiring Digital Marketing Professional
              </p>
            </div>



            
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Megaphone className="w-4 h-4 mr-2" />
                Social Media Marketing
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <PenTool className="w-4 h-4 mr-2" />
                Content Creation
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Palette className="w-4 h-4 mr-2" />
                Canva Design
              </Badge>
            </div>

            <div className="glass-card p-8 rounded-2xl">
              <h3 className="text-lg font-semibold mb-4">Career Objective</h3>
              <p className="text-muted-foreground">
                "Enthusiastic and motivated individual with a strong interest in digital marketing and content creation. 
                Seeking an opportunity to apply my skills in social media marketing and contribute to brand growth 
                while continuously learning and developing professionally."
              </p>
            </div>
          </div>
        </section>

        {/* About Section */}

        <AnimatedSection>
          <section id="about" className="py-20 px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4 scroll-fade-up">About Me</h2>
                <p className="text-muted-foreground scroll-fade-up stagger-1">Get to know more about my journey and passions</p>
              </div>
              
              <div className="glass-card p-0 rounded-2xl overflow-hidden scroll-fade-up stagger-2 hover-lift">
                <div className="grid md:grid-cols-2">
                  <div className="h-[400px] md:h-auto relative">
                    <img 
                      src={sravyaPhoto} 
                      alt="Pallesi Sravya" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/10 md:bg-gradient-to-r" />
                  </div>
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <p className="text-lg leading-relaxed mb-8">
                      I am <strong>Pallesi Sravya</strong>, a B.Tech ECE student at Kuppam Engineering College (expected 2026) 
                      with a strong passion for <strong>digital marketing and content creation</strong>. Based in Puttaparthi, Sri Sathya Sai District, 
                      I specialize in social media marketing, audience engagement, and visual content design using tools like Canva. 
                      I combine my technical background with creative skills to craft compelling digital experiences 
                      and help brands grow their online presence.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-6">
                      <div className="scroll-scale-in stagger-3 text-left">
                        <h4 className="font-semibold text-primary mb-1 text-sm uppercase tracking-wider">Languages</h4>
                        <p className="text-muted-foreground">English, Telugu, Hindi</p>
                      </div>
                      <div className="scroll-scale-in stagger-4 text-left">
                        <h4 className="font-semibold text-primary mb-1 text-sm uppercase tracking-wider">Location</h4>
                        <p className="text-muted-foreground">Puttaparthi, AP, India</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


            </div>
          </section>
        </AnimatedSection>

        {/* Education Section */}
        <AnimatedSection>
          <section id="education" className="py-20 px-6 bg-muted/30">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4 scroll-fade-up">Education</h2>
                <p className="text-muted-foreground scroll-fade-up stagger-1">My academic journey</p>
              </div>

              <div className="space-y-6">
                <Card className="glass-card scroll-fade-left stagger-2 hover-lift">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 tech-gradient rounded-lg flex items-center justify-center animate-float">
                        <GraduationCap className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold">B.Tech in Electronics & Communication Engineering</h3>
                        <p className="text-primary font-medium">Kuppam Engineering College</p>
                        <p className="text-muted-foreground">Expected 2026 • GPA: 79%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card scroll-fade-right stagger-3 hover-lift">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                        <GraduationCap className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold">Intermediate (XII)</h3>
                        <p className="text-primary font-medium">Narayana Junior College, Tirupati</p>
                        <p className="text-muted-foreground">2022 • GPA: 91%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card scroll-fade-left stagger-4 hover-lift">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                        <GraduationCap className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold">SSC (X)</h3>
                        <p className="text-primary font-medium">Vardhi International School</p>
                        <p className="text-muted-foreground">2020 • GPA: 97%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Experience Section */}
        <AnimatedSection>
          <section id="experience" className="py-20 px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4 scroll-fade-up">Experience</h2>
                <p className="text-muted-foreground scroll-fade-up stagger-1">My professional and learning experiences</p>
              </div>

              <div className="space-y-6">
                <Card className="glass-card scroll-fade-up stagger-2 hover-lift">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 tech-gradient rounded-lg flex items-center justify-center">
                        <Megaphone className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold">Digital Marketing Experience</h3>
                        <p className="text-primary font-medium">Self-Directed & Freelance</p>
                        <ul className="text-sm text-muted-foreground mt-2 space-y-1 list-disc list-inside">
                          <li>Designed engaging social media posts using Canva</li>
                          <li>Explored Instagram growth strategies and audience engagement techniques</li>
                          <li>Gained foundational knowledge of SEO and audience targeting</li>
                          <li>Created marketing posters and educational creatives for student audiences</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card scroll-fade-up stagger-3 hover-lift">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 tech-gradient rounded-lg flex items-center justify-center">
                        <Briefcase className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold">Intern – Wiring Harness & Electromechanical Assemblies</h3>
                        <p className="text-primary font-medium">Aaviza Electronics Pvt. Ltd. • Dec 2025 – Mar 2026</p>
                        <ul className="text-sm text-muted-foreground mt-2 space-y-1 list-disc list-inside">
                          <li>Trained in electrical & electronics concepts</li>
                          <li>Worked on wiring harness assembly and testing</li>
                          <li>Followed quality and safety standards</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card scroll-fade-up stagger-4 hover-lift">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 tech-gradient rounded-lg flex items-center justify-center">
                        <Briefcase className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold">IoT Internship</h3>
                        <p className="text-primary font-medium">Technical Training Program</p>
                        <p className="text-sm text-muted-foreground mt-2">
                          Worked on Arduino-based IoT projects and sensor integration.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Skills Section */}
        <AnimatedSection>
          <section id="skills" className="py-20 px-6 bg-muted/30">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4 scroll-fade-up">Skills & Expertise</h2>
                <p className="text-muted-foreground scroll-fade-up stagger-1">My digital marketing toolkit</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {skills.map((skill, index) => (
                  <Card key={index} className={`glass-card hover-lift scroll-scale-in stagger-${Math.min(index + 2, 9)}`}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 tech-gradient rounded-lg flex items-center justify-center">
                          <skill.icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold">{skill.name}</h4>
                          <p className="text-sm text-muted-foreground">{skill.level}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Projects Section */}
        <AnimatedSection>
          <section id="projects" className="py-20 px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4 scroll-fade-up">Featured Projects</h2>
                <p className="text-muted-foreground scroll-fade-up stagger-1">Some of my notable work and campaigns</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {projects.map((project, index) => (
                  <Card key={index} className={`glass-card hover-lift scroll-fade-up stagger-${Math.min(index + 2, 6)}`}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 tech-gradient rounded-lg flex items-center justify-center">
                          <project.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                          <p className="text-muted-foreground text-sm">{project.description}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, techIndex) => (
                          <Badge key={techIndex} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Achievements Section */}
        <AnimatedSection>
          <section className="py-20 px-6 bg-muted/30">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4 scroll-fade-up">Achievements & Activities</h2>
                <p className="text-muted-foreground scroll-fade-up stagger-1">Recognition and involvement</p>
              </div>

              <div className="glass-card p-8 rounded-2xl scroll-fade-up stagger-2">
                <div className="grid md:grid-cols-2 gap-4">
                  {achievements.map((achievement, index) => (
                    <div key={index} className={`flex items-center gap-3 scroll-scale-in stagger-${Math.min(index + 3, 9)}`}>
                      <div className="w-8 h-8 tech-gradient rounded-full flex items-center justify-center">
                        <Award className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm">{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Contact Section */}
        <AnimatedSection>
          <ContactForm />
        </AnimatedSection>
      </main>

      <footer className="py-8 px-6 border-t border-border/50">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} Pallesi Sravya • Digital Marketing Professional • Content Creator
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;