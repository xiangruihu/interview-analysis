import { useState } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie,
} from 'recharts'
import {
  BookOpen, ChevronDown, ChevronUp, AlertTriangle, CheckCircle, XCircle,
  Target, Layers, Zap, TrendingUp,
} from 'lucide-react'
import {
  baguOverview, baguTopics, baguFreqDistribution, baguDiffDistribution,
  baguProjectRelation, baguCommonMistakes,
} from './BaguData'

/* ── Hero ── */
function BaguHero() {
  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-orange-950 to-slate-900 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(251,146,60,0.12),transparent_60%)]" />
      <div className="relative max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm text-orange-200 mb-6">
            <BookOpen className="w-4 h-4" />
            {baguOverview.subtitle}
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white via-orange-200 to-amber-200 bg-clip-text text-transparent leading-tight">
            {baguOverview.title}
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            作者：<a href="https://space.bilibili.com/441302483" target="_blank" rel="noopener noreferrer" className="text-orange-300 hover:text-white underline underline-offset-2 transition-colors">凶猛肱二头</a> · 从220道八股真题中提炼的核心知识图谱
          </p>
          <div className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 bg-amber-500/10 border border-amber-400/20 rounded-lg text-xs text-amber-200">
            ⚠️ 所有公司名称均已模糊化处理，为防定位故做匿名处理。
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {baguOverview.stats.map((s, i) => (
            <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 text-center hover:bg-white/10 transition-colors">
              <div className="text-3xl font-bold text-white">{s.value}</div>
              <div className="text-sm font-medium text-orange-300 mt-1">{s.label}</div>
              <div className="text-xs text-slate-400 mt-0.5">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Frequency Bar Chart ── */
function FreqChart() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-bold text-slate-800 mb-2 flex items-center gap-2">
        <TrendingUp className="w-6 h-6 text-orange-500" />
        八股题频率分布
      </h2>
      <p className="text-sm text-slate-500 mb-6">按主题统计出现次数（基于220道八股题）</p>
      <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={baguFreqDistribution} layout="vertical" margin={{ left: 20, right: 30 }}>
            <XAxis type="number" tick={{ fontSize: 12, fill: '#64748b' }} />
            <YAxis type="category" dataKey="name" width={110} tick={{ fontSize: 13, fill: '#334155' }} />
            <Tooltip
              contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 13 }}
              formatter={(v) => [`${v} 题`, '出现次数']}
            />
            <Bar dataKey="count" radius={[0, 6, 6, 0]} barSize={22}>
              {baguFreqDistribution.map((d, i) => (
                <Cell key={i} fill={d.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}

/* ── Difficulty & Relation Stats ── */
function StatsRow() {
  return (
    <section className="max-w-7xl mx-auto px-6 pb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Difficulty Pie */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-amber-500" />
            难度分布
          </h3>
          <div className="flex items-center gap-6">
            <ResponsiveContainer width={180} height={180}>
              <PieChart>
                <Pie data={baguDiffDistribution} dataKey="value" cx="50%" cy="50%" innerRadius={45} outerRadius={80} paddingAngle={3}>
                  {baguDiffDistribution.map((d, i) => (
                    <Cell key={i} fill={d.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 10, fontSize: 12 }} formatter={(v) => [`${v}%`, '占比']} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-3">
              {baguDiffDistribution.map((d, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }} />
                  <div>
                    <span className="text-sm font-semibold text-slate-700">{d.name}</span>
                    <span className="text-sm text-slate-400 ml-2">{d.value}%</span>
                    <div className="text-xs text-slate-400">{d.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Relation to Projects */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-500" />
            八股 vs 项目追问关系
          </h3>
          <div className="space-y-4">
            {baguProjectRelation.map((r, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-slate-700">{r.type}</span>
                  <span className="text-sm font-bold text-slate-800">{r.percent}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3">
                  <div
                    className="h-3 rounded-full transition-all"
                    style={{
                      width: `${r.percent}%`,
                      backgroundColor: i === 0 ? '#6366f1' : i === 1 ? '#f59e0b' : '#10b981',
                    }}
                  />
                </div>
                <p className="text-xs text-slate-400 mt-1">{r.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-amber-50 border border-amber-100 rounded-xl text-xs text-amber-700">
            💡 65% 的八股知识是从项目追问中自然引出的，说明"项目深度"直接决定了八股考察的深度。
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Topic Detail Card (expandable) ── */
function TopicCard({ topic }) {
  const [expanded, setExpanded] = useState(false)
  const colorMap = {
    indigo: { bg: 'bg-indigo-50', border: 'border-indigo-100', text: 'text-indigo-700', badge: 'bg-indigo-100 text-indigo-700', bar: '#6366f1' },
    sky: { bg: 'bg-sky-50', border: 'border-sky-100', text: 'text-sky-700', badge: 'bg-sky-100 text-sky-700', bar: '#0ea5e9' },
    violet: { bg: 'bg-violet-50', border: 'border-violet-100', text: 'text-violet-700', badge: 'bg-violet-100 text-violet-700', bar: '#8b5cf6' },
    fuchsia: { bg: 'bg-fuchsia-50', border: 'border-fuchsia-100', text: 'text-fuchsia-700', badge: 'bg-fuchsia-100 text-fuchsia-700', bar: '#d946ef' },
    amber: { bg: 'bg-amber-50', border: 'border-amber-100', text: 'text-amber-700', badge: 'bg-amber-100 text-amber-700', bar: '#f59e0b' },
    emerald: { bg: 'bg-emerald-50', border: 'border-emerald-100', text: 'text-emerald-700', badge: 'bg-emerald-100 text-emerald-700', bar: '#10b981' },
    teal: { bg: 'bg-teal-50', border: 'border-teal-100', text: 'text-teal-700', badge: 'bg-teal-100 text-teal-700', bar: '#14b8a6' },
    cyan: { bg: 'bg-cyan-50', border: 'border-cyan-100', text: 'text-cyan-700', badge: 'bg-cyan-100 text-cyan-700', bar: '#06b6d4' },
    rose: { bg: 'bg-rose-50', border: 'border-rose-100', text: 'text-rose-700', badge: 'bg-rose-100 text-rose-700', bar: '#f43f5e' },
    orange: { bg: 'bg-orange-50', border: 'border-orange-100', text: 'text-orange-700', badge: 'bg-orange-100 text-orange-700', bar: '#f97316' },
    pink: { bg: 'bg-pink-50', border: 'border-pink-100', text: 'text-pink-700', badge: 'bg-pink-100 text-pink-700', bar: '#ec4899' },
    slate: { bg: 'bg-slate-50', border: 'border-slate-100', text: 'text-slate-700', badge: 'bg-slate-200 text-slate-700', bar: '#64748b' },
    lime: { bg: 'bg-lime-50', border: 'border-lime-100', text: 'text-lime-700', badge: 'bg-lime-100 text-lime-700', bar: '#84cc16' },
  }
  const c = colorMap[topic.color] || colorMap.slate

  const freqStars = '★'.repeat(topic.frequency) + '☆'.repeat(5 - topic.frequency)

  const diffColor = (d) => d === '高' ? 'bg-red-100 text-red-700' : d === '中' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'

  return (
    <div className={`bg-white rounded-2xl border ${c.border} shadow-sm overflow-hidden transition-all`}>
      {/* Header */}
      <button
        className="w-full px-6 py-5 flex items-center justify-between hover:bg-slate-50/50 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-4">
          <span className="text-3xl">{topic.icon}</span>
          <div className="text-left">
            <h3 className="text-lg font-bold text-slate-800">{topic.area}</h3>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-sm text-amber-500 tracking-wider">{freqStars}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${c.badge}`}>
                {topic.difficultyTag}
              </span>
              <span className="text-xs text-slate-400">{topic.questions.length} 道真题</span>
            </div>
          </div>
        </div>
        {expanded ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
      </button>

      {/* Expanded Content */}
      {expanded && (
        <div className="px-6 pb-6 border-t border-slate-100">
          {/* Summary */}
          <div className={`mt-4 p-4 ${c.bg} rounded-xl`}>
            <p className={`text-sm ${c.text}`}>{topic.summary}</p>
          </div>

          {/* Questions Table */}
          <div className="mt-5">
            <h4 className="text-sm font-semibold text-slate-700 mb-3">📝 面试真题</h4>
            <div className="space-y-2">
              {topic.questions.map((q, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-xs font-mono text-slate-400 mt-0.5 shrink-0">{String(i + 1).padStart(2, '0')}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-700 leading-relaxed">"{q.q}"</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className={`text-xs px-1.5 py-0.5 rounded ${diffColor(q.difficulty)}`}>
                        {q.difficulty === '高' ? '⚡高' : q.difficulty === '中' ? '📗中' : '🟢易'}
                      </span>
                      <span className="text-xs text-slate-400">#{q.tag}</span>
                      <span className="text-xs text-slate-300">·</span>
                      <span className="text-xs text-slate-400">出现 {q.freq} 次</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Points */}
          <div className="mt-5">
            <h4 className="text-sm font-semibold text-slate-700 mb-3">🔑 核心要点</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {topic.keyPoints.map((kp, i) => (
                <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-emerald-50 border border-emerald-100">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-xs text-emerald-800 leading-relaxed">{kp}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* ── All Topics Section ── */
function TopicsSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 pb-12">
      <h2 className="text-2xl font-bold text-slate-800 mb-2 flex items-center gap-2">
        <Zap className="w-6 h-6 text-amber-500" />
        分主题详解
      </h2>
      <p className="text-sm text-slate-500 mb-6">点击展开查看每个主题的真题、难度和核心要点</p>
      <div className="space-y-4">
        {baguTopics.map((t) => (
          <TopicCard key={t.id} topic={t} />
        ))}
      </div>
    </section>
  )
}

/* ── Common Mistakes Section ── */
function MistakesSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 pb-12">
      <h2 className="text-2xl font-bold text-slate-800 mb-2 flex items-center gap-2">
        <AlertTriangle className="w-6 h-6 text-red-500" />
        高频易错点
      </h2>
      <p className="text-sm text-slate-500 mb-6">基于面试中被纠正或回答不佳的真实案例总结</p>
      <div className="space-y-4">
        {baguCommonMistakes.map((m, i) => (
          <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                m.severity === 'high' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
              }`}>
                {m.severity === 'high' ? '🔴 高危' : '🟡 中危'}
              </span>
              <h3 className="font-bold text-slate-800">{m.topic}</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3 bg-red-50 border border-red-100 rounded-xl">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <XCircle className="w-4 h-4 text-red-500" />
                  <span className="text-xs font-semibold text-red-700">常见错误</span>
                </div>
                <p className="text-sm text-red-800 leading-relaxed">{m.mistake}</p>
              </div>
              <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span className="text-xs font-semibold text-emerald-700">正确理解</span>
                </div>
                <p className="text-sm text-emerald-800 leading-relaxed">{m.correct}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ── Footer Note ── */
function BaguFooter() {
  return (
    <section className="max-w-7xl mx-auto px-6 pb-16">
      <div className="p-6 bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl border border-orange-100 text-center">
        <h3 className="text-xl font-bold text-orange-800 mb-2">备考建议</h3>
        <p className="text-sm text-orange-700 max-w-2xl mx-auto leading-relaxed">
          八股题不是死记硬背，65%的八股知识是从项目追问中自然引出的。
          最好的准备方式是：深入理解每个项目的技术选型背后的原理，能做到"由项目到知识"的自然衍生。
          面试官考察的不是你背了多少，而是你是否真正理解了"为什么"。
        </p>
        <div className="mt-3 text-xs text-orange-500">—— <a href="https://space.bilibili.com/441302483" target="_blank" rel="noopener noreferrer" className="hover:text-orange-300 underline underline-offset-2 transition-colors">凶猛肱二头</a>，220道八股题的亲历者</div>
      </div>
    </section>
  )
}

/* ── Main Page ── */
export default function BaguPage() {
  return (
    <div>
      <BaguHero />
      <FreqChart />
      <StatsRow />
      <TopicsSection />
      <MistakesSection />
      <BaguFooter />
    </div>
  )
}
