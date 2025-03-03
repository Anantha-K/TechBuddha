import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Medal, Award, BookOpen, Trophy, Microscope, Leaf, Smartphone, Factory } from 'lucide-react';
import MemberProfileSection from '../MemberDetails';
import AchievementsSection from '../Portfolio';
import Layout from '../components/Layout';

const IconMapper = {
  BookOpen, Award, Medal, Trophy, Microscope, Leaf, Smartphone, Factory,
};

const MemberPage = () => {
  const { memberId } = useParams();
  const navigate = useNavigate();
  const [memberData, setMemberData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMemberDetails = async () => {
      if (!memberId) {
        setError('Member ID is missing');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://tech-buddha-server-1.onrender.com/members/${encodeURIComponent(memberId)}`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch member details: ${response.status}`);
        }

        const result = await response.json();
    

        if (result.success) {
          
          setMemberData(result.data);
        } else {
          throw new Error(result.error || 'Failed to fetch member details');
        }
      } catch (err) {
        console.error('Error in fetchMemberDetails:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
   

    fetchMemberDetails();
  }, [memberId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500">Error</h1>
          <p className="mt-2 text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!memberData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Member Not Found</h1>
          <p className="mt-2 text-gray-600">The requested member profile does not exist.</p>
        </div>
      </div>
    );
  }

  return (
    <Layout 
          title= {`${memberData.fullname } Leninet tree`}
          description={ `${memberData.currentPositions || ['member']} Leineit Tree \n Meet the leadership team behind Lienet Tree! Learn about the executives who shape our platform, connecting innovators with top hackathons and empowering collaboration in the tech community.`}
          keywords={"Lienet Tree leadership,Lienet Tree executives,Our team at Lienet Tree,Tech platform leadership,Innovator community leaders,Hackathon platform team,Meet our executives,Innovation and collaboration leaders,Tech industry leadership,Driving innovation in hackathons"}
          author={"Leinent Tree"}
          >
    <div>
      <MemberProfileSection
        name={memberData.fullname}
        currentPositions={memberData.currentPositions || []}
        image={memberData.imageUrl}
        linkedinUrl={memberData.linkedinUrl}
        skills={memberData.skills}
        quotes={memberData.quotes || []}
        volunteeringOrgs={memberData.volunteeringOrgs}
      />
      <AchievementsSection certificates={memberData.certificateUrls} cgpa={memberData.cgpa} />
    </div>
    </Layout>
  );
};

export default MemberPage;