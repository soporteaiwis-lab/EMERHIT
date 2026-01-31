import React from 'react';
import { Search, User, Menu, Bell } from 'lucide-react';
import { LOGO_URL } from '../assets';

interface HeaderProps {
  toggleMobileMenu: () => void;
}

export const Navbar: React.FC<HeaderProps> = ({ toggleMobileMenu }) => {
  return (
    <header className="sticky top-0 z-30 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 h-16">
      <div className="flex items-center justify-between h-full px-4 md:px-8">
        
        {/* Mobile: Menu & Logo */}
        <div className="flex items-center gap-4 md:hidden">
          <button onClick={toggleMobileMenu} className="text-zinc-400 hover:text-white">
            <Menu size={24} />
          </button>
          <img src={LOGO_URL} alt="EMERHIT" className="h-6 object-contain" />
        </div>

        {/* Desktop Search */}
        <div className="hidden md:flex flex-1 max-w-lg">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
            <input 
              type="text" 
              placeholder="Buscar artistas, radios o eventos..." 
              className="w-full bg-zinc-900 border border-zinc-800 text-zinc-200 text-sm rounded-full pl-10 pr-4 py-2 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all placeholder:text-zinc-600"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <button className="text-zinc-400 hover:text-white relative">
            <Bell size={20} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-zinc-950"></span>
          </button>
          
          <div className="h-8 w-px bg-zinc-800 mx-1 hidden md:block"></div>

          <button className="flex items-center gap-3 hover:bg-zinc-900 rounded-full py-1 pr-3 pl-1 transition">
             <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-300 border border-zinc-700 overflow-hidden">
                <User size={16} />
                {/* <img src="..." /> Real avatar would go here */}
             </div>
             <span className="hidden md:block text-sm font-medium text-white">Mi Cuenta</span>
          </button>
        </div>
      </div>
    </header>
  );
};