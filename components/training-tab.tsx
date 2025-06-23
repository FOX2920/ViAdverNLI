"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Cpu,
  Cloud,
  Server,
  Settings,
  Target,
  Zap
} from "lucide-react"

import {
  modelComparisonSummary,
  plmHyperparameters,
  llmApiHyperparameters,
  llmLocalHyperparameters,
  plmDetailedResults,
  llmFinetuneResults,
  llmPromptResults,
  promptTemplate
} from "@/data/training-data"

function getPerformanceColor(score: number) {
  if (score >= 60) return "text-green-600 font-bold"
  if (score >= 50) return "text-blue-600 font-medium"
  if (score >= 40) return "text-orange-600"
  return "text-red-600"
}

export function TrainingTab() {
  return (
    <div className="space-y-6">
      {/* Training Environment Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-green-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cpu className="w-5 h-5 text-green-600" />
              PLM Fine-tune
            </CardTitle>
            <CardDescription>Kaggle - Tesla P100</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Chi phí:</span>
              <span className="text-green-600 font-medium">Miễn phí</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Triển khai:</span>
              <span className="text-green-600 font-medium">Dễ</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Tùy chỉnh:</span>
              <span className="text-green-600 font-medium">Cao</span>
            </div>
            <Badge className="bg-green-100 text-green-800 w-full justify-center">
              mBERT, phoBERT, XLM-R
            </Badge>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cloud className="w-5 h-5 text-purple-600" />
              LLM API Fine-tune
            </CardTitle>
            <CardDescription>OpenAI / Google Cloud</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Chi phí:</span>
              <span className="text-purple-600 font-medium">Cao</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Triển khai:</span>
              <span className="text-purple-600 font-medium">Rất dễ</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Tùy chỉnh:</span>
              <span className="text-purple-600 font-medium">Thấp</span>
            </div>
            <Badge className="bg-purple-100 text-purple-800 w-full justify-center">
              GPT-4o, Gemini 2.0
            </Badge>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="w-5 h-5 text-red-600" />
              LLM Local Fine-tune
            </CardTitle>
            <CardDescription>H100 SXM5 Server</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Chi phí:</span>
              <span className="text-red-600 font-medium">Rất cao</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Triển khai:</span>
              <span className="text-red-600 font-medium">Khó</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Tùy chỉnh:</span>
              <span className="text-red-600 font-medium">Tối đa</span>
            </div>
            <Badge className="bg-red-100 text-red-800 w-full justify-center">
              Gemma3, Qwen3, DEEPSEEK
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Model Comparison Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            So sánh Tổng quan theo Mô hình
          </CardTitle>
          <CardDescription>Ưu điểm và hạn chế của từng nhóm mô hình</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {modelComparisonSummary.map((item, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{item.group}</h4>
                  <Badge className={item.color}>{item.group.split('(')[0].trim()}</Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-green-700 font-medium">✅ Ưu điểm:</p>
                    <p className="text-gray-600">{item.advantages}</p>
                  </div>
                  <div>
                    <p className="text-red-700 font-medium">❌ Hạn chế:</p>
                    <p className="text-gray-600">{item.disadvantages}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* PLM Hyperparameters Detail */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-green-600" />
            Chi tiết Cấu hình PLM (mBERT, phoBERT, XLM-R)
          </CardTitle>
          <CardDescription>{plmHyperparameters.environment}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">⚙️ Hyperparameters</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Epochs:</span>
                  <span className="font-medium">{plmHyperparameters.config.epochs}</span>
                </div>
                <div className="flex justify-between">
                  <span>Batch Size:</span>
                  <span className="font-medium">{plmHyperparameters.config.batchSize}</span>
                </div>
                <div className="flex justify-between">
                  <span>Learning Rate:</span>
                  <span className="font-medium">{plmHyperparameters.config.learningRate}</span>
                </div>
                <div className="flex justify-between">
                  <span>Max Sequence Length:</span>
                  <span className="font-medium">{plmHyperparameters.config.maxSequenceLength}</span>
                </div>
                <div className="flex justify-between">
                  <span>Optimizer:</span>
                  <span className="font-medium">{plmHyperparameters.config.optimizer}</span>
                </div>
                <div className="flex justify-between">
                  <span>Mixed Precision:</span>
                  <span className="font-medium">{plmHyperparameters.config.mixedPrecision ? 'Có' : 'Không'}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">🔧 Chi tiết Kỹ thuật</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Gradient Accumulation:</span>
                  <span className="font-medium">{plmHyperparameters.config.gradientAccumulation}</span>
                </div>
                <div className="flex justify-between">
                  <span>Weight Decay:</span>
                  <span className="font-medium">{plmHyperparameters.config.weightDecay}</span>
                </div>
                <div className="flex justify-between">
                  <span>Scheduler:</span>
                  <span className="font-medium">{plmHyperparameters.config.scheduler}</span>
                </div>
                <div className="flex justify-between">
                  <span>Early Stopping:</span>
                  <span className="font-medium">{plmHyperparameters.config.earlyStoppingPatience} epochs</span>
                </div>
                <div className="flex justify-between">
                  <span>Max Gradient Norm:</span>
                  <span className="font-medium">{plmHyperparameters.config.maxGradientNorm}</span>
                </div>
                <div className="flex justify-between">
                  <span>GPU:</span>
                  <span className="font-medium">{plmHyperparameters.config.device}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t">
            <h4 className="font-medium mb-3">🤖 Mô hình cụ thể</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {plmHyperparameters.models.map((model, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium">{model.name}</p>
                  <p className="text-xs text-gray-600">{model.fullName}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* LLM Configurations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cloud className="w-5 h-5 text-purple-600" />
              Cấu hình LLM API (GPT-4o / Gemini)
            </CardTitle>
            <CardDescription>{llmApiHyperparameters.environment}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Epochs:</span>
                <span className="font-medium">{llmApiHyperparameters.config.epochs}</span>
              </div>
              <div className="flex justify-between">
                <span>Batch Size:</span>
                <span className="font-medium">{llmApiHyperparameters.config.batchSize}</span>
              </div>
              <div className="flex justify-between">
                <span>LR Multiplier:</span>
                <span className="font-medium">{llmApiHyperparameters.config.learningRateMultiplier}</span>
              </div>
              <div className="flex justify-between">
                <span>Seed:</span>
                <span className="font-medium">{llmApiHyperparameters.config.seed}</span>
              </div>
              <div className="flex justify-between">
                <span>Max Sequence:</span>
                <span className="font-medium">{llmApiHyperparameters.config.maxSequenceLength}</span>
              </div>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <p className="text-xs text-purple-700">
                💡 Backend tự động tối ưu hyperparameters và infrastructure
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="w-5 h-5 text-red-600" />
              Cấu hình LLM Local (H100)
            </CardTitle>
            <CardDescription>{llmLocalHyperparameters.environment}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Epochs:</span>
                <span className="font-medium">{llmLocalHyperparameters.config.epochs}</span>
              </div>
              <div className="flex justify-between">
                <span>Batch Size:</span>
                <span className="font-medium">{llmLocalHyperparameters.config.batchSize}</span>
              </div>
              <div className="flex justify-between">
                <span>Learning Rate:</span>
                <span className="font-medium">{llmLocalHyperparameters.config.learningRate}</span>
              </div>
              <div className="flex justify-between">
                <span>Gradient Accumulation:</span>
                <span className="font-medium">{llmLocalHyperparameters.config.gradientAccumulation}</span>
              </div>
              <div className="flex justify-between">
                <span>Sequence Length:</span>
                <span className="font-medium">{llmLocalHyperparameters.config.sequenceLength}</span>
              </div>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <p className="text-xs text-red-700">
                ⚡ Toàn quyền kiểm soát, xử lý long text tốt nhất
              </p>
              <div className="mt-2 flex flex-wrap gap-1">
                {llmLocalHyperparameters.models.map((model, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {model}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Results from New Data */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Kết quả Hiệu suất PLM (Fine-tune + SBERT + BM25)
          </CardTitle>
          <CardDescription>Hiệu suất chi tiết với evidence retrieval sử dụng SBERT + BM25 hybrid approach</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Evidence Retrieval Methodology */}
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Settings className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-blue-800">🔍 Evidence Retrieval Methodology</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-blue-800 mb-2">📋 Hybrid Retrieval Pipeline:</h4>
                <div className="space-y-2 text-sm text-blue-700">
                  <div className="flex items-start gap-2">
                    <span className="font-mono bg-blue-100 px-2 py-1 rounded text-xs">1.</span>
                    <span><strong>SBERT Encoding:</strong> sentence-transformers/all-MiniLM-L6-v2</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-mono bg-blue-100 px-2 py-1 rounded text-xs">2.</span>
                    <span><strong>BM25 Scoring:</strong> Traditional keyword-based retrieval</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-mono bg-blue-100 px-2 py-1 rounded text-xs">3.</span>
                    <span><strong>Hybrid Fusion:</strong> Combine semantic + lexical signals</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-mono bg-blue-100 px-2 py-1 rounded text-xs">4.</span>
                    <span><strong>Top-N Selection:</strong> Extract most relevant evidence chunks</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-blue-800 mb-2">🎯 Evidence Types & Performance:</h4>
                <div className="space-y-2 text-sm text-blue-700">
                  <div className="flex justify-between items-center p-2 bg-blue-100 rounded">
                    <span><strong>top1:</strong> Most relevant chunk only</span>
                    <span className="font-mono text-xs">Precision focused</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-blue-100 rounded">
                    <span><strong>top2-4:</strong> Multiple evidence chunks</span>
                    <span className="font-mono text-xs">Recall balanced</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-blue-100 rounded">
                    <span><strong>full_context:</strong> Complete document</span>
                    <span className="font-mono text-xs">Baseline approach</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded">
              <h5 className="font-medium text-green-800 mb-1">✅ Best Configurations Found:</h5>
              <div className="text-sm text-green-700 space-y-1">
                <p><strong>🥇 XLM-R + top4 evidence:</strong> 66.89% trên R3 - Cao nhất tổng thể</p>
                <p><strong>🥈 PhoBERT + top2 evidence:</strong> 65.20% trên R3 - Hiệu quả chi phí</p>
                <p><strong>🥉 XLM-R + top2 evidence:</strong> 65.19% trên R3 - Ổn định</p>
                <p className="text-xs mt-2 italic">SBERT semantic + BM25 keyword matching tạo ra evidence quality tối ưu cho các configuration này.</p>
              </div>
            </div>
          </div>
          
          {/* Performance Tables */}
          <Tabs defaultValue="mBERT" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="mBERT">mBERT</TabsTrigger>
              <TabsTrigger value="pho_BERT">phoBERT</TabsTrigger>
              <TabsTrigger value="XLM-R">XLM-R</TabsTrigger>
            </TabsList>

            {Object.entries(plmDetailedResults).map(([modelName, results]) => (
              <TabsContent key={modelName} value={modelName}>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 p-2 text-left">Evidence Type</th>
                        <th className="border border-gray-300 p-2 text-center">R1</th>
                        <th className="border border-gray-300 p-2 text-center">R2</th>
                        <th className="border border-gray-300 p-2 text-center">R3</th>
                        <th className="border border-gray-300 p-2 text-center">Best</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.map((row, index) => {
                        const best = Math.max(row.R1, row.R2, row.R3)
                        return (
                          <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                            <td className="border border-gray-300 p-2 font-medium">{row.evidence}</td>
                            <td className={`border border-gray-300 p-2 text-center ${getPerformanceColor(row.R1)}`}>
                              {row.R1}
                            </td>
                            <td className={`border border-gray-300 p-2 text-center ${getPerformanceColor(row.R2)}`}>
                              {row.R2}
                            </td>
                            <td className={`border border-gray-300 p-2 text-center ${getPerformanceColor(row.R3)}`}>
                              {row.R3}
                            </td>
                            <td className={`border border-gray-300 p-2 text-center font-bold ${getPerformanceColor(best)}`}>
                              {best}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* LLM Results Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            LLM
          </CardTitle>
          <CardDescription>Hiệu suất mô hình LLM với fine-tuning và prompting approaches</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="finetune" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="finetune">Fine-tune</TabsTrigger>
              <TabsTrigger value="prompting">Prompting</TabsTrigger>
            </TabsList>

            <TabsContent value="finetune">
          <div className="space-y-3">
            {llmFinetuneResults.map((model, index) => (
              <div key={index} className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{model.model}</h4>
                    <Badge variant="outline" className={model.type === 'API' ? 'bg-purple-100 text-purple-800' : 'bg-red-100 text-red-800'}>
                      {model.type}
                    </Badge>
                    {model.note && <Badge variant="secondary">{model.note}</Badge>}
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-blue-600">Best: {Math.max(model.R1, model.R2, model.R3)}%</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div className="text-center">
                    <div className="text-gray-500">R1</div>
                    <div className={`font-medium ${getPerformanceColor(model.R1)}`}>{model.R1}%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-gray-500">R2</div>
                    <div className={`font-medium ${getPerformanceColor(model.R2)}`}>{model.R2}%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-gray-500">R3</div>
                    <div className={`font-medium ${getPerformanceColor(model.R3)}`}>{model.R3}%</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h4 className="font-medium text-yellow-800 mb-2">📊 Key Insights từ LLM Fine-tune Results:</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• <strong>GPT-4o dẫn đầu:</strong> Hiệu suất cao nhất 58.15% R3, tăng mạnh từ 50.70% R1</li>
              <li>• <strong>Gemini 2.0 Flash runner-up:</strong> 56.72% R3, stable performance qua các rounds</li>
                  <li>• <strong>DEEPSEEK R1 ấn tượng:</strong> 54.20% R3, local model tốt nhất, cạnh tranh với API</li>
              <li>• <strong>Xu hướng tăng dần:</strong> Tất cả models đều cải thiện đáng kể từ R1 → R3</li>
              <li>• <strong>Fine-tuning vượt trội:</strong> Hiệu suất cao hơn 10-15% so với prompting thuần túy</li>
              <li>• <strong>Gap API vs Local:</strong> Chỉ ~3% chênh lệch, cho thấy local models ngày càng mạnh</li>
              <li>• <strong>Consistency:</strong> Gemma3 và Qwen3 đều ổn định, cải thiện đều đặn qua rounds</li>
            </ul>
          </div>

          {/* LLM Fine-tune Prompt Template */}
          <div className="mt-6 p-4 bg-slate-50 border border-slate-200 rounded-lg">
            <h4 className="font-medium text-slate-800 mb-3">🔧 Prompt Template cho LLM Fine-tune:</h4>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <div className="text-blue-400 mb-2">// Fine-tune Messages Format</div>
              <pre className="whitespace-pre-wrap text-xs">
                {promptTemplate.finetuneTemplate}
              </pre>
            </div>
            
                                 <div className="mt-3">
              <div className="space-y-2">
                <h5 className="font-medium text-slate-700 text-sm">✨ Đặc điểm Fine-tune Template:</h5>
                <ul className="text-xs text-slate-600 space-y-1">
                  {promptTemplate.features.map((feature, index) => (
                    <li key={index}>• <strong>{feature.split(':')[0]}:</strong> {feature.split(':')[1]}</li>
                  ))}
                </ul>
                   </div>
                 </div>
              </div>
            </TabsContent>

            <TabsContent value="prompting">
              <div className="space-y-3">
                {llmPromptResults.map((model, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{model.model}</h4>
                        <Badge variant="outline" className={model.type === 'Open' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}>
                          {model.type}
                        </Badge>
                        <Badge variant="secondary">{model.method}</Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-orange-600">Best: {Math.max(model.R1, model.R2, model.R3)}%</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div className="text-center">
                        <div className="text-gray-500">R1</div>
                        <div className={`font-medium ${getPerformanceColor(model.R1)}`}>{model.R1}%</div>
                      </div>
                      <div className="text-center">
                        <div className="text-gray-500">R2</div>
                        <div className={`font-medium ${getPerformanceColor(model.R2)}`}>{model.R2}%</div>
                      </div>
                      <div className="text-center">
                        <div className="text-gray-500">R3</div>
                        <div className={`font-medium ${getPerformanceColor(model.R3)}`}>{model.R3}%</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <h4 className="font-medium text-orange-800 mb-2">📊 Key Insights từ In-Context Learning Results:</h4>
                <ul className="text-sm text-orange-700 space-y-1">
                  <li>• <strong>Performance Gap lớn:</strong> ICL chỉ đạt ~47% tốt nhất, kém fine-tuning 10-15%</li>
                  <li>• <strong>Qwen3:14b dẫn đầu Open:</strong> 46.72% R2, model reasoning mạnh nhất</li>
                  <li>• <strong>Closed models cạnh tranh:</strong> o4_mini và Gemini 2.5 Flash đều ~46-47%</li>
                  <li>• <strong>Inconsistent qua rounds:</strong> R3 performance drop ở hầu hết models</li>
                  <li>• <strong>Zero-shot limitation:</strong> Khó handle complex adversarial patterns</li>
                  <li>• <strong>Reasoning models tốt hơn:</strong> Phi4-reasoning, Magistral, Cogito stable</li>
                  <li>• <strong>Cost vs Performance:</strong> ICL cost thấp nhưng hiệu quả giới hạn</li>
                </ul>
              </div>

              {/* Vietnamese ICL Prompt Template */}
              <div className="mt-6 p-4 bg-cyan-50 border border-cyan-200 rounded-lg">
                <h4 className="font-medium text-cyan-800 mb-3">🔧 Vietnamese In-Context Learning Prompt:</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <div className="text-cyan-400 mb-2">// Vietnamese ICL Structured Prompt</div>
                  <pre className="whitespace-pre-wrap text-xs">
{`Bạn là chuyên gia fact-checking tiếng Việt.
Hãy thực hiện ngầm các bước:
1. So khớp và so sánh số liệu (nếu có) giữa CONTEXT và CLAIM.
2. So sánh bất kỳ giá trị số hoặc thời gian (nếu có) giữa CONTEXT và CLAIM.
3. Kiểm tra xem CLAIM có chèn thêm thông tin phụ không xuất hiện trong CONTEXT → nếu có, gán NEI.
4. Đưa ra kết luận:
   • SUPPORTED nếu CLAIM được xác nhận hoàn toàn bởi bằng chứng.
   • REFUTED nếu CLAIM bị bác bỏ trực tiếp.
   • NEI nếu không có đủ thông tin.

CONTEXT: {context}
CLAIM: {claim}

CUỐI CÙNG chỉ trả về một JSON duy nhất:
{"Label": "SUPPORTED"} hoặc
{"Label": "REFUTED"} hoặc {"Label": "NEI"},
không thêm bất cứ chữ nào khác.`}
                  </pre>
                </div>
                
                <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h5 className="font-medium text-cyan-700 text-sm">✨ Đặc điểm ICL Prompt:</h5>
                    <ul className="text-xs text-cyan-600 space-y-1">
                      <li>• <strong>Vietnamese-specific:</strong> Tối ưu cho ngôn ngữ tiếng Việt</li>
                      <li>• <strong>Step-by-step:</strong> Hướng dẫn reasoning từng bước</li>
                      <li>• <strong>Number focus:</strong> Đặc biệt chú ý số liệu và thời gian</li>
                      <li>• <strong>JSON output:</strong> Structured response cho parsing</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-2">
                    <h5 className="font-medium text-cyan-700 text-sm">📈 Thách thức với ICL:</h5>
                    <ul className="text-xs text-cyan-600 space-y-1">
                      <li>• <strong>Context length:</strong> Giới hạn với long documents</li>
                      <li>• <strong>Complex reasoning:</strong> Khó handle adversarial patterns</li>
                      <li>• <strong>Hallucination risk:</strong> Tạo ra thông tin không có</li>
                      <li>• <strong>Consistency:</strong> Performance không ổn định qua rounds</li>
                </ul>
              </div>
            </div>
          </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
} 