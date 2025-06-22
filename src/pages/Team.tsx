
import Header from '../components/Header';
import TeamGrid from '../components/TeamGrid';

const Team = () => {
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
          <TeamGrid />
        </div>
      </div>
    </div>
  );
};

export default Team;
