"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"
import {
  Brain,
  Database,
  TrendingUp,
  Shield,
  Target,
  Zap,
  BookOpen,
  Award,
  AlertTriangle,
  CheckCircle,
  XCircle,
  HelpCircle,
} from "lucide-react"

// Data for charts
const roundsData = [
  {
    round: "R1",
    model: "mBERT",
    trainingData: "ViNLI + ViWikiFC",
    samples: 5347,
    supported: 41.1,
    refuted: 37.6,
    nei: 21.3,
    difficulty: "Cơ bản",
    kappa: 0.8097,
  },
  {
    round: "R2",
    model: "PhoBERT",
    trainingData: "ViNLI + ViWikiFC + ViFactCheck + ViA1",
    samples: 5961,
    supported: 30.2,
    refuted: 30.9,
    nei: 39.0,
    difficulty: "Nâng cao",
    kappa: 0.8099,
  },
  {
    round: "R3",
    model: "XLM-R",
    trainingData: "ViNLI + ViWikiFC + ViFactCheck + ViA1 + ViA2 + ISE-DSC01",
    samples: 9954,
    supported: 31.2,
    refuted: 31.9,
    nei: 36.9,
    difficulty: "Cao cấp",
    kappa: 0.8099,
  },
]

const performanceData = [
  { dataset: "ViA1", mBERT: 24.32, PhoBERT: 26.62, "XLM-R": 42.01, difficulty: "Khó" },
  { dataset: "ViA2", mBERT: 49.19, PhoBERT: 45.16, "XLM-R": 53.83, difficulty: "Rất khó" },
  { dataset: "ViA3", mBERT: 31.99, PhoBERT: 33.09, "XLM-R": 57.65, difficulty: "Cực khó" },
  { dataset: "ViNLI", mBERT: 70.01, PhoBERT: 72.82, "XLM-R": 79.67, difficulty: "Dễ" },
  { dataset: "ViWikiFC", mBERT: 70.49, PhoBERT: 72.21, "XLM-R": 79.24, difficulty: "Dễ" },
  { dataset: "ViFactCheck", mBERT: 55.91, PhoBERT: 53.56, "XLM-R": 62.26, difficulty: "Vừa" },
  { dataset: "ISE-DSC01", mBERT: 70.33, PhoBERT: 71.11, "XLM-R": 84.5, difficulty: "Vừa" },
]

const weaknessData = [
  {
    model: "mBERT",
    round: "R1",
    totalSamples: 5347,
    incorrectPredictions: 3347,
    errorRate: 62.6,
    mainWeakness: "Thiên vị mạnh về nhãn NEI",
    supportedError: 92.03,
    refutedError: 84.95,
    neiError: 33.19,
    bestLabel: "NEI",
    worstLabel: "SUPPORTED",
  },
  {
    model: "PhoBERT",
    round: "R2",
    totalSamples: 5961,
    incorrectPredictions: 2837,
    errorRate: 47.59,
    mainWeakness: "Khó nhận diện nhãn NEI",
    supportedError: 33.82,
    refutedError: 42.61,
    neiError: 80.54,
    bestLabel: "SUPPORTED",
    worstLabel: "NEI",
  },
  {
    model: "XLM-R",
    round: "R3",
    totalSamples: 9954,
    incorrectPredictions: 4777,
    errorRate: 47.99,
    mainWeakness: "Quá thận trọng, thiên vị NEI",
    supportedError: 64.01,
    refutedError: 69.74,
    neiError: 13.5,
    bestLabel: "NEI",
    worstLabel: "REFUTED",
  },
]

const confusionMatrixData = {
  mBERT: [
    { actual: "SUPPORTED", predicted: "SUPPORTED", count: 175, percentage: 7.97 },
    { actual: "SUPPORTED", predicted: "REFUTED", count: 178, percentage: 8.11 },
    { actual: "SUPPORTED", predicted: "NEI", count: 1842, percentage: 83.92 },
    { actual: "REFUTED", predicted: "SUPPORTED", count: 163, percentage: 8.1 },
    { actual: "REFUTED", predicted: "REFUTED", count: 303, percentage: 15.05 },
    { actual: "REFUTED", predicted: "NEI", count: 1547, percentage: 76.85 },
    { actual: "NEI", predicted: "SUPPORTED", count: 184, percentage: 16.15 },
    { actual: "NEI", predicted: "REFUTED", count: 194, percentage: 17.03 },
    { actual: "NEI", predicted: "NEI", count: 761, percentage: 66.81 },
  ],
  PhoBERT: [
    { actual: "SUPPORTED", predicted: "SUPPORTED", count: 1190, percentage: 66.18 },
    { actual: "SUPPORTED", predicted: "REFUTED", count: 428, percentage: 23.8 },
    { actual: "SUPPORTED", predicted: "NEI", count: 180, percentage: 10.01 },
    { actual: "REFUTED", predicted: "SUPPORTED", count: 605, percentage: 32.88 },
    { actual: "REFUTED", predicted: "REFUTED", count: 1056, percentage: 57.39 },
    { actual: "REFUTED", predicted: "NEI", count: 179, percentage: 9.73 },
    { actual: "NEI", predicted: "SUPPORTED", count: 1110, percentage: 47.78 },
    { actual: "NEI", predicted: "REFUTED", count: 761, percentage: 32.76 },
    { actual: "NEI", predicted: "NEI", count: 452, percentage: 19.46 },
  ],
  "XLM-R": [
    { actual: "SUPPORTED", predicted: "SUPPORTED", count: 1117, percentage: 35.99 },
    { actual: "SUPPORTED", predicted: "REFUTED", count: 264, percentage: 8.51 },
    { actual: "SUPPORTED", predicted: "NEI", count: 1723, percentage: 55.51 },
    { actual: "REFUTED", predicted: "SUPPORTED", count: 282, percentage: 8.88 },
    { actual: "REFUTED", predicted: "REFUTED", count: 961, percentage: 30.26 },
    { actual: "REFUTED", predicted: "NEI", count: 1933, percentage: 60.86 },
    { actual: "NEI", predicted: "SUPPORTED", count: 301, percentage: 8.19 },
    { actual: "NEI", predicted: "REFUTED", count: 195, percentage: 5.31 },
    { actual: "NEI", predicted: "NEI", count: 3178, percentage: 86.5 },
  ],
}

const errorTypeData = [
  { model: "mBERT", errorType: "SUPPORTED → NEI", count: 1842, percentage: 55.0 },
  { model: "mBERT", errorType: "REFUTED → NEI", count: 1547, percentage: 46.2 },
  { model: "mBERT", errorType: "NEI → REFUTED", count: 194, percentage: 5.8 },
  { model: "mBERT", errorType: "NEI → SUPPORTED", count: 184, percentage: 5.5 },
  { model: "PhoBERT", errorType: "NEI → SUPPORTED", count: 1110, percentage: 39.1 },
  { model: "PhoBERT", errorType: "NEI → REFUTED", count: 761, percentage: 26.8 },
  { model: "PhoBERT", errorType: "REFUTED → SUPPORTED", count: 605, percentage: 21.3 },
  { model: "PhoBERT", errorType: "SUPPORTED → REFUTED", count: 428, percentage: 15.1 },
  { model: "XLM-R", errorType: "REFUTED → NEI", count: 1933, percentage: 40.5 },
  { model: "XLM-R", errorType: "SUPPORTED → NEI", count: 1723, percentage: 36.1 },
  { model: "XLM-R", errorType: "NEI → SUPPORTED", count: 301, percentage: 6.3 },
  { model: "XLM-R", errorType: "NEI → REFUTED", count: 195, percentage: 4.1 },
]

const adversarialImpact = [
  { round: "Baseline", ViA1: 27.27, ViA2: 0, ViA3: 0, ISE_DSC01: 76.01 },
  { round: "R1 (+ViA1)", ViA1: 42.01, ViA2: 0, ViA3: 0, ISE_DSC01: 77.26 },
  { round: "R2 (+ViA2)", ViA1: 39.39, ViA2: 45.9, ViA3: 0, ISE_DSC01: 81.58 },
  { round: "R3 (+ViA3)", ViA1: 44.23, ViA2: 53.83, ViA3: 57.65, ISE_DSC01: 81.01 },
]

