import Header from '@/components/Header';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Camera, User, Mail, Briefcase, Building2, Linkedin, Instagram, Github, Plus, Sparkles, CheckCircle, Loader2, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { Label } from '@/components/ui/label';

const ROLE_OPTIONS = [
  { label: 'Super Core', value: 'super_core' },
  { label: 'Core', value: 'core' },
  { label: 'Executive', value: 'executive' },
  { label: 'Mentor', value: 'mentor' },
];
const POSITION_OPTIONS = [
  'Chairperson',
  'Vice-chairperson',
  'Secretary',
  'Director',
  'Treasurer',
  'Head',
  'Subhead',
  'Executive',
  'Mentor',
  'Research Lead', // Added for completeness
];
const DEPARTMENT_OPTIONS = [
  'Technicals',
  'Research',
  'Digital Creatives',
  'Inhouse Creatives',
  'SMCW',
  'Photography',
  'Logistics',
  'Marketing',
  'Public Relations', // Added as per request
];

// Add 50 hobbies and 50 tags
const HOBBY_OPTIONS = [
    "Singing", "Dancing", "Instruments", "Painting", "Photography", "Acting", "Movies", "Music", "Crafting", "Writing",
    "Cricket", "Badminton", "Football", "Kabaddi", "Yoga", "Gym", "Running", "Cycling", "Swimming", "TableTennis",
    "Trekking", "Birdwatching", "Nature", "Camping",
    "Cooking", "Baking", "Dining", "Foodblogging",
    "Gaming", "Boardgames", "Puzzles", "Cardgames",
    "SocialMedia", "Vlogging", "Podcasting", "Memes", "Coding", "Trading", "BingeWatching", "TechExploring",
    "Traveling", "Backpacking", "Sightseeing", "Roadtrips",
    "Reading", "Languages", "Speaking", "Quizzing",
    "Volunteering", "Festivals", "Spirituality", "Pets",
    "Collecting", "Fashion", "Decorating", "Anime",
    "Streaming", "Esports", "Kpop", "Thrifting"
];
const TAG_OPTIONS = [
  'Leadership', 'Teamwork', 'Creativity', 'Problem Solving', 'Critical Thinking', 'Communication', 'Adaptability', 'Time Management', 'Organization', 'Empathy',
  'Innovation', 'Collaboration', 'Initiative', 'Attention to Detail', 'Resilience', 'Curiosity', 'Passion', 'Motivation', 'Discipline', 'Flexibility',
  'Networking', 'Strategic', 'Analytical', 'Resourceful', 'Visionary', 'Dependable', 'Enthusiastic', 'Patient', 'Persuasive', 'Open-minded',
  'Goal-oriented', 'Listener', 'Planner', 'Negotiation', 'Mentoring', 'Coaching', 'Research', 'Presentation', 'Writing', 'Design',
  'Tech-savvy', 'Multitasking', 'Decision Making', 'Learning', 'Self-starter', 'Energetic', 'Supportive', 'Friendly', 'Detail-oriented', 'Fast Learner'
];

