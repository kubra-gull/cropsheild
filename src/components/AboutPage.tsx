import React from 'react';
import { ShieldCheck, HeartHandshake, Sparkles, AlertTriangle, Users, Sprout, ArrowRight } from 'lucide-react';

interface AboutPageProps {
  onScanClick: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onScanClick }) => {
  return (
    <section className="py-12 lg:py-20 bg-stone-50 min-h-[85vh]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Mission Statement Hero */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200">
            <Sprout className="w-3.5 h-3.5 text-emerald-700" />
            <span>Our Agricultural Mission</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight font-serif leading-tight">
            Empowering Farmers With Instant Crop Intelligence
          </h2>

          <div className="p-6 sm:p-8 bg-emerald-900 text-white rounded-3xl shadow-xl mt-6">
            <p className="text-xs uppercase tracking-widest text-emerald-300 font-bold mb-2">
              Our Core Mission
            </p>
            <p className="text-xl sm:text-2xl font-bold font-serif leading-relaxed text-emerald-50">
              &quot;To make crop health information and agricultural guidance easier for farmers to access.&quot;
            </p>
          </div>
        </div>

        {/* Why CropShield Was Built */}
        <div className="bg-white rounded-3xl border border-stone-200 shadow-xs p-6 sm:p-10 space-y-6">
          <h3 className="text-2xl font-bold text-stone-900 font-serif">
            Why CropShield Was Built
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-stone-700 text-base leading-relaxed">
            <p>
              Around the world, farmers lose up to 40% of their potential harvest to preventable plant diseases and pest infestations. For smallholder farmers, agronomists and plant pathology laboratories are often located hours away, and field inspections can take days or weeks.
            </p>
            <p>
              By the time symptoms like early blight, blast, or powdery mildew become unmistakably obvious, the infection has often colonized entire rows. CropShield bridges this gap by transforming every smartphone camera into an instant, accessible agricultural scout.
            </p>
          </div>
        </div>

        {/* Who It Helps */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-stone-900 font-serif">
              Who CropShield Serves
            </h3>
            <p className="text-stone-600 text-sm mt-1">
              Engineered with simple interfaces, large touch targets, and offline-friendly guidance for all agricultural workers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-lg">
                🚜
              </div>
              <h4 className="font-bold text-stone-900">Commercial Farmers</h4>
              <p className="text-xs text-stone-600">
                Quickly survey large acreages, log disease hotspots, and synchronize with local agrochemical input suppliers.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-lg">
                🌾
              </div>
              <h4 className="font-bold text-stone-900">Smallholders</h4>
              <p className="text-xs text-stone-600">
                Access immediate advice without expensive laboratory consults, helping protect family livelihoods.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-lg">
                🏡
              </div>
              <h4 className="font-bold text-stone-900">Community Gardeners</h4>
              <p className="text-xs text-stone-600">
                Identify why tomato or cucumber leaves are yellowing or spotting and apply safe organic solutions.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-lg">
                🔬
              </div>
              <h4 className="font-bold text-stone-900">Field Extension Workers</h4>
              <p className="text-xs text-stone-600">
                Use CropShield during farmer field schools and community outreach for consistent symptom triage.
              </p>
            </div>
          </div>
        </div>

        {/* Importance of Early Disease Detection & Safety Guidelines */}
        <div className="bg-amber-50/70 border border-amber-200 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-amber-100 text-amber-800 shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-amber-950 font-serif">
                Accuracy & Agricultural Safety Notice
              </h3>
              <p className="text-sm text-stone-700 leading-relaxed">
                CropShield is designed as an advisory decision-support assistant. While our models are continuously evaluated against extensive botanical datasets, AI classification cannot replace on-site agronomical inspection or laboratory culture tests.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-amber-200/80 text-xs text-stone-700">
            <div className="space-y-1">
              <strong className="block font-bold text-stone-900">1. Photographic Quality</strong>
              <p>Blurry photos, poor lighting, or mixed lesions can reduce detection precision.</p>
            </div>
            <div className="space-y-1">
              <strong className="block font-bold text-stone-900">2. Chemical Compliance</strong>
              <p>Always verify local pesticide registrations and safety data sheets before application.</p>
            </div>
            <div className="space-y-1">
              <strong className="block font-bold text-stone-900">3. Human Validation</strong>
              <p>For severe blight or widespread crop collapse, consult your district agricultural extension officer immediately.</p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center pt-6">
          <button
            onClick={onScanClick}
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-8 py-4 rounded-2xl shadow-md text-base transition-all active:scale-95 cursor-pointer"
          >
            <span>Start Scanning Your Crops</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};
