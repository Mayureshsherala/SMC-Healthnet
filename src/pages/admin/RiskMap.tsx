import { MapPin, Layers, Filter, AlertTriangle, Droplets, Thermometer, Activity, Check } from 'lucide-react';
import { useState } from 'react';

export default function RiskMap() {
  const [isDispatching, setIsDispatching] = useState(false);

  const handleDispatch = () => {
    setIsDispatching(true);
    setTimeout(() => setIsDispatching(false), 2000);
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Community Health Risk Map</h1>
          <p className="text-sm text-slate-500">Geospatial visualization of disease clusters and vulnerabilities</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm flex items-center gap-2">
            <Layers className="w-4 h-4" />
            Map Layers
          </button>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filter Data
          </button>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col md:flex-row relative">
        {/* Map Area (Placeholder) */}
        <div className="flex-1 bg-slate-100 relative overflow-hidden">
          {/* Simulated Map Background */}
          <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop')] bg-cover bg-center mix-blend-luminosity"></div>
          
          {/* Grid Overlay */}
          <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.3 }}></div>

          {/* Simulated Clusters */}
          <div className="absolute top-1/4 left-1/3 w-32 h-32 bg-rose-500/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-1/4 left-1/3 w-16 h-16 bg-rose-500/40 rounded-full blur-md flex items-center justify-center">
            <MapPin className="w-6 h-6 text-rose-700 drop-shadow-md" />
          </div>

          <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-amber-500/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-amber-500/30 rounded-full blur-md flex items-center justify-center">
            <MapPin className="w-6 h-6 text-amber-700 drop-shadow-md" />
          </div>

          <div className="absolute top-1/2 left-2/3 w-20 h-20 bg-indigo-500/20 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-2/3 w-10 h-10 bg-indigo-500/40 rounded-full blur-sm flex items-center justify-center">
            <MapPin className="w-5 h-5 text-indigo-700 drop-shadow-md" />
          </div>

          {/* Map Controls */}
          <div className="absolute bottom-4 right-4 flex flex-col gap-2">
            <button className="w-10 h-10 bg-white rounded-lg shadow-md border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 font-bold text-lg">+</button>
            <button className="w-10 h-10 bg-white rounded-lg shadow-md border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 font-bold text-lg">-</button>
          </div>
        </div>

        {/* Sidebar Panel */}
        <div className="w-full md:w-80 bg-white border-l border-slate-200 flex flex-col shrink-0 z-10">
          <div className="p-4 border-b border-slate-200 bg-slate-50">
            <h3 className="font-bold text-slate-900">Active Clusters</h3>
            <p className="text-xs text-slate-500">Based on syndromic surveillance</p>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            
            <div className="p-4 rounded-xl border border-rose-200 bg-rose-50 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Thermometer className="w-4 h-4 text-rose-600" />
                  <span className="text-sm font-bold text-rose-900">Fever Cluster</span>
                </div>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-rose-200 text-rose-800">High Risk</span>
              </div>
              <p className="text-xs text-rose-700 mb-2">Ward 4, Shivaji Nagar</p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-rose-600 font-medium">12 Cases</span>
                <span className="text-rose-500">Updated 2h ago</span>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-amber-200 bg-amber-50 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-amber-600" />
                  <span className="text-sm font-bold text-amber-900">Waterborne</span>
                </div>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-200 text-amber-800">Medium Risk</span>
              </div>
              <p className="text-xs text-amber-700 mb-2">Ward 12, Bhavani Peth</p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-amber-600 font-medium">8 Cases</span>
                <span className="text-amber-500">Updated 5h ago</span>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-indigo-200 bg-indigo-50 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-indigo-600" />
                  <span className="text-sm font-bold text-indigo-900">ANC High Risk</span>
                </div>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-indigo-200 text-indigo-800">Monitoring</span>
              </div>
              <p className="text-xs text-indigo-700 mb-2">Ward 2, Camp Area</p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-indigo-600 font-medium">3 Patients</span>
                <span className="text-indigo-500">Updated 1d ago</span>
              </div>
            </div>

          </div>
          <div className="p-4 border-t border-slate-200 bg-slate-50">
            <button 
              onClick={handleDispatch}
              disabled={isDispatching}
              className="w-full bg-slate-900 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isDispatching ? (
                <>
                  <Check className="w-4 h-4" />
                  Team Dispatched
                </>
              ) : (
                <>
                  <AlertTriangle className="w-4 h-4" />
                  Dispatch Response Team
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
