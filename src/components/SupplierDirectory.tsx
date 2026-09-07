import React, { useState, useMemo } from 'react';
import { SUPPLIERS_DATA, generateWhatsAppUrl } from '../data/suppliersData';
import { Supplier } from '../types';
import { 
  Phone, 
  MessageCircle, 
  MapPin, 
  Search, 
  CheckCircle2, 
  Clock, 
  Store, 
  Filter, 
  RotateCcw,
  Sparkles 
} from 'lucide-react';

interface SupplierDirectoryProps {
  initialCrop?: string;
  initialDisease?: string;
}

export const SupplierDirectory: React.FC<SupplierDirectoryProps> = ({
  initialCrop = '',
  initialDisease = '',
}) => {
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [activeCrop, setActiveCrop] = useState<string>(initialCrop || 'Tomato');
  const [activeDisease, setActiveDisease] = useState<string>(initialDisease || 'Early Blight');

  // Locations list
  const locations = useMemo(() => {
    const locSet = new Set<string>();
    SUPPLIERS_DATA.forEach(s => locSet.add(s.location));
    return ['all', ...Array.from(locSet)];
  }, []);

  // Categories list
  const categories = useMemo(() => {
    const catSet = new Set<string>();
    SUPPLIERS_DATA.forEach(s => s.categories.forEach(c => catSet.add(c)));
    return ['all', ...Array.from(catSet)];
  }, []);

  // Filtered Suppliers
  const filteredSuppliers = useMemo(() => {
    return SUPPLIERS_DATA.filter((supp) => {
      const matchLocation = selectedLocation === 'all' || supp.location === selectedLocation;
      const matchCategory = selectedCategory === 'all' || supp.categories.includes(selectedCategory);
      
      const q = searchQuery.toLowerCase();
      const matchSearch = !searchQuery || 
        supp.name.toLowerCase().includes(q) ||
        supp.address.toLowerCase().includes(q) ||
        supp.cropsSupported.some(c => c.toLowerCase().includes(q)) ||
        supp.categories.some(c => c.toLowerCase().includes(q));

      return matchLocation && matchCategory && matchSearch;
    });
  }, [selectedLocation, selectedCategory, searchQuery]);

  const handleResetFilters = () => {
    setSelectedLocation('all');
    setSelectedCategory('all');
    setSearchQuery('');
  };

  return (
    <section className="py-12 lg:py-16 bg-stone-50 min-h-[85vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200">
            <Store className="w-3.5 h-3.5 text-emerald-700" />
            <span>Verified Agricultural Supplier Network</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight font-serif">
            Find Agricultural Suppliers
          </h2>

          <p className="text-stone-600 text-base sm:text-lg">
            Connect directly with verified agricultural input dealers, crop protection specialists, and farm equipment stores. Contact via WhatsApp with your scan details.
          </p>
        </div>

        {/* Dynamic Context Card: Shows which crop & disease is attached to WhatsApp query */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-lg">
              🌿
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                WhatsApp Inquiry Context:
              </span>
              <div className="flex flex-wrap items-center gap-2 mt-0.5">
                <span className="text-sm font-extrabold text-stone-900">
                  Crop: <span className="text-emerald-700">{activeCrop || 'Your Crop'}</span>
                </span>
                <span className="text-stone-300">•</span>
                <span className="text-sm font-extrabold text-stone-900">
                  Detected Issue: <span className="text-red-700">{activeDisease || 'Crop Condition'}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Inline Editor for query context */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="text"
              value={activeCrop}
              onChange={(e) => setActiveCrop(e.target.value)}
              placeholder="Crop (e.g. Tomato)"
              className="px-3 py-1.5 rounded-lg border border-stone-300 text-xs text-stone-800 w-1/2 sm:w-28 focus:outline-emerald-500"
            />
            <input
              type="text"
              value={activeDisease}
              onChange={(e) => setActiveDisease(e.target.value)}
              placeholder="Disease (e.g. Early Blight)"
              className="px-3 py-1.5 rounded-lg border border-stone-300 text-xs text-stone-800 w-1/2 sm:w-36 focus:outline-emerald-500"
            />
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-xs space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            {/* Search Input */}
            <div className="sm:col-span-6 relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by store name, crop, product..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-stone-50/50"
              />
            </div>

            {/* Location Selector */}
            <div className="sm:col-span-3">
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-stone-300 text-sm font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              >
                <option value="all">📍 All Locations</option>
                {locations.filter(l => l !== 'all').map(loc => (
                  <option key={loc} value={loc}>📍 {loc}</option>
                ))}
              </select>
            </div>

            {/* Category Selector */}
            <div className="sm:col-span-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-stone-300 text-sm font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              >
                <option value="all">🌱 All Categories</option>
                {categories.filter(c => c !== 'all').map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {(selectedLocation !== 'all' || selectedCategory !== 'all' || searchQuery) && (
            <div className="flex items-center justify-between text-xs text-stone-500 pt-2 border-t border-stone-100">
              <span>Showing {filteredSuppliers.length} matching suppliers</span>
              <button
                onClick={handleResetFilters}
                className="text-emerald-700 hover:underline flex items-center gap-1 font-bold cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Filters</span>
              </button>
            </div>
          )}
        </div>

        {/* Suppliers List */}
        {filteredSuppliers.length === 0 ? (
          <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center space-y-3">
            <Store className="w-12 h-12 text-stone-300 mx-auto" />
            <h3 className="text-lg font-bold text-stone-800">No suppliers found</h3>
            <p className="text-sm text-stone-500 max-w-sm mx-auto">
              Try adjusting your search terms or resetting the location filter to see more stores.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-2 inline-flex items-center gap-2 bg-stone-900 text-white font-bold px-4 py-2 rounded-xl text-sm cursor-pointer"
            >
              Show All Suppliers
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSuppliers.map((supplier) => {
              const whatsAppUrl = generateWhatsAppUrl(supplier, activeCrop, activeDisease);

              return (
                <div
                  key={supplier.id}
                  className="bg-white rounded-2xl border border-stone-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between p-6 group"
                >
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="text-lg font-bold text-stone-900 group-hover:text-emerald-700 transition-colors">
                            {supplier.name}
                          </h3>
                          {supplier.verified && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" title="Verified Agricultural Dealer" />
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-stone-500 mt-1 font-medium">
                          <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{supplier.location}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 bg-amber-50 text-amber-900 px-2 py-0.5 rounded-md text-xs font-extrabold border border-amber-200/60">
                        <span>★</span>
                        <span>{supplier.rating}</span>
                        <span className="text-[10px] text-amber-700 font-normal">({supplier.reviewsCount})</span>
                      </div>
                    </div>

                    {/* Address & Hours */}
                    <div className="text-xs text-stone-600 space-y-1 bg-stone-50 p-3 rounded-xl border border-stone-100">
                      <p className="font-medium text-stone-700">📍 {supplier.address}</p>
                      <p className="flex items-center gap-1 text-[11px] text-stone-500">
                        <Clock className="w-3 h-3 text-stone-400" />
                        <span>{supplier.businessHours}</span>
                      </p>
                    </div>

                    {/* Products / Services tags */}
                    <div>
                      <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block mb-1.5">
                        Products & Specialties:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {supplier.categories.map((cat, i) => (
                          <span
                            key={i}
                            className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-100"
                          >
                            🌱 {cat}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Buttons: Call Supplier & Contact on WhatsApp */}
                  <div className="pt-5 mt-5 border-t border-stone-100 grid grid-cols-2 gap-2">
                    <a
                      href={`tel:${supplier.phone.replace(/\s+/g, '')}`}
                      className="flex items-center justify-center gap-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold py-2.5 px-3 rounded-xl text-xs transition-colors text-center"
                    >
                      <Phone className="w-3.5 h-3.5 text-stone-600" />
                      <span>Call Supplier</span>
                    </a>

                    <a
                      href={whatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-3 rounded-xl text-xs shadow-xs transition-colors text-center"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Contact on WhatsApp</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
