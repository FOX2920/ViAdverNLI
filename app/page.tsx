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
  Settings,
  Cpu,
  DollarSign,
  Server,
  Cloud,
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

// Complexity Evaluation Data
const complexityEvaluationData = [
  {
    round: "R1",
    split: "dev",
    lcs_ratio: 44.52,
    nwr: 34.36,
    jaccard: 15.00,
    lexical_overlap: 67.18,
    unique_overlap: 65.64,
    tfidf_cosine: 47.68,
    semantic_similarity: 74.64,
    num_sent_ctx: 11.02,
    num_sent_clm: 2.04,
    len_ctx: 295.35,
    len_clm: 42.29
  },
  {
    round: "R1",
    split: "test",
    lcs_ratio: 44.68,
    nwr: 34.13,
    jaccard: 14.80,
    lexical_overlap: 67.42,
    unique_overlap: 65.87,
    tfidf_cosine: 47.34,
    semantic_similarity: 74.41,
    num_sent_ctx: 11.28,
    num_sent_clm: 2.04,
    len_ctx: 300.86,
    len_clm: 42.47
  },
  {
    round: "R1",
    split: "train",
    lcs_ratio: 41.36,
    nwr: 38.07,
    jaccard: 16.21,
    lexical_overlap: 63.52,
    unique_overlap: 61.93,
    tfidf_cosine: 47.10,
    semantic_similarity: 75.31,
    num_sent_ctx: 9.86,
    num_sent_clm: 2.06,
    len_ctx: 249.07,
    len_clm: 45.39
  },
  {
    round: "R2",
    split: "dev",
    lcs_ratio: 33.73,
    nwr: 47.21,
    jaccard: 14.70,
    lexical_overlap: 54.45,
    unique_overlap: 52.79,
    tfidf_cosine: 42.65,
    semantic_similarity: 75.25,
    num_sent_ctx: 8.72,
    num_sent_clm: 2.12,
    len_ctx: 243.44,
    len_clm: 49.45
  },
  {
    round: "R2",
    split: "test",
    lcs_ratio: 34.75,
    nwr: 46.28,
    jaccard: 15.29,
    lexical_overlap: 55.24,
    unique_overlap: 53.72,
    tfidf_cosine: 43.91,
    semantic_similarity: 75.85,
    num_sent_ctx: 8.42,
    num_sent_clm: 2.11,
    len_ctx: 238.32,
    len_clm: 49.61
  },
  {
    round: "R2",
    split: "train",
    lcs_ratio: 34.35,
    nwr: 45.38,
    jaccard: 15.87,
    lexical_overlap: 56.42,
    unique_overlap: 54.62,
    tfidf_cosine: 44.32,
    semantic_similarity: 76.08,
    num_sent_ctx: 9.34,
    num_sent_clm: 2.10,
    len_ctx: 257.46,
    len_clm: 53.46
  },
  {
    round: "R3",
    split: "dev",
    lcs_ratio: 32.70,
    nwr: 49.69,
    jaccard: 13.20,
    lexical_overlap: 51.87,
    unique_overlap: 50.31,
    tfidf_cosine: 40.24,
    semantic_similarity: 73.77,
    num_sent_ctx: 10.70,
    num_sent_clm: 2.07,
    len_ctx: 283.43,
    len_clm: 48.78
  },
  {
    round: "R3",
    split: "test",
    lcs_ratio: 32.04,
    nwr: 50.44,
    jaccard: 12.93,
    lexical_overlap: 51.19,
    unique_overlap: 49.56,
    tfidf_cosine: 39.78,
    semantic_similarity: 73.18,
    num_sent_ctx: 10.67,
    num_sent_clm: 2.07,
    len_ctx: 282.54,
    len_clm: 48.94
  },
  {
    round: "R3",
    split: "train",
    lcs_ratio: 36.05,
    nwr: 46.82,
    jaccard: 12.45,
    lexical_overlap: 54.54,
    unique_overlap: 53.18,
    tfidf_cosine: 40.63,
    semantic_similarity: 72.52,
    num_sent_ctx: 10.93,
    num_sent_clm: 2.06,
    len_ctx: 284.08,
    len_clm: 42.57
  }
];

const complexityMetricsDefinition = [
  { metric: "lcs_ratio (%)", definition: "Tỷ lệ LCS so với độ dài của claim_tokens, (%)" },
  { metric: "nwr (%)", definition: "New Word Ratio: % từ trong claim không có trong context" },
  { metric: "jaccard (%)", definition: "Jaccard Similarity: độ tương đồng tập từ giữa context và claim, (%)" },
  { metric: "lexical_overlap (%)", definition: "Tỷ lệ token trong claim xuất hiện trong context, (%)" },
  { metric: "unique_overlap (%)", definition: "Tỷ lệ từ duy nhất của claim cũng có trong context, (%)" },
  { metric: "tfidf_cosine (%)", definition: "Cosine similarity giữa vector TF–IDF của context và claim, (%)" },
  { metric: "semantic_similarity (%)", definition: "Cosine similarity giữa embeddings SBERT của context và claim, (%)" },
  { metric: "num_sent_ctx", definition: "Số câu trong context (đếm thô theo dấu chấm \".\")" },
  { metric: "num_sent_clm", definition: "Số câu trong claim" },
  { metric: "len_ctx", definition: "Số token (từ) của context" },
  { metric: "len_clm", definition: "Số token (từ) của claim" }
];

const dataSourcesBreakdown = {
  Wikipedia: { total: 9973, percentage: 46.9, rounds: { R1: 2601, R2: 2150, R3: 5222 } },
  VnExpress: { total: 6023, percentage: 28.3, rounds: { R1: 2746, R2: 1155, R3: 2122 } },
  "Báo Lao Động": { total: 1484, percentage: 7.0, rounds: { R1: 0, R2: 389, R3: 1095 } },
  "Báo Pháp Luật": { total: 1123, percentage: 5.3, rounds: { R1: 0, R2: 630, R3: 493 } },
  "Báo Chính Phủ": { total: 1114, percentage: 5.2, rounds: { R1: 0, R2: 614, R3: 500 } },
  "Báo Nhân Dân": { total: 1088, percentage: 5.1, rounds: { R1: 0, R2: 566, R3: 522 } },
  "Thanh Niên": { total: 457, percentage: 2.1, rounds: { R1: 0, R2: 457, R3: 0 } },
}

// Hyperparameters và Training Configuration Data
const plmHyperparameters = {
  environment: "Kaggle Notebook - Tesla P100 (16GB VRAM)",
  config: {
    epochs: 20,
    batchSize: 8,
    gradientAccumulation: 2,
    learningRate: "5e-5",
    weightDecay: "1e-5",
    maxSequenceLength: 256,
    mixedPrecision: true,
    optimizer: "AdamW",
    scheduler: "StepLR(step=5, gamma=0.1)",
    earlyStoppingPatience: 3,
    maxGradientNorm: 1.0,
    device: "Tesla P100"
  },
  models: [
    { name: "mBERT", fullName: "bert-base-multilingual-cased" },
    { name: "phoBERT", fullName: "vinai/phobert-large" },
    { name: "XLM-R", fullName: "xlm-roberta-large" }
  ]
}

const llmApiHyperparameters = {
  environment: "GPT-4o: OpenAI Dashboard, Gemini 2.0 Flash: Vertex AI (GCP)",
  config: {
    epochs: 3,
    batchSize: "5 (R1, R2), 12 (R3)",
    learningRateMultiplier: 2,
    seed: 42,
    maxSequenceLength: "~1024 (tự động xử lý)",
    optimizer: "Hệ thống backend tự động tối ưu",
    mixedPrecision: "Có (ẩn sau API)",
    device: "A100 / TPU (backend hệ thống)"
  }
}

const llmLocalHyperparameters = {
  environment: "Dedicated server - 1× NVIDIA H100 SXM5, 16 CPU, 192GB RAM",
  config: {
    epochs: 3,
    batchSize: "5 (R1, R2), 12 (R3)",
    learningRate: "1e-5",
    gradientAccumulation: 4,
    sequenceLength: 2048,
    checkpointSteps: 1000,
    mixedPrecision: true,
    optimizer: "AdamW (mặc định)",
    device: "H100 SXM5"
  },
  models: ["Gemma3", "Qwen3", "DEEPSEEK R1"]
}

// PLM Performance Data (Fine-tune + BM25)
const plmDetailedResults = {
  mBERT: [
    { evidence: "top1", R1: 27.73, R2: 50.86, R3: 62.42 },
    { evidence: "top2", R1: 24.94, R2: 12.95, R3: 63.53 },
    { evidence: "top3", R1: 39.48, R2: 32.47, R3: 60.18 },
    { evidence: "top4", R1: 25.72, R2: 45.35, R3: 61.90 },
    { evidence: "full_context", R1: 37.05, R2: 16.83, R3: 61.46 }
  ],
  pho_BERT: [
    { evidence: "top1", R1: 40.57, R2: 43.96, R3: 53.45 },
    { evidence: "top2", R1: 29.77, R2: 42.53, R3: 65.20 },
    { evidence: "top3", R1: 41.92, R2: 44.74, R3: 61.85 },
    { evidence: "top4", R1: 44.41, R2: 47.54, R3: 54.34 },
    { evidence: "full_context", R1: 43.10, R2: 26.03, R3: 64.48 }
  ],
  "XLM-R": [
    { evidence: "top1", R1: 29.93, R2: 47.36, R3: 64.62 },
    { evidence: "top2", R1: 47.37, R2: 54.55, R3: 55.99 },
    { evidence: "top3", R1: 47.22, R2: 50.79, R3: 65.18 },
    { evidence: "top4", R1: 30.72, R2: 48.26, R3: 66.89 },
    { evidence: "full_context", R1: 33.41, R2: 11.70, R3: 64.02 }
  ]
}

