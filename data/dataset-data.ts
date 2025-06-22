// Dataset data sẽ được thêm từ page.tsx 

// Dataset analysis data từ page.tsx

// Complexity evaluation data for reasoning analysis
export const complexityEvaluationData = [
  {
    round: "R1",
    split: "dev",
    lcs_ratio: 44.52,
    nwr: 34.36,
    jaccard: 15.00,
    lexical_overlap: 67.18,
    unique_overlap: 65.64,
    tfidf_cosine: 47.68,
    semantic_similarity: 74.64,
    num_sent_ctx: 11.02,
    num_sent_clm: 2.04,
    len_ctx: 295.35,
    len_clm: 42.29
  },
  {
    round: "R1",
    split: "test",
    lcs_ratio: 44.68,
    nwr: 34.13,
    jaccard: 14.80,
    lexical_overlap: 67.42,
    unique_overlap: 65.87,
    tfidf_cosine: 47.34,
    semantic_similarity: 74.41,
    num_sent_ctx: 11.28,
    num_sent_clm: 2.04,
    len_ctx: 300.86,
    len_clm: 42.47
  },
  {
    round: "R1",
    split: "train",
    lcs_ratio: 41.36,
    nwr: 38.07,
    jaccard: 16.21,
    lexical_overlap: 63.52,
    unique_overlap: 61.93,
    tfidf_cosine: 47.10,
    semantic_similarity: 75.31,
    num_sent_ctx: 9.86,
    num_sent_clm: 2.06,
    len_ctx: 249.07,
    len_clm: 45.39
  },
  {
    round: "R2",
    split: "dev",
    lcs_ratio: 33.73,
    nwr: 47.21,
    jaccard: 14.70,
    lexical_overlap: 54.45,
    unique_overlap: 52.79,
    tfidf_cosine: 42.65,
    semantic_similarity: 75.25,
    num_sent_ctx: 8.72,
    num_sent_clm: 2.12,
    len_ctx: 243.44,
    len_clm: 49.45
  },
  {
    round: "R2",
    split: "test",
    lcs_ratio: 34.75,
    nwr: 46.28,
    jaccard: 15.29,
    lexical_overlap: 55.24,
    unique_overlap: 53.72,
    tfidf_cosine: 43.91,
    semantic_similarity: 75.85,
    num_sent_ctx: 8.42,
    num_sent_clm: 2.11,
    len_ctx: 238.32,
    len_clm: 49.61
  },
  {
    round: "R2",
    split: "train",
    lcs_ratio: 34.35,
    nwr: 45.38,
    jaccard: 15.87,
    lexical_overlap: 56.42,
    unique_overlap: 54.62,
    tfidf_cosine: 44.32,
    semantic_similarity: 76.08,
    num_sent_ctx: 9.34,
    num_sent_clm: 2.10,
    len_ctx: 257.46,
    len_clm: 53.46
  },
  {
    round: "R3",
    split: "dev",
    lcs_ratio: 32.70,
    nwr: 49.69,
    jaccard: 13.20,
    lexical_overlap: 51.87,
    unique_overlap: 50.31,
    tfidf_cosine: 40.24,
    semantic_similarity: 73.77,
    num_sent_ctx: 10.70,
    num_sent_clm: 2.07,
    len_ctx: 283.43,
    len_clm: 48.78
  },
  {
    round: "R3",
    split: "test",
    lcs_ratio: 32.04,
    nwr: 50.44,
    jaccard: 12.93,
    lexical_overlap: 51.19,
    unique_overlap: 49.56,
    tfidf_cosine: 39.78,
    semantic_similarity: 73.18,
    num_sent_ctx: 10.67,
    num_sent_clm: 2.07,
    len_ctx: 282.54,
    len_clm: 48.94
  },
  {
    round: "R3",
    split: "train",
    lcs_ratio: 36.05,
    nwr: 46.82,
    jaccard: 12.45,
    lexical_overlap: 54.54,
    unique_overlap: 53.18,
    tfidf_cosine: 40.63,
    semantic_similarity: 72.52,
    num_sent_ctx: 10.93,
    num_sent_clm: 2.06,
    len_ctx: 284.08,
    len_clm: 42.57
  }
];

