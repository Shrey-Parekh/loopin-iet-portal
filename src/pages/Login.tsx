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
    <div className="min-h-screen flex items-center justify-center px-2 sm:px-4 relative bg-gradient-to-br from-[#f8f5fc] via-[#e9d8fd] to-[#f3eafd] overflow-hidden">
      {/* Animated background shapes */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.18, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="absolute -top-32 -left-32 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-gradient-to-br from-[#a259c6] via-[#4f1b59] to-[#a259c6] blur-3xl rounded-full z-0"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.12, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.4 }}
        className="absolute bottom-0 right-0 w-[200px] h-[200px] sm:w-[400px] sm:h-[400px] bg-gradient-to-tr from-[#4f1b59] via-[#a259c6] to-[#f3eafd] blur-2xl rounded-full z-0"
      />
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
