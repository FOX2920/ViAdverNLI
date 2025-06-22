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
            ViAdverNLI: Thành công trong việc Thử thách Mô hình AI
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

      {/* Label Challenge Success */}
      <Card>
        <CardHeader>
          <CardTitle>Mức độ Thử thách theo Nhãn</CardTitle>
          <CardDescription>Tỷ lệ adversarial examples thành công đánh lừa mô hình theo từng loại nhãn</CardDescription>
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
              Phân tích Chi tiết Adversarial Challenges
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

      {/* Detailed Error Examples from Appendix */}
      <Card>
        <CardHeader>
          <CardTitle>Ví dụ Chi tiết về Lỗi từ Baseline Models</CardTitle>
          <CardDescription>
            Examples cụ thể từ Paper Appendix cho thấy pattern lỗi của từng model
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="mbert" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="mbert">mBERT (R1)</TabsTrigger>
              <TabsTrigger value="phobert">PhoBERT (R2)</TabsTrigger>
              <TabsTrigger value="xlmr">XLM-R (R3)</TabsTrigger>
            </TabsList>

            {/* mBERT Examples */}
            <TabsContent value="mbert" className="space-y-4">
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <h4 className="font-semibold text-red-800 mb-2">❌ Error: SUPPORTED → NEI</h4>
                <div className="space-y-3 text-sm">
                  <div>
                    <strong className="text-green-600">Ground Truth:</strong> SUPPORTED
                    <br />
                    <strong className="text-red-600">Prediction:</strong> NEI
                  </div>
                  
                  <div>
                    <strong>Context:</strong>
                    <div className="p-2 bg-gray-100 rounded text-xs font-mono">
                      Có kế hoạch cưới vào đầu năm sau, anh Minh Trí (31 tuổi, làm việc tại Bình Thạnh) đã đặt cọc căn hộ ở Dĩ An. 
                      Anh chọn dự án The Infinity, nằm cạnh Vincom Plaza, cách Thủ Đức khoảng 10-15 phút di chuyển. 
                      Với mức thu nhập dao động 35-40 triệu đồng mỗi tháng, anh Trí cho rằng đây là lựa chọn hợp lý khi chủ đầu tư có 
                      chính sách hỗ trợ thanh toán giãn tiến độ 0,5% mỗi tháng...
                    </div>
                  </div>

                  <div>
                    <strong>Claim:</strong>
                    <div className="p-2 bg-blue-100 rounded text-xs">
                      Anh Minh Trí, người đang có kế hoạch kết hôn và mong muốn sở hữu ngôi nhà đầu tiên trước khi chào đón thành viên mới, 
                      đã quyết định lựa chọn The Infinity vì chính sách thanh toán linh hoạt 0,5% mỗi tháng cùng vị trí thuận tiện...
                    </div>
                  </div>

                  <div>
                    <strong className="text-purple-600">Analysis:</strong>
                    <div className="text-gray-700">
                      mBERT fails to connect information from different parts of the context to confirm the claim. 
                      Model chỉ tập trung vào single piece of evidence mà không xem xét full context, 
                      miss key information về 0.5% monthly payment policy, travel time, và project legality.
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <h4 className="font-semibold text-orange-800 mb-2">❌ Error: REFUTED → NEI</h4>
                <div className="space-y-3 text-sm">
                  <div>
                    <strong className="text-green-600">Ground Truth:</strong> REFUTED
                    <br />
                    <strong className="text-orange-600">Prediction:</strong> NEI
                  </div>
                  
                  <div>
                    <strong>Context:</strong>
                    <div className="p-2 bg-gray-100 rounded text-xs font-mono">
                      Trước 19h: Ăn tối đúng cách, ngủ ngon và kiểm soát cân nặng. Ăn tối muộn ảnh hưởng đến việc tiết melatonin, 
                      hormone giúp ngủ ngon, từ đó làm giảm chất lượng giấc ngủ... cơ thể vào ban đêm có xu hướng tích lũy năng lượng 
                      thay vì tiêu hao, dẫn đến dư thừa calo nếu ăn tối quá trễ...
                    </div>
                  </div>

                  <div>
                    <strong>Claim:</strong>
                    <div className="p-2 bg-red-100 rounded text-xs">
                      Theo nghiên cứu của bác sĩ Trương, việc tiêu thụ thực phẩm giàu protein sau 20 giờ sẽ giúp cơ thể 
                      tăng cường trao đổi chất, tránh tích tụ mỡ thừa, vì cơ thể vào ban đêm chuyển hóa năng lượng hiệu quả hơn so với ban ngày.
                    </div>
                  </div>

                  <div>
                    <strong className="text-purple-600">Analysis:</strong>
                    <div className="text-gray-700">
                      mBERT không nhận ra direct contradiction. Claim nói rằng eating late boosts metabolism, 
                      trong khi context explicitly states rằng body tends to store energy at night và advises eating before 7 PM.
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* PhoBERT Examples */}
            <TabsContent value="phobert" className="space-y-4">
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-2">❌ Error: NEI → SUPPORTED</h4>
                <div className="space-y-3 text-sm">
                  <div>
                    <strong className="text-green-600">Ground Truth:</strong> NEI
                    <br />
                    <strong className="text-yellow-600">Prediction:</strong> SUPPORTED
                  </div>
                  
                  <div>
                    <strong>Context:</strong>
                    <div className="p-2 bg-gray-100 rounded text-xs font-mono">
                      Với sự tin tưởng và kỳ vọng vào thành công của một nhiệm kỳ mới, năm nay, T.Ư Hội Liên hiệp thanh niên Việt Nam 
                      tiếp tục phối hợp cùng TCP Việt Nam tổ chức chuỗi Ngày hội Thanh niên công nhân năm 2025... 
                      T.Ư Hội Liên hiệp thanh niên Việt Nam đã trao tặng 20 phần quà cho thanh niên công nhân có hoàn cảnh khó khăn, 
                      mỗi phần quà trị giá 1 triệu đồng.
                    </div>
                  </div>

                  <div>
                    <strong>Claim:</strong>
                    <div className="p-2 bg-blue-100 rounded text-xs">
                      Trong sự kiện 'Lan tỏa năng lượng tích cực' tại Ngày hội Thanh niên công nhân năm 2025, 
                      TCP Việt Nam đã trao tặng 1 triệu đồng cho 20 thanh niên có hoàn cảnh khó khăn và 
                      một số phần thưởng đặc biệt như xe máy cho các cá nhân xuất sắc.
                    </div>
                  </div>

                  <div>
                    <strong className="text-purple-600">Analysis:</strong>
                    <div className="text-gray-700">
                      PhoBERT incorrectly concludes claim is supported. Nó overlooks fact rằng gift-giving organization 
                      là "Central Youth Union," không phải "TCP Vietnam" như claim asserts. 
                      Furthermore, không có mention về special prizes như motorcycles.
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* XLM-R Examples */}
            <TabsContent value="xlmr" className="space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">❌ Error: SUPPORTED → NEI</h4>
                <div className="space-y-3 text-sm">
                  <div>
                    <strong className="text-green-600">Ground Truth:</strong> SUPPORTED
                    <br />
                    <strong className="text-blue-600">Prediction:</strong> NEI
                  </div>
                  
                  <div>
                    <strong>Context:</strong>
                    <div className="p-2 bg-gray-100 rounded text-xs font-mono">
                      Nước ngọt hay nước nhạt là loại nước chứa một lượng tối thiểu các muối hòa tan... 
                      Tất cả các nguồn nước ngọt có xuất phát điểm là từ các cơn mưa... 
                      Sự cung cấp đủ lượng nước ngọt cần thiết để duy trì sự sống là một vấn đề đáng báo động 
                      đối với nhiều loài sinh vật, trong đó có con người...
                    </div>
                  </div>

                  <div>
                    <strong>Claim:</strong>
                    <div className="p-2 bg-green-100 rounded text-xs">
                      Nước ngọt, bao gồm nước từ mưa và băng tan, vẫn là yếu tố sống còn cho nhiều sinh vật, kể cả con người.
                    </div>
                  </div>

                  <div>
                    <strong className="text-purple-600">Analysis:</strong>
                    <div className="text-gray-700">
                      Despite clear supporting information trong context, XLM-R fails to synthesize different pieces of information. 
                      Model quá cautious và defaults to NEI instead of confirming claim.
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Summary of Error Patterns */}
          <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-3">🎯 Summary Error Patterns từ Examples:</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <h5 className="font-medium text-red-600 mb-2">mBERT Issues:</h5>
                <ul className="text-gray-700 space-y-1">
                  <li>• Failure to connect distributed information</li>
                  <li>• Over-cautious with complex claims</li>
                  <li>• Missing contradiction recognition</li>
                  <li>• Heavy NEI bias under uncertainty</li>
                </ul>
              </div>
              
              <div>
                <h5 className="font-medium text-yellow-600 mb-2">PhoBERT Issues:</h5>
                <ul className="text-gray-700 space-y-1">
                  <li>• Entity confusion trong Vietnamese</li>
                  <li>• Missing key details trong claims</li>
                  <li>• Overconfidence với partial matches</li>
                  <li>• Poor attention to claim specificity</li>
                </ul>
              </div>
              
              <div>
                <h5 className="font-medium text-blue-600 mb-2">XLM-R Issues:</h5>
                <ul className="text-gray-700 space-y-1">
                  <li>• Information synthesis problems</li>
                  <li>• Over-cautious với clear evidence</li>
                  <li>• Difficulty with implicit connections</li>
                  <li>• Conservative bias trong edge cases</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 