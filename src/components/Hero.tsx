
import { ArrowRight, Users, Calendar, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative py-24 lg:py-32 bg-white overflow-hidden">
      {/* Professional geometric background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-5" style={{ background: `linear-gradient(135deg, var(--secondary-color) 0%, transparent 70%)` }}></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/2 opacity-3" style={{ background: `linear-gradient(45deg, var(--secondary-color) 0%, transparent 100%)` }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content Section */}
            <div className="text-left">
              {/* Professional badge */}
              <div className="mb-6">
                <span className="inline-block px-4 py-2 bg-gray-50 rounded-md text-sm font-medium border" style={{ color: 'var(--secondary-color)', borderColor: 'var(--secondary-color)' }}>
                  IET College Committee Portal
                </span>
              </div>
              
              {/* Main heading */}
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight" style={{ color: 'var(--text-color)' }}>
                Welcome to{' '}
                <span style={{ color: 'var(--secondary-color)' }}>
                  LoopIn
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-lg lg:text-xl mb-8 text-gray-600 leading-relaxed max-w-lg">
                Your comprehensive gateway to the IET College Committee. Connect, collaborate, and stay informed with our vibrant academic community.
              </p>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button 
                  asChild
                  className="px-8 py-3 text-base font-semibold transition-all duration-200 hover:shadow-lg"
                  style={{ 
                    background: 'var(--secondary-color)',
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
                  className="px-8 py-3 text-base font-semibold border-2 transition-all duration-200 hover:bg-gray-50"
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
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 rounded-lg flex items-center justify-center" style={{ background: 'var(--secondary-color)' }}>
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-1" style={{ color: 'var(--text-color)' }}>50+</h3>
                  <p className="text-sm text-gray-600">Active Members</p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 rounded-lg flex items-center justify-center bg-gray-800">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-1" style={{ color: 'var(--text-color)' }}>25+</h3>
                  <p className="text-sm text-gray-600">Events This Year</p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 rounded-lg flex items-center justify-center border-2" style={{ borderColor: 'var(--secondary-color)' }}>
                    <FileText className="w-6 h-6" style={{ color: 'var(--secondary-color)' }} />
                  </div>
                  <h3 className="text-2xl font-bold mb-1" style={{ color: 'var(--text-color)' }}>12</h3>
                  <p className="text-sm text-gray-600">Newsletters</p>
                </div>
              </div>
            </div>

            {/* Visual Section */}
            <div className="relative">
              <div className="relative bg-white rounded-2xl shadow-xl border p-8" style={{ borderColor: 'rgba(79, 27, 89, 0.1)' }}>
                <div className="space-y-4">
                  <div className="h-4 rounded" style={{ background: 'var(--secondary-color)', width: '60%' }}></div>
                  <div className="h-3 bg-gray-200 rounded" style={{ width: '80%' }}></div>
                  <div className="h-3 bg-gray-200 rounded" style={{ width: '70%' }}></div>
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="h-20 rounded-lg" style={{ background: 'var(--secondary-color)', opacity: 0.1 }}></div>
                    <div className="h-20 bg-gray-100 rounded-lg"></div>
                  </div>
                  <div className="flex space-x-2 mt-4">
                    <div className="w-8 h-8 rounded-full" style={{ background: 'var(--secondary-color)' }}></div>
                    <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                    <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
