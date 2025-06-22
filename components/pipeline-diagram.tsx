"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Database, FileText, Filter, Users, CheckCircle, BarChart3, ArrowDown } from "lucide-react"

export function PipelineDiagram() {
  const pipelineSteps = [
    {
      icon: Database,
      title: "Context Data",
      description: "Wikipedia + News Sources",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      icon: FileText,
      title: "Text Preprocessing", 
      description: "Cleanup & Normalization",
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      icon: BarChart3,
      title: "Construction Rules",
      description: "SUPPORTED/REFUTED/NEI",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200"
    },
    {
      icon: Users,
      title: "Multi-Round Generation",
      description: "R1→R2→R3 (6K→8K→10K)",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      icon: Filter,
      title: "Pre-filtering",
      description: "Quality Control",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    },
    {
      icon: CheckCircle,
      title: "Cross-Evaluation",
      description: "Fleiss' κ ≥ 0.75",
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    }
  ]

  return (
    <div className="w-full">
      {/* Compact Grid Pipeline */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {pipelineSteps.map((step, index) => (
          <div key={index} className="relative">
            <Card className={`${step.bgColor} ${step.borderColor} border-2`}>
              <CardContent className="p-4 text-center">
                <step.icon className={`w-8 h-8 mx-auto mb-2 ${step.color}`} />
                <div className="text-sm font-semibold text-gray-800">{step.title}</div>
                <div className="text-xs text-gray-600 mt-1">{step.description}</div>
              </CardContent>
            </Card>
            
            {/* Arrow for flow indication */}
            {index < pipelineSteps.length - 1 && (
              <div className="hidden lg:block absolute -right-2 top-1/2 transform -translate-y-1/2">
                {index % 3 === 2 ? (
                  <ArrowDown className="w-5 h-5 text-gray-400" />
                ) : (
                  <div className="w-4 h-0.5 bg-gray-300"></div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Final Result */}
      <Card className="border-2 border-teal-400 bg-teal-50">
        <CardContent className="p-6 text-center">
          <Database className="w-12 h-12 mx-auto mb-3 text-teal-600" />
          <div className="text-xl font-bold text-teal-800 mb-2">ViAdverNLI Dataset</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-teal-700">
            <div className="flex items-center justify-center gap-2">
              <BarChart3 className="w-4 h-4" />
              <span className="font-semibold">21,262 samples</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="w-3 h-3 bg-red-500 rounded-full"></span>
              <span className="font-semibold">83.1% retention</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="font-semibold">High-quality labels</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Process Summary */}
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <h4 className="text-sm font-semibold text-gray-800 mb-2">🔄 Process Flow Summary:</h4>
        <p className="text-xs text-gray-600">
          <strong>Data Collection</strong> → <strong>Preprocessing</strong> → <strong>Rule Definition</strong> → 
          <strong>3-Round Generation</strong> → <strong>Quality Filter</strong> → <strong>Cross-Validation</strong> → 
          <strong>Final Dataset</strong>
        </p>
      </div>
    </div>
  )
} 