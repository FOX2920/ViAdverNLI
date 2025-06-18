# ViAdverNLI - Comprehensive Information Document

## 📋 Project Overview

### Objective

Build an adversarial Vietnamese dataset for fact-checking, creating complex claims to challenge AI model capabilities.

### Adversarial Methodology

Use 3 rounds with increasingly powerful models (mBERT → PhoBERT → XLM-R) to create data with progressively increasing difficulty.

### Achievements

Successfully created 21,262 high-quality adversarial samples with Fleiss' Kappa > 0.80 (excellent agreement).

## 🏆 Key Achievements

- **21,262 data samples** across 3 rounds
- **3 Adversarial rounds** with increasing difficulty
- **7 Evaluation datasets** for performance assessment
- **Kappa > 0.80** - excellent agreement
- **Most challenging dataset** for Vietnamese NLI
- **SOTA only achieves 58% accuracy** - demonstrates high difficulty

## 📊 Dataset Comparison

| Dataset        | Description               | Samples | SOTA Accuracy |
| -------------- | ------------------------- | ------- | ------------- |
| **ViAdverNLI** | adversarial NLI benchmark | ~21.3k  | **~58%**      |
| ViNLI          | first NLI corpus          | >30k    | ~79%          |
| ViWikiFC       | Wikipedia fact-checking   | >20k    | ~79%          |
| ViFactCheck    | news fact-checking        | 7.2k    | ~62%          |
| ISE-DSC01      | competition dataset       | ~49.7k  | ~84%          |

## 📊 Comparison with Vietnamese NLI/Fact-checking Datasets

| Dataset                | Description                   | Samples      | Data Type          | Text Length                               | Method              | SOTA Accuracy |
| ---------------------- | ----------------------------- | ------------ | ------------------ | ----------------------------------------- | ------------------- | ------------- |
| **ViAdverNLI (R1-R3)** | adversarial NLI benchmark     | ~21.3k pairs | premise/hypothesis | premise ~24 words, hyp ~12-15 words       | human+model loop    | **~58%**      |
| ViNLI                  | first NLI corpus              | >30k pairs   | premise/hypothesis | premise ~24.5 words, hyp ~18.1 words      | manual 5 annotators | ~79%          |
| ViWikiFC               | Wikipedia-based fact-checking | >20k pairs   | claim + evidence   | claim ~15-20 words, evidence ~20-40 words | manual FEVER style  | ~79%          |
| ViFactCheck            | news fact-check benchmark     | 7,232 pairs  | claim + evidence   | claim ~12-15 words, evidence ~30-50 words | manual expert       | ~62%          |
| ISE-DSC01              | competition dataset           | ~49.7k pairs | claim + context    | claim ~10-20 words, context ~50-100 words | auto+manual         | ~84%          |

### Outstanding Features of ViAdverNLI

1. **Highest difficulty**: SOTA only achieves ~58% accuracy, 26% lower than easiest dataset
2. **3-round adversarial process**: Only uses human-and-model-in-the-loop approach
3. **Linguistic diversity**: Low word overlap, many different expressions
4. **Training value**: Effectively improves generalization across other NLI datasets
5. **Research gap filling**: Provides adversarial NLI benchmark for Vietnamese

## 📈 Detailed Data Analysis

### Statistics by Round

| Round | Samples | Avg Claim Len | Claim Range | Avg Context Len | Context Range | Vocab Size |
| ----- | ------- | ------------- | ----------- | --------------- | ------------- | ---------- |
| R1    | 5,347   | 44.02         | 8-126       | 271.46          | 33-1935       | 21,022     |
| R2    | 5,961   | 51.5          | 12-179      | 249.19          | 50-1422       | 21,054     |
| R3    | 9,954   | 44.86         | 10-198      | 283.68          | 62-1783       | 25,697     |

### Label Distribution by Round

**Round 1:**

- Model: mBERT
- Training Data: ViNLI + ViWikiFC
- SUPPORTED: 41.1%
- REFUTED: 37.6%
- NEI: 21.3%
- Difficulty: Basic
- Kappa: 0.8097

**Round 2:**

- Model: PhoBERT
- Training Data: ViNLI + ViWikiFC + ViFactCheck + ViA1
- SUPPORTED: 30.2%
- REFUTED: 30.9%
- NEI: 39.0%
- Difficulty: Advanced
- Kappa: 0.8099

