import { ArrowRight, ChevronDown, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const Hero = () => {
  // Scroll animations for each main element
  const badgeRef = useScrollAnimation(0.1, 'animate-fade-in') as React.RefObject<HTMLDivElement>;
  const headingRef = useScrollAnimation(0.1, 'animate-scale-in') as React.RefObject<HTMLHeadingElement>;
  const subtitleRef = useScrollAnimation(0.1, 'animate-fade-in-up-late') as React.RefObject<HTMLParagraphElement>;
  const ctaRef = useScrollAnimation(0.1, 'animate-fade-in-up-latest') as React.RefObject<HTMLDivElement>;

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-[#4f1b59] via-purple-600 to-purple-800 overflow-hidden">
      {/* Animated background layers */}
      <div className="absolute inset-0">
        {/* Primary gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#4f1b59] via-purple-600 to-purple-800"></div>
        
      {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/40 via-transparent to-purple-800/40 animate-gradient-shift"></div>
      
        {/* Moving geometric shapes */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Large floating orbs */}
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-gradient-to-br from-purple-400/20 to-white/10 blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 rounded-full bg-gradient-to-br from-purple-300/30 to-purple-500/20 blur-2xl animate-float-delayed"></div>
          <div className="absolute top-1/3 right-1/4 w-32 h-32 rounded-full bg-gradient-to-br from-white/20 to-purple-200/10 blur-xl animate-float"></div>
          
          {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(90deg,transparent_50%,rgba(255,255,255,0.1)_50%),linear-gradient(0deg,transparent_50%,rgba(255,255,255,0.1)_50%)] bg-[length:50px_50px] animate-pulse-subtle"></div>
          </div>
          
          {/* Floating particles */}
          <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-white/60 rounded-full animate-float"></div>
          <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-purple-300/80 rounded-full animate-float-delayed"></div>
          <div className="absolute top-1/2 left-1/4 w-1.5 h-1.5 bg-white/40 rounded-full animate-float"></div>
          <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-purple-200/60 rounded-full animate-float-delayed"></div>
          
          {/* Animated wave effect */}
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-purple-900/30 via-transparent to-transparent animate-pulse-subtle"></div>
        </div>
        
        {/* Interactive light rays */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/20 to-transparent animate-pulse-subtle"></div>
          <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-purple-300/15 to-transparent animate-pulse-subtle" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-0 left-2/3 w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent animate-pulse-subtle" style={{animationDelay: '2s'}}></div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
          {/* Animated badge */}
          <div ref={badgeRef} className="mb-8">
            <span className="inline-block px-6 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold border border-white/30 text-white tracking-wide shadow-md hover:bg-white/30 transition-all duration-300">
              Empowering Innovation & Community
            </span>
          </div>
          {/* REVISED heading */}
          <h1 ref={headingRef} className="text-5xl md:text-7xl font-normal mb-4 text-white leading-tight tracking-tight drop-shadow-2xl font-[Bevan,serif]">
            <span className="animate-text-gradient bg-gradient-to-r from-purple-200 via-white to-purple-200 bg-clip-text text-transparent font-[Bevan,serif] font-normal">
              Welcome to LoopIn
            </span>
          </h1>
          {/* REVISED subtitle */}
          <p ref={subtitleRef} className="text-xl md:text-2xl mb-12 text-purple-200/90 max-w-2xl mx-auto leading-relaxed">
            The IET College Committee Portal.
          </p>
          {/* REVISED CTA buttons */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            <Button 
              asChild
              className="px-8 py-4 text-lg font-semibold bg-white text-[#4f1b59] hover:bg-purple-100 hover:scale-110 rounded-lg shadow-lg hover:shadow-2xl transform transition-all duration-300 group"
            >
              <Link to="/team">
                Meet the Committee
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>
            <Button 
              asChild
              className="px-8 py-4 text-lg font-semibold bg-white text-[#4f1b59] hover:bg-purple-100 hover:scale-110 rounded-lg shadow-lg hover:shadow-2xl transform transition-all duration-300 group"
            >
              <Link to="/events">
                Explore Events
                <Calendar className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
      {/* Fade to white overlay */}
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-white to-transparent pointer-events-none z-20"></div>

      {/* Animated scroll indicator (behind the fade) */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-500 animate-bounce-subtle z-10">
        <ChevronDown className="w-8 h-8" />
      </div>
    </section>
  );
};

export default Hero;
