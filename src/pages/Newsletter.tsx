import { useState } from 'react';
import Header from '../components/Header';
import { Search, Download, Calendar, Eye, Tag } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Newsletter = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const newsletters = [
    {
      id: 1,
      title: 'IET Weekly Digest - June 2024',
      description: 'Latest updates from the committee, upcoming events, and member spotlights.',
      date: '2024-06-20',
      category: 'weekly',
      downloadUrl: '#',
      views: 245,
      image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop'
    },
    {
      id: 2,
      title: 'Tech Innovation Report - Q2 2024',
      description: 'Comprehensive overview of technological advancements and their impact on our field.',
      date: '2024-06-15',
      category: 'quarterly',
      downloadUrl: '#',
      views: 189,
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop'
    },
    {
      id: 3,
      title: 'Special Edition: Annual Symposium',
      description: 'Complete coverage of our annual tech symposium with highlights and key takeaways.',
      date: '2024-06-10',
      category: 'special',
      downloadUrl: '#',
      views: 312,
      image: 'https://images.unsplash.com/photo-1559523161-0fc0d8b38a7a?w=400&h=300&fit=crop'
    },
    {
      id: 4,
      title: 'Student Achievements - May 2024',
      description: 'Celebrating outstanding achievements of our committee members and students.',
      date: '2024-05-30',
      category: 'monthly',
      downloadUrl: '#',
      views: 156,
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'weekly', label: 'Weekly' },
    { id: 'monthly', label: 'Monthly' },
    { id: 'quarterly', label: 'Quarterly' },
    { id: 'special', label: 'Special Edition' }
  ];

  const filteredNewsletters = newsletters.filter(newsletter => {
    const matchesSearch = newsletter.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         newsletter.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || newsletter.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'weekly': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'monthly': return 'bg-green-50 text-green-700 border-green-200';
      case 'quarterly': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'special': return 'bg-purple-50 text-purple-700 border-purple-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="py-20">
        <div className="container mx-auto px-4">
          {/* Header Section */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-[#4f1b59] text-white rounded-full text-sm font-medium mb-4">
              Newsletter Archive
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#333333]">
              Stay Informed
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Stay informed with our comprehensive newsletters covering committee updates, tech insights, and community highlights
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row gap-4 mb-6 max-w-4xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search newsletters..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-gray-300 h-12"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <Button
                    key={category.id}
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
                ))}
              </div>
            </div>
          </div>

          {/* Newsletter Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {filteredNewsletters.map((newsletter) => (
              <Card key={newsletter.id} className="group hover:shadow-lg transition-all duration-200 overflow-hidden bg-white border border-gray-200">
                <div className="relative">
                  <img 
                    src={newsletter.image} 
                    alt={newsletter.title}
                    className="w-full h-48 object-cover"
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
                    <Button className="flex-1 font-medium bg-[#4f1b59] hover:bg-[#3d1445] text-white">
                      <Eye className="w-4 h-4 mr-2" />
                      Read Online
                    </Button>
                    <Button variant="outline" className="border-[#4f1b59] text-[#4f1b59] hover:bg-[#4f1b59] hover:text-white">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Subscribe Section */}
          <div className="mt-20 text-center bg-white rounded-2xl p-12 shadow-sm border border-gray-200 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-[#333333]">
              Stay Updated
            </h3>
            <p className="text-gray-600 mb-6 max-w-xl mx-auto">
              Subscribe to our newsletter to receive the latest updates directly in your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Input placeholder="Enter your email" className="flex-1 border-gray-300" />
              <Button className="font-medium bg-[#4f1b59] hover:bg-[#3d1445] text-white">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
