import { Github, Linkedin, Mail, MapPin, Twitter } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

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
      {members.map((member) => (
        <Card key={member.id} className="shadow-lg transition-all duration-300 overflow-hidden hover:shadow-2xl hover:scale-105">
          <div className="relative">
            <img 
              src={member.image || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face'} 
              alt={member.name}
              className="w-full h-64 object-cover transition-transform duration-300"
            />
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
              <span className="text-sm font-medium text-[#4f1b59]">{member.role}</span>
            </div>
          </div>
          
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-[#333333] mb-2">{member.name}</h3>
            
            <div className="flex items-center space-x-2 text-sm text-gray-500 mb-3">
              <MapPin className="w-4 h-4" />
              <span>{member.department || 'Committee Member'}</span>
            </div>
            
            <p className="text-gray-600 mb-4 text-sm leading-relaxed">
              {member.bio}
            </p>
            
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-[#333333] mb-2">Position</h4>
              <div className="flex flex-wrap gap-2">
                <span className="bg-[#4f1b59]/10 text-[#4f1b59] px-2 py-1 rounded-full text-xs">
                  {member.position_hierarchy}
                </span>
                {member.member_type && (
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                    {member.member_type.replace('_', ' ')}
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {member.linkedin && (
                <Button size="sm" variant="outline" className="p-2 hover:bg-[#4f1b59] hover:text-white hover:scale-110 hover:shadow-lg transition-all duration-200" asChild>
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-4 h-4" />
                  </a>
                </Button>
              )}
              {member.github && (
                <Button size="sm" variant="outline" className="p-2 hover:bg-[#333] hover:text-white hover:scale-110 hover:shadow-lg transition-all duration-200" asChild>
                  <a href={member.github} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4" />
                  </a>
                </Button>
              )}
              {member.twitter && (
                <Button size="sm" variant="outline" className="p-2 hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-600 hover:text-white hover:scale-110 hover:shadow-lg transition-all duration-200" asChild>
                  <a href={member.twitter} target="_blank" rel="noopener noreferrer">
                    <Twitter className="w-4 h-4" />
                  </a>
                </Button>
              )}
              {member.email && (
                <Button size="sm" variant="outline" className="p-2 hover:bg-blue-500 hover:text-white hover:scale-110 hover:shadow-lg transition-all duration-200" asChild>
                  <a href={`mailto:${member.email}`}>
                    <Mail className="w-4 h-4" />
                  </a>
              </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TeamGrid;
