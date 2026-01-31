import React, { useState } from 'react';
import { X, Send, Radio } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  artistName: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, artistName }) => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    
    // Simulación de envío
    setTimeout(() => {
      setIsSending(false);
      alert(`Mensaje enviado a ${artistName} correctamente.`);
      onClose();
      setSubject('');
      setMessage('');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-lg shadow-2xl relative overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-zinc-800 flex justify-between items-center bg-zinc-950/50">
          <div className="flex items-center gap-2">
            <div className="bg-green-500/20 p-2 rounded-full">
                <Radio className="text-green-500" size={20} />
            </div>
            <div>
                <h3 className="text-white font-bold text-lg">Contactar Artista</h3>
                <p className="text-zinc-500 text-xs">Mensajería directa EMERHIT</p>
            </div>
          </div>
          <button onClick={onClose} className="text-zinc-400 hover:text-white transition hover:bg-zinc-800 p-2 rounded-full">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1 uppercase">Destinatario</label>
            <input 
              type="text" 
              value={artistName} 
              disabled 
              className="w-full bg-zinc-950 border border-zinc-800 text-zinc-300 rounded-lg px-3 py-2 text-sm focus:outline-none cursor-not-allowed opacity-70"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1 uppercase">Asunto</label>
            <input 
              type="text" 
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Ej: Propuesta de entrevista / Rotación radial"
              required
              className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all placeholder:text-zinc-600"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1 uppercase">Mensaje</label>
            <textarea 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Escribe tu mensaje aquí..."
              required
              rows={5}
              className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all placeholder:text-zinc-600 resize-none"
            />
          </div>

          <div className="pt-2 flex justify-end gap-3">
             <button 
                type="button" 
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white transition"
             >
                Cancelar
             </button>
             <button 
                type="submit" 
                disabled={isSending}
                className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-lg text-sm font-bold transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(22,163,74,0.3)]"
             >
                {isSending ? (
                    <>Enviando...</>
                ) : (
                    <>
                        <Send size={16} /> Enviar Mensaje
                    </>
                )}
             </button>
          </div>
        </form>
      </div>
    </div>
  );
};