import React, { useState } from 'react';
import { Calendar, Trash2, Sliders, Sparkles, Check, Clock, ChevronRight, Layers, FileDown } from 'lucide-react';
import { Outfit } from '../types/fashion';

interface LookbookViewProps {
  savedOutfits: Outfit[];
  onDeleteOutfit: (id: string) => void;
  onOpenInStudio: (outfit: Outfit) => void;
  onAssignToDay: (outfitId: string, day: string) => void;
}

export const LookbookView: React.FC<LookbookViewProps> = ({
  savedOutfits,
  onDeleteOutfit,
  onOpenInStudio,
  onAssignToDay,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'lookbook' | 'calendar'>('lookbook');

  const daysOfWeek = [
    { key: 'Monday', label: 'Thứ Hai', note: 'Khởi đầu tuần mới chỉn chu' },
    { key: 'Tuesday', label: 'Thứ Ba', note: 'Gặp gỡ khách hàng & họp' },
    { key: 'Wednesday', label: 'Thứ Tư', note: 'Năng động giữa tuần' },
    { key: 'Thursday', label: 'Thứ Năm', note: 'Thanh lịch & thoải mái' },
    { key: 'Friday', label: 'Thứ Sáu', note: 'Casual Friday & hẹn cafe tối' },
    { key: 'Saturday', label: 'Thứ Bảy', note: 'Dạo phố cuối tuần' },
    { key: 'Sunday', label: 'Chủ Nhật', note: 'Nghỉ ngơi, brunch cùng bạn bè' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <h1 className="font-serif text-2xl font-bold text-stone-900">Lookbook & Lịch Mặc Trong Tuần</h1>
          <p className="text-xs text-stone-500 mt-1">
            Lưu giữ những bộ phối ưng ý nhất và lên kế hoạch trang phục cả tuần không lo "hôm nay mặc gì"
          </p>
        </div>

        {/* Tab switch & Word script download */}
        <div className="flex flex-wrap items-center gap-2">
          <a
            href="/Kich_Ban_GUSTYLE_3_Phut.docx"
            download="Kich_Ban_GUSTYLE_3_Phut.docx"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-900 bg-white border border-stone-300 hover:border-stone-900 rounded-lg shadow-2xs hover:bg-stone-50 transition-colors cursor-pointer"
            title="Tải kịch bản video đối thoại 3 phút (.docx)"
          >
            <FileDown className="w-3.5 h-3.5 text-blue-600" />
            <span>Tải Kịch Bản Word (.docx)</span>
          </a>

          <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg">
            <button
              onClick={() => setActiveSubTab('lookbook')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                activeSubTab === 'lookbook'
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Bộ sưu tập ({savedOutfits.length})
            </button>
            <button
              onClick={() => setActiveSubTab('calendar')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                activeSubTab === 'calendar'
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Lịch 7 Ngày
            </button>
          </div>
        </div>
      </div>

      {activeSubTab === 'lookbook' ? (
        /* Lookbook List */
        savedOutfits.length === 0 ? (
          <div className="p-12 text-center bg-white border border-dashed border-stone-200 rounded-2xl">
            <Layers className="w-8 h-8 mx-auto text-stone-300 mb-2" />
            <h3 className="text-sm font-semibold text-stone-700">Chưa có bộ trang phục nào trong Lookbook</h3>
            <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
              Ở trang Gợi ý Hôm nay hoặc Studio Phối đồ, bấm nút "Lưu Lookbook" để lưu lại những outfit bạn yêu thích nhất.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {savedOutfits.map((outfit) => (
              <div
                key={outfit.id}
                className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs space-y-4 hover:shadow-sm transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-base font-bold text-stone-900 font-serif">{outfit.title}</h3>
                    <div className="flex items-center gap-2 text-[11px] text-stone-500 mt-1">
                      <span>Điểm: <strong className="text-stone-800">{outfit.overallScore}/100</strong></span>
                      <span>·</span>
                      <span className="capitalize">{outfit.occasion}</span>
                      {outfit.scheduledDay && (
                        <>
                          <span>·</span>
                          <span className="text-stone-900 font-medium">Lịch: {outfit.scheduledDay}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => onDeleteOutfit(outfit.id)}
                    title="Xóa outfit này"
                    className="p-1 text-stone-400 hover:text-rose-600 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Items Thumbnails Row */}
                <div className="flex items-center gap-2 overflow-x-auto py-1">
                  {outfit.top && (
                    <img
                      src={outfit.top.image}
                      alt={outfit.top.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-20 rounded-lg object-cover border border-stone-200 shrink-0"
                    />
                  )}
                  {outfit.bottom && (
                    <img
                      src={outfit.bottom.image}
                      alt={outfit.bottom.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-20 rounded-lg object-cover border border-stone-200 shrink-0"
                    />
                  )}
                  {outfit.outerwear && (
                    <img
                      src={outfit.outerwear.image}
                      alt={outfit.outerwear.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-20 rounded-lg object-cover border border-stone-200 shrink-0"
                    />
                  )}
                  {outfit.shoes && (
                    <img
                      src={outfit.shoes.image}
                      alt={outfit.shoes.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-20 rounded-lg object-cover border border-stone-200 shrink-0"
                    />
                  )}
                  {outfit.accessories.map((acc) => (
                    <img
                      key={acc.id}
                      src={acc.image}
                      alt={acc.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-20 rounded-lg object-cover border border-stone-200 shrink-0"
                    />
                  ))}
                </div>

                <p className="text-xs text-stone-600 bg-stone-50 p-2.5 rounded-lg leading-relaxed">
                  {outfit.stylistVerdict}
                </p>

                {/* Day assigner & studio button */}
                <div className="pt-2 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="text-stone-500">Mặc vào:</span>
                    <select
                      value={outfit.scheduledDay || ''}
                      onChange={(e) => onAssignToDay(outfit.id, e.target.value)}
                      className="text-xs bg-stone-100 border border-stone-200 rounded px-2 py-1 text-stone-800 focus:outline-none"
                    >
                      <option value="">Chưa xếp lịch</option>
                      {daysOfWeek.map((d) => (
                        <option key={d.key} value={d.key}>
                          {d.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={() => onOpenInStudio(outfit)}
                    className="flex items-center gap-1 text-stone-800 hover:text-stone-950 font-medium cursor-pointer"
                  >
                    <span>Mở trong Studio</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        /* Weekly Calendar View */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4">
          {daysOfWeek.map((day) => {
            const scheduledOutfit = savedOutfits.find((o) => o.scheduledDay === day.key);
            return (
              <div
                key={day.key}
                className={`bg-white border rounded-xl p-4 flex flex-col justify-between min-h-[220px] transition-all ${
                  scheduledOutfit ? 'border-stone-900 shadow-2xs' : 'border-stone-200'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                    <span className="text-xs font-bold text-stone-900">{day.label}</span>
                    {scheduledOutfit && <Check className="w-3.5 h-3.5 text-stone-900" />}
                  </div>
                  <p className="text-[10px] text-stone-400 mt-1">{day.note}</p>

                  {scheduledOutfit ? (
                    <div className="mt-3 space-y-2">
                      <div className="flex items-center gap-1 overflow-hidden">
                        {scheduledOutfit.top && (
                          <img
                            src={scheduledOutfit.top.image}
                            alt=""
                            referrerPolicy="no-referrer"
                            className="w-9 h-11 rounded object-cover border border-stone-200"
                          />
                        )}
                        {scheduledOutfit.bottom && (
                          <img
                            src={scheduledOutfit.bottom.image}
                            alt=""
                            referrerPolicy="no-referrer"
                            className="w-9 h-11 rounded object-cover border border-stone-200"
                          />
                        )}
                        {scheduledOutfit.shoes && (
                          <img
                            src={scheduledOutfit.shoes.image}
                            alt=""
                            referrerPolicy="no-referrer"
                            className="w-9 h-11 rounded object-cover border border-stone-200"
                          />
                        )}
                      </div>
                      <p className="text-xs font-semibold text-stone-900 line-clamp-1">{scheduledOutfit.title}</p>
                    </div>
                  ) : (
                    <div className="mt-6 text-center text-stone-400 text-xs">
                      <Calendar className="w-5 h-5 mx-auto mb-1 text-stone-300" />
                      <span>Trống</span>
                    </div>
                  )}
                </div>

                {scheduledOutfit && (
                  <button
                    onClick={() => onAssignToDay(scheduledOutfit.id, '')}
                    className="text-[11px] text-stone-400 hover:text-stone-800 pt-2 border-t border-stone-100 text-center cursor-pointer"
                  >
                    Bỏ lịch ngày này
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
