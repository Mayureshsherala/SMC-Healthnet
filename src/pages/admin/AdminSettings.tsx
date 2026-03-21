import { Settings, User, Bell, Shield, Key, Check } from 'lucide-react';
import { useState } from 'react';

export default function AdminSettings() {
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }, 1000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
          <p className="text-sm text-slate-500">Manage your account and platform preferences</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving || saved}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm flex items-center gap-2 disabled:opacity-70"
        >
          {isSaving ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Saving...
            </>
          ) : saved ? (
            <>
              <Check className="w-4 h-4" />
              Saved!
            </>
          ) : (
            'Save Changes'
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-2">
          <nav className="flex flex-col gap-1">
            <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors bg-indigo-50 text-indigo-700 border border-indigo-100">
              <User className="w-5 h-5" />
              Profile
            </button>
            <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors text-slate-600 hover:bg-slate-50 border border-transparent">
              <Bell className="w-5 h-5" />
              Notifications
            </button>
            <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors text-slate-600 hover:bg-slate-50 border border-transparent">
              <Shield className="w-5 h-5" />
              Security
            </button>
            <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors text-slate-600 hover:bg-slate-50 border border-transparent">
              <Key className="w-5 h-5" />
              API Keys
            </button>
          </nav>
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-6">Profile Information</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-2xl font-bold">
                  DR
                </div>
                <div>
                  <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm">
                    Change Avatar
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
                  <input type="text" defaultValue="Rajesh" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
                  <input type="text" defaultValue="Kumar" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                  <input type="email" defaultValue="rajesh.kumar@smc.gov.in" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
                  <input type="text" defaultValue="Chief Medical Officer" disabled className="w-full px-4 py-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-500 cursor-not-allowed" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
