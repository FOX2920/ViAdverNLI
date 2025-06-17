# Tổng hợp Hyperparameters và Cấu hình huấn luyện các mô hình

## 1. PLM Fine-tune (mBERT, phoBERT, XLM-R trên Kaggle - P100)

**Môi trường**: Kaggle Notebook sử dụng GPU Tesla P100 (16GB VRAM)

| Hyperparameter          | Value                     |
| ----------------------- | ------------------------- |
| Epochs                  | 20                        |
| Batch size              | 8                         |
| Gradient accumulation   | 2                         |
| Learning rate           | 5e-5                      |
| Weight decay            | 1e-5                      |
| Max sequence length     | 256                       |
| Mixed precision (AMP)   | True                      |
| Optimizer               | AdamW                     |
| Scheduler               | StepLR(step=5, gamma=0.1) |
| Early stopping patience | 3                         |
| Max gradient norm       | 1.0                       |
| Device                  | Tesla P100                |

### Mô hình cụ thể:

- **mBERT**: "bert-base-multilingual-cased"
- **phoBERT**: "vinai/phobert-large"
- **XLM-R**: "xlm-roberta-large"

---

## 2. LLM Fine-tune (GPT-4o và Gemini 2.0 Flash)

**Môi trường**:

- GPT-4o: Fine-tune qua OpenAI Dashboard
- Gemini 2.0 Flash: Fine-tune trên Vertex AI (Google Cloud Platform)

| Hyperparameter           | Value                           |
| ------------------------ | ------------------------------- |
| Epochs                   | 3                               |
| Batch size               | 5 (R1, R2), 12 (R3)             |
| Learning rate multiplier | 2                               |
| Seed                     | 42                              |
| Max sequence length      | ~1024 (tự động xử lý)           |
| Optimizer/Scheduler      | Hệ thống backend tự động tối ưu |
| Mixed precision          | Có (ẩn sau API)                 |
| Device                   | A100 / TPU (backend hệ thống)   |

---

## 3. LLM Fine-tune (Gemma3 ,Qwen3, DEEPSEEK R1 trên H100 SXM5)

**Môi trường**: Dedicated server với 1× NVIDIA H100 SXM5, 16 CPU, 192GB RAM

| Hyperparameter        | Value               |
| --------------------- | ------------------- |
| Epochs                | 3                   |
| Batch size            | 5 (R1, R2), 12 (R3) |
| Learning rate         | 1e-5                |
| Gradient accumulation | 4                   |
| Sequence length       | 2048                |
| Checkpoint steps      | 1000                |
| Mixed precision       | Có                  |
| Optimizer             | AdamW (mặc định)    |
| Device                | H100 SXM5           |

---

## 4. So sánh tổng quát theo mô hình và môi trường

| Nhóm mô hình          | Ưu điểm chính                            | Nhược điểm / Giới hạn              |
| --------------------- | ---------------------------------------- | ---------------------------------- |
| PLM (P100 - Kaggle)   | Dễ triển khai, chi phí thấp              | Giới hạn bộ nhớ, sequence ngắn     |
| LLM (Prompt - OLlama) | Triển khai nhanh, không cần huấn luyện   | Hiệu suất giảm ở R3, không ổn định |
| GPT-4o / Gemini Flash | Backend tối ưu, hiệu suất cao            | Không tùy chỉnh chi tiết được      |
| Gemma3 / Qwen3 (H100) | Toàn quyền kiểm soát, mạnh với long text | Tốn tài nguyên, cần GPU mạnh       |

---

## 5. Hiệu suất mô hình (Weighted F1 đầy đủ)

### Fine-tuned PLMs (SBERT + BM25 Retrieval)

| Model                | Method    | Retrieval    | R1    | R2    | R3    |
| -------------------- | --------- | ------------ | ----- | ----- | ----- |
| **mBERT**            | Fine-tune | top1         | 27.73 | 50.86 | 62.42 |
|                      |           | top2         | 24.94 | 12.95 | 63.53 |
|                      |           | top3         | 39.48 | 32.47 | 60.18 |
|                      |           | top4         | 25.72 | 45.35 | 61.90 |
|                      |           | full_context | 37.05 | 16.83 | 61.46 |
| **pho_BERT**         | Fine-tune | top1         | 40.57 | 43.96 | 53.45 |
|                      |           | top2         | 29.77 | 42.53 | 65.20 |
|                      |           | top3         | 41.92 | 44.74 | 61.85 |
|                      |           | top4         | 44.41 | 47.54 | 54.34 |
|                      |           | full_context | 43.10 | 26.03 | 64.48 |
| **XLM-R**            | Fine-tune | top1         | 29.93 | 47.36 | 64.62 |
|                      |           | top2         | 47.37 | 54.55 | 55.99 |
|                      |           | top3         | 47.22 | 50.79 | 65.18 |
|                      |           | top4         | 30.72 | 48.26 | 66.89 |
|                      |           | full_context | 33.41 | 11.70 | 64.02 |
| **GPT-4o**           | Fine-tune | full_context | 50.70 | 57.95 | 58.15 |
| **gemini 2.0 flash** | Fine-tune | full_context | 47.08 | 52.93 | 56.72 |
| **gemma3**           | Fine-tune | full_context | 41.82 | 50.75 | 53.94 |
| **qwen3**            | Fine-tune | full_context | 37.98 | 47.93 | 51.44 |
| **deepseek-r1**      | Fine-tune | full_context | 42.67 | 50.31 | 55.72 |

### Prompted LLMs

| Model (LLM)        | Method | Model Type | R1    | R2    | R3    |
| ------------------ | ------ | ---------- | ----- | ----- | ----- |
| qwen3:14b          | Prompt | Open       | 45.51 | 46.72 | 32.37 |
| deepseek-r1:32b    | Prompt | Open       | 30.50 | 39.44 | 35.70 |
| magistral          | Prompt | Open       | 37.91 | 45.74 | 40.16 |
| cogito:14b         | Prompt | Open       | 40.41 | 46.25 | 29.93 |
| gemma3             | Prompt | Open       | 38.83 | 45.04 | 43.34 |
| phi4-reasoning:14b | Prompt | Open       | 41.74 | 47.65 | 34.68 |
| gemma_3n_e4b_it    | Prompt | Open       | 38.73 | 45.08 | 42.88 |
| o4_mini            | Prompt | Closed     | 45.10 | 46.77 | 30.86 |
| gemini 2.5 flash   | Prompt | Closed     | 44.69 | 43.94 | 31.90 |

---

## 6. Tổng kết

- Các mô hình PLM phù hợp với khởi đầu hoặc tài nguyên hạn chế.
- GPT-4o/Gemini là lựa chọn tốt cho kết quả nhanh và chính xác, tuy nhiên ít tùy chỉnh.
- Gemma3 và Qwen3 là lựa chọn tối ưu nếu có GPU mạnh, cần fine-tune sâu và xử lý văn bản dài.

---

**Ghi chú**:

- Các batch size 5/12 áp dụng linh hoạt theo từng vòng huấn luyện (R1, R2, R3).
- Các cấu hình đều được tối ưu hóa cho task fact-checking tiếng Việt trên các tập ViNLI, ViWikiFC, ViFactCheck, ISE-DSC01 và ViAdverNLI.
