import React, { useState } from 'react';
import { X, Upload, Sparkles, Check, Image as ImageIcon } from 'lucide-react';
import { ClothingCategory, ClothingItem, OccasionType } from '../types/fashion';

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddItem: (item: ClothingItem) => void;
}

const PRESET_TEMPLATES = [
  {
    name: 'Áo sơ mi lụa cổ V thanh lịch',
    category: 'top' as ClothingCategory,
    subCategory: 'Sơ mi',
    colorName: 'Trắng Ngà',
    colorHex: '#F8F6F0',
    material: 'Lụa tơ tằm mềm',
    warmthLevel: 2 as const,
    fit: 'regular' as const,
    image: 'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=600&auto=format&fit=crop&q=80',
    notes: 'Cổ chữ V thoáng giúp kéo dài phần cổ và thon gọn mặt.',
  },
  {
    name: 'Quần tây ống rộng xếp ly cạp cao',
    category: 'bottom' as ClothingCategory,
    subCategory: 'Quần tây',
    colorName: 'Xám Khói',
    colorHex: '#64748B',
    material: 'Tuyết mưa cao cấp',
    warmthLevel: 3 as const,
    fit: 'high_waist' as const,
    image: 'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?w=600&auto=format&fit=crop&q=80',
    notes: 'Cạp cao che bụng dưới và kéo chân dài thêm 5cm.',
  },
  {
    name: 'Áo khoác Blazer phom suông tối giản',
    category: 'outerwear' as ClothingCategory,
    subCategory: 'Blazer',
    colorName: 'Nâu Cacao',
    colorHex: '#4A3B32',
    material: 'Vải dạ đứng phom',
    warmthLevel: 3 as const,
    fit: 'relaxed' as const,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&auto=format&fit=crop&q=80',
    notes: 'Tạo cầu vai sắc nét cân đối với vòng hông.',
  },
  {
    name: 'Giày bốt Chelsea da cao cấp',
    category: 'shoes' as ClothingCategory,
    subCategory: 'Boots',
    colorName: 'Đen Mờ',
    colorHex: '#18181B',
    material: 'Da chống thấm nước',
    warmthLevel: 4 as const,
    fit: 'regular' as const,
    image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=600&auto=format&fit=crop&q=80',
    notes: 'Bảo vệ chân trời mưa lạnh, đế 3.5cm tôn dáng.',
  },
];

