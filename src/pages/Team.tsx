
import Header from '../components/Header';
import TeamGrid from '../components/TeamGrid';

const Team = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#333333] mb-4">Meet Our Team</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get to know the passionate individuals who make the IET Committee an amazing community
          </p>
        </div>
        <TeamGrid />
      </div>
    </div>
  );
};

export default Team;
