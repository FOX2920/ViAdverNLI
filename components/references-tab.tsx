"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  Database,
  Brain,
  Shield,
  BarChart,
  Globe,
  Search,
  ExternalLink,
  Filter,
  Target,
} from "lucide-react"

import { referencesData, referenceCategories } from "@/data/references-data"

function getIconComponent(iconName: string) {
  const icons: Record<string, any> = {
    Database,
    Brain,
    Shield,
    BarChart,
    Globe,
    Search,
    Target,
  }
  return icons[iconName] || Database
}

function getColorClass(color: string) {
  const colors: Record<string, string> = {
    blue: "text-blue-600",
    purple: "text-purple-600",
    red: "text-red-600",
    green: "text-green-600",
    orange: "text-orange-600",
    teal: "text-teal-600",
    indigo: "text-indigo-600",
  }
  return colors[color] || "text-gray-600"
}

export function ReferencesTab() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredReferences = referencesData.filter(ref => {
    const matchesSearch = 
      ref.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ref.authors.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ref.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = selectedCategory === "All" || ref.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      {/* Reference Categories */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-6">
        <Card className="text-center">
          <CardContent className="p-4">
            <Database className="w-8 h-8 mx-auto text-blue-600 mb-2" />
            <h3 className="font-medium">Datasets</h3>
            <p className="text-2xl font-bold text-blue-600">
              {referencesData.filter(ref => ref.category === "Dataset").length}
            </p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-4">
            <Brain className="w-8 h-8 mx-auto text-purple-600 mb-2" />
            <h3 className="font-medium">Models</h3>
            <p className="text-2xl font-bold text-purple-600">
              {referencesData.filter(ref => ref.category === "Model").length}
            </p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-4">
            <Shield className="w-8 h-8 mx-auto text-red-600 mb-2" />
            <h3 className="font-medium">Adversarial</h3>
            <p className="text-2xl font-bold text-red-600">
              {referencesData.filter(ref => ref.category === "Adversarial").length}
            </p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-4">
            <BarChart className="w-8 h-8 mx-auto text-green-600 mb-2" />
            <h3 className="font-medium">Evaluation</h3>
            <p className="text-2xl font-bold text-green-600">
              {referencesData.filter(ref => ref.category === "Evaluation").length}
            </p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-4">
            <Target className="w-8 h-8 mx-auto text-indigo-600 mb-2" />
            <h3 className="font-medium">Methodology</h3>
            <p className="text-2xl font-bold text-indigo-600">
              {referencesData.filter(ref => ref.category === "Methodology").length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Tìm kiếm & Lọc Tài liệu Tham khảo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Tìm kiếm theo tiêu đề, tác giả hoặc mô tả..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={selectedCategory === "All" ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedCategory("All")}
              >
                Tất cả ({referencesData.length})
              </Badge>
              {referenceCategories.map((category) => (
                <Badge
                  key={category.name}
                  variant={selectedCategory === category.name ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setSelectedCategory(category.name)}
                >
                  {category.name} ({category.count})
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* References by Category */}
      <Tabs defaultValue="All" value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="grid w-full grid-cols-8">
          <TabsTrigger value="All">Tất cả</TabsTrigger>
          <TabsTrigger value="Dataset">Datasets</TabsTrigger>
          <TabsTrigger value="Model">Models</TabsTrigger>
          <TabsTrigger value="Adversarial">Adversarial</TabsTrigger>
          <TabsTrigger value="Evaluation">Evaluation</TabsTrigger>
          <TabsTrigger value="Vietnamese NLP">VN NLP</TabsTrigger>
          <TabsTrigger value="Fact-Checking">Fact-Check</TabsTrigger>
          <TabsTrigger value="Methodology">Method</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedCategory} className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredReferences.map((ref) => {
              const IconComponent = getIconComponent(
                referenceCategories.find(cat => cat.name === ref.category)?.icon || "Database"
              )
              const colorClass = getColorClass(
                referenceCategories.find(cat => cat.name === ref.category)?.color || "gray"
              )

              return (
                <Card key={ref.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start gap-3">
                      <IconComponent className={`w-6 h-6 ${colorClass} mt-1 flex-shrink-0`} />
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-lg leading-tight mb-2">
                          <a 
                            href={ref.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="hover:text-blue-600 transition-colors inline-flex items-center gap-1"
                          >
                            {ref.title}
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </CardTitle>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">{ref.category}</Badge>
                          <Badge variant="secondary">{ref.venue}</Badge>
                        </div>
                        <CardDescription className="text-sm font-medium">
                          {ref.authors}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {ref.description}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {filteredReferences.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">Không tìm thấy tài liệu tham khảo nào phù hợp.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Summary Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Thống kê Tài liệu Tham khảo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{referencesData.length}</p>
              <p className="text-sm text-gray-600">Tổng số tài liệu</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {referencesData.filter(ref => 
                  ref.venue.includes("2023") || ref.venue.includes("2024")
                ).length}
              </p>
              <p className="text-sm text-gray-600">Tài liệu gần đây (2023-2024)</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">
                {referencesData.filter(ref => 
                  ref.venue.includes("ACL") || ref.venue.includes("EMNLP") || ref.venue.includes("NAACL")
                ).length}
              </p>
              <p className="text-sm text-gray-600">Hội nghị *ACL</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">
                {referencesData.filter(ref => 
                  ref.title.toLowerCase().includes("vietnamese") || 
                  ref.title.toLowerCase().includes("vietnam") ||
                  ref.authors.toLowerCase().includes("nguyen")
                ).length}
              </p>
              <p className="text-sm text-gray-600">Liên quan đến tiếng Việt</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-indigo-600">
                {referencesData.filter(ref => 
                  ref.venue.includes("2025")
                ).length}
              </p>
              <p className="text-sm text-gray-600">Công trình 2025</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 