import { BodyProfile, ClothingItem, Outfit, WeatherCondition, OccasionType } from '../types/fashion';

export function calculateBMI(heightCm: number, weightKg: number): { bmi: number; category: string; description: string } {
  const heightM = heightCm / 100;
  const bmi = Number((weightKg / (heightM * heightM)).toFixed(1));

  let category = 'Cân đối';
  let description = 'Chỉ số hình thể lý tưởng, rất dễ dàng thử nghiệm nhiều phong cách thời trang khác nhau.';

  if (bmi < 18.5) {
    category = 'Mảnh mai / Gầy';
    description = 'Dáng người thanh thoát. Nên ưu tiên chất liệu có độ phồng, xếp ly hoặc layering nhiều lớp để tạo độ đầy đặn sang trọng.';
  } else if (bmi >= 18.5 && bmi <= 22.9) {
    category = 'Chuẩn cân đối (Châu Á)';
    description = 'Tỉ lệ cơ thể rất chuẩn. Tự tin diện các phom dáng từ ôm sát gợi cảm đến suông rộng hiện đại.';
  } else if (bmi >= 23 && bmi <= 24.9) {
    category = 'Đầy đặn / Hơi đậm người';
    description = 'Vóc dáng có đường cong rõ nét. Ưu tiên các đường cắt xẻ chữ V, chất liệu rủ nhẹ và cạp cao để hack eo thon.';
  } else {
    category = 'Đậm người / Plus size';
    description = 'Nên áp dụng nguyên tắc Monochrome (cây một màu), áo khoác ngoài thả cúc tạo sọc dọc thị giác giúp cơ thể thon gọn 5-7kg.';
  }

  return { bmi, category, description };
}

export function getBodyShapeAdvice(profile: BodyProfile): { title: string; doList: string[]; avoidList: string[] } {
  switch (profile.bodyShape) {
    case 'pear':
      return {
        title: 'Dáng Quả Lê (Hông và đùi nở nang hơn vai)',
        doList: [
          'Tập trung sự chú ý vào thân trên: Áo cổ vuông, cổ thuyền, tay bồng hoặc bèo nhún nhẹ.',
          'Chọn quần cạp cao ống suông (Wide-leg) hoặc chân váy chữ A để khéo léo che hông to.',
          'Phối áo màu sáng kết hợp với quần/váy gam màu tối hoặc trung tính.'
        ],
        avoidList: [
          'Tránh quần skinny bó sát sáng màu khiến phần đùi lộ rõ hơn.',
          'Hạn chế áo dài lửng ngang hông (điểm rộng nhất của cơ thể).'
        ]
      };
    case 'inverted_triangle':
      return {
        title: 'Dáng Tam Giác Ngược (Vai và ngực rộng hơn hông)',
        doList: [
          'Ưu tiên áo cổ chữ V sâu, cổ tim hoặc chất liệu mềm rủ tạo cảm giác vai mềm mại.',
          'Chọn quần ống rộng xếp ly, quần túi hộp hoặc chân váy xòe bồng để cân bằng hông với vai.',
          'Dùng thắt lưng bản vừa để tạo điểm nhấn eo quyến rũ.'
        ],
        avoidList: [
          'Tránh áo có độn vai dày hoặc tay áo bồng quá to làm vai trông thô.',
          'Tránh áo cổ thuyền rộng ngang làm vai rộng thêm.'
        ]
      };
    case 'apple':
      return {
        title: 'Dáng Quả Táo (Vòng 2 tròn đầy, đôi chân thon gọn)',
        doList: [
          'Khoác thêm Blazer hoặc Cardigan dáng suông buông cúc để tạo đường sọc dọc hack gầy.',
          'Tận dụng ưu thế chân thon bằng chân váy chữ A midi hoặc quần ống đứng thanh lịch.',
          'Chọn áo cổ chữ V thoáng hoặc vạt chéo (Wrap top) nhấn chân ngực.'
        ],
        avoidList: [
          'Tránh chất liệu quá bó sát vào vòng 2 hoặc vải bóng bắt sáng ở bụng.',
          'Hạn chế thắt lưng to bản siết chặt ngay vùng eo giữa.'
        ]
      };
    case 'rectangle':
      return {
        title: 'Dáng Chữ Nhật (Thước kẻ, 3 vòng chênh lệch ít)',
        doList: [
          'Tạo ảo giác thắt eo bằng cách sơ vin (Tuck-in) kết hợp thắt lưng thanh mảnh.',
          'Thử nghiệm áo croptop phối với quần cạp cao để ngắt tỉ lệ eo rõ ràng.',
          'Tạo độ phồng tự nhiên ở thân trên hoặc dưới bằng váy xếp ly, áo tay bồng.'
        ],
        avoidList: [
          'Tránh trang phục suông thẳng đuột từ trên xuống dưới không có điểm nhấn eo.',
          'Tránh cổ áo vuông quá cứng nhắc.'
        ]
      };
    case 'hourglass':
    default:
      return {
        title: 'Dáng Đồng Hồ Cát (Eo thon, ngực và hông cân đối)',
        doList: [
          'Tôn vinh vòng eo con kiến bằng đầm chiết eo, croptop và thắt lưng da.',
          'Quần cạp cao ống suông hoặc quần tây xếp ly tôn trọn vòng 3 quyến rũ.',
          'Trang phục ôm vừa vặn (tailored fit) làm nổi bật đường cong cơ thể.'
        ],
        avoidList: [
          'Tránh mặc đồ oversize quá khổ từ đầu đến chân che mất đường cong eo.',
          'Tránh chất liệu quá thô cứng làm mất đi sự mềm mại tự nhiên.'
        ]
      };
  }
}

