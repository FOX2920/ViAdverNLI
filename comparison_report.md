# So sánh các bộ dữ liệu Fact-checking và Suy luận ngôn ngữ tự nhiên tiếng Việt

## 1. Bảng so sánh chi tiết

| **Tiêu chí** | **ViAdverNLI (R1–R3)**<br>– benchmark NLI adversarial<br>– ~10k cặp<br>– premise/hypothesis<br>– 3 nhãn NLI<br>– premise ~24 từ, hyp ~12–15 từ<br>– human+model loop | **ViNLI**<br>– NLI corpus đầu tiên<br>– >30k cặp<br>– premise/hypothesis<br>– 3 nhãn NLI<br>– premise ~24.5 từ, hyp ~18.1 từ<br>– manual 5 annotator | **ViWikiFC**<br>– Wikipedia-based fact-checking<br>– >20k cặp<br>– claim + evidence<br>– 3 nhãn FEVER<br>– claim ~15–20 từ, evidence ~20–40 từ<br>– manual FEVER style | **ViFactCheck**<br>– news fact-check benchmark<br>– 7,232 cặp<br>– claim + evidence<br>– 3 nhãn<br>– claim ~12–15 từ, evidence ~30–50 từ<br>– manual expert | **ISE-DSC01**<br>– competition dataset<br>– ~49.7k cặp<br>– claim + context<br>– 3 nhãn<br>– claim ~10–20 từ, context ~50–100 từ<br>– auto+manual |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |

## 2. Nhận xét nổi bật về ViAdverNLI

- **Độ khó cao**: Mô hình SOTA chỉ đạt ~48% accuracy, thấp hơn đáng kể so với các dataset khác (~79–90%).
- **Quy trình adversarial 3 vòng**: Duy nhất sử dụng human-and-model-in-the-loop để thu thập mẫu gây bẫy cho mô hình.
- **Đa dạng ngôn ngữ**: Tỷ lệ trùng từ thấp, nhiều cách diễn đạt khác biệt, bao gồm ẩn dụ, thay đổi chi tiết nhỏ.
- **Giá trị huấn luyện**: Khi huấn luyện trên ViAdverNLI, mô hình cải thiện hiệu quả tổng quát trên các dataset NLI khác.
- **Bổ sung khoảng trống**: Cung cấp benchmark NLI adversarial cho tiếng Việt, mở hướng nghiên cứu robust NLI và fact-checking.