// LLM Fine-tune Results (full_context)
const llmFinetuneResults = [
  { model: "GPT-4o", R1: 50.70, R2: 57.95, R3: 58.15, type: "API", note: "mini" },
  { model: "Gemini 2.0 Flash", R1: 47.08, R2: 52.93, R3: 56.72, type: "API", note: "" },
  { model: "Gemma3", R1: 41.82, R2: 50.75, R3: 53.94, type: "Local", note: "" },
  { model: "Qwen3", R1: 37.98, R2: 47.93, R3: 51.44, type: "Local", note: "" },
  { model: "DEEPSEEK R1", R1: 42.67, R2: 50.31, R3: 55.72, type: "Local", note: "" }
]

// LLM Prompt Results
const llmPromptResults = [
  { model: "qwen3:14b", method: "Prompt", type: "Open", R1: 45.51, R2: 46.72, R3: 32.37 },
  { model: "deepseek-r1:32b", method: "Prompt", type: "Open", R1: 30.50, R2: 39.44, R3: 35.70 },
  { model: "magistral", method: "Prompt", type: "Open", R1: 37.91, R2: 45.74, R3: 40.16 },
  { model: "cogito:14b", method: "Prompt", type: "Open", R1: 40.41, R2: 46.25, R3: 29.93 },
  { model: "gemma3", method: "Prompt", type: "Open", R1: 38.83, R2: 45.04, R3: 43.34 },
  { model: "phi4-reasoning:14b", method: "Prompt", type: "Open", R1: 41.74, R2: 47.65, R3: 34.68 },
  { model: "gemma_3n_e4b_it", method: "Prompt", type: "Open", R1: 38.73, R2: 45.08, R3: 42.88 },
  { model: "o4_mini", method: "Prompt", type: "Closed", R1: 45.10, R2: 46.77, R3: 30.86 },
  { model: "gemini 2.5 flash", method: "Prompt", type: "Closed", R1: 44.69, R2: 43.94, R3: 31.90 }
]

// References Data
const referencesData = [
  { reference: "fever2018", title: "FEVER: a large-scale dataset for Fact Extraction and VERification", link: "https://arxiv.org/abs/1803.05355", category: "Dataset" },
  { reference: "thorne2019adversarial", title: "Adversarial attacks against Fact Extraction and VERification", link: "https://arxiv.org/abs/1903.05543", category: "Adversarial" },
  { reference: "williams2020adversarialnli", title: "Adversarial NLI: A New Benchmark for Natural Language Understanding", link: "https://aclanthology.org/2020.acl-main.485", category: "Adversarial" },
  { reference: "schuster2021vitaminc", title: "Get Your Vitamin C: Robust Fact Verification with Contrastive Evidence", link: "https://arxiv.org/abs/2103.08541", category: "Methods" },
  { reference: "devlin2019bert", title: "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding", link: "https://arxiv.org/abs/1810.04805", category: "Models" },
  { reference: "conneau2019xlm", title: "Cross-lingual Language Model Pretraining", link: "https://arxiv.org/abs/1901.07291", category: "Models" },
  { reference: "nguyen2020phobert", title: "PhoBERT: Pre-trained language models for Vietnamese", link: "https://arxiv.org/abs/2003.00744", category: "Models" },
  { reference: "huynh2022vinli", title: "ViNLI: A Vietnamese Corpus for Studies on Open-Domain Natural Language Inference", link: "https://aclanthology.org/2022.coling-1.339/", category: "Dataset" },
  { reference: "thang2024viwikifc", title: "ViWikiFC: Fact-Checking for Vietnamese Wikipedia-Based Textual Knowledge Source", link: "https://arxiv.org/abs/2405.07615", category: "Dataset" },
  { reference: "tran2025vifactcheck", title: "ViFactCheck: A New Benchmark Dataset and Methods for Multi-domain News Fact-Checking in Vietnamese", link: "https://arxiv.org/abs/2412.15308", category: "Dataset" },
  { reference: "tran2025bertviet", title: "BERT-based Model for Vietnamese Fact Verification Dataset", link: "https://arxiv.org/abs/2503.00356", category: "Methods" },
  { reference: "uit2023", title: "Vietnamese Fact Verification", link: "https://codalab.lisn.upsaclay.fr/competitions/15497", category: "Competition" },
  { reference: "huyen2024vihealthnli", title: "ViHealthNLI: A Dataset for Vietnamese NLI in Healthcare", link: "https://sigul-2024.ilc.cnr.it/wp-content/uploads/2024/05/Huyen-et-al.pdf", category: "Dataset" },
  { reference: "google2024gemini2", title: "Introducing Gemini 2.0: Our New AI Model for the Agentic Era", link: "https://blog.google/technology/google-deepmind/google-gemini-ai-update-december-2024/", category: "Models" },
  { reference: "google2025gemini2flash", title: "Gemini 2.0 Flash System Card", link: "https://storage.googleapis.com/model-cards/documents/gemini-2-flash.pdf", category: "Models" },
  { reference: "google2025gemini25flash", title: "Gemini 2.5 Flash Preview", link: "https://storage.googleapis.com/model-cards/documents/gemini-2.5-flash-preview.pdf", category: "Models" },
  { reference: "yang2025qwen3", title: "Qwen3 Technical Report", link: "https://arxiv.org/abs/2505.09388", category: "Models" },
  { reference: "guo2025deepseekr1", title: "DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning", link: "https://arxiv.org/abs/2501.12948", category: "Models" },
  { reference: "mistral2025magistral", title: "Magistral", link: "https://arxiv.org/abs/2506.10910", category: "Models" },
  { reference: "gemma2025v3", title: "Gemma 3 Technical Report", link: "https://arxiv.org/abs/2503.19786", category: "Models" },
  { reference: "abdin2025phi4", title: "Phi-4-Reasoning Technical Report", link: "https://arxiv.org/abs/2504.21318", category: "Models" },
  { reference: "deepcogito2025cogito", title: "Introducing Cogito v1 Preview", link: "https://www.deepcogito.com/research/cogito-v1-preview", category: "Models" },
  { reference: "o4mini2025", title: "O3 and O4-mini System Card", link: "https://cdn.openai.com/pdf/2221c875-02dc-4789-800b-e7758f3722c1/o3-and-o4-mini-system-card.pdf", category: "Models" }
]



// Model Comparison Summary
const modelComparisonSummary = [
  {
    group: "PLM (P100 - Kaggle)",
    advantages: "Dễ triển khai, chi phí thấp",
    disadvantages: "Giới hạn bộ nhớ, sequence ngắn",
    color: "bg-green-100 text-green-800"
  },
  {
    group: "LLM (Prompt - OLlama)",
    advantages: "Triển khai nhanh, không cần huấn luyện",
    disadvantages: "Hiệu suất giảm ở R3, không ổn định",
    color: "bg-blue-100 text-blue-800"
  },
  {
    group: "GPT-4o / Gemini Flash",
    advantages: "Backend tối ưu, hiệu suất cao",
    disadvantages: "Không tùy chỉnh chi tiết được",
    color: "bg-purple-100 text-purple-800"
  },
  {
    group: "Gemma3 / Qwen3 (H100)",
    advantages: "Toàn quyền kiểm soát, mạnh với long text",
    disadvantages: "Tốn tài nguyên, cần GPU mạnh",
    color: "bg-red-100 text-red-800"
  }
]

// Detailed ViAdverNLI Analysis Data
const detailedStatsPerRound = [
  {
    round: "R1",
    numSamples: 5347,
    avgClaimLen: 44.02,
    minClaimLen: 8,
    maxClaimLen: 126,
    avgContextLen: 271.46,
    minContextLen: 33,
    maxContextLen: 1935,
    vocabSize: 21022
  },
  {
    round: "R2", 
    numSamples: 5961,
    avgClaimLen: 51.5,
    minClaimLen: 12,
    maxClaimLen: 179,
    avgContextLen: 249.19,
    minContextLen: 50,
    maxContextLen: 1422,
    vocabSize: 21054
  },
  {
    round: "R3",
    numSamples: 9954,
    avgClaimLen: 44.86,
    minClaimLen: 10,
    maxClaimLen: 198,
    avgContextLen: 283.68,
    minContextLen: 62,
    maxContextLen: 1783,
    vocabSize: 25697
  }
]

const dataOriginDistribution = [
  { origin: "VNEXPRESS", count: 2746, round: "R1" },
  { origin: "WIKI", count: 2601, round: "R1" },
  { origin: "WIKI", count: 2150, round: "R2" },
  { origin: "VNEXPRESS", count: 1155, round: "R2" },
  { origin: "BÁO PHÁP LUẬT", count: 630, round: "R2" },
  { origin: "BÁO CHÍNH PHỦ", count: 614, round: "R2" },
  { origin: "BÁO NHÂN DÂN", count: 566, round: "R2" },
  { origin: "THANHNIEN.VN", count: 457, round: "R2" },
  { origin: "BÁO LAO ĐỘNG", count: 389, round: "R2" },
  { origin: "WIKI", count: 5222, round: "R3" },
  { origin: "VNEXPRESS", count: 2122, round: "R3" },
  { origin: "BÁO LAO ĐỘNG", count: 1095, round: "R3" },
  { origin: "BÁO NHÂN DÂN", count: 522, round: "R3" },
  { origin: "BÁO CHÍNH PHỦ", count: 500, round: "R3" },
  { origin: "BÁO PHÁP LUẬT", count: 493, round: "R3" }
]

