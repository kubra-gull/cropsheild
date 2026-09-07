export type CropCategory = 'vegetables' | 'fruits' | 'field';

export type AnalysisStatus = 'healthy' | 'diseased' | 'uncertain';

export type DiseaseSeverity = 'Mild' | 'Moderate' | 'Severe' | 'None';

export interface ActionPlanItem {
  id: string;
  text: string;
  done: boolean;
}

export interface AnalysisResult {
  id: string;
  timestamp: string;
  crop: string;
  status: AnalysisStatus;
  diseaseName: string;
  confidence: number;
  severity: DiseaseSeverity;
  symptoms: string[];
  possibleCauses: string[];
  immediateActions: string[];
  agriculturalPractices: string[];
  preventionSteps: string[];
  safetyPrecautions: string[];
  whenToContactExpert: string;
  actionPlan: ActionPlanItem[];
  imageUrl?: string;
  recommendedSupplierCategory?: string;
}

export interface CropItem {
  id: string;
  name: string;
  category: CropCategory;
  scientificName: string;
  description: string;
  image: string;
  commonDiseases: string[];
}

export interface TreatmentInfo {
  id: string;
  diseaseName: string;
  affectedCrops: string[];
  category: 'Fungal' | 'Bacterial' | 'Viral' | 'Pest Damage' | 'Nutritional' | 'Healthy Management';
  severity: DiseaseSeverity;
  symptoms: string[];
  immediateActions: string[];
  agriculturalPractices: string[];
  preventionSteps: string[];
  safetyPrecautions: string[];
  expertAdvice: string;
}

export interface Supplier {
  id: string;
  name: string;
  location: string;
  address: string;
  phone: string;
  whatsappNumber: string;
  categories: string[];
  cropsSupported: string[];
  rating: number;
  reviewsCount: number;
  verified: boolean;
  businessHours: string;
}

export interface CropReminder {
  id: string;
  crop: string;
  diseaseName: string;
  title: string;
  dueDate: string;
  dueLabel: string;
  completed: boolean;
  notes?: string;
  createdAt: string;
}
