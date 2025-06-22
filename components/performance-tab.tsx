"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts"
import { Award } from "lucide-react"

import { 
  performanceData, 
  adversarialImpact, 
  detailedPerformanceData, 
  getPerformanceColor,
  performanceSummary
} from "@/data/performance-data"

export function PerformanceTab() {
  return (
    <div className="space-y-6">
      {/* Model Performance Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>So sánh Hiệu suất Mô hình</CardTitle>
          <CardDescription>
            Hiệu suất của các mô hình trên các dataset khác nhau (sử dụng dữ liệu training tốt nhất)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h4 className="font-medium text-green-800 mb-2">🎯 Lưu ý quan trọng về ViAdverNLI</h4>
            <p className="text-sm text-green-700">
              <strong>Hiệu suất thấp trên ViAdverNLI là điều MONG MUỐN!</strong> Mục đích chính của dataset này 
              là tạo ra các adversarial examples để thử thách và đánh giá độ robustness của mô hình NLI. 
              Hiệu suất thấp chứng tỏ dataset đã thành công trong việc tạo ra những thử thách khó khăn.
            </p>
          </div>
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Hiệu suất Cao nhất (PLM)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{performanceSummary.plmBest.value}%</div>
            <p className="text-xs text-gray-600">{performanceSummary.plmBest.model} trên {performanceSummary.plmBest.dataset}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Hiệu suất Cao nhất (LLM)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{performanceSummary.llmBest.value}%</div>
            <p className="text-xs text-gray-600">{performanceSummary.llmBest.model} trên {performanceSummary.llmBest.dataset}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Cost-Effective</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{performanceSummary.costEffective.value}%</div>
            <p className="text-xs text-gray-600">{performanceSummary.costEffective.model} ({performanceSummary.costEffective.note})</p>
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

      {/* ViAdverNLI Success Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <Award className="w-5 h-5" />
            Tổng kết: Dataset Adversarial Evaluation
          </CardTitle>
          <CardDescription>
            Hiệu suất thấp trên ViAdverNLI chứng minh dataset đã đạt được mục tiêu chính
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-bold text-green-800 mb-3">✅ Thành tựu đạt được</h4>
              <ul className="text-sm text-green-700 space-y-2">
                <li>• <strong>Low Performance = High Success:</strong> ViA1~40%, ViA2~45%, ViA3~60%</li>
                <li>• <strong>Consistent Challenge:</strong> Tất cả mô hình đều gặp khó khăn</li>
                <li>• <strong>Progressive Difficulty:</strong> ViA3 khó nhất do sinh bởi XLM-R mạnh nhất</li>
                <li>• <strong>Quality Assured:</strong> Fleiss' Kappa 0.75-0.81 (excellent agreement)</li>
              </ul>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-bold text-blue-800 mb-3">🎯 Giá trị thực tiễn</h4>
              <ul className="text-sm text-blue-700 space-y-2">
                <li>• <strong>Robustness Testing:</strong> Đánh giá khả năng chống adversarial</li>
                <li>• <strong>Model Comparison:</strong> Benchmark chuẩn cho NLI tiếng Việt</li>
                <li>• <strong>Research Direction:</strong> Phát hiện pattern để cải thiện mô hình</li>
                <li>• <strong>Real-world Readiness:</strong> Kiểm tra tính ứng dụng thực tế</li>
              </ul>
            </div>
          </div>

          <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <h4 className="font-bold text-amber-800 mb-2">💡 Kết luận</h4>
            <p className="text-sm text-amber-700">
              <strong>ViAdverNLI không phải là dataset để đạt accuracy cao, mà là công cụ để thử thách và 
              đánh giá sự robustness của mô hình NLI.</strong> Hiệu suất thấp chính là bằng chứng cho thấy 
              dataset đã thành công trong việc tạo ra những adversarial examples chất lượng cao, 
              đóng góp quan trọng vào việc phát triển các mô hình NLI mạnh mẽ hơn cho tiếng Việt.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 