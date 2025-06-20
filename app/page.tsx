"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
  AreaChart,
  Area,
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
  FileText,
  Users,
  ArrowRight,
  ExternalLink,
  Github,
  Download,
  ChevronRight,
  TrendingDown,
  Activity,
  BarChart3,
  Lightbulb,
  Microscope,
  Beaker,
  Settings,
} from "lucide-react"

// Dataset comparison data from main.tex Table 1
const datasetComparisonData = [
  {
    dataset: "ViAdverNLI",
    purpose: "Adversarial fact-checking",
    scale: "21,262 pairs",
    source: "Wiki, VnExpress, News",
    sota: 58.15,
    difficulty: "Cực khó",
    color: "#dc2626",
    type: "adversarial"
  },
  {
    dataset: "VINLI",
    purpose: "Natural Language Inference",
    scale: "> 30,000 pairs",
    source: "Online articles",
    sota: 79,
    difficulty: "Trung bình", 
    color: "#059669",
    type: "standard"
  },
  {
    dataset: "ViWikiFC",
    purpose: "Wikipedia fact-checking",
    scale: "> 20,000 claims",
    source: "Vietnamese Wikipedia",
    sota: 79,
    difficulty: "Trung bình",
    color: "#059669",
    type: "standard"
  },
  {
    dataset: "ViFactCheck", 
    purpose: "Multi-domain fact-checking",
    scale: "7,232 pairs",
    source: "Online news",
    sota: 62,
    difficulty: "Khó",
    color: "#ea580c",
    type: "standard"
  },
  {
    dataset: "ISE-DSC01",
    purpose: "FEVER-like fact verification", 
    scale: "48,000+ samples",
    source: "Vietnamese news",
    sota: 84,
    difficulty: "Dễ",
    color: "#16a34a",
    type: "standard"
  },
]

// Progressive rounds data from main.tex
const roundsData = [
  {
    round: "R1",
    targetModel: "mBERT",
    samples: 5347,
    kappa: 0.8052,
    retentionRate: 88.5,
    avgClaimLength: 44.02,
    avgContextLength: 271.46,
    vocabSize: 21022,
  },
  {
    round: "R2", 
    targetModel: "PhoBERT",
    samples: 5961,
    kappa: 0.8138,
    retentionRate: 70.3,
    avgClaimLength: 51.50,
    avgContextLength: 249.19,
    vocabSize: 21054,
  },
  {
    round: "R3",
    targetModel: "XLM-R", 
    samples: 9954,
    kappa: 0.7539,
    retentionRate: 89.9,
    avgClaimLength: 44.86,
    avgContextLength: 283.68,
    vocabSize: 25697,
  },
]

// Performance data from main.tex Tables (Final results with ViA3)
const modelPerformanceData = [
  { model: "GPT-4o", category: "Fine-tuned LLM", R1: 50.70, R2: 57.95, R3: 58.15 },
  { model: "Gemini 2.0 Flash", category: "Fine-tuned LLM", R1: 47.08, R2: 52.93, R3: 56.72 },
  { model: "Gemma3", category: "Fine-tuned LLM", R1: 41.66, R2: 50.68, R3: 53.77 },
  { model: "Qwen3", category: "Fine-tuned LLM", R1: 37.57, R2: 47.86, R3: 51.12 },
  { model: "DeepSeek-R1", category: "Fine-tuned LLM", R1: 42.40, R2: 50.16, R3: 54.20 },
  { model: "XLM-R", category: "Pre-trained LM", R1: 44.23, R2: 53.83, R3: 57.65 },
  { model: "PhoBERT", category: "Pre-trained LM", R1: 36.36, R2: 49.8, R3: 57.54 },
  { model: "mBERT", category: "Pre-trained LM", R1: 40.79, R2: 49.8, R3: 60.63 },
]

