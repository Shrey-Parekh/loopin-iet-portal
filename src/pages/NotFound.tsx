
import { Home, ArrowLeft, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        {/* Animated 404 */}
        <div className="mb-8 animate-bounce-in">
          <h1 className="text-9xl font-black bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent mb-4 animate-shimmer">
            404
          </h1>
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Sparkles className="w-6 h-6 text-orange-500 animate-pulse" />
            <span className="text-2xl font-bold text-gray-800">Page Not Found</span>
            <Sparkles className="w-6 h-6 text-orange-500 animate-pulse" />
          </div>
        </div>

        {/* Description */}
        <div className="mb-12 animate-fade-in delay-200">
          <p className="text-xl text-gray-600 mb-6 leading-relaxed">
            Oops! Looks like you've wandered off the beaten path. 
            The page you're looking for doesn't exist in our universe.
          </p>
          <p className="text-lg text-gray-500">
            But don't worry, our amazing LoopIn portal has plenty of other exciting pages to explore!
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-in-left delay-400">
          <Button 
            asChild
            className="gradient-primary text-white px-8 py-4 text-lg font-bold hover:scale-105 transition-all duration-300 hover:shadow-xl border-0"
          >
            <Link to="/">
              <Home className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
          </Button>
          
          <Button 
            asChild
            variant="outline"
            className="border-3 border-orange-400 text-orange-600 hover:bg-orange-50 px-8 py-4 text-lg font-bold hover:scale-105 transition-all duration-300"
            onClick={() => window.history.back()}
          >
            <Link to="#" onClick={(e) => { e.preventDefault(); window.history.back(); }}>
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go Back
            </Link>
          </Button>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-20 w-20 h-20 bg-orange-200 rounded-full opacity-20 animate-float"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-amber-200 rounded-full opacity-20 animate-float delay-300"></div>
        <div className="absolute top-1/2 left-10 w-16 h-16 bg-yellow-200 rounded-full opacity-10 animate-pulse"></div>
      </div>
    </div>
  );
};

export default NotFound;
