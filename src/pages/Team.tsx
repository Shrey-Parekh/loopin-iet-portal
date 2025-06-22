import { useState } from 'react';
import Header from '../components/Header';
import TeamGrid from '../components/TeamGrid';
import { useTeam, useDepartments } from '@/hooks/useApi';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';

const Team = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [selectedMemberType, setSelectedMemberType] = useState<string>('all');
  
  const { data: teamMembers, loading, error } = useTeam();
  const { data: departments } = useDepartments();

  // Filter team members based on selections
  const filteredMembers = teamMembers?.filter(member => {
    const departmentMatch = selectedDepartment === 'all' || member.department === selectedDepartment;
    const memberTypeMatch = selectedMemberType === 'all' || member.member_type === selectedMemberType;
    return departmentMatch && memberTypeMatch;
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-[#4f1b59] text-white rounded-full text-sm font-medium mb-4">
              Our Team
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-[#333333] mb-6">Meet Our Committee</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Get to know the passionate individuals who make the IET Committee an amazing community. 
              Our diverse team brings together expertise, creativity, and dedication.
            </p>
          </div>

          {/* Filters */}
          <div className="mb-12">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
                  <div className="flex items-center space-x-2">
                    <label className="text-sm font-medium text-gray-700">Department:</label>
                    <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="All Departments" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Departments</SelectItem>
                        {departments?.map((dept: string) => (
                          <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <label className="text-sm font-medium text-gray-700">Member Type:</label>
                    <Select value={selectedMemberType} onValueChange={setSelectedMemberType}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="All Members" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Members</SelectItem>
                        <SelectItem value="super_core">Super Core</SelectItem>
                        <SelectItem value="core">Core</SelectItem>
                        <SelectItem value="member">Members</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSelectedDepartment('all');
                      setSelectedMemberType('all');
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              </CardContent>
            </Card>
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
            <div className="text-center py-8">
              <p className="text-red-500">Error loading team members: {error}</p>
            </div>
          ) : filteredMembers.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No team members found with the selected filters.</p>
            </div>
          ) : (
            <div className="space-y-12">
              {Object.entries(groupedMembers).map(([department, members]) => (
                <div key={department}>
                  <h2 className="text-2xl font-bold text-[#333333] mb-6 text-center">
                    {department}
                  </h2>
                  <TeamGrid members={members} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Team;