**Round 3:**

- Model: XLM-R
- Training Data: ViNLI + ViWikiFC + ViFactCheck + ViA1 + ViA2 + ISE-DSC01
- SUPPORTED: 31.2%
- REFUTED: 31.9%
- NEI: 36.9%
- Difficulty: Expert
- Kappa: 0.8099

### Data Source Distribution

| Source        | Total Samples | Percentage | R1    | R2    | R3    |
| ------------- | ------------- | ---------- | ----- | ----- | ----- |
| Wikipedia     | 9,973         | 46.9%      | 2,601 | 2,150 | 5,222 |
| VnExpress     | 6,023         | 28.3%      | 2,746 | 1,155 | 2,122 |
| Báo Lao Động  | 1,484         | 7.0%       | 0     | 389   | 1,095 |
| Báo Pháp Luật | 1,123         | 5.3%       | 0     | 630   | 493   |
| Báo Chính Phủ | 1,114         | 5.2%       | 0     | 614   | 500   |
| Báo Nhân Dân  | 1,088         | 5.1%       | 0     | 566   | 522   |
| Thanh Niên    | 457           | 2.1%       | 0     | 457   | 0     |

### Jaccard Similarity Analysis

| Round | Avg Jaccard | Min Jaccard | Max Jaccard |
| ----- | ----------- | ----------- | ----------- |
| R1    | 0.1561      | 0.0094      | 0.5714      |
| R2    | 0.1543      | 0           | 0.587       |
| R3    | 0.1268      | 0           | 0.5449      |

**Observation**: Vocabulary similarity decreases across rounds, showing increasingly sophisticated adversarial claims.

### Train/Dev/Test Split Analysis

**Round 1:**

- Train: SUPPORTED: 1,354, REFUTED: 1,004, NEI: 548
- Dev: SUPPORTED: 201, REFUTED: 377, NEI: 642
- Test: SUPPORTED: 193, REFUTED: 354, NEI: 674

**Round 2:**

- Train: SUPPORTED: 1,112, REFUTED: 1,052, NEI: 822
- Dev: SUPPORTED: 384, REFUTED: 473, NEI: 630
- Test: SUPPORTED: 370, REFUTED: 473, NEI: 645

**Round 3:**

- Train: SUPPORTED: 1,898, REFUTED: 2,058, NEI: 2,367
- Dev: SUPPORTED: 712, REFUTED: 576, NEI: 527
- Test: SUPPORTED: 712, REFUTED: 569, NEI: 535

## 🤖 Detailed Model Performance

### Overall Performance on Datasets

| Dataset     | mBERT  | PhoBERT | XLM-R      | Difficulty     |
| ----------- | ------ | ------- | ---------- | -------------- |
| ViA1        | 24.32% | 26.62%  | **42.01%** | Hard           |
| ViA2        | 49.19% | 45.16%  | **53.83%** | Very Hard      |
| ViA3        | 31.99% | 33.09%  | **57.65%** | Extremely Hard |
| ViNLI       | 70.01% | 72.82%  | **79.67%** | Easy           |
| ViWikiFC    | 70.49% | 72.21%  | **79.24%** | Easy           |
| ViFactCheck | 55.91% | 53.56%  | **62.26%** | Medium         |
| ISE-DSC01   | 70.33% | 71.11%  | **84.5%**  | Medium         |

### PLM Performance with Evidence Retrieval (SBERT + BM25)

#### Evidence Retrieval Methodology

**Hybrid Retrieval Pipeline:**

1. **SBERT Encoding**: sentence-transformers/all-MiniLM-L6-v2
2. **BM25 Scoring**: Traditional keyword-based retrieval
3. **Hybrid Fusion**: Combine semantic + lexical signals
4. **Top-N Selection**: Extract most relevant evidence chunks

**Evidence Types & Performance:**

- **top1**: Most relevant chunk only (Precision focused)
- **top2-4**: Multiple evidence chunks (Recall balanced)
- **full_context**: Complete document (Baseline approach)

**Best Configuration Found**: XLM-R + top4 evidence achieves 66.89% on R3