export function getHeightHackAdvice(heightCm: number): string[] {
  if (heightCm < 158) {
    return [
      'Công thức 1/3 - 2/3 thần thánh: Chiều dài áo chỉ nên chiếm 1/3 tổng thể, 2/3 còn lại dành cho quần/váy cạp cao.',
      'Sơ vin vạt trước hoặc toàn bộ giúp đẩy tỷ lệ đôi chân dài miên man thêm 5-8cm.',
      'Ưu tiên giày mũi nhọn hoặc sneaker có phần đế độn tinh tế 3-4cm, đồng màu với quần.',
      'Tránh chia cơ thể thành nhiều khúc màu ngang; áp dụng quy tắc Monochrome (cùng tone màu) từ trên xuống dưới.'
    ];
  } else if (heightCm <= 168) {
    return [
      'Chiều cao lý tưởng: Dễ dàng áp dụng quy tắc "Trên ôm dưới rộng" hoặc "Trên rộng dưới ôm".',
      'Độ dài quần chạm mắt cá chân hoặc gót giày kết hợp giày mũi thon tạo dáng thanh lịch.',
      'Tự do biến tấu các lớp áo khoác dáng lửng (Crop jacket) hoặc dáng vừa ngang hông.'
    ];
  } else {
    return [
      'Lợi thế vóc dáng siêu mẫu: Tự tin diện quần tây Wide-leg quét đất và áo khoác dáng dài Trench Coat qua bắp chân.',
      'Thử sức với phong cách Menswear, Oversized Blazer quyền lực mà không sợ bị "nuốt dáng".',
      'Có thể thoải mái phối giày bệt (Loafer, Mary Jane, Sneaker cổ điển) mà vẫn toát lên khí chất thời thượng.'
    ];
  }
}

