export enum ScreenName {
  SPLASH = 'SPLASH',
  ONBOARDING = 'ONBOARDING',
  LOGIN = 'LOGIN',
  OTP = 'OTP',
  HOME = 'HOME',
  SEARCH = 'SEARCH',
  RIDE_OPTIONS = 'RIDE_OPTIONS',
  CONFIRM_RIDE = 'CONFIRM_RIDE',
  TRACKING = 'TRACKING',
  INVOICE = 'INVOICE',
  PROFILE = 'PROFILE',
  MENU = 'MENU'
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface LocationData {
  id: string;
  name: string;
  address: string;
  type: 'home' | 'work' | 'recent' | 'search';
}

export interface Vehicle {
  id: string;
  name: string;
  type: 'auto' | 'mini' | 'prime' | 'bike' | 'sedan' | 'suv';
  eta: number; // minutes
  price: number;
  currency: string;
  image: string;
  capacity: number;
  description: string;
}

export interface Driver {
  name: string;
  rating: number;
  vehicleNumber: string;
  phone: string;
  photoUrl: string;
}

export interface User {
  name: string;
  email: string;
  phone: string;
  rating: number;
}