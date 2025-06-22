// Rounds data sẽ được thêm từ page.tsx

// Data for rounds and basic performance metrics

export const roundsData = [
  {
    round: "R1",
    model: "mBERT",
    trainingData: "ViNLI + ViWikiFC",
    samples: 5347,
    supported: 32.6,
    refuted: 43.4,
    nei: 24.0,
    difficulty: "Cơ bản",
    kappa: 0.8052,
  },
  {
    round: "R2",
    model: "PhoBERT",
    trainingData: "ViNLI + ViWikiFC + ViFactCheck + ViA1",
    samples: 5961,
    supported: 29.3,
    refuted: 31.8,
    nei: 38.9,
    difficulty: "Nâng cao",
    kappa: 0.8138,
  },
  {
    round: "R3",
    model: "XLM-R",
    trainingData: "ViNLI + ViWikiFC + ViFactCheck + ViA1 + ViA2 + ISE-DSC01",
    samples: 9954,
    supported: 36.9,
    refuted: 31.9,
    nei: 31.2,
    difficulty: "Cao cấp",
    kappa: 0.7539,
  },
]

export const performanceData = [
  { round: "R1", mBERT: 40.54, PhoBERT: 40.05, XLM_R: 42.01 },
  { round: "R2", mBERT: 48.12, PhoBERT: 41.94, XLM_R: 45.90 }, 
  { round: "R3", mBERT: 60.63, PhoBERT: 57.54, XLM_R: 47.22 }
]

export const adversarialImpact = [
  {
    model: "mBERT",
    standard: 70.01, // ViNLI performance
    adversarial: 40.54, // Best ViAdverNLI R1
    drop: 29.47,
    category: "PLM"
  },
  {
    model: "PhoBERT", 
    standard: 72.82, // ViNLI performance
    adversarial: 41.94, // Best ViAdverNLI R2  
    drop: 30.88,
    category: "PLM"
  },
  {
    model: "XLM-R",
    standard: 78.77, // ViNLI performance  
    adversarial: 47.22, // Best ViAdverNLI R3
    drop: 31.55,
    category: "PLM"
  },
  {
    model: "GPT-4o",
    standard: 85.0, // Estimated standard benchmark
    adversarial: 58.15, // Best ViAdverNLI R3
    drop: 26.85,
    category: "LLM Fine-tuned"
  }
]

export const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"] 