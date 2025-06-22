"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
} from "recharts"
import {
  Brain,
  Database,
  TrendingUp,
  Target,
  BookOpen,
  Award,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Settings,
} from "lucide-react"

import { roundsData, COLORS } from "@/data/rounds-data"
import { datasetComparison, viadvernliHighlights } from "@/data/dataset-data"
import { getDifficultyColor } from "@/utils/chart-utils"
import { PipelineDiagram } from "./pipeline-diagram"

export function OverviewTab() {
  const constructionRules = {
    general: [
      "Capitalize the first letter of sentences and end with proper punctuation",
      "Ensure correct spelling and grammar with no extra whitespace", 
      "Use only numerical digits for dates, ages, statistics, and monetary values",
      "Claims must be closely related to the context content and remain on-topic",
      "Avoid excessive verbatim copying from context; only direct evidence citations are permitted"
    ],
    supported: [
      "Base claims entirely on information present in the context without external knowledge",
      "Select information/statistics from context and rephrase using synonyms, voice conversion (active-passive), or syntactic simplification"
    ],
    refuted: [
      "Construct claims containing at least one contradictory or erroneous information compared to the context",
      "Techniques include altering statistics, negating facts, using antonyms, or confusing entities"
    ],
    nei: [
      "Include information or statistics that cannot be determined as true/false based on context due to insufficient evidence",
      "Techniques include expanding, narrowing, inferring, or adding information not present in the context"
    ]
  }

  const examples = {
    supported: {
      context: "Thomas Edison phát minh bóng đèn điện sợi đốt năm 1879.",
      claim: "Bóng đèn điện sợi đốt đầu tiên được chế tạo bởi Thomas Edison.",
      explanation: "Claim rephrases context information using voice conversion (active→passive)"
    },
    refuted: {
      context: "Cá voi xanh là động vật nặng nhất (150–200 tấn).",
      claim: "Cá voi xanh là động vật nhẹ nhất thế giới.",
      explanation: "Claim contains direct contradiction using antonym (nặng nhất → nhẹ nhất)"
    },
    nei: {
      context: "Anh ấy là sinh viên năm 3.",
      claim: "Anh ấy sinh năm 2003.",
      explanation: "Claim adds specific information (birth year) not inferable from context"
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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



        <Card className="border-l-4 border-l-purple-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              Kết quả Đạt được
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
                              Tạo thành công 21,262 mẫu dữ liệu đối kháng chất lượng cao với 2/3 rounds đạt Fleiss' Kappa &gt; 0.80 
                (đồng thuận xuất sắc).
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
          {/* Pipeline Diagram */}
          <PipelineDiagram />
          
          {/* Context Data Sources */}
          <div className="mt-6">
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  Context Data Sources
                </CardTitle>
                <CardDescription>
                  Nguồn dữ liệu context được sử dụng làm nền tảng cho việc tạo adversarial claims
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">📚 Wikipedia tiếng Việt</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Các bài viết về khoa học, lịch sử, địa lý</li>
                      <li>• Thông tin chính xác, đáng tin cậy</li>
                      <li>• Đa dạng chủ đề và lĩnh vực</li>
                      <li>• Cấu trúc tốt, dễ trích xuất thông tin</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-medium text-green-800 mb-2">📰 Báo chí Việt Nam</h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• VnExpress, Thanh Niên, Tuổi Trẻ</li>
                      <li>• Tin tức thời sự, kinh tế, xã hội</li>
                      <li>• Ngôn ngữ tự nhiên, gần gũi</li>
                      <li>• Phản ánh thực tế đời sống</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-2">🎯 Tiêu chí lựa chọn Context</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-gray-600">
                    <div>• Độ dài: 50-500 từ</div>
                    <div>• Ngôn ngữ: Tiếng Việt chuẩn</div>
                    <div>• Nội dung: Có thông tin cụ thể</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Round Details */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Chi tiết từng Round:</h3>
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
          </div>
        </CardContent>
      </Card>

      {/* Adversarial Claim Construction Rules */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Adversarial Claim Construction Rules
          </CardTitle>
          <CardDescription>
            Systematic construction rules để ensure high-quality, challenging examples
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="general">General Rules</TabsTrigger>
              <TabsTrigger value="supported">SUPPORTED</TabsTrigger>
              <TabsTrigger value="refuted">REFUTED</TabsTrigger>
              <TabsTrigger value="nei">NEI</TabsTrigger>
            </TabsList>

            {/* General Rules */}
            <TabsContent value="general" className="space-y-4">
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-3">📝 General Claim Construction Rules</h4>
                <ul className="space-y-2 text-sm">
                  {constructionRules.general.map((rule, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <h4 className="font-medium text-red-800 mb-3">🚫 Additional Guidelines</h4>
                <ul className="space-y-2 text-sm text-red-700">
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <span><strong>Avoid</strong> creating claims unrelated to the topic</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <span><strong>Avoid</strong> overusing simple transformations (only synonym replacement or negation)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span><strong>Label priority order:</strong> REFUTED &gt; NEI &gt; SUPPORTED</span>
                  </li>
                </ul>
              </div>
            </TabsContent>

            {/* SUPPORTED Rules */}
            <TabsContent value="supported" className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-medium text-green-800 mb-3">✅ SUPPORTED Claim Construction Principles</h4>
                <ul className="space-y-2 text-sm text-green-700">
                  {constructionRules.supported.map((rule, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-3">💡 Example</h4>
                <div className="space-y-3 text-sm">
                  <div>
                    <strong>Context:</strong>
                    <div className="p-2 bg-white rounded border text-gray-700">
                      {examples.supported.context}
                    </div>
                  </div>
                  <div>
                    <strong>Generated Claim:</strong>
                    <div className="p-2 bg-green-100 rounded border text-green-800">
                      {examples.supported.claim}
                    </div>
                  </div>
                  <div>
                    <strong>Technique:</strong>
                    <div className="text-blue-600">
                      {examples.supported.explanation}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* REFUTED Rules */}
            <TabsContent value="refuted" className="space-y-4">
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <h4 className="font-medium text-red-800 mb-3">❌ REFUTED Claim Construction Principles</h4>
                <ul className="space-y-2 text-sm text-red-700">
                  {constructionRules.refuted.map((rule, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-3">💡 Example</h4>
                <div className="space-y-3 text-sm">
                  <div>
                    <strong>Context:</strong>
                    <div className="p-2 bg-white rounded border text-gray-700">
                      {examples.refuted.context}
                    </div>
                  </div>
                  <div>
                    <strong>Generated Claim:</strong>
                    <div className="p-2 bg-red-100 rounded border text-red-800">
                      {examples.refuted.claim}
                    </div>
                  </div>
                  <div>
                    <strong>Technique:</strong>
                    <div className="text-blue-600">
                      {examples.refuted.explanation}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* NEI Rules */}
            <TabsContent value="nei" className="space-y-4">
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="font-medium text-yellow-800 mb-3">❓ NEI (Not Enough Information) Construction Principles</h4>
                <ul className="space-y-2 text-sm text-yellow-700">
                  {constructionRules.nei.map((rule, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-3">💡 Example</h4>
                <div className="space-y-3 text-sm">
                  <div>
                    <strong>Context:</strong>
                    <div className="p-2 bg-white rounded border text-gray-700">
                      {examples.nei.context}
                    </div>
                  </div>
                  <div>
                    <strong>Generated Claim:</strong>
                    <div className="p-2 bg-yellow-100 rounded border text-yellow-800">
                      {examples.nei.claim}
                    </div>
                  </div>
                  <div>
                    <strong>Technique:</strong>
                    <div className="text-blue-600">
                      {examples.nei.explanation}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
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
    </div>
  )
} 