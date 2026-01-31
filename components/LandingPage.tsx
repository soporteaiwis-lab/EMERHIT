import React from 'react';
import { LOGO_URL } from '../assets';
import { Radio, Mic2, TrendingUp, ArrowRight, CheckCircle2, Music } from 'lucide-react';

interface LandingPageProps {
  onEnterApp: (role: 'artist' | 'radio') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp }) => {
  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-green-500/30 flex flex-col font-sans">
      
      {/* Navigation */}
      <nav className="absolute top-0 w-full z-50 border-b border-white/5 bg-zinc-950/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <img src={LOGO_URL} alt="EMERHIT" className="h-8 md:h-10 object-contain" />
          <div className="flex gap-4">
             <button onClick={() => onEnterApp('artist')} className="text-sm font-medium text-zinc-400 hover:text-white transition">Login</button>
             <button onClick={() => onEnterApp('radio')} className="text-sm font-medium bg-white text-black px-4 py-2 rounded-full hover:bg-zinc-200 transition">Registrarse</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-green-500/20 rounded-full blur-[120px] -z-10 opacity-30 animate-pulse"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-green-500 text-xs font-bold uppercase tracking-wider mb-6 animate-fade-in">
             <span className="w-2 h-2 rounded-full bg-green-500 animate-ping"></span>
             Plataforma Oficial Latinoamericana
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500">
            Conectando el Talento Latino con la <span className="text-green-500">Radio Local</span>.
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            La primera plataforma B2B que elimina intermediarios. 
            <br className="hidden md:block" /> Artistas suben su material, las radios lo descubren. Crecimiento mutuo real.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
                onClick={() => onEnterApp('radio')}
                className="w-full sm:w-auto bg-green-500 hover:bg-green-400 text-black text-lg font-bold px-8 py-4 rounded-full transition transform hover:scale-105 shadow-[0_0_20px_rgba(34,197,94,0.3)] flex items-center justify-center gap-2 group"
            >
                <Radio size={20} className="group-hover:rotate-12 transition" />
                ¿Tienes una Radio?
            </button>
            <button 
                onClick={() => onEnterApp('artist')}
                className="w-full sm:w-auto bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700 hover:border-zinc-600 text-lg font-medium px-8 py-4 rounded-full transition flex items-center justify-center gap-2"
            >
                <Mic2 size={20} />
                ¿Haces Música?
            </button>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-zinc-900/30 border-y border-zinc-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 relative">
             {/* Connector Line (Desktop) */}
             <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-zinc-800 via-green-900/50 to-zinc-800 -z-10"></div>

             {/* Step 1 */}
             <div className="text-center group">
                <div className="w-24 h-24 mx-auto bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center mb-6 shadow-xl group-hover:border-green-500/50 transition duration-500 relative">
                    <div className="absolute inset-0 bg-green-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition"></div>
                    <Music size={40} className="text-zinc-300 group-hover:text-green-500 transition" />
                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center border border-zinc-700 font-bold text-sm">1</div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Artistas suben Material</h3>
                <p className="text-zinc-400 leading-relaxed px-4">
                   Gestión 360°: Música en alta calidad, agenda de eventos y press kit digital en un solo lugar.
                </p>
             </div>

             {/* Step 2 */}
             <div className="text-center group">
                <div className="w-24 h-24 mx-auto bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center mb-6 shadow-xl group-hover:border-green-500/50 transition duration-500 relative">
                    <div className="absolute inset-0 bg-green-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition"></div>
                    <Radio size={40} className="text-zinc-300 group-hover:text-green-500 transition" />
                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center border border-zinc-700 font-bold text-sm">2</div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Radios Descubren</h3>
                <p className="text-zinc-400 leading-relaxed px-4">
                   Curadores y locutores acceden a un catálogo filtrado por país y género. Descarga directa verificada.
                </p>
             </div>

             {/* Step 3 */}
             <div className="text-center group">
                <div className="w-24 h-24 mx-auto bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center mb-6 shadow-xl group-hover:border-green-500/50 transition duration-500 relative">
                    <div className="absolute inset-0 bg-green-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition"></div>
                    <TrendingUp size={40} className="text-zinc-300 group-hover:text-green-500 transition" />
                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center border border-zinc-700 font-bold text-sm">3</div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Crecimiento Mutuo</h3>
                <p className="text-zinc-400 leading-relaxed px-4">
                   La radio renueva su parrilla con talento fresco y el artista gana difusión real en su zona.
                </p>
             </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
         <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                    Herramientas profesionales para <br/> 
                    <span className="text-green-500">Gestión Musical</span>
                </h2>
                
                <div className="space-y-4">
                    {[
                        "Perfil de Artista con Streaming de Audio",
                        "Gestión de Eventos y Giras",
                        "Mensajería Directa Radio-Artista",
                        "Asistente AI para Biografías y Pitches",
                        "Descargas en Alta Calidad (WAV/MP3 320)"
                    ].map((feature, i) => (
                        <div key={i} className="flex items-center gap-3 text-zinc-300">
                            <CheckCircle2 className="text-green-500 flex-shrink-0" size={20} />
                            <span>{feature}</span>
                        </div>
                    ))}
                </div>

                <button onClick={() => onEnterApp('artist')} className="text-green-400 font-bold flex items-center gap-2 hover:gap-4 transition-all">
                    Comenzar ahora <ArrowRight size={20} />
                </button>
            </div>
            
            {/* Visual Abstract UI */}
            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl rotate-3 opacity-20 blur-xl"></div>
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
                    {/* Mock UI elements */}
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-zinc-800 rounded-full"></div>
                        <div className="space-y-2">
                            <div className="w-32 h-3 bg-zinc-800 rounded"></div>
                            <div className="w-20 h-2 bg-zinc-800 rounded"></div>
                        </div>
                    </div>
                    <div className="space-y-3 mb-6">
                        <div className="h-10 bg-zinc-800/50 rounded w-full flex items-center px-3 gap-3">
                            <div className="w-6 h-6 bg-zinc-700 rounded-full"></div>
                            <div className="w-full h-2 bg-zinc-700 rounded"></div>
                        </div>
                        <div className="h-10 bg-zinc-800/50 rounded w-full flex items-center px-3 gap-3">
                            <div className="w-6 h-6 bg-zinc-700 rounded-full"></div>
                            <div className="w-full h-2 bg-zinc-700 rounded"></div>
                        </div>
                    </div>
                    <div className="flex justify-between items-center bg-green-500/10 p-4 rounded-xl border border-green-500/20">
                         <div className="flex items-center gap-2 text-green-500 text-sm font-bold">
                             <Radio size={16} /> Contacto de Radio
                         </div>
                         <div className="px-3 py-1 bg-green-500 text-black text-xs font-bold rounded">Nuevo Mensaje</div>
                    </div>
                </div>
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-zinc-900 bg-zinc-950 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
            <div>
                <img src={LOGO_URL} alt="EMERHIT" className="h-6 object-contain opacity-50 mb-4 mx-auto md:mx-0" />
                <p className="text-zinc-500 text-sm">© 2024 EMERHIT. Todos los derechos reservados.</p>
            </div>
            
            <div className="flex flex-col items-center md:items-end gap-2">
                <span className="text-zinc-600 text-sm font-medium">Desarrollado por AIWIS</span>
                <div className="text-zinc-400 text-sm flex gap-2">
                    <span className="hover:text-green-500 cursor-pointer transition">Armin Salazar</span>
                    <span>&</span>
                    <span className="hover:text-green-500 cursor-pointer transition">Nicolás Venegas</span>
                </div>
                <div className="flex gap-6 mt-2 text-xs text-zinc-600">
                    <a href="#" className="hover:text-zinc-400">Términos y Condiciones</a>
                    <a href="#" className="hover:text-zinc-400">Privacidad</a>
                    <a href="#" className="hover:text-zinc-400">Soporte</a>
                </div>
            </div>
        </div>
      </footer>
    </div>
  );
};