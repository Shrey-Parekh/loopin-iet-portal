
import { useState } from 'react';
import { Eye, EyeOff, LogIn, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempt:', formData);
  };

  return (
    <div className="min-h-screen gradient-subtle flex items-center justify-center px-4">
      <div className="absolute top-6 left-6">
        <Button asChild variant="outline" className="border hover:bg-gray-50" style={{ borderColor: 'var(--secondary-color)', color: 'var(--text-color)' }}>
          <Link to="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </Button>
      </div>

      <div className="w-full max-w-md animate-fade-in">
        <Card className="border border-gray-200 shadow-xl glass">
          <CardHeader className="text-center pb-8">
            <div className="w-16 h-16 gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
              <LogIn className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold" style={{ color: 'var(--text-color)' }}>
              Welcome Back
            </CardTitle>
            <p className="text-gray-600 mt-2">
              Sign in to your LoopIn account
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="font-medium" style={{ color: 'var(--text-color)' }}>
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  className="border-gray-300"
                  style={{ borderColor: 'var(--secondary-color)' }}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="font-medium" style={{ color: 'var(--text-color)' }}>
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    className="border-gray-300 pr-12"
                    style={{ borderColor: 'var(--secondary-color)' }}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300" style={{ accentColor: 'var(--secondary-color)' }} />
                  <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
                <Link to="/forgot-password" className="text-sm transition-colors" style={{ color: 'var(--secondary-color)' }}>
                  Forgot password?
                </Link>
              </div>

              <Button 
                type="submit"
                className="w-full gradient-primary text-white hover:opacity-90 transition-all duration-300 py-3 text-lg font-semibold"
              >
                Sign In
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link to="/register" className="font-semibold transition-colors" style={{ color: 'var(--secondary-color)' }}>
                  Sign up here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
