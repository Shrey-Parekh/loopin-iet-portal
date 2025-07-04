import Header from '@/components/Header';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Camera, User, Mail, Briefcase, Building2, Linkedin, Instagram, Github, Plus, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ROLE_OPTIONS = [
  { label: 'Super Core', value: 'super_core' },
  { label: 'Core', value: 'core' },
  { label: 'Executive', value: 'member' },
];
const POSITION_OPTIONS = [
  'Chairperson',
  'Vice-chairperson',
  'Secretary',
  'Director',
  'Head',
  'Subhead',
  'Member',
];
const DEPARTMENT_OPTIONS = [
  'Technicals',
  'Research',
  'Digital Creatives',
  'Inhouse Creatives',
  'SMCW',
  'Social Media and Content Writing',
  'Photography',
  'Logistics',
  'Marketing',
];

// Add 50 hobbies and 50 tags
const HOBBY_OPTIONS = [
  'Reading', 'Writing', 'Drawing', 'Painting', 'Photography', 'Cooking', 'Baking', 'Gardening', 'Traveling', 'Hiking',
  'Cycling', 'Running', 'Swimming', 'Dancing', 'Singing', 'Playing Guitar', 'Playing Piano', 'Playing Drums', 'Chess', 'Board Games',
  'Video Games', 'Coding', 'Blogging', 'Podcasting', 'Yoga', 'Meditation', 'Fishing', 'Camping', 'Bird Watching', 'Collecting',
  'Knitting', 'Sewing', 'Origami', 'Calligraphy', 'Scrapbooking', 'Magic Tricks', 'Martial Arts', 'Surfing', 'Skateboarding', 'Skiing',
  'Snowboarding', 'Rock Climbing', 'Volunteering', 'Astronomy', 'Investing', 'Languages', 'Public Speaking', 'Comics', 'Anime', 'DIY Projects',
  'Pottery', 'Woodworking', 'Leathercraft', 'Metalworking', 'Jewelry Making', 'Soap Making', 'Candle Making', 'Model Building', 'Lego', 'RC Cars',
  'Geocaching', 'Parkour', 'Archery', 'Fencing', 'Golf', 'Tennis', 'Badminton', 'Table Tennis', 'Squash', 'Bowling', 'Paintball',
  'Laser Tag', 'Escape Rooms', 'Trivia', 'Fantasy Sports', 'Cosplay', 'Makeup Art', 'Fashion Design', 'Thrifting', 'Antiquing', 'Wine Tasting'
];
const TAG_OPTIONS = [
  'Leadership', 'Teamwork', 'Creativity', 'Problem Solving', 'Critical Thinking', 'Communication', 'Adaptability', 'Time Management', 'Organization', 'Empathy',
  'Innovation', 'Collaboration', 'Initiative', 'Attention to Detail', 'Resilience', 'Curiosity', 'Passion', 'Motivation', 'Discipline', 'Flexibility',
  'Networking', 'Strategic', 'Analytical', 'Resourceful', 'Visionary', 'Dependable', 'Enthusiastic', 'Patient', 'Persuasive', 'Open-minded',
  'Goal-oriented', 'Listener', 'Planner', 'Negotiation', 'Mentoring', 'Coaching', 'Research', 'Presentation', 'Writing', 'Design',
  'Tech-savvy', 'Multitasking', 'Decision Making', 'Learning', 'Self-starter', 'Energetic', 'Supportive', 'Friendly', 'Detail-oriented', 'Fast Learner'
];

const fieldAnim = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: 0.2 + i * 0.08, duration: 0.6, ease: 'easeOut' } })
};