export function evaluateOutfitSuitability(
  items: { top?: ClothingItem; bottom?: ClothingItem; outerwear?: ClothingItem; shoes?: ClothingItem; accessories: ClothingItem[] },
  weather: WeatherCondition,
  profile: BodyProfile
): {
  weatherSuitability: { score: number; verdict: string; advice: string };
  bodySuitability: { score: number; verdict: string; proportionTips: string[] };
  colorHarmony: { score: number; paletteType: string; explanation: string };
  overallScore: number;
  stylistVerdict: string;
  stylingHacks: string[];
} {
  const chosenList = [items.top, items.bottom, items.outerwear, items.shoes, ...items.accessories].filter(Boolean) as ClothingItem[];

  if (chosenList.length === 0) {
    return {
      weatherSuitability: { score: 50, verdict: 'Chưa có trang phục', advice: 'Hãy chọn ít nhất áo và quần trong tủ đồ.' },
      bodySuitability: { score: 50, verdict: 'Chưa có trang phục', proportionTips: [] },
      colorHarmony: { score: 50, paletteType: 'Chưa rõ', explanation: 'Chọn thêm đồ để chấm điểm màu sắc.' },
      overallScore: 50,
      stylistVerdict: 'Hãy chọn các món đồ để bắt đầu phân tích outfit.',
      stylingHacks: []
    };
  }

  // 1. Weather calculation
  let targetWarmth = 2;
  if (weather.temp >= 30) targetWarmth = 1;
  else if (weather.temp >= 24) targetWarmth = 2;
  else if (weather.temp >= 19) targetWarmth = 3;
  else if (weather.temp >= 14) targetWarmth = 4;
  else targetWarmth = 5;

  const avgWarmth = chosenList.reduce((acc, it) => acc + it.warmthLevel, 0) / chosenList.length;
  const warmthDiff = Math.abs(avgWarmth - targetWarmth);
  let weatherScore = Math.max(50, Math.round(100 - warmthDiff * 16));

  let weatherVerdict = 'Rất phù hợp với tiết trời hiện tại';
  let weatherAdvice = `Nhiệt độ ${weather.temp}°C (${weather.description}): Độ dày chất liệu và số lớp áo mang lại cảm giác thoải mái nhất.`;

  if (weather.condition === 'rainy' || weather.rainProbability > 60) {
    const hasBootsOrDark = chosenList.some(i => i.category === 'shoes' && (i.subCategory === 'Boots' || i.colorHex.toLowerCase().includes('dark')));
    if (!hasBootsOrDark) {
      weatherScore -= 8;
      weatherAdvice += ' Chú ý: Trời mưa nên cân nhắc thay bằng giày da bít mũi hoặc quần tối màu để tránh vấy bẩn.';
    } else {
      weatherAdvice += ' Lựa chọn tuyệt vời với trang phục giữ phom sạch sẽ khi di chuyển dưới trời mưa.';
    }
  }

  if (weather.temp > 28 && items.outerwear && items.outerwear.warmthLevel >= 3) {
    weatherScore -= 15;
    weatherVerdict = 'Hơi nóng bức';
    weatherAdvice = `Trời khá oi nóng (${weather.temp}°C), bạn có thể chỉ khoác hờ áo khoác ngoài hoặc đổi sang sơ mi mỏng nhẹ.`;
  } else if (weather.temp < 18 && !items.outerwear && avgWarmth < 3) {
    weatherScore -= 18;
    weatherVerdict = 'Cần thêm áo ấm';
    weatherAdvice = `Trời lạnh ${weather.temp}°C, nên bổ sung một chiếc áo khoác Blazer, Trench Coat hoặc Cardigan để bảo vệ sức khỏe.`;
  }

  // 2. Body Silhouette calculation
  let bodyScore = 85;
  const proportionTips: string[] = [];

  const hasHighWaist = items.bottom?.fit === 'high_waist' || items.bottom?.fit === 'wide_leg';
  const hasCroppedOrSlimTop = items.top?.fit === 'cropped' || items.top?.fit === 'slim';
  const hasBelt = items.accessories.some(a => a.subCategory === 'Thắt lưng');

  if (profile.height < 160) {
    if (hasHighWaist || hasCroppedOrSlimTop || hasBelt) {
      bodyScore += 8;
      proportionTips.push('Cạp cao và thắt lưng nâng cao đường eo giúp kéo dài chân đáng kể cho chiều cao ' + profile.height + 'cm.');
    } else {
      bodyScore -= 6;
      proportionTips.push('Nên sơ vin vạt áo hoặc thêm thắt lưng để chia lại tỷ lệ 1/3 thân trên - 2/3 chân.');
    }
  } else {
    proportionTips.push('Chiều cao ' + profile.height + 'cm mặc phom này toát lên vẻ thanh thoát và cân đối.');
  }

  if (profile.bodyShape === 'pear') {
    if (items.bottom?.subCategory === 'Quần tây' || items.bottom?.subCategory === 'Chân váy' || items.bottom?.fit === 'wide_leg') {
      bodyScore += 5;
      proportionTips.push('Phần dưới suông rộng che khuyết điểm hông đùi cực chuẩn cho dáng quả lê.');
    }
  } else if (profile.bodyShape === 'apple') {
    if (items.outerwear) {
      bodyScore += 5;
      proportionTips.push('Áo khoác thả suông hai bên sườn tạo đường sọc dọc che giấu vòng eo rất tự nhiên.');
    }
  }

  bodyScore = Math.min(98, Math.max(65, bodyScore));
  const bodyVerdict = bodyScore >= 88 ? 'Tỉ lệ cực tôn dáng & giấu khuyết điểm' : 'Tỉ lệ hài hòa, thanh lịch';

  // 3. Color Harmony calculation
  const colors = chosenList.map(i => i.colorName);
  let colorScore = 90;
  let paletteType = 'Đồng điệu Thanh Lịch (Neutral & Earth Tone)';
  let colorExplanation = 'Sự kết hợp giữa các tông màu trung tính sang trọng, không lo lỗi mốt và tôn mọi sắc thái da.';

  const isMonochrome = colors.every(c => c.includes('Đen') || c.includes('Trắng') || c.includes('Be') || c.includes('Nâu'));
  if (isMonochrome) {
    colorScore = 95;
    paletteType = 'Minimalist Luxury (Quiet Luxury)';
    colorExplanation = 'Bảng màu tối giản kinh điển mang lại cảm giác chỉn chu, sạch sẽ và thời thượng.';
  }

  // Overall score
  const overallScore = Math.round(weatherScore * 0.35 + bodyScore * 0.45 + colorScore * 0.2);

  const stylingHacks = [
    'Xắn nhẹ gấu tay áo khoác hoặc sơ mi để lộ phần cổ tay thon thả tạo cảm giác người gầy hơn 2kg.',
    'Nhấn một điểm sáng với phụ kiện kim loại nhỏ (khóa túi, đồng hồ hoặc khuyên tai).',
    ...proportionTips.slice(0, 2)
  ];

  return {
    weatherSuitability: { score: weatherScore, verdict: weatherVerdict, advice: weatherAdvice },
    bodySuitability: { score: bodyScore, verdict: bodyVerdict, proportionTips },
    colorHarmony: { score: colorScore, paletteType, explanation: colorExplanation },
    overallScore,
    stylistVerdict: `Bộ trang phục đạt ${overallScore}/100 điểm. ${weatherVerdict} và ${bodyVerdict.toLowerCase()}.`,
    stylingHacks
  };
}

