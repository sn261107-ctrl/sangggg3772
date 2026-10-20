import React, { useState } from 'react';
import { Sun, CloudRain, Wind, Droplets, Thermometer, ShieldAlert, ChevronDown } from 'lucide-react';
import { WeatherCondition } from '../types/fashion';
import { PRESET_CITIES } from '../data/defaultWardrobe';

interface WeatherWidgetProps {
  weather: WeatherCondition;
  onUpdateWeather: (newWeather: WeatherCondition) => void;
}

export const WeatherWidget: React.FC<WeatherWidgetProps> = ({ weather, onUpdateWeather }) => {
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);

  const handleSelectCity = (cityPreset: WeatherCondition) => {
    onUpdateWeather({ ...cityPreset });
    setIsCityDropdownOpen(false);
  };

  const handleTempChange = (newTemp: number) => {
    let condition = weather.condition;
    let description = weather.description;

    if (newTemp >= 32) {
      condition = 'sunny_hot';
      description = 'Nắng nóng đỉnh điểm, chỉ số UV cao';
    } else if (newTemp >= 23) {
      condition = 'pleasant';
      description = 'Tiết trời dễ chịu, nắng nhẹ thoáng mát';
    } else if (newTemp >= 18) {
      condition = 'chilly';
      description = 'Se lạnh mát mẻ, thích hợp layering áo khoác mỏng';
    } else {
      condition = 'cold';
      description = 'Rét lạnh, cần áo khoác dày và giữ ấm cổ';
    }

    onUpdateWeather({
      ...weather,
      temp: newTemp,
      feelsLike: newTemp + (weather.humidity > 75 ? 3 : -1),
      condition,
      description,
    });
  };

  const toggleRain = () => {
    const isNowRain = weather.condition !== 'rainy';
    onUpdateWeather({
      ...weather,
      condition: isNowRain ? 'rainy' : (weather.temp >= 28 ? 'sunny_hot' : 'pleasant'),
      description: isNowRain ? 'Mưa rào rải rác, đường ướt' : 'Trời tạnh ráo, thoáng mát',
      rainProbability: isNowRain ? 85 : 10,
      humidity: isNowRain ? 90 : 65,
    });
  };

  const getWeatherIcon = () => {
    if (weather.condition === 'rainy') return <CloudRain className="w-5 h-5 text-sky-600" />;
    if (weather.condition === 'cold') return <Thermometer className="w-5 h-5 text-indigo-500" />;
    if (weather.temp >= 30) return <Sun className="w-5 h-5 text-amber-500" />;
    return <Sun className="w-5 h-5 text-amber-400" />;
  };

  return (
    <div className="bg-white border border-stone-200 rounded-xl p-4 sm:p-5 shadow-xs transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-stone-100 flex items-center justify-center shrink-0">
            {getWeatherIcon()}
          </div>
          <div>
            <div className="relative inline-block text-left">
              <button
                type="button"
                onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
                className="flex items-center gap-1.5 text-base font-semibold text-stone-900 hover:text-stone-700 transition-colors cursor-pointer"
              >
                <span>{weather.city}</span>
                <ChevronDown className="w-4 h-4 text-stone-400" />
              </button>

              {isCityDropdownOpen && (
                <div className="absolute left-0 mt-2 w-64 origin-top-left rounded-lg bg-white shadow-lg ring-1 ring-black/5 z-50 py-1">
                  <div className="px-3 py-1.5 text-xs font-medium text-stone-400 border-b border-stone-100">
                    Chọn địa điểm thời tiết
                  </div>
                  {PRESET_CITIES.map((c) => (
                    <button
                      key={c.city}
                      onClick={() => handleSelectCity(c)}
                      className="w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-stone-50 transition-colors text-stone-700 hover:text-stone-900"
                    >
                      <span className="font-medium">{c.city}</span>
                      <span className="text-stone-500 tabular-nums">{c.temp}°C</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <p className="text-xs text-stone-500 mt-0.5">{weather.description}</p>
          </div>
        </div>

        {/* Temperature & Rain quick actions */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-2xl font-bold tracking-tight text-stone-900 tabular-nums">
              {weather.temp}°C
            </div>
            <div className="text-xs text-stone-500">
              Cảm giác như <span className="tabular-nums font-medium">{weather.feelsLike}°C</span>
            </div>
          </div>

          <button
            onClick={toggleRain}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
              weather.condition === 'rainy'
                ? 'bg-sky-50 border-sky-300 text-sky-800'
                : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
            }`}
          >
            {weather.condition === 'rainy' ? 'Đang có mưa' : 'Bật giả lập mưa'}
          </button>
        </div>
      </div>

      {/* Temperature Slider & Live weather parameters */}
      <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <div>
          <div className="flex items-center justify-between text-xs text-stone-500 mb-1.5">
            <span>Tùy chỉnh nhiệt độ thử nghiệm:</span>
            <span className="font-medium text-stone-900 tabular-nums">{weather.temp}°C</span>
          </div>
          <input
            type="range"
            min="8"
            max="40"
            value={weather.temp}
            onChange={(e) => handleTempChange(parseInt(e.target.value, 10))}
            className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-stone-900"
          />
          <div className="flex justify-between text-[11px] text-stone-400 mt-1 tabular-nums">
            <span>8°C Rét</span>
            <span>20°C Mát mẻ</span>
            <span>40°C Nắng gắt</span>
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-6 text-xs text-stone-600 border-t sm:border-t-0 pt-2 sm:pt-0 border-stone-100">
          <div className="flex items-center gap-1.5">
            <Droplets className="w-3.5 h-3.5 text-stone-400" />
            <span>Độ ẩm: <strong className="text-stone-800 tabular-nums">{weather.humidity}%</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
            <Wind className="w-3.5 h-3.5 text-stone-400" />
            <span>Gió: <strong className="text-stone-800 tabular-nums">{weather.windSpeed} km/h</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-stone-400" />
            <span>UV: <strong className="text-stone-800 tabular-nums">{weather.uvIndex}</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
};