export const AddItemModal: React.FC<AddItemModalProps> = ({ isOpen, onClose, onAddItem }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<ClothingCategory>('top');
  const [subCategory, setSubCategory] = useState('Sơ mi');
  const [colorName, setColorName] = useState('Be Hạnh Nhân');
  const [colorHex, setColorHex] = useState('#D7C4B7');
  const [material, setMaterial] = useState('Cotton / Linen');
  const [warmthLevel, setWarmthLevel] = useState<1 | 2 | 3 | 4 | 5>(2);
  const [fit, setFit] = useState<'high_waist' | 'oversized' | 'regular' | 'slim' | 'cropped' | 'wide_leg' | 'relaxed'>('regular');
  const [imageUrl, setImageUrl] = useState('');
  const [isOwned, setIsOwned] = useState(true);
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleApplyPreset = (preset: typeof PRESET_TEMPLATES[0]) => {
    setName(preset.name);
    setCategory(preset.category);
    setSubCategory(preset.subCategory);
    setColorName(preset.colorName);
    setColorHex(preset.colorHex);
    setMaterial(preset.material);
    setWarmthLevel(preset.warmthLevel);
    setFit(preset.fit);
    setImageUrl(preset.image);
    setNotes(preset.notes);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newItem: ClothingItem = {
      id: `item-${Date.now()}`,
      name: name.trim(),
      category,
      subCategory: subCategory.trim() || 'Thời trang',
      colorName: colorName.trim() || 'Tự nhiên',
      colorHex,
      material: material.trim() || 'Cotton',
      warmthLevel,
      fit,
      seasons: ['summer', 'spring', 'fall'],
      occasions: ['work', 'casual', 'dating'],
      image: imageUrl.trim() || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80',
      isOwned,
      notes: notes.trim(),
    };

    onAddItem(newItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative my-8 animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between pb-4 border-b border-stone-100">
          <div>
            <h2 className="font-serif text-xl font-bold text-stone-900">Thêm Món Đồ Vào Tủ</h2>
            <p className="text-xs text-stone-500">Nhập thông tin hoặc chọn mẫu thiết kế có sẵn</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Presets */}
        <div className="pt-4 pb-2">
          <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
            Chọn nhanh thiết kế mẫu:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
            {PRESET_TEMPLATES.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleApplyPreset(p)}
                className="text-left p-2 rounded-lg border border-stone-200 hover:border-stone-900 bg-stone-50 hover:bg-white text-xs transition-colors cursor-pointer"
              >
                <p className="font-semibold text-stone-900 truncate">{p.name}</p>
                <p className="text-[10px] text-stone-500">{p.subCategory}</p>
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 pt-3">
          {/* Image input or preview */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Ảnh món đồ
            </label>
            <div className="flex items-center gap-4">
              <div className="w-20 h-24 rounded-lg bg-stone-100 border border-stone-200 overflow-hidden flex items-center justify-center shrink-0">
                {imageUrl ? (
                  <img src={imageUrl} alt="Preview" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon className="w-6 h-6 text-stone-300" />
                )}
              </div>
              <div className="flex-1 space-y-2">
                <input
                  type="text"
                  placeholder="Nhập URL ảnh hoặc dán link..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-stone-900"
                />
                <label className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs rounded cursor-pointer transition-colors">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Tải ảnh từ máy tính / điện thoại</span>
                  <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                </label>
              </div>
            </div>
          </div>

          {/* Name & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Tên trang phục <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="VD: Áo thun trắng basic, Quần jean..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-stone-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Phân loại</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ClothingCategory)}
                className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-stone-900"
              >
                <option value="top">Áo thân trên (Tops)</option>
                <option value="bottom">Quần & Chân váy (Bottoms)</option>
                <option value="outerwear">Áo khoác ngoài (Outerwear)</option>
                <option value="shoes">Giày dép (Shoes)</option>
                <option value="accessories">Phụ kiện & Túi (Accessories)</option>
              </select>
            </div>
          </div>

          {/* Subcategory & Fit */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Kiểu dáng chi tiết</label>
              <input
                type="text"
                placeholder="VD: Sơ mi, Cạp cao, Wide-leg..."
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-stone-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Phom dáng (Fit)</label>
              <select
                value={fit}
                onChange={(e) => setFit(e.target.value as any)}
                className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-stone-900"
              >
                <option value="regular">Vừa vặn tiêu chuẩn (Regular)</option>
                <option value="high_waist">Cạp cao hack chân (High-waist)</option>
                <option value="cropped">Dáng lửng tôn eo (Cropped)</option>
                <option value="wide_leg">Ống suông rộng (Wide-leg)</option>
                <option value="oversized">Rộng thoải mái (Oversized)</option>
                <option value="slim">Ôm nhẹ tôn dáng (Slim)</option>
              </select>
            </div>
          </div>

          {/* Color & Material */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Tên màu sắc</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={colorHex}
                  onChange={(e) => setColorHex(e.target.value)}
                  className="w-8 h-8 rounded border border-stone-200 cursor-pointer p-0.5 bg-white"
                />
                <input
                  type="text"
                  placeholder="VD: Be Hạnh Nhân, Đen..."
                  value={colorName}
                  onChange={(e) => setColorName(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-stone-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Chất liệu vải</label>
              <input
                type="text"
                placeholder="VD: Linen, Cotton 100%, Dạ..."
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-stone-900"
              />
            </div>
          </div>

          {/* Warmth level & Owned status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Độ ấm / Thích ứng thời tiết (1: Mát hè → 5: Rét đậm)
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setWarmthLevel(lvl as any)}
                    className={`flex-1 py-1 text-xs rounded border transition-colors cursor-pointer ${
                      warmthLevel === lvl
                        ? 'bg-stone-900 text-white border-stone-900 font-semibold'
                        : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <label className="flex items-center gap-2 text-xs text-stone-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isOwned}
                  onChange={(e) => setIsOwned(e.target.checked)}
                  className="rounded border-stone-300 text-stone-900 focus:ring-stone-900"
                />
                <span>Món đồ đã có sẵn trong tủ đồ cá nhân</span>
              </label>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Ghi chú hack dáng</label>
            <textarea
              rows={2}
              placeholder="VD: Hợp phối quần cạp cao, che khuyết điểm bắp tay..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-stone-900"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg shadow-xs cursor-pointer transition-colors"
            >
              Lưu vào tủ đồ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
