import React from 'react';
import { Card } from '@/components/ui/card';
import { Brain, Code2, Database } from 'lucide-react';
import Layout from '../components/Layout';

const LandingPage = () => {
  const courses = [
    {
      id: 'python',
      title: 'PYTHON',
      level: 'Beginner Level',
      icon: Code2,
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'mern',
      title: 'MERN',
      level: 'Intermediate Level',
      icon: Database,
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      id: 'aiml',
      title: 'AI&ML',
      level: 'Advanced Level',
      icon: Brain,
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  const categories = [
    {
      id: 'roadmap',
      image: '/api/placeholder/400/320',
      title: 'MERN',
      description: 'Full stack development path'
    },
    {
      id: 'talents',
      image: '/api/placeholder/400/320',
      title: 'UNCOVER YOUR TALENTS',
      description: 'Discover your potential'
    },
    {
      id: 'gaming',
      image: '/api/placeholder/400/320',
      title: 'GAMING',
      description: 'Learn game development'
    }
  ];

  return (
     <Layout
          title={'RoadMap - Lenient tree '}
          description={" Your ultimate roadmap to kickstart a successful career in your desired field. Join Lienet Tree to explore guided career paths, skill development, and industry insights to accelerate your growth"}
          keywords={"Career roadmap, skill development, career growth, professional guidance, industry insights, job preparation, career planning, Lienet Tree career guide."}
          author={"Leinent Tree"}
          >
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <header className="bg-gray-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold">LENIENT TREE</h1>
            </div>
            <nav>
              <button className="bg-black px-6 py-2 rounded">COURSE</button>
            </nav>
          </div>
          
          <div className="mt-16 mb-8">
            <h2 className="text-3xl font-bold mb-4">ROAD MAPS FOR BEGINNERS</h2>
            <p className="text-gray-300">Start your journey in the world of CS languages.</p>
            <button className="mt-6 bg-black text-white px-8 py-3 rounded">Get Started</button>
          </div>
        </div>
      </header>

      {/* Courses Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-12 text-center">COURSES</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {courses.map((course) => (
            <Card 
              key={course.id}
              className="p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${course.gradient} flex items-center justify-center mb-4`}>
                  <course.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                <p className="text-gray-600">{course.level}</p>
                <a href="#" className="mt-4 text-blue-600 hover:underline">YouTube Link</a>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-gray-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Card 
                key={category.id}
                className="bg-gray-700 p-4 hover:shadow-xl transition-shadow duration-300"
              >
                <img 
                  src={category.image}
                  alt={category.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                <p className="text-gray-300">{category.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
    </Layout>
  );
};

export default LandingPage;