const splitDistribution = [
  { split: "dev", nei: 642, refuted: 377, supported: 201, round: "R1" },
  { split: "test", nei: 674, refuted: 354, supported: 193, round: "R1" },
  { split: "train", nei: 548, refuted: 1004, supported: 1354, round: "R1" },
  { split: "dev", nei: 630, refuted: 473, supported: 384, round: "R2" },
  { split: "test", nei: 645, refuted: 473, supported: 370, round: "R2" },
  { split: "train", nei: 822, refuted: 1052, supported: 1112, round: "R2" },
  { split: "dev", nei: 527, refuted: 576, supported: 712, round: "R3" },
  { split: "test", nei: 535, refuted: 569, supported: 712, round: "R3" },
  { split: "train", nei: 2367, refuted: 2058, supported: 1898, round: "R3" }
]

const jaccardSimilarity = [
  { round: "R1", avgJaccard: 0.1561, minJaccard: 0.0094, maxJaccard: 0.5714 },
  { round: "R2", avgJaccard: 0.1543, minJaccard: 0, maxJaccard: 0.587 },
  { round: "R3", avgJaccard: 0.1268, minJaccard: 0, maxJaccard: 0.5449 }
]

// Dataset Comparison Data from comparison_report.md
const datasetComparison = [
  {
    name: "ViAdverNLI (R1-R3)",
    description: "benchmark NLI adversarial",
    samples: "~21.3k cặp",
    dataType: "premise/hypothesis",
    labels: "3 nhãn NLI",
    textLength: "premise ~24 từ, hyp ~12-15 từ", 
    method: "human+model loop",
    accuracy: "~58% (SOTA)",
    highlight: "Adversarial 3 rounds",
    color: "bg-red-50 border-red-200 text-red-800"
  },
  {
    name: "ViNLI", 
    description: "NLI corpus đầu tiên",
    samples: ">30k cặp",
    dataType: "premise/hypothesis",
    labels: "3 nhãn NLI",
    textLength: "premise ~24.5 từ, hyp ~18.1 từ",
    method: "manual 5 annotator",
    accuracy: "~79% (SOTA)",
    highlight: "Baseline NLI",
    color: "bg-blue-50 border-blue-200 text-blue-800"
  },
  {
    name: "ViWikiFC",
    description: "Wikipedia-based fact-checking", 
    samples: ">20k cặp",
    dataType: "claim + evidence",
    labels: "3 nhãn FEVER",
    textLength: "claim ~15-20 từ, evidence ~20-40 từ",
    method: "manual FEVER style",
    accuracy: "~79% (SOTA)",
    highlight: "Wikipedia source",
    color: "bg-green-50 border-green-200 text-green-800"
  },
  {
    name: "ViFactCheck",
    description: "news fact-check benchmark",
    samples: "7,232 cặp", 
    dataType: "claim + evidence",
    labels: "3 nhãn",
    textLength: "claim ~12-15 từ, evidence ~30-50 từ",
    method: "manual expert",
    accuracy: "~62% (SOTA)",
    highlight: "News articles",
    color: "bg-yellow-50 border-yellow-200 text-yellow-800"
  },
  {
    name: "ISE-DSC01",
    description: "competition dataset",
    samples: "~49.7k cặp",
    dataType: "claim + context", 
    labels: "3 nhãn",
    textLength: "claim ~10-20 từ, context ~50-100 từ",
    method: "auto+manual",
    accuracy: "~84% (SOTA)",
    highlight: "Largest dataset",
    color: "bg-purple-50 border-purple-200 text-purple-800"
  }
]

