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
    <div className="min-h-screen w-full relative overflow-x-hidden bg-gradient-to-br from-[#f8f6ff] via-[#f3e8ff] to-[#e0c3fc] flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center py-8 px-2 sm:px-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl bg-white/90 rounded-2xl shadow-lg border border-[#e0c3fc] p-8 sm:p-12 flex flex-col gap-10 mx-auto backdrop-blur-xl"
        >
          {/* Back Button */}
          <button
            type="button"
            onClick={() => navigate('/events')}
            className="mb-4 flex items-center gap-2 text-[#4f1b59] border border-[#a259c6] bg-white/80 hover:bg-[#f3e8ff] font-medium rounded-full px-4 py-2 text-sm shadow-sm w-fit focus:outline-none focus:ring-2 focus:ring-[#a259c6]/30 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Events
          </button>
          <div className="w-full text-center mb-2">
            <h2 className="font-['Abril_Fatface',serif] text-4xl md:text-5xl font-extrabold tracking-tight text-[#4f1b59] mb-2">Add New Event</h2>
            <p className="font-['Dosis',sans-serif] text-lg md:text-xl text-[#7c5e99] font-semibold italic mb-4">Fill in the details below to create a new event for the Committee.</p>
          </div>
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
    </div>
  );
};
export default AddEvent; 