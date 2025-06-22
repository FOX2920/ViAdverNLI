"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
} from "recharts"
import {
  AlertTriangle,
  Brain,
  Target,
  CheckCircle,
  HelpCircle,
  XCircle,
} from "lucide-react"

import { 
  weaknessData, 
  errorTypeData, 
  errorExamples,
  fleissKappaData
} from "@/data/weakness-data"

function getPerformanceColor(score: number) {
  if (score >= 60) return "text-green-600 font-bold"
  if (score >= 50) return "text-blue-600 font-medium"
  if (score >= 40) return "text-orange-600"
  return "text-red-600"
}

export function WeaknessesTab() {
  const [expandedContexts, setExpandedContexts] = useState<Record<string, boolean>>({})

  const toggleContext = (key: string) => {
    setExpandedContexts(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  return (
    <div className="space-y-6">
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
            {fleissKappaData.map((item, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <h4 className="font-medium">{item.round}</h4>
                <div className="text-2xl font-bold text-green-600">{item.kappa}</div>
                <p className="text-sm text-gray-600">{item.agreement}</p>
                <p className="text-xs text-gray-500 mt-1">Mô hình: {item.models}</p>
              </div>
            ))}
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
    </div>
  )
} 