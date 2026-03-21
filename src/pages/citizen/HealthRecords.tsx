import { useState } from 'react';
import { FileText, Download, Search, Filter, Calendar, Check } from 'lucide-react';
import { usePublicHealthData } from '../../lib/publicHealthData';

export default function HealthRecords() {
  const { records } = usePublicHealthData();
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const handleDownload = (id: string) => {
    setDownloadingId(id);
    setTimeout(() => setDownloadingId(null), 2000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Health Records</h1>
          <p className="text-sm text-slate-500">Access and download your medical history securely</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button className="bg-sky-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-sky-700 transition-colors shadow-sm flex items-center gap-2">
            <Download className="w-4 h-4" />
            Download Summary
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search records by name or doctor..." 
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-white border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-medium">Record Title</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Doctor / Facility</th>
                <th className="px-6 py-4 font-medium">Type</th>
                <th className="px-6 py-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {records.map((record) => (
                <tr key={record.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4 font-medium text-slate-900 flex items-center gap-3">
                    <div className="bg-sky-100 p-2 rounded-lg text-sky-600">
                      <FileText className="w-4 h-4" />
                    </div>
                    {record.title}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      {record.date}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {record.doctor}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border bg-slate-100 text-slate-700 border-slate-200 uppercase tracking-wider">
                      {record.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => handleDownload(record.id)}
                      disabled={downloadingId === record.id}
                      className="text-sky-600 hover:text-sky-800 font-medium text-sm flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-70"
                    >
                      {downloadingId === record.id ? (
                        <>
                          <div className="w-4 h-4 border-2 border-sky-200 border-t-sky-600 rounded-full animate-spin" />
                          Downloading...
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4" />
                          PDF
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
              {records.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    Loading records...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
