"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Database, FileText, Filter, Users, CheckCircle, BarChart3 } from "lucide-react"

export function PipelineDiagram() {
  return (
    <div className="w-full overflow-x-auto py-4">
      <div className="flex items-center justify-center min-w-[1200px] space-x-4">
        
        {/* Step 1: Context Data */}
        <Card className="flex-shrink-0 w-40 border-2 border-gray-300">
          <CardContent className="p-4 text-center">
            <Database className="w-8 h-8 mx-auto mb-2 text-blue-600" />
            <div className="text-sm font-semibold text-gray-800">Context Data</div>
            <div className="text-xs text-gray-600 mt-1">
              Wikipedia +<br/>
              News<br/>
              Sources<br/>
              Collection
            </div>
          </CardContent>
        </Card>

        <ArrowRight className="w-6 h-6 text-gray-400 flex-shrink-0" />

        {/* Step 2: Text Preprocessing */}
        <Card className="flex-shrink-0 w-40 border-2 border-gray-300">
          <CardContent className="p-4 text-center">
            <FileText className="w-8 h-8 mx-auto mb-2 text-green-600" />
            <div className="text-sm font-semibold text-gray-800">Text Preprocessing</div>
            <div className="text-xs text-gray-600 mt-1">
              Markup Removal<br/>
              Normalization<br/>
              Batch<br/>
              Organization
            </div>
          </CardContent>
        </Card>

        <ArrowRight className="w-6 h-6 text-gray-400 flex-shrink-0" />

        {/* Construction Rules */}
        <Card className="flex-shrink-0 w-40 border-2 border-orange-300 bg-orange-50">
          <CardContent className="p-4 text-center">
            <BarChart3 className="w-8 h-8 mx-auto mb-2 text-orange-600" />
            <div className="text-sm font-semibold text-orange-800">Construction Rules</div>
            <div className="text-xs text-orange-700 mt-1">
              <strong>SUPPORTED:</strong><br/>
              Context-based<br/>
              <strong>REFUTED:</strong><br/>
              Contradictory<br/>
              <strong>NEI:</strong> Insufficient<br/>
              info
            </div>
          </CardContent>
        </Card>

        <ArrowRight className="w-6 h-6 text-gray-400 flex-shrink-0" />

        {/* Step 3: Multi-Round Generation */}
        <Card className="flex-shrink-0 w-48 border-2 border-blue-300 bg-blue-50">
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 mx-auto mb-2 text-blue-600" />
            <div className="text-sm font-semibold text-blue-800">Multi-Round Generation</div>
            <div className="text-xs text-blue-700 mt-1 space-y-1">
              <div><strong>R1:</strong> 3 models → 6K samples</div>
              <div><strong>R2:</strong> 4 models → 8K samples</div>
              <div><strong>R3:</strong> 6 models → 10K samples</div>
            </div>
          </CardContent>
        </Card>

        <ArrowRight className="w-6 h-6 text-gray-400 flex-shrink-0" />

        {/* Step 4: Pre-filtering */}
        <Card className="flex-shrink-0 w-40 border-2 border-purple-300 bg-purple-50">
          <CardContent className="p-4 text-center">
            <Filter className="w-8 h-8 mx-auto mb-2 text-purple-600" />
            <div className="text-sm font-semibold text-purple-800">Pre-filtering</div>
            <div className="text-xs text-purple-700 mt-1">
              ≥90% Vietnamese<br/>
              Single sentence<br/>
              ≥30 chars, ≥10<br/>
              words
            </div>
          </CardContent>
        </Card>

        <ArrowRight className="w-6 h-6 text-gray-400 flex-shrink-0" />

        {/* Step 5: Cross-Evaluation */}
        <Card className="flex-shrink-0 w-40 border-2 border-green-300 bg-green-50">
          <CardContent className="p-4 text-center">
            <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-600" />
            <div className="text-sm font-semibold text-green-800">Cross-Evaluation</div>
            <div className="text-xs text-green-700 mt-1">
              Peer Assessment<br/>
              Majority Voting<br/>
              Fleiss' κ ≥ 0.75
            </div>
          </CardContent>
        </Card>

        <ArrowRight className="w-6 h-6 text-gray-400 flex-shrink-0" />

        {/* Final Result: ViAdverNLI Dataset */}
        <Card className="flex-shrink-0 w-48 border-2 border-teal-400 bg-teal-50">
          <CardContent className="p-4 text-center">
            <Database className="w-10 h-10 mx-auto mb-2 text-teal-600" />
            <div className="text-lg font-bold text-teal-800">ViAdverNLI Dataset</div>
            <div className="text-sm text-teal-700 mt-2 space-y-1">
              <div className="flex items-center justify-center">
                <BarChart3 className="w-4 h-4 mr-1" />
                <span className="font-semibold">21,262 samples</span>
              </div>
              <div className="flex items-center justify-center">
                <span className="w-3 h-3 bg-red-500 rounded-full mr-1"></span>
                <span className="font-semibold">83.1% retention</span>
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-1 text-green-600" />
                <span className="font-semibold">High-quality labels</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Legend */}
      <div className="mt-6 bg-gray-50 p-4 rounded-lg">
        <h4 className="text-sm font-semibold text-gray-800 mb-3">📋 Giải thích Pipeline:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          <div className="flex items-start space-x-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full mt-1 flex-shrink-0"></span>
            <span><strong>Context Data:</strong> Thu thập dữ liệu từ Wikipedia và báo chí Việt Nam</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="w-2 h-2 bg-green-500 rounded-full mt-1 flex-shrink-0"></span>
            <span><strong>Preprocessing:</strong> Làm sạch và chuẩn hóa dữ liệu text</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="w-2 h-2 bg-orange-500 rounded-full mt-1 flex-shrink-0"></span>
            <span><strong>Construction Rules:</strong> Định nghĩa cách tạo 3 loại nhãn</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="w-2 h-2 bg-blue-600 rounded-full mt-1 flex-shrink-0"></span>
            <span><strong>Multi-Round:</strong> Tăng dần độ khó qua 3 rounds với nhiều models</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="w-2 h-2 bg-purple-500 rounded-full mt-1 flex-shrink-0"></span>
            <span><strong>Pre-filtering:</strong> Lọc bỏ dữ liệu kém chất lượng</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="w-2 h-2 bg-green-600 rounded-full mt-1 flex-shrink-0"></span>
            <span><strong>Cross-Evaluation:</strong> Đánh giá chéo đảm bảo chất lượng</span>
          </div>
        </div>
      </div>
    </div>
  )
} 