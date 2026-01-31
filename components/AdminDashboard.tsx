import React from 'react';
import { MOCK_ARTISTS, MOCK_RADIOS, MOCK_PRODUCERS } from '../constants';
import { Trash2, Edit, ShieldCheck, User, Radio, Headphones, CheckCircle, XCircle } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  // Combine all users for display
  const allUsers = [...MOCK_ARTISTS, ...MOCK_RADIOS, ...MOCK_PRODUCERS];

  return (
    <div className="px-4 md:px-8 py-8 animate-fade-in">
        <div className="flex justify-between items-center mb-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                    <ShieldCheck className="text-green-500" /> Administración EMERHIT
                </h1>
                <p className="text-zinc-400">Panel de control maestro y evaluación de perfiles.</p>
            </div>
            <button className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-bold transition">
                + Nuevo Usuario Manual
            </button>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
                <h3 className="text-zinc-500 text-sm font-bold uppercase mb-2">Artistas</h3>
                <p className="text-3xl font-bold text-white">{MOCK_ARTISTS.length}</p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
                <h3 className="text-zinc-500 text-sm font-bold uppercase mb-2">Radios</h3>
                <p className="text-3xl font-bold text-white">{MOCK_RADIOS.length}</p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
                <h3 className="text-zinc-500 text-sm font-bold uppercase mb-2">Productores</h3>
                <p className="text-3xl font-bold text-white">{MOCK_PRODUCERS.length}</p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl relative overflow-hidden">
                <div className="absolute right-0 top-0 p-3 opacity-10">
                    <CheckCircle size={60} className="text-yellow-500" />
                </div>
                <h3 className="text-zinc-500 text-sm font-bold uppercase mb-2">Pendientes</h3>
                <p className="text-3xl font-bold text-yellow-500">
                    {allUsers.filter(u => u.status === 'pending').length}
                </p>
            </div>
        </div>

        {/* User Table */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-zinc-800 bg-zinc-950/50 flex justify-between items-center">
                <h3 className="font-bold text-white">Base de Datos de Usuarios</h3>
                <span className="text-xs text-zinc-500">Mostrando {allUsers.length} registros</span>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-zinc-400">
                    <thead className="text-xs text-zinc-500 uppercase bg-zinc-950/50">
                        <tr>
                            <th className="px-6 py-3">Usuario</th>
                            <th className="px-6 py-3">Rol</th>
                            <th className="px-6 py-3">Ubicación</th>
                            <th className="px-6 py-3">Estado</th>
                            <th className="px-6 py-3 text-right">Evaluación</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allUsers.map((user: any) => (
                            <tr key={user.id} className="border-b border-zinc-800 hover:bg-zinc-800/30">
                                <td className="px-6 py-4 flex items-center gap-3">
                                    <img src={user.avatarUrl} className="w-8 h-8 rounded-full" alt="" />
                                    <div>
                                        <div className="font-bold text-white">{user.name}</div>
                                        <div className="text-xs">{user.email}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    {user.role === 'artist' && (
                                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-zinc-800 text-zinc-200 text-xs border border-zinc-700">
                                            <User size={12} /> Artista
                                        </span>
                                    )}
                                    {user.role === 'radio' && (
                                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-blue-900/30 text-blue-400 text-xs border border-blue-900/50">
                                            <Radio size={12} /> Radio
                                        </span>
                                    )}
                                    {user.role === 'producer' && (
                                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-purple-900/30 text-purple-400 text-xs border border-purple-900/50">
                                            <Headphones size={12} /> Prod.
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-4">{user.location.display}</td>
                                <td className="px-6 py-4">
                                    {user.status === 'active' ? (
                                        <span className="flex items-center gap-2 text-green-500">
                                            <span className="w-2 h-2 rounded-full bg-green-500"></span> Activo
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-2 text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded w-fit">
                                            <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span> Pendiente
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    {user.status === 'pending' ? (
                                        <div className="flex justify-end gap-2">
                                            <button 
                                                className="bg-green-600 hover:bg-green-500 text-white p-1.5 rounded transition"
                                                title="Aprobar"
                                                onClick={() => alert(`Usuario ${user.name} Aprobado (Simulación)`)}
                                            >
                                                <CheckCircle size={16} />
                                            </button>
                                            <button 
                                                className="bg-red-600 hover:bg-red-500 text-white p-1.5 rounded transition"
                                                title="Rechazar"
                                                onClick={() => alert(`Usuario ${user.name} Rechazado (Simulación)`)}
                                            >
                                                <XCircle size={16} />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex justify-end gap-3 text-zinc-600">
                                            <button className="hover:text-white"><Edit size={16} /></button>
                                            <button className="hover:text-red-500"><Trash2 size={16} /></button>
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