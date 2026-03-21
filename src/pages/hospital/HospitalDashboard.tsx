import React from 'react';
import { 
  Bed, 
  Package, 
  Activity, 
  AlertTriangle, 
  TrendingUp, 
  Users,
  Clock,
  ArrowRight
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useHospitalData } from '../../lib/hospitalData';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

const HospitalDashboard = () => {
  const { t } = useLanguage();
  const { hospitals } = useHospitalData();
  
  // For demo, we assume we are managing the first hospital
  const hospital = hospitals[0];
  
  const totalBeds = hospital.beds.reduce((acc, b) => acc + b.total, 0);
  const occupiedBeds = hospital.beds.reduce((acc, b) => acc + b.occupied, 0);
  const availableBeds = totalBeds - occupiedBeds;
  
  const icuBeds = hospital.beds.find(b => b.type === 'ICU');
  const oxygenBeds = hospital.beds.find(b => b.type === 'Oxygen');
  
  const lowStockItems = hospital.inventory.filter(i => i.status === 'Low Stock' || i.status === 'Out of Stock');
  const criticalEquipment = hospital.equipment.filter(e => e.status === 'Low' || e.status === 'Unavailable');

  const bedData = hospital.beds.map(b => ({
    name: b.type,
    available: b.total - b.occupied,
    occupied: b.occupied
  }));

  const COLORS = ['#10b981', '#f59e0b', '#ef4444'];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{t('hospital.dashboard.welcome')}</h1>
          <p className="text-slate-500">{t('hospital.dashboard.subtitle')}</p>
        </div>
        <div className="flex items-center gap-2 text-sm font-medium text-slate-500 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
          <Clock size={16} className="text-emerald-600" />
          <span>Last Updated: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
              <Bed size={24} />
            </div>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
              {Math.round((occupiedBeds / totalBeds) * 100)}% Full
            </span>
          </div>
          <p className="text-sm font-medium text-slate-500">{t('hospital.dashboard.available_beds')}</p>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">{availableBeds} / {totalBeds}</h3>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-red-600">
              <Activity size={24} />
            </div>
            <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded-full">
              {icuBeds ? Math.round((icuBeds.occupied / icuBeds.total) * 100) : 0}%
            </span>
          </div>
          <p className="text-sm font-medium text-slate-500">{t('hospital.dashboard.icu_available')}</p>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">
            {icuBeds ? icuBeds.total - icuBeds.occupied : 0} / {icuBeds?.total || 0}
          </h3>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
              <Package size={24} />
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
              {lowStockItems.length} Alerts
            </span>
          </div>
          <p className="text-sm font-medium text-slate-500">{t('hospital.dashboard.medicine_stock')}</p>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">
            {hospital.inventory.filter(i => i.category === 'Medicine').length} Items
          </h3>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
              <AlertTriangle size={24} />
            </div>
            <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
              {criticalEquipment.length} Low
            </span>
          </div>
          <p className="text-sm font-medium text-slate-500">{t('hospital.dashboard.equipment_status')}</p>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">
            {hospital.equipment.length} Categories
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bed Occupancy Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-900">Bed Occupancy by Type</h3>
            <div className="flex items-center gap-4 text-xs font-medium">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                <span>Available</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 bg-slate-200 rounded-full"></div>
                <span>Occupied</span>
              </div>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bedData} layout="vertical" margin={{ left: 40 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
                />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="occupied" stackId="a" fill="#e2e8f0" radius={[0, 0, 0, 0]} barSize={32} />
                <Bar dataKey="available" stackId="a" fill="#10b981" radius={[0, 4, 4, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Critical Alerts */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-4">Critical Alerts</h3>
          <div className="space-y-4">
            {lowStockItems.length === 0 && criticalEquipment.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mx-auto mb-3">
                  <Activity size={24} />
                </div>
                <p className="text-sm text-slate-500">All systems normal</p>
              </div>
            ) : (
              <>
                {lowStockItems.map(item => (
                  <div key={item.id} className="flex items-start gap-3 p-3 rounded-xl bg-red-50 border border-red-100">
                    <AlertTriangle className="text-red-600 mt-0.5" size={18} />
                    <div>
                      <p className="text-sm font-semibold text-red-900">{item.name} {item.status}</p>
                      <p className="text-xs text-red-700 mt-0.5">Current: {item.stock} {item.unit} (Threshold: {item.threshold})</p>
                    </div>
                  </div>
                ))}
                {criticalEquipment.map(equip => (
                  <div key={equip.id} className="flex items-start gap-3 p-3 rounded-xl bg-amber-50 border border-amber-100">
                    <AlertTriangle className="text-amber-600 mt-0.5" size={18} />
                    <div>
                      <p className="text-sm font-semibold text-amber-900">{equip.name} {equip.status}</p>
                      <p className="text-xs text-amber-700 mt-0.5">Only {equip.available} units available</p>
                    </div>
                  </div>
                ))}
              </>
            )}
            <button className="w-full py-3 text-sm font-semibold text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all flex items-center justify-center gap-2 mt-2">
              <span>View All Inventory</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900">Recent Operational Activity</h3>
          <button className="text-sm font-semibold text-emerald-600 hover:text-emerald-700">View History</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider font-bold">
                <th className="px-6 py-4">Activity</th>
                <th className="px-6 py-4">Department</th>
                <th className="px-6 py-4">Staff</th>
                <th className="px-6 py-4">Time</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { activity: 'Bed Status Updated', dept: 'ICU', staff: 'Nurse Anjali', time: '10 mins ago', status: 'Completed' },
                { activity: 'Medicine Stock Replenished', dept: 'Pharmacy', staff: 'Dr. Rahul', time: '45 mins ago', status: 'Completed' },
                { activity: 'Ventilator Maintenance', dept: 'Critical Care', staff: 'Tech Sunil', time: '2 hours ago', status: 'In Progress' },
                { activity: 'New Patient Admission', dept: 'General Ward', staff: 'Nurse Priya', time: '3 hours ago', status: 'Completed' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-slate-900">{row.activity}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{row.dept}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{row.staff}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{row.time}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      row.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {row.status}
                    </span>
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

export default HospitalDashboard;