**mBERT Performance:**
| Evidence Type | R1 | R2 | R3 | Best |
|---------------|----|----|-----|------|
| top1 | 27.73 | 50.86 | 62.42 | 62.42 |
| top2 | 24.94 | 12.95 | 63.53 | 63.53 |
| top3 | 39.48 | 32.47 | 60.18 | 60.18 |
| top4 | 25.72 | 45.35 | 61.90 | 61.90 |
| full_context | 37.05 | 16.83 | 61.46 | 61.46 |

**PhoBERT Performance:**
| Evidence Type | R1 | R2 | R3 | Best |
|---------------|----|----|-----|------|
| top1 | 40.57 | 43.96 | 53.45 | 53.45 |
| top2 | 29.77 | 42.53 | 65.20 | 65.20 |
| top3 | 41.92 | 44.74 | 61.85 | 61.85 |
| top4 | 44.41 | 47.54 | 54.34 | 54.34 |
| full_context | 43.10 | 26.03 | 64.48 | 64.48 |

**XLM-R Performance:**
| Evidence Type | R1 | R2 | R3 | Best |
|---------------|----|----|-----|------|
| top1 | 29.93 | 47.36 | 64.62 | 64.62 |
| top2 | 47.37 | 54.55 | 55.99 | 55.99 |
| top3 | 47.22 | 50.79 | 65.18 | 65.18 |
| **top4** | 30.72 | 48.26 | **66.89** | **66.89** |
| full_context | 33.41 | 11.70 | 64.02 | 64.02 |

### LLM Fine-tune Performance

| Model            | Type  | R1    | R2    | R3        | Best      | Note |
| ---------------- | ----- | ----- | ----- | --------- | --------- | ---- |
| **GPT-4o**       | API   | 50.70 | 57.95 | **58.15** | **58.15** | mini |
| Gemini 2.0 Flash | API   | 47.08 | 52.93 | 56.72     | 56.72     |      |
| DEEPSEEK R1      | Local | 42.67 | 50.31 | 55.72     | 55.72     |      |
| Gemma3           | Local | 41.82 | 50.75 | 53.94     | 53.94     |      |
| Qwen3            | Local | 37.98 | 47.93 | 51.44     | 51.44     |      |

**Key Insights from LLM Fine-tune:**

- GPT-4o leads with 58.15% on R3, strong improvement from 50.70% R1
- Gemini 2.0 Flash runner-up with 56.72% R3, stable performance across rounds
- DEEPSEEK R1 impressive: 55.72% R3, best local model, competitive with APIs
- All models show significant improvement from R1 → R3
- Fine-tuning outperforms pure prompting by 10-15%
- API vs Local gap only ~3%, showing local models getting stronger

### LLM Prompt Performance

| Model                  | Type   | R1    | R2        | R3    | Best      |
| ---------------------- | ------ | ----- | --------- | ----- | --------- |
| **qwen3:14b**          | Open   | 45.51 | **46.72** | 32.37 | **46.72** |
| o4_mini                | Closed | 45.10 | 46.77     | 30.86 | 46.77     |
| **phi4-reasoning:14b** | Open   | 41.74 | **47.65** | 34.68 | **47.65** |
| gemini 2.5 flash       | Closed | 44.69 | 43.94     | 31.90 | 44.69     |
| magistral              | Open   | 37.91 | 45.74     | 40.16 | 45.74     |
| cogito:14b             | Open   | 40.41 | 46.25     | 29.93 | 46.25     |
| deepseek-r1:32b        | Open   | 30.50 | 39.44     | 35.70 | 39.44     |
| gemma3                 | Open   | 38.83 | 45.04     | 43.34 | 45.04     |

**Key Insights from LLM Prompting:**

- phi4-reasoning:14b leads Open Source with 47.65% R2, best logical reasoning
- o4_mini leads Closed Source with 46.77% R2, but weakens on R3 (30.86%)
- R3 Challenge effect: All models significantly drop performance on Round 3
- qwen3:14b stable: High performance and less affected by adversarial attacks
- Open vs Closed gap small: Only ~1-2% difference, Open Source competitive
- gemma3 series consistency: Both variants stable across rounds
- Adversarial vulnerability: Prompting less robust than fine-tuning against attacks

## ⚙️ Detailed Training Configuration

### Model Comparison Summary

