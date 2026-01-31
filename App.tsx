import React, { useState } from 'react';
import { PlayerProvider } from './components/PlayerContext';
import { Navbar } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Player } from './components/Player';
import { RadioDiscovery } from './components/RadioDiscovery';
import { ArtistProfile } from './components/ArtistProfile';
import { LandingPage } from './components/LandingPage';
import { MOCK_ARTISTS } from './constants';
import { ViewState, Artist } from './types';
import { Calendar } from 'lucide-react';

function AppContent({ userRole, onLogout }: { userRole: 'artist' | 'radio', onLogout: () => void }) {
  const [currentView, setCurrentView] = useState<ViewState>('discovery');
  const [selectedArtist, setSelectedArtist] = useState<Artist>(MOCK_ARTISTS[0]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSelectArtist = (artist: Artist) => {
    setSelectedArtist(artist);
    setCurrentView('artist_profile');
  };

  const handleSetView = (view: ViewState) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="h-screen bg-zinc-950 text-zinc-200 font-sans selection:bg-green-500/30 overflow-hidden flex flex-col md:flex-row animate-fade-in">
      
      {/* Sidebar for Desktop */}
      <div className="hidden md:block h-full">
        <Sidebar currentView={currentView} setView={handleSetView} />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="w-64 h-full bg-zinc-950 shadow-2xl animate-slide-in-left" onClick={e => e.stopPropagation()}>
                <Sidebar currentView={currentView} setView={handleSetView} />
            </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full relative">
        <Navbar toggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
        
        <main className="flex-1 overflow-y-auto bg-zinc-950 pb-24 scroll-smooth">
          <div className="min-h-full">
            {currentView === 'discovery' && (
              <RadioDiscovery artists={MOCK_ARTISTS} onSelectArtist={handleSelectArtist} />
            )}
            
            {currentView === 'artist_profile' && (
              <ArtistProfile artist={selectedArtist} />
            )}

            {currentView === 'events' && (
               <div className="flex flex-col items-center justify-center h-[60vh] text-zinc-500 p-8 text-center animate-fade-in">
                  <Calendar size={64} className="mb-4 text-zinc-800" />
                  <h2 className="text-xl font-bold text-white mb-2">Cartelera de Eventos</h2>
                  <p>Explora conciertos y tocatas cerca de tu ciudad.</p>
                  <p className="text-sm mt-4 bg-zinc-900 px-3 py-1 rounded border border-zinc-800">Próximamente</p>
               </div>
            )}

            {currentView === 'messages' && (
               <div className="flex items-center justify-center h-[60vh] text-zinc-500 animate-fade-in">
                  <p>Módulo de mensajería en construcción...</p>
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
  const [userRole, setUserRole] = useState<'artist' | 'radio'>('radio');

  const handleLogin = (role: 'artist' | 'radio') => {
    setUserRole(role);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <LandingPage onEnterApp={handleLogin} />;
  }

  return (
    <PlayerProvider>
      <AppContent userRole={userRole} onLogout={handleLogout} />
    </PlayerProvider>
  );
}