export const complexityMetricsDefinition = [
  { metric: "lcs_ratio (%)", definition: "Tỷ lệ LCS so với độ dài của claim_tokens, (%)" },
  { metric: "nwr (%)", definition: "New Word Ratio: % từ trong claim không có trong context" },
  { metric: "jaccard (%)", definition: "Jaccard Similarity: độ tương đồng tập từ giữa context và claim, (%)" },
  { metric: "lexical_overlap (%)", definition: "Tỷ lệ token trong claim xuất hiện trong context, (%)" },
  { metric: "unique_overlap (%)", definition: "Tỷ lệ từ duy nhất của claim cũng có trong context, (%)" },
  { metric: "tfidf_cosine (%)", definition: "Cosine similarity giữa vector TF–IDF của context và claim, (%)" },
  { metric: "semantic_similarity (%)", definition: "Cosine similarity giữa embeddings SBERT của context và claim, (%)" },
  { metric: "num_sent_ctx", definition: "Số câu trong context (đếm thô theo dấu chấm \".\")" },
  { metric: "num_sent_clm", definition: "Số câu trong claim" },
  { metric: "len_ctx", definition: "Số token (từ) của context" },
  { metric: "len_clm", definition: "Số token (từ) của claim" }
];

export const dataSourcesBreakdown = {
  Wikipedia: { total: 9973, percentage: 46.9, rounds: { R1: 2601, R2: 2150, R3: 5222 } },
  VnExpress: { total: 6023, percentage: 28.3, rounds: { R1: 2746, R2: 1155, R3: 2122 } },
  "Báo Lao Động": { total: 1484, percentage: 7.0, rounds: { R1: 0, R2: 389, R3: 1095 } },
  "Báo Pháp Luật": { total: 1123, percentage: 5.3, rounds: { R1: 0, R2: 630, R3: 493 } },
  "Báo Chính Phủ": { total: 1114, percentage: 5.2, rounds: { R1: 0, R2: 614, R3: 500 } },
  "Báo Nhân Dân": { total: 1088, percentage: 5.1, rounds: { R1: 0, R2: 566, R3: 522 } },
  "Thanh Niên": { total: 457, percentage: 2.1, rounds: { R1: 0, R2: 457, R3: 0 } },
};

// Detailed statistics per round from paper Table tab:viadvernli-stats
export const detailedStatsPerRound = [
  {
    round: "R1",
    numSamples: 5347,
    avgClaimLen: 44.02,
    minClaimLen: 8,
    maxClaimLen: 126,
    avgContextLen: 271.46,
    minContextLen: 33,
    maxContextLen: 1935,
    vocabSize: 21022
  },
  {
    round: "R2", 
    numSamples: 5961,
    avgClaimLen: 51.50,
    minClaimLen: 12,
    maxClaimLen: 179,
    avgContextLen: 249.19,
    minContextLen: 50,
    maxContextLen: 1422,
    vocabSize: 21054
  },
  {
    round: "R3",
    numSamples: 9954,
    avgClaimLen: 44.86,
    minClaimLen: 10,
    maxClaimLen: 198,
    avgContextLen: 283.68,
    minContextLen: 62,
    maxContextLen: 1783,
    vocabSize: 25697
  }
];

export const dataOriginDistribution = [
  { origin: "VNEXPRESS", count: 2746, round: "R1" },
  { origin: "WIKI", count: 2601, round: "R1" },
  { origin: "WIKI", count: 2150, round: "R2" },
  { origin: "VNEXPRESS", count: 1155, round: "R2" },
  { origin: "BÁO PHÁP LUẬT", count: 630, round: "R2" },
  { origin: "BÁO CHÍNH PHỦ", count: 614, round: "R2" },
  { origin: "BÁO NHÂN DÂN", count: 566, round: "R2" },
  { origin: "THANHNIEN.VN", count: 457, round: "R2" },
  { origin: "BÁO LAO ĐỘNG", count: 389, round: "R2" },
  { origin: "WIKI", count: 5222, round: "R3" },
  { origin: "VNEXPRESS", count: 2122, round: "R3" },
  { origin: "BÁO LAO ĐỘNG", count: 1095, round: "R3" },
  { origin: "BÁO NHÂN DÂN", count: 522, round: "R3" },
  { origin: "BÁO CHÍNH PHỦ", count: 500, round: "R3" },
  { origin: "BÁO PHÁP LUẬT", count: 493, round: "R3" }
];

export const splitDistribution = [
  { split: "dev", nei: 642, refuted: 377, supported: 201, round: "R1" },
  { split: "test", nei: 674, refuted: 354, supported: 193, round: "R1" },
  { split: "train", nei: 548, refuted: 1004, supported: 1354, round: "R1" },
  { split: "dev", nei: 630, refuted: 473, supported: 384, round: "R2" },
  { split: "test", nei: 645, refuted: 473, supported: 370, round: "R2" },
  { split: "train", nei: 822, refuted: 1052, supported: 1112, round: "R2" },
  { split: "dev", nei: 527, refuted: 576, supported: 712, round: "R3" },
  { split: "test", nei: 535, refuted: 569, supported: 712, round: "R3" },
  { split: "train", nei: 2367, refuted: 2058, supported: 1898, round: "R3" }
];

