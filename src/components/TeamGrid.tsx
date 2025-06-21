
import { Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const TeamGrid = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'Alex Johnson',
      role: 'President',
      bio: 'Leading the committee with passion for technology and innovation. Computer Science major with 3 years of leadership experience.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
      location: 'New York, NY',
      email: 'alex.johnson@iet.edu',
      linkedin: 'https://linkedin.com/in/alexjohnson',
      github: 'https://github.com/alexjohnson',
      hobbies: ['Photography', 'Rock Climbing', 'Chess']
    },
    {
      id: 2,
      name: 'Sarah Chen',
      role: 'Vice President',
      bio: 'Coordinating events and managing team operations. Electrical Engineering student with a love for renewable energy projects.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b332c2a9?w=300&h=300&fit=crop&crop=face',
      location: 'California, CA',
      email: 'sarah.chen@iet.edu',
      linkedin: 'https://linkedin.com/in/sarahchen',
      github: 'https://github.com/sarahchen',
      hobbies: ['Guitar', 'Hiking', 'Cooking']
    },
    {
      id: 3,
      name: 'Marcus Rodriguez',
      role: 'Technical Lead',
      bio: 'Spearheading technical workshops and coding bootcamps. Full-stack developer with expertise in modern web technologies.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
      location: 'Texas, TX',
      email: 'marcus.rodriguez@iet.edu',
      linkedin: 'https://linkedin.com/in/marcusrodriguez',
      github: 'https://github.com/marcusrodriguez',
      hobbies: ['Gaming', 'Basketball', 'Reading']
    },
    {
      id: 4,
      name: 'Emily Davis',
      role: 'Events Coordinator',
      bio: 'Organizing memorable events and workshops. Event management expert with a creative approach to community building.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
      location: 'Florida, FL',
      email: 'emily.davis@iet.edu',
      linkedin: 'https://linkedin.com/in/emilydavis',
      github: 'https://github.com/emilydavis',
      hobbies: ['Dancing', 'Painting', 'Traveling']
    },
    {
      id: 5,
      name: 'David Kim',
      role: 'Secretary',
      bio: 'Managing communications and documentation. Business major with excellent organizational and communication skills.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face',
      location: 'Washington, WA',
      email: 'david.kim@iet.edu',
      linkedin: 'https://linkedin.com/in/davidkim',
      github: 'https://github.com/davidkim',
      hobbies: ['Writing', 'Tennis', 'Coffee']
    },
    {
      id: 6,
      name: 'Lisa Thompson',
      role: 'Treasurer',
      bio: 'Managing finances and budget planning. Accounting major with a keen eye for detail and financial management.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop&crop=face',
      location: 'Illinois, IL',
      email: 'lisa.thompson@iet.edu',
      linkedin: 'https://linkedin.com/in/lisathompson',
      github: 'https://github.com/lisathompson',
      hobbies: ['Yoga', 'Gardening', 'Podcasts']
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {teamMembers.map((member) => (
        <Card key={member.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-2">
          <div className="relative">
            <img 
              src={member.image} 
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
              <Button size="sm" variant="outline" className="p-2 hover:bg-[#4f1b59] hover:text-white">
                <Mail className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline" className="p-2 hover:bg-[#4f1b59] hover:text-white">
                <Linkedin className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline" className="p-2 hover:bg-[#4f1b59] hover:text-white">
                <Github className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TeamGrid;
