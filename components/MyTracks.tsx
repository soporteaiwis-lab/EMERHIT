import React from 'react';
import { MOCK_TRACKS } from '../constants';
import { usePlayer } from './PlayerContext';
import { Play, Pause, MoreVertical, Upload, Clock } from 'lucide-react';

export const MyTracks: React.FC = () => {
  const { playTrack, currentTrack, isPlaying, togglePlay } = usePlayer();

  // In a real app, we would filter by the logged-in artist ID.
  // For simulation, we show all mock tracks as if they belong to the user or a mix.
  const myTracks = MOCK_TRACKS; 

  return (
    <div className="px-4 md:px-8 py-8 animate-fade-in">
        <div className="flex justify-between items-end mb-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Mi Biblioteca</h1>
                <p className="text-zinc-400">Gestiona tu discografía y sube nuevo material.</p>
            </div>
            <button 
                onClick={() => alert("Simulación: Abriendo modal de carga de archivos...")}
                className="bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-full text-sm font-bold transition flex items-center gap-2 shadow-lg shadow-green-900/20"
            >
                <Upload size={18} /> Subir Nueva Canción
            </button>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden">
            <table className="w-full text-left">
                <thead className="bg-zinc-950/50 text-zinc-500 text-xs uppercase border-b border-zinc-800">
                    <tr>
                        <th className="px-6 py-4 w-12">#</th>
                        <th className="px-6 py-4">Título</th>
                        <th className="px-6 py-4 hidden md:table-cell">Álbum</th>
                        <th className="px-6 py-4 hidden sm:table-cell">Fecha Subida</th>
                        <th className="px-6 py-4"><Clock size={16} /></th>
                        <th className="px-6 py-4"></th>
                    </tr>
                </thead>
                <tbody>
                    {myTracks.map((track, index) => {
                        const isActive = currentTrack?.id === track.id;
                        return (
                            <tr 
                                key={track.id} 
                                className={`group hover:bg-zinc-800/50 transition border-b border-zinc-800/50 last:border-0 ${isActive ? 'bg-zinc-800/30' : ''}`}
                                onDoubleClick={() => playTrack(track)}
                            >
                                <td className="px-6 py-4 text-zinc-500 text-sm font-mono w-12">
                                    <div className="relative w-4 h-4 flex items-center justify-center">
                                        <span className={`group-hover:hidden ${isActive ? 'text-green-500' : ''}`}>{index + 1}</span>
                                        <button 
                                            onClick={() => isActive ? togglePlay() : playTrack(track)}
                                            className="hidden group-hover:block text-white"
                                        >
                                            {isActive && isPlaying ? <Pause size={14} /> : <Play size={14} />}
                                        </button>
                                        {isActive && isPlaying && <span className="group-hover:hidden absolute inset-0 flex items-end justify-center gap-0.5 pb-0.5">
                                            <span className="w-0.5 bg-green-500 h-2 animate-pulse"></span>
                                            <span className="w-0.5 bg-green-500 h-3 animate-pulse delay-75"></span>
                                        </span>}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <img src={track.coverUrl} alt="" className="w-10 h-10 rounded shadow-sm" />
                                        <div>
                                            <div className={`font-medium ${isActive ? 'text-green-500' : 'text-white'}`}>{track.title}</div>
                                            <div className="text-xs text-zinc-500">{track.artistName}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-zinc-400 text-sm hidden md:table-cell">Single</td>
                                <td className="px-6 py-4 text-zinc-500 text-sm hidden sm:table-cell">Hace 2 días</td>
                                <td className="px-6 py-4 text-zinc-500 text-sm font-mono">{track.duration}</td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-zinc-500 hover:text-white transition">
                                        <MoreVertical size={18} />
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    </div>
  );
};