"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  HelpCircle,
} from "lucide-react"

export function InsightsTab() {
  const difficultyRanking = [
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
  ]

  return (
    <div className="space-y-6">
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
            {difficultyRanking.map((item, index) => (
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
    </div>
  )
} 