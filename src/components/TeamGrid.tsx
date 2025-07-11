import { Github, Linkedin, Mail, MapPin, Twitter } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';
import { Tooltip } from '@/components/ui/tooltip';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  position_hierarchy: string;
  department?: string;
  member_type: string;
  image?: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
  email?: string;
  bio?: string;
}

interface TeamGridProps {
  members?: TeamMember[];
  loading?: boolean;
  error?: string | null;
}

const TeamGrid = ({ members, loading, error }: TeamGridProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, index) => (
          <Card key={index} className="overflow-hidden">
            <Skeleton className="w-full h-64" />
            <CardContent className="p-6">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2 mb-3" />
              <Skeleton className="h-16 w-full mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <div className="flex gap-2">
                <Skeleton className="h-8 w-8" />
                <Skeleton className="h-8 w-8" />
                <Skeleton className="h-8 w-8" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Error loading team members: {error}</p>
      </div>
    );
  }

  if (!members || members.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No team members found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {members.map((member, idx) => (
        <motion.div
          key={member.id}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: idx * 0.08, ease: 'easeOut' }}
          whileHover={{ scale: 1.045, boxShadow: '0 8px 32px 0 rgba(162,89,198,0.18)' }}
          className="overflow-visible"
        >
          <Card className="bg-white/70 backdrop-blur-lg border border-[#e0c3fc]/40 shadow-xl rounded-3xl transition-all duration-300 overflow-hidden group hover:shadow-2xl">
            <div className="relative flex flex-col items-center pt-8 pb-2 px-6">
              <div className="relative z-10">
                <motion.img
                  src={member.image || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face'}
                  alt={member.name}
                  className="w-28 h-28 object-cover rounded-full border-4 border-white shadow-lg group-hover:ring-4 group-hover:ring-[#a259c6]/30 transition-all duration-300 bg-gradient-to-br from-[#a259c6]/10 to-[#f3e8ff]/30"
                  whileHover={{ scale: 1.06 }}
                />
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#a259c6]/90 to-[#4f1b59]/90 text-white text-xs font-semibold px-4 py-1 rounded-full shadow-lg backdrop-blur-md">
                  {member.role}
                </div>
              </div>
            </div>
            <CardContent className="pt-2 pb-6 px-6 flex flex-col items-center">
              <h3 className="text-2xl font-extrabold mb-1 text-center font-abril bg-gradient-to-r from-[#a259c6] via-[#f3e8ff] to-[#4f1b59] bg-clip-text text-transparent drop-shadow-md">
                {member.name}
              </h3>
              <div className="flex items-center gap-2 text-base font-doto font-medium mb-2 bg-gradient-to-r from-[#a259c6] to-[#4f1b59] bg-clip-text text-transparent">
                <MapPin className="w-4 h-4 text-[#a259c6]" />
                <span>{member.department || 'Committee Member'}</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="bg-[#4f1b59]/10 text-[#4f1b59] px-2 py-1 rounded-full text-xs font-doto font-semibold">
                  {member.position_hierarchy}
                </span>
                {member.member_type && (
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-doto font-semibold">
                    {member.member_type.replace('_', ' ')}
                  </span>
                )}
              </div>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed text-center line-clamp-3 min-h-[3.5em] font-doto">
                {member.bio}
              </p>
              <div className="w-full border-t border-[#e0c3fc]/40 my-3" />
              <div className="flex items-center justify-center gap-2 mt-2">
                {member.linkedin && (
                  <Tooltip content="LinkedIn">
                    <Button size="sm" variant="outline" className="p-2 hover:bg-[#4f1b59] hover:text-white hover:scale-110 hover:shadow-lg transition-all duration-200" asChild>
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="w-4 h-4" />
                      </a>
                    </Button>
                  </Tooltip>
                )}
                {member.github && (
                  <Tooltip content="GitHub">
                    <Button size="sm" variant="outline" className="p-2 hover:bg-[#333] hover:text-white hover:scale-110 hover:shadow-lg transition-all duration-200" asChild>
                      <a href={member.github} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4" />
                      </a>
                    </Button>
                  </Tooltip>
                )}
                {member.twitter && (
                  <Tooltip content="Twitter">
                    <Button size="sm" variant="outline" className="p-2 hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-600 hover:text-white hover:scale-110 hover:shadow-lg transition-all duration-200" asChild>
                      <a href={member.twitter} target="_blank" rel="noopener noreferrer">
                        <Twitter className="w-4 h-4" />
                      </a>
                    </Button>
                  </Tooltip>
                )}
                {member.email && (
                  <Tooltip content="Email">
                    <Button size="sm" variant="outline" className="p-2 hover:bg-blue-500 hover:text-white hover:scale-110 hover:shadow-lg transition-all duration-200" asChild>
                      <a href={`mailto:${member.email}`}>
                        <Mail className="w-4 h-4" />
                      </a>
                    </Button>
                  </Tooltip>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default TeamGrid;
