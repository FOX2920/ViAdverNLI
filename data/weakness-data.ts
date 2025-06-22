// Weakness data for ViAdverNLI Dashboard

export const weaknessData = [
  {
    model: "mBERT",
    round: "R1",
    totalSamples: 5347,
    incorrectPredictions: 3347,
    errorRate: 62.6,
    mainWeakness: "Thiên vị mạnh về nhãn NEI",
    supportedError: 92.03,
    refutedError: 84.95,
    neiError: 33.19,
    bestLabel: "NEI",
    worstLabel: "SUPPORTED",
  },
  {
    model: "PhoBERT",
    round: "R2",
    totalSamples: 5961,
    incorrectPredictions: 2837,
    errorRate: 47.59,
    mainWeakness: "Khó nhận diện nhãn NEI",
    supportedError: 33.82,
    refutedError: 42.61,
    neiError: 80.54,
    bestLabel: "SUPPORTED",
    worstLabel: "NEI",
  },
  {
    model: "XLM-R",
    round: "R3",
    totalSamples: 9954,
    incorrectPredictions: 4777,
    errorRate: 47.99,
    mainWeakness: "Quá thận trọng, thiên vị NEI",
    supportedError: 64.01,
    refutedError: 69.74,
    neiError: 13.5,
    bestLabel: "NEI",
    worstLabel: "REFUTED",
  },
]

export const errorTypeData = [
  { model: "mBERT", errorType: "SUPPORTED → NEI", count: 1842, percentage: 55.0 },
  { model: "mBERT", errorType: "REFUTED → NEI", count: 1547, percentage: 46.2 },
  { model: "mBERT", errorType: "NEI → REFUTED", count: 194, percentage: 5.8 },
  { model: "mBERT", errorType: "NEI → SUPPORTED", count: 184, percentage: 5.5 },
  { model: "PhoBERT", errorType: "NEI → SUPPORTED", count: 1110, percentage: 39.1 },
  { model: "PhoBERT", errorType: "NEI → REFUTED", count: 761, percentage: 26.8 },
  { model: "PhoBERT", errorType: "REFUTED → SUPPORTED", count: 605, percentage: 21.3 },
  { model: "PhoBERT", errorType: "SUPPORTED → REFUTED", count: 428, percentage: 15.1 },
  { model: "XLM-R", errorType: "REFUTED → NEI", count: 1933, percentage: 40.5 },
  { model: "XLM-R", errorType: "SUPPORTED → NEI", count: 1723, percentage: 36.1 },
  { model: "XLM-R", errorType: "NEI → SUPPORTED", count: 301, percentage: 6.3 },
  { model: "XLM-R", errorType: "NEI → REFUTED", count: 195, percentage: 4.1 },
]

