"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, BookOpen, Database } from "lucide-react"

export function RelatedWorkTab() {
  // Focus on methodology and research contributions, not dataset comparison (already in Overview)

  const globalDatasets = [
    {
      name: "FEVER",
      description: "185,445 claims generated from Wikipedia",
      contribution: "Prime example of large-scale fact-checking dataset"
    },
    {
      name: "FEVER 2.0", 
      description: "Extended FEVER with adversarial attacks",
      contribution: "Testing model robustness with adversarial examples"
    },
    {
      name: "VitaminC",
      description: "400,000+ claim-evidence pairs from Wikipedia revisions", 
      contribution: "Challenges models in processing subtle information changes"
    },
    {
      name: "Adversarial NLI",
      description: "Adversarial Natural Language Inference framework",
      contribution: "Enhancing accuracy and resilience of fact-checking systems"
    }
  ]

  const vietnameseDatasets = [
    {
      name: "VINLI",
      description: "Vietnamese Natural Language Inference với 30,000+ premise-hypothesis pairs",
      limitation: "Không được thiết kế cho adversarial scenarios",
      strength: "Tài nguyên có giá trị cho training models trên basic entailment"
    },
    {
      name: "ViWikiFC", 
      description: "Dataset fact-checking đầu tiên từ Vietnamese Wikipedia với 20,000+ claims",
      limitation: "Không chứa examples được tạo để đánh lừa models",
      strength: "Manually annotated với chất lượng cao"
    },
    {
      name: "ViFactCheck",
      description: "Multi-domain dataset chất lượng cao với 7,232 manually annotated pairs", 
      limitation: "High performance của models highlight nhu cầu adversarial benchmarks",
      strength: "Đa dạng domain và chất lượng annotation"
    },
    {
      name: "ISE-DSC01",
      description: "Large-scale Vietnamese fact verification cho UIT Data Science Challenge 2023",
      limitation: "Models struggle với subtle semantic differences", 
      strength: "48,000+ samples với naturally occurring adversarial examples"
    }
  ]

  return (
    <div className="space-y-6">
      {/* Global Context */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Bối cảnh Nghiên cứu Toàn cầu
          </CardTitle>
          <CardDescription>
            Automated fact-checking đã trở thành lĩnh vực nghiên cứu quan trọng trong bối cảnh misinformation lan rộng trên social media
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {globalDatasets.map((dataset, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{dataset.name}</Badge>
                  <ExternalLink className="h-4 w-4 text-gray-400" />
                </div>
                <p className="text-sm text-gray-600">{dataset.description}</p>
                <p className="text-sm font-medium text-blue-600">{dataset.contribution}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Vietnamese Context */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Fact-Checking trong Tiếng Việt
          </CardTitle>
          <CardDescription>
            Tình hình nghiên cứu fact-checking cho tiếng Việt và những thách thức đặc thù
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {vietnameseDatasets.map((dataset, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-4 space-y-2">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold">{dataset.name}</h4>
                  <Badge variant="secondary">Vietnamese</Badge>
                </div>
                <p className="text-sm text-gray-700">{dataset.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="font-medium text-green-600">Ưu điểm: </span>
                    <span className="text-gray-600">{dataset.strength}</span>
                  </div>
                  <div>
                    <span className="font-medium text-red-600">Hạn chế: </span>
                    <span className="text-gray-600">{dataset.limitation}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Dataset Comparison đã có ở Overview Tab - không lặp lại */}

      {/* Research Gap */}
      <Card>
        <CardHeader>
          <CardTitle>Khoảng trống Nghiên cứu</CardTitle>
          <CardDescription>
            Những thách thức đặc thù mà ViAdverNLI giải quyết
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-semibold text-red-800 mb-2">Vấn đề hiện tại</h4>
              <ul className="text-sm text-red-700 space-y-1">
                <li>• Existing Vietnamese datasets tập trung vào benign, non-adversarial examples</li>
                <li>• Models có performance cao trên standard benchmarks nhưng vulnerable với adversarial content</li>
                <li>• Thiếu evaluation frameworks cho real-world robustness</li>
                <li>• Performance gap &gt; 20 percentage points khi chuyển từ standard sang adversarial evaluation</li>
              </ul>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 mb-2">Giải pháp của ViAdverNLI</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Systematically constructed adversarial benchmark targeting model robustness limitations</li>
                <li>• Iterative adversarial data generation với ensemble LLMs</li>
                <li>• Progressive escalation of adversarial complexity qua 3 rounds</li>
                <li>• Rigorous quality assurance với Fleiss' Kappa &ge; 0.75</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 