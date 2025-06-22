import { Home, ArrowLeft, Frown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-50 dark:from-purple-900/10 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-indigo-50 dark:from-indigo-900/10 via-transparent to-transparent"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-100 dark:bg-purple-900/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-indigo-100 dark:bg-indigo-900/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>
      
      <div className="text-center max-w-lg mx-auto relative z-10">
        <div className="mb-8">
          <h1 className="text-8xl md:text-9xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent mb-4 animate-fade-in-up">
            404
          </h1>
          <div className="flex items-center justify-center space-x-3 mb-6 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <Frown className="w-8 h-8 text-purple-500 dark:text-purple-400" />
            <span className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">Page Not Found</span>
          </div>
        </div>

        <div className="mb-12 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            Oops! The page you are looking for does not exist. It might have been moved or deleted.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          <Button 
            asChild
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-base font-semibold shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105"
          >
            <Link to="/">
              <Home className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
          </Button>
          
          <Button 
            asChild
            variant="outline"
            className="border-2 border-purple-500 text-purple-600 hover:bg-purple-50 hover:text-purple-700 dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-900/30 dark:hover:text-white px-8 py-3 text-base font-semibold transform transition-all duration-300 hover:scale-105"
          >
            <Link to="#" onClick={(e) => { e.preventDefault(); window.history.back(); }}>
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go Back
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
