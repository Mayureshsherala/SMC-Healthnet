import { Activity, Users, AlertTriangle, CheckCircle2, TrendingUp, TrendingDown, Check, FileText, ShoppingCart, Settings } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useHospitalData } from '../../lib/hospitalData';

const data = [
  { name: 'Mon', dengue: 4, malaria: 2, typhoid: 1 },
  { name: 'Tue', dengue: 3, malaria: 1, typhoid: 2 },
  { name: 'Wed', dengue: 7, malaria: 3, typhoid: 1 },
  { name: 'Thu', dengue: 5, malaria: 2, typhoid: 4 },
  { name: 'Fri', dengue: 8, malaria: 4, typhoid: 3 },
  { name: 'Sat', dengue: 12, malaria: 5, typhoid: 2 },
  { name: 'Sun', dengue: 15, malaria: 6, typhoid: 5 },
];

const wardData = [
  { name: 'Ward 1', cases: 45, risk: 'High' },
  { name: 'Ward 2', cases: 12, risk: 'Low' },
  { name: 'Ward 3', cases: 28, risk: 'Medium' },
  { name: 'Ward 4', cases: 65, risk: 'Critical' },
  { name: 'Ward 5', cases: 18, risk: 'Low' },
];

export default function DashboardOverview() {
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isManaging, setIsManaging] = useState(false);
  const [isOrdering, setIsOrdering] = useState(false);
  const { t } = useLanguage();
  const { hospitals } = useHospitalData();

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 2000);
  };

  const handleManage = () => {
    setIsManaging(true);
    setTimeout(() => setIsManaging(false), 1500);
  };

  const handleOrder = () => {
    setIsOrdering(true);
    setTimeout(() => setIsOrdering(false), 1500);
  };

  // Calculate city-wide bed availability
  const cityWideBeds = hospitals.reduce((acc, h) => {
    h.beds.forEach(b => {
      acc.total += b.total;
      acc.available += (b.total - b.occupied);
    });
    return acc;
  }, { total: 0, available: 0 });

  // Get low stock alerts from all hospitals
  const allInventory = hospitals.flatMap(h => h.inventory.map(item => ({ ...item, hospitalName: h.name })));
  const lowStockAlerts = allInventory.filter(item => item.status === 'Low Stock' || item.status === 'Out of Stock');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{t('admin.dashboard.title')}</h1>
          <p className="text-sm text-slate-500">{t('admin.dashboard.subtitle')}</p>
        </div>
        <div className="flex items-center gap-3">
          <select className="bg-white border border-slate-200 text-sm rounded-lg px-3 py-2 text-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none">
            <option>{t('admin.dashboard.last_7')}</option>
            <option>{t('admin.dashboard.last_30')}</option>
            <option>{t('admin.dashboard.this_month')}</option>
          </select>
          <button 
            onClick={handleGenerate}
            disabled={isGenerating}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm flex items-center gap-2 disabled:opacity-70"
          >
            {isGenerating ? (
              <>
                <Check className="w-4 h-4" />
                {t('admin.dashboard.generated')}
              </>
            ) : (
              <>
                <FileText className="w-4 h-4" />
                {t('admin.dashboard.generate')}
              </>
            )}
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title={t('admin.dashboard.active_outbreaks')} 
          value="3" 
          trend="+1 this week" 
          trendUp={true} 
          icon={<AlertTriangle className="w-6 h-6 text-rose-600" />} 
          color="bg-rose-50 border-rose-100" 
        />
        <StatCard 
          title={t('admin.dashboard.total_cases')} 
          value="1,248" 
          trend="+12% vs last week" 
          trendUp={true} 
          icon={<Activity className="w-6 h-6 text-indigo-600" />} 
          color="bg-indigo-50 border-indigo-100" 
        />
        <StatCard 
          title={t('admin.dashboard.asha_active')} 
          value="412" 
          trend="98% coverage" 
          trendUp={true} 
          icon={<Users className="w-6 h-6 text-emerald-600" />} 
          color="bg-emerald-50 border-emerald-100" 
        />
        <StatCard 
          title={t('admin.dashboard.interventions')} 
          value="856" 
          trend="85% resolution rate" 
          trendUp={true} 
          icon={<CheckCircle2 className="w-6 h-6 text-blue-600" />} 
          color="bg-blue-50 border-blue-100" 
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-900">{t('admin.dashboard.disease_trend')}</h2>
            <div className="flex items-center gap-2 text-sm">
              <span className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-rose-500"></div> Dengue</span>
              <span className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-amber-500"></div> Malaria</span>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorDengue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorMalaria" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#0f172a', fontWeight: 500 }}
                />
                <Area type="monotone" dataKey="dengue" stroke="#f43f5e" strokeWidth={3} fillOpacity={1} fill="url(#colorDengue)" />
                <Area type="monotone" dataKey="malaria" stroke="#f59e0b" strokeWidth={3} fillOpacity={1} fill="url(#colorMalaria)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Secondary Chart / List */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col">
          <h2 className="text-lg font-bold text-slate-900 mb-6">{t('admin.dashboard.high_risk_wards')}</h2>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={wardData} layout="vertical" margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e2e8f0" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip cursor={{fill: '#f8fafc'}} />
                <Bar dataKey="cases" radius={[0, 4, 4, 0]}>
                  {
                    wardData.map((entry, index) => (
                      <cell key={`cell-${index}`} fill={entry.risk === 'Critical' ? '#ef4444' : entry.risk === 'High' ? '#f97316' : entry.risk === 'Medium' ? '#eab308' : '#22c55e'} />
                    ))
                  }
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100">
            <button 
              onClick={() => navigate('/admin/risk-map')}
              className="text-sm text-indigo-600 font-medium hover:text-indigo-800 w-full text-center"
            >
              {t('admin.dashboard.view_map')} &rarr;
            </button>
          </div>
        </div>
      </div>

      {/* Infrastructure & Supply Chain */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-900">{t('admin.dashboard.infra_avail')}</h2>
            <button onClick={handleManage} disabled={isManaging} className="text-sm text-indigo-600 font-medium hover:text-indigo-800 disabled:opacity-50 flex items-center gap-1">
              {isManaging ? <div className="w-3 h-3 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" /> : <Settings className="w-4 h-4" />}
              {isManaging ? t('admin.dashboard.updating') : t('admin.dashboard.manage')}
            </button>
          </div>
          <div className="space-y-5">
            <InfraItem name="City-wide Hospital Beds" total={cityWideBeds.total} available={cityWideBeds.available} type={cityWideBeds.available < 100 ? 'critical' : 'normal'} />
            <InfraItem name="Civil Hospital ICU" total={hospitals[0]?.beds.find(b => b.type === 'ICU')?.total || 0} available={(hospitals[0]?.beds.find(b => b.type === 'ICU')?.total || 0) - (hospitals[0]?.beds.find(b => b.type === 'ICU')?.occupied || 0)} type="warning" />
            <InfraItem name="SMC Clinic Ambulances" total={25} available={3} type="warning" />
            <InfraItem name="Oxygen Cylinders (City-wide)" total={1000} available={850} type="normal" />
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-900">{t('admin.dashboard.supply_alerts')}</h2>
            <button onClick={handleOrder} disabled={isOrdering} className="text-sm text-indigo-600 font-medium hover:text-indigo-800 disabled:opacity-50 flex items-center gap-1">
              {isOrdering ? <div className="w-3 h-3 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" /> : <ShoppingCart className="w-4 h-4" />}
              {isOrdering ? t('admin.dashboard.ordering') : t('admin.dashboard.order_supplies')}
            </button>
          </div>
          <div className="space-y-4">
            {lowStockAlerts.length > 0 ? (
              lowStockAlerts.slice(0, 4).map((item: any, i) => (
                <SupplyAlert 
                  key={i}
                  item={item.name} 
                  location={item.hospitalName} 
                  status={item.status === 'Out of Stock' ? 'Critical' : 'Low Stock'} 
                  daysLeft={item.status === 'Out of Stock' ? 0 : 5} 
                />
              ))
            ) : (
              <div className="text-center py-8 text-slate-500">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-2 opacity-20" />
                <p>All supplies are adequate</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Alerts Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">{t('admin.dashboard.recent_alerts')}</h2>
          <button onClick={() => navigate('/admin/actions')} className="text-sm text-slate-500 hover:text-slate-900 font-medium">{t('admin.dashboard.view_all')}</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-medium">{t('admin.dashboard.alert_type')}</th>
                <th className="px-6 py-4 font-medium">{t('admin.dashboard.location')}</th>
                <th className="px-6 py-4 font-medium">{t('admin.dashboard.severity')}</th>
                <th className="px-6 py-4 font-medium">{t('admin.dashboard.reported_by')}</th>
                <th className="px-6 py-4 font-medium">{t('admin.dashboard.status')}</th>
                <th className="px-6 py-4 font-medium text-right">{t('admin.dashboard.action')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <TableRow 
                type="Fever Cluster (Suspected Dengue)" 
                location="Ward 4, Shivaji Nagar" 
                severity="Critical" 
                reporter="ASHA Sunita M." 
                status="Pending Intervention" 
              />
              <TableRow 
                type="Water Contamination Report" 
                location="Ward 12, Bhavani Peth" 
                severity="High" 
                reporter="Citizen App" 
                status="Investigating" 
              />
              <TableRow 
                type="Missed ANC Checkup (High Risk)" 
                location="Ward 2, Camp Area" 
                severity="Medium" 
                reporter="System Auto-Alert" 
                status="Assigned to ASHA" 
              />
              <TableRow 
                type="Malaria Confirmed Case" 
                location="Ward 8, Sadar Bazar" 
                severity="High" 
                reporter="Civil Hospital" 
                status="Resolved (Spraying Done)" 
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, trend, trendUp, icon, color }: any) {
  return (
    <div className={`p-6 rounded-2xl border ${color} relative overflow-hidden`}>
      <div className="flex justify-between items-start mb-4">
        <div className="bg-white p-2 rounded-xl shadow-sm border border-slate-100/50">
          {icon}
        </div>
        <div className={`flex items-center text-xs font-semibold px-2 py-1 rounded-full bg-white/60 backdrop-blur-sm ${trendUp ? 'text-rose-600' : 'text-emerald-600'}`}>
          {trendUp ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
          {trend}
        </div>
      </div>
      <div>
        <h3 className="text-slate-600 text-sm font-medium mb-1">{title}</h3>
        <p className="text-3xl font-bold text-slate-900 tracking-tight">{value}</p>
      </div>
    </div>
  );
}

function TableRow({ type, location, severity, reporter, status }: any) {
  const getSeverityColor = (sev: string) => {
    switch(sev) {
      case 'Critical': return 'bg-rose-100 text-rose-700 border-rose-200';
      case 'High': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Medium': return 'bg-amber-100 text-amber-700 border-amber-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getStatusColor = (stat: string) => {
    if (stat.includes('Pending')) return 'text-rose-600 flex items-center gap-1.5';
    if (stat.includes('Investigating') || stat.includes('Assigned')) return 'text-amber-600 flex items-center gap-1.5';
    return 'text-emerald-600 flex items-center gap-1.5';
  };

  return (
    <tr className="hover:bg-slate-50/50 transition-colors group">
      <td className="px-6 py-4 font-medium text-slate-900">{type}</td>
      <td className="px-6 py-4 text-slate-600">{location}</td>
      <td className="px-6 py-4">
        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${getSeverityColor(severity)}`}>
          {severity}
        </span>
      </td>
      <td className="px-6 py-4 text-slate-600">{reporter}</td>
      <td className="px-6 py-4 font-medium">
        <span className={getStatusColor(status)}>
          <div className={`w-1.5 h-1.5 rounded-full ${status.includes('Pending') ? 'bg-rose-500' : status.includes('Resolved') ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
          {status}
        </span>
      </td>
      <td className="px-6 py-4 text-right">
        <Link to="/admin/actions" className="text-indigo-600 hover:text-indigo-900 font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">
          Review
        </Link>
      </td>
    </tr>
  );
}

function InfraItem({ name, total, available, type }: any) {
  const percentage = Math.round((available / total) * 100);
  const getBarColor = () => {
    if (type === 'critical') return 'bg-rose-500';
    if (type === 'warning') return 'bg-amber-500';
    return 'bg-emerald-500';
  };
  const getTextColor = () => {
    if (type === 'critical') return 'text-rose-600';
    if (type === 'warning') return 'text-amber-600';
    return 'text-emerald-600';
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-bold text-slate-900">{name}</span>
        <span className={`text-xs font-bold ${getTextColor()}`}>{available} / {total} Available</span>
      </div>
      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
        <div className={`h-2 rounded-full ${getBarColor()}`} style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
}

function SupplyAlert({ item, location, status, daysLeft }: any) {
  const [reviewed, setReviewed] = useState(false);

  const getStatusColor = () => {
    if (status === 'Critical') return 'bg-rose-100 text-rose-700 border-rose-200';
    if (status === 'Low Stock') return 'bg-amber-100 text-amber-700 border-amber-200';
    return 'bg-emerald-100 text-emerald-700 border-emerald-200';
  };

  if (reviewed) return null;

  return (
    <div className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50 hover:bg-slate-100 transition-colors">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <h4 className="text-sm font-bold text-slate-900">{item}</h4>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border uppercase tracking-wider ${getStatusColor()}`}>
            {status}
          </span>
        </div>
        <p className="text-xs text-slate-500">{location} &bull; {daysLeft > 0 ? `${daysLeft} days of stock left` : 'Out of stock'}</p>
      </div>
      <button 
        onClick={() => setReviewed(true)}
        className="text-xs font-medium text-indigo-600 hover:text-indigo-800 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-sm hover:bg-slate-50 transition-colors"
      >
        Mark Reviewed
      </button>
    </div>
  );
}
