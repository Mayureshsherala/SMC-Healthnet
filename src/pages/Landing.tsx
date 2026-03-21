import { Link } from 'react-router-dom';
import { Shield, Activity, Users, Building2, HeartPulse, Map as MapIcon, Stethoscope } from 'lucide-react';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 leading-tight">SMC HealthNet</h1>
              <p className="text-xs text-slate-500 font-medium">Solapur Municipal Corporation</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Features</a>
            <a href="#about" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">About</a>
            <a href="#contact" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-24 lg:pt-32 lg:pb-40">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576091160550-2173ff9e5ee5?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-center opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-sm font-semibold mb-6">
                <Activity className="w-4 h-4" />
                Smart Public Health Platform
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-8">
                Data-Driven Healthcare for <span className="text-indigo-600">Solapur City</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed">
                A unified platform connecting citizens, ASHA workers, and administrators to proactively manage public health, track disease outbreaks, and ensure equitable healthcare access.
              </p>
            </motion.div>
          </div>

          {/* Role Selection Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mt-12">
            <RoleCard
              to="/admin"
              icon={<Building2 className="w-8 h-8 text-indigo-600" />}
              title="Administrator / MO"
              description="Command center for disease surveillance, resource allocation, and policy decisions."
              delay={0.1}
            />
            <RoleCard
              to="/asha"
              icon={<Users className="w-8 h-8 text-emerald-600" />}
              title="ASHA / Health Worker"
              description="Field portal for surveys, maternal care tracking, and community health reporting."
              delay={0.2}
            />
            <RoleCard
              to="/hospital"
              icon={<Stethoscope className="w-8 h-8 text-blue-600" />}
              title="Hospital Staff / Doctor"
              description="Manage bed availability, medical equipment, and medicine stock in real-time."
              delay={0.3}
            />
            <RoleCard
              to="/citizen"
              icon={<HeartPulse className="w-8 h-8 text-rose-600" />}
              title="Citizen Portal"
              description="Access health records, book appointments, and view local health advisories."
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Key Innovations</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Leveraging technology to transform public health management from reactive to proactive.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<MapIcon className="w-6 h-6 text-blue-600" />}
              title="Community Health Risk Map"
              description="Geospatial visualization of disease clusters, vulnerable populations, and healthcare infrastructure gaps."
            />
            <FeatureCard
              icon={<Activity className="w-6 h-6 text-red-600" />}
              title="Syndromic Surveillance"
              description="Early warning system tracking symptoms reported by ASHA workers to predict outbreaks before they spread."
            />
            <FeatureCard
              icon={<Stethoscope className="w-6 h-6 text-teal-600" />}
              title="Smart Intervention Queue"
              description="AI-prioritized task list for health workers based on patient risk factors and missed follow-ups."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function RoleCard({ to, icon, title, description, delay }: { to: string, icon: ReactNode, title: string, description: string, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Link to={to} className="block group h-full">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-xl hover:border-indigo-300 transition-all duration-300 h-full flex flex-col">
          <div className="bg-slate-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">{title}</h3>
          <p className="text-slate-600 flex-grow">{description}</p>
          <div className="mt-6 flex items-center text-sm font-semibold text-indigo-600">
            Access Portal
            <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function FeatureCard({ icon, title, description }: { icon: ReactNode, title: string, description: string }) {
  return (
    <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-md transition-all">
      <div className="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center mb-4 border border-slate-100">
        {icon}
      </div>
      <h4 className="text-lg font-bold text-slate-900 mb-2">{title}</h4>
      <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
}
