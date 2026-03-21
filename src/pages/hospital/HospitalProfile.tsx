import React from 'react';
import { 
  Hospital as HospitalIcon, 
  Phone, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Ambulance, 
  Users, 
  ExternalLink,
  PhoneCall,
  Navigation,
  Share2,
  Heart
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useHospitalData } from '../../lib/hospitalData';

const HospitalProfile = () => {
  const { t } = useLanguage();
  const { hospitals } = useHospitalData();
  
  // For demo, we assume we are managing the first hospital
  const hospital = hospitals[0];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{t('hospital.profile.title')}</h1>
          <p className="text-slate-500">{t('hospital.profile.subtitle')}</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-xl border border-slate-200 transition-all">
            <Share2 size={20} />
          </button>
          <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-xl border border-slate-200 transition-all">
            <ExternalLink size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info Card */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full -mr-10 -mt-10 opacity-50"></div>
            
            <div className="flex flex-col sm:flex-row gap-6 items-start relative z-10">
              <div className="w-20 h-20 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-200">
                <HospitalIcon size={40} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-2xl font-bold text-slate-900">{hospital.name}</h2>
                  <ShieldCheck size={20} className="text-emerald-500" />
                </div>
                <div className="flex items-center gap-2 text-slate-500 mb-4">
                  <MapPin size={16} />
                  <p className="text-sm font-medium">{hospital.address}</p>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md">
                    <PhoneCall size={18} />
                    <span>{t('hospital.profile.call')}</span>
                  </button>
                  <button className="flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 px-6 py-2.5 rounded-xl text-sm font-bold border border-slate-200 transition-all shadow-sm">
                    <Navigation size={18} className="text-emerald-600" />
                    <span>{t('hospital.profile.directions')}</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 pt-8 border-t border-slate-100">
              <div className="text-center">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Emergency</p>
                <p className="text-lg font-bold text-red-600">{hospital.emergency}</p>
              </div>
              <div className="text-center">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Ambulance</p>
                <p className="text-lg font-bold text-slate-900">{hospital.ambulance ? 'Available' : 'N/A'}</p>
              </div>
              <div className="text-center">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Type</p>
                <p className="text-lg font-bold text-slate-900">Public</p>
              </div>
              <div className="text-center">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Rating</p>
                <div className="flex items-center justify-center gap-1">
                  <Heart size={16} className="text-red-500 fill-red-500" />
                  <p className="text-lg font-bold text-slate-900">4.8</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Users size={20} className="text-emerald-600" />
              <span>{t('hospital.profile.departments')}</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {hospital.departments.map((dept, i) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50 transition-all group">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-slate-400 group-hover:text-emerald-600 transition-colors">
                    <Heart size={16} />
                  </div>
                  <span className="text-sm font-semibold text-slate-700">{dept}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Clock size={18} className="text-emerald-600" />
              <span>Operating Hours</span>
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Emergency</span>
                <span className="font-bold text-emerald-600">24 / 7</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">OPD Hours</span>
                <span className="font-semibold text-slate-700">09:00 - 18:00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Visiting Hours</span>
                <span className="font-semibold text-slate-700">16:00 - 19:00</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Phone size={18} className="text-emerald-600" />
              <span>Contact Directory</span>
            </h3>
            <div className="space-y-4">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Reception</p>
                <p className="text-sm font-bold text-slate-900">{hospital.phone}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Pharmacy</p>
                <p className="text-sm font-bold text-slate-900">0217-2740305</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Blood Bank</p>
                <p className="text-sm font-bold text-slate-900">0217-2740310</p>
              </div>
            </div>
          </div>

          <div className="bg-emerald-600 p-6 rounded-3xl text-white shadow-lg shadow-emerald-200">
            <div className="flex items-center gap-3 mb-4">
              <Ambulance size={32} />
              <h3 className="font-bold text-lg">Emergency Help</h3>
            </div>
            <p className="text-emerald-50 text-sm mb-6">Need immediate medical assistance? Call our 24/7 emergency response team.</p>
            <button className="w-full py-3 bg-white text-emerald-700 font-bold rounded-xl hover:bg-emerald-50 transition-all flex items-center justify-center gap-2">
              <Phone size={18} />
              <span>Call 102 Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalProfile;
