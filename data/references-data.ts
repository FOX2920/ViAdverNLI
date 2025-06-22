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
  },

  // Additional references from references.bib
  {
    id: 21,
    category: "Adversarial",
    title: "Adversarial attacks against Fact Extraction and VERification",
    authors: "James Thorne, Andreas Vlachos",
    venue: "arXiv 2019",
    link: "https://arxiv.org/abs/1903.05543",
    description: "Adversarial attack methods specifically targeting fact-checking systems."
  },
  {
    id: 22,
    category: "Adversarial", 
    title: "Adversarial NLI: A New Benchmark for Natural Language Understanding",
    authors: "Alex Williams et al.",
    venue: "ACL 2020",
    link: "https://aclanthology.org/2020.acl-main.441/",
    description: "Adversarial NLI benchmark that inspired adversarial dataset creation methods."
  },
  {
    id: 23,
    category: "Fact-Checking",
    title: "Get Your Vitamin C: Robust Fact Verification with Contrastive Evidence",
    authors: "Thomas W. B. Schuster et al.",
    venue: "arXiv 2021",
    link: "https://arxiv.org/abs/2103.08541",
    description: "Contrastive evidence approach for robust fact verification systems."
  },
  {
    id: 24,
    category: "Vietnamese NLP",
    title: "BERT-based Model for Vietnamese Fact Verification Dataset", 
    authors: "Quan Dinh Tran et al.",
    venue: "arXiv 2025",
    link: "https://arxiv.org/abs/2503.00356",
    description: "BERT-based approaches for Vietnamese fact verification tasks."
  },
  {
    id: 25,
    category: "Vietnamese NLP",
    title: "ViHealthNLI: A Dataset for Vietnamese NLI in Healthcare",
    authors: "Nguyen Thi Mai Huyen et al.",
    venue: "SIGUL Workshop 2024",
    link: "https://aclanthology.org/2024.sigul-1.12/",
    description: "Specialized Vietnamese NLI dataset for healthcare domain."
  },
  {
    id: 26,
    category: "Model",
    title: "GPT-4 Technical Report",
    authors: "OpenAI",
    venue: "arXiv 2023",
    link: "https://arxiv.org/abs/2303.08774",
    description: "Technical report for GPT-4, foundation model used in fine-tuning experiments."
  },
  {
    id: 27,
    category: "Model",
    title: "GPT-4o System Card",
    authors: "OpenAI", 
    venue: "arXiv 2024",
    link: "https://arxiv.org/abs/2410.21276",
    description: "GPT-4o model used for R1 and R2 fine-tuning in ViAdverNLI."
  },
  {
    id: 28,
    category: "Model",
    title: "Introducing Gemini 2.0: our new AI model for the agentic era",
    authors: "Google DeepMind",
    venue: "Google Blog 2024",
    link: "https://blog.google/technology/ai/google-gemini-ai-update-december-2024/",
    description: "Gemini 2.0 Flash model used in LLM fine-tuning experiments."
  },
  {
    id: 29,
    category: "Model",
    title: "Qwen3 Technical Report",
    authors: "An Yang et al.",
    venue: "arXiv 2025",
    link: "https://arxiv.org/abs/2505.09388",
    description: "Qwen3 model family used in local LLM fine-tuning experiments."
  },
  {
    id: 30,
    category: "Model",
    title: "DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning",
    authors: "Weijie Guo et al.",
    venue: "arXiv 2025",
    link: "https://arxiv.org/abs/2501.12948",
    description: "DeepSeek-R1 model achieving best local LLM performance in experiments."
  },
  {
    id: 31,
    category: "Model",
    title: "Gemma 3 Technical Report",
    authors: "Gemma Team et al.",
    venue: "arXiv 2025",
    link: "https://arxiv.org/abs/2503.19786",
    description: "Gemma 3 model used in local LLM fine-tuning comparisons."
  },
  {
    id: 32,
    category: "Model",
    title: "Phi-4-reasoning Technical Report",
    authors: "Ahmed Abdin et al.",
    venue: "arXiv 2025",
    link: "https://arxiv.org/abs/2504.21318",
    description: "Phi-4 reasoning model used in claim generation and evaluation."
  },
  {
    id: 33,
    category: "Model",
    title: "Magistral",
    authors: "Mistral AI",
    venue: "arXiv 2025",
    link: "https://arxiv.org/abs/2506.10910",
    description: "Mistral's Magistral model used in multi-round claim generation."
  },
  {
    id: 34,
    category: "Adversarial",
    title: "LLM in the Loop: Creating the ParaDeHate Dataset for Hate Speech Detoxification",
    authors: "Shuzhou Yuan et al.",
    venue: "arXiv 2025",
    link: "https://arxiv.org/abs/2506.01484",
    description: "LLM-in-the-loop methodology that inspired adversarial dataset creation pipeline."
  },

  // Methodology & Approaches
  {
    id: 35,
    category: "Methodology",
    title: "Cross-lingual Language Model Pretraining",
    authors: "Alexis Conneau, Guillaume Lample",
    venue: "NeurIPS 2019",
    link: "https://arxiv.org/abs/1901.07291",
    description: "Cross-lingual pretraining methodology used in XLM-R baseline models."
  },
  {
    id: 36,
    category: "Methodology", 
    title: "Gemini 2.5: Pushing the Frontier with Advanced Reasoning, Multimodality, Long Context, and Next Generation Agentic Capabilities",
    authors: "Gemini Team, Google",
    venue: "Google Technical Report 2025",
    link: "https://storage.googleapis.com/deepmind-media/gemini/gemini_v2_5_report.pdf",
    description: "Advanced reasoning capabilities that inform future adversarial NLP directions."
  }
]

export const referenceCategories = [
  { name: "Dataset", count: 5, icon: "Database", color: "blue" },
  { name: "Model", count: 13, icon: "Brain", color: "purple" },
  { name: "Adversarial", count: 6, icon: "Shield", color: "red" },
  { name: "Evaluation", count: 3, icon: "BarChart", color: "green" },
  { name: "Vietnamese NLP", count: 4, icon: "Globe", color: "orange" },
  { name: "Fact-Checking", count: 3, icon: "Search", color: "teal" },
  { name: "Methodology", count: 2, icon: "Target", color: "indigo" },
]
