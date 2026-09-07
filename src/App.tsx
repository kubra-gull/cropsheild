import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SupportedCrops } from './components/SupportedCrops';
import { Scanner } from './components/Scanner';
import { TreatmentsLibrary } from './components/TreatmentsLibrary';
import { SupplierDirectory } from './components/SupplierDirectory';
import { FarmerDashboard } from './components/FarmerDashboard';
import { HowItWorks } from './components/HowItWorks';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { Footer } from './components/Footer';
import { AnalysisResult, CropItem, CropReminder } from './types';
import { CROPS_DATA } from './data/cropsData';
import { X, Calendar, CheckSquare, Sparkles, MessageCircle, ArrowRight } from 'lucide-react';

const INITIAL_SCANS_SEED: AnalysisResult[] = [
  {
    id: 'seed-scan-1',
    status: 'diseased',
    crop: 'Tomato',
    diseaseName: 'Tomato Early Blight',
    confidence: 94,
    severity: 'Moderate',
    symptoms: [
      'Concentric ring spots on lower older foliage',
      'Yellow chlorotic halos surrounding brown lesions',
      'Early leaf drop exposing ripening fruit to sunscald',
    ],
    possibleCauses: [
      'Alternaria solani fungal spores spreading through soil splashing',
      'High ambient humidity and wet leaf conditions',
    ],
    immediateActions: [
      'Prune and safely destroy lower affected tomato leaves',
      'Avoid overhead irrigation; water exclusively at base',
      'Mulch soil surface with dry straw to prevent spore splashing',
    ],
    agriculturalPractices: [
      'Maintain 3-year crop rotation away from solanaceous plants (potatoes, eggplants)',
      'Ensure 60cm row spacing for adequate air circulation',
    ],
    preventionSteps: [
      'Plant certified disease-resistant tomato varieties',
      'Sterilize pruning shears between rows with 70% alcohol',
      'Clean all harvest crates before moving between fields',
    ],
    safetyPrecautions: [
      'Wear protective gloves and mask when applying registered bio-fungicides',
      'Respect pre-harvest intervals on pesticide labels',
    ],
    whenToContactExpert:
      'If yellowing spreads upward into more than 30% of the plant canopy or stem lesions develop.',
    actionPlan: [
      { id: 'ap-1', text: 'Remove infected bottom leaves and dispose away from field', done: true },
      { id: 'ap-2', text: 'Apply organic copper-based or bio-fungicide spray', done: false },
      { id: 'ap-3', text: 'Inspect adjacent tomato rows tomorrow morning', done: false },
    ],
    recommendedSupplierCategory: 'Crop Protection & Bio-Fungicides',
    timestamp: 'Yesterday, 4:15 PM',
  },
  {
    id: 'seed-scan-2',
    status: 'healthy',
    crop: 'Rice',
    diseaseName: 'Healthy Crop (No Disease Detected)',
    confidence: 91,
    severity: 'None',
    symptoms: [
      'Vibrant uniform emerald green leaves',
      'No fungal lesions, necrotic blast spots, or leaf streak',
      'Strong tillering and upright vegetative growth',
    ],
    possibleCauses: ['Optimal nutrient balance and proper water management'],
    immediateActions: [
      'Continue current water depth management',
      'Monitor for leafhopper or stem borer activity',
    ],
    agriculturalPractices: [
      'Maintain balanced nitrogen fertilization (avoid excessive N)',
      'Maintain intermittent flooding/drying to aerate roots',
    ],
    preventionSteps: [
      'Keep bunds clean of wild grass hosts',
      'Use certified clean seed beds',
    ],
    safetyPrecautions: ['Adhere to standard personal safety gear during field work'],
    whenToContactExpert: 'If sudden leaf tip drying or spindle-shaped brown spots appear.',
    actionPlan: [
      { id: 'ap-4', text: 'Maintain 5cm flood level during tillering', done: true },
      { id: 'ap-5', text: 'Scout weekly for blast symptoms', done: false },
    ],
    recommendedSupplierCategory: 'Balanced Fertilizers & Micronutrients',
    timestamp: '2 days ago',
  },
  {
    id: 'seed-scan-3',
    status: 'diseased',
    crop: 'Potato',
    diseaseName: 'Potato Late Blight',
    confidence: 89,
    severity: 'Severe',
    symptoms: [
      'Water-soaked dark lesions on leaf margins',
      'White fungal downy growth on leaf undersides in humid mornings',
      'Rapidly browning and collapsing foliage',
    ],
    possibleCauses: [
      'Phytophthora infestans water mold active during cool, wet weather',
    ],
    immediateActions: [
      'Immediately pull and burn severely collapsed foliage',
      'Halt sprinkler watering immediately to dry canopy',
    ],
    agriculturalPractices: [
      'Hill up soil around potato hills to protect tubers from spores washed down by rain',
    ],
    preventionSteps: [
      'Only plant certified disease-free seed tubers',
      'Destroy volunteer potato sprouts from last season',
    ],
    safetyPrecautions: [
      'Always follow protective equipment standards when spraying',
    ],
    whenToContactExpert:
      'Late blight can destroy an entire field within days. Contact your local agricultural extension officer immediately.',
    actionPlan: [
      { id: 'ap-6', text: 'Hill up soil around potato roots to protect tubers', done: false },
      { id: 'ap-7', text: 'Contact agricultural supplier for registered systemic blight treatment', done: false },
    ],
    recommendedSupplierCategory: 'Crop Protection & Bio-Fungicides',
    timestamp: '4 days ago',
  },
];

