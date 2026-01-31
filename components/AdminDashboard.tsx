import React from 'react';
import { MOCK_ARTISTS, MOCK_RADIOS } from '../constants';
import { Trash2, Edit, ShieldCheck, User, Radio } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  return (
    <div className="px-4 md:px-8 py-8 animate-fade-in">
        <div className="flex justify-between items-center mb-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                    <ShieldCheck className="text-green-500" /> Administración EMERHIT
                </h1>
                <p className="text-zinc-400">Panel de control maestro.</p>
            </div>
            <button className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-bold transition">
                + Nuevo Usuario Manual
            </button>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
                <h3 className="text-zinc-500 text-sm font-bold uppercase mb-2">Artistas Totales</h3>
                <p className="text-4xl font-bold text-white">{MOCK_ARTISTS.length}</p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
                <h3 className="text-zinc-500 text-sm font-bold uppercase mb-2">Radios Totales</h3>
                <p className="text-4xl font-bold text-white">{MOCK_RADIOS.length}</p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
                <h3 className="text-zinc-500 text-sm font-bold uppercase mb-2">Solicitudes Pendientes</h3>
                <p className="text-4xl font-bold text-yellow-500">3</p>
            </div>
        </div>

        {/* User Table */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-zinc-800 bg-zinc-950/50">
                <h3 className="font-bold text-white">Base de Datos de Usuarios</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-zinc-400">
                    <thead className="text-xs text-zinc-500 uppercase bg-zinc-950/50">
                        <tr>
                            <th className="px-6 py-3">Usuario</th>
                            <th className="px-6 py-3">Rol</th>
                            <th className="px-6 py-3">Ubicación</th>
                            <th className="px-6 py-3">Estado</th>
                            <th className="px-6 py-3 text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[...MOCK_ARTISTS, ...MOCK_RADIOS].map((user: any) => (
                            <tr key={user.id} className="border-b border-zinc-800 hover:bg-zinc-800/30">
                                <td className="px-6 py-4 flex items-center gap-3">
                                    <img src={user.avatarUrl} className="w-8 h-8 rounded-full" alt="" />
                                    <div>
                                        <div className="font-bold text-white">{user.name}</div>
                                        <div className="text-xs">{user.email}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    {user.role === 'artist' ? (
                                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-zinc-800 text-zinc-200 text-xs border border-zinc-700">
                                            <User size={12} /> Artista
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-blue-900/30 text-blue-400 text-xs border border-blue-900/50">
                                            <Radio size={12} /> Radio
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-4">{user.location.display}</td>
                                <td className="px-6 py-4">
                                    <span className="w-2 h-2 rounded-full bg-green-500 inline-block mr-2"></span> Activo
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-zinc-500 hover:text-white mr-3" onClick={() => alert('Función Editar simulada')}>
                                        <Edit size={16} />
                                    </button>
                                    <button className="text-zinc-500 hover:text-red-500" onClick={() => alert('Función Eliminar simulada')}>
                                        <Trash2 size={16} />
                                    </button>
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