import React from 'react';
import { Instagram, Facebook, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0B1121] text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo and Description Column */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10">
                <svg viewBox="0 0 40 40" className="fill-current">
                  <polygon points="20,0 40,40 0,40" className="text-white"/>
                </svg>
              </div>
              <span className="text-2xl font-bold">Lenient Tree</span>
            </div>
            <p className="text-gray-400 max-w-xs">
            LenientTree - Find & Join Hackathons and Ideathons
            </p>
          </div>

          {/* Useful Links Column */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Usefull Links</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Achievements</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Members</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact-us</a></li>
            </ul>
          </div>

          {/* Community Column */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Community</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Partners</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Suggestions</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Newsletters</a></li>
            </ul>
          </div>

          {/* Partner Column */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Partner</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Our Partner</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Become a Partner</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section with Copyright and Social Links */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-16 pt-8 border-t border-gray-800">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            Copyright © 2021 Lenient Tree. All Rights Reserved.
          </p>
          
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Instagram size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Facebook size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Twitter size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Linkedin size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}