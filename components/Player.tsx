import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart, Mic2 } from 'lucide-react';
import { usePlayer } from './PlayerContext';

export const Player: React.FC = () => {
  const { currentTrack, isPlaying, togglePlay, progress } = usePlayer();

  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-zinc-950 border-t border-zinc-800 h-24 px-4 z-50 flex items-center justify-between shadow-[0_-5px_30px_rgba(0,0,0,0.8)]">
      
        {/* Track Info */}
        <div className="flex items-center gap-4 w-1/3 min-w-[180px]">
          <div className="relative group">
            <img 
              src={currentTrack.coverUrl} 
              alt={currentTrack.title} 
              className="w-14 h-14 rounded-md object-cover shadow-lg group-hover:opacity-80 transition"
            />
          </div>
          <div className="overflow-hidden">
            <h4 className="text-white font-semibold truncate text-sm hover:underline cursor-pointer">{currentTrack.title}</h4>
            <p className="text-zinc-400 text-xs truncate hover:text-white cursor-pointer transition">{currentTrack.artistName}</p>
          </div>
          <button className="text-zinc-500 hover:text-green-500 ml-2 transition">
            <Heart size={18} />
          </button>
        </div>

        {/* Controls & Progress */}
        <div className="flex flex-col items-center max-w-md w-full px-4">
          <div className="flex items-center gap-6 mb-2">
            <button className="text-zinc-400 hover:text-white transition">
              <SkipBack size={20} />
            </button>
            <button 
              onClick={togglePlay}
              className="bg-green-500 text-black rounded-full p-2.5 hover:scale-105 hover:bg-green-400 transition active:scale-95 shadow-lg shadow-green-900/20"
            >
              {isPlaying ? <Pause size={22} fill="black" /> : <Play size={22} fill="black" className="ml-1" />}
            </button>
            <button className="text-zinc-400 hover:text-white transition">
              <SkipForward size={20} />
            </button>
          </div>
          
          <div className="w-full flex items-center gap-3 text-xs text-zinc-400 font-mono">
            <span className="min-w-[35px] text-right">0:{(progress * 0.01 * 200).toFixed(0).padStart(2,'0')}</span>
            <div className="flex-1 h-1 bg-zinc-800 rounded-full overflow-hidden cursor-pointer relative group">
                <div 
                  className="h-full bg-green-500 rounded-full absolute top-0 left-0 transition-all duration-300 group-hover:bg-green-400"
                  style={{ width: `${progress}%` }}
                />
            </div>
            <span className="min-w-[35px]">{currentTrack.duration}</span>
          </div>
        </div>

        {/* Volume & Extras */}
        <div className="flex items-center justify-end gap-3 w-1/3 min-w-[180px]">
            <button className="text-zinc-400 hover:text-white">
                <Mic2 size={18} />
            </button>
            <div className="flex items-center gap-2 group">
                <Volume2 size={18} className="text-zinc-400 group-hover:text-white" />
                <div className="w-24 h-1 bg-zinc-800 rounded-full overflow-hidden cursor-pointer">
                    <div className="h-full bg-zinc-500 group-hover:bg-green-500 w-2/3 transition-colors"></div>
                </div>
            </div>
        </div>
    </div>
  );
};