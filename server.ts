import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize GoogleGenAI SDK with required telemetry header
const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({
  apiKey: apiKey || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// API Route: AI Stylist Outfit Recommendation
app.post('/api/ai-stylist', async (req, res) => {
  try {
    const { profile, weather, occasion, wardrobe } = req.body;

    if (!apiKey) {
      return res.status(200).json({
        isAiGenerated: false,
        message: 'Chạy chế độ thuật toán cục bộ thông minh (API key chưa cấu hình).',
        recommendation: null,
      });
    }

    const prompt = `
Bạn là Giám đốc Sáng tạo Thời trang & Chuyên gia Phối đồ cá nhân (Haute Couture Fashion Stylist).
Hãy phân tích hồ sơ vóc dáng và thời tiết sau để chọn ra bộ trang phục đẹp nhất từ danh sách tủ đồ của người dùng:

[HỒ SƠ KHÁCH HÀNG]:
- Chiều cao: ${profile.height} cm
- Cân nặng: ${profile.weight} kg
- Giới tính: ${profile.gender}
- Dáng người: ${profile.bodyShape}
- Tỷ lệ cơ thể: ${profile.torsoProportion}
- Sắc tố da: ${profile.skinTone}
- Phong cách mong muốn: ${profile.stylePreference}
- Mục tiêu: ${profile.targetStyleGoal}

[THỜI TIẾT THỰC TẾ]:
- Thành phố: ${weather.city}
- Nhiệt độ: ${weather.temp}°C (Cảm giác như ${weather.feelsLike}°C)
- Tình trạng: ${weather.condition} (${weather.description})
- Độ ẩm: ${weather.humidity}%, Khả năng mưa: ${weather.rainProbability}%

[DỊP XUẤT HIỆN]: ${occasion}

[DANH SÁCH MÓN ĐỒ TRONG TỦ ĐỒ HIỆN TẠI]:
${JSON.stringify(
  wardrobe.map((item: any) => ({
    id: item.id,
    name: item.name,
    category: item.category,
    color: item.colorName,
    material: item.material,
    warmthLevel: item.warmthLevel,
    fit: item.fit,
  })),
  null,
  2
)}

HÃY CHỌN:
1 món áo (topId), 1 món quần/váy (bottomId), 1 món áo khoác nếu thời tiết cần (outerwearId - để null nếu trời quá nóng), 1 đôi giày (shoesId), và 1-2 phụ kiện (accessoryIds).
Đồng thời đưa ra:
- Lời khuyên hack dáng cụ thể cho chiều cao ${profile.height}cm và cân nặng ${profile.weight}kg (tỷ lệ 1/3-2/3, cách sơ vin, chọn cạp cao, xắn tay áo).
- Nhận định về tính thích ứng với nhiệt độ ${weather.temp}°C và thời tiết.
- Điểm đánh giá (0-100) cho tổng thể, thời tiết và tôn dáng.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: 'Bạn là chuyên gia thời trang cao cấp người Việt, am hiểu tỷ lệ cơ thể và thời tiết nhiệt đới cũng như ôn đới. Luôn trả lời định dạng JSON hợp lệ.',
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: 'Tên bộ phối đồ sang trọng' },
            topId: { type: Type.STRING, description: 'ID áo đã chọn' },
            bottomId: { type: Type.STRING, description: 'ID quần/váy đã chọn' },
            outerwearId: { type: Type.STRING, description: 'ID áo khoác (hoặc chuỗi rỗng)' },
            shoesId: { type: Type.STRING, description: 'ID giày đã chọn' },
            accessoryIds: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Danh sách ID phụ kiện',
            },
            overallScore: { type: Type.NUMBER, description: 'Điểm tổng thể từ 0 đến 100' },
            weatherSuitability: {
              type: Type.OBJECT,
              properties: {
                score: { type: Type.NUMBER },
                verdict: { type: Type.STRING },
                advice: { type: Type.STRING },
              },
              required: ['score', 'verdict', 'advice'],
            },
            bodySuitability: {
              type: Type.OBJECT,
              properties: {
                score: { type: Type.NUMBER },
                verdict: { type: Type.STRING },
                proportionTips: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
              },
              required: ['score', 'verdict', 'proportionTips'],
            },
            stylistVerdict: { type: Type.STRING, description: 'Lời bình của Stylist' },
            stylingHacks: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: '3 mẹo phối đồ hack chiều cao & che khuyết điểm',
            },
          },
          required: ['title', 'topId', 'bottomId', 'shoesId', 'overallScore', 'stylistVerdict', 'stylingHacks'],
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({
      isAiGenerated: true,
      recommendation: parsed,
    });
  } catch (error: any) {
    console.error('Error in AI Stylist endpoint:', error?.message || error);
    return res.status(200).json({
      isAiGenerated: false,
      message: 'Lỗi gọi AI, tự động chuyển về bộ máy thuật toán tạo mẫu.',
      recommendation: null,
    });
  }
});

// API Route: Download Word Script
app.get('/api/download-script', (_req, res) => {
  const filePath = path.resolve(__dirname, 'public', 'Kich_Ban_GUSTYLE_3_Phut.docx');
  res.download(filePath, 'Kich_Ban_GUSTYLE_3_Phut.docx');
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`AtelierFit server running on http://localhost:${PORT}`);
  });
}

startServer();