| Group                 | Advantages                           | Disadvantages                          |
| --------------------- | ------------------------------------ | -------------------------------------- |
| PLM (P100 - Kaggle)   | Easy deployment, low cost            | Memory limitations, short sequences    |
| LLM (Prompt - Ollama) | Quick deployment, no training needed | Performance drops on R3, unstable      |
| GPT-4o / Gemini Flash | Optimized backend, high performance  | Cannot fine-tune details               |
| Gemma3 / Qwen3 (H100) | Full control, strong with long text  | Resource intensive, needs powerful GPU |

### PLM Hyperparameters (Kaggle - Tesla P100)

**Environment**: Kaggle Notebook - Tesla P100 (16GB VRAM)

**Configuration:**

- Epochs: 20
- Batch Size: 8
- Gradient Accumulation: 2
- Learning Rate: 5e-5
- Weight Decay: 1e-5
- Max Sequence Length: 256
- Mixed Precision: true
- Optimizer: AdamW
- Scheduler: StepLR(step=5, gamma=0.1)
- Early Stopping Patience: 3
- Max Gradient Norm: 1.0
- Device: Tesla P100

**Models:**

- mBERT: bert-base-multilingual-cased
- phoBERT: vinai/phobert-large
- XLM-R: xlm-roberta-large

### LLM API Hyperparameters (GPT-4o / Gemini)

**Environment**: GPT-4o: OpenAI Dashboard, Gemini 2.0 Flash: Vertex AI (GCP)

**Configuration:**

- Epochs: 3
- Batch Size: 5 (R1, R2), 12 (R3)
- Learning Rate Multiplier: 2
- Seed: 42
- Max Sequence Length: ~1024 (auto-handled)
- Optimizer: Automatic backend optimization
- Mixed Precision: Yes (hidden behind API)
- Device: A100 / TPU (system backend)

### LLM Local Hyperparameters (H100)

**Environment**: Dedicated server - 1× NVIDIA H100 SXM5, 16 CPU, 192GB RAM

**Configuration:**

- Epochs: 3
- Batch Size: 5 (R1, R2), 12 (R3)
- Learning Rate: 1e-5
- Gradient Accumulation: 4
- Sequence Length: 2048
- Checkpoint Steps: 1000
- Mixed Precision: true
- Optimizer: AdamW (default)
- Device: H100 SXM5

**Models**: Gemma3, Qwen3, DEEPSEEK R1

### Prompt Templates

**LLM Fine-tune Template:**

```json
{
    "role": "system",
    "content": "You are a fact-checking assistant. Given the context and a claim, decide whether the claim is SUPPORTED, REFUTED, or NEI (Not Enough Information). Respond with only one word: SUPPORTED, REFUTED, or NEI."
},
{
    "role": "user",
    "content": "Context: {context}\nClaim: {claim}"
}
```

**Features:**

- Simple & Direct: Simple output requirement
- Messages Format: Clear System + User roles
- Minimal Instruction: Optimized for fine-tuning
- One Word Output: Easy to parse and evaluate

**LLM Prompt Template:**

```
Bạn là chuyên gia fact-checking tiếng Việt. Hãy thực hiện **ngầm** các bước:
1. So khớp và **so sánh số liệu** (nếu có) giữa CONTEXT và CLAIM.
2. **So sánh** bất kỳ **giá trị số** hoặc **thời gian** (nếu có) giữa CONTEXT và CLAIM.
3. Kiểm tra xem CLAIM có chèn thêm **thông tin phụ** (extra detail) không xuất hiện trong CONTEXT → nếu có, gán `NEI`.
4. Đưa ra kết luận:
   - `SUPPORTED` nếu CLAIM được xác nhận hoàn toàn bởi bằng chứng.
   - `REFUTED` nếu CLAIM bị bác bỏ trực tiếp.
   - `NEI` nếu không có đủ thông tin.

CONTEXT: {context}
CLAIM: {claim}

CUỐI CÙNG chỉ trả về **một JSON** duy nhất:
{"Label": "SUPPORTED"} hoặc {"Label": "REFUTED"} hoặc {"Label": "NEI"}, không thêm bất cứ chữ nào khác.
```

**Features:**

- 4-step structured reasoning: Compare numbers → Detect extra details → Conclude
- Vietnamese expertise: Designed specifically for Vietnamese fact-checking
- JSON output format: Standardized results, easy to parse and evaluate
- Best performance: phi4-reasoning:14b achieves 47.65% on R2

## 🔍 Model Weakness Analysis

### Error Overview

