import { User, MapPin, Phone, Mail, Award, Check, X } from 'lucide-react';
import { useState } from 'react';

export default function AshaProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [profile, setProfile] = useState({
    name: 'Sunita M.',
    phone: '+91 98765 43210',
    email: 'sunita.m@smc.gov.in'
  });

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setIsEditing(false);
    }, 1000);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Profile</h1>
          <p className="text-sm text-slate-500">Manage your personal and professional details</p>
        </div>
        {isEditing ? (
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsEditing(false)}
              className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors shadow-sm flex items-center gap-2 disabled:opacity-70"
            >
              {isSaving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  Save
                </>
              )}
            </button>
          </div>
        ) : (
          <button 
            onClick={() => setIsEditing(true)}
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors shadow-sm"
          >
            Edit Profile
          </button>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 sm:p-10 bg-emerald-50/50 border-b border-emerald-100 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          <div className="w-24 h-24 rounded-full bg-emerald-600 text-white flex items-center justify-center text-3xl font-bold shadow-lg border-4 border-white">
            SM
          </div>
          <div>
            {isEditing ? (
              <input 
                type="text" 
                value={profile.name}
                onChange={(e) => setProfile({...profile, name: e.target.value})}
                className="text-2xl font-bold text-slate-900 bg-white border border-slate-300 rounded px-2 py-1 mb-1 outline-none focus:ring-2 focus:ring-emerald-500"
              />
            ) : (
              <h2 className="text-2xl font-bold text-slate-900">{profile.name}</h2>
            )}
            <p className="text-emerald-700 font-medium flex items-center justify-center sm:justify-start gap-1.5 mt-1">
              <Award className="w-4 h-4" />
              Senior ASHA Worker
            </p>
            <div className="flex items-center justify-center sm:justify-start gap-4 mt-3 text-sm text-slate-600">
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-slate-400" /> Ward 4, Shivaji Nagar</span>
              <span className="flex items-center gap-1"><User className="w-4 h-4 text-slate-400" /> ID: W-001</span>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-slate-400 mt-0.5" />
                <div className="w-full">
                  {isEditing ? (
                    <input 
                      type="text" 
                      value={profile.phone}
                      onChange={(e) => setProfile({...profile, phone: e.target.value})}
                      className="w-full text-sm font-medium text-slate-900 bg-white border border-slate-300 rounded px-2 py-1 outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  ) : (
                    <p className="text-sm font-medium text-slate-900">{profile.phone}</p>
                  )}
                  <p className="text-xs text-slate-500 mt-1">Primary Phone</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-slate-400 mt-0.5" />
                <div className="w-full">
                  {isEditing ? (
                    <input 
                      type="email" 
                      value={profile.email}
                      onChange={(e) => setProfile({...profile, email: e.target.value})}
                      className="w-full text-sm font-medium text-slate-900 bg-white border border-slate-300 rounded px-2 py-1 outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  ) : (
                    <p className="text-sm font-medium text-slate-900">{profile.email}</p>
                  )}
                  <p className="text-xs text-slate-500 mt-1">Official Email</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Performance Stats</h3>
            <div className="space-y-4">
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 flex justify-between items-center">
                <span className="text-sm text-slate-600 font-medium">Families Covered</span>
                <span className="text-lg font-bold text-slate-900">142</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 flex justify-between items-center">
                <span className="text-sm text-slate-600 font-medium">Tasks Completed (YTD)</span>
                <span className="text-lg font-bold text-slate-900">856</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 flex justify-between items-center">
                <span className="text-sm text-slate-600 font-medium">Average Response Time</span>
                <span className="text-lg font-bold text-slate-900">2.4 hrs</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
