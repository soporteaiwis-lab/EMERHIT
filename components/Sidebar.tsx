import React from 'react';
import { ViewState } from '../types';
import { Radio, Mic2, Calendar, MessageSquare, LogOut, Disc } from 'lucide-react';
import { LOGO_URL } from '../assets';

interface SidebarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, className = '' }) => {
  const navItems = [
    { id: 'discovery', label: 'Descubrir', icon: Radio },
    { id: 'events', label: 'Eventos', icon: Calendar },
    { id: 'messages', label: 'Mensajes', icon: MessageSquare },
    { id: 'artist_profile', label: 'Mi Perfil', icon: Mic2 },
  ];

  return (
    <aside className={`bg-zinc-950 border-r border-zinc-800 w-64 flex-col h-full ${className}`}>
      {/* Logo Area */}
      <div className="h-20 flex items-center px-6 border-b border-zinc-900">
        <img src={LOGO_URL} alt="EMERHIT" className="h-8 object-contain" />
      </div>

      {/* Navigation */}
      <div className="flex-1 py-6 px-3 space-y-1">
        <div className="px-3 mb-4">
            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Menu Principal</h3>
        </div>
        
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id as ViewState)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group
                ${isActive 
                  ? 'bg-zinc-900 text-green-400 border-l-2 border-green-500' 
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'
                }`}
            >
              <Icon size={20} className={isActive ? 'text-green-400' : 'text-zinc-500 group-hover:text-white'} />
              {item.label}
            </button>
          );
        })}

        <div className="px-3 mt-8 mb-4">
            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Tu Librería</h3>
        </div>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-900/50 transition">
             <Disc size={20} className="text-zinc-500" />
             Mis Tracks
        </button>
      </div>

      {/* Bottom Area */}
      <div className="p-4 border-t border-zinc-900">
        <button className="flex items-center gap-2 text-zinc-500 hover:text-red-400 text-sm font-medium transition pl-2">
            <LogOut size={18} />
            Cerrar Sesión
        </button>
      </div>
    </aside>
  );
};