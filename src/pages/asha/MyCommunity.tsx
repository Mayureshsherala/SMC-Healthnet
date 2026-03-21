import { Users, Search, MapPin, Phone, Home, Check } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const communityData = [
  { id: 'F-001', head: 'Ramesh Sharma', members: 4, location: 'House 42, Lane 3', phone: '+91 98765 43210', risk: 'Low' },
  { id: 'F-002', head: 'Sunita Verma', members: 3, location: 'House 18, Lane 1', phone: '+91 87654 32109', risk: 'High' },
  { id: 'F-003', head: 'Anjali Desai', members: 5, location: 'House 55, Lane 4', phone: '+91 76543 21098', risk: 'Medium' },
  { id: 'F-004', head: 'Kishore Patil', members: 2, location: 'House 12, Lane 2', phone: '+91 65432 10987', risk: 'Low' },
];

export default function MyCommunity() {
  const [isAdding, setIsAdding] = useState(false);
  const { t } = useLanguage();

  const handleAdd = () => {
    setIsAdding(true);
    setTimeout(() => setIsAdding(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{t('asha.community.title')}</h1>
          <p className="text-sm text-slate-500">{t('asha.community.subtitle')}</p>
        </div>
        <button 
          onClick={handleAdd}
          disabled={isAdding}
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors shadow-sm flex items-center gap-2 disabled:opacity-70"
        >
          {isAdding ? (
            <>
              <Check className="w-4 h-4" />
              {t('asha.community.family_added')}
            </>
          ) : (
            <>
              <Users className="w-4 h-4" />
              {t('asha.community.add_family')}
            </>
          )}
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder={t('asha.community.search')} 
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-white border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-medium">{t('asha.community.family_id')}</th>
                <th className="px-6 py-4 font-medium">{t('asha.community.head')}</th>
                <th className="px-6 py-4 font-medium">{t('asha.community.location')}</th>
                <th className="px-6 py-4 font-medium">{t('asha.community.contact')}</th>
                <th className="px-6 py-4 font-medium text-right">{t('asha.community.risk')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {communityData.map((family) => (
                <tr key={family.id} className="hover:bg-slate-50 transition-colors cursor-pointer group">
                  <td className="px-6 py-4 font-mono text-slate-500">{family.id}</td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900">{family.head}</div>
                    <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                      <Users className="w-3 h-3" /> {family.members} {t('asha.community.members')}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <Home className="w-4 h-4 text-slate-400" />
                      {family.location}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <Phone className="w-4 h-4 text-slate-400" />
                      {family.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${
                      family.risk === 'High' ? 'bg-rose-100 text-rose-700 border-rose-200' : 
                      family.risk === 'Medium' ? 'bg-amber-100 text-amber-700 border-amber-200' : 
                      'bg-emerald-100 text-emerald-700 border-emerald-200'
                    }`}>
                      {family.risk}
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
}
