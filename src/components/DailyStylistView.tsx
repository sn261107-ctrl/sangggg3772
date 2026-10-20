import React, { useState } from 'react';
import { Sparkles, Calendar, Bookmark, Sliders, RefreshCw, Layers, Check, ArrowRight, UserCheck } from 'lucide-react';
import { BodyProfile, ClothingItem, Outfit, WeatherCondition, OccasionType } from '../types/fashion';
import { WeatherWidget } from './WeatherWidget';
import { calculateBMI, generateSmartOutfit } from '../utils/stylingEngine';
import { HERO_LOOKBOOK_IMAGE, MINIMAL_LOOK_IMAGE, WINTER_LOOK_IMAGE, STREET_LOOK_IMAGE } from '../data/defaultWardrobe';

interface DailyStylistViewProps {
  wardrobe: ClothingItem[];
  profile: BodyProfile;
  weather: WeatherCondition;
  onUpdateWeather: (w: WeatherCondition) => void;
  onOpenProfile: () => void;
  onOpenStudioWithOutfit: (outfit: Outfit) => void;
  onSaveOutfit: (outfit: Outfit) => void;
  savedOutfits: Outfit[];
}

export const DailyStylistView: React.FC<DailyStylistViewProps> = ({
  wardrobe,
  profile,
  weather,
  onUpdateWeather,
  onOpenProfile,
  onOpenStudioWithOutfit,
  onSaveOutfit,
  savedOutfits,
}) => {
  const [selectedOccasion, setSelectedOccasion] = useState<OccasionType>('work');
  const [currentOutfit, setCurrentOutfit] = useState<Outfit>(() =>
    generateSmartOutfit(wardrobe, weather, profile, 'work')
  );
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [aiStatusMessage, setAiStatusMessage] = useState<string | null>(null);

  const bmiInfo = calculateBMI(profile.height, profile.weight);

  const occasions: { id: OccasionType; label: string }[] = [
    { id: 'work', label: 'Đi làm / Công sở' },
    { id: 'casual', label: 'Dạo phố / Cafe' },
    { id: 'dating', label: 'Hẹn hò / Ăn tối' },
    { id: 'formal', label: 'Dự tiệc / Sự kiện' },
    { id: 'travel', label: 'Du lịch / Dã ngoại' },
  ];

  const handleOccasionChange = (occ: OccasionType) => {
    setSelectedOccasion(occ);
    const generated = generateSmartOutfit(wardrobe, weather, profile, occ);
    setCurrentOutfit(generated);
  };

  const handleGenerateAiStylist = async () => {
    setIsLoadingAi(true);
    setAiStatusMessage('Chuyên gia AI đang phân tích nhiệt độ, độ ẩm và tỷ lệ vóc dáng của bạn...');

    try {
      const response = await fetch('/api/ai-stylist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profile,
          weather,
          occasion: selectedOccasion,
          wardrobe,
        }),
      });

      const data = await response.json();

      if (data && data.isAiGenerated && data.recommendation) {
        const rec = data.recommendation;
        const topItem = wardrobe.find((i) => i.id === rec.topId);
        const bottomItem = wardrobe.find((i) => i.id === rec.bottomId);
        const outerItem = rec.outerwearId ? wardrobe.find((i) => i.id === rec.outerwearId) : undefined;
        const shoesItem = wardrobe.find((i) => i.id === rec.shoesId);
        const accItems = Array.isArray(rec.accessoryIds)
          ? wardrobe.filter((i) => rec.accessoryIds.includes(i.id))
          : [];

        setCurrentOutfit({
          id: `outfit-ai-${Date.now()}`,
          title: rec.title || 'Outfit Cá Nhân Hóa Chuẩn Tỷ Lệ',
          top: topItem || currentOutfit.top,
          bottom: bottomItem || currentOutfit.bottom,
          outerwear: outerItem,
          shoes: shoesItem || currentOutfit.shoes,
          accessories: accItems.length > 0 ? accItems : currentOutfit.accessories,
          overallScore: rec.overallScore || 94,
          weatherSuitability: rec.weatherSuitability || currentOutfit.weatherSuitability,
          bodySuitability: rec.bodySuitability || currentOutfit.bodySuitability,
          colorHarmony: {
            score: 95,
            paletteType: 'Phối màu AI Cao cấp',
            explanation: 'Sự cân bằng sắc độ thị giác giúp vóc dáng thon gọn và tôn da tối đa.',
          },
          stylistVerdict: rec.stylistVerdict,
          stylingHacks: rec.stylingHacks || currentOutfit.stylingHacks,
          occasion: selectedOccasion,
          createdAt: new Date().toISOString(),
        });
        setAiStatusMessage('Phối đồ hoàn tất theo công thức độc quyền từ Gemini AI!');
      } else {
        // Fallback to local styling engine
        const fallback = generateSmartOutfit(wardrobe, weather, profile, selectedOccasion);
        setCurrentOutfit(fallback);
        setAiStatusMessage('Gợi ý tối ưu chuẩn tỷ lệ hình thể hoàn tất.');
      }
    } catch (err) {
      const fallback = generateSmartOutfit(wardrobe, weather, profile, selectedOccasion);
      setCurrentOutfit(fallback);
      setAiStatusMessage('Đã tạo bộ trang phục phù hợp nhất từ thuật toán thời trang.');
    } finally {
      setIsLoadingAi(false);
      setTimeout(() => setAiStatusMessage(null), 4000);
    }
  };

  const isCurrentOutfitSaved = savedOutfits.some((o) => o.id === currentOutfit.id);

  return (
    <div className="space-y-8">
      {/* Editorial Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-stone-900 text-stone-100 shadow-md">
        <div className="absolute inset-0">
          <img
            src={HERO_LOOKBOOK_IMAGE}
            alt="AtelierFit Fashion Lookbook Banner"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-40 mix-blend-luminosity filter contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/80 to-transparent" />
        </div>

        <div className="relative p-6 sm:p-10 max-w-2xl">
          <div className="flex items-center gap-2 mb-3">
            <img
              src="/src/assets/images/gustyle_logo_wallpaper_1792337954499.jpg"
              alt="GUSTYLE"
              referrerPolicy="no-referrer"
              className="w-5 h-5 rounded-md object-cover shadow-2xs"
            />
            <p className="text-xs uppercase tracking-widest text-stone-300 font-semibold">
              GUSTYLE · AI Fashion Director
            </p>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-white font-semibold leading-tight text-balance">
            Mặc Đẹp Mỗi Ngày Theo Từng Độ C & Vóc Dáng Của Bạn
          </h1>
          <p className="mt-3 text-sm text-stone-300 leading-relaxed">
            Hệ thống tính toán chuẩn tỷ lệ vàng cơ thể (chiều cao {profile.height}cm · {profile.weight}kg), phối hợp hoàn hảo với tủ đồ và thời tiết thực tế tại {weather.city}.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={handleGenerateAiStylist}
              disabled={isLoadingAi}
              className="flex items-center gap-2 px-5 py-2.5 bg-white text-stone-900 rounded-lg text-xs font-semibold hover:bg-stone-100 transition-all cursor-pointer shadow-sm active:scale-98 disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>{isLoadingAi ? 'Đang phân tích phối đồ...' : 'Tạo gợi ý Outfit AI'}</span>
            </button>
            <button
              onClick={onOpenProfile}
              className="flex items-center gap-2 px-4 py-2.5 bg-stone-800/80 border border-stone-700 text-stone-200 rounded-lg text-xs font-medium hover:bg-stone-800 hover:text-white transition-all cursor-pointer"
            >
              <UserCheck className="w-4 h-4" />
              <span>Hồ sơ: {profile.height}cm · {profile.weight}kg ({bmiInfo.category})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Weather Selector & Body Profile Summary Strip */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2">
          <WeatherWidget weather={weather} onUpdateWeather={onUpdateWeather} />
        </div>

        {/* Quick Body Specs Summary */}
        <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div>
              <h2 className="text-sm font-semibold text-stone-900">Thông Số Vóc Dáng</h2>
              <p className="text-xs text-stone-500">Dữ liệu cá nhân hóa tỷ lệ</p>
            </div>
            <button
              onClick={onOpenProfile}
              className="text-xs font-medium text-stone-700 hover:text-stone-900 hover:underline cursor-pointer"
            >
              Thay đổi
            </button>
          </div>

          <div className="mt-4 space-y-2.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-stone-500">Chiều cao & Cân nặng:</span>
              <strong className="text-stone-900 tabular-nums">{profile.height} cm · {profile.weight} kg</strong>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-stone-500">Chỉ số BMI:</span>
              <span className="text-stone-800 font-medium tabular-nums">{bmiInfo.bmi} ({bmiInfo.category})</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-stone-500">Dáng người:</span>
              <span className="text-stone-800 font-medium capitalize">
                {profile.bodyShape === 'hourglass' ? 'Đồng hồ cát' : profile.bodyShape === 'pear' ? 'Quả lê' : profile.bodyShape === 'apple' ? 'Quả táo' : profile.bodyShape === 'rectangle' ? 'Chữ nhật' : 'Tam giác ngược'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-stone-500">Mục tiêu hack dáng:</span>
              <span className="text-stone-800 font-medium">Tối ưu chân dài & hack chiều cao</span>
            </div>
          </div>
        </div>
      </div>

      {/* Occasion Filter Bar */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-stone-900 font-serif">Outfit Gợi Ý Hôm Nay</h2>
            <p className="text-xs text-stone-500">Lựa chọn tối ưu từ các món đồ trong tủ đồ của bạn</p>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-lg overflow-x-auto no-scrollbar">
            {occasions.map((occ) => (
              <button
                key={occ.id}
                onClick={() => handleOccasionChange(occ.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  selectedOccasion === occ.id
                    ? 'bg-white text-stone-900 shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {occ.label}
              </button>
            ))}
          </div>
        </div>

        {aiStatusMessage && (
          <div className="p-3 bg-stone-100 border border-stone-200 rounded-lg text-xs text-stone-700 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-stone-900 shrink-0" />
              <span>{aiStatusMessage}</span>
            </div>
          </div>
        )}

        {/* The Outfit Main Card */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-100">
            <div>
              <span className="text-xs uppercase tracking-wider text-stone-400 font-semibold">
                Phối đồ cho {weather.city} · {weather.temp}°C
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-serif text-stone-900 mt-1">
                {currentOutfit.title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl">
                {currentOutfit.stylistVerdict}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => onSaveOutfit(currentOutfit)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                  isCurrentOutfitSaved
                    ? 'bg-stone-900 border-stone-900 text-white'
                    : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                }`}
              >
                {isCurrentOutfitSaved ? <Check className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                <span>{isCurrentOutfitSaved ? 'Đã lưu' : 'Lưu Lookbook'}</span>
              </button>

              <button
                onClick={() => onOpenStudioWithOutfit(currentOutfit)}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-xs font-medium transition-colors cursor-pointer"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Chỉnh sửa trong Studio</span>
              </button>
            </div>
          </div>

          {/* Clothing Items Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {/* Top */}
            {currentOutfit.top && (
              <div className="group space-y-2.5">
                <div className="aspect-3/4 rounded-xl overflow-hidden bg-stone-100 border border-stone-200/80 relative">
                  <img
                    src={currentOutfit.top.image}
                    alt={currentOutfit.top.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-xs text-[10px] font-semibold text-stone-800 px-2 py-0.5 rounded-sm">
                    Áo
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-stone-900 line-clamp-1">{currentOutfit.top.name}</h4>
                  <div className="text-[11px] text-stone-500 flex items-center gap-1 mt-0.5">
                    <span>{currentOutfit.top.colorName}</span>
                    <span>·</span>
                    <span>{currentOutfit.top.material}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom */}
            {currentOutfit.bottom && (
              <div className="group space-y-2.5">
                <div className="aspect-3/4 rounded-xl overflow-hidden bg-stone-100 border border-stone-200/80 relative">
                  <img
                    src={currentOutfit.bottom.image}
                    alt={currentOutfit.bottom.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-xs text-[10px] font-semibold text-stone-800 px-2 py-0.5 rounded-sm">
                    Quần / Váy
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-stone-900 line-clamp-1">{currentOutfit.bottom.name}</h4>
                  <div className="text-[11px] text-stone-500 flex items-center gap-1 mt-0.5">
                    <span>{currentOutfit.bottom.colorName}</span>
                    <span>·</span>
                    <span>{currentOutfit.bottom.fit === 'high_waist' ? 'Cạp cao tôn dáng' : 'Suông đứng'}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Outerwear if needed */}
            {currentOutfit.outerwear ? (
              <div className="group space-y-2.5">
                <div className="aspect-3/4 rounded-xl overflow-hidden bg-stone-100 border border-stone-200/80 relative">
                  <img
                    src={currentOutfit.outerwear.image}
                    alt={currentOutfit.outerwear.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-xs text-[10px] font-semibold text-stone-800 px-2 py-0.5 rounded-sm">
                    Áo khoác
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-stone-900 line-clamp-1">{currentOutfit.outerwear.name}</h4>
                  <div className="text-[11px] text-stone-500 flex items-center gap-1 mt-0.5">
                    <span>{currentOutfit.outerwear.colorName}</span>
                    <span>·</span>
                    <span>Giữ ấm {currentOutfit.outerwear.warmthLevel}/5</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="aspect-3/4 rounded-xl border border-dashed border-stone-200 bg-stone-50/60 p-4 flex flex-col items-center justify-center text-center text-xs text-stone-400">
                <Layers className="w-5 h-5 mb-1.5 text-stone-300" />
                <span>Không cần áo khoác ({weather.temp}°C đủ ấm)</span>
              </div>
            )}

            {/* Shoes */}
            {currentOutfit.shoes && (
              <div className="group space-y-2.5">
                <div className="aspect-3/4 rounded-xl overflow-hidden bg-stone-100 border border-stone-200/80 relative">
                  <img
                    src={currentOutfit.shoes.image}
                    alt={currentOutfit.shoes.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-xs text-[10px] font-semibold text-stone-800 px-2 py-0.5 rounded-sm">
                    Giày dép
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-stone-900 line-clamp-1">{currentOutfit.shoes.name}</h4>
                  <div className="text-[11px] text-stone-500 flex items-center gap-1 mt-0.5">
                    <span>{currentOutfit.shoes.colorName}</span>
                    <span>·</span>
                    <span>Độn đế nhẹ tôn dáng</span>
                  </div>
                </div>
              </div>
            )}

            {/* Accessories */}
            {currentOutfit.accessories.length > 0 && (
              <div className="group space-y-2.5">
                <div className="aspect-3/4 rounded-xl overflow-hidden bg-stone-100 border border-stone-200/80 relative">
                  <img
                    src={currentOutfit.accessories[0].image}
                    alt={currentOutfit.accessories[0].name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-xs text-[10px] font-semibold text-stone-800 px-2 py-0.5 rounded-sm">
                    Phụ kiện
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-stone-900 line-clamp-1">{currentOutfit.accessories[0].name}</h4>
                  <div className="text-[11px] text-stone-500 flex items-center gap-1 mt-0.5">
                    <span>{currentOutfit.accessories[0].colorName}</span>
                    <span>·</span>
                    <span>Tạo điểm nhấn eo</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Deep Styling Analysis & Pro Hacks */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-stone-100">
            {/* Weather analysis */}
            <div className="space-y-1.5">
              <span className="text-xs font-semibold text-stone-900">1. Thích Ứng Thời Tiết ({currentOutfit.weatherSuitability.score}/100)</span>
              <p className="text-xs text-stone-600 leading-relaxed">
                {currentOutfit.weatherSuitability.advice}
              </p>
            </div>

            {/* Body Hack analysis */}
            <div className="space-y-1.5">
              <span className="text-xs font-semibold text-stone-900">2. Tôn Tỷ Lệ Cơ Thể ({currentOutfit.bodySuitability.score}/100)</span>
              <p className="text-xs text-stone-600 leading-relaxed">
                {currentOutfit.bodySuitability.proportionTips[0] || 'Phom dáng cạp cao đẩy đường eo lên giúp kéo dài chân.'}
              </p>
            </div>

            {/* Pro Hacks */}
            <div className="space-y-1.5">
              <span className="text-xs font-semibold text-stone-900">3. Mẹo Stylist Độc Quyền</span>
              <p className="text-xs text-stone-600 leading-relaxed">
                {currentOutfit.stylingHacks[0] || 'Sơ vin vạt trước để tạo tỷ lệ 1/3 thân trên - 2/3 thân dưới.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Editorial Lookbook Inspiration */}
      <div className="space-y-4 pt-4">
        <div>
          <h2 className="text-lg font-semibold text-stone-900 font-serif">Bộ Sưu Tập Cảm Hứng Tuần Này</h2>
          <p className="text-xs text-stone-500">Các công thức phối đồ chuẩn tạp chí thời trang ứng dụng thực tế</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-stone-200 rounded-xl overflow-hidden group shadow-xs">
            <div className="aspect-4/3 overflow-hidden bg-stone-100">
              <img
                src={MINIMAL_LOOK_IMAGE}
                alt="Minimal Summer Capsule"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
              />
            </div>
            <div className="p-4 space-y-1">
              <span className="text-[11px] text-stone-400 uppercase tracking-wider font-semibold">Xuân - Hè Thoáng Mát</span>
              <h4 className="text-sm font-semibold text-stone-900">Set Linen Trắng & Quần Tây Be Pleated</h4>
              <p className="text-xs text-stone-500 leading-relaxed">
                Chất liệu đũi linen thoáng khí cho thời tiết 28-34°C, cạp quần cao tôn vóc dáng người châu Á.
              </p>
            </div>
          </div>

          <div className="bg-white border border-stone-200 rounded-xl overflow-hidden group shadow-xs">
            <div className="aspect-4/3 overflow-hidden bg-stone-100">
              <img
                src={WINTER_LOOK_IMAGE}
                alt="Winter Cashmere Layering"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
              />
            </div>
            <div className="p-4 space-y-1">
              <span className="text-[11px] text-stone-400 uppercase tracking-wider font-semibold">Thu - Đông Ấm Áp</span>
              <h4 className="text-sm font-semibold text-stone-900">Trench Coat Lạc Đà & Len Cổ Lọ</h4>
              <p className="text-xs text-stone-500 leading-relaxed">
                Đai thắt eo tạo tỷ lệ đồng hồ cát, thích hợp nhiệt độ 12-18°C hoặc du lịch Đà Lạt, Sapa.
              </p>
            </div>
          </div>

          <div className="bg-white border border-stone-200 rounded-xl overflow-hidden group shadow-xs">
            <div className="aspect-4/3 overflow-hidden bg-stone-100">
              <img
                src={STREET_LOOK_IMAGE}
                alt="Chic Streetwear Blazer"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
              />
            </div>
            <div className="p-4 space-y-1">
              <span className="text-[11px] text-stone-400 uppercase tracking-wider font-semibold">Urban Street Chic</span>
              <h4 className="text-sm font-semibold text-stone-900">Blazer Ghi Xám & Denim Suông</h4>
              <p className="text-xs text-stone-500 leading-relaxed">
                Sự pha trộn giữa thanh lịch và năng động với sneaker trắng đế cao, diện đẹp từ công sở tới quán cafe.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
