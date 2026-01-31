import React, { useEffect, useState } from 'react';
import { mockDB } from '../services/mockDatabase';
import { UserBase, UserStatus } from '../types';
import { Trash2, Edit, ShieldCheck, User, Radio, Headphones, CheckCircle, XCircle, Clock, Filter, Globe, Instagram, Facebook, Youtube, MoreHorizontal, RefreshCw, Ban } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<UserBase[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'active'>('all');
  const [actionMenuOpen, setActionMenuOpen] = useState<string | null>(null);

  // Load users from DB on mount
  useEffect(() => {
    const loadUsers = () => {
        const dbUsers = mockDB.getUsers();
        setUsers(dbUsers);
    };
    loadUsers();
    
    // Set up a simple interval to poll for changes (simulation of real-time)
    const interval = setInterval(loadUsers, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleStatusChange = (id: string, newStatus: UserStatus) => {
      mockDB.updateUserStatus(id, newStatus);
      // Immediately update local state to reflect change
      setUsers(prev => prev.map(u => u.id === id ? { ...u, status: newStatus } : u));
      setActionMenuOpen(null);
  };

  const filteredUsers = users.filter(u => filter === 'all' || u.status === filter);

  // Helper to render social icons
  const renderSocials = (user: any) => {
      const socials = user.socials || {};
      return (
          <div className="flex gap-2">
              {socials.website && (
                  <a href={socials.website} target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white" title="Web">
                      <Globe size={16} />
                  </a>
              )}
              {socials.instagram && (
                  <a href={`https://instagram.com/${socials.instagram.replace('@','')}`} target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-pink-500" title="Instagram">
                      <Instagram size={16} />
                  </a>
              )}
              {socials.facebook && (
                  <a href={socials.facebook} target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-blue-500" title="Facebook">
                      <Facebook size={16} />
                  </a>
              )}
              {socials.youtube && (
                  <a href={socials.youtube} target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-red-500" title="YouTube">
                      <Youtube size={16} />
                  </a>
              )}
          </div>
      );
  };

  return (
    <div className="px-4 md:px-8 py-8 animate-fade-in relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                    <ShieldCheck className="text-green-500" /> Panel Corporativo
                </h1>
                <p className="text-zinc-400">Control maestro de ecosistema EMERHIT.</p>
            </div>
            <div className="flex gap-2 bg-zinc-900/80 p-1 rounded-xl border border-zinc-800 backdrop-blur-sm">
                <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded-lg text-sm font-bold transition ${filter === 'all' ? 'bg-zinc-800 text-white shadow-lg' : 'text-zinc-500 hover:text-white'}`}>Todos</button>
                <button onClick={() => setFilter('pending')} className={`px-4 py-2 rounded-lg text-sm font-bold transition flex items-center gap-2 ${filter === 'pending' ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/50' : 'text-zinc-500 hover:text-white'}`}>
                    <Clock size={14} /> En Espera
                </button>
                <button onClick={() => setFilter('active')} className={`px-4 py-2 rounded-lg text-sm font-bold transition flex items-center gap-2 ${filter === 'active' ? 'bg-green-500/20 text-green-500 border border-green-500/50' : 'text-zinc-500 hover:text-white'}`}>
                    <CheckCircle size={14} /> Aceptados
                </button>
            </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 mb-8">
            <div className="bg-zinc-900/60 backdrop-blur border border-zinc-800 p-6 rounded-2xl">
                <h3 className="text-zinc-500 text-xs font-bold uppercase tracking-wider mb-2">Total Usuarios</h3>
                <p className="text-3xl font-bold text-white">{users.length}</p>
            </div>
            <div className="bg-zinc-900/60 backdrop-blur border border-zinc-800 p-6 rounded-2xl relative overflow-hidden">
                 <div className="absolute right-0 top-0 p-3 opacity-10">
                    <Clock size={60} className="text-yellow-500" />
                </div>
                <h3 className="text-zinc-500 text-xs font-bold uppercase tracking-wider mb-2">En Espera</h3>
                <p className="text-3xl font-bold text-yellow-500">
                    {users.filter(u => u.status === 'pending').length}
                </p>
                <p className="text-xs text-zinc-500 mt-1">Requieren evaluación</p>
            </div>
            <div className="bg-zinc-900/60 backdrop-blur border border-zinc-800 p-6 rounded-2xl">
                <h3 className="text-zinc-500 text-xs font-bold uppercase tracking-wider mb-2">Aceptados</h3>
                <p className="text-3xl font-bold text-green-500">
                    {users.filter(u => u.status === 'active').length}
                </p>
            </div>
            <div className="bg-zinc-900/60 backdrop-blur border border-zinc-800 p-6 rounded-2xl">
                <h3 className="text-zinc-500 text-xs font-bold uppercase tracking-wider mb-2">Rechazados</h3>
                <p className="text-3xl font-bold text-red-500">
                    {users.filter(u => u.status === 'rejected').length}
                </p>
            </div>
        </div>

        {/* User Table */}
        <div className="bg-zinc-900/60 backdrop-blur border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-zinc-800 bg-zinc-950/50 flex justify-between items-center">
                <h3 className="font-bold text-white flex items-center gap-2">
                    <Filter size={16} className="text-zinc-500" /> Base de Datos Unificada
                </h3>
                <span className="text-xs text-zinc-500">Sincronizado en tiempo real</span>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-zinc-400">
                    <thead className="text-xs text-zinc-500 uppercase bg-zinc-950/80">
                        <tr>
                            <th className="px-6 py-4">Postulante</th>
                            <th className="px-6 py-4">Perfil</th>
                            <th className="px-6 py-4">Enlaces</th>
                            <th className="px-6 py-4">Estado Actual</th>
                            <th className="px-6 py-4 text-right">Modificar Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-8 text-center text-zinc-600">
                                    No hay usuarios en esta categoría.
                                </td>
                            </tr>
                        ) : filteredUsers.map((user: any) => (
                            <tr key={user.id} className={`border-b border-zinc-800/50 transition hover:bg-zinc-800/30 ${user.status === 'pending' ? 'bg-yellow-500/5' : ''}`}>
                                <td className="px-6 py-4 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full overflow-hidden border border-zinc-700 bg-zinc-800">
                                       <img src={user.avatarUrl} className="w-full h-full object-cover" alt="" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-white text-base">{user.name}</div>
                                        <div className="text-xs text-zinc-500">{user.email}</div>
                                        {user.demoUrl && (
                                            <a href={user.demoUrl} target="_blank" rel="noreferrer" className="text-[10px] text-blue-400 hover:underline flex items-center gap-1 mt-1">
                                                Ver Demo/Portfolio
                                            </a>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    {user.role === 'artist' && (
                                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-zinc-800 text-zinc-200 text-xs border border-zinc-700 font-bold">
                                            <User size={12} /> Artista
                                        </span>
                                    )}
                                    {user.role === 'radio' && (
                                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-900/20 text-blue-400 text-xs border border-blue-900/40 font-bold">
                                            <Radio size={12} /> Radio
                                        </span>
                                    )}
                                    {user.role === 'producer' && (
                                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-purple-900/20 text-purple-400 text-xs border border-purple-900/40 font-bold">
                                            <Headphones size={12} /> Productor
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    {renderSocials(user)}
                                </td>
                                <td className="px-6 py-4">
                                    {user.status === 'active' && (
                                        <span className="flex items-center gap-2 text-green-500 font-bold text-xs bg-green-500/10 px-2 py-1 rounded w-fit border border-green-500/20 shadow-[0_0_10px_rgba(34,197,94,0.1)]">
                                            <CheckCircle size={12} /> Aceptado
                                        </span>
                                    )}
                                    {user.status === 'pending' && (
                                        <span className="flex items-center gap-2 text-yellow-500 font-bold text-xs bg-yellow-500/10 px-2 py-1 rounded w-fit border border-yellow-500/20 animate-pulse">
                                            <Clock size={12} /> En Espera
                                        </span>
                                    )}
                                    {user.status === 'rejected' && (
                                        <span className="flex items-center gap-2 text-red-500 font-bold text-xs bg-red-500/10 px-2 py-1 rounded w-fit border border-red-500/20">
                                            <XCircle size={12} /> Rechazado
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    {/* Action Buttons Logic - Allows modifying ANY state */}
                                    <div className="flex justify-end gap-2">
                                        {user.status !== 'active' && (
                                            <button 
                                                className="bg-green-600 hover:bg-green-500 text-white p-1.5 rounded transition shadow-lg shadow-green-900/20"
                                                onClick={() => handleStatusChange(user.id, 'active')}
                                                title="Aprobar / Activar"
                                            >
                                                <CheckCircle size={16} />
                                            </button>
                                        )}
                                        
                                        {user.status !== 'rejected' && (
                                            <button 
                                                className="bg-zinc-800 hover:bg-red-600 text-zinc-400 hover:text-white p-1.5 rounded transition border border-zinc-700 hover:border-red-500"
                                                onClick={() => handleStatusChange(user.id, 'rejected')}
                                                title="Rechazar / Suspender"
                                            >
                                                <Ban size={16} />
                                            </button>
                                        )}

                                        {user.status !== 'pending' && (
                                            <button 
                                                className="bg-zinc-800 hover:bg-yellow-600 text-zinc-400 hover:text-white p-1.5 rounded transition border border-zinc-700 hover:border-yellow-500"
                                                onClick={() => handleStatusChange(user.id, 'pending')}
                                                title="Poner en Espera (Re-evaluar)"
                                            >
                                                <RefreshCw size={16} />
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  );
};