import React, { useEffect, useState } from 'react';
import { mockDB } from '../services/mockDatabase';
import { UserBase, UserStatus } from '../types';
import { Trash2, Edit, ShieldCheck, User, Radio, Headphones, CheckCircle, XCircle, Clock, Filter, Globe, Instagram, Facebook, Youtube } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<UserBase[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'active'>('all');

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
    <div className="px-4 md:px-8 py-8 animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                    <ShieldCheck className="text-green-500" /> Panel Corporativo
                </h1>
                <p className="text-zinc-400">Gestión y evaluación de postulaciones.</p>
            </div>
            <div className="flex gap-2">
                <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded-lg text-sm font-medium transition ${filter === 'all' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-white'}`}>Todos</button>
                <button onClick={() => setFilter('pending')} className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 ${filter === 'pending' ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/50' : 'text-zinc-500 hover:text-white'}`}>
                    <Clock size={14} /> En Espera
                </button>
                <button onClick={() => setFilter('active')} className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 ${filter === 'active' ? 'bg-green-500/20 text-green-500 border border-green-500/50' : 'text-zinc-500 hover:text-white'}`}>
                    <CheckCircle size={14} /> Aceptados
                </button>
            </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
                <h3 className="text-zinc-500 text-sm font-bold uppercase mb-2">Total Usuarios</h3>
                <p className="text-3xl font-bold text-white">{users.length}</p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl relative overflow-hidden">
                 <div className="absolute right-0 top-0 p-3 opacity-10">
                    <Clock size={60} className="text-yellow-500" />
                </div>
                <h3 className="text-zinc-500 text-sm font-bold uppercase mb-2">En Espera</h3>
                <p className="text-3xl font-bold text-yellow-500">
                    {users.filter(u => u.status === 'pending').length}
                </p>
                <p className="text-xs text-zinc-500 mt-1">Requieren evaluación</p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
                <h3 className="text-zinc-500 text-sm font-bold uppercase mb-2">Aceptados</h3>
                <p className="text-3xl font-bold text-green-500">
                    {users.filter(u => u.status === 'active').length}
                </p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
                <h3 className="text-zinc-500 text-sm font-bold uppercase mb-2">Rechazados</h3>
                <p className="text-3xl font-bold text-red-500">
                    {users.filter(u => u.status === 'rejected').length}
                </p>
            </div>
        </div>

        {/* User Table */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-zinc-800 bg-zinc-950/50 flex justify-between items-center">
                <h3 className="font-bold text-white flex items-center gap-2">
                    <Filter size={16} className="text-zinc-500" /> Base de Datos Unificada
                </h3>
                <span className="text-xs text-zinc-500">Sincronizado con base de datos</span>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-zinc-400">
                    <thead className="text-xs text-zinc-500 uppercase bg-zinc-950/80">
                        <tr>
                            <th className="px-6 py-4">Postulante</th>
                            <th className="px-6 py-4">Perfil</th>
                            <th className="px-6 py-4">Enlaces (Evaluar)</th>
                            <th className="px-6 py-4">Estado</th>
                            <th className="px-6 py-4 text-right">Acción</th>
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
                            <tr key={user.id} className={`border-b border-zinc-800/50 transition hover:bg-zinc-800/30 ${user.status === 'pending' ? 'bg-yellow-900/5' : ''}`}>
                                <td className="px-6 py-4 flex items-center gap-3">
                                    <img src={user.avatarUrl} className="w-10 h-10 rounded-lg object-cover bg-zinc-800" alt="" />
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
                                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-zinc-800 text-zinc-200 text-xs border border-zinc-700 font-medium">
                                            <User size={12} /> Artista
                                        </span>
                                    )}
                                    {user.role === 'radio' && (
                                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-900/20 text-blue-400 text-xs border border-blue-900/40 font-medium">
                                            <Radio size={12} /> Radio
                                        </span>
                                    )}
                                    {user.role === 'producer' && (
                                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-purple-900/20 text-purple-400 text-xs border border-purple-900/40 font-medium">
                                            <Headphones size={12} /> Productor
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    {renderSocials(user)}
                                </td>
                                <td className="px-6 py-4">
                                    {user.status === 'active' && (
                                        <span className="flex items-center gap-2 text-green-500 font-bold text-xs bg-green-500/10 px-2 py-1 rounded w-fit border border-green-500/20">
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
                                            <XCircle size={12} /> No Califica
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    {user.status === 'pending' ? (
                                        <div className="flex justify-end gap-2">
                                            <button 
                                                className="bg-green-600 hover:bg-green-500 text-white px-3 py-1.5 rounded text-xs font-bold transition shadow-lg shadow-green-900/20 flex items-center gap-1"
                                                onClick={() => handleStatusChange(user.id, 'active')}
                                            >
                                                <CheckCircle size={14} /> Aprobar
                                            </button>
                                            <button 
                                                className="bg-zinc-800 hover:bg-red-600 text-zinc-400 hover:text-white px-3 py-1.5 rounded text-xs font-medium transition flex items-center gap-1"
                                                onClick={() => handleStatusChange(user.id, 'rejected')}
                                            >
                                                <XCircle size={14} /> Rechazar
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex justify-end gap-3 text-zinc-600">
                                            <button className="hover:text-white" title="Editar"><Edit size={16} /></button>
                                        </div>
                                    )}
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