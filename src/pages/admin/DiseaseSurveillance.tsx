import { useState, ReactNode } from 'react';
import { Search, Filter, AlertCircle, MapPin, Calendar, ChevronRight, Activity, Thermometer, Droplets, Check } from 'lucide-react';

const surveillanceData = [
  { id: 'S-1042', disease: 'Dengue', status: 'Confirmed', patient: 'Ramesh K.', age: 34, location: 'Ward 4, Shivaji Nagar', date: '2026-03-17', symptoms: ['High Fever', 'Joint Pain', 'Rash'] },
  { id: 'S-1041', disease: 'Suspected Malaria', status: 'Pending Lab', patient: 'Sunita D.', age: 45, location: 'Ward 8, Sadar Bazar', date: '2026-03-16', symptoms: ['Fever', 'Chills', 'Sweating'] },
  { id: 'S-1040', disease: 'Typhoid', status: 'Confirmed', patient: 'Amit P.', age: 22, location: 'Ward 1, Camp', date: '2026-03-15', symptoms: ['Prolonged Fever', 'Abdominal Pain'] },
  { id: 'S-1039', disease: 'Dengue', status: 'Confirmed', patient: 'Priya M.', age: 28, location: 'Ward 4, Shivaji Nagar', date: '2026-03-15', symptoms: ['High Fever', 'Headache'] },
  { id: 'S-1038', disease: 'Chikungunya', status: 'Suspected', patient: 'Vijay S.', age: 55, location: 'Ward 12, Bhavani Peth', date: '2026-03-14', symptoms: ['Fever', 'Severe Joint Pain'] },
];

export default function DiseaseSurveillance() {
  const [activeTab, setActiveTab] = useState('all');
  const [isDeclaring, setIsDeclaring] = useState(false);
  const [viewingCase, setViewingCase] = useState<string | null>(null);

  const handleDeclare = () => {
    setIsDeclaring(true);
    setTimeout(() => setIsDeclaring(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Disease Surveillance</h1>
          <p className="text-sm text-slate-500">Track and manage reported cases across the city</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Advanced Filter
          </button>
          <button 
            onClick={handleDeclare}
            disabled={isDeclaring}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm flex items-center gap-2 disabled:opacity-70"
          >
            {isDeclaring ? (
              <>
                <Check className="w-4 h-4" />
                Outbreak Declared
              </>
            ) : (
              <>
                <AlertCircle className="w-4 h-4" />
                Declare Outbreak
              </>
            )}
          </button>
        </div>
      </div>

      {/* Syndromic Surveillance Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-rose-50 border border-rose-100 rounded-xl p-4 flex items-start gap-4">
          <div className="bg-rose-100 p-2 rounded-lg text-rose-600 mt-1">
            <Thermometer className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-rose-900">Fever Cluster Detected</h4>
            <p className="text-xs text-rose-700 mt-1">12 cases reported in Ward 4 in last 48 hours. High probability of Vector-borne disease.</p>
            <button className="text-xs font-bold text-rose-700 mt-2 hover:underline">View Cluster Map &rarr;</button>
          </div>
        </div>
        <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex items-start gap-4">
          <div className="bg-amber-100 p-2 rounded-lg text-amber-600 mt-1">
            <Droplets className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-amber-900">Waterborne Alert</h4>
            <p className="text-xs text-amber-700 mt-1">Slight uptick in diarrheal diseases in Ward 12. Correlates with recent pipeline repair.</p>
            <button className="text-xs font-bold text-amber-700 mt-2 hover:underline">Investigate Source &rarr;</button>
          </div>
        </div>
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex items-start gap-4">
          <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600 mt-1">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-emerald-900">Malaria Containment</h4>
            <p className="text-xs text-emerald-700 mt-1">Zero new cases in Ward 8 for 7 consecutive days following fogging intervention.</p>
            <button className="text-xs font-bold text-emerald-700 mt-2 hover:underline">View Report &rarr;</button>
          </div>
        </div>
      </div>

      {/* Main Data Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[600px]">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 w-fit">
            <TabButton active={activeTab === 'all'} onClick={() => setActiveTab('all')}>All Cases</TabButton>
            <TabButton active={activeTab === 'confirmed'} onClick={() => setActiveTab('confirmed')}>Confirmed</TabButton>
            <TabButton active={activeTab === 'suspected'} onClick={() => setActiveTab('suspected')}>Suspected</TabButton>
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search ID, Patient, Location..." 
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            />
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-white sticky top-0 z-10 shadow-sm">
              <tr>
                <th className="px-6 py-4 font-medium">Case ID</th>
                <th className="px-6 py-4 font-medium">Disease / Status</th>
                <th className="px-6 py-4 font-medium">Patient Details</th>
                <th className="px-6 py-4 font-medium">Location</th>
                <th className="px-6 py-4 font-medium">Reported Date</th>
                <th className="px-6 py-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {surveillanceData.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50 transition-colors group cursor-pointer">
                  <td className="px-6 py-4 font-mono text-slate-500">{row.id}</td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900 mb-1">{row.disease}</div>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      row.status === 'Confirmed' ? 'bg-rose-100 text-rose-700' : 
                      row.status === 'Pending Lab' ? 'bg-amber-100 text-amber-700' : 
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900">{row.patient}</div>
                    <div className="text-slate-500 text-xs mt-0.5">Age: {row.age}</div>
                    <div className="flex gap-1 mt-1.5 flex-wrap">
                      {row.symptoms.map(sym => (
                        <span key={sym} className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">{sym}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-start gap-1.5 text-slate-600">
                      <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                      <span>{row.location}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <span>{row.date}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => {
                        setViewingCase(row.id);
                        setTimeout(() => setViewingCase(null), 1500);
                      }}
                      className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors relative"
                    >
                      {viewingCase === row.id ? (
                        <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <ChevronRight className="w-5 h-5" />
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
        active ? 'bg-white text-indigo-600 shadow-sm border border-slate-200/50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
      }`}
    >
      {children}
    </button>
  );
}
