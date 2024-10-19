import React from 'react';
import { Link } from 'react-router-dom';
import { Info } from 'lucide-react';

import agustineImg from '/Agustine.jpeg';
import mithilImg from '/Mithil.jpeg';
import antonyImg from '/Antony.jpeg';
import aryanImg from '/Aryan.jpeg';
import visakhImg from '/Visakh.jpeg';

const executives = [
  {
    name: 'Agustine Vadakumchery',
    title: 'CEO',
    image: agustineImg,
    path: '/members/agustine'
  },
  {
    name: 'Mithil',
    title: 'COO',
    image: mithilImg,
    path: '/members/mithil'
  },
  {
    name: 'Antony Agnel',
    title: 'Chief Officer',
    image: antonyImg,
    path: '/members/antony'
  },
  {
    name: 'Aryan Soji',
    title: 'Executive Officer',
    image: aryanImg,
    path: '/members/aryan'
  },
];

const members = [
  {
    name: 'Visakh K Vasudevan',
    title: 'Member',
    image: visakhImg,
    path: '/members/visakh'
  },
  // Add more members here as needed
];

const ProfileCard = ({ name, title, image, path }) => (
  <div className="bg-slate-50 rounded-3xl py-16 p-6 flex flex-col items-center space-y-4 transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
    <div className="w-32 h-32 rounded-full bg-slate-200 border-2 border-slate-300 overflow-hidden">
      {image ? (
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-24 h-24 text-slate-400">
            <path
              fill="currentColor"
              d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM6 8a6 6 0 1 1 12 0A6 6 0 0 1 6 8zm2 10a3 3 0 0 0-3 3 1 1 0 1 1-2 0 5 5 0 0 1 5-5h8a5 5 0 0 1 5 5 1 1 0 1 1-2 0 3 3 0 0 0-3-3H8z"
            />
          </svg>
        </div>
      )}
    </div>
    <div className="text-center">
      <h3 className="font-bold text-black text-xl mb-1">{name}</h3>
      <p className="text-lg text-slate-600">{title}</p>
    </div>
    <Link
      to={path}
      className="rounded-full p-4 hover:bg-slate-200 transition-colors group"
    >
      <Info className="w-10 h-10 text-black group-hover:text-blue-500 transition-colors" />
    </Link>
  </div>
);

export default function ExecutivesDisplay() {
  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="space-y-20">
        {/* Executives Section */}
        <div className="space-y-8">
          <div className="text-center space-y-4 mt-14">
            <h1 className="text-5xl font-bold text-blue-400 mb-2">
              Executives and Members
            </h1>
            <h2 className="text-4xl font-semibold text-slate-300">
              TOP EXECUTIVES
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mt-12">
            {executives.map((exec, index) => (
              <ProfileCard key={index} {...exec} />
            ))}
          </div>
        </div>

        {/* Members Section */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-4xl font-semibold text-slate-300">
              MEMBERS
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {members.map((member, index) => (
              <ProfileCard key={`member-${index}`} {...member} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}