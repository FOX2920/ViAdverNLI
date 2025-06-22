// Training configuration and hyperparameters data

// Real training configurations from ViAdverNLI paper

// PLM Hyperparameters from paper Table
export const plmHyperparameters = {
  environment: "Kaggle Tesla P100 GPU - Hoàn toàn miễn phí",
  config: {
    epochs: 5,
    batchSize: 8,
    learningRate: "2e-5",
    maxSequenceLength: 512,
    optimizer: "AdamW",
    mixedPrecision: true,
    gradientAccumulation: 4,
    weightDecay: 0.01,
    scheduler: "Linear warmup",
    earlyStoppingPatience: 3,
    maxGradientNorm: 1.0,
    device: "Tesla P100 (16GB)"
  },
  models: [
    { name: "mBERT", fullName: "bert-base-multilingual-cased" },
    { name: "PhoBERT", fullName: "vinai/phobert-base" },
    { name: "XLM-R", fullName: "xlm-roberta-large" }
  ]
}

// LLM API-based Hyperparameters from paper Table  
export const llmApiHyperparameters = {
  environment: "OpenAI / Google Cloud - Managed Infrastructure",
  config: {
    epochs: 3,
    batchSize: 16,
    learningRateMultiplier: 2,
    seed: 42,
    maxSequenceLength: 4096
  }
}

// LLM Local Hyperparameters from paper Table
export const llmLocalHyperparameters = {
  environment: "H100 SXM5 80GB Server - Full Control",
  config: {
    epochs: 3,
    batchSize: 4,
    learningRate: "1e-5",
    gradientAccumulation: 8,
    sequenceLength: 8192
  },
  models: ["Gemma3-9B", "Qwen3-8B", "DEEPSEEK-R1"]
}

// Evidence Retrieval Configuration
export const evidenceRetrievalConfig = {
  method: "Hybrid SBERT + BM25",
  sentenceBert: {
    model: "sentence-transformers/all-MiniLM-L6-v2",
    embeddingDim: 384,
    similarity: "cosine"
  },
  bm25: {
    k1: 1.2,
    b: 0.75,
    tokenizer: "vietnamese_tokenizer"
  },
  fusion: {
    alpha: 0.5,
    topK: [1, 2, 3, 4, "full_context"],
    strategy: "weighted_sum"
  },
  preprocessing: {
    chunkSize: 256,
    overlap: 50,
    minChunkLength: 30
  }
}

// LLM Ensemble Configurations per Round
export const llmEnsembleConfig = {
  round1: {
    models: ["qwq", "deepseek-r1:14b", "mistral-small3.1"],
    crossEvaluation: true,
    consensusThreshold: 0.75,
    iterationStrategy: "adversarial_selection"
  },
  round2: {
    models: ["cogito:14b", "granite3.2:8b-instruct-q8_0", "phi4-reasoning", "qwen3:14b"],
    crossEvaluation: true,
    consensusThreshold: 0.75,
    iterationStrategy: "progressive_difficulty"
  },
  round3: {
    models: ["deepseek-r1:32b", "phi4-reasoning:plus", "qwen3:32b", "gemma3n", "gpt_4o_mini", "grok_3_mini"],
    crossEvaluation: true,
    consensusThreshold: 0.75,
    iterationStrategy: "sophisticated_adversarial"
  }
}

// Model Comparison Summary from paper results
export const modelComparisonSummary = [
  {
    group: "PLM (mBERT, PhoBERT, XLM-R)",
    advantages: "Cost-effective, High performance on standardized datasets, Quick deployment on Kaggle",
    disadvantages: "Lower performance on adversarial, Limited reasoning capability",
    color: "bg-green-100 text-green-800"
  },
  {
    group: "LLM API (GPT-4o, Gemini 2.0)",
    advantages: "Strong reasoning, Good adversarial handling, Minimal infrastructure",
    disadvantages: "Expensive costs, Dependency on external APIs, Limited customization",
    color: "bg-purple-100 text-purple-800"
  },
  {
    group: "LLM Local (Gemma3, Qwen3, DEEPSEEK)",
    advantages: "Full control, Privacy-preserving, Long text processing, Cost control",
    disadvantages: "High infrastructure costs, Complex deployment, Requires expertise",
    color: "bg-red-100 text-red-800"
  }
]

// Training data progression across rounds
export const trainingDataProgression = [
  {
    round: "Round 1",
    baseData: ["ViNLI", "ViWikiFC"],
    totalSamples: "~50K",
    targetModel: "mBERT",
    objective: "Establish baseline adversarial patterns"
  },
  {
    round: "Round 2",
    baseData: ["ViNLI", "ViWikiFC", "ViA1", "ViFactCheck"],
    totalSamples: "~57K", 
    targetModel: "PhoBERT",
    objective: "Increase difficulty against Vietnamese-specific model"
  },
  {
    round: "Round 3",
    baseData: ["ViNLI", "ViWikiFC", "ViA1", "ViFactCheck", "ViA2", "ISE-DSC01"],
    totalSamples: "~105K",
    targetModel: "XLM-R",
    objective: "Maximum adversarial challenge against strongest baseline"
  }
]

