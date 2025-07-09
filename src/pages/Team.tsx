import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import { useTeam, useDepartments } from '@/hooks/useApi';
import { Button } from '@/components/ui/button';
import { X, Filter, Github, Instagram, Linkedin, Users, Award, Building2, Crown, UserCheck, Search } from 'lucide-react';
import './team-glimmer.css';
import { Input } from '@/components/ui/input';

// Complete list of all departments from database
const DEPARTMENTS = [
  'Technicals',
  'Research', 
  'SMCW',
  'Digital Creatives',
  'Marketing',
  'Public Relations',
  'Logistics',
  'Inhouse Creatives',
  'Photography'
];

// Complete list of all positions from database
const POSITIONS = [
  'Chairperson',
  'Vice-chairperson',
  'Secretary',
  'Director',
  'Head',
  'Subhead',
  'Member'
];

// Member types for additional filtering
const MEMBER_TYPES = [
  'super_core',
  'core',
  'member'
];

const Team = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  const [selectedMemberType, setSelectedMemberType] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState('');

  const { data: teamMembers = [], loading, error } = useTeam() as { data: any[]; loading: boolean; error?: string };
  const { data: departments = [] } = useDepartments() as { data: string[] };

  // Filter team members based on selections and search term
  const filteredMembers = teamMembers?.filter(member => {
    const departmentMatch = !selectedDepartment || member.department === selectedDepartment;
    const positionMatch = !selectedPosition || member.position_hierarchy === selectedPosition;
    const memberTypeMatch = !selectedMemberType || member.member_type === selectedMemberType;
    const nameMatch = !searchTerm || member.name?.toLowerCase().includes(searchTerm.toLowerCase());
    return departmentMatch && positionMatch && memberTypeMatch && nameMatch;
  }) || [];

  // Group members by department for better organization
  const groupedMembers = filteredMembers.reduce((acc, member) => {
    const dept = member.department || 'Leadership';
    if (!acc[dept]) {
      acc[dept] = [];
    }
    acc[dept].push(member);
    return acc;
  }, {} as Record<string, any[]>);

  // Active filters for display
  const activeFilters = [
    selectedDepartment && { label: selectedDepartment, onRemove: () => setSelectedDepartment(null), type: 'department' },
    selectedPosition && { label: selectedPosition, onRemove: () => setSelectedPosition(null), type: 'position' },
    selectedMemberType && { label: selectedMemberType.replace('_', ' ').toUpperCase(), onRemove: () => setSelectedMemberType(null), type: 'member_type' },
  ].filter(Boolean);

  // Filter out selected filters from chips
  const availableDepartments = DEPARTMENTS.filter((dept: string) => dept !== selectedDepartment);
  const availablePositions = POSITIONS.filter(pos => pos !== selectedPosition);
  const availableMemberTypes = MEMBER_TYPES.filter(type => type !== selectedMemberType);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0
    },
    hover: {
      scale: 1.05,
      y: -8
    }
  };

  // Helper function to get filter icon
  const getFilterIcon = (type: string) => {
    switch (type) {
      case 'department':
        return <Building2 className="w-4 h-4" />;
      case 'position':
        return <Award className="w-4 h-4" />;
      case 'member_type':
        return <UserCheck className="w-4 h-4" />;
      default:
        return <Users className="w-4 h-4" />;
    }
  };

  // Helper function to get filter color
  const getFilterColor = (type: string) => {
    switch (type) {
      case 'department':
        return 'from-blue-500 to-blue-600';
      case 'position':
        return 'from-purple-500 to-purple-600';
      case 'member_type':
        return 'from-green-500 to-green-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden" style={{ background: 'linear-gradient(120deg, #f8f6ff 0%, #f3e8ff 40%, #e0c3fc 70%, #fff 100%)' }}>
      {/* Animated background elements */}
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
        {/* Faint radial fade at bottom for extra depth */}
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-white/80 via-white/0 to-transparent" />
      </div>

      <Header />
      
      <div className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          {/* Enhanced Section Heading */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.span 
              className="inline-block px-6 py-3 bg-gradient-to-r from-[#a259c6] to-[#4f1b59] text-white rounded-full text-sm font-semibold mb-6 shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Users className="inline-block w-4 h-4 mr-2" />
              Our Team
            </motion.span>
            <motion.h1 
              className="text-5xl md:text-6xl font-extrabold text-[#2d1b3d] mb-6 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Meet Our Committee
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Get to know the passionate individuals who make the IET Committee an amazing community. 
              Our diverse team brings together expertise, creativity, and dedication.
            </motion.p>
          </motion.div>

          {/* Enhanced Filter Bar */}
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="w-full rounded-3xl bg-white/80 backdrop-blur-xl flex flex-col md:flex-row flex-wrap items-center gap-3 px-6 py-4 shadow-2xl border border-white/20 transition-all duration-300">
              {/* Search input */}
              <div className="w-full sm:w-2/3 md:w-1/2 lg:w-[340px] xl:w-[400px] mb-2 md:mb-0 mx-auto">
                <motion.div
                  className="relative rounded-full p-[2.5px] bg-white/0 shadow-lg"
                  initial={false}
                  animate={searchTerm ? { scale: 1.04, boxShadow: '0 0 0 4px #a259c633, 0 8px 32px 0 rgba(162,89,198,0.12)' } : { scale: 1, boxShadow: '0 2px 16px 0 rgba(162,89,198,0.08)' }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative w-full h-12 flex items-center rounded-full bg-white/70 backdrop-blur-xl border-2 border-[#a259c6] focus-within:border-[#7f3fa7] transition-colors">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a259c6] opacity-80">
                      <Search className="w-5 h-5" />
                    </span>
                    <input
                      type="text"
                      aria-label="Search by name"
                      placeholder="Search by name..."
                      value={searchTerm}
                      onChange={e => setSearchTerm(e.target.value)}
                      className="h-12 w-full pl-12 pr-4 rounded-full bg-transparent text-[#4f1b59] placeholder:text-gray-400 focus:outline-none text-base font-medium"
                    />
                  </div>
                </motion.div>
              </div>
              {/* Mobile filter toggle */}
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-white/90 text-[#4f1b59] border border-purple-200 hover:bg-purple-50 transition-all md:hidden shadow-md"
                onClick={() => setShowFilters(v => !v)}
              >
                <Filter className="w-4 h-4" /> Filters
              </Button>
              
              {/* Filter chips */}
              <AnimatePresence>
              {(showFilters || typeof window !== 'undefined' && window.innerWidth >= 768) && (
                <>
                    {/* Department filters */}
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs font-semibold text-gray-600 mr-2 flex items-center">
                        <Building2 className="w-3 h-3 mr-1" />
                        Departments:
                      </span>
                  {availableDepartments.map((dept: string, i) => (
                        <motion.button
                      key={dept}
                          className="px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 flex items-center gap-1 border shadow-md bg-gradient-to-r from-white to-blue-50 text-[#4f1b59] border-blue-200 hover:from-blue-100 hover:to-blue-200 hover:scale-105 hover:shadow-lg focus:ring-2 focus:ring-blue-300"
                      onClick={() => setSelectedDepartment(dept)}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.3, delay: i * 0.05 }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                    >
                      {dept}
                        </motion.button>
                  ))}
                    </div>

                    {/* Position filters */}
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs font-semibold text-gray-600 mr-2 flex items-center">
                        <Award className="w-3 h-3 mr-1" />
                        Positions:
                      </span>
                  {availablePositions.map((pos, i) => (
                        <motion.button
                      key={pos}
                          className="px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 flex items-center gap-1 border shadow-md bg-gradient-to-r from-white to-purple-50 text-[#4f1b59] border-purple-200 hover:from-purple-100 hover:to-purple-200 hover:scale-105 hover:shadow-lg focus:ring-2 focus:ring-purple-300"
                      onClick={() => setSelectedPosition(pos)}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.3, delay: (availableDepartments.length + i) * 0.05 }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                    >
                      {pos}
                        </motion.button>
                  ))}
                    </div>

                    {/* Member type filters */}
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs font-semibold text-gray-600 mr-2 flex items-center">
                        <UserCheck className="w-3 h-3 mr-1" />
                        Member Type:
                      </span>
                      {availableMemberTypes.map((type, i) => (
                        <motion.button
                          key={type}
                          className="px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 flex items-center gap-1 border shadow-md bg-gradient-to-r from-white to-green-50 text-[#4f1b59] border-green-200 hover:from-green-100 hover:to-green-200 hover:scale-105 hover:shadow-lg focus:ring-2 focus:ring-green-300"
                          onClick={() => setSelectedMemberType(type)}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.3, delay: (availableDepartments.length + availablePositions.length + i) * 0.05 }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {type.replace('_', ' ').toUpperCase()}
                        </motion.button>
                      ))}
                    </div>
                </>
              )}
              </AnimatePresence>
              
              {/* Active filters */}
              <AnimatePresence>
                {activeFilters.map((f, i) => (
                  <motion.span
                  key={f.label}
                    className={`px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r ${getFilterColor(f.type)} text-white shadow-lg border border-white/20 flex items-center gap-2`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                >
                    {getFilterIcon(f.type)}
                  {f.label}
                    <button 
                      onClick={f.onRemove} 
                      className="ml-1 hover:bg-white/20 rounded-full p-1 transition-colors"
                    >
                    <X className="w-4 h-4" />
                  </button>
                  </motion.span>
              ))}
              </AnimatePresence>
              
              {/* Clear all button */}
              {activeFilters.length > 0 && (
                <motion.button
                  className="text-purple-600 hover:text-white hover:bg-[#4f1b59] px-4 py-2 rounded-full font-medium transition-all shadow-md"
                  onClick={() => {
                    setSelectedDepartment(null);
                    setSelectedPosition(null);
                    setSelectedMemberType(null);
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Clear all
                </motion.button>
              )}
            </div>
          </motion.div>

          {/* Team Members */}
          {loading ? (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {[...Array(6)].map((_, index) => (
                <motion.div key={index} className="animate-pulse" variants={itemVariants}>
                  <div className="bg-white/60 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
                    <div className="bg-gray-200 h-32 w-32 rounded-full mx-auto mb-6"></div>
                    <div className="h-6 bg-gray-200 rounded-full mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded-full mb-4 w-2/3 mx-auto"></div>
                    <div className="h-4 bg-gray-200 rounded-full mb-6 w-1/2 mx-auto"></div>
                    <div className="h-16 bg-gray-200 rounded-lg"></div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : error ? (
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="text-red-500 text-lg">Error loading team members: {error}</p>
            </motion.div>
          ) : filteredMembers.length === 0 ? (
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="text-gray-600 text-lg">No team members found with the selected filters.</p>
            </motion.div>
          ) : (
            <motion.div 
              className="space-y-20"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {Object.entries(groupedMembers).map(([department, members], i) => (
                <motion.div key={department} variants={itemVariants}>
                  <motion.h2 
                    className="text-3xl font-bold text-[#2d1b3d] mb-12 text-center tracking-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                  >
                    <span className="bg-gradient-to-r from-[#a259c6] to-[#4f1b59] bg-clip-text text-transparent">
                    {department}
                    </span>
                  </motion.h2>
                  <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={containerVariants}
                  >
                    {(members as any[]).map((member, j) => (
                      <div
                        key={member.id}
                        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 flex flex-col items-center transition-all duration-300 cursor-pointer overflow-hidden"
                        style={{
                          background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,246,255,0.8) 100%)',
                          boxShadow: '0 20px 40px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.2)'
                        }}
                      >
                        {/* Glimmer glass effect overlay removed */}
                        {/* Animated gradient border effect removed */}
                        <div className="relative mb-6">
                          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#a259c6] to-[#4f1b59] p-1 shadow-xl">
                            <img
                              src={member.image || '/placeholder.svg'}
                              alt={member.name}
                              className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg"
                              onError={(e) => {
                                e.currentTarget.src = '/placeholder.svg';
                              }}
                            />
                          </div>
                          <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-[#7c3aed] to-[#4f1b59] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                            {member.position_hierarchy}
                          </div>
                        </div>
                        <h3 className="text-xl font-bold text-[#2d1b3d] mb-2 text-center">{member.name}</h3>
                        <p className="text-sm text-purple-700 font-medium mb-3 text-center">{member.department}</p>
                        {(member.course || member.year || member.stream) && (
                          <div className="mb-2 text-xs text-gray-600 text-center">
                            {member.course && <span className="font-semibold">{member.course}</span>}
                            {member.year && <span> &middot; {member.year}{member.year === "1" ? 'st' : member.year === "2" ? 'nd' : member.year === "3" ? 'rd' : 'th'} year</span>}
                            {member.stream && <span> &middot; {member.stream}</span>}
                          </div>
                        )}
                        <div className="mb-4">
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                            member.member_type === 'super_core' 
                              ? 'bg-gradient-to-r from-red-500 to-red-600 text-white' 
                              : member.member_type === 'core'
                              ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                              : 'bg-gradient-to-r from-gray-500 to-gray-600 text-white'
                          }`}>
                            {member.member_type?.replace('_', ' ').toUpperCase() || 'MEMBER'}
                          </span>
                        </div>
                        {member.bio && (
                          <p className="text-sm text-gray-700 text-center mb-6 line-clamp-3 leading-relaxed">
                            {member.bio}
                          </p>
                        )}
                        <div className="flex gap-4 mt-auto">
                          {member.linkedin && (
                            <a 
                              href={member.linkedin} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
                            >
                              <Linkedin className="w-5 h-5" />
                            </a>
                          )}
                          {member.github && (
                            <a 
                              href={member.github} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="p-3 rounded-full bg-gradient-to-r from-gray-700 to-gray-900 text-white shadow-lg"
                            >
                              <Github className="w-5 h-5" />
                            </a>
                          )}
                          {member.Instagram && (
                            <a 
                              href={member.Instagram} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="p-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg"
                            >
                              <Instagram className="w-5 h-5" />
                            </a>
                          )}
                        </div>
                        {/* Hover effect overlay removed */}
                      </div>
                    ))}
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Team;
