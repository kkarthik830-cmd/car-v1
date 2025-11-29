import React from 'react';
import { MapPin, Navigation } from 'lucide-react';

export const MapPlaceholder = ({ 
  showUser = true, 
  showRoute = false,
  className = "h-full w-full" 
}: { 
  showUser?: boolean; 
  showRoute?: boolean;
  className?: string; 
}) => {
  return (
    <div className={`relative bg-gray-200 overflow-hidden ${className}`}>
      {/* Abstract Map Background Pattern */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'grayscale(100%) contrast(1.2)'
        }}
      />
      
      {/* Route Line Simulation */}
      {showRoute && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
          <path 
            d="M 180 350 Q 220 250 180 150" 
            stroke="black" 
            strokeWidth="4" 
            fill="none" 
            strokeDasharray="10 5"
            className="animate-pulse"
          />
        </svg>
      )}

      {/* User Location Pulse */}
      {showUser && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="relative">
            <div className="w-16 h-16 bg-lime-400/30 rounded-full animate-ping absolute inset-0"></div>
            <div className="w-4 h-4 bg-black border-2 border-white rounded-full relative top-6 left-6 shadow-lg"></div>
          </div>
        </div>
      )}

      {/* Destination Pin (if showing route) */}
      {showRoute && (
        <div className="absolute top-[130px] left-[165px] z-10">
          <MapPin className="text-red-500 fill-current drop-shadow-md" size={32} />
        </div>
      )}

      <div className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md z-20">
        <Navigation size={20} className="text-gray-700" />
      </div>
    </div>
  );
};