import { useState } from 'react';
import { Users, Search, Filter, MapPin, Activity, CheckCircle, Clock, Check } from 'lucide-react';
import { usePublicHealthData } from '../../lib/publicHealthData';

export default function FieldWorkers() {
  const { workers } = usePublicHealthData();
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = () => {
    setIsAdding(true);
    setTimeout(() => setIsAdding(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Field Workers (ASHA)</h1>
          <p className="text-sm text-slate-500">Manage and monitor community health workers</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button 
            onClick={handleAdd}
            disabled={isAdding}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm flex items-center gap-2 disabled:opacity-70"
          >
            {isAdding ? (
              <>
                <Check className="w-4 h-4" />
                Worker Added
              </>
            ) : (
              <>
                <Users className="w-4 h-4" />
                Add Worker
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-4">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-3xl font-bold text-slate-900">412</h3>
          <p className="text-sm font-medium text-slate-500 mt-1">Total Active Workers</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-4">
            <CheckCircle className="w-6 h-6" />
          </div>
          <h3 className="text-3xl font-bold text-slate-900">8,450</h3>
          <p className="text-sm font-medium text-slate-500 mt-1">Tasks Completed (This Month)</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mb-4">
            <Clock className="w-6 h-6" />
          </div>
          <h3 className="text-3xl font-bold text-slate-900">94%</h3>
          <p className="text-sm font-medium text-slate-500 mt-1">Task Completion Rate</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search workers by name or ID..." 
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-white border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-medium">Worker ID</th>
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Assigned Ward</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Tasks Completed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {workers.map((worker) => (
                <tr key={worker.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-mono text-slate-500">{worker.id}</td>
                  <td className="px-6 py-4 font-medium text-slate-900">{worker.name}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      {worker.ward}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      worker.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {worker.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-medium text-slate-900">
                    {worker.tasksCompleted}
                  </td>
                </tr>
              ))}
              {workers.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    Loading workers...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
