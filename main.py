#!/usr/bin/env python3
"""面试录音转录文本解析与分类脚本"""

import os
import re
import json
from collections import defaultdict
from docx import Document

DATA_DIR = os.path.join(os.path.dirname(__file__), "data")
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "output")

# ── 问题分类关键词规则 ──────────────────────────────────────────────

CATEGORY_RULES = {
    "八股文/基础知识": [
        # ML/DL 基础
        r"transformer", r"attention", r"self[- ]?attention", r"多头注意力",
        r"softmax", r"激活函数", r"损失函数", r"loss", r"梯度[消爆]",
        r"反向传播", r"back\s?prop", r"正则化", r"dropout", r"batch\s?norm",
        r"layer\s?norm", r"优化器", r"adam", r"sgd", r"学习率",
        r"过拟合", r"欠拟合", r"偏差方差", r"交叉验证",
        r"卷积", r"池化", r"conv", r"pooling", r"残差", r"resnet",
        r"bert", r"gpt", r"预训练", r"微调", r"fine\s?tun",
        r"embedding", r"词向量", r"word2vec", r"tokeniz",
        r"rnn", r"lstm", r"gru", r"seq2seq",
        r"beam\s?search", r"贪心", r"温度", r"top[_-]?[pk]",
        r"precision", r"recall", r"f1", r"准确率.*召回率",
        r"auc", r"roc", r"混淆矩阵",
        r"svm", r"决策树", r"随机森林", r"xgboost", r"lightgbm",
        r"k\s?means", r"聚类", r"降维", r"pca",
        # 大模型相关八股
        r"kv\s?cache", r"flash\s?attention", r"量化", r"int[48]",
        r"lora", r"qlora", r"peft", r"adapter",
        r"rlhf", r"dpo", r"ppo", r"reward\s?model",
        r"sft", r"指令微调", r"instruction\s?tun",
        r"rag", r"检索增强", r"向量数据库",
        r"幻觉", r"hallucin", r"对齐", r"alignment",
        r"推理加速", r"模型压缩", r"知识蒸馏", r"distill",
        r"vllm", r"tensor\s?parallel", r"模型并行", r"数据并行",
        # 编程/算法基础
        r"时间复杂度", r"空间复杂度", r"排序", r"二分",
        r"动态规划", r"dp", r"贪心算法", r"回溯",
        r"链表", r"二叉树", r"哈希", r"栈", r"队列", r"堆",
        r"python.*基础", r"多线程", r"多进程", r"GIL",
        r"装饰器", r"生成器", r"迭代器",
    ],
    "项目深挖": [
        r"(详细|具体)(介绍|讲讲|说说|聊聊).*(项目|实习|工作|经历)",
        r"(讲讲|说说|聊聊|介绍).*(项目|实习|实践)",
        r"怎么做的", r"具体.*怎么.*实现", r"技术方案",
        r"为什么(选|用|这么做|这样)",
        r"遇到.*什么.*问题", r"(难点|挑战|困难)",
        r"怎么(解决|优化|提升|改进)",
        r"效果.*怎么样", r"(结果|指标|提升|收益)",
        r"(数据|样本|标注).*(怎么|多少|来源|规模)",
        r"(上线|部署|线上).*(怎么|效果|情况)",
        r"(对比|baseline|基线)",
        r"你(负责|做).*什么", r"你的(贡献|角色|职责)",
        r"(打断一下|我想问一下).*(这个|你们)",
        r"(深入|展开).*(讲讲|说说|聊聊)",
    ],
    "系统设计/场景题": [
        r"(怎么|如何)(设计|架构|搭建)",
        r"(系统|架构|方案).*(设计|搭建)",
        r"(场景|业务).*(怎么做|如何)",
        r"(百万|千万|亿级).*(数据|请求|用户)",
        r"(高并发|高可用|分布式)",
        r"(如果|假设).*(你来做|你怎么)",
    ],
    "行为面试(BQ)": [
        r"团队.*合作", r"(冲突|分歧|不同意见)",
        r"(压力|挫折|失败).*(怎么|如何)",
        r"(成就感|自豪|满意)",
        r"(优[点缺]|缺点|不足)",
        r"(学到|收获|成长)",
        r"为什么.*([想来选]|申请|加入)",
        r"(职业|未来).*(规划|计划|发展|方向)",
        r"(实习|工作).*(感受|体验|评价)",
    ],
    "HR问题": [
        r"(薪资|薪酬|工资|待遇|收入|包|offer).*(期望|要求|多少|情况)",
        r"(offer|意向|录用).*(情况|几个|哪些|在手)",
        r"(其他|别的).*(公司|机会|面试|offer)",
        r"(到岗|入职).*(时间|日期)",
        r"(期望|想去|意向).*(城市|地点|location)",
        r"(加班|工作强度|上下班|工作时间)",
        r"(家[在里是]|哪里人|籍贯)",
        r"(男女朋友|女朋友|男朋友|对象|感情)",
        r"(怎么看|了解).*(公司|我们|平台|业务)",
        r"(排序|优先级|怎么选|怎么考虑).*(公司|offer|机会)",
    ],
    "开放/综合问题": [
        r"自我介绍",
        r"(反问|问我|想问|想了解).*(什么|环节)",
        r"(你觉得|你认为|你怎么看).*(行业|趋势|未来|发展)",
        r"(还有|其他).*(想说|补充|问题)",
    ],
}