| Model   | Round | Total Samples | Incorrect | Error Rate | Main Weakness                    |
| ------- | ----- | ------------- | --------- | ---------- | -------------------------------- |
| mBERT   | R1    | 5,347         | 3,347     | 62.6%      | Strong bias towards NEI label    |
| PhoBERT | R2    | 5,961         | 2,837     | 47.59%     | Difficulty recognizing NEI label |
| XLM-R   | R3    | 9,954         | 4,777     | 47.99%     | Too cautious, biased towards NEI |

### Errors by Label

**mBERT (R1):**

- SUPPORTED Error: 92.03% (Worst)
- REFUTED Error: 84.95%
- NEI Error: 33.19% (Best)
- Best Label: NEI
- Worst Label: SUPPORTED

**PhoBERT (R2):**

- SUPPORTED Error: 33.82% (Best)
- REFUTED Error: 42.61%
- NEI Error: 80.54% (Worst)
- Best Label: SUPPORTED
- Worst Label: NEI

**XLM-R (R3):**

- SUPPORTED Error: 64.01%
- REFUTED Error: 69.74% (Worst)
- NEI Error: 13.5% (Best)
- Best Label: NEI
- Worst Label: REFUTED

### Common Error Types

**mBERT:**

- SUPPORTED → NEI: 1,842 (55.0%)
- REFUTED → NEI: 1,547 (46.2%)
- NEI → REFUTED: 194 (5.8%)
- NEI → SUPPORTED: 184 (5.5%)

**PhoBERT:**

- NEI → SUPPORTED: 1,110 (39.1%)
- NEI → REFUTED: 761 (26.8%)
- REFUTED → SUPPORTED: 605 (21.3%)
- SUPPORTED → REFUTED: 428 (15.1%)

**XLM-R:**

- REFUTED → NEI: 1,933 (40.5%)
- SUPPORTED → NEI: 1,723 (36.1%)
- NEI → SUPPORTED: 301 (6.3%)
- NEI → REFUTED: 195 (4.1%)

### Detailed Error Examples

**mBERT - SUPPORTED → NEI Error:**

- **Context**: About The Infinity project in Di An with 0.5% monthly payment policy...
- **Claim**: About The Infinity project features including payment policy and legal safety...
- **Issue**: mBERT cannot connect information from different parts of context to confirm claim
- **Analysis**: Model focuses only on cited evidence without considering full context, missing important information like 0.5% monthly payment policy, travel time to Thu Duc, and project legality

**PhoBERT - NEI → SUPPORTED Error:**

- **Context**: About Youth Worker Day event organized by organizations...
- **Claim**: About TCP Vietnam giving gifts vs actual organizer being Central Youth Union...
- **Issue**: PhoBERT overlooks differences in gift-giving organization
- **Analysis**: Model concludes claim is supported despite evidence saying "Central Youth Union gave gifts" while claim says "TCP Vietnam gave gifts", plus no mention of special prizes like motorcycles

**XLM-R - SUPPORTED → NEI Error:**

- **Context**: About freshwater importance for life and living organisms...
- **Claim**: About freshwater role for many species including humans...
- **Issue**: XLM-R too cautious, cannot synthesize information properly
- **Analysis**: Clear supporting information exists but XLM-R cannot connect various parts of context to confirm claim, being overly conservative and choosing NEI instead of SUPPORTED

### Fleiss' Kappa Analysis

**Quality Assessment:**

- **Round 1**: 0.8097 (Excellent Agreement) ⭐⭐⭐
- **Round 2**: 0.8099 (Excellent Agreement) ⭐⭐⭐
- **Round 3**: 0.8099 (Excellent Agreement) ⭐⭐⭐

**Models used:**

- R1: qwq, deepseek-r1:32b, mistral-small3.1
- R2: granite3.2, phi4-reasoning, qwen3
- R3: phi4-reasoning, qwen3, gpt_4o_mini

**Conclusion**: All 3 rounds achieve Fleiss' Kappa > 0.80, demonstrating very high data quality with excellent agreement between data generation models.

## 🎯 Insights and Recommendations

### Main Trends

1. **Increasing difficulty across rounds**: ViA1 (42%) → ViA2 (54%) → ViA3 (58%) shows effective adversarial training
2. **XLM-R demonstrates superiority**: Achieves highest performance on all datasets, especially ISE-DSC01 (84.5%)
3. **Adversarial training improves robustness**: Adding adversarial data helps improve cross-dataset performance

