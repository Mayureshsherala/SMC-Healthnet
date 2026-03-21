import React, { useState } from 'react';
import { Syringe, Calendar, CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export default function Vaccination() {
  const { t } = useLanguage();
  const [isRegistering, setIsRegistering] = useState(false);
  const [registered, setRegistered] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegistering(true);
    setTimeout(() => {
      setIsRegistering(false);
      setRegistered(true);
      setTimeout(() => setRegistered(false), 3000);
    }, 1500);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{t('vaccination.title')}</h1>
          <p className="text-sm text-slate-500">{t('vaccination.subtitle')}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-6">Upcoming Reminders</h2>
            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-sky-100 bg-sky-50 flex items-start gap-4">
                <div className="bg-white p-2 rounded-lg text-sky-600 shrink-0 shadow-sm border border-sky-100">
                  <Syringe className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-slate-900 text-sm">Polio Drops (OPV)</h3>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700">Due in 2 days</span>
                  </div>
                  <p className="text-xs text-slate-600 mb-2">For: Aarav Verma (Child)</p>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Calendar className="w-3.5 h-3.5" /> 20 Mar 2026
                    <Clock className="w-3.5 h-3.5 ml-2" /> 10:00 AM - 4:00 PM
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-100 bg-slate-50 flex items-start gap-4">
                <div className="bg-white p-2 rounded-lg text-slate-400 shrink-0 shadow-sm border border-slate-200">
                  <Syringe className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-slate-900 text-sm">Measles, Mumps, Rubella (MMR)</h3>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">Next Month</span>
                  </div>
                  <p className="text-xs text-slate-600 mb-2">For: Aarav Verma (Child)</p>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Calendar className="w-3.5 h-3.5" /> 15 Apr 2026
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-6">{t('vaccination.history')}</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 rounded-xl border border-slate-100">
                <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-slate-900">BCG Vaccine</h4>
                  <p className="text-xs text-slate-500">Aarav Verma &bull; 10 Jan 2026</p>
                </div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">Completed</span>
              </div>
              <div className="flex items-center gap-4 p-3 rounded-xl border border-slate-100">
                <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-slate-900">Hepatitis B (Dose 1)</h4>
                  <p className="text-xs text-slate-500">Aarav Verma &bull; 10 Jan 2026</p>
                </div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">Completed</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4">{t('vaccination.register')}</h2>
            {registered ? (
              <div className="text-center py-6">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">Reminder Set!</h3>
                <p className="text-xs text-slate-500">You will receive SMS alerts before the due date.</p>
              </div>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Family Member Name</label>
                  <input required type="text" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none text-sm" placeholder="e.g., Aarav" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Age Group</label>
                  <select required className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none text-sm text-slate-700">
                    <option value="">Select age group</option>
                    <option>Infant (0-1 yr)</option>
                    <option>Toddler (1-5 yrs)</option>
                    <option>Child (5-12 yrs)</option>
                    <option>Adult (18+ yrs)</option>
                    <option>Senior (60+ yrs)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Vaccine Category</label>
                  <select required className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none text-sm text-slate-700">
                    <option value="">Select vaccine</option>
                    <option>Polio (OPV/IPV)</option>
                    <option>DPT / Pentavalent</option>
                    <option>Measles / Rubella</option>
                    <option>COVID-19 Booster</option>
                    <option>Flu Shot</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Preferred Contact (SMS)</label>
                  <input required type="tel" defaultValue="9876543210" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none text-sm" />
                </div>
                <button 
                  type="submit" 
                  disabled={isRegistering}
                  className="w-full bg-sky-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-sky-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isRegistering ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Calendar className="w-4 h-4" />
                      Set Reminder
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-indigo-900">Upcoming Drive</h4>
              <p className="text-xs text-indigo-700 mt-1">Special Pulse Polio immunization drive this Sunday at all SMC Health Centers. No appointment needed.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