def parse_filename(filename: str) -> dict:
    """从文件名提取公司名和面试轮次"""
    name = filename.replace("_原文.docx", "").strip()

    # 识别面试轮次
    round_patterns = [
        (r"hr面", "HR面"),
        (r"cto面", "CTO面"),
        (r"ceo面", "CEO面"),
        (r"群面", "群面"),
        (r"加面", "加面"),
        (r"三面", "三面"),
        (r"二面", "二面"),
        (r"一面", "一面"),
        (r"面试", "面试"),
    ]
    interview_round = "未知"
    for pattern, label in round_patterns:
        if re.search(pattern, name, re.IGNORECASE):
            interview_round = label
            break

    # 提取公司名 — 去掉轮次/数字/空格等
    company = name
    for pattern, _ in round_patterns:
        company = re.sub(pattern, "", company, flags=re.IGNORECASE)
    company = re.sub(r"[\d\s\(\)\-]+$", "", company).strip()
    company = re.sub(r"^[\d\s\-]+", "", company).strip()

    # 手动修正一些名称
    COMPANY_ALIASES = {
        "pdd": "拼多多", "PDD": "拼多多",
        "metagpt": "MetaGPT", "ceo-metagpt": "MetaGPT",
        "nodesk": "Nodesk",
        "一环路东一段 3-芯片厂": "芯片厂",
        "芯片": "芯片厂",
        "电子": "电子(未知公司)",
        "酷开": "创维酷开",
        "创维酷开-": "创维酷开",
        "好未来": "好未来",
        "弋途科技": "弋途科技",
        "戈途科技": "戈途科技",
        "饿了吗": "饿了么",
        "理想汽车)": "理想汽车",
        "智源机器人": "智源机器人",
        "智元": "智元机器人",
        "深度智信": "深度智信",
    }
    for alias, real in COMPANY_ALIASES.items():
        if alias in company:
            company = real
            break

    if not company:
        company = name

    return {"company": company, "round": interview_round, "raw_name": name}


