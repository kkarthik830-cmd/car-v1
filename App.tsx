import React from 'react';
import { AppProvider, useApp } from './contexts/AppContext';
import { ScreenName } from './types';

// Screens
import { SplashScreen, OnboardingScreen, LoginScreen, OTPScreen } from './screens/Auth';
import { HomeScreen, SearchScreen } from './screens/Home';
import { RideOptionsScreen, ConfirmRideScreen, TrackingScreen, InvoiceScreen } from './screens/Booking';
import { ProfileScreen } from './screens/Profile';

const ScreenManager = () => {
  const { currentScreen } = useApp();

  const renderScreen = () => {
    switch (currentScreen) {
      case ScreenName.SPLASH: return <SplashScreen />;
      case ScreenName.ONBOARDING: return <OnboardingScreen />;
      case ScreenName.LOGIN: return <LoginScreen />;
      case ScreenName.OTP: return <OTPScreen />;
      case ScreenName.HOME: return <HomeScreen />;
      case ScreenName.SEARCH: return <SearchScreen />;
      case ScreenName.RIDE_OPTIONS: return <RideOptionsScreen />;
      case ScreenName.CONFIRM_RIDE: return <ConfirmRideScreen />;
      case ScreenName.TRACKING: return <TrackingScreen />;
      case ScreenName.INVOICE: return <InvoiceScreen />;
      case ScreenName.PROFILE: return <ProfileScreen />;
      default: return <SplashScreen />;
    }
  };

  return (
    <div className="antialiased text-gray-900 bg-gray-100 min-h-screen flex justify-center">
      <div className="w-full max-w-md bg-white shadow-2xl overflow-hidden relative min-h-screen sm:min-h-[800px] sm:h-[800px] sm:my-8 sm:rounded-[40px]">
        {renderScreen()}
      </div>
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <ScreenManager />
    </AppProvider>
  );
}

export default App;