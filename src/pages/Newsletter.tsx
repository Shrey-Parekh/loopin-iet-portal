import { useState, useMemo } from 'react';
import Header from '../components/Header';
import { Search, Download, Calendar, Eye, Tag } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNewsletters } from '@/hooks/useApi';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';

const categories = [
  { id: 'all', label: 'All Categories' },
  { id: 'weekly', label: 'Weekly' },
  { id: 'monthly', label: 'Monthly' },
  { id: 'quarterly', label: 'Quarterly' },
  { id: 'special', label: 'Special Edition' }
];

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'weekly': return 'bg-blue-50 text-blue-700 border-blue-200';
    case 'monthly': return 'bg-green-50 text-green-700 border-green-200';
    case 'quarterly': return 'bg-orange-50 text-orange-700 border-orange-200';
    case 'special': return 'bg-purple-50 text-purple-700 border-purple-200';
    default: return 'bg-gray-50 text-gray-700 border-gray-200';
  }
};

const Newsletter = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { data, loading, error } = useNewsletters();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const filteredNewsletters = useMemo(() => {
    if (!data) return [];
    return data.filter((newsletter: any) => {
      const matchesSearch = newsletter.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        newsletter.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || newsletter.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [data, searchTerm, selectedCategory]);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || submitting) return;
    setSubmitting(true);
    try {
      const res = await fetch('https://loopin-iet-portal-1.onrender.com/api/newsletters/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        toast({ title: 'Subscribed!', description: 'You have been subscribed to the newsletter.' });
        setEmail('');
      } else {
        toast({ title: 'Error', description: data.error || 'Failed to subscribe.', variant: 'destructive' });
      }
    } catch (err) {
      toast({ title: 'Error', description: 'Network error. Please try again.', variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden" style={{ background: 'linear-gradient(120deg, #f8f6ff 0%, #f3e8ff 40%, #e0c3fc 70%, #fff 100%)' }}>
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-12%] left-[-10%] w-[65vw] h-[65vw] rounded-full bg-gradient-to-br from-[#a259c6] via-[#f3e8ff] to-[#4f1b59] blur-3xl opacity-15" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[55vw] h-[55vw] rounded-full bg-gradient-to-br from-[#4f1b59] via-[#f3e8ff] to-[#fff] blur-3xl opacity-10" />
        <div className="absolute top-[30%] left-[-15%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-br from-[#f9e7ff] via-[#ffe6fa] to-[#fff] blur-3xl opacity-10" />
        <div className="absolute bottom-[10%] right-[-18%] w-[38vw] h-[38vw] rounded-full bg-gradient-to-br from-[#fff] via-[#e0c3fc] to-[#f3e8ff] blur-3xl opacity-10" />
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-white/80 via-white/0 to-transparent" />
      </div>
      <Header />
      <div className="py-20">
        <div className="container mx-auto px-4">
          {/* Header Section with animated background */}
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center mb-16 relative"
          >
            <motion.span
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="inline-block px-4 py-2 bg-[#4f1b59] text-white rounded-full text-sm font-medium mb-4 shadow-lg"
            >
              Newsletter Archive
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="text-4xl md:text-5xl font-bold mb-6 text-[#333333] drop-shadow-lg"
            >
              Stay Informed
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.7 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            >
              Stay informed with our comprehensive newsletters covering committee updates, tech insights, and community highlights
            </motion.p>
            {/* Animated background shapes */}
            <motion.div
              className="absolute left-1/2 top-0 -translate-x-1/2 -z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.2 }}
              transition={{ duration: 1 }}
            >
              <div className="w-[400px] h-[120px] bg-gradient-to-r from-[#a259c6] via-[#4f1b59] to-[#a259c6] blur-2xl rounded-full mx-auto mt-8" />
            </motion.div>
          </motion.div>

          {/* Search and Filter Section with animation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="mb-12"
          >
            <div className="flex flex-col md:flex-row gap-4 mb-6 max-w-4xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search newsletters..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-gray-300 h-12 shadow-sm"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {categories.map((category, idx) => (
                  <motion.div
                    key={category.id}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Button
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`transition-all duration-200 ${
                        selectedCategory === category.id
                          ? 'bg-[#4f1b59] text-white' 
                          : 'border-[#4f1b59] text-[#4f1b59] hover:bg-[#4f1b59] hover:text-white'
                      }`}
                    >
                      {category.label}
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Newsletter Grid with animated cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto min-h-[300px]">
            {loading && (
              <div className="col-span-2 text-center text-lg text-gray-400 animate-pulse">Loading newsletters...</div>
            )}
            {error && (
              <div className="col-span-2 text-center text-red-500">{error}</div>
            )}
            <AnimatePresence>
              {!loading && !error && filteredNewsletters.length === 0 && (
                <motion.div
                  className="col-span-2 text-center text-gray-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  No newsletters found.
                </motion.div>
              )}
              {!loading && !error && filteredNewsletters.map((newsletter: any, idx: number) => (
                <motion.div
                  key={newsletter.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 40 }}
                  transition={{ delay: idx * 0.08, duration: 0.5, type: 'spring', stiffness: 120 }}
                >
                  <Card className="group hover:shadow-2xl transition-all duration-200 overflow-hidden bg-white border border-gray-200 rounded-2xl">
                    <div className="relative">
                      <img
                        src={newsletter.image}
                        alt={newsletter.title}
                        className="w-full h-48 object-cover scale-100 group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className={`border ${getCategoryColor(newsletter.category)}`}>
                          <Tag className="w-3 h-3 mr-1" />
                          {newsletter.category}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl text-[#333333] group-hover:text-[#4f1b59] transition-colors">
                        {newsletter.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {newsletter.description}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(newsletter.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Eye className="w-4 h-4" />
                            <span>{newsletter.views} views</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <a href={newsletter.downloadUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                          <Button className="w-full font-medium bg-[#4f1b59] hover:bg-[#3d1445] text-white">
                            <Eye className="w-4 h-4 mr-2" />
                            Read Online
                          </Button>
                        </a>
                        <a href={newsletter.downloadUrl} download target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" className="border-[#4f1b59] text-[#4f1b59] hover:bg-[#4f1b59] hover:text-white">
                            <Download className="w-4 h-4" />
                          </Button>
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Subscribe Section with animation */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="mt-20 text-center bg-white rounded-2xl p-12 shadow-lg border border-gray-200 max-w-4xl mx-auto"
          >
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-2xl font-bold mb-4 text-[#333333]"
            >
              Stay Updated
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-gray-600 mb-6 max-w-xl mx-auto"
            >
              Subscribe to our newsletter to receive the latest updates directly in your inbox
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto"
            >
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 w-full">
                <Input
                  placeholder="Enter your email"
                  className="flex-1 border-gray-300 shadow-sm"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  disabled={submitting}
                  type="email"
                  required
                />
                <Button
                  className="font-medium bg-[#4f1b59] hover:bg-[#3d1445] text-white"
                  type="submit"
                  disabled={submitting}
                >
                  {submitting ? 'Subscribing...' : 'Subscribe'}
                </Button>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
