import Header from '../components/Header';
import { useState, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Image as ImageIcon, ArrowLeft } from 'lucide-react';

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
    achievement_type: '',
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
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3001/api/achievements', {
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
            className="mx-auto max-w-2xl"
          >
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-10 hover:shadow-[0_8px_40px_0_rgba(162,89,198,0.13)] transition-all duration-300">
              <button
                type="button"
                onClick={() => navigate('/achievements')}
                className="mb-6 flex items-center gap-2 text-[#4f1b59] border border-[#a259c6] bg-white/80 hover:bg-[#f3e8ff] font-medium rounded-full px-4 py-2 text-sm shadow-sm w-fit focus:outline-none focus:ring-2 focus:ring-[#a259c6]/30 transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Achievements
              </button>
              <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                {/* Achievement Details Section */}
                <div>
                  <div className="font-['Dosis',sans-serif] text-xl font-bold text-[#4f1b59] mb-6 mt-2">Achievement Details</div>
                  <div className="flex flex-col gap-7">
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
                        name="achievement_type"
                        id="achievement_type"
                        value={form.achievement_type}
                        onChange={handleChange}
                        required
                        className="peer w-full px-4 pt-6 pb-2 text-base bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#a259c6]/40 focus:border-[#a259c6] shadow-sm transition-all placeholder-transparent"
                        placeholder=" "
                        autoComplete="off"
                      />
                      <label htmlFor="achievement_type" className="absolute left-4 top-2 text-gray-500 text-sm font-medium pointer-events-none transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-[#a259c6]">Achievement Title</label>
                    </div>
                    {/* Date Field */}
                    <div className="relative">
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
                  <div className="font-['Dosis',sans-serif] text-xl font-bold text-[#4f1b59] mb-6 mt-2">Achievement Image</div>
                  <label htmlFor="image" className="font-['Dosis',sans-serif] font-medium text-[#4f1b59] mb-1 text-base">Upload Image</label>
                  <div className="flex items-center gap-4 relative border-2 border-dashed border-[#a259c6] rounded-xl bg-white/80 min-h-[3.2rem] px-6 py-4 cursor-pointer transition-all duration-200 hover:border-[#4f1b59]"
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
                    {form.image && <img src={form.image} alt="Preview" className="max-h-12 rounded-lg ml-6 border border-[#e0c3fc] shadow" />}
                    {form.image && <button type="button" className="ml-4 text-red-600 text-sm font-semibold hover:underline" onClick={e => { e.stopPropagation(); setForm(f => ({ ...f, image: '' })); setImageFile(null); }}>Remove</button>}
                  </div>
                </div>
                {/* Description Section */}
                <div>
                  <div className="font-['Dosis',sans-serif] text-xl font-bold text-[#4f1b59] mb-6 mt-2">Description</div>
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
                  <div className="font-['Dosis',sans-serif] text-xl font-bold text-[#4f1b59] mb-6 mt-2">Profile Details</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                    {/* Course Field */}
                    <div className="relative">
                      <select
                        name="Course"
                        id="Course"
                        value={form.Course}
                        onChange={handleChange}
                        required
                        className="peer w-full px-4 pt-6 pb-2 text-base bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#a259c6]/40 focus:border-[#a259c6] shadow-sm transition-all"
                      >
                        <option value="" disabled>Select Course</option>
                        {COURSE_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                      <label htmlFor="Course" className="absolute left-4 top-2 text-gray-500 text-sm font-medium pointer-events-none transition-all">Course</label>
                    </div>
                    {/* Year Field */}
                    <div className="relative">
                      <select
                        name="Year"
                        id="Year"
                        value={form.Year}
                        onChange={handleChange}
                        required
                        className="peer w-full px-4 pt-6 pb-2 text-base bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#a259c6]/40 focus:border-[#a259c6] shadow-sm transition-all"
                      >
                        <option value="" disabled>Select Year</option>
                        {YEAR_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                      <label htmlFor="Year" className="absolute left-4 top-2 text-gray-500 text-sm font-medium pointer-events-none transition-all">Year</label>
                    </div>
                    {/* Department Field */}
                    <div className="relative">
                      <select
                        name="department"
                        id="department"
                        value={form.department}
                        onChange={handleChange}
                        required
                        className="peer w-full px-4 pt-6 pb-2 text-base bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#a259c6]/40 focus:border-[#a259c6] shadow-sm transition-all"
                      >
                        <option value="" disabled>Select Department</option>
                        {DEPARTMENT_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                      <label htmlFor="department" className="absolute left-4 top-2 text-gray-500 text-sm font-medium pointer-events-none transition-all">Department</label>
                    </div>
                    {/* Position Field */}
                    <div className="relative">
                      <select
                        name="Position"
                        id="Position"
                        value={form.Position}
                        onChange={handleChange}
                        required
                        className="peer w-full px-4 pt-6 pb-2 text-base bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#a259c6]/40 focus:border-[#a259c6] shadow-sm transition-all"
                      >
                        <option value="" disabled>Select Position</option>
                        {POSITION_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                      <label htmlFor="Position" className="absolute left-4 top-2 text-gray-500 text-sm font-medium pointer-events-none transition-all">Position</label>
                    </div>
                  </div>
                </div>
                <Button type="submit" className="w-full mt-4 font-semibold bg-gradient-to-r from-[#a259c6] to-[#4f1b59] hover:from-[#4f1b59] hover:to-[#a259c6] text-white px-10 py-5 rounded-xl shadow-xl text-xl transition-all duration-200 hover:scale-[1.03] active:scale-95 focus:ring-4 focus:ring-[#a259c6]/30" disabled={loading}>
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