import Header from '../components/Header';
import { useState, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Image as ImageIcon, ArrowLeft } from 'lucide-react';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Briefcase, Sparkles, Building2 } from 'lucide-react';

const DEPARTMENT_OPTIONS = [
  'Technicals', 'Research', 'Digital Creatives', 'Inhouse Creatives', 'SMCW', 'Photography', 'Logistics', 'Marketing',
];
const POSITION_OPTIONS = [
  'Chairperson', 'Vice-chairperson', 'Secretary', 'Director', 'Treasurer', 'Head', 'Subhead', 'Executive', 'Mentor', 'Research Lead',
];
const COURSE_OPTIONS = ["B. Tech.", "BTI", "MCA", "M. Tech", "MBA Tech"];
const YEAR_OPTIONS = ["1", "2", "3", "4", "5", "6"];

const AddAchievement = () => {
  const [form, setForm] = useState({
    name: '',
    achievement_title: '',
    date: '',
    image: '',
    discription: '',
    Course: '',
    Year: '',
    department: '',
    Position: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      const reader = new FileReader();
      reader.onload = () => setForm(f => ({ ...f, image: reader.result as string }));
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  const handleImageDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => setForm(f => ({ ...f, image: reader.result as string }));
      reader.readAsDataURL(file);
    }
  };
  const API_BASE = 'https://loopin-iet-portal-1.onrender.com/api/achievements';
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed to add achievement');
      toast({ title: 'Achievement Added', description: 'Your achievement was added successfully.' });
      navigate('/achievements');
    } catch (err) {
      toast({ title: 'Error', description: 'Failed to add achievement', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen relative overflow-x-hidden" style={{ background: 'linear-gradient(120deg, #f8f6ff 0%, #f3e8ff 40%, #e0c3fc 70%, #fff 100%)' }}>
      {/* Animated background shapes */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 0.13, scale: 1 }} transition={{ duration: 2, ease: 'easeOut' }} className="absolute top-[-12%] left-[-10%] w-[65vw] h-[65vw] rounded-full bg-gradient-to-br from-[#a259c6] via-[#f3e8ff] to-[#4f1b59] blur-3xl" />
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 0.09, scale: 1 }} transition={{ duration: 2, delay: 0.5, ease: 'easeOut' }} className="absolute bottom-[-10%] right-[-10%] w-[55vw] h-[55vw] rounded-full bg-gradient-to-br from-[#4f1b59] via-[#f3e8ff] to-[#fff] blur-3xl" />
        <motion.div initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 0.07, scale: 1 }} transition={{ duration: 2.2, delay: 0.8, ease: 'easeOut' }} className="absolute top-[30%] left-[-15%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-br from-[#f9e7ff] via-[#ffe6fa] to-[#fff] blur-3xl" />
        <motion.div initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 0.06, scale: 1 }} transition={{ duration: 2.2, delay: 1.1, ease: 'easeOut' }} className="absolute bottom-[10%] right-[-18%] w-[38vw] h-[38vw] rounded-full bg-gradient-to-br from-[#fff] via-[#e0c3fc] to-[#f3e8ff] blur-3xl" />
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-white/80 via-white/0 to-transparent" />
      </div>
      <Header />
      <div className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.span
              className="inline-block px-6 py-3 bg-gradient-to-r from-[#a259c6] to-[#4f1b59] text-white rounded-full text-sm font-semibold mb-6 shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Achievement Submission
            </motion.span>
            <motion.h1
              className="text-5xl md:text-6xl font-abril font-extrabold text-[#2d1b3d] mb-6 tracking-tight"
              style={{ fontFamily: "'Abril Fatface', serif" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Add New Achievement
            </motion.h1>
            <motion.p
              className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Fill in the details below to add a new achievement. Make it inspiring!
            </motion.p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, type: 'spring' }}
            className="mx-auto w-full max-w-2xl px-2 sm:px-4"
          >
            <div className="bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/30 p-0 md:p-0 overflow-hidden hover:shadow-[0_8px_40px_0_rgba(162,89,198,0.13)] transition-all duration-300">
              <div className="bg-gradient-to-r from-[#a259c6]/80 to-[#4f1b59]/80 px-4 sm:px-8 py-6 sm:py-8 text-white text-center">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-['Abril Fatface','Doto',cursive,serif] mb-2 tracking-wider">Achievement Details Form</h2>
                <p className="text-sm sm:text-base md:text-lg opacity-90">Share a proud moment with the community!</p>
              </div>
              <form onSubmit={handleSubmit} className="flex flex-col gap-8 sm:gap-10 px-3 sm:px-6 md:px-10 py-6 sm:py-10 bg-white/90">
                {/* Achievement Details Section */}
                <div>
                  <div className="font-['Dosis',sans-serif] text-lg sm:text-xl font-bold text-[#4f1b59] mb-4 sm:mb-6 mt-2">Achievement Details</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-7">
                    {/* Name Field */}
                    <div className="relative">
                      <input
                        name="name"
                        id="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="peer w-full px-4 pt-6 pb-2 text-base bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#a259c6]/40 focus:border-[#a259c6] shadow-sm transition-all placeholder-transparent"
                        placeholder=" "
                        autoComplete="off"
                      />
                      <label htmlFor="name" className="absolute left-4 top-2 text-gray-500 text-sm font-medium pointer-events-none transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-[#a259c6]">Name</label>
                    </div>
                    {/* Achievement Title Field */}
                    <div className="relative">
                      <input
                        name="achievement_title"
                        id="achievement_title"
                        value={form.achievement_title}
                        onChange={handleChange}
                        required
                        className="peer w-full px-4 pt-6 pb-2 text-base bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#a259c6]/40 focus:border-[#a259c6] shadow-sm transition-all placeholder-transparent"
                        placeholder=" "
                        autoComplete="off"
                      />
                      <label htmlFor="achievement_title" className="absolute left-4 top-2 text-gray-500 text-sm font-medium pointer-events-none transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-[#a259c6]">Achievement Title</label>
                    </div>
                    {/* Date Field */}
                    <div className="relative col-span-1 md:col-span-2">
                      <input
                        name="date"
                        id="date"
                        type="date"
                        value={form.date}
                        onChange={handleChange}
                        required
                        className="peer w-full px-4 pt-6 pb-2 text-base bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#a259c6]/40 focus:border-[#a259c6] shadow-sm transition-all placeholder-transparent"
                        placeholder=" "
                        autoComplete="off"
                      />
                      <label htmlFor="date" className="absolute left-4 top-2 text-gray-500 text-sm font-medium pointer-events-none transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-[#a259c6]">Date of Achievement</label>
                    </div>
                  </div>
                </div>
                {/* Image Section */}
                <div>
                  <div className="font-['Dosis',sans-serif] text-lg sm:text-xl font-bold text-[#4f1b59] mb-4 sm:mb-6 mt-2">Achievement Image</div>
                  <label htmlFor="image" className="font-['Dosis',sans-serif] font-medium text-[#4f1b59] mb-1 text-base">Upload Image</label>
                  <div className="flex flex-col sm:flex-row items-center gap-4 relative border-2 border-dashed border-[#a259c6] rounded-xl bg-white/80 min-h-[3.2rem] px-4 sm:px-6 py-4 cursor-pointer transition-all duration-200 hover:border-[#4f1b59]"
                    onDragOver={e => { e.preventDefault(); e.currentTarget.classList.add('dragover'); }}
                    onDragLeave={e => { e.preventDefault(); e.currentTarget.classList.remove('dragover'); }}
                    onDrop={e => { e.currentTarget.classList.remove('dragover'); handleImageDrop(e); }}
                    onClick={() => imageInputRef.current?.click()}
                  >
                    <ImageIcon className="w-7 h-7 text-[#a259c6]" />
                    <span className="text-[#a259c6] font-medium select-none">Drag & drop or click to upload</span>
                    <input
                      ref={imageInputRef}
                      name="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImage}
                      className="hidden"
                    />
                    {form.image && <img src={form.image} alt="Preview" className="max-h-12 rounded-lg ml-0 sm:ml-6 border border-[#e0c3fc] shadow mt-4 sm:mt-0" />}
                    {form.image && <button type="button" className="ml-0 sm:ml-4 text-red-600 text-sm font-semibold hover:underline mt-2 sm:mt-0" onClick={e => { e.stopPropagation(); setForm(f => ({ ...f, image: '' })); setImageFile(null); }}>Remove</button>}
                  </div>
                </div>
                {/* Description Section */}
                <div>
                  <div className="font-['Dosis',sans-serif] text-lg sm:text-xl font-bold text-[#4f1b59] mb-4 sm:mb-6 mt-2">Description</div>
                  <div className="relative">
                    <Textarea
                      name="discription"
                      id="discription"
                      value={form.discription}
                      onChange={handleChange}
                      required
                      className="peer w-full px-4 pt-6 pb-2 text-base min-h-[100px] bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#a259c6]/40 focus:border-[#a259c6] shadow-sm transition-all resize-none placeholder-transparent"
                      placeholder=" "
                      autoComplete="off"
                    />
                    <label htmlFor="discription" className="absolute left-4 top-2 text-gray-500 text-sm font-medium pointer-events-none transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-[#a259c6]">Description</label>
                  </div>
                </div>
                {/* Profile Fields Section */}
                <div>
                  <div className="font-['Dosis',sans-serif] text-lg sm:text-xl font-bold text-[#4f1b59] mb-4 sm:mb-6 mt-2">Profile Details</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-7">
                    {/* Course Field */}
                    <div className="flex-1">
                      <label htmlFor="Course" className="flex items-center gap-2 text-[#4f1b59] font-semibold text-base mb-1">
                        <Briefcase className="w-5 h-5 text-[#a259c6]" /> Course
                      </label>
                      <Select value={form.Course} onValueChange={val => setForm(f => ({ ...f, Course: val }))} required>
                        <SelectTrigger id="Course" className="h-12 text-base bg-white/80 border border-[#a259c6]/30 rounded-lg shadow-sm" required>
                          <SelectValue placeholder="Select Course" />
                        </SelectTrigger>
                        <SelectContent>
                          {COURSE_OPTIONS.map(option => (
                            <SelectItem key={option} value={option}>{option}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    {/* Year Field */}
                    <div className="flex-1">
                      <label htmlFor="Year" className="flex items-center gap-2 text-[#4f1b59] font-semibold text-base mb-1">
                        <Sparkles className="w-5 h-5 text-[#a259c6]" /> Year
                      </label>
                      <Select value={form.Year} onValueChange={val => setForm(f => ({ ...f, Year: val }))} required>
                        <SelectTrigger id="Year" className="h-12 text-base bg-white/80 border border-[#a259c6]/30 rounded-lg shadow-sm" required>
                          <SelectValue placeholder="Select Year" />
                        </SelectTrigger>
                        <SelectContent>
                          {YEAR_OPTIONS.map(option => (
                            <SelectItem key={option} value={option}>{option} {option === "1" ? 'st' : option === "2" ? 'nd' : option === "3" ? 'rd' : 'th'} year</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    {/* Department Field */}
                    <div className="flex-1">
                      <label htmlFor="department" className="flex items-center gap-2 text-[#4f1b59] font-semibold text-base mb-1">
                        <Building2 className="w-5 h-5 text-[#a259c6]" /> Department
                      </label>
                      <Select value={form.department} onValueChange={val => setForm(f => ({ ...f, department: val }))}>
                        <SelectTrigger id="department" className="h-12 text-base bg-white/80 border border-[#a259c6]/30 rounded-lg shadow-sm">
                          <SelectValue placeholder="Select Department (optional)" />
                        </SelectTrigger>
                        <SelectContent>
                          {DEPARTMENT_OPTIONS.map(option => (
                            <SelectItem key={option} value={option}>{option}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    {/* Position Field */}
                    <div className="flex-1">
                      <label htmlFor="Position" className="flex items-center gap-2 text-[#4f1b59] font-semibold text-base mb-1">
                        <Briefcase className="w-5 h-5 text-[#a259c6]" /> Position
                      </label>
                      <Select value={form.Position} onValueChange={val => setForm(f => ({ ...f, Position: val }))} required>
                        <SelectTrigger id="Position" className="h-12 text-base bg-white/80 border border-[#a259c6]/30 rounded-lg shadow-sm" required>
                          <SelectValue placeholder="Select Position" />
                        </SelectTrigger>
                        <SelectContent>
                          {POSITION_OPTIONS.map(option => (
                            <SelectItem key={option} value={option}>{option}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <Button type="submit" className="w-full mt-4 font-semibold bg-gradient-to-r from-[#a259c6] to-[#4f1b59] hover:from-[#4f1b59] hover:to-[#a259c6] text-white px-8 sm:px-10 py-4 sm:py-5 rounded-xl shadow-xl text-lg sm:text-xl transition-all duration-200 hover:scale-[1.03] active:scale-95 focus:ring-4 focus:ring-[#a259c6]/30" disabled={loading}>
                  {loading ? 'Adding...' : 'Add Achievement'}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AddAchievement; 