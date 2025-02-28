
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Info, ChevronDown, ChevronUp, Search } from 'lucide-react';
import Layout from './components/Layout';

import adityaImg from '/aditya.jpeg';
import mithilImg from '/Mithil.jpeg';
import antonyImg from '/Antony.jpeg';
import aryanImg from '/Aryan.jpeg';
import visakhImg from '/Visakh.jpeg';
import abhijayImg from '/AbhijayPrakash.jpeg';
import ak from '/Anandu.jpg';

const executives = [
  {
    name: 'Adithya Vijay',
    title: 'CAO',
    imageUrl: adityaImg,
    path: '/members/adithyavijay'
  },
  {
    name: 'Abhijay Prakash',
    title: 'CSO',
    imageUrl: abhijayImg,
    path: '/members/abhijayPrakash'
  },
  {
    name: 'Aryan Soji',
    title: 'CDO',
    imageUrl: aryanImg,
    path: '/members/aryansoji'
  },
  {
    name: 'Antony Agnel',
    title: 'CHO',
    imageUrl: antonyImg,
    path: '/members/antony'
  },
];

const ProfileCard = ({ name, role, imageUrl, path }) => (
  <div className="bg-slate-50 rounded-3xl py-6 px-3 sm:py-8 sm:px-4 flex flex-col items-center space-y-3 sm:space-y-4 transform hover:scale-105 transition-all duration-300 hover:shadow-xl w-full">
    <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-slate-200 border-2 border-slate-300 overflow-hidden">
      {imageUrl ? (
        <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-10 h-10 sm:w-16 sm:h-16 text-slate-400">
            <path
              fill="currentColor"
              d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM6 8a6 6 0 1 1 12 0A6 6 0 0 1 6 8zm2 10a3 3 0 0 0-3 3 1 1 0 1 1-2 0 5 5 0 0 1 5-5h8a5 5 0 0 1 5 5 1 1 0 1 1-2 0 3 3 0 0 0-3-3H8z"
            />
          </svg>
        </div>
      )}
    </div>
    <div className="text-center">
      <h3 className="font-bold text-black text-base sm:text-lg mb-1">{name}</h3>
      <p className="text-xs sm:text-sm text-slate-600">{role}</p>
    </div>
    <Link to={path} className="rounded-full p-1.5 sm:p-2 hover:bg-slate-200 transition-colors group">
      <Info className="w-5 h-5 sm:w-6 sm:h-6 text-black group-hover:text-blue-500 transition-colors" />
    </Link>
  </div>
);



