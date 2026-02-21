import { useState } from 'react';
import { Eye, EyeOff, LogIn, ArrowLeft, Lock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    userId: '',
    password: ''
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [showForgot, setShowForgot] = useState(false);
  const [resetMessage, setResetMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResetMessage('');
    try {
      const res = await fetch('https://loopin-iet-portal-1.onrender.com/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: formData.userId, password: formData.password })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userId', formData.userId);
        if (formData.password === 'password123') {
          navigate('/change-password');
        } else {
          navigate('/');
        }
      } else {
        setLoginAttempts(a => a + 1);
        if (loginAttempts === 0) setShowForgot(true);
        toast({ title: 'Login Failed', description: data.error || 'Invalid credentials', variant: 'destructive' });
      }
    } catch (err) {
      toast({ title: 'Network Error', description: 'Could not connect to server.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    setLoading(true);
    setResetMessage('');
    try {
      const res = await fetch('https://loopin-iet-portal-1.onrender.com/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: formData.userId })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setResetMessage('Your password has been reset to the default: password123. Please log in and change your password.');
        setShowForgot(false);
      } else {
        toast({ title: 'Error', description: data.error || 'Failed to reset password.', variant: 'destructive' });
      }
    } catch (err) {
      toast({ title: 'Network Error', description: 'Could not connect to server.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-2 sm:px-4 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #f8f6ff 0%, #f3e8ff 25%, #e0c3fc 50%, #d4b5f7 75%, #fff 100%)' }}>
      {/* Revolutionary Animated Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Primary gradient orbs with enhanced animations */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
          animate={{ 
            opacity: [0.12, 0.20, 0.12], 
            scale: [0.8, 1.2, 0.8], 
            rotate: [0, 180, 360],
            x: [0, 30, 0],
            y: [0, -20, 0]
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity, 
            ease: "easeInOut",
            times: [0, 0.5, 1]
          }}
          className="absolute top-[-20%] left-[-20%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-br from-[#a259c6] via-[#f3e8ff] to-[#4f1b59] blur-3xl"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
          animate={{ 
            opacity: [0.10, 0.16, 0.10], 
            scale: [0.9, 1.1, 0.9], 
            rotate: [360, 180, 0],
            x: [0, -25, 0],
            y: [0, 15, 0]
          }}
          transition={{ 
            duration: 18, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 2,
            times: [0, 0.5, 1]
          }}
          className="absolute bottom-[-20%] right-[-20%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-[#4f1b59] via-[#e0c3fc] to-[#a259c6] blur-3xl"
        />

        {/* Secondary ambient orbs */}
        <motion.div
          animate={{ 
            opacity: [0.06, 0.12, 0.06],
            scale: [0.8, 1.3, 0.8],
            rotate: [0, 90, 180],
            x: [0, 20, 0],
            y: [0, -15, 0]
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute top-[30%] left-[-25%] w-[35vw] h-[35vw] rounded-full bg-gradient-to-br from-[#f9e7ff] via-[#ffe6fa] to-[#e0c3fc] blur-3xl"
        />
        
        <motion.div
          animate={{ 
            opacity: [0.05, 0.10, 0.05],
            scale: [0.7, 1.2, 0.7],
            rotate: [180, 270, 360],
            x: [0, -20, 0],
            y: [0, 10, 0]
          }}
          transition={{ 
            duration: 16, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 3
          }}
          className="absolute bottom-[20%] right-[-30%] w-[30vw] h-[30vw] rounded-full bg-gradient-to-br from-[#fff] via-[#e0c3fc] to-[#d4b5f7] blur-3xl"
        />

        {/* Enhanced floating particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute rounded-full ${
                i % 3 === 0 ? 'w-2 h-2 bg-white/30' : 
                i % 3 === 1 ? 'w-1.5 h-1.5 bg-[#a259c6]/40' : 
                'w-1 h-1 bg-[#4f1b59]/50'
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30 - Math.random() * 15, 0],
                x: [0, (Math.random() - 0.5) * 20, 0],
                opacity: [0.3, 0.9, 0.3],
                scale: [0.8, 1.5, 0.8],
                rotate: [0, 360],
              }}
              transition={{
                duration: 3 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Geometric patterns */}
        <div className="absolute inset-0 opacity-10">
          <motion.div
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.1, 1],
              opacity: [0.08, 0.15, 0.08]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-[#a259c6]/40 rounded-full"
          />
          <motion.div 
            animate={{ 
              rotate: [360, 0],
              scale: [0.9, 1.2, 0.9],
              opacity: [0.06, 0.12, 0.06]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            className="absolute bottom-1/3 right-1/3 w-24 h-24 border-2 border-[#4f1b59]/35 rounded-full"
          />
        </div>
                
        {/* Enhanced gradient overlay */}
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-white/70 via-white/20 to-transparent" />
        <div className="absolute top-0 left-0 w-full h-30 bg-gradient-to-b from-white/30 via-transparent to-transparent" />
      </div>
      <div className="absolute top-3 left-3 sm:top-6 sm:left-6 z-10">
        <Button asChild variant="outline" className="border hover:bg-gray-100 transition-colors duration-200 border-[#a259c6] text-[#4f1b59] px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-base">
          <Link to="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </Button>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="w-full max-w-xs sm:max-w-md z-10"
      >
        <Card className="border-none shadow-2xl bg-white/80 backdrop-blur-lg rounded-2xl sm:rounded-3xl px-2 py-4 sm:px-0 sm:py-0">
          <CardHeader className="text-center pb-4 sm:pb-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4 bg-gradient-to-br from-[#a259c6] to-[#4f1b59] shadow-lg"
            >
              <LogIn className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </motion.div>
            <CardTitle className="text-2xl sm:text-3xl font-bold text-[#4f1b59] drop-shadow-sm">
              Welcome Back
            </CardTitle>
            <p className="text-base sm:text-lg text-gray-600 mt-1 sm:mt-2 font-medium">
              Sign in with your User ID & password
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 mt-1 sm:mt-2">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }} className="space-y-1 sm:space-y-2">
                <Label htmlFor="userId" className="font-medium text-[#4f1b59] text-sm sm:text-base">
                  User ID
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="userId"
                    name="userId"
                    type="text"
                    value={formData.userId}
                    onChange={handleInputChange}
                    placeholder="Enter your User ID"
                    className="pl-10 border-gray-300 h-10 sm:h-12 text-sm sm:text-base rounded-lg"
                    required
                  />
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }} className="space-y-1 sm:space-y-2">
                <Label htmlFor="password" className="font-medium text-[#4f1b59] text-sm sm:text-base">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    className="pl-10 pr-10 border-gray-300 h-10 sm:h-12 text-sm sm:text-base rounded-lg"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#4f1b59] transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.5 }} className="flex items-center justify-between">
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.5 }}>
              <Button 
                type="submit"
                  className="w-full transition-all duration-200 py-2 sm:py-3 text-base sm:text-lg font-semibold bg-gradient-to-r from-[#a259c6] to-[#4f1b59] hover:from-[#4f1b59] hover:to-[#a259c6] text-white shadow-md rounded-lg"
                  disabled={loading}
              >
                  {loading ? 'Signing In...' : 'Sign In'}
              </Button>
              </motion.div>
              {showForgot && (
                <div className="text-center mt-1 sm:mt-2">
                  <button
                    type="button"
                    className="text-xs sm:text-sm text-[#a259c6] font-semibold hover:underline focus:outline-none"
                    onClick={handleForgotPassword}
                    disabled={loading}
                  >
                    Forgot password?
                  </button>
                </div>
              )}
              {resetMessage && (
                <div className="text-center text-green-600 text-xs sm:text-sm mt-1 sm:mt-2 animate-fade-in-up">{resetMessage}</div>
              )}
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;
