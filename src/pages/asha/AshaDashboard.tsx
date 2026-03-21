import { Users, CheckCircle, AlertCircle, Clock, ArrowRight, ListTodo as ListTodoIcon, FilePlus as FilePlusIcon, Thermometer as ThermometerIcon, Baby as BabyIcon, Tent as TentIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';

export default function AshaDashboard() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{t('asha.dashboard.welcome')}</h1>
          <p className="text-sm text-slate-500">{t('asha.dashboard.subtitle')}</p>
        </div>
        <button 
          onClick={() => navigate('/asha/report')}
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors shadow-sm flex items-center gap-2 w-fit"
        >
          <AlertCircle className="w-4 h-4" />
          {t('asha.dashboard.report_emergency')}
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title={t('asha.dashboard.families')} value="142" icon={<Users className="w-5 h-5 text-blue-600" />} color="bg-blue-50 border-blue-100" />
        <StatCard title={t('asha.dashboard.tasks')} value="8" icon={<ListTodoIcon className="w-5 h-5 text-emerald-600" />} color="bg-emerald-50 border-emerald-100" />
        <StatCard title={t('asha.dashboard.pending')} value="3" icon={<Clock className="w-5 h-5 text-amber-600" />} color="bg-amber-50 border-amber-100" />
        <StatCard title={t('asha.dashboard.high_risk')} value="5" icon={<AlertCircle className="w-5 h-5 text-rose-600" />} color="bg-rose-50 border-rose-100" />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Priority Tasks Widget */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-900">{t('asha.dashboard.priority')}</h2>
            <Link to="/asha/queue" className="text-sm text-emerald-600 font-medium hover:text-emerald-800 flex items-center gap-1">
              {t('asha.dashboard.view_queue')} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-4 flex-1">
            <TaskItem 
              title="ANC Checkup - 3rd Trimester" 
              patient="Priya Sharma" 
              location="House 42, Lane 3" 
              priority="High" 
            />
            <TaskItem 
              title="Fever Follow-up (Day 3)" 
              patient="Rahul Verma" 
              location="House 18, Lane 1" 
              priority="High" 
            />
            <TaskItem 
              title="Immunization Due" 
              patient="Baby of Anjali" 
              location="House 55, Lane 4" 
              priority="Medium" 
            />
          </div>
        </div>

        {/* Quick Actions Widget */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-6">{t('asha.dashboard.quick_actions')}</h2>
          <div className="grid grid-cols-2 gap-4">
            <ActionCard to="/asha/report" title={t('asha.dashboard.new_survey')} desc={t('asha.dashboard.new_survey_desc')} icon={<FilePlusIcon className="w-6 h-6" />} color="bg-indigo-50 text-indigo-700 border-indigo-100" />
            <ActionCard to="/asha/report" title={t('asha.dashboard.report_symptom')} desc={t('asha.dashboard.report_symptom_desc')} icon={<ThermometerIcon className="w-6 h-6" />} color="bg-rose-50 text-rose-700 border-rose-100" />
            <ActionCard to="/asha/report" title={t('asha.dashboard.anc')} desc={t('asha.dashboard.anc_desc')} icon={<BabyIcon className="w-6 h-6" />} color="bg-fuchsia-50 text-fuchsia-700 border-fuchsia-100" />
            <ActionCard to="/asha/queue" title={t('asha.dashboard.camp')} desc={t('asha.dashboard.camp_desc')} icon={<TentIcon className="w-6 h-6" />} color="bg-teal-50 text-teal-700 border-teal-100" />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }: any) {
  return (
    <div className={`p-4 rounded-xl border ${color} flex flex-col`}>
      <div className="flex items-center justify-between mb-2">
        <div className="bg-white p-1.5 rounded-lg shadow-sm border border-slate-100/50">
          {icon}
        </div>
      </div>
      <p className="text-2xl font-bold text-slate-900 tracking-tight">{value}</p>
      <h3 className="text-slate-600 text-xs font-medium mt-1">{title}</h3>
    </div>
  );
}

function TaskItem({ title, patient, location, priority }: any) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer group">
      <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${priority === 'High' ? 'bg-rose-500' : 'bg-amber-500'}`}></div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-bold text-slate-900 truncate group-hover:text-emerald-700 transition-colors">{title}</h4>
        <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
          <span className="font-medium text-slate-700">{patient}</span>
          <span>&bull;</span>
          <span className="truncate">{location}</span>
        </div>
      </div>
      <div className="shrink-0">
        <button className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-emerald-100 group-hover:text-emerald-600 transition-colors">
          <CheckCircle className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function ActionCard({ title, desc, icon, color, to }: any) {
  return (
    <Link to={to} className={`p-4 rounded-xl border ${color} flex flex-col items-start text-left hover:shadow-md transition-all`}>
      <div className="bg-white/60 p-2 rounded-lg mb-3">
        {icon}
      </div>
      <h4 className="text-sm font-bold mb-1">{title}</h4>
      <p className="text-xs opacity-80 leading-snug">{desc}</p>
    </Link>
  );
}
