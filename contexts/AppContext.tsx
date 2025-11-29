import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ScreenName, LocationData, Vehicle, User } from '../types';

interface AppContextType {
  currentScreen: ScreenName;
  navigate: (screen: ScreenName) => void;
  goBack: () => void;
  
  // Booking State
  pickupLocation: LocationData | null;
  dropLocation: LocationData | null;
  setPickupLocation: (loc: LocationData) => void;
  setDropLocation: (loc: LocationData) => void;
  
  selectedVehicle: Vehicle | null;
  setSelectedVehicle: (v: Vehicle | null) => void;
  
  user: User;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const defaultUser: User = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+91 98765 43210",
  rating: 4.8
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [screenStack, setScreenStack] = useState<ScreenName[]>([ScreenName.SPLASH]);
  const [pickupLocation, setPickupLocation] = useState<LocationData | null>(null);
  const [dropLocation, setDropLocation] = useState<LocationData | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const currentScreen = screenStack[screenStack.length - 1];

  const navigate = (screen: ScreenName) => {
    setScreenStack(prev => [...prev, screen]);
  };

  const goBack = () => {
    if (screenStack.length > 1) {
      setScreenStack(prev => prev.slice(0, -1));
    }
  };

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        navigate,
        goBack,
        pickupLocation,
        setPickupLocation,
        dropLocation,
        setDropLocation,
        selectedVehicle,
        setSelectedVehicle,
        user: defaultUser,
        isDarkMode,
        toggleTheme
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};