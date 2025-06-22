"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Brain,
  Database,
  TrendingUp,
  Shield,
  Target,
  Zap,
  BookOpen,
  Award,
  AlertTriangle,
  HelpCircle,
  Settings,
  XCircle,
} from "lucide-react"

// Import components
import { OverviewTab } from "@/components/overview-tab"
import { DatasetTab } from "@/components/dataset-tab"
import { PerformanceTab } from "@/components/performance-tab"
import { TrainingTab } from "@/components/training-tab"
import { WeaknessesTab } from "@/components/weaknesses-tab"
import { InsightsTab } from "@/components/insights-tab"
import { ReferencesTab } from "@/components/references-tab"
import { RelatedWorkTab } from "@/components/related-work-tab"
import { MethodologyTab } from "@/components/methodology-tab"

export default function ViAdverNLIDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg">
                <Brain className="w-8 h-8 text-white" />
              </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ViAdverNLI Dashboard
              </h1>
              <p className="text-gray-600 mt-1">
                Vietnamese Adversarial Natural Language Inference Benchmark
              </p>
          </div>
        </div>

          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <Badge variant="outline" className="px-3 py-1 bg-blue-50 text-blue-700 border-blue-200">
              <Database className="w-4 h-4 mr-1" />
              21,262 samples
            </Badge>
            <Badge variant="outline" className="px-3 py-1 bg-green-50 text-green-700 border-green-200">
              <Target className="w-4 h-4 mr-1" />
              3 rounds
            </Badge>
            <Badge variant="outline" className="px-3 py-1 bg-purple-50 text-purple-700 border-purple-200">
              <Zap className="w-4 h-4 mr-1" />
              SOTA: 58.15%
            </Badge>
            <Badge variant="outline" className="px-3 py-1 bg-red-50 text-red-700 border-red-200">
              <AlertTriangle className="w-4 h-4 mr-1" />
              Adversarial
                            </Badge>
                          </div>
                        </div>

        {/* Main Dashboard */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-purple-50">
            <CardTitle className="text-2xl flex items-center gap-2">
              <Shield className="w-6 h-6 text-blue-600" />
              Adversarial Fact-Checking Analysis
                </CardTitle>
                <CardDescription>
              Comprehensive analysis of Vietnamese adversarial NLI dataset and model performances
                </CardDescription>
              </CardHeader>

          <CardContent className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-9 mb-6 bg-gray-100/80 p-1 rounded-lg">
                <TabsTrigger value="overview" className="flex items-center gap-2 data-[state=active]:bg-white">
                  <Award className="w-4 h-4" />
                  Overview
                </TabsTrigger>
                <TabsTrigger value="related-work" className="flex items-center gap-2 data-[state=active]:bg-white">
                  <BookOpen className="w-4 h-4" />
                  Related Work
                </TabsTrigger>
                <TabsTrigger value="methodology" className="flex items-center gap-2 data-[state=active]:bg-white">
                  <Target className="w-4 h-4" />
                  Methodology
                </TabsTrigger>
                <TabsTrigger value="dataset" className="flex items-center gap-2 data-[state=active]:bg-white">
                  <Database className="w-4 h-4" />
                  Dataset
                </TabsTrigger>
                <TabsTrigger value="training" className="flex items-center gap-2 data-[state=active]:bg-white">
                  <Settings className="w-4 h-4" />
                  Training
                </TabsTrigger>
                <TabsTrigger value="performance" className="flex items-center gap-2 data-[state=active]:bg-white">
                  <TrendingUp className="w-4 h-4" />
                  Performance
                </TabsTrigger>
                <TabsTrigger value="weaknesses" className="flex items-center gap-2 data-[state=active]:bg-white">
                  <XCircle className="w-4 h-4" />
                  Weaknesses
                </TabsTrigger>
                <TabsTrigger value="insights" className="flex items-center gap-2 data-[state=active]:bg-white">
                  <HelpCircle className="w-4 h-4" />
                  Insights
                </TabsTrigger>
                <TabsTrigger value="references" className="flex items-center gap-2 data-[state=active]:bg-white">
                  <BookOpen className="w-4 h-4" />
                  References
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <OverviewTab />
              </TabsContent>

              <TabsContent value="related-work" className="space-y-6">
                <RelatedWorkTab />
              </TabsContent>

              <TabsContent value="methodology" className="space-y-6">
                <MethodologyTab />
              </TabsContent>

              <TabsContent value="dataset" className="space-y-6">
                <DatasetTab />
              </TabsContent>

              <TabsContent value="training" className="space-y-6">
                <TrainingTab />
              </TabsContent>

              <TabsContent value="performance" className="space-y-6">
                <PerformanceTab />
              </TabsContent>

              <TabsContent value="weaknesses" className="space-y-6">
                <WeaknessesTab />
              </TabsContent>

              <TabsContent value="insights" className="space-y-6">
                <InsightsTab />
              </TabsContent>

              <TabsContent value="references" className="space-y-6">
                <ReferencesTab />
              </TabsContent>
            </Tabs>
              </CardContent>
            </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>© 2025 ViAdverNLI Research Team • University of Information Technology</p>
          <p className="mt-1">
            Built with Next.js, Tailwind CSS, and Recharts
          </p>
        </div>
      </div>
    </div>
  )
}
