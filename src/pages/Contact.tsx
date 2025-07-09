import Header from '../components/Header';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [sendState, setSendState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [pulse, setPulse] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSendState('sending');
    setError('');
    setSuccess(false);
    try {
      const res = await fetch('https://loopin-iet-portal-1.onrender.com/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (!res.ok) throw new Error('Failed to send message.');
      setSuccess(true);
      setSendState('success');
      setPulse(true);
      setTimeout(() => setPulse(false), 1200);
      setTimeout(() => setSendState('idle'), 1500);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setError('Something went wrong. Please try again.');
      setSendState('error');
      setTimeout(() => setSendState('idle'), 1500);
    } finally {
      setLoading(false);
    }
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
    <div className="min-h-screen relative overflow-x-hidden" style={{ background: 'linear-gradient(120deg, #f8f6ff 0%, #f3e8ff 40%, #e0c3fc 70%, #fff 100%)' }}>
      {/* Animated background shapes */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 0.13, scale: 1 }} transition={{ duration: 2, ease: 'easeOut' }} className="absolute top-[-12%] left-[-10%] w-[65vw] h-[65vw] rounded-full bg-gradient-to-br from-[#a259c6] via-[#f3e8ff] to-[#4f1b59] blur-3xl" />
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 0.09, scale: 1 }} transition={{ duration: 2, delay: 0.5, ease: 'easeOut' }} className="absolute bottom-[-10%] right-[-10%] w-[55vw] h-[55vw] rounded-full bg-gradient-to-br from-[#4f1b59] via-[#f3e8ff] to-[#fff] blur-3xl" />
        <motion.div initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 0.07, scale: 1 }} transition={{ duration: 2.2, delay: 0.8, ease: 'easeOut' }} className="absolute top-[30%] left-[-15%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-br from-[#f9e7ff] via-[#ffe6fa] to-[#fff] blur-3xl" />
        <motion.div initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 0.06, scale: 1 }} transition={{ duration: 2.2, delay: 1.1, ease: 'easeOut' }} className="absolute bottom-[10%] right-[-18%] w-[38vw] h-[38vw] rounded-full bg-gradient-to-br from-[#fff] via-[#e0c3fc] to-[#f3e8ff] blur-3xl" />
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-white/80 via-white/0 to-transparent" />
      </div>
      <Header />
      <div className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.span
              className="inline-block px-6 py-3 bg-gradient-to-r from-[#a259c6] to-[#4f1b59] text-white rounded-full text-sm font-semibold mb-6 shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Get in Touch
            </motion.span>
            <motion.h1
              className="text-5xl md:text-6xl font-extrabold text-[#2d1b3d] mb-6 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Contact Us
            </motion.h1>
            <motion.p
              className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Have questions or want to get involved? We'd love to hear from you. Reach out to us anytime.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className=""
            >
              <motion.div
                className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8"
                animate={pulse ? { boxShadow: '0 0 0 8px #a259c6, 0 8px 32px 0 rgba(162,89,198,0.25)' } : {}}
                transition={{ duration: 0.8, type: 'spring' }}
              >
                <div className="flex items-center mb-6">
                  <MessageSquare className="w-7 h-7 mr-3 text-[#a259c6]" />
                  <span className="text-2xl font-bold text-[#2d1b3d]">Send us a Message</span>
                </div>
                  <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                      <Label htmlFor="name" className="text-[#333333] font-medium">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                      className="border-gray-300 focus:ring-2 focus:ring-[#a259c6]/40 transition-all"
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
                      className="border-gray-300 focus:ring-2 focus:ring-[#a259c6]/40 transition-all"
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
                      className="border-gray-300 focus:ring-2 focus:ring-[#a259c6]/40 transition-all"
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
                      className="border-gray-300 min-h-[120px] focus:ring-2 focus:ring-[#a259c6]/40 transition-all"
                        required
                      />
                    </div>
                  <AnimatePresence>
                    {error && <motion.div className="text-red-500 text-sm flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><span className='text-lg'>❌</span>{error}</motion.div>}
                    {success && <motion.div className="text-green-600 text-sm flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1, scale: 1.1 }} exit={{ opacity: 0 }}><span className='text-lg'>✅</span>Thank you! Your message has been sent.</motion.div>}
                  </AnimatePresence>
                  <motion.button
                      type="submit"
                    className={`w-full py-3 rounded-full font-extrabold text-lg flex items-center justify-center gap-2 transition-all duration-300
                      shadow-xl backdrop-blur-md
                      ${sendState === 'sending' ? 'bg-purple-400 text-white cursor-wait' : ''}
                      ${sendState === 'success' ? 'bg-green-500 text-white' : ''}
                      ${sendState === 'error' ? 'bg-red-500 text-white animate-shake' : 'bg-gradient-to-r from-[#4f1b59] via-[#a259c6] to-[#b993d6] text-white'}
                    `}
                    style={{
                      textShadow: '0 2px 8px rgba(79,27,89,0.12)',
                      boxShadow: '0 4px 24px 0 rgba(162,89,198,0.18)',
                      letterSpacing: '0.02em',
                    }}
                    disabled={sendState === 'sending'}
                    whileHover={{ scale: 1.04, boxShadow: '0 8px 32px 0 rgba(162,89,198,0.25)' }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      {sendState === 'sending' && (
                        <motion.span key="sending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                          <span className="animate-spin mr-2">⏳</span> Sending...
                        </motion.span>
                      )}
                      {sendState === 'success' && (
                        <motion.span key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                          <span className="mr-2">✅</span> Sent!
                        </motion.span>
                      )}
                      {sendState === 'error' && (
                        <motion.span key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                          <span className="mr-2">❌</span> Error
                        </motion.span>
                      )}
                      {sendState === 'idle' && (
                        <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                          <motion.span
                            className="inline-block"
                            whileHover={{ x: 6, rotate: -12 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                          >
                            <Send className="w-5 h-5" />
                          </motion.span>
                          Send Message
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                  </form>
              </motion.div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="space-y-8"
            >
              {/* Quick Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6 text-center hover:shadow-2xl transition-all"
                  >
                    <info.icon className="w-8 h-8 text-[#a259c6] mx-auto mb-3" />
                    <h3 className="font-semibold text-[#2d1b3d] mb-1">{info.title}</h3>
                      <p className="text-[#4f1b59] font-medium mb-1">{info.content}</p>
                      <p className="text-sm text-gray-600">{info.description}</p>
                  </motion.div>
                ))}
              </div>

              {/* Team Contacts */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6"
              >
                <div className="flex items-center mb-4">
                  <User className="w-5 h-5 mr-2 text-[#a259c6]" />
                  <span className="text-xl font-bold text-[#2d1b3d]">Direct Team Contacts</span>
                </div>
                  <div className="space-y-4">
                    {teamContacts.map((contact, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.08 }}
                      className="flex items-center justify-between p-4 border border-white/20 rounded-lg hover:border-[#a259c6] transition-colors"
                    >
                        <div>
                        <h4 className="font-semibold text-[#2d1b3d]">{contact.name}</h4>
                          <p className="text-sm text-gray-600">{contact.role}</p>
                          <p className="text-xs text-gray-500">{contact.department}</p>
                      </div>
                      <a href={`mailto:${contact.email}`} target="_blank" rel="noopener noreferrer">
                        <motion.button
                          className="text-[#a259c6] hover:bg-[#a259c6] hover:text-white px-4 py-2 rounded-lg font-semibold transition-all"
                          whileHover={{ scale: 1.08 }}
                          whileTap={{ scale: 0.96 }}
                        >
                          <Mail className="w-4 h-4 mr-1 inline-block" /> Email
                        </motion.button>
                      </a>
                    </motion.div>
                    ))}
                  </div>
              </motion.div>

              {/* Additional Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="bg-gradient-to-br from-[#a259c6] to-[#4f1b59] text-white shadow-2xl rounded-2xl p-6 text-center"
              >
                  <h3 className="text-xl font-bold mb-2">Join Our Community</h3>
                  <p className="mb-4 opacity-90">
                    Interested in becoming a member? We're always looking for passionate individuals to join our team.
                  </p>
                <motion.button
                  className="bg-white/20 hover:bg-white/40 text-white font-semibold px-6 py-2 rounded-lg transition-transform duration-200 hover:scale-105"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.96 }}
                >
                    Learn More
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
      {/* Add shake animation for error */}
      <style>{`
        .animate-shake { animation: shake 0.4s; }
        @keyframes shake { 10%, 90% { transform: translateX(-2px); } 20%, 80% { transform: translateX(4px); } 30%, 50%, 70% { transform: translateX(-8px); } 40%, 60% { transform: translateX(8px); } }
      `}</style>
    </div>
  );
};

export default Contact;
