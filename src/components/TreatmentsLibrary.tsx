import React, { useState, useMemo } from 'react';
import { TREATMENTS_DATA } from '../data/treatmentsData';
import { TreatmentInfo } from '../types';
import { 
  Search, 
  Camera, 
  ShieldAlert, 
  CheckCircle2, 
  Filter, 
  RotateCcw, 
  BookOpen, 
  AlertTriangle,
  ArrowRight
} from 'lucide-react';

interface TreatmentsLibraryProps {
  onScanClick: () => void;
  initialSearchQuery?: string;
  onFindSuppliersForDisease: (disease: string, crop: string) => void;
}

export const TreatmentsLibrary: React.FC<TreatmentsLibraryProps> = ({
  onScanClick,
  initialSearchQuery = '',
  onFindSuppliersForDisease,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCrop, setSelectedCrop] = useState<string>('all');

  // Crops list
  const cropList = useMemo(() => {
    const crops = new Set<string>();
    TREATMENTS_DATA.forEach(t => t.affectedCrops.forEach(c => crops.add(c)));
    return ['all', ...Array.from(crops)];
  }, []);

  const categories = ['all', 'Fungal', 'Bacterial', 'Healthy Management'];

  const filteredTreatments = useMemo(() => {
    return TREATMENTS_DATA.filter(item => {
      const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchCrop = selectedCrop === 'all' || item.affectedCrops.includes(selectedCrop);

      const q = searchQuery.toLowerCase();
      const matchSearch = !searchQuery || 
        item.diseaseName.toLowerCase().includes(q) ||
        item.affectedCrops.some(c => c.toLowerCase().includes(q)) ||
        item.symptoms.some(s => s.toLowerCase().includes(q)) ||
        item.immediateActions.some(a => a.toLowerCase().includes(q)) ||
        item.agriculturalPractices.some(p => p.toLowerCase().includes(q));

      return matchCategory && matchCrop && matchSearch;
    });
  }, [selectedCategory, selectedCrop, searchQuery]);

  return (
    <section className="py-12 lg:py-16 bg-stone-50 min-h-[85vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header & Prominent Scan Banner */}
        <div className="bg-gradient-to-r from-emerald-900 to-teal-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-200 text-xs font-bold border border-emerald-700">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Evidence-Based Agricultural Library</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-serif">
              Agricultural Treatment Library
            </h2>
            <p className="text-emerald-100 text-sm sm:text-base max-w-xl font-normal">
              Browse safe agricultural recovery guides, cultural practices, and preventative biosecurity measures. Not sure what disease your crop has? Use our AI scanner!
            </p>
          </div>

          <button
            onClick={onScanClick}
            id="treatment-library-scan-cta"
            className="shrink-0 flex items-center gap-2.5 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-extrabold px-6 py-4 rounded-2xl shadow-lg transition-all active:scale-95 text-base cursor-pointer"
          >
            <Camera className="w-5 h-5" />
            <span>Scan Your Crop Now</span>
          </button>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            {/* Search Input */}
            <div className="sm:col-span-6 relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by disease, affected crop, symptom..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-stone-50/50"
              />
            </div>

            {/* Filter by Crop */}
            <div className="sm:col-span-3">
              <select
                value={selectedCrop}
                onChange={(e) => setSelectedCrop(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-stone-300 text-sm font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              >
                <option value="all">🌿 All Affected Crops</option>
                {cropList.filter(c => c !== 'all').map(crop => (
                  <option key={crop} value={crop}>🌿 {crop}</option>
                ))}
              </select>
            </div>

            {/* Filter by Category */}
            <div className="sm:col-span-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-stone-300 text-sm font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              >
                <option value="all">🔬 All Pathogen Types</option>
                {categories.filter(c => c !== 'all').map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {(searchQuery || selectedCategory !== 'all' || selectedCrop !== 'all') && (
            <div className="flex items-center justify-between text-xs text-stone-500 pt-2 border-t border-stone-100">
              <span>Showing {filteredTreatments.length} treatment records</span>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedCrop('all');
                }}
                className="text-emerald-700 hover:underline flex items-center gap-1 font-bold cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Filters</span>
              </button>
            </div>
          )}
        </div>

        {/* Treatment Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredTreatments.map((treatment) => (
            <div
              key={treatment.id}
              className="bg-white rounded-2xl border border-stone-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between p-6 sm:p-7 space-y-6 group"
            >
              <div className="space-y-5">
                {/* Title & Badges */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-widest">
                      {treatment.category} • Severity: {treatment.severity}
                    </span>
                    <h3 className="text-2xl font-extrabold text-stone-900 group-hover:text-emerald-700 transition-colors font-serif mt-0.5">
                      {treatment.diseaseName}
                    </h3>
                  </div>

                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold shrink-0 ${
                    treatment.severity === 'Severe' ? 'bg-red-100 text-red-800' :
                    treatment.severity === 'Moderate' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {treatment.severity === 'None' ? 'Healthy' : `${treatment.severity} Risk`}
                  </span>
                </div>

                {/* Affected Crops Badges */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-xs font-bold text-stone-500 mr-1">Affects:</span>
                  {treatment.affectedCrops.map((crop, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-0.5 rounded-md bg-stone-100 text-stone-800 text-xs font-semibold"
                    >
                      🌿 {crop}
                    </span>
                  ))}
                </div>

                {/* Symptoms */}
                <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-2">
                  <h4 className="text-xs font-extrabold text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
                    <span>🔍</span>
                    <span>Observable Symptoms</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-stone-700">
                    {treatment.symptoms.map((sym, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold">•</span>
                        <span>{sym}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Immediate Actions */}
                <div className="space-y-2">
                  <h4 className="text-xs font-extrabold text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
                    <span>⚡</span>
                    <span>Immediate Recommended Actions</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-stone-700">
                    {treatment.immediateActions.map((act, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Prevention Steps */}
                <div className="space-y-2">
                  <h4 className="text-xs font-extrabold text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
                    <span>🛡️</span>
                    <span>Prevention & Agricultural Practices</span>
                  </h4>
                  <ul className="space-y-1 text-xs sm:text-sm text-stone-600">
                    {treatment.preventionSteps.slice(0, 3).map((prev, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-stone-400">•</span>
                        <span>{prev}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Safety & Extension Notice */}
                <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-3.5 text-xs text-amber-950 flex items-start gap-2.5">
                  <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-bold">Expert Note:</strong>
                    <span>{treatment.expertAdvice}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  onClick={onScanClick}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs sm:text-sm transition-colors cursor-pointer"
                >
                  <Camera className="w-4 h-4" />
                  <span>Scan Your Crop</span>
                </button>

                <button
                  onClick={() => onFindSuppliersForDisease(treatment.diseaseName, treatment.affectedCrops[0])}
                  className="w-full sm:w-auto flex items-center justify-center gap-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold py-2.5 px-4 rounded-xl text-xs sm:text-sm transition-colors cursor-pointer"
                >
                  <span>Find Suppliers for this Disease</span>
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-700" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
