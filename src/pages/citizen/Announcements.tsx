import { Megaphone, Calendar, Info, AlertTriangle, ShieldCheck, Download } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export default function Announcements() {
  const { t } = useLanguage();
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{t('announcements.title')}</h1>
          <p className="text-sm text-slate-500">{t('announcements.subtitle')}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Megaphone className="w-5 h-5 text-sky-600" />
              {t('announcements.recent')}
            </h2>
            <div className="space-y-6">
              <div className="pb-6 border-b border-slate-100 last:border-0 last:pb-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded-md border border-rose-100 uppercase tracking-wider">Urgent</span>
                  <span className="text-xs text-slate-500 flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Today, 10:00 AM</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Dengue Prevention Drive in Shivaji Nagar</h3>
                <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                  Due to a recent spike in reported fever cases, SMC is conducting a massive fogging and mosquito breeding site eradication drive in Ward 4 (Shivaji Nagar) starting tomorrow. Residents are requested to cooperate with health workers and ensure no stagnant water is present in or around their homes.
                </p>
                <button className="text-sm font-medium text-sky-600 hover:text-sky-800 transition-colors flex items-center gap-1">
                  Read Full Advisory <Info className="w-4 h-4" />
                </button>
              </div>

              <div className="pb-6 border-b border-slate-100 last:border-0 last:pb-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100 uppercase tracking-wider">Health Camp</span>
                  <span className="text-xs text-slate-500 flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> 15 Mar 2026</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Free Eye Checkup Camp for Senior Citizens</h3>
                <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                  A free eye checkup and cataract screening camp is being organized at the Civil Hospital this Sunday from 9 AM to 2 PM. All senior citizens (60+ years) are eligible. Please bring your Aadhar card for registration.
                </p>
                <button className="text-sm font-medium text-sky-600 hover:text-sky-800 transition-colors flex items-center gap-1">
                  View Details <Info className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-sky-50 border border-sky-100 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-sky-900 mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-sky-600" />
              {t('announcements.preventive')}
            </h2>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-sky-100">
                <h4 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  Monsoon Safety Tips
                </h4>
                <ul className="text-xs text-slate-600 space-y-2 list-disc list-inside">
                  <li>Boil drinking water for at least 10 minutes.</li>
                  <li>Wash hands frequently with soap.</li>
                  <li>Avoid eating street food or raw vegetables.</li>
                  <li>Use mosquito nets and repellents.</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-sky-100">
                <h4 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-500" />
                  Heatwave Advisory
                </h4>
                <ul className="text-xs text-slate-600 space-y-2 list-disc list-inside">
                  <li>Stay hydrated; drink water even if not thirsty.</li>
                  <li>Avoid going out between 12 PM and 4 PM.</li>
                  <li>Wear loose, light-colored cotton clothes.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-sm font-bold text-slate-900 mb-4">{t('announcements.resources')}</h2>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="bg-rose-100 p-2 rounded-lg text-rose-600 group-hover:bg-rose-200 transition-colors">
                    <Download className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-xs font-bold text-slate-900">Dengue Prevention Guide</h4>
                    <p className="text-[10px] text-slate-500">PDF &bull; 1.2 MB</p>
                  </div>
                </div>
              </button>
              <button className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600 group-hover:bg-emerald-200 transition-colors">
                    <Download className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-xs font-bold text-slate-900">Nutrition for Pregnant Women</h4>
                    <p className="text-[10px] text-slate-500">PDF &bull; 2.5 MB</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