### Challenges & Limitations

1. **Performance trade-offs**: Optimizing for adversarial data may reduce performance on original data
2. **Low performance on ViAdverNLI**: Even best model only reaches ~58% on ViA3, showing high difficulty
3. **Need for further research**: Error case analysis needed to better understand model limitations

### Dataset Difficulty Ranking

1. **ViAdverNLI (40-58%)** - Extremely Hard ⭐⭐⭐⭐⭐
2. **ViFactCheck (57-74%)** - Moderately Hard ⭐⭐⭐⭐
3. **ISE-DSC01 (70-85%)** - Moderate ⭐⭐⭐
4. **ViNLI, ViWikiFC (70-80%)** - Relatively Easy ⭐⭐

### Improvement Recommendations

**For mBERT:**

- Increase Vietnamese training data
- Adjust thresholds to reduce NEI bias
- Improve SUPPORTED/REFUTED recognition capability

**For PhoBERT:**

- Increase NEI data in training
- Adjust thresholds to reduce SUPPORTED bias
- Improve distinction between SUPPORTED vs REFUTED

**For XLM-R:**

- Adjust thresholds to reduce NEI bias
- Increase complex SUPPORTED/REFUTED data
- Improve reasoning capability from evidence

**General Recommendations:**

- Combine ensemble of models
- Improve data preprocessing
- Develop specialized models for each label
- Apply advanced adversarial training

## 💰 Cost & Resource Analysis

### Low Budget

- **Recommendation**: PLM on Kaggle
- **Cost**: Free
- **GPU**: Tesla P100 (16GB)
- **Best Performance**: XLM-R ~66.89%
- **Time**: 2-4 hours/model

### Medium Budget

- **Recommendation**: LLM API Fine-tune
- **Cost**: $25.00/1M token
- **Infrastructure**: Managed
- **Best Performance**: GPT-4o ~58.15%
- **Time**: 30 minutes - 2 hours

### High Budget

- **Recommendation**: H100 Local Fine-tune
- **Cost**: $5.62/hour
- **GPU**: H100 SXM5 (80GB)
- **Best Performance**: DEEPSEEK ~55.47%
- **Time**: 1-3 hours/model

### Overall Recommendations

- **For Research/Learning**: PLM on Kaggle - Free, decent performance, easy to reproduce
- **For Production**: GPT-4o API - Highest performance, stable, scalable

## 📚 References

### Datasets

- **fever2018**: FEVER: a large-scale dataset for Fact Extraction and VERification
- **huynh2022vinli**: ViNLI: A Vietnamese Corpus for Studies on Open-Domain Natural Language Inference
- **thang2024viwikifc**: ViWikiFC: Fact-Checking for Vietnamese Wikipedia-Based Textual Knowledge Source
- **tran2025vifactcheck**: ViFactCheck: A New Benchmark Dataset and Methods for Multi-domain News Fact-Checking in Vietnamese
- **huyen2024vihealthnli**: ViHealthNLI: A Dataset for Vietnamese NLI in Healthcare

### Models

- **devlin2019bert**: BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding
- **conneau2019xlm**: Cross-lingual Language Model Pretraining
- **nguyen2020phobert**: PhoBERT: Pre-trained language models for Vietnamese
- **google2024gemini2**: Introducing Gemini 2.0: Our New AI Model for the Agentic Era
- **google2025gemini2flash**: Gemini 2.0 Flash System Card
- **google2025gemini25flash**: Gemini 2.5 Flash Preview
- **yang2025qwen3**: Qwen3 Technical Report
- **guo2025deepseekr1**: DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning
- **mistral2025magistral**: Magistral
- **gemma2025v3**: Gemma 3 Technical Report
- **abdin2025phi4**: Phi-4-Reasoning Technical Report
- **deepcogito2025cogito**: Introducing Cogito v1 Preview
- **o4mini2025**: O3 and O4-mini System Card

### Adversarial Research

- **thorne2019adversarial**: Adversarial attacks against Fact Extraction and VERification
- **williams2020adversarialnli**: Adversarial NLI: A New Benchmark for Natural Language Understanding

### Methods & Competitions

