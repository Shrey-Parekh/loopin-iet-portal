import Header from '@/components/Header';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Camera, User, Mail, Briefcase, Building2, Linkedin, Instagram, Github, Plus, Sparkles, CheckCircle, Loader2, XCircle, Award } from 'lucide-react';
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
  'Public Relations',
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
        <div className="fixed top-0 left-0 w-full bg-red-100 text-red-700 text-center py-3 z-50 font-semibold shadow-lg border-b border-red-200">
          {localStorageWarning}
        </div>
      )}
      {profileWarning && !localStorageWarning && (
        <div className="fixed top-0 left-0 w-full bg-yellow-100 text-yellow-800 text-center py-3 z-40 font-semibold shadow-lg border-b border-yellow-200">
          {profileWarning}
        </div>
      )}
      
      {/* Enhanced animated background with more effects */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Main dreamy blobs */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.13, scale: 1 }}
          transition={{ duration: 2, ease: 'easeOut' }}
          className="absolute top-[-12%] left-[-10%] w-[65vw] h-[65vw] rounded-full bg-gradient-to-br from-[#a259c6] via-[#f3e8ff] to-[#4f1b59] blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.09, scale: 1 }}
          transition={{ duration: 2, delay: 0.5, ease: 'easeOut' }}
          className="absolute bottom-[-10%] right-[-10%] w-[55vw] h-[55vw] rounded-full bg-gradient-to-br from-[#4f1b59] via-[#f3e8ff] to-[#fff] blur-3xl"
        />
        {/* Extra dreamy blobs for depth */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 0.07, scale: 1 }}
          transition={{ duration: 2.2, delay: 0.8, ease: 'easeOut' }}
          className="absolute top-[30%] left-[-15%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-br from-[#f9e7ff] via-[#ffe6fa] to-[#fff] blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 0.06, scale: 1 }}
          transition={{ duration: 2.2, delay: 1.1, ease: 'easeOut' }}
          className="absolute bottom-[10%] right-[-18%] w-[38vw] h-[38vw] rounded-full bg-gradient-to-br from-[#fff] via-[#e0c3fc] to-[#f3e8ff] blur-3xl"
        />
        
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
              </div>

        {/* Animated geometric patterns */}
        <div className="absolute inset-0 opacity-10">
              <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-[#a259c6] rounded-full"
          />
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            className="absolute bottom-1/3 right-1/3 w-24 h-24 border-2 border-[#4f1b59] rounded-full"
          />
          <motion.div 
            animate={{ rotate: 360, scale: [1, 1.1, 1] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className="absolute top-1/2 right-1/4 w-16 h-16 border border-[#a259c6]/50 rounded-full"
          />
                </div>
                
        {/* Faint radial fade at bottom for extra depth */}
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-white/80 via-white/0 to-transparent" />
      </div>
      
      <Header />
      <main className="relative z-10 max-w-6xl mx-auto py-8 px-4 w-full">
        {editMode ? (
          <form onSubmit={handleSave} className="flex flex-col gap-8 w-full">
            {/* Enhanced Profile Header Section */}
                    <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 mb-8"
            >
              <div className="flex flex-col lg:flex-row items-center gap-8">
                {/* Profile Image Section */}
                <div className="flex flex-col items-center">
                  <div
                    className={`relative w-56 h-56 rounded-2xl border-8 border-transparent bg-gradient-to-br from-[#a259c6] via-[#f3e8ff] to-[#4f1b59] shadow-2xl flex items-center justify-center transition-all duration-300 cursor-pointer group ${dragActive ? 'ring-8 ring-[#a259c6]/60' : ''}`}
                    style={{ 
                      boxShadow: '0 0 0 8px #e0c3fc, 0 20px 60px 0 rgba(162,89,198,0.25)',
                      background: 'linear-gradient(135deg, #a259c6 0%, #f3e8ff 50%, #4f1b59 100%)'
                    }}
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
                      className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-[#a259c6]/60 via-[#f3e8ff]/40 to-[#4f1b59]/60 blur-2xl z-0"
                    />
                        {profile.image ? (
                          <img
                            src={profile.image}
                            alt="Profile"
                        className="w-full h-full object-cover rounded-xl border-4 border-white shadow-xl transition-all duration-300 group-hover:scale-105 group-hover:brightness-95 z-10"
                          />
                        ) : (
                      <div className="w-full h-full flex items-center justify-center rounded-xl bg-gradient-to-br from-[#a259c6] to-[#4f1b59] z-10">
                        <User className="w-24 h-24 text-white opacity-80" />
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
                      <div className="absolute inset-0 bg-[#a259c6]/30 rounded-xl flex items-center justify-center text-[#4f1b59] text-lg font-semibold pointer-events-none z-20">
                        Drop image here
                      </div>
                    )}
                  </div>
                  
                  {/* Camera button */}
                  <motion.button
                    type="button"
                    className="mt-6 bg-gradient-to-tr from-[#a259c6] to-[#4f1b59] p-4 rounded-2xl shadow-xl hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#a259c6]/40"
                    onClick={handleImageClick}
                    aria-label="Upload profile photo"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Camera className="w-7 h-7 text-white" />
                  </motion.button>
                </div>

                {/* Profile Info Section */}
                <div className="flex-1 text-center lg:text-left">
                  <motion.div 
                    className="mb-6"
                    initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <div className="inline-block px-8 py-4 rounded-2xl bg-gradient-to-r from-[#a259c6]/90 to-[#4f1b59]/90 shadow-2xl backdrop-blur-md mb-4">
                      <span className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg tracking-tight">
                        {profile.name || 'Your Name'}
                      </span>
                    </div>
                    <div className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-[#a259c6]/70 to-[#4f1b59]/70 shadow-lg text-xl md:text-2xl text-white/95 font-medium">
                      {profile.email || 'Email'}
                    </div>
                  </motion.div>

                                    {/* Minimal Role Badge */}
                  <motion.div 
                    className="mt-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <motion.div
                      className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg shadow-sm"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <Award className="w-4 h-4" />
                      <span className="font-medium text-sm">
                        {profile.member_type ? profile.member_type.replace('_', ' ').toUpperCase() : 'MEMBER'}
                      </span>
                    </motion.div>
                  </motion.div>
                        </div>
                        </div>
                      </motion.div>

            {/* Form Fields Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Personal Information Card */}
                    <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8"
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <motion.h3 
                  className="text-2xl font-bold text-[#4f1b59] mb-6 flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <User className="w-6 h-6 text-[#a259c6]" />
                    </motion.div>
                  Personal Information
                </motion.h3>

                <div className="space-y-6">
                  {/* Name */}
                <motion.div
                    className="relative group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 0.3, delay: 0.5 }}
                    >
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a259c6] w-6 h-6 group-focus-within:text-[#4f1b59] transition-colors" />
                    </motion.div>
                        <Input
                          name="name"
                          value={profile.name || ''}
                          onChange={handleChange}
                          required
                      placeholder="Full Name" 
                      className="h-14 text-lg pl-12 rounded-xl bg-white/90 shadow-lg border-2 border-transparent focus:border-[#a259c6] focus:ring-4 focus:ring-[#a259c6]/20 transition-all duration-300 hover:shadow-xl" 
                    />
                  </motion.div>
                  
                  {/* Email */}
                  <motion.div 
                    className="relative group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 0.3, delay: 0.6 }}
                    >
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a259c6] w-6 h-6 group-focus-within:text-[#4f1b59] transition-colors" />
                    </motion.div>
                        <Input
                          name="email"
                          value={profile.email || ''}
                          onChange={handleChange}
                      required 
                          type="email"
                          placeholder="Email"
                      className="h-14 text-lg pl-12 rounded-xl bg-white/90 shadow-lg border-2 border-transparent focus:border-[#a259c6] focus:ring-4 focus:ring-[#a259c6]/20 transition-all duration-300 hover:shadow-xl" 
                    />
                  </motion.div>
                  
                  {/* Bio */}
                  <motion.div 
                    className="relative group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    whileHover={{ scale: 1.02 }}
                  >
                      <Textarea
                        name="bio"
                        value={profile.bio || ''}
                        onChange={handleChange}
                      rows={4} 
                        placeholder="Tell us about yourself..."
                      className="text-lg px-5 py-4 min-h-[120px] rounded-xl bg-white/90 shadow-lg border-2 border-transparent focus:border-[#a259c6] focus:ring-4 focus:ring-[#a259c6]/20 transition-all duration-300 hover:shadow-xl" 
                      />
                  </motion.div>
                    </div>
              </motion.div>

              {/* Role & Position Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8"
              >
                <h3 className="text-2xl font-bold text-[#4f1b59] mb-6 flex items-center gap-3">
                  <Briefcase className="w-6 h-6 text-[#a259c6]" />
                  Role & Position
                </h3>
                
                <div className="space-y-6">
                  {/* Role */}
                  <div className="relative group">
                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a259c6] w-6 h-6 group-focus-within:text-[#4f1b59] transition-colors" />
                        <Select value={profile.member_type || ''} onValueChange={handleRoleChange}>
                      <SelectTrigger className="h-14 text-lg pl-12 rounded-xl bg-white/90 shadow-lg border-2 border-transparent focus:border-[#a259c6] focus:ring-4 focus:ring-[#a259c6]/20 transition-all duration-300">
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            {ROLE_OPTIONS.map(opt => (
                              <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                  
                  {/* Department */}
                      {showDept && profile.member_type !== 'mentor' && (
                    <div className="relative group">
                      <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a259c6] w-6 h-6 group-focus-within:text-[#4f1b59] transition-colors" />
                          <Select value={profile.department || ''} onValueChange={v => handleSelect('department', v)}>
                        <SelectTrigger className="h-14 text-lg pl-12 rounded-xl bg-white/90 shadow-lg border-2 border-transparent focus:border-[#a259c6] focus:ring-4 focus:ring-[#a259c6]/20 transition-all duration-300">
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
                  
                  {/* Position */}
                  <div className="relative group">
                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a259c6] w-6 h-6 group-focus-within:text-[#4f1b59] transition-colors" />
                        <Select value={profile.position_hierarchy || ''} onValueChange={v => handleSelect('position_hierarchy', v)}>
                      <SelectTrigger className="h-14 text-lg pl-12 rounded-xl bg-white/90 shadow-lg border-2 border-transparent focus:border-[#a259c6] focus:ring-4 focus:ring-[#a259c6]/20 transition-all duration-300">
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
              </motion.div>
                  </div>

            {/* Social Media Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8"
            >
              <h3 className="text-2xl font-bold text-[#4f1b59] mb-6 flex items-center gap-3">
                <Linkedin className="w-6 h-6 text-[#a259c6]" />
                Social Media Links
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="relative group">
                  <Linkedin className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a259c6] w-6 h-6 group-focus-within:text-[#4f1b59] transition-colors" />
                  <Input 
                    name="linkedin" 
                    value={profile.linkedin || ''} 
                    onChange={handleChange} 
                    placeholder="LinkedIn profile URL" 
                    className="h-14 text-lg pl-12 rounded-xl bg-white/90 shadow-lg border-2 border-transparent focus:border-[#a259c6] focus:ring-4 focus:ring-[#a259c6]/20 transition-all duration-300" 
                  />
                      </div>
                <div className="relative group">
                  <Instagram className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a259c6] w-6 h-6 group-focus-within:text-[#4f1b59] transition-colors" />
                  <Input 
                    name="Instagram" 
                    value={profile.Instagram || ''} 
                    onChange={handleChange} 
                    placeholder="Instagram profile URL" 
                    className="h-14 text-lg pl-12 rounded-xl bg-white/90 shadow-lg border-2 border-transparent focus:border-[#a259c6] focus:ring-4 focus:ring-[#a259c6]/20 transition-all duration-300" 
                  />
                    </div>
                <div className="relative group">
                  <Github className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a259c6] w-6 h-6 group-focus-within:text-[#4f1b59] transition-colors" />
                  <Input 
                    name="github" 
                    value={profile.github || ''} 
                    onChange={handleChange} 
                    placeholder="GitHub profile URL" 
                    className="h-14 text-lg pl-12 rounded-xl bg-white/90 shadow-lg border-2 border-transparent focus:border-[#a259c6] focus:ring-4 focus:ring-[#a259c6]/20 transition-all duration-300" 
                  />
                </div>
              </div>
                          </motion.div>

              {/* Academic Details Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8"
              >
                <h3 className="text-2xl font-bold text-[#4f1b59] mb-6 flex items-center gap-3">
                  <Sparkles className="w-6 h-6 text-[#a259c6]" />
                  Academic Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Course */}
                  <div className="relative group">
                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a259c6] w-6 h-6 group-focus-within:text-[#4f1b59] transition-colors" />
                        <Select value={profile.course || ''} onValueChange={val => handleSelect('course', val)}>
                      <SelectTrigger className="h-14 text-lg pl-12 rounded-xl bg-white/90 shadow-lg border-2 border-transparent focus:border-[#a259c6] focus:ring-4 focus:ring-[#a259c6]/20 transition-all duration-300">
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
                  <div className="relative group">
                    <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a259c6] w-6 h-6 group-focus-within:text-[#4f1b59] transition-colors" />
                        <Select value={profile.year || ''} onValueChange={val => handleSelect('year', val)}>
                      <SelectTrigger className="h-14 text-lg pl-12 rounded-xl bg-white/90 shadow-lg border-2 border-transparent focus:border-[#a259c6] focus:ring-4 focus:ring-[#a259c6]/20 transition-all duration-300">
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
                  <div className="relative group">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a259c6] w-6 h-6 group-focus-within:text-[#4f1b59] transition-colors" />
                        <Select value={profile.stream || ''} onValueChange={val => handleSelect('stream', val)}>
                      <SelectTrigger className="h-14 text-lg pl-12 rounded-xl bg-white/90 shadow-lg border-2 border-transparent focus:border-[#a259c6] focus:ring-4 focus:ring-[#a259c6]/20 transition-all duration-300">
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

                {/* Timetable Upload */}
                <div className="mt-6">
                  <Label htmlFor="timetable_image" className="flex items-center gap-2 text-[#4f1b59] font-semibold text-base mb-3">
                    <Camera className="w-5 h-5 text-[#a259c6]" /> Timetable Photo
                  </Label>
                  <div className="flex items-center gap-4">
                    <label htmlFor="timetable_image" className="cursor-pointer inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#a259c6] to-[#4f1b59] text-white rounded-xl shadow-lg hover:from-[#4f1b59] hover:to-[#a259c6] transition-all duration-300 font-semibold">
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
                      <span className="text-sm text-[#a259c6] font-medium">✓ Selected</span>
                    )}
                      </div>
                  {profile.timetable_image && (
                    <img src={profile.timetable_image} alt="Timetable" className="mt-4 rounded-xl shadow-lg max-w-xs max-h-60 border border-[#a259c6]/30" />
                  )}
                  </div>
                </motion.div>

              {/* Hobbies & Tags Card */}
                <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8"
              >
                <h3 className="text-2xl font-bold text-[#4f1b59] mb-6 flex items-center gap-3">
                  <Sparkles className="w-6 h-6 text-[#a259c6]" />
                  Hobbies & Skills
                </h3>
                
                  {/* Hobbies Section */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="font-semibold text-[#a259c6] text-lg">Select up to 10 hobbies:</div>
                        <button
                          type="button"
                      className="p-2 rounded-full border border-[#a259c6] bg-white/80 shadow hover:bg-[#a259c6]/10 hover:scale-110 transition-all"
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
                        className="flex flex-wrap gap-3 mb-4"
                          >
                            {HOBBY_OPTIONS.map(hobby => (
                              <motion.span
                                key={hobby}
                                                         className={`px-3 py-1 rounded-lg text-sm font-medium cursor-pointer transition-colors ${selectedHobbies.includes(hobby) ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                             whileHover={{ scale: 1.02 }}
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
                          className="px-4 py-2 rounded-xl border text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-[#a259c6]/40 transition-all duration-300 bg-white/80 border-gray-300 text-[#a259c6] hover:bg-[#a259c6]/10 hover:scale-105 flex items-center gap-2"
                          onClick={() => setAddingCustomHobby(true)}
                          aria-label="Add custom hobby"
                        >
                          <Plus className="w-4 h-4" />
                          Add Custom
                        </button>
                        
                        {addingCustomHobby && (
                          <div className="flex gap-3 mt-4 w-full">
                            <Input 
                              value={customHobby} 
                              onChange={e => setCustomHobby(e.target.value)} 
                              placeholder="Custom hobby" 
                              className="h-10 text-sm flex-1" 
                              autoFocus 
                            />
                            <Button 
                              type="button" 
                              size="sm" 
                              onClick={() => {
                                if (customHobby.trim() && !selectedHobbies.includes(customHobby.trim()) && selectedHobbies.length < 10) {
                                  setSelectedHobbies(prev => [...prev, customHobby.trim()]);
                                  setCustomHobby('');
                                  setAddingCustomHobby(false);
                                }
                              }}
                              className="bg-[#a259c6] hover:bg-[#4f1b59]"
                            >
                              Add
                            </Button>
                            <Button 
                              type="button" 
                              size="sm" 
                              variant="ghost" 
                              onClick={() => { setCustomHobby(''); setAddingCustomHobby(false); }}
                            >
                              Cancel
                            </Button>
                          </div>
                        )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                  
                  <div className="text-sm text-gray-500 mb-6">
                    {selectedHobbies.length} / 10 selected • Won't be visible to others
                      </div>
                    </div>

                {/* Tags Section */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="font-semibold text-[#a259c6] text-lg">Select up to 10 skills:</div>
                        <button
                          type="button"
                      className="p-2 rounded-full border border-[#a259c6] bg-white/80 shadow hover:bg-[#a259c6]/10 hover:scale-110 transition-all"
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
                        className="flex flex-wrap gap-3"
                          >
                            {TAG_OPTIONS.map(tag => (
                              <motion.span
                                key={tag}
                                                         className={`px-3 py-1 rounded-lg text-sm font-medium cursor-pointer transition-colors ${selectedTags.includes(tag) ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                             whileHover={{ scale: 1.02 }}
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
                          className="px-4 py-2 rounded-xl border text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-[#a259c6]/40 transition-all duration-300 bg-white/80 border-gray-300 text-[#a259c6] hover:bg-[#a259c6]/10 hover:scale-105 flex items-center gap-2"
                          onClick={() => setAddingCustomTag(true)}
                          aria-label="Add custom tag"
                        >
                          <Plus className="w-4 h-4" />
                          Add Custom
                        </button>
                        
                        {addingCustomTag && (
                          <div className="flex gap-3 mt-4 w-full">
                            <Input 
                              value={customTag} 
                              onChange={e => setCustomTag(e.target.value)} 
                              placeholder="Custom skill" 
                              className="h-10 text-sm flex-1" 
                              autoFocus 
                            />
                            <Button 
                              type="button" 
                              size="sm" 
                              onClick={() => {
                                if (customTag.trim() && !selectedTags.includes(customTag.trim()) && selectedTags.length < 10) {
                                  setSelectedTags(prev => [...prev, customTag.trim()]);
                                  setCustomTag('');
                                  setAddingCustomTag(false);
                                }
                              }}
                              className="bg-[#a259c6] hover:bg-[#4f1b59]"
                            >
                              Add
                            </Button>
                            <Button 
                              type="button" 
                              size="sm" 
                              variant="ghost" 
                              onClick={() => { setCustomTag(''); setAddingCustomTag(false); }}
                            >
                              Cancel
                            </Button>
                          </div>
                        )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                  
                  <div className="text-sm text-gray-500 mt-4">
                    {selectedTags.length} / 10 selected • Won't be visible to others
                    </div>
                  </div>
                </motion.div>

              {/* Save Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="flex justify-center"
              >
                <motion.button
                  type="submit"
                  className={`font-semibold bg-gradient-to-r from-[#a259c6] to-[#4f1b59] hover:from-[#4f1b59] hover:to-[#a259c6] text-white px-12 py-6 rounded-2xl shadow-2xl text-xl transition-all duration-300 hover:scale-105 active:scale-95 focus:ring-4 focus:ring-[#a259c6]/30
                    ${saveState === 'saving' ? 'bg-purple-400 text-white cursor-wait' : ''}
                    ${saveState === 'success' ? 'bg-green-500 text-white' : ''}
                    ${saveState === 'error' ? 'bg-red-500 text-white animate-shake' : ''}
                  `}
                  disabled={saveState === 'saving'}
                  whileTap={{ scale: 0.97 }}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {saveState === 'saving' && (
                      <motion.span key="saving" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" /> Saving...
                      </motion.span>
                    )}
                    {saveState === 'success' && (
                      <motion.span key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5" /> Saved Successfully!
                      </motion.span>
                    )}
                    {saveState === 'error' && (
                      <motion.span key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                        <XCircle className="w-5 h-5" /> Error Saving
                      </motion.span>
                    )}
                    {saveState === 'idle' && (
                      <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5" /> Save Profile
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </motion.div>
            </form>
        ) : (
            <motion.div
            className="min-h-screen w-full flex items-center justify-center py-8 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              className="w-full max-w-6xl bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 lg:p-12"
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              {/* Enhanced Hero Section */}
            <motion.div
                className="flex flex-col lg:flex-row items-center gap-8 mb-12"
                initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
              >
                {/* Profile Image with Enhanced Design */}
                  <motion.div
                  className="relative flex flex-col items-center"
                  initial={{ opacity: 0, scale: 0.6, rotate: -15 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0, transition: { type: 'spring', bounce: 0.45, duration: 1.1 } }}
                  whileHover={{
                    scale: 1.05,
                    y: -8,
                    transition: { duration: 0.3, type: 'spring', bounce: 0.4 }
                  }}
                >
                  <div className="relative">
                    {/* Enhanced gradient border */}
                    <div className="w-64 h-64 rounded-3xl bg-gradient-to-br from-[#a259c6] via-[#f3e8ff] to-[#4f1b59] p-1 shadow-2xl">
                      <div className="w-full h-full rounded-3xl overflow-hidden bg-white">
                        <img
                          src={profile.image || 'https://randomuser.me/api/portraits/men/32.jpg'}
                          alt={profile.name || 'Profile'}
                          className="w-full h-full object-cover"
                        />
                        </div>
                    </div>
                    
                    {/* Role badge */}
                    {profile.member_type && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                        className="absolute -bottom-2 -right-2 bg-gradient-to-r from-[#a259c6] to-[#4f1b59] text-white px-4 py-2 rounded-xl shadow-lg font-semibold text-sm"
                      >
                        {profile.member_type.replace('_', ' ').toUpperCase()}
                      </motion.div>
                      )}
                    </div>
                  </motion.div>

                {/* Profile Info Section */}
                <motion.div
                  className="flex-1 text-center lg:text-left"
                  initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                >
                  <motion.h1 
                    className="text-4xl lg:text-6xl font-extrabold text-[#2d1b3d] mb-4 tracking-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    >
                      {profile.name || 'Your Name'}
                  </motion.h1>
                  
                  <motion.div 
                    className="text-xl lg:text-2xl text-[#4b6aa7] font-medium mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    {profile.email || 'Email'}
                  </motion.div>

                                     {/* Minimal role badges */}
                   <motion.div 
                     className="flex flex-wrap gap-2 mb-6"
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.6, delay: 0.6 }}
                   >
                     <span className="bg-purple-600 text-white rounded-lg px-3 py-1 text-sm font-medium shadow-sm">
                       {ROLE_OPTIONS.find(r => r.value === profile.member_type)?.label || 'Member'}
                     </span>
                     {profile.member_type !== 'mentor' && profile.department && (
                       <span className="bg-blue-600 text-white rounded-lg px-3 py-1 text-sm font-medium shadow-sm">
                         {profile.department}
                       </span>
                     )}
                     {profile.position_hierarchy && (
                       <span className="bg-green-600 text-white rounded-lg px-3 py-1 text-sm font-medium shadow-sm">
                         {profile.position_hierarchy}
                       </span>
                     )}
                   </motion.div>

                  {/* Minimal Role Display */}
                  <motion.div 
                    className="mt-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                  >
                    <motion.div
                      className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg shadow-sm"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <Award className="w-4 h-4" />
                      <span className="font-medium text-sm">
                        {profile.member_type ? profile.member_type.replace('_', ' ').toUpperCase() : 'MEMBER'}
                      </span>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </motion.div>
              {/* Enhanced Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-8">
                                     {/* About Me Card */}
                   <motion.div
                     className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8"
                     initial={{ opacity: 0, y: 32, scale: 0.95 }}
                     animate={{ opacity: 1, y: 0, scale: 1 }}
                     transition={{ duration: 0.6, delay: 0.8, ease: 'easeOut' }}
                     whileHover={{ scale: 1.02, y: -5, boxShadow: '0 20px 60px 0 rgba(162,89,198,0.15)' }}
                   >
                     <motion.h3 
                       className="text-2xl font-bold text-[#4f1b59] mb-6 flex items-center gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                       transition={{ duration: 0.5, delay: 0.9 }}
                     >
                       <motion.div
                         animate={{ rotate: [0, 10, -10, 0] }}
                         transition={{ duration: 0.6, delay: 1.0 }}
                       >
                         <User className="w-6 h-6 text-[#a259c6]" />
                       </motion.div>
                       About Me
                     </motion.h3>
                     <motion.p 
                       className="text-lg text-gray-700 leading-relaxed"
                       initial={{ opacity: 0, y: 10 }}
                       animate={{ opacity: 1, y: 0 }}
                       transition={{ duration: 0.5, delay: 1.1 }}
                     >
                       {profile.bio || 'No bio provided.'}
                    </motion.p>
                   </motion.div>
                    
                  {/* Academic Info Card */}
                    <motion.div
                    className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8"
                    initial={{ opacity: 0, y: 32 }}
                      animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.9, ease: 'easeOut' }}
                    whileHover={{ scale: 1.02, boxShadow: '0 20px 60px 0 rgba(162,89,198,0.15)' }}
                  >
                    <h3 className="text-2xl font-bold text-[#4f1b59] mb-6 flex items-center gap-3">
                      <Sparkles className="w-6 h-6 text-[#a259c6]" />
                      Academic Information
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-3 border-b border-gray-100">
                        <span className="font-semibold text-gray-700">Course:</span>
                        <span className="text-[#4f1b59] font-medium">{profile.course || '-'}</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-gray-100">
                        <span className="font-semibold text-gray-700">Year:</span>
                        <span className="text-[#4f1b59] font-medium">
                          {profile.year ? (profile.year === '1' ? '1st' : profile.year === '2' ? '2nd' : profile.year === '3' ? '3rd' : profile.year + 'th') + ' Year' : '-'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-3">
                        <span className="font-semibold text-gray-700">Stream:</span>
                        <span className="text-[#4f1b59] font-medium">{profile.stream || '-'}</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Timetable Card */}
                  <motion.div
                    className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8"
                    initial={{ opacity: 0, y: 32 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.0, ease: 'easeOut' }}
                    whileHover={{ scale: 1.02, boxShadow: '0 20px 60px 0 rgba(162,89,198,0.15)' }}
                  >
                    <h3 className="text-2xl font-bold text-[#4f1b59] mb-6 flex items-center gap-3">
                      <Camera className="w-6 h-6 text-[#a259c6]" />
                      Timetable Snapshot
                    </h3>
                    <div className="flex justify-center">
                      {profile.timetable_image ? (
                        <img 
                          src={profile.timetable_image} 
                          alt="Timetable Snapshot" 
                          className="w-full max-w-xs rounded-2xl shadow-lg border border-[#a259c6]/30" 
                        />
                      ) : (
                        <div className="w-full max-w-xs h-48 flex items-center justify-center rounded-2xl border-2 border-dashed border-[#a259c6]/30 bg-gray-50 text-gray-400 font-medium">
                          No timetable uploaded yet
                        </div>
                      )}
                      </div>
                    </motion.div>
                  </div>

                {/* Right Column */}
                <div className="space-y-8">
                  {/* Contact Card */}
                  <motion.div
                    className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8"
                    initial={{ opacity: 0, y: 32 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8, ease: 'easeOut' }}
                    whileHover={{ scale: 1.02, boxShadow: '0 20px 60px 0 rgba(162,89,198,0.15)' }}
                  >
                    <h3 className="text-2xl font-bold text-[#4f1b59] mb-6 flex items-center gap-3">
                      <Linkedin className="w-6 h-6 text-[#a259c6]" />
                      Social Links
                    </h3>
                    <div className="space-y-4">
                                           {profile.linkedin && (
                         <motion.a
                           href={profile.linkedin}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="flex items-center gap-2 p-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm"
                           whileHover={{ scale: 1.02 }}
                           initial={{ opacity: 0, x: -20 }}
                           animate={{ opacity: 1, x: 0 }}
                           transition={{ duration: 0.5, delay: 0.9 }}
                         >
                           <Linkedin className="w-4 h-4" />
                           <span className="font-medium text-sm">LinkedIn</span>
                         </motion.a>
                       )}
                                           {profile.github && (
                         <motion.a
                           href={profile.github}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="flex items-center gap-2 p-3 rounded-lg bg-gray-700 text-white hover:bg-gray-800 transition-colors shadow-sm"
                           whileHover={{ scale: 1.02 }}
                           initial={{ opacity: 0, x: -20 }}
                           animate={{ opacity: 1, x: 0 }}
                           transition={{ duration: 0.5, delay: 1.0 }}
                         >
                           <Github className="w-4 h-4" />
                           <span className="font-medium text-sm">GitHub</span>
                         </motion.a>
                       )}
                                           {profile.Instagram && (
                         <motion.a
                           href={profile.Instagram}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="flex items-center gap-2 p-3 rounded-lg bg-pink-600 text-white hover:bg-pink-700 transition-colors shadow-sm"
                           whileHover={{ scale: 1.02 }}
                           initial={{ opacity: 0, x: -20 }}
                           animate={{ opacity: 1, x: 0 }}
                           transition={{ duration: 0.5, delay: 1.1 }}
                         >
                           <Instagram className="w-4 h-4" />
                           <span className="font-medium text-sm">Instagram</span>
                         </motion.a>
                       )}
                      {!profile.linkedin && !profile.github && !profile.Instagram && (
                        <div className="text-gray-400 text-center py-8">
                          No social links provided
                </div>
                      )}
              </div>
            </motion.div>

                  {/* Hobbies Card */}
            <motion.div
                    className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8"
                    initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.9, ease: 'easeOut' }}
                    whileHover={{ scale: 1.02, boxShadow: '0 20px 60px 0 rgba(162,89,198,0.15)' }}
                  >
                    <h3 className="text-2xl font-bold text-[#4f1b59] mb-6 flex items-center gap-3">
                      <Sparkles className="w-6 h-6 text-[#a259c6]" />
                      Hobbies & Interests
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {(profile.hobbies && profile.hobbies.length > 0 ? profile.hobbies : selectedHobbies).length > 0 ? (
                        (profile.hobbies && profile.hobbies.length > 0 ? profile.hobbies : selectedHobbies).map((hobby: string, i: number) => (
                          <motion.span
                            key={hobby}
                            className="px-3 py-1 rounded-lg text-sm font-medium bg-gray-100 text-gray-700"
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                          >
                            {hobby}
                          </motion.span>
                        ))
                      ) : (
                        <span className="text-gray-400">No hobbies listed</span>
                      )}
                </div>
              </motion.div>

                  {/* Skills Card */}
              <motion.div
                    className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8"
                    initial={{ opacity: 0, y: 32 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.0, ease: 'easeOut' }}
                    whileHover={{ scale: 1.02, boxShadow: '0 20px 60px 0 rgba(162,89,198,0.15)' }}
                  >
                    <h3 className="text-2xl font-bold text-[#4f1b59] mb-6 flex items-center gap-3">
                      <Sparkles className="w-6 h-6 text-[#a259c6]" />
                      Skills & Expertise
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {(profile.tags && profile.tags.length > 0 ? profile.tags : selectedTags).length > 0 ? (
                        (profile.tags && profile.tags.length > 0 ? profile.tags : selectedTags).map((tag: string, i: number) => (
                          <motion.span
                            key={tag}
                            className="px-3 py-1 rounded-lg text-sm font-medium bg-gray-100 text-gray-700"
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                          >
                            {tag}
                          </motion.span>
                        ))
                      ) : (
                        <span className="text-gray-400">No skills listed</span>
                      )}
                    </div>
                  </motion.div>
                  </div>
                </div>
              {/* Edit button for own profile */}
            {isOwnProfile && (
              <motion.div
                  className="flex justify-center mt-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.1, ease: 'easeOut' }}
              >
                                    <motion.button
                    type="button"
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg shadow-sm text-base font-medium transition-colors flex items-center gap-2"
                    onClick={() => setEditMode(true)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <User className="w-4 h-4" />
                    Edit Profile
                  </motion.button>
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