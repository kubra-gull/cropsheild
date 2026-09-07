import React, { useState } from 'react';
import { AnalysisResult, CropReminder } from '../types';
import { 
  Camera, 
  BookOpen, 
  Store, 
  Bell, 
  CheckCircle2, 
  AlertTriangle, 
  Calendar, 
  Trash2, 
  ArrowRight, 
  Clock,
  ShieldCheck,
  Check,
  Share2,
  Activity
} from 'lucide-react';

interface FarmerDashboardProps {
  scanHistory: AnalysisResult[];
  reminders: CropReminder[];
  onOpenScanner: () => void;
  onOpenTreatments: () => void;
  onOpenSuppliers: () => void;
  onToggleReminder: (id: string) => void;
  onDeleteReminder: (id: string) => void;
  onViewScanDetail: (scan: AnalysisResult) => void;
  onClearHistory: () => void;
}

export const FarmerDashboard: React.FC<FarmerDashboardProps> = ({
  scanHistory,
  reminders,
  onOpenScanner,
  onOpenTreatments,
  onOpenSuppliers,
  onToggleReminder,
  onDeleteReminder,
  onViewScanDetail,
  onClearHistory,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'history' | 'reminders'>('overview');

  // Computed metrics
  const totalScans = scanHistory.length;
  const healthyCrops = scanHistory.filter(s => s.status === 'healthy').length;
  const diseasesDetected = scanHistory.filter(s => s.status === 'diseased').length;
  const activeReminders = reminders.filter(r => !r.completed);

  return (
    <section className="py-10 lg:py-16 bg-stone-50 min-h-[85vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Dashboard Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 mb-2">
              <Activity className="w-3.5 h-3.5 text-emerald-700" />
              <span>Farmer Field Hub</span>
            </div>
            <h2 className="text-3xl font-extrabold text-stone-900 tracking-tight font-serif">
              My Crops Dashboard
            </h2>
            <p className="text-stone-600 text-sm sm:text-base">
              Monitor your crop health scans, active disease treatments, and schedule reminders.
            </p>
          </div>

          {/* Quick Tab Switcher */}
          <div className="flex items-center bg-white p-1 rounded-xl border border-stone-200 shadow-2xs">
            <button
              onClick={() => setActiveSubTab('overview')}
              className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeSubTab === 'overview'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveSubTab('history')}
              className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeSubTab === 'history'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Scan History ({totalScans})
            </button>
            <button
              onClick={() => setActiveSubTab('reminders')}
              className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeSubTab === 'reminders'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Reminders ({activeReminders.length})
            </button>
          </div>
        </div>

        {/* OVERVIEW STATS CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
              Total Scans
            </span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-3xl font-black text-stone-900 font-serif">{totalScans}</span>
              <span className="text-lg">📷</span>
            </div>
            <p className="text-[11px] text-stone-500 mt-1">Recorded crop analyses</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
              Healthy Crops
            </span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-3xl font-black text-emerald-700 font-serif">{healthyCrops}</span>
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>
            <p className="text-[11px] text-stone-500 mt-1">Optimal leaf vigor</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
              Diseases Detected
            </span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-3xl font-black text-red-700 font-serif">{diseasesDetected}</span>
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <p className="text-[11px] text-stone-500 mt-1">Actionable plans created</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
              Active Reminders
            </span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-3xl font-black text-amber-600 font-serif">{activeReminders.length}</span>
              <Bell className="w-5 h-5 text-amber-500" />
            </div>
            <p className="text-[11px] text-stone-500 mt-1">Pending field follow-ups</p>
          </div>
        </div>

        {/* QUICK ACTIONS ROW */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
          <h3 className="text-sm font-bold text-stone-500 uppercase tracking-wider mb-3">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button
              onClick={onOpenScanner}
              id="dash-quick-scan"
              className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold p-3.5 rounded-xl shadow-xs transition-colors text-sm cursor-pointer"
            >
              <Camera className="w-4 h-4" />
              <span>Scan Crop</span>
            </button>

            <button
              onClick={onOpenTreatments}
              id="dash-quick-treatments"
              className="flex items-center justify-center gap-2 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold p-3.5 rounded-xl transition-colors text-sm cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-emerald-700" />
              <span>View Treatments</span>
            </button>

            <button
              onClick={onOpenSuppliers}
              id="dash-quick-suppliers"
              className="flex items-center justify-center gap-2 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold p-3.5 rounded-xl transition-colors text-sm cursor-pointer"
            >
              <Store className="w-4 h-4 text-emerald-700" />
              <span>Find Supplier</span>
            </button>

            <button
              onClick={() => setActiveSubTab('reminders')}
              id="dash-quick-reminders"
              className="flex items-center justify-center gap-2 bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold p-3.5 rounded-xl transition-colors text-sm cursor-pointer border border-amber-200"
            >
              <Bell className="w-4 h-4 text-amber-600" />
              <span>View Reminders</span>
            </button>
          </div>
        </div>

        {/* ACTIVE TAB CONTENT */}
        {activeSubTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Recent Scans Column */}
            <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <h3 className="text-lg font-bold text-stone-900 font-serif">
                  Recent Scans
                </h3>
                <button
                  onClick={() => setActiveSubTab('history')}
                  className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>View All History</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {scanHistory.length === 0 ? (
                <div className="text-center py-10 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
                    <Camera className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-semibold text-stone-700">No scans recorded yet</p>
                  <p className="text-xs text-stone-500 max-w-xs mx-auto">
                    Take your first photo using Crop Scanner to see health results here.
                  </p>
                  <button
                    onClick={onOpenScanner}
                    className="mt-2 inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl text-xs cursor-pointer"
                  >
                    <Camera className="w-4 h-4" />
                    <span>Scan Your Crop</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {scanHistory.slice(0, 4).map((scan) => (
                    <div
                      key={scan.id}
                      className="p-4 rounded-xl border border-stone-200 hover:border-stone-300 bg-stone-50/50 flex items-center justify-between gap-4 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-stone-200 overflow-hidden shrink-0">
                          {scan.imageUrl ? (
                            <img src={scan.imageUrl} alt={scan.crop} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-lg">🌿</div>
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-sm text-stone-900">{scan.crop}</h4>
                            <span className="text-xs text-stone-400">•</span>
                            <span className="text-xs text-stone-500">{scan.timestamp}</span>
                          </div>
                          <p className="text-xs font-semibold text-stone-700 mt-0.5">
                            {scan.diseaseName}
                          </p>
                          <div className="flex items-center gap-1.5 mt-1">
                            <span className="text-[11px] font-bold text-emerald-700">
                              {scan.confidence}% confidence
                            </span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => onViewScanDetail(scan)}
                        className="text-xs font-bold text-stone-800 hover:text-emerald-700 bg-white border border-stone-200 px-3 py-1.5 rounded-lg shrink-0 cursor-pointer hover:bg-stone-50"
                      >
                        Details →
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Active Reminders Column */}
            <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-amber-600" />
                  <h3 className="text-lg font-bold text-stone-900 font-serif">
                    Active Reminders
                  </h3>
                </div>
                <span className="text-xs font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                  {activeReminders.length} Due
                </span>
              </div>

              {activeReminders.length === 0 ? (
                <div className="text-center py-10 space-y-2">
                  <Calendar className="w-10 h-10 text-stone-300 mx-auto" />
                  <p className="text-sm font-semibold text-stone-700">No active reminders</p>
                  <p className="text-xs text-stone-500 max-w-xs mx-auto">
                    When you analyze a crop, you can schedule a follow-up reminder to re-check leaf recovery.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {activeReminders.map((rem) => (
                    <div
                      key={rem.id}
                      className="p-4 rounded-xl border border-amber-200 bg-amber-50/60 flex items-start justify-between gap-3"
                    >
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => onToggleReminder(rem.id)}
                          className="mt-0.5 w-5 h-5 rounded-md border border-amber-400 bg-white flex items-center justify-center hover:bg-amber-100 cursor-pointer"
                          title="Mark reminder as completed"
                        >
                          {rem.completed && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                        </button>
                        <div>
                          <h4 className="font-bold text-sm text-stone-900">{rem.title}</h4>
                          <p className="text-xs text-stone-600 mt-0.5">{rem.notes}</p>
                          <div className="flex items-center gap-2 mt-2 text-[11px] font-bold text-amber-800">
                            <Clock className="w-3 h-3" />
                            <span>Due: {rem.dueLabel}</span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => onDeleteReminder(rem.id)}
                        className="text-stone-400 hover:text-red-600 p-1 cursor-pointer"
                        title="Delete reminder"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* SCAN HISTORY SUB-TAB */}
        {activeSubTab === 'history' && (
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <div>
                <h3 className="text-xl font-bold text-stone-900 font-serif">
                  Complete Scan History
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Detailed timeline of your historical crop diagnoses
                </p>
              </div>

              {scanHistory.length > 0 && (
                <button
                  onClick={onClearHistory}
                  className="text-xs text-red-600 hover:text-red-700 hover:underline flex items-center gap-1 font-bold cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear All History</span>
                </button>
              )}
            </div>

            {scanHistory.length === 0 ? (
              <div className="text-center py-12 space-y-3">
                <Camera className="w-12 h-12 text-stone-300 mx-auto" />
                <h4 className="text-base font-bold text-stone-700">No crop scans found</h4>
                <p className="text-xs text-stone-500">Scans you perform will appear here automatically.</p>
                <button
                  onClick={onOpenScanner}
                  className="mt-2 inline-flex items-center gap-2 bg-emerald-600 text-white font-bold px-4 py-2.5 rounded-xl text-sm"
                >
                  <Camera className="w-4 h-4" />
                  <span>Scan Crop Now</span>
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-stone-200 text-xs uppercase tracking-wider text-stone-500 font-bold bg-stone-50">
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4">Crop</th>
                      <th className="py-3 px-4">Result</th>
                      <th className="py-3 px-4">Confidence</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 text-sm">
                    {scanHistory.map((scan) => (
                      <tr key={scan.id} className="hover:bg-stone-50/80 transition-colors">
                        <td className="py-3.5 px-4 text-xs font-semibold text-stone-600">{scan.timestamp}</td>
                        <td className="py-3.5 px-4 font-bold text-stone-900">🌿 {scan.crop}</td>
                        <td className="py-3.5 px-4 font-semibold text-stone-800">{scan.diseaseName}</td>
                        <td className="py-3.5 px-4">
                          <span className="font-extrabold text-emerald-700">{scan.confidence}%</span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                            scan.status === 'diseased'
                              ? 'bg-red-100 text-red-800'
                              : scan.status === 'healthy'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {scan.status === 'diseased' ? 'Treatment Needed' :
                             scan.status === 'healthy' ? 'Healthy' : 'Uncertain'}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => onViewScanDetail(scan)}
                            className="text-xs font-bold text-emerald-700 hover:text-emerald-900 hover:underline cursor-pointer"
                          >
                            View Plan →
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* REMINDERS SUB-TAB */}
        {activeSubTab === 'reminders' && (
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <div>
                <h3 className="text-xl font-bold text-stone-900 font-serif">
                  Crop Check Reminders
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Never miss an important follow-up treatment or leaf inspection
                </p>
              </div>
            </div>

            {reminders.length === 0 ? (
              <div className="text-center py-12 space-y-3">
                <Bell className="w-12 h-12 text-stone-300 mx-auto" />
                <h4 className="text-base font-bold text-stone-700">No reminders scheduled</h4>
                <p className="text-xs text-stone-500 max-w-sm mx-auto">
                  When you complete a crop scan, click &quot;Set Treatment Reminder&quot; to plan your next field inspection.
                </p>
                <button
                  onClick={onOpenScanner}
                  className="mt-2 inline-flex items-center gap-2 bg-emerald-600 text-white font-bold px-4 py-2.5 rounded-xl text-sm"
                >
                  <Camera className="w-4 h-4" />
                  <span>Scan Crop to Set Reminder</span>
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {reminders.map((rem) => {
                  const whatsappReminderText = `🔔 CropShield Reminder: Remember to inspect your ${rem.crop} crop for ${rem.diseaseName}. Due: ${rem.dueLabel}.`;
                  const shareUrl = `https://wa.me/?text=${encodeURIComponent(whatsappReminderText)}`;

                  return (
                    <div
                      key={rem.id}
                      className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all ${
                        rem.completed
                          ? 'bg-stone-50 border-stone-200 opacity-60'
                          : 'bg-white border-amber-200 shadow-2xs'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => onToggleReminder(rem.id)}
                          className={`mt-0.5 w-6 h-6 rounded-lg border flex items-center justify-center cursor-pointer transition-colors ${
                            rem.completed
                              ? 'bg-emerald-600 border-emerald-600 text-white'
                              : 'bg-white border-stone-300 hover:border-emerald-600'
                          }`}
                        >
                          {rem.completed && <Check className="w-4 h-4" />}
                        </button>
                        <div>
                          <h4 className={`text-base font-bold ${rem.completed ? 'line-through text-stone-500' : 'text-stone-900'}`}>
                            {rem.title}
                          </h4>
                          <p className="text-xs text-stone-600 mt-0.5">{rem.notes}</p>
                          <div className="flex items-center gap-2 mt-2 text-xs font-bold text-amber-800">
                            <Clock className="w-3.5 h-3.5" />
                            <span>Due: {rem.dueLabel}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center">
                        <a
                          href={shareUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-1.5 rounded-lg cursor-pointer"
                          title="Share to WhatsApp"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                          <span>WhatsApp Reminder</span>
                        </a>

                        <button
                          onClick={() => onDeleteReminder(rem.id)}
                          className="p-2 text-stone-400 hover:text-red-600 rounded-lg hover:bg-stone-100 cursor-pointer"
                          title="Delete reminder"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