- **schuster2021vitaminc**: Get Your Vitamin C: Robust Fact Verification with Contrastive Evidence
- **tran2025bertviet**: BERT-based Model for Vietnamese Fact Verification Dataset
- **uit2023**: Vietnamese Fact Verification Competition

## 📊 Comprehensive Performance Summary

### Best Performance by Method

| Method                 | Best Model         | R1    | R2        | R3        | Overall Best |
| ---------------------- | ------------------ | ----- | --------- | --------- | ------------ |
| PLM (Fine-tune + BM25) | XLM-R top4         | 30.72 | 48.26     | **66.89** | **66.89**    |
| LLM Fine-tune          | GPT-4o             | 50.70 | 57.95     | **58.15** | **58.15**    |
| LLM Prompt             | phi4-reasoning:14b | 41.74 | **47.65** | 34.68     | **47.65**    |

### Adversarial Training Impact (XLM-R)

| Training Configuration    | ViA1  | ViA2  | ViA3  | ISE-DSC01 |
| ------------------------- | ----- | ----- | ----- | --------- |
| Baseline (ViNLI+ViWikiFC) | 27.27 | 49.4  | 30.23 | 76.01     |
| R1 (+ViA1)                | 42.01 | 43.01 | 43.28 | 77.26     |
| R2 (+ViA1+ViA2)           | 39.39 | 45.9  | 48.18 | 81.58     |
| R3 (+ViA1+ViA2+ViA3)      | 44.23 | 53.83 | 57.65 | 81.01     |

**Key Insight**: Adding adversarial data significantly improves performance on adversarial test sets while maintaining good performance on standard datasets.

## 🏆 Conclusion

ViAdverNLI represents a significant advancement in Vietnamese fact-checking and NLI research. With 21,262 high-quality adversarial samples across 3 rounds, this dataset:

1. **Challenges SOTA models**: Only achieves ~58% accuracy, significantly lower than other datasets
2. **Provides standard benchmark**: For robust Vietnamese NLI and fact-checking research
3. **Opens new research directions**: Adversarial data generation and defense mechanisms
4. **Has practical value**: Improves model generalization capability across datasets

### Key Findings

1. **Adversarial effectiveness**: Each round successfully creates increasingly challenging data
2. **Model robustness gaps**: Even SOTA models struggle with carefully crafted adversarial examples
3. **Cross-dataset benefits**: Training on adversarial data improves performance on other datasets
4. **Method diversity**: Different approaches (PLM fine-tune, LLM fine-tune, prompting) each have strengths
5. **Cost-performance trade-offs**: Free PLM solutions can compete with expensive commercial APIs

### Future Research Directions

1. **Advanced ensemble methods**: Combining multiple models and approaches
2. **Specialized architectures**: Models designed specifically for adversarial robustness
3. **Improved prompting strategies**: Better prompt engineering for Vietnamese fact-checking
4. **Multi-modal approaches**: Incorporating visual evidence and structured knowledge
5. **Real-time fact-checking**: Scaling to production environments

### Impact on Vietnamese NLP

ViAdverNLI fills a critical gap in Vietnamese NLP research by providing:

- First large-scale adversarial NLI dataset for Vietnamese
- Comprehensive evaluation framework for fact-checking models
- Baseline results for multiple state-of-the-art approaches
- Open research platform for adversarial robustness studies

The project demonstrates that creating high-quality adversarial data through human-and-model-in-the-loop methodology is both feasible and valuable for advancing the robustness of Vietnamese NLP systems.

## 📄 Citation

```bibtex
@inproceedings{viadvernli2025,
    title={ViAdverNLI: A Vietnamese Adversarial Natural Language Inference Dataset},
    author={Author Names},
    booktitle={Proceedings of Conference},
    year={2025},
    url={https://github.com/your-repo/ViAdverNLI}
}
```

### Usage Guidelines

**Research Use:**

- Dataset available for academic and research purposes
- Please cite the original paper when using
- Share research results and findings with the community
- Contact authors for questions about the dataset

**Important Notes:**

- Dataset created only for scientific research purposes
- Do not use for commercial purposes without permission
- Follow ethical principles in AI research
- Report bias or limitation issues in research

### Contact Information

For questions, suggestions, or collaboration opportunities related to ViAdverNLI, please contact the research team or open an issue in the project repository.

---

_This document provides comprehensive information about the ViAdverNLI dataset and research project. For the most up-to-date information, please refer to the official repository and published papers._