export const jaccardSimilarity = [
  { round: "R1", avgJaccard: 0.1621, minJaccard: 0.0094, maxJaccard: 0.5714 },
  { round: "R2", avgJaccard: 0.1587, minJaccard: 0, maxJaccard: 0.587 },
  { round: "R3", avgJaccard: 0.1245, minJaccard: 0, maxJaccard: 0.5449 }
];

// Dataset comparison data from comparison_report.md
export const datasetComparison = [
  {
    name: "ViAdverNLI (R1-R3)",
    description: "benchmark NLI adversarial",
    samples: "~21.3k cặp",
    dataType: "premise/hypothesis",
    labels: "3 nhãn NLI",
    textLength: "premise ~24 từ, hyp ~12-15 từ", 
    method: "human+model loop",
    accuracy: "~58% (SOTA)",
    highlight: "Adversarial 3 rounds",
    color: "bg-red-50 border-red-200 text-red-800"
  },
  {
    name: "ViNLI", 
    description: "NLI corpus đầu tiên",
    samples: ">30k cặp",
    dataType: "premise/hypothesis",
    labels: "3 nhãn NLI",
    textLength: "premise ~24.5 từ, hyp ~18.1 từ",
    method: "manual 5 annotator",
    accuracy: "~79% (SOTA)",
    highlight: "Baseline NLI",
    color: "bg-blue-50 border-blue-200 text-blue-800"
  },
  {
    name: "ViWikiFC",
    description: "Wikipedia-based fact-checking", 
    samples: ">20k cặp",
    dataType: "claim + evidence",
    labels: "3 nhãn FEVER",
    textLength: "claim ~15-20 từ, evidence ~20-40 từ",
    method: "manual FEVER style",
    accuracy: "~79% (SOTA)",
    highlight: "Wikipedia source",
    color: "bg-green-50 border-green-200 text-green-800"
  },
  {
    name: "ViFactCheck",
    description: "news fact-check benchmark",
    samples: "7,232 cặp", 
    dataType: "claim + evidence",
    labels: "3 nhãn",
    textLength: "claim ~12-15 từ, evidence ~30-50 từ",
    method: "manual expert",
    accuracy: "~62% (SOTA)",
    highlight: "News articles",
    color: "bg-yellow-50 border-yellow-200 text-yellow-800"
  },
  {
    name: "ISE-DSC01",
    description: "competition dataset",
    samples: "~49.7k cặp",
    dataType: "claim + context", 
    labels: "3 nhãn",
    textLength: "claim ~10-20 từ, context ~50-100 từ",
    method: "auto+manual",
    accuracy: "~84% (SOTA)",
    highlight: "Largest dataset",
    color: "bg-purple-50 border-purple-200 text-purple-800"
  }
];

export const viadvernliHighlights = [
  {
    title: "Độ khó cao",
    description: "Mô hình SOTA chỉ đạt ~58% accuracy, thấp hơn đáng kể so với các dataset khác (~79–84%)",
    icon: "⚡",
    impact: "Thử thách mô hình mạnh nhất"
  },
  {
    title: "Quy trình adversarial 3 vòng", 
    description: "Duy nhất sử dụng human-and-model-in-the-loop để thu thập mẫu gây bẫy cho mô hình",
    icon: "🔄",
    impact: "Phương pháp độc đáo"
  },
  {
    title: "Đa dạng ngôn ngữ",
    description: "Tỷ lệ trùng từ thấp, nhiều cách diễn đạt khác biệt, bao gồm ẩn dụ, thay đổi chi tiết nhỏ", 
    icon: "🌐",
    impact: "Linguistic diversity cao"
  },
  {
    title: "Giá trị huấn luyện",
    description: "Khi huấn luyện trên ViAdverNLI, mô hình cải thiện hiệu quả tổng quát trên các dataset NLI khác",
    icon: "📈", 
    impact: "Cross-dataset improvement"
  },
  {
    title: "Bổ sung khoảng trống",
    description: "Cung cấp benchmark NLI adversarial cho tiếng Việt, mở hướng nghiên cứu robust NLI và fact-checking",
    icon: "🎯",
    impact: "Research gap filling"
  }
]; 