const CollegeSection = ({ college, isOpen, onToggle }) => {
  const headOfCollege = college.members.find(
    (member) => member.currentPositions?.[0]?.toUpperCase() === "COLLEGE REPRESENTATIVE"
  );

  const executives = college.members.filter(member => 
    member.currentPositions?.[0] && 
    ["CSO", "CHO", "CAO", "CDO"].includes(member.currentPositions[0].toUpperCase())
  );

  const yearGroups = college.members.reduce((acc, member) => {
    if (!member.year || 
        member.currentPositions?.[0]?.toUpperCase() === "COLLEGE REPRESENTATIVE" ||
        ["CSO", "CHO", "CAO", "CDO"].includes(member.currentPositions?.[0]?.toUpperCase())) {
      return acc;
    }

    const year = member.year;
    if (!acc[year]) {
      acc[year] = {
        leader: null,
        members: []
      };
    }

    const isYearPosition = member.currentPositions?.[0]?.toLowerCase().includes(year.toLowerCase());
    
    if (isYearPosition) {
      acc[year].leader = member;
    } else {
      acc[year].members.push(member);
    }
    return acc;
  }, {});

  const yearOrder = ["4th", "3rd", "2nd", "1st"];
  const sortedYears = Object.keys(yearGroups).sort(
    (a, b) => yearOrder.indexOf(a) - yearOrder.indexOf(b)
  );

  return (
    <div className="bg-slate-800 rounded-lg overflow-hidden mb-6">
      <button
        onClick={onToggle}
        className="w-full px-4 sm:px-8 py-4 sm:py-6 flex justify-between items-center hover:bg-slate-700 transition-colors"
      >
        <div className="flex flex-col sm:flex-row w-full sm:justify-between items-start sm:items-center gap-4">
          <h3 className="text-xl sm:text-2xl font-semibold text-white">
            {college.collegename}
          </h3>
          {headOfCollege && !isOpen && (
            <div className="w-full sm:w-1/3 flex justify-center">
              <ProfileCard
                name={headOfCollege.fullname}
                role={headOfCollege.currentPositions?.[0] || "Member"}
                imageUrl={headOfCollege.imageUrl}
                path={`/members/${headOfCollege.fullname.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')}`}
              />
            </div>
          )}
        </div>
        {isOpen ? (
          <ChevronUp className="w-6 h-6 sm:w-8 sm:h-8 text-slate-300 flex-shrink-0 ml-2" />
        ) : (
          <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8 text-slate-300 flex-shrink-0 ml-2" />
        )}
      </button>
      
      {isOpen && (
        <div className="p-4 sm:p-8 bg-slate-700 space-y-8">
          {headOfCollege && (
            <div className="flex justify-center">
              <div className="w-full max-w-sm">
                <ProfileCard
                  name={headOfCollege.fullname}
                  role={headOfCollege.currentPositions?.[0] || "Member"}
                  imageUrl={headOfCollege.imageUrl}
                  path={`/members/${headOfCollege.fullname.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')}`}
                />
              </div>
            </div>
          )}

          {executives.length > 0 && (
            <div className="space-y-4">
              <h4 className="text-lg sm:text-xl font-bold text-slate-300 text-center">
                Executives
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {executives.map((member) => (
                  <ProfileCard
                    key={member.fullname}
                    name={member.fullname}
                    imageUrl={member.imageUrl}
                    role={member.currentPositions?.[0] || "Member"}
                    path={`/members/${member.fullname.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')}`}
                  />
                ))}
              </div>
            </div>
          )}

          {sortedYears.map((year) => (
            <div key={year} className="space-y-6">
              <h4 className="text-lg sm:text-xl font-bold text-slate-300 text-center">
                {year} Year
              </h4>
              
              {yearGroups[year].leader && (
                <div className="flex justify-center mb-8">
                  <div className="w-full max-w-sm">
                    <ProfileCard
                      name={yearGroups[year].leader.fullname}
                      role={yearGroups[year].leader.currentPositions[0]}
                      imageUrl={yearGroups[year].leader.imageUrl}
                      path={`/members/${yearGroups[year].leader.fullname.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')}`}
                    />
                  </div>
                </div>
              )}

              {yearGroups[year].members.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {yearGroups[year].members.map((member) => (
                    <ProfileCard
                      key={member.fullname}
                      name={member.fullname}
                      imageUrl={member.imageUrl}
                      role={member.currentPositions?.[0] || "Member"}
                      path={`/members/${member.fullname.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')}`}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="space-y-4">
            <h4 className="text-lg sm:text-xl font-bold text-slate-300 text-center">
              Projects
            </h4>
            <div className="bg-slate-600 p-4 rounded-lg">
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


const CategoryFilter = ({ activeFilter, onFilterChange }) => {
  const categories = ['college', 'development', 'marketing', 'job'];
  
  return (
      <Layout 
      title={'Executives - Lenient tree '}
      description={" Meet the leadership team behind Lienet Tree! Learn about the executives who shape our platform, connecting innovators with top hackathons and empowering collaboration in the tech community."}
      keywords={"Lienet Tree leadership,Lienet Tree executives,Our team at Lienet Tree,Tech platform leadership,Innovator community leaders,Hackathon platform team,Meet our executives,Innovation and collaboration leaders,Tech industry leadership,Driving innovation in hackathons"}
      author={"Leinent Tree"}
      >
    <div className="grid grid-cols-2 grid-rows-auto gap-x-4 gap-y-4 md:flex md:justify-center gap-4 mb-8">
    {categories.map((category) => (
      <button
        key={category}
        onClick={() => onFilterChange(category)}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
          activeFilter === category
            ? 'bg-blue-500 text-white shadow-lg'
            : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
        }`}
      >
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </button>
    ))}
  </div>
  </Layout>
  
  );
};

export default function ExecutivesDisplay() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('college');
  const [openColleges, setOpenColleges] = useState({});
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch('https://tech-buddha-server-1.onrender.com/members');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setMembers(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  const toggleCollege = (collegeId) => {
    setOpenColleges(prev => ({
      ...prev,
      [collegeId]: !prev[collegeId]
    }));
  };

  const filteredMembers = members.filter(member => {
    if (!member) return false;
    
    const matchesSearch = 
      (member.fullname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
       member.collegename?.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesSearch && member.userType === activeFilter;
  });



    const colleges = activeFilter === 'college' 
  ? filteredMembers.reduce((acc, member) => {
      if (member.collegename) {
        if (!acc[member.collegename]) {
          acc[member.collegename] = {
            collegename: member.collegename,
            members: []
          };
        }
        acc[member.collegename].members.push(member); 
      }
      return acc;
    }, {})
  : {};

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-red-400 text-xl">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="space-y-20">
        <div className="space-y-8">
          <div className="text-center space-y-4 mt-14">
            <h1 className="text-5xl font-bold text-blue-400 mb-2">
              Chief Executives
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mt-12">
            {executives.map((exec, index) => (
              <ProfileCard key={index} {...exec} />
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-4xl font-semibold text-slate-300 mb-8">
              MEMBERS
            </h2>
            
            <CategoryFilter 
              activeFilter={activeFilter} 
              onFilterChange={setActiveFilter}
            />
            
            <div className="relative w-4/5 mx-auto mb-8">
              <input
                type="text"
                placeholder="Search members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-3 rounded-lg bg-slate-800 text-white border border-slate-600 focus:outline-none focus:border-blue-400 pl-12"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            </div>

            <div className="max-w-6xl mx-auto">
              {activeFilter === 'college' ? (
                Object.values(colleges).map((college, index) => (
                  <CollegeSection
                    key={index}
                    college={college}
                    isOpen={openColleges[college.collegename]}
                    onToggle={() => toggleCollege(college.collegename)}
                  />
                ))
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredMembers.map((member, index) => (
                    <ProfileCard
                      key={index}
                      name={member.fullname}
                      role={member.currentPositions?.[0]}
                      imageUrl={member.imageUrl}
                      path={`/members/${member.fullname.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')}`}

                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}