import React, { useState, useEffect } from 'react';
import { PlayerProvider } from './components/PlayerContext';
import { Navbar } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Player } from './components/Player';
import { RadioDiscovery } from './components/RadioDiscovery';
import { ArtistProfile } from './components/ArtistProfile';
import { LandingPage } from './components/LandingPage';
import { AdminDashboard } from './components/AdminDashboard';
import { MyTracks } from './components/MyTracks';
import { MOCK_ARTISTS, MOCK_MESSAGES, ALL_EVENTS } from './constants';
import { ViewState, Artist, UserRole, UserStatus } from './types';
import { Calendar, MapPin, Ticket, MessageSquare, Clock, CheckCircle2, Search, Download, AlertTriangle, Lock } from 'lucide-react';
import { mockDB } from './services/mockDatabase';

function AppContent({ userRole, userStatus, onLogout, userName }: { userRole: UserRole, userStatus: UserStatus, onLogout: () => void, userName?: string }) {
  const [currentView, setCurrentView] = useState<ViewState>('discovery');
  const [selectedArtist, setSelectedArtist] = useState<Artist>(MOCK_ARTISTS[0]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Default view based on role
  useEffect(() => {
    if (userRole === 'admin') setCurrentView('admin_dashboard');
    else if (userRole === 'radio') setCurrentView('discovery');
    else if (userRole === 'producer') setCurrentView('discovery');
    else setCurrentView('discovery'); // Artist default
  }, [userRole]);

  const handleSelectArtist = (artist: Artist) => {
    setSelectedArtist(artist);
    setCurrentView('artist_profile');
  };

  const handleSetView = (view: ViewState) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false);
  };

  // Rejected View
  if (userStatus === 'rejected') {
      return (
          <div className="h-screen bg-zinc-950 flex flex-col items-center justify-center text-center p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]"></div>
              <div className="orb orb-3" style={{ opacity: 0.2 }}></div>

              <div className="bg-red-500/10 p-6 rounded-full mb-6 backdrop-blur-sm border border-red-500/20">
                  <Lock size={48} className="text-red-500" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-4">Acceso Denegado</h1>
              <p className="text-zinc-400 max-w-md mb-8">
                  Lo sentimos, tu perfil no cumple con los requisitos actuales de la plataforma EMERHIT. 
                  Te invitamos a intentarlo nuevamente en el futuro.
              </p>
              <button onClick={onLogout} className="bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-3 rounded-lg font-bold transition z-10">
                  Volver al Inicio
              </button>
          </div>
      );
  }

  return (
    <div className="h-screen font-sans selection:bg-green-500/30 overflow-hidden flex flex-col md:flex-row animate-fade-in relative text-zinc-200">
      
      {/* GLOBAL BACKGROUND (Aurora Effect) */}
      <div className="animated-bg">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
          <div className="orb orb-3"></div>
      </div>
      
      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05]"></div>

      {/* Sidebar for Desktop */}
      <div className="hidden md:block h-full z-20 shadow-2xl">
        <Sidebar currentView={currentView} setView={handleSetView} userRole={userRole} onLogout={onLogout} />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="w-72 h-full bg-zinc-950 shadow-2xl animate-slide-in-left border-r border-zinc-800" onClick={e => e.stopPropagation()}>
                <Sidebar currentView={currentView} setView={handleSetView} userRole={userRole} onLogout={onLogout} />
            </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full relative z-10 bg-transparent">
        
        {/* PENDING STATUS BANNER */}
        {userStatus === 'pending' && (
            <div className="bg-yellow-600/20 border-b border-yellow-600/40 text-yellow-500 px-4 py-2 text-sm flex items-center justify-center gap-2 backdrop-blur-md">
                <AlertTriangle size={16} />
                <span className="font-bold">PERFIL EN ESPERA:</span> Tu cuenta está bajo evaluación. Algunas funciones están limitadas hasta ser aceptado.
            </div>
        )}

        {/* Updated Navbar with Logout Prop */}
        <Navbar 
            toggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            onLogout={onLogout} 
            userName={userName}
        />
        
        <main className="flex-1 overflow-y-auto pb-24 scroll-smooth">
          <div className="min-h-full">
            {/* --- ADMIN VIEWS --- */}
            {currentView === 'admin_dashboard' && <AdminDashboard />}

            {/* --- ARTIST/PRODUCER UPLOADS --- */}
            {currentView === 'my_tracks' && <MyTracks />}

            {/* --- RADIO VIEWS --- */}
            {currentView === 'radio_downloads' && (
                <div className="flex flex-col items-center justify-center h-[60vh] text-zinc-500 p-8 text-center animate-fade-in">
                    <Download size={64} className="mb-4 text-green-500 opacity-50" />
                    <h2 className="text-xl font-bold text-white mb-2">Historial de Descargas</h2>
                    <p>Aquí aparecerán las canciones que has descargado para tu emisora.</p>
                </div>
            )}
             
             {/* --- PRODUCER SPECIFIC --- */}
             {currentView === 'producer_portfolio' && (
                 <div className="flex flex-col items-center justify-center h-[60vh] text-zinc-500 p-8 text-center animate-fade-in">
                    <div className="bg-purple-500/20 p-6 rounded-full mb-4">
                        <CheckCircle2 size={48} className="text-purple-500" />
                    </div>
                    <h2 className="text-xl font-bold text-white mb-2">Portfolio de Productor</h2>
                    <p>Gestiona tus servicios de mezcla, mastering y beatmaking.</p>
                 </div>
             )}

            {/* --- SHARED VIEWS --- */}
            {currentView === 'discovery' && (
              <RadioDiscovery artists={MOCK_ARTISTS} onSelectArtist={handleSelectArtist} />
            )}
            
            {currentView === 'artist_profile' && (
              <ArtistProfile artist={selectedArtist} />
            )}

            {currentView === 'events' && (
               <div className="max-w-5xl mx-auto px-4 md:px-8 py-8 animate-fade-in">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
                      <div>
                          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                              <Calendar className="text-green-500" /> Agenda de Eventos
                          </h1>
                          <p className="text-zinc-400">Próximos conciertos y festivales en la red EMERHIT.</p>
                      </div>
                      <button className="bg-zinc-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-zinc-700 transition w-full md:w-auto">
                          Filtrar por Ciudad
                      </button>
                  </div>

                  <div className="grid gap-6">
                      {ALL_EVENTS.map((event) => (
                          <div key={event.id} className="bg-zinc-900/50 backdrop-blur border border-zinc-800 rounded-xl p-4 md:p-6 flex flex-col md:flex-row gap-6 hover:border-green-500/30 transition group">
                              <div className="w-full md:w-48 h-48 md:h-32 flex-shrink-0 rounded-lg overflow-hidden relative">
                                  <img src={event.flyerUrl || "https://placehold.co/400x300"} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                                  <div className="absolute top-2 right-2 bg-zinc-950/80 backdrop-blur text-white text-xs font-bold px-2 py-1 rounded">
                                      {new Date(event.date).toLocaleDateString()}
                                  </div>
                              </div>
                              <div className="flex-1">
                                  <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                                  <div className="flex flex-wrap gap-4 text-sm text-zinc-400 mb-4">
                                      <span className="flex items-center gap-1"><MapPin size={14} className="text-green-500" /> {event.location.venue}, {event.location.city}</span>
                                      <span className="flex items-center gap-1"><Clock size={14} /> {new Date(event.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} HRS</span>
                                  </div>
                                  <p className="text-zinc-500 text-sm mb-4 max-w-2xl">{event.description}</p>
                                  <div className="flex gap-3">
                                      <button className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-bold transition flex items-center gap-2 shadow-lg shadow-green-900/20">
                                          <Ticket size={16} /> Tickets
                                      </button>
                                      <button className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
                                          Ver Detalles
                                      </button>
                                  </div>
                              </div>
                          </div>
                      ))}
                  </div>
               </div>
            )}

            {currentView === 'messages' && (
               <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 animate-fade-in h-[calc(100vh-140px)] flex flex-col">
                  <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div>
                        <h1 className="text-3xl font-bold text-white mb-1 flex items-center gap-3">
                            <MessageSquare className="text-green-500" /> Mensajería {userRole === 'admin' && "(Soporte)"}
                        </h1>
                        <p className="text-zinc-400 text-sm">
                            {userRole === 'radio' ? 'Contacta artistas o al soporte técnico.' : 'Gestiona tus comunicaciones.'}
                        </p>
                      </div>
                      <div className="relative w-full md:w-auto">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                          <input type="text" placeholder="Buscar mensajes..." className="bg-zinc-900 border border-zinc-800 text-sm rounded-full pl-9 pr-4 py-2 focus:outline-none focus:border-green-500 w-full md:w-64" />
                      </div>
                  </div>

                  <div className="flex-1 bg-zinc-900/50 backdrop-blur border border-zinc-800 rounded-xl overflow-hidden flex flex-col md:flex-row">
                      {/* Sidebar List */}
                      <div className="w-full md:w-1/3 border-r border-zinc-800 overflow-y-auto">
                          {MOCK_MESSAGES.map((msg) => (
                              <div key={msg.id} className="p-4 border-b border-zinc-800 hover:bg-zinc-800/50 cursor-pointer transition relative group">
                                  {!msg.readStatus && (
                                      <div className="absolute top-4 right-4 w-2 h-2 bg-green-500 rounded-full"></div>
                                  )}
                                  <h4 className="text-white font-bold text-sm mb-1">{msg.subject}</h4>
                                  <div className="flex justify-between items-center text-xs text-zinc-500 mb-2">
                                      <span>De: Radio Partner</span>
                                      <span>{new Date(msg.timestamp).toLocaleDateString()}</span>
                                  </div>
                                  <p className="text-zinc-400 text-xs line-clamp-2">{msg.body}</p>
                              </div>
                          ))}
                      </div>

                      {/* Detail View (Mocked for simulation) */}
                      <div className="hidden md:flex flex-1 flex-col bg-zinc-950/30">
                          <div className="p-6 border-b border-zinc-800 flex justify-between items-start">
                              <div>
                                  <h2 className="text-xl font-bold text-white mb-2">{MOCK_MESSAGES[0].subject}</h2>
                                  <div className="flex items-center gap-3">
                                      <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 font-bold text-xs">RV</div>
                                      <div className="text-sm">
                                          <p className="text-white font-medium">Radio Valparaíso Indie</p>
                                          <p className="text-zinc-500 text-xs">programacion@valpaindie.cl</p>
                                      </div>
                                  </div>
                              </div>
                              <span className="text-xs text-zinc-500 bg-zinc-900 px-2 py-1 rounded border border-zinc-800">Bandeja de Entrada</span>
                          </div>
                          
                          <div className="flex-1 p-6 overflow-y-auto">
                              <p className="text-zinc-300 leading-relaxed whitespace-pre-wrap">{MOCK_MESSAGES[0].body}</p>
                              <div className="mt-8 p-4 bg-zinc-900/50 rounded-lg border border-zinc-800 flex items-center gap-4">
                                  <div className="bg-green-500/10 p-3 rounded-lg text-green-500">
                                      <CheckCircle2 size={24} />
                                  </div>
                                  <div>
                                      <h5 className="text-white font-bold text-sm">Propuesta de Interés</h5>
                                      <p className="text-zinc-500 text-xs">Esta radio tiene un 85% de compatibilidad con tu género.</p>
                                  </div>
                              </div>
                          </div>

                          <div className="p-4 border-t border-zinc-800 bg-zinc-900/50">
                              <textarea placeholder="Escribe una respuesta..." className="w-full bg-zinc-950/50 border border-zinc-800 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-green-500 resize-none h-24"></textarea>
                              <div className="flex justify-end mt-2">
                                  <button className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-lg text-sm font-bold transition">Enviar Respuesta</button>
                              </div>
                          </div>
                      </div>
                  </div>
               </div>
            )}
          </div>
        </main>

        <Player />
      </div>
    </div>
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>('artist');
  const [userStatus, setUserStatus] = useState<UserStatus>('active');
  const [userName, setUserName] = useState('Usuario');

  // Initialize DB and Load from local storage on mount
  useEffect(() => {
      mockDB.initialize();

      const storedUser = localStorage.getItem('emerhit_user');
      if (storedUser) {
          const parsed = JSON.parse(storedUser);
          
          // Refresh user data from DB to get latest status
          const latestUser = mockDB.login(parsed.email); 
          if (latestUser) {
             setUserName(latestUser.name);
             setUserRole(latestUser.role);
             setUserStatus(latestUser.status);
             setIsAuthenticated(true);
          } else {
             // Fallback if local storage user not in DB (edge case)
             setUserName(parsed.name);
             setUserRole(parsed.role);
             setUserStatus(parsed.status);
             setIsAuthenticated(true);
          }
      }
  }, []);

  const handleLogin = (role: UserRole, name: string = 'Usuario', status: string = 'active') => {
    setUserRole(role);
    setUserName(name);
    setUserStatus(status as UserStatus);
    setIsAuthenticated(true);
    
    // Also save simple session to localstorage (separate from DB)
    localStorage.setItem('emerhit_user', JSON.stringify({
        name: name,
        role: role,
        status: status,
        email: 'session@current.com' // Placeholder for session refresh
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem('emerhit_user');
    setIsAuthenticated(false);
    setUserRole('artist'); // reset to default
  };

  if (!isAuthenticated) {
    return <LandingPage onEnterApp={handleLogin} />;
  }

  return (
    <PlayerProvider>
      <AppContent userRole={userRole} userStatus={userStatus} onLogout={handleLogout} userName={userName} />
    </PlayerProvider>
  );
}