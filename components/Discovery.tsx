import React from 'react';
import { Artist } from '../types';
import { usePlayer } from './PlayerContext';
import { Play } from 'lucide-react';

interface DiscoveryProps {
  artists: Artist[];
  onSelectArtist: (artist: Artist) => void;
}

export const Discovery: React.FC<DiscoveryProps> = ({ artists, onSelectArtist }) => {
  const { playTrack } = usePlayer();

  return (
    <div className="px-4 md:px-8 py-8 pb-32 max-w-7xl mx-auto animate-fade-in">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 border border-zinc-800 rounded-2xl p-8 mb-10 text-white relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-500 rounded-full mix-blend-overlay filter blur-[80px] opacity-10 -translate-y-1/2 translate-x-1/3 group-hover:opacity-20 transition duration-1000"></div>
        <h1 className="text-3xl font-bold mb-2 relative z-10">Descubre el sonido local</h1>
        <p className="text-zinc-400 max-w-xl relative z-10 leading-relaxed">
          EMERHIT conecta el talento emergente con las radios que marcan tendencia. 
          Explora lo nuevo de Latinoamérica.
        </p>
      </div>

      {/* Featured Artists Grid */}
      <div className="flex justify-between items-end mb-6">
        <h2 className="text-xl font-bold text-white">Artistas Destacados</h2>
        <a href="#" className="text-xs font-bold text-zinc-500 hover:text-green-500 uppercase tracking-wider transition">Ver todos</a>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {artists.map((artist) => (
          <div 
            key={artist.id} 
            className="group bg-zinc-900/40 p-4 rounded-xl hover:bg-zinc-900 transition cursor-pointer border border-transparent hover:border-zinc-800"
            onClick={() => onSelectArtist(artist)}
          >
            <div className="relative aspect-square mb-4 rounded-lg overflow-hidden shadow-lg bg-zinc-950">
              <img 
                src={artist.avatarUrl} 
                alt={artist.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-90 group-hover:opacity-100"
              />
              {/* Quick Play Button */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  if (artist.tracks[0]) playTrack(artist.tracks[0]);
                }}
                className="absolute bottom-3 right-3 bg-green-500 text-black rounded-full p-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition shadow-lg hover:scale-110 active:scale-95"
              >
                <Play size={20} fill="black" className="ml-1" />
              </button>
            </div>
            <h3 className="font-bold text-white truncate group-hover:text-green-400 transition">{artist.name}</h3>
            <p className="text-sm text-zinc-500">{artist.genre}</p>
          </div>
        ))}
      </div>

      {/* Recommended Songs */}
      <h2 className="text-xl font-bold text-white mt-12 mb-6">Nuevos Lanzamientos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {artists.flatMap(a => a.tracks).slice(0, 4).map((track) => (
          <div 
            key={track.id}
            className="flex items-center gap-4 bg-zinc-900/60 p-3 rounded-lg hover:bg-zinc-900 transition group cursor-pointer border border-zinc-800/50 hover:border-zinc-700"
            onClick={() => playTrack(track)}
          >
            <div className="relative w-16 h-16 flex-shrink-0">
               <img src={track.coverUrl} className="w-full h-full object-cover rounded" alt={track.title} />
               <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <Play size={20} className="text-white" fill="white" />
               </div>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-white font-medium truncate group-hover:text-green-400 transition">{track.title}</h4>
              <p className="text-zinc-500 text-sm truncate">{track.artistName}</p>
            </div>
            <span className="text-zinc-600 text-sm px-3 font-mono">{track.duration}</span>
          </div>
        ))}
      </div>
    </div>
  );
};