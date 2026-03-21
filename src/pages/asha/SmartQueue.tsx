import { useState, ReactNode } from 'react';
import { CheckCircle, AlertCircle, MapPin, Clock, ArrowRight, Filter, Search, Phone, FileText, Sparkles as SparklesIcon } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const queueData = [
  { id: 'T-101', type: 'ANC Follow-up', patient: 'Priya Sharma', age: 26, location: 'House 42, Lane 3', priority: 'High', reason: 'Missed 3rd Trimester Checkup', due: 'Today, 10:00 AM', status: 'Pending' },
  { id: 'T-102', type: 'Symptom Check', patient: 'Rahul Verma', age: 34, location: 'House 18, Lane 1', priority: 'High', reason: 'Reported fever > 3 days via Citizen App', due: 'Today, 11:30 AM', status: 'Pending' },
  { id: 'T-103', type: 'Immunization', patient: 'Baby of Anjali', age: '2 months', location: 'House 55, Lane 4', priority: 'Medium', reason: 'Pentavalent-1 Due', due: 'Today, 2:00 PM', status: 'Pending' },
  { id: 'T-104', type: 'Postnatal Care', patient: 'Sunita K.', age: 29, location: 'House 12, Lane 2', priority: 'Medium', reason: 'Day 7 Home Visit', due: 'Tomorrow', status: 'Scheduled' },
  { id: 'T-105', type: 'NCD Screening', patient: 'Ramesh Patel', age: 55, location: 'House 88, Lane 5', priority: 'Low', reason: 'Annual BP/Sugar Check', due: 'This Week', status: 'Scheduled' },
];

export default function SmartQueue() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [completingId, setCompletingId] = useState<string | null>(null);
  const { t } = useLanguage();

  const handleComplete = (id: string) => {
    setCompletingId(id);
    setTimeout(() => setCompletingId(null), 2000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{t('asha.queue.title')}</h1>
          <p className="text-sm text-slate-500">{t('asha.queue.subtitle')}</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm flex items-center gap-2">
            <Filter className="w-4 h-4" />
            {t('asha.queue.filter')}
          </button>
        </div>
      </div>

      {/* AI Insight Banner */}
      <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 flex items-start gap-4">
        <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600 mt-1 shrink-0">
          <SparklesIcon className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-indigo-900">{t('asha.queue.ai_active')}</h4>
          <p className="text-xs text-indigo-700 mt-1 leading-relaxed">
            {t('asha.queue.ai_desc')}
          </p>
        </div>
      </div>

      {/* Queue List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 w-fit">
            <TabButton active={activeFilter === 'all'} onClick={() => setActiveFilter('all')}>{t('asha.queue.all')} (5)</TabButton>
            <TabButton active={activeFilter === 'high'} onClick={() => setActiveFilter('high')}>{t('asha.queue.high')} (2)</TabButton>
            <TabButton active={activeFilter === 'completed'} onClick={() => setActiveFilter('completed')}>{t('asha.queue.completed')} (0)</TabButton>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder={t('asha.queue.search')} 
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
            />
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {queueData.filter(t => activeFilter === 'all' || (activeFilter === 'high' && t.priority === 'High')).map((task, index) => (
            <div key={task.id} className="p-4 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row gap-4 sm:items-center group">
              
              {/* Priority Indicator & Status */}
              <div className="flex flex-row sm:flex-col items-center sm:items-start gap-3 sm:w-32 shrink-0">
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${
                  task.priority === 'High' ? 'bg-rose-100 text-rose-700 border-rose-200' : 
                  task.priority === 'Medium' ? 'bg-amber-100 text-amber-700 border-amber-200' : 
                  'bg-slate-100 text-slate-700 border-slate-200'
                }`}>
                  {task.priority}
                </span>
                <div className="text-xs font-medium text-slate-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {task.due}
                </div>
              </div>

              {/* Task Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-base font-bold text-slate-900 truncate">{task.type}</h3>
                  <span className="text-xs font-mono text-slate-400">#{task.id}</span>
                </div>
                
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-600 mb-2">
                  <span className="font-medium text-slate-800">{task.patient} ({task.age})</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-400" /> {task.location}</span>
                </div>
                
                <div className="flex items-start gap-2 bg-slate-50 p-2 rounded-lg border border-slate-100 w-fit">
                  <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span className="text-xs font-medium text-slate-700">{task.reason}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 sm:flex-col sm:items-end shrink-0 mt-4 sm:mt-0">
                <button 
                  onClick={() => handleComplete(task.id)}
                  disabled={completingId === task.id}
                  className="flex-1 sm:flex-none bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {completingId === task.id ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Complete
                    </>
                  )}
                </button>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors border border-slate-200 bg-white">
                    <Phone className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors border border-slate-200 bg-white">
                    <FileText className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TabButton({ active, children, onClick }: { active: boolean, children: ReactNode, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
        active ? 'bg-white text-emerald-700 shadow-sm border border-slate-200/50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
      }`}
    >
      {children}
    </button>
  );
}
