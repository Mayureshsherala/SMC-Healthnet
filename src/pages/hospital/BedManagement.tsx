import React, { useState } from 'react';
import { 
  Bed, 
  Search, 
  Filter, 
  Plus, 
  CheckCircle2, 
  AlertCircle, 
  Clock,
  ArrowRight,
  Save,
  X
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useHospitalData, BedType } from '../../lib/hospitalData';

const BedManagement = () => {
  const { t } = useLanguage();
  const { hospitals, updateBeds } = useHospitalData();
  const [selectedHospitalId, setSelectedHospitalId] = useState(hospitals[0].id);
  const [editingBedId, setEditingBedId] = useState<string | null>(null);
  const [tempOccupied, setTempOccupied] = useState<number>(0);

  const selectedHospital = hospitals.find(h => h.id === selectedHospitalId) || hospitals[0];

  const handleEdit = (bedId: string, currentOccupied: number) => {
    setEditingBedId(bedId);
    setTempOccupied(currentOccupied);
  };

  const handleSave = (bedId: string) => {
    updateBeds(selectedHospitalId, bedId, tempOccupied);
    setEditingBedId(null);
  };

  const getBedColor = (type: BedType) => {
    switch (type) {
      case 'ICU': return 'text-red-600 bg-red-50 border-red-100';
      case 'Oxygen': return 'text-blue-600 bg-blue-50 border-blue-100';
      default: return 'text-emerald-600 bg-emerald-50 border-emerald-100';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{t('hospital.beds.title')}</h1>
          <p className="text-slate-500">{t('hospital.beds.subtitle')}</p>
        </div>
        <div className="flex items-center gap-3">
          <select 
            value={selectedHospitalId}
            onChange={(e) => setSelectedHospitalId(e.target.value)}
            className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm font-medium text-slate-700 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none shadow-sm"
          >
            {hospitals.map(h => (
              <option key={h.id} value={h.id}>{h.name}</option>
            ))}
          </select>
          <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-sm">
            <Plus size={18} />
            <span>Add Ward</span>
          </button>
        </div>
      </div>

      {/* Bed Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {selectedHospital.beds.map((bed) => {
          const available = bed.total - bed.occupied;
          const occupancyRate = (bed.occupied / bed.total) * 100;
          const isFull = occupancyRate >= 90;
          
          return (
            <div key={bed.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${getBedColor(bed.type)}`}>
                  <Bed size={24} />
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{bed.type}</p>
                  <p className={`text-sm font-bold ${isFull ? 'text-red-600' : 'text-emerald-600'}`}>
                    {isFull ? 'Critical' : 'Stable'}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-3xl font-bold text-slate-900">{available}</p>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{t('hospital.beds.available')}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-slate-600">{bed.occupied} / {bed.total}</p>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{t('hospital.beds.occupied')}</p>
                  </div>
                </div>

                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-500 ${
                      occupancyRate > 90 ? 'bg-red-500' : occupancyRate > 70 ? 'bg-amber-500' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${occupancyRate}%` }}
                  ></div>
                </div>

                {editingBedId === bed.id ? (
                  <div className="flex items-center gap-2 pt-2 animate-in fade-in slide-in-from-top-2 duration-200">
                    <input 
                      type="number" 
                      value={tempOccupied}
                      onChange={(e) => setTempOccupied(Math.min(bed.total, Math.max(0, parseInt(e.target.value) || 0)))}
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                    <button 
                      onClick={() => handleSave(bed.id)}
                      className="p-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                      <Save size={18} />
                    </button>
                    <button 
                      onClick={() => setEditingBedId(null)}
                      className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => handleEdit(bed.id, bed.occupied)}
                    className="w-full py-2.5 text-sm font-semibold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    <span>{t('hospital.beds.update')}</span>
                    <ArrowRight size={16} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Ward List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="font-bold text-slate-900">Detailed Ward Status</h3>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search wards..."
                className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none w-full sm:w-64"
              />
            </div>
            <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-xl border border-slate-200">
              <Filter size={18} />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider font-bold">
                <th className="px-6 py-4">Ward Name</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Capacity</th>
                <th className="px-6 py-4">Occupancy</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Last Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { name: 'Ward A - General', type: 'General', capacity: 50, occupied: 42, status: 'Stable', updated: '15 mins ago' },
                { name: 'Ward B - Pediatric', type: 'General', capacity: 30, occupied: 12, status: 'Available', updated: '1 hour ago' },
                { name: 'ICU Unit 1', type: 'ICU', capacity: 20, occupied: 19, status: 'Critical', updated: '5 mins ago' },
                { name: 'Oxygen Ward 1', type: 'Oxygen', capacity: 40, occupied: 35, status: 'Near Full', updated: '30 mins ago' },
              ].map((ward, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-slate-900">{ward.name}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      ward.type === 'ICU' ? 'bg-red-100 text-red-700' : ward.type === 'Oxygen' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'
                    }`}>
                      {ward.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{ward.capacity}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-slate-900">{Math.round((ward.occupied / ward.capacity) * 100)}%</span>
                      <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${ward.occupied / ward.capacity > 0.9 ? 'bg-red-500' : 'bg-emerald-500'}`}
                          style={{ width: `${(ward.occupied / ward.capacity) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      {ward.status === 'Critical' ? (
                        <AlertCircle size={14} className="text-red-500" />
                      ) : (
                        <CheckCircle2 size={14} className="text-emerald-500" />
                      )}
                      <span className={`text-xs font-semibold ${ward.status === 'Critical' ? 'text-red-600' : 'text-slate-600'}`}>
                        {ward.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-500">
                    <div className="flex items-center gap-1">
                      <Clock size={12} />
                      <span>{ward.updated}</span>
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

export default BedManagement;
