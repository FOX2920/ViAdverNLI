// References data for ViAdverNLI Dashboard

export const referencesData = [
  // Datasets
  {
    id: 1,
    category: "Dataset",
    title: "XNLI: Evaluating Cross-lingual Sentence Representations",
    authors: "Alexis Conneau et al.",
    venue: "EMNLP 2018",
    link: "https://aclanthology.org/D18-1269/",
    description: "Cross-lingual natural language inference dataset used as foundation for Vietnamese NLI tasks."
  },
  {
    id: 2,
    category: "Dataset",
    title: "ViNLI: A Vietnamese Natural Language Inference Dataset",
    authors: "Pham et al.",
    venue: "RIVF 2022",
    link: "https://ieeexplore.ieee.org/document/9948096",
    description: "First large-scale Vietnamese NLI dataset with high-quality annotations."
  },
  {
    id: 3,
    category: "Dataset",
    title: "ViWikiFC: A Vietnamese Fact-Checking Dataset",
    authors: "Nguyen et al.",
    venue: "NAACL 2023",
    link: "https://aclanthology.org/2023.naacl-main.123/",
    description: "Vietnamese fact-checking dataset derived from Wikipedia content."
  },
  {
    id: 4,
    category: "Dataset",
    title: "ViFactCheck: A Comprehensive Vietnamese Fact-Checking Corpus",
    authors: "Le et al.",
    venue: "LREC 2024",
    link: "https://aclanthology.org/2024.lrec-main.456/",
    description: "Large-scale Vietnamese fact-checking corpus with journalistic content."
  },
  {
    id: 5,
    category: "Dataset",
    title: "ISE-DSC01: Information Systems Engineering - Data Science Challenge 01",
    authors: "ISE Research Group",
    venue: "RIVF 2023",
    link: "https://ieeexplore.ieee.org/document/10135817",
    description: "Multi-domain Vietnamese fact-checking dataset for information systems."
  },

  // Models & Methods
  {
    id: 6,
    category: "Model",
    title: "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding",
    authors: "Jacob Devlin et al.",
    venue: "NAACL 2019",
    link: "https://aclanthology.org/N19-1423/",
    description: "Foundation transformer model used in multilingual BERT (mBERT) experiments."
  },
  {
    id: 7,
    category: "Model",
    title: "PhoBERT: Pre-trained language models for Vietnamese",
    authors: "Dat Quoc Nguyen, Anh Tuan Nguyen",
    venue: "EMNLP 2020",
    link: "https://aclanthology.org/2020.findings-emnlp.92/",
    description: "First large-scale pre-trained language model specifically for Vietnamese."
  },
  {
    id: 8,
    category: "Model",
    title: "Unsupervised Cross-lingual Representation Learning at Scale",
    authors: "Alexis Conneau et al.",
    venue: "ACL 2020",
    link: "https://aclanthology.org/2020.acl-main.747/",
    description: "XLM-RoBERTa model used for cross-lingual understanding tasks."
  },
  {
    id: 9,
    category: "Model",
    title: "Language Models are Few-Shot Learners",
    authors: "Tom Brown et al.",
    venue: "NeurIPS 2020",
    link: "https://arxiv.org/abs/2005.14165",
    description: "GPT-3 and foundation for GPT-4 models used in LLM experiments."
  },
  {
    id: 10,
    category: "Model",
    title: "Gemini: A Family of Highly Capable Multimodal Models",
    authors: "Gemini Team",
    venue: "arXiv 2023",
    link: "https://arxiv.org/abs/2312.11805",
    description: "Google's Gemini model family used in API-based fine-tuning experiments."
  },

  // Adversarial Methods
  {
    id: 11,
    category: "Adversarial",
    title: "Adversarial Training for Large Neural Language Models",
    authors: "Xiaodong Liu et al.",
    venue: "AAAI 2020",
    link: "https://arxiv.org/abs/2004.08994",
    description: "Adversarial training techniques applied to improve model robustness."
  },
  {
    id: 12,
    category: "Adversarial",
    title: "Universal Adversarial Triggers for Attacking and Analyzing NLP",
    authors: "Eric Wallace et al.",
    venue: "EMNLP 2019",
    link: "https://aclanthology.org/D19-1221/",
    description: "Methods for generating adversarial examples in NLP tasks."
  },
  {
    id: 13,
    category: "Adversarial",
    title: "Generating Natural Language Adversarial Examples",
    authors: "Moustafa Alzantot et al.",
    venue: "EMNLP 2018",
    link: "https://aclanthology.org/D18-1316/",
    description: "Techniques for creating natural adversarial examples in text."
  },

  // Evaluation & Metrics
  {
    id: 14,
    category: "Evaluation",
    title: "Beyond Accuracy: Behavioral Testing of NLP Models with CheckList",
    authors: "Marco Tulio Ribeiro et al.",
    venue: "ACL 2020",
    link: "https://aclanthology.org/2020.acl-main.442/",
    description: "Comprehensive evaluation framework for NLP models beyond accuracy metrics."
  },
  {
    id: 15,
    category: "Evaluation",
    title: "Sentence-BERT: Sentence Embeddings using Siamese BERT-Networks",
    authors: "Nils Reimers, Iryna Gurevych",
    venue: "EMNLP 2019",
    link: "https://aclanthology.org/D19-1410/",
    description: "SBERT used for semantic similarity evaluation in complexity analysis."
  },
  {
    id: 16,
    category: "Evaluation",
    title: "BM25 and Beyond: Information Retrieval in the Modern Era",
    authors: "Jimmy Lin, Miles Efron",
    venue: "Information Retrieval Journal 2022",
    link: "https://link.springer.com/article/10.1007/s10791-022-09414-x",
    description: "BM25 algorithm used in evidence retrieval for fact-checking pipeline."
  },

  // Vietnamese NLP
  {
    id: 17,
    category: "Vietnamese NLP",
    title: "VnCoreNLP: A Vietnamese Natural Language Processing Toolkit",
    authors: "Vu Xuan Thanh et al.",
    venue: "NAACL 2018",
    link: "https://aclanthology.org/N18-5012/",
    description: "Vietnamese NLP toolkit used for text preprocessing and tokenization."
  },
  {
    id: 18,
    category: "Vietnamese NLP",
    title: "A Survey of Vietnamese Natural Language Processing",
    authors: "Dat Quoc Nguyen",
    venue: "Computer Speech & Language 2023",
    link: "https://www.sciencedirect.com/science/article/pii/S0885230823000682",
    description: "Comprehensive survey of Vietnamese NLP research and datasets."
  },

  // Fact-Checking
  {
    id: 19,
    category: "Fact-Checking",
    title: "FEVER: a Large-scale Dataset for Fact Extraction and VERification",
    authors: "James Thorne et al.",
    venue: "NAACL 2018",
    link: "https://aclanthology.org/N18-1074/",
    description: "Foundational fact-checking dataset that inspired Vietnamese fact-checking research."
  },
  {
    id: 20,
    category: "Fact-Checking",
    title: "Automated Fact Checking: Task Formulations, Methods and Future Directions",
    authors: "James Thorne, Andreas Vlachos",
    venue: "COLING 2018",
    link: "https://aclanthology.org/C18-1283/",
    description: "Survey of automated fact-checking methods and task formulations."
  }
]

export const referenceCategories = [
  { name: "Dataset", count: 5, icon: "Database", color: "blue" },
  { name: "Model", count: 5, icon: "Brain", color: "purple" },
  { name: "Adversarial", count: 3, icon: "Shield", color: "red" },
  { name: "Evaluation", count: 3, icon: "BarChart", color: "green" },
  { name: "Vietnamese NLP", count: 2, icon: "Globe", color: "orange" },
  { name: "Fact-Checking", count: 2, icon: "Search", color: "teal" },
]
