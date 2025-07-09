import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { Eye, EyeOff, KeyRound, CheckCircle } from 'lucide-react';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [step, setStep] = useState(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) {
      toast({ title: 'Error', description: 'User not found. Please log in again.', variant: 'destructive' });
      navigate('/login');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast({ title: 'Error', description: 'New passwords do not match.', variant: 'destructive' });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('https://loopin-iet-portal-1.onrender.com/api/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, currentPassword, newPassword })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast({ title: 'Password Changed', description: 'Your password has been updated.' });
        localStorage.removeItem('userId');
        navigate('/');
      } else {
        toast({ title: 'Error', description: data.error || 'Failed to change password.', variant: 'destructive' });
      }
    } catch (err) {
      toast({ title: 'Network Error', description: 'Could not connect to server.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  // Password strength calculation (simple)
  const getStrength = (pwd: string) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score;
  };

  // Update strength on newPassword change
  const handleNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
    setPasswordStrength(getStrength(e.target.value));
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-[#f8f5fc] via-[#e9d8fd] to-[#f3eafd]">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="w-full max-w-md z-10"
      >
        <Card className="border-none shadow-2xl bg-white/80 backdrop-blur-lg rounded-3xl">
          <CardHeader className="text-center pb-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 bg-gradient-to-br from-[#a259c6] to-[#4f1b59] shadow-lg"
            >
              <KeyRound className="w-7 h-7 text-white" />
            </motion.div>
            <CardTitle className="text-2xl font-bold text-[#4f1b59] drop-shadow-sm">
              Change Your Password
            </CardTitle>
            <p className="text-gray-600 mt-2 font-medium">
              For your security, please set a new password.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6 mt-2">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }} className="space-y-2">
                <Label htmlFor="currentPassword" className="font-medium text-[#4f1b59]">
                  Current Password
                </Label>
                <div className="relative">
                  <Input
                    id="currentPassword"
                    name="currentPassword"
                    type={showCurrent ? 'text' : 'password'}
                    value={currentPassword}
                    onChange={e => setCurrentPassword(e.target.value)}
                    placeholder="Enter your current password"
                    className="border-gray-300 h-12 text-base rounded-lg pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrent(v => !v)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#4f1b59] transition-colors"
                  >
                    {showCurrent ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }} className="space-y-2">
                <Label htmlFor="newPassword" className="font-medium text-[#4f1b59]">
                  New Password
                </Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type={showNew ? 'text' : 'password'}
                    value={newPassword}
                    onChange={handleNewPassword}
                    placeholder="Enter your new password"
                    className="border-gray-300 h-12 text-base rounded-lg pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew(v => !v)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#4f1b59] transition-colors"
                  >
                    {showNew ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {/* Password strength meter */}
                <div className="h-2 w-full bg-gray-200 rounded-full mt-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      passwordStrength <= 2 ? 'bg-red-400 w-1/5' :
                      passwordStrength === 3 ? 'bg-yellow-400 w-3/5' :
                      passwordStrength === 4 ? 'bg-blue-400 w-4/5' :
                      passwordStrength === 5 ? 'bg-green-500 w-full' : 'w-0'
                    }`}
                  />
                </div>
                <div className="text-xs mt-1 font-medium text-gray-500">
                  {passwordStrength <= 2 && newPassword ? 'Weak password' :
                    passwordStrength === 3 ? 'Moderate password' :
                    passwordStrength === 4 ? 'Strong password' :
                    passwordStrength === 5 ? 'Very strong password' : ''}
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }} className="space-y-2">
                <Label htmlFor="confirmPassword" className="font-medium text-[#4f1b59]">
                  Confirm New Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirm ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter your new password"
                    className="border-gray-300 h-12 text-base rounded-lg pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(v => !v)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#4f1b59] transition-colors"
                  >
                    {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.5 }}>
                <Button
                  type="submit"
                  className="w-full transition-all duration-200 py-3 text-lg font-semibold bg-gradient-to-r from-[#a259c6] to-[#4f1b59] hover:from-[#4f1b59] hover:to-[#a259c6] text-white shadow-md rounded-lg"
                  disabled={loading}
                >
                  {loading ? 'Updating...' : 'Update Password'}
                </Button>
              </motion.div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ChangePassword; 