const INITIAL_REMINDERS_SEED: CropReminder[] = [
  {
    id: 'seed-rem-1',
    crop: 'Potato',
    diseaseName: 'Late Blight',
    title: 'Check potato crop for late blight response',
    dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    dueLabel: 'Tomorrow',
    completed: false,
    notes: 'Inspect leaf undersides for white mold after morning dew.',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'seed-rem-2',
    crop: 'Tomato',
    diseaseName: 'Early Blight',
    title: 'Check tomato crop lower leaves',
    dueDate: new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0],
    dueLabel: 'In 3 days',
    completed: false,
    notes: 'Verify if fungal spots are contained after bottom leaf pruning.',
    createdAt: new Date().toISOString(),
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedCropForScanner, setSelectedCropForScanner] = useState<CropItem | null>(null);

  // Supplier & Treatment cross-link states
  const [supplierCropFilter, setSupplierCropFilter] = useState<string>('Tomato');
  const [supplierDiseaseFilter, setSupplierDiseaseFilter] = useState<string>('Early Blight');
  const [treatmentSearchFilter, setTreatmentSearchFilter] = useState<string>('');

  // Selected scan for modal detail view
  const [modalScanDetail, setModalScanDetail] = useState<AnalysisResult | null>(null);

  // Persistent Scan History & Reminders
  const [scanHistory, setScanHistory] = useState<AnalysisResult[]>(() => {
    try {
      const stored = localStorage.getItem('cropshield_scans');
      return stored ? JSON.parse(stored) : INITIAL_SCANS_SEED;
    } catch {
      return INITIAL_SCANS_SEED;
    }
  });

  const [reminders, setReminders] = useState<CropReminder[]>(() => {
    try {
      const stored = localStorage.getItem('cropshield_reminders');
      return stored ? JSON.parse(stored) : INITIAL_REMINDERS_SEED;
    } catch {
      return INITIAL_REMINDERS_SEED;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('cropshield_scans', JSON.stringify(scanHistory));
    } catch (e) {
      console.error('Storage error:', e);
    }
  }, [scanHistory]);

  useEffect(() => {
    try {
      localStorage.setItem('cropshield_reminders', JSON.stringify(reminders));
    } catch (e) {
      console.error('Storage error:', e);
    }
  }, [reminders]);

  // Handlers
  const handleSaveScan = (result: AnalysisResult) => {
    setScanHistory((prev) => [result, ...prev]);
  };

  const handleAddReminder = (reminder: CropReminder) => {
    setReminders((prev) => [reminder, ...prev]);
  };

  const handleToggleReminder = (id: string) => {
    setReminders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, completed: !r.completed } : r))
    );
  };

  const handleDeleteReminder = (id: string) => {
    setReminders((prev) => prev.filter((r) => r.id !== id));
  };

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear your scan history?')) {
      setScanHistory([]);
    }
  };

  const handleSelectCropToScan = (crop: CropItem) => {
    setSelectedCropForScanner(crop);
    setActiveTab('scanner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFindSuppliers = (crop: string, disease: string) => {
    setSupplierCropFilter(crop);
    setSupplierDiseaseFilter(disease);
    setActiveTab('suppliers');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExploreTreatments = (disease: string) => {
    setTreatmentSearchFilter(disease);
    setActiveTab('treatments');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewSampleResult = () => {
    const sample = scanHistory[0] || INITIAL_SCANS_SEED[0];
    setModalScanDetail(sample);
  };

  const activeRemindersCount = reminders.filter((r) => !r.completed).length;

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 font-sans selection:bg-emerald-200 selection:text-emerald-950">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeRemindersCount={activeRemindersCount}
        onOpenScanner={() => {
          setSelectedCropForScanner(null);
          setActiveTab('scanner');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <div>
            <Hero
              onScanClick={() => {
                setSelectedCropForScanner(null);
                setActiveTab('scanner');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onExploreTreatments={() => {
                setTreatmentSearchFilter('');
                setActiveTab('treatments');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onViewSampleResult={handleViewSampleResult}
            />
            <HowItWorks
              onScanClick={() => {
                setSelectedCropForScanner(null);
                setActiveTab('scanner');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
            <SupportedCrops onSelectCropToScan={handleSelectCropToScan} />
          </div>
        )}

        {activeTab === 'scanner' && (
          <Scanner
            initialCropHint={selectedCropForScanner}
            onSaveScanToHistory={handleSaveScan}
            onAddReminder={handleAddReminder}
            onFindSuppliersForCrop={handleFindSuppliers}
            onExploreTreatmentsForDisease={handleExploreTreatments}
          />
        )}

        {activeTab === 'treatments' && (
          <TreatmentsLibrary
            initialSearchQuery={treatmentSearchFilter}
            onScanClick={() => {
              setSelectedCropForScanner(null);
              setActiveTab('scanner');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onFindSuppliersForDisease={(disease, crop) => handleFindSuppliers(crop, disease)}
          />
        )}

        {activeTab === 'suppliers' && (
          <SupplierDirectory
            initialCrop={supplierCropFilter}
            initialDisease={supplierDiseaseFilter}
          />
        )}

        {activeTab === 'dashboard' && (
          <FarmerDashboard
            scanHistory={scanHistory}
            reminders={reminders}
            onOpenScanner={() => {
              setSelectedCropForScanner(null);
              setActiveTab('scanner');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenTreatments={() => {
              setTreatmentSearchFilter('');
              setActiveTab('treatments');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenSuppliers={() => {
              setActiveTab('suppliers');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onToggleReminder={handleToggleReminder}
            onDeleteReminder={handleDeleteReminder}
            onViewScanDetail={(scan) => setModalScanDetail(scan)}
            onClearHistory={handleClearHistory}
          />
        )}

        {activeTab === 'how-it-works' && (
          <div className="py-8">
            <HowItWorks
              onScanClick={() => {
                setSelectedCropForScanner(null);
                setActiveTab('scanner');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
            <div className="max-w-4xl mx-auto px-4 py-8">
              <SupportedCrops onSelectCropToScan={handleSelectCropToScan} />
            </div>
          </div>
        )}

        {activeTab === 'about' && (
          <AboutPage
            onScanClick={() => {
              setSelectedCropForScanner(null);
              setActiveTab('scanner');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'contact' && <ContactPage />}
      </main>

      {/* Past Scan / Sample Detail Modal */}
      {modalScanDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-stone-200 space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                  🌿 {modalScanDetail.crop} • {modalScanDetail.timestamp}
                </span>
                <h3 className="text-2xl font-bold text-stone-900 font-serif mt-1">
                  {modalScanDetail.diseaseName}
                </h3>
              </div>
              <button
                onClick={() => setModalScanDetail(null)}
                className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                modalScanDetail.status === 'diseased'
                  ? 'bg-red-100 text-red-800'
                  : modalScanDetail.status === 'healthy'
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-amber-100 text-amber-800'
              }`}>
                {modalScanDetail.status === 'diseased' ? '🔴 Disease Detected' :
                 modalScanDetail.status === 'healthy' ? '🟢 Healthy Crop' : '🟡 Uncertain'}
              </span>
              <span className="text-xs font-bold text-stone-600">
                Confidence: <strong className="text-emerald-700">{modalScanDetail.confidence}%</strong>
              </span>
              <span className="text-xs font-bold text-stone-600">
                Severity: <strong>{modalScanDetail.severity}</strong>
              </span>
            </div>

            {/* Immediate Actions */}
            <div className="space-y-2 bg-stone-50 p-4 rounded-xl border border-stone-200">
              <h4 className="text-xs font-extrabold text-stone-900 uppercase tracking-wider">
                Recommended Actions
              </h4>
              <ul className="space-y-1.5 text-xs sm:text-sm text-stone-700">
                {modalScanDetail.immediateActions.map((a, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Plan */}
            <div className="space-y-2">
              <h4 className="text-xs font-extrabold text-stone-900 uppercase tracking-wider">
                Farmer Action Plan
              </h4>
              <div className="space-y-2">
                {modalScanDetail.actionPlan.map((item) => (
                  <div key={item.id} className="flex items-center gap-2 text-xs sm:text-sm text-stone-700">
                    <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  handleFindSuppliers(modalScanDetail.crop, modalScanDetail.diseaseName);
                  setModalScanDetail(null);
                }}
                className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm cursor-pointer shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Find Suppliers for {modalScanDetail.crop}</span>
              </button>

              <button
                onClick={() => setModalScanDetail(null)}
                className="bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold py-3 px-5 rounded-xl text-xs sm:text-sm cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer
        onNavigate={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenScanner={() => {
          setSelectedCropForScanner(null);
          setActiveTab('scanner');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
