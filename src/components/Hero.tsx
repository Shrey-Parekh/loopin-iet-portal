
import { ArrowRight, Users, Calendar, FileText, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-white via-gray-50 to-gray-100 overflow-hidden">
      {/* Subtle geometric background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-64 h-64 rounded-full border border-[#4f1b59]"></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 rounded-full border border-[#4f1b59]"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-[#4f1b59]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main content */}
          <div className="mb-8">
            <span className="inline-block px-4 py-2 bg-white rounded-full text-sm font-medium border border-gray-200 text-[#4f1b59] mb-6">
              IET College Committee Portal
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-[#333333] leading-tight">
            Welcome to{' '}
            <span className="text-[#4f1b59] relative">
              LoopIn
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#4f1b59] to-purple-400 rounded-full"></div>
            </span>
          </h1>

          <p className="text-xl md:text-2xl mb-12 text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Your comprehensive gateway to the IET College Committee. Connect, collaborate, and stay informed with our vibrant academic community.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              asChild
              className="px-8 py-4 text-lg font-semibold bg-[#4f1b59] hover:bg-[#3d1445] text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Link to="/team">
                Explore Committee
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button 
              asChild
              variant="outline" 
              className="px-8 py-4 text-lg font-semibold border-2 border-[#4f1b59] text-[#4f1b59] hover:bg-[#4f1b59] hover:text-white rounded-lg transition-all duration-200"
            >
              <Link to="/events">
                View Events
              </Link>
            </Button>
          </div>

          {/* Stats section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-[#4f1b59] flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-[#333333] mb-2">50+</h3>
              <p className="text-gray-600">Active Members</p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-gray-800 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-[#333333] mb-2">25+</h3>
              <p className="text-gray-600">Events This Year</p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="w-12 h-12 mx-auto mb-4 rounded-lg border-2 border-[#4f1b59] flex items-center justify-center">
                <FileText className="w-6 h-6 text-[#4f1b59]" />
              </div>
              <h3 className="text-3xl font-bold text-[#333333] mb-2">12</h3>
              <p className="text-gray-600">Newsletters</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-[#4f1b59]">
        <ChevronDown className="w-6 h-6 animate-bounce" />
      </div>
    </section>
  );
};

export default Hero;
