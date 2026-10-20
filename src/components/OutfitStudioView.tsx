import React, { useState } from 'react';
import { Sparkles, Layers, Sliders, Check, Bookmark, X, Plus, RotateCcw } from 'lucide-react';
import { ClothingCategory, ClothingItem, Outfit, BodyProfile, WeatherCondition, OccasionType } from '../types/fashion';
import { evaluateOutfitSuitability } from '../utils/stylingEngine';

interface OutfitStudioViewProps {
  wardrobe: ClothingItem[];
  profile: BodyProfile;
  weather: WeatherCondition;
  initialOutfit?: Outfit | null;
  onSaveOutfit: (outfit: Outfit) => void;
}

export const OutfitStudioView: React.FC<OutfitStudioViewProps> = ({
  wardrobe,
  profile,
  weather,
  initialOutfit,
  onSaveOutfit,
}) => {
  const [selectedTop, setSelectedTop] = useState<ClothingItem | undefined>(
    initialOutfit?.top || wardrobe.find((i) => i.category === 'top')
  );
  const [selectedBottom, setSelectedBottom] = useState<ClothingItem | undefined>(
    initialOutfit?.bottom || wardrobe.find((i) => i.category === 'bottom')
  );
  const [selectedOuter, setSelectedOuter] = useState<ClothingItem | undefined>(
    initialOutfit?.outerwear
  );
  const [selectedShoes, setSelectedShoes] = useState<ClothingItem | undefined>(
    initialOutfit?.shoes || wardrobe.find((i) => i.category === 'shoes')
  );
  const [selectedAccessories, setSelectedAccessories] = useState<ClothingItem[]>(
    initialOutfit?.accessories || []
  );
  const [selectedOccasion, setSelectedOccasion] = useState<OccasionType>('work');
  const [customTitle, setCustomTitle] = useState(initialOutfit?.title || 'Bộ Phối Đồ Tự Do');
  const [activePickerSlot, setActivePickerSlot] = useState<ClothingCategory | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  // Live evaluation of current items
  const evaluation = evaluateOutfitSuitability(
    {
      top: selectedTop,
      bottom: selectedBottom,
      outerwear: selectedOuter,
      shoes: selectedShoes,
      accessories: selectedAccessories,
    },
    weather,
    profile
  );

  const handleSelectItemForSlot = (item: ClothingItem) => {
    if (activePickerSlot === 'top') setSelectedTop(item);
    if (activePickerSlot === 'bottom') setSelectedBottom(item);
    if (activePickerSlot === 'outerwear') setSelectedOuter(item);
    if (activePickerSlot === 'shoes') setSelectedShoes(item);
    if (activePickerSlot === 'accessories') {
      if (!selectedAccessories.some((a) => a.id === item.id)) {
        setSelectedAccessories([...selectedAccessories, item]);
      }
    }
    setActivePickerSlot(null);
    setIsSaved(false);
  };

  const handleRemoveAccessory = (id: string) => {
    setSelectedAccessories(selectedAccessories.filter((a) => a.id !== id));
    setIsSaved(false);
  };

  const handleResetOutfit = () => {
    setSelectedTop(wardrobe.find((i) => i.category === 'top'));
    setSelectedBottom(wardrobe.find((i) => i.category === 'bottom'));
    setSelectedOuter(undefined);
    setSelectedShoes(wardrobe.find((i) => i.category === 'shoes'));
    setSelectedAccessories([]);
    setIsSaved(false);
  };

  const handleSaveCurrentOutfit = () => {
    const outfit: Outfit = {
      id: `outfit-studio-${Date.now()}`,
      title: customTitle || 'Bộ Phối Đồ Tự Phối',
      top: selectedTop,
      bottom: selectedBottom,
      outerwear: selectedOuter,
      shoes: selectedShoes,
      accessories: selectedAccessories,
      overallScore: evaluation.overallScore,
      weatherSuitability: evaluation.weatherSuitability,
      bodySuitability: evaluation.bodySuitability,
      colorHarmony: evaluation.colorHarmony,
      stylistVerdict: evaluation.stylistVerdict,
      stylingHacks: evaluation.stylingHacks,
      occasion: selectedOccasion,
      createdAt: new Date().toISOString(),
    };
    onSaveOutfit(outfit);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Studio Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <h1 className="font-serif text-2xl font-bold text-stone-900">Studio Phối Đồ Trực Quan</h1>
          <p className="text-xs text-stone-500 mt-1">
            Tự do thử nghiệm từng món đồ từ tủ, hệ thống tự động chấm điểm tỷ lệ vóc dáng và độ hợp thời tiết
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleResetOutfit}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-stone-600 hover:text-stone-900 border border-stone-200 rounded-lg bg-white transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Đặt lại</span>
          </button>

          <button
            onClick={handleSaveCurrentOutfit}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg transition-all shadow-xs cursor-pointer ${
              isSaved
                ? 'bg-emerald-700 text-white'
                : 'bg-stone-900 text-white hover:bg-stone-800'
            }`}
          >
            {isSaved ? <Check className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            <span>{isSaved ? 'Đã lưu vào Lookbook!' : 'Lưu bộ phối đồ'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Interactive Canvas Board */}
        <div className="lg:col-span-7 bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-stone-100">
            <input
              type="text"
              value={customTitle}
              onChange={(e) => setCustomTitle(e.target.value)}
              className="font-serif text-lg sm:text-xl font-bold text-stone-900 bg-transparent border-b border-transparent hover:border-stone-300 focus:border-stone-900 focus:outline-none transition-colors w-full max-w-md"
              placeholder="Đặt tên cho bộ phối..."
            />
            <span className="text-xs text-stone-400 shrink-0">Click vào món để đổi</span>
          </div>

          {/* Mannequin / Flatlay Board */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {/* Top slot */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">1. Áo Thân Trên</span>
              {selectedTop ? (
                <div
                  onClick={() => setActivePickerSlot('top')}
                  className="aspect-3/4 rounded-xl overflow-hidden bg-stone-100 border-2 border-stone-200 hover:border-stone-900 transition-all cursor-pointer relative group"
                >
                  <img
                    src={selectedTop.image}
                    alt={selectedTop.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-medium">
                    Đổi áo khác
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setActivePickerSlot('top')}
                  className="w-full aspect-3/4 rounded-xl border-2 border-dashed border-stone-300 hover:border-stone-900 bg-stone-50 flex flex-col items-center justify-center text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
                >
                  <Plus className="w-5 h-5 mb-1" />
                  <span className="text-xs">Chọn áo</span>
                </button>
              )}
              {selectedTop && (
                <p className="text-xs font-medium text-stone-800 line-clamp-1">{selectedTop.name}</p>
              )}
            </div>

            {/* Bottom slot */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">2. Quần / Chân Váy</span>
              {selectedBottom ? (
                <div
                  onClick={() => setActivePickerSlot('bottom')}
                  className="aspect-3/4 rounded-xl overflow-hidden bg-stone-100 border-2 border-stone-200 hover:border-stone-900 transition-all cursor-pointer relative group"
                >
                  <img
                    src={selectedBottom.image}
                    alt={selectedBottom.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-medium">
                    Đổi quần/váy
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setActivePickerSlot('bottom')}
                  className="w-full aspect-3/4 rounded-xl border-2 border-dashed border-stone-300 hover:border-stone-900 bg-stone-50 flex flex-col items-center justify-center text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
                >
                  <Plus className="w-5 h-5 mb-1" />
                  <span className="text-xs">Chọn quần/váy</span>
                </button>
              )}
              {selectedBottom && (
                <p className="text-xs font-medium text-stone-800 line-clamp-1">{selectedBottom.name}</p>
              )}
            </div>

            {/* Outerwear slot */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">3. Áo Khoác</span>
                {selectedOuter && (
                  <button
                    onClick={() => setSelectedOuter(undefined)}
                    className="text-[10px] text-stone-400 hover:text-stone-800 cursor-pointer"
                  >
                    Bỏ khoác
                  </button>
                )}
              </div>
              {selectedOuter ? (
                <div
                  onClick={() => setActivePickerSlot('outerwear')}
                  className="aspect-3/4 rounded-xl overflow-hidden bg-stone-100 border-2 border-stone-200 hover:border-stone-900 transition-all cursor-pointer relative group"
                >
                  <img
                    src={selectedOuter.image}
                    alt={selectedOuter.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-medium">
                    Đổi áo khoác
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setActivePickerSlot('outerwear')}
                  className="w-full aspect-3/4 rounded-xl border-2 border-dashed border-stone-200 hover:border-stone-900 bg-stone-50 flex flex-col items-center justify-center text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
                >
                  <Plus className="w-5 h-5 mb-1" />
                  <span className="text-xs">Thêm khoác (tùy chọn)</span>
                </button>
              )}
              {selectedOuter && (
                <p className="text-xs font-medium text-stone-800 line-clamp-1">{selectedOuter.name}</p>
              )}
            </div>

            {/* Shoes slot */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">4. Giày Dép</span>
              {selectedShoes ? (
                <div
                  onClick={() => setActivePickerSlot('shoes')}
                  className="aspect-3/4 rounded-xl overflow-hidden bg-stone-100 border-2 border-stone-200 hover:border-stone-900 transition-all cursor-pointer relative group"
                >
                  <img
                    src={selectedShoes.image}
                    alt={selectedShoes.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-medium">
                    Đổi giày
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setActivePickerSlot('shoes')}
                  className="w-full aspect-3/4 rounded-xl border-2 border-dashed border-stone-300 hover:border-stone-900 bg-stone-50 flex flex-col items-center justify-center text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
                >
                  <Plus className="w-5 h-5 mb-1" />
                  <span className="text-xs">Chọn giày</span>
                </button>
              )}
              {selectedShoes && (
                <p className="text-xs font-medium text-stone-800 line-clamp-1">{selectedShoes.name}</p>
              )}
            </div>

            {/* Accessories slot (can have multiple) */}
            <div className="space-y-1.5 col-span-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">5. Phụ Kiện & Túi ({selectedAccessories.length})</span>
                <button
                  onClick={() => setActivePickerSlot('accessories')}
                  className="text-xs text-stone-800 hover:underline font-medium cursor-pointer"
                >
                  + Thêm phụ kiện
                </button>
              </div>

              {selectedAccessories.length === 0 ? (
                <button
                  onClick={() => setActivePickerSlot('accessories')}
                  className="w-full h-[150px] rounded-xl border-2 border-dashed border-stone-200 hover:border-stone-900 bg-stone-50 flex flex-col items-center justify-center text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
                >
                  <Plus className="w-5 h-5 mb-1" />
                  <span className="text-xs">Chọn túi xách, thắt lưng, khăn lụa...</span>
                </button>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {selectedAccessories.map((acc) => (
                    <div key={acc.id} className="relative rounded-lg border border-stone-200 overflow-hidden bg-stone-50 p-2 flex items-center gap-2">
                      <img
                        src={acc.image}
                        alt={acc.name}
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 rounded object-cover shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-stone-800 truncate">{acc.name}</p>
                        <p className="text-[10px] text-stone-500 truncate">{acc.subCategory}</p>
                      </div>
                      <button
                        onClick={() => handleRemoveAccessory(acc.id)}
                        className="text-stone-400 hover:text-stone-700 p-1 cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Live Assessment & Body Flattering Scoreboard */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs space-y-5">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold">Chấm điểm tức thì</span>
              <div className="flex items-baseline justify-between mt-1">
                <h3 className="font-serif text-2xl font-bold text-stone-900">
                  {evaluation.overallScore} <span className="text-sm font-sans font-normal text-stone-400">/ 100 điểm</span>
                </h3>
                <span className="text-xs font-medium text-stone-700">
                  {evaluation.overallScore >= 90 ? 'Xuất sắc' : evaluation.overallScore >= 80 ? 'Hài hòa' : 'Cần điều chỉnh'}
                </span>
              </div>
            </div>

            {/* Score bars */}
            <div className="space-y-3 pt-2 border-t border-stone-100 text-xs">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-stone-600">Thích ứng nhiệt độ ({weather.temp}°C {weather.city}):</span>
                  <span className="font-semibold text-stone-900 tabular-nums">{evaluation.weatherSuitability.score}%</span>
                </div>
                <div className="w-full bg-stone-100 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-stone-900 h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${evaluation.weatherSuitability.score}%` }}
                  />
                </div>
                <p className="text-[11px] text-stone-500 mt-1">{evaluation.weatherSuitability.advice}</p>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-stone-600">Tôn vóc dáng ({profile.height}cm · {profile.weight}kg):</span>
                  <span className="font-semibold text-stone-900 tabular-nums">{evaluation.bodySuitability.score}%</span>
                </div>
                <div className="w-full bg-stone-100 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-stone-900 h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${evaluation.bodySuitability.score}%` }}
                  />
                </div>
                {evaluation.bodySuitability.proportionTips.length > 0 && (
                  <p className="text-[11px] text-stone-500 mt-1">{evaluation.bodySuitability.proportionTips[0]}</p>
                )}
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-stone-600">Hài hòa màu sắc:</span>
                  <span className="font-semibold text-stone-900 tabular-nums">{evaluation.colorHarmony.score}%</span>
                </div>
                <div className="w-full bg-stone-100 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-stone-900 h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${evaluation.colorHarmony.score}%` }}
                  />
                </div>
                <p className="text-[11px] text-stone-500 mt-1">{evaluation.colorHarmony.explanation}</p>
              </div>
            </div>

            {/* Stylist Hacks */}
            <div className="pt-3 border-t border-stone-100 space-y-2">
              <span className="text-xs font-semibold text-stone-900">Mẹo nâng tầm set đồ này:</span>
              <ul className="space-y-1.5 text-xs text-stone-600">
                {evaluation.stylingHacks.map((hack, idx) => (
                  <li key={idx} className="flex items-start gap-1.5 leading-relaxed">
                    <span className="text-stone-400">·</span>
                    <span>{hack}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Item Picker Modal Drawer */}
      {activePickerSlot && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in-95">
            <div className="p-4 sm:p-5 border-b border-stone-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-stone-900 font-serif">
                  Chọn món {activePickerSlot === 'top' ? 'Áo' : activePickerSlot === 'bottom' ? 'Quần / Váy' : activePickerSlot === 'outerwear' ? 'Áo khoác' : activePickerSlot === 'shoes' ? 'Giày dép' : 'Phụ kiện'} từ tủ đồ
                </h3>
                <p className="text-xs text-stone-500">Chỉ hiển thị các món phù hợp trong tủ đồ của bạn</p>
              </div>
              <button
                onClick={() => setActivePickerSlot(null)}
                className="p-1.5 text-stone-400 hover:text-stone-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 gap-4">
              {wardrobe
                .filter((item) => item.category === activePickerSlot)
                .map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleSelectItemForSlot(item)}
                    className="border border-stone-200 rounded-xl overflow-hidden hover:border-stone-900 cursor-pointer group transition-all"
                  >
                    <div className="aspect-3/4 bg-stone-100 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform"
                      />
                    </div>
                    <div className="p-2.5">
                      <h4 className="text-xs font-semibold text-stone-900 line-clamp-1">{item.name}</h4>
                      <p className="text-[11px] text-stone-500 mt-0.5">{item.colorName} · {item.material}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
