# Phân tích bộ dữ liệu ViAdverNLI

## 1. Thống kê chung theo vòng
| Round   |   Num Samples |   Avg Claim Len |   Min Claim Len |   Max Claim Len |   Avg Context Len |   Min Context Len |   Max Context Len |   Vocab Size |
|:--------|--------------:|----------------:|----------------:|----------------:|------------------:|------------------:|------------------:|-------------:|
| R1      |          5347 |           44.02 |               8 |             126 |            271.46 |                33 |              1935 |        21022 |
| R2      |          5961 |           51.5  |              12 |             179 |            249.19 |                50 |              1422 |        21054 |
| R3      |          9954 |           44.86 |              10 |             198 |            283.68 |                62 |              1783 |        25697 |

## 2. Phân bố nguồn gốc dữ liệu mỗi vòng
| Origin        |   Count | Round   |
|:--------------|--------:|:--------|
| VNEXPRESS     |    2746 | R1      |
| WIKI          |    2601 | R1      |
| WIKI          |    2150 | R2      |
| VNEXPRESS     |    1155 | R2      |
| BÁO PHÁP LUẬT |     630 | R2      |
| BÁO CHÍNH PHỦ |     614 | R2      |
| BÁO NHÂN DÂN  |     566 | R2      |
| THANHNIEN.VN  |     457 | R2      |
| BÁO LAO ĐỘNG  |     389 | R2      |
| WIKI          |    5222 | R3      |
| VNEXPRESS     |    2122 | R3      |
| BÁO LAO ĐỘNG  |    1095 | R3      |
| BÁO NHÂN DÂN  |     522 | R3      |
| BÁO CHÍNH PHỦ |     500 | R3      |
| BÁO PHÁP LUẬT |     493 | R3      |

## 3. Cân bằng nhãn theo split (train/dev/test)
| Split   |   Count NEI |   Count REFUTED |   Count SUPPORTED |   % SUPPORTED |   % REFUTED |   % NEI | Round   |
|:--------|------------:|----------------:|------------------:|--------------:|------------:|--------:|:--------|
| dev     |         642 |             377 |               201 |         16.48 |       30.9  |   52.62 | R1      |
| test    |         674 |             354 |               193 |         15.81 |       28.99 |   55.2  | R1      |
| train   |         548 |            1004 |              1354 |         46.59 |       34.55 |   18.86 | R1      |
| dev     |         630 |             473 |               384 |         25.82 |       31.81 |   42.37 | R2      |
| test    |         645 |             473 |               370 |         24.87 |       31.79 |   43.35 | R2      |
| train   |         822 |            1052 |              1112 |         37.24 |       35.23 |   27.53 | R2      |
| dev     |         527 |             576 |               712 |         39.23 |       31.74 |   29.04 | R3      |
| test    |         535 |             569 |               712 |         39.21 |       31.33 |   29.46 | R3      |
| train   |        2367 |            2058 |              1898 |         30.02 |       32.55 |   37.43 | R3      |

## 4. Jaccard Similarity per Round
| Round   |   Avg Jaccard |   Min Jaccard |   Max Jaccard |
|:--------|--------------:|--------------:|--------------:|
| R1      |        0.1561 |        0.0094 |        0.5714 |
| R2      |        0.1543 |        0      |        0.587  |
| R3      |        0.1268 |        0      |        0.5449 |

## 5. SBERT Cosine Similarity
Do môi trường chưa cài `sentence-transformers`, vui lòng chạy đoạn code sau trên máy cục bộ:

```python
from sentence_transformers import SentenceTransformer
import numpy as np
import pandas as pd

model = SentenceTransformer('all-mpnet-base-v2')
for round_name, path in {'R1': '/mnt/data/R_1.csv', 'R2': '/mnt/data/R_2.csv', 'R3': '/mnt/data/R_3.csv'}.items():
    df = pd.read_csv(path)
    emb_claim = model.encode(df['claim'].tolist(), show_progress_bar=True)
    emb_context = model.encode(df['context'].tolist(), show_progress_bar=True)
    norms_c = np.linalg.norm(emb_claim, axis=1)
    norms_t = np.linalg.norm(emb_context, axis=1)
    cosines = (emb_claim * emb_context).sum(axis=1) / (norms_c * norms_t)
    print(f"R3 SBERT Cosine: avg", cosines.mean(), 
          "min", cosines.min(), "max", cosines.max())
```
