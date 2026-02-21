import Header from '@/components/Header';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Camera, User, Mail, Briefcase, Building2, Linkedin, Instagram, Github, Plus, Sparkles, CheckCircle, Loader2, XCircle, Award, Edit3, Save, Calendar, MapPin, Heart, Star, Zap, Globe, Phone, BookOpen, GraduationCap, Clock, Users, Target, Palette, Code, Music, Coffee, Mountain, Gamepad2 } from 'lucide-react';
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
    <div className="min-h-screen relative overflow-x-hidden" style={{ background: 'linear-gradient(135deg, #f8f6ff 0%, #f3e8ff 25%, #e0c3fc 50%, #d4b5f7 75%, #fff 100%)' }}>
      {/* Enhanced Warning Messages */}
      <AnimatePresence>
        {localStorageWarning && (
          <motion.div 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-0 left-0 w-full bg-gradient-to-r from-red-500 to-red-600 text-white text-center py-4 z-50 font-semibold shadow-2xl backdrop-blur-lg"
          >
            <div className="flex items-center justify-center gap-2">
              <XCircle className="w-5 h-5" />
              {localStorageWarning}
            </div>
          </motion.div>
        )}
        {profileWarning && !localStorageWarning && (
          <motion.div 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-0 left-0 w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-center py-4 z-40 font-semibold shadow-2xl backdrop-blur-lg"
          >
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5" />
              {profileWarning}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Revolutionary Animated Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Primary gradient orbs with enhanced animations */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
          animate={{ 
            opacity: [0.08, 0.15, 0.08], 
            scale: [0.8, 1.2, 0.8], 
            rotate: [0, 180, 360],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "easeInOut",
            times: [0, 0.5, 1]
          }}
          className="absolute top-[-15%] left-[-15%] w-[70vw] h-[70vw] rounded-full bg-gradient-to-br from-[#a259c6] via-[#f3e8ff] to-[#4f1b59] blur-3xl"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
          animate={{ 
            opacity: [0.06, 0.12, 0.06], 
            scale: [0.9, 1.1, 0.9], 
            rotate: [360, 180, 0],
            x: [0, -40, 0],
            y: [0, 20, 0]
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 2,
            times: [0, 0.5, 1]
          }}
          className="absolute bottom-[-15%] right-[-15%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-br from-[#4f1b59] via-[#e0c3fc] to-[#a259c6] blur-3xl"
        />

        {/* Secondary ambient orbs */}
        <motion.div
          animate={{ 
            opacity: [0.04, 0.08, 0.04],
            scale: [0.8, 1.3, 0.8],
            rotate: [0, 90, 180],
            x: [0, 30, 0],
            y: [0, -20, 0]
          }}
          transition={{ 
            duration: 18, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute top-[25%] left-[-20%] w-[45vw] h-[45vw] rounded-full bg-gradient-to-br from-[#f9e7ff] via-[#ffe6fa] to-[#e0c3fc] blur-3xl"
        />
        
        <motion.div
          animate={{ 
            opacity: [0.03, 0.07, 0.03],
            scale: [0.7, 1.2, 0.7],
            rotate: [180, 270, 360],
            x: [0, -25, 0],
            y: [0, 15, 0]
          }}
          transition={{ 
            duration: 22, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 3
          }}
          className="absolute bottom-[15%] right-[-25%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-br from-[#fff] via-[#e0c3fc] to-[#d4b5f7] blur-3xl"
        />

        {/* Enhanced floating particles with varied sizes and movements */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute rounded-full ${
                i % 3 === 0 ? 'w-3 h-3 bg-white/20' : 
                i % 3 === 1 ? 'w-2 h-2 bg-[#a259c6]/30' : 
                'w-1 h-1 bg-[#4f1b59]/40'
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -40 - Math.random() * 20, 0],
                x: [0, (Math.random() - 0.5) * 30, 0],
                opacity: [0.2, 0.8, 0.2],
                scale: [0.8, 1.4, 0.8],
                rotate: [0, 360],
              }}
              transition={{
                duration: 4 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Sophisticated geometric patterns */}
        <div className="absolute inset-0 opacity-8">
          <motion.div
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.1, 1],
              opacity: [0.05, 0.1, 0.05]
            }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className="absolute top-1/4 left-1/4 w-40 h-40 border-2 border-[#a259c6]/30 rounded-full"
          />
          <motion.div 
            animate={{ 
              rotate: [360, 0],
              scale: [0.9, 1.2, 0.9],
              opacity: [0.04, 0.08, 0.04]
            }}
            transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
            className="absolute bottom-1/3 right-1/3 w-32 h-32 border-2 border-[#4f1b59]/25 rounded-full"
          />
          <motion.div 
            animate={{ 
              rotate: [0, 180, 360],
              scale: [1, 1.3, 1],
              opacity: [0.03, 0.07, 0.03]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            className="absolute top-1/2 right-1/4 w-24 h-24 border border-[#a259c6]/20 rounded-full"
          />
          
          {/* Additional decorative elements */}
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [0.8, 1.1, 0.8],
              opacity: [0.02, 0.06, 0.02]
            }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            className="absolute top-3/4 left-1/6 w-28 h-28 border border-[#e0c3fc]/30 rounded-full"
          />
        </div>
                
        {/* Enhanced gradient overlay */}
        <div className="absolute bottom-0 left-0 w-full h-60 bg-gradient-to-t from-white/90 via-white/30 to-transparent" />
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-white/20 via-transparent to-transparent" />
      </div>
      
      <Header />
      <main className="relative z-10 max-w-7xl mx-auto py-12 px-4 w-full">
        {editMode ? (
          <form onSubmit={handleSave} className="space-y-8 w-full">
            {/* Revolutionary Profile Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative overflow-hidden"
            >
              {/* Hero Background with Animated Gradients */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#a259c6]/20 via-[#f3e8ff]/10 to-[#4f1b59]/20 rounded-[2.5rem]" />
              <motion.div
                animate={{
                  background: [
                    'linear-gradient(45deg, rgba(162,89,198,0.1) 0%, rgba(243,232,255,0.05) 50%, rgba(79,27,89,0.1) 100%)',
                    'linear-gradient(135deg, rgba(79,27,89,0.1) 0%, rgba(224,195,252,0.05) 50%, rgba(162,89,198,0.1) 100%)',
                    'linear-gradient(225deg, rgba(162,89,198,0.1) 0%, rgba(243,232,255,0.05) 50%, rgba(79,27,89,0.1) 100%)'
                  ]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-[2.5rem]"
              />
              
              <div className="relative bg-white/70 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-white/30 p-8 lg:p-12">
                <div className="flex flex-col xl:flex-row items-center gap-12">
                  
                  {/* Enhanced Profile Image Section */}
                  <motion.div 
                    className="flex flex-col items-center"
                    initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <div className="relative group">
                      {/* Animated Ring Effects */}
                      <motion.div
                        animate={{ rotate: 360, scale: [1, 1.05, 1] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute -inset-4 rounded-full bg-gradient-to-r from-[#a259c6] via-[#e0c3fc] to-[#4f1b59] opacity-20 blur-lg"
                      />
                      <motion.div
                        animate={{ rotate: -360, scale: [1.02, 0.98, 1.02] }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        className="absolute -inset-2 rounded-full bg-gradient-to-r from-[#4f1b59] via-[#a259c6] to-[#e0c3fc] opacity-30 blur-md"
                      />
                      
                      {/* Main Profile Container */}
                      <motion.div
                        className={`relative w-72 h-72 rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 ${dragActive ? 'scale-105 shadow-2xl' : 'hover:scale-105'}`}
                        onClick={handleImageClick}
                        onDragEnter={handleDrag}
                        onDragOver={handleDrag}
                        onDragLeave={handleDrag}
                        onDrop={handleDrop}
                        whileHover={{ y: -8, rotateY: 5 }}
                        whileTap={{ scale: 0.98 }}
                        style={{
                          background: 'linear-gradient(135deg, #a259c6 0%, #f3e8ff 30%, #e0c3fc 70%, #4f1b59 100%)',
                          boxShadow: '0 25px 50px -12px rgba(162,89,198,0.4), 0 0 0 1px rgba(255,255,255,0.1)'
                        }}
                      >
                        {/* Shimmer Effect */}
                        <motion.div
                          animate={{ x: [-100, 400] }}
                          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full"
                        />
                        
                        {profile.image ? (
                          <motion.img
                            src={profile.image}
                            alt="Profile"
                            className="w-full h-full object-cover"
                            initial={{ scale: 1.1, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.6 }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <motion.div
                              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                              transition={{ duration: 4, repeat: Infinity }}
                            >
                              <User className="w-32 h-32 text-white/80" />
                            </motion.div>
                          </div>
                        )}
                        
                        {/* Drag Overlay */}
                        <AnimatePresence>
                          {dragActive && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="absolute inset-0 bg-[#a259c6]/40 backdrop-blur-sm flex items-center justify-center"
                            >
                              <motion.div
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 1, repeat: Infinity }}
                                className="text-white text-xl font-bold flex items-center gap-2"
                              >
                                <Sparkles className="w-6 h-6" />
                                Drop image here
                              </motion.div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                      
                      {/* Enhanced Camera Button */}
                      <motion.button
                        type="button"
                        className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-br from-[#a259c6] to-[#4f1b59] rounded-2xl shadow-2xl flex items-center justify-center group"
                        onClick={handleImageClick}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                      >
                        <Camera className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
                        <motion.div
                          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute inset-0 bg-white/20 rounded-2xl"
                        />
                      </motion.button>
                      
                      <input
                        ref={fileInputRef}
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleChange}
                        className="hidden"
                      />
                    </div>
                  </motion.div>

                  {/* Enhanced Profile Info Section */}
                  <div className="flex-1 text-center xl:text-left space-y-8">
                    {/* Name and Title */}
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className="space-y-4"
                    >
                      <motion.div
                        className="relative inline-block"
                        whileHover={{ scale: 1.02 }}
                      >
                        <motion.div
                          animate={{
                            background: [
                              'linear-gradient(45deg, #a259c6, #4f1b59)',
                              'linear-gradient(135deg, #4f1b59, #a259c6)',
                              'linear-gradient(225deg, #a259c6, #4f1b59)'
                            ]
                          }}
                          transition={{ duration: 6, repeat: Infinity }}
                          className="absolute inset-0 rounded-3xl blur-lg opacity-30"
                        />
                        <div className="relative px-8 py-6 bg-gradient-to-r from-[#a259c6] to-[#4f1b59] rounded-3xl shadow-2xl">
                          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white tracking-tight">
                            {profile.name || 'Your Name'}
                          </h1>
                        </div>
                      </motion.div>
                      
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="flex flex-wrap items-center justify-center xl:justify-start gap-4"
                      >
                        <div className="px-6 py-3 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/30">
                          <div className="flex items-center gap-2 text-[#4f1b59]">
                            <Mail className="w-5 h-5" />
                            <span className="font-medium">{profile.email || 'Email'}</span>
                          </div>
                        </div>
                        
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="px-6 py-3 bg-gradient-to-r from-[#a259c6]/20 to-[#4f1b59]/20 backdrop-blur-lg rounded-2xl border border-[#a259c6]/30"
                        >
                          <div className="flex items-center gap-2 text-[#4f1b59]">
                            <Award className="w-5 h-5" />
                            <span className="font-bold">
                              {profile.member_type ? profile.member_type.replace('_', ' ').toUpperCase() : 'MEMBER'}
                            </span>
                          </div>
                        </motion.div>
                      </motion.div>
                    </motion.div>

                    {/* Quick Stats */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      className="grid grid-cols-2 lg:grid-cols-4 gap-4"
                    >
                      {[
                        { icon: Building2, label: 'Department', value: profile.department || 'Not Set' },
                        { icon: Briefcase, label: 'Position', value: profile.position_hierarchy || 'Not Set' },
                        { icon: GraduationCap, label: 'Course', value: profile.course || 'Not Set' },
                        { icon: Calendar, label: 'Year', value: profile.year ? `${profile.year} Year` : 'Not Set' }
                      ].map((stat, index) => (
                        <motion.div
                          key={stat.label}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.9 + index * 0.1 }}
                          whileHover={{ scale: 1.05, y: -2 }}
                          className="p-4 bg-white/60 backdrop-blur-lg rounded-2xl border border-white/40 text-center group"
                        >
                          <stat.icon className="w-6 h-6 mx-auto mb-2 text-[#a259c6] group-hover:scale-110 transition-transform" />
                          <p className="text-xs text-gray-600 font-medium">{stat.label}</p>
                          <p className="text-sm font-bold text-[#4f1b59] truncate">{stat.value}</p>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Revolutionary Form Fields Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              
              {/* Personal Information Card - Enhanced */}
              <motion.div
                initial={{ opacity: 0, y: 40, rotateX: 15 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="xl:col-span-2 relative group"
              >
                {/* Animated Background */}
                <motion.div
                  animate={{
                    background: [
                      'linear-gradient(135deg, rgba(162,89,198,0.1) 0%, rgba(255,255,255,0.9) 100%)',
                      'linear-gradient(225deg, rgba(79,27,89,0.1) 0%, rgba(255,255,255,0.9) 100%)',
                      'linear-gradient(315deg, rgba(224,195,252,0.1) 0%, rgba(255,255,255,0.9) 100%)'
                    ]
                  }}
                  transition={{ duration: 8, repeat: Infinity }}
                  className="absolute inset-0 rounded-3xl"
                />
                
                <div className="relative bg-white/70 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/30 p-8 overflow-hidden">
                  {/* Decorative Elements */}
                  <motion.div
                    animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-[#a259c6]/20 to-[#4f1b59]/20 rounded-full blur-xl"
                  />
                  
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center gap-4 mb-8"
                  >
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      className="p-3 bg-gradient-to-br from-[#a259c6] to-[#4f1b59] rounded-2xl shadow-lg"
                    >
                      <User className="w-7 h-7 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#4f1b59]">Personal Information</h3>
                      <p className="text-gray-600">Tell us about yourself</p>
                    </div>
                  </motion.div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Name Field */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="relative group"
                    >
                      <Label className="text-sm font-semibold text-[#4f1b59] mb-2 block">Full Name</Label>
                      <div className="relative">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-gradient-to-br from-[#a259c6]/20 to-[#4f1b59]/20 rounded-lg"
                        >
                          <User className="w-5 h-5 text-[#a259c6]" />
                        </motion.div>
                        <Input
                          name="name"
                          value={profile.name || ''}
                          onChange={handleChange}
                          required
                          placeholder="Enter your full name"
                          className="h-14 text-lg pl-16 pr-4 rounded-2xl bg-white/80 backdrop-blur-lg shadow-lg border-2 border-white/50 focus:border-[#a259c6] focus:ring-4 focus:ring-[#a259c6]/20 transition-all duration-300 hover:shadow-xl hover:bg-white/90"
                        />
                      </div>
                    </motion.div>

                    {/* Email Field */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="relative group"
                    >
                      <Label className="text-sm font-semibold text-[#4f1b59] mb-2 block">Email Address</Label>
                      <div className="relative">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-gradient-to-br from-[#a259c6]/20 to-[#4f1b59]/20 rounded-lg"
                        >
                          <Mail className="w-5 h-5 text-[#a259c6]" />
                        </motion.div>
                        <Input
                          name="email"
                          value={profile.email || ''}
                          onChange={handleChange}
                          required
                          type="email"
                          placeholder="your.email@example.com"
                          className="h-14 text-lg pl-16 pr-4 rounded-2xl bg-white/80 backdrop-blur-lg shadow-lg border-2 border-white/50 focus:border-[#a259c6] focus:ring-4 focus:ring-[#a259c6]/20 transition-all duration-300 hover:shadow-xl hover:bg-white/90"
                        />
                      </div>
                    </motion.div>

                    {/* Bio Field - Full Width */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="lg:col-span-2 relative group"
                    >
                      <Label className="text-sm font-semibold text-[#4f1b59] mb-2 block">Bio</Label>
                      <div className="relative">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="absolute left-4 top-4 p-2 bg-gradient-to-br from-[#a259c6]/20 to-[#4f1b59]/20 rounded-lg"
                        >
                          <Edit3 className="w-5 h-5 text-[#a259c6]" />
                        </motion.div>
                        <Textarea
                          name="bio"
                          value={profile.bio || ''}
                          onChange={handleChange}
                          rows={4}
                          placeholder="Tell us about yourself, your interests, and what makes you unique..."
                          className="text-lg pl-16 pr-4 py-4 min-h-[120px] rounded-2xl bg-white/80 backdrop-blur-lg shadow-lg border-2 border-white/50 focus:border-[#a259c6] focus:ring-4 focus:ring-[#a259c6]/20 transition-all duration-300 hover:shadow-xl hover:bg-white/90 resize-none"
                        />
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Role & Position Card - Enhanced */}
              <motion.div
                initial={{ opacity: 0, y: 40, rotateX: 15 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="relative group"
              >
                {/* Animated Background */}
                <motion.div
                  animate={{
                    background: [
                      'linear-gradient(45deg, rgba(79,27,89,0.1) 0%, rgba(255,255,255,0.9) 100%)',
                      'linear-gradient(135deg, rgba(162,89,198,0.1) 0%, rgba(255,255,255,0.9) 100%)',
                      'linear-gradient(225deg, rgba(224,195,252,0.1) 0%, rgba(255,255,255,0.9) 100%)'
                    ]
                  }}
                  transition={{ duration: 10, repeat: Infinity }}
                  className="absolute inset-0 rounded-3xl"
                />
                
                <div className="relative bg-white/70 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/30 p-8 h-full">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-center gap-4 mb-8"
                  >
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                      className="p-3 bg-gradient-to-br from-[#4f1b59] to-[#a259c6] rounded-2xl shadow-lg"
                    >
                      <Briefcase className="w-7 h-7 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#4f1b59]">Role & Position</h3>
                      <p className="text-gray-600">Your committee role</p>
                    </div>
                  </motion.div>

                  <div className="space-y-6">
                    {/* Member Type */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="relative group"
                    >
                      <Label className="text-sm font-semibold text-[#4f1b59] mb-2 block">Member Type</Label>
                      <div className="relative">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-gradient-to-br from-[#4f1b59]/20 to-[#a259c6]/20 rounded-lg z-10"
                        >
                          <Award className="w-5 h-5 text-[#4f1b59]" />
                        </motion.div>
                        <Select value={profile.member_type || ''} onValueChange={handleRoleChange}>
                          <SelectTrigger className="h-14 text-lg pl-16 pr-4 rounded-2xl bg-white/80 backdrop-blur-lg shadow-lg border-2 border-white/50 focus:border-[#4f1b59] focus:ring-4 focus:ring-[#4f1b59]/20 transition-all duration-300 hover:shadow-xl hover:bg-white/90">
                            <SelectValue placeholder="Select member type" />
                          </SelectTrigger>
                          <SelectContent className="bg-white/95 backdrop-blur-lg border border-white/50 rounded-xl shadow-2xl">
                            {ROLE_OPTIONS.map(role => (
                              <SelectItem key={role.value} value={role.value} className="hover:bg-[#a259c6]/10 focus:bg-[#a259c6]/10">
                                {role.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </motion.div>

                    {/* Position */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                      className="relative group"
                    >
                      <Label className="text-sm font-semibold text-[#4f1b59] mb-2 block">Position</Label>
                      <div className="relative">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-gradient-to-br from-[#4f1b59]/20 to-[#a259c6]/20 rounded-lg z-10"
                        >
                          <Star className="w-5 h-5 text-[#4f1b59]" />
                        </motion.div>
                        <Select value={profile.position_hierarchy || ''} onValueChange={(value) => handleSelect('position_hierarchy', value)}>
                          <SelectTrigger className="h-14 text-lg pl-16 pr-4 rounded-2xl bg-white/80 backdrop-blur-lg shadow-lg border-2 border-white/50 focus:border-[#4f1b59] focus:ring-4 focus:ring-[#4f1b59]/20 transition-all duration-300 hover:shadow-xl hover:bg-white/90">
                            <SelectValue placeholder="Select position" />
                          </SelectTrigger>
                          <SelectContent className="bg-white/95 backdrop-blur-lg border border-white/50 rounded-xl shadow-2xl">
                            {getFilteredPositions(profile.member_type || '').map(position => (
                              <SelectItem key={position} value={position} className="hover:bg-[#4f1b59]/10 focus:bg-[#4f1b59]/10">
                                {position}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </motion.div>

                    {/* Department - Conditional */}
                    <AnimatePresence>
                      {showDept && (
                        <motion.div
                          initial={{ opacity: 0, height: 0, y: -20 }}
                          animate={{ opacity: 1, height: 'auto', y: 0 }}
                          exit={{ opacity: 0, height: 0, y: -20 }}
                          transition={{ duration: 0.5 }}
                          className="relative group"
                        >
                          <Label className="text-sm font-semibold text-[#4f1b59] mb-2 block">Department</Label>
                          <div className="relative">
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-gradient-to-br from-[#4f1b59]/20 to-[#a259c6]/20 rounded-lg z-10"
                            >
                              <Building2 className="w-5 h-5 text-[#4f1b59]" />
                            </motion.div>
                            <Select value={profile.department || ''} onValueChange={(value) => handleSelect('department', value)}>
                              <SelectTrigger className="h-14 text-lg pl-16 pr-4 rounded-2xl bg-white/80 backdrop-blur-lg shadow-lg border-2 border-white/50 focus:border-[#4f1b59] focus:ring-4 focus:ring-[#4f1b59]/20 transition-all duration-300 hover:shadow-xl hover:bg-white/90">
                                <SelectValue placeholder="Select department" />
                              </SelectTrigger>
                              <SelectContent className="bg-white/95 backdrop-blur-lg border border-white/50 rounded-xl shadow-2xl">
                                {DEPARTMENT_OPTIONS.map(dept => (
                                  <SelectItem key={dept} value={dept} className="hover:bg-[#4f1b59]/10 focus:bg-[#4f1b59]/10">
                                    {dept}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>

            {/* Academic Information & Social Links - New Enhanced Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Academic Information Card */}
              <motion.div
                initial={{ opacity: 0, x: -50, rotateY: 15 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="relative group"
              >
                <motion.div
                  animate={{
                    background: [
                      'linear-gradient(135deg, rgba(162,89,198,0.08) 0%, rgba(255,255,255,0.9) 100%)',
                      'linear-gradient(225deg, rgba(79,27,89,0.08) 0%, rgba(255,255,255,0.9) 100%)',
                      'linear-gradient(315deg, rgba(224,195,252,0.08) 0%, rgba(255,255,255,0.9) 100%)'
                    ]
                  }}
                  transition={{ duration: 12, repeat: Infinity }}
                  className="absolute inset-0 rounded-3xl"
                />
                
                <div className="relative bg-white/70 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/30 p-8">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                    className="flex items-center gap-4 mb-8"
                  >
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                      className="p-3 bg-gradient-to-br from-[#a259c6] to-[#4f1b59] rounded-2xl shadow-lg"
                    >
                      <GraduationCap className="w-7 h-7 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#4f1b59]">Academic Information</h3>
                      <p className="text-gray-600">Your educational details</p>
                    </div>
                  </motion.div>

                  <div className="space-y-6">
                    {/* Course */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      className="relative group"
                    >
                      <Label className="text-sm font-semibold text-[#4f1b59] mb-2 block">Course</Label>
                      <div className="relative">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-gradient-to-br from-[#a259c6]/20 to-[#4f1b59]/20 rounded-lg z-10"
                        >
                          <BookOpen className="w-5 h-5 text-[#a259c6]" />
                        </motion.div>
                        <Select value={profile.course || ''} onValueChange={(value) => handleSelect('course', value)}>
                          <SelectTrigger className="h-14 text-lg pl-16 pr-4 rounded-2xl bg-white/80 backdrop-blur-lg shadow-lg border-2 border-white/50 focus:border-[#a259c6] focus:ring-4 focus:ring-[#a259c6]/20 transition-all duration-300 hover:shadow-xl hover:bg-white/90">
                            <SelectValue placeholder="Select course" />
                          </SelectTrigger>
                          <SelectContent className="bg-white/95 backdrop-blur-lg border border-white/50 rounded-xl shadow-2xl">
                            {COURSE_OPTIONS.map(course => (
                              <SelectItem key={course} value={course} className="hover:bg-[#a259c6]/10 focus:bg-[#a259c6]/10">
                                {course}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </motion.div>

                    {/* Year and Stream */}
                    <div className="grid grid-cols-2 gap-4">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                        className="relative group"
                      >
                        <Label className="text-sm font-semibold text-[#4f1b59] mb-2 block">Year</Label>
                        <div className="relative">
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-gradient-to-br from-[#a259c6]/20 to-[#4f1b59]/20 rounded-lg z-10"
                          >
                            <Calendar className="w-5 h-5 text-[#a259c6]" />
                          </motion.div>
                          <Select value={profile.year || ''} onValueChange={(value) => handleSelect('year', value)}>
                            <SelectTrigger className="h-14 text-lg pl-16 pr-4 rounded-2xl bg-white/80 backdrop-blur-lg shadow-lg border-2 border-white/50 focus:border-[#a259c6] focus:ring-4 focus:ring-[#a259c6]/20 transition-all duration-300 hover:shadow-xl hover:bg-white/90">
                              <SelectValue placeholder="Year" />
                            </SelectTrigger>
                            <SelectContent className="bg-white/95 backdrop-blur-lg border border-white/50 rounded-xl shadow-2xl">
                              {YEAR_OPTIONS.map(year => (
                                <SelectItem key={year} value={year} className="hover:bg-[#a259c6]/10 focus:bg-[#a259c6]/10">
                                  {year}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.0 }}
                        className="relative group"
                      >
                        <Label className="text-sm font-semibold text-[#4f1b59] mb-2 block">Stream</Label>
                        <div className="relative">
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-gradient-to-br from-[#a259c6]/20 to-[#4f1b59]/20 rounded-lg z-10"
                          >
                            <Target className="w-5 h-5 text-[#a259c6]" />
                          </motion.div>
                          <Select value={profile.stream || ''} onValueChange={(value) => handleSelect('stream', value)}>
                            <SelectTrigger className="h-14 text-lg pl-16 pr-4 rounded-2xl bg-white/80 backdrop-blur-lg shadow-lg border-2 border-white/50 focus:border-[#a259c6] focus:ring-4 focus:ring-[#a259c6]/20 transition-all duration-300 hover:shadow-xl hover:bg-white/90">
                              <SelectValue placeholder="Stream" />
                            </SelectTrigger>
                            <SelectContent className="bg-white/95 backdrop-blur-lg border border-white/50 rounded-xl shadow-2xl">
                              {STREAM_OPTIONS.map(stream => (
                                <SelectItem key={stream} value={stream} className="hover:bg-[#a259c6]/10 focus:bg-[#a259c6]/10">
                                  {stream}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Social Links Card */}
              <motion.div
                initial={{ opacity: 0, x: 50, rotateY: -15 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="relative group"
              >
                <motion.div
                  animate={{
                    background: [
                      'linear-gradient(45deg, rgba(79,27,89,0.08) 0%, rgba(255,255,255,0.9) 100%)',
                      'linear-gradient(135deg, rgba(162,89,198,0.08) 0%, rgba(255,255,255,0.9) 100%)',
                      'linear-gradient(225deg, rgba(224,195,252,0.08) 0%, rgba(255,255,255,0.9) 100%)'
                    ]
                  }}
                  transition={{ duration: 14, repeat: Infinity }}
                  className="absolute inset-0 rounded-3xl"
                />
                
                <div className="relative bg-white/70 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/30 p-8 h-full">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 }}
                    className="flex items-center gap-4 mb-8"
                  >
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                      className="p-3 bg-gradient-to-br from-[#4f1b59] to-[#a259c6] rounded-2xl shadow-lg"
                    >
                      <Globe className="w-7 h-7 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#4f1b59]">Social Links</h3>
                      <p className="text-gray-600">Connect with you online</p>
                    </div>
                  </motion.div>

                  <div className="space-y-6">
                    {/* LinkedIn */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.0 }}
                      className="relative group"
                    >
                      <Label className="text-sm font-semibold text-[#4f1b59] mb-2 block">LinkedIn</Label>
                      <div className="relative">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg"
                        >
                          <Linkedin className="w-5 h-5 text-blue-600" />
                        </motion.div>
                        <Input
                          name="linkedin"
                          value={profile.linkedin || ''}
                          onChange={handleChange}
                          placeholder="https://linkedin.com/in/username"
                          className="h-14 text-lg pl-16 pr-4 rounded-2xl bg-white/80 backdrop-blur-lg shadow-lg border-2 border-white/50 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 hover:shadow-xl hover:bg-white/90"
                        />
                      </div>
                    </motion.div>

                    {/* GitHub */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.1 }}
                      className="relative group"
                    >
                      <Label className="text-sm font-semibold text-[#4f1b59] mb-2 block">GitHub</Label>
                      <div className="relative">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-gradient-to-br from-gray-700/20 to-gray-900/20 rounded-lg"
                        >
                          <Github className="w-5 h-5 text-gray-800" />
                        </motion.div>
                        <Input
                          name="github"
                          value={profile.github || ''}
                          onChange={handleChange}
                          placeholder="https://github.com/username"
                          className="h-14 text-lg pl-16 pr-4 rounded-2xl bg-white/80 backdrop-blur-lg shadow-lg border-2 border-white/50 focus:border-gray-700 focus:ring-4 focus:ring-gray-700/20 transition-all duration-300 hover:shadow-xl hover:bg-white/90"
                        />
                      </div>
                    </motion.div>

                    {/* Instagram */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2 }}
                      className="relative group"
                    >
                      <Label className="text-sm font-semibold text-[#4f1b59] mb-2 block">Instagram</Label>
                      <div className="relative">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-gradient-to-br from-pink-500/20 to-purple-600/20 rounded-lg"
                        >
                          <Instagram className="w-5 h-5 text-pink-600" />
                        </motion.div>
                        <Input
                          name="Instagram"
                          value={profile.Instagram || ''}
                          onChange={handleChange}
                          placeholder="https://instagram.com/username"
                          className="h-14 text-lg pl-16 pr-4 rounded-2xl bg-white/80 backdrop-blur-lg shadow-lg border-2 border-white/50 focus:border-pink-500 focus:ring-4 focus:ring-pink-500/20 transition-all duration-300 hover:shadow-xl hover:bg-white/90"
                        />
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>

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