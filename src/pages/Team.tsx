import { useState } from 'react';
import Header from '../components/Header';
import TeamGrid from '../components/TeamGrid';
import { useTeam, useDepartments } from '@/hooks/useApi';
import { Button } from '@/components/ui/button';
import { X, Filter } from 'lucide-react';

const POSITIONS = [
  'Chairperson',
  'Vice-chairperson',
  'Secretary',
  'Director',
  'Head',
  'Subhead',
];

const Team = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const { data: teamMembers = [], loading, error } = useTeam() as { data: any[]; loading: boolean; error?: string };
  const { data: departments = [] } = useDepartments() as { data: string[] };

  // Filter team members based on selections
  const filteredMembers = teamMembers?.filter(member => {
    const departmentMatch = !selectedDepartment || member.department === selectedDepartment;
    const positionMatch = !selectedPosition || member.position_hierarchy === selectedPosition;
    return departmentMatch && positionMatch;
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
    selectedDepartment && { label: selectedDepartment, onRemove: () => setSelectedDepartment(null) },
    selectedPosition && { label: selectedPosition, onRemove: () => setSelectedPosition(null) },
  ].filter(Boolean);

  // Filter out selected filters from chips
  const availableDepartments = departments?.filter((dept: string) => dept !== selectedDepartment) || [];
  const availablePositions = POSITIONS.filter(pos => pos !== selectedPosition);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50">
      <Header />
      <div className="py-20">
        <div className="container mx-auto px-4">
          {/* Section Heading with animation */}
          <div className="text-center mb-16 animate-fade-in-up">
            <span className="inline-block px-4 py-2 bg-[#4f1b59] text-white rounded-full text-sm font-medium mb-4 shadow-md animate-fade-in">
              Our Team
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#333333] mb-6 tracking-tight animate-fade-in-up">
              Meet Our Committee
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-fade-in-up delay-100">
              Get to know the passionate individuals who make the IET Committee an amazing community. 
              Our diverse team brings together expertise, creativity, and dedication.
            </p>
          </div>

          {/* Seamless Horizontal Filter Bar */}
          <div className="mb-10">
            <div className="w-full rounded-2xl bg-white/70 backdrop-blur-md flex flex-row flex-wrap items-center gap-x-2 gap-y-2 px-4 py-3 shadow-lg border border-gray-100 transition-all duration-300">
              {/* Mobile filter icon */}
              <Button
                variant="outline"
                size="sm"
                className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium bg-white text-[#4f1b59] border border-purple-200 hover:bg-purple-50 transition-all md:hidden`}
                onClick={() => setShowFilters(v => !v)}
              >
                <Filter className="w-4 h-4 mr-1" /> Filters
              </Button>
              {/* Filter chips: always visible on desktop, togglable on mobile */}
              {(showFilters || typeof window !== 'undefined' && window.innerWidth >= 768) && (
                <>
                  {/* Department filter chips */}
                  {availableDepartments.map((dept: string, i) => (
                    <button
                      key={dept}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-1 border shadow-sm
                        bg-gray-100 text-[#4f1b59] border-gray-200 hover:bg-purple-50 hover:border-purple-300 hover:scale-105 focus:scale-105 focus:ring-2 focus:ring-purple-300 animate-fade-in-up`}
                      style={{ animationDelay: `${i * 40}ms` }}
                      onClick={() => setSelectedDepartment(dept)}
                    >
                      {dept}
                    </button>
                  ))}
                  {/* Position filter chips */}
                  {availablePositions.map((pos, i) => (
                    <button
                      key={pos}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-1 border shadow-sm
                        bg-gray-100 text-[#4f1b59] border-gray-200 hover:bg-purple-50 hover:border-purple-300 hover:scale-105 focus:scale-105 focus:ring-2 focus:ring-purple-300 animate-fade-in-up`}
                      style={{ animationDelay: `${(availableDepartments.length + i) * 40}ms` }}
                      onClick={() => setSelectedPosition(pos)}
                    >
                      {pos}
                    </button>
                  ))}
                </>
              )}
              {/* Active filter chips and Clear all */}
              {activeFilters.length > 0 && activeFilters.map((f, i) => (
                <span
                  key={f.label}
                  className="px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-br from-[#7c3aed] to-[#4f1b59] text-white shadow-md border border-purple-300 flex items-center gap-1 animate-fade-in-up"
                  style={{ animationDelay: `${(availableDepartments.length + availablePositions.length + i) * 40}ms` }}
                >
                  {f.label}
                  <button onClick={f.onRemove} className="ml-1 hover:bg-white/20 rounded-full p-0.5 transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </span>
              ))}
              {activeFilters.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-purple-600 hover:text-white hover:bg-[#4f1b59] px-3 py-1 rounded-full font-medium transition-all animate-fade-in-up"
                  style={{ animationDelay: `${(availableDepartments.length + availablePositions.length + activeFilters.length) * 40}ms` }}
                  onClick={() => {
                    setSelectedDepartment(null);
                    setSelectedPosition(null);
                  }}
                >
                  Clear all
                </Button>
              )}
            </div>
          </div>

          {/* Team Members */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-gray-200 h-64 rounded-t-lg"></div>
                  <div className="bg-white p-6 rounded-b-lg">
                    <div className="h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="h-16 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-8 animate-fade-in">
              <p className="text-red-500">Error loading team members: {error}</p>
            </div>
          ) : filteredMembers.length === 0 ? (
            <div className="text-center py-8 animate-fade-in">
              <p className="text-gray-500">No team members found with the selected filters.</p>
            </div>
          ) : (
            <div className="space-y-16">
              {Object.entries(groupedMembers).map(([department, members], i) => (
                <div key={department} className="animate-fade-in-up" style={{ animationDelay: `${i * 80}ms` }}>
                  <h2 className="text-2xl font-bold text-[#4f1b59] mb-8 text-center tracking-tight animate-fade-in-up">
                    {department}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {(members as any[]).map((member, j) => (
                      <div
                        key={member.id}
                        className="bg-white/90 rounded-2xl shadow-xl border border-gray-100 p-6 flex flex-col items-center transition-transform duration-200 hover:scale-[1.03] hover:shadow-2xl animate-fade-in-up"
                        style={{ animationDelay: `${j * 60}ms` }}
                      >
                        {/* Avatar */}
                        <img
                          src={member.photo || '/public/placeholder.svg'}
                          alt={member.name}
                          className="w-28 h-28 rounded-full object-cover border-4 border-purple-100 mb-4 shadow-md"
                        />
                        {/* Name */}
                        <h3 className="text-lg font-semibold text-[#4f1b59] mb-1 text-center">{member.name}</h3>
                        {/* Position */}
                        <p className="text-sm text-purple-700 font-medium mb-2 text-center">{member.position_hierarchy}</p>
                        {/* Department */}
                        <p className="text-xs text-gray-500 mb-3 text-center">{member.department}</p>
                        {/* Bio or Description */}
                        {member.bio && (
                          <p className="text-sm text-gray-700 text-center mb-2 line-clamp-3">{member.bio}</p>
                        )}
                        {/* Socials */}
                        <div className="flex gap-3 mt-2">
                          {member.linkedin && (
                            <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[#4f1b59] transition-colors">
                              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.968v5.699h-3v-10h2.881v1.367h.041c.401-.761 1.381-1.563 2.844-1.563 3.042 0 3.604 2.003 3.604 4.605v5.591z"/></svg>
                            </a>
                          )}
                          {member.instagram && (
                            <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-[#4f1b59] transition-colors">
                              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.242 1.308 3.608.058 1.266.069 1.646.069 4.851s-.011 3.584-.069 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.242 1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.011-4.85-.069c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.242-1.308-3.608-.058-1.266-.069-1.646-.069-4.85s.011-3.584.069-4.851c.062-1.366.334-2.633 1.308-3.608.974-.974 2.242-1.246 3.608-1.308 1.266-.058 1.646-.069 4.85-.069zm0-2.163c-3.259 0-3.667.012-4.947.07-1.276.058-2.687.334-3.678 1.325-.991.991-1.267 2.402-1.325 3.678-.058 1.28-.07 1.688-.07 4.947s.012 3.667.07 4.947c.058 1.276.334 2.687 1.325 3.678.991.991 2.402 1.267 3.678 1.325 1.28.058 1.688.07 4.947.07s3.667-.012 4.947-.07c1.276-.058 2.687-.334 3.678-1.325.991-.991 1.267-2.402 1.325-3.678.058-1.28.07-1.688.07-4.947s-.012-3.667-.07-4.947c-.058-1.276-.334-2.687-1.325-3.678-.991-.991-2.402-1.267-3.678-1.325-1.28-.058-1.688-.07-4.947-.07zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Animations */}
      <style>{`
        .animate-fade-in { animation: fadeIn 0.7s both; }
        .animate-fade-in-up { animation: fadeInUp 0.7s both; }
        .animate-fade-in-up.delay-100 { animation-delay: 0.1s; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: none; } }
      `}</style>
    </div>
  );
};

export default Team;
