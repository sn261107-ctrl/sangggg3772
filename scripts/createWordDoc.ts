import {
  Document,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
  AlignmentType,
  HeadingLevel,
  BorderStyle,
  ShadingType,
  VerticalAlign,
} from 'docx';
import fs from 'fs';
import path from 'path';

async function generateWordDoc() {
  const publicDir = path.resolve(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const tableRows = [
    // Header Row
    new TableRow({
      tableHeader: true,
      children: [
        new TableCell({
          width: { size: 18, type: WidthType.PERCENTAGE },
          shading: { type: ShadingType.CLEAR, fill: '2D3748' },
          verticalAlign: VerticalAlign.CENTER,
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: 'THỜI GIAN',
                  bold: true,
                  color: 'FFFFFF',
                  size: 20,
                  font: 'Arial',
                }),
              ],
            }),
          ],
        }),
        new TableCell({
          width: { size: 44, type: WidthType.PERCENTAGE },
          shading: { type: ShadingType.CLEAR, fill: '2D3748' },
          verticalAlign: VerticalAlign.CENTER,
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: 'THOẠI NHÂN VẬT',
                  bold: true,
                  color: 'FFFFFF',
                  size: 20,
                  font: 'Arial',
                }),
              ],
            }),
          ],
        }),
        new TableCell({
          width: { size: 38, type: WidthType.PERCENTAGE },
          shading: { type: ShadingType.CLEAR, fill: '2D3748' },
          verticalAlign: VerticalAlign.CENTER,
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: 'BỐI CẢNH & HÀNH ĐỘNG',
                  bold: true,
                  color: 'FFFFFF',
                  size: 20,
                  font: 'Arial',
                }),
              ],
            }),
          ],
        }),
      ],
    }),

    // Row 1
    new TableRow({
      children: [
        new TableCell({
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({ text: '00:00 - 00:25\n', bold: true, size: 20, font: 'Arial' }),
                new TextRun({ text: '(25 giây)', italics: true, size: 18, color: '718096', font: 'Arial' }),
              ],
            }),
          ],
        }),
        new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({ text: 'Linh: ', bold: true, color: 'C53030', font: 'Arial' }),
                new TextRun({ text: '(Ngồi phịch xuống ghế, thở dài thượt) ', italics: true, color: '4A5568', font: 'Arial' }),
                new TextRun({ text: 'Ê Mai, tao đau đầu quá mày ơi! Tối nay đi tiệc sinh nhật mà nãy giờ lướt tìm đồ muốn nổ cái đầu vẫn thấy... không có gì để mặc!\n\n', font: 'Arial' }),
                new TextRun({ text: 'Mai: ', bold: true, color: '2B6CB0', font: 'Arial' }),
                new TextRun({ text: '(Chỉ tay vào đống túi hàng Shopee Linh vừa đặt lên bàn, cười khẩy) ', italics: true, color: '4A5568', font: 'Arial' }),
                new TextRun({ text: 'Mày bớt than lại giùm tao! Đồ mày săn sale đặt trên Shopee quá trời còn chưa bận hết kìa, cái đống gói hàng kia nguyên tem chưa bóc hết luôn mà mở miệng ra là bảo "không có gì mặc"?!', font: 'Arial' }),
              ],
            }),
          ],
        }),
        new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({ text: 'Cảnh 1: Bàn cafe ngoài trời (Terrace sân vườn)\n', bold: true, color: '2D3748', font: 'Arial' }),
                new TextRun({ text: '- Góc quay trung: Bàn cafe xinh xắn dưới tán cây xanh, gió thổi nhẹ lá rơi lãng mạn.\n', font: 'Arial' }),
                new TextRun({ text: '- Trên bàn có 3-4 gói hàng bọc nilon đen đặc trưng của Shopee chưa bóc hết.\n', font: 'Arial' }),
                new TextRun({ text: '- Linh mặt ủ rũ, bấm điện thoại liên tục tìm đồ.\n', font: 'Arial' }),
                new TextRun({ text: '- Mai nhấp ngụm trà sữa, trêu chọc nhìn đống gói hàng.', font: 'Arial' }),
              ],
            }),
          ],
        }),
      ],
    }),

    // Row 2
    new TableRow({
      children: [
        new TableCell({
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({ text: '00:25 - 00:50\n', bold: true, size: 20, font: 'Arial' }),
                new TextRun({ text: '(25 giây)', italics: true, size: 18, color: '718096', font: 'Arial' }),
              ],
            }),
          ],
        }),
        new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({ text: 'Linh: ', bold: true, color: 'C53030', font: 'Arial' }),
                new TextRun({ text: '(Gãi đầu phân trần) ', italics: true, color: '4A5568', font: 'Arial' }),
                new TextRun({ text: 'Thì... thấy mẫu trên mạng mặc đẹp nên tao bấm mua, tới hồi ship về khui ra chả biết phối cái đầm này với áo khoác nào! Chưa kể người tao thì lùn, chân ngắn, mặc sai là nhìn như khúc giò liền. Đã vậy trời chiều nay còn tự dưng trở gió lạnh nữa chứ!\n\n', font: 'Arial' }),
                new TextRun({ text: 'Mai: ', bold: true, color: '2B6CB0', font: 'Arial' }),
                new TextRun({ text: 'Đưa điện thoại đây! Để tao khai sáng cho mày một bí kíp, biến toàn bộ đống đồ Shopee mày mua thành cả trăm set đồ chuẩn Fashionista trong 1 nốt nhạc!', font: 'Arial' }),
              ],
            }),
          ],
        }),
        new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({ text: 'Cảnh 2: Linh đưa điện thoại cho Mai\n', bold: true, color: '2D3748', font: 'Arial' }),
                new TextRun({ text: '- Linh đẩy gói hàng Shopee sang một bên, đưa điện thoại cho bạn.\n', font: 'Arial' }),
                new TextRun({ text: '- Mai lấy điện thoại của mình ra áp sát lại, mở ứng dụng thời trang GUSTYLE với biểu tượng logo chữ G ánh kim sang trọng và giao diện mượt mà.', font: 'Arial' }),
              ],
            }),
          ],
        }),
      ],
    }),

    // Row 3
    new TableRow({
      children: [
        new TableCell({
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({ text: '00:50 - 01:20\n', bold: true, size: 20, font: 'Arial' }),
                new TextRun({ text: '(30 giây)', italics: true, size: 18, color: '718096', font: 'Arial' }),
              ],
            }),
          ],
        }),
        new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({ text: 'Linh: ', bold: true, color: 'C53030', font: 'Arial' }),
                new TextRun({ text: '(Nhìn màn hình kinh ngạc) ', italics: true, color: '4A5568', font: 'Arial' }),
                new TextRun({ text: 'App gì mà nhìn xịn xò như lookbook tạp chí vậy mày?\n\n', font: 'Arial' }),
                new TextRun({ text: 'Mai: ', bold: true, color: '2B6CB0', font: 'Arial' }),
                new TextRun({ text: 'Đây là Tủ Đồ Số Cá Nhân! Mày thấy không, app tự phân loại từng món rành mạch: Đầm liền, Áo sơ mi, Quần tây, Chân váy, Áo khoác đến Giày dép, Túi xách.\n\n', font: 'Arial' }),
                new TextRun({ text: 'Linh: ', bold: true, color: 'C53030', font: 'Arial' }),
                new TextRun({ text: 'Nhưng đồ tao mới săn trên Shopee về thì đưa vào đây kiểu gì?\n\n', font: 'Arial' }),
                new TextRun({ text: 'Mai: ', bold: true, color: '2B6CB0', font: 'Arial' }),
                new TextRun({ text: 'Đơn giản cực! Mày chỉ cần lấy ảnh chụp mẫu từ đơn Shopee hoặc chụp đồ thật của mày up lên. Bấm dấu cộng là nó lưu ngay vào tủ đồ số cá nhân. Từ nay đi đâu, ngồi cafe hay văn phòng cũng biết rõ mình đang sở hữu món gì, khỏi mua trùng hay bỏ quên đồ dưới đáy tủ!', font: 'Arial' }),
              ],
            }),
          ],
        }),
        new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({ text: 'Cảnh 3: Thao tác tính năng Tủ Đồ Số (Digital Wardrobe)\n', bold: true, color: '2D3748', font: 'Arial' }),
                new TextRun({ text: '- Cận cảnh màn hình điện thoại (Screen Recording):\n', font: 'Arial' }),
                new TextRun({ text: '+ Lướt qua các tab: Đầm, Áo, Quần, Áo khoác...\n', font: 'Arial' }),
                new TextRun({ text: '+ Mai lấy chiếc áo blazer vừa khui trong gói Shopee ra, chụp 1 tấm rồi bấm tải ảnh lên app.\n', font: 'Arial' }),
                new TextRun({ text: '+ Ứng dụng tự động nhận diện và lưu vào danh mục "Áo khoác" với ghi chú chất liệu dạ mỏng.', font: 'Arial' }),
              ],
            }),
          ],
        }),
      ],
    }),

    // Row 4
    new TableRow({
      children: [
        new TableCell({
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({ text: '01:20 - 01:55\n', bold: true, size: 20, font: 'Arial' }),
                new TextRun({ text: '(35 giây)', italics: true, size: 18, color: '718096', font: 'Arial' }),
              ],
            }),
          ],
        }),
        new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({ text: 'Linh: ', bold: true, color: 'C53030', font: 'Arial' }),
                new TextRun({ text: 'Công nhận tiện! Nhưng người tao có 1m55 à, nặng 50kg, bắp chân hơi to. Đồ mua Shopee về không có stylist tư vấn là mặc bị dìm chiều cao dữ lắm...\n\n', font: 'Arial' }),
                new TextRun({ text: 'Mai: ', bold: true, color: '2B6CB0', font: 'Arial' }),
                new TextRun({ text: 'Mày vào tab Hồ sơ Vóc dáng này: Nhập chiều cao 1m55, cân nặng 50kg, chọn dáng người Quả Lê.\n\n', font: 'Arial' }),
                new TextRun({ text: 'Linh: ', bold: true, color: 'C53030', font: 'Arial' }),
                new TextRun({ text: '(Bất ngờ) ', italics: true, color: '4A5568', font: 'Arial' }),
                new TextRun({ text: 'Ồ, nó tự tính chỉ số BMI rồi đưa ra cẩm nang "Nên mặc - Nên tránh" cho tạng người tao luôn kìa!\n\n', font: 'Arial' }),
                new TextRun({ text: 'Mai: ', bold: true, color: '2B6CB0', font: 'Arial' }),
                new TextRun({ text: 'Chưa hết đâu, nhìn lên góc trên này: App tự cập nhật thời tiết thực tế thành phố hôm nay: Hà Nội 21°C, trời trở gió se lạnh. Hệ thống sẽ kết hợp thời tiết 21°C với chiều cao 1m55 để lọc ra set đồ ấm vừa vặn và hack tỷ lệ chân dài 1/3 - 2/3!', font: 'Arial' }),
              ],
            }),
          ],
        }),
        new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({ text: 'Cảnh 4: Thiết lập Số đo cơ thể & Widget Thời tiết\n', bold: true, color: '2D3748', font: 'Arial' }),
                new TextRun({ text: '- Cận cảnh màn hình điện thoại:\n', font: 'Arial' }),
                new TextRun({ text: '+ Kéo thanh Chiều cao: 155 cm, Cân nặng: 50 kg.\n', font: 'Arial' }),
                new TextRun({ text: '+ Đồng hồ đo BMI nhảy về chỉ số chuẩn, hiển thị dáng Quả Lê.\n', font: 'Arial' }),
                new TextRun({ text: '+ Widget thời tiết hiển thị "21°C · Gió mùa se lạnh".\n', font: 'Arial' }),
                new TextRun({ text: '+ App hiển thị quy tắc hack dáng: cạp cao che hông to, tránh quần lửng cắt khúc chân.', font: 'Arial' }),
              ],
            }),
          ],
        }),
      ],
    }),

    // Row 5
    new TableRow({
      children: [
        new TableCell({
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({ text: '01:55 - 02:30\n', bold: true, size: 20, font: 'Arial' }),
                new TextRun({ text: '(35 giây)', italics: true, size: 18, color: '718096', font: 'Arial' }),
              ],
            }),
          ],
        }),
        new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({ text: 'Linh: ', bold: true, color: 'C53030', font: 'Arial' }),
                new TextRun({ text: 'Hay dã man! Thế tối nay tao đi tiệc sinh nhật ở rooftop lộng gió thì bảo AI phối sao?\n\n', font: 'Arial' }),
                new TextRun({ text: 'Mai: ', bold: true, color: '2B6CB0', font: 'Arial' }),
                new TextRun({ text: 'Bấm vào nút "AI Stylist", chọn dịp là "Dự tiệc / Sinh nhật". Nhìn con AI nó phối từ chính đống đồ Shopee mày có nè!\n\n', font: 'Arial' }),
                new TextRun({ text: 'Linh: ', bold: true, color: 'C53030', font: 'Arial' }),
                new TextRun({ text: '(Trầm trồ mắt sáng rực) ', italics: true, color: '4A5568', font: 'Arial' }),
                new TextRun({ text: 'Ôi mẹ ơi đỉnh thật! Nó chọn đúng chiếc đầm đen chữ A cạp cao tao mới khui, phối kèm chiếc Blazer màu be tao mua tuần trước! Thêm cả đôi boot da cổ thấp chống lạnh nữa!\n\n', font: 'Arial' }),
                new TextRun({ text: 'Mai: ', bold: true, color: '2B6CB0', font: 'Arial' }),
                new TextRun({ text: 'Mày đọc lời khuyên của Stylist nè: "Nhiệt độ 21°C nhiều gió, khoác blazer ngoài đầm vừa ấm vừa che bắp tay, đầm cạp cao phối boot gót 5cm giúp chân trông dài miên man thêm 6cm". Điểm tổng thể: 97/100 điểm!', font: 'Arial' }),
              ],
            }),
          ],
        }),
        new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({ text: 'Cảnh 5: Trải nghiệm AI Stylist phối đồ thần tốc\n', bold: true, color: '2D3748', font: 'Arial' }),
                new TextRun({ text: '- Cận cảnh màn hình: Hiệu ứng quét đồ tủ cá nhân trong chớp mắt.\n', font: 'Arial' }),
                new TextRun({ text: '- Hiển thị nguyên set outfit phối hoàn chỉnh: Đầm đen midi + Blazer be dáng suông + Boot da + Túi xách đeo chéo.\n', font: 'Arial' }),
                new TextRun({ text: '- Bảng phân tích chi tiết: Độ ấm thời tiết 96%, Điểm tôn dáng 98%, cùng mẹo xắn nhẹ tay blazer khoe cổ tay thanh mảnh.', font: 'Arial' }),
              ],
            }),
          ],
        }),
      ],
    }),

    // Row 6
    new TableRow({
      children: [
        new TableCell({
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({ text: '02:30 - 02:45\n', bold: true, size: 20, font: 'Arial' }),
                new TextRun({ text: '(15 giây)', italics: true, size: 18, color: '718096', font: 'Arial' }),
              ],
            }),
          ],
        }),
        new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({ text: 'Linh: ', bold: true, color: 'C53030', font: 'Arial' }),
                new TextRun({ text: '(Cười tít mắt) ', italics: true, color: '4A5568', font: 'Arial' }),
                new TextRun({ text: 'Quá xuất sắc! Đúng set đồ tao cần luôn! Tao bấm nút "Thả tim" này để lưu lại đúng không?\n\n', font: 'Arial' }),
                new TextRun({ text: 'Mai: ', bold: true, color: '2B6CB0', font: 'Arial' }),
                new TextRun({ text: 'Bấm thả tim là lưu vào Lookbook Yêu Thích. Mày còn có thể xếp lịch mặc cho cả tuần từ Thứ 2 đến Chủ nhật luôn. Mỗi sáng khỏi đứng ngẩn ngơ trước gương nữa!', font: 'Arial' }),
              ],
            }),
          ],
        }),
        new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({ text: 'Cảnh 6: Thao tác Yêu thích & Lên lịch tuần\n', bold: true, color: '2D3748', font: 'Arial' }),
                new TextRun({ text: '- Ngón tay Linh bấm biểu tượng Trái tim / Bookmark.\n', font: 'Arial' }),
                new TextRun({ text: '- Set đồ được chuyển ngay vào tab Lookbook và tự động ghim vào mục "Tối nay - Thứ Bảy".', font: 'Arial' }),
              ],
            }),
          ],
        }),
      ],
    }),

    // Row 7
    new TableRow({
      children: [
        new TableCell({
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({ text: '02:45 - 03:00\n', bold: true, size: 20, font: 'Arial' }),
                new TextRun({ text: '(15 giây)', italics: true, size: 18, color: '718096', font: 'Arial' }),
              ],
            }),
          ],
        }),
        new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({ text: 'Linh: ', bold: true, color: 'C53030', font: 'Arial' }),
                new TextRun({ text: '(Gom vội đống gói hàng Shopee, đứng bật dậy) ', italics: true, color: '4A5568', font: 'Arial' }),
                new TextRun({ text: 'Trời ơi cưng xỉu! Vậy là đống đồ Shopee này hữu dụng hết chứ không hề phí một xu nào! Tao về nhà diện ngay set này tối nay đi tiệc đây!\n\n', font: 'Arial' }),
                new TextRun({ text: 'Mai: ', bold: true, color: '2B6CB0', font: 'Arial' }),
                new TextRun({ text: '(Cười rạng rỡ, nhìn thẳng ống kính) ', italics: true, color: '4A5568', font: 'Arial' }),
                new TextRun({ text: 'Đó, phụ nữ đâu thiếu đồ, chỉ thiếu một app thời trang thông minh thấu hiểu vóc dáng và thời tiết thôi! Tải GUSTYLE liền đi các nàng ơi!', font: 'Arial' }),
              ],
            }),
          ],
        }),
        new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({ text: 'Cảnh 7: Kết thúc vui tươi & Kêu gọi hành động (CTA)\n', bold: true, color: '2D3748', font: 'Arial' }),
                new TextRun({ text: '- Linh ôm đống đồ Shopee cười tươi rói vẫy tay chào bạn.\n', font: 'Arial' }),
                new TextRun({ text: '- Mai ngồi tại quán cafe mỉm cười tự tin nhìn vào camera, giơ điện thoại hiển thị giao diện app GUSTYLE.\n', font: 'Arial' }),
                new TextRun({ text: '- Xuất hiện màn hình Outro với logo chữ G chuyển màu pastel: "GUSTYLE — Phối Đồ Thông Minh Theo Vóc Dáng & Thời Tiết".', font: 'Arial' }),
              ],
            }),
          ],
        }),
      ],
    }),
  ];

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            heading: HeadingLevel.TITLE,
            children: [
              new TextRun({
                text: 'KỊCH BẢN QUẢNG BÁ ỨNG DỤNG THỜI TRANG GUSTYLE',
                bold: true,
                size: 28,
                color: '1A202C',
                font: 'Arial',
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: 'Chủ đề: Cứu Cánh Tủ Đồ Săn Sale Shopee Cùng AI Stylist\n',
                italics: true,
                size: 22,
                color: '4A5568',
                font: 'Arial',
              }),
              new TextRun({
                text: 'Thời lượng: 03 phút (00:00 - 03:00) | Định dạng: 3 Cột Chuẩn Điện Ảnh / TVC Viral',
                bold: true,
                size: 20,
                color: '2B6CB0',
                font: 'Arial',
              }),
            ],
          }),
          new Paragraph({ text: '' }), // blank line

          // Description box
          new Paragraph({
            children: [
              new TextRun({ text: '1. Bối cảnh chính: ', bold: true, font: 'Arial' }),
              new TextRun({ text: 'Quán cafe sân vườn ngoài trời (Terrace không gian mở, ánh sáng tự nhiên).\n', font: 'Arial' }),
              new TextRun({ text: '2. Đạo cụ: ', bold: true, font: 'Arial' }),
              new TextRun({ text: '3-4 bọc hàng gói nilon đen đặc trưng của Shopee, điện thoại thông minh cài app GUSTYLE, 2 ly nước cafe/trà sữa.\n', font: 'Arial' }),
              new TextRun({ text: '3. Nhân vật: \n', bold: true, font: 'Arial' }),
              new TextRun({ text: '   • Linh (24 tuổi): ', bold: true, color: 'C53030', font: 'Arial' }),
              new TextRun({ text: 'Nghiện săn sale Shopee, hay than thở "không có gì để mặc", tự ti chiều cao 1m55, đùi to.\n', font: 'Arial' }),
              new TextRun({ text: '   • Mai (24 tuổi): ', bold: true, color: '2B6CB0', font: 'Arial' }),
              new TextRun({ text: 'Bạn thân sành điệu, người dùng trung thành của GUSTYLE, gu ăn mặc tôn dáng và hợp thời tiết.\n', font: 'Arial' }),
              new TextRun({ text: '4. Các tính năng cốt lõi được quảng bá: \n', bold: true, font: 'Arial' }),
              new TextRun({ text: '   - Tủ đồ số cá nhân hóa: Chụp ảnh đồ Shopee tải lên lưu trữ, phân loại Đầm, Quần, Áo...\n', font: 'Arial' }),
              new TextRun({ text: '   - Thiết lập số đo vóc dáng: Chiều cao 1m55, cân nặng 50kg, dáng quả lê để nhận quy tắc hack dáng 1/3 - 2/3.\n', font: 'Arial' }),
              new TextRun({ text: '   - Tự động nhận diện thời tiết thành phố: Hà Nội 21°C se lạnh nhiều gió.\n', font: 'Arial' }),
              new TextRun({ text: '   - AI Stylist phối đồ thông minh theo dịp (Dự tiệc / Sinh nhật) chỉ trong 1 giây.\n', font: 'Arial' }),
              new TextRun({ text: '   - Lưu bộ phối vào Lookbook yêu thích & Lên lịch mặc cả tuần.', font: 'Arial' }),
            ],
          }),
          new Paragraph({ text: '' }), // blank line

          // The 3-Column Table
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: tableRows,
          }),

          new Paragraph({ text: '' }), // blank line
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: '--- HẾT KỊCH BẢN (GUSTYLE FASHION APP 2026) ---',
                bold: true,
                size: 18,
                color: '718096',
                font: 'Arial',
              }),
            ],
          }),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  const outputPath = path.resolve(publicDir, 'Kich_Ban_GUSTYLE_3_Phut.docx');
  fs.writeFileSync(outputPath, buffer);
  console.log(`Successfully generated Word file at: ${outputPath}`);
}

generateWordDoc().catch(console.error);
