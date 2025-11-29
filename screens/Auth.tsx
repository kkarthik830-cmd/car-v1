import React, { useState, useEffect } from 'react';
import { useApp } from '../contexts/AppContext';
import { ScreenName } from '../types';
import { Button, Input, Header } from '../components/UI';
import { ArrowRight, Phone, CheckCircle } from 'lucide-react';

// --- Splash Screen ---
export const SplashScreen = () => {
  const { navigate } = useApp();

  useEffect(() => {
    const timer = setTimeout(() => navigate(ScreenName.ONBOARDING), 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-screen bg-black flex flex-col items-center justify-center text-white relative overflow-hidden">
      <div className="text-6xl font-bold tracking-tighter animate-pulse text-lime-400">Ola</div>
      <p className="mt-4 text-gray-400 text-sm tracking-widest uppercase">Moving You Forward</p>
      
      {/* Decorative circles */}
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-lime-400/20 rounded-full blur-3xl"></div>
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
    </div>
  );
};

// --- Onboarding Screen ---
export const OnboardingScreen = () => {
  const { navigate } = useApp();
  const [step, setStep] = useState(0);

  const slides = [
    {
      title: "Request a Ride",
      desc: "Request a ride get picked up by a nearby community driver",
      image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Confirm Your Driver",
      desc: "Huge network of drivers helps you find a comfortable, safe and cheap ride",
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Track Your Ride",
      desc: "Know your driver in advance and be able to view current location in real time",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80"
    }
  ];

  const handleNext = () => {
    if (step < slides.length - 1) setStep(step + 1);
    else navigate(ScreenName.LOGIN);
  };

  return (
    <div className="h-screen flex flex-col bg-white">
      <div className="flex-1 relative">
        <img 
          src={slides[step].image} 
          alt="Onboarding" 
          className="w-full h-full object-cover rounded-b-[40px]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-b-[40px]"></div>
      </div>
      
      <div className="p-8 flex flex-col items-center text-center">
        <h2 className="text-2xl font-bold mb-3 text-gray-900">{slides[step].title}</h2>
        <p className="text-gray-500 mb-8 leading-relaxed">{slides[step].desc}</p>
        
        <div className="flex gap-2 mb-8">
          {slides.map((_, i) => (
            <div key={i} className={`h-2 rounded-full transition-all duration-300 ${i === step ? 'w-8 bg-lime-400' : 'w-2 bg-gray-200'}`} />
          ))}
        </div>

        <Button fullWidth onClick={handleNext}>
          {step === slides.length - 1 ? "Get Started" : "Next"}
        </Button>
      </div>
    </div>
  );
};

// --- Login & OTP ---
export const LoginScreen = () => {
  const { navigate } = useApp();
  const [phone, setPhone] = useState('');

  return (
    <div className="h-screen bg-white p-6 flex flex-col">
      <div className="flex-1 flex flex-col justify-center">
        <h1 className="text-3xl font-bold mb-2">Enter your <br/>mobile number</h1>
        <p className="text-gray-500 mb-8">We will send you a confirmation code</p>
        
        <Input 
          icon={<Phone size={20} />}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="000 000 0000"
          type="tel"
          className="mb-6"
        />

        <Button onClick={() => navigate(ScreenName.OTP)} disabled={phone.length < 10}>
          Next
        </Button>
      </div>
      <p className="text-xs text-center text-gray-400 mt-auto pb-4">
        By continuing, you agree to our Terms of Service and Privacy Policy.
      </p>
    </div>
  );
};

export const OTPScreen = () => {
  const { navigate } = useApp();
  const [code, setCode] = useState('');

  return (
    <div className="h-screen bg-white flex flex-col">
      <Header onBack={() => navigate(ScreenName.LOGIN)} />
      <div className="p-6 flex-1">
        <h1 className="text-3xl font-bold mb-2">Verification Code</h1>
        <p className="text-gray-500 mb-8">We sent the code to your number</p>
        
        <div className="flex gap-4 justify-between mb-8">
           {[0, 1, 2, 3].map((_, i) => (
             <div key={i} className="w-14 h-14 rounded-xl border-2 border-gray-200 flex items-center justify-center text-2xl font-bold bg-gray-50">
               {code[i] || ""}
             </div>
           ))}
        </div>
        
        <Input 
          value={code} 
          onChange={(e) => setCode(e.target.value)} 
          placeholder="Enter OTP (1234)"
          className="mb-6"
        />

        <Button fullWidth onClick={() => navigate(ScreenName.HOME)} disabled={code.length < 4}>
          Verify
        </Button>
        
        <p className="text-center mt-6 text-sm text-gray-600 font-medium">
          Resend code in <span className="text-lime-600">00:30</span>
        </p>
      </div>
    </div>
  );
};