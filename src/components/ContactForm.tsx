import React, { useState } from 'react';
import { Mail, Phone, MessageCircle, Send } from 'lucide-react';
import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const ContactForm: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.name || !form.email || !form.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields before sending.",
        variant: "destructive",
      });
      return;
    }

    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    );
    
    window.location.href = `mailto:sravssravyachinni@gmail.com?subject=${subject}&body=${body}`;
    
    toast({
      title: "Email Client Opened",
      description: "Your email client should open with the message pre-filled.",
    });
  };

  return (
    <section id="contact" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
          <p className="text-muted-foreground">
            Let's discuss digital marketing strategies, content creation, or collaboration opportunities!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="glass-card p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 tech-gradient rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-muted-foreground">sravssravyachinni@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 tech-gradient rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-muted-foreground">+91-9063991011</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 tech-gradient rounded-lg flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">Response Time</p>
                    <p className="text-muted-foreground">Within 24 hours</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border">
                <p className="font-medium mb-4">Follow me on:</p>
                <div className="flex gap-4">
                  <a 
                    href="https://instagram.com/yourusername" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white hover:scale-110 transition-transform"
                  >
                    <FaInstagram className="w-5 h-5" />
                  </a>
                  <a 
                    href="https://facebook.com/yourusername" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white hover:scale-110 transition-transform"
                  >
                    <FaFacebook className="w-5 h-5" />
                  </a>
                  <a 
                    href="https://twitter.com/yourusername" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-blue-400 rounded-lg flex items-center justify-center text-white hover:scale-110 transition-transform"
                  >
                    <FaTwitter className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-6">Send me a message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">Your Name</label>
                <Input id="name" name="name" value={form.name} onChange={handleChange} placeholder="Enter your full name" className="w-full" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address</label>
                <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="your.email@example.com" className="w-full" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                <Textarea id="message" name="message" value={form.message} onChange={handleChange} placeholder="Tell me about your project, marketing needs, or just say hello..." className="w-full h-32 resize-none" />
              </div>
              <Button type="submit" className="w-full tech-gradient text-white hover:opacity-90">
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;