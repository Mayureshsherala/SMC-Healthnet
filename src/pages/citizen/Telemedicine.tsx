import { useState } from 'react';
import { Video, Calendar, Clock, CheckCircle2, Search, Star, MapPin } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export default function Telemedicine() {
  const { t } = useLanguage();
  const [bookingState, setBookingState] = useState<'idle' | 'booking' | 'confirmed'>('idle');
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);

  const handleBook = (doctor: any) => {
    setSelectedDoctor(doctor);
    setBookingState('booking');
    setTimeout(() => {
      setBookingState('confirmed');
    }, 1500);
  };

  const doctors = [
    { id: 1, name: 'Dr. Anjali Sharma', spec: 'General Physician', exp: '12 yrs', rating: 4.8, nextAvailable: 'Today, 4:00 PM', hospital: 'Civil Hospital' },
    { id: 2, name: 'Dr. Rajesh Patil', spec: 'Pediatrician', exp: '8 yrs', rating: 4.9, nextAvailable: 'Tomorrow, 10:00 AM', hospital: 'Urban Health Center' },
    { id: 3, name: 'Dr. Sneha Desai', spec: 'Gynecologist', exp: '15 yrs', rating: 4.7, nextAvailable: 'Today, 6:30 PM', hospital: 'Ashwini Hospital' },
    { id: 4, name: 'Dr. Amit Kumar', spec: 'Dermatologist', exp: '5 yrs', rating: 4.5, nextAvailable: 'Tomorrow, 11:30 AM', hospital: 'SMC Clinic' },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{t('telemedicine.title')}</h1>
          <p className="text-sm text-slate-500">{t('telemedicine.subtitle')}</p>
        </div>
      </div>

      {bookingState === 'confirmed' ? (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-12 text-center">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Consultation Booked!</h2>
          <p className="text-slate-500 mb-6 max-w-md mx-auto">
            Your video consultation with <strong>{selectedDoctor?.name}</strong> is confirmed for <strong>{selectedDoctor?.nextAvailable}</strong>.
            A link to join the call has been sent via SMS.
          </p>
          <button 
            onClick={() => { setBookingState('idle'); setSelectedDoctor(null); }}
            className="bg-sky-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-sky-700 transition-colors shadow-sm"
          >
            Book Another
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder={t('telemedicine.search')} 
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
              />
            </div>
            <select className="px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none text-slate-700 bg-white">
              <option>All Specialties</option>
              <option>General Physician</option>
              <option>Pediatrician</option>
              <option>Gynecologist</option>
            </select>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {doctors.map(doc => (
              <div key={doc.id} className="border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row gap-4 hover:border-sky-300 transition-colors">
                <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center text-sky-700 font-bold text-xl shrink-0">
                  {doc.name.split(' ').map(n => n[0]).join('').replace('D', '')}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-slate-900">{doc.name}</h3>
                    <div className="flex items-center gap-1 text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                      <Star className="w-3 h-3 fill-current" />
                      {doc.rating}
                    </div>
                  </div>
                  <p className="text-sm text-sky-600 font-medium mb-1">{doc.spec}</p>
                  <p className="text-xs text-slate-500 mb-3 flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {doc.hospital} &bull; {doc.exp} exp
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-100">
                    <div className="flex items-center gap-1.5 text-xs text-slate-600">
                      <Clock className="w-4 h-4 text-emerald-500" />
                      <span className="font-medium">{doc.nextAvailable}</span>
                    </div>
                    <button 
                      onClick={() => handleBook(doc)}
                      disabled={bookingState === 'booking'}
                      className="bg-sky-50 text-sky-700 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-sky-100 transition-colors flex items-center gap-1.5 disabled:opacity-50"
                    >
                      {bookingState === 'booking' && selectedDoctor?.id === doc.id ? (
                        <>
                          <div className="w-3 h-3 border-2 border-sky-700 border-t-transparent rounded-full animate-spin" />
                          {t('telemedicine.booking')}
                        </>
                      ) : (
                        <>
                          <Video className="w-3 h-3" />
                          {t('telemedicine.book')}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
