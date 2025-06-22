"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
} from "recharts"
import {
  Brain,
  Database,
  TrendingUp,
  Shield,
  Target,
  BookOpen,
  Award,
  CheckCircle,
  AlertTriangle,
  XCircle,
} from "lucide-react"

import { roundsData, COLORS } from "@/data/rounds-data"
import { datasetComparison, viadvernliHighlights } from "@/data/dataset-data"
import { getDifficultyColor } from "@/utils/chart-utils"

export function OverviewTab() {
  return (
    <div className="space-y-6">
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