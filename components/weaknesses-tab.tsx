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
      {/* Success Message */}
      <Card className="border-l-4 border-l-green-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <CheckCircle className="w-5 h-5" />
            Adversarial Testing Results
          </CardTitle>
          <CardDescription>
            Hiệu suất thấp của các mô hình chứng tỏ ViAdverNLI đã đạt được mục tiêu tạo ra adversarial examples khó khăn. 
            Đây là điểm MẠNH của dataset, không phải điểm yếu!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 bg-green-50 border border-green-200 rounded">
              <h4 className="font-medium text-green-800">🎯 Mục tiêu đạt được</h4>
              <p className="text-sm text-green-700 mt-1">
                Tạo ra dataset thử thách độ robustness của mô hình NLI tiếng Việt
              </p>
            </div>
            <div className="p-3 bg-blue-50 border border-blue-200 rounded">
              <h4 className="font-medium text-blue-800">📊 Kết quả mong muốn</h4>
              <p className="text-sm text-blue-700 mt-1">
                Hiệu suất thấp = Dataset khó = Benchmark chất lượng cao
              </p>
            </div>
            <div className="p-3 bg-purple-50 border border-purple-200 rounded">
              <h4 className="font-medium text-purple-800">🔬 Giá trị khoa học</h4>
              <p className="text-sm text-purple-700 mt-1">
                Phát hiện điểm yếu của mô hình để cải thiện trong tương lai
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {weaknessData.map((model) => (
          <Card key={model.model} className="border-l-4 border-l-amber-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-amber-500" />
                {model.model} - {model.round}
              </CardTitle>
              <CardDescription>Thử thách thành công: {model.errorRate}% bị "đánh lừa"</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm font-medium text-amber-600">Thử thách chính được tạo ra:</p>
                <p className="text-sm text-gray-600">{model.mainWeakness}</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>SUPPORTED</span>
                  <span className="text-amber-600 font-medium">
                    {model.supportedError}% bị thử thách
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>REFUTED</span>
                  <span className="text-amber-600 font-medium">{model.refutedError}% bị thử thách</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>NEI</span>
                  <span className="text-amber-600 font-medium">{model.neiError}% bị thử thách</span>
                </div>
              </div>
              <div className="pt-2 border-t">
                <p className="text-sm">
                  <strong>Nhãn chịu ít thử thách nhất:</strong> {model.bestLabel}
                </p>
                <p className="text-sm">
                  <strong>Nhãn bị thử thách nhiều nhất:</strong> {model.worstLabel}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Challenge Success Rate Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>So sánh Mức độ Thử thách Thành công</CardTitle>
          <CardDescription>Tỷ lệ mô hình bị "đánh lừa" bởi ViAdverNLI - chứng tỏ độ khó của dataset</CardDescription>
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

      {/* Challenge Types Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Phân tích Loại Thử thách Thành công</CardTitle>
          <CardDescription>Các patterns adversarial thành công trong việc đánh lừa từng mô hình</CardDescription>
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



      {/* Detailed Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5" />
              Error Pattern Analysis
            </CardTitle>
            <CardDescription>Key behavioral patterns identified across baseline models</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3 border rounded-lg">
                <h4 className="font-medium text-gray-800 mb-2">mBERT (R1)</h4>
                <p className="text-sm text-gray-600">Strong NEI bias, struggles with Vietnamese context understanding</p>
                <div className="mt-2 text-xs text-red-600 font-medium">Error Rate: 76.83%</div>
              </div>
              
              <div className="p-3 border rounded-lg">
                <h4 className="font-medium text-gray-800 mb-2">PhoBERT (R2)</h4>
                <p className="text-sm text-gray-600">Poor NEI recognition, overconfident in SUPPORTED/REFUTED predictions</p>
                <div className="mt-2 text-xs text-orange-600 font-medium">Error Rate: 54.74%</div>
              </div>
              
              <div className="p-3 border rounded-lg">
                <h4 className="font-medium text-gray-800 mb-2">XLM-R (R3)</h4>
                <p className="text-sm text-gray-600">Over-conservative approach, tendency to predict NEI when uncertain</p>
                <div className="mt-2 text-xs text-yellow-600 font-medium">Error Rate: 47.20%</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Future Directions
            </CardTitle>
            <CardDescription>Research directions for improving adversarial robustness</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Model Improvements</h4>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• Adversarial training methods</li>
                  <li>• Ensemble approaches</li>
                  <li>• Threshold calibration</li>
                  <li>• Label-specific architectures</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Data Strategies</h4>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• Enhanced Vietnamese corpora</li>
                  <li>• Balanced label distribution</li>
                  <li>• Improved preprocessing</li>
                  <li>• Cross-domain validation</li>
                </ul>
              </div>
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
              2/3 rounds đạt Fleiss' Kappa {'>'} 0.80 (R1: 0.8052, R2: 0.8138), cho thấy chất lượng dữ liệu rất cao. 
              R3 đạt 0.7539 vẫn được xem là mức đồng thuận tốt. Điều này đảm bảo tính tin cậy và nhất quán trong bộ dữ
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