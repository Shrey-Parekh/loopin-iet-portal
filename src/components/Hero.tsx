
import { ArrowRight, Users, Calendar, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-white via-purple-50 to-[#4f1b59]/10 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-[#333333] mb-6 leading-tight">
            Welcome to{' '}
            <span className="text-[#4f1b59] relative">
              LoopIn
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-[#4f1b59]/30 rounded-full"></div>
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Your gateway to the IET College Committee. Stay connected, get involved, and be part of something amazing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button className="bg-[#4f1b59] hover:bg-[#4f1b59]/90 text-white px-8 py-3 text-lg group">
              Get Started
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
            </Button>
            <Button variant="outline" className="border-[#4f1b59] text-[#4f1b59] hover:bg-[#4f1b59] hover:text-white px-8 py-3 text-lg">
              Learn More
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center group cursor-pointer">
              <div className="w-16 h-16 bg-[#4f1b59]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#4f1b59]/20 transition-colors duration-200">
                <Users className="w-8 h-8 text-[#4f1b59]" />
              </div>
              <h3 className="text-2xl font-bold text-[#333333] mb-2">50+</h3>
              <p className="text-gray-600">Active Members</p>
            </div>
            <div className="text-center group cursor-pointer">
              <div className="w-16 h-16 bg-[#4f1b59]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#4f1b59]/20 transition-colors duration-200">
                <Calendar className="w-8 h-8 text-[#4f1b59]" />
              </div>
              <h3 className="text-2xl font-bold text-[#333333] mb-2">25+</h3>
              <p className="text-gray-600">Events This Year</p>
            </div>
            <div className="text-center group cursor-pointer">
              <div className="w-16 h-16 bg-[#4f1b59]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#4f1b59]/20 transition-colors duration-200">
                <FileText className="w-8 h-8 text-[#4f1b59]" />
              </div>
              <h3 className="text-2xl font-bold text-[#333333] mb-2">12</h3>
              <p className="text-gray-600">Newsletters Published</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
