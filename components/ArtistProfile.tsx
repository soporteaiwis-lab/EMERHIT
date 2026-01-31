import React, { useState } from 'react';
import { Artist } from '../types';
import { usePlayer } from './PlayerContext';
import { Play, Calendar, Share2, Instagram, Globe, Mail, Sparkles, Radio, Ticket, Music2, MapPin, Download, MessageSquare, ArrowLeft, Star, Heart, Youtube, Facebook, ThumbsUp } from 'lucide-react';
import { generateArtistBio } from '../services/geminiService';
import { ContactModal } from './ContactModal';

interface ArtistProfileProps {
  artist: Artist;
}

export const ArtistProfile: React.FC<ArtistProfileProps> = ({ artist }) => {
  const { playTrack, currentTrack, isPlaying } = usePlayer();
  const [activeTab, setActiveTab] = useState<'music' | 'events' | 'bio'>('music');
  const [isGeneratingBio, setIsGeneratingBio] = useState(false);
  const [generatedBio, setGeneratedBio] = useState<string>('');
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const handleGenerateBio = async () => {
    setIsGeneratingBio(true);
    const bio = await generateArtistBio(artist.name, artist.genre, "Pasión, autogestión, local, innovador");
    setGeneratedBio(bio);
    setIsGeneratingBio(false);
  };

  const handleDownload = (e: React.MouseEvent, trackTitle: string) => {
    e.stopPropagation();
    alert(`Iniciando descarga de alta calidad para: ${trackTitle}\n(Validando licencia de radio...)`);
  };

  // Helper for stars
  const renderStars = (rating: number) => {
    return (
        <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                    key={star} 
                    size={16} 
                    className={`${star <= Math.round(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-zinc-600'}`} 
                />
            ))}
            <span className="text-zinc-400 text-xs ml-1">({artist.votes} votos)</span>
        </div>
    );
  };

  return (
    <div className="pb-32 animate-fade-in relative">
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
        artistName={artist.name} 
      />

      {/* Hero Cover */}
      <div className="relative h-72 md:h-96 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-950/40 to-zinc-950 z-10"></div>
        <img src={artist.coverImageUrl} alt={artist.name} className="w-full h-full object-cover" />
        
        <div className="absolute bottom-0 left-0 right-0 z-20 px-4 md:px-8 pb-6 flex flex-col md:flex-row md:items-end gap-6">
          <img 
            src={artist.avatarUrl} 
            alt={artist.name} 
            className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-zinc-950 shadow-2xl bg-zinc-800"
          />
          <div className="flex-1 mb-2">
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight flex items-center gap-3">
              {artist.name}
              {artist.paymentStatus === 'premium' && (
                <span className="bg-green-500 text-black text-xs px-2 py-0.5 rounded-full font-bold shadow-[0_0_10px_rgba(34,197,94,0.4)] align-middle text-base">PRO</span>
              )}
            </h1>
            
            <div className="flex flex-col md:flex-row md:items-center gap-3 mt-2">
                <span className="bg-zinc-800/80 backdrop-blur text-zinc-200 border border-zinc-700 px-3 py-0.5 rounded text-xs font-bold uppercase tracking-wider w-fit">{artist.genre}</span>
                {renderStars(artist.rating)}
                <span className="flex items-center gap-1 text-zinc-300 text-sm"><MapPin size={16} className="text-green-500" /> {artist.location.display}</span>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mb-2">
             <button 
                onClick={() => setIsContactModalOpen(true)}
                className="bg-green-500 hover:bg-green-400 text-black px-6 py-3 rounded-full font-bold shadow-lg shadow-green-900/20 transition hover:scale-105 active:scale-95 flex items-center gap-2"
             >
                <MessageSquare size={18} /> Contactar
             </button>
             <button className="bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 px-6 py-3 rounded-full font-medium transition flex items-center gap-2">
                <Download size={18} /> Press Kit
             </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="sticky top-16 z-30 bg-zinc-950/95 backdrop-blur border-b border-zinc-800 px-4 md:px-8">
        <div className="flex gap-8 overflow-x-auto no-scrollbar">
          {[
            { id: 'music', label: 'Discografía' },
            { id: 'events', label: 'Giras y Eventos' },
            { id: 'bio', label: 'Info & Redes' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-4 text-sm font-bold border-b-2 transition whitespace-nowrap ${
                activeTab === tab.id 
                  ? 'border-green-500 text-green-500' 
                  : 'border-transparent text-zinc-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* MUSIC TAB */}
        {activeTab === 'music' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Lanzamientos</h2>
            </div>
            
            <div className="bg-zinc-900/30 rounded-xl overflow-hidden border border-zinc-800">
              {artist.tracks.map((track, index) => (
                <div 
                  key={track.id}
                  onClick={() => playTrack(track)}
                  className={`group flex items-center justify-between p-4 hover:bg-zinc-800/80 transition cursor-pointer border-b border-zinc-800/50 last:border-0 ${currentTrack?.id === track.id ? 'bg-zinc-800/80' : ''}`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`w-6 text-center text-sm font-mono ${currentTrack?.id === track.id ? 'text-green-500' : 'text-zinc-500'}`}>
                      {currentTrack?.id === track.id && isPlaying ? (
                        <div className="flex gap-0.5 items-end h-3 justify-center">
                          <div className="w-0.5 bg-green-500 h-2 animate-pulse"></div>
                          <div className="w-0.5 bg-green-500 h-3 animate-pulse delay-75"></div>
                          <div className="w-0.5 bg-green-500 h-1 animate-pulse delay-150"></div>
                        </div>
                      ) : index + 1}
                    </span>
                    <img src={track.coverUrl} alt={track.title} className="w-12 h-12 rounded shadow-sm" />
                    <div>
                      <h3 className={`font-bold text-base ${currentTrack?.id === track.id ? 'text-green-400' : 'text-zinc-200 group-hover:text-white'}`}>
                        {track.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-zinc-500">
                          <span>{track.artistName}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1"><Play size={10} /> {track.plays?.toLocaleString() || 0}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                     {/* External Link */}
                     {track.externalUrl && (
                         <a 
                            href={track.externalUrl} 
                            target="_blank" 
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-zinc-500 hover:text-red-500 transition hidden sm:block"
                            title="Ver en YouTube/Spotify"
                         >
                            <Youtube size={18} />
                         </a>
                     )}
                     
                     <div className="flex items-center gap-1 text-zinc-500 text-sm hidden sm:flex">
                        <ThumbsUp size={14} /> {track.likes?.toLocaleString() || 0}
                     </div>

                     <span className="text-sm font-mono text-zinc-500 hidden sm:block">{track.duration}</span>
                     
                     <div className="flex items-center gap-2">
                        {/* Download Button for Radio */}
                        <button 
                            onClick={(e) => handleDownload(e, track.title)}
                            title="Descargar MP3 (Solo Radios)"
                            className="p-2 text-zinc-400 hover:text-green-500 hover:bg-green-500/10 rounded-full transition"
                        >
                            <Download size={18} />
                        </button>
                        
                        <button className="p-2 bg-zinc-800 rounded-full text-white hover:bg-white hover:text-black transition shadow-lg opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100">
                            <Play size={16} fill="currentColor" className="ml-0.5" />
                        </button>
                     </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* EVENTS TAB */}
        {activeTab === 'events' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Próximos Eventos</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {artist.events.length > 0 ? artist.events.map((event) => (
                <div key={event.id} className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-green-500/50 transition group flex flex-col">
                  {event.flyerUrl && (
                      <div className="h-48 w-full overflow-hidden relative">
                          <img src={event.flyerUrl} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent opacity-80"></div>
                          
                          <div className="absolute bottom-4 left-4 right-4">
                             <h3 className="text-lg font-bold text-white mb-1 shadow-black drop-shadow-md">{event.title}</h3>
                             <div className="flex items-center gap-2 text-zinc-300 text-sm">
                                <MapPin size={14} className="text-green-500" />
                                <span>{event.location.venue}, {event.location.city}</span>
                             </div>
                          </div>
                      </div>
                  )}
                  <div className="p-5 flex-1 flex flex-col">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-center min-w-[60px]">
                          <span className="block text-xs text-green-500 font-bold uppercase">{new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
                          <span className="block text-xl font-bold text-white">{new Date(event.date).getDate()}</span>
                        </div>
                        <p className="text-zinc-500 text-sm line-clamp-3 flex-1">{event.description}</p>
                      </div>
                      
                      {event.ticketLink && (
                          <a href={event.ticketLink} target="_blank" rel="noreferrer" className="w-full bg-zinc-800 hover:bg-zinc-700 text-white py-2 rounded-lg text-sm font-medium transition flex items-center justify-center gap-2 group-hover:bg-green-600 group-hover:text-black group-hover:font-bold mt-auto">
                            <Ticket size={16} /> Comprar Tickets
                          </a>
                      )}
                  </div>
                </div>
              )) : (
                <div className="col-span-full py-12 text-center bg-zinc-900/50 border border-dashed border-zinc-800 rounded-xl">
                  <Calendar className="mx-auto text-zinc-600 mb-2" size={32} />
                  <p className="text-zinc-400">No hay eventos programados.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* BIO & INFO TAB */}
        {activeTab === 'bio' && (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
                <h3 className="text-lg font-bold text-white mb-4">Biografía del Artista</h3>
                <p className="text-zinc-300 leading-relaxed mb-6 font-light">
                  {generatedBio || artist.bio}
                </p>
                
                <div className="bg-zinc-950 p-4 rounded-lg border border-zinc-800 relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-20 h-20 bg-green-500 rounded-full blur-[40px] opacity-10"></div>
                  <div className="flex items-start gap-3 relative z-10">
                    <Sparkles className="text-green-500 mt-1 flex-shrink-0" size={20} />
                    <div className="flex-1">
                      <h4 className="text-green-400 font-medium text-sm mb-1">Asistente AI de EMERHIT</h4>
                      <p className="text-zinc-500 text-xs mb-3">
                        ¿Necesitas mejorar tu bio para prensa o radios? Usa nuestra IA para generar un perfil profesional.
                      </p>
                      <button 
                        onClick={handleGenerateBio}
                        disabled={isGeneratingBio}
                        className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-1.5 rounded text-xs font-medium transition flex items-center gap-2 border border-zinc-700 hover:border-green-500"
                      >
                        {isGeneratingBio ? 'Generando...' : 'Generar Nueva Bio con AI'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
                <h3 className="text-lg font-bold text-white mb-4">Conecta en Redes</h3>
                <div className="flex flex-wrap gap-3">
                  {artist.socials.instagram && (
                    <a href={`https://instagram.com/${artist.socials.instagram.replace('@','')}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 px-4 py-3 rounded-lg text-zinc-300 transition flex-1 justify-center min-w-[140px]">
                      <Instagram size={20} /> Instagram
                    </a>
                  )}
                  {artist.socials.website && (
                    <a href={artist.socials.website} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 px-4 py-3 rounded-lg text-zinc-300 transition flex-1 justify-center min-w-[140px]">
                      <Globe size={20} /> Website
                    </a>
                  )}
                   {artist.socials.facebook && (
                    <a href={artist.socials.facebook} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 px-4 py-3 rounded-lg text-zinc-300 transition flex-1 justify-center min-w-[140px]">
                      <Facebook size={20} /> Facebook
                    </a>
                  )}
                  {artist.socials.youtube && (
                    <a href={artist.socials.youtube} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 px-4 py-3 rounded-lg text-zinc-300 transition flex-1 justify-center min-w-[140px]">
                      <Youtube size={20} /> YouTube
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className="md:col-span-1">
              <div className="bg-zinc-900 p-5 rounded-xl border border-zinc-800 sticky top-36">
                <h3 className="text-white font-bold mb-4">Estadísticas</h3>
                <ul className="space-y-4">
                  <li className="flex justify-between text-sm items-center">
                    <span className="text-zinc-500">Valoración</span>
                    <span className="text-yellow-400 font-bold flex items-center gap-1"><Star size={14} fill="currentColor" /> {artist.rating}</span>
                  </li>
                  <div className="h-px bg-zinc-800 w-full"></div>
                  <li className="flex justify-between text-sm items-center">
                    <span className="text-zinc-500">Reproducciones</span>
                    <span className="text-white font-bold text-lg">{artist.tracks.reduce((acc, t) => acc + (t.plays || 0), 0).toLocaleString()}</span>
                  </li>
                  <div className="h-px bg-zinc-800 w-full"></div>
                  <li className="flex justify-between text-sm items-center">
                    <span className="text-zinc-500">Votos Totales</span>
                    <span className="text-white font-bold text-lg">{artist.votes}</span>
                  </li>
                </ul>
                <div className="mt-6 p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-xs text-green-400 text-center">
                    Artista en Ascenso
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};