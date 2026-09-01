import React from 'react';

interface ScreenSwitcherProps {
  currentScreen: 'landing' | 'admin';
  onSwitch: (screen: 'landing' | 'admin') => void;
}

export const ScreenSwitcher: React.FC<ScreenSwitcherProps> = ({ currentScreen, onSwitch }) => {
  return (
    <div className="fixed bottom-6 left-6 z-50">
      <div className="bg-surface-container-lowest/95 backdrop-blur-md p-1.5 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.15)] border border-outline-variant/50 flex items-center gap-1">
        <button
          onClick={() => onSwitch('admin')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
            currentScreen === 'admin'
              ? 'bg-primary text-on-primary shadow-sm'
              : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">dashboard</span>
          <span>Admin Console</span>
        </button>

        <button
          onClick={() => onSwitch('landing')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
            currentScreen === 'landing'
              ? 'bg-primary text-on-primary shadow-sm'
              : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">storefront</span>
          <span>Toko / Landing Page</span>
        </button>
      </div>
    </div>
  );
};
