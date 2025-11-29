import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { ScreenName } from '../types';
import { MapPlaceholder } from '../components/Map';
import { Menu, Search, Clock, MapPin, Heart, Star } from 'lucide-react';
import { LocationData } from '../types';

export const HomeScreen = () => {
  const { navigate, setDropLocation, user } = useApp();

  const handleMenu = () => navigate(ScreenName.PROFILE);

  const quickCategories = [
    { id: 'daily', name: 'Daily', icon: '🚗' },
    { id: 'rental', name: 'Rentals', icon: '⏱️' },
    { id: 'outstation', name: 'Outstation', icon: '🛣️' },
  ];

  const recentLocations = [
    { id: '1', name: 'Office', address: 'Tech Park, Sector 4', type: 'work' },
    { id: '2', name: 'Grand Mall', address: 'Central Avenue', type: 'recent' },
  ];

  return (
    <div className="h-screen flex flex-col relative bg-gray-50">
      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 z-20 p-4 flex justify-between items-center pointer-events-none">
        <button onClick={handleMenu} className="pointer-events-auto bg-white p-3 rounded-full shadow-md text-gray-700">
          <Menu size={24} />
        </button>
        <div className="bg-white px-4 py-2 rounded-full shadow-md text-sm font-semibold pointer-events-auto">
          {user.rating} <Star size={12} className="inline text-yellow-400 fill-current mb-0.5" />
        </div>
      </div>

      {/* Map Background */}
      <div className="h-[60%] w-full">
        <MapPlaceholder className="h-full w-full" />
      </div>

      {/* Bottom Sheet */}
      <div className="flex-1 bg-white rounded-t-3xl -mt-6 z-10 shadow-[0_-5px_20px_rgba(0,0,0,0.05)] p-5 flex flex-col overflow-y-auto no-scrollbar">
        <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-6 shrink-0" />
        
        {/* Hello Text */}
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Where are you going?</h2>

        {/* Search Trigger */}
        <div 
          onClick={() => navigate(ScreenName.SEARCH)}
          className="bg-gray-100 p-4 rounded-xl flex items-center gap-3 mb-6 cursor-pointer active:scale-98 transition-transform"
        >
          <Search className="text-gray-800" size={24} />
          <span className="text-gray-500 font-medium text-lg">Search destination</span>
        </div>

        {/* Categories */}
        <div className="flex justify-between gap-4 mb-8">
          {quickCategories.map(cat => (
            <div key={cat.id} className="flex flex-col items-center gap-2 flex-1">
              <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-2xl shadow-sm border border-gray-100">
                {cat.icon}
              </div>
              <span className="text-xs font-medium text-gray-600">{cat.name}</span>
            </div>
          ))}
        </div>

        {/* Recent Locations */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
             <div className="bg-gray-100 p-2 rounded-full"><Clock size={16} className="text-gray-600"/></div>
             <h3 className="font-semibold text-gray-900">Recent Places</h3>
          </div>
          {recentLocations.map((loc) => (
            <div 
              key={loc.id} 
              className="flex items-center gap-4 py-2 border-b border-gray-50 last:border-0 cursor-pointer"
              onClick={() => {
                setDropLocation(loc as LocationData);
                navigate(ScreenName.RIDE_OPTIONS);
              }}
            >
              <div className="p-2 bg-gray-50 rounded-full text-gray-400">
                <MapPin size={20} />
              </div>
              <div>
                <p className="font-medium text-gray-800">{loc.name}</p>
                <p className="text-xs text-gray-400">{loc.address}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const SearchScreen = () => {
  const { navigate, goBack, setDropLocation } = useApp();
  const [query, setQuery] = useState('');

  const suggestions: LocationData[] = [
    { id: '1', name: 'City Center Mall', address: 'Downtown', type: 'search' },
    { id: '2', name: 'International Airport', address: 'Terminal 3', type: 'search' },
    { id: '3', name: 'Central Hospital', address: 'Medical District', type: 'search' },
  ];

  const handleSelect = (loc: LocationData) => {
    setDropLocation(loc);
    navigate(ScreenName.RIDE_OPTIONS);
  };

  return (
    <div className="h-screen bg-white flex flex-col">
      <div className="p-4 shadow-sm border-b border-gray-100 z-10">
        <div className="flex items-center gap-2 mb-4">
          <button onClick={goBack} className="p-2 -ml-2 rounded-full hover:bg-gray-100"><div className="w-6 h-6 flex items-center justify-center">←</div></button>
          <h2 className="text-lg font-semibold">Your Route</h2>
        </div>
        
        <div className="flex flex-col gap-3 relative">
          {/* Connecting Line */}
          <div className="absolute left-[19px] top-8 bottom-8 w-0.5 bg-gray-300 border-l border-dashed border-gray-400"></div>

          {/* Current Location */}
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-lime-500 ring-4 ring-lime-100"></div>
            <input 
              disabled 
              value="Current Location" 
              className="flex-1 bg-gray-50 p-3 rounded-lg text-sm font-medium text-gray-500"
            />
          </div>

          {/* Destination */}
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-red-500/20 rounded-full p-0.5">
               <div className="w-full h-full bg-red-500 rounded-full"></div>
            </div>
            <input 
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search destination"
              className="flex-1 bg-gray-100 p-3 rounded-lg text-sm font-medium text-gray-900 focus:ring-2 focus:ring-black outline-none"
            />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="mb-4 flex gap-4">
           <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full text-xs font-semibold border border-gray-200">
             <Heart size={14} className="text-red-500 fill-current" /> Home
           </button>
           <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full text-xs font-semibold border border-gray-200">
             <BriefcaseIcon /> Work
           </button>
        </div>

        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Suggestions</h3>
        
        {suggestions.map((loc) => (
          <div 
            key={loc.id} 
            onClick={() => handleSelect(loc)}
            className="flex items-center gap-4 py-4 border-b border-gray-50 last:border-0 active:bg-gray-50 -mx-4 px-4 transition-colors cursor-pointer"
          >
            <div className="p-2 bg-gray-100 rounded-full text-gray-600">
              <MapPin size={20} />
            </div>
            <div>
              <p className="font-medium text-gray-800">{loc.name}</p>
              <p className="text-xs text-gray-400">{loc.address}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const BriefcaseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
);