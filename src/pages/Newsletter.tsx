
import { FileText, Download, Calendar, Eye } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Header from '../components/Header';

const Newsletter = () => {
  const newsletters = [
    {
      id: 1,
      title: "IET Committee Monthly Digest - December 2024",
      date: "December 15, 2024",
      description: "Featuring our latest tech events, member spotlights, and upcoming workshops for the new year.",
      thumbnail: "/placeholder.svg",
      downloadUrl: "#"
    },
    {
      id: 2,
      title: "Innovation Week Special Edition",
      date: "November 20, 2024",
      description: "Complete coverage of Innovation Week 2024, including winning projects and guest speaker highlights.",
      thumbnail: "/placeholder.svg",
      downloadUrl: "#"
    },
    {
      id: 3,
      title: "IET Committee Quarterly Review - Q3 2024",
      date: "October 10, 2024",
      description: "Quarterly achievements, new member introductions, and exciting plans for the final quarter.",
      thumbnail: "/placeholder.svg",
      downloadUrl: "#"
    },
    {
      id: 4,
      title: "Summer Workshop Series Recap",
      date: "August 25, 2024",
      description: "Comprehensive review of our successful summer workshop series and participant feedback.",
      thumbnail: "/placeholder.svg",
      downloadUrl: "#"
    },
    {
      id: 5,
      title: "Tech Talk Series Launch",
      date: "July 15, 2024",
      description: "Announcing our new monthly tech talk series with industry experts and alumni speakers.",
      thumbnail: "/placeholder.svg",
      downloadUrl: "#"
    },
    {
      id: 6,
      title: "IET Committee Annual Report 2023-24",
      date: "June 30, 2024",
      description: "Our comprehensive annual report showcasing achievements, impact metrics, and future roadmap.",
      thumbnail: "/placeholder.svg",
      downloadUrl: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-6xl font-black text-gray-800 mb-6">
              Newsletter <span className="bg-gradient-to-r from-purple-800 to-purple-600 bg-clip-text text-transparent">Archive</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
              Stay updated with our latest news, events, and committee activities through our comprehensive newsletter collection.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-purple-800 rounded-full mx-auto mt-6"></div>
          </div>
        </div>
      </section>

      {/* Newsletter Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsletters.map((newsletter, index) => (
              <Card 
                key={newsletter.id}
                className={`group hover:shadow-xl transition-all duration-500 border border-gray-200 overflow-hidden hover-lift animate-bounce-in delay-${(index % 6 + 1) * 100} bg-white`}
              >
                <div className="aspect-video bg-gradient-to-br from-purple-100 to-gray-100 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <FileText className="w-16 h-16 text-purple-600 opacity-20" />
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-purple-700 border border-purple-200">
                      Newsletter
                    </span>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Calendar className="w-4 h-4 mr-2" />
                    {newsletter.date}
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-800 mb-3 group-hover:text-purple-700 transition-colors duration-300 leading-tight">
                    {newsletter.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                    {newsletter.description}
                  </p>
                  
                  <div className="flex space-x-3">
                    <Button 
                      size="sm" 
                      className="gradient-primary text-white hover:opacity-90 transition-all duration-300 flex-1"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Read Online
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="border border-gray-300 hover:bg-gray-50"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-black text-gray-800 mb-6">
              Stay <span className="bg-gradient-to-r from-purple-800 to-purple-600 bg-clip-text text-transparent">Connected</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Subscribe to receive our latest newsletters directly in your inbox and never miss an update.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
              <Button className="gradient-primary text-white hover:opacity-90 transition-all duration-300 px-8">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Newsletter;