// 1. Add COURSE_OPTIONS, YEAR_OPTIONS, STREAM_OPTIONS at the top
const COURSE_OPTIONS = ["B. Tech.", "BTI", "MCA", "M. Tech", "MBA Tech"];
const YEAR_OPTIONS = ["1", "2", "3", "4", "5", "6"];
const STREAM_OPTIONS = ["AI", "CS", "CE", "DS", "EXTC", "Cyber Security", "IT", "CSDS", "CSBS", "Mech", "MXTC", "MCA"];

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
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [cardPulse, setCardPulse] = useState(false);

  // 1. Add state for custom hobby/tag input and editing
  const [customHobby, setCustomHobby] = useState('');
  const [addingCustomHobby, setAddingCustomHobby] = useState(false);
  const [customTag, setCustomTag] = useState('');
  const [addingCustomTag, setAddingCustomTag] = useState(false);

  // Simulate fetching userId from localStorage or context
  const userId = localStorage.getItem('userId') || '';
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const { id: routeId } = useParams();

  // Determine if viewing own profile or another's
  const isOwnProfile = !routeId || routeId === userId;

  useEffect(() => {
    // Only show localStorage warning if viewing own profile and not logged in
    if (isOwnProfile && (!isLoggedIn || !userId)) {
      setLocalStorageWarning('You are not logged in or your session has expired. Please log in again.');
      console.warn('Profile page: localStorage missing isLoggedIn or userId', { isLoggedIn, userId });
      return;
    } else {
      setLocalStorageWarning(null);
    }
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const fetchId = routeId || userId;
        const res = await fetch(`https://loopin-iet-portal-1.onrender.com/api/profile/${fetchId}`);
        if (!res.ok) {
          throw new Error('Failed to fetch profile.');
        }
        const data = await res.json();
        if (!data) {
          setProfileWarning('No profile exists for this user.');
          setProfile({});
          setShowDept(false);
          setSelectedHobbies([]);
          setSelectedTags([]);
          setEditMode(isOwnProfile); // Only allow edit if own profile
        } else {
          setProfileWarning(null);
          setProfile(data);
          setShowDept(data?.member_type !== 'super_core');
          if (data?.hobbies && Array.isArray(data.hobbies)) setSelectedHobbies(data.hobbies);
          if (data?.tags && Array.isArray(data.tags)) setSelectedTags(data.tags);
          setEditMode(isOwnProfile ? !data : false); // Only allow edit if own profile
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
  }, [userId, isLoggedIn, routeId, isOwnProfile]);

  // In handleRoleChange, if value is 'super_core' or 'mentor', set department to null
  const handleRoleChange = (value: string) => {
    setProfile((p: any) => ({ ...p, member_type: value, department: (value === 'super_core' || value === 'mentor') ? null : p.department }));
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
    } else if (name === 'timetable_image' && files && files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfile((p: any) => ({ ...p, timetable_image: reader.result }));
      };
      reader.readAsDataURL(files[0]);
      return;
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
        res = await fetch(`https://loopin-iet-portal-1.onrender.com/api/profile/${profile.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...profile,
            user_id: userId,
            hobbies: selectedHobbies,
            tags: selectedTags,
            course: profile.course || '',
            year: profile.year || '',
            stream: profile.stream || '',
            timetable_image: profile.timetable_image || '',
          }),
        });
      } else {
        // Create new profile
        res = await fetch('https://loopin-iet-portal-1.onrender.com/api/profile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...profile,
            user_id: userId,
            hobbies: selectedHobbies,
            tags: selectedTags,
            course: profile.course || '',
            year: profile.year || '',
            stream: profile.stream || '',
            timetable_image: profile.timetable_image || '',
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

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveState('saving');
    try {
      let res;
      if (profile.id) {
        // Update existing profile
        res = await fetch(`https://loopin-iet-portal-1.onrender.com/api/profile/${profile.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...profile,
            user_id: userId,
            hobbies: selectedHobbies,
            tags: selectedTags,
            course: profile.course || '',
            year: profile.year || '',
            stream: profile.stream || '',
            timetable_image: profile.timetable_image || '',
          }),
        });
      } else {
        // Create new profile
        res = await fetch('https://loopin-iet-portal-1.onrender.com/api/profile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...profile,
            user_id: userId,
            hobbies: selectedHobbies,
            tags: selectedTags,
            course: profile.course || '',
            year: profile.year || '',
            stream: profile.stream || '',
            timetable_image: profile.timetable_image || '',
          }),
        });
        if (res.ok) {
          const data = await res.json();
          setProfile((p: any) => ({ ...p, id: data.id }));
        }
      }
      if (!res.ok) throw new Error('Failed to save profile');
      setSaveState('success');
      setCardPulse(true);
      setTimeout(() => setCardPulse(false), 1200);
      setTimeout(() => setSaveState('idle'), 1500);
      toast({ title: 'Profile Saved', description: 'Your profile was updated successfully!', variant: 'default' });
    } catch (err) {
      setSaveState('error');
      setTimeout(() => setSaveState('idle'), 1500);
      toast({ title: 'Error', description: 'Failed to save profile', variant: 'destructive' });
    }
  };

  // Add filteredPositionOptions based on member_type
  const getFilteredPositions = (memberType: string) => {
    if (memberType === 'super_core') {
      return ['Chairperson', 'Vice-chairperson', 'Secretary', 'Director', 'Treasurer', 'Research Lead'];
    } else if (memberType === 'core') {
      return ['Head', 'Subhead'];
    } else if (memberType === 'executive') {
      return ['Executive'];
    } else if (memberType === 'mentor') {
      return ['Mentor'];
    }
    return POSITION_OPTIONS;
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden" style={{ background: 'linear-gradient(120deg, #f8f6ff 0%, #f3e8ff 40%, #e0c3fc 70%, #fff 100%)' }}>
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
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 0.13, scale: 1 }} transition={{ duration: 2, ease: 'easeOut' }} className="absolute top-[-12%] left-[-10%] w-[65vw] h-[65vw] rounded-full bg-gradient-to-br from-[#a259c6] via-[#f3e8ff] to-[#4f1b59] blur-3xl" />
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 0.09, scale: 1 }} transition={{ duration: 2, delay: 0.5, ease: 'easeOut' }} className="absolute bottom-[-10%] right-[-10%] w-[55vw] h-[55vw] rounded-full bg-gradient-to-br from-[#4f1b59] via-[#f3e8ff] to-[#fff] blur-3xl" />
        <motion.div initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 0.07, scale: 1 }} transition={{ duration: 2.2, delay: 0.8, ease: 'easeOut' }} className="absolute top-[30%] left-[-15%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-br from-[#f9e7ff] via-[#ffe6fa] to-[#fff] blur-3xl" />
        <motion.div initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 0.06, scale: 1 }} transition={{ duration: 2.2, delay: 1.1, ease: 'easeOut' }} className="absolute bottom-[10%] right-[-18%] w-[38vw] h-[38vw] rounded-full bg-gradient-to-br from-[#fff] via-[#e0c3fc] to-[#f3e8ff] blur-3xl" />
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-white/80 via-white/0 to-transparent" />
      </div>
      <Header />
      <main className="relative z-10 max-w-2xl mx-auto py-16 px-4 w-full">
        {editMode ? (
          <form onSubmit={handleSave} className="flex flex-col gap-12 w-full">
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
                {showDept && profile.member_type !== 'mentor' && (
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
                          {getFilteredPositions(profile.member_type || '').map(opt => (
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
              {/* Academic Details */}
              <div className="bg-gradient-to-br from-[#f8f5fc] via-[#e9d8fd] to-[#f3eafd] rounded-2xl shadow-lg p-6 mb-6 flex flex-col gap-4 border border-[#a259c6]/10">
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Course */}
                  <div className="flex-1">
                    <Label htmlFor="course" className="flex items-center gap-2 text-[#4f1b59] font-semibold text-base mb-1">
                      <Briefcase className="w-5 h-5 text-[#a259c6]" /> Course
                    </Label>
                    <Select name="course" value={profile.course || ''} onValueChange={val => handleSelect('course', val)}>
                      <SelectTrigger id="course" className="h-12 text-base bg-white/80 border border-[#a259c6]/30 rounded-lg shadow-sm">
                        <SelectValue placeholder="Select course" />
                      </SelectTrigger>
                      <SelectContent>
                        {COURSE_OPTIONS.map(option => (
                          <SelectItem key={option} value={option}>{option}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {/* Year */}
                  <div className="flex-1">
                    <Label htmlFor="year" className="flex items-center gap-2 text-[#4f1b59] font-semibold text-base mb-1">
                      <Sparkles className="w-5 h-5 text-[#a259c6]" /> Year
                    </Label>
                    <Select name="year" value={profile.year || ''} onValueChange={val => handleSelect('year', val)}>
                      <SelectTrigger id="year" className="h-12 text-base bg-white/80 border border-[#a259c6]/30 rounded-lg shadow-sm">
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        {YEAR_OPTIONS.map(option => (
                          <SelectItem key={option} value={option}>{option} {option === "1" ? 'st' : option === "2" ? 'nd' : option === "3" ? 'rd' : 'th'} year</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {/* Stream */}
                  <div className="flex-1">
                    <Label htmlFor="stream" className="flex items-center gap-2 text-[#4f1b59] font-semibold text-base mb-1">
                      <Building2 className="w-5 h-5 text-[#a259c6]" /> Stream
                    </Label>
                    <Select name="stream" value={profile.stream || ''} onValueChange={val => handleSelect('stream', val)}>
                      <SelectTrigger id="stream" className="h-12 text-base bg-white/80 border border-[#a259c6]/30 rounded-lg shadow-sm">
                        <SelectValue placeholder="Select stream" />
                      </SelectTrigger>
                      <SelectContent>
                        {STREAM_OPTIONS.map(option => (
                          <SelectItem key={option} value={option}>{option}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              {/* Timetable Photo Upload */}
              <div className="flex flex-col gap-2 mt-4 items-start">
                <Label htmlFor="timetable_image" className="flex items-center gap-2 text-[#4f1b59] font-semibold text-base mb-1">
                  <Sparkles className="w-5 h-5 text-[#a259c6]" /> Timetable Photo
                </Label>
                <div className="flex items-center gap-4">
                  <label htmlFor="timetable_image" className="cursor-pointer inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#a259c6] to-[#4f1b59] text-white rounded-lg shadow hover:from-[#4f1b59] hover:to-[#a259c6] transition-all duration-200 font-semibold">
                    <Camera className="w-5 h-5 mr-2" />
                    {profile.timetable_image ? 'Change Timetable' : 'Choose Timetable'}
                  </label>
                  <input
                    id="timetable_image"
                    type="file"
                    name="timetable_image"
                    accept="image/*"
                    onChange={handleChange}
                    className="hidden"
                  />
                  {profile.timetable_image && (
                    <span className="text-sm text-[#a259c6] font-medium">Selected</span>
                  )}
                </div>
                {profile.timetable_image && (
                  <img src={profile.timetable_image} alt="Timetable" className="mt-2 rounded-lg shadow max-w-xs max-h-60 border border-[#a259c6]/30" />
                )}
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
                          <motion.span
                            key={hobby}
                            className={`px-3 py-1 rounded-[11px] text-[14px] sm:text-[15px] font-semibold mb-1 ${[
                              'bg-[#fff3da] text-[#d4a638]',
                              'bg-[#e6f6de] text-[#73ab4b]',
                              'bg-[#e6eaff] text-[#5863bb]',
                              'bg-[#eaf4fe] text-[#9062ad]',
                              'bg-[#f3e6ff] text-[#905fdc]',
                              'bg-[#defcf9] text-[#19adb7]',
                              'bg-[#ffe6fa] text-[#da3ea6]'
                            ][HOBBY_OPTIONS.indexOf(hobby) % 7]}`}
                            whileHover={{ scale: 1.12, boxShadow: '0 2px 12px 0 rgba(162,89,198,0.10)' }}
                            transition={{ type: 'spring', stiffness: 300 }}
                            onClick={() => handleHobbyClick(hobby)}
                            aria-pressed={selectedHobbies.includes(hobby)}
                            tabIndex={0}
                          >
                            {hobby}
                          </motion.span>
                        ))}
                        {/* Add custom hobby input */}
                        <button
                          type="button"
                          className="px-3 py-1 rounded-full border text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-[#a259c6]/40 transition-all duration-150 bg-white/80 border-gray-300 text-[#a259c6] hover:bg-[#a259c6]/10 hover:scale-105 flex items-center gap-1"
                          onClick={() => setAddingCustomHobby(true)}
                          aria-label="Add custom hobby"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        {addingCustomHobby && (
                          <div className="flex gap-2 mt-2">
                            <Input value={customHobby} onChange={e => setCustomHobby(e.target.value)} placeholder="Custom hobby" className="h-8 text-sm" autoFocus />
                            <Button type="button" size="sm" onClick={() => {
                              if (customHobby.trim() && !selectedHobbies.includes(customHobby.trim()) && selectedHobbies.length < 10) {
                                setSelectedHobbies(prev => [...prev, customHobby.trim()]);
                                setCustomHobby('');
                                setAddingCustomHobby(false);
                              }
                            }}>Add</Button>
                            <Button type="button" size="sm" variant="ghost" onClick={() => { setCustomHobby(''); setAddingCustomHobby(false); }}>Cancel</Button>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <div className="text-xs text-gray-400 mt-1">{selectedHobbies.length} / 10 selected</div>
                  <div className="text-xs text-gray-400 mt-0.5">Won't be visible to others.</div>
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
                          <motion.span
                            key={tag}
                            className={`px-3 py-1 rounded-[11px] text-[14px] sm:text-[15px] font-semibold mb-1 ${[
                              'bg-[#eaf6ff] text-[#36a3f7]',
                              'bg-[#fff4ea] text-[#f09d51]',
                              'bg-[#ffdfe6] text-[#e65774]',
                              'bg-[#f5f7fa] text-[#8492a6]',
                              'bg-[#def6fc] text-[#028090]',
                              'bg-[#ffe6fa] text-[#da3ea6]',
                              'bg-[#e6f6de] text-[#73ab4b]',
                              'bg-[#f3e6ff] text-[#905fdc]',
                              'bg-[#fff3da] text-[#d4a638]',
                              'bg-[#defcf9] text-[#19adb7]'
                            ][TAG_OPTIONS.indexOf(tag) % 10]}`}
                            whileHover={{ scale: 1.12, boxShadow: '0 2px 12px 0 rgba(162,89,198,0.10)' }}
                            transition={{ type: 'spring', stiffness: 300 }}
                            onClick={() => handleTagClick(tag)}
                            aria-pressed={selectedTags.includes(tag)}
                            tabIndex={0}
                          >
                            {tag}
                          </motion.span>
                        ))}
                        {/* Add custom tag input */}
                        <button
                          type="button"
                          className="px-3 py-1 rounded-full border text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-[#a259c6]/40 transition-all duration-150 bg-white/80 border-gray-300 text-[#a259c6] hover:bg-[#a259c6]/10 hover:scale-105 flex items-center gap-1"
                          onClick={() => setAddingCustomTag(true)}
                          aria-label="Add custom tag"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        {addingCustomTag && (
                          <div className="flex gap-2 mt-2">
                            <Input value={customTag} onChange={e => setCustomTag(e.target.value)} placeholder="Custom tag" className="h-8 text-sm" autoFocus />
                            <Button type="button" size="sm" onClick={() => {
                              if (customTag.trim() && !selectedTags.includes(customTag.trim()) && selectedTags.length < 10) {
                                setSelectedTags(prev => [...prev, customTag.trim()]);
                                setCustomTag('');
                                setAddingCustomTag(false);
                              }
                            }}>Add</Button>
                            <Button type="button" size="sm" variant="ghost" onClick={() => { setCustomTag(''); setAddingCustomTag(false); }}>Cancel</Button>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <div className="text-xs text-gray-400 mt-1">{selectedTags.length} / 10 selected</div>
                  <div className="text-xs text-gray-400 mt-0.5">Won't be visible to others.</div>
                </div>
              {/* Button */}
              <div>
                <motion.button
                  type="submit"
                  className={`mt-4 font-semibold bg-gradient-to-r from-[#a259c6] to-[#4f1b59] hover:from-[#4f1b59] hover:to-[#a259c6] text-white px-10 py-5 rounded-xl shadow-xl text-xl w-full transition-all duration-200 hover:scale-[1.03] active:scale-95 focus:ring-4 focus:ring-[#a259c6]/30
                    ${saveState === 'saving' ? 'bg-purple-400 text-white cursor-wait' : ''}
                    ${saveState === 'success' ? 'bg-green-500 text-white' : ''}
                    ${saveState === 'error' ? 'bg-red-500 text-white animate-shake' : ''}
                  `}
                  disabled={saveState === 'saving'}
                  whileTap={{ scale: 0.97 }}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {saveState === 'saving' && (
                      <motion.span key="saving" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <Loader2 className="w-5 h-5 animate-spin" /> Saving...
                      </motion.span>
                    )}
                    {saveState === 'success' && (
                      <motion.span key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <CheckCircle className="w-5 h-5" /> Saved!
                      </motion.span>
                    )}
                    {saveState === 'error' && (
                      <motion.span key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <XCircle className="w-5 h-5" /> Error
                      </motion.span>
                    )}
                    {saveState === 'idle' && (
                      <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        Save Profile
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </motion.div>
          </form>
        ) : (
          <motion.div
            className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#f3e8ff] via-[#e9d8fd] to-[#fde0ff] py-4 px-1 sm:py-8 sm:px-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              className="w-full max-w-[1100px] min-w-0 sm:min-w-[900px] bg-white rounded-[28px] shadow-[0_4px_28px_rgba(60,90,120,0.12)] px-2 sm:px-4 md:px-8 lg:px-[58px] py-4 sm:py-8 md:py-[44px] flex flex-col gap-8 sm:gap-10"
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              {/* Hero Section */}
              <motion.div
                className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-8 mb-2"
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
              >
                <motion.div
                  className="relative flex flex-col items-center"
                  initial={{ opacity: 0, scale: 0.6, rotate: -15 }}
                  animate={{ opacity: 1, scale: 1, rotate: -3, transition: { type: 'spring', bounce: 0.45, duration: 1.1 } }}
                  whileHover={{
                    scale: 1.11,
                    y: -16,
                    rotate: Math.random() > 0.5 ? 3 : -4,
                    boxShadow: '0 0 0 8px #ede2fa, 0 20px 60px 0 rgba(162,89,198,0.25)',
                    transition: { duration: 0.45, type: 'spring', bounce: 0.4 }
                  }}
                  tabIndex={0}
                  role="img"
                  aria-label={profile.name ? `Polaroid photo of ${profile.name}` : 'Polaroid profile photo'}
                >
                  <div
                    className="bg-[#f3e8ff] rounded-[14px] shadow-xl border border-[#d1d5db] flex flex-col items-center w-[110px] h-[150px] sm:w-[150px] sm:h-[200px] mb-2 relative"
                    style={{
                      boxShadow: '0 12px 32px 0 rgba(60,90,120,0.16)',
                      background: 'repeating-linear-gradient(135deg, #f3e8ff 0px, #f3e8ff 8px, #ede2fa 12px, #f3e8ff 20px)',
                      filter: 'brightness(1.03)'
                    }}
                  >
                    <img
                      src={profile.image || 'https://randomuser.me/api/portraits/men/32.jpg'}
                      alt={profile.name || 'Profile'}
                      className="w-[90px] h-[90px] sm:w-[120px] sm:h-[120px] object-cover rounded-[8px] mt-3 shadow-md"
                      style={{ boxShadow: '0 2px 8px 0 rgba(60,90,120,0.10)' }}
                    />
                    <div className="flex-1" />
                    <div className="w-full h-10 sm:h-14 bg-white rounded-b-[14px] flex items-end justify-center pb-1">
                      {profile.name && (
                        <span className="text-sm sm:text-base text-[#7c5fa6]" style={{ fontFamily: 'Pacifico, cursive', letterSpacing: '0.04em', opacity: 0.92, textShadow: '0 1px 4px #ede2fa' }}>
                          {profile.name}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  className="flex-1 flex flex-col items-center sm:items-start"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
                >
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#222] mb-1 text-left w-full">{profile.name || 'Your Name'}</h1>
                  <div className="text-[#4b6aa7] text-sm sm:text-base md:text-lg font-medium break-all mb-2 text-left w-full">{profile.email || 'Email'}</div>
                  <div className="flex flex-wrap gap-2 mt-1 w-full">
                    <span className="bg-[#ede2fa] text-[#8142b9] rounded-[13px] px-3 py-1 sm:px-4 sm:py-1 text-sm sm:text-base font-semibold min-w-[90px] sm:min-w-[110px] flex items-center justify-center">Role: {ROLE_OPTIONS.find(r => r.value === profile.member_type)?.label || '-'}</span>
                    {profile.member_type !== 'mentor' && (
                      <span className="bg-[#ede2fa] text-[#8142b9] rounded-[13px] px-3 py-1 sm:px-4 sm:py-1 text-sm sm:text-base font-semibold min-w-[90px] sm:min-w-[110px] flex items-center justify-center">Department: {profile.department || '-'}</span>
                    )}
                    <span className="bg-[#ede2fa] text-[#8142b9] rounded-[13px] px-3 py-1 sm:px-4 sm:py-1 text-sm sm:text-base font-semibold min-w-[90px] sm:min-w-[110px] flex items-center justify-center">Position: {profile.position_hierarchy || '-'}</span>
                  </div>
                </motion.div>
              </motion.div>
              {/* Main Grid */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-x-0 md:gap-x-10 gap-y-6 md:gap-y-8"
                initial="hidden"
                animate="visible"
                variants={{}}
              >
                {/* Left Column */}
                <div className="flex flex-col gap-6 md:gap-8">
                  {/* About Me */}
                  <motion.div
                    className="bg-[#f7f2fb] rounded-2xl shadow-sm p-4 sm:p-6 min-h-[90px] sm:min-h-[120px]"
                    initial={{ opacity: 0, y: 32 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
                    whileHover={{ scale: 1.03, boxShadow: '0 8px 32px 0 rgba(162,89,198,0.13)' }}
                  >
                    <div className="font-bold text-base sm:text-lg text-[#2e4667] mb-2">About Me</div>
                    <p className="text-sm sm:text-base text-[#111]">{profile.bio || 'No bio provided.'}</p>
                  </motion.div>
                  {/* Academic Info */}
                  <motion.div
                    className="bg-[#f7f2fb] rounded-2xl shadow-sm p-4 sm:p-6 min-h-[90px] sm:min-h-[120px]"
                    initial={{ opacity: 0, y: 32 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.35, ease: 'easeOut' }}
                    whileHover={{ scale: 1.03, boxShadow: '0 8px 32px 0 rgba(162,89,198,0.13)' }}
                  >
                    <div className="font-bold text-base sm:text-lg text-[#33476a] mb-2">Academic Info</div>
                    <table className="w-full text-[0.97rem] sm:text-[1.07rem] text-[#111] mt-2">
                      <tbody>
                        <tr>
                          <td className="pr-3 whitespace-nowrap font-semibold">Course:</td>
                          <td>{profile.course || '-'}</td>
                        </tr>
                        <tr>
                          <td className="pr-3 whitespace-nowrap font-semibold">Year:</td>
                          <td>{profile.year ? (profile.year === '1' ? '1st' : profile.year === '2' ? '2nd' : profile.year === '3' ? '3rd' : profile.year + 'th') + ' Year' : '-'}</td>
                        </tr>
                        <tr>
                          <td className="pr-3 whitespace-nowrap font-semibold">Stream:</td>
                          <td>{profile.stream || '-'}</td>
                        </tr>
                      </tbody>
                    </table>
                  </motion.div>
                  {/* Timetable Snapshot */}
                  <motion.div
                    className="bg-[#f7f2fb] rounded-2xl shadow-sm p-4 sm:p-6 min-h-[90px] sm:min-h-[120px] flex flex-col items-center justify-center"
                    initial={{ opacity: 0, y: 32 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.45, ease: 'easeOut' }}
                    whileHover={{ scale: 1.03, boxShadow: '0 8px 32px 0 rgba(162,89,198,0.13)' }}
                  >
                    <div className="font-bold text-base sm:text-lg text-[#567fc2] mb-2">Timetable Snapshot</div>
                    {profile.timetable_image ? (
                      <img src={profile.timetable_image} alt="Timetable Snapshot" className="block mx-auto w-[140px] h-[90px] sm:w-[204px] sm:h-[124px] object-cover rounded-[10px] border-2 border-[#e3eaff]" />
                    ) : (
                      <div className="w-[140px] h-[90px] sm:w-[204px] sm:h-[124px] flex items-center justify-center rounded-[10px] border-2 border-dashed border-[#e3eaff] bg-white/60 text-[#b0b0b0] text-sm sm:text-base font-medium">
                        No timetable uploaded yet
                      </div>
                    )}
                  </motion.div>
                </div>
                {/* Right Column */}
                <div className="flex flex-col gap-6 md:gap-8">
                  {/* Contact */}
                  <motion.div
                    className="bg-[#f7f2fb] rounded-2xl shadow-sm p-4 sm:p-6 min-h-[90px] sm:min-h-[120px]"
                    initial={{ opacity: 0, y: 32 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
                    whileHover={{ scale: 1.03, boxShadow: '0 8px 32px 0 rgba(162,89,198,0.13)' }}
                  >
                    <div className="font-bold text-base sm:text-lg text-[#336699] mb-3">Contact</div>
                    <div className="flex flex-wrap gap-2">
                      {profile.linkedin && (
                        <motion.a
                          href={profile.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-[11px] text-[15px] sm:text-[16px] font-semibold bg-[#e3f2fd] text-[#1363c4] hover:bg-[#d0e6fa] transition"
                          whileHover={{ scale: 1.08, filter: 'brightness(1.12)' }}
                          transition={{ type: 'spring', stiffness: 300 }}
                        >
                          <Linkedin className="w-5 h-5" /> LinkedIn
                        </motion.a>
                      )}
                      {profile.github && (
                        <motion.a
                          href={profile.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-[11px] text-[15px] sm:text-[16px] font-semibold bg-[#f5f7fa] text-[#222] hover:bg-[#e9ecef] transition"
                          whileHover={{ scale: 1.08, filter: 'brightness(1.12)' }}
                          transition={{ type: 'spring', stiffness: 300 }}
                        >
                          <Github className="w-5 h-5" /> GitHub
                        </motion.a>
                      )}
                      {profile.Instagram && (
                        <motion.a
                          href={profile.Instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-[11px] text-[15px] sm:text-[16px] font-semibold bg-[#cdf0ea] text-[#178f78] hover:bg-[#b6e2d3] transition"
                          whileHover={{ scale: 1.08, filter: 'brightness(1.12)' }}
                          transition={{ type: 'spring', stiffness: 300 }}
                        >
                          <Instagram className="w-5 h-5" /> Instagram
                        </motion.a>
                      )}
                    </div>
                  </motion.div>
                  {/* Hobbies */}
                  <motion.div
                    className="bg-[#f7f2fb] rounded-2xl shadow-sm p-4 sm:p-6 min-h-[90px] sm:min-h-[120px]"
                    initial={{ opacity: 0, y: 32 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
                    whileHover={{ scale: 1.03, boxShadow: '0 8px 32px 0 rgba(162,89,198,0.13)' }}
                  >
                    <div className="font-bold text-base sm:text-lg text-[#336699] mb-3">Hobbies</div>
                    <div className="flex flex-wrap gap-2">
                      {(profile.hobbies && profile.hobbies.length > 0 ? profile.hobbies : selectedHobbies).length > 0 ? (
                        (profile.hobbies && profile.hobbies.length > 0 ? profile.hobbies : selectedHobbies).map((hobby: string, i: number) => (
                          <motion.span
                            key={hobby}
                            className={`px-3 py-1 rounded-[11px] text-[14px] sm:text-[15px] font-semibold mb-1 ${[
                              'bg-[#fff3da] text-[#d4a638]',
                              'bg-[#e6f6de] text-[#73ab4b]',
                              'bg-[#e6eaff] text-[#5863bb]',
                              'bg-[#eaf4fe] text-[#9062ad]',
                              'bg-[#f3e6ff] text-[#905fdc]',
                              'bg-[#defcf9] text-[#19adb7]',
                              'bg-[#ffe6fa] text-[#da3ea6]'
                            ][i % 7]}`}
                            whileHover={{ scale: 1.12, boxShadow: '0 2px 12px 0 rgba(162,89,198,0.10)' }}
                            transition={{ type: 'spring', stiffness: 300 }}
                          >
                            {hobby}
                          </motion.span>
                        ))
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </div>
                  </motion.div>
                  {/* Tags */}
                  <motion.div
                    className="bg-[#f7f2fb] rounded-2xl shadow-sm p-4 sm:p-6 min-h-[90px] sm:min-h-[120px]"
                    initial={{ opacity: 0, y: 32 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
                    whileHover={{ scale: 1.03, boxShadow: '0 8px 32px 0 rgba(162,89,198,0.13)' }}
                  >
                    <div className="font-bold text-base sm:text-lg text-[#336699] mb-3">Tags</div>
                    <div className="flex flex-wrap gap-2">
                      {(profile.tags && profile.tags.length > 0 ? profile.tags : selectedTags).length > 0 ? (
                        (profile.tags && profile.tags.length > 0 ? profile.tags : selectedTags).map((tag: string, i: number) => (
                          <motion.span
                            key={tag}
                            className={`px-3 py-1 rounded-[11px] text-[14px] sm:text-[15px] font-semibold mb-1 ${[
                              'bg-[#eaf6ff] text-[#36a3f7]',
                              'bg-[#fff4ea] text-[#f09d51]',
                              'bg-[#ffdfe6] text-[#e65774]',
                              'bg-[#f5f7fa] text-[#8492a6]',
                              'bg-[#def6fc] text-[#028090]',
                              'bg-[#ffe6fa] text-[#da3ea6]',
                              'bg-[#e6f6de] text-[#73ab4b]',
                              'bg-[#f3e6ff] text-[#905fdc]',
                              'bg-[#fff3da] text-[#d4a638]',
                              'bg-[#defcf9] text-[#19adb7]'
                            ][i % 10]}`}
                            whileHover={{ scale: 1.12, boxShadow: '0 2px 12px 0 rgba(162,89,198,0.10)' }}
                            transition={{ type: 'spring', stiffness: 300 }}
                          >
                            {tag}
                          </motion.span>
                        ))
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
              {/* Edit button for own profile */}
              {isOwnProfile && (
                <motion.div
                  className="flex justify-center mt-6 sm:mt-8 w-full"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6, ease: 'easeOut' }}
                  whileHover={{ scale: 1.04, boxShadow: '0 0 0 4px #a259c6, 0 8px 32px 0 rgba(162,89,198,0.13)' }}
                >
                  <Button type="button" className="bg-gradient-to-r from-[#a259c6] to-[#4f1b59] text-white px-8 sm:px-10 py-4 rounded-xl shadow-lg font-bold text-base sm:text-lg hover:from-[#4f1b59] hover:to-[#a259c6] transition-all duration-200" onClick={() => setEditMode(true)}>
                    Edit Profile
                  </Button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default Profile; 