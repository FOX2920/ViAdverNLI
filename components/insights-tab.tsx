"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp,
  Target,
  CheckCircle,
  Award,
  Brain,
} from "lucide-react"

export function InsightsTab() {
  const difficultyRanking = [
    {
      name: "ViAdverNLI (40-58%)",
      difficulty: "Adversarial - Thành công!",
      color: "bg-green-500",
      description: "Đạt mục tiêu thử thách mô hình AI",
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
      color: "bg-blue-500",
      description: "Dữ liệu nền tảng",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Success Message */}
      <Card className="border-l-4 border-l-green-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <Award className="w-5 h-5" />
            Insights: ViAdverNLI - Benchmark Adversarial Thành công
          </CardTitle>
          <CardDescription>
            Hiệu suất thấp không phải hạn chế mà là thành tựu của một adversarial dataset chất lượng cao
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Thành tựu Chính
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
              <div>
                <p className="font-medium">Tạo thành công adversarial benchmark khó</p>
                <p className="text-sm text-gray-600">
                  ViA1 (42%) → ViA2 (54%) → ViA3 (58%) chứng tỏ độ khó tăng dần theo thiết kế
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
              <div>
                <p className="font-medium">XLM-R vẫn bị thử thách thành công</p>
                <p className="text-sm text-gray-600">
                  Mô hình mạnh nhất chỉ đạt ~58% trên ViAdverNLI, chứng tỏ chất lượng adversarial examples
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
              <div>
                <p className="font-medium">Adversarial training mang lại hiệu quả kép</p>
                <p className="text-sm text-gray-600">
                  Vừa cải thiện robustness, vừa giữ được performance trên dataset gốc
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
              <div>
                <p className="font-medium">Chất lượng dữ liệu đảm bảo</p>
                <p className="text-sm text-gray-600">
                  Fleiss' Kappa 0.75-0.81 chứng tỏ agreement cao giữa các mô hình tạo dữ liệu
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Giá trị Nghiên cứu & Ứng dụng
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <Brain className="w-5 h-5 text-blue-500 mt-0.5" />
              <div>
                <p className="font-medium">Benchmark chuẩn cho robustness testing</p>
                <p className="text-sm text-gray-600">
                  ViAdverNLI trở thành công cụ đánh giá độ bền vững của mô hình NLI tiếng Việt
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Brain className="w-5 h-5 text-blue-500 mt-0.5" />
              <div>
                <p className="font-medium">Phát hiện limitation patterns</p>
                <p className="text-sm text-gray-600">
                  Error analysis tiết lộ những weakness cụ thể để cải thiện mô hình tương lai
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Brain className="w-5 h-5 text-blue-500 mt-0.5" />
              <div>
                <p className="font-medium">Trade-off insights quan trọng</p>
                <p className="text-sm text-gray-600">
                  Cân bằng giữa adversarial robustness và general performance
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Brain className="w-5 h-5 text-blue-500 mt-0.5" />
              <div>
                <p className="font-medium">Human-in-the-loop validation</p>
                <p className="text-sm text-gray-600">
                  Chất lượng adversarial examples được đảm bảo qua consensus cao
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dataset Purpose Ranking */}
      <Card>
        <CardHeader>
          <CardTitle>Phân loại Dataset theo Mục đích</CardTitle>
          <CardDescription>Mỗi dataset phục vụ mục đích khác nhau trong hệ sinh thái NLI</CardDescription>
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
                <Badge variant="outline" className={index === 0 ? "bg-green-50 text-green-700" : ""}>
                  {item.difficulty}
                </Badge>
              </div>
            ))}
          </div>
          
          <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <h4 className="font-medium text-amber-800 mb-2">💡 Kết luận quan trọng</h4>
            <p className="text-sm text-amber-700">
              <strong>ViAdverNLI là dataset duy nhất được thiết kế để "fail"</strong> - và đó chính là thành công! 
              Trong khi các dataset khác đo lường khả năng học, ViAdverNLI đo lường độ robustness và 
              khả năng chống adversarial attacks. Low performance = High adversarial quality.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 