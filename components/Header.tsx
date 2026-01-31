import React, { useState, useRef, useEffect } from 'react';
import { Search, User, Menu, Bell, LogOut, Settings, ChevronDown } from 'lucide-react';
import { LOGO_URL } from '../assets';

interface HeaderProps {
  toggleMobileMenu: () => void;
  onLogout: () => void;
  userName?: string;
}

export const Navbar: React.FC<HeaderProps> = ({ toggleMobileMenu, onLogout, userName }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-30 bg-zinc-950/70 backdrop-blur-md border-b border-zinc-800 h-16 transition-all">
      <div className="flex items-center justify-between h-full px-4 md:px-8">
        
        {/* Mobile: Menu & Logo */}
        <div className="flex items-center gap-4 md:hidden">
          <button onClick={toggleMobileMenu} className="text-zinc-400 hover:text-white p-2">
            <Menu size={24} />
          </button>
          <div className="w-8 h-8 rounded-full overflow-hidden border border-zinc-700">
             <img src={LOGO_URL} alt="EMERHIT" className="w-full h-full object-cover scale-110" />
          </div>
        </div>

        {/* Desktop Search */}
        <div className="hidden md:flex flex-1 max-w-lg">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
            <input 
              type="text" 
              placeholder="Buscar artistas, radios o eventos..." 
              className="w-full bg-zinc-900/80 border border-zinc-800 text-zinc-200 text-sm rounded-full pl-10 pr-4 py-2.5 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all placeholder:text-zinc-600"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <button className="text-zinc-400 hover:text-white relative p-2 rounded-full hover:bg-zinc-800 transition">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-green-500 rounded-full border border-zinc-950"></span>
          </button>
          
          <div className="h-8 w-px bg-zinc-800 mx-1 hidden md:block"></div>

          {/* User Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button 
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-3 hover:bg-zinc-900 rounded-full py-1 pr-3 pl-1 transition border border-transparent hover:border-zinc-800"
            >
               <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-300 border border-zinc-700 overflow-hidden shadow-sm">
                  <User size={16} />
               </div>
               <div className="hidden md:flex flex-col items-start text-left">
                   <span className="text-sm font-bold text-white leading-none">{userName?.split(' ')[0] || 'Mi Cuenta'}</span>
                   <span className="text-[10px] text-zinc-500 leading-none mt-1">Ver Opciones</span>
               </div>
               <ChevronDown size={14} className={`text-zinc-500 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl py-2 z-50 animate-fade-in-down origin-top-right">
                     <div className="px-4 py-3 border-b border-zinc-800 mb-1">
                         <p className="text-xs text-zinc-500 uppercase font-bold tracking-wider mb-1">Conectado como</p>
                         <p className="text-sm font-bold text-white truncate">{userName || 'Usuario'}</p>
                     </div>
                     
                     <div className="py-1">
                        <button className="w-full text-left px-4 py-2.5 text-sm text-zinc-300 hover:text-white hover:bg-zinc-800 flex items-center gap-3 transition">
                            <User size={16} className="text-zinc-500" /> Mi Perfil
                        </button>
                        <button className="w-full text-left px-4 py-2.5 text-sm text-zinc-300 hover:text-white hover:bg-zinc-800 flex items-center gap-3 transition">
                            <Settings size={16} className="text-zinc-500" /> Configuración
                        </button>
                     </div>

                     <div className="border-t border-zinc-800 mt-1 py-1">
                        <button 
                            onClick={onLogout}
                            className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 flex items-center gap-3 transition font-medium"
                        >
                            <LogOut size={16} /> Cerrar Sesión
                        </button>
                     </div>
                </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};