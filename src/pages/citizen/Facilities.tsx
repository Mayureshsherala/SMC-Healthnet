import { useState } from 'react';
import { MapPin, Search, Filter, Phone, Navigation, Clock, Star, HeartPulse, Pill, Building2, Bed } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useHospitalData } from '../../lib/hospitalData';

export default function Facilities() {
  const { t } = useLanguage();
  const { hospitals } = useHospitalData();
  const [filter, setFilter] = useState('all');
  const [calling, setCalling] = useState<string | null>(null);

  const handleCall = (id: string) => {
    setCalling(id);
    setTimeout(() => setCalling(null), 2000);
  };

  const staticFacilities = [
    { id: 'f2', name: 'Urban Health Center - Ward 4', type: 'clinic', address: 'Shivaji Nagar, Solapur', distance: '0.8 km', emergency: false, rating: 4.5, open: '9 AM - 5 PM', phone: '0217-2311222' },
    { id: 'f4', name: 'Apollo Pharmacy', type: 'pharmacy', address: 'Hotgi Road, Solapur', distance: '1.2 km', emergency: true, rating: 4.1, open: '24/7', phone: '0217-2601111' },
    { id: 'f5', name: 'Sanjeevani Clinic', type: 'clinic', address: 'Bhavani Peth, Solapur', distance: '1.5 km', emergency: false, rating: 4.8, open: '10 AM - 8 PM', phone: '0217-2324455' },
    { id: 'f6', name: 'Wellness Medical Store', type: 'pharmacy', address: 'Jule Solapur', distance: '4.0 km', emergency: false, rating: 4.0, open: '8 AM - 10 PM', phone: '0217-2300000' },
  ];

  const hospitalFacilities = hospitals.map(h => ({
    id: h.id,
    name: h.name,
    type: 'hospital',
    address: h.address,
    distance: '2.5 km',
    emergency: true,
    rating: 4.6,
    open: '24/7',
    phone: h.phone,
    beds: h.beds
  }));

  const allFacilities = [...hospitalFacilities, ...staticFacilities];
  const filteredFacilities = filter === 'all' ? allFacilities : allFacilities.filter(f => f.type === filter);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{t('facilities.title')}</h1>
          <p className="text-sm text-slate-500">{t('facilities.subtitle')}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder={t('facilities.search')} 
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
            <button 
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${filter === 'all' ? 'bg-sky-100 text-sky-700' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
            >
              All
            </button>
            <button 
              onClick={() => setFilter('hospital')}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-2 ${filter === 'hospital' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
            >
              <Building2 className="w-4 h-4" /> Hospitals
            </button>
            <button 
              onClick={() => setFilter('clinic')}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-2 ${filter === 'clinic' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
            >
              <HeartPulse className="w-4 h-4" /> Clinics
            </button>
            <button 
              onClick={() => setFilter('pharmacy')}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-2 ${filter === 'pharmacy' ? 'bg-amber-100 text-amber-700' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
            >
              <Pill className="w-4 h-4" /> Pharmacies
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFacilities.map(facility => (
            <div key={facility.id} className="border border-slate-200 rounded-xl p-5 hover:shadow-md transition-shadow flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <div className={`p-2 rounded-lg shrink-0 ${
                  facility.type === 'hospital' ? 'bg-indigo-50 text-indigo-600' : 
                  facility.type === 'clinic' ? 'bg-emerald-50 text-emerald-600' : 
                  'bg-amber-50 text-amber-600'
                }`}>
                  {facility.type === 'hospital' && <Building2 className="w-5 h-5" />}
                  {facility.type === 'clinic' && <HeartPulse className="w-5 h-5" />}
                  {facility.type === 'pharmacy' && <Pill className="w-5 h-5" />}
                </div>
                {facility.emergency && (
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2 py-1 rounded-md border border-rose-100">
                    24/7 Emergency
                  </span>
                )}
              </div>
              
              <h3 className="font-bold text-slate-900 text-lg mb-1">{facility.name}</h3>
              
              <div className="flex items-center gap-1 text-xs font-medium text-slate-600 mb-3">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                {facility.rating} &bull; <MapPin className="w-3.5 h-3.5 ml-1 text-slate-400" /> {facility.distance}
              </div>
              
              <p className="text-sm text-slate-500 mb-2 flex items-start gap-2">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                {facility.address}
              </p>
              
              <p className="text-sm text-slate-500 mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4 shrink-0" />
                {facility.open}
              </p>

              {facility.type === 'hospital' && facility.beds && (
                <div className="mb-4 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                    <Bed size={12} /> Real-time Bed Availability
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {facility.beds.map((bed: any) => (
                      <div key={bed.id} className="text-center">
                        <p className="text-xs font-bold text-slate-900">{bed.total - bed.occupied}</p>
                        <p className="text-[8px] font-medium text-slate-500 uppercase">{bed.type}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-auto pt-4 border-t border-slate-100 flex gap-2">
                <button 
                  onClick={() => handleCall(facility.id)}
                  disabled={calling === facility.id}
                  className="flex-1 bg-sky-50 text-sky-700 py-2 rounded-lg text-sm font-medium hover:bg-sky-100 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {calling === facility.id ? (
                    <>
                      <div className="w-4 h-4 border-2 border-sky-700 border-t-transparent rounded-full animate-spin"></div>
                      Calling...
                    </>
                  ) : (
                    <>
                      <Phone className="w-4 h-4" />
                      Call
                    </>
                  )}
                </button>
                <button className="flex-1 bg-white border border-slate-200 text-slate-700 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                  <Navigation className="w-4 h-4" />
                  Directions
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
