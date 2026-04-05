// 大模型算法岗面试指南数据 — 基于52场真实面试总结

export const guideOverview = {
  title: '大模型算法岗面试指南',
  subtitle: '基于 52 场真实面试、1,686 道面试题的深度复盘',
  author: '凶猛肱二头',
  stats: [
    { label: '覆盖公司', value: '25+', desc: '互联网大厂/车企/AI创业公司/芯片厂' },
    { label: '面试轮次', value: '52场', desc: '一面到CEO面全覆盖' },
    { label: '提取问题', value: '1,686', desc: '分类整理、按频率排序' },
    { label: '通过率', value: '多家offer', desc: '技术面通过率高' },
  ],
};

export const interviewFlow = [
  {
    stage: '简历投递',
    duration: '持续',
    tips: ['简历上的每一个项目/技术点都可能被深挖', '写上去就要能讲清楚，讲不清楚不如不写', '量化指标要精确到小数（如准确率92.3%）'],
  },
  {
    stage: '一面（技术面）',
    duration: '45-60min',
    tips: ['自我介绍 → 项目深挖 → 八股文 → 编程题（部分公司）', '项目深挖占70%+时间，是重中之重', '面试官会从业务理解→技术方案→数据→指标→部署层层追问'],
  },
  {
    stage: '二面（技术面）',
    duration: '45-60min',
    tips: ['继续项目深挖，但角度不同于一面', '可能加入系统设计题', '编程题概率增加（部分大厂）'],
  },
  {
    stage: '三面（技术/主管面）',
    duration: '30-45min',
    tips: ['更宏观的技术视野', '职业规划和团队匹配度', '可能讨论前沿技术方向'],
  },
  {
    stage: 'HR面',
    duration: '20-30min',
    tips: ['90%时间在摸底offer情况', '薪资期望、城市偏好、到岗时间', '不要撒谎，但可以策略性表达'],
  },
];

export const mustKnowTopics = [
  {
    area: '大模型训练（最高频）',
    color: 'indigo',
    icon: '🔥',
    topics: [
      {
        name: 'SFT 有监督微调',
        frequency: '几乎每场必问',
        keyPoints: ['SFT数据怎么构造？质量怎么保证？', '用了多少数据？数据配比？', 'SFT遇到什么问题？怎么解决？', '全量微调 vs LoRA 的选择和区别'],
        trap: '面试官常追问：SFT数据量不够/质量差怎么办？要有备选方案。',
      },
      {
        name: '知识蒸馏',
        frequency: '几乎每场必问',
        keyPoints: ['大模型→小模型的蒸馏流程', 'R1/DeepSeek蒸馏数据怎么生成？', '蒸馏数据的质量如何校验？', '32B vs 8B效果对比'],
        trap: '被问"为什么用小模型而不直接用大模型"时，要从延迟/成本/QPS角度回答。',
      },
      {
        name: 'RLHF / PPO / GRPO / DAPO',
        frequency: '高频',
        keyPoints: ['PPO为什么加KL散度惩罚？clip的作用？', 'GRPO vs DAPO的核心区别', '优势函数(Advantage)的作用', 'Reward设计：rule-based vs 模型RM', '强化学习训练不稳定怎么办？'],
        trap: '头部大厂会追问理论推导，不能只停留在"知道怎么用"层面。',
      },
      {
        name: 'DPO',
        frequency: '中频',
        keyPoints: ['DPO vs PPO的区别和适用场景', '为什么有些任务DPO效果不好？', 'DPO对数据质量的敏感性'],
        trap: '要能说清楚为什么某些场景选了GRPO/DAPO而不是DPO。',
      },
    ],
  },
  {
    area: '模型推理与部署',
    color: 'amber',
    icon: '⚡',
    topics: [
      {
        name: '模型量化',
        frequency: '高频，且考察很深',
        keyPoints: ['AWQ / GPTQ / SmoothQuant 各自原理和区别', '对称 vs 非对称量化', 'per-token / per-channel / per-tensor 粒度', '权重量化 vs 激活量化 vs 两者都做', '量化对精度的影响和评估方法'],
        trap: '某大厂一面追问到per-token/per-channel粒度，回答"不太了解"会扣很多分。这是区分度很高的知识点。',
      },
      {
        name: 'vLLM 推理框架',
        frequency: '中高频',
        keyPoints: ['vLLM的核心优化原理（PagedAttention）', '二次开发经验（改了哪些部分）', '版本更新快的情况下如何维护'],
        trap: '如果简历写了vLLM，一定会被追问二次开发细节。',
      },
      {
        name: '推理加速 / QPS优化',
        frequency: '中频',
        keyPoints: ['batch推理策略', '量化对QPS的提升', 'KV Cache优化', '一次请求的延迟大概多少ms？'],
        trap: '要有具体数字：日处理量、单次延迟、QPS等。',
      },
    ],
  },
  {
    area: 'RAG 检索增强生成',
    color: 'emerald',
    icon: '📚',
    topics: [
      {
        name: 'RAG 全链路',
        frequency: '高频',
        keyPoints: ['文档解析（PDF/表格/跨页）', 'Chunk策略：大小、重叠、语义切分', 'Embedding模型选择', 'Query改写 / HyDE', '多路召回：语义检索 + 关键词检索（BM25）', 'Rerank模型和策略', '结果聚合 / Voting机制'],
        trap: '某大厂一面把RAG链路的每个环节都追问了一遍。只做过简单RAG demo的不够，要有工程深度。',
      },
      {
        name: '向量检索理论',
        frequency: '中频',
        keyPoints: ['Inner Product vs Cosine Similarity vs L2 Distance', '三者的数学关系和适用场景', 'Inner Product和欧式距离是否可能排序不一致？（答案：是的）', 'ANN近似搜索算法（HNSW/IVF）'],
        trap: '面试官可能出数学反例问你，要真正理解而非死记。',
      },
    ],
  },
  {
    area: '经典基础',
    color: 'rose',
    icon: '🧠',
    topics: [
      {
        name: 'Loss函数',
        frequency: '中频',
        keyPoints: ['Cross-Entropy Loss公式推导', 'next token prediction的loss怎么算？', '词表1万个token，某个词的loss怎么算？', 'Softmax + CE的数值稳定性'],
        trap: '某大厂一面直接问公式推导，要能手写。',
      },
      {
        name: '编程题',
        frequency: '部分公司必考',
        keyPoints: ['LRU缓存实现', '动态规划', '字典/哈希操作', '中等难度LeetCode即可'],
        trap: '大模型岗编程题出现概率约30%，不算高但不能完全不准备。',
      },
    ],
  },
];

export const projectPrepGuide = [
  {
    title: '项目表述黄金结构',
    steps: [
      { label: 'B - Background', desc: '一句话业务背景（什么公司、什么问题）' },
      { label: 'T - Task', desc: '你负责的具体任务是什么' },
      { label: 'A - Action', desc: '技术方案：模型选择→数据处理→训练→部署' },
      { label: 'R - Result', desc: '量化结果：准确率/召回率/QPS/成本' },
    ],
  },
  {
    title: '面试官追问的7个维度',
    steps: [
      { label: '1. 业务理解', desc: '"为什么要做这件事？""为什么用大模型而不是规则？"' },
      { label: '2. 技术方案', desc: '"具体怎么做的？""用了什么模型/方法？"' },
      { label: '3. 数据细节', desc: '"数据怎么来的？""标注怎么做？""数据量多少？"' },
      { label: '4. 效果指标', desc: '"效果怎么样？""对比baseline提升多少？"'},
      { label: '5. 深挖细节', desc: '"为什么选这个方法？""试过其他方案吗？"' },
      { label: '6. 工程部署', desc: '"线上怎么部署？""QPS多少？""资源消耗？"' },
      { label: '7. 扩展思考', desc: '"如果要优化下一步怎么做？""如果数据量大10倍呢？"' },
    ],
  },
];

export const projectChecklist = [
  { item: '每个项目的baseline指标（精确到小数）', done: false },
  { item: '每个方法/阶段的指标提升（形成对比表）', done: false },
  { item: '为什么选这个模型/方法（至少准备2个理由）', done: false },
  { item: '试过哪些其他方案？为什么不用？', done: false },
  { item: '数据量、标注方式、数据质量把控', done: false },
  { item: '线上部署的QPS/延迟/日处理量', done: false },
  { item: '遇到的最大挑战和解决方案', done: false },
  { item: '如果再做一次，会怎么改进？', done: false },
];

export const systemDesignGuide = [
  {
    title: '常见系统设计题型',
    items: [
      '设计一个RAG问答系统（最高频）',
      '设计大模型推理服务（量化/缓存/调度）',
      '设计端侧部署方案（车规级/手机端）',
      '设计Agent的reward system',
      '设计多模态交互系统（语音→文本→指令）',
      '如何将单用户成本从8元降到0.08元？',
    ],
  },
  {
    title: '回答框架：SPACE',
    items: [
      'S - Scenario：明确场景和约束条件',
      'P - Performance：性能要求（延迟/QPS/准确率）',
      'A - Architecture：整体架构设计',
      'C - Cost：成本考量（GPU/Token/带宽）',
      'E - Evolution：未来演进方向',
    ],
  },
];

export const hrBqGuide = {
  bq: [
    { question: '"为什么选这个方向？"', strategy: '结合个人经历+行业趋势，展示深思熟虑而非随波逐流。' },
    { question: '"实习中最大的挑战？"', strategy: '用STAR结构：情境→任务→行动→结果。重点是你的思考过程。' },
    { question: '"团队意见不一致怎么办？"', strategy: '展示沟通能力：先理解对方→找共同点→数据说话→求同存异。' },
    { question: '"未来职业规划？"', strategy: '短期（1-2年）具体技术深耕 + 长期（3-5年）技术影响力。避免说"想当管理者"。' },
    { question: '"为什么选我们公司？"', strategy: '提前做功课：公司技术博客/产品/开源项目。展示真正的了解而非泛泛而谈。' },
  ],
  hr: [
    { question: '"手里有其他offer吗？"', strategy: '如实回答，但可以策略性表达优先级。有竞争性offer是加分项。' },
    { question: '"期望薪资？"', strategy: '了解市场行情，给一个合理范围而非精确数字。可以说"和市场水平对齐"。' },
    { question: '"什么时候能入职？"', strategy: '给一个合理的时间，体现你的诚意和安排能力。' },
    { question: '"城市偏好？"', strategy: '如果灵活就说灵活，不要因为城市限制错失好机会。' },
  ],
};

export const commonTraps = [
  {
    trap: '自我介绍太长',
    symptom: '面试官打断你："不好意思我稍微打断一下"',
    fix: '控制在2分钟内。格式：教育背景(10s) → 实习经历(40s×2) → 核心技能(20s)',
    severity: 'high',
  },
  {
    trap: '指标说不清楚',
    symptom: '面试官反复追问："具体precision/recall是多少？"',
    fix: '每个项目准备一张指标对比表：baseline → 方法A → 方法B → 最终方案',
    severity: 'high',
  },
  {
    trap: '理论只知其然不知其所以然',
    symptom: '面试官："为什么PPO要加KL散度惩罚？" 你："嗯...为了防止偏离太远"',
    fix: '每个算法准备3层深度：是什么 → 为什么这么设计 → 有没有其他替代方案',
    severity: 'high',
  },
  {
    trap: '回答问题跑偏',
    symptom: '面试官："你没有回答我的问题"',
    fix: '先直接回答问题核心（1句话），再展开解释。养成"结论先行"的习惯。',
    severity: 'medium',
  },
  {
    trap: '简历技术点写了但讲不清',
    symptom: '面试官追问细节，你支支吾吾',
    fix: '简历上每一个技术词都要能讲3分钟。讲不清的不要写。',
    severity: 'high',
  },
  {
    trap: '没有注意到论文的设计模式',
    symptom: '面试官："你没有注意到他们的pattern吗？"',
    fix: '读论文时关注：这个方法解决什么问题？为什么这样设计？和同类方法的本质区别？',
    severity: 'medium',
  },
];

export const weeklyPlan = [
  {
    week: '第1周',
    title: '项目梳理',
    tasks: ['梳理每个项目的BTAR结构', '整理精确的效果指标对比表', '准备"为什么选这个方案"的答案', '准备2分钟自我介绍并计时练习'],
  },
  {
    week: '第2周',
    title: '八股文攻坚',
    tasks: ['SFT/RLHF/GRPO/DAPO理论推导', '模型量化深度复习(AWQ/GPTQ)', 'RAG全链路知识梳理', 'Loss函数公式手推'],
  },
  {
    week: '第3周',
    title: '系统设计+编程',
    tasks: ['练习3道系统设计题', 'LeetCode中等难度每天1题', '向量检索理论复习', '模拟面试（找同学或录音自评）'],
  },
  {
    week: '第4周',
    title: '模拟+查漏补缺',
    tasks: ['完整模拟面试2-3次', 'HR/BQ问题回答练习', '查漏补缺薄弱环节', '调整心态，保持自信'],
  },
];
