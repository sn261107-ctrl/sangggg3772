import React, { useState } from 'react';
import { User, Check, Sparkles, Scale, Ruler, Compass, Palette, BookOpen } from 'lucide-react';
import { BodyProfile, BodyShapeType, TorsoProportion, SkinToneSeason } from '../types/fashion';
import { calculateBMI, getBodyShapeAdvice, getHeightHackAdvice } from '../utils/stylingEngine';

interface BodyProfileViewProps {
  profile: BodyProfile;
  onUpdateProfile: (newProfile: BodyProfile) => void;
  onGoToStylist: () => void;
}

export const BodyProfileView: React.FC<BodyProfileViewProps> = ({
  profile,
  onUpdateProfile,
  onGoToStylist,
}) => {
  const [formData, setFormData] = useState<BodyProfile>(profile);
  const [showSavedToast, setShowSavedToast] = useState(false);

  const bmi = calculateBMI(formData.height, formData.weight);
  const shapeAdvice = getBodyShapeAdvice(formData);
  const heightHacks = getHeightHackAdvice(formData.height);

  const handleSave = () => {
    onUpdateProfile(formData);
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 3000);
  };

  const shapes: { id: BodyShapeType; name: string; desc: string }[] = [
    {
      id: 'hourglass',
      name: 'Đồng Hồ Cát',
      desc: 'Ngực và hông cân xứng, vòng eo thon gọn rõ nét.',
    },
    {
      id: 'pear',
      name: 'Dáng Quả Lê',
      desc: 'Hông và đùi nở nang, vai và ngực nhỏ hơn.',
    },
    {
      id: 'inverted_triangle',
      name: 'Tam Giác Ngược',
      desc: 'Vai và lưng rộng, hông và chân thanh mảnh.',
    },
    {
      id: 'rectangle',
      name: 'Dáng Chữ Nhật',
      desc: 'Vóc dáng thẳng, 3 vòng chênh lệch ít, thanh mảnh.',
    },
    {
      id: 'apple',
      name: 'Dáng Quả Táo',
      desc: 'Vòng 2 tròn đầy, chân và tay tương đối thon.',
    },
  ];

  const proportions: { id: TorsoProportion; label: string; desc: string }[] = [
    { id: 'balanced', label: 'Tỷ lệ Cân đối', desc: 'Lưng và chân hài hòa tự nhiên' },
    { id: 'long_torso', label: 'Lưng dài - Chân ngắn', desc: 'Cần cạp cao để đẩy dài đôi chân' },
    { id: 'long_legs', label: 'Chân dài - Lưng ngắn', desc: 'Dễ phối nhiều kiểu áo suông/dài' },
  ];

  const skinTones: { id: SkinToneSeason; label: string; paletteDesc: string; hexes: string[] }[] = [
    {
      id: 'warm_autumn',
      label: 'Thu Trầm Ấm (Warm Autumn)',
      paletteDesc: 'Hợp tone nâu mocha, camel, be hạnh nhân, xanh olive, cam đất.',
      hexes: ['#C19A6B', '#4E3629', '#8B5A2B', '#556B2F'],
    },
    {
      id: 'warm_spring',
      label: 'Xuân Tươi Sáng (Warm Spring)',
      paletteDesc: 'Hợp tone kem bơ, san hô đào, vàng mơ, xanh mint.',
      hexes: ['#F3E5AB', '#FF7F50', '#D1E8E2', '#FFD700'],
    },
    {
      id: 'cool_summer',
      label: 'Hè Dịu Mát (Cool Summer)',
      paletteDesc: 'Hợp tone pastel dịu, hồng phấn, xanh lam phấn, xám tro nhạt.',
      hexes: ['#B0C4DE', '#E6E6FA', '#D8BFD8', '#C0C0C0'],
    },
    {
      id: 'cool_winter',
      label: 'Đông Sắc Sảo (Cool Winter)',
      paletteDesc: 'Hợp tone tương phản mạnh: Đen tuyền, trắng tinh, đỏ ruby, xanh navy đậm.',
      hexes: ['#0F172A', '#FBFBF9', '#9B111E', '#1B263B'],
    },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <h1 className="font-serif text-2xl font-bold text-stone-900">Hồ Sơ Vóc Dáng & Số Đo Cơ Thể</h1>
          <p className="text-xs text-stone-500 mt-1">
            Điều chỉnh chiều cao và cân nặng để hệ thống tự động tính toán tỷ lệ vàng và gợi ý outfit giấu khuyết điểm
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold transition-all shadow-xs cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>Lưu cập nhật</span>
          </button>
        </div>
      </div>

      {showSavedToast && (
        <div className="p-3 bg-stone-900 text-white text-xs rounded-lg flex items-center justify-between animate-in fade-in">
          <span>Đã lưu thành công hồ sơ vóc dáng! Tất cả gợi ý phối đồ đã được tính toán lại.</span>
          <button
            onClick={onGoToStylist}
            className="underline text-stone-200 hover:text-white font-medium ml-4 cursor-pointer"
          >
            Xem gợi ý outfit mới →
          </button>
        </div>
      )}

      {/* Primary Sliders: Height & Weight */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Height Slider */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Ruler className="w-4 h-4 text-stone-600" />
              <span className="text-xs font-semibold text-stone-900">Chiều Cao Của Bạn</span>
            </div>
            <span className="text-2xl font-bold font-serif text-stone-900 tabular-nums">
              {formData.height} <span className="text-xs font-sans font-normal text-stone-400">cm</span>
            </span>
          </div>

          <input
            type="range"
            min="145"
            max="195"
            value={formData.height}
            onChange={(e) => setFormData({ ...formData, height: parseInt(e.target.value, 10) })}
            className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-stone-900"
          />

          <div className="flex justify-between text-xs text-stone-400 tabular-nums">
            <span>145 cm</span>
            <span>165 cm</span>
            <span>195 cm</span>
          </div>

          <p className="text-[11px] text-stone-500 bg-stone-50 p-2.5 rounded-lg leading-relaxed">
            {formData.height < 160
              ? 'Mẹo hack chiều cao: Ưu tiên cạp cao, sơ vin vạt trước và giày mũi nhọn hoặc sneaker đế dày nhẹ.'
              : formData.height <= 170
              ? 'Tỷ lệ chiều cao tiêu chuẩn, cực kỳ dễ phối trang phục từ công sở thanh lịch đến dạo phố casual.'
              : 'Chiều cao lý tưởng cho phong cách Menswear, Trench Coat dáng dài qua gối và quần suông quét đất.'}
          </p>
        </div>

        {/* Weight Slider & BMI */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Scale className="w-4 h-4 text-stone-600" />
              <span className="text-xs font-semibold text-stone-900">Cân Nặng Của Bạn</span>
            </div>
            <span className="text-2xl font-bold font-serif text-stone-900 tabular-nums">
              {formData.weight} <span className="text-xs font-sans font-normal text-stone-400">kg</span>
            </span>
          </div>

          <input
            type="range"
            min="40"
            max="110"
            value={formData.weight}
            onChange={(e) => setFormData({ ...formData, weight: parseInt(e.target.value, 10) })}
            className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-stone-900"
          />

          <div className="flex justify-between text-xs text-stone-400 tabular-nums">
            <span>40 kg</span>
            <span>65 kg</span>
            <span>110 kg</span>
          </div>

          <div className="bg-stone-50 p-2.5 rounded-lg flex items-center justify-between text-xs">
            <span className="text-stone-500">Chỉ số BMI thể trạng:</span>
            <strong className="text-stone-900 tabular-nums">{bmi.bmi} · {bmi.category}</strong>
          </div>
        </div>
      </div>

      {/* Body Silhouette Selector */}
      <div className="space-y-4">
        <div>
          <h2 className="text-base font-semibold text-stone-900 font-serif">Dáng Người Đặc Trưng (Body Silhouette)</h2>
          <p className="text-xs text-stone-500">Chọn dáng người sát nhất với bạn để nhận công thức cân bằng tỷ lệ</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {shapes.map((s) => (
            <div
              key={s.id}
              onClick={() => setFormData({ ...formData, bodyShape: s.id })}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                formData.bodyShape === s.id
                  ? 'border-stone-900 bg-white ring-2 ring-stone-900/10 shadow-xs'
                  : 'border-stone-200 bg-white hover:border-stone-400'
              }`}
            >
              <div>
                <h3 className="text-xs font-bold text-stone-900">{s.name}</h3>
                <p className="text-[11px] text-stone-500 mt-1 leading-relaxed">{s.desc}</p>
              </div>
              <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px]">
                <span className={formData.bodyShape === s.id ? 'font-semibold text-stone-900' : 'text-stone-400'}>
                  {formData.bodyShape === s.id ? 'Đang chọn' : 'Chọn dáng này'}
                </span>
                {formData.bodyShape === s.id && <Check className="w-3.5 h-3.5 text-stone-900" />}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Proportions & Skin Tone Color Season */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Torso Proportion */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-stone-600" />
            <h2 className="text-xs font-semibold text-stone-900">Tỷ Lệ Lưng & Chân</h2>
          </div>

          <div className="space-y-2">
            {proportions.map((p) => (
              <div
                key={p.id}
                onClick={() => setFormData({ ...formData, torsoProportion: p.id })}
                className={`p-3 rounded-lg border text-xs cursor-pointer transition-all flex items-center justify-between ${
                  formData.torsoProportion === p.id
                    ? 'border-stone-900 bg-stone-50 font-medium text-stone-900'
                    : 'border-stone-200 hover:border-stone-400 text-stone-600'
                }`}
              >
                <div>
                  <p className="font-semibold">{p.label}</p>
                  <p className="text-[11px] text-stone-500">{p.desc}</p>
                </div>
                {formData.torsoProportion === p.id && <Check className="w-4 h-4 text-stone-900" />}
              </div>
            ))}
          </div>
        </div>

        {/* Skin Tone & Color Analysis */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4 text-stone-600" />
            <h2 className="text-xs font-semibold text-stone-900">Sắc Tố Da & Bảng Màu Tôn Da</h2>
          </div>

          <div className="space-y-2">
            {skinTones.map((st) => (
              <div
                key={st.id}
                onClick={() => setFormData({ ...formData, skinTone: st.id })}
                className={`p-3 rounded-lg border text-xs cursor-pointer transition-all ${
                  formData.skinTone === st.id
                    ? 'border-stone-900 bg-stone-50'
                    : 'border-stone-200 hover:border-stone-400'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-semibold text-stone-900">{st.label}</span>
                  <div className="flex items-center gap-1">
                    {st.hexes.map((hex, idx) => (
                      <span
                        key={idx}
                        className="w-3.5 h-3.5 rounded-full border border-black/10"
                        style={{ backgroundColor: hex }}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-[11px] text-stone-500">{st.paletteDesc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Personalized Fashion Handbook */}
      <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center gap-2 pb-4 border-b border-stone-100">
          <BookOpen className="w-5 h-5 text-stone-800" />
          <div>
            <h2 className="text-base font-semibold text-stone-900 font-serif">
              Cẩm Nang Phối Đồ Cho Riêng Bạn ({formData.height}cm · {formData.weight}kg)
            </h2>
            <p className="text-xs text-stone-500">Các quy tắc thời trang chuyên nghiệp giúp bạn luôn tự tin</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Do list */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
              Nên Ưu Tiên (Tôn dáng tối đa)
            </h3>
            <ul className="space-y-2 text-xs text-stone-600">
              {shapeAdvice.doList.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 leading-relaxed">
                  <span className="text-stone-900 font-bold">✓</span>
                  <span>{item}</span>
                </li>
              ))}
              {heightHacks.slice(0, 2).map((item, idx) => (
                <li key={`h-${idx}`} className="flex items-start gap-2 leading-relaxed">
                  <span className="text-stone-900 font-bold">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Avoid list */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
              Nên Tránh (Dễ dìm dáng)
            </h3>
            <ul className="space-y-2 text-xs text-stone-600">
              {shapeAdvice.avoidList.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 leading-relaxed">
                  <span className="text-stone-400 font-bold">✕</span>
                  <span>{item}</span>
                </li>
              ))}
              <li className="flex items-start gap-2 leading-relaxed">
                <span className="text-stone-400 font-bold">✕</span>
                <span>Tránh chia cơ thể thành nhiều mảng màu cắt ngang làm ngắn người.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
