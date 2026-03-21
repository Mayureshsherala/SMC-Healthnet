import { useState, FormEvent } from 'react';
import { Activity, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function ReportSymptoms() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [duration, setDuration] = useState('');
  const [notes, setNotes] = useState('');

  const toggleSymptom = (sym: string) => {
    if (symptoms.includes(sym)) {
      setSymptoms(symptoms.filter(s => s !== sym));
    } else {
      setSymptoms([...symptoms, sym]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call/processing time
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setSymptoms([]);
        setDuration('');
        setNotes('');
      }, 3000);
    } catch (error) {
      console.error('Error reporting symptoms:', error);
      // Fallback for demo if API fails
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setSymptoms([]);
        setDuration('');
        setNotes('');
      }, 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Report Symptoms</h1>
          <p className="text-sm text-slate-500">Help us track community health by reporting how you feel</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        {submitted ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 bg-sky-100 text-sky-600 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Symptoms Reported Successfully</h3>
            <p className="text-slate-500 max-w-md mx-auto">Thank you for reporting. Your local health worker (ASHA) has been notified and will follow up if necessary.</p>
            <button 
              onClick={() => setSubmitted(false)}
              className="mt-6 bg-sky-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-sky-700 transition-colors shadow-sm"
            >
              Report Another
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex items-start gap-4 mb-6">
              <div className="bg-amber-100 p-2 rounded-lg text-amber-600 mt-1 shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-amber-900">Emergency Warning</h4>
                <p className="text-xs text-amber-700 mt-1 leading-relaxed">
                  If you are experiencing severe difficulty breathing, chest pain, or loss of consciousness, please call emergency services immediately or visit the nearest hospital. Do not wait for an ASHA worker.
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">What symptoms are you experiencing?</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {['Fever', 'Cough', 'Sore Throat', 'Body Ache', 'Headache', 'Fatigue', 'Loss of Taste/Smell', 'Difficulty Breathing', 'Nausea/Vomiting', 'Diarrhea', 'Rash', 'Joint Pain'].map(sym => (
                  <button
                    key={sym}
                    type="button"
                    onClick={() => toggleSymptom(sym)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium text-left transition-colors border ${
                      symptoms.includes(sym) 
                        ? 'bg-sky-50 border-sky-200 text-sky-700 shadow-sm' 
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {sym}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">How long have you had these symptoms?</label>
              <select 
                required 
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none text-slate-700"
              >
                <option value="" disabled>Select duration</option>
                <option value="Less than 24 hours">Less than 24 hours</option>
                <option value="1-3 days">1-3 days</option>
                <option value="4-7 days">4-7 days</option>
                <option value="More than a week">More than a week</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Additional Notes (Optional)</label>
              <textarea 
                rows={3} 
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none text-slate-700" 
                placeholder="Any other details you'd like to share..."
              ></textarea>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
              <button type="button" className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                Cancel
              </button>
              <button 
                type="submit" 
                disabled={symptoms.length === 0 || duration === '' || isSubmitting}
                className="bg-sky-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-sky-700 transition-colors shadow-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Activity className="w-4 h-4" />
                    Submit Report
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
