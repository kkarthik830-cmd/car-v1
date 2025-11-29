import React, { useState, useEffect } from 'react';
import { useApp } from '../contexts/AppContext';
import { ScreenName, Vehicle } from '../types';
import { MapPlaceholder } from '../components/Map';
import { Button, Header, Sheet } from '../components/UI';
import { User, Shield, Info, Phone, MessageSquare, X, CreditCard, Banknote } from 'lucide-react';

const mockVehicles: Vehicle[] = [
  { id: '1', name: 'Auto', type: 'auto', eta: 3, price: 145, currency: '₹', capacity: 3, description: 'Affordable auto rides', image: '🛺' },
  { id: '2', name: 'Mini', type: 'mini', eta: 5, price: 180, currency: '₹', capacity: 4, description: 'Comfy hatchbacks', image: '🚙' },
  { id: '3', name: 'Prime Sedan', type: 'sedan', eta: 8, price: 220, currency: '₹', capacity: 4, description: 'Spacious sedans', image: '🚘' },
  { id: '4', name: 'Bike', type: 'bike', eta: 2, price: 65, currency: '₹', capacity: 1, description: 'Beat the traffic', image: '🏍️' },
];

export const RideOptionsScreen = () => {
  const { navigate, goBack, setSelectedVehicle, selectedVehicle } = useApp();

  return (
    <div className="h-screen flex flex-col relative">
      <div className="absolute inset-0 z-0">
        <MapPlaceholder showRoute={true} className="h-2/3" />
      </div>
      
      <div className="absolute top-4 left-4 z-10">
        <button onClick={goBack} className="bg-white p-2 rounded-full shadow-lg">
          <div className="w-6 h-6 flex items-center justify-center font-bold">←</div>
        </button>
      </div>

      <div className="mt-auto bg-white rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-10 max-h-[60vh] flex flex-col">
        <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mt-3 mb-2 shrink-0" />
        <h3 className="text-center font-semibold text-gray-800 mb-2 py-2 border-b border-gray-100">Available Rides</h3>
        
        <div className="overflow-y-auto flex-1 p-2 pb-24">
          {mockVehicles.map(v => (
            <div 
              key={v.id}
              onClick={() => setSelectedVehicle(v)}
              className={`flex items-center p-4 mb-2 rounded-xl border transition-all cursor-pointer ${selectedVehicle?.id === v.id ? 'border-lime-500 bg-lime-50 ring-1 ring-lime-500' : 'border-transparent hover:bg-gray-50'}`}
            >
              <div className="text-4xl w-16 text-center">{v.image}</div>
              <div className="flex-1 px-3">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-gray-900">{v.name}</h4>
                  <span className="flex items-center text-[10px] bg-gray-100 px-1.5 py-0.5 rounded text-gray-600">
                    <User size={10} className="mr-0.5" /> {v.capacity}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">{v.eta} mins away • {v.description}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg">{v.currency}{v.price}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-white border-t border-gray-100 sticky bottom-0">
          <div className="flex items-center justify-between mb-3 px-1">
             <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
               <CreditCard size={16}/> Cash
             </div>
             <div className="text-sm text-lime-600 font-bold cursor-pointer">Coupons</div>
          </div>
          <Button 
            fullWidth 
            onClick={() => navigate(ScreenName.CONFIRM_RIDE)}
            disabled={!selectedVehicle}
          >
            Book {selectedVehicle?.name || "Ride"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export const ConfirmRideScreen = () => {
  const { navigate, goBack, selectedVehicle, pickupLocation, dropLocation } = useApp();
  const [isSearching, setIsSearching] = useState(false);

  const handleBook = () => {
    setIsSearching(true);
    // Simulate finding a driver
    setTimeout(() => {
      setIsSearching(false);
      navigate(ScreenName.TRACKING);
    }, 3000);
  };

  if (isSearching) {
    return (
      <div className="h-screen bg-white flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-lime-400 opacity-5 animate-pulse"></div>
        <div className="w-32 h-32 rounded-full border-4 border-lime-400/30 flex items-center justify-center animate-ping absolute"></div>
        <div className="w-24 h-24 rounded-full bg-lime-400 flex items-center justify-center shadow-lg z-10 mb-8">
           <span className="text-4xl animate-bounce">{selectedVehicle?.image}</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Connecting nearby drivers...</h2>
        <p className="text-gray-500">Please wait while we find you a ride</p>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
       <Header title="Confirm Booking" onBack={goBack} />
       
       <div className="flex-1 p-4 overflow-y-auto">
         {/* Map Preview */}
         <div className="h-48 rounded-xl overflow-hidden mb-6 shadow-md border border-gray-200">
           <MapPlaceholder showRoute={true} className="h-full w-full" />
         </div>

         {/* Trip Details Card */}
         <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 mb-4">
            <div className="relative pl-6 space-y-8 border-l-2 border-dashed border-gray-200 ml-2">
               <div className="relative">
                 <div className="absolute -left-[31px] w-4 h-4 rounded-full bg-lime-500 ring-4 ring-white"></div>
                 <div className="text-xs text-gray-400 uppercase font-bold mb-1">Pickup</div>
                 <div className="font-medium text-gray-900">{pickupLocation?.name || "Current Location"}</div>
               </div>
               <div className="relative">
                 <div className="absolute -left-[31px] w-4 h-4 rounded-full bg-red-500 ring-4 ring-white"></div>
                 <div className="text-xs text-gray-400 uppercase font-bold mb-1">Drop-off</div>
                 <div className="font-medium text-gray-900">{dropLocation?.name || "Select Destination"}</div>
               </div>
            </div>
         </div>

         {/* Fare Breakdown */}
         <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-semibold mb-4 text-gray-800">Bill Details</h3>
            <div className="flex justify-between mb-2 text-sm text-gray-600">
              <span>Trip Fare</span>
              <span>{selectedVehicle?.currency}{selectedVehicle?.price}</span>
            </div>
            <div className="flex justify-between mb-2 text-sm text-gray-600">
              <span>Access Fee</span>
              <span>{selectedVehicle?.currency}15</span>
            </div>
            <div className="h-px bg-gray-100 my-3"></div>
            <div className="flex justify-between font-bold text-lg text-gray-900">
              <span>Total</span>
              <span>{selectedVehicle?.currency}{(selectedVehicle?.price || 0) + 15}</span>
            </div>
         </div>
       </div>

       <div className="p-4 bg-white border-t shadow-lg">
          <Button fullWidth onClick={handleBook}>Confirm Booking</Button>
       </div>
    </div>
  );
};

export const TrackingScreen = () => {
  const { navigate, selectedVehicle } = useApp();
  const [status, setStatus] = useState("Arriving in 3 mins");

  useEffect(() => {
    // Simulate ride lifecycle
    const t1 = setTimeout(() => setStatus("Driver has arrived"), 5000);
    const t2 = setTimeout(() => setStatus("On trip to destination"), 8000);
    const t3 = setTimeout(() => navigate(ScreenName.INVOICE), 12000); // Ride ends
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [navigate]);

  return (
    <div className="h-screen flex flex-col relative">
      <div className="absolute inset-0">
        <MapPlaceholder showUser={true} showRoute={true} className="h-full" />
      </div>

      <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/50 to-transparent text-white pt-6 pb-12">
        <h2 className="text-xl font-bold text-center">{status}</h2>
      </div>

      <div className="mt-auto bg-white rounded-t-3xl p-5 shadow-2xl relative z-10">
        {/* Driver Card */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 bg-gray-200 rounded-full overflow-hidden border-2 border-white shadow-md">
            <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&q=80" alt="Driver" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg">Rajesh Kumar</h3>
            <div className="flex items-center gap-2 text-sm text-gray-500">
               <span className="bg-gray-100 px-2 rounded font-mono text-gray-800 font-bold">KA 05 MN 1234</span>
               <span>• {selectedVehicle?.name}</span>
            </div>
          </div>
          <div className="flex flex-col items-center">
             <span className="font-bold text-yellow-500 flex items-center gap-1">4.9 ★</span>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-4 gap-4 mb-6">
           <ActionButton icon={<Phone size={20}/>} label="Call" />
           <ActionButton icon={<MessageSquare size={20}/>} label="Chat" />
           <ActionButton icon={<Shield size={20}/>} label="Safety" />
           <ActionButton icon={<Info size={20}/>} label="Support" />
        </div>

        {/* Cancel */}
        <div className="border-t border-gray-100 pt-4 text-center">
           <button onClick={() => navigate(ScreenName.HOME)} className="text-red-500 font-semibold text-sm">Cancel Ride</button>
        </div>
      </div>
    </div>
  );
};

const ActionButton = ({ icon, label }: { icon: any, label: string }) => (
  <button className="flex flex-col items-center gap-2 group">
    <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-700 group-hover:bg-gray-100 group-active:scale-95 transition-all">
      {icon}
    </div>
    <span className="text-xs font-medium text-gray-600">{label}</span>
  </button>
);


export const InvoiceScreen = () => {
  const { navigate, selectedVehicle } = useApp();
  const total = (selectedVehicle?.price || 0) + 15;

  return (
    <div className="h-screen bg-lime-400 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden relative">
        <div className="bg-gray-900 p-6 text-white text-center">
           <div className="w-16 h-16 bg-lime-400 rounded-full mx-auto mb-3 flex items-center justify-center text-black">
             <CheckCircleIcon />
           </div>
           <h2 className="text-2xl font-bold">Ride Completed</h2>
           <p className="text-gray-400 text-sm">Hope you had a safe journey!</p>
        </div>
        
        <div className="p-8">
           <div className="text-center mb-8">
             <span className="text-gray-500 text-sm uppercase tracking-wider">Total Amount</span>
             <h1 className="text-4xl font-bold text-gray-900 mt-2">{selectedVehicle?.currency}{total}</h1>
           </div>

           <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <Banknote className="text-green-600" />
                <span className="font-medium">Paid via Cash</span>
              </div>
           </div>

           <div className="text-center">
             <p className="mb-4 font-semibold text-gray-700">Rate your driver</p>
             <div className="flex justify-center gap-2 mb-8">
               {[1,2,3,4,5].map(s => (
                 <Star key={s} className="text-gray-300 hover:text-yellow-400 cursor-pointer transition-colors" size={32} fill="currentColor" />
               ))}
             </div>
             
             <Button fullWidth onClick={() => navigate(ScreenName.HOME)}>Back to Home</Button>
           </div>
        </div>
        
        {/* Receipt Cutout Effect */}
        <div className="absolute top-[138px] -left-3 w-6 h-6 bg-lime-400 rounded-full"></div>
        <div className="absolute top-[138px] -right-3 w-6 h-6 bg-lime-400 rounded-full"></div>
      </div>
    </div>
  );
};

const CheckCircleIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
);
const Star = ({ className, size, fill }: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill={fill || "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
);