const detailedPerformanceData = [
  {
    round: 1,
    model: "mBERT",
    trainingData: "ViNLI+ViWikiFC",
    ViA1: 24.32,
    ViA2: 49.19,
    ViA3: 31.99,
    ViNLI: 70.01,
    ViWikiFC: 70.49,
    ViFactCheck: 55.91,
    "ISE-DSC01(public)": 70.33,
    "ISE-DSC01(private)": 69.16,
  },
  {
    round: 1,
    model: "mBERT",
    trainingData: "ViNLI+ViWikiFC + ViA1",
    ViA1: 40.54,
    ViA2: 37.57,
    ViA3: 43.34,
    ViNLI: 69.27,
    ViWikiFC: 70.92,
    ViFactCheck: 55.56,
    "ISE-DSC01(public)": 65.1,
    "ISE-DSC01(private)": 67.18,
  },
  {
    round: 1,
    model: "PhoBERT_large",
    trainingData: "ViNLI+ViWikiFC",
    ViA1: 26.62,
    ViA2: 45.16,
    ViA3: 33.09,
    ViNLI: 72.82,
    ViWikiFC: 72.21,
    ViFactCheck: 53.56,
    "ISE-DSC01(public)": 71.11,
    "ISE-DSC01(private)": 67.79,
  },
  {
    round: 1,
    model: "PhoBERT_large",
    trainingData: "ViNLI+ViWikiFC + ViA1",
    ViA1: 40.05,
    ViA2: 36.36,
    ViA3: 41.85,
    ViNLI: 73.19,
    ViWikiFC: 73.74,
    ViFactCheck: 58.47,
    "ISE-DSC01(public)": 72.74,
    "ISE-DSC01(private)": 69.5,
  },
  {
    round: 1,
    model: "XLM-R large",
    trainingData: "ViNLI+ViWikiFC",
    ViA1: 27.27,
    ViA2: 49.4,
    ViA3: 30.23,
    ViNLI: 78.77,
    ViWikiFC: 79.24,
    ViFactCheck: 57.84,
    "ISE-DSC01(public)": 76.01,
    "ISE-DSC01(private)": 71.66,
  },
  {
    round: 1,
    model: "XLM-R large",
    trainingData: "ViNLI+ViWikiFC + ViA1",
    ViA1: 42.01,
    ViA2: 43.01,
    ViA3: 43.28,
    ViNLI: 79.67,
    ViWikiFC: 79.24,
    ViFactCheck: 62.26,
    "ISE-DSC01(public)": 77.26,
    "ISE-DSC01(private)": 74.76,
  },
  {
    round: 2,
    model: "mBERT",
    trainingData: "ViNLI+ViWikiFC+ViFactCheck+ViA1",
    ViA1: 38.66,
    ViA2: 39.05,
    ViA3: 42.95,
    ViNLI: 69.41,
    ViWikiFC: 69.58,
    ViFactCheck: 59.99,
    "ISE-DSC01(public)": 70.23,
    "ISE-DSC01(private)": 69.23,
  },
  {
    round: 2,
    model: "mBERT",
    trainingData: "ViNLI+ViWikiFC+ViFactCheck+ViA1+ViA2",
    ViA1: 39.72,
    ViA2: 48.12,
    ViA3: 47.63,
    ViNLI: 68.3,
    ViWikiFC: 69.49,
    ViFactCheck: 57.57,
    "ISE-DSC01(public)": 66.52,
    "ISE-DSC01(private)": 70.44,
  },
  {
    round: 2,
    model: "PhoBERT_large",
    trainingData: "ViNLI+ViWikiFC+ViFactCheck+ViA1",
    ViA1: 40.46,
    ViA2: 37.23,
    ViA3: 44.0,
    ViNLI: 73.89,
    ViWikiFC: 71.59,
    ViFactCheck: 74.24,
    "ISE-DSC01(public)": 74.55,
    "ISE-DSC01(private)": 71.37,
  },
  {
    round: 2,
    model: "PhoBERT_large",
    trainingData: "ViNLI+ViWikiFC+ViFactCheck+ViA1+ViA2",
    ViA1: 36.36,
    ViA2: 41.94,
    ViA3: 47.41,
    ViNLI: 72.72,
    ViWikiFC: 71.07,
    ViFactCheck: 62.47,
    "ISE-DSC01(public)": 76.32,
    "ISE-DSC01(private)": 74.05,
  },
  {
    round: 2,
    model: "XLM-R large",
    trainingData: "ViNLI+ViWikiFC+ViFactCheck+ViA1",
    ViA1: 40.38,
    ViA2: 41.26,
    ViA3: 40.47,
    ViNLI: 79.27,
    ViWikiFC: 79.87,
    ViFactCheck: 65.58,
    "ISE-DSC01(public)": 77.35,
    "ISE-DSC01(private)": 76.15,
  },
  {
    round: 2,
    model: "XLM-R large",
    trainingData: "ViNLI+ViWikiFC+ViFactCheck+ViA1+ViA2",
    ViA1: 39.39,
    ViA2: 45.9,
    ViA3: 48.18,
    ViNLI: 78.84,
    ViWikiFC: 78.86,
    ViFactCheck: 66.69,
    "ISE-DSC01(public)": 81.58,
    "ISE-DSC01(private)": 79.56,
  },
  {
    round: 3,
    model: "mBERT",
    trainingData: "ViNLI+ViWikiFC+ViFactCheck+ViA1+ViA2+ISE-DSC01(train)",
    ViA1: 36.36,
    ViA2: 47.31,
    ViA3: 46.75,
    ViNLI: 69.51,
    ViWikiFC: 68.72,
    ViFactCheck: 58.81,
    "ISE-DSC01(public)": 76.93,
    "ISE-DSC01(private)": 71.07,
  },
  {
    round: 3,
    model: "mBERT",
    trainingData: "ViNLI+ViWikiFC+ViFactCheck+ViA1+ViA2+ISE-DSC01(train)+ViA3",
    ViA1: 40.79,
    ViA2: 49.8,
    ViA3: 60.63,
    ViNLI: 70.34,
    ViWikiFC: 69.73,
    ViFactCheck: 58.12,
    "ISE-DSC01(public)": 75.91,
    "ISE-DSC01(private)": 70.92,
  },
  {
    round: 3,
    model: "PhoBERT_large",
    trainingData: "ViNLI+ViWikiFC+ViFactCheck+ViA1+ViA2+ISE-DSC01(train)",
    ViA1: 34.15,
    ViA2: 49.26,
    ViA3: 41.52,
    ViNLI: 73.05,
    ViWikiFC: 72.45,
    ViFactCheck: 61.02,
    "ISE-DSC01(public)": 83.19,
    "ISE-DSC01(private)": 76.35,
  },
  {
    round: 3,
    model: "PhoBERT_large",
    trainingData: "ViNLI+ViWikiFC+ViFactCheck+ViA1+ViA2+ISE-DSC01(train)+ViA3",
    ViA1: 36.36,
    ViA2: 49.8,
    ViA3: 57.54,
    ViNLI: 71.41,
    ViWikiFC: 71.11,
    ViFactCheck: 60.01,
    "ISE-DSC01(public)": 80.91,
    "ISE-DSC01(private)": 75.7,
  },
  {
    round: 3,
    model: "XLM-R large",
    trainingData: "ViNLI+ViWikiFC+ViFactCheck+ViA1+ViA2+ISE-DSC01(train)",
    ViA1: 40.87,
    ViA2: 51.21,
    ViA3: 44.55,
    ViNLI: 78.17,
    ViWikiFC: 78.29,
    ViFactCheck: 65.72,
    "ISE-DSC01(public)": 84.5,
    "ISE-DSC01(private)": 79.3,
  },
  {
    round: 3,
    model: "XLM-R large",
    trainingData: "ViNLI+ViWikiFC+ViFactCheck+ViA1+ViA2+ISE-DSC01(train)+ViA3",
    ViA1: 44.23,
    ViA2: 53.83,
    ViA3: 57.65,
    ViNLI: 77.38,
    ViWikiFC: 78.44,
    ViFactCheck: 62.47,
    "ISE-DSC01(public)": 81.01,
    "ISE-DSC01(private)": 77.04,
  },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

const errorExamples = {
  mBERT: [
    {
      type: "SUPPORTED → NEI",
      context:
        "Có kế hoạch cưới vào đầu năm sau, anh Minh Trí (31 tuổi, làm việc tại Bình Thạnh) đã đặt cọc căn hộ ở Dĩ An. Anh chọn dự án The Infinity, nằm cạnh Vincom Plaza, cách Thủ Đức khoảng 10-15 phút di chuyển. Với mức thu nhập dao động 35-40 triệu đồng mỗi tháng, anh Trí cho rằng đây là lựa chọn hợp lý khi chủ đầu tư có chính sách hỗ trợ thanh toán giãn tiến độ 0,5% mỗi tháng. Vì mua nhà lần đầu, anh Trí ưu tiên dự án có pháp lý rõ ràng, đủ điều kiện mở bán theo quy định như The Infinity nhằm hạn chế rủi ro chậm bàn giao. Bên cạnh đó, dự án còn nằm trong khu phức hợp Charm City - khu đô thị đã vận hành ổn định tại trung tâm Dĩ An.",
      claim:
        "Anh Minh Trí, người đang có kế hoạch kết hôn và mong muốn sở hữu ngôi nhà đầu tiên trước khi chào đón thành viên mới, đã quyết định lựa chọn The Infinity vì chính sách thanh toán linh hoạt 0,5% mỗi tháng cùng vị trí thuận tiện, nằm trong khu đô thị vận hành ổn định Charm City tại Dĩ An, nơi cách trung tâm Thủ Đức chỉ 15 phút di chuyển, đảm bảo an toàn pháp lý theo quy định.",
      evidence:
        "Bên cạnh đó, dự án còn nằm trong khu phức hợp Charm City - khu đô thị đã vận hành ổn định tại trung tâm Dĩ An.",
      trueLabel: "SUPPORTED",
      predictedLabel: "NEI",
      analysis:
        "mBERT không thể kết nối thông tin từ nhiều phần khác nhau của context để xác nhận claim. Mô hình chỉ tập trung vào evidence được trích dẫn mà không xem xét toàn bộ context, dẫn đến việc bỏ qua các thông tin quan trọng khác như chính sách thanh toán 0,5% mỗi tháng, thời gian di chuyển đến Thủ Đức, và tính pháp lý của dự án.",
    },
    {
      type: "REFUTED → NEI",
      context:
        'Trước 19h: Ăn tối đúng cách, ngủ ngon và kiểm soát cân nặng Ăn tối muộn ảnh hưởng đến việc tiết melatonin, hormone giúp ngủ ngon, từ đó làm giảm chất lượng giấc ngủ. Thiếu ngủ kéo dài có thể liên quan đến nguy cơ tăng cân. Ngoài ra, cơ thể vào ban đêm có xu hướng tích lũy năng lượng thay vì tiêu hao, dẫn đến dư thừa calo nếu ăn tối quá trễ hoặc quá nhiều. Theo bác sĩ Trương, nên ăn tối trước 19h và đảm bảo dạ dày có ít nhất 3 đến 4 tiếng để tiêu hóa trước khi ngủ. Áp dụng nguyên tắc "no 7 phần": 50% rau không tinh bột (bông cải xanh, nấm), 30% protein chất lượng (cá hấp, đậu phụ), 20% tinh bột có chỉ số đường huyết thấp (cơm gạo lứt, khoai lang). Chế biến bằng cách luộc, hấp hoặc làm salad để giảm dầu mỡ. Hạn chế các món chiên xào hoặc nhiều gia vị gây khó tiêu.',
      claim:
        "Theo nghiên cứu của bác sĩ Trương, việc tiêu thụ thực phẩm giàu protein sau 20 giờ sẽ giúp cơ thể tăng cường trao đổi chất, tránh tích tụ mỡ thừa, vì cơ thể vào ban đêm chuyển hóa năng lượng hiệu quả hơn so với ban ngày.",
      evidence:
        "Ngoài ra, cơ thể vào ban đêm có xu hướng tích lũy năng lượng thay vì tiêu hao, dẫn đến dư thừa calo nếu ăn tối quá trễ hoặc quá nhiều.",
      trueLabel: "REFUTED",
      predictedLabel: "NEI",
      analysis:
        "mBERT không nhận ra mâu thuẫn trực tiếp giữa claim và evidence/context. Claim nói rằng 'cơ thể vào ban đêm chuyển hóa năng lượng hiệu quả hơn so với ban ngày' và 'việc tiêu thụ thực phẩm giàu protein sau 20 giờ sẽ giúp cơ thể tăng cường trao đổi chất', trong khi evidence nói rõ 'cơ thể vào ban đêm có xu hướng tích lũy năng lượng thay vì tiêu hao' và context khuyên 'nên ăn tối trước 19h'.",
    },
  ],
  PhoBERT: [
    {
      type: "NEI → SUPPORTED",
      context:
        'Với sự tin tưởng và kỳ vọng vào thành công của một nhiệm kỳ mới, năm nay, T.Ư Hội Liên hiệp thanh niên Việt Nam tiếp tục phối hợp cùng TCP Việt Nam tổ chức chuỗi Ngày hội Thanh niên công nhân năm 2025 với chủ đề Thanh niên công nhân - Lan tỏa năng lượng tích cực. "Chúng tôi mong rằng các ngày hội sôi nổi ý nghĩa như ngày hôm nay sẽ được nhân rộng trong tất cả các cấp bộ Hội trên cả nước để chúng ta có thể thực hiện thật tốt vai trò người bạn đồng hành và tổ chức Hội sẽ thực sự là mái nhà chung của các bạn thanh niên công nhân", anh Lâm nói. Thanh niên công nhân biểu diễn sôi nổi cùng ca sĩ Đông Hùng tại đêm nhạc hội ẢNH: ĐĂNG HẢI Tặng quà thanh niên công nhân Tại đêm nhạc, hàng nghìn thanh niên công nhân được thưởng thức những tiết mục đặc sắc và tham gia giao lưu với các ca sĩ, nghệ sĩ trẻ. Dịp này, T.Ư Hội Liên hiệp thanh niên Việt Nam đã trao tặng 20 phần quà cho thanh niên công nhân có hoàn cảnh khó khăn, mỗi phần quà trị giá 1 triệu đồng.',
      claim:
        "Trong sự kiện 'Lan tỏa năng lượng tích cực' tại Ngày hội Thanh niên công nhân năm 2025, TCP Việt Nam đã trao tặng 1 triệu đồng cho 20 thanh niên có hoàn cảnh khó khăn và một số phần thưởng đặc biệt như xe máy cho các cá nhân xuất sắc.",
      evidence:
        "Dịp này, T.Ư Hội Liên hiệp thanh niên Việt Nam đã trao tặng 20 phần quà cho thanh niên công nhân có hoàn cảnh khó khăn, mỗi phần quà trị giá 1 triệu đồng. Với sự tin tưởng và kỳ vọng vào thành công của một nhiệm kỳ mới, năm nay, T.Ư Hội Liên hiệp thanh niên Việt Nam tiếp tục phối hợp cùng TCP Việt Nam tổ chức chuỗi Ngày hội Thanh niên công nhân năm 2025 với chủ đề Thanh niên công nhân - Lan tỏa năng lượng tích cực. Thanh niên công nhân biểu diễn sôi nổi cùng ca sĩ Đông Hùng tại đêm nhạc hội ẢNH: ĐĂNG HẢI Tặng quà thanh niên công nhân Tại đêm nhạc, hàng nghìn thanh niên công nhân được thưởng thức những tiết mục đặc sắc và tham gia giao lưu với các ca sĩ, nghệ sĩ trẻ.",
      trueLabel: "NEI",
      predictedLabel: "SUPPORTED",
      analysis:
        "PhoBERT sai lầm khi kết luận claim được hỗ trợ bởi evidence, mặc dù evidence không đề cập đến một số thông tin quan trọng trong claim: Evidence nói rằng 'T.Ư Hội Liên hiệp thanh niên Việt Nam đã trao tặng 20 phần quà', trong khi claim nói 'TCP Việt Nam đã trao tặng'. Không có thông tin về 'một số phần thưởng đặc biệt như xe máy cho các cá nhân xuất sắc'.",
    },
    {
      type: "REFUTED → SUPPORTED",
      context:
        "Tỉ lệ chọi vào lớp 10 của 109 trường tại TP.HCM 14/05/2025 13:25 (PLO)- Trong 109 trường, Trường THCS và THPT Trần Đại Nghĩa có tỉ lệ chọi vào lớp 10 cao nhất với 1/2,91. Trưa 14-5, Sở GD&ĐT TP.HCM công bố số lượng nguyện vọng 1 của 109 trường THPT công lập. Học sinh lớp 9 Trường THCS Quang Trung, quận Gò Vấp trong 1 giờ học.",
      claim:
        "Theo công bố của Sở GD&ĐT TP.HCM ngày 14-5, Trường THCS và THPT Trần Đại Nghĩa đạt tỉ lệ chọi vào lớp 10 là 1/3,15, cao nhất trong số 109 trường.",
      evidence:
        "Tỉ lệ chọi vào lớp 10 của 109 trường tại TP.HCM 14/05/2025 13:25 (PLO)- Trong 109 trường, Trường THCS và THPT Trần Đại Nghĩa có tỉ lệ chọi vào lớp 10 cao nhất với 1/2,91.",
      trueLabel: "REFUTED",
      predictedLabel: "SUPPORTED",
      analysis:
        "PhoBERT không nhận ra sự khác biệt quan trọng giữa claim và evidence. Claim nói rằng tỉ lệ chọi là '1/3,15', trong khi evidence nói rõ là '1/2,91'. Mô hình đã bỏ qua sự khác biệt về con số cụ thể này và chỉ tập trung vào phần 'cao nhất trong số 109 trường' mà cả hai đều đề cập.",
    },
  ],
  "XLM-R": [
    {
      type: "SUPPORTED → NEI",
      context:
        'Bài này nói về nước ngọt có trong tự nhiên. Xin xem thêm Nước ngọt (định hướng). Nước ngọt hay nước nhạt là loại nước chứa một lượng tối thiểu các muối hòa tan, đặc biệt là natri chloride (thường có nồng độ các loại muối hay còn gọi là độ mặn trong khoảng 0,01-0,5 ppt hoặc tới 1 ppt), vì thế nó được phân biệt tương đối rõ ràng với nước lợ hay các loại nước mặn và nước muối. (Xem thêm Độ mặn hay độ muối). Tất cả các nguồn nước ngọt có xuất phát điểm là từ các cơn mưa được tạo ra do sự ngưng tụ tối hạn của hơi nước trong không khí, rơi xuống ao, hồ, sông của mặt đất cũng như trong các nguồn nước ngầm hoặc do sự tan chảy của băng hay tuyết (xem thêm Vòng tuần hoàn nước). Sự cung cấp đủ lượng nước ngọt cần thiết để duy trì sự sống là một vấn đề đáng báo động đối với nhiều loài sinh vật, trong đó có con người, đặc biệt là ở các khu vực sa mạc hay các khu vực khô cằn khác. Xem thêm nguồn nước. Thậm chí trên tàu thuyền hay trên các đảo giữa đại dương vẫn có hiện tượng "thiếu nước", điều đó có nghĩa là sự thiếu hụt nước ngọt chứ không phải thiếu nước nói chung do nước biển là nước mặn và không thể sử dụng trực tiếp để uống. Đối với các loài cá và các loài sinh vật khác sinh sống dưới nước thì nồng độ của natri chloride hòa tan trong nước là một yếu tố quan trọng cho sự sống của chúng. Phần lớn các loài không thể sống trong cả nước ngọt lẫn nước mặn, mặc dù có một số loài có thể sống trong cả hai môi trường. Cá nước mặn sinh sống chủ yếu ở các vùng nước mặn có độ chứa muối cao và chúng cố gắng thải các loại muối ra khỏi cơ thể nhiều đến mức có thể đồng thời với việc giữ lại nước. Cá nước ngọt thì làm việc ngược lại: Chúng có quá nhiều nước và có rất ít muối.',
      claim: "Nước ngọt, bao gồm nước từ mưa và băng tan, vẫn là yếu tố sống còn cho nhiều sinh vật, kể cả con người.",
      evidence:
        "Đối với các loài cá và các loài sinh vật khác sinh sống dưới nước thì nồng độ của natri chloride hòa tan trong nước là một yếu tố quan trọng cho sự sống của chúng.",
      trueLabel: "SUPPORTED",
      predictedLabel: "NEI",
      analysis:
        "XLM-R không thể kết nối thông tin từ nhiều phần của context để xác nhận claim. Các thông tin rõ ràng hỗ trợ claim rằng 'nước ngọt là yếu tố sống còn cho nhiều sinh vật, kể cả con người', nhưng XLM-R không thể tổng hợp chúng để đưa ra kết luận chính xác. Mô hình quá thận trọng và chọn nhãn NEI thay vì SUPPORTED.",
    },
    {
      type: "REFUTED → NEI",
      context:
        "Phần lớn các động vật phức tạp hơn sứa và các động vật cnidaria khác được chia thành 2 nhóm, Protostomia và Deuterostomia, và Động vật có dây sống thuộc nhóm Deuterostomia. Có thể Kimberella có tuổi 555 triệu năm là thành viên thuộc nhánh Protostomia. Nếu vậy, các nhánh Protostomia và Deuterostomia phải tách ra vào thời điểm trước Kimberella ít nhất 558 triệu năm, và do đó trước khi bắt đầu kỷ Cambri. Ernietta hóa thạch Ediacara có tuổi 549-543 triệu năm có thể là đại diện của Deuterostomia. Các hóa thạch của một nhóm chính Deuterostomia, Echinodermata (các thành viên hiện đại của nhóm này gồm sao biển, hải sâm huệ biển) thì khá phổ biến vào đầu kỷ Cambri (542 triệu năm). Hóa thạch Rhabdotubus johansoni thuộc Giữa Kỷ Cambri đã được phân tích thuộc nhóm Pterobranch Hemichordata. Các ý kiến khác nhau về liệu hóa thạch Yunnanozoon thuộc hệ động vật Chengjiang có từ Cambri sớm là Hemichordata hay Chordata. Một hóa thạch khác là Haikouella lanceolata cũng từ Chengjiang được phân tích là một loài thuộc ngành Chordata và có thể là Craniata, vì nó thể hiện các dấu hiệu của tim, động mạch, mang sơi, đuôi, dây thần kinh quấn nhau với não ở phần tận cùng phía trước, và mắt—mặc dù nó cũng có xúc tu quanh miệng của nó. Haikouichthys và Myllokunmingia cũng từ Hệ tầng Chengjiang được xem là cá. Pikaia được phát hiện sớm hơn nhiều nhưng từ Đá phiến sét Burgess ở Giữa Kỷ Cambri cũng được xem là động vật có dây sống nguyên thủy. Mặc khác các hóa thạch của động vật có dây sống ban đầu là rất hiếm vì các động vật có dây sống không xương sống không có xương hoặc răng, và chỉ có một loài được thông báo là còn tồn tại trong kỷ Cambri.",
      claim:
        "Theo nghiên cứu mới nhất, hóa thạch Haikouella lanceolata từ thời kỳ Cambri sớm không phải là động vật có dây sống và không sở hữu các đặc điểm của Craniata như tim mạch hay mắt, mà chỉ là một dạng sinh vật đơn giản.",
      evidence:
        "Mặc khác các hóa thạch của động vật có dây sống ban đầu là rất hiếm vì các động vật có dây sống không xương sống không có xương hoặc răng, và chỉ có một loài được thông báo là còn tồn tại trong kỷ Cambri.",
      trueLabel: "REFUTED",
      predictedLabel: "NEI",
      analysis:
        "XLM-R không nhận ra mâu thuẫn trực tiếp giữa claim và context. Claim khẳng định rằng Haikouella lanceolata 'không phải là động vật có dây sống và không sở hữu các đặc điểm của Craniata như tim mạch hay mắt', trong khi context lại nói rõ rằng Haikouella lanceolata 'được phân tích là một loài thuộc ngành Chordata và có thể là Craniata, vì nó thể hiện các dấu hiệu của tim, động mạch, mang sơi, đuôi, dây thần kinh quấn nhau với não ở phần tận cùng phía trước, và mắt'.",
    },
  ],
}

const dataSourcesBreakdown = {
  Wikipedia: { total: 9973, percentage: 46.9, rounds: { R1: 2601, R2: 2150, R3: 5222 } },
  VnExpress: { total: 6023, percentage: 28.3, rounds: { R1: 2746, R2: 1155, R3: 2122 } },
  "Báo Lao Động": { total: 1484, percentage: 7.0, rounds: { R1: 0, R2: 389, R3: 1095 } },
  "Báo Pháp Luật": { total: 1123, percentage: 5.3, rounds: { R1: 0, R2: 630, R3: 493 } },
  "Báo Chính Phủ": { total: 1114, percentage: 5.2, rounds: { R1: 0, R2: 614, R3: 500 } },
  "Báo Nhân Dân": { total: 1088, percentage: 5.1, rounds: { R1: 0, R2: 566, R3: 522 } },
  "Thanh Niên": { total: 457, percentage: 2.1, rounds: { R1: 0, R2: 457, R3: 0 } },
}

export default function ADFCDashboard() {
  const [selectedRound, setSelectedRound] = useState("overview")
  const [expandedContexts, setExpandedContexts] = useState<{ [key: string]: boolean }>({})

  const toggleContext = (key: string) => {
    setExpandedContexts((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Cơ bản":
        return "bg-green-100 text-green-800"
      case "Nâng cao":
        return "bg-yellow-100 text-yellow-800"
      case "Cao cấp":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPerformanceColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">ADFC Dashboard</h1>
          <p className="text-xl text-gray-600">
            Adversarial Fact-Checking Dataset for Vietnamese - Phân tích Toàn diện
          </p>
          <div className="flex justify-center gap-4">
            <Badge variant="outline" className="px-4 py-2">
              <Database className="w-4 h-4 mr-2" />
              21,262 mẫu dữ liệu
            </Badge>
            <Badge variant="outline" className="px-4 py-2">
              <Brain className="w-4 h-4 mr-2" />3 Rounds đối kháng
            </Badge>
            <Badge variant="outline" className="px-4 py-2">
              <Target className="w-4 h-4 mr-2" />7 Datasets đánh giá
            </Badge>
          </div>
        </div>

        {/* Main Tabs */}
        <Tabs value={selectedRound} onValueChange={setSelectedRound} className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Tổng quan</TabsTrigger>
            <TabsTrigger value="dataset">Phân tích Dữ liệu</TabsTrigger>
            <TabsTrigger value="performance">Hiệu suất Mô hình</TabsTrigger>
            <TabsTrigger value="weaknesses">Điểm yếu Mô hình</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
            <TabsTrigger value="recommendations">Khuyến nghị</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Mục tiêu Dự án
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Xây dựng bộ dữ liệu đối kháng tiếng Việt cho fact-checking, tạo ra các claim phức tạp để thử thách
                    khả năng của mô hình AI.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Phương pháp Đối kháng
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Sử dụng 3 rounds với mô hình ngày càng mạnh (mBERT → PhoBERT → XLM-R) để tạo dữ liệu có độ khó tăng
                    dần.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Kết quả Đạt được
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Tạo thành công 21,262 mẫu dữ liệu đối kháng chất lượng cao với Fleiss' Kappa &gt; 0.80 (đồng thuận
                    xuất sắc).
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Process Flow */}
            <Card>
              <CardHeader>
                <CardTitle>Quy trình Tạo Dữ liệu Đối kháng</CardTitle>
                <CardDescription>
                  Mỗi round sử dụng mô hình mạnh hơn để tạo claim đối kháng phức tạp hơn
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {roundsData.map((round, index) => (
                    <div key={round.round} className="relative">
                      <Card className="h-full">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">{round.round}</CardTitle>
                            <Badge className={getDifficultyColor(round.difficulty)}>{round.difficulty}</Badge>
                          </div>
                          <CardDescription>{round.model}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div>
                            <p className="text-sm font-medium">Dữ liệu huấn luyện:</p>
                            <p className="text-xs text-gray-600">{round.trainingData}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Số mẫu: {round.samples.toLocaleString()}</p>
                            <p className="text-sm font-medium">Kappa: {round.kappa}</p>
                          </div>
                        </CardContent>
                      </Card>
                      {index < roundsData.length - 1 && (
                        <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                          <div className="w-6 h-0.5 bg-gray-300"></div>
                          <div className="w-0 h-0 border-l-4 border-l-gray-300 border-t-2 border-t-transparent border-b-2 border-b-transparent ml-6 -mt-1"></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Dataset Analysis Tab */}
          <TabsContent value="dataset" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Sample Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Phân bố Số lượng Mẫu</CardTitle>
                  <CardDescription>Số lượng mẫu dữ liệu qua các rounds</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={roundsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="round" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="samples" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Label Distribution for R3 */}
              <Card>
                <CardHeader>
                  <CardTitle>Phân bố Nhãn - Round 3</CardTitle>
                  <CardDescription>Phân bố các nhãn trong dataset lớn nhất</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: "NEI", value: 36.9, count: 3674 },
                          { name: "REFUTED", value: 31.9, count: 3176 },
                          { name: "SUPPORTED", value: 31.2, count: 3104 },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {[0, 1, 2].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Data Sources Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Phân bố Nguồn Dữ liệu</CardTitle>
                <CardDescription>Nguồn gốc của 21,262 mẫu dữ liệu qua các rounds</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={Object.entries(dataSourcesBreakdown).map(([name, data]) => ({
                            name,
                            value: data.percentage,
                            count: data.total,
                          }))}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, value }) => `${name}: ${value}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {Object.keys(dataSourcesBreakdown).map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="space-y-3">
                    {Object.entries(dataSourcesBreakdown).map(([source, data]) => (
                      <div key={source} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{source}</p>
                          <p className="text-sm text-gray-600">
                            {data.total.toLocaleString()} mẫu ({data.percentage}%)
                          </p>
                        </div>
                        <div className="text-right text-xs text-gray-500">
                          <div>R1: {data.rounds.R1}</div>
                          <div>R2: {data.rounds.R2}</div>
                          <div>R3: {data.rounds.R3}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Round Analysis */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {roundsData.map((round) => (
                <Card key={round.round}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {round.round === "R1" && <CheckCircle className="w-5 h-5 text-green-500" />}
                      {round.round === "R2" && <AlertTriangle className="w-5 h-5 text-yellow-500" />}
                      {round.round === "R3" && <XCircle className="w-5 h-5 text-red-500" />}
                      ViAdverNLI {round.round}
                    </CardTitle>
                    <CardDescription>{round.samples.toLocaleString()} mẫu</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>SUPPORTED</span>
                        <span>{round.supported}%</span>
                      </div>
                      <Progress value={round.supported} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>REFUTED</span>
                        <span>{round.refuted}%</span>
                      </div>
                      <Progress value={round.refuted} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>NEI</span>
                        <span>{round.nei}%</span>
                      </div>
                      <Progress value={round.nei} className="h-2" />
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-sm">
                        <strong>Mô hình:</strong> {round.model}
                      </p>
                      <p className="text-sm">
                        <strong>Fleiss' Kappa:</strong> {round.kappa}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Performance Analysis Tab */}
          <TabsContent value="performance" className="space-y-6">
            {/* Model Performance Comparison */}
            <Card>
              <CardHeader>
                <CardTitle>So sánh Hiệu suất Mô hình</CardTitle>
                <CardDescription>
                  Hiệu suất của các mô hình trên các dataset khác nhau (sử dụng dữ liệu training tốt nhất)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="dataset" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="mBERT" fill="#8884d8" />
                    <Bar dataKey="PhoBERT" fill="#82ca9d" />
                    <Bar dataKey="XLM-R" fill="#ffc658" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Adversarial Training Impact */}
            <Card>
              <CardHeader>
                <CardTitle>Tác động của Adversarial Training</CardTitle>
                <CardDescription>
                  Hiệu suất XLM-R khi thêm dần dữ liệu đối kháng (chỉ hiển thị datasets chính)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={adversarialImpact}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="round" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="ViA1" stroke="#8884d8" strokeWidth={2} />
                    <Line type="monotone" dataKey="ViA2" stroke="#82ca9d" strokeWidth={2} />
                    <Line type="monotone" dataKey="ViA3" stroke="#ffc658" strokeWidth={2} />
                    <Line type="monotone" dataKey="ISE_DSC01" stroke="#ff7300" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Performance Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Hiệu suất Cao nhất</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">84.50%</div>
                  <p className="text-xs text-gray-600">XLM-R trên ISE-DSC01</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Dataset Khó nhất</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">42.01%</div>
                  <p className="text-xs text-gray-600">ViA1 (Round 1)</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Cải thiện Lớn nhất</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">+14.74%</div>
                  <p className="text-xs text-gray-600">ViA1 khi thêm adversarial data</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Mô hình Tốt nhất</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600">XLM-R</div>
                  <p className="text-xs text-gray-600">Ưu việt trên tất cả datasets</p>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Performance Table */}
            <Card>
              <CardHeader>
                <CardTitle>Bảng Hiệu suất Chi tiết Toàn bộ</CardTitle>
                <CardDescription>
                  Hiệu suất của tất cả mô hình qua các rounds với các cấu hình dữ liệu huấn luyện khác nhau
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 p-2 text-left">Round</th>
                        <th className="border border-gray-300 p-2 text-left">Model</th>
                        <th className="border border-gray-300 p-2 text-left">Training Data</th>
                        <th className="border border-gray-300 p-2 text-center">ViA1</th>
                        <th className="border border-gray-300 p-2 text-center">ViA2</th>
                        <th className="border border-gray-300 p-2 text-center">ViA3</th>
                        <th className="border border-gray-300 p-2 text-center">ViNLI</th>
                        <th className="border border-gray-300 p-2 text-center">ViWikiFC</th>
                        <th className="border border-gray-300 p-2 text-center">ViFactCheck</th>
                        <th className="border border-gray-300 p-2 text-center">ISE-DSC01(pub)</th>
                        <th className="border border-gray-300 p-2 text-center">ISE-DSC01(priv)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {detailedPerformanceData.map((row, index) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                          <td className="border border-gray-300 p-2 font-medium">{row.round}</td>
                          <td className="border border-gray-300 p-2 font-medium">{row.model}</td>
                          <td className="border border-gray-300 p-2 text-xs">{row.trainingData}</td>
                          <td className={`border border-gray-300 p-2 text-center ${getPerformanceColor(row.ViA1)}`}>
                            {row.ViA1}
                          </td>
                          <td className={`border border-gray-300 p-2 text-center ${getPerformanceColor(row.ViA2)}`}>
                            {row.ViA2}
                          </td>
                          <td className={`border border-gray-300 p-2 text-center ${getPerformanceColor(row.ViA3)}`}>
                            {row.ViA3}
                          </td>
                          <td className={`border border-gray-300 p-2 text-center ${getPerformanceColor(row.ViNLI)}`}>
                            {row.ViNLI}
                          </td>
                          <td className={`border border-gray-300 p-2 text-center ${getPerformanceColor(row.ViWikiFC)}`}>
                            {row.ViWikiFC}
                          </td>
                          <td
                            className={`border border-gray-300 p-2 text-center ${getPerformanceColor(row.ViFactCheck)}`}
                          >
                            {row.ViFactCheck}
                          </td>
                          <td
                            className={`border border-gray-300 p-2 text-center ${getPerformanceColor(row["ISE-DSC01(public)"])}`}
                          >
                            {row["ISE-DSC01(public)"]}
                          </td>
                          <td
                            className={`border border-gray-300 p-2 text-center ${getPerformanceColor(row["ISE-DSC01(private)"])}`}
                          >
                            {row["ISE-DSC01(private)"]}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Round-by-Round Analysis */}
            <div className="space-y-6">
              {/* Round 1 Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Badge className="bg-green-100 text-green-800">Round 1</Badge>
                    Phân tích Chi tiết - Thiết lập Ban đầu
                  </CardTitle>
                  <CardDescription>
                    Dữ liệu huấn luyện cơ bản: ViNLI + ViWikiFC. Vai trò: Giúp mô hình học cách liên kết context-claim
                    và làm quen với fact-checking thuần túy.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3">🔍 Kết quả trên ViA1 (Adversarial lần 1)</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>mBERT (baseline):</span>
                          <span className="text-red-600 font-medium">24.32% → 40.54% (+16.22%)</span>
                        </div>
                        <div className="flex justify-between">
                          <span>PhoBERT (baseline):</span>
                          <span className="text-red-600 font-medium">26.62% → 40.05% (+13.43%)</span>
                        </div>
                        <div className="flex justify-between">
                          <span>XLM-R (baseline):</span>
                          <span className="text-red-600 font-medium">27.27% → 42.01% (+14.74%)</span>
                        </div>
                      </div>
                      <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded">
                        <p className="text-sm text-blue-700">
                          <strong>Lý giải:</strong> Bổ sung ViA1 giúp mô hình tiếp xúc trực tiếp với những "chiêu trò"
                          ngôn ngữ được sinh ra một cách cố tình gây nhiễu, do đó mô hình có thể học được một số đặc
                          trưng để phát hiện cách thức adversarial.
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3">📊 So sánh Performance Tổng thể</h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <strong>XLM-R:</strong> Dẫn đầu trên tập chuẩn
                          <div className="ml-4 text-gray-600">
                            • ViNLI: ~78.77% (cao nhất)
                            <br />• ViWikiFC: ~79.24% (cao nhất)
                            <br />• ISE-DSC01(pub): ~76.01%
                          </div>
                        </div>
                        <div>
                          <strong>PhoBERT:</strong> Cân bằng tốt
                          <div className="ml-4 text-gray-600">
                            • ViNLI: ~72.82%
                            <br />• ViWikiFC: ~72.21%
                            <br />• ISE-DSC01(pub): ~71.11%
                          </div>
                        </div>
                        <div>
                          <strong>mBERT:</strong> Yếu nhất
                          <div className="ml-4 text-gray-600">
                            • ViNLI: ~70.01%
                            <br />• ViWikiFC: ~70.49%
                            <br />• ISE-DSC01(pub): ~70.33%
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-medium text-green-800">✅ Bài học chính Round 1</h4>
                    <ul className="mt-2 text-sm text-green-700 space-y-1">
                      <li>
                        • Dữ liệu adversarial dù mới sinh (ViA1) cũng góp phần cải thiện đáng kể khả năng phát hiện
                        adversarial với mô hình
                      </li>
                      <li>
                        • XLM-R có khả năng generalize mạnh trên nguồn dữ liệu "chuẩn" (ViNLI, ViWikiFC), nhưng tương tự
                        các mô hình khác, cần thêm adversarial để chống nhiễu
                      </li>
                      <li>• Tất cả mô hình đều thể hiện cải thiện đáng kể khi thêm ViA1 vào training data</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Round 2 Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Badge className="bg-yellow-100 text-yellow-800">Round 2</Badge>
                    Phân tích Chi tiết - Mở rộng Dữ liệu
                  </CardTitle>
                  <CardDescription>
                    Bổ sung ViFactCheck (báo chí) và ViA2 (adversarial thế hệ 2). Cấu hình rộng nhất: ViNLI + ViWikiFC +
                    ViFactCheck + ViA1 + ViA2.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-medium mb-3">🔴 mBERT (R2)</h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <strong>Khi thêm ViA2:</strong>
                          <div className="ml-2 text-gray-600">
                            • ViA2: 39.05% → 48.12% (+9.07%)
                            <br />• ViA3: 42.95% → 47.63% (+4.68%)
                            <br />• ISE-DSC01(pub): ~70% (ổn định)
                          </div>
                        </div>
                      </div>
                      <div className="p-2 bg-red-50 border border-red-200 rounded text-xs text-red-700">
                        ViA2 (sinh bởi PhoBERT) giúp mBERT cải thiện nhận diện adversarial thế hệ 2, nhưng performance
                        tổng thể vẫn thấp nhất.
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3">🟠 PhoBERT (R2)</h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <strong>Khi thêm ViA2:</strong>
                          <div className="ml-2 text-gray-600">
                            • ViA2: 37.23% → 41.94% (+4.71%)
                            <br />• ViA3: 44.00% → 47.41% (+3.41%)
                            <br />• ISE-DSC01(pub): 74.55% → 76.32% (+1.77%)
                          </div>
                        </div>
                      </div>
                      <div className="p-2 bg-orange-50 border border-orange-200 rounded text-xs text-orange-700">
                        PhoBERT thích nghi khá tốt với dữ liệu fact-checking tổng hợp. Cải thiện đáng kể trên ISE-DSC01.
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3">🟡 XLM-R (R2)</h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <strong>Khi thêm ViA2:</strong>
                          <div className="ml-2 text-gray-600">
                            • ViA2: 41.26% → 45.90% (+4.64%)
                            <br />• ViA3: 40.47% → 48.18% (+7.71%)
                            <br />• ISE-DSC01(pub): 77.35% → 81.58% (+4.23%)
                          </div>
                        </div>
                      </div>
                      <div className="p-2 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-700">
                        XLM-R thể hiện sự nhạy bén nhờ pretrain đa ngôn ngữ. ISE-DSC01(pub) nhảy vọt lên ~81.58%.
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-medium text-blue-800">✅ Bài học chính Round 2</h4>
                    <ul className="mt-2 text-sm text-blue-700 space-y-1">
                      <li>
                        • ViFactCheck và ViA1 là nền tảng tốt giúp mô hình "làm quen" với adversarial đầu tiên và ngữ
                        liệu báo chí
                      </li>
                      <li>
                        • ViA2 làm nhiệm vụ then chốt: sinh adversarial mới để làm giàu dữ liệu huấn luyện, thúc đẩy
                        performance trên tập adversarial thế hệ sau
                      </li>
                      <li>• XLM-R vẫn dẫn đầu với ISE-DSC01(public) ~81.58% và private ~79.56%</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Round 3 Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Badge className="bg-red-100 text-red-800">Round 3</Badge>
                    Phân tích Chi tiết - Mở rộng Cực đại
                  </CardTitle>
                  <CardDescription>
                    Thêm ViA3 (adversarial thế hệ XLM-R) và ISE-DSC01(train). Cấu hình toàn diện nhất với trade-off giữa
                    adversarial và general performance.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-medium mb-3">🔴 mBERT (R3)</h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <strong>Cấu hình A vs B:</strong>
                          <div className="ml-2 text-gray-600">
                            • ViA3: 46.75% → 60.63% (+13.88%)
                            <br />• ISE-DSC01(pub): 76.93% → 75.91% (-1.02%)
                            <br />• Trade-off rõ ràng
                          </div>
                        </div>
                      </div>
                      <div className="p-2 bg-red-50 border border-red-200 rounded text-xs text-red-700">
                        mBERT cải thiện mạnh trên ViA3 nhưng performance ISE-DSC01 giảm nhẹ do quá tải adversarial.
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3">🟠 PhoBERT (R3)</h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <strong>Cấu hình A vs B:</strong>
                          <div className="ml-2 text-gray-600">
                            • ViA3: 41.52% → 57.54% (+16.02%)
                            <br />• ISE-DSC01(pub): 83.19% → 80.91% (-2.28%)
                            <br />• Đỉnh cao: 83.19%
                          </div>
                        </div>
                      </div>
                      <div className="p-2 bg-orange-50 border border-orange-200 rounded text-xs text-orange-700">
                        Cấu hình A đạt ISE-DSC01(pub) ~83.19% - cao nhất từ trước đến nay trên PhoBERT.
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3">🏆 XLM-R (R3)</h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <strong>Cấu hình A vs B:</strong>
                          <div className="ml-2 text-gray-600">
                            • ViA3: 44.55% → 57.65% (+13.10%)
                            <br />• ISE-DSC01(pub): <span className="font-bold text-green-600">84.50%</span> → 81.01%
                            (-3.49%)
                            <br />• Kỷ lục: 84.50%
                          </div>
                        </div>
                      </div>
                      <div className="p-2 bg-green-50 border border-green-200 rounded text-xs text-green-700">
                        Cấu hình A cho XLM-R "vô đối" trên ISE-DSC01(public) với ~84.50% - mức cao nhất toàn bộ.
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <h4 className="font-medium text-green-800">✅ Thành tựu Round 3</h4>
                      <ul className="mt-2 text-sm text-green-700 space-y-1">
                        <li>
                          • ISE-DSC01(train) đóng vai trò then chốt khi muốn nâng cao performance trên tập thi chính
                          thức
                        </li>
                        <li>• XLM-R đạt kỷ lục 84.50% trên ISE-DSC01(public)</li>
                        <li>• ViA3 giúp tất cả mô hình đạt ~57-60% trên adversarial cực khó</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <h4 className="font-medium text-yellow-800">⚠️ Trade-off Quan trọng</h4>
                      <ul className="mt-2 text-sm text-yellow-700 space-y-1">
                        <li>• Bổ sung quá nhiều adversarial "khó" có thể làm giảm performance trên tập thi chuẩn</li>
                        <li>• Cần cân bằng giữa "tối ưu cho adversarial" và "tối ưu cho general/thi thố"</li>
                        <li>• XLM-R cấu hình A (không ViA3) vẫn mạnh nhất cho ứng dụng thực tế</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Weaknesses Analysis Tab */}
          <TabsContent value="weaknesses" className="space-y-6">
            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {weaknessData.map((model) => (
                <Card key={model.model} className="border-l-4 border-l-red-500">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-red-500" />
                      {model.model} - {model.round}
                    </CardTitle>
                    <CardDescription>Tỷ lệ lỗi: {model.errorRate}%</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-red-600">Điểm yếu chính:</p>
                      <p className="text-sm text-gray-600">{model.mainWeakness}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>SUPPORTED</span>
                        <span className={getPerformanceColor(100 - model.supportedError)}>
                          {model.supportedError}% lỗi
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>REFUTED</span>
                        <span className={getPerformanceColor(100 - model.refutedError)}>{model.refutedError}% lỗi</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>NEI</span>
                        <span className={getPerformanceColor(100 - model.neiError)}>{model.neiError}% lỗi</span>
                      </div>
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-sm">
                        <strong>Nhãn tốt nhất:</strong> {model.bestLabel}
                      </p>
                      <p className="text-sm">
                        <strong>Nhãn yếu nhất:</strong> {model.worstLabel}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Error Rate Comparison */}
            <Card>
              <CardHeader>
                <CardTitle>So sánh Tỷ lệ Lỗi Tổng thể</CardTitle>
                <CardDescription>Tỷ lệ dự đoán sai của các mô hình qua các rounds</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={weaknessData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="model" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="errorRate" fill="#ef4444" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Error Types Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Phân tích Loại Lỗi Phổ biến</CardTitle>
                <CardDescription>Các loại lỗi phân loại phổ biến nhất của từng mô hình</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {["mBERT", "PhoBERT", "XLM-R"].map((modelName) => (
                    <div key={modelName} className="space-y-3">
                      <h4 className="font-medium text-center">{modelName}</h4>
                      <div className="space-y-2">
                        {errorTypeData
                          .filter((item) => item.model === modelName)
                          .slice(0, 4)
                          .map((error, index) => (
                            <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                              <span className="text-sm">{error.errorType}</span>
                              <div className="text-right">
                                <div className="text-sm font-medium">{error.count}</div>
                                <div className="text-xs text-gray-500">{error.percentage}%</div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Label Performance Comparison */}
            <Card>
              <CardHeader>
                <CardTitle>Hiệu suất theo Nhãn</CardTitle>
                <CardDescription>Tỷ lệ lỗi của từng mô hình trên từng loại nhãn</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart
                    data={[
                      { label: "SUPPORTED", mBERT: 92.03, PhoBERT: 33.82, "XLM-R": 64.01 },
                      { label: "REFUTED", mBERT: 84.95, PhoBERT: 42.61, "XLM-R": 69.74 },
                      { label: "NEI", mBERT: 33.19, PhoBERT: 80.54, "XLM-R": 13.5 },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="label" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="mBERT" fill="#ef4444" />
                    <Bar dataKey="PhoBERT" fill="#f97316" />
                    <Bar dataKey="XLM-R" fill="#eab308" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Detailed Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5" />
                    Phân tích Chi tiết Điểm yếu
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <h4 className="font-medium text-red-800">🔴 mBERT (Round 1)</h4>
                    <ul className="mt-2 text-sm text-red-700 space-y-1">
                      <li>• Thiên vị mạnh mẽ về nhãn NEI (62.9% dự đoán)</li>
                      <li>• Rất kém với SUPPORTED (92.03% lỗi)</li>
                      <li>• Yếu kém trong xử lý tiếng Việt</li>
                      <li>• Khó hiểu ngữ cảnh phức tạp</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <h4 className="font-medium text-orange-800">🟠 PhoBERT (Round 2)</h4>
                    <ul className="mt-2 text-sm text-orange-700 space-y-1">
                      <li>• Khó nhận diện nhãn NEI (80.54% lỗi)</li>
                      <li>• Thiên vị về SUPPORTED và REFUTED</li>
                      <li>• Quá tự tin với các suy luận</li>
                      <li>• Nhầm lẫn giữa SUPPORTED và REFUTED</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h4 className="font-medium text-yellow-800">🟡 XLM-R (Round 3)</h4>
                    <ul className="mt-2 text-sm text-yellow-700 space-y-1">
                      <li>• Thiên vị về nhãn NEI (68.7% dự đoán)</li>
                      <li>• Quá thận trọng trong dự đoán</li>
                      <li>• Khó xử lý claim phức tạp</li>
                      <li>• Kém với REFUTED (69.74% lỗi)</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Đề xuất Cải thiện
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <h4 className="font-medium">🎯 Cho mBERT:</h4>
                    <ul className="text-sm space-y-1 ml-4">
                      <li>• Tăng cường dữ liệu huấn luyện tiếng Việt</li>
                      <li>• Điều chỉnh ngưỡng để giảm thiên vị NEI</li>
                      <li>• Cải thiện khả năng nhận diện SUPPORTED/REFUTED</li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium">🎯 Cho PhoBERT:</h4>
                    <ul className="text-sm space-y-1 ml-4">
                      <li>• Tăng cường dữ liệu NEI trong training</li>
                      <li>• Điều chỉnh ngưỡng giảm thiên vị SUPPORTED</li>
                      <li>• Cải thiện phân biệt SUPPORTED vs REFUTED</li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium">🎯 Cho XLM-R:</h4>
                    <ul className="text-sm space-y-1 ml-4">
                      <li>• Điều chỉnh ngưỡng giảm thiên vị NEI</li>
                      <li>• Tăng cường dữ liệu SUPPORTED/REFUTED phức tạp</li>
                      <li>• Cải thiện khả năng suy luận từ evidence</li>
                    </ul>
                  </div>

                  <div className="pt-3 border-t">
                    <h4 className="font-medium">🔧 Đề xuất chung:</h4>
                    <ul className="text-sm space-y-1 ml-4">
                      <li>• Kết hợp ensemble các mô hình</li>
                      <li>• Cải thiện tiền xử lý dữ liệu</li>
                      <li>• Phát triển mô hình chuyên biệt cho từng nhãn</li>
                      <li>• Áp dụng adversarial training nâng cao</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Fleiss Kappa Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Phân tích Độ Đồng thuận (Fleiss' Kappa)
                </CardTitle>
                <CardDescription>Mức độ đồng thuận giữa các mô hình trong việc tạo dữ liệu</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium">Round 1</h4>
                    <div className="text-2xl font-bold text-green-600">0.8097</div>
                    <p className="text-sm text-gray-600">Đồng thuận xuất sắc ⭐⭐⭐</p>
                    <p className="text-xs text-gray-500 mt-1">Mô hình: qwq, deepseek-r1:32b, mistral-small3.1</p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium">Round 2</h4>
                    <div className="text-2xl font-bold text-green-600">0.8099</div>
                    <p className="text-sm text-gray-600">Đồng thuận xuất sắc ⭐⭐⭐</p>
                    <p className="text-xs text-gray-500 mt-1">Mô hình: granite3.2, phi4-reasoning, qwen3</p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium">Round 3</h4>
                    <div className="text-2xl font-bold text-green-600">0.8099</div>
                    <p className="text-sm text-gray-600">Đồng thuận xuất sắc ⭐⭐⭐</p>
                    <p className="text-xs text-gray-500 mt-1">Mô hình: phi4-reasoning, qwen3, gpt_4o_mini</p>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-medium text-green-800">✅ Kết luận về Chất lượng Dữ liệu</h4>
                  <p className="text-sm text-green-700 mt-2">
                    Tất cả 3 rounds đều đạt Fleiss' Kappa &gt; 0.80, cho thấy chất lượng dữ liệu rất cao với mức độ đồng
                    thuận xuất sắc giữa các mô hình tạo dữ liệu. Điều này đảm bảo tính tin cậy và nhất quán trong bộ dữ
                    liệu ViAdverNLI.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Error Examples */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5" />
                  Ví dụ Dự đoán Sai Chi tiết
                </CardTitle>
                <CardDescription>
                  Các ví dụ cụ thể về lỗi dự đoán của từng mô hình với phân tích chi tiết
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="mBERT" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="mBERT">mBERT (R1)</TabsTrigger>
                    <TabsTrigger value="PhoBERT">PhoBERT (R2)</TabsTrigger>
                    <TabsTrigger value="XLM-R">XLM-R (R3)</TabsTrigger>
                  </TabsList>

                  {Object.entries(errorExamples).map(([modelName, examples]) => (
                    <TabsContent key={modelName} value={modelName} className="space-y-6">
                      {examples.map((example, index) => (
                        <Card key={index} className="border-l-4 border-l-red-400">
                          <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                              <XCircle className="w-5 h-5 text-red-500" />
                              Lỗi {example.type}
                            </CardTitle>
                            <div className="flex gap-2">
                              <Badge variant="outline" className="bg-red-50 text-red-700">
                                Thực tế: {example.trueLabel}
                              </Badge>
                              <Badge variant="outline" className="bg-orange-50 text-orange-700">
                                Dự đoán: {example.predictedLabel}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div>
                              <h4 className="font-medium text-sm mb-2">📄 Context:</h4>
                              <div className="text-sm text-gray-700 bg-gray-50 p-3 rounded border-l-2 border-gray-300">
                                <p>
                                  {expandedContexts[`${modelName}-${index}-context`] || example.context.length <= 300
                                    ? example.context
                                    : `${example.context.substring(0, 300)}...`}
                                </p>
                                {example.context.length > 300 && (
                                  <button
                                    onClick={() => toggleContext(`${modelName}-${index}-context`)}
                                    className="mt-2 text-blue-600 hover:text-blue-800 text-xs font-medium"
                                  >
                                    {expandedContexts[`${modelName}-${index}-context`] ? "Thu gọn" : "Xem đầy đủ"}
                                  </button>
                                )}
                              </div>
                            </div>

                            <div>
                              <h4 className="font-medium text-sm mb-2">💬 Claim:</h4>
                              <div className="text-sm text-gray-700 bg-blue-50 p-3 rounded border-l-2 border-blue-300">
                                <p>
                                  {expandedContexts[`${modelName}-${index}-claim`] || example.claim.length <= 200
                                    ? example.claim
                                    : `${example.claim.substring(0, 200)}...`}
                                </p>
                                {example.claim.length > 200 && (
                                  <button
                                    onClick={() => toggleContext(`${modelName}-${index}-claim`)}
                                    className="mt-2 text-blue-600 hover:text-blue-800 text-xs font-medium"
                                  >
                                    {expandedContexts[`${modelName}-${index}-claim`] ? "Thu gọn" : "Xem đầy đủ"}
                                  </button>
                                )}
                              </div>
                            </div>

                            <div>
                              <h4 className="font-medium text-sm mb-2">🔍 Evidence:</h4>
                              <p className="text-sm text-gray-700 bg-green-50 p-3 rounded border-l-2 border-green-300">
                                {example.evidence}
                              </p>
                            </div>

                            <div>
                              <h4 className="font-medium text-sm mb-2">🧠 Phân tích Lỗi:</h4>
                              <p className="text-sm text-gray-700 bg-yellow-50 p-3 rounded border-l-2 border-yellow-300">
                                {example.analysis}
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Insights Tab */}
          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Xu hướng Chính
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Độ khó tăng dần qua các rounds</p>
                      <p className="text-sm text-gray-600">
                        ViA1 (42%) → ViA2 (54%) → ViA3 (58%) cho thấy adversarial training hiệu quả
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium">XLM-R thể hiện sự ưu việt</p>
                      <p className="text-sm text-gray-600">
                        Đạt hiệu suất cao nhất trên tất cả datasets, đặc biệt ISE-DSC01 (84.5%)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Adversarial training cải thiện robustness</p>
                      <p className="text-sm text-gray-600">
                        Thêm dữ liệu đối kháng giúp cải thiện hiệu suất cross-dataset
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Thách thức & Hạn chế
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Trade-off performance</p>
                      <p className="text-sm text-gray-600">
                        Tối ưu cho adversarial data có thể làm giảm hiệu suất trên dữ liệu gốc
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Hiệu suất thấp trên ViAdverNLI</p>
                      <p className="text-sm text-gray-600">
                        Ngay cả mô hình tốt nhất chỉ đạt ~58% trên ViA3, cho thấy độ khó cao
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <HelpCircle className="w-5 h-5 text-yellow-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Cần nghiên cứu thêm</p>
                      <p className="text-sm text-gray-600">
                        Phân tích error cases để hiểu rõ hơn về limitation của mô hình
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Dataset Difficulty Ranking */}
            <Card>
              <CardHeader>
                <CardTitle>Xếp hạng Độ khó Dataset</CardTitle>
                <CardDescription>Dựa trên hiệu suất cao nhất đạt được</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    {
                      name: "ViAdverNLI (40-58%)",
                      difficulty: "Cực khó",
                      color: "bg-red-500",
                      description: "Đòi hỏi reasoning phức tạp",
                    },
                    {
                      name: "ViFactCheck (57-74%)",
                      difficulty: "Khó vừa",
                      color: "bg-orange-500",
                      description: "Cần hiểu context báo chí",
                    },
                    {
                      name: "ISE-DSC01 (70-85%)",
                      difficulty: "Vừa phải",
                      color: "bg-yellow-500",
                      description: "Dataset cân bằng, chất lượng cao",
                    },
                    {
                      name: "ViNLI, ViWikiFC (70-80%)",
                      difficulty: "Tương đối dễ",
                      color: "bg-green-500",
                      description: "Dữ liệu nền tảng",
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 border rounded-lg">
                      <div className={`w-4 h-4 rounded-full ${item.color}`}></div>
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                      <Badge variant="outline">{item.difficulty}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Recommendations Tab */}
          <TabsContent value="recommendations" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Khuyến nghị Mô hình
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-medium text-green-800">🏆 XLM-R Large - Lựa chọn tối ưu</h4>
                    <ul className="mt-2 text-sm text-green-700 space-y-1">
                      <li>✅ Hiệu suất ổn định cao trên tất cả dataset</li>
                      <li>✅ Khả năng xử lý dữ liệu đối kháng tốt nhất</li>
                      <li>✅ Đạt 84.50% - mức cao nhất trên ISE-DSC01</li>
                      <li>✅ Cải thiện đáng kể khi có đủ dữ liệu training</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-medium text-blue-800">📚 Combination Dữ liệu Tối ưu</h4>
                    <p className="mt-2 text-sm text-blue-700">
                      <strong>ViNLI + ViWikiFC + ViFactCheck + ViA1 + ViA2 + ISE-DSC01</strong>
                    </p>
                    <ul className="mt-2 text-sm text-blue-700 space-y-1">
                      <li>🔄 Cung cấp diversity cao</li>
                      <li>📊 Bao gồm cả dữ liệu thực và đối kháng</li>
                      <li>🛡️ Giúp mô hình robust trước nhiều loại attack</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Chiến lược Theo Mục tiêu
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">🎯 Tối ưu ISE-DSC01</h4>
                    <p className="text-sm text-gray-600 mt-1">XLM-R + ViNLI+ViWikiFC+ViFactCheck+ViA1+ViA2+ISE-DSC01</p>
                    <p className="text-sm font-medium text-green-600">→ 84.50% accuracy</p>
                  </div>

                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">🛡️ Tối ưu Adversarial Robustness</h4>
                    <p className="text-sm text-gray-600 mt-1">XLM-R + Full dataset + ViA3</p>
                    <p className="text-sm font-medium text-green-600">→ 57.65% trên ViA3</p>
                  </div>

                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">⚖️ Balance tổng thể</h4>
                    <p className="text-sm text-gray-600 mt-1">XLM-R + ViNLI+ViWikiFC+ViFactCheck+ViA1+ViA2</p>
                    <p className="text-sm font-medium text-green-600">→ Performance tốt trên tất cả</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Future Directions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  Hướng Phát triển Tương lai
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">🚀 ViAdverNLI R4 - Thế hệ tiếp theo</h4>
                    <ul className="text-sm space-y-2">
                      <li>
                        • <strong>Mô hình:</strong> GPT-4O, Claude-3.5, Gemini-Pro
                      </li>
                      <li>
                        • <strong>Dữ liệu:</strong> Full dataset hiện tại + ViA3
                      </li>
                      <li>
                        • <strong>Mục tiêu:</strong> Tạo ra claim cực kỳ tinh vi
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">🔬 Cải tiến Kỹ thuật</h4>
                    <ul className="text-sm space-y-2">
                      <li>
                        • <strong>Language Augmentation:</strong> Paraphrase, back-translation
                      </li>
                      <li>
                        • <strong>Multi-domain:</strong> Y tế, luật pháp, khoa học
                      </li>
                      <li>
                        • <strong>Defense:</strong> Robust training, ensemble methods
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Items */}
            <Card>
              <CardHeader>
                <CardTitle>Hành động Cụ thể</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Ngắn hạn (1-3 tháng)</h4>
                    <ul className="text-sm space-y-1">
                      <li>✅ Deploy XLM-R với configuration tối ưu</li>
                      <li>✅ Phân tích error cases chi tiết</li>
                      <li>✅ Tối ưu hyperparameters cho từng dataset</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Dài hạn (3-6 tháng)</h4>
                    <ul className="text-sm space-y-1">
                      <li>🚀 Phát triển ViAdverNLI R4</li>
                      <li>🚀 Nghiên cứu defensive techniques</li>
                      <li>🚀 Mở rộng sang domain khác</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
