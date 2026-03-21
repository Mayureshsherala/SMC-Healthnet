import React, { useState } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Bed, 
  Package, 
  Receipt, 
  Hospital as HospitalIcon, 
  LogOut, 
  Menu, 
  X, 
  Globe,
  Bell,
  Search,
  User
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import HospitalDashboard from './hospital/HospitalDashboard';
import BedManagement from './hospital/BedManagement';
import InventoryManagement from './hospital/InventoryManagement';
import Billing from './hospital/Billing';
import HospitalProfile from './hospital/HospitalProfile';

const HospitalPortal = () => {
  const { t, language, setLanguage } = useLanguage();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/hospital', icon: LayoutDashboard, label: t('hospital.nav.dashboard') },
    { path: '/hospital/beds', icon: Bed, label: t('hospital.nav.beds') },
    { path: '/hospital/inventory', icon: Package, label: t('hospital.nav.inventory') },
    { path: '/hospital/billing', icon: Receipt, label: t('hospital.nav.billing') },
    { path: '/hospital/profile', icon: HospitalIcon, label: t('hospital.nav.profile') },
  ];

  const toggleLanguage = () => {
    const langs: ('English' | 'Hindi' | 'Marathi')[] = ['English', 'Hindi', 'Marathi'];
    const nextIndex = (langs.indexOf(language) + 1) % langs.length;
    setLanguage(langs[nextIndex]);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform transition-transform duration-200 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:inset-0
      `}>
        <div className="h-full flex flex-col">
          <div className="p-6 flex items-center gap-3 border-b border-slate-100">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white">
              <HospitalIcon size={24} />
            </div>
            <div>
              <h1 className="font-bold text-slate-900 leading-tight">SMC HealthNet</h1>
              <p className="text-xs font-medium text-emerald-600 uppercase tracking-wider">Hospital Staff</p>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || (item.path !== '/hospital' && location.pathname.startsWith(item.path));
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                    ${isActive 
                      ? 'bg-emerald-50 text-emerald-700 font-semibold' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
                  `}
                >
                  <item.icon size={20} className={isActive ? 'text-emerald-600' : 'text-slate-400'} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-slate-100">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center gap-3 px-4 py-3 w-full text-left text-slate-600 hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors"
            >
              <LogOut size={20} />
              <span>{t('nav.signout')}</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              <Menu size={24} />
            </button>
            <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-slate-100 rounded-full w-64 lg:w-96">
              <Search size={18} className="text-slate-400" />
              <input 
                type="text" 
                placeholder={t('search.placeholder')}
                className="bg-transparent border-none focus:ring-0 text-sm w-full"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 lg:gap-4">
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-full border border-slate-200 transition-colors"
            >
              <Globe size={16} className="text-emerald-600" />
              <span>{language}</span>
            </button>
            
            <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-full relative">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            <div className="h-8 w-px bg-slate-200 mx-1 hidden sm:block"></div>

            <div className="flex items-center gap-3 pl-1">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-semibold text-slate-900 leading-none">Dr. Sameer Kulkarni</p>
                <p className="text-xs text-slate-500 mt-1">SMC General Hospital</p>
              </div>
              <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-600 border-2 border-white shadow-sm">
                <User size={20} />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <Routes>
            <Route path="/" element={<HospitalDashboard />} />
            <Route path="/beds" element={<BedManagement />} />
            <Route path="/inventory" element={<InventoryManagement />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/profile" element={<HospitalProfile />} />
          </Routes>
        </main>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default HospitalPortal;
