import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Home, Calendar, FileText, Bell, Search, Menu, X, UserCircle, Activity, Video, Syringe, MapPin, Map as MapIcon, Megaphone, Globe } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import CitizenDashboard from './citizen/CitizenDashboard';
import Appointments from './citizen/Appointments';
import HealthRecords from './citizen/HealthRecords';
import ReportSymptoms from './citizen/ReportSymptoms';
import CitizenProfile from './citizen/CitizenProfile';
import Telemedicine from './citizen/Telemedicine';
import Vaccination from './citizen/Vaccination';
import Facilities from './citizen/Facilities';
import HealthMap from './citizen/HealthMap';
import Announcements from './citizen/Announcements';

export default function CitizenPortal() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  const navigation = [
    { name: t('nav.home'), href: '/citizen', icon: Home },
    { name: t('nav.telemedicine'), href: '/citizen/telemedicine', icon: Video },
    { name: t('nav.appointments'), href: '/citizen/appointments', icon: Calendar },
    { name: t('nav.vaccinations'), href: '/citizen/vaccination', icon: Syringe },
    { name: t('nav.records'), href: '/citizen/records', icon: FileText },
    { name: t('nav.report'), href: '/citizen/report', icon: Activity },
    { name: t('nav.facilities'), href: '/citizen/facilities', icon: MapPin },
    { name: t('nav.map'), href: '/citizen/map', icon: MapIcon },
    { name: t('nav.announcements'), href: '/citizen/announcements', icon: Megaphone },
    { name: t('nav.profile'), href: '/citizen/profile', icon: UserCircle },
  ];

  return (
    <div className="min-h-screen bg-sky-50/30 flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-slate-900/80 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-sky-900 text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-16 flex items-center justify-between px-6 bg-sky-950/50 border-b border-sky-800">
          <div className="flex items-center gap-2">
            <div className="bg-sky-500 p-1.5 rounded-md">
              <UserCircle className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight">Citizen Health</span>
          </div>
          <button className="lg:hidden text-sky-400 hover:text-white" onClick={() => setSidebarOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4">
          <div className="mb-6 px-3 py-4 bg-sky-800/50 rounded-xl border border-sky-700/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-sky-600 flex items-center justify-center text-sm font-bold border-2 border-sky-400">
                RV
              </div>
              <div>
                <p className="text-sm font-medium text-white">Rahul Verma</p>
                <p className="text-xs text-sky-300">ABHA: 12-3456-7890-12</p>
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
                      ? 'bg-sky-600 text-white shadow-md shadow-sky-900/20' 
                      : 'text-sky-100 hover:bg-sky-800 hover:text-white'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className={`w-5 h-5 ${isActive ? 'text-sky-200' : 'text-sky-400'}`} />
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
        <header className="h-16 bg-white border-b border-sky-100 flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button className="lg:hidden text-slate-500 hover:text-slate-700" onClick={() => setSidebarOpen(true)}>
              <Menu className="w-6 h-6" />
            </button>
            <div className="hidden sm:flex items-center bg-sky-50 rounded-full px-3 py-1.5 border border-sky-100 focus-within:border-sky-400 focus-within:ring-2 focus-within:ring-sky-100 transition-all w-64 lg:w-96">
              <Search className="w-4 h-4 text-sky-600 mr-2" />
              <input 
                type="text" 
                placeholder={t('search.placeholder')} 
                className="bg-transparent border-none outline-none text-sm w-full text-slate-700 placeholder-sky-600/50"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative group">
              <button className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-sky-600 transition-colors">
                <Globe className="w-4 h-4" />
                {language}
              </button>
              <div className="absolute right-0 mt-2 w-32 bg-white border border-slate-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                <button onClick={() => setLanguage('English')} className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-sky-50 hover:text-sky-700">English</button>
                <button onClick={() => setLanguage('Hindi')} className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-sky-50 hover:text-sky-700">हिंदी (Hindi)</button>
                <button onClick={() => setLanguage('Marathi')} className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-sky-50 hover:text-sky-700">मराठी (Marathi)</button>
              </div>
            </div>
            <button className="relative p-2 text-sky-600 hover:text-sky-800 transition-colors rounded-full hover:bg-sky-50">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            <Link to="/" className="text-sm font-medium text-sky-700 hover:text-sky-900">{t('nav.signout')}</Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Routes>
            <Route path="/" element={<CitizenDashboard />} />
            <Route path="/telemedicine" element={<Telemedicine />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/vaccination" element={<Vaccination />} />
            <Route path="/records" element={<HealthRecords />} />
            <Route path="/report" element={<ReportSymptoms />} />
            <Route path="/facilities" element={<Facilities />} />
            <Route path="/map" element={<HealthMap />} />
            <Route path="/announcements" element={<Announcements />} />
            <Route path="/profile" element={<CitizenProfile />} />
            <Route path="*" element={<div className="text-center py-20 text-sky-600">Module under development</div>} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
