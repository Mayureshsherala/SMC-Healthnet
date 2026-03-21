import React, { useState } from 'react';
import { 
  Receipt, 
  Search, 
  Plus, 
  Download, 
  Printer, 
  X, 
  CheckCircle2, 
  CreditCard, 
  User, 
  Calendar,
  FileText
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

interface Bill {
  id: string;
  patientName: string;
  patientId: string;
  date: string;
  amount: number;
  status: 'Paid' | 'Pending';
  items: { description: string; cost: number }[];
}

const Billing = () => {
  const { t } = useLanguage();
  const [bills, setBills] = useState<Bill[]>([
    { 
      id: 'INV-001', 
      patientName: 'Rahul Verma', 
      patientId: 'SMC-P-1024', 
      date: '2026-03-18', 
      amount: 1500, 
      status: 'Paid',
      items: [
        { description: 'General Consultation', cost: 500 },
        { description: 'Blood Test (CBC)', cost: 400 },
        { description: 'X-Ray Chest', cost: 600 }
      ]
    },
    { 
      id: 'INV-002', 
      patientName: 'Priya Sharma', 
      patientId: 'SMC-P-2055', 
      date: '2026-03-17', 
      amount: 2500, 
      status: 'Paid',
      items: [
        { description: 'Emergency Consultation', cost: 1000 },
        { description: 'Oxygen Support (2 hrs)', cost: 1500 }
      ]
    },
    { 
      id: 'INV-003', 
      patientName: 'Amit Patel', 
      patientId: 'SMC-P-3012', 
      date: '2026-03-16', 
      amount: 800, 
      status: 'Pending',
      items: [
        { description: 'Follow-up Consultation', cost: 300 },
        { description: 'Medicine (Course 1)', cost: 500 }
      ]
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = (bill: Bill) => {
    setSelectedBill(bill);
    setShowModal(true);
  };

  const handleGenerateNew = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const newBill: Bill = {
        id: `INV-00${bills.length + 1}`,
        patientName: 'New Patient',
        patientId: 'SMC-P-9999',
        date: new Date().toISOString().split('T')[0],
        amount: 500,
        status: 'Pending',
        items: [{ description: 'General Consultation', cost: 500 }]
      };
      setBills([newBill, ...bills]);
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{t('hospital.billing.title')}</h1>
          <p className="text-slate-500">{t('hospital.billing.subtitle')}</p>
        </div>
        <button 
          onClick={handleGenerateNew}
          disabled={isGenerating}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <Plus size={20} />
          )}
          <span>{t('hospital.billing.generate')}</span>
        </button>
      </div>

      {/* Billing Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by patient or ID..."
              className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none w-full sm:w-80"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 rounded-xl border border-slate-200">All Bills</button>
            <button className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 rounded-xl border border-slate-200">Paid</button>
            <button className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 rounded-xl border border-slate-200">Pending</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider font-bold">
                <th className="px-6 py-4">Invoice ID</th>
                <th className="px-6 py-4">{t('hospital.billing.patient_name')}</th>
                <th className="px-6 py-4">{t('hospital.billing.date')}</th>
                <th className="px-6 py-4">{t('hospital.billing.amount')}</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {bills.map((bill) => (
                <tr key={bill.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-slate-900">{bill.id}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-600">
                        <User size={16} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{bill.patientName}</p>
                        <p className="text-xs text-slate-500">{bill.patientId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{bill.date}</td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-900">₹{bill.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      bill.status === 'Paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {bill.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => handleDownload(bill)}
                      className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all"
                      title={t('hospital.billing.download')}
                    >
                      <Download size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Receipt Modal */}
      <AnimatePresence>
        {showModal && selectedBill && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            ></motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-emerald-600 text-white">
                <div className="flex items-center gap-3">
                  <Receipt size={24} />
                  <h3 className="font-bold text-lg">Patient Receipt</h3>
                </div>
                <button 
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto">
                {/* Hospital Header */}
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-xl font-bold text-slate-900">SMC General Hospital</h4>
                    <p className="text-sm text-slate-500">Railway Lines, Solapur, Maharashtra</p>
                    <p className="text-sm text-slate-500">Phone: 0217-2740300</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Invoice</p>
                    <p className="text-lg font-bold text-emerald-600">{selectedBill.id}</p>
                    <p className="text-sm text-slate-500">{selectedBill.date}</p>
                  </div>
                </div>

                {/* Patient Info */}
                <div className="grid grid-cols-2 gap-8 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Patient Details</p>
                    <p className="font-bold text-slate-900">{selectedBill.patientName}</p>
                    <p className="text-sm text-slate-600">ID: {selectedBill.patientId}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Payment Status</p>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      selectedBill.status === 'Paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {selectedBill.status}
                    </span>
                  </div>
                </div>

                {/* Items Table */}
                <div className="space-y-4">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Service Summary</p>
                  <div className="border border-slate-100 rounded-2xl overflow-hidden">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-slate-50 text-slate-500 text-xs font-bold">
                          <th className="px-6 py-3">Description</th>
                          <th className="px-6 py-3 text-right">Amount</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {selectedBill.items.map((item, i) => (
                          <tr key={i}>
                            <td className="px-6 py-4 text-sm text-slate-700">{item.description}</td>
                            <td className="px-6 py-4 text-sm font-bold text-slate-900 text-right">₹{item.cost}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="bg-slate-50">
                          <td className="px-6 py-4 font-bold text-slate-900">Total Amount</td>
                          <td className="px-6 py-4 font-bold text-emerald-600 text-right text-lg">₹{selectedBill.amount}</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>

                <div className="pt-4 flex items-center gap-3 text-xs text-slate-400 italic">
                  <CheckCircle2 size={14} className="text-emerald-500" />
                  <span>This is a computer-generated receipt and does not require a physical signature.</span>
                </div>
              </div>

              <div className="p-6 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-3">
                <button 
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-200 rounded-xl transition-all"
                >
                  Close
                </button>
                <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md">
                  <Printer size={18} />
                  <span>Print Receipt</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Billing;
