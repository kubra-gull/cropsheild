import React, { useState } from 'react';
import { CROPS_DATA } from '../data/cropsData';
import { CropCategory, CropItem } from '../types';
import { Camera, Check, Leaf } from 'lucide-react';

interface SupportedCropsProps {
  onSelectCropToScan: (crop: CropItem) => void;
}

export const SupportedCrops: React.FC<SupportedCropsProps> = ({ onSelectCropToScan }) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | CropCategory>('all');

  const filteredCrops = selectedCategory === 'all' 
    ? CROPS_DATA 
    : CROPS_DATA.filter((crop) => crop.category === selectedCategory);

  const categories: { id: 'all' | CropCategory; label: string; count: number }[] = [
    { id: 'all', label: 'All Supported Crops', count: CROPS_DATA.length },
    { id: 'vegetables', label: 'Vegetables', count: CROPS_DATA.filter(c => c.category === 'vegetables').length },
    { id: 'fruits', label: 'Fruits', count: CROPS_DATA.filter(c => c.category === 'fruits').length },
    { id: 'field', label: 'Field Crops', count: CROPS_DATA.filter(c => c.category === 'field').length },
  ];

  return (
    <section className="py-16 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
            <Leaf className="w-3.5 h-3.5 text-emerald-600" />
            <span>Trained AI Recognition Library</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight font-serif">
            Protect Every Part of Your Harvest
          </h2>
          <p className="text-stone-600 text-base sm:text-lg">
            CropShield is trained on tens of thousands of real agricultural leaf and plant symptoms across high-value vegetables, fruits, and field staples.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              id={`crop-filter-${cat.id}`}
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              {cat.label} ({cat.count})
            </button>
          ))}
        </div>

        {/* Crops Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCrops.map((crop) => (
            <div
              key={crop.id}
              className="bg-white rounded-2xl border border-stone-200 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col group"
            >
              {/* Crop Image */}
              <div className="relative h-44 bg-stone-100 overflow-hidden">
                <img
                  src={crop.image}
                  alt={crop.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-md text-[11px] font-bold text-stone-800 uppercase tracking-wide shadow-2xs">
                  {crop.category}
                </div>
              </div>

              {/* Crop Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-xl font-bold text-stone-900 group-hover:text-emerald-700 transition-colors">
                      {crop.name}
                    </h3>
                    <span className="text-xs text-stone-500 italic">{crop.scientificName}</span>
                  </div>
                  <p className="text-xs text-stone-600 mt-1.5 line-clamp-2">
                    {crop.description}
                  </p>

                  {/* Common disease tags */}
                  <div className="mt-3">
                    <p className="text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1.5">
                      Detectable conditions:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {crop.commonDiseases.slice(0, 3).map((disease, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 font-medium"
                        >
                          {disease}
                        </span>
                      ))}
                      {crop.commonDiseases.length > 3 && (
                        <span className="text-[11px] px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-medium">
                          +{crop.commonDiseases.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Scan Button */}
                <button
                  onClick={() => onSelectCropToScan(crop)}
                  id={`scan-crop-${crop.id}`}
                  className="w-full mt-2 flex items-center justify-center gap-2 bg-stone-900 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs sm:text-sm transition-colors cursor-pointer"
                >
                  <Camera className="w-4 h-4" />
                  <span>Scan {crop.name}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