// Complexity analysis from main.tex Table
const complexityData = [
  {
    round: "R1",
    LCS: 43.52,
    newWordRatio: 35.52,
    jaccardSim: 15.34,
    lexicalOverlap: 66.04,
    semanticSim: 74.79,
  },
  {
    round: "R2", 
    LCS: 34.28,
    newWordRatio: 46.29,
    jaccardSim: 15.29,
    lexicalOverlap: 55.37,
    semanticSim: 75.73,
  },
  {
    round: "R3",
    LCS: 33.60,
    newWordRatio: 48.98,
    jaccardSim: 12.86,
    lexicalOverlap: 52.53,
    semanticSim: 73.16,
  },
]

// Source distribution from main.tex Table 2
const sourceDistributionData = [
  { source: "Wiki", R1: 2601, R2: 2150, R3: 5222, total: 9973, percentage: 46.9 },
  { source: "VnExpress", R1: 2746, R2: 1155, R3: 2122, total: 6023, percentage: 28.3 },
  { source: "Báo Chính Phủ", R1: 0, R2: 614, R3: 500, total: 1114, percentage: 5.2 },
  { source: "Báo Lao Động", R1: 0, R2: 389, R3: 1095, total: 1484, percentage: 7.0 },
  { source: "Báo Nhân Dân", R1: 0, R2: 566, R3: 522, total: 1088, percentage: 5.1 },
  { source: "Báo Pháp Luật", R1: 0, R2: 630, R3: 493, total: 1123, percentage: 5.3 },
  { source: "Báo Thanh Niên", R1: 0, R2: 457, R3: 0, total: 457, percentage: 2.1 },
]

