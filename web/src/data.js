// Interview analysis data extracted from summary_stats.json and report.md

export const overviewStats = {
  totalInterviews: 52,
  totalCompanies: 25,
  totalQuestions: 1686,
  totalTurns: 6678,
  totalWords: '~65万字',
};

export const categoryDistribution = [
  { name: '追问/对话性互动', value: 1106, color: '#94a3b8', desc: '面试官即时追问，本质属于技术讨论延伸' },
  { name: '项目深挖', value: 264, color: '#6366f1', desc: '追问实习/项目技术细节' },
  { name: '八股文/基础知识', value: 220, color: '#f59e0b', desc: '考察理论功底' },
  { name: '开放/综合问题', value: 94, color: '#10b981', desc: '自我介绍、反问环节等' },
  { name: 'HR问题', value: 65, color: '#ec4899', desc: 'offer情况、薪资、入职意向' },
  { name: '行为面试(BQ)', value: 52, color: '#8b5cf6', desc: '团队合作、职业规划' },
  { name: '系统设计/场景题', value: 23, color: '#ef4444', desc: '考察工程落地能力' },
];

export const categoryDistributionClean = [
  { name: '项目深挖', value: 264, color: '#6366f1' },
  { name: '八股文/基础知识', value: 220, color: '#f59e0b' },
  { name: '开放/综合问题', value: 94, color: '#10b981' },
  { name: 'HR问题', value: 65, color: '#ec4899' },
  { name: '行为面试(BQ)', value: 52, color: '#8b5cf6' },
  { name: '系统设计/场景题', value: 23, color: '#ef4444' },
];

export const roundDistribution = [
  { name: '一面', value: 21, color: '#6366f1' },
  { name: '二面', value: 15, color: '#8b5cf6' },
  { name: '三面', value: 3, color: '#a78bfa' },
  { name: 'HR面', value: 5, color: '#ec4899' },
  { name: 'CEO/CTO面', value: 2, color: '#f59e0b' },
  { name: '群面', value: 1, color: '#10b981' },
  { name: '加面', value: 1, color: '#14b8a6' },
  { name: '其他', value: 4, color: '#94a3b8' },
];

export const companyData = [
  { company: '公司A', total: 136, 项目深挖: 25, 八股文: 21, 'HR/BQ': 4, 系统设计: 1, 开放: 4, sessions: 3, rounds: '一面/二面/三面' },
  { company: '公司B', total: 140, 项目深挖: 8, 八股文: 20, 'HR/BQ': 3, 系统设计: 0, 开放: 1, sessions: 2, rounds: '一面/二面' },
  { company: '公司C', total: 138, 项目深挖: 27, 八股文: 14, 'HR/BQ': 8, 系统设计: 4, 开放: 6, sessions: 3, rounds: '一面/二面/三面' },
  { company: '公司D', total: 112, 项目深挖: 23, 八股文: 13, 'HR/BQ': 15, 系统设计: 3, 开放: 16, sessions: 3, rounds: '一面/二面/群面' },
  { company: '公司E', total: 112, 项目深挖: 4, 八股文: 8, 'HR/BQ': 4, 系统设计: 0, 开放: 5, sessions: 4, rounds: '一面/二面×2/正式批' },
  { company: '公司F', total: 111, 项目深挖: 8, 八股文: 16, 'HR/BQ': 2, 系统设计: 1, 开放: 4, sessions: 4, rounds: '一面~CTO面' },
  { company: '公司G', total: 83, 项目深挖: 10, 八股文: 7, 'HR/BQ': 6, 系统设计: 0, 开放: 3, sessions: 4, rounds: '一面~CTO面' },
  { company: '公司H', total: 82, 项目深挖: 16, 八股文: 17, 'HR/BQ': 2, 系统设计: 2, 开放: 8, sessions: 4, rounds: '一面/二面/加面/HR' },
  { company: '公司H(正式批)', total: 67, 项目深挖: 19, 八股文: 15, 'HR/BQ': 8, 系统设计: 0, 开放: 5, sessions: 4, rounds: '一面~HR面' },
  { company: '公司I', total: 77, 项目深挖: 3, 八股文: 9, 'HR/BQ': 14, 系统设计: 2, 开放: 8, sessions: 3, rounds: '一面/CEO面/HR面' },
  { company: '公司J', total: 75, 项目深挖: 10, 八股文: 3, 'HR/BQ': 14, 系统设计: 0, 开放: 2, sessions: 2, rounds: '二面/HR面' },
  { company: '公司K', total: 71, 项目深挖: 10, 八股文: 7, 'HR/BQ': 2, 系统设计: 0, 开放: 1, sessions: 2, rounds: '一面/二面' },
  { company: '公司L', total: 66, 项目深挖: 5, 八股文: 4, 'HR/BQ': 2, 系统设计: 0, 开放: 2, sessions: 1, rounds: '二面' },
  { company: '公司M', total: 59, 项目深挖: 23, 八股文: 20, 'HR/BQ': 2, 系统设计: 0, 开放: 3, sessions: 3, rounds: 'LLM/大模型/搜推' },
  { company: '公司N', total: 53, 项目深挖: 13, 八股文: 9, 'HR/BQ': 2, 系统设计: 1, 开放: 1, sessions: 1, rounds: '一面' },
  { company: '公司O', total: 45, 项目深挖: 2, 八股文: 1, 'HR/BQ': 13, 系统设计: 0, 开放: 8, sessions: 3, rounds: '一面/CEO面/HR面' },
  { company: '公司P', total: 39, 项目深挖: 11, 八股文: 6, 'HR/BQ': 3, 系统设计: 2, 开放: 1, sessions: 1, rounds: '一面' },
  { company: '公司Q', total: 39, 项目深挖: 5, 八股文: 2, 'HR/BQ': 3, 系统设计: 0, 开放: 0, sessions: 1, rounds: '面试' },
  { company: '公司R', total: 34, 项目深挖: 10, 八股文: 9, 'HR/BQ': 2, 系统设计: 0, 开放: 2, sessions: 1, rounds: '二面' },
  { company: '公司S', total: 33, 项目深挖: 3, 八股文: 0, 'HR/BQ': 2, 系统设计: 2, 开放: 2, sessions: 2, rounds: '一面/二面' },
  { company: '公司T', total: 22, 项目深挖: 2, 八股文: 2, 'HR/BQ': 2, 系统设计: 0, 开放: 3, sessions: 1, rounds: '一面' },
  { company: '公司U', total: 24, 项目深挖: 0, 八股文: 1, 'HR/BQ': 1, 系统设计: 2, 开放: 1, sessions: 1, rounds: '一面' },
];

