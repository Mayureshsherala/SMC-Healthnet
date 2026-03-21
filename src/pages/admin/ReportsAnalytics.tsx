import { FileText, Download, Filter, Calendar, Check } from 'lucide-react';
import { useState, MouseEvent } from 'react';

export default function ReportsAnalytics() {
  const [isExporting, setIsExporting] = useState(false);
  const [exported, setExported] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setExported(true);
      setTimeout(() => setExported(false), 2000);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Reports & Analytics</h1>
          <p className="text-sm text-slate-500">Generate and download comprehensive health reports</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button 
            onClick={handleExport}
            disabled={isExporting || exported}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm flex items-center gap-2 disabled:opacity-70"
          >
            {isExporting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Exporting...
              </>
            ) : exported ? (
              <>
                <Check className="w-4 h-4" />
                Exported!
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                Export All
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ReportCard title="Monthly Disease Surveillance" date="March 2026" type="PDF" size="2.4 MB" />
        <ReportCard title="ASHA Worker Performance" date="Q1 2026" type="Excel" size="1.1 MB" />
        <ReportCard title="Vaccination Coverage" date="Year to Date" type="PDF" size="3.8 MB" />
        <ReportCard title="Maternal Health Summary" date="Last 30 Days" type="PDF" size="1.5 MB" />
        <ReportCard title="Resource Allocation Plan" date="Upcoming Quarter" type="Excel" size="0.9 MB" />
        <ReportCard title="Outbreak Incident Logs" date="Last 6 Months" type="CSV" size="4.2 MB" />
      </div>
    </div>
  );
}

function ReportCard({ title, date, type, size }: { title: string, date: string, type: string, size: string }) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = (e: MouseEvent) => {
    e.stopPropagation();
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 2000);
    }, 1000);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:shadow-md transition-all group cursor-pointer">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
          <FileText className="w-6 h-6" />
        </div>
        <span className="text-xs font-bold px-2 py-1 rounded bg-slate-100 text-slate-600 uppercase tracking-wider">{type}</span>
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">{title}</h3>
      <div className="flex items-center gap-4 text-sm text-slate-500">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-4 h-4" />
          {date}
        </div>
        <span>&bull;</span>
        <span>{size}</span>
      </div>
      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-sm font-medium">
        <span className="text-slate-500 group-hover:text-indigo-600 transition-colors">View Details</span>
        <button 
          onClick={handleDownload}
          disabled={isDownloading || downloaded}
          className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1 disabled:opacity-70"
        >
          {isDownloading ? (
            <>
              <div className="w-4 h-4 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
              Downloading...
            </>
          ) : downloaded ? (
            <>
              <Check className="w-4 h-4" />
              Downloaded
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              Download
            </>
          )}
        </button>
      </div>
    </div>
  );
}