// Main findings and contributions from main.tex
const keyContributions = [
  {
    title: "Novel Adversarial Dataset",
    description: "21,262 context-claim pairs với progressive difficulty qua 3 rounds",
    icon: <Database className="w-6 h-6" />,
    color: "bg-blue-50 border-blue-200 text-blue-700"
  },
  {
    title: "Systematic Pipeline", 
    description: "6-stage automated pipeline với cross-evaluation và quality control",
    icon: <Settings className="w-6 h-6" />,
    color: "bg-green-50 border-green-200 text-green-700"
  },
  {
    title: "Comprehensive Evaluation",
    description: "3 model categories: PLMs, Fine-tuned LLMs, và In-Context Learning",
    icon: <Microscope className="w-6 h-6" />,
    color: "bg-purple-50 border-purple-200 text-purple-700"
  },
  {
    title: "Significant Performance Gap",
    description: "20+ points drop so với non-adversarial benchmarks, SOTA chỉ 58.15%",
    icon: <TrendingDown className="w-6 h-6" />,
    color: "bg-red-50 border-red-200 text-red-700"
  }
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82ca9d", "#ffc658"]

export default function ViAdverNLIDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Cực khó":
        return "bg-red-100 text-red-800 border-red-200"
      case "Khó":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "Trung bình":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Dễ":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPerformanceColor = (score: number) => {
    if (score >= 80) return "text-green-600 font-semibold"
    if (score >= 70) return "text-yellow-600 font-semibold"
    if (score >= 60) return "text-orange-600 font-semibold"
    return "text-red-600 font-semibold"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modern Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-16">
          <div className="text-center space-y-8">
            <div className="flex justify-center items-center gap-4 mb-6">
              <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                <Brain className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-6xl font-bold text-white tracking-tight">ViAdverNLI</h1>
                <p className="text-blue-100 text-lg mt-2">Novel Adversarial Benchmark Dataset for Vietnamese Fact-checking</p>
              </div>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <p className="text-xl text-blue-100 leading-relaxed">
                Bộ dữ liệu adversarial đầu tiên cho Vietnamese fact-checking, sử dụng ensemble LLMs trong quy trình 
                iterative để tạo ra các claim thử thách khả năng robustness của mô hình SOTA.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-4 flex items-center gap-3">
                <Database className="w-6 h-6 text-blue-200" />
                <div className="text-left">
                  <div className="text-white font-semibold text-lg">21,262</div>
                  <div className="text-blue-200 text-sm">Mẫu dữ liệu</div>
                </div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-4 flex items-center gap-3">
                <Shield className="w-6 h-6 text-blue-200" />
                <div className="text-left">
                  <div className="text-white font-semibold text-lg">3 Rounds</div>
                  <div className="text-blue-200 text-sm">Progressive Difficulty</div>
                </div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-4 flex items-center gap-3">
                <Target className="w-6 h-6 text-blue-200" />
                <div className="text-left">
                  <div className="text-white font-semibold text-lg">58.15%</div>
                  <div className="text-blue-200 text-sm">SOTA Performance</div>
                </div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-4 flex items-center gap-3">
                <Award className="w-6 h-6 text-blue-200" />
                <div className="text-left">
                  <div className="text-white font-semibold text-lg">Kappa &gt; 0.75</div>
                  <div className="text-blue-200 text-sm">High Agreement</div>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-4 mt-8">
              <Button className="bg-white text-blue-700 hover:bg-blue-50 font-semibold px-8 py-3 rounded-xl shadow-lg">
                <Download className="w-5 h-5 mr-2" />
                Download Dataset
              </Button>
              <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 font-semibold px-8 py-3 rounded-xl backdrop-blur-sm">
                <Github className="w-5 h-5 mr-2" />
                View on GitHub
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-8 bg-white rounded-xl shadow-sm p-1">
            <TabsTrigger value="overview" className="rounded-lg">📊 Overview</TabsTrigger>
            <TabsTrigger value="related-work" className="rounded-lg">📚 Related Work</TabsTrigger>
            <TabsTrigger value="methodology" className="rounded-lg">⚙️ Methodology</TabsTrigger>
            <TabsTrigger value="experiments" className="rounded-lg">🧪 Experiments</TabsTrigger>
            <TabsTrigger value="discussion" className="rounded-lg">💡 Discussion</TabsTrigger>
            <TabsTrigger value="conclusion" className="rounded-lg">🎯 Conclusion</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            {/* Key Contributions */}
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Award className="w-7 h-7 text-blue-600" />
                  Main Contributions
                </CardTitle>
                <CardDescription className="text-lg">
                  Những đóng góp chính của nghiên cứu ViAdverNLI
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {keyContributions.map((contribution, index) => (
                    <div key={index} className={`p-6 rounded-xl border-2 ${contribution.color}`}>
                      <div className="flex items-start gap-4">
                        {contribution.icon}
                        <div>
                          <h3 className="font-bold text-lg mb-2">{contribution.title}</h3>
                          <p className="text-sm">{contribution.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Dataset Overview */}
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-green-50 to-teal-50 rounded-t-lg">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Database className="w-7 h-7 text-green-600" />
                  Dataset Overview
                </CardTitle>
                <CardDescription className="text-lg">
                  Tổng quan về bộ dữ liệu ViAdverNLI qua 3 rounds
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={roundsData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="round" />
                        <YAxis />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                        />
                        <Bar dataKey="samples" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-4">
                    {roundsData.map((round, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-semibold text-lg">{round.round}</h4>
                          <Badge variant="outline">{round.targetModel}</Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Samples:</span>
                            <span className="font-medium ml-2">{round.samples.toLocaleString()}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Kappa:</span>
                            <span className="font-medium ml-2">{round.kappa}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Retention:</span>
                            <span className="font-medium ml-2">{round.retentionRate}%</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Vocab:</span>
                            <span className="font-medium ml-2">{round.vocabSize.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Related Work Tab */}
          <TabsContent value="related-work" className="space-y-8">
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-t-lg">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <BookOpen className="w-7 h-7 text-purple-600" />
                  Vietnamese Fact-checking Datasets
                </CardTitle>
                <CardDescription className="text-lg">
                  So sánh ViAdverNLI với các dataset fact-checking tiếng Việt hiện có
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <ResponsiveContainer width="100%" height={350}>
                      <BarChart data={datasetComparisonData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="dataset" angle={-45} textAnchor="end" height={80} />
                        <YAxis domain={[50, 90]} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                          formatter={(value) => [`${value}%`, 'SOTA Accuracy']}
                        />
                        <Bar dataKey="sota" fill="#8884d8" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-4">
                    {datasetComparisonData.map((dataset, index) => (
                      <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-semibold">{dataset.dataset}</h4>
                          <Badge className={getDifficultyColor(dataset.difficulty)}>
                            {dataset.difficulty}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{dataset.purpose}</p>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">{dataset.scale}</span>
                          <span className={getPerformanceColor(dataset.sota)}>
                            {dataset.sota}% SOTA
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Methodology Tab */}
          <TabsContent value="methodology" className="space-y-8">
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 rounded-t-lg">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Beaker className="w-7 h-7 text-orange-600" />
                  6-Stage Automated Pipeline
                </CardTitle>
                <CardDescription className="text-lg">
                  Quy trình tự động tạo dữ liệu adversarial với quality control
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-6">
                  {[
                    {
                      stage: "1. Context Data Preparation",
                      description: "Thu thập và tiền xử lý articles từ Wiki, VnExpress, official news sources",
                      details: "HTML/XML tag removal, punctuation normalization, batch organization"
                    },
                    {
                      stage: "2. Multi-Round Claim Generation",
                      description: "Ensemble LLMs tạo claims theo systematic construction rules",
                      details: "R1: qwq, deepseek-r1:14b, mistral-small3.1 | R2: cogito:14b, granite3.2:8b | R3: phi4-reasoning, qwen3:32b, gpt_4o_mini"
                    },
                    {
                      stage: "3. Claim Pre-filtering",
                      description: "Lọc quality: 90% Vietnamese words, single sentences, min 30 chars/3 words",
                      details: "Language purity, sentence structure, minimum length requirements"
                    },
                    {
                      stage: "4. Cross-Evaluation System",
                      description: "Mỗi model đánh giá claims của models khác + target model adversarial selection",
                      details: "5 prediction iterations per claim, select failures or lowest confidence"
                    },
                    {
                      stage: "5. Ensemble Labeling & Quality Control",
                      description: "Majority voting + Fleiss' Kappa ≥ 0.75 requirement",
                      details: "Cross-evaluation majority vote, quality filtering, final label assignment"
                    },
                    {
                      stage: "6. Iterative Round Evolution",
                      description: "Progressive adversarial training: mBERT → PhoBERT → XLM-R",
                      details: "Each round incorporates data from previous rounds for stronger target models"
                    }
                  ].map((step, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                        <span className="font-bold text-orange-600">{index + 1}</span>
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-semibold text-lg mb-2">{step.stage}</h4>
                        <p className="text-gray-700 mb-2">{step.description}</p>
                        <p className="text-sm text-gray-500">{step.details}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Complexity Analysis */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Activity className="w-6 h-6 text-blue-600" />
                  Complexity Progression Across Rounds
                </CardTitle>
                <CardDescription>
                  Increasing linguistic complexity from R1 to R3
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={complexityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="round" />
                    <YAxis domain={[0, 80]} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="lexicalOverlap" stroke="#8884d8" name="Lexical Overlap %" />
                    <Line type="monotone" dataKey="newWordRatio" stroke="#82ca9d" name="New Word Ratio %" />
                    <Line type="monotone" dataKey="jaccardSim" stroke="#ffc658" name="Jaccard Similarity %" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Experiments Tab */}
          <TabsContent value="experiments" className="space-y-8">
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-t-lg">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <BarChart3 className="w-7 h-7 text-indigo-600" />
                  Model Performance Results
                </CardTitle>
                <CardDescription className="text-lg">
                  Comprehensive evaluation across 3 model categories
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-8">
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={modelPerformanceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="model" angle={-45} textAnchor="end" height={100} />
                      <YAxis domain={[30, 70]} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                      />
                      <Legend />
                      <Bar dataKey="R1" fill="#8884d8" name="Round 1" />
                      <Bar dataKey="R2" fill="#82ca9d" name="Round 2" />
                      <Bar dataKey="R3" fill="#ffc658" name="Round 3" />
                    </BarChart>
                  </ResponsiveContainer>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                      <h4 className="font-bold text-red-800 mb-3">🔴 Adversarial Challenge</h4>
                      <ul className="text-sm text-red-700 space-y-2">
                        <li>• SOTA performance chỉ <strong>58.15%</strong> (GPT-4o)</li>
                        <li>• <strong>20+ points drop</strong> so với standard benchmarks</li>
                        <li>• Thử thách khả năng reasoning của mô hình hiện tại</li>
                      </ul>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <h4 className="font-bold text-blue-800 mb-3">🔵 Fine-tuning Advantage</h4>
                      <ul className="text-sm text-blue-700 space-y-2">
                        <li>• Fine-tuned LLMs consistently outperform PLMs</li>
                        <li>• GPT-4o leads across all rounds</li>
                        <li>• Task-specific adaptation crucial for adversarial robustness</li>
                      </ul>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                      <h4 className="font-bold text-green-800 mb-3">🟢 Progressive Difficulty</h4>
                      <ul className="text-sm text-green-700 space-y-2">
                        <li>• Performance improves R1→R2→R3</li>
                        <li>• Adversarial training effectiveness validated</li>
                        <li>• XLM-R shows strong adaptability</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Discussion Tab */}
          <TabsContent value="discussion" className="space-y-8">
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-t-lg">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Lightbulb className="w-7 h-7 text-yellow-600" />
                  Key Insights & Error Analysis
                </CardTitle>
                <CardDescription className="text-lg">
                  Phân tích sâu về pattern lỗi và limitations của mô hình
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
                    <h4 className="font-bold text-red-800 mb-4 flex items-center gap-2">
                      <XCircle className="w-5 h-5" />
                      mBERT Weaknesses (R1)
                    </h4>
                    <div className="space-y-3 text-sm text-red-700">
                      <div>
                        <strong>Error Rate:</strong> 76.8%
                      </div>
                      <div>
                        <strong>Main Issue:</strong> Strong NEI bias
                      </div>
                      <div>
                        <strong>Pattern:</strong> NEI→SUPPORTED: 44.8%, NEI→REFUTED: 37.7%
                      </div>
                      <div>
                        <strong>Analysis:</strong> Overly cautious, fails to synthesize evidence effectively
                      </div>
                    </div>
                  </div>

                  <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-6">
                    <h4 className="font-bold text-orange-800 mb-4 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      PhoBERT Issues (R2)
                    </h4>
                    <div className="space-y-3 text-sm text-orange-700">
                      <div>
                        <strong>Error Rate:</strong> 54.7%
                      </div>
                      <div>
                        <strong>Main Issue:</strong> Overconfident misclassification
                      </div>
                      <div>
                        <strong>Pattern:</strong> SUPPORTED→NEI: 34.0%, REFUTED→NEI: 23.3%
                      </div>
                      <div>
                        <strong>Analysis:</strong> Good Vietnamese understanding but conservative with adversarial examples
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
                    <h4 className="font-bold text-blue-800 mb-4 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      XLM-R Performance (R3)
                    </h4>
                    <div className="space-y-3 text-sm text-blue-700">
                      <div>
                        <strong>Error Rate:</strong> 47.2% (Best PLM)
                      </div>
                      <div>
                        <strong>Main Issue:</strong> NEI misclassification
                      </div>
                      <div>
                        <strong>Pattern:</strong> NEI→REFUTED: 41.1%, NEI→SUPPORTED: 36.7%
                      </div>
                      <div>
                        <strong>Analysis:</strong> Struggles to recognize insufficient information scenarios
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Source Distribution */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-blue-600" />
                  Data Source Distribution
                </CardTitle>
                <CardDescription>
                  Distribution of 21,262 samples across news sources
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={sourceDistributionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ source, percentage }) => `${source}: ${percentage}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="total"
                      >
                        {sourceDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>

                  <div className="space-y-3">
                    {sourceDistributionData.map((source, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <span className="font-medium">{source.source}</span>
                          <div className="text-sm text-gray-600">
                            {source.total.toLocaleString()} samples ({source.percentage}%)
                          </div>
                        </div>
                        <div className="text-xs text-gray-500 space-y-1 text-right">
                          <div>R1: {source.R1}</div>
                          <div>R2: {source.R2}</div>
                          <div>R3: {source.R3}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Conclusion Tab */}
          <TabsContent value="conclusion" className="space-y-8">
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-green-50 to-teal-50 rounded-t-lg">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Target className="w-7 h-7 text-green-600" />
                  Conclusions & Future Work
                </CardTitle>
                <CardDescription className="text-lg">
                  Key findings and directions for future research
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        Key Achievements
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li>• <strong>Novel adversarial dataset</strong> với 21,262 samples</li>
                        <li>• <strong>Systematic methodology</strong> có thể áp dụng cho các ngôn ngữ khác</li>
                        <li>• <strong>Comprehensive evaluation</strong> across multiple model categories</li>
                        <li>• <strong>Significant performance gap</strong> reveals model limitations</li>
                        <li>• <strong>High quality assurance</strong> với Fleiss' Kappa &gt; 0.75</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                        <Lightbulb className="w-5 h-5 text-yellow-600" />
                        Impact on Field
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li>• First adversarial benchmark for Vietnamese fact-checking</li>
                        <li>• Reveals brittleness of SOTA models</li>
                        <li>• Provides framework for other low-resource languages</li>
                        <li>• Demonstrates importance of adversarial evaluation</li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                        <ArrowRight className="w-5 h-5 text-blue-600" />
                        Future Research Directions
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li>• <strong>Model Improvements:</strong> Ensemble methods, specialized models per label</li>
                        <li>• <strong>Advanced Training:</strong> More sophisticated adversarial training techniques</li>
                        <li>• <strong>Multi-modal Extension:</strong> Incorporate images and structured data</li>
                        <li>• <strong>Cross-lingual:</strong> Extend to other Southeast Asian languages</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                        <Target className="w-5 h-5 text-purple-600" />
                        Targeted Recommendations
                      </h4>
                      <div className="space-y-3">
                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                          <strong className="text-red-800">mBERT-like models:</strong>
                          <p className="text-sm text-red-700 mt-1">Increase Vietnamese training data, adjust NEI bias thresholds</p>
                        </div>
                        <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                          <strong className="text-orange-800">PhoBERT-like models:</strong>
                          <p className="text-sm text-orange-700 mt-1">Augment with challenging NEI examples, fine-tune reasoning</p>
                        </div>
                        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <strong className="text-blue-800">XLM-R-like models:</strong>
                          <p className="text-sm text-blue-700 mt-1">Enhance with complex SUPPORTED/REFUTED examples</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                  <h4 className="font-bold text-blue-800 mb-3 text-center">📄 Citation</h4>
                  <div className="bg-white p-4 rounded-lg border font-mono text-sm">
                    @article{"{"}viadvernli2025,<br />
                    &nbsp;&nbsp;title={"{"}ViAdverNLI: Novel Adversarial Benchmark Dataset for Vietnamese Fact-checking{"}"}, <br />
                    &nbsp;&nbsp;author={"{"}Son Thanh Tran and Vu Trieu-Hoang Luong and Tin Van Huynh{"}"}, <br />
                    &nbsp;&nbsp;year={"{"}2025{"}"}, <br />
                    &nbsp;&nbsp;url={"{"}https://github.com/your-repo/ViAdverNLI{"}"} <br />
                    {"}"}
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