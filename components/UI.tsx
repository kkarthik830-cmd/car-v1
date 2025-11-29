import React from 'react';
import { ChevronLeft } from 'lucide-react';

export const Button = ({ 
  onClick, 
  children, 
  variant = 'primary', 
  className = '', 
  fullWidth = false,
  disabled = false
}: { 
  onClick?: () => void, 
  children: React.ReactNode, 
  variant?: 'primary' | 'secondary' | 'outline' | 'danger',
  className?: string,
  fullWidth?: boolean,
  disabled?: boolean
}) => {
  const baseStyles = "py-3.5 px-6 rounded-lg font-semibold transition-all duration-200 active:scale-95 flex items-center justify-center";
  
  const variants = {
    primary: "bg-lime-400 hover:bg-lime-500 text-black shadow-md",
    secondary: "bg-gray-900 text-white hover:bg-gray-800",
    outline: "border-2 border-gray-200 bg-transparent text-gray-700 hover:bg-gray-50",
    danger: "bg-red-50 text-red-600 hover:bg-red-100"
  };

  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {children}
    </button>
  );
};

export const Header = ({ 
  title, 
  onBack,
  rightAction 
}: { 
  title?: string, 
  onBack?: () => void,
  rightAction?: React.ReactNode 
}) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white sticky top-0 z-20 shadow-sm">
      <div className="flex items-center gap-3">
        {onBack && (
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
            <ChevronLeft size={24} />
          </button>
        )}
        {title && <h1 className="text-lg font-semibold text-gray-800">{title}</h1>}
      </div>
      {rightAction && <div>{rightAction}</div>}
    </div>
  );
};

export const Input = ({
  value,
  onChange,
  placeholder,
  icon,
  type = "text",
  className = ""
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  icon?: React.ReactNode;
  type?: string;
  className?: string;
}) => (
  <div className={`relative flex items-center bg-gray-50 rounded-lg border border-gray-200 focus-within:border-black focus-within:ring-1 focus-within:ring-black transition-all ${className}`}>
    {icon && <span className="pl-4 text-gray-500">{icon}</span>}
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full bg-transparent p-4 outline-none text-gray-800 placeholder-gray-400"
    />
  </div>
);

export const Sheet = ({ children, isOpen }: { children: React.ReactNode, isOpen: boolean }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-[0_-5px_20px_rgba(0,0,0,0.1)] p-5 z-30 animate-slide-up pb-8 max-w-md mx-auto">
      <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6" />
      {children}
    </div>
  );
};