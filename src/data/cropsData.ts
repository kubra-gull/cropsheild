import { CropItem } from '../types';

export const CROPS_DATA: CropItem[] = [
  // Vegetables
  {
    id: 'tomato',
    name: 'Tomato',
    category: 'vegetables',
    scientificName: 'Solanum lycopersicum',
    description: 'Widely cultivated fruit vegetable vulnerable to Early Blight, Late Blight, and Septoria leaf spot.',
    image: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=600&q=80',
    commonDiseases: ['Early Blight', 'Late Blight', 'Bacterial Spot', 'Leaf Mold', 'Yellow Leaf Curl'],
  },
  {
    id: 'potato',
    name: 'Potato',
    category: 'vegetables',
    scientificName: 'Solanum tuberosum',
    description: 'Vital carbohydrate staple susceptible to Late Blight, Early Blight, and Black Scurf.',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80',
    commonDiseases: ['Late Blight', 'Early Blight', 'Common Scab', 'Blackleg'],
  },
  {
    id: 'corn-veg',
    name: 'Corn',
    category: 'vegetables',
    scientificName: 'Zea mays',
    description: 'Sweet corn crops susceptible to Northern Leaf Blight, Common Rust, and Gray Leaf Spot.',
    image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=600&q=80',
    commonDiseases: ['Northern Corn Leaf Blight', 'Common Rust', 'Gray Leaf Spot'],
  },
  {
    id: 'pepper',
    name: 'Pepper',
    category: 'vegetables',
    scientificName: 'Capsicum annuum',
    description: 'Bell and chili peppers prone to Bacterial Leaf Spot, Anthracnose, and Phytophthora blight.',
    image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=600&q=80',
    commonDiseases: ['Bacterial Spot', 'Anthracnose', 'Cercospora Leaf Spot'],
  },
  {
    id: 'cucumber',
    name: 'Cucumber',
    category: 'vegetables',
    scientificName: 'Cucumis sativus',
    description: 'High-yield vine crop commonly affected by Downy Mildew, Powdery Mildew, and Angular Leaf Spot.',
    image: 'https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?auto=format&fit=crop&w=600&q=80',
    commonDiseases: ['Downy Mildew', 'Powdery Mildew', 'Anthracnose'],
  },
  {
    id: 'onion',
    name: 'Onion',
    category: 'vegetables',
    scientificName: 'Allium cepa',
    description: 'Essential bulb vegetable susceptible to Purple Blotch, Stemphylium blight, and Downy Mildew.',
    image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=600&q=80',
    commonDiseases: ['Purple Blotch', 'Downy Mildew', 'Neck Rot'],
  },

  // Fruits
  {
    id: 'apple',
    name: 'Apple',
    category: 'fruits',
    scientificName: 'Malus domestica',
    description: 'Temperate orchard fruit vulnerable to Apple Scab, Black Rot, and Cedar Apple Rust.',
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=600&q=80',
    commonDiseases: ['Apple Scab', 'Black Rot', 'Cedar Apple Rust', 'Fire Blight'],
  },
  {
    id: 'mango',
    name: 'Mango',
    category: 'fruits',
    scientificName: 'Mangifera indica',
    description: 'King of fruits susceptible to Anthracnose, Powdery Mildew, and Dieback.',
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=600&q=80',
    commonDiseases: ['Anthracnose', 'Powdery Mildew', 'Bacterial Canker'],
  },
  {
    id: 'orange',
    name: 'Orange',
    category: 'fruits',
    scientificName: 'Citrus sinensis',
    description: 'Citrus fruit vulnerable to Citrus Canker, Greening (Huanglongbing), and Black Spot.',
    image: 'https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&w=600&q=80',
    commonDiseases: ['Citrus Canker', 'Citrus Greening', 'Melanose'],
  },
  {
    id: 'grape',
    name: 'Grape',
    category: 'fruits',
    scientificName: 'Vitis vinifera',
    description: 'Vineyard crops susceptible to Black Rot, Downy Mildew, and Esca (Black Measles).',
    image: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?auto=format&fit=crop&w=600&q=80',
    commonDiseases: ['Black Rot', 'Downy Mildew', 'Esca (Black Measles)', 'Leaf Blight'],
  },
  {
    id: 'strawberry',
    name: 'Strawberry',
    category: 'fruits',
    scientificName: 'Fragaria × ananassa',
    description: 'High-value berry susceptible to Leaf Scorch, Gray Mold (Botrytis), and Powdery Mildew.',
    image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=600&q=80',
    commonDiseases: ['Leaf Scorch', 'Gray Mold (Botrytis)', 'Angular Leaf Spot'],
  },

  // Field Crops
  {
    id: 'rice',
    name: 'Rice',
    category: 'field',
    scientificName: 'Oryza sativa',
    description: 'Primary global food staple vulnerable to Rice Blast, Bacterial Leaf Blight, and Sheath Blight.',
    image: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=600&q=80',
    commonDiseases: ['Rice Blast', 'Bacterial Leaf Blight', 'Brown Spot', 'Sheath Blight'],
  },
  {
    id: 'wheat',
    name: 'Wheat',
    category: 'field',
    scientificName: 'Triticum aestivum',
    description: 'Crucial grain cereal prone to Stripe Rust, Leaf Rust, Powdery Mildew, and Fusarium Head Blight.',
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80',
    commonDiseases: ['Stripe Rust (Yellow Rust)', 'Leaf Rust (Brown Rust)', 'Powdery Mildew'],
  },
  {
    id: 'cotton',
    name: 'Cotton',
    category: 'field',
    scientificName: 'Gossypium hirsutum',
    description: 'Major cash crop susceptible to Cotton Leaf Curl Virus (CLCuV), Bacterial Blight, and Wilt.',
    image: 'https://images.unsplash.com/photo-1594488518001-3829283f885e?auto=format&fit=crop&w=600&q=80',
    commonDiseases: ['Cotton Leaf Curl Virus', 'Bacterial Blight', 'Alternaria Leaf Spot'],
  },
  {
    id: 'corn-field',
    name: 'Field Corn',
    category: 'field',
    scientificName: 'Zea mays indentata',
    description: 'Large-scale grain and livestock fodder susceptible to Northern Leaf Blight and Rust.',
    image: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=600&q=80',
    commonDiseases: ['Northern Corn Leaf Blight', 'Common Rust', 'Smut'],
  }
];

