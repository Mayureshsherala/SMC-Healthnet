import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Map as MapIcon, Activity, Users, FileText, Settings, Bell, Search, Menu, X, Brain } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import DashboardOverview from './admin/DashboardOverview';
import DiseaseSurveillance from './admin/DiseaseSurveillance';
import RiskMap from './admin/RiskMap';
import FieldWorkers from './admin/FieldWorkers';
import ReportsAnalytics from './admin/ReportsAnalytics';
import AdminSettings from './admin/AdminSettings';
import AIActionCenter from './admin/AIActionCenter';

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  const navigation = [
    { name: t('admin.nav.command'), href: '/admin', icon: LayoutDashboard },
    { name: t('admin.nav.actions'), href: '/admin/actions', icon: Brain },
    { name: t('admin.nav.surveillance'), href: '/admin/surveillance', icon: Activity },
    { name: t('admin.nav.risk'), href: '/admin/risk-map', icon: MapIcon },
    { name: t('admin.nav.workers'), href: '/admin/workers', icon: Users },
    { name: t('admin.nav.reports'), href: '/admin/reports', icon: FileText },
    { name: t('admin.nav.settings'), href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-slate-900/80 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-16 flex items-center justify-between px-6 bg-slate-950/50 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-500 p-1.5 rounded-md">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight">SMC Admin</span>
          </div>
          <button className="lg:hidden text-slate-400 hover:text-white" onClick={() => setSidebarOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4">
          <div className="mb-6 px-3 py-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-sm font-bold">
                DR
              </div>
              <div>
                <p className="text-sm font-medium text-white">Dr. Rajesh Kumar</p>
                <p className="text-xs text-slate-400">Chief Medical Officer</p>
              </div>
            </div>
          </div>

          <nav className="space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/20' 
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className={`w-5 h-5 ${isActive ? 'text-indigo-200' : 'text-slate-400'}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button className="lg:hidden text-slate-500 hover:text-slate-700" onClick={() => setSidebarOpen(true)}>
              <Menu className="w-6 h-6" />
            </button>
            <div className="hidden sm:flex items-center bg-slate-100 rounded-full px-3 py-1.5 border border-slate-200 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100 transition-all w-64 lg:w-96">
              <Search className="w-4 h-4 text-slate-400 mr-2" />
              <input 
                type="text" 
                placeholder={t('admin.search')} 
                className="bg-transparent border-none outline-none text-sm w-full text-slate-700 placeholder-slate-400"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors rounded-full hover:bg-slate-100">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <Link to="/" className="text-sm font-medium text-slate-600 hover:text-indigo-600">{t('admin.signout')}</Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Routes>
            <Route path="/" element={<DashboardOverview />} />
            <Route path="/actions" element={<AIActionCenter />} />
            <Route path="/surveillance" element={<DiseaseSurveillance />} />
            <Route path="/risk-map" element={<RiskMap />} />
            <Route path="/workers" element={<FieldWorkers />} />
            <Route path="/reports" element={<ReportsAnalytics />} />
            <Route path="/settings" element={<AdminSettings />} />
            <Route path="*" element={<div className="text-center py-20 text-slate-500">Module under development</div>} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
