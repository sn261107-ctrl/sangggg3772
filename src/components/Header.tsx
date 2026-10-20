import React from 'react';
import { Sparkles, Plus } from 'lucide-react';

interface HeaderProps {
  activeTab: 'stylist' | 'wardrobe' | 'studio' | 'profile' | 'lookbook';
  onSelectTab: (tab: 'stylist' | 'wardrobe' | 'studio' | 'profile' | 'lookbook') => void;
  onOpenAddItem: () => void;
  wardrobeCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  onOpenAddItem,
  wardrobeCount
}) => {
  return (
    <header className="sticky top-0 z-40 bg-stone-50/90 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single brand wordmark with logo icon */}
          <button
            onClick={() => onSelectTab('stylist')}
            className="flex items-center gap-2.5 text-left font-serif text-xl tracking-tight text-stone-900 font-bold whitespace-nowrap shrink-0 hover:opacity-85 transition-opacity"
          >
            <img
              src="/src/assets/images/gustyle_logo_wallpaper_1792337954499.jpg"
              alt="GUSTYLE Logo"
              referrerPolicy="no-referrer"
              className="w-8 h-8 rounded-lg object-cover shadow-xs border border-stone-200/60"
            />
            <span className="tracking-wide">GUSTYLE</span>
          </button>

          {/* Zone 2: 5 clean single-line nav links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
            <button
              onClick={() => onSelectTab('stylist')}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
                activeTab === 'stylist'
                  ? 'text-stone-950 border-b-2 border-stone-900 font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Gợi ý Hôm nay
            </button>
            <button
              onClick={() => onSelectTab('wardrobe')}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 flex items-center gap-1.5 ${
                activeTab === 'wardrobe'
                  ? 'text-stone-950 border-b-2 border-stone-900 font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Tủ đồ ({wardrobeCount})
            </button>
            <button
              onClick={() => onSelectTab('studio')}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
                activeTab === 'studio'
                  ? 'text-stone-950 border-b-2 border-stone-900 font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Studio Phối đồ
            </button>
            <button
              onClick={() => onSelectTab('profile')}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
                activeTab === 'profile'
                  ? 'text-stone-950 border-b-2 border-stone-900 font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Hồ sơ Vóc dáng
            </button>
            <button
              onClick={() => onSelectTab('lookbook')}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
                activeTab === 'lookbook'
                  ? 'text-stone-950 border-b-2 border-stone-900 font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Lookbook & Lịch
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenAddItem}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-stone-900 rounded-lg hover:bg-stone-800 active:scale-98 transition-all shadow-sm whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm món đồ</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="md:hidden flex items-center overflow-x-auto py-2.5 gap-4 border-t border-stone-100 text-xs font-medium no-scrollbar">
          <button
            onClick={() => onSelectTab('stylist')}
            className={`whitespace-nowrap px-2 py-1 rounded ${
              activeTab === 'stylist' ? 'bg-stone-900 text-white' : 'text-stone-600'
            }`}
          >
            Gợi ý Hôm nay
          </button>
          <button
            onClick={() => onSelectTab('wardrobe')}
            className={`whitespace-nowrap px-2 py-1 rounded ${
              activeTab === 'wardrobe' ? 'bg-stone-900 text-white' : 'text-stone-600'
            }`}
          >
            Tủ đồ ({wardrobeCount})
          </button>
          <button
            onClick={() => onSelectTab('studio')}
            className={`whitespace-nowrap px-2 py-1 rounded ${
              activeTab === 'studio' ? 'bg-stone-900 text-white' : 'text-stone-600'
            }`}
          >
            Studio
          </button>
          <button
            onClick={() => onSelectTab('profile')}
            className={`whitespace-nowrap px-2 py-1 rounded ${
              activeTab === 'profile' ? 'bg-stone-900 text-white' : 'text-stone-600'
            }`}
          >
            Vóc dáng
          </button>
          <button
            onClick={() => onSelectTab('lookbook')}
            className={`whitespace-nowrap px-2 py-1 rounded ${
              activeTab === 'lookbook' ? 'bg-stone-900 text-white' : 'text-stone-600'
            }`}
          >
            Lookbook
          </button>
        </div>
      </div>
    </header>
  );
};