def parse_docx(filepath: str) -> list[dict]:
    """解析 docx，返回对话轮次列表"""
    doc = Document(filepath)
    turns = []
    current_speaker = None
    current_time = None
    current_text_parts = []

    speaker_pattern = re.compile(r"^发言人(\d+)\s+(\d{2}:\d{2})")

    for para in doc.paragraphs:
        text = para.text.strip()
        if not text:
            continue

        match = speaker_pattern.match(text)
        if match:
            # 保存前一轮
            if current_speaker is not None and current_text_parts:
                turns.append({
                    "speaker": current_speaker,
                    "time": current_time,
                    "text": "".join(current_text_parts).strip(),
                })
            current_speaker = int(match.group(1))
            current_time = match.group(2)
            current_text_parts = []
        else:
            current_text_parts.append(text)

    # 最后一轮
    if current_speaker is not None and current_text_parts:
        turns.append({
            "speaker": current_speaker,
            "time": current_time,
            "text": "".join(current_text_parts).strip(),
        })

    return turns


def identify_interviewer(turns: list[dict]) -> int:
    """识别面试官是哪个发言人（通常提问多、说话短的是面试官）"""
    if not turns:
        return 2

    speaker_stats = defaultdict(lambda: {"count": 0, "total_len": 0, "question_count": 0})
    for t in turns:
        s = t["speaker"]
        speaker_stats[s]["count"] += 1
        speaker_stats[s]["total_len"] += len(t["text"])
        if "？" in t["text"] or "?" in t["text"]:
            speaker_stats[s]["question_count"] += 1

    # 面试官通常：提问比例高、平均发言短
    speakers = list(speaker_stats.keys())
    if len(speakers) == 1:
        return speakers[0]

    def interviewer_score(sp):
        stats = speaker_stats[sp]
        avg_len = stats["total_len"] / max(stats["count"], 1)
        q_ratio = stats["question_count"] / max(stats["count"], 1)
        return q_ratio - avg_len / 1000  # 提问比例高 + 平均发言短

    # 但如果第一轮是自我介绍请求，那个发言人更可能是面试官
    first_few = turns[:6]
    for t in first_few:
        if "自我介绍" in t["text"] or "介绍一下" in t["text"]:
            return t["speaker"]

    return max(speakers, key=interviewer_score)


def classify_question(text: str) -> list[str]:
    """对面试官的发言进行分类"""
    categories = []
    text_lower = text.lower()

    for category, patterns in CATEGORY_RULES.items():
        for pat in patterns:
            if re.search(pat, text_lower):
                categories.append(category)
                break

    return categories if categories else ["未分类"]


def is_question_or_directive(text: str) -> bool:
    """判断发言是否包含提问或指令（而非简单应答）"""
    if len(text) < 4:
        return False
    # 包含问号
    if "？" in text or "?" in text:
        return True
    # 包含指令性动词
    directive_patterns = [
        r"(讲讲|说说|聊聊|介绍|描述|解释|分析)",
        r"(你[能可]以|请你|要不你|那你)",
        r"(怎么|如何|为什么|什么是|是什么)",
    ]
    for pat in directive_patterns:
        if re.search(pat, text):
            return True
    return False


def extract_interview(filepath: str) -> dict:
    """提取单份面试的完整结构化数据"""
    filename = os.path.basename(filepath)
    meta = parse_filename(filename)
    turns = parse_docx(filepath)

    if not turns:
        return {**meta, "turns_count": 0, "questions": [], "all_turns": []}

    interviewer = identify_interviewer(turns)

    questions = []
    for i, turn in enumerate(turns):
        if turn["speaker"] == interviewer and is_question_or_directive(turn["text"]):
            cats = classify_question(turn["text"])
            # 获取候选人的回答（下一轮）
            answer = ""
            if i + 1 < len(turns) and turns[i + 1]["speaker"] != interviewer:
                answer = turns[i + 1]["text"]

            questions.append({
                "index": i,
                "time": turn["time"],
                "text": turn["text"],
                "categories": cats,
                "answer_preview": answer[:200] if answer else "",
            })

    return {
        **meta,
        "filename": filename,
        "turns_count": len(turns),
        "interviewer_id": interviewer,
        "question_count": len(questions),
        "questions": questions,
        "all_turns": [
            {"speaker": "面试官" if t["speaker"] == interviewer else "候选人",
             "time": t["time"], "text": t["text"]}
            for t in turns
        ],
    }


