import { FileText, Calendar, Activity, AlertCircle, ChevronRight, MapPin, Phone, Check, Video, Syringe, Map as MapIcon, Megaphone } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

export default function CitizenDashboard() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [calling, setCalling] = useState(false);

  const handleCall = () => {
    setCalling(true);
    setTimeout(() => setCalling(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{t('dashboard.greeting')}</h1>
          <p className="text-sm text-slate-500">{t('dashboard.subtitle')}</p>
        </div>
        <button 
          onClick={() => navigate('/citizen/report')}
          className="bg-sky-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-sky-700 transition-colors shadow-sm flex items-center gap-2 w-fit"
        >
          <Activity className="w-4 h-4" />
          {t('dashboard.report_symptoms')}
        </button>
      </div>

      {/* Health Advisory Banner */}
      <div className="bg-rose-50 border border-rose-100 rounded-xl p-4 flex items-start gap-4">
        <div className="bg-rose-100 p-2 rounded-lg text-rose-600 mt-1 shrink-0">
          <AlertCircle className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-rose-900">{t('dashboard.advisory.title')}</h4>
          <p className="text-xs text-rose-700 mt-1 leading-relaxed">
            {t('dashboard.advisory.desc')}
          </p>
          <button className="text-xs font-bold text-rose-700 mt-2 hover:underline">{t('dashboard.advisory.link')}</button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Main Column */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Quick Actions */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <ActionCard to="/citizen/telemedicine" title={t('dashboard.quick.telemedicine')} icon={<Video className="w-6 h-6" />} color="bg-indigo-50 text-indigo-700 border-indigo-100" />
            <ActionCard to="/citizen/vaccination" title={t('dashboard.quick.vaccinations')} icon={<Syringe className="w-6 h-6" />} color="bg-emerald-50 text-emerald-700 border-emerald-100" />
            <ActionCard to="/citizen/facilities" title={t('dashboard.quick.hospital')} icon={<MapPin className="w-6 h-6" />} color="bg-sky-50 text-sky-700 border-sky-100" />
            <ActionCard to="/citizen/map" title={t('dashboard.quick.map')} icon={<MapIcon className="w-6 h-6" />} color="bg-amber-50 text-amber-700 border-amber-100" />
          </div>

          {/* Recent Records */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-900">{t('dashboard.recent_records')}</h2>
              <Link to="/citizen/records" className="text-sm text-sky-600 font-medium hover:text-sky-800">{t('dashboard.view_all')}</Link>
            </div>
            <div className="space-y-4">
              <RecordItem 
                title="Complete Blood Count (CBC)" 
                date="12 Mar 2026" 
                doctor="Dr. Sharma, Civil Hospital" 
                type="Lab Report" 
              />
              <RecordItem 
                title="General Consultation" 
                date="10 Mar 2026" 
                doctor="Dr. Patil, Urban Health Center" 
                type="Prescription" 
              />
              <RecordItem 
                title="COVID-19 Booster Dose" 
                date="15 Jan 2026" 
                doctor="SMC Vaccination Camp" 
                type="Vaccination" 
              />
            </div>
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          
          {/* Upcoming Appointments */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-6">{t('dashboard.upcoming_appointments')}</h2>
            <div className="p-4 rounded-xl border border-sky-100 bg-sky-50/50">
              <div className="flex items-start justify-between mb-3">
                <div className="bg-white p-2 rounded-lg shadow-sm border border-sky-100">
                  <Calendar className="w-5 h-5 text-sky-600" />
                </div>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-sky-100 text-sky-800">{t('dashboard.confirmed')}</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">Follow-up Consultation</h3>
              <p className="text-xs text-slate-600 mb-3">Dr. Sharma &bull; General Medicine</p>
              
              <div className="flex items-center gap-2 text-xs text-slate-700 bg-white p-2 rounded-lg border border-slate-100 mb-3">
                <ClockIcon className="w-4 h-4 text-sky-500" />
                <span className="font-medium">Tomorrow, 10:30 AM</span>
              </div>
              
              <div className="flex gap-2">
                <button onClick={() => navigate('/citizen/appointments')} className="flex-1 bg-white border border-slate-200 text-slate-700 py-1.5 rounded-lg text-xs font-medium hover:bg-slate-50 transition-colors">{t('dashboard.reschedule')}</button>
                <button onClick={() => navigate('/citizen/appointments')} className="flex-1 bg-sky-600 text-white py-1.5 rounded-lg text-xs font-medium hover:bg-sky-700 transition-colors">{t('dashboard.details')}</button>
              </div>
            </div>
          </div>

          {/* Assigned ASHA Worker */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-sm font-bold text-slate-900 mb-4 text-slate-500 uppercase tracking-wider">{t('dashboard.local_worker')}</h2>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold border border-emerald-200">
                SM
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Sunita M.</h3>
                <p className="text-xs text-slate-500">{t('dashboard.asha_worker')}</p>
              </div>
            </div>
            <button 
              onClick={handleCall}
              disabled={calling}
              className="mt-4 w-full bg-slate-50 border border-slate-200 text-slate-700 py-2 rounded-lg text-sm font-medium hover:bg-slate-100 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {calling ? (
                <>
                  <Check className="w-4 h-4" />
                  {t('dashboard.calling')}
                </>
              ) : (
                <>
                  <Phone className="w-4 h-4" />
                  {t('dashboard.contact_asha')}
                </>
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

function ActionCard({ title, icon, color, to }: any) {
  return (
    <Link to={to} className={`p-4 rounded-xl border ${color} flex flex-col items-center text-center hover:shadow-md transition-all`}>
      <div className="bg-white/60 p-3 rounded-xl mb-3">
        {icon}
      </div>
      <h4 className="text-xs font-bold leading-tight">{title}</h4>
    </Link>
  );
}

function RecordItem({ title, date, doctor, type }: any) {
  return (
    <div className="flex items-center gap-4 p-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer group">
      <div className="bg-slate-100 p-2.5 rounded-lg text-slate-500 group-hover:bg-sky-100 group-hover:text-sky-600 transition-colors">
        <FileText className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-bold text-slate-900 truncate group-hover:text-sky-700 transition-colors">{title}</h4>
        <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
          <span className="font-medium text-slate-700">{date}</span>
          <span className="hidden sm:inline">&bull;</span>
          <span className="truncate hidden sm:inline">{doctor}</span>
        </div>
      </div>
      <div className="shrink-0 text-right">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-1 rounded-md">{type}</span>
      </div>
      <div className="shrink-0">
        <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-sky-600 transition-colors" />
      </div>
    </div>
  );
}

const PillIcon = (props: any) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/></svg>;
const ClockIcon = (props: any) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
