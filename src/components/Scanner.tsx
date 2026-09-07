import React, { useState, useRef } from 'react';
import { 
  Camera, 
  UploadCloud, 
  Trash2, 
  AlertCircle, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Calendar, 
  ShieldAlert, 
  ArrowRight, 
  RotateCcw, 
  Sparkles, 
  CheckSquare, 
  Square,
  MessageCircle,
  HelpCircle,
  ShoppingBag,
  Share2
} from 'lucide-react';
import { AnalysisResult, CropItem, CropReminder } from '../types';
import { analyzeCropImage } from '../services/cropClassifier';
import { SAMPLE_TEST_IMAGES, SampleTestImage } from '../data/cropsData';
import { CROPS_DATA } from '../data/cropsData';

interface ScannerProps {
  initialCropHint?: CropItem | null;
  onSaveScanToHistory: (result: AnalysisResult) => void;
  onAddReminder: (reminder: CropReminder) => void;
  onFindSuppliersForCrop: (crop: string, disease: string) => void;
  onExploreTreatmentsForDisease: (disease: string) => void;
}

export const Scanner: React.FC<ScannerProps> = ({
  initialCropHint,
  onSaveScanToHistory,
  onAddReminder,
  onFindSuppliersForCrop,
  onExploreTreatmentsForDisease,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [cropHint, setCropHint] = useState<string>(initialCropHint ? initialCropHint.name : '');
  const [activeSampleId, setActiveSampleId] = useState<string | null>(null);

  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisStep, setAnalysisStep] = useState<string>('');
  const [result, setResult] = useState<AnalysisResult | null>(null);

  // Reminder creation states
  const [showReminderBox, setShowReminderBox] = useState<boolean>(false);
  const [reminderSavedMessage, setReminderSavedMessage] = useState<string | null>(null);

  // Action plan checklist state
  const [actionPlanState, setActionPlanState] = useState<{ [id: string]: boolean }>({});

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Handle Drag & Drop
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (JPEG, PNG, WEBP).');
      return;
    }
    setFileName(file.name);
    setActiveSampleId(null);
    setResult(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setSelectedImage(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSelectSample = (sample: SampleTestImage) => {
    setSelectedImage(sample.imageUrl);
    setFileName(sample.title);
    setCropHint(sample.crop === 'Unknown' ? '' : sample.crop);
    setActiveSampleId(sample.id);
    setResult(null);
  };

  const handleClearImage = () => {
    setSelectedImage(null);
    setFileName('');
    setActiveSampleId(null);
    setResult(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    setResult(null);
    setReminderSavedMessage(null);

    // Multi-stage realistic loading feedback for farmers
    setAnalysisStep('Preprocessing crop leaf pixels...');
    const stepTimer1 = setTimeout(() => {
      setAnalysisStep('Running AI Crop Health Analysis...');
    }, 450);
    const stepTimer2 = setTimeout(() => {
      setAnalysisStep('Evaluating plant disease symptoms and severity...');
    }, 950);

    try {
      const res = await analyzeCropImage({
        imageDataUrl: selectedImage,
        cropHint: cropHint || undefined,
        fileName,
        sampleId: activeSampleId || undefined,
      });

      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);

      setResult(res);
      onSaveScanToHistory(res);

      // Initialize action plan checkboxes
      const initialChecks: { [id: string]: boolean } = {};
      res.actionPlan.forEach(item => {
        initialChecks[item.id] = false;
      });
      setActionPlanState(initialChecks);

      // Smooth scroll to result
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (err) {
      console.error('Scan failed:', err);
      alert('Could not complete analysis. Please try again or check your image.');
    } finally {
      setIsAnalyzing(false);
      setAnalysisStep('');
    }
  };

  const toggleActionItem = (id: string) => {
    setActionPlanState(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleSetReminder = (option: 'tomorrow' | '3days' | '7days' | 'custom', customDateVal?: string) => {
    if (!result) return;

    let dueFormatted = '';
    let label = '';
    const now = new Date();

    if (option === 'tomorrow') {
      const d = new Date(now);
      d.setDate(d.getDate() + 1);
      dueFormatted = d.toISOString().split('T')[0];
      label = 'Tomorrow';
    } else if (option === '3days') {
      const d = new Date(now);
      d.setDate(d.getDate() + 3);
      dueFormatted = d.toISOString().split('T')[0];
      label = 'In 3 days';
    } else if (option === '7days') {
      const d = new Date(now);
      d.setDate(d.getDate() + 7);
      dueFormatted = d.toISOString().split('T')[0];
      label = 'In 7 days';
    } else if (option === 'custom' && customDateVal) {
      dueFormatted = customDateVal;
      label = customDateVal;
    }

    const newReminder: CropReminder = {
      id: 'rem-' + Date.now(),
      crop: result.crop,
      diseaseName: result.diseaseName,
      title: `Check ${result.crop} for ${result.diseaseName}`,
      dueDate: dueFormatted,
      dueLabel: label,
      completed: false,
      notes: `Follow-up on ${result.diseaseName} treatment response.`,
      createdAt: now.toISOString(),
    };

    onAddReminder(newReminder);
    setReminderSavedMessage(`Reminder set for ${label}! You can view it anytime under My Crops.`);
    setShowReminderBox(false);
  };

  return (
    <section className="py-10 lg:py-16 bg-stone-50 min-h-[85vh]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header and Instructions */}
        <div className="text-center space-y-3 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            <span>AI-Powered Crop Health Scanner</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight font-serif">
            Scan Your Crop
          </h2>

          <p className="text-base sm:text-lg text-stone-600 max-w-xl mx-auto font-normal">
            Take a clear photo of the affected leaf, fruit, vegetable, or plant and upload it below.
          </p>
        </div>

        {/* Scanner Upload Card */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-md p-6 sm:p-8 space-y-6">
          {/* Optional Crop Hint Dropdown */}
          <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <label htmlFor="crop-hint-select" className="text-xs sm:text-sm font-bold text-stone-800 flex items-center gap-1.5">
                <span>Crop Selection (Optional)</span>
                <span className="text-[11px] font-normal text-stone-500">• Helps focus the diagnosis</span>
              </label>
              <p className="text-xs text-stone-500 mt-0.5">
                Leave as &quot;Auto-Detect&quot; or choose your specific crop
              </p>
            </div>
            <select
              id="crop-hint-select"
              value={cropHint}
              onChange={(e) => setCropHint(e.target.value)}
              className="w-full sm:w-56 bg-white border border-stone-300 rounded-lg px-3 py-2 text-sm font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">🌱 Auto-Detect Crop</option>
              {CROPS_DATA.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name} ({c.category})
                </option>
              ))}
            </select>
          </div>

          {/* Upload Area / Preview */}
          {!selectedImage ? (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center transition-all flex flex-col items-center justify-center cursor-pointer ${
                isDragging
                  ? 'border-emerald-500 bg-emerald-50/50 scale-[0.99]'
                  : 'border-stone-300 hover:border-emerald-500 hover:bg-stone-50/60'
              }`}
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 shadow-xs">
                <UploadCloud className="w-8 h-8" />
              </div>

              <h3 className="text-lg font-bold text-stone-800">
                Tap to upload or drag & drop photo here
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-sm">
                Supports camera snapshots, JPG, PNG, or WEBP of leaves, fruits, or plants.
              </p>

              {/* Action Buttons for Mobile / Desktop */}
              <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                  className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2.5 rounded-xl shadow-xs text-sm cursor-pointer"
                >
                  <UploadCloud className="w-4 h-4" />
                  <span>Choose Photo</span>
                </button>

                {/* Mobile direct camera trigger */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    cameraInputRef.current?.click();
                  }}
                  className="flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-white font-bold px-5 py-2.5 rounded-xl shadow-xs text-sm cursor-pointer"
                >
                  <Camera className="w-4 h-4 text-emerald-400" />
                  <span>Take Photo with Camera</span>
                </button>
              </div>

              {/* Hidden file inputs */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
              <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          ) : (
            /* Image Preview Card */
            <div className="space-y-4">
              <div className="relative rounded-2xl overflow-hidden border border-stone-200 bg-stone-900 max-h-96 flex items-center justify-center">
                <img
                  src={selectedImage}
                  alt="Crop preview"
                  className="max-h-96 w-auto object-contain rounded-xl"
                />

                {/* Remove button */}
                <button
                  type="button"
                  onClick={handleClearImage}
                  id="remove-photo-btn"
                  className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 text-white p-2 rounded-xl shadow-md transition-transform hover:scale-105 cursor-pointer flex items-center gap-1.5 text-xs font-bold"
                  title="Remove Image"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Remove Image</span>
                </button>

                {/* Scan Overlay when analyzing */}
                {isAnalyzing && (
                  <div className="absolute inset-0 bg-emerald-950/70 backdrop-blur-xs flex flex-col items-center justify-center text-white p-6">
                    <div className="w-16 h-16 rounded-full border-4 border-emerald-400 border-t-transparent animate-spin mb-4" />
                    <h4 className="text-xl font-bold tracking-tight">Analyzing your crop...</h4>
                    <p className="text-sm text-emerald-200 mt-1 font-mono">{analysisStep}</p>
                    <p className="text-xs text-stone-300 mt-3 max-w-xs text-center">
                      Our smart disease detection engine is reviewing cellular discoloration and spore patterns.
                    </p>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between text-xs text-stone-500 px-1">
                <span>Selected: <strong className="text-stone-800">{fileName || 'Custom photo'}</strong></span>
                <button
                  onClick={handleClearImage}
                  className="text-emerald-700 hover:underline font-semibold cursor-pointer"
                >
                  Change Image
                </button>
              </div>

              {/* Large Primary Analyze Crop Button */}
              <button
                type="button"
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                id="analyze-crop-primary-btn"
                className="w-full flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-stone-300 text-white font-extrabold py-4 px-6 rounded-xl shadow-md hover:shadow-lg transition-all text-base sm:text-lg cursor-pointer active:scale-98"
              >
                <Sparkles className="w-5 h-5 text-emerald-200" />
                <span>{isAnalyzing ? 'Analyzing your crop...' : 'Analyze Crop'}</span>
              </button>
            </div>
          )}

          {/* Quick-Test Sample Images Row */}
          <div className="pt-4 border-t border-stone-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-600">
                Or test with instant sample photos:
              </span>
              <span className="text-[11px] text-stone-500">1-click demo</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
              {SAMPLE_TEST_IMAGES.map((sample) => (
                <button
                  key={sample.id}
                  onClick={() => handleSelectSample(sample)}
                  className={`flex flex-col items-center p-2 rounded-xl border text-center transition-all cursor-pointer ${
                    activeSampleId === sample.id
                      ? 'border-emerald-600 bg-emerald-50 ring-2 ring-emerald-500'
                      : 'border-stone-200 hover:border-stone-400 bg-stone-50'
                  }`}
                >
                  <img
                    src={sample.thumbnail}
                    alt={sample.title}
                    className="w-12 h-12 object-cover rounded-lg mb-1.5"
                  />
                  <span className="text-[11px] font-bold text-stone-800 line-clamp-1">
                    {sample.title}
                  </span>
                  <span className={`text-[10px] font-semibold mt-0.5 ${
                    sample.expectedStatus === 'diseased' ? 'text-red-700' :
                    sample.expectedStatus === 'healthy' ? 'text-emerald-700' : 'text-amber-700'
                  }`}>
                    {sample.expectedStatus === 'diseased' ? 'Disease' :
                     sample.expectedStatus === 'healthy' ? 'Healthy' : 'Uncertain'}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RESULTS SECTION */}
        {result && (
          <div ref={resultsRef} className="mt-10 space-y-8 animate-in fade-in slide-in-from-bottom duration-300">
            {/* Reminder Feedback Banner if just set */}
            {reminderSavedMessage && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <p className="text-sm font-semibold">{reminderSavedMessage}</p>
              </div>
            )}

            {/* Main Result Card */}
            <div className="bg-white rounded-2xl border border-stone-200 shadow-xl overflow-hidden">
              {/* Status Header */}
              <div className={`px-6 py-5 text-white flex flex-wrap items-center justify-between gap-4 ${
                result.status === 'diseased'
                  ? 'bg-gradient-to-r from-stone-900 via-red-950 to-stone-900'
                  : result.status === 'healthy'
                  ? 'bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900'
                  : 'bg-gradient-to-r from-amber-950 via-stone-900 to-stone-900'
              }`}>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase tracking-widest font-mono text-stone-300">
                      Crop Health Result
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-serif">
                    {result.diseaseName}
                  </h3>
                </div>

                <div className="flex items-center gap-3">
                  {/* Status Badge */}
                  <div className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-extrabold flex items-center gap-2 ${
                    result.status === 'diseased'
                      ? 'bg-red-500/20 border border-red-400 text-red-200'
                      : result.status === 'healthy'
                      ? 'bg-emerald-500/20 border border-emerald-400 text-emerald-200'
                      : 'bg-amber-500/20 border border-amber-400 text-amber-200'
                  }`}>
                    {result.status === 'diseased' && <AlertTriangle className="w-4 h-4 text-red-400" />}
                    {result.status === 'healthy' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                    {result.status === 'uncertain' && <HelpCircle className="w-4 h-4 text-amber-400" />}
                    <span>
                      {result.status === 'diseased' ? '🔴 Possible Disease Detected' :
                       result.status === 'healthy' ? '🟢 Healthy Crop' : '🟡 Low Confidence Diagnosis'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-8">
                {/* Metric Summary Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-stone-50 border border-stone-200">
                  <div>
                    <span className="text-xs text-stone-500 font-semibold block">Crop</span>
                    <span className="text-base font-extrabold text-stone-900">🌿 {result.crop}</span>
                  </div>

                  <div>
                    <span className="text-xs text-stone-500 font-semibold block">Confidence</span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-base font-extrabold text-emerald-700">{result.confidence}%</span>
                      <div className="w-16 h-2 bg-stone-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            result.confidence >= 80 ? 'bg-emerald-600' : 'bg-amber-500'
                          }`}
                          style={{ width: `${result.confidence}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <span className="text-xs text-stone-500 font-semibold block">Severity</span>
                    <span className={`text-base font-extrabold ${
                      result.severity === 'Severe' ? 'text-red-700' :
                      result.severity === 'Moderate' ? 'text-amber-700' : 'text-emerald-700'
                    }`}>
                      {result.severity}
                    </span>
                  </div>

                  <div>
                    <span className="text-xs text-stone-500 font-semibold block">Scan Date</span>
                    <span className="text-sm font-bold text-stone-700">{result.timestamp}</span>
                  </div>
                </div>

                {/* LOW CONFIDENCE ALERT BOX */}
                {result.status === 'uncertain' ? (
                  <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-6 space-y-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-7 h-7 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-lg font-bold text-amber-950">
                          We couldn&apos;t identify the crop problem with enough confidence.
                        </h4>
                        <p className="text-sm text-stone-700 mt-1">
                          The uploaded image did not show distinct leaf lesions clearly enough for a safe diagnosis.
                        </p>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-4 border border-amber-200">
                      <h5 className="text-sm font-bold text-stone-900 mb-2">Recommended photography tips:</h5>
                      <ul className="space-y-2 text-sm text-stone-700">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>Take a clearer, sharp photo with your phone camera held steady</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>Focus closely on the affected leaf spot, stem, or fruit</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>Use good natural morning or indirect daylight (avoid dark shadows or glare)</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>Consult a qualified agriculture professional if the problem continues</span>
                        </li>
                      </ul>
                    </div>

                    <button
                      onClick={handleClearImage}
                      className="inline-flex items-center gap-2 bg-amber-700 hover:bg-amber-800 text-white font-bold px-5 py-2.5 rounded-xl text-sm cursor-pointer"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Take or Upload Another Image</span>
                    </button>
                  </div>
                ) : (
                  /* HEALTHY OR DISEASED DETAILS */
                  <>
                    {/* Visual Symptoms and Possible Causes */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200">
                        <h4 className="text-sm font-extrabold text-stone-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                          <span>🔍</span>
                          <span>Observable Symptoms</span>
                        </h4>
                        <ul className="space-y-2 text-sm text-stone-700">
                          {result.symptoms.map((symptom, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0" />
                              <span>{symptom}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200">
                        <h4 className="text-sm font-extrabold text-stone-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                          <span>🔬</span>
                          <span>Possible Causes</span>
                        </h4>
                        <ul className="space-y-2 text-sm text-stone-700">
                          {result.possibleCauses.map((cause, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-2 shrink-0" />
                              <span>{cause}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* ACTIONABLE AI AGENT BEHAVIOR - YOUR ACTION PLAN */}
                    <div className="bg-emerald-50/70 border-2 border-emerald-200 rounded-2xl p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center">
                            <CheckSquare className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="text-lg font-extrabold text-emerald-950 font-serif">
                              Your Action Plan
                            </h4>
                            <p className="text-xs text-emerald-800">
                              Short, simple steps for immediate farm care. Tap to mark as done.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2.5 pt-1">
                        {result.actionPlan.map((item) => {
                          const isDone = actionPlanState[item.id] ?? item.done;
                          return (
                            <button
                              key={item.id}
                              onClick={() => toggleActionItem(item.id)}
                              className={`w-full flex items-start gap-3 p-3 rounded-xl border text-left transition-all cursor-pointer ${
                                isDone
                                  ? 'bg-emerald-100/70 border-emerald-300 text-emerald-900 line-through opacity-75'
                                  : 'bg-white border-emerald-200 hover:border-emerald-400 text-stone-800'
                              }`}
                            >
                              <span className="mt-0.5 shrink-0 text-emerald-700">
                                {isDone ? (
                                  <CheckSquare className="w-5 h-5" />
                                ) : (
                                  <Square className="w-5 h-5" />
                                )}
                              </span>
                              <span className="text-sm font-semibold">{item.text}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* RECOMMENDED TREATMENT SYSTEM */}
                    <div className="space-y-4 pt-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xl font-extrabold text-stone-900 font-serif flex items-center gap-2">
                          <span>Recommended Treatment Guidance</span>
                        </h4>
                        <button
                          onClick={() => onExploreTreatmentsForDisease(result.diseaseName)}
                          className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <span>Full Library Details</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* What to do now */}
                        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
                          <h5 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-black">
                              1
                            </span>
                            <span>Immediate Actions</span>
                          </h5>
                          <ul className="space-y-2 text-xs sm:text-sm text-stone-600">
                            {result.immediateActions.map((action, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-emerald-600 font-bold">•</span>
                                <span>{action}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Agricultural Practices */}
                        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
                          <h5 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-black">
                              2
                            </span>
                            <span>Agricultural Practices & Prevention</span>
                          </h5>
                          <ul className="space-y-2 text-xs sm:text-sm text-stone-600">
                            {result.agriculturalPractices.map((practice, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-emerald-600 font-bold">•</span>
                                <span>{practice}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Safety Precautions & Expert Advice */}
                      <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-5 space-y-3">
                        <div className="flex items-start gap-2.5">
                          <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                          <div>
                            <h5 className="text-sm font-bold text-amber-950">
                              Agricultural Safety & Professional Advice
                            </h5>
                            <p className="text-xs text-stone-700 mt-1">
                              {result.whenToContactExpert}
                            </p>
                            <p className="text-xs text-stone-500 mt-2 italic">
                              Notice: For chemical sprays and commercial bio-fungicides, always adhere to registered container labels, wear protective clothing, and observe local harvest intervals.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* TWO KEY ACTIONS: Set Treatment Reminder & Find Agricultural Suppliers */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-stone-200">
                      {/* Reminder Trigger Card */}
                      <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 flex flex-col justify-between space-y-3">
                        <div>
                          <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
                            <Clock className="w-4 h-4 text-emerald-700" />
                            <span>Treatment Reminder</span>
                          </div>
                          <p className="text-xs text-stone-600 mt-1">
                            Schedule a follow-up check to monitor if your crop shows recovery or spread.
                          </p>
                        </div>

                        {!showReminderBox ? (
                          <button
                            onClick={() => setShowReminderBox(true)}
                            id="trigger-reminder-btn"
                            className="flex items-center justify-center gap-2 bg-white hover:bg-stone-100 text-stone-800 font-bold py-2.5 px-4 rounded-xl border border-stone-300 text-xs sm:text-sm cursor-pointer shadow-2xs"
                          >
                            <Calendar className="w-4 h-4 text-emerald-700" />
                            <span>Set Treatment Reminder</span>
                          </button>
                        ) : (
                          <div className="bg-white p-3 rounded-xl border border-emerald-300 space-y-2">
                            <span className="text-xs font-bold text-stone-800 block">
                              When would you like a reminder?
                            </span>
                            <div className="grid grid-cols-3 gap-1.5">
                              <button
                                onClick={() => handleSetReminder('tomorrow')}
                                className="px-2 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs rounded-lg cursor-pointer"
                              >
                                Tomorrow
                              </button>
                              <button
                                onClick={() => handleSetReminder('3days')}
                                className="px-2 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs rounded-lg cursor-pointer"
                              >
                                In 3 Days
                              </button>
                              <button
                                onClick={() => handleSetReminder('7days')}
                                className="px-2 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs rounded-lg cursor-pointer"
                              >
                                In 7 Days
                              </button>
                            </div>
                            <button
                              onClick={() => setShowReminderBox(false)}
                              className="text-[11px] text-stone-400 hover:text-stone-600 underline block text-center pt-1"
                            >
                              Cancel
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Connect Supplier Trigger Card */}
                      <div className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-5 flex flex-col justify-between space-y-3">
                        <div>
                          <div className="flex items-center gap-2 text-emerald-950 font-bold text-sm">
                            <ShoppingBag className="w-4 h-4 text-emerald-700" />
                            <span>Find Agricultural Suppliers</span>
                          </div>
                          <p className="text-xs text-stone-600 mt-1">
                            Connect with verified dealers near you for certified {result.crop} treatments and advice.
                          </p>
                        </div>

                        <button
                          onClick={() => onFindSuppliersForCrop(result.crop, result.diseaseName)}
                          id="find-suppliers-action-btn"
                          className="flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2.5 px-4 rounded-xl shadow-xs text-xs sm:text-sm cursor-pointer"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>Find Suppliers & WhatsApp</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