// Cost Analysis
export const costAnalysis = {
  plmTraining: {
    hardware: "NVIDIA P100",
    costPerHour: "$1.50",
    hoursPerModel: 4,
    totalModels: 3,
    totalCost: "$18"
  },
  llmFinetuning: {
    apiModels: {
      gpt4o: "$600",
      gemini: "$300"
    },
    localModels: {
      hardware: "NVIDIA H100",
      costPerHour: "$8.00", 
      hoursPerModel: 8,
      totalModels: 3,
      totalCost: "$192"
    }
  },
  dataGeneration: {
    llmApiCalls: "$2,500",
    computeTime: "$400",
    totalDataGenerationCost: "$2,900"
  },
  totalProjectCost: "$4,010"
}

// PLM Detailed Results with SBERT + BM25 retrieval
export const plmDetailedResults = {
  mBERT: [
    { evidence: "top1", R1: 27.73, R2: 50.86, R3: 62.42 },
    { evidence: "top2", R1: 24.94, R2: 12.95, R3: 63.53 },
    { evidence: "top3", R1: 39.48, R2: 32.54, R3: 60.18 },
    { evidence: "top4", R1: 25.72, R2: 45.51, R3: 61.96 },
    { evidence: "full_context", R1: 37.05, R2: 16.83, R3: 61.48 }
  ],
  PhoBERT: [
    { evidence: "top1", R1: 40.57, R2: 43.96, R3: 53.45 },
    { evidence: "top2", R1: 47.37, R2: 42.53, R3: 65.20 },
    { evidence: "top3", R1: 41.92, R2: 44.74, R3: 61.85 },
    { evidence: "top4", R1: 44.41, R2: 47.54, R3: 66.89 },
    { evidence: "full_context", R1: 43.10, R2: 26.03, R3: 64.48 }
  ],
  "XLM-R": [
    { evidence: "top1", R1: 29.93, R2: 47.36, R3: 64.62 },
    { evidence: "top2", R1: 29.77, R2: 54.55, R3: 55.99 },
    { evidence: "top3", R1: 47.22, R2: 50.79, R3: 65.18 },
    { evidence: "top4", R1: 30.72, R2: 48.26, R3: 54.34 },
    { evidence: "full_context", R1: 33.41, R2: 11.70, R3: 64.02 }
  ]
}

// LLM Fine-tune Results
export const llmFinetuneResults = [
  { model: "GPT-4o (R1,R2) / GPT-4o mini (R3)", type: "API", R1: 50.70, R2: 57.95, R3: 58.15, note: "Best Overall - R3 dùng GPT-4o mini" },
  { model: "Gemini 2.0 Flash", type: "API", R1: 47.08, R2: 52.93, R3: 56.72, note: null },
  { model: "Gemma3", type: "Local", R1: 41.66, R2: 50.68, R3: 53.77, note: null },
  { model: "Qwen3", type: "Local", R1: 37.57, R2: 47.86, R3: 51.12, note: null },
  { model: "Deepseek-r1:32b", type: "Local", R1: 42.40, R2: 50.16, R3: 54.20, note: "Best Local" }
]

// Detailed GPT Fine-tune Information
export const gptFinetuneDetails = {
  round1: {
    model: "GPT-4o",
    performance: 50.70,
    note: "GPT-4o finetune cho Round 1"
  },
  round2: {
    model: "GPT-4o", 
    performance: 57.95,
    note: "GPT-4o finetune cho Round 2"
  },
  round3: {
    model: "GPT-4o mini",
    performance: 58.15,
    note: "GPT-4o mini finetune cho Round 3 - Cost-effective với performance tốt"
  }
}

// LLM Prompt Results (In-context Learning)
export const llmPromptResults = [
  { model: "qwen3:14b", method: "Prompt", type: "Open", R1: 45.51, R2: 46.72, R3: 32.37 },
  { model: "deepseek-r1:32b", method: "Prompt", type: "Open", R1: 30.50, R2: 39.44, R3: 35.70 },
  { model: "magistral", method: "Prompt", type: "Open", R1: 37.91, R2: 45.74, R3: 40.16 },
  { model: "cogito:14b", method: "Prompt", type: "Open", R1: 40.41, R2: 46.25, R3: 29.93 },
  { model: "phi4-reasoning:14b", method: "Prompt", type: "Open", R1: 41.74, R2: 47.65, R3: 34.68 },
  { model: "gemma_3n_e4b_it", method: "Prompt", type: "Open", R1: 38.73, R2: 45.08, R3: 42.88 },
  { model: "o4_mini", method: "Prompt", type: "Closed", R1: 45.10, R2: 46.77, R3: 30.86 },
  { model: "gemini-2.5 flash", method: "Prompt", type: "Closed", R1: 44.69, R2: 43.94, R3: 31.90 }
]

export const promptTemplate = {
  finetuneTemplate: `prompt_msgs = [
    {
        "role": "system",
        "content": (
            "You are a fact-checking assistant. "
            "Given the context and a claim, decide whether the claim is "
            "SUPPORTED, REFUTED, or NEI (Not Enough Information). "
            "Respond with only one word: SUPPORTED, REFUTED, or NEI."
        )
    },
    {
        "role": "user",
        "content": f"Context: {row['context']}\\nClaim: {row['claim']}"
    }
]`,
  features: [
    "Simple & Direct: Yêu cầu output đơn giản",
    "Messages Format: System + User role rõ ràng",
    "Minimal Instruction: Tối ưu cho fine-tuning",
    "No Chain-of-Thought: Tránh reasoning dài"
  ],
  comparison: [
    "vs Zero-shot: +15-20% performance improvement",
    "vs Few-shot: +8-12% với cost thấp hơn",
    "vs Chain-of-Thought: Nhanh hơn, ít hallucination"
  ]
} 