export function generateSmartOutfit(
  wardrobe: ClothingItem[],
  weather: WeatherCondition,
  profile: BodyProfile,
  occasion: OccasionType
): Outfit {
  const tops = wardrobe.filter(i => i.category === 'top');
  const bottoms = wardrobe.filter(i => i.category === 'bottom');
  const outers = wardrobe.filter(i => i.category === 'outerwear');
  const shoes = wardrobe.filter(i => i.category === 'shoes');
  const accessories = wardrobe.filter(i => i.category === 'accessories');

  // Filter based on weather & occasion
  let preferredTop = tops.find(t => t.occasions.includes(occasion)) || tops[0];
  let preferredBottom = bottoms.find(b => b.occasions.includes(occasion)) || bottoms[0];
  let preferredOuter: ClothingItem | undefined = undefined;
  let preferredShoes = shoes.find(s => s.occasions.includes(occasion)) || shoes[0];
  const chosenAccessories: ClothingItem[] = [];

  // Weather logic:
  if (weather.temp < 22) {
    preferredOuter = outers.find(o => o.warmthLevel >= 3) || outers[0];
  } else if (weather.temp <= 26 && (occasion === 'work' || occasion === 'formal')) {
    preferredOuter = outers.find(o => o.warmthLevel <= 3);
  }

  if (weather.condition === 'rainy') {
    const rainShoes = shoes.find(s => s.subCategory === 'Boots' || s.subCategory === 'Loafer');
    if (rainShoes) preferredShoes = rainShoes;
  }

  // Height hack priority:
  if (profile.height < 162) {
    const highWaistBottom = bottoms.find(b => b.fit === 'high_waist');
    if (highWaistBottom) preferredBottom = highWaistBottom;
    const belt = accessories.find(a => a.subCategory === 'Thắt lưng');
    if (belt) chosenAccessories.push(belt);
  }

  const bag = accessories.find(a => a.subCategory === 'Túi xách');
  if (bag) chosenAccessories.push(bag);

  const evaluation = evaluateOutfitSuitability(
    { top: preferredTop, bottom: preferredBottom, outerwear: preferredOuter, shoes: preferredShoes, accessories: chosenAccessories },
    weather,
    profile
  );

  const occasionTitleMap: Record<OccasionType, string> = {
    work: 'Thanh lịch Công sở & Họp mặt',
    casual: 'Dạo phố Thảnh thơi & Cafe cuối tuần',
    dating: 'Hẹn hò Lãng mạn & Tinh tế',
    formal: 'Dự tiệc & Sự kiện Sang trọng',
    travel: 'Du lịch Năng động & Chụp ảnh đẹp',
    sport: 'Thể thao & Hoạt động Ngoài trời'
  };

  return {
    id: `outfit-${Date.now()}`,
    title: occasionTitleMap[occasion] || 'Outfit Thời Thượng Hôm Nay',
    top: preferredTop,
    bottom: preferredBottom,
    outerwear: preferredOuter,
    shoes: preferredShoes,
    accessories: chosenAccessories,
    overallScore: evaluation.overallScore,
    weatherSuitability: evaluation.weatherSuitability,
    bodySuitability: evaluation.bodySuitability,
    colorHarmony: evaluation.colorHarmony,
    stylistVerdict: evaluation.stylistVerdict,
    stylingHacks: evaluation.stylingHacks,
    occasion,
    createdAt: new Date().toISOString()
  };
}
