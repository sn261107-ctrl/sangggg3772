import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { DailyStylistView } from './components/DailyStylistView';
import { WardrobeView } from './components/WardrobeView';
import { OutfitStudioView } from './components/OutfitStudioView';
import { BodyProfileView } from './components/BodyProfileView';
import { LookbookView } from './components/LookbookView';
import { AddItemModal } from './components/AddItemModal';
import { ClothingItem, BodyProfile, WeatherCondition, Outfit } from './types/fashion';
import { DEFAULT_CLOTHING_ITEMS, INITIAL_BODY_PROFILE, DEFAULT_WEATHER } from './data/defaultWardrobe';

export default function App() {
  const [activeTab, setActiveTab] = useState<'stylist' | 'wardrobe' | 'studio' | 'profile' | 'lookbook'>('stylist');

  // Persisted Wardrobe
  const [wardrobe, setWardrobe] = useState<ClothingItem[]>(() => {
    try {
      const saved = localStorage.getItem('atelier_wardrobe');
      return saved ? JSON.parse(saved) : DEFAULT_CLOTHING_ITEMS;
    } catch {
      return DEFAULT_CLOTHING_ITEMS;
    }
  });

  // Persisted Body Profile (Height, Weight, Shape)
  const [profile, setProfile] = useState<BodyProfile>(() => {
    try {
      const saved = localStorage.getItem('atelier_profile');
      return saved ? JSON.parse(saved) : INITIAL_BODY_PROFILE;
    } catch {
      return INITIAL_BODY_PROFILE;
    }
  });

  // Weather Condition
  const [weather, setWeather] = useState<WeatherCondition>(() => {
    try {
      const saved = localStorage.getItem('atelier_weather');
      return saved ? JSON.parse(saved) : DEFAULT_WEATHER;
    } catch {
      return DEFAULT_WEATHER;
    }
  });

  // Persisted Saved Outfits Lookbook
  const [savedOutfits, setSavedOutfits] = useState<Outfit[]>(() => {
    try {
      const saved = localStorage.getItem('atelier_saved_outfits');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Studio target outfit
  const [studioTargetOutfit, setStudioTargetOutfit] = useState<Outfit | null>(null);

  // Add Item Modal
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);

  // Save to localStorage on updates
  useEffect(() => {
    localStorage.setItem('atelier_wardrobe', JSON.stringify(wardrobe));
  }, [wardrobe]);

  useEffect(() => {
    localStorage.setItem('atelier_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('atelier_weather', JSON.stringify(weather));
  }, [weather]);

  useEffect(() => {
    localStorage.setItem('atelier_saved_outfits', JSON.stringify(savedOutfits));
  }, [savedOutfits]);

  // Handlers
  const handleAddItem = (newItem: ClothingItem) => {
    setWardrobe((prev) => [newItem, ...prev]);
  };

  const handleDeleteItem = (id: string) => {
    setWardrobe((prev) => prev.filter((item) => item.id !== id));
  };

  const handleToggleOwned = (id: string) => {
    setWardrobe((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isOwned: !item.isOwned } : item))
    );
  };

  const handleSaveOutfit = (outfit: Outfit) => {
    setSavedOutfits((prev) => {
      const existing = prev.findIndex((o) => o.id === outfit.id);
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = outfit;
        return updated;
      }
      return [outfit, ...prev];
    });
  };

  const handleDeleteOutfit = (id: string) => {
    setSavedOutfits((prev) => prev.filter((o) => o.id !== id));
  };

  const handleAssignOutfitToDay = (outfitId: string, day: string) => {
    setSavedOutfits((prev) =>
      prev.map((o) => {
        if (o.id === outfitId) {
          return { ...o, scheduledDay: day || undefined };
        }
        // if another outfit was on this day, keep or overwrite
        if (day && o.scheduledDay === day && o.id !== outfitId) {
          return { ...o, scheduledDay: undefined };
        }
        return o;
      })
    );
  };

  const handleOpenStudioWithOutfit = (outfit: Outfit) => {
    setStudioTargetOutfit(outfit);
    setActiveTab('studio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectWardrobeItemForStudio = (item: ClothingItem) => {
    setActiveTab('studio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col text-stone-900 font-sans selection:bg-stone-900 selection:text-white">
      {/* Top Bar Header */}
      <Header
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAddItem={() => setIsAddItemModalOpen(true)}
        wardrobeCount={wardrobe.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {activeTab === 'stylist' && (
          <DailyStylistView
            wardrobe={wardrobe}
            profile={profile}
            weather={weather}
            onUpdateWeather={setWeather}
            onOpenProfile={() => setActiveTab('profile')}
            onOpenStudioWithOutfit={handleOpenStudioWithOutfit}
            onSaveOutfit={handleSaveOutfit}
            savedOutfits={savedOutfits}
          />
        )}

        {activeTab === 'wardrobe' && (
          <WardrobeView
            wardrobe={wardrobe}
            onOpenAddItem={() => setIsAddItemModalOpen(true)}
            onDeleteItem={handleDeleteItem}
            onToggleOwned={handleToggleOwned}
            onSelectForStudio={handleSelectWardrobeItemForStudio}
          />
        )}

        {activeTab === 'studio' && (
          <OutfitStudioView
            wardrobe={wardrobe}
            profile={profile}
            weather={weather}
            initialOutfit={studioTargetOutfit}
            onSaveOutfit={handleSaveOutfit}
          />
        )}

        {activeTab === 'profile' && (
          <BodyProfileView
            profile={profile}
            onUpdateProfile={setProfile}
            onGoToStylist={() => setActiveTab('stylist')}
          />
        )}

        {activeTab === 'lookbook' && (
          <LookbookView
            savedOutfits={savedOutfits}
            onDeleteOutfit={handleDeleteOutfit}
            onOpenInStudio={handleOpenStudioWithOutfit}
            onAssignToDay={handleAssignOutfitToDay}
          />
        )}
      </main>

      {/* Add Item Modal */}
      <AddItemModal
        isOpen={isAddItemModalOpen}
        onClose={() => setIsAddItemModalOpen(false)}
        onAddItem={handleAddItem}
      />

      {/* Site Footer */}
      <footer className="border-t border-stone-200 bg-white py-8 text-xs text-stone-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img
              src="/src/assets/images/gustyle_logo_wallpaper_1792337954499.jpg"
              alt="GUSTYLE"
              referrerPolicy="no-referrer"
              className="w-5 h-5 rounded object-cover"
            />
            <span className="font-serif font-bold text-stone-800 text-sm">GUSTYLE</span>
            <span>·</span>
            <span>Phối đồ thông minh theo thời tiết & vóc dáng</span>
          </div>
          <div className="flex items-center gap-6">
            <span>Tối ưu tỷ lệ 1/3 - 2/3</span>
            <span>·</span>
            <span>Trợ lý thời trang cá nhân</span>
            <span>·</span>
            <span>© 2026 GUSTYLE</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
