import Header from '../components/Header';
import { useState, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Image as ImageIcon, Tag, ArrowLeft } from 'lucide-react';

const CATEGORY_OPTIONS = [
  'Technical', 'Workshop', 'Social', 'Seminar', 'Networking', 'Other'
];

const AddEvent = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    image: '',
    category: '',
    link: '', // <-- Add link field
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState<{[k:string]: boolean}>({});
  const [categorySuggestions, setCategorySuggestions] = useState<string[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();
  const imageInputRef = useRef<HTMLInputElement>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setTouched(t => ({ ...t, [e.target.name]: true }));
    if (e.target.name === 'category') {
      const val = e.target.value.toLowerCase();
      setCategorySuggestions(
        val.length > 0
          ? CATEGORY_OPTIONS.filter(opt => opt.toLowerCase().startsWith(val) && opt.toLowerCase() !== val)
          : []
      );
    }
  };
  const handleCategoryChip = (cat: string) => {
    setForm(f => ({ ...f, category: cat }));
    setCategorySuggestions([]);
    setTouched(t => ({ ...t, category: true }));
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
      let imageUrl = form.image;
      const res = await fetch('https://loopin-iet-portal-1.onrender.com/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, image: imageUrl }),
      });
      if (!res.ok) throw new Error('Failed to add event');
      toast({ title: 'Event Added', description: 'Your event was added successfully.' });
      navigate('/events');
    } catch (err) {
      toast({ title: 'Error', description: 'Failed to add event', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };
  // Helper for floating label
  const isFilled = (name: string) => form[name as keyof typeof form]?.toString().length > 0;
  const isError = (name: string) => touched[name] && !isFilled(name);
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
              className="inline-block px-6 py-3 bg-gradient-to-r from-[#a259c6] to-[#4f1b59] text-white rounded-full text-sm font-semibold mb-6 shadow-lg font-dosis"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Event Submission
            </motion.span>
            <motion.h1
              className="text-5xl md:text-6xl font-abril font-extrabold text-[#2d1b3d] mb-6 tracking-tight"
              style={{ fontFamily: "'Abril Fatface', serif" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Add New Event
            </motion.h1>
            <motion.p
              className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-dosis"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Fill in the details below to create a new event for the Committee. Make it awesome!
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
                onClick={() => navigate('/events')}
                className="mb-6 flex items-center gap-2 text-[#4f1b59] border border-[#a259c6] bg-white/80 hover:bg-[#f3e8ff] font-medium rounded-full px-4 py-2 text-sm shadow-sm w-fit focus:outline-none focus:ring-2 focus:ring-[#a259c6]/30 transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Events
              </button>
              <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                {/* Event Details Section */}
                <div>
                  <div className="font-['Dosis',sans-serif] text-xl font-bold text-[#4f1b59] mb-6 mt-2">Event Details</div>
                  <div className="flex flex-col gap-7">
                    {/* Title Field */}
                    <div className="relative">
                      <input
                        name="title"
                        id="title"
                        value={form.title}
                        onChange={handleChange}
                        required
                        className="peer w-full px-4 pt-6 pb-2 text-base bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#a259c6]/40 focus:border-[#a259c6] shadow-sm transition-all placeholder-transparent"
                        placeholder=" "
                        autoComplete="off"
                      />
                      <label htmlFor="title" className="absolute left-4 top-2 text-gray-500 text-sm font-medium pointer-events-none transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-[#a259c6]">Name of the Event</label>
                    </div>
                    {/* Description Field */}
                    <div className="relative">
                      <Textarea
                        name="description"
                        id="description"
                        value={form.description}
                        onChange={handleChange}
                        required
                        className="peer w-full px-4 pt-6 pb-2 text-base min-h-[100px] bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#a259c6]/40 focus:border-[#a259c6] shadow-sm transition-all resize-none placeholder-transparent"
                        placeholder=" "
                        autoComplete="off"
                      />
                      <label htmlFor="description" className="absolute left-4 top-2 text-gray-500 text-sm font-medium pointer-events-none transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-[#a259c6]">Description of the Event</label>
                    </div>
                    {/* Registration Link Field */}
                    <div className="relative">
                      <input
                        name="link"
                        id="link"
                        type="url"
                        value={form.link}
                        onChange={handleChange}
                        className="peer w-full px-4 pt-6 pb-2 text-base bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#a259c6]/40 focus:border-[#a259c6] shadow-sm transition-all placeholder-transparent"
                        placeholder=" "
                        autoComplete="off"
                      />
                      <label htmlFor="link" className="absolute left-4 top-2 text-gray-500 text-sm font-medium pointer-events-none transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-[#a259c6]">Registration Link (optional)</label>
                    </div>
                  </div>
                </div>

                {/* Schedule Section */}
                <div>
                  <div className="font-['Dosis',sans-serif] text-xl font-bold text-[#4f1b59] mb-6 mt-2">Schedule</div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-7">
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
                      <label htmlFor="date" className="absolute left-4 top-2 text-gray-500 text-sm font-medium pointer-events-none transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-[#a259c6]">Date</label>
                    </div>
                    {/* Time Field */}
                    <div className="relative">
                      <input
                        name="time"
                        id="time"
                        type="time"
                        value={form.time}
                        onChange={handleChange}
                        required
                        className="peer w-full px-4 pt-6 pb-2 text-base bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#a259c6]/40 focus:border-[#a259c6] shadow-sm transition-all placeholder-transparent"
                        placeholder=" "
                        autoComplete="off"
                      />
                      <label htmlFor="time" className="absolute left-4 top-2 text-gray-500 text-sm font-medium pointer-events-none transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-[#a259c6]">Time</label>
                    </div>
                    {/* Location Field */}
                    <div className="relative">
                      <input
                        name="location"
                        id="location"
                        value={form.location}
                        onChange={handleChange}
                        required
                        className="peer w-full px-4 pt-6 pb-2 text-base bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#a259c6]/40 focus:border-[#a259c6] shadow-sm transition-all placeholder-transparent"
                        placeholder=" "
                        autoComplete="off"
                      />
                      <label htmlFor="location" className="absolute left-4 top-2 text-gray-500 text-sm font-medium pointer-events-none transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-[#a259c6]">Location</label>
                    </div>
                  </div>
                </div>

                {/* Image Section */}
                <div>
                  <div className="font-['Dosis',sans-serif] text-xl font-bold text-[#4f1b59] mb-6 mt-2">Event Image</div>
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

                {/* Category Section */}
                <div>
                  <div className="font-['Dosis',sans-serif] text-xl font-bold text-[#4f1b59] mb-6 mt-2">Category</div>
                  <div className="relative">
                    <input
                      name="category"
                      id="category"
                      value={form.category}
                      onChange={handleChange}
                      required
                      className="peer w-full px-4 pt-6 pb-2 text-base bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#a259c6]/40 focus:border-[#a259c6] shadow-sm transition-all placeholder-transparent"
                      placeholder=" "
                      autoComplete="off"
                    />
                    <label htmlFor="category" className="absolute left-4 top-2 text-gray-500 text-sm font-medium pointer-events-none transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-[#a259c6]">Category of the Event</label>
                    {categorySuggestions.length > 0 && (
                      <div className="absolute left-0 top-full mt-2 z-10 flex flex-wrap gap-2 bg-white/95 rounded-xl shadow-lg p-2 border border-[#e0c3fc]">
                        {categorySuggestions.map(cat => (
                          <span key={cat} className="px-3 py-1 rounded-full border text-sm font-medium shadow-sm bg-white border-[#a259c6] text-[#4f1b59] hover:bg-[#a259c6] hover:text-white cursor-pointer transition-all duration-150" onClick={() => handleCategoryChip(cat)}>{cat}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <Button type="submit" className="w-full mt-4 font-semibold bg-gradient-to-r from-[#a259c6] to-[#4f1b59] hover:from-[#4f1b59] hover:to-[#a259c6] text-white px-10 py-5 rounded-xl shadow-xl text-xl transition-all duration-200 hover:scale-[1.03] active:scale-95 focus:ring-4 focus:ring-[#a259c6]/30" disabled={loading}>
                  {loading ? 'Adding...' : 'Add Event'}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
export default AddEvent; 