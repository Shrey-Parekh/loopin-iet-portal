
import { ArrowRight, Users, Calendar, FileText, Sparkles, Zap, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 py-24">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-200 rounded-full opacity-20 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-200 rounded-full opacity-20 animate-float delay-300"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-200 rounded-full opacity-10 animate-pulse"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Main heading with enhanced animations */}
          <div className="mb-8 animate-bounce-in">
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="w-8 h-8 text-orange-500 animate-pulse" />
              <span className="mx-4 px-6 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold">
                Welcome to the Future
              </span>
              <Sparkles className="w-8 h-8 text-orange-500 animate-pulse" />
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black text-gray-800 mb-6 leading-tight">
              Welcome to{' '}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent animate-shimmer">
                  LoopIn
                </span>
                <div className="absolute -bottom-4 left-0 right-0 h-2 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full opacity-60 animate-pulse"></div>
              </span>
            </h1>
          </div>

          <div className="mb-12 animate-slide-in-left delay-200">
            <p className="text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed font-medium">
              Your gateway to the <span className="text-orange-600 font-bold">IET College Committee</span>. 
              Stay connected, get involved, and be part of something{' '}
              <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent font-bold">
                extraordinary
              </span>
            </p>
          </div>

          {/* Enhanced CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-slide-in-right delay-400">
            <Button 
              asChild
              className="gradient-primary text-white px-10 py-4 text-xl font-bold group hover:scale-105 transition-all duration-300 hover:shadow-2xl border-0"
            >
              <Link to="/team">
                Get Started
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
            </Button>
            <Button 
              asChild
              variant="outline" 
              className="border-3 border-orange-400 text-orange-600 hover:bg-orange-50 px-10 py-4 text-xl font-bold hover:scale-105 transition-all duration-300 hover:shadow-xl"
            >
              <Link to="/events">
                Explore Events
                <Zap className="w-6 h-6 ml-3" />
              </Link>
            </Button>
          </div>
          
          {/* Enhanced Stats with staggered animations */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            <div className="text-center group cursor-pointer animate-bounce-in delay-100 hover-lift">
              <div className="relative mb-6">
                <div className="w-20 h-20 gradient-primary rounded-3xl flex items-center justify-center mx-auto group-hover:rotate-12 transition-all duration-500 shadow-xl">
                  <Users className="w-10 h-10 text-white animate-float" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                  <Star className="w-3 h-3 text-white" />
                </div>
              </div>
              <h3 className="text-4xl font-black text-gray-800 mb-3 group-hover:text-orange-600 transition-colors duration-300">
                50+
              </h3>
              <p className="text-gray-600 font-semibold text-lg">Active Members</p>
              <div className="w-16 h-1 bg-orange-400 rounded-full mx-auto mt-3 group-hover:w-24 transition-all duration-300"></div>
            </div>

            <div className="text-center group cursor-pointer animate-bounce-in delay-200 hover-lift">
              <div className="relative mb-6">
                <div className="w-20 h-20 gradient-secondary rounded-3xl flex items-center justify-center mx-auto group-hover:rotate-12 transition-all duration-500 shadow-xl">
                  <Calendar className="w-10 h-10 text-white animate-float delay-100" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center">
                  <Star className="w-3 h-3 text-white" />
                </div>
              </div>
              <h3 className="text-4xl font-black text-gray-800 mb-3 group-hover:text-green-600 transition-colors duration-300">
                25+
              </h3>
              <p className="text-gray-600 font-semibold text-lg">Events This Year</p>
              <div className="w-16 h-1 bg-green-400 rounded-full mx-auto mt-3 group-hover:w-24 transition-all duration-300"></div>
            </div>

            <div className="text-center group cursor-pointer animate-bounce-in delay-300 hover-lift">
              <div className="relative mb-6">
                <div className="w-20 h-20 gradient-accent rounded-3xl flex items-center justify-center mx-auto group-hover:rotate-12 transition-all duration-500 shadow-xl">
                  <FileText className="w-10 h-10 text-white animate-float delay-200" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-400 rounded-full flex items-center justify-center">
                  <Star className="w-3 h-3 text-white" />
                </div>
              </div>
              <h3 className="text-4xl font-black text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                12
              </h3>
              <p className="text-gray-600 font-semibold text-lg">Newsletters Published</p>
              <div className="w-16 h-1 bg-blue-400 rounded-full mx-auto mt-3 group-hover:w-24 transition-all duration-300"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
