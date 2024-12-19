import React from 'react';
import { AlertTriangle, HandHelping, Users, Map, Wrench } from 'lucide-react';

const CommunityShield = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">Community Shield</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Welcome to Community Shield - your platform for community support and emergency preparedness. 
            Together we can build a stronger, safer, and more connected neighborhood.
          </p>
        </header>

        {/* Main Button Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <button className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white p-6 rounded-lg shadow-md transition-all">
            <Users className="mr-3 h-6 w-6" />
            <span className="text-xl font-semibold">Volunteer</span>
          </button>

          <button className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white p-6 rounded-lg shadow-md transition-all">
            <HandHelping className="mr-3 h-6 w-6" />
            <span className="text-xl font-semibold">Seeking Help</span>
          </button>

          <button className="flex items-center justify-center bg-amber-500 hover:bg-amber-600 text-white p-6 rounded-lg shadow-md transition-all">
            <Wrench className="mr-3 h-6 w-6" />
            <span className="text-xl font-semibold">Emergency Tool Kit</span>
          </button>

          <button className="flex items-center justify-center bg-purple-500 hover:bg-purple-600 text-white p-6 rounded-lg shadow-md transition-all">
            <Map className="mr-3 h-6 w-6" />
            <span className="text-xl font-semibold">Maps</span>
          </button>
        </div>

        {/* Report Emergency Button */}
        <div className="text-center">
          <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg shadow-lg transition-all inline-flex items-center">
            <AlertTriangle className="mr-2 h-6 w-6" />
            <span className="text-xl font-bold">REPORT EMERGENCY</span>
          </button>
        </div>

        {/* Footer Message */}
        <p className="text-center text-gray-600 mt-12">
          In case of immediate danger or life-threatening emergency, 
          always call emergency services (911) first.
        </p>
      </div>
    </div>
  );
};

export default CommunityShield;