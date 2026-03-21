import { useState } from 'react';
import { Calendar, Clock, MapPin, Video, Plus, Check, User as UserIcon } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { usePublicHealthData } from '../../lib/publicHealthData';

export default function Appointments() {
  const { t } = useLanguage();
  const { appointments } = usePublicHealthData();
  const [actionState, setActionState] = useState<{id: string, action: string} | null>(null);

  const handleAction = (id: string, action: string) => {
    setActionState({ id, action });
    setTimeout(() => setActionState(null), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{t('appointments.title')}</h1>
          <p className="text-sm text-slate-500">{t('appointments.subtitle')}</p>
        </div>
        <button className="bg-sky-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-sky-700 transition-colors shadow-sm flex items-center gap-2">
          <Plus className="w-4 h-4" />
          {t('appointments.book')}
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">{t('appointments.upcoming')}</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-500 font-medium">{t('appointments.filter')}</span>
            <select className="bg-white border border-slate-200 text-sm rounded-lg px-3 py-1.5 text-slate-700 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none">
              <option>{t('appointments.all')}</option>
              <option>{t('appointments.inperson')}</option>
              <option>{t('appointments.tele')}</option>
            </select>
          </div>
        </div>
        
        <div className="divide-y divide-slate-100">
          {appointments.map((apt) => (
            <div key={apt.id} className="p-6 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row gap-6 sm:items-center group">
              <div className="flex flex-col items-center justify-center w-20 h-20 bg-sky-50 rounded-2xl border border-sky-100 shrink-0">
                <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">{new Date(apt.date).toLocaleString('default', { month: 'short' })}</span>
                <span className="text-2xl font-black text-sky-900 leading-none mt-1">{new Date(apt.date).getDate()}</span>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-bold text-slate-900 truncate">{apt.type}</h3>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                    apt.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 
                    'bg-amber-100 text-amber-700 border-amber-200'
                  }`}>
                    {apt.status}
                  </span>
                </div>
                
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-600">
                  <span className="flex items-center gap-1.5 font-medium text-slate-800">
                    <UserIcon className="w-4 h-4 text-slate-400" /> {apt.doctor}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-slate-400" /> {apt.time}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-slate-400" /> Civil Hospital, Solapur
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:items-end gap-2 shrink-0 mt-4 sm:mt-0">
                <button 
                  onClick={() => handleAction(apt.id, 'reschedule')}
                  disabled={actionState?.id === apt.id}
                  className="w-full sm:w-auto bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors disabled:opacity-70"
                >
                  {actionState?.id === apt.id && actionState.action === 'reschedule' ? t('appointments.request_sent') : t('appointments.reschedule')}
                </button>
                <button 
                  onClick={() => handleAction(apt.id, 'join')}
                  disabled={actionState?.id === apt.id}
                  className="w-full sm:w-auto bg-sky-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-sky-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {actionState?.id === apt.id && actionState.action === 'join' ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {t('appointments.connecting')}
                    </>
                  ) : (
                    <>
                      <Video className="w-4 h-4" />
                      {t('appointments.join')}
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
          {appointments.length === 0 && (
            <div className="p-8 text-center text-slate-500">
              Loading appointments...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
