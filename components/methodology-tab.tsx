"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { 
  Brain, 
  Target, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Settings,
  FileText,
  Zap,
  Filter,
  Users
} from "lucide-react"

export function MethodologyTab() {
  const constructionRules = {
    general: [
      "Capitalize the first letter of sentences and end with proper punctuation",
      "Ensure correct spelling and grammar with no extra whitespace", 
      "Use only numerical digits for dates, ages, statistics, and monetary values",
      "Claims must be closely related to the context content and remain on-topic",
      "Avoid excessive verbatim copying from context; only direct evidence citations are permitted"
    ],
    supported: [
      "Base claims entirely on information present in the context without external knowledge",
      "Select information/statistics from context and rephrase using synonyms, voice conversion (active-passive), or syntactic simplification"
    ],
    refuted: [
      "Construct claims containing at least one contradictory or erroneous information compared to the context",
      "Techniques include altering statistics, negating facts, using antonyms, or confusing entities"
    ],
    nei: [
      "Include information or statistics that cannot be determined as true/false based on context due to insufficient evidence",
      "Techniques include expanding, narrowing, inferring, or adding information not present in the context"
    ]
  }

  const examples = {
    supported: {
      context: "Thomas Edison phát minh bóng đèn điện sợi đốt năm 1879.",
      claim: "Bóng đèn điện sợi đốt đầu tiên được chế tạo bởi Thomas Edison.",
      explanation: "Claim rephrases context information using voice conversion (active→passive)"
    },
    refuted: {
      context: "Cá voi xanh là động vật nặng nhất (150–200 tấn).",
      claim: "Cá voi xanh là động vật nhẹ nhất thế giới.",
      explanation: "Claim contains direct contradiction using antonym (nặng nhất → nhẹ nhất)"
    },
    nei: {
      context: "Anh ấy là sinh viên năm 3.",
      claim: "Anh ấy sinh năm 2003.",
      explanation: "Claim adds specific information (birth year) not inferable from context"
    }
  }

  const pipelineStages = [
    {
      stage: "Context Data Preparation",
      icon: <FileText className="w-5 h-5" />,
      description: "Crawling articles from Wikipedia, VnExpress, and official news sources",
      details: [
        "Data Collection: Diverse Vietnamese sources",
        "Preprocessing: HTML/XML tag removal, punctuation normalization",
        "Batch Organization: 100-200 passages for efficient API processing"
      ]
    },
    {
      stage: "Multi-Round Claim Generation",
      icon: <Brain className="w-5 h-5" />,
      description: "Different LLM ensembles employed in each round to progressively increase adversarial complexity",
      details: [
        "Round 1: qwq, deepseek-r1:14b, mistral-small3.1",
        "Round 2: cogito:14b, granite3.2:8b-instruct-q8_0, phi4-reasoning, qwen3:14b", 
        "Round 3: deepseek-r1:32b, phi4-reasoning:plus, qwen3:32b, gemma3n, gpt_4o_mini, grok_3_mini"
      ]
    },
    {
      stage: "Claim Pre-filtering",
      icon: <Filter className="w-5 h-5" />,
      description: "Rigorous filtering for language purity, sentence structure, and minimum length requirements",
      details: [
        "Language Purity: ≥90% Vietnamese words, proper quotation for foreign terms",
        "Sentence Structure: Single-sentence claims only",
        "Minimum Length: ≥30 characters and ≥3 words"
      ]
    },
    {
      stage: "Cross-Evaluation System",
      icon: <Users className="w-5 h-5" />,
      description: "Same models serve dual roles as generators and evaluators in cross-evaluation framework",
      details: [
        "Target Model Adversarial Selection: 5 prediction iterations per claim",
        "Cross-Model Quality Assessment: Multiple perspectives on each claim",
        "Bias Reduction: Comprehensive quality assessment beyond target model"
      ]
    },
    {
      stage: "Ensemble Labeling & Quality Control", 
      icon: <CheckCircle className="w-5 h-5" />,
      description: "Multiple quality assurance mechanisms through cross-evaluation",
      details: [
        "Cross-Evaluation Majority Voting: Labels aggregated using majority vote",
        "Inter-Model Consensus: Fleiss' Kappa ≥ 0.75 required for inclusion",
        "Quality Filtering: Claims with low consensus undergo prompt adjustment"
      ]
    },
    {
      stage: "Iterative Round Evolution",
      icon: <Zap className="w-5 h-5" />,
      description: "Progressive adversarial training with specific target model configurations",
      details: [
        "R1: mBERT target, ViNLI + ViWikiFC training",
        "R2: PhoBERT target, +ViA1 + ViFactCheck training",
        "R3: XLM-R target, +ViA2 + ISE-DS01 training"
      ]
    }
  ]

  return (
    <div className="space-y-6">
      {/* Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-6 h-6 text-blue-600" />
            ViAdverNLI Methodology Overview
          </CardTitle>
          <CardDescription>
            Systematic six-stage automated pipeline for adversarial claim generation and labeling across all rounds
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">🎯 Core Methodology:</h4>
            <p className="text-sm text-blue-700">
              Iterative adversarial data generation sử dụng ensemble large language models trong multi-round protocol 
              được thiết kế để progressively escalate adversarial complexity. Mỗi round target limitations của 
              progressively stronger baseline models (mBERT → PhoBERT → XLM-R).
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Pipeline Stages */}
      <Card>
        <CardHeader>
          <CardTitle>Automated Pipeline Stages</CardTitle>
          <CardDescription>
            Six main stages of the comprehensive automated pipeline for adversarial claim generation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pipelineStages.map((stage, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 p-2 bg-blue-100 rounded-lg text-blue-600">
                    {stage.icon}
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold">Stage {index + 1}: {stage.stage}</h4>
                      <Badge variant="outline">{index + 1}/6</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{stage.description}</p>
                    <ul className="text-xs text-gray-500 space-y-1">
                      {stage.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-start gap-2">
                          <span className="font-mono bg-gray-100 px-1 rounded">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Adversarial Claim Construction Rules */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Adversarial Claim Construction Rules
          </CardTitle>
          <CardDescription>
            Systematic construction rules để ensure high-quality, challenging examples
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="general">General Rules</TabsTrigger>
              <TabsTrigger value="supported">SUPPORTED</TabsTrigger>
              <TabsTrigger value="refuted">REFUTED</TabsTrigger>
              <TabsTrigger value="nei">NEI</TabsTrigger>
            </TabsList>

            {/* General Rules */}
            <TabsContent value="general" className="space-y-4">
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-3">📝 General Claim Construction Rules</h4>
                <ul className="space-y-2 text-sm">
                  {constructionRules.general.map((rule, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <h4 className="font-medium text-red-800 mb-3">🚫 Additional Guidelines</h4>
                <ul className="space-y-2 text-sm text-red-700">
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <span><strong>Avoid</strong> creating claims unrelated to the topic</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <span><strong>Avoid</strong> overusing simple transformations (only synonym replacement or negation)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span><strong>Label priority order:</strong> REFUTED > NEI > SUPPORTED</span>
                  </li>
                </ul>
              </div>
            </TabsContent>

            {/* SUPPORTED Rules */}
            <TabsContent value="supported" className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-medium text-green-800 mb-3">✅ SUPPORTED Claim Construction Principles</h4>
                <ul className="space-y-2 text-sm text-green-700">
                  {constructionRules.supported.map((rule, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-3">💡 Example</h4>
                <div className="space-y-3 text-sm">
                  <div>
                    <strong>Context:</strong>
                    <div className="p-2 bg-white rounded border text-gray-700">
                      {examples.supported.context}
                    </div>
                  </div>
                  <div>
                    <strong>Generated Claim:</strong>
                    <div className="p-2 bg-green-100 rounded border text-green-800">
                      {examples.supported.claim}
                    </div>
                  </div>
                  <div>
                    <strong>Technique:</strong>
                    <div className="text-blue-600">
                      {examples.supported.explanation}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* REFUTED Rules */}
            <TabsContent value="refuted" className="space-y-4">
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <h4 className="font-medium text-red-800 mb-3">❌ REFUTED Claim Construction Principles</h4>
                <ul className="space-y-2 text-sm text-red-700">
                  {constructionRules.refuted.map((rule, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-3">💡 Example</h4>
                <div className="space-y-3 text-sm">
                  <div>
                    <strong>Context:</strong>
                    <div className="p-2 bg-white rounded border text-gray-700">
                      {examples.refuted.context}
                    </div>
                  </div>
                  <div>
                    <strong>Generated Claim:</strong>
                    <div className="p-2 bg-red-100 rounded border text-red-800">
                      {examples.refuted.claim}
                    </div>
                  </div>
                  <div>
                    <strong>Technique:</strong>
                    <div className="text-blue-600">
                      {examples.refuted.explanation}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* NEI Rules */}
            <TabsContent value="nei" className="space-y-4">
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="font-medium text-yellow-800 mb-3">❓ NEI (Not Enough Information) Construction Principles</h4>
                <ul className="space-y-2 text-sm text-yellow-700">
                  {constructionRules.nei.map((rule, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-3">💡 Example</h4>
                <div className="space-y-3 text-sm">
                  <div>
                    <strong>Context:</strong>
                    <div className="p-2 bg-white rounded border text-gray-700">
                      {examples.nei.context}
                    </div>
                  </div>
                  <div>
                    <strong>Generated Claim:</strong>
                    <div className="p-2 bg-yellow-100 rounded border text-yellow-800">
                      {examples.nei.claim}
                    </div>
                  </div>
                  <div>
                    <strong>Technique:</strong>
                    <div className="text-blue-600">
                      {examples.nei.explanation}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Quality Assurance */}
      <Card>
        <CardHeader>
          <CardTitle>Quality Assurance Mechanisms</CardTitle>
          <CardDescription>
            Rigorous quality control ensuring both adversarial challenge and logical consistency
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-600" />
                Target Model Adversarial Selection
              </h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Each claim undergoes <strong>5 prediction iterations</strong> by target model</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Claims selected if they cause <strong>model failures</strong> (incorrect predictions)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>If all correct, select claims with <strong>lowest confidence scores</strong></span>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-600" />
                Cross-Model Quality Assessment
              </h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Each model generates claims and evaluates claims from peers</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Multiple perspectives provide <strong>comprehensive quality assessment</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Reduces biases beyond single target model perspective</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h4 className="font-medium text-green-800 mb-2">🎯 Final Quality Metrics</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">83.1%</div>
                <div className="text-green-700">Overall Retention Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">≥0.75</div>
                <div className="text-blue-700">Required Fleiss' Kappa</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">21,262</div>
                <div className="text-purple-700">Final Quality Claims</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 