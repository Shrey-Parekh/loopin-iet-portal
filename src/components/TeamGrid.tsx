import { Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTeam } from '@/hooks/useApi';
import { Skeleton } from '@/components/ui/skeleton';

const TeamGrid = () => {
  const { data: teamMembers, loading, error } = useTeam();

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

  if (!teamMembers || teamMembers.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No team members found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {teamMembers.map((member: any) => (
        <Card key={member.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-2">
          <div className="relative">
            <img 
              src={member.image || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face'} 
              alt={member.name}
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
              <span className="text-sm font-medium text-[#4f1b59]">{member.role}</span>
            </div>
          </div>
          
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-[#333333] mb-2">{member.name}</h3>
            
            <div className="flex items-center space-x-2 text-sm text-gray-500 mb-3">
              <MapPin className="w-4 h-4" />
              <span>{member.location}</span>
            </div>
            
            <p className="text-gray-600 mb-4 text-sm leading-relaxed">
              {member.bio}
            </p>
            
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-[#333333] mb-2">Hobbies</h4>
              <div className="flex flex-wrap gap-2">
                {member.hobbies.map((hobby, index) => (
                  <span key={index} className="bg-[#4f1b59]/10 text-[#4f1b59] px-2 py-1 rounded-full text-xs">
                    {hobby}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {member.linkedin && (
                <Button size="sm" variant="outline" className="p-2 hover:bg-[#4f1b59] hover:text-white" asChild>
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-4 h-4" />
                  </a>
                </Button>
              )}
              {member.github && (
                <Button size="sm" variant="outline" className="p-2 hover:bg-[#4f1b59] hover:text-white" asChild>
                  <a href={member.github} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4" />
                  </a>
                </Button>
              )}
              {member.twitter && (
                <Button size="sm" variant="outline" className="p-2 hover:bg-[#4f1b59] hover:text-white" asChild>
                  <a href={member.twitter} target="_blank" rel="noopener noreferrer">
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