const Profile = () => {
  const [profile, setProfile] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [showDept, setShowDept] = useState(false);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showHobbies, setShowHobbies] = useState(false);
  const [showTags, setShowTags] = useState(false);
  const [editMode, setEditMode] = useState(true);
  const [localStorageWarning, setLocalStorageWarning] = useState<string | null>(null);
  const [profileWarning, setProfileWarning] = useState<string | null>(null);
  const navigate = useNavigate();

  // Simulate fetching userId from localStorage or context
  const userId = localStorage.getItem('userId') || '';
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  useEffect(() => {
    // Debug: log localStorage state
    if (!isLoggedIn || !userId) {
      setLocalStorageWarning('You are not logged in or your session has expired. Please log in again.');
      console.warn('Profile page: localStorage missing isLoggedIn or userId', { isLoggedIn, userId });
      return;
    } else {
      setLocalStorageWarning(null);
    }
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/profile/${userId}`);
        if (!res.ok) {
          throw new Error('Failed to fetch profile.');
        }
        const data = await res.json();
        if (!data) {
          setProfileWarning('No profile exists for this user. You can fill out your profile below.');
          setProfile({});
          setShowDept(false);
          setSelectedHobbies([]);
          setSelectedTags([]);
          setEditMode(true);
        } else {
          setProfileWarning(null);
          setProfile(data);
          setShowDept(data?.member_type !== 'super_core');
          if (data?.hobbies && Array.isArray(data.hobbies)) setSelectedHobbies(data.hobbies);
          if (data?.tags && Array.isArray(data.tags)) setSelectedTags(data.tags);
          setEditMode(!data);
        }
      } catch (e) {
        setProfileWarning('Error loading profile. Please try again or contact support.');
        toast({ title: 'Error', description: e.message || 'Failed to load profile', variant: 'destructive' });
        console.error('Profile page: fetch error', e);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [userId, isLoggedIn]);

  const handleRoleChange = (value: string) => {
    setProfile((p: any) => ({ ...p, member_type: value }));
    setShowDept(value !== 'super_core');
  };

  const handleChange = (e: any) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files && files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfile((p: any) => ({ ...p, image: reader.result }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      setProfile((p: any) => ({ ...p, [name]: value }));
    }
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    if (e.type === 'dragleave') setDragActive(false);
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setProfile((p: any) => ({ ...p, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };
  const handleImageClick = () => fileInputRef.current?.click();

  const handleSelect = (name: string, value: string) => {
    setProfile((p: any) => ({ ...p, [name]: value }));
  };

  // Handle hobby chip click
  const handleHobbyClick = (hobby: string) => {
    setSelectedHobbies(prev => {
      if (prev.includes(hobby)) return prev.filter(h => h !== hobby);
      if (prev.length < 10) return [...prev, hobby];
      return prev;
    });
  };
  // Handle tag chip click
  const handleTagClick = (tag: string) => {
    setSelectedTags(prev => {
      if (prev.includes(tag)) return prev.filter(t => t !== tag);
      if (prev.length < 10) return [...prev, tag];
      return prev;
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      let res;
      if (profile.id) {
        // Update existing profile
        res = await fetch(`/api/profile/${profile.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...profile,
            user_id: userId,
            hobbies: selectedHobbies,
            tags: selectedTags
          }),
        });
      } else {
        // Create new profile
        res = await fetch('/api/profile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...profile,
            user_id: userId,
            hobbies: selectedHobbies,
            tags: selectedTags
          }),
        });
        if (res.ok) {
          const data = await res.json();
          setProfile((p: any) => ({ ...p, id: data.id }));
        }
      }
      if (!res.ok) throw new Error('Failed to save profile');
      toast({ title: 'Profile saved', description: 'Your profile was saved successfully.' });
      setEditMode(false);
    } catch (e) {
      toast({ title: 'Error', description: 'Failed to save profile', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  // Add logout handler
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userId');
    toast({ title: 'Logged out', description: 'You have been logged out.' });
    setTimeout(() => navigate('/login'), 700);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#f8f6ff] via-[#f3e8ff] to-[#e0c3fc] overflow-x-hidden">
      {localStorageWarning && (
        <div className="fixed top-0 left-0 w-full bg-red-100 text-red-700 text-center py-2 z-50 font-semibold shadow">
          {localStorageWarning}
        </div>
      )}
      {profileWarning && !localStorageWarning && (
        <div className="fixed top-0 left-0 w-full bg-yellow-100 text-yellow-800 text-center py-2 z-40 font-semibold shadow">
          {profileWarning}
        </div>
      )}
      {/* Animated floating shapes background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.18, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-br from-[#a259c6] via-[#7f3fa7] to-[#4f1b59] blur-3xl animate-pulse-slow"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.12, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
          className="absolute bottom-[-15%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-tr from-[#f3e8ff] via-[#a259c6] to-[#4f1b59] blur-3xl animate-pulse-slow"
        />
      </div>
      <Header />
      <main className="relative z-10 max-w-2xl mx-auto py-16 px-4 w-full">
        {editMode ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-12 w-full">
            {/* Profile Image + Camera icon horizontally aligned */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="flex flex-row items-center justify-center gap-8 pb-8"
            >
              <div className="flex flex-col items-center">
                <div
                  className={`relative w-48 h-48 rounded-full border-8 border-transparent bg-gradient-to-br from-[#a259c6] via-[#f3e8ff] to-[#4f1b59] shadow-2xl flex items-center justify-center transition-all duration-300 cursor-pointer group ${dragActive ? 'ring-8 ring-[#a259c6]/60' : ''}`}
                  style={{ boxShadow: '0 0 0 8px #e0c3fc, 0 8px 32px 0 rgba(162,89,198,0.15)' }}
                  onClick={handleImageClick}
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                  tabIndex={0}
                  role="button"
                  aria-label="Upload profile photo"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#a259c6]/60 via-[#f3e8ff]/40 to-[#4f1b59]/60 blur-2xl z-0 animate-spin-slow"
                  />
                  {profile.image ? (
                    <img
                      src={profile.image}
                      alt="Profile"
                      className="w-full h-full object-cover rounded-full border-4 border-white shadow-xl transition-all duration-300 group-hover:scale-105 group-hover:brightness-95 z-10"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center rounded-full bg-gradient-to-br from-[#a259c6] to-[#4f1b59] z-10">
                      <User className="w-20 h-20 text-white opacity-80" />
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                    className="hidden"
                  />
                  {dragActive && (
                    <div className="absolute inset-0 bg-[#a259c6]/30 rounded-full flex items-center justify-center text-[#4f1b59] text-lg font-semibold pointer-events-none z-20">
                      Drop image here
                    </div>
                  )}
                </div>
                {/* Camera icon button next to the photo div */}
                <button
                  type="button"
                  className="mt-4 bg-gradient-to-tr from-[#a259c6] to-[#4f1b59] p-3 rounded-full shadow-lg hover:scale-110 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#a259c6]/40"
                  onClick={handleImageClick}
                  aria-label="Upload profile photo"
                >
                  <Camera className="w-6 h-6 text-white" />
                </button>
                {/* Name and email below the photo */}
                <div className="mt-8 text-center flex flex-col items-center gap-2">
                  <div className="inline-block px-8 py-3 rounded-2xl bg-gradient-to-r from-[#a259c6]/80 to-[#4f1b59]/80 shadow-xl backdrop-blur-md">
                    <span className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg tracking-tight animate-gradient-x bg-gradient-to-r from-[#f3e8ff] via-[#a259c6] to-[#4f1b59] bg-clip-text text-transparent">
                      {profile.name || 'Your Name'}
                    </span>
                  </div>
                  <div className="inline-block px-5 py-2 rounded-xl bg-gradient-to-r from-[#a259c6]/60 to-[#4f1b59]/60 shadow text-lg md:text-xl text-white/90 font-medium mt-1">
                    {profile.email || 'Email'}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={{}}
              className="flex flex-col gap-8"
            >
              {/* Name */}
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a259c6] w-6 h-6 group-focus-within:text-[#4f1b59] transition-colors" />
                <Input name="name" value={profile.name || ''} onChange={handleChange} required placeholder="Full Name" className="h-14 text-lg pl-12 rounded-xl bg-white/80 shadow-md border-2 border-transparent focus:border-[#a259c6] focus:ring-2 focus:ring-[#a259c6]/30 transition-all duration-200" />
              </div>
              {/* Email */}
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a259c6] w-6 h-6 group-focus-within:text-[#4f1b59] transition-colors" />
                <Input name="email" value={profile.email || ''} onChange={handleChange} required type="email" placeholder="Email" className="h-14 text-lg pl-12 rounded-xl bg-white/80 shadow-md border-2 border-transparent focus:border-[#a259c6] focus:ring-2 focus:ring-[#a259c6]/30 transition-all duration-200" />
              </div>
              {/* Role/Dept/Position */}
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 relative group">
                  <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a259c6] w-6 h-6 group-focus-within:text-[#4f1b59] transition-colors" />
                  <Select value={profile.member_type || ''} onValueChange={handleRoleChange}>
                    <SelectTrigger className="h-14 text-lg pl-12 rounded-xl bg-white/80 shadow-md border-2 border-transparent focus:border-[#a259c6] focus:ring-2 focus:ring-[#a259c6]/30 transition-all duration-200">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      {ROLE_OPTIONS.map(opt => (
                        <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {showDept && (
                  <div className="flex-1 relative group">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a259c6] w-6 h-6 group-focus-within:text-[#4f1b59] transition-colors" />
                    <Select value={profile.department || ''} onValueChange={v => handleSelect('department', v)}>
                      <SelectTrigger className="h-14 text-lg pl-12 rounded-xl bg-white/80 shadow-md border-2 border-transparent focus:border-[#a259c6] focus:ring-2 focus:ring-[#a259c6]/30 transition-all duration-200">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        {DEPARTMENT_OPTIONS.map(opt => (
                          <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                <div className="flex-1 relative group">
                  <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a259c6] w-6 h-6 group-focus-within:text-[#4f1b59] transition-colors" />
                  <Select value={profile.position_hierarchy || ''} onValueChange={v => handleSelect('position_hierarchy', v)}>
                    <SelectTrigger className="h-14 text-lg pl-12 rounded-xl bg-white/80 shadow-md border-2 border-transparent focus:border-[#a259c6] focus:ring-2 focus:ring-[#a259c6]/30 transition-all duration-200">
                      <SelectValue placeholder="Select position" />
                    </SelectTrigger>
                    <SelectContent>
                      {POSITION_OPTIONS.map(opt => (
                        <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {/* Socials */}
              <div className="flex flex-col md:flex-row gap-6">
                <div className="relative flex-1 group">
                  <Linkedin className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a259c6] w-6 h-6 group-focus-within:text-[#4f1b59] transition-colors" />
                  <Input name="linkedin" value={profile.linkedin || ''} onChange={handleChange} placeholder="LinkedIn profile URL" className="h-14 text-lg pl-12 rounded-xl bg-white/80 shadow-md border-2 border-transparent focus:border-[#a259c6] focus:ring-2 focus:ring-[#a259c6]/30 transition-all duration-200" />
                </div>
                <div className="relative flex-1 group">
                  <Instagram className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a259c6] w-6 h-6 group-focus-within:text-[#4f1b59] transition-colors" />
                  <Input name="Instagram" value={profile.Instagram || ''} onChange={handleChange} placeholder="Instagram profile URL" className="h-14 text-lg pl-12 rounded-xl bg-white/80 shadow-md border-2 border-transparent focus:border-[#a259c6] focus:ring-2 focus:ring-[#a259c6]/30 transition-all duration-200" />
                </div>
                <div className="relative flex-1 group">
                  <Github className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a259c6] w-6 h-6 group-focus-within:text-[#4f1b59] transition-colors" />
                  <Input name="github" value={profile.github || ''} onChange={handleChange} placeholder="GitHub profile URL" className="h-14 text-lg pl-12 rounded-xl bg-white/80 shadow-md border-2 border-transparent focus:border-[#a259c6] focus:ring-2 focus:ring-[#a259c6]/30 transition-all duration-200" />
                </div>
              </div>
              {/* Bio */}
              <div className="relative group">
                <Textarea name="bio" value={profile.bio || ''} onChange={handleChange} rows={4} placeholder="Tell us about yourself..." className="text-lg px-5 py-4 min-h-[100px] rounded-xl bg-white/80 shadow-md border-2 border-transparent focus:border-[#a259c6] focus:ring-2 focus:ring-[#a259c6]/30 transition-all duration-200" />
              </div>
              {/* Hobbies */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <div className="font-semibold text-[#a259c6]">Select up to 10 hobbies:</div>
                  <button
                    type="button"
                    className="p-1 rounded-full border border-[#a259c6] bg-white/80 shadow hover:bg-[#a259c6]/10 hover:scale-110 transition-all"
                    onClick={() => setShowHobbies(v => !v)}
                    aria-label={showHobbies ? 'Hide hobbies' : 'Show hobbies'}
                  >
                    <Plus className={`w-5 h-5 ${showHobbies ? 'rotate-45 text-[#a259c6]' : 'text-[#a259c6]/60'} transition-transform`} />
                  </button>
                </div>
                <AnimatePresence>
                  {showHobbies && (
                    <motion.div
                      key="hobbies-chips"
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 24 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      className="flex flex-wrap gap-2 mt-2"
                    >
                      {HOBBY_OPTIONS.map(hobby => (
                        <button
                          type="button"
                          key={hobby}
                          className={`px-3 py-1 rounded-full border text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-[#a259c6]/40 transition-all duration-150
                            ${selectedHobbies.includes(hobby)
                              ? 'bg-gradient-to-r from-[#a259c6]/30 to-[#f3e8ff]/60 border-[#a259c6] text-[#4f1b59] shadow-md scale-105'
                              : 'bg-white/80 border-gray-300 text-gray-500 hover:bg-[#a259c6]/10 hover:scale-105'}
                          `}
                          onClick={() => handleHobbyClick(hobby)}
                          aria-pressed={selectedHobbies.includes(hobby)}
                          tabIndex={0}
                        >
                          {hobby}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="text-xs text-gray-400 mt-1">{selectedHobbies.length} / 10 selected</div>
              </div>
              {/* Tags */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <div className="font-semibold text-[#a259c6]">Select up to 10 tags:</div>
                  <button
                    type="button"
                    className="p-1 rounded-full border border-[#a259c6] bg-white/80 shadow hover:bg-[#a259c6]/10 hover:scale-110 transition-all"
                    onClick={() => setShowTags(v => !v)}
                    aria-label={showTags ? 'Hide tags' : 'Show tags'}
                  >
                    <Plus className={`w-5 h-5 ${showTags ? 'rotate-45 text-[#a259c6]' : 'text-[#a259c6]/60'} transition-transform`} />
                  </button>
                </div>
                <AnimatePresence>
                  {showTags && (
                    <motion.div
                      key="tags-chips"
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 24 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      className="flex flex-wrap gap-2 mt-2"
                    >
                      {TAG_OPTIONS.map(tag => (
                        <button
                          type="button"
                          key={tag}
                          className={`px-3 py-1 rounded-full border text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-[#a259c6]/40 transition-all duration-150
                            ${selectedTags.includes(tag)
                              ? 'bg-gradient-to-r from-[#f3e8ff]/60 to-[#a259c6]/30 border-[#a259c6] text-[#4f1b59] shadow-md scale-105'
                              : 'bg-white/80 border-gray-300 text-gray-500 hover:bg-[#a259c6]/10 hover:scale-105'}
                          `}
                          onClick={() => handleTagClick(tag)}
                          aria-pressed={selectedTags.includes(tag)}
                          tabIndex={0}
                        >
                          {tag}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="text-xs text-gray-400 mt-1">{selectedTags.length} / 10 selected</div>
              </div>
              {/* Button */}
              <div>
                <Button type="submit" className="mt-4 font-semibold bg-gradient-to-r from-[#a259c6] to-[#4f1b59] hover:from-[#4f1b59] hover:to-[#a259c6] text-white px-10 py-5 rounded-xl shadow-xl text-xl w-full transition-all duration-200 hover:scale-[1.03] active:scale-95 focus:ring-4 focus:ring-[#a259c6]/30" disabled={loading}>
                  {loading ? (
                    <span className="flex items-center gap-2"><Sparkles className="w-5 h-5 animate-spin" />Saving...</span>
                  ) : 'Save Changes'}
                </Button>
              </div>
            </motion.div>
          </form>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative min-h-[90vh] flex flex-col items-center justify-start w-full"
          >
            {/* Animated Gradient Hero */}
            <div className="absolute top-0 left-0 w-full h-72 md:h-80 bg-gradient-to-br from-[#a259c6] via-[#7f3fa7] to-[#4f1b59] animate-gradient-x z-0" style={{ filter: 'blur(0px)' }} />
            {/* Avatar with glow and effects */}
            <div className="relative z-20 flex flex-col items-center w-full" style={{ marginTop: '4.5rem' }}>
              <div className="group relative flex items-center justify-center">
                {/* Animated gradient border */}
                <span className="absolute w-48 h-48 md:w-56 md:h-56 rounded-full bg-gradient-to-tr from-blue-400 via-purple-400 to-pink-400 animate-spin-slow blur-xl opacity-60 scale-110" style={{ zIndex: 1 }} />
                {/* Avatar circle with thick border and shadow */}
                <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full border-8 border-white bg-white shadow-2xl flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:rotate-3 group-hover:scale-105" style={{ boxShadow: '0 0 0 8px #a259c6, 0 8px 32px 0 rgba(79,27,89,0.25)', zIndex: 3 }}>
                  {profile.image ? (
                    <img
                      src={profile.image}
                      alt="Profile"
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center rounded-full bg-gradient-to-br from-[#a259c6] to-[#4f1b59]">
                      <User className="w-20 h-20 text-white opacity-80" />
                    </div>
                  )}
                  {/* Glass shine overlay */}
                  <span className="absolute left-0 top-0 w-full h-full rounded-full pointer-events-none" style={{ background: 'linear-gradient(120deg,rgba(255,255,255,0.45) 0%,rgba(255,255,255,0.15) 60%,rgba(255,255,255,0) 100%)', zIndex: 4 }} />
                </div>
              </div>
              {/* Floating Glass Card */}
              <div className="w-full max-w-3xl bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl p-10 pt-32 mt-[-3rem] flex flex-col gap-10 border border-purple-100 relative z-20" style={{ boxShadow: '0 8px 40px 0 rgba(162,89,198,0.15)' }}>
                {/* Name and email at the top of the card */}
                <div className="flex flex-col items-center gap-1 -mt-28 mb-4">
                  <h1 className="text-4xl md:text-5xl font-extrabold text-[#2d174d] tracking-tight leading-tight mb-1">{profile.name || 'Your Name'}</h1>
                  <div className="text-base md:text-lg text-gray-500 font-normal">{profile.email || 'Email'}</div>
                </div>
                {/* Role, Department, Position */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <div className="flex items-center gap-2 font-semibold text-[#a259c6] mb-1"><Briefcase className="w-5 h-5" />Role</div>
                    <div className="text-gray-800 text-lg font-medium">{ROLE_OPTIONS.find(r => r.value === profile.member_type)?.label || '-'}</div>
                  </div>
                  {profile.member_type !== 'super_core' && (
                    <div>
                      <div className="flex items-center gap-2 font-semibold text-[#a259c6] mb-1"><Building2 className="w-5 h-5" />Department</div>
                      <div className="text-gray-800 text-lg font-medium">{profile.department || '-'}</div>
                    </div>
                  )}
                  <div>
                    <div className="flex items-center gap-2 font-semibold text-[#a259c6] mb-1"><Briefcase className="w-5 h-5" />Position</div>
                    <div className="text-gray-800 text-lg font-medium">{profile.position_hierarchy || '-'}</div>
                  </div>
                </div>
                <div className="border-t border-purple-100 pt-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div>
                    <div className="flex items-center gap-2 font-semibold text-[#a259c6] mb-1"><Linkedin className="w-5 h-5" />LinkedIn</div>
                    <div className="text-blue-700 break-all text-lg font-medium">{profile.linkedin ? <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-900 transition-colors">{profile.linkedin}</a> : '-'}</div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 font-semibold text-[#a259c6] mb-1"><Instagram className="w-5 h-5" />Instagram</div>
                    <div className="text-blue-700 break-all text-lg font-medium">{profile.Instagram ? <a href={profile.Instagram} target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-900 transition-colors">{profile.Instagram}</a> : '-'}</div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 font-semibold text-[#a259c6] mb-1"><Github className="w-5 h-5" />GitHub</div>
                    <div className="text-blue-700 break-all text-lg font-medium">{profile.github ? <a href={profile.github} target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-900 transition-colors">{profile.github}</a> : '-'}</div>
                  </div>
                </div>
                <div className="border-t border-purple-100 pt-6">
                  <div className="flex items-center gap-2 font-semibold text-[#a259c6] mb-1"><User className="w-5 h-5" />Bio</div>
                  <div className="text-gray-700 whitespace-pre-line text-lg mt-1">{profile.bio || '-'}</div>
                </div>
                <div className="border-t border-purple-100 pt-6">
                  <div className="flex items-center gap-2 font-semibold text-[#a259c6] mb-1"><span className="w-5 h-5 inline-block"><svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L6 21m0 0l-3.75-4M6 21V3m12 0l3.75 4M18 3v18m0 0l-3.75-4" /></svg></span>Hobbies</div>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {(profile.hobbies && profile.hobbies.length > 0 ? profile.hobbies : selectedHobbies).map((hobby: string) => (
                      <span key={hobby} className="px-4 py-1 rounded-full bg-gradient-to-r from-blue-200 to-green-200 text-blue-900 text-base font-semibold shadow-sm hover:scale-105 transition-transform duration-150">{hobby}</span>
                    ))}
                    {(!profile.hobbies || profile.hobbies.length === 0) && selectedHobbies.length === 0 && <span className="text-gray-400">-</span>}
                  </div>
                </div>
                <div className="border-t border-purple-100 pt-6">
                  <div className="flex items-center gap-2 font-semibold text-[#a259c6] mb-1"><span className="w-5 h-5 inline-block"><svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8a9 9 0 100-18 9 9 0 000 18z" /></svg></span>Tags</div>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {(profile.tags && profile.tags.length > 0 ? profile.tags : selectedTags).map((tag: string) => (
                      <span key={tag} className="px-4 py-1 rounded-full bg-gradient-to-r from-yellow-200 to-orange-200 text-yellow-900 text-base font-semibold shadow-sm hover:scale-105 transition-transform duration-150">{tag}</span>
                    ))}
                    {(!profile.tags || profile.tags.length === 0) && selectedTags.length === 0 && <span className="text-gray-400">-</span>}
                  </div>
                </div>
                <div className="flex justify-end mt-6">
                  <Button type="button" className="bg-gradient-to-r from-[#a259c6] to-[#4f1b59] text-white px-10 py-4 rounded-xl shadow-lg font-bold text-lg hover:from-[#4f1b59] hover:to-[#a259c6] transition-all duration-200" onClick={() => setEditMode(true)}>
                    Edit Profile
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default Profile; 