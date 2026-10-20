export type ClothingCategory = 'top' | 'bottom' | 'outerwear' | 'shoes' | 'accessories';

export type BodyShapeType = 'hourglass' | 'pear' | 'rectangle' | 'inverted_triangle' | 'apple';

export type TorsoProportion = 'balanced' | 'long_torso' | 'long_legs';

export type SkinToneSeason = 'warm_spring' | 'cool_summer' | 'warm_autumn' | 'cool_winter';

export type OccasionType = 'work' | 'casual' | 'dating' | 'formal' | 'travel' | 'sport';

export type WeatherType = 'sunny_hot' | 'pleasant' | 'chilly' | 'cold' | 'rainy';

export interface ClothingItem {
  id: string;
  name: string;
  category: ClothingCategory;
  subCategory: string;
  colorName: string;
  colorHex: string;
  material: string;
  warmthLevel: 1 | 2 | 3 | 4 | 5; // 1: < 32°C, 3: 20-25°C, 5: < 15°C
  fit: 'oversized' | 'regular' | 'slim' | 'cropped' | 'wide_leg' | 'high_waist' | 'relaxed';
  seasons: ('summer' | 'fall' | 'winter' | 'spring' | 'rainy')[];
  occasions: OccasionType[];
  image: string;
  isOwned: boolean;
  notes?: string;
}

export interface BodyProfile {
  height: number; // in cm (e.g. 162)
  weight: number; // in kg (e.g. 50)
  gender: 'female' | 'male' | 'unisex';
  bodyShape: BodyShapeType;
  torsoProportion: TorsoProportion;
  skinTone: SkinToneSeason;
  stylePreference: 'minimalist' | 'korean_chic' | 'classic_office' | 'streetwear' | 'quiet_luxury';
  targetStyleGoal: 'hack_height' | 'slim_waist' | 'broaden_shoulders' | 'balanced' | 'comfort';
}

export interface WeatherCondition {
  city: string;
  temp: number; // °C
  feelsLike: number;
  condition: WeatherType;
  description: string;
  humidity: number; // %
  windSpeed: number; // km/h
  uvIndex: number;
  rainProbability: number; // %
}

export interface Outfit {
  id: string;
  title: string;
  top?: ClothingItem;
  bottom?: ClothingItem;
  outerwear?: ClothingItem;
  shoes?: ClothingItem;
  accessories: ClothingItem[];
  overallScore: number;
  weatherSuitability: {
    score: number;
    verdict: string;
    advice: string;
  };
  bodySuitability: {
    score: number;
    verdict: string;
    proportionTips: string[];
  };
  colorHarmony: {
    score: number;
    paletteType: string;
    explanation: string;
  };
  stylistVerdict: string;
  stylingHacks: string[];
  occasion: OccasionType;
  createdAt: string;
  scheduledDay?: string; // 'Monday', 'Tuesday', ...
}
