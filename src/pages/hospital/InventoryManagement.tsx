import React, { useState } from 'react';
import { 
  Package, 
  Search, 
  Filter, 
  Plus, 
  AlertTriangle, 
  CheckCircle2, 
  RefreshCw, 
  Edit3, 
  TrendingDown,
  ArrowUpRight,
  Save,
  X
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useHospitalData, ResourceStatus, StockStatus } from '../../lib/hospitalData';

const InventoryManagement = () => {
  const { t } = useLanguage();
  const { hospitals, updateInventory, updateEquipment } = useHospitalData();
  const [activeTab, setActiveTab] = useState<'equipment' | 'medicine' | 'vaccine'>('equipment');
  const [selectedHospitalId, setSelectedHospitalId] = useState(hospitals[0].id);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [tempStock, setTempStock] = useState<number>(0);

  const selectedHospital = hospitals.find(h => h.id === selectedHospitalId) || hospitals[0];

  const handleEdit = (itemId: string, currentStock: number) => {
    setEditingItemId(itemId);
    setTempStock(currentStock);
  };

  const handleSaveInventory = (itemId: string) => {
    updateInventory(selectedHospitalId, itemId, tempStock);
    setEditingItemId(null);
  };

  const handleSaveEquipment = (equipId: string, status: ResourceStatus) => {
    updateEquipment(selectedHospitalId, equipId, tempStock, status);
    setEditingItemId(null);
  };

  const getStatusColor = (status: ResourceStatus | StockStatus) => {
    switch (status) {
      case 'Available':
      case 'In Stock':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Low':
      case 'Low Stock':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Unavailable':
      case 'Out of Stock':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'Maintenance':
        return 'bg-slate-100 text-slate-700 border-slate-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{t('hospital.inventory.title')}</h1>
          <p className="text-slate-500">{t('hospital.inventory.subtitle')}</p>
        </div>
        <div className="flex items-center gap-3">
          <select 
            value={selectedHospitalId}
            onChange={(e) => setSelectedHospitalId(e.target.value)}
            className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm font-medium text-slate-700 focus:ring-2 focus:ring-emerald-500 outline-none shadow-sm"
          >
            {hospitals.map(h => (
              <option key={h.id} value={h.id}>{h.name}</option>
            ))}
          </select>
          <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-sm">
            <Plus size={18} />
            <span>Add Item</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl w-fit">
        <button 
          onClick={() => setActiveTab('equipment')}
          className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            activeTab === 'equipment' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          {t('hospital.inventory.equipment')}
        </button>
        <button 
          onClick={() => setActiveTab('medicine')}
          className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            activeTab === 'medicine' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          {t('hospital.inventory.medicines')}
        </button>
        <button 
          onClick={() => setActiveTab('vaccine')}
          className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            activeTab === 'vaccine' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          {t('hospital.inventory.vaccines')}
        </button>
      </div>

      {/* Inventory List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-slate-900">
              {activeTab === 'equipment' ? t('hospital.inventory.equipment') : 
               activeTab === 'medicine' ? t('hospital.inventory.medicines') : t('hospital.inventory.vaccines')}
            </h3>
            <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs font-bold">
              {activeTab === 'equipment' ? selectedHospital.equipment.length : 
               selectedHospital.inventory.filter(i => i.category === (activeTab === 'medicine' ? 'Medicine' : 'Vaccine')).length}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search inventory..."
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
                <th className="px-6 py-4">{t('hospital.inventory.item_name')}</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">{t('hospital.inventory.stock')}</th>
                <th className="px-6 py-4">{t('hospital.inventory.status')}</th>
                <th className="px-6 py-4">Last Updated</th>
                <th className="px-6 py-4 text-right">{t('hospital.inventory.actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {activeTab === 'equipment' ? (
                selectedHospital.equipment.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold text-slate-900">{item.name}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{item.category}</td>
                    <td className="px-6 py-4">
                      {editingItemId === item.id ? (
                        <input 
                          type="number" 
                          value={tempStock}
                          onChange={(e) => setTempStock(parseInt(e.target.value) || 0)}
                          className="w-20 bg-slate-50 border border-slate-200 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                        />
                      ) : (
                        <p className="text-sm font-bold text-slate-900">{item.available} / {item.total}</p>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-500">{item.lastUpdated}</td>
                    <td className="px-6 py-4 text-right">
                      {editingItemId === item.id ? (
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => handleSaveEquipment(item.id, item.status)}
                            className="p-1.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                          >
                            <Save size={16} />
                          </button>
                          <button 
                            onClick={() => setEditingItemId(null)}
                            className="p-1.5 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => handleEdit(item.id, item.available)}
                            className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                            title={t('hospital.inventory.update_stock')}
                          >
                            <Edit3 size={18} />
                          </button>
                          <button className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all" title={t('hospital.inventory.replenish')}>
                            <RefreshCw size={18} />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                selectedHospital.inventory
                  .filter(i => i.category === (activeTab === 'medicine' ? 'Medicine' : 'Vaccine'))
                  .map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="text-sm font-semibold text-slate-900">{item.name}</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{item.category}</td>
                      <td className="px-6 py-4">
                        {editingItemId === item.id ? (
                          <input 
                            type="number" 
                            value={tempStock}
                            onChange={(e) => setTempStock(parseInt(e.target.value) || 0)}
                            className="w-24 bg-slate-50 border border-slate-200 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                          />
                        ) : (
                          <p className="text-sm font-bold text-slate-900">{item.stock} {item.unit}</p>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-500">2026-03-18 10:00</td>
                      <td className="px-6 py-4 text-right">
                        {editingItemId === item.id ? (
                          <div className="flex items-center justify-end gap-2">
                            <button 
                              onClick={() => handleSaveInventory(item.id)}
                              className="p-1.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                            >
                              <Save size={16} />
                            </button>
                            <button 
                              onClick={() => setEditingItemId(null)}
                              className="p-1.5 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-end gap-2">
                            <button 
                              onClick={() => handleEdit(item.id, item.stock)}
                              className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                              title={t('hospital.inventory.update_stock')}
                            >
                              <Edit3 size={18} />
                            </button>
                            <button className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all" title={t('hospital.inventory.replenish')}>
                              <RefreshCw size={18} />
                            </button>
                            <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all" title={t('hospital.inventory.flag_shortage')}>
                              <AlertTriangle size={18} />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Analytics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-900">Stock Consumption Trend</h3>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">Last 30 Days</span>
          </div>
          <div className="space-y-4">
            {[
              { name: 'Paracetamol 500mg', change: -15, trend: 'down' },
              { name: 'Covishield Doses', change: +8, trend: 'up' },
              { name: 'Oxygen Cylinders', change: -22, trend: 'down' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
                <p className="text-sm font-medium text-slate-700">{item.name}</p>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold ${item.trend === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>
                    {item.change}%
                  </span>
                  {item.trend === 'up' ? <ArrowUpRight size={14} className="text-emerald-600" /> : <TrendingDown size={14} className="text-red-600" />}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-6">Inventory Health</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100">
              <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">Optimal Stock</p>
              <h4 className="text-2xl font-bold text-emerald-700">85%</h4>
              <p className="text-[10px] text-emerald-600 mt-1">Items above threshold</p>
            </div>
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-100">
              <p className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">Low Stock</p>
              <h4 className="text-2xl font-bold text-amber-700">12%</h4>
              <p className="text-[10px] text-amber-600 mt-1">Requires attention</p>
            </div>
            <div className="p-4 rounded-xl bg-red-50 border border-red-100">
              <p className="text-xs font-bold text-red-600 uppercase tracking-wider mb-1">Out of Stock</p>
              <h4 className="text-2xl font-bold text-red-700">3%</h4>
              <p className="text-[10px] text-red-600 mt-1">Critical shortage</p>
            </div>
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
              <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">Replenishing</p>
              <h4 className="text-2xl font-bold text-blue-700">5</h4>
              <p className="text-[10px] text-blue-600 mt-1">Active orders</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryManagement;
