# ViAdverNLI Dashboard 🇻🇳

> **Bộ dữ liệu Fact-checking & Suy luận ngôn ngữ tự nhiên đối kháng tiếng Việt**

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/fox2920s-projects/v0-data-analysis-task)
[![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

## 📋 Tổng quan

**ViAdverNLI Dashboard** là một ứng dụng phân tích toàn diện cho bộ dữ liệu **ViAdverNLI** - bộ dữ liệu fact-checking và suy luận ngôn ngữ tự nhiên đối kháng đầu tiên cho tiếng Việt. Dashboard này cung cấp insights chi tiết về hiệu suất của các mô hình AI trên dữ liệu đối kháng.

### 🎯 Đặc điểm nổi bật

- **21,262 mẫu dữ liệu** được tạo qua 3 rounds đối kháng
- **Độ khó tăng dần**: R1 (Cơ bản) → R2 (Nâng cao) → R3 (Cao cấp)
- **Fleiss' Kappa**: 2/3 rounds > 0.80 (R1: 0.8052, R2: 0.8138, R3: 0.7539)
- **Thử thách khó nhất**: SOTA chỉ đạt 58% accuracy (thấp nhất trong các NLI dataset tiếng Việt)

## 🏗️ Kiến trúc Dự án

```
ViAdverNLI/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Dashboard chính (21,000+ dòng)
│   ├── layout.tsx         # Layout chung
│   └── globals.css        # Styles tùy chỉnh
├── components/            # UI Components (shadcn/ui)
├── public/               # Static assets
├── docs/                 # Tài liệu phân tích
│   ├── comparison_report.md
│   ├── viadvernli_analysis.md
│   └── finetune_hyperparameters_summary.md
└── README.md
```

## 📊 Dữ liệu Phân tích

### Datasets được đánh giá

- **ViAdverNLI** (R1, R2, R3): 5,347 + 5,961 + 9,954 mẫu
- **ViNLI**: Natural Language Inference tiếng Việt
- **ViWikiFC**: Wikipedia Fact-Checking tiếng Việt
- **ViFactCheck**: Fact-checking từ báo chí
- **ISE-DSC01**: Shared task fact-checking

### Mô hình được đánh giá

- **Pre-trained Language Models**: mBERT, PhoBERT, XLM-R
- **Large Language Models**: GPT-4o, Claude-3.5, Gemini-Pro
- **Prompting Methods**: Zero-shot, Few-shot, Chain-of-Thought

## 🚀 Khởi chạy

### Yêu cầu hệ thống

- Node.js 18.17 trở lên
- npm hoặc pnpm

### Cài đặt và chạy

```bash
# Clone repository
git clone https://github.com/your-username/ViAdverNLI.git
cd ViAdverNLI

# Cài đặt dependencies
npm install
# hoặc
pnpm install

# Chạy development server
npm run dev
# hoặc
pnpm dev

# Build production
npm run build
npm start
```

Mở [http://localhost:3000](http://localhost:3000) để xem dashboard.

## 📈 Tính năng Dashboard

### 🔍 7 Tab Phân tích Chính

1. **Tổng quan**: Giới thiệu dự án, so sánh datasets
2. **Phân tích Dữ liệu**: Thống kê, phân bố, nguồn gốc
3. **Hiệu suất Mô hình**: Performance comparison, confusion matrix
4. **Cấu hình Huấn luyện**: Hyperparameters, training setup
5. **Điểm yếu Mô hình**: Error analysis, failure cases
6. **Insights**: Xu hướng, thách thức, phát hiện
7. **Khuyến nghị**: Best practices, recommendations

### 📊 Visualizations

- **Interactive Charts**: Bar, Pie, Line charts (Recharts)
- **Performance Matrices**: Confusion matrices, error analysis
- **Comparison Tables**: Model vs dataset performance
- **Trend Analysis**: Adversarial training impact

## 🎨 Giao diện & UX

### Design System

- **Design**: Modern, clean, professional
- **Colors**: Blue gradient theme, semantic colors
- **Typography**: Inter font family, optimized for Vietnamese
- **Icons**: Lucide React icons
- **Responsiveness**: Mobile-first design

### Tính năng UX

- **Expand/Collapse**: Long text content
- **Interactive Tooltips**: Chart hover effects
- **Smooth Animations**: Tailwind CSS animations
- **Custom Scrollbars**: Enhanced scrolling experience
- **Loading States**: Shimmer effects

## 🔬 Insights Chính

### 📊 Performance Ranking

1. **XLM-R Large**: 84.5% (ISE-DSC01) - Tốt nhất overall
2. **PhoBERT Large**: 74.24% (ViFactCheck) - Tốt nhất cho tiếng Việt
3. **mBERT**: 70.49% (ViWikiFC) - Baseline mạnh

### 🎯 Adversarial Impact

- **ViA1**: 27% → 42% (sau adversarial training)
- **ViA2**: 0% → 54% (cải thiện đáng kể)
- **ViA3**: 0% → 58% (breakthrough)

### ⚠️ Challenges

- **Label Bias**: Mô hình thiên vị nhãn NEI
- **Context Understanding**: Khó khăn với context dài
- **Reasoning**: Yếu ở logical reasoning

## 📚 Tài liệu Tham khảo

- [ViAdverNLI Paper](./docs/viadvernli_analysis.md)
- [Comparison Report](./docs/comparison_report.md)
- [Hyperparameters Summary](./docs/finetune_hyperparameters_summary.md)
- [Dataset Comparison](./So%20sánh%20các%20bộ%20dữ%20liệu%20Fact-checking%20và%20Suy%20luận%20ngôn%20ngữ%20tự%20nhiên%20tiếng%20Việt.pdf)

## 🛠️ Công nghệ Sử dụng

### Frontend

- **Framework**: Next.js 15.2.4 (App Router)
- **Language**: TypeScript 5.0
- **Styling**: Tailwind CSS 3.4
- **UI Components**: shadcn/ui (Radix UI)
- **Charts**: Recharts
- **Icons**: Lucide React

### Development

- **Package Manager**: npm/pnpm
- **Linting**: ESLint
- **Formatting**: Prettier (implied)
- **Deployment**: Vercel

## 🚧 Roadmap

### Ngắn hạn (1-3 tháng)

- [ ] Thêm Dark Mode
- [ ] Export functionality (PDF/Excel)
- [ ] Advanced filtering options
- [ ] Performance optimization

### Dài hạn (3-6 tháng)

- [ ] ViAdverNLI R4 với GPT-4o
- [ ] Multi-language support
- [ ] API endpoints
- [ ] Real-time model comparison

## 🤝 Đóng góp

Chúng tôi hoan nghênh mọi đóng góp! Hãy:

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## 📄 License

Dự án này được phân phối dưới MIT License. Xem `LICENSE` để biết thêm thông tin.

## 👥 Team

**ViAdverNLI Research Team**

- 🏗️ **Architecture**: Next.js + TypeScript + Tailwind CSS
- 📊 **Data Analysis**: Comprehensive model evaluation
- 🎨 **UI/UX**: Modern dashboard design
- 📚 **Documentation**: Detailed analysis reports

---

<p align="center">
  <strong>🇻🇳 Made with ❤️ for Vietnamese NLP Community</strong>
</p>

<p align="center">
  <a href="https://vercel.com/fox2920s-projects/v0-data-analysis-task">🚀 Live Demo</a> •
  <a href="./docs/viadvernli_analysis.md">📖 Documentation</a> •
  <a href="#-đóng-góp">🤝 Contribute</a>
</p>
