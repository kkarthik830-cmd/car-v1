import React from 'react';
import { useApp } from '../contexts/AppContext';
import { ScreenName } from '../types';
import { Header } from '../components/UI';
import { User, MapPin, CreditCard, Bell, Settings, LogOut, HelpCircle, ChevronRight } from 'lucide-react';

export const ProfileScreen = () => {
  const { goBack, user, navigate } = useApp();

  const menuItems = [
    { icon: <MapPin size={20} />, label: "Your Rides" },
    { icon: <CreditCard size={20} />, label: "Payment Methods" },
    { icon: <Bell size={20} />, label: "Notifications" },
    { icon: <Settings size={20} />, label: "Settings" },
    { icon: <HelpCircle size={20} />, label: "Support & Help" },
  ];

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      <Header title="My Profile" onBack={goBack} />

      <div className="p-4">
        {/* Profile Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6 flex items-center gap-4">
          <div className="w-16 h-16 bg-lime-100 rounded-full flex items-center justify-center text-lime-600 border-2 border-white shadow-sm">
            <User size={32} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
            <p className="text-gray-500 text-sm">{user.phone}</p>
            <p className="text-gray-400 text-xs mt-1">{user.email}</p>
          </div>
        </div>

        {/* Menu Items */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {menuItems.map((item, index) => (
            <button 
              key={index}
              className="w-full flex items-center justify-between p-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-4 text-gray-700 font-medium">
                <span className="text-gray-400">{item.icon}</span>
                {item.label}
              </div>
              <ChevronRight size={18} className="text-gray-300" />
            </button>
          ))}
        </div>

        {/* Logout */}
        <button 
          onClick={() => navigate(ScreenName.LOGIN)}
          className="w-full mt-6 bg-red-50 text-red-600 p-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-red-100 transition-colors"
        >
          <LogOut size={20} /> Logout
        </button>
        
        <p className="text-center text-gray-300 text-xs mt-8">App Version 1.0.0 (Mock)</p>
      </div>
    </div>
  );
};