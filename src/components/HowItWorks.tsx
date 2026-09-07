import React from 'react';
import { Camera, UploadCloud, FileSearch, CheckCircle2, ArrowRight } from 'lucide-react';

interface HowItWorksProps {
  onScanClick: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onScanClick }) => {
  const steps = [
    {
      number: '01',
      title: 'Take a Photo',
      description: 'Take a clear picture of your crop, affected leaf, fruit, or stem with your smartphone camera.',
      icon: Camera,
    },
    {
      number: '02',
      title: 'Scan',
      description: 'Upload the image to CropShield with one simple tap or drag-and-drop.',
      icon: UploadCloud,
    },
    {
      number: '03',
      title: 'Understand',
      description: 'Receive a health or disease result with clear confidence scoring and symptoms analysis.',
      icon: FileSearch,
    },
    {
      number: '04',
      title: 'Take Action',
      description: 'Get treatment guidance, actionable checklists, check reminders, and verified local suppliers.',
      icon: CheckCircle2,
    },
  ];

  return (
    <section className="py-16 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
            <span>Simple 4-Step Journey</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight font-serif">
            How CropShield Works
          </h2>
          <p className="text-stone-600 text-base sm:text-lg">
            Designed specifically for farmers: zero technical complexity, fast results, and practical solutions right from your phone.
          </p>
        </div>

        {/* Steps Grid with connecting visual arrows */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => {
            const IconComponent = step.icon;
            return (
              <div
                key={step.number}
                className="relative bg-stone-50 rounded-2xl p-6 border border-stone-200 flex flex-col justify-between space-y-4 hover:border-emerald-500 hover:shadow-md transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-emerald-700 font-serif">
                      {step.number}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-white border border-stone-200 shadow-2xs flex items-center justify-center text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                      <IconComponent className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-stone-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Mobile / desktop step indicator arrow */}
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3.5 top-1/2 -translate-y-1/2 z-10 bg-white p-1 rounded-full border border-stone-200 shadow-xs text-stone-400">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={onScanClick}
            className="inline-flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3.5 rounded-xl shadow-md transition-all cursor-pointer active:scale-95"
          >
            <Camera className="w-5 h-5" />
            <span>Try It Now — Scan Your Crop</span>
          </button>
        </div>
      </div>
    </section>
  );
};
