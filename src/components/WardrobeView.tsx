import React, { useState, useMemo } from 'react';
import { Plus, Search, Filter, Trash2, CheckCircle2, Heart, Sparkles, Layers } from 'lucide-react';
import { ClothingCategory, ClothingItem } from '../types/fashion';

interface WardrobeViewProps {
  wardrobe: ClothingItem[];
  onOpenAddItem: () => void;
  onDeleteItem: (id: string) => void;
  onToggleOwned: (id: string) => void;
  onSelectForStudio: (item: ClothingItem) => void;
}

export const WardrobeView: React.FC<WardrobeViewProps> = ({
  wardrobe,
  onOpenAddItem,
  onDeleteItem,
  onToggleOwned,
  onSelectForStudio,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSeason, setSelectedSeason] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showOnlyOwned, setShowOnlyOwned] = useState(false);

  const categories: { id: string; label: string }[] = [
    { id: 'all', label: 'Tất cả' },
    { id: 'top', label: 'Áo' },
    { id: 'bottom', label: 'Quần & Váy' },
    { id: 'outerwear', label: 'Áo khoác' },
    { id: 'shoes', label: 'Giày dép' },
    { id: 'accessories', label: 'Phụ kiện' },
  ];

  const seasons: { id: string; label: string }[] = [
    { id: 'all', label: 'Mọi thời tiết' },
    { id: 'summer', label: 'Mùa hè (Nóng)' },
    { id: 'fall', label: 'Mùa thu (Mát)' },
    { id: 'winter', label: 'Mùa đông (Lạnh)' },
    { id: 'rainy', label: 'Trời mưa' },
  ];

  const filteredItems = useMemo(() => {
    return wardrobe.filter((item) => {
      if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
      if (selectedSeason !== 'all' && !item.seasons.includes(selectedSeason as any)) return false;
      if (showOnlyOwned && !item.isOwned) return false;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(query);
        const matchColor = item.colorName.toLowerCase().includes(query);
        const matchMaterial = item.material.toLowerCase().includes(query);
        const matchSub = item.subCategory.toLowerCase().includes(query);
        if (!matchName && !matchColor && !matchMaterial && !matchSub) return false;
      }
      return true;
    });
  }, [wardrobe, selectedCategory, selectedSeason, showOnlyOwned, searchQuery]);

  const countsByCategory = useMemo(() => {
    return {
      top: wardrobe.filter((i) => i.category === 'top').length,
      bottom: wardrobe.filter((i) => i.category === 'bottom').length,
      outerwear: wardrobe.filter((i) => i.category === 'outerwear').length,
      shoes: wardrobe.filter((i) => i.category === 'shoes').length,
      accessories: wardrobe.filter((i) => i.category === 'accessories').length,
    };
  }, [wardrobe]);

  return (
    <div className="space-y-6">
      {/* Top Banner and Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <h1 className="font-serif text-2xl font-bold text-stone-900">Tủ Đồ Cá Nhân Số Hóa</h1>
          <p className="text-xs text-stone-500 mt-1">
            Tổng cộng <strong className="text-stone-800 tabular-nums">{wardrobe.length}</strong> món đồ sẵn sàng để phối trang phục thông minh
          </p>
        </div>

        <button
          onClick={onOpenAddItem}
          className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors shadow-xs cursor-pointer whitespace-nowrap self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm món vào tủ</span>
        </button>
      </div>

      {/* Wardrobe Breakdown Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="bg-white border border-stone-200 rounded-lg p-3 text-center">
          <span className="text-[11px] text-stone-500">Áo các loại</span>
          <p className="text-lg font-bold text-stone-900 tabular-nums">{countsByCategory.top}</p>
        </div>
        <div className="bg-white border border-stone-200 rounded-lg p-3 text-center">
          <span className="text-[11px] text-stone-500">Quần & Váy</span>
          <p className="text-lg font-bold text-stone-900 tabular-nums">{countsByCategory.bottom}</p>
        </div>
        <div className="bg-white border border-stone-200 rounded-lg p-3 text-center">
          <span className="text-[11px] text-stone-500">Áo khoác</span>
          <p className="text-lg font-bold text-stone-900 tabular-nums">{countsByCategory.outerwear}</p>
        </div>
        <div className="bg-white border border-stone-200 rounded-lg p-3 text-center">
          <span className="text-[11px] text-stone-500">Giày dép</span>
          <p className="text-lg font-bold text-stone-900 tabular-nums">{countsByCategory.shoes}</p>
        </div>
        <div className="bg-white border border-stone-200 rounded-lg p-3 text-center col-span-2 sm:col-span-1">
          <span className="text-[11px] text-stone-500">Phụ kiện & Túi</span>
          <p className="text-lg font-bold text-stone-900 tabular-nums">{countsByCategory.accessories}</p>
        </div>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="space-y-3">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Category Tabs */}
          <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-white text-stone-900 shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm theo tên, màu sắc, vải..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900 focus:border-stone-900"
            />
          </div>
        </div>

        {/* Sub filters: Seasons & Owned */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-1">
          <div className="flex items-center gap-2">
            <span className="text-stone-500 font-medium">Thời tiết:</span>
            <div className="flex items-center gap-1">
              {seasons.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedSeason(s.id)}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    selectedSeason === s.id
                      ? 'bg-stone-900 text-white font-medium'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => setShowOnlyOwned(!showOnlyOwned)}
            className={`px-2.5 py-1 rounded-md border text-xs font-medium transition-colors cursor-pointer ${
              showOnlyOwned
                ? 'bg-stone-900 text-white border-stone-900'
                : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
            }`}
          >
            {showOnlyOwned ? 'Đang lọc: Món đã có trong tủ' : 'Hiển thị tất cả (gồm wishlist)'}
          </button>
        </div>
      </div>

      {/* Wardrobe Items Grid */}
      {filteredItems.length === 0 ? (
        <div className="p-12 text-center bg-white border border-dashed border-stone-200 rounded-2xl">
          <Layers className="w-8 h-8 mx-auto text-stone-300 mb-2" />
          <h3 className="text-sm font-semibold text-stone-700">Chưa tìm thấy món đồ phù hợp</h3>
          <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
            Hãy thử đổi từ khóa tìm kiếm hoặc bấm nút "Thêm món vào tủ" để bổ sung trang phục mới.
          </p>
          <button
            onClick={onOpenAddItem}
            className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 bg-stone-900 text-white text-xs font-medium rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Thêm món đồ ngay</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group bg-white border border-stone-200 rounded-xl overflow-hidden shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between"
            >
              <div>
                <div className="aspect-3/4 relative overflow-hidden bg-stone-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                  />
                  {/* Category and Owned badge */}
                  <div className="absolute top-2 left-2 flex items-center gap-1">
                    <span className="bg-white/95 backdrop-blur-xs text-[10px] font-semibold text-stone-800 px-2 py-0.5 rounded-sm">
                      {item.subCategory}
                    </span>
                  </div>

                  <button
                    onClick={() => onToggleOwned(item.id)}
                    title={item.isOwned ? 'Món đang có trong tủ' : 'Món yêu thích muốn mua'}
                    className="absolute top-2 right-2 p-1.5 rounded-md bg-white/90 backdrop-blur-xs text-stone-600 hover:text-stone-950 transition-colors cursor-pointer"
                  >
                    {item.isOwned ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Heart className="w-4 h-4 text-rose-500" />
                    )}
                  </button>
                </div>

                <div className="p-3.5 space-y-2">
                  <div>
                    <h3 className="text-xs sm:text-sm font-semibold text-stone-900 line-clamp-1">{item.name}</h3>
                    <div className="text-[11px] text-stone-500 flex items-center gap-1.5 mt-0.5">
                      <span>{item.colorName}</span>
                      <span>·</span>
                      <span>{item.material}</span>
                    </div>
                  </div>

                  {item.notes && (
                    <p className="text-[11px] text-stone-500 line-clamp-2 leading-relaxed bg-stone-50 p-2 rounded-md">
                      {item.notes}
                    </p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-3.5 pt-0 flex items-center justify-between gap-2 border-t border-stone-100 mt-2">
                <button
                  onClick={() => onSelectForStudio(item)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-md text-xs font-medium transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-stone-600" />
                  <span>Thử phối đồ</span>
                </button>

                <button
                  onClick={() => onDeleteItem(item.id)}
                  title="Xóa món đồ này"
                  className="p-1.5 text-stone-400 hover:text-rose-600 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