const viadvernliHighlights = [
  {
    title: "Độ khó cao",
    description: "Mô hình SOTA chỉ đạt ~58% accuracy, thấp hơn đáng kể so với các dataset khác (~79–84%)",
    icon: "⚡",
    impact: "Thử thách mô hình mạnh nhất"
  },
  {
    title: "Quy trình adversarial 3 vòng", 
    description: "Duy nhất sử dụng human-and-model-in-the-loop để thu thập mẫu gây bẫy cho mô hình",
    icon: "🔄",
    impact: "Phương pháp độc đáo"
  },
  {
    title: "Đa dạng ngôn ngữ",
    description: "Tỷ lệ trùng từ thấp, nhiều cách diễn đạt khác biệt, bao gồm ẩn dụ, thay đổi chi tiết nhỏ", 
    icon: "🌐",
    impact: "Linguistic diversity cao"
  },
  {
    title: "Giá trị huấn luyện",
    description: "Khi huấn luyện trên ViAdverNLI, mô hình cải thiện hiệu quả tổng quát trên các dataset NLI khác",
    icon: "📈", 
    impact: "Cross-dataset improvement"
  },
  {
    title: "Bổ sung khoảng trống",
    description: "Cung cấp benchmark NLI adversarial cho tiếng Việt, mở hướng nghiên cứu robust NLI và fact-checking",
    icon: "🎯",
    impact: "Research gap filling"
  }
]

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
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Enhanced Header */}
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 rounded-xl shadow-xl">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="relative px-8 py-12 text-center space-y-6">
            <div className="flex justify-center items-center gap-3 mb-4">
              <div className="p-3 bg-white bg-opacity-20 rounded-xl">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-5xl font-bold text-white">ViAdverNLI Dashboard</h1>
            </div>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Phân tích toàn diện bộ dữ liệu Fact-checking & Suy luận ngôn ngữ tự nhiên đối kháng tiếng Việt
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-4 py-3 flex items-center gap-2">
                <Database className="w-5 h-5 text-blue-200" />
                <span className="text-white font-semibold">21,262 mẫu dữ liệu</span>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-4 py-3 flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-200" />
                <span className="text-white font-semibold">3 Rounds đối kháng</span>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-4 py-3 flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-200" />
                <span className="text-white font-semibold">7 Datasets đánh giá</span>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-4 py-3 flex items-center gap-2">
                <Award className="w-5 h-5 text-blue-200" />
                <span className="text-white font-semibold">Kappa &gt; 0.80</span>
              </div>
            </div>
            <div className="mt-6 text-blue-100 text-sm">
              <p>🏆 Bộ dữ liệu thử thách khó nhất cho NLI tiếng Việt • 🎯 SOTA chỉ đạt 58% accuracy</p>
            </div>
          </div>
        </div>

        {/* Main Tabs */}
        <Tabs value={selectedRound} onValueChange={setSelectedRound} className="w-full">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="overview">Tổng quan</TabsTrigger>
            <TabsTrigger value="dataset">Phân tích Dữ liệu</TabsTrigger>
            <TabsTrigger value="performance">Hiệu suất Mô hình</TabsTrigger>
            <TabsTrigger value="training">Cấu hình Huấn luyện</TabsTrigger>
            <TabsTrigger value="weaknesses">Điểm yếu Mô hình</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
            <TabsTrigger value="references">Tham khảo</TabsTrigger>
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

            {/* Dataset Comparison */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  So sánh với các Dataset NLI/Fact-checking Tiếng Việt
                </CardTitle>
                <CardDescription>
                  Vị trí của ViAdverNLI trong hệ sinh thái các bộ dữ liệu NLI và fact-checking tiếng Việt
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 p-3 text-left min-w-[120px]">Dataset</th>
                        <th className="border border-gray-300 p-3 text-center">Mô tả</th>
                        <th className="border border-gray-300 p-3 text-center">Số mẫu</th>
                        <th className="border border-gray-300 p-3 text-center">Loại dữ liệu</th>
                        <th className="border border-gray-300 p-3 text-center">Độ dài text</th>
                        <th className="border border-gray-300 p-3 text-center">Phương pháp</th>
                        <th className="border border-gray-300 p-3 text-center">SOTA Accuracy</th>
                      </tr>
                    </thead>
                    <tbody>
                      {datasetComparison.map((dataset, index) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                          <td className="border border-gray-300 p-3">
                            <div className={`p-2 rounded border ${dataset.color}`}>
                              <div className="font-bold">{dataset.name}</div>
                              <div className="text-xs mt-1">{dataset.highlight}</div>
                            </div>
                          </td>
                          <td className="border border-gray-300 p-3 text-center">{dataset.description}</td>
                          <td className="border border-gray-300 p-3 text-center font-medium">{dataset.samples}</td>
                          <td className="border border-gray-300 p-3 text-center">{dataset.dataType}</td>
                          <td className="border border-gray-300 p-3 text-center text-xs">{dataset.textLength}</td>
                          <td className="border border-gray-300 p-3 text-center">{dataset.method}</td>
                          <td className="border border-gray-300 p-3 text-center">
                            <span className={`font-bold ${dataset.name.includes('ViAdverNLI') ? 'text-red-600' : 'text-green-600'}`}>
                              {dataset.accuracy}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* ViAdverNLI Unique Features */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Đặc điểm Nổi bật của ViAdverNLI
                </CardTitle>
                <CardDescription>
                  Những yếu tố độc đáo khiến ViAdverNLI trở thành benchmark thử thách cho NLI tiếng Việt
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {viadvernliHighlights.map((highlight, index) => (
                    <Card key={index} className="border-l-4 border-l-blue-500">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="text-2xl">{highlight.icon}</div>
                          <div className="flex-1">
                            <h4 className="font-bold text-sm mb-2">{highlight.title}</h4>
                            <p className="text-xs text-gray-600 mb-2">{highlight.description}</p>
                            <Badge variant="outline" className="text-xs">
                              {highlight.impact}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Accuracy Comparison Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  So sánh Độ khó qua SOTA Accuracy
                </CardTitle>
                <CardDescription>
                  ViAdverNLI là dataset khó nhất, thử thách khả năng suy luận của mô hình AI
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart 
                        data={datasetComparison.map(d => ({
                          name: d.name.split(' ')[0],
                          accuracy: parseFloat(d.accuracy.replace(/[^0-9.]/g, '')),
                          samples: parseInt(d.samples.replace(/[^0-9]/g, '')) / 1000
                        }))}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[40, 90]} />
                        <Tooltip formatter={(value, name) => [value + '%', 'SOTA Accuracy']} />
                        <Bar dataKey="accuracy" fill="#ef4444" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <h4 className="font-bold text-red-800 mb-2">🎯 ViAdverNLI: Thử thách khó nhất</h4>
                      <ul className="text-sm text-red-700 space-y-1">
                        <li>• <strong>58% SOTA accuracy</strong> - thấp nhất trong tất cả</li>
                        <li>• <strong>26% gap</strong> so với dataset dễ nhất (ISE-DSC01: 84%)</li>
                        <li>• <strong>Adversarial design</strong> - gây khó cho mô hình SOTA</li>
                        <li>• <strong>Human-in-the-loop</strong> - claims được crafted để đánh lừa AI</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h4 className="font-bold text-blue-800 mb-2">📊 Ranking độ khó:</h4>
                      <ol className="text-sm text-blue-700 space-y-1">
                        <li><strong>1. ViAdverNLI (58%)</strong> - Cực khó 🔴</li>
                        <li><strong>2. ViFactCheck (62%)</strong> - Khó 🟡</li> 
                        <li><strong>3. ViNLI (79%)</strong> - Trung bình 🟢</li>
                        <li><strong>4. ViWikiFC (79%)</strong> - Trung bình 🟢</li>
                        <li><strong>5. ISE-DSC01 (84%)</strong> - Dễ 🟢</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

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

            {/* Detailed Statistics Per Round */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  Thống kê Chi tiết theo Vòng
                </CardTitle>
                <CardDescription>Phân tích độ dài claim/context, vocabulary size và các thống kê cơ bản</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 p-2 text-left">Round</th>
                        <th className="border border-gray-300 p-2 text-center">Samples</th>
                        <th className="border border-gray-300 p-2 text-center">Avg Claim Len</th>
                        <th className="border border-gray-300 p-2 text-center">Claim Range</th>
                        <th className="border border-gray-300 p-2 text-center">Avg Context Len</th>
                        <th className="border border-gray-300 p-2 text-center">Context Range</th>
                        <th className="border border-gray-300 p-2 text-center">Vocab Size</th>
                      </tr>
                    </thead>
                    <tbody>
                      {detailedStatsPerRound.map((stat, index) => (
                        <tr key={stat.round} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                          <td className="border border-gray-300 p-2 font-medium">{stat.round}</td>
                          <td className="border border-gray-300 p-2 text-center">{stat.numSamples.toLocaleString()}</td>
                          <td className="border border-gray-300 p-2 text-center">{stat.avgClaimLen}</td>
                          <td className="border border-gray-300 p-2 text-center">{stat.minClaimLen}-{stat.maxClaimLen}</td>
                          <td className="border border-gray-300 p-2 text-center">{stat.avgContextLen}</td>
                          <td className="border border-gray-300 p-2 text-center">{stat.minContextLen}-{stat.maxContextLen}</td>
                          <td className="border border-gray-300 p-2 text-center">{stat.vocabSize.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Data Origin Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Phân bố Nguồn gốc Dữ liệu Chi tiết
                </CardTitle>
                <CardDescription>Số lượng mẫu từ từng nguồn báo chí và Wikipedia qua các rounds</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart data={detailedStatsPerRound}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="round" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="numSamples" fill="#8884d8" name="Số mẫu" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-medium">Top nguồn dữ liệu theo Round:</h4>
                    <div className="grid grid-cols-1 gap-4">
                      {["R1", "R2", "R3"].map(round => (
                        <div key={round} className="p-3 border rounded-lg">
                          <h5 className="font-medium mb-2">{round}</h5>
                          <div className="space-y-1 text-sm">
                            {dataOriginDistribution
                              .filter(item => item.round === round)
                              .sort((a, b) => b.count - a.count)
                              .slice(0, 3)
                              .map((item, index) => (
                                <div key={index} className="flex justify-between">
                                  <span>{item.origin}</span>
                                  <span className="font-medium">{item.count.toLocaleString()}</span>
                                </div>
                              ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Train/Dev/Test Split Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Phân tích Train/Dev/Test Split
                </CardTitle>
                <CardDescription>Phân bố nhãn trong các tập train, dev, test qua các rounds</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="R1" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="R1">Round 1</TabsTrigger>
                    <TabsTrigger value="R2">Round 2</TabsTrigger>
                    <TabsTrigger value="R3">Round 3</TabsTrigger>
                  </TabsList>

                  {["R1", "R2", "R3"].map(round => (
                    <TabsContent key={round} value={round}>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                          <ResponsiveContainer width="100%" height={300}>
                            <BarChart 
                              data={splitDistribution.filter(item => item.round === round)}
                              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="split" />
                              <YAxis />
                              <Tooltip />
                              <Legend />
                              <Bar dataKey="supported" fill="#10b981" name="SUPPORTED" />
                              <Bar dataKey="refuted" fill="#ef4444" name="REFUTED" />
                              <Bar dataKey="nei" fill="#6b7280" name="NEI" />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>

                        <div className="space-y-3">
                          {splitDistribution
                            .filter(item => item.round === round)
                            .map((split, index) => {
                              const total = split.supported + split.refuted + split.nei
                              return (
                                <div key={index} className="p-3 border rounded-lg">
                                  <h5 className="font-medium mb-2 capitalize">{split.split} ({total.toLocaleString()} mẫu)</h5>
                                  <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                      <span>SUPPORTED</span>
                                      <span>{split.supported} ({(split.supported/total*100).toFixed(1)}%)</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                      <span>REFUTED</span>
                                      <span>{split.refuted} ({(split.refuted/total*100).toFixed(1)}%)</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                      <span>NEI</span>
                                      <span>{split.nei} ({(split.nei/total*100).toFixed(1)}%)</span>
                                    </div>
                                  </div>
                                </div>
                              )
                            })}
                        </div>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>

            {/* Similarity Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  Phân tích Độ tương đồng (Jaccard Similarity)
                </CardTitle>
                <CardDescription>Độ tương đồng từ vựng giữa claim và context qua các rounds</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={jaccardSimilarity}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="round" />
                        <YAxis domain={[0, 0.6]} />
                        <Tooltip formatter={(value, name) => [(value * 100).toFixed(2) + '%', name]} />
                        <Legend />
                        <Bar dataKey="avgJaccard" fill="#3b82f6" name="Avg Jaccard" />
                        <Bar dataKey="maxJaccard" fill="#10b981" name="Max Jaccard" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium">Insight về Độ tương đồng:</h4>
                    {jaccardSimilarity.map((sim, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <h5 className="font-medium">{sim.round}</h5>
                        <div className="space-y-1 text-sm mt-2">
                          <div className="flex justify-between">
                            <span>Trung bình:</span>
                            <span className="font-medium">{(sim.avgJaccard * 100).toFixed(2)}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Tối thiểu:</span>
                            <span className="font-medium">{(sim.minJaccard * 100).toFixed(2)}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Tối đa:</span>
                            <span className="font-medium">{(sim.maxJaccard * 100).toFixed(2)}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <h5 className="font-medium text-blue-800">📊 Nhận xét:</h5>
                      <ul className="text-sm text-blue-700 mt-2 space-y-1">
                        <li>• Độ tương đồng từ vựng giảm dần qua các rounds</li>
                        <li>• R3 có độ khó cao nhất (Jaccard thấp nhất)</li>
                        <li>• Adversarial claims ngày càng tinh vi hơn</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Text Length Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Phân tích Độ dài Text
                </CardTitle>
                <CardDescription>So sánh độ dài claim và context qua các rounds</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Độ dài Claim</h4>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={detailedStatsPerRound}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="round" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="avgClaimLen" fill="#f59e0b" name="Avg Length" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Độ dài Context</h4>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={detailedStatsPerRound}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="round" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="avgContextLen" fill="#8b5cf6" name="Avg Length" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="font-medium text-yellow-800 mb-2">🔍 Observations:</h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• <strong>R2 có claim dài nhất</strong> (51.5 từ trung bình) - phức tạp nhất</li>
                    <li>• <strong>R3 có context dài nhất</strong> (283.68 từ) - nhiều thông tin nhất</li>
                    <li>• <strong>Vocabulary tăng</strong> từ 21K (R1,R2) lên 25K (R3)</li>
                    <li>• <strong>Độ dài range rộng</strong>: Context từ 33-1935 từ, Claim từ 8-198 từ</li>
                  </ul>
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

            {/* Complexity Evaluation Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  Đánh giá Độ phức tạp Suy luận Dataset
                </CardTitle>
                <CardDescription>
                  Phân tích độ phức tạp suy luận thông qua các metrics word overlap và semantic similarity, sử dụng SBERT để tạo embeddings và tính toán tương quan cosine similarity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Methodology Description */}
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">📝 Phương pháp Đánh giá:</h4>
                    <div className="text-sm text-blue-700 space-y-2">
                      <p><strong>Word Overlap:</strong> Sử dụng Longest Common Subsequence (LCS), New Word Ratio (NWR), Jaccard Similarity (JS), và Lexical Overlap</p>
                      <p><strong>Semantic Similarity:</strong> Sử dụng khái niệm Related Words, tạo embeddings với SBERT và tính correlation bằng cosine similarity</p>
                      <p><strong>Reference:</strong> <a href="https://arxiv.org/pdf/1908.10084" target="_blank" className="text-blue-600 underline">Sentence-BERT: Sentence Embeddings using Siamese BERT-Networks</a></p>
                    </div>
                  </div>

                  {/* Main Data Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border border-gray-300 p-2 text-left">Round</th>
                          <th className="border border-gray-300 p-2 text-left">Split</th>
                          <th className="border border-gray-300 p-2 text-center">LCS Ratio (%)</th>
                          <th className="border border-gray-300 p-2 text-center">NWR (%)</th>
                          <th className="border border-gray-300 p-2 text-center">Jaccard (%)</th>
                          <th className="border border-gray-300 p-2 text-center">Lexical Overlap (%)</th>
                          <th className="border border-gray-300 p-2 text-center">Unique Overlap (%)</th>
                          <th className="border border-gray-300 p-2 text-center">TF-IDF Cosine (%)</th>
                          <th className="border border-gray-300 p-2 text-center">Semantic Similarity (%)</th>
                          <th className="border border-gray-300 p-2 text-center">Sent CTX</th>
                          <th className="border border-gray-300 p-2 text-center">Sent CLM</th>
                          <th className="border border-gray-300 p-2 text-center">Len CTX</th>
                          <th className="border border-gray-300 p-2 text-center">Len CLM</th>
                        </tr>
                      </thead>
                      <tbody>
                        {complexityEvaluationData.map((row, index) => (
                          <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                            <td className="border border-gray-300 p-2 font-medium">{row.round}</td>
                            <td className="border border-gray-300 p-2 font-medium capitalize">{row.split}</td>
                            <td className="border border-gray-300 p-2 text-center">{row.lcs_ratio}</td>
                            <td className="border border-gray-300 p-2 text-center">{row.nwr}</td>
                            <td className="border border-gray-300 p-2 text-center">{row.jaccard}</td>
                            <td className="border border-gray-300 p-2 text-center">{row.lexical_overlap}</td>
                            <td className="border border-gray-300 p-2 text-center">{row.unique_overlap}</td>
                            <td className="border border-gray-300 p-2 text-center">{row.tfidf_cosine}</td>
                            <td className="border border-gray-300 p-2 text-center">{row.semantic_similarity}</td>
                            <td className="border border-gray-300 p-2 text-center">{row.num_sent_ctx}</td>
                            <td className="border border-gray-300 p-2 text-center">{row.num_sent_clm}</td>
                            <td className="border border-gray-300 p-2 text-center">{row.len_ctx}</td>
                            <td className="border border-gray-300 p-2 text-center">{row.len_clm}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Metrics Definition Table */}
                  <div>
                    <h4 className="font-medium mb-3">🔍 Giải thích các Metrics:</h4>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {complexityMetricsDefinition.map((item, index) => (
                        <div key={index} className="p-3 border rounded-lg">
                          <div className="font-medium text-sm">{item.metric}</div>
                          <div className="text-xs text-gray-600 mt-1">{item.definition}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Visual Analysis */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3">📊 Jaccard Similarity xu hướng giảm</h4>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={complexityEvaluationData.filter(d => d.split === 'train')}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="round" />
                          <YAxis domain={[10, 20]} />
                          <Tooltip formatter={(value, name) => [`${value}%`, 'Jaccard Similarity']} />
                          <Line type="monotone" dataKey="jaccard" stroke="#ef4444" strokeWidth={2} name="Jaccard %" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3">📈 New Word Ratio tăng dần</h4>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={complexityEvaluationData.filter(d => d.split === 'train')}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="round" />
                          <YAxis domain={[30, 50]} />
                          <Tooltip formatter={(value, name) => [`${value}%`, 'New Word Ratio']} />
                          <Line type="monotone" dataKey="nwr" stroke="#3b82f6" strokeWidth={2} name="NWR %" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Key Insights */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <h4 className="font-medium text-red-800 mb-2">🔻 Jaccard Similarity giảm</h4>
                      <div className="text-sm text-red-700 space-y-1">
                        <div>R1: 16.21% → R3: 12.45%</div>
                        <div>Độ tương đồng từ vựng giảm dần</div>
                        <div>Claims ngày càng đa dạng hơn</div>
                      </div>
                    </div>

                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h4 className="font-medium text-blue-800 mb-2">📈 New Word Ratio tăng</h4>
                      <div className="text-sm text-blue-700 space-y-1">
                        <div>R1: 38.07% → R3: 46.82%</div>
                        <div>Nhiều từ mới không có trong context</div>
                        <div>Tăng độ khó suy luận</div>
                      </div>
                    </div>

                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <h4 className="font-medium text-green-800 mb-2">⚖️ Semantic Similarity ổn định</h4>
                      <div className="text-sm text-green-700 space-y-1">
                        <div>R1-R3: ~72-76%</div>
                        <div>SBERT embeddings tương đối nhất quán</div>
                        <div>Ngữ nghĩa cấp cao được bảo toàn</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h4 className="font-medium text-yellow-800 mb-2">🎯 Kết luận về Độ phức tạp Dataset:</h4>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• <strong>Tăng dần độ khó lexical:</strong> Jaccard similarity giảm từ R1 → R3, New Word Ratio tăng</li>
                      <li>• <strong>Claims adversarial ngày càng tinh vi:</strong> Ít từ chung với context nhưng vẫn giữ được semantic coherence</li>
                      <li>• <strong>SBERT embeddings ổn định:</strong> Semantic similarity ~72-76% cho thấy claims vẫn có ý nghĩa liên quan đến context</li>
                      <li>• <strong>R3 thách thức nhất:</strong> Jaccard thấp nhất (12.45%) + NWR cao nhất (46.82%) = độ khó cực đại</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
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

            {/* Method Comparison Chart */}
            <Card>
              <CardHeader>
                <CardTitle>So sánh Hiệu suất các Phương pháp</CardTitle>
                <CardDescription>
                  So sánh hiệu suất tốt nhất của PLM, LLM Fine-tune và LLM Prompt trên R1, R2, R3
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart
                    data={[
                      { round: "R1", PLM: 47.22, "LLM Fine-tune": 50.7, "LLM Prompt": 45.51 },
                      { round: "R2", PLM: 54.55, "LLM Fine-tune": 57.95, "LLM Prompt": 47.65 },
                      { round: "R3", PLM: 66.89, "LLM Fine-tune": 58.15, "LLM Prompt": 43.34 }
                    ]}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="round" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="PLM" fill="#10b981" name="PLM (Best: XLM-R/phoBERT)" />
                    <Bar dataKey="LLM Fine-tune" fill="#8b5cf6" name="LLM Fine-tune (GPT-4o)" />
                    <Bar dataKey="LLM Prompt" fill="#3b82f6" name="LLM Prompt (phi4-reasoning)" />
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
                  <CardTitle className="text-sm">Hiệu suất Cao nhất (PLM)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">84.50%</div>
                  <p className="text-xs text-gray-600">XLM-R trên ISE-DSC01</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Hiệu suất Cao nhất (LLM)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600">58.15%</div>
                  <p className="text-xs text-gray-600">GPT-4o trên R3</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Best Prompt Model</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">47.65%</div>
                  <p className="text-xs text-gray-600">phi4-reasoning:14b</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Cost-Effective</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">66.89%</div>
                  <p className="text-xs text-gray-600">phoBERT (Free on Kaggle)</p>
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

          {/* Training Configuration Tab */}
          <TabsContent value="training" className="space-y-6">
            {/* Training Environment Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-l-4 border-l-green-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-green-600" />
                    PLM Fine-tune
                  </CardTitle>
                  <CardDescription>Kaggle - Tesla P100</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Chi phí:</span>
                    <span className="text-green-600 font-medium">Miễn phí</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Triển khai:</span>
                    <span className="text-green-600 font-medium">Dễ</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tùy chỉnh:</span>
                    <span className="text-green-600 font-medium">Cao</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800 w-full justify-center">
                    mBERT, phoBERT, XLM-R
                  </Badge>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Cloud className="w-5 h-5 text-purple-600" />
                    LLM API Fine-tune
                  </CardTitle>
                  <CardDescription>OpenAI / Google Cloud</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Chi phí:</span>
                    <span className="text-purple-600 font-medium">Cao</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Triển khai:</span>
                    <span className="text-purple-600 font-medium">Rất dễ</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tùy chỉnh:</span>
                    <span className="text-purple-600 font-medium">Thấp</span>
                  </div>
                  <Badge className="bg-purple-100 text-purple-800 w-full justify-center">
                    GPT-4o, Gemini 2.0
                  </Badge>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-red-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Server className="w-5 h-5 text-red-600" />
                    LLM Local Fine-tune
                  </CardTitle>
                  <CardDescription>H100 SXM5 Server</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Chi phí:</span>
                    <span className="text-red-600 font-medium">Rất cao</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Triển khai:</span>
                    <span className="text-red-600 font-medium">Khó</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tùy chỉnh:</span>
                    <span className="text-red-600 font-medium">Tối đa</span>
                  </div>
                  <Badge className="bg-red-100 text-red-800 w-full justify-center">
                    Gemma3, Qwen3, DEEPSEEK
                  </Badge>
                </CardContent>
              </Card>
            </div>

            {/* Model Comparison Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  So sánh Tổng quan theo Mô hình
                </CardTitle>
                <CardDescription>Ưu điểm và hạn chế của từng nhóm mô hình</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {modelComparisonSummary.map((item, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{item.group}</h4>
                        <Badge className={item.color}>{item.group.split('(')[0].trim()}</Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-green-700 font-medium">✅ Ưu điểm:</p>
                          <p className="text-gray-600">{item.advantages}</p>
                        </div>
                        <div>
                          <p className="text-red-700 font-medium">❌ Hạn chế:</p>
                          <p className="text-gray-600">{item.disadvantages}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* PLM Hyperparameters Detail */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-green-600" />
                  Chi tiết Cấu hình PLM (mBERT, phoBERT, XLM-R)
                </CardTitle>
                <CardDescription>{plmHyperparameters.environment}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">⚙️ Hyperparameters</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Epochs:</span>
                        <span className="font-medium">{plmHyperparameters.config.epochs}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Batch Size:</span>
                        <span className="font-medium">{plmHyperparameters.config.batchSize}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Learning Rate:</span>
                        <span className="font-medium">{plmHyperparameters.config.learningRate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Max Sequence Length:</span>
                        <span className="font-medium">{plmHyperparameters.config.maxSequenceLength}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Optimizer:</span>
                        <span className="font-medium">{plmHyperparameters.config.optimizer}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Mixed Precision:</span>
                        <span className="font-medium">{plmHyperparameters.config.mixedPrecision ? 'Có' : 'Không'}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">🔧 Chi tiết Kỹ thuật</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Gradient Accumulation:</span>
                        <span className="font-medium">{plmHyperparameters.config.gradientAccumulation}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Weight Decay:</span>
                        <span className="font-medium">{plmHyperparameters.config.weightDecay}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Scheduler:</span>
                        <span className="font-medium">{plmHyperparameters.config.scheduler}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Early Stopping:</span>
                        <span className="font-medium">{plmHyperparameters.config.earlyStoppingPatience} epochs</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Max Gradient Norm:</span>
                        <span className="font-medium">{plmHyperparameters.config.maxGradientNorm}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>GPU:</span>
                        <span className="font-medium">{plmHyperparameters.config.device}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t">
                  <h4 className="font-medium mb-3">🤖 Mô hình cụ thể</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {plmHyperparameters.models.map((model, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg">
                        <p className="font-medium">{model.name}</p>
                        <p className="text-xs text-gray-600">{model.fullName}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* LLM Configurations */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Cloud className="w-5 h-5 text-purple-600" />
                    Cấu hình LLM API (GPT-4o / Gemini)
                  </CardTitle>
                  <CardDescription>{llmApiHyperparameters.environment}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Epochs:</span>
                      <span className="font-medium">{llmApiHyperparameters.config.epochs}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Batch Size:</span>
                      <span className="font-medium">{llmApiHyperparameters.config.batchSize}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>LR Multiplier:</span>
                      <span className="font-medium">{llmApiHyperparameters.config.learningRateMultiplier}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Seed:</span>
                      <span className="font-medium">{llmApiHyperparameters.config.seed}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Max Sequence:</span>
                      <span className="font-medium">{llmApiHyperparameters.config.maxSequenceLength}</span>
                    </div>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <p className="text-xs text-purple-700">
                      💡 Backend tự động tối ưu hyperparameters và infrastructure
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Server className="w-5 h-5 text-red-600" />
                    Cấu hình LLM Local (H100)
                  </CardTitle>
                  <CardDescription>{llmLocalHyperparameters.environment}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Epochs:</span>
                      <span className="font-medium">{llmLocalHyperparameters.config.epochs}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Batch Size:</span>
                      <span className="font-medium">{llmLocalHyperparameters.config.batchSize}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Learning Rate:</span>
                      <span className="font-medium">{llmLocalHyperparameters.config.learningRate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Gradient Accumulation:</span>
                      <span className="font-medium">{llmLocalHyperparameters.config.gradientAccumulation}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sequence Length:</span>
                      <span className="font-medium">{llmLocalHyperparameters.config.sequenceLength}</span>
                    </div>
                  </div>
                  <div className="p-3 bg-red-50 rounded-lg">
                    <p className="text-xs text-red-700">
                      ⚡ Toàn quyền kiểm soát, xử lý long text tốt nhất
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {llmLocalHyperparameters.models.map((model, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {model}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Performance Results from New Data */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Kết quả Hiệu suất PLM (Fine-tune + SBERT + BM25)
                </CardTitle>
                <CardDescription>Hiệu suất chi tiết với evidence retrieval sử dụng SBERT + BM25 hybrid approach</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Evidence Retrieval Methodology */}
                <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Settings className="w-5 h-5 text-blue-600" />
                    <h3 className="text-lg font-semibold text-blue-800">🔍 Evidence Retrieval Methodology</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-blue-800 mb-2">📋 Hybrid Retrieval Pipeline:</h4>
                      <div className="space-y-2 text-sm text-blue-700">
                        <div className="flex items-start gap-2">
                          <span className="font-mono bg-blue-100 px-2 py-1 rounded text-xs">1.</span>
                          <span><strong>SBERT Encoding:</strong> sentence-transformers/all-MiniLM-L6-v2</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="font-mono bg-blue-100 px-2 py-1 rounded text-xs">2.</span>
                          <span><strong>BM25 Scoring:</strong> Traditional keyword-based retrieval</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="font-mono bg-blue-100 px-2 py-1 rounded text-xs">3.</span>
                          <span><strong>Hybrid Fusion:</strong> Combine semantic + lexical signals</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="font-mono bg-blue-100 px-2 py-1 rounded text-xs">4.</span>
                          <span><strong>Top-N Selection:</strong> Extract most relevant evidence chunks</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-blue-800 mb-2">🎯 Evidence Types & Performance:</h4>
                      <div className="space-y-2 text-sm text-blue-700">
                        <div className="flex justify-between items-center p-2 bg-blue-100 rounded">
                          <span><strong>top1:</strong> Most relevant chunk only</span>
                          <span className="font-mono text-xs">Precision focused</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-blue-100 rounded">
                          <span><strong>top2-4:</strong> Multiple evidence chunks</span>
                          <span className="font-mono text-xs">Recall balanced</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-blue-100 rounded">
                          <span><strong>full_context:</strong> Complete document</span>
                          <span className="font-mono text-xs">Baseline approach</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded">
                    <h5 className="font-medium text-green-800 mb-1">✅ Best Configuration Found:</h5>
                    <p className="text-sm text-green-700">
                      <strong>XLM-R + top4 evidence:</strong> Đạt 66.89% trên R3, cân bằng tốt giữa precision và recall. 
                      SBERT semantic understanding + BM25 keyword matching tạo ra evidence quality tối ưu.
                    </p>
                  </div>
                </div>
                
                {/* Performance Tables */}
                <Tabs defaultValue="mBERT" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="mBERT">mBERT</TabsTrigger>
                    <TabsTrigger value="pho_BERT">phoBERT</TabsTrigger>
                    <TabsTrigger value="XLM-R">XLM-R</TabsTrigger>
                  </TabsList>

                  {Object.entries(plmDetailedResults).map(([modelName, results]) => (
                    <TabsContent key={modelName} value={modelName}>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm border-collapse border border-gray-300">
                          <thead>
                            <tr className="bg-gray-100">
                              <th className="border border-gray-300 p-2 text-left">Evidence Type</th>
                              <th className="border border-gray-300 p-2 text-center">R1</th>
                              <th className="border border-gray-300 p-2 text-center">R2</th>
                              <th className="border border-gray-300 p-2 text-center">R3</th>
                              <th className="border border-gray-300 p-2 text-center">Best</th>
                            </tr>
                          </thead>
                          <tbody>
                            {results.map((row, index) => {
                              const best = Math.max(row.R1, row.R2, row.R3)
                              return (
                                <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                  <td className="border border-gray-300 p-2 font-medium">{row.evidence}</td>
                                  <td className={`border border-gray-300 p-2 text-center ${getPerformanceColor(row.R1)}`}>
                                    {row.R1}
                                  </td>
                                  <td className={`border border-gray-300 p-2 text-center ${getPerformanceColor(row.R2)}`}>
                                    {row.R2}
                                  </td>
                                  <td className={`border border-gray-300 p-2 text-center ${getPerformanceColor(row.R3)}`}>
                                    {row.R3}
                                  </td>
                                  <td className={`border border-gray-300 p-2 text-center font-bold ${getPerformanceColor(best)}`}>
                                    {best}
                                  </td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>

            {/* LLM Results Comparison */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    LLM Fine-tune Results
                  </CardTitle>
                  <CardDescription>Hiệu suất mô hình LLM sau fine-tuning</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {llmFinetuneResults.map((model, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{model.model}</h4>
                            <Badge variant="outline" className={model.type === 'API' ? 'bg-purple-100 text-purple-800' : 'bg-red-100 text-red-800'}>
                              {model.type}
                            </Badge>
                            {model.note && <Badge variant="secondary">{model.note}</Badge>}
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-bold text-blue-600">Best: {Math.max(model.R1, model.R2, model.R3)}%</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-sm">
                          <div className="text-center">
                            <div className="text-gray-500">R1</div>
                            <div className={`font-medium ${getPerformanceColor(model.R1)}`}>{model.R1}%</div>
                          </div>
                          <div className="text-center">
                            <div className="text-gray-500">R2</div>
                            <div className={`font-medium ${getPerformanceColor(model.R2)}`}>{model.R2}%</div>
                          </div>
                          <div className="text-center">
                            <div className="text-gray-500">R3</div>
                            <div className={`font-medium ${getPerformanceColor(model.R3)}`}>{model.R3}%</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h4 className="font-medium text-yellow-800 mb-2">📊 Key Insights từ LLM Fine-tune Results:</h4>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• <strong>GPT-4o dẫn đầu:</strong> Hiệu suất cao nhất 58.15% R3, tăng mạnh từ 50.70% R1</li>
                      <li>• <strong>Gemini 2.0 Flash runner-up:</strong> 56.72% R3, stable performance qua các rounds</li>
                      <li>• <strong>DEEPSEEK R1 ấn tượng:</strong> 55.72% R3, local model tốt nhất, cạnh tranh với API</li>
                      <li>• <strong>Xu hướng tăng dần:</strong> Tất cả models đều cải thiện đáng kể từ R1 → R3</li>
                      <li>• <strong>Fine-tuning vượt trội:</strong> Hiệu suất cao hơn 10-15% so với prompting thuần túy</li>
                      <li>• <strong>Gap API vs Local:</strong> Chỉ ~3% chênh lệch, cho thấy local models ngày càng mạnh</li>
                      <li>• <strong>Consistency:</strong> Gemma3 và Qwen3 đều ổn định, cải thiện đều đặn qua rounds</li>
                    </ul>
                  </div>

                  {/* LLM Fine-tune Prompt Template */}
                  <div className="mt-6 p-4 bg-slate-50 border border-slate-200 rounded-lg">
                    <h4 className="font-medium text-slate-800 mb-3">🔧 Prompt Template cho LLM Fine-tune:</h4>
                    <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                      <div className="text-blue-400 mb-2">// Fine-tune Messages Format</div>
                      <pre className="whitespace-pre-wrap text-xs">
{`prompt_msgs = [
    {
        "role": "system",
        "content": (
            "You are a fact-checking assistant. "
            "Given the context and a claim, decide whether the claim is "
            "SUPPORTED, REFUTED, or NEI (Not Enough Information). "
            "Respond with only one word: SUPPORTED, REFUTED, or NEI."
        )
    },
    {
        "role": "user",
        "content": f"Context: {row['context']}\\nClaim: {row['claim']}"
    }
]`}
                      </pre>
                    </div>
                    
                    <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h5 className="font-medium text-slate-700 text-sm">✨ Đặc điểm Fine-tune Template:</h5>
                        <ul className="text-xs text-slate-600 space-y-1">
                          <li>• <strong>Simple & Direct:</strong> Yêu cầu output đơn giản</li>
                          <li>• <strong>Messages Format:</strong> System + User role rõ ràng</li>
                          <li>• <strong>Minimal Instruction:</strong> Tối ưu cho fine-tuning</li>
                          <li>• <strong>One Word Output:</strong> Dễ parse và đánh giá</li>
                        </ul>
                      </div>
                      
                      <div className="space-y-2">
                        <h5 className="font-medium text-slate-700 text-sm">🎯 So sánh với Prompting:</h5>
                        <ul className="text-xs text-slate-600 space-y-1">
                          <li>• <strong>Ngắn gọn hơn:</strong> Không cần 4-step reasoning</li>
                          <li>• <strong>Hiệu quả hơn:</strong> +10-15% accuracy improvement</li>
                          <li>• <strong>Ổn định hơn:</strong> Ít bị ảnh hưởng bởi adversarial</li>
                          <li>• <strong>Chi phí thấp hơn:</strong> Sau khi fine-tune</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5" />
                    Full LLM Prompt Results
                  </CardTitle>
                  <CardDescription>Hiệu suất đầy đủ của tất cả mô hình LLM với prompting</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border border-gray-300 p-3 text-left">Model</th>
                          <th className="border border-gray-300 p-3 text-center">Method</th>
                          <th className="border border-gray-300 p-3 text-center">Type</th>
                          <th className="border border-gray-300 p-3 text-center">R1</th>
                          <th className="border border-gray-300 p-3 text-center">R2</th>
                          <th className="border border-gray-300 p-3 text-center">R3</th>
                          <th className="border border-gray-300 p-3 text-center">Best</th>
                        </tr>
                      </thead>
                      <tbody>
                        {llmPromptResults
                          .slice()
                          .sort((a, b) => Math.max(b.R1, b.R2, b.R3) - Math.max(a.R1, a.R2, a.R3))
                          .map((model, index) => (
                            <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                              <td className="border border-gray-300 p-3 font-medium">{model.model}</td>
                              <td className="border border-gray-300 p-3 text-center">{model.method}</td>
                              <td className="border border-gray-300 p-3 text-center">
                                <Badge variant="outline" className={model.type === 'Open' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}>
                                  {model.type}
                                </Badge>
                              </td>
                              <td className={`border border-gray-300 p-3 text-center font-medium ${getPerformanceColor(model.R1)}`}>
                                {model.R1}%
                              </td>
                              <td className={`border border-gray-300 p-3 text-center font-medium ${getPerformanceColor(model.R2)}`}>
                                {model.R2}%
                              </td>
                              <td className={`border border-gray-300 p-3 text-center font-medium ${getPerformanceColor(model.R3)}`}>
                                {model.R3}%
                              </td>
                              <td className="border border-gray-300 p-3 text-center">
                                <span className="font-bold text-green-600">{Math.max(model.R1, model.R2, model.R3)}%</span>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <h4 className="font-medium text-green-800 mb-3">🏆 Top Open Source Models</h4>
                      <div className="space-y-2 text-sm">
                        {llmPromptResults
                          .filter(model => model.type === 'Open')
                          .sort((a, b) => Math.max(b.R1, b.R2, b.R3) - Math.max(a.R1, a.R2, a.R3))
                          .slice(0, 3)
                          .map((model, index) => (
                            <div key={index} className="flex justify-between">
                              <span>{model.model}</span>
                              <span className="font-medium text-green-600">{Math.max(model.R1, model.R2, model.R3)}%</span>
                            </div>
                          ))}
                      </div>
                    </div>

                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h4 className="font-medium text-blue-800 mb-3">🔒 Top Closed Source Models</h4>
                      <div className="space-y-2 text-sm">
                        {llmPromptResults
                          .filter(model => model.type === 'Closed')
                          .sort((a, b) => Math.max(b.R1, b.R2, b.R3) - Math.max(a.R1, a.R2, a.R3))
                          .map((model, index) => (
                            <div key={index} className="flex justify-between">
                              <span>{model.model}</span>
                              <span className="font-medium text-blue-600">{Math.max(model.R1, model.R2, model.R3)}%</span>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h4 className="font-medium text-yellow-800 mb-2">📊 Key Insights từ LLM Prompt Results:</h4>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• <strong>phi4-reasoning:14b hàng đầu Open Source:</strong> 47.65% R2, suy luận logic tốt nhất</li>
                      <li>• <strong>o4_mini dẫn đầu Closed Source:</strong> 46.77% R2, nhưng yếu đi ở R3 (30.86%)</li>
                      <li>• <strong>R3 Challenge hiệu ứng:</strong> Tất cả models đều giảm mạnh hiệu suất ở Round 3</li>
                      <li>• <strong>qwen3:14b ổn định:</strong> Performance cao và ít bị ảnh hưởng bởi adversarial attacks</li>
                      <li>• <strong>Open vs Closed gap nhỏ:</strong> Chênh lệch chỉ ~1-2%, Open Source cạnh tranh mạnh</li>
                      <li>• <strong>gemma3 series consistency:</strong> Cả hai variants đều stable qua rounds</li>
                      <li>• <strong>Adversarial vulnerability:</strong> Prompting kém robust hơn fine-tuning khi gặp attacks</li>
                    </ul>
                  </div>

                  {/* Prompt Template Section */}
                  <div className="mt-6">
                    <div className="flex items-center gap-2 mb-4">
                      <BookOpen className="w-5 h-5 text-slate-600" />
                      <h3 className="text-lg font-semibold text-slate-800">🔧 Prompt Template cho LLM Prompting</h3>
                    </div>
                    
                    <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                      <div className="text-green-400 mb-2">// Prompt Template for Vietnamese Fact-Checking</div>
                      <pre className="whitespace-pre-wrap">
{`prompt = f"""Bạn là chuyên gia fact-checking tiếng Việt. Hãy thực hiện **ngầm** các bước:
        1. So khớp và **so sánh số liệu** (nếu có) giữa CONTEXT và CLAIM.
        2. **So sánh** bất kỳ **giá trị số** hoặc **thời gian** (nếu có) giữa CONTEXT và CLAIM.  
        3. Kiểm tra xem CLAIM có chèn thêm **thông tin phụ** (extra detail) không xuất hiện trong CONTEXT → nếu có, gán \`NEI\`.
        4. Đưa ra kết luận:  
           - \`SUPPORTED\` nếu CLAIM được xác nhận hoàn toàn bởi bằng chứng.  
           - \`REFUTED\` nếu CLAIM bị bác bỏ trực tiếp.  
           - \`NEI\` nếu không có đủ thông tin.
        CONTEXT:
        {context}
        
        CLAIM:
        {claim}
        CUỐI CÙNG chỉ trả về **một JSON** duy nhất:
        {{"Label": "SUPPORTED"}} hoặc {{"Label": "REFUTED"}} hoặc {{"Label": "NEI"}}, không thêm bất cứ chữ nào khác."""`}
                      </pre>
                    </div>
                    
                    <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h4 className="font-medium text-blue-800 mb-2">🔍 Đặc điểm Template:</h4>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• <strong>4-bước structured reasoning:</strong> So sánh số liệu → Phát hiện extra details → Kết luận</li>
                        <li>• <strong>Vietnamese expertise:</strong> Được thiết kế riêng cho fact-checking tiếng Việt</li>
                        <li>• <strong>JSON output format:</strong> Chuẩn hóa kết quả, dễ parse và evaluation</li>
                        <li>• <strong>Best performance:</strong> phi4-reasoning:14b đạt 47.65% trên R2</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Cost & Resource Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Phân tích Chi phí & Tài nguyên
                </CardTitle>
                <CardDescription>So sánh chi phí và khuyến nghị lựa chọn theo ngân sách</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-medium text-green-800 mb-3">💰 Ngân sách Thấp</h4>
                    <ul className="text-sm text-green-700 space-y-2">
                      <li>• <strong>Khuyến nghị:</strong> PLM trên Kaggle</li>
                      <li>• <strong>Chi phí:</strong> Miễn phí</li>
                      <li>• <strong>GPU:</strong> Tesla P100 (16GB)</li>
                      <li>• <strong>Hiệu suất tốt nhất:</strong> XLM-R ~66.89%</li>
                      <li>• <strong>Thời gian:</strong> 2-4 giờ/model</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                    <h4 className="font-medium text-purple-800 mb-3">💳 Ngân sách Trung bình</h4>
                    <ul className="text-sm text-purple-700 space-y-2">
                      <li>• <strong>Khuyến nghị:</strong> LLM API Fine-tune</li>
                      <li>• <strong>Chi phí:</strong> $25.00/1M token</li>
                      <li>• <strong>Infrastructure:</strong> Managed</li>
                      <li>• <strong>Hiệu suất tốt nhất:</strong> GPT-4o ~58.15%</li>
                      <li>• <strong>Thời gian:</strong> 30 phút - 2 giờ</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <h4 className="font-medium text-red-800 mb-3">💎 Ngân sách Cao</h4>
                    <ul className="text-sm text-red-700 space-y-2">
                      <li>• <strong>Khuyến nghị:</strong> H100 Local Fine-tune</li>
                      <li>• <strong>Chi phí:</strong> $5.62/hour</li>
                      <li>• <strong>GPU:</strong> H100 SXM5 (80GB)</li>
                      <li>• <strong>Hiệu suất tốt nhất:</strong> DEEPSEEK ~55.47%</li>
                      <li>• <strong>Thời gian:</strong> 1-3 giờ/model</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">🎯 Khuyến nghị Tổng thể</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-blue-700">Cho Research/Học tập:</p>
                      <p className="text-blue-600">PLM trên Kaggle - Miễn phí, hiệu suất ổn, dễ tái tạo</p>
                    </div>
                    <div>
                      <p className="font-medium text-blue-700">Cho Production:</p>
                      <p className="text-blue-600">GPT-4o API - Hiệu suất cao nhất, ổn định, scalable</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
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
                    Tất cả 3 rounds đều đạt Fleiss' Kappa {'>'} 0.80, cho thấy chất lượng dữ liệu rất cao với mức độ đồng
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

          {/* References Tab */}
          <TabsContent value="references" className="space-y-6">
            {/* Reference Categories */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card className="text-center">
                <CardContent className="p-4">
                  <Database className="w-8 h-8 mx-auto text-blue-600 mb-2" />
                  <h3 className="font-medium">Datasets</h3>
                  <p className="text-2xl font-bold text-blue-600">
                    {referencesData.filter(ref => ref.category === "Dataset").length}
                  </p>
                  <p className="text-sm text-gray-600">Vietnamese NLI & Fact-Checking</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-4">
                  <Brain className="w-8 h-8 mx-auto text-purple-600 mb-2" />
                  <h3 className="font-medium">Models</h3>
                  <p className="text-2xl font-bold text-purple-600">
                    {referencesData.filter(ref => ref.category === "Models").length}
                  </p>
                  <p className="text-sm text-gray-600">PLMs & LLMs</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-4">
                  <Shield className="w-8 h-8 mx-auto text-red-600 mb-2" />
                  <h3 className="font-medium">Adversarial</h3>
                  <p className="text-2xl font-bold text-red-600">
                    {referencesData.filter(ref => ref.category === "Adversarial").length}
                  </p>
                  <p className="text-sm text-gray-600">Attack & Defense</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-4">
                  <Zap className="w-8 h-8 mx-auto text-green-600 mb-2" />
                  <h3 className="font-medium">Methods</h3>
                  <p className="text-2xl font-bold text-green-600">
                    {referencesData.filter(ref => ref.category === "Methods" || ref.category === "Competition").length}
                  </p>
                  <p className="text-sm text-gray-600">Techniques & Competitions</p>
                </CardContent>
              </Card>
            </div>

            {/* References by Category */}
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="all">Tất cả</TabsTrigger>
                <TabsTrigger value="Dataset">Datasets</TabsTrigger>
                <TabsTrigger value="Models">Models</TabsTrigger>
                <TabsTrigger value="Adversarial">Adversarial</TabsTrigger>
                <TabsTrigger value="Methods">Methods</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5" />
                      Tài liệu Tham khảo Đầy đủ
                    </CardTitle>
                    <CardDescription>
                      Danh sách đầy đủ các tài liệu nghiên cứu liên quan đến ViAdverNLI và fact-checking tiếng Việt
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {referencesData.map((ref, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 border rounded-lg hover:bg-gray-50">
                          <Badge variant="outline" className={
                            ref.category === "Dataset" ? "bg-blue-50 text-blue-700" :
                            ref.category === "Models" ? "bg-purple-50 text-purple-700" :
                            ref.category === "Adversarial" ? "bg-red-50 text-red-700" :
                            "bg-green-50 text-green-700"
                          }>
                            {ref.category}
                          </Badge>
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{ref.title}</h4>
                            <p className="text-xs text-gray-500 mt-1">
                              <code className="bg-gray-100 px-1 rounded">{ref.reference}</code>
                            </p>
                            <a 
                              href={ref.link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-xs text-blue-600 hover:text-blue-800 underline mt-1 inline-block"
                            >
                              {ref.link.length > 60 ? `${ref.link.substring(0, 60)}...` : ref.link}
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {["Dataset", "Models", "Adversarial", "Methods"].map(category => (
                <TabsContent key={category} value={category} className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        {category === "Dataset" && <Database className="w-5 h-5 text-blue-600" />}
                        {category === "Models" && <Brain className="w-5 h-5 text-purple-600" />}
                        {category === "Adversarial" && <Shield className="w-5 h-5 text-red-600" />}
                        {category === "Methods" && <Zap className="w-5 h-5 text-green-600" />}
                        {category === "Dataset" ? "Vietnamese NLI & Fact-Checking Datasets" :
                         category === "Models" ? "Pre-trained Language Models & LLMs" :
                         category === "Adversarial" ? "Adversarial Attacks & Defense" :
                         "Methods & Competitions"}
                      </CardTitle>
                      <CardDescription>
                        {category === "Dataset" ? "Các bộ dữ liệu NLI và fact-checking tiếng Việt" :
                         category === "Models" ? "Các mô hình ngôn ngữ được sử dụng trong nghiên cứu" :
                         category === "Adversarial" ? "Nghiên cứu về tấn công và phòng thủ adversarial" :
                         "Phương pháp và cuộc thi liên quan"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {referencesData
                          .filter(ref => category === "Methods" ? 
                            (ref.category === "Methods" || ref.category === "Competition") : 
                            ref.category === category)
                          .map((ref, index) => (
                            <div key={index} className="flex items-start gap-3 p-3 border rounded-lg hover:bg-gray-50">
                              <Badge variant="outline" className={
                                category === "Dataset" ? "bg-blue-50 text-blue-700" :
                                category === "Models" ? "bg-purple-50 text-purple-700" :
                                category === "Adversarial" ? "bg-red-50 text-red-700" :
                                "bg-green-50 text-green-700"
                              }>
                                {ref.category}
                              </Badge>
                              <div className="flex-1">
                                <h4 className="font-medium text-sm">{ref.title}</h4>
                                <p className="text-xs text-gray-500 mt-1">
                                  <code className="bg-gray-100 px-1 rounded">{ref.reference}</code>
                                </p>
                                <a 
                                  href={ref.link} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-xs text-blue-600 hover:text-blue-800 underline mt-1 inline-block"
                                >
                                  {ref.link.length > 60 ? `${ref.link.substring(0, 60)}...` : ref.link}
                                </a>
                              </div>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>

            {/* Citation Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Hướng dẫn Trích dẫn
                </CardTitle>
                <CardDescription>
                  Cách trích dẫn ViAdverNLI và các tài liệu liên quan trong nghiên cứu
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">📖 Trích dẫn ViAdverNLI</h4>
                  <div className="bg-white p-3 rounded border text-sm font-mono">
                    @inproceedings{"{"}viadvernli2025,<br />
                    &nbsp;&nbsp;title={"{"}ViAdverNLI: A Vietnamese Adversarial Natural Language Inference Dataset{"}"}, <br />
                    &nbsp;&nbsp;author={"{"}Author Names{"}"}, <br />
                    &nbsp;&nbsp;booktitle={"{"}Proceedings of Conference{"}"}, <br />
                    &nbsp;&nbsp;year={"{"}2025{"}"}, <br />
                    &nbsp;&nbsp;url={"{"}https://github.com/your-repo/ViAdverNLI{"}"} <br />
                    {"}"}
                  </div>
                </div>

                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-medium text-green-800 mb-2">🔗 Liên kết và Chia sẻ</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Dataset có thể được sử dụng cho mục đích nghiên cứu</li>
                    <li>• Vui lòng trích dẫn paper gốc khi sử dụng</li>
                    <li>• Chia sẻ kết quả nghiên cứu với cộng đồng</li>
                    <li>• Liên hệ tác giả nếu có câu hỏi về dataset</li>
                  </ul>
                </div>

                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="font-medium text-yellow-800 mb-2">⚠️ Lưu ý Quan trọng</h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• Dataset được tạo ra chỉ cho mục đích nghiên cứu khoa học</li>
                    <li>• Không sử dụng cho mục đích thương mại mà không có sự cho phép</li>
                    <li>• Tuân thủ các nguyên tắc đạo đức trong nghiên cứu AI</li>
                    <li>• Báo cáo các vấn đề bias hoặc limitation trong nghiên cứu</li>
                  </ul>
                </div>
              </CardContent>
            </Card>


          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
