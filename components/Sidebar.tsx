import React from 'react';
import { ViewState, UserRole } from '../types';
import { Radio, Mic2, Calendar, MessageSquare, LogOut, Disc, Shield, Download, Settings, Globe, Headphones, Music4 } from 'lucide-react';
import { LOGO_URL } from '../assets';

interface SidebarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  userRole: UserRole;
  onLogout: () => void;
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, userRole, onLogout, className = '' }) => {
  
  // Define menus based on role
  const getMenu = () => {
      if (userRole === 'admin') {
          return [
              { id: 'admin_dashboard', label: 'Gestión General', icon: Shield },
              { id: 'messages', label: 'Soporte', icon: MessageSquare },
              { id: 'discovery', label: 'Ver Plataforma', icon: Globe },
          ];
      }
      if (userRole === 'radio') {
          return [
              { id: 'discovery', label: 'Descubrir Música', icon: Radio },
              { id: 'radio_downloads', label: 'Mis Descargas', icon: Download },
              { id: 'messages', label: 'Mensajes', icon: MessageSquare },
              { id: 'events', label: 'Agenda Local', icon: Calendar },
          ];
      }
      if (userRole === 'producer') {
          return [
              { id: 'discovery', label: 'Explorar Talentos', icon: Globe },
              { id: 'producer_portfolio', label: 'Mi Portfolio', icon: Headphones },
              { id: 'messages', label: 'Mensajes', icon: MessageSquare },
          ];
      }
      // Default: Artist
      return [
          { id: 'discovery', label: 'Explorar', icon: Globe },
          { id: 'events', label: 'Mis Eventos', icon: Calendar },
          { id: 'messages', label: 'Mensajes', icon: MessageSquare },
          { id: 'artist_profile', label: 'Mi Perfil', icon: Mic2 },
      ];
  };

  const menuItems = getMenu();

  return (
    <aside className={`bg-zinc-950/90 backdrop-blur-md border-r border-zinc-800 w-64 flex flex-col h-full ${className}`}>
      {/* Logo Area */}
      <div className="h-24 flex items-center px-6 border-b border-zinc-900 bg-zinc-950/50">
        <div className="w-10 h-10 rounded-full overflow-hidden shadow-[0_0_15px_rgba(34,197,94,0.3)] border-2 border-zinc-800">
             <img src={LOGO_URL} alt="EMERHIT" className="w-full h-full object-cover scale-110" />
        </div>
        <span className="ml-3 font-bold text-xl tracking-tight text-white">EMERHIT</span>
        {userRole === 'admin' && <span className="ml-2 text-[8px] bg-red-500 text-white px-1.5 py-0.5 rounded font-bold self-start mt-1">ADMIN</span>}
        {userRole === 'radio' && <span className="ml-2 text-[8px] bg-blue-500 text-white px-1.5 py-0.5 rounded font-bold self-start mt-1">RADIO</span>}
        {userRole === 'producer' && <span className="ml-2 text-[8px] bg-purple-500 text-white px-1.5 py-0.5 rounded font-bold self-start mt-1">PROD</span>}
      </div>

      {/* Navigation */}
      <div className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
        <div className="px-3 mb-4">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Menu Principal</h3>
        </div>
        
        {menuItems.map((item) => {
          const Icon = item.icon as any;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id as ViewState)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group
                ${isActive 
                  ? 'bg-zinc-800/80 text-green-400 shadow-lg' 
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/40'
                }`}
            >
              <Icon size={20} className={isActive ? 'text-green-400' : 'text-zinc-500 group-hover:text-white'} />
              {item.label}
            </button>
          );
        })}

        {(userRole === 'artist' || userRole === 'producer') && (
            <>
                <div className="px-3 mt-8 mb-4">
                    <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Tu Material</h3>
                </div>
                <button 
                    onClick={() => setView('my_tracks')}
                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold transition group
                    ${currentView === 'my_tracks' ? 'bg-zinc-800/80 text-white shadow-lg' : 'text-zinc-400 hover:text-white hover:bg-zinc-800/40'}`}
                >
                    <Disc size={20} className={currentView === 'my_tracks' ? 'text-green-500' : 'text-zinc-500'} />
                    {userRole === 'producer' ? 'Mis Beats/Demos' : 'Mis Tracks'}
                </button>
            </>
        )}

        {userRole === 'admin' && (
            <>
                 <div className="px-3 mt-8 mb-4">
                    <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Configuración</h3>
                </div>
                <button className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold text-zinc-400 hover:text-white hover:bg-zinc-800/40 transition">
                    <Settings size={20} /> Ajustes Plataforma
                </button>
            </>
        )}
      </div>

      {/* Bottom Area */}
      <div className="p-4 border-t border-zinc-900 bg-zinc-950/30">
        <button 
            onClick={onLogout}
            className="w-full flex items-center gap-2 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 px-3 py-2 rounded-lg text-sm font-medium transition"
        >
            <LogOut size={18} />
            Cerrar Sesión
        </button>
      </div>
    </aside>
  );
};