import React from 'react';
import { ShieldCheck, Phone, Mail, MapPin, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
  onOpenScanner: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenScanner }) => {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1: Brand & Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-md">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <span className="text-2xl font-extrabold text-white font-serif tracking-tight">
                Crop<span className="text-emerald-400">Shield</span>
              </span>
            </div>

            <p className="text-sm text-stone-400 leading-relaxed max-w-sm">
              CropShield is an AI-powered agricultural assistant designed to help farmers detect crop diseases early, access safe treatment solutions, and connect with trusted local suppliers.
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenScanner}
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-sm transition-all"
              >
                <span>Launch Crop Scanner</span>
              </button>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('scanner')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-left"
                >
                  Crop Scanner
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('treatments')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-left"
                >
                  Treatment Library
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('suppliers')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-left"
                >
                  Supplier Directory
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-left"
                >
                  My Crops & Reminders
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Supported Crops */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest">
              Supported Crops
            </h4>
            <ul className="space-y-1.5 text-xs text-stone-400">
              <li>🍅 Tomato (Early Blight, Late Blight)</li>
              <li>🥔 Potato (Late Blight, Scab)</li>
              <li>🌾 Rice (Blast, Sheath Blight)</li>
              <li>🌽 Corn (Leaf Blight, Rust)</li>
              <li>🍎 Apple (Apple Scab, Powdery Mildew)</li>
              <li>🌱 Cotton, Wheat, Pepper & more</li>
            </ul>
          </div>

          {/* Col 4: Emergency Contacts */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest">
              Emergency & Help
            </h4>
            <div className="space-y-2 text-xs text-stone-400">
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>+92 300 4589211</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>support@cropshield.org</span>
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Lahore, Pakistan</span>
              </p>
            </div>
          </div>
        </div>

        {/* Safety Disclaimer as requested */}
        <div className="pt-8 border-t border-stone-800 text-xs text-stone-500 space-y-2 leading-relaxed">
          <p>
            <strong>Agricultural Disclaimer:</strong> CropShield provides crop health classification and general agricultural extension guidance based on automated computer vision analysis. The system is an advisory tool and does not guarantee complete diagnosis. Farmers are strongly encouraged to consult qualified local agronomists and follow official pesticide manufacturer dosage instructions.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 text-stone-400 text-xs">
            <p>© {new Date().getFullYear()} CropShield. Built for farmers worldwide.</p>
            <p className="flex items-center gap-1">
              <span>Healthy Crops • Prosperous Harvests</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
