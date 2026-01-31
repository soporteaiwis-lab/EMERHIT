import React from 'react';
import { LOGO_URL } from '../assets';
import { Radio, Mic2, TrendingUp, ArrowRight, CheckCircle2, Music, Play } from 'lucide-react';

interface LandingPageProps {
  onEnterApp: (role: 'artist' | 'radio') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp }) => {
  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-green-500/30 flex flex-col font-sans overflow-hidden">
      
      {/* Navigation */}
      <nav className="absolute top-0 w-full z-50 border-b border-white/5 bg-transparent backdrop-blur-[2px]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="w-8"></div> {/* Spacer to balance layout since logo moved */}
          <div className="flex gap-4">
             <button onClick={() => onEnterApp('artist')} className="text-sm font-medium text-zinc-300 hover:text-white transition uppercase tracking-wide">Login</button>
             <button onClick={() => onEnterApp('radio')} className="text-sm font-medium bg-white/10 backdrop-blur-md border border-white/20 text-white px-5 py-2 rounded-full hover:bg-white hover:text-black transition">Registrarse</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        
        {/* Dynamic Background Image */}
        <div className="absolute inset-0 z-0">
            <img 
                src="https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=2070&auto=format&fit=crop" 
                alt="Concert Background" 
                className="w-full h-full object-cover opacity-40 animate-pulse-slow scale-105"
            />
            {/* Dark Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/80 via-zinc-950/60 to-zinc-950"></div>
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
        </div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10 -mt-20">
          
          {/* Main Logo Placement */}
          <div className="mb-8 animate-fade-in-down">
              <img src={LOGO_URL} alt="EMERHIT" className="h-28 md:h-40 mx-auto object-contain drop-shadow-[0_0_35px_rgba(74,222,128,0.2)]" />
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-700/50 backdrop-blur-md text-green-400 text-xs font-bold uppercase tracking-[0.2em] mb-8 animate-fade-in shadow-lg">
             <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
             Plataforma Oficial Latinoamericana
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-500 drop-shadow-2xl">
            Tu Música.<br/>
            <span className="text-white">Su Radio.</span>
          </h1>
          
          <p className="text-lg md:text-2xl text-zinc-300 mb-12 max-w-3xl mx-auto leading-relaxed font-light text-shadow-sm">
            El primer ecosistema B2B que elimina intermediarios. 
            Conecta el talento emergente directamente con los curadores de radio locales.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
                onClick={() => onEnterApp('radio')}
                className="w-full sm:w-auto bg-green-500 hover:bg-green-400 text-black text-lg font-bold px-10 py-5 rounded-full transition-all transform hover:scale-105 shadow-[0_0_40px_rgba(34,197,94,0.4)] flex items-center justify-center gap-3 group"
            >
                <Radio size={24} className="group-hover:-rotate-12 transition-transform duration-300" />
                ¿Tienes una Radio?
            </button>
            <button 
                onClick={() => onEnterApp('artist')}
                className="w-full sm:w-auto bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/20 hover:border-white/40 text-lg font-medium px-10 py-5 rounded-full transition-all flex items-center justify-center gap-3 group"
            >
                <Mic2 size={24} className="group-hover:scale-110 transition-transform" />
                ¿Haces Música?
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-zinc-500">
            <div className="w-6 h-10 border-2 border-zinc-600 rounded-full flex justify-center pt-2">
                <div className="w-1 h-2 bg-green-500 rounded-full"></div>
            </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-white/5 bg-black/40 backdrop-blur-sm relative z-20">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                  <h3 className="text-4xl font-black text-white mb-1">1,200+</h3>
                  <p className="text-zinc-500 text-sm uppercase tracking-wider">Artistas Registrados</p>
              </div>
              <div>
                  <h3 className="text-4xl font-black text-white mb-1">450+</h3>
                  <p className="text-zinc-500 text-sm uppercase tracking-wider">Radios Locales</p>
              </div>
              <div>
                  <h3 className="text-4xl font-black text-white mb-1">15</h3>
                  <p className="text-zinc-500 text-sm uppercase tracking-wider">Países Activos</p>
              </div>
              <div>
                  <h3 className="text-4xl font-black text-white mb-1">10k+</h3>
                  <p className="text-zinc-500 text-sm uppercase tracking-wider">Conexiones Reales</p>
              </div>
          </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-6 max-w-7xl mx-auto relative">
         <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[100px] -z-10"></div>
         <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] -z-10"></div>

         <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
                <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                    Herramientas profesionales para <br/> 
                    <span className="text-green-500">Gestión Musical</span>
                </h2>
                <p className="text-zinc-400 text-lg">
                    Deja de mandar correos que nadie lee. EMERHIT te da las herramientas para que tu proyecto se vea profesional frente a los directores de programación.
                </p>
                
                <div className="space-y-5">
                    {[
                        "Perfil de Artista con Streaming de Audio HD",
                        "Gestión de Eventos y Giras",
                        "Mensajería Directa Radio-Artista",
                        "Asistente AI para Biografías y Pitches",
                        "Descargas verificadas para Radios"
                    ].map((feature, i) => (
                        <div key={i} className="flex items-center gap-4 text-zinc-200 bg-zinc-900/50 p-3 rounded-xl border border-white/5 hover:border-green-500/30 transition">
                            <CheckCircle2 className="text-green-500 flex-shrink-0" size={24} />
                            <span className="font-medium">{feature}</span>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Visual Abstract UI */}
            <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl rotate-3 opacity-20 blur-2xl group-hover:opacity-30 transition duration-700"></div>
                <div className="bg-zinc-950/80 backdrop-blur-xl border border-zinc-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden transform group-hover:-translate-y-2 transition duration-500">
                    {/* Mock UI elements */}
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-16 h-16 bg-zinc-800 rounded-full overflow-hidden relative">
                             <img src="https://images.unsplash.com/photo-1520699918507-4c30c8dc2367?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover" />
                        </div>
                        <div className="space-y-2">
                            <div className="w-40 h-4 bg-zinc-800 rounded-full"></div>
                            <div className="w-24 h-3 bg-zinc-800/50 rounded-full"></div>
                        </div>
                        <div className="ml-auto bg-green-500 text-black p-2 rounded-full">
                            <Play size={20} fill="black" />
                        </div>
                    </div>
                    
                    <div className="space-y-4 mb-8">
                        {[1, 2, 3].map((_, i) => (
                             <div key={i} className="h-14 bg-zinc-900/50 rounded-xl w-full flex items-center px-4 gap-4 border border-white/5">
                                <span className="text-zinc-600 font-mono text-sm">0{i+1}</span>
                                <div className="w-8 h-8 bg-zinc-800 rounded-md"></div>
                                <div className="w-full h-2 bg-zinc-800/50 rounded-full"></div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-between items-center bg-green-500/10 p-5 rounded-2xl border border-green-500/20">
                         <div className="flex items-center gap-3 text-green-400 text-sm font-bold">
                             <Radio size={18} /> 
                             <span>Radio Valparaíso Indie</span>
                         </div>
                         <div className="px-3 py-1 bg-green-500 text-black text-xs font-bold rounded shadow-[0_0_10px_rgba(34,197,94,0.4)]">¡Te ha contactado!</div>
                    </div>
                </div>
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-zinc-900 bg-zinc-950 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
            <div>
                <img src={LOGO_URL} alt="EMERHIT" className="h-8 object-contain opacity-50 mb-4 mx-auto md:mx-0 grayscale hover:grayscale-0 transition duration-500" />
                <p className="text-zinc-500 text-sm">© 2024 EMERHIT. Todos los derechos reservados.</p>
            </div>
            
            <div className="flex flex-col items-center md:items-end gap-2">
                <span className="text-zinc-600 text-sm font-medium">Desarrollado con ❤️ por AIWIS</span>
                <div className="text-zinc-400 text-sm flex gap-2">
                    <span className="hover:text-green-500 cursor-pointer transition">Armin Salazar</span>
                    <span className="text-zinc-700">&</span>
                    <span className="hover:text-green-500 cursor-pointer transition">Nicolás Venegas</span>
                </div>
                <div className="flex gap-6 mt-4 text-xs text-zinc-600 font-medium tracking-wide">
                    <a href="#" className="hover:text-white transition">Términos y Condiciones</a>
                    <a href="#" className="hover:text-white transition">Privacidad</a>
                    <a href="#" className="hover:text-white transition">Soporte</a>
                </div>
            </div>
        </div>
      </footer>
    </div>
  );
};