export interface SampleTestImage {
  id: string;
  title: string;
  crop: string;
  expectedStatus: 'diseased' | 'healthy' | 'uncertain';
  expectedDisease: string;
  imageUrl: string;
  thumbnail: string;
}

export const SAMPLE_TEST_IMAGES: SampleTestImage[] = [
  {
    id: 'sample-tomato-blight',
    title: 'Tomato Early Blight',
    crop: 'Tomato',
    expectedStatus: 'diseased',
    expectedDisease: 'Tomato Early Blight',
    imageUrl: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=800&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=150&q=80',
  },
  {
    id: 'sample-potato-blight',
    title: 'Potato Late Blight',
    crop: 'Potato',
    expectedStatus: 'diseased',
    expectedDisease: 'Potato Late Blight',
    imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=150&q=80',
  },
  {
    id: 'sample-rice-blast',
    title: 'Rice Blast Disease',
    crop: 'Rice',
    expectedStatus: 'diseased',
    expectedDisease: 'Rice Blast',
    imageUrl: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=800&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=150&q=80',
  },
  {
    id: 'sample-apple-healthy',
    title: 'Healthy Apple Foliage',
    crop: 'Apple',
    expectedStatus: 'healthy',
    expectedDisease: 'Healthy Crop (No Disease Detected)',
    imageUrl: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=150&q=80',
  },
  {
    id: 'sample-corn-blight',
    title: 'Corn Northern Leaf Blight',
    crop: 'Corn',
    expectedStatus: 'diseased',
    expectedDisease: 'Northern Corn Leaf Blight',
    imageUrl: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=800&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=150&q=80',
  },
  {
    id: 'sample-uncertain-blur',
    title: 'Low Light / Unclear Image',
    crop: 'Unknown',
    expectedStatus: 'uncertain',
    expectedDisease: 'Uncertain / Low Confidence',
    imageUrl: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=150&q=80',
  },
];