export const errorExamples = {
  mBERT: [
    {
      type: "SUPPORTED → NEI",
      context:
        "Có kế hoạch cưới vào đầu năm sau, anh Minh Trí (31 tuổi, làm việc tại Bình Thạnh) đã đặt cọc căn hộ ở Dĩ An. Anh chọn dự án The Infinity, nằm cạnh Vincom Plaza, cách Thủ Đức khoảng 10-15 phút di chuyển. Với mức thu nhập dao động 35-40 triệu đồng mỗi tháng, anh Trí cho rằng đây là lựa chọn hợp lý khi chủ đầu tư có chính sách hỗ trợ thanh toán giãn tiến độ 0,5% mỗi tháng. Vì mua nhà lần đầu, anh Trí ưu tiên dự án có pháp lý rõ ràng, đủ điều kiện mở bán theo quy định như The Infinity nhằm hạn chế rủi ro chậm bàn giao. Bên cạnh đó, dự án còn nằm trong khu phức hợp Charm City - khu đô thị đã vận hành ổn định tại trung tâm Dĩ An.",
      claim:
        "Anh Minh Trí, người đang có kế hoạch kết hôn và mong muốn sở hữu ngôi nhà đầu tiên trước khi chào đón thành viên mới, đã quyết định lựa chọn The Infinity vì chính sách thanh toán linh hoạt 0,5% mỗi tháng cùng vị trí thuận tiện, nằm trong khu đô thị vận hành ổn định Charm City tại Dĩ An, nơi cách trung tâm Thủ Đức chỉ 15 phút di chuyển, đảm bảo an toàn pháp lý theo quy định.",
      evidence:
        "Bên cạnh đó, dự án còn nằm trong khu phức hợp Charm City - khu đô thị đã vận hành ổn định tại trung tâm Dĩ An.",
      trueLabel: "SUPPORTED",
      predictedLabel: "NEI",
      analysis:
        "mBERT không thể kết nối thông tin từ nhiều phần khác nhau của context để xác nhận claim. Mô hình chỉ tập trung vào evidence được trích dẫn mà không xem xét toàn bộ context, dẫn đến việc bỏ qua các thông tin quan trọng khác như chính sách thanh toán 0,5% mỗi tháng, thời gian di chuyển đến Thủ Đức, và tính pháp lý của dự án.",
    },
    {
      type: "REFUTED → NEI",
      context:
        'Trước 19h: Ăn tối đúng cách, ngủ ngon và kiểm soát cân nặng Ăn tối muộn ảnh hưởng đến việc tiết melatonin, hormone giúp ngủ ngon, từ đó làm giảm chất lượng giấc ngủ. Thiếu ngủ kéo dài có thể liên quan đến nguy cơ tăng cân. Ngoài ra, cơ thể vào ban đêm có xu hướng tích lũy năng lượng thay vì tiêu hao, dẫn đến dư thừa calo nếu ăn tối quá trễ hoặc quá nhiều. Theo bác sĩ Trương, nên ăn tối trước 19h và đảm bảo dạ dày có ít nhất 3 đến 4 tiếng để tiêu hóa trước khi ngủ. Áp dụng nguyên tắc "no 7 phần": 50% rau không tinh bột (bông cải xanh, nấm), 30% protein chất lượng (cá hấp, đậu phụ), 20% tinh bột có chỉ số đường huyết thấp (cơm gạo lứt, khoai lang). Chế biến bằng cách luộc, hấp hoặc làm salad để giảm dầu mỡ. Hạn chế các món chiên xào hoặc nhiều gia vị gây khó tiêu.',
      claim:
        "Theo nghiên cứu của bác sĩ Trương, việc tiêu thụ thực phẩm giàu protein sau 20 giờ sẽ giúp cơ thể tăng cường trao đổi chất, tránh tích tụ mỡ thừa, vì cơ thể vào ban đêm chuyển hóa năng lượng hiệu quả hơn so với ban ngày.",
      evidence:
        "Ngoài ra, cơ thể vào ban đêm có xu hướng tích lũy năng lượng thay vì tiêu hao, dẫn đến dư thừa calo nếu ăn tối quá trễ hoặc quá nhiều.",
      trueLabel: "REFUTED",
      predictedLabel: "NEI",
      analysis:
        "mBERT không nhận ra mâu thuẫn trực tiếp giữa claim và evidence/context. Claim nói rằng 'cơ thể vào ban đêm chuyển hóa năng lượng hiệu quả hơn so với ban ngày' và 'việc tiêu thụ thực phẩm giàu protein sau 20 giờ sẽ giúp cơ thể tăng cường trao đổi chất', trong khi evidence nói rõ 'cơ thể vào ban đêm có xu hướng tích lũy năng lượng thay vì tiêu hao' và context khuyên 'nên ăn tối trước 19h'.",
    },
  ],
  PhoBERT: [
    {
      type: "NEI → SUPPORTED",
      context:
        'Với sự tin tưởng và kỳ vọng vào thành công của một nhiệm kỳ mới, năm nay, T.Ư Hội Liên hiệp thanh niên Việt Nam tiếp tục phối hợp cùng TCP Việt Nam tổ chức chuỗi Ngày hội Thanh niên công nhân năm 2025 với chủ đề Thanh niên công nhân - Lan tỏa năng lượng tích cực. "Chúng tôi mong rằng các ngày hội sôi nổi ý nghĩa như ngày hôm nay sẽ được nhân rộng trong tất cả các cấp bộ Hội trên cả nước để chúng ta có thể thực hiện thật tốt vai trò người bạn đồng hành và tổ chức Hội sẽ thực sự là mái nhà chung của các bạn thanh niên công nhân", anh Lâm nói. Thanh niên công nhân biểu diễn sôi nổi cùng ca sĩ Đông Hùng tại đêm nhạc hội ẢNH: ĐĂNG HẢI Tặng quà thanh niên công nhân Tại đêm nhạc, hàng nghìn thanh niên công nhân được thưởng thức những tiết mục đặc sắc và tham gia giao lưu với các ca sĩ, nghệ sĩ trẻ. Dịp này, T.Ư Hội Liên hiệp thanh niên Việt Nam đã trao tặng 20 phần quà cho thanh niên công nhân có hoàn cảnh khó khăn, mỗi phần quà trị giá 1 triệu đồng.',
      claim:
        "Trong sự kiện 'Lan tỏa năng lượng tích cực' tại Ngày hội Thanh niên công nhân năm 2025, TCP Việt Nam đã trao tặng 1 triệu đồng cho 20 thanh niên có hoàn cảnh khó khăn và một số phần thưởng đặc biệt như xe máy cho các cá nhân xuất sắc.",
      evidence:
        "Dịp này, T.Ư Hội Liên hiệp thanh niên Việt Nam đã trao tặng 20 phần quà cho thanh niên công nhân có hoàn cảnh khó khăn, mỗi phần quà trị giá 1 triệu đồng. Với sự tin tưởng và kỳ vọng vào thành công của một nhiệm kỳ mới, năm nay, T.Ư Hội Liên hiệp thanh niên Việt Nam tiếp tục phối hợp cùng TCP Việt Nam tổ chức chuỗi Ngày hội Thanh niên công nhân năm 2025 với chủ đề Thanh niên công nhân - Lan tỏa năng lượng tích cực. Thanh niên công nhân biểu diễn sôi nổi cùng ca sĩ Đông Hùng tại đêm nhạc hội ẢNH: ĐĂNG HẢI Tặng quà thanh niên công nhân Tại đêm nhạc, hàng nghìn thanh niên công nhân được thưởng thức những tiết mục đặc sắc và tham gia giao lưu với các ca sĩ, nghệ sĩ trẻ.",
      trueLabel: "NEI",
      predictedLabel: "SUPPORTED",
      analysis:
        "PhoBERT sai lầm khi kết luận claim được hỗ trợ bởi evidence, mặc dù evidence không đề cập đến một số thông tin quan trọng trong claim: Evidence nói rằng 'T.Ư Hội Liên hiệp thanh niên Việt Nam đã trao tặng 20 phần quà', trong khi claim nói 'TCP Việt Nam đã trao tặng'. Không có thông tin về 'một số phần thưởng đặc biệt như xe máy cho các cá nhân xuất sắc'.",
    },
    {
      type: "REFUTED → SUPPORTED",
      context:
        "Tỉ lệ chọi vào lớp 10 của 109 trường tại TP.HCM 14/05/2025 13:25 (PLO)- Trong 109 trường, Trường THCS và THPT Trần Đại Nghĩa có tỉ lệ chọi vào lớp 10 cao nhất với 1/2,91. Trưa 14-5, Sở GD&ĐT TP.HCM công bố số lượng nguyện vọng 1 của 109 trường THPT công lập. Học sinh lớp 9 Trường THCS Quang Trung, quận Gò Vấp trong 1 giờ học.",
      claim:
        "Theo công bố của Sở GD&ĐT TP.HCM ngày 14-5, Trường THCS và THPT Trần Đại Nghĩa đạt tỉ lệ chọi vào lớp 10 là 1/3,15, cao nhất trong số 109 trường.",
      evidence:
        "Tỉ lệ chọi vào lớp 10 của 109 trường tại TP.HCM 14/05/2025 13:25 (PLO)- Trong 109 trường, Trường THCS và THPT Trần Đại Nghĩa có tỉ lệ chọi vào lớp 10 cao nhất với 1/2,91.",
      trueLabel: "REFUTED",
      predictedLabel: "SUPPORTED",
      analysis:
        "PhoBERT không nhận ra sự khác biệt quan trọng giữa claim và evidence. Claim nói rằng tỉ lệ chọi là '1/3,15', trong khi evidence nói rõ là '1/2,91'. Mô hình đã bỏ qua sự khác biệt về con số cụ thể này và chỉ tập trung vào phần 'cao nhất trong số 109 trường' mà cả hai đều đề cập.",
    },
  ],
  "XLM-R": [
    {
      type: "SUPPORTED → NEI",
      context:
        'Bài này nói về nước ngọt có trong tự nhiên. Xin xem thêm Nước ngọt (định hướng). Nước ngọt hay nước nhạt là loại nước chứa một lượng tối thiểu các muối hòa tan, đặc biệt là natri chloride (thường có nồng độ các loại muối hay còn gọi là độ mặn trong khoảng 0,01-0,5 ppt hoặc tới 1 ppt), vì thế nó được phân biệt tương đối rõ ràng với nước lợ hay các loại nước mặn và nước muối. (Xem thêm Độ mặn hay độ muối). Tất cả các nguồn nước ngọt có xuất phát điểm là từ các cơn mưa được tạo ra do sự ngưng tụ tối hạn của hơi nước trong không khí, rơi xuống ao, hồ, sông của mặt đất cũng như trong các nguồn nước ngầm hoặc do sự tan chảy của băng hay tuyết (xem thêm Vòng tuần hoàn nước). Sự cung cấp đủ lượng nước ngọt cần thiết để duy trì sự sống là một vấn đề đáng báo động đối với nhiều loài sinh vật, trong đó có con người, đặc biệt là ở các khu vực sa mạc hay các khu vực khô cằn khác. Xem thêm nguồn nước. Thậm chí trên tàu thuyền hay trên các đảo giữa đại dương vẫn có hiện tượng "thiếu nước", điều đó có nghĩa là sự thiếu hụt nước ngọt chứ không phải thiếu nước nói chung do nước biển là nước mặn và không thể sử dụng trực tiếp để uống. Đối với các loài cá và các loài sinh vật khác sinh sống dưới nước thì nồng độ của natri chloride hòa tan trong nước là một yếu tố quan trọng cho sự sống của chúng. Phần lớn các loài không thể sống trong cả nước ngọt lẫn nước mặn, mặc dù có một số loài có thể sống trong cả hai môi trường. Cá nước mặn sinh sống chủ yếu ở các vùng nước mặn có độ chứa muối cao và chúng cố gắng thải các loại muối ra khỏi cơ thể nhiều đến mức có thể đồng thời với việc giữ lại nước. Cá nước ngọt thì làm việc ngược lại: Chúng có quá nhiều nước và có rất ít muối.',
      claim: "Nước ngọt, bao gồm nước từ mưa và băng tan, vẫn là yếu tố sống còn cho nhiều sinh vật, kể cả con người.",
      evidence:
        "Đối với các loài cá và các loài sinh vật khác sinh sống dưới nước thì nồng độ của natri chloride hòa tan trong nước là một yếu tố quan trọng cho sự sống của chúng.",
      trueLabel: "SUPPORTED",
      predictedLabel: "NEI",
      analysis:
        "XLM-R không thể kết nối thông tin từ nhiều phần của context để xác nhận claim. Các thông tin rõ ràng hỗ trợ claim rằng 'nước ngọt là yếu tố sống còn cho nhiều sinh vật, kể cả con người', nhưng XLM-R không thể tổng hợp chúng để đưa ra kết luận chính xác. Mô hình quá thận trọng và chọn nhãn NEI thay vì SUPPORTED.",
    },
    {
      type: "REFUTED → NEI",
      context:
        "Phần lớn các động vật phức tạp hơn sứa và các động vật cnidaria khác được chia thành 2 nhóm, Protostomia và Deuterostomia, và Động vật có dây sống thuộc nhóm Deuterostomia. Có thể Kimberella có tuổi 555 triệu năm là thành viên thuộc nhánh Protostomia. Nếu vậy, các nhánh Protostomia và Deuterostomia phải tách ra vào thời điểm trước Kimberella ít nhất 558 triệu năm, và do đó trước khi bắt đầu kỷ Cambri. Ernietta hóa thạch Ediacara có tuổi 549-543 triệu năm có thể là đại diện của Deuterostomia. Các hóa thạch của một nhóm chính Deuterostomia, Echinodermata (các thành viên hiện đại của nhóm này gồm sao biển, hải sâm huệ biển) thì khá phổ biến vào đầu kỷ Cambri (542 triệu năm). Hóa thạch Rhabdotubus johansoni thuộc Giữa Kỷ Cambri đã được phân tích thuộc nhóm Pterobranch Hemichordata. Các ý kiến khác nhau về liệu hóa thạch Yunnanozoon thuộc hệ động vật Chengjiang có từ Cambri sớm là Hemichordata hay Chordata. Một hóa thạch khác là Haikouella lanceolata cũng từ Chengjiang được phân tích là một loài thuộc ngành Chordata và có thể là Craniata, vì nó thể hiện các dấu hiệu của tim, động mạch, mang sơi, đuôi, dây thần kinh quấn nhau với não ở phần tận cùng phía trước, và mắt—mặc dù nó cũng có xúc tu quanh miệng của nó. Haikouichthys và Myllokunmingia cũng từ Hệ tầng Chengjiang được xem là cá. Pikaia được phát hiện sớm hơn nhiều nhưng từ Đá phiến sét Burgess ở Giữa Kỷ Cambri cũng được xem là động vật có dây sống nguyên thủy. Mặc khác các hóa thạch của động vật có dây sống ban đầu là rất hiếm vì các động vật có dây sống không xương sống không có xương hoặc răng, và chỉ có một loài được thông báo là còn tồn tại trong kỷ Cambri.",
      claim:
        "Theo nghiên cứu mới nhất, hóa thạch Haikouella lanceolata từ thời kỳ Cambri sớm không phải là động vật có dây sống và không sở hữu các đặc điểm của Craniata như tim mạch hay mắt, mà chỉ là một dạng sinh vật đơn giản.",
      evidence:
        "Mặc khác các hóa thạch của động vật có dây sống ban đầu là rất hiếm vì các động vật có dây sống không xương sống không có xương hoặc răng, và chỉ có một loài được thông báo là còn tồn tại trong kỷ Cambri.",
      trueLabel: "REFUTED",
      predictedLabel: "NEI",
      analysis:
        "XLM-R không nhận ra mâu thuẫn trực tiếp giữa claim và context. Claim khẳng định rằng Haikouella lanceolata 'không phải là động vật có dây sống và không sở hữu các đặc điểm của Craniata như tim mạch hay mắt', trong khi context lại nói rõ rằng Haikouella lanceolata 'được phân tích là một loài thuộc ngành Chordata và có thể là Craniata, vì nó thể hiện các dấu hiệu của tim, động mạch, mang sơi, đuôi, dây thần kinh quấn nhau với não ở phần tận cùng phía trước, và mắt'.",
    },
  ],
}

export const fleissKappaData = [
  {
    round: "Round 1",
    kappa: 0.8052,
    agreement: "Đồng thuận xuất sắc ⭐⭐⭐",
    models: "qwq, deepseek-r1:14b, mistral-small3.1"
  },
  {
    round: "Round 2", 
    kappa: 0.8138,
    agreement: "Đồng thuận xuất sắc ⭐⭐⭐",
    models: "cogito:14b, granite3.2:8b-instruct-q8_0, phi4-reasoning, qwen3:14b"
  },
  {
    round: "Round 3",
    kappa: 0.7539,
    agreement: "Đồng thuận tốt ⭐⭐",
    models: "deepseek-r1:32b, phi4-reasoning:plus, qwen3:32b, gemma3n, gpt_4o_mini, grok_3_mini"
  }
] 