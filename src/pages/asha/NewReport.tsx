import { useState, FormEvent } from 'react';
import { FilePlus, CheckCircle2, AlertCircle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export default function NewReport() {
  const [reportType, setReportType] = useState('symptom');
  const [submitted, setSubmitted] = useState(false);
  const { t } = useLanguage();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{t('asha.report.title')}</h1>
          <p className="text-sm text-slate-500">{t('asha.report.subtitle')}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          <button 
            onClick={() => setReportType('symptom')}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${reportType === 'symptom' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
          >
            {t('asha.report.symptom')}
          </button>
          <button 
            onClick={() => setReportType('anc')}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${reportType === 'anc' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
          >
            {t('asha.report.anc')}
          </button>
          <button 
            onClick={() => setReportType('survey')}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${reportType === 'survey' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
          >
            {t('asha.report.survey')}
          </button>
        </div>

        {submitted ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">{t('asha.report.success')}</h3>
            <p className="text-slate-500">{t('asha.report.success_desc')}</p>
            <button 
              onClick={() => setSubmitted(false)}
              className="mt-6 bg-emerald-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors shadow-sm"
            >
              {t('asha.report.submit_another')}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {reportType === 'symptom' && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">{t('asha.report.patient_name')}</label>
                    <input required type="text" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none" placeholder="Enter name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">{t('asha.report.age')}</label>
                    <input required type="number" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none" placeholder="Enter age" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">{t('asha.report.location')}</label>
                    <input required type="text" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none" placeholder="House number, Lane, Ward" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-2">{t('asha.report.symptoms')}</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {['Fever > 3 Days', 'Cough', 'Body Ache', 'Rash', 'Vomiting', 'Diarrhea'].map(sym => (
                        <label key={sym} className="flex items-center gap-2 text-sm text-slate-600">
                          <input type="checkbox" className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500" />
                          {sym}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">{t('asha.report.notes')}</label>
                    <textarea rows={3} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none" placeholder="Any other observations..."></textarea>
                  </div>
                </div>
              </>
            )}

            {reportType === 'anc' && (
              <div className="py-8 text-center text-slate-500">
                <AlertCircle className="w-8 h-8 mx-auto mb-3 text-amber-500" />
                <p>ANC Registration form template</p>
              </div>
            )}

            {reportType === 'survey' && (
              <div className="py-8 text-center text-slate-500">
                <AlertCircle className="w-8 h-8 mx-auto mb-3 text-amber-500" />
                <p>Household Survey form template</p>
              </div>
            )}

            <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
              <button type="button" className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                Cancel
              </button>
              <button type="submit" className="bg-emerald-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors shadow-sm flex items-center gap-2">
                <FilePlus className="w-4 h-4" />
                Submit Report
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
