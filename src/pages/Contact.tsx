
import Header from '../components/Header';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      content: 'committee@iet.edu',
      description: 'Send us an email anytime'
    },
    {
      icon: Phone,
      title: 'Call Us',
      content: '+1 (555) 123-4567',
      description: 'Mon-Fri from 9am to 5pm'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      content: 'Room 204, Engineering Building',
      description: 'IET College Campus'
    },
    {
      icon: Clock,
      title: 'Office Hours',
      content: 'Monday - Friday',
      description: '9:00 AM - 5:00 PM'
    }
  ];

  const teamContacts = [
    {
      name: 'Alex Johnson',
      role: 'President',
      email: 'alex.johnson@iet.edu',
      department: 'General Inquiries'
    },
    {
      name: 'Sarah Chen',
      role: 'Vice President',
      email: 'sarah.chen@iet.edu',
      department: 'Events & Programs'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Technical Lead',
      email: 'marcus.rodriguez@iet.edu',
      department: 'Technical Support'
    },
    {
      name: 'Emily Davis',
      role: 'Events Coordinator',
      email: 'emily.davis@iet.edu',
      department: 'Event Planning'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-[#4f1b59] text-white rounded-full text-sm font-medium mb-4">
              Get in Touch
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-[#333333] mb-6">Contact Us</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Have questions or want to get involved? We'd love to hear from you. Reach out to us anytime.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div>
              <Card className="bg-white shadow-sm border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-2xl text-[#333333] flex items-center">
                    <MessageSquare className="w-6 h-6 mr-2 text-[#4f1b59]" />
                    Send us a Message
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-[#333333] font-medium">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                        className="border-gray-300"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-[#333333] font-medium">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
                        className="border-gray-300"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-[#333333] font-medium">Subject</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="What is this about?"
                        className="border-gray-300"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-[#333333] font-medium">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us more about your inquiry..."
                        className="border-gray-300 min-h-[120px]"
                        required
                      />
                    </div>

                    <Button 
                      type="submit"
                      className="w-full bg-[#4f1b59] hover:bg-[#3d1445] text-white py-3 text-lg font-semibold"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Quick Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="bg-white shadow-sm border border-gray-200">
                    <CardContent className="p-6 text-center">
                      <info.icon className="w-8 h-8 text-[#4f1b59] mx-auto mb-3" />
                      <h3 className="font-semibold text-[#333333] mb-1">{info.title}</h3>
                      <p className="text-[#4f1b59] font-medium mb-1">{info.content}</p>
                      <p className="text-sm text-gray-600">{info.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Team Contacts */}
              <Card className="bg-white shadow-sm border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-xl text-[#333333] flex items-center">
                    <User className="w-5 h-5 mr-2 text-[#4f1b59]" />
                    Direct Team Contacts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {teamContacts.map((contact, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:border-[#4f1b59] transition-colors">
                        <div>
                          <h4 className="font-semibold text-[#333333]">{contact.name}</h4>
                          <p className="text-sm text-gray-600">{contact.role}</p>
                          <p className="text-xs text-gray-500">{contact.department}</p>
                        </div>
                        <Button variant="ghost" size="sm" className="text-[#4f1b59] hover:bg-[#4f1b59] hover:text-white">
                          <Mail className="w-4 h-4 mr-1" />
                          Email
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Additional Info */}
              <Card className="bg-gradient-to-br from-[#4f1b59] to-purple-600 text-white shadow-sm">
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-bold mb-2">Join Our Community</h3>
                  <p className="mb-4 opacity-90">
                    Interested in becoming a member? We're always looking for passionate individuals to join our team.
                  </p>
                  <Button variant="outline" className="border-white text-white hover:bg-white hover:text-[#4f1b59]">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
