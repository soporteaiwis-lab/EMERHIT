import React, { useState } from 'react';
import { LOGO_URL } from '../assets';
import { Radio, Mic2, X, User, Headphones, Link as LinkIcon, CheckCircle2, AlertTriangle, Facebook } from 'lucide-react';
import { UserRole } from '../types';
import { mockDB } from '../services/mockDatabase';

interface LandingPageProps {
  onEnterApp: (role: UserRole, userName: string, status: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp }) => {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [registerRole, setRegisterRole] = useState<UserRole | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', demoUrl: '' });
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);

  const handleOpenRegister = (role: UserRole) => {
      setRegisterRole(role);
      setShowRegisterModal(true);
      setFormData({ name: '', email: '', demoUrl: '' });
      setShowSuccessMsg(false);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!registerRole) return;
      
      // Create user in Mock DB
      const newUser = {
          role: registerRole,
          name: formData.name,
          email: formData.email,
          status: 'pending', // Always pending initially
          avatarUrl: 'https://placehold.co/400x400?text=' + formData.name.charAt(0),
          location: { city: 'Registro Web', country: 'Latam', display: 'Latam (Web)' },
          // Add role specific fields placeholders
          bio: 'Perfil en proceso de creación.',
          socials: {},
          tracks: [],
          events: [],
          demoUrl: formData.demoUrl,
          rating: 0,
          votes: 0
      };

      mockDB.addUser(newUser);
      
      setShowSuccessMsg(true);
      
      // Auto login after 2 seconds
      setTimeout(() => {
          onEnterApp(registerRole, formData.name, 'pending');
          setShowRegisterModal(false);
      }, 2500);
  };

  // Quick Login Helper using Database IDs
  const quickLogin = (type: 'artist' | 'radio' | 'producer' | 'admin' | 'vandik') => {
      if (type === 'admin') {
          // Admin is special, doesn't need DB entry for this demo
          onEnterApp('admin', 'Administrador Global', 'active');
          return;
      }

      let userId = '';
      if (type === 'vandik') userId = 'demo_vandik';
      if (type === 'artist') userId = 'a1'; // Luna Creciente
      if (type === 'radio') userId = 'r_fmdos'; // FMDOS
      if (type === 'producer') userId = 'p1'; // Nico Venegas

      const user = mockDB.loginById(userId);
      if (user) {
          onEnterApp(user.role, user.name, user.status);
      } else {
          // Fallback if DB reset wasn't enough (safe guard)
          if(type === 'radio') onEnterApp('radio', 'FMDOS', 'active');
          else if(type === 'producer') onEnterApp('producer', 'Nico Venegas', 'active');
          else alert('Usuario demo no encontrado. Intente recargar la página.');
      }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-green-500/30 flex flex-col font-sans overflow-hidden">
      
      {/* REGISTER/APPLICATION MODAL */}
      {showRegisterModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-fade-in">
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-md shadow-2xl relative">
                  <button onClick={() => setShowRegisterModal(false)} className="absolute top-4 right-4 text-zinc-500 hover:text-white">
                      <X size={24} />
                  </button>
                  
                  <div className="p-8">
                      <div className="text-center mb-6">
                          <div className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4 bg-zinc-800 text-green-500`}>
                              {registerRole === 'artist' && <Mic2 size={32} />}
                              {registerRole === 'radio' && <Radio size={32} />}
                              {registerRole === 'producer' && <Headphones size={32} />}
                          </div>
                          <h2 className="text-2xl font-bold text-white">
                              Postulación {registerRole === 'artist' ? 'Artista' : registerRole === 'radio' ? 'Radio' : 'Productor'}
                          </h2>
                          <p className="text-zinc-400 text-sm mt-1">Ingresa tus datos para evaluación.</p>
                      </div>

                      {showSuccessMsg ? (
                          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6 text-center animate-fade-in">
                              <CheckCircle2 size={48} className="text-green-500 mx-auto mb-4" />
                              <h3 className="text-xl text-white font-bold mb-2">¡Postulación Enviada!</h3>
                              <p className="text-sm text-zinc-300 mb-4">
                                  Tu perfil ha sido creado con estado <span className="text-yellow-500 font-bold">"En Espera"</span>.
                              </p>
                              <div className="bg-zinc-950 p-3 rounded border border-zinc-800 text-xs text-zinc-500">
                                  Ingresando automáticamente al panel...
                              </div>
                          </div>
                      ) : (
                          <form onSubmit={handleRegisterSubmit} className="space-y-4">
                              <div>
                                  <label className="block text-xs font-bold text-zinc-500 uppercase mb-1">Nombre del Proyecto / Emisora</label>
                                  <input 
                                      type="text" 
                                      required
                                      value={formData.name}
                                      onChange={e => setFormData({...formData, name: e.target.value})}
                                      placeholder="Ej: Los Prisioneros"
                                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-white focus:border-green-500 focus:outline-none"
                                  />
                              </div>
                              <div>
                                  <label className="block text-xs font-bold text-zinc-500 uppercase mb-1">Email de Contacto</label>
                                  <input 
                                      type="email" 
                                      required
                                      value={formData.email}
                                      onChange={e => setFormData({...formData, email: e.target.value})}
                                      placeholder="contacto@ejemplo.com"
                                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-white focus:border-green-500 focus:outline-none"
                                  />
                              </div>
                              <div>
                                  <label className="block text-xs font-bold text-zinc-500 uppercase mb-1 flex items-center gap-1">
                                      <LinkIcon size={12} /> Link Demo / Portfolio (Requerido)
                                  </label>
                                  <input 
                                      type="url" 
                                      required
                                      value={formData.demoUrl}
                                      onChange={e => setFormData({...formData, demoUrl: e.target.value})}
                                      placeholder="Soundcloud, Spotify, Drive, Website..."
                                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-white focus:border-green-500 focus:outline-none"
                                  />
                                  <p className="text-[10px] text-zinc-500 mt-1">Necesario para validar tu perfil en la plataforma.</p>
                              </div>
                              <button type="submit" className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-lg transition mt-4 shadow-lg shadow-green-900/20">
                                  Enviar Postulación
                              </button>
                          </form>
                      )}
                  </div>
              </div>
          </div>
      )}

      {/* Navigation */}
      <nav className="absolute top-0 w-full z-50 border-b border-white/5 bg-transparent backdrop-blur-[2px]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="w-8"></div> 
          <div className="flex gap-4">
             <button onClick={() => quickLogin('admin')} className="hidden md:flex items-center gap-2 bg-red-600/10 hover:bg-red-600/20 border border-red-600/30 text-red-400 hover:text-red-300 px-4 py-2 rounded-full text-xs font-bold transition mr-4 mt-2">
                 <User size={14} /> Acceso Corporativo
             </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        
        {/* Dynamic Background */}
        <div className="absolute inset-0 z-0">
            <img 
                src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop" 
                alt="Studio Background" 
                className="w-full h-full object-cover opacity-30 animate-pulse-slow scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/80 via-zinc-950/60 to-zinc-950"></div>
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
        </div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10 -mt-20">
          
          <div className="mb-8 animate-fade-in-down">
              <img src={LOGO_URL} alt="EMERHIT" className="h-28 md:h-40 mx-auto object-contain drop-shadow-[0_0_35px_rgba(74,222,128,0.2)]" />
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-700/50 backdrop-blur-md text-green-400 text-xs font-bold uppercase tracking-[0.2em] mb-8 animate-fade-in shadow-lg">
             <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
             Plataforma Oficial Latinoamericana
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-500 drop-shadow-2xl">
            Artistas, Radios y <span className="text-green-500">Productores.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-300 mb-10 max-w-3xl mx-auto leading-relaxed font-light text-shadow-sm">
            El ecosistema musical completo. Postula, conecta y crece sin intermediarios.
          </p>

          {/* MAIN ACTION BUTTONS */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-16">
            <button 
                onClick={() => handleOpenRegister('radio')}
                className="w-full md:w-auto bg-green-600 hover:bg-green-500 text-white font-bold px-8 py-4 rounded-xl transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-3"
            >
                <Radio size={24} />
                Inscribir Radio
            </button>
            <button 
                onClick={() => handleOpenRegister('artist')}
                className="w-full md:w-auto bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 font-bold px-8 py-4 rounded-xl transition-all transform hover:scale-105 flex items-center justify-center gap-3"
            >
                <Mic2 size={24} />
                Inscribir Artista
            </button>
            <button 
                onClick={() => handleOpenRegister('producer')}
                className="w-full md:w-auto bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-800 font-bold px-8 py-4 rounded-xl transition-all transform hover:scale-105 flex items-center justify-center gap-3"
            >
                <Headphones size={24} />
                Inscribir Productor
            </button>
          </div>

          {/* QUICK ACCESS (DEMO) */}
          <div className="bg-zinc-900/80 backdrop-blur-md border border-zinc-700 rounded-2xl p-8 max-w-3xl mx-auto shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-emerald-400 to-green-500"></div>
             <h3 className="text-sm font-bold text-zinc-400 uppercase mb-6 tracking-widest flex items-center justify-center gap-2">
                 <User size={16} /> Usuarios de Prueba (Ingreso Directo)
             </h3>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                 <button onClick={() => quickLogin('vandik')} className="bg-zinc-800 hover:bg-green-600 group text-sm py-4 rounded-xl text-zinc-200 hover:text-white transition flex flex-col items-center gap-2 border border-zinc-700 hover:border-green-500 relative overflow-hidden">
                     <div className="absolute top-2 right-2">
                        <AlertTriangle size={12} className="text-yellow-500" />
                     </div>
                     <Mic2 size={24} className="text-zinc-500 group-hover:text-white" /> 
                     <span className="font-bold">Vandik</span>
                     <span className="text-[10px] text-zinc-500 group-hover:text-zinc-200">En Espera</span>
                 </button>

                 <button onClick={() => quickLogin('radio')} className="bg-zinc-800 hover:bg-blue-600 group text-sm py-4 rounded-xl text-zinc-200 hover:text-white transition flex flex-col items-center gap-2 border border-zinc-700 hover:border-blue-500">
                     <Radio size={24} className="text-zinc-500 group-hover:text-white" /> 
                     <span className="font-bold">FMDOS</span>
                     <span className="text-[10px] text-zinc-500 group-hover:text-zinc-200">Aceptado</span>
                 </button>

                 <button onClick={() => quickLogin('producer')} className="bg-zinc-800 hover:bg-purple-600 group text-sm py-4 rounded-xl text-zinc-200 hover:text-white transition flex flex-col items-center gap-2 border border-zinc-700 hover:border-purple-500">
                     <Headphones size={24} className="text-zinc-500 group-hover:text-white" /> 
                     <span className="font-bold">Nico Venegas</span>
                     <span className="text-[10px] text-zinc-500 group-hover:text-zinc-200">Aceptado</span>
                 </button>

                 <button onClick={() => quickLogin('admin')} className="bg-zinc-950 hover:bg-red-900 group text-sm py-4 rounded-xl text-zinc-200 hover:text-white transition flex flex-col items-center gap-2 border border-zinc-700 hover:border-red-500">
                     <User size={24} className="text-red-500" /> 
                     <span className="font-bold">Admin</span>
                     <span className="text-[10px] text-zinc-500 group-hover:text-zinc-200">Control Total</span>
                 </button>
             </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-zinc-900 bg-zinc-950 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
            <div>
                <img src={LOGO_URL} alt="EMERHIT" className="h-6 object-contain opacity-50 mb-4 mx-auto md:mx-0" />
                <p className="text-zinc-500 text-sm">© 2024 EMERHIT.</p>
                
                {/* Facebook EMERHIT Link */}
                <a 
                    href="https://web.facebook.com/emerhit" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="inline-flex items-center gap-2 text-zinc-500 hover:text-blue-500 mt-2 text-sm transition"
                >
                    <Facebook size={16} /> Facebook Oficial
                </a>
            </div>
            <div className="text-zinc-600 text-sm">AIWIS Development</div>
        </div>
      </footer>
    </div>
  );
};