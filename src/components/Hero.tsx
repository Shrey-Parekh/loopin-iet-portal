
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-purple-600 via-purple-500 to-purple-700 overflow-hidden">
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-transparent to-purple-800/20 animate-gradient-shift"></div>
      
      {/* Geometric shapes for depth */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-64 h-64 rounded-full border border-white/30 animate-float"></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 rounded-full border border-white/20 animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-white/10 animate-pulse-subtle"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge with entrance animation */}
          <div className="mb-8 animate-fade-in-up">
            <span className="inline-block px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium border border-white/20 text-white mb-6 hover:bg-white/20 transition-all duration-300">
              IET College Committee Portal
            </span>
          </div>
          
          {/* Main heading with staggered animation */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight animate-fade-in-up-delayed">
            Welcome to{' '}
            <span className="relative bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">
              LoopIn
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-white/80 to-purple-200 rounded-full animate-scale-in"></div>
            </span>
          </h1>

          {/* Subtitle with later animation */}
          <p className="text-xl md:text-2xl mb-12 text-white/90 max-w-3xl mx-auto leading-relaxed animate-fade-in-up-late">
            Your comprehensive gateway to the IET College Committee. Connect, collaborate, and stay informed with our vibrant academic community.
          </p>

          {/* CTA buttons with hover animations */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in-up-latest">
            <Button 
              asChild
              className="px-8 py-4 text-lg font-semibold bg-white text-purple-600 hover:bg-white/90 hover:scale-105 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <Link to="/team">
                Explore Committee
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>
            <Button 
              asChild
              variant="outline" 
              className="px-8 py-4 text-lg font-semibold border-2 border-white/30 text-white hover:bg-white/10 hover:scale-105 backdrop-blur-sm rounded-lg transition-all duration-300"
            >
              <Link to="/events">
                View Events
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/80 animate-bounce-subtle">
        <ChevronDown className="w-6 h-6" />
      </div>
    </section>
  );
};

export default Hero;
