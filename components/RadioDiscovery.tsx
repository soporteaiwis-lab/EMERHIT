import React, { useState, useMemo } from 'react';
import { Artist } from '../types';
import { usePlayer } from './PlayerContext';
import { Play, MapPin, Search, Filter, Music2, Globe2, Star } from 'lucide-react';

interface RadioDiscoveryProps {
  artists: Artist[];
  onSelectArtist: (artist: Artist) => void;
}

export const RadioDiscovery: React.FC<RadioDiscoveryProps> = ({ artists, onSelectArtist }) => {
  const { playTrack } = usePlayer();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [selectedGenre, setSelectedGenre] = useState<string>('all');

  // Extract unique values for filters
  const countries = useMemo(() => {
    const all = artists.map(a => a.location.country);
    return Array.from(new Set(all));
  }, [artists]);

  const genres = useMemo(() => {
    const all = artists.map(a => a.genre);
    return Array.from(new Set(all));
  }, [artists]);

  // Filter Logic
  const filteredArtists = useMemo(() => {
    return artists.filter(artist => {
      const matchesSearch = artist.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            artist.location.city.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCountry = selectedCountry === 'all' || artist.location.country === selectedCountry;
      const matchesGenre = selectedGenre === 'all' || artist.genre === selectedGenre;

      return matchesSearch && matchesCountry && matchesGenre;
    });
  }, [artists, searchTerm, selectedCountry, selectedGenre]);

  return (
    <div className="px-4 md:px-8 py-8 pb-32 max-w-7xl mx-auto animate-fade-in">
      
      {/* Header & Filters Panel */}
      <div className="mb-8 space-y-6">
        <div>
            <h1 className="text-3xl font-bold text-white mb-2">Panel de Curaduría</h1>
            <p className="text-zinc-400">Encuentra el sonido perfecto para tu programación.</p>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-xl flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                <input 
                    type="text" 
                    placeholder="Buscar por nombre, ciudad..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:border-green-500 transition placeholder:text-zinc-600"
                />
            </div>

            {/* Filters */}
            <div className="flex gap-4">
                <div className="relative min-w-[160px]">
                    <Globe2 className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                    <select 
                        value={selectedCountry}
                        onChange={(e) => setSelectedCountry(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-800 text-zinc-300 rounded-lg pl-10 pr-8 py-2.5 focus:outline-none focus:border-green-500 appearance-none cursor-pointer"
                    >
                        <option value="all">Todos los Países</option>
                        {countries.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>

                <div className="relative min-w-[160px]">
                    <Music2 className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                    <select 
                        value={selectedGenre}
                        onChange={(e) => setSelectedGenre(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-800 text-zinc-300 rounded-lg pl-10 pr-8 py-2.5 focus:outline-none focus:border-green-500 appearance-none cursor-pointer"
                    >
                        <option value="all">Todos los Géneros</option>
                        {genres.map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                </div>
            </div>
        </div>
      </div>

      {/* Results Grid */}
      {filteredArtists.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredArtists.map((artist) => (
              <div 
                key={artist.id} 
                className="group bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-green-500/50 transition duration-300 flex flex-col"
              >
                {/* Image Area */}
                <div className="relative aspect-square overflow-hidden cursor-pointer" onClick={() => onSelectArtist(artist)}>
                  <img 
                    src={artist.avatarUrl} 
                    alt={artist.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition"></div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition">
                      <h3 className="text-xl font-bold text-white truncate shadow-black drop-shadow-md">{artist.name}</h3>
                      <div className="flex items-center gap-1 text-zinc-300 text-sm mt-0.5">
                          <MapPin size={14} className="text-green-500" />
                          <span>{artist.location.country}</span>
                      </div>
                  </div>

                  {/* Play Overlay Button */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      if (artist.tracks[0]) playTrack(artist.tracks[0]);
                    }}
                    className="absolute bottom-4 right-4 bg-green-500 text-black rounded-full p-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-xl hover:scale-110 active:scale-95"
                  >
                    <Play size={20} fill="black" className="ml-0.5" />
                  </button>
                </div>

                {/* Card Body */}
                <div className="p-4 flex flex-col gap-3 bg-zinc-900">
                    <div className="flex justify-between items-center">
                         <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider bg-zinc-950 px-2 py-1 rounded border border-zinc-800">
                             {artist.genre}
                         </span>
                         {/* Stars on Card */}
                         {artist.rating > 0 && (
                            <div className="flex items-center gap-1 text-yellow-400">
                                <Star size={12} fill="currentColor" />
                                <span className="text-xs font-bold">{artist.rating}</span>
                            </div>
                         )}
                    </div>
                    
                    <button 
                        onClick={() => onSelectArtist(artist)}
                        className="w-full mt-2 py-2 rounded-lg bg-zinc-800 text-zinc-300 text-sm font-medium hover:bg-zinc-700 hover:text-white transition"
                    >
                        Ver Perfil Completo
                    </button>
                </div>
              </div>
            ))}
          </div>
      ) : (
          <div className="flex flex-col items-center justify-center py-20 text-zinc-500 border border-dashed border-zinc-800 rounded-xl bg-zinc-900/20">
              <Filter size={48} className="mb-4 opacity-50" />
              <h3 className="text-lg font-medium text-white">No se encontraron artistas</h3>
              <p>Intenta ajustar tus filtros de búsqueda.</p>
              <button 
                 onClick={() => {setSearchTerm(''); setSelectedCountry('all'); setSelectedGenre('all');}}
                 className="mt-4 text-green-500 hover:text-green-400 text-sm font-medium"
              >
                  Limpiar filtros
              </button>
          </div>
      )}
    </div>
  );
};