export const baguKnowledge = [
  {
    area: '大模型训练与微调',
    items: [
      { topic: 'SFT（有监督微调）', freq: 5, example: '"SFT的时候有没有碰到什么问题？""SFT用了多少数据？"' },
      { topic: '知识蒸馏', freq: 5, example: '"知识蒸馏具体是怎么设计的？""你们是直接拿数据做SFT吗？"' },
      { topic: 'RLHF/强化学习', freq: 4, example: '"强化学习采用的是什么算法？""PPO相比传统策略梯度方法的优势？"' },
      { topic: 'GRPO vs DAPO', freq: 4, example: '"DAPO相比原版GRPO做了哪些变化？""GRPO效果不好体现在哪里？"' },
      { topic: 'DPO', freq: 3, example: '"为什么DPO不行？""有试过DPO这种偏虚敏感的训练吗？"' },
      { topic: 'LoRA/PEFT', freq: 2, example: '"用LoRA微调效果怎么样？"' },
    ]
  },
  {
    area: '大模型推理与部署',
    items: [
      { topic: '模型量化（INT8/AWQ）', freq: 4, example: '"AWQ是权重和激活都量化吗？""量化是对称还是非对称？"' },
      { topic: 'vLLM', freq: 3, example: '"vLLM版本更新快，你们怎么二次开发的？"' },
      { topic: '推理加速/QPS', freq: 3, example: '"量化提升QPS做了什么？""一次请求大概多少毫秒？"' },
      { topic: 'KV Cache', freq: 2, example: '在推理优化讨论中偶尔提及' },
    ]
  },
  {
    area: 'NLP基础与RAG',
    items: [
      { topic: 'RAG检索增强', freq: 4, example: '"用的开源框架吗？""多路召回有做吗？"' },
      { topic: 'Embedding相似度', freq: 3, example: '"embedding之间用什么相似度度量？""inner product和欧式距离？"' },
      { topic: 'Prompt设计', freq: 3, example: '"提示词怎么设计的？""prompt组织结构是怎样的？"' },
      { topic: '多模态', freq: 2, example: '"多模态怎么用的？""GME-7B是专做多模态embedding吗？"' },
    ]
  },
  {
    area: '经典ML/DL基础',
    items: [
      { topic: '损失函数/CE', freq: 3, example: '"next token预估的损失函数公式？""词表一万token怎么算loss？"' },
      { topic: 'Precision/Recall', freq: 3, example: '"precision和recall提高了多少？""PR都是多少？"' },
      { topic: '算法题（DP/排序）', freq: 2, example: '"是打算用动态规划吗？""时间复杂度是多少？"' },
    ]
  }
];

export const projectDeepDive = [
  {
    project: '语音助手项目',
    mentionCount: '30+场',
    depth: 4,
    aspects: [
      { angle: '业务场景', questions: ['助手主动推荐还是用户带prompt？', '多轮对话怎么处理？'] },
      { angle: '意图识别', questions: ['方程号是什么？', '调用准确率低可能原因？', '召回漏洞分析过吗？'] },
      { angle: '数据合成', questions: ['用DeepSeek R1构造数据质量怎么保证？', '多轮改写信息保留？'] },
      { angle: '多模态', questions: ['多模态怎么用？', 'GME-7B做多模态embedding？'] },
    ]
  },
  {
    project: 'RAG知识问答竞赛',
    mentionCount: '15场',
    depth: 4,
    aspects: [
      { angle: '检索链路', questions: ['多路召回有做吗？', 'chunk策略是什么？', 'query改写做了几轮？'] },
      { angle: '数据处理', questions: ['非结构化PDF怎么处理？', '复杂表格/跨页表格？'] },
      { angle: '排序策略', questions: ['rerank用什么模型？', '为什么用大模型做rerank？'] },
      { angle: '结果聚合', questions: ['投票不一致怎么处理？', '多个模型voting怎么设计？'] },
    ]
  },
];

export const companyStyles = [
  {
    company: '公司N',
    type: 'bigtech',
    sessions: '1场一面',
    style: '高密度技术追问',
    features: ['量化知识追到对称/非对称、per-token/per-channel粒度', '关注vLLM二次开发', '快节奏，频繁打断深入追问'],
    questionCount: 53,
    techRatio: '95%',
  },
  {
    company: '公司C',
    type: 'bigtech',
    sessions: '3场 一面/二面/三面',
    style: '体系化面试',
    features: ['一面介绍部门后深入RAG工程链路', '二面加入编程题(LRU)', '三面宏观技术视野+匹配度'],
    questionCount: 138,
    techRatio: '85%',
  },
  {
    company: '公司A',
    type: 'bigtech',
    sessions: '3场提前批',
    style: '理论+实践并重',
    features: ['PPO理论推导/KL散度/优势函数', 'loss函数公式推导', '动态规划编程题'],
    questionCount: 136,
    techRatio: '90%',
  },
  {
    company: '公司M',
    type: 'bigtech',
    sessions: '3场不同团队',
    style: '因团队而异',
    features: ['LLM助手组深入意图识别', '大模型组偏训练方法论', '搜推组关注推荐知识'],
    questionCount: 59,
    techRatio: '88%',
  },
  {
    company: '公司E',
    type: 'bigtech',
    sessions: '4场',
    style: '算法题+项目追问',
    features: ['包含编程题', '关注语料构造和数据质量', '追问相对简短但密集'],
    questionCount: 112,
    techRatio: '80%',
  },
  {
    company: '公司I',
    type: 'startup',
    sessions: '3场 一面/CEO/HR',
    style: '技术聊天+开放讨论',
    features: ['CEO面极其开放: reward system设计、memory架构', '关注coding agent代码质量', '更像技术探讨而非考试'],
    questionCount: 77,
    techRatio: '60%',
  },
  {
    company: '公司D',
    type: 'industry',
    sessions: '3场含群面',
    style: 'AI原生公司文化输出',
    features: ['CEO亲自参加群面', '介绍AI原生战略', '成本优化案例分享'],
    questionCount: 112,
    techRatio: '55%',
  },
  {
    company: '公司B',
    type: 'bigtech',
    sessions: '2场',
    style: '八股文比重高',
    features: ['八股文20条结构清晰', '系统化过完两个项目', '末尾类比自家业务场景'],
    questionCount: 140,
    techRatio: '85%',
  },
];

export const candidateStrengths = [
  { title: '项目经历丰富有深度', desc: '实习项目从R1蒸馏→SFT→GRPO/DAPO→量化部署形成完整链路' },
  { title: '技术栈覆盖面广', desc: '涵盖SFT/DPO/RLHF、知识蒸馏、RAG、多模态、意图识别、模型量化等' },
  { title: '有实际上线经验', desc: '日处理100万条的线上系统经验，应届生中稀缺亮点' },
  { title: '回答有条理', desc: '自我介绍和项目描述通常按"背景→方法→结果"的结构阐述' },
];

export const candidateWeaknesses = [
  { title: '量化知识偏浅', desc: '某大厂一面中"对称vs非对称""per-token vs per-channel"回答"没有详细了解"' },
  { title: 'AWQ理解不准确', desc: '被面试官纠正"AWQ不是这样"' },
  { title: 'PPO理论推导偏表面', desc: '某大厂一面追问KL散度/优势函数时回答不够深入' },
  { title: '叙述偶尔冗长', desc: '面试官多次打断"不好意思我稍微打断一下"' },
  { title: '数据指标不够精确', desc: '多场面试中面试官需反复追问具体precision/recall数值' },
];

export const keyFindings = [
  { icon: 'target', title: '项目深挖是面试核心', desc: '约80%面试时间花在项目追问上，准备项目细节远比刷八股文重要' },
  { icon: 'book', title: '"新八股"取代"旧八股"', desc: 'SFT/RLHF/GRPO/量化/RAG成为标准八股，传统ML八股几乎不考' },
  { icon: 'layers', title: '追问深度惊人', desc: '从业务→方案→数据→指标→部署，每个项目被追问5-10轮是常态' },
  { icon: 'zap', title: '知识蒸馏最高频', desc: 'R1→小模型的蒸馏链路几乎每场必问' },
  { icon: 'users', title: 'HR面核心=摸底offer', desc: '90%的HR面时间在了解候选人手里有哪些offer、怎么选择' },
  { icon: 'trending', title: '大模型市场火热', desc: '几乎所有公司（汽车/芯片/保险/教育）都在招大模型算法工程师' },
];

export const recommendations = [
  { priority: 'high', title: '量化知识系统复习', desc: 'AWQ/GPTQ/SmoothQuant区别，对称vs非对称，per-token/per-channel粒度' },
  { priority: 'high', title: 'PPO/GRPO/DAPO理论推导', desc: '不仅知道怎么用，还要推导为什么（KL散度惩罚、clip、优势函数）' },
  { priority: 'high', title: '项目指标精确化', desc: '每个项目baseline和各方法P/R/F1精确到小数点，形成对比表' },
  { priority: 'high', title: '表达简洁训练', desc: '自我介绍控制2分钟内，项目描述先给结论再展开' },
  { priority: 'medium', title: '向量检索理论', desc: 'inner product vs cosine similarity vs L2 distance数学关系和适用场景' },
  { priority: 'medium', title: '系统设计能力', desc: '练习RAG系统/推理服务/端侧部署方案的设计' },
  { priority: 'medium', title: '论文阅读深度', desc: '不只读方法，要理解设计动机和pattern' },
  { priority: 'low', title: '编程题保持手感', desc: 'LeetCode中等难度，部分大厂仍有编程题' },
];

export const hrQuestions = [
  { topic: '其他offer情况', freq: 5, example: '"手里有其他offer吗？""秋招进度怎么样？"' },
  { topic: '公司选择偏好', freq: 4, example: '"这些机会跟我们相比怎么考虑？"' },
  { topic: '工作强度', freq: 3, example: '"实习公司工作强度怎么样？每天几点上下班？"' },
  { topic: '薪资期望', freq: 2, example: '通常在HR面尾声提及' },
  { topic: '到岗时间', freq: 2, example: '"什么时候可以入职？"' },
  { topic: '城市偏好', freq: 2, example: '"想去哪个城市？"' },
  { topic: '对公司的了解', freq: 3, example: '"怎么看我们公司/团队？"' },
];

export const bqQuestions = [
  { topic: '实习体验与感受', freq: 5, example: '"在实习公司的感受怎么样？""印象最深刻的地方？"' },
  { topic: '为什么选这个方向', freq: 3, example: '"为什么不投视觉要投NLP？""为什么选择大模型方向？"' },
  { topic: '职业规划', freq: 3, example: '"未来想做什么方向？""更喜欢做agent还是模型训练？"' },
  { topic: '团队合作/冲突处理', freq: 2, example: '"目标不一致时听谁的？"' },
  { topic: '最大挑战', freq: 2, example: '"哪个事情挑战最大？""怎么突破的？"' },
];

export const systemDesignQuestions = [
  { company: '公司I CEO面', question: '设计智能体的reward system（类似人类多巴胺/内啡肽系统）' },
  { company: '公司I CEO面', question: 'AI的memory system有六个components，你怎么演化出来？' },
  { company: '公司S 二面', question: '无人机场景：实时性+低成本显卡+识别准确率，怎么设计？' },
  { company: '公司S 一面', question: '语音→文本→指令→无人机交互链路技术应用' },
  { company: '公司U 一面', question: '如何保证模型识别出的未知风险确实是期望的未知风险？' },
  { company: '公司C 一面', question: '如果是线上生产的RAG系统，你会怎么修改方案？' },
  { company: '公司D 群面', question: '单用户月成本8元，1000万用户怎么降到1%成本？' },
];
