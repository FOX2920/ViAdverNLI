"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Database, FileText, Filter, Users, CheckCircle, BarChart3 } from "lucide-react"

export function PipelineDiagram() {
  const pipelineSteps = [
    {
      number: "01",
      icon: Database,
      title: "Context Data",
      description: "Wikipedia + News Sources",
      details: "Thu thập dữ liệu từ các nguồn tin cậy",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-300",
      numberBg: "bg-blue-600"
    },
    {
      number: "02",
      icon: FileText,
      title: "Text Preprocessing", 
      description: "Cleanup & Normalization",
      details: "Làm sạch và chuẩn hóa dữ liệu text",
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-300",
      numberBg: "bg-green-600"
    },
    {
      number: "03",
      icon: BarChart3,
      title: "Construction Rules",
      description: "SUPPORTED/REFUTED/NEI",
      details: "Định nghĩa quy tắc tạo 3 loại nhãn",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-300",
      numberBg: "bg-orange-600"
    },
    {
      number: "04",
      icon: Users,
      title: "Multi-Round Generation",
      description: "R1→R2→R3 (6K→8K→10K)",
      details: "Tăng dần độ khó qua 3 rounds",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-300",
      numberBg: "bg-purple-600"
    },
    {
      number: "05",
      icon: Filter,
      title: "Pre-filtering",
      description: "Quality Control",
      details: "Lọc bỏ dữ liệu kém chất lượng",
      color: "text-pink-600",
      bgColor: "bg-pink-50",
      borderColor: "border-pink-300",
      numberBg: "bg-pink-600"
    },
    {
      number: "06",
      icon: CheckCircle,
      title: "Cross-Evaluation",
      description: "Fleiss' κ ≥ 0.75",
      details: "Đánh giá chéo đảm bảo chất lượng",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-300",
      numberBg: "bg-emerald-600"
    }
  ]

  return (
    <div className="w-full">
      {/* Flowing Pipeline Steps */}
      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pipelineSteps.map((step, index) => (
            <div key={index} className="relative">
              {/* Step Card */}
              <Card className={`${step.bgColor} ${step.borderColor} border-2 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}>
                <CardContent className="p-5">
                  {/* Step Number Badge */}
                  <div className={`${step.numberBg} text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mb-3 mx-auto`}>
                    {step.number}
                  </div>
                  
                  {/* Icon */}
                  <step.icon className={`w-10 h-10 mx-auto mb-3 ${step.color}`} />
                  
                  {/* Content */}
                  <div className="text-center">
                    <div className="font-bold text-gray-800 mb-1">{step.title}</div>
                    <div className="text-sm text-gray-600 mb-2">{step.description}</div>
                    <div className="text-xs text-gray-500">{step.details}</div>
                  </div>
                </CardContent>
              </Card>

              {/* Flow Connector Lines */}
              {index < pipelineSteps.length - 1 && (
                <>
                  {/* Horizontal connector for same row */}
                  {(index % 3 !== 2) && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-gray-300 to-gray-400 transform -translate-y-1/2">
                      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-gray-400 border-t-2 border-t-transparent border-b-2 border-b-transparent"></div>
                    </div>
                  )}
                  
                  {/* Vertical connector for row break */}
                  {(index % 3 === 2) && index < 3 && (
                    <div className="hidden lg:block absolute -bottom-3 left-1/2 w-0.5 h-6 bg-gradient-to-b from-gray-300 to-gray-400 transform -translate-x-1/2">
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-t-4 border-t-gray-400 border-l-2 border-l-transparent border-r-2 border-r-transparent"></div>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>

        {/* Flowing Background Pattern */}
        <div className="absolute inset-0 -z-10 opacity-5">
          <div className="w-full h-full bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100"></div>
        </div>
      </div>

      {/* Final Result with Animation */}
      <div className="mt-8 relative">
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-full text-sm font-semibold">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
            FINAL RESULT
          </div>
        </div>

        <Card className="border-2 border-teal-400 bg-gradient-to-br from-teal-50 to-emerald-50 shadow-xl hover:shadow-2xl transition-all duration-500">
          <CardContent className="p-8 text-center">
            <div className="relative">
              <Database className="w-16 h-16 mx-auto mb-4 text-teal-600 drop-shadow-lg" />
              <div className="absolute -top-2 -right-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
              </div>
            </div>
            
            <div className="text-2xl font-bold text-teal-800 mb-4 bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
              ViAdverNLI Dataset
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div className="flex flex-col items-center p-4 bg-white/60 rounded-lg backdrop-blur-sm">
                <BarChart3 className="w-6 h-6 text-teal-600 mb-2" />
                <span className="font-bold text-gray-800">21,262</span>
                <span className="text-gray-600 text-xs">Total Samples</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-white/60 rounded-lg backdrop-blur-sm">
                <div className="w-6 h-6 bg-gradient-to-r from-red-400 to-red-600 rounded-full mb-2"></div>
                <span className="font-bold text-gray-800">83.1%</span>
                <span className="text-gray-600 text-xs">Retention Rate</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-white/60 rounded-lg backdrop-blur-sm">
                <CheckCircle className="w-6 h-6 text-emerald-600 mb-2" />
                <span className="font-bold text-gray-800">κ ≥ 0.75</span>
                <span className="text-gray-600 text-xs">Quality Score</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Process Flow Summary */}
      <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
        <div className="text-center">
          <h4 className="text-sm font-semibold text-gray-800 mb-3 flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            Data Pipeline Flow
            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
          </h4>
          <div className="flex flex-wrap justify-center items-center gap-2 text-xs text-gray-600">
            <span className="px-2 py-1 bg-blue-100 rounded">Collection</span>
            <span className="text-gray-400">→</span>
            <span className="px-2 py-1 bg-green-100 rounded">Processing</span>
            <span className="text-gray-400">→</span>
            <span className="px-2 py-1 bg-orange-100 rounded">Rules</span>
            <span className="text-gray-400">→</span>
            <span className="px-2 py-1 bg-purple-100 rounded">Generation</span>
            <span className="text-gray-400">→</span>
            <span className="px-2 py-1 bg-pink-100 rounded">Filtering</span>
            <span className="text-gray-400">→</span>
            <span className="px-2 py-1 bg-emerald-100 rounded font-semibold">Validation</span>
            <span className="text-gray-400">→</span>
            <span className="px-2 py-1 bg-teal-100 rounded font-semibold">Dataset</span>
          </div>
        </div>
      </div>
    </div>
  )
} 