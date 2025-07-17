import Header from '../components/Header';
import { useState, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Image as ImageIcon, Tag } from 'lucide-react';

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
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Dosis:wght@400;600&display=swap');
        .iet-heading { font-family: 'Abril Fatface', serif; letter-spacing: -0.5px; font-size: 2.1rem; font-weight: 900; }
        .iet-subheading { font-family: 'Dosis', sans-serif; font-size: 1.18em; color: #7c5e99; font-style: italic; font-weight: 700; margin-bottom: 1.1em; letter-spacing: 0.01em; line-height: 1.6; }
        .iet-section { font-family: 'Dosis', sans-serif; font-weight: 800; color: #4f1b59; font-size: 1.22rem; margin-bottom: 1.1em; margin-top: 2.1em; letter-spacing: 0.01em; text-transform: none; line-height: 1.3; }
        .iet-label { font-family: 'Dosis', sans-serif; font-weight: 500; color: #4f1b59; margin-bottom: 0.25em; display: block; font-size: 1em; letter-spacing: 0.01em; }
        .iet-input {
          background: rgba(255,255,255,0.95);
          border-radius: 0.7rem;
          border: 1.5px solid #e0c3fc;
          box-shadow: 0 1px 8px 0 rgba(162,89,198,0.04);
          transition: border 0.2s, box-shadow 0.2s;
          font-size: 1.05rem;
          padding: 0.7em 1em 0.7em 2.3em;
          min-height: 2.5rem;
          width: 100%;
        }
        .iet-input:focus {
          border: 1.5px solid #a259c6;
          box-shadow: 0 0 0 2px #a259c633;
        }
        .iet-input.error {
          border: 1.5px solid #e53e3e;
          box-shadow: 0 0 0 2px #e53e3e22;
        }
        .iet-chip {
          display: inline-block;
          background: #f3e8ff;
          color: #4f1b59;
          border-radius: 999px;
          padding: 0.3em 1em;
          margin: 0.2em 0.3em 0.2em 0;
          font-size: 0.98em;
          cursor: pointer;
          border: 1.5px solid #a259c6;
          transition: background 0.15s, color 0.15s;
        }
        .iet-chip:hover { background: #a259c6; color: #fff; }
        .iet-image-drop {
          border: 1.5px dashed #a259c6;
          border-radius: 0.7rem;
          background: rgba(255,255,255,0.85);
          min-height: 2.7rem;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          cursor: pointer;
          transition: border 0.2s, background 0.2s;
          padding: 0.6rem 1.1rem;
        }
        .iet-image-drop.dragover {
          border: 1.5px solid #4f1b59;
          background: #f3e8ffcc;
        }
        .iet-image-preview {
          max-height: 2.2rem;
          border-radius: 0.4rem;
          margin-left: 1.2rem;
          border: 1.5px solid #e0c3fc;
          box-shadow: 0 2px 8px #e0c3fc44;
        }
        .iet-remove-img {
          margin-left: 1rem;
          color: #e53e3e;
          font-size: 0.95em;
          cursor: pointer;
          font-weight: 600;
          background: none;
          border: none;
        }
        @media (max-width: 900px) {
          .iet-form-main { padding: 1.2rem !important; }
        }
        @media (max-width: 640px) {
          .iet-input { font-size: 0.97rem; min-height: 2.1rem; padding-left: 2em; }
          .iet-section { font-size: 1.01rem; margin-bottom: 0.5em; }
        }
      `}</style>
      <div className="flex-1 flex items-center justify-center py-4 px-1 sm:px-4">
        <form
          onSubmit={handleSubmit}
          className="iet-form-main w-full max-w-2xl bg-white/95 rounded-2xl shadow-xl border border-[#e0c3fc] p-8 sm:p-12 flex flex-col gap-8 mx-auto animate-fade-in-up backdrop-blur-xl"
        >
          <div className="w-full text-center mb-2">
            <h2 className="iet-heading mb-1">Add New Event</h2>
            <p className="iet-subheading">Fill in the details below to create a new event for the Committee.</p>
          </div>

          {/* Event Details Section */}
          <div>
            <div className="iet-section">Event Details</div>
            <div className="flex flex-col gap-5">
              <label htmlFor="title" className="iet-label">Name of the Event</label>
              <div className="relative group">
                <Tag className="absolute left-2 top-1/2 -translate-y-1/2 text-[#a259c6] w-5 h-5" />
                <input
                  name="title"
                  id="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  className={`iet-input ${isError('title') ? 'error' : ''}`}
                  autoComplete="off"
                />
              </div>
              <label htmlFor="description" className="iet-label">Description of the Event</label>
              <div className="relative group">
                <Textarea
                  name="description"
                  id="description"
                  value={form.description}
                  onChange={handleChange}
                  required
                  className={`iet-input resize-none min-h-[80px] ${isError('description') ? 'error' : ''}`}
                  autoComplete="off"
                />
              </div>
            </div>
          </div>

          {/* Schedule Section */}
          <div>
            <div className="iet-section">Schedule</div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor="date" className="iet-label">Date</label>
                <div className="relative group">
                  <Calendar className="absolute left-2 top-1/2 -translate-y-1/2 text-[#a259c6] w-5 h-5" />
                  <input
                    name="date"
                    id="date"
                    type="date"
                    value={form.date}
                    onChange={handleChange}
                    required
                    className={`iet-input ${isError('date') ? 'error' : ''}`}
                    autoComplete="off"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="time" className="iet-label">Time</label>
                <div className="relative group">
                  <Clock className="absolute left-2 top-1/2 -translate-y-1/2 text-[#a259c6] w-5 h-5" />
                  <input
                    name="time"
                    id="time"
                    type="time"
                    value={form.time}
                    onChange={handleChange}
                    required
                    className={`iet-input ${isError('time') ? 'error' : ''}`}
                    autoComplete="off"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="location" className="iet-label">Location</label>
                <div className="relative group">
                  <MapPin className="absolute left-2 top-1/2 -translate-y-1/2 text-[#a259c6] w-5 h-5" />
                  <input
                    name="location"
                    id="location"
                    value={form.location}
                    onChange={handleChange}
                    required
                    className={`iet-input ${isError('location') ? 'error' : ''}`}
                    autoComplete="off"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div>
            <div className="iet-section">Event Image</div>
            <label htmlFor="image" className="iet-label">Upload Image</label>
            <div className="iet-image-drop flex items-center gap-4 relative"
              onDragOver={e => { e.preventDefault(); e.currentTarget.classList.add('dragover'); }}
              onDragLeave={e => { e.preventDefault(); e.currentTarget.classList.remove('dragover'); }}
              onDrop={e => { e.currentTarget.classList.remove('dragover'); handleImageDrop(e); }}
              onClick={() => imageInputRef.current?.click()}
              style={{ minHeight: '2.7rem' }}
            >
              <ImageIcon className="w-6 h-6 text-[#a259c6]" />
              <span className="text-[#a259c6] font-medium select-none">Drag & drop or click to upload</span>
              <input
                ref={imageInputRef}
                name="image"
                type="file"
                accept="image/*"
                onChange={handleImage}
                className="hidden"
              />
              {form.image && <img src={form.image} alt="Preview" className="iet-image-preview" />}
              {form.image && <button type="button" className="iet-remove-img" onClick={e => { e.stopPropagation(); setForm(f => ({ ...f, image: '' })); setImageFile(null); }}>Remove</button>}
            </div>
          </div>

          {/* Category Section */}
          <div>
            <div className="iet-section">Category</div>
            <label htmlFor="category" className="iet-label">Category of the Event</label>
            <div className="relative group">
              <Tag className="absolute left-2 top-1/2 -translate-y-1/2 text-[#a259c6] w-5 h-5" />
              <input
                name="category"
                id="category"
                value={form.category}
                onChange={handleChange}
                required
                className={`iet-input ${isError('category') ? 'error' : ''}`}
                autoComplete="off"
              />
              {categorySuggestions.length > 0 && (
                <div className="absolute left-0 top-full mt-2 z-10 flex flex-wrap gap-2 bg-white/95 rounded-xl shadow-lg p-2 border border-[#e0c3fc]">
                  {categorySuggestions.map(cat => (
                    <span key={cat} className="iet-chip" onClick={() => handleCategoryChip(cat)}>{cat}</span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <Button type="submit" className="w-full mt-2 bg-gradient-to-r from-[#a259c6] to-[#4f1b59] text-white font-bold rounded-full py-3 shadow-lg hover:scale-[1.02] transition-all text-lg" disabled={loading}>
            {loading ? 'Adding...' : 'Add Event'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddEvent; 