import React from 'react';
import { Camera, BookOpen, ArrowRight, ShieldCheck, Activity, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';

interface HeroProps {
  onScanClick: () => void;
  onExploreTreatments: () => void;
  onViewSampleResult: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onScanClick,
  onExploreTreatments,
  onViewSampleResult,
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/60 via-stone-50 to-stone-50 pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-stone-200">
      {/* Subtle organic background decoration */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-emerald-200/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-teal-200/20 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Heading, Supporting Text, and Action Buttons */}
          <div className="lg:col-span-7 text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-200 text-xs sm:text-sm font-semibold shadow-2xs">
              <Sparkles className="w-4 h-4 text-emerald-700" />
              <span>AI Crop Health Scanner • Simple & Mobile Ready</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight leading-[1.15] font-serif">
              Protect Your Crops.{' '}
              <span className="text-emerald-700 block sm:inline">Grow With Confidence.</span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-stone-600 leading-relaxed max-w-2xl font-normal">
              CropShield helps farmers identify crop diseases, understand treatment options, and connect with agricultural suppliers — all from one simple platform.
            </p>

            {/* Main CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={onScanClick}
                id="hero-scan-btn"
                className="flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-4 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95 text-base sm:text-lg cursor-pointer"
              >
                <Camera className="w-5 h-5" />
                <span>Scan Your Crop</span>
              </button>

              <button
                onClick={onExploreTreatments}
                id="hero-treatments-btn"
                className="flex items-center justify-center gap-2 bg-white hover:bg-stone-100 text-stone-800 font-bold px-6 py-4 rounded-xl border border-stone-300 shadow-xs hover:border-stone-400 transition-all text-base sm:text-lg cursor-pointer"
              >
                <BookOpen className="w-5 h-5 text-emerald-700" />
                <span>Explore Treatments</span>
              </button>
            </div>

            {/* Quick highlights */}
            <div className="pt-4 border-t border-stone-200 grid grid-cols-3 gap-3 sm:gap-6 text-stone-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="text-xs sm:text-sm font-semibold">Instant AI Analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="text-xs sm:text-sm font-semibold">Actionable Steps</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="text-xs sm:text-sm font-semibold">WhatsApp Suppliers</span>
              </div>
            </div>
          </div>

          {/* Right Column: Dashboard-style Crop Analysis Card Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md w-full bg-white rounded-2xl border border-stone-200 shadow-xl overflow-hidden">
              {/* Card Header Bar */}
              <div className="bg-stone-900 text-white px-5 py-3.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  <span className="font-bold text-sm tracking-wide">Crop Health Analysis</span>
                </div>
                <span className="text-[11px] bg-stone-800 text-emerald-300 px-2 py-0.5 rounded-full font-mono font-medium">
                  Live Scanner
                </span>
              </div>

              {/* Sample Photo Preview */}
              <div className="relative h-48 bg-stone-100 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=700&q=80"
                  alt="Tomato leaf analysis sample"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent" />
                
                {/* Target overlay reticle */}
                <div className="absolute inset-6 border-2 border-dashed border-emerald-400/80 rounded-lg pointer-events-none flex items-center justify-center">
                  <div className="bg-emerald-950/80 text-emerald-200 text-xs px-2.5 py-1 rounded-md backdrop-blur-xs font-semibold">
                    Target Leaf Area
                  </div>
                </div>

                <div className="absolute bottom-3 left-4 text-white">
                  <p className="text-xs text-stone-200 font-medium">Detected specimen</p>
                  <p className="text-base font-bold">Tomato Foliage</p>
                </div>
              </div>

              {/* Diagnosis Details as in user prompt */}
              <div className="p-5 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                  <div className="flex items-center gap-2 text-stone-800 font-bold text-sm">
                    <span className="text-lg">🌿</span>
                    <span>Crop:</span>
                    <span className="text-emerald-800">Tomato</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-100 text-red-800 text-xs font-extrabold">
                    <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                    <span>Status: Disease Detected</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-stone-600">
                    <span className="flex items-center gap-1">
                      <span>📊</span>
                      <span>Confidence Score:</span>
                    </span>
                    <span className="text-emerald-700 font-extrabold text-sm">94%</span>
                  </div>
                  <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-600 rounded-full" style={{ width: '94%' }} />
                  </div>
                </div>

                <div className="bg-amber-50 rounded-xl p-3 border border-amber-200/80">
                  <div className="flex items-start gap-2.5">
                    <div className="p-1 rounded-md bg-amber-100 text-amber-900 mt-0.5">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-stone-900">Diagnosis: Early Blight (Alternaria)</h4>
                      <p className="text-xs text-stone-600 mt-0.5">
                        Target-like brown lesions on foliage. Immediate leaf pruning recommended.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Recommended Action CTA */}
                <button
                  onClick={onViewSampleResult}
                  id="hero-sample-action-btn"
                  className="w-full flex items-center justify-between bg-stone-900 hover:bg-emerald-900 text-white font-bold px-4 py-3 rounded-xl transition-colors text-sm cursor-pointer group"
                >
                  <span className="flex items-center gap-2">
                    <span>Recommended Action</span>
                  </span>
                  <span className="flex items-center gap-1 text-emerald-400 group-hover:translate-x-0.5 transition-transform font-bold">
                    <span>View Treatment</span>
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
