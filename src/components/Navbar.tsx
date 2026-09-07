import React, { useState } from 'react';
import { ShieldCheck, Camera, Menu, X, Bell, Phone } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  activeRemindersCount: number;
  onOpenScanner: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  activeRemindersCount,
  onOpenScanner,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'scanner', label: 'Crop Scanner' },
    { id: 'treatments', label: 'Treatments' },
    { id: 'suppliers', label: 'Suppliers' },
    { id: 'dashboard', label: 'My Crops' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group cursor-pointer"
            id="nav-logo-btn"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl font-extrabold tracking-tight text-emerald-950 font-serif">
                Crop<span className="text-emerald-600">Shield</span>
              </span>
              <p className="text-[11px] font-medium text-stone-500 uppercase tracking-wider hidden sm:block">
                AI Agricultural Assistant
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  id={`nav-link-${item.id}`}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all relative cursor-pointer ${
                    isActive
                      ? 'text-emerald-700 bg-emerald-50'
                      : 'text-stone-700 hover:text-emerald-600 hover:bg-stone-50'
                  }`}
                >
                  {item.label}
                  {item.id === 'dashboard' && activeRemindersCount > 0 && (
                    <span className="ml-1.5 px-1.5 py-0.5 text-[10px] font-bold bg-amber-500 text-white rounded-full">
                      {activeRemindersCount}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action CTA & Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick reminder bell indicator */}
            {activeRemindersCount > 0 && (
              <button
                onClick={() => handleNavClick('dashboard')}
                className="relative p-2 rounded-lg text-stone-600 hover:text-emerald-700 hover:bg-stone-100 transition-colors"
                title={`${activeRemindersCount} active crop reminder(s)`}
                id="navbar-reminders-indicator"
              >
                <Bell className="w-5 h-5 text-amber-600 animate-pulse" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white" />
              </button>
            )}

            {/* Scan Your Crop primary CTA */}
            <button
              onClick={() => {
                onOpenScanner();
                setMobileMenuOpen(false);
              }}
              id="navbar-scan-cta"
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95 cursor-pointer text-sm"
            >
              <Camera className="w-4 h-4" />
              <span>Scan Your Crop</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-menu-toggle"
              className="lg:hidden p-2 rounded-lg text-stone-700 hover:bg-stone-100 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-stone-200 bg-white px-4 pt-3 pb-5 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  id={`mobile-nav-link-${item.id}`}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-colors text-left ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-800'
                      : 'text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.id === 'dashboard' && activeRemindersCount > 0 && (
                    <span className="px-2 py-0.5 text-xs font-bold bg-amber-500 text-white rounded-full">
                      {activeRemindersCount} due
                    </span>
                  )}
                </button>
              );
            })}

            <div className="mt-3 pt-3 border-t border-stone-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  onOpenScanner();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl shadow-sm text-center"
              >
                <Camera className="w-5 h-5" />
                <span>Launch Crop Scanner</span>
              </button>
              <a
                href="tel:+923004589211"
                className="w-full flex items-center justify-center gap-2 bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold py-2.5 px-4 rounded-xl text-sm"
              >
                <Phone className="w-4 h-4 text-emerald-700" />
                <span>Helpline: +92 300 4589211</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
