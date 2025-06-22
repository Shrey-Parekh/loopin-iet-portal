
import { ArrowRight, Users, Calendar, FileText, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative overflow-hidden py-32 lg:py-40" style={{ background: 'linear-gradient(135deg, var(--primary-color) 0%, rgba(79, 27, 89, 0.03) 100%)' }}>
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 rounded-full opacity-5 animate-slow-float" style={{ backgroundColor: 'var(--secondary-color)' }}></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full opacity-3" style={{ backgroundColor: 'var(--secondary-color)' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Professional badge */}
          <div className="mb-8 animate-fade-in-up">
            <span className="inline-block px-6 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium border border-gray-200 shadow-sm" style={{ color: 'var(--secondary-color)' }}>
              IET College Committee Portal
            </span>
          </div>
          
          {/* Main heading */}
          <div className="mb-8 animate-fade-in-up delay-200">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight" style={{ color: 'var(--text-color)' }}>
              Welcome to{' '}
              <span className="relative inline-block">
                <span style={{ 
                  background: `linear-gradient(135deg, var(--secondary-color) 0%, #6a2c70 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  LoopIn
                </span>
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <div className="mb-12 animate-fade-in-up delay-300">
            <p className="text-xl md:text-2xl mb-6 max-w-3xl mx-auto leading-relaxed text-gray-600 font-light">
              Your comprehensive gateway to the <span className="font-medium" style={{ color: 'var(--secondary-color)' }}>IET College Committee</span>. 
              Connect, collaborate, and stay informed with our vibrant academic community.
            </p>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in-up delay-400">
            <Button 
              asChild
              className="px-8 py-4 text-lg font-medium hover:scale-105 transition-all duration-300 shadow-lg border-0"
              style={{ 
                background: `linear-gradient(135deg, var(--secondary-color) 0%, #6a2c70 100%)`,
                color: 'white'
              }}
            >
              <Link to="/team">
                Explore Committee
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button 
              asChild
              variant="outline" 
              className="px-8 py-4 text-lg font-medium border-2 hover:scale-105 transition-all duration-300 bg-white/80 backdrop-blur-sm"
              style={{ 
                borderColor: 'var(--secondary-color)', 
                color: 'var(--secondary-color)' 
              }}
            >
              <Link to="/events">
                View Events
              </Link>
            </Button>
          </div>
          
          {/* Professional Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            <div className="text-center group animate-fade-in-up delay-500">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300" style={{ background: `linear-gradient(135deg, var(--secondary-color) 0%, #6a2c70 100%)` }}>
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-color)' }}>
                50+
              </h3>
              <p className="text-gray-600 font-medium">Active Members</p>
            </div>

            <div className="text-center group animate-fade-in-up delay-600">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300" style={{ background: `linear-gradient(135deg, var(--text-color) 0%, #555555 100%)` }}>
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-color)' }}>
                25+
              </h3>
              <p className="text-gray-600 font-medium">Events This Year</p>
            </div>

            <div className="text-center group animate-fade-in-up delay-700">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 bg-white border-2" style={{ borderColor: 'var(--secondary-color)' }}>
                <FileText className="w-8 h-8" style={{ color: 'var(--secondary-color)' }} />
              </div>
              <h3 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-color)' }}>
                12
              </h3>
              <p className="text-gray-600 font-medium">Newsletters Published</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-6 h-6 text-gray-400" />
      </div>
    </section>
  );
};

export default Hero;
