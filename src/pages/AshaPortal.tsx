import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Home, ListTodo, FilePlus, Users, Bell, Search, Menu, X, UserCircle } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import AshaDashboard from './asha/AshaDashboard';
import SmartQueue from './asha/SmartQueue';
import NewReport from './asha/NewReport';
import MyCommunity from './asha/MyCommunity';
import AshaProfile from './asha/AshaProfile';

export default function AshaPortal() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  const navigation = [
    { name: t('asha.nav.dashboard'), href: '/asha', icon: Home },
    { name: t('asha.nav.queue'), href: '/asha/queue', icon: ListTodo },
    { name: t('asha.nav.report'), href: '/asha/report', icon: FilePlus },
    { name: t('asha.nav.community'), href: '/asha/community', icon: Users },
    { name: t('asha.nav.profile'), href: '/asha/profile', icon: UserCircle },
  ];

  return (
    <div className="min-h-screen bg-emerald-50/30 flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-slate-900/80 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-emerald-900 text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-16 flex items-center justify-between px-6 bg-emerald-950/50 border-b border-emerald-800">
          <div className="flex items-center gap-2">
            <div className="bg-emerald-500 p-1.5 rounded-md">
              <Users className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight">ASHA Portal</span>
          </div>
          <button className="lg:hidden text-emerald-400 hover:text-white" onClick={() => setSidebarOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4">
          <div className="mb-6 px-3 py-4 bg-emerald-800/50 rounded-xl border border-emerald-700/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-sm font-bold border-2 border-emerald-400">
                SM
              </div>
              <div>
                <p className="text-sm font-medium text-white">Sunita M.</p>
                <p className="text-xs text-emerald-300">Ward 4, Shivaji Nagar</p>
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
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/20' 
                      : 'text-emerald-100 hover:bg-emerald-800 hover:text-white'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className={`w-5 h-5 ${isActive ? 'text-emerald-200' : 'text-emerald-400'}`} />
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
        <header className="h-16 bg-white border-b border-emerald-100 flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button className="lg:hidden text-slate-500 hover:text-slate-700" onClick={() => setSidebarOpen(true)}>
              <Menu className="w-6 h-6" />
            </button>
            <div className="hidden sm:flex items-center bg-emerald-50 rounded-full px-3 py-1.5 border border-emerald-100 focus-within:border-emerald-400 focus-within:ring-2 focus-within:ring-emerald-100 transition-all w-64 lg:w-96">
              <Search className="w-4 h-4 text-emerald-600 mr-2" />
              <input 
                type="text" 
                placeholder={t('asha.search')} 
                className="bg-transparent border-none outline-none text-sm w-full text-slate-700 placeholder-emerald-600/50"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-emerald-600 hover:text-emerald-800 transition-colors rounded-full hover:bg-emerald-50">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            <Link to="/" className="text-sm font-medium text-emerald-700 hover:text-emerald-900">{t('asha.signout')}</Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Routes>
            <Route path="/" element={<AshaDashboard />} />
            <Route path="/queue" element={<SmartQueue />} />
            <Route path="/report" element={<NewReport />} />
            <Route path="/community" element={<MyCommunity />} />
            <Route path="/profile" element={<AshaProfile />} />
            <Route path="*" element={<div className="text-center py-20 text-emerald-600">Module under development</div>} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