def compute_summary(all_data: list[dict]) -> dict:
    """计算统计汇总"""
    summary = {
        "total_interviews": len(all_data),
        "total_questions": sum(d["question_count"] for d in all_data),
        "total_turns": sum(d["turns_count"] for d in all_data),
    }

    # 公司分布
    company_counts = defaultdict(int)
    for d in all_data:
        company_counts[d["company"]] += 1
    summary["company_distribution"] = dict(sorted(company_counts.items(), key=lambda x: -x[1]))

    # 轮次分布
    round_counts = defaultdict(int)
    for d in all_data:
        round_counts[d["round"]] += 1
    summary["round_distribution"] = dict(sorted(round_counts.items(), key=lambda x: -x[1]))

    # 问题分类分布
    category_counts = defaultdict(int)
    category_questions = defaultdict(list)
    for d in all_data:
        for q in d["questions"]:
            for cat in q["categories"]:
                category_counts[cat] += 1
                category_questions[cat].append({
                    "company": d["company"],
                    "round": d["round"],
                    "text": q["text"][:200],
                })
    summary["category_distribution"] = dict(sorted(category_counts.items(), key=lambda x: -x[1]))

    # 每个分类的典型问题（取前15个去重）
    summary["category_examples"] = {}
    for cat, qs in category_questions.items():
        seen = set()
        unique = []
        for q in qs:
            short = q["text"][:80]
            if short not in seen:
                seen.add(short)
                unique.append(q)
            if len(unique) >= 15:
                break
        summary["category_examples"][cat] = unique

    # 每个公司的问题分类分布
    company_category = defaultdict(lambda: defaultdict(int))
    for d in all_data:
        for q in d["questions"]:
            for cat in q["categories"]:
                company_category[d["company"]][cat] += 1
    summary["company_category_distribution"] = {
        k: dict(v) for k, v in company_category.items()
    }

    # 高频问题关键词
    all_q_texts = []
    for d in all_data:
        for q in d["questions"]:
            all_q_texts.append(q["text"])
    summary["total_question_texts_count"] = len(all_q_texts)

    return summary


def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    docx_files = sorted([
        os.path.join(DATA_DIR, f) for f in os.listdir(DATA_DIR)
        if f.endswith(".docx")
    ])

    print(f"找到 {len(docx_files)} 份面试文件")

    all_data = []
    for filepath in docx_files:
        print(f"  解析: {os.path.basename(filepath)}")
        data = extract_interview(filepath)
        all_data.append(data)

    # 保存完整数据
    extracted_path = os.path.join(OUTPUT_DIR, "extracted_data.json")
    with open(extracted_path, "w", encoding="utf-8") as f:
        json.dump(all_data, f, ensure_ascii=False, indent=2)
    print(f"\n结构化数据已保存: {extracted_path}")

    # 保存统计汇总
    summary = compute_summary(all_data)
    summary_path = os.path.join(OUTPUT_DIR, "summary_stats.json")
    with open(summary_path, "w", encoding="utf-8") as f:
        json.dump(summary, f, ensure_ascii=False, indent=2)
    print(f"统计汇总已保存: {summary_path}")

    # 打印摘要
    print(f"\n{'='*60}")
    print(f"总面试场次: {summary['total_interviews']}")
    print(f"总对话轮次: {summary['total_turns']}")
    print(f"总提取问题数: {summary['total_questions']}")
    print(f"\n公司分布:")
    for company, count in summary["company_distribution"].items():
        print(f"  {company}: {count} 场")
    print(f"\n轮次分布:")
    for rnd, count in summary["round_distribution"].items():
        print(f"  {rnd}: {count} 场")
    print(f"\n问题分类分布:")
    for cat, count in summary["category_distribution"].items():
        print(f"  {cat}: {count} 个问题")


if __name__ == "__main__":
    main()