import React, { useState, useEffect } from "react";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import { motion } from "framer-motion";
import "react-vertical-timeline-component/style.min.css";

const customTimelineStyles = {
  '.vertical-timeline::before': {
    background: '#232631',
    width: '2px'
  },
  '.vertical-timeline-element-content': {
    boxShadow: 'none',
    borderBottom: '2px solid #1d1836'
  }
};

const ExperienceCard = ({ experience }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % experience.imageUrls.length);
    }, 3000);
    return () => clearInterval(intervalId);
  }, [experience.imageUrls]);

  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "#1d1836",
        color: "#fff",
        boxShadow: 'none',
        border: 'none'
      }}
      contentArrowStyle={{ borderRight: "7px solid #232631" }}
      date={new Date(experience.date).toLocaleDateString()}
      iconStyle={{ background: "#232631" }}
    >
      <div>
        <h3 className="text-white text-2xl font-bold">{experience.name}</h3>
      </div>
      <div className="mt-5 relative w-full h-48 overflow-hidden rounded-lg">
        {experience.imageUrls && experience.imageUrls.length > 0 && (
          <img
            src={experience.imageUrls[currentImageIndex]}
            alt={`${experience.name} image ${currentImageIndex + 1}`}
            className="w-full h-full object-cover transition-opacity duration-500"
          />
        )}
      </div>
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await fetch("https://tech-buddha-server-0dge.onrender.com/achievements");
        if (!response.ok) throw new Error("Failed to fetch achievement");
        const data = await response.json();
        setAchievements(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.textContent = Object.entries(customTimelineStyles)
      .map(([selector, rules]) =>
        `${selector} {${Object.entries(rules)
          .map(([property, value]) => `${property}: ${value};`)
          .join('')}}`
      )
      .join('');
    document.head.appendChild(styleSheet);
    return () => document.head.removeChild(styleSheet);
  }, []);

  if (loading) return <div className="text-white text-center">Loading achievements...</div>;

  return (
    <div className="w-full min-h-screen" id="achievements">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-center font-thin text-5xl text-white mb-8">
          Achievements
        </p>
      </motion.div>
      <div className="mt-20 flex flex-col">
        <VerticalTimeline>
          {achievements.map((achievement, index) => (
            <ExperienceCard
              key={`achievement-${index}`}
              experience={achievement}
            />
          ))}
        </VerticalTimeline>
      </div>
    </div>
  );
};

export default Experience;
