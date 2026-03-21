import { User, MapPin, Phone, Mail, FileText, Check, X } from 'lucide-react';
import { useState } from 'react';

export default function CitizenProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [profile, setProfile] = useState({
    name: 'Rahul Verma',
    phone: '+91 98765 43210',
    email: 'rahul.verma@example.com',
    emergencyName: 'Priya Verma',
    emergencyPhone: '+91 98765 43211'
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
          <p className="text-sm text-slate-500">Manage your personal details and ABHA ID</p>
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
              className="bg-sky-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-sky-700 transition-colors shadow-sm flex items-center gap-2 disabled:opacity-70"
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
            className="bg-sky-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-sky-700 transition-colors shadow-sm"
          >
            Edit Profile
          </button>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 sm:p-10 bg-sky-50/50 border-b border-sky-100 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          <div className="w-24 h-24 rounded-full bg-sky-600 text-white flex items-center justify-center text-3xl font-bold shadow-lg border-4 border-white">
            RV
          </div>
          <div>
            {isEditing ? (
              <input 
                type="text" 
                value={profile.name}
                onChange={(e) => setProfile({...profile, name: e.target.value})}
                className="text-2xl font-bold text-slate-900 bg-white border border-slate-300 rounded px-2 py-1 mb-1 outline-none focus:ring-2 focus:ring-sky-500"
              />
            ) : (
              <h2 className="text-2xl font-bold text-slate-900">{profile.name}</h2>
            )}
            <p className="text-sky-700 font-medium flex items-center justify-center sm:justify-start gap-1.5 mt-1">
              <FileText className="w-4 h-4" />
              ABHA: 12-3456-7890-12
            </p>
            <div className="flex items-center justify-center sm:justify-start gap-4 mt-3 text-sm text-slate-600">
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-slate-400" /> Ward 4, Shivaji Nagar</span>
              <span className="flex items-center gap-1"><User className="w-4 h-4 text-slate-400" /> Age: 34</span>
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
                      className="w-full text-sm font-medium text-slate-900 bg-white border border-slate-300 rounded px-2 py-1 outline-none focus:ring-2 focus:ring-sky-500"
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
                      className="w-full text-sm font-medium text-slate-900 bg-white border border-slate-300 rounded px-2 py-1 outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  ) : (
                    <p className="text-sm font-medium text-slate-900">{profile.email}</p>
                  )}
                  <p className="text-xs text-slate-500 mt-1">Personal Email</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Emergency Contact</h3>
            <div className="space-y-4">
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                {isEditing ? (
                  <div className="space-y-2">
                    <input 
                      type="text" 
                      value={profile.emergencyName}
                      onChange={(e) => setProfile({...profile, emergencyName: e.target.value})}
                      className="w-full text-sm font-bold text-slate-900 bg-white border border-slate-300 rounded px-2 py-1 outline-none focus:ring-2 focus:ring-sky-500"
                      placeholder="Name"
                    />
                    <input 
                      type="text" 
                      value={profile.emergencyPhone}
                      onChange={(e) => setProfile({...profile, emergencyPhone: e.target.value})}
                      className="w-full text-sm text-slate-700 bg-white border border-slate-300 rounded px-2 py-1 outline-none focus:ring-2 focus:ring-sky-500"
                      placeholder="Phone"
                    />
                  </div>
                ) : (
                  <>
                    <p className="text-sm font-bold text-slate-900 mb-1">{profile.emergencyName}</p>
                    <p className="text-xs text-slate-500 mb-2">Spouse</p>
                    <div className="flex items-center gap-2 text-sm text-slate-700">
                      <Phone className="w-4 h-4 text-slate-400" />
                      {profile.emergencyPhone}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
