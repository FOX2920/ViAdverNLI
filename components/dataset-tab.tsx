"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"
import {
  Brain,
  Database,
  TrendingUp,
  Target,
  BookOpen,
  CheckCircle,
  AlertTriangle,
  XCircle,
} from "lucide-react"

import { roundsData, COLORS } from "@/data/rounds-data"
import {
  dataSourcesBreakdown,
  detailedStatsPerRound,
  dataOriginDistribution,
  splitDistribution,
  jaccardSimilarity,
  complexityEvaluationData,
  complexityMetricsDefinition
} from "@/data/dataset-data"

export function DatasetTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sample Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Phân bố Số lượng Mẫu</CardTitle>
            <CardDescription>Số lượng mẫu dữ liệu qua các rounds</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={roundsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="round" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="samples" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Label Distribution for R3 */}
        <Card>
          <CardHeader>
            <CardTitle>Phân bố Nhãn - Round 3</CardTitle>
            <CardDescription>Phân bố các nhãn trong dataset lớn nhất</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: "NEI", value: 36.9, count: 3674 },
                    { name: "REFUTED", value: 31.9, count: 3176 },
                    { name: "SUPPORTED", value: 31.2, count: 3104 },
                  ]}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {[0, 1, 2].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Data Sources Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Phân bố Nguồn Dữ liệu</CardTitle>
          <CardDescription>Nguồn gốc của 21,262 mẫu dữ liệu qua các rounds</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={Object.entries(dataSourcesBreakdown).map(([name, data]) => ({
                      name,
                      value: data.percentage,
                      count: data.total,
                    }))}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {Object.keys(dataSourcesBreakdown).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-3">
              {Object.entries(dataSourcesBreakdown).map(([source, data]) => (
                <div key={source} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{source}</p>
                    <p className="text-sm text-gray-600">
                      {data.total.toLocaleString()} mẫu ({data.percentage}%)
                    </p>
                  </div>
                  <div className="text-right text-xs text-gray-500">
                    <div>R1: {data.rounds.R1}</div>
                    <div>R2: {data.rounds.R2}</div>
                    <div>R3: {data.rounds.R3}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Statistics Per Round */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            Thống kê Chi tiết theo Vòng
          </CardTitle>
          <CardDescription>Phân tích độ dài claim/context, vocabulary size và các thống kê cơ bản</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2 text-left">Round</th>
                  <th className="border border-gray-300 p-2 text-center">Samples</th>
                  <th className="border border-gray-300 p-2 text-center">Avg Claim Len</th>
                  <th className="border border-gray-300 p-2 text-center">Claim Range</th>
                  <th className="border border-gray-300 p-2 text-center">Avg Context Len</th>
                  <th className="border border-gray-300 p-2 text-center">Context Range</th>
                  <th className="border border-gray-300 p-2 text-center">Vocab Size</th>
                </tr>
              </thead>
              <tbody>
                {detailedStatsPerRound.map((stat, index) => (
                  <tr key={stat.round} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="border border-gray-300 p-2 font-medium">{stat.round}</td>
                    <td className="border border-gray-300 p-2 text-center">{stat.numSamples.toLocaleString()}</td>
                    <td className="border border-gray-300 p-2 text-center">{stat.avgClaimLen}</td>
                    <td className="border border-gray-300 p-2 text-center">{stat.minClaimLen}-{stat.maxClaimLen}</td>
                    <td className="border border-gray-300 p-2 text-center">{stat.avgContextLen}</td>
                    <td className="border border-gray-300 p-2 text-center">{stat.minContextLen}-{stat.maxContextLen}</td>
                    <td className="border border-gray-300 p-2 text-center">{stat.vocabSize.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Data Origin Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Phân bố Nguồn gốc Dữ liệu Chi tiết
          </CardTitle>
          <CardDescription>Số lượng mẫu từ từng nguồn báo chí và Wikipedia qua các rounds</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={detailedStatsPerRound}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="round" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="numSamples" fill="#8884d8" name="Số mẫu" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium">Top nguồn dữ liệu theo Round:</h4>
              <div className="grid grid-cols-1 gap-4">
                {["R1", "R2", "R3"].map(round => (
                  <div key={round} className="p-3 border rounded-lg">
                    <h5 className="font-medium mb-2">{round}</h5>
                    <div className="space-y-1 text-sm">
                      {dataOriginDistribution
                        .filter(item => item.round === round)
                        .sort((a, b) => b.count - a.count)
                        .slice(0, 3)
                        .map((item, index) => (
                          <div key={index} className="flex justify-between">
                            <span>{item.origin}</span>
                            <span className="font-medium">{item.count.toLocaleString()}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Train/Dev/Test Split Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Phân tích Train/Dev/Test Split
          </CardTitle>
          <CardDescription>Phân bố nhãn trong các tập train, dev, test qua các rounds</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="R1" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="R1">Round 1</TabsTrigger>
              <TabsTrigger value="R2">Round 2</TabsTrigger>
              <TabsTrigger value="R3">Round 3</TabsTrigger>
            </TabsList>

            {["R1", "R2", "R3"].map(round => (
              <TabsContent key={round} value={round}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart 
                        data={splitDistribution.filter(item => item.round === round)}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="split" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="supported" fill="#10b981" name="SUPPORTED" />
                        <Bar dataKey="refuted" fill="#ef4444" name="REFUTED" />
                        <Bar dataKey="nei" fill="#6b7280" name="NEI" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="space-y-3">
                    {splitDistribution
                      .filter(item => item.round === round)
                      .map((split, index) => {
                        const total = split.supported + split.refuted + split.nei
                        return (
                          <div key={index} className="p-3 border rounded-lg">
                            <h5 className="font-medium mb-2 capitalize">{split.split} ({total.toLocaleString()} mẫu)</h5>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>SUPPORTED</span>
                                <span>{split.supported} ({(split.supported/total*100).toFixed(1)}%)</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>REFUTED</span>
                                <span>{split.refuted} ({(split.refuted/total*100).toFixed(1)}%)</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>NEI</span>
                                <span>{split.nei} ({(split.nei/total*100).toFixed(1)}%)</span>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Similarity Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            Phân tích Độ tương đồng (Jaccard Similarity)
          </CardTitle>
          <CardDescription>Độ tương đồng từ vựng giữa claim và context qua các rounds</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={jaccardSimilarity}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="round" />
                  <YAxis domain={[0, 0.6]} />
                  <Tooltip formatter={(value, name) => [(value * 100).toFixed(2) + '%', name]} />
                  <Legend />
                  <Bar dataKey="avgJaccard" fill="#3b82f6" name="Avg Jaccard" />
                  <Bar dataKey="maxJaccard" fill="#10b981" name="Max Jaccard" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Insight về Độ tương đồng:</h4>
              {jaccardSimilarity.map((sim, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <h5 className="font-medium">{sim.round}</h5>
                  <div className="space-y-1 text-sm mt-2">
                    <div className="flex justify-between">
                      <span>Trung bình:</span>
                      <span className="font-medium">{(sim.avgJaccard * 100).toFixed(2)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tối thiểu:</span>
                      <span className="font-medium">{(sim.minJaccard * 100).toFixed(2)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tối đa:</span>
                      <span className="font-medium">{(sim.maxJaccard * 100).toFixed(2)}%</span>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <h5 className="font-medium text-blue-800">📊 Nhận xét:</h5>
                <ul className="text-sm text-blue-700 mt-2 space-y-1">
                  <li>• Độ tương đồng từ vựng giảm dần qua các rounds</li>
                  <li>• R3 có độ khó cao nhất (Jaccard thấp nhất)</li>
                  <li>• Adversarial claims ngày càng tinh vi hơn</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Text Length Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Phân tích Độ dài Text
          </CardTitle>
          <CardDescription>So sánh độ dài claim và context qua các rounds</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Độ dài Claim</h4>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={detailedStatsPerRound}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="round" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="avgClaimLen" fill="#f59e0b" name="Avg Length" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div>
              <h4 className="font-medium mb-3">Độ dài Context</h4>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={detailedStatsPerRound}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="round" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="avgContextLen" fill="#8b5cf6" name="Avg Length" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h4 className="font-medium text-yellow-800 mb-2">🔍 Observations:</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• <strong>R2 có claim dài nhất</strong> (51.5 từ trung bình) - phức tạp nhất</li>
              <li>• <strong>R3 có context dài nhất</strong> (283.68 từ) - nhiều thông tin nhất</li>
              <li>• <strong>Vocabulary tăng</strong> từ 21K (R1,R2) lên 25K (R3)</li>
              <li>• <strong>Độ dài range rộng</strong>: Context từ 33-1935 từ, Claim từ 8-198 từ</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Round Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {roundsData.map((round) => (
          <Card key={round.round}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {round.round === "R1" && <CheckCircle className="w-5 h-5 text-green-500" />}
                {round.round === "R2" && <AlertTriangle className="w-5 h-5 text-yellow-500" />}
                {round.round === "R3" && <XCircle className="w-5 h-5 text-red-500" />}
                ViAdverNLI {round.round}
              </CardTitle>
              <CardDescription>{round.samples.toLocaleString()} mẫu</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm">
                  <span>SUPPORTED</span>
                  <span>{round.supported}%</span>
                </div>
                <Progress value={round.supported} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <span>REFUTED</span>
                  <span>{round.refuted}%</span>
                </div>
                <Progress value={round.refuted} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <span>NEI</span>
                  <span>{round.nei}%</span>
                </div>
                <Progress value={round.nei} className="h-2" />
              </div>
              <div className="pt-2 border-t">
                <p className="text-sm">
                  <strong>Mô hình:</strong> {round.model}
                </p>
                <p className="text-sm">
                  <strong>Fleiss' Kappa:</strong> {round.kappa}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Complexity Evaluation Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 w-5" />
            Đánh giá Độ phức tạp Suy luận Dataset  
          </CardTitle>
          <CardDescription>
            Phân tích độ phức tạp suy luận thông qua các metrics word overlap và semantic similarity từ paper Table 7
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Methodology Description */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">📝 Phương pháp Đánh giá:</h4>
              <div className="text-sm text-blue-700 space-y-2">
                <p><strong>Word Overlap:</strong> Sử dụng Longest Common Subsequence (LCS), New Word Ratio (NWR), Jaccard Similarity, Lexical Overlap</p>
                <p><strong>Semantic Similarity:</strong> Sử dụng SBERT embeddings với cosine similarity</p>
                <p><strong>Reference:</strong> <a href="https://arxiv.org/pdf/1908.10084" target="_blank" className="text-blue-600 underline">Sentence-BERT: Sentence Embeddings using Siamese BERT-Networks</a></p>
              </div>
            </div>

            {/* Complexity Analysis Table from Paper */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-2 text-left">Round</th>
                    <th className="border border-gray-300 p-2 text-left">Split</th>
                    <th className="border border-gray-300 p-2 text-center">LCS (%)</th>
                    <th className="border border-gray-300 p-2 text-center">NWR (%)</th>
                    <th className="border border-gray-300 p-2 text-center">Jaccard (%)</th>
                    <th className="border border-gray-300 p-2 text-center">Lex. Overlap (%)</th>
                    <th className="border border-gray-300 p-2 text-center">Unique (%)</th>
                    <th className="border border-gray-300 p-2 text-center">TF-IDF (%)</th>
                    <th className="border border-gray-300 p-2 text-center">Semantic (%)</th>
                    <th className="border border-gray-300 p-2 text-center">Ctx Len</th>
                  </tr>
                </thead>
                <tbody>
                  {/* R1 Data */}
                  <tr className="bg-green-50">
                    <td rowSpan={3} className="border border-gray-300 p-2 font-medium bg-green-100">R1</td>
                    <td className="border border-gray-300 p-2">Train</td>
                    <td className="border border-gray-300 p-2 text-center">41.36</td>
                    <td className="border border-gray-300 p-2 text-center">38.07</td>
                    <td className="border border-gray-300 p-2 text-center">16.21</td>
                    <td className="border border-gray-300 p-2 text-center">63.52</td>
                    <td className="border border-gray-300 p-2 text-center">61.93</td>
                    <td className="border border-gray-300 p-2 text-center">47.10</td>
                    <td className="border border-gray-300 p-2 text-center">75.31</td>
                    <td className="border border-gray-300 p-2 text-center">249.07</td>
                  </tr>
                  <tr className="bg-green-50">
                    <td className="border border-gray-300 p-2">Dev</td>
                    <td className="border border-gray-300 p-2 text-center">44.52</td>
                    <td className="border border-gray-300 p-2 text-center">34.36</td>
                    <td className="border border-gray-300 p-2 text-center">15.00</td>
                    <td className="border border-gray-300 p-2 text-center">67.18</td>
                    <td className="border border-gray-300 p-2 text-center">65.64</td>
                    <td className="border border-gray-300 p-2 text-center">47.68</td>
                    <td className="border border-gray-300 p-2 text-center">74.64</td>
                    <td className="border border-gray-300 p-2 text-center">295.35</td>
                  </tr>
                  <tr className="bg-green-50">
                    <td className="border border-gray-300 p-2">Test</td>
                    <td className="border border-gray-300 p-2 text-center">44.68</td>
                    <td className="border border-gray-300 p-2 text-center">34.13</td>
                    <td className="border border-gray-300 p-2 text-center">14.80</td>
                    <td className="border border-gray-300 p-2 text-center">67.42</td>
                    <td className="border border-gray-300 p-2 text-center">65.87</td>
                    <td className="border border-gray-300 p-2 text-center">47.34</td>
                    <td className="border border-gray-300 p-2 text-center">74.41</td>
                    <td className="border border-gray-300 p-2 text-center">300.86</td>
                  </tr>
                  
                  {/* R2 Data */}
                  <tr className="bg-yellow-50">
                    <td rowSpan={3} className="border border-gray-300 p-2 font-medium bg-yellow-100">R2</td>
                    <td className="border border-gray-300 p-2">Train</td>
                    <td className="border border-gray-300 p-2 text-center">34.35</td>
                    <td className="border border-gray-300 p-2 text-center">45.38</td>
                    <td className="border border-gray-300 p-2 text-center">15.87</td>
                    <td className="border border-gray-300 p-2 text-center">56.42</td>
                    <td className="border border-gray-300 p-2 text-center">54.62</td>
                    <td className="border border-gray-300 p-2 text-center">44.32</td>
                    <td className="border border-gray-300 p-2 text-center">76.08</td>
                    <td className="border border-gray-300 p-2 text-center">257.46</td>
                  </tr>
                  <tr className="bg-yellow-50">
                    <td className="border border-gray-300 p-2">Dev</td>
                    <td className="border border-gray-300 p-2 text-center">33.73</td>
                    <td className="border border-gray-300 p-2 text-center">47.21</td>
                    <td className="border border-gray-300 p-2 text-center">14.70</td>
                    <td className="border border-gray-300 p-2 text-center">54.45</td>
                    <td className="border border-gray-300 p-2 text-center">52.79</td>
                    <td className="border border-gray-300 p-2 text-center">42.65</td>
                    <td className="border border-gray-300 p-2 text-center">75.25</td>
                    <td className="border border-gray-300 p-2 text-center">243.44</td>
                  </tr>
                  <tr className="bg-yellow-50">
                    <td className="border border-gray-300 p-2">Test</td>
                    <td className="border border-gray-300 p-2 text-center">34.75</td>
                    <td className="border border-gray-300 p-2 text-center">46.28</td>
                    <td className="border border-gray-300 p-2 text-center">15.29</td>
                    <td className="border border-gray-300 p-2 text-center">55.24</td>
                    <td className="border border-gray-300 p-2 text-center">53.72</td>
                    <td className="border border-gray-300 p-2 text-center">43.91</td>
                    <td className="border border-gray-300 p-2 text-center">75.85</td>
                    <td className="border border-gray-300 p-2 text-center">238.32</td>
                  </tr>
                  
                  {/* R3 Data */}
                  <tr className="bg-red-50">
                    <td rowSpan={3} className="border border-gray-300 p-2 font-medium bg-red-100">R3</td>
                    <td className="border border-gray-300 p-2">Train</td>
                    <td className="border border-gray-300 p-2 text-center">36.05</td>
                    <td className="border border-gray-300 p-2 text-center">46.82</td>
                    <td className="border border-gray-300 p-2 text-center">12.45</td>
                    <td className="border border-gray-300 p-2 text-center">54.54</td>
                    <td className="border border-gray-300 p-2 text-center">53.18</td>
                    <td className="border border-gray-300 p-2 text-center">40.63</td>
                    <td className="border border-gray-300 p-2 text-center">72.52</td>
                    <td className="border border-gray-300 p-2 text-center">284.08</td>
                  </tr>
                  <tr className="bg-red-50">
                    <td className="border border-gray-300 p-2">Dev</td>
                    <td className="border border-gray-300 p-2 text-center">32.70</td>
                    <td className="border border-gray-300 p-2 text-center">49.69</td>
                    <td className="border border-gray-300 p-2 text-center">13.20</td>
                    <td className="border border-gray-300 p-2 text-center">51.87</td>
                    <td className="border border-gray-300 p-2 text-center">50.31</td>
                    <td className="border border-gray-300 p-2 text-center">40.24</td>
                    <td className="border border-gray-300 p-2 text-center">73.77</td>
                    <td className="border border-gray-300 p-2 text-center">283.43</td>
                  </tr>
                  <tr className="bg-red-50">
                    <td className="border border-gray-300 p-2">Test</td>
                    <td className="border border-gray-300 p-2 text-center">32.04</td>
                    <td className="border border-gray-300 p-2 text-center">50.44</td>
                    <td className="border border-gray-300 p-2 text-center">12.93</td>
                    <td className="border border-gray-300 p-2 text-center">51.19</td>
                    <td className="border border-gray-300 p-2 text-center">49.56</td>
                    <td className="border border-gray-300 p-2 text-center">39.78</td>
                    <td className="border border-gray-300 p-2 text-center">73.18</td>
                    <td className="border border-gray-300 p-2 text-center">282.54</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Analysis Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-medium text-green-800 mb-2">📈 Key Findings:</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li><strong>Decreasing Lexical Overlap:</strong> R1 (66.04%) → R3 (52.53%)</li>
                  <li><strong>Increasing New Word Ratio:</strong> R1 (35.52%) → R3 (48.98%)</li>
                  <li><strong>Reduced LCS Ratio:</strong> R1 (43.52%) → R3 (33.60%)</li>
                  <li><strong>Stable Semantic Similarity:</strong> 74-76% across rounds</li>
                </ul>
              </div>
              
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">🎯 Implications:</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Claims ít phụ thuộc vào exact word matches hơn</li>
                  <li>• Round sau giới thiệu vocabulary mới nhiều hơn</li>  
                  <li>• Common subsequences ngắn hơn giữa claims và contexts</li>
                  <li>• Semantic coherence được duy trì dù lexical overlap giảm</li>
                </ul>
              </div>
            </div>

            {/* Visualization */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3">Trend Độ phức tạp qua Rounds</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={[
                    { round: "R1", lexicalOverlap: 66.04, newWordRatio: 35.52, semantic: 74.79 },
                    { round: "R2", lexicalOverlap: 55.37, newWordRatio: 46.29, semantic: 75.73 },
                    { round: "R3", lexicalOverlap: 52.53, newWordRatio: 48.98, semantic: 73.16 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="round" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="lexicalOverlap" stroke="#ef4444" name="Lexical Overlap %" strokeWidth={2} />
                    <Line type="monotone" dataKey="newWordRatio" stroke="#3b82f6" name="New Word Ratio %" strokeWidth={2} />
                    <Line type="monotone" dataKey="semantic" stroke="#10b981" name="Semantic Similarity %" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div>
                <h4 className="font-medium mb-3">Complexity Validation</h4>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Adversarial Generation Validation</span>
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      Các metrics confirm rằng iterative process thành công tạo ra increasingly challenging examples
                    </p>
                  </div>
                  
                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Linguistic Quality</span>
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      Semantic similarity ổn định cho thấy coherence được duy trì
                    </p>
                  </div>

                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Progressive Difficulty</span>
                      <TrendingUp className="w-5 h-5 text-blue-500" />
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      Pattern matching → deeper understanding requirement qua các rounds
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 