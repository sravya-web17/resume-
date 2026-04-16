import React from 'react';
import { Download, FileText, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import sravyaPhoto from '@/assets/sravya-photo.jpeg';


const ResumeSection: React.FC = () => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/P_Sravya_Resume.pdf';
    link.download = 'P_Sravya_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleViewOnline = () => {
    window.open('/P_Sravya_Resume.pdf', '_blank');
  };

  return (
    <section className="py-20 px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Resume & Profile</h2>
          <p className="text-muted-foreground">Download my detailed resume and get to know me better</p>
        </div>

        <Card className="glass-card overflow-hidden">
          <CardContent className="p-0">
            <div className="grid md:grid-cols-2">
              {/* Photo Side */}
              <div className="relative h-[400px] md:h-auto">
                <img 
                  src={sravyaPhoto} 
                  alt="Pallesi Sravya - Digital Marketing Professional" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-tech-dark/80 to-transparent md:hidden" />
                <div className="absolute bottom-6 left-6 md:hidden">
                  <h3 className="text-2xl font-bold text-white">Pallesi Sravya</h3>
                  <p className="text-white/80">Digital Marketing Professional</p>
                </div>
              </div>

              {/* Content Side */}
              <div className="p-8 md:p-12 flex flex-col justify-center space-y-8">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 tech-gradient rounded-full flex items-center justify-center">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">My Resume</h3>
                      <p className="text-muted-foreground text-sm">Last Updated: April 2026</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Complete details of my education, skills, marketing experience, and achievements.
                  </p>
                </div>

                <div className="space-y-4">
                  <Button onClick={handleDownload} className="w-full tech-gradient text-white hover:opacity-90 py-6 text-lg">
                    <Download className="w-5 h-5 mr-2" />
                    Download Resume (PDF)
                  </Button>
                  <Button onClick={handleViewOnline} variant="outline" className="w-full border-primary/20 hover:bg-primary/5">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Online
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-6 pt-4 border-t border-border/50">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">79%</p>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">GPA</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">5+</p>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Projects</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">SIH</p>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Winner</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>

  );
};

export default ResumeSection;