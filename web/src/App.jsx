import { useState } from 'react'
import './App.css'
import GuidePage from './GuidePage'
import BaguPage from './BaguPage'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from 'recharts'
import {
  Target, BookOpen, Layers, Zap, Users, TrendingUp,
  ChevronDown, ChevronRight, Award, AlertTriangle, CheckCircle2,
  Building2, GraduationCap, Briefcase, MessageSquare, Code2,
  BarChart3, PieChart as PieChartIcon, FileText, Star,
} from 'lucide-react'
import {
  overviewStats, categoryDistribution, categoryDistributionClean,
  roundDistribution, companyData, baguKnowledge, projectDeepDive,
  companyStyles, candidateStrengths, candidateWeaknesses,
  keyFindings, recommendations, hrQuestions, bqQuestions,
  systemDesignQuestions,
} from './data'

const ICON_MAP = {
  target: Target, book: BookOpen, layers: Layers, zap: Zap, users: Users, trending: TrendingUp,
}

/* ── Reusable Components ── */

function SectionTitle({ icon: Icon, title, subtitle }) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-2">
        {Icon && <Icon className="w-7 h-7 text-indigo-500" />}
        <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
      </div>
      {subtitle && <p className="text-slate-500 ml-10">{subtitle}</p>}
    </div>
  )
}

function StatCard({ label, value, sub, color = 'indigo' }) {
  const colors = {
    indigo: 'from-indigo-500 to-indigo-600',
    amber: 'from-amber-500 to-amber-600',
    emerald: 'from-emerald-500 to-emerald-600',
    rose: 'from-rose-500 to-rose-600',
    violet: 'from-violet-500 to-violet-600',
  }
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-shadow">
      <div className="text-sm font-medium text-slate-500 mb-2">{label}</div>
      <div className={`text-3xl font-bold bg-gradient-to-r ${colors[color]} bg-clip-text text-transparent`}>
        {value}
      </div>
      {sub && <div className="text-xs text-slate-400 mt-1">{sub}</div>}
    </div>
  )
}

function FreqStars({ count }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`w-3.5 h-3.5 ${i < count ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`} />
      ))}
    </div>
  )
}

function NavItem({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
        active
          ? 'bg-indigo-500 text-white shadow-md shadow-indigo-200'
          : 'text-slate-600 hover:bg-slate-100'
      }`}
    >
      {label}
    </button>
  )
}

/* ── Section 1: Hero / Overview ── */
function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl" />
      <div className="relative max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm text-indigo-200 mb-6">
            <FileText className="w-4 h-4" />
            基于 52 场面试录音转录文本的全面分析
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white via-indigo-200 to-violet-200 bg-clip-text text-transparent leading-tight">
            面试行为系统性研究报告
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            作者：<a href="https://space.bilibili.com/441302483" target="_blank" rel="noopener noreferrer" className="text-indigo-300 hover:text-white underline underline-offset-2 transition-colors">凶猛肱二头</a> | NLP / 大模型 / CV
          </p>
          <div className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 bg-amber-500/10 border border-amber-400/20 rounded-lg text-xs text-amber-200">
            ⚠️ 本报告中的公司名称均已做模糊化处理（公司A~V），实际覆盖互联网大厂、车企、AI创业公司、芯片厂等大中小企业，为防定位故做匿名处理。
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: '总面试场次', value: overviewStats.totalInterviews, suffix: '场' },
            { label: '涉及公司', value: overviewStats.totalCompanies, suffix: '家' },
            { label: '提取问题', value: overviewStats.totalQuestions.toLocaleString(), suffix: '条' },
            { label: '对话轮次', value: overviewStats.totalTurns.toLocaleString(), suffix: '轮' },
            { label: '总文本量', value: '65万', suffix: '字' },
          ].map((s, i) => (
            <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 text-center hover:bg-white/10 transition-colors">
              <div className="text-3xl font-bold text-white">{s.value}<span className="text-lg text-indigo-300 ml-1">{s.suffix}</span></div>
              <div className="text-sm text-slate-400 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Section 2: Question Category Distribution ── */
function CategorySection() {
  const RADIAN = Math.PI / 180
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)
    if (percent < 0.04) return null
    return (
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight="bold">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <SectionTitle icon={PieChartIcon} title="面试问题分类全景" subtitle="1,686 条面试官发言的分类统计" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">问题类型分布</h3>
          <ResponsiveContainer width="100%" height={360}>
            <PieChart>
              <Pie data={categoryDistribution} cx="50%" cy="50%" labelLine={false} label={renderCustomizedLabel}
                outerRadius={150} dataKey="value" strokeWidth={2} stroke="#fff">
                {categoryDistribution.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value, name) => [`${value} 条`, name]} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            {categoryDistribution.map((c, i) => (
              <div key={i} className="flex items-center gap-1.5 text-xs text-slate-600">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: c.color }} />
                {c.name}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">分类问题详情（不含追问）</h3>
          <ResponsiveContainer width="100%" height={360}>
            <BarChart data={categoryDistributionClean} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis type="number" tick={{ fontSize: 12 }} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} width={120} />
              <Tooltip formatter={(value) => [`${value} 条`, '数量']} />
              <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={28}>
                {categoryDistributionClean.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 p-4 bg-indigo-50 rounded-xl text-sm text-indigo-700">
            <strong>说明：</strong>"未分类"中的 1,106 条绝大多数为面试官基于候选人回答的即时追问，本质属于技术讨论延伸。实际技术相关问题占比超 80%。
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Section 3: Round Distribution ── */
function RoundSection() {
  return (
    <section className="bg-slate-100/50 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle icon={Briefcase} title="面试轮次分布" subtitle="技术面（一面+二面+三面）占总面试的 75%" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie data={roundDistribution} cx="50%" cy="50%" innerRadius={70} outerRadius={130}
                  dataKey="value" paddingAngle={3} strokeWidth={0}>
                  {roundDistribution.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [`${value} 场`, name]} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap justify-center gap-3 mt-2">
              {roundDistribution.map((c, i) => (
                <div key={i} className="flex items-center gap-1.5 text-xs text-slate-600">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: c.color }} />
                  {c.name} ({c.value})
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            {[
              { label: '技术面（一/二/三面）', value: '39场', pct: 75, color: 'bg-indigo-500' },
              { label: 'HR面', value: '5场', pct: 9.6, color: 'bg-pink-500' },
              { label: 'CEO/CTO面', value: '2场', pct: 3.8, color: 'bg-amber-500' },
              { label: '群面', value: '1场', pct: 1.9, color: 'bg-emerald-500' },
              { label: '其他（加面等）', value: '5场', pct: 9.6, color: 'bg-slate-400' },
            ].map((r, i) => (
              <div key={i} className="bg-white rounded-xl p-4 border border-slate-100">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700">{r.label}</span>
                  <span className="text-sm font-bold text-slate-900">{r.value} ({r.pct}%)</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5">
                  <div className={`${r.color} h-2.5 rounded-full transition-all`} style={{ width: `${r.pct}%` }} />
                </div>
              </div>
            ))}
            <div className="p-4 bg-amber-50 rounded-xl text-sm text-amber-800 border border-amber-100">
              <strong>核心发现：</strong>技术面是面试绝对主体。HR面和高管面合计仅占约15%。
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Section 4: Company Comparison ── */
function CompanySection() {
  const top12 = companyData.slice(0, 12)
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <SectionTitle icon={Building2} title="各公司面试问题数量对比" subtitle="按总问题数排序，展示分类构成" />
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-8">
        <ResponsiveContainer width="100%" height={420}>
          <BarChart data={top12} margin={{ bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="company" tick={{ fontSize: 11 }} angle={-30} textAnchor="end" height={80} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="项目深挖" stackId="a" fill="#6366f1" radius={[0, 0, 0, 0]} />
            <Bar dataKey="八股文" stackId="a" fill="#f59e0b" />
            <Bar dataKey="HR/BQ" stackId="a" fill="#ec4899" />
            <Bar dataKey="系统设计" stackId="a" fill="#ef4444" />
            <Bar dataKey="开放" stackId="a" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <div className="flex flex-wrap justify-center gap-4 mt-2">
          {[
            { name: '项目深挖', color: '#6366f1' },
            { name: '八股文', color: '#f59e0b' },
            { name: 'HR/BQ', color: '#ec4899' },
            { name: '系统设计', color: '#ef4444' },
            { name: '开放', color: '#10b981' },
          ].map((l, i) => (
            <div key={i} className="flex items-center gap-1.5 text-xs text-slate-600">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: l.color }} />
              {l.name}
            </div>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50">
              <th className="text-left p-3 rounded-l-lg font-semibold text-slate-600">公司</th>
              <th className="p-3 font-semibold text-slate-600">场次</th>
              <th className="p-3 font-semibold text-slate-600">轮次</th>
              <th className="p-3 font-semibold text-slate-600">总问题</th>
              <th className="p-3 font-semibold text-indigo-600">项目深挖</th>
              <th className="p-3 font-semibold text-amber-600">八股文</th>
              <th className="p-3 font-semibold text-pink-600">HR/BQ</th>
              <th className="p-3 font-semibold text-red-600">系统设计</th>
              <th className="p-3 rounded-r-lg font-semibold text-emerald-600">开放</th>
            </tr>
          </thead>
          <tbody>
            {companyData.map((c, i) => (
              <tr key={i} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                <td className="p-3 font-medium text-slate-800">{c.company}</td>
                <td className="p-3 text-center text-slate-600">{c.sessions}</td>
                <td className="p-3 text-center text-slate-500 text-xs">{c.rounds}</td>
                <td className="p-3 text-center font-bold text-slate-800">{c.total}</td>
                <td className="p-3 text-center text-indigo-600 font-medium">{c.项目深挖}</td>
                <td className="p-3 text-center text-amber-600 font-medium">{c.八股文}</td>
                <td className="p-3 text-center text-pink-600 font-medium">{c['HR/BQ']}</td>
                <td className="p-3 text-center text-red-600 font-medium">{c.系统设计}</td>
                <td className="p-3 text-center text-emerald-600 font-medium">{c.开放}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

/* ── Section 5: 八股文 Knowledge Map ── */
function BaguSection() {
  const areaColors = {
    '大模型训练与微调': 'border-indigo-200 bg-indigo-50',
    '大模型推理与部署': 'border-amber-200 bg-amber-50',
    'NLP基础与RAG': 'border-emerald-200 bg-emerald-50',
    '经典ML/DL基础': 'border-rose-200 bg-rose-50',
  }
  const areaIconColors = {
    '大模型训练与微调': 'text-indigo-500',
    '大模型推理与部署': 'text-amber-500',
    'NLP基础与RAG': 'text-emerald-500',
    '经典ML/DL基础': 'text-rose-500',
  }

  return (
    <section className="bg-slate-100/50 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle icon={BookOpen} title="八股文/基础知识考察图谱" subtitle="220 条八股文问题覆盖的知识领域" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {baguKnowledge.map((area, ai) => (
            <div key={ai} className={`rounded-2xl border p-6 ${areaColors[area.area] || 'bg-white border-slate-200'}`}>
              <h3 className={`text-lg font-bold mb-4 ${areaIconColors[area.area] || 'text-slate-800'}`}>
                {area.area}
              </h3>
              <div className="space-y-3">
                {area.items.map((item, ii) => (
                  <div key={ii} className="bg-white/80 rounded-xl p-3.5 backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-medium text-slate-800 text-sm">{item.topic}</span>
                      <FreqStars count={item.freq} />
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">{item.example}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-4">八股文考察趋势</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: '"新八股"已取代传统八股', desc: 'SFT、RLHF、知识蒸馏、GRPO/DAPO、量化、vLLM 为高频考点。CNN/RNN/SVM 几乎不出现。', icon: '🔄' },
              { title: '八股文与项目深度绑定', desc: '大多数八股不是孤立提问，而是在项目追问中自然引出。', icon: '🔗' },
              { title: '量化知识考察很细', desc: '某大厂一面追问到"对称vs非对称""per-token vs per-channel"粒度。', icon: '🔬' },
              { title: 'RAG工程细节是高频', desc: '多路召回、chunk策略、query改写、rerank 等被反复追问。', icon: '📚' },
              { title: '编程题出现但不多', desc: '约出现在部分大厂（LRU缓存、动态规划）等少数面试中。', icon: '💻' },
              { title: 'Transformer几乎不单独考', desc: 'Attention等在项目追问中涉及，但不再作为独立八股题。', icon: '🧩' },
            ].map((t, i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="text-2xl mb-2">{t.icon}</div>
                <div className="font-semibold text-slate-800 text-sm mb-1">{t.title}</div>
                <div className="text-xs text-slate-500 leading-relaxed">{t.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Section 6: Project Deep Dive ── */
function ProjectSection() {
  const [expandedProject, setExpandedProject] = useState(0)

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <SectionTitle icon={Code2} title="项目深挖专题" subtitle="面试官追问每个项目的核心角度与典型问题" />

      <div className="mb-8 p-5 bg-gradient-to-r from-indigo-50 to-violet-50 rounded-2xl border border-indigo-100">
        <h3 className="font-bold text-indigo-800 mb-3">面试官追问模式</h3>
        <div className="flex flex-wrap gap-2">
          {['项目概述', '业务理解', '技术方案', '数据细节', '效果指标', '深挖细节', '工程部署'].map((step, i) => (
            <div key={i} className="flex items-center gap-1">
              <div className="px-3 py-1.5 bg-white rounded-lg text-sm font-medium text-indigo-700 shadow-sm border border-indigo-100">
                {i + 1}. {step}
              </div>
              {i < 6 && <ChevronRight className="w-4 h-4 text-indigo-300" />}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {projectDeepDive.map((proj, pi) => (
          <div key={pi} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <button
              onClick={() => setExpandedProject(expandedProject === pi ? -1 : pi)}
              className="w-full flex items-center justify-between p-5 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className={`w-2 h-8 rounded-full ${i < proj.depth ? 'bg-indigo-500' : 'bg-slate-200'}`} />
                  ))}
                </div>
                <div className="text-left">
                  <div className="font-bold text-slate-800">{proj.project}</div>
                  <div className="text-sm text-slate-500">被提及 {proj.mentionCount} | {proj.aspects.length} 个追问维度</div>
                </div>
              </div>
              <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${expandedProject === pi ? 'rotate-180' : ''}`} />
            </button>
            {expandedProject === pi && (
              <div className="px-5 pb-5 border-t border-slate-100">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-4">
                  {proj.aspects.map((a, ai) => (
                    <div key={ai} className="bg-slate-50 rounded-xl p-4">
                      <div className="font-semibold text-indigo-600 text-sm mb-2 flex items-center gap-1.5">
                        <Target className="w-3.5 h-3.5" />
                        {a.angle}
                      </div>
                      <ul className="space-y-1.5">
                        {a.questions.map((q, qi) => (
                          <li key={qi} className="text-xs text-slate-600 flex items-start gap-1.5">
                            <MessageSquare className="w-3 h-3 text-slate-400 mt-0.5 shrink-0" />
                            {q}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

/* ── Section 7: System Design + BQ + HR ── */
function SpecialTopicsSection() {
  return (
    <section className="bg-slate-100/50 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* System Design */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <div className="flex items-center gap-2 mb-5">
              <div className="p-2 bg-red-50 rounded-lg"><Layers className="w-5 h-5 text-red-500" /></div>
              <h3 className="font-bold text-slate-800">系统设计/场景题</h3>
              <span className="ml-auto text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded-full font-medium">23题</span>
            </div>
            <div className="space-y-3">
              {systemDesignQuestions.map((q, i) => (
                <div key={i} className="p-3 bg-slate-50 rounded-xl">
                  <div className="text-xs text-red-500 font-medium mb-1">{q.company}</div>
                  <div className="text-sm text-slate-700">{q.question}</div>
                </div>
              ))}
            </div>
          </div>

          {/* BQ */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <div className="flex items-center gap-2 mb-5">
              <div className="p-2 bg-violet-50 rounded-lg"><Users className="w-5 h-5 text-violet-500" /></div>
              <h3 className="font-bold text-slate-800">行为面试(BQ)</h3>
              <span className="ml-auto text-xs bg-violet-50 text-violet-600 px-2 py-0.5 rounded-full font-medium">52题</span>
            </div>
            <div className="space-y-3">
              {bqQuestions.map((q, i) => (
                <div key={i} className="p-3 bg-slate-50 rounded-xl">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-slate-800">{q.topic}</span>
                    <FreqStars count={q.freq} />
                  </div>
                  <div className="text-xs text-slate-500">{q.example}</div>
                </div>
              ))}
            </div>
          </div>

          {/* HR */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <div className="flex items-center gap-2 mb-5">
              <div className="p-2 bg-pink-50 rounded-lg"><GraduationCap className="w-5 h-5 text-pink-500" /></div>
              <h3 className="font-bold text-slate-800">HR问题</h3>
              <span className="ml-auto text-xs bg-pink-50 text-pink-600 px-2 py-0.5 rounded-full font-medium">65题</span>
            </div>
            <div className="space-y-3">
              {hrQuestions.map((q, i) => (
                <div key={i} className="p-3 bg-slate-50 rounded-xl">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-slate-800">{q.topic}</span>
                    <FreqStars count={q.freq} />
                  </div>
                  <div className="text-xs text-slate-500">{q.example}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Section 8: Company Interview Style ── */
function CompanyStyleSection() {
  const typeColors = {
    bigtech: { bg: 'bg-blue-50', border: 'border-blue-200', badge: 'bg-blue-100 text-blue-700', label: '大厂' },
    startup: { bg: 'bg-purple-50', border: 'border-purple-200', badge: 'bg-purple-100 text-purple-700', label: '创业公司' },
    industry: { bg: 'bg-amber-50', border: 'border-amber-200', badge: 'bg-amber-100 text-amber-700', label: '行业公司' },
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <SectionTitle icon={Building2} title="公司面试风格对比" subtitle="不同公司的面试策略与侧重点" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {companyStyles.map((cs, i) => {
          const tc = typeColors[cs.type]
          return (
            <div key={i} className={`rounded-2xl border p-5 ${tc.bg} ${tc.border} hover:shadow-md transition-shadow`}>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${tc.badge}`}>{tc.label}</span>
                  <h4 className="text-lg font-bold text-slate-800 mt-1">{cs.company}</h4>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-slate-800">{cs.questionCount}</div>
                  <div className="text-xs text-slate-500">问题</div>
                </div>
              </div>
              <div className="text-sm text-slate-600 mb-2">
                <span className="font-medium">{cs.sessions}</span> · 风格: <span className="font-semibold text-slate-800">{cs.style}</span>
              </div>
              <div className="text-xs text-slate-500 mb-3">技术问题占比 {cs.techRatio}</div>
              <ul className="space-y-1.5">
                {cs.features.map((f, fi) => (
                  <li key={fi} className="text-xs text-slate-600 flex items-start gap-1.5">
                    <ChevronRight className="w-3 h-3 text-slate-400 mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </section>
  )
}

/* ── Section 9: Candidate Performance ── */
function CandidateSection() {
  return (
    <section className="bg-slate-100/50 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle icon={Award} title="面试者表现分析" subtitle="基于 52 场面试的综合表现评估" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="flex items-center gap-2 text-lg font-bold text-emerald-700 mb-4">
              <CheckCircle2 className="w-5 h-5" /> 核心优势
            </h3>
            <div className="space-y-3">
              {candidateStrengths.map((s, i) => (
                <div key={i} className="bg-white rounded-xl p-4 border border-emerald-100 shadow-sm">
                  <div className="font-semibold text-slate-800 text-sm mb-1">{s.title}</div>
                  <div className="text-xs text-slate-500">{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="flex items-center gap-2 text-lg font-bold text-amber-700 mb-4">
              <AlertTriangle className="w-5 h-5" /> 可改进之处
            </h3>
            <div className="space-y-3">
              {candidateWeaknesses.map((w, i) => (
                <div key={i} className="bg-white rounded-xl p-4 border border-amber-100 shadow-sm">
                  <div className="font-semibold text-slate-800 text-sm mb-1">{w.title}</div>
                  <div className="text-xs text-slate-500">{w.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-4">面试官反馈信号</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="text-sm font-semibold text-emerald-600 mb-3">✅ 积极信号</div>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2"><span className="text-emerald-500">•</span>"觉得这思路挺好"（公司H一面）</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500">•</span>"这确实还是很有价值的一段经历"（公司I HR面）</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500">•</span>面试官主动类比自家业务场景</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500">•</span>多家公司进入HR面/加面，通过率高</li>
              </ul>
            </div>
            <div>
              <div className="text-sm font-semibold text-amber-600 mb-3">⚠️ 需注意信号</div>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2"><span className="text-amber-500">•</span>"AWQ不是这样"（公司N一面，知识被纠正）</li>
                <li className="flex items-start gap-2"><span className="text-amber-500">•</span>"你没有回答我的问题"（公司C一面）</li>
                <li className="flex items-start gap-2"><span className="text-amber-500">•</span>"你没有注意到这个pattern吗？"（公司I CEO面）</li>
                <li className="flex items-start gap-2"><span className="text-amber-500">•</span>多次被打断，表达需更简洁</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Section 10: Key Findings & Recommendations ── */
function FindingsSection() {
  const priorityColors = {
    high: 'border-red-200 bg-red-50 text-red-700',
    medium: 'border-amber-200 bg-amber-50 text-amber-700',
    low: 'border-green-200 bg-green-50 text-green-700',
  }
  const priorityLabels = { high: '高优先级', medium: '中优先级', low: '低优先级' }

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <SectionTitle icon={TrendingUp} title="关键发现与建议" subtitle="核心结论与可执行的改进建议" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
        {keyFindings.map((f, i) => {
          const Icon = ICON_MAP[f.icon] || Target
          return (
            <div key={i} className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="p-2.5 bg-indigo-50 rounded-xl w-fit mb-3">
                <Icon className="w-5 h-5 text-indigo-500" />
              </div>
              <h4 className="font-bold text-slate-800 mb-2">{f.title}</h4>
              <p className="text-sm text-slate-500">{f.desc}</p>
            </div>
          )
        })}
      </div>

      <h3 className="text-xl font-bold text-slate-900 mb-6">改进建议清单</h3>
      <div className="space-y-3">
        {recommendations.map((r, i) => (
          <div key={i} className="bg-white rounded-xl border border-slate-100 p-4 flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow">
            <span className={`text-xs px-2.5 py-1 rounded-full font-medium border shrink-0 mt-0.5 ${priorityColors[r.priority]}`}>
              {priorityLabels[r.priority]}
            </span>
            <div>
              <div className="font-semibold text-slate-800 text-sm">{r.title}</div>
              <div className="text-xs text-slate-500 mt-0.5">{r.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ── Footer ── */
function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-8">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-sm">本报告基于 52 份面试录音转录文本自动解析 + 人工审读生成</p>
        <p className="text-xs mt-2 text-slate-500">由于语音转文字存在一定误差，个别内容可能与原意有偏差</p>
        <p className="text-xs mt-1 text-amber-400/70">⚠️ 报告中所有公司名称均已模糊化处理（公司A~V），覆盖互联网大厂/车企/AI创业/芯片厂等大中小企业，为防定位故做匿名处理</p>
      </div>
    </footer>
  )
}

/* ── Page-level Tab Switcher ── */
function PageSwitcher({ currentPage, onSwitch }) {
  return (
    <div className="sticky top-0 z-[60]">
      {/* 飞书资料文档横幅 */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white text-center py-2.5 px-4">
        <a href="https://my.feishu.cn/wiki/XGkRwrugwisqaokx909caQ4anEb" target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 hover:opacity-90 transition-opacity">
          <span className="text-lg font-bold tracking-wide">📚 大模型算法岗面试资料库 — 点击进入飞书文档</span>
          <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">免费获取 →</span>
        </a>
      </div>
      {/* 导航栏 */}
      <div className="bg-slate-900/95 backdrop-blur-lg border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-6 flex items-center">
          <div className="flex items-center gap-2 mr-6 shrink-0 py-3">
            <BarChart3 className="w-5 h-5 text-indigo-400" />
            <a href="https://space.bilibili.com/441302483" target="_blank" rel="noopener noreferrer" className="font-bold text-white text-sm hover:text-indigo-300 transition-colors">凶猛肱二头</a>
          </div>
          <div className="flex gap-1">
            {[
              { key: 'report', label: '📊 面试分析报告', color: 'indigo' },
              { key: 'guide', label: '📖 大模型面试指南', color: 'emerald' },
              { key: 'bagu', label: '📝 八股专题', color: 'orange' },
            ].map((p) => (
              <button key={p.key} onClick={() => onSwitch(p.key)}
                className={`px-4 py-2.5 text-sm font-medium transition-all rounded-t-lg ${
                  currentPage === p.key
                    ? `bg-slate-50 text-slate-900`
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}>
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Report Sub-Navigation ── */
function Navigation({ activeSection, onNavigate }) {
  const sections = [
    '概览', '问题分类', '面试轮次', '公司对比', '八股文', '项目深挖', '专题分析', '公司风格', '表现分析', '发现与建议'
  ]
  return (
    <nav className="sticky top-[89px] z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-1 py-2 overflow-x-auto no-scrollbar">
          {sections.map((s, i) => (
            <NavItem key={i} label={s} active={activeSection === i} onClick={() => onNavigate(i)} />
          ))}
        </div>
      </div>
    </nav>
  )
}

/* ── Report Page (original dashboard) ── */
function ReportPage() {
  const [activeSection, setActiveSection] = useState(0)
  const sectionIds = [
    'hero', 'category', 'round', 'company', 'bagu', 'project', 'special', 'style', 'candidate', 'findings'
  ]

  const handleNavigate = (index) => {
    setActiveSection(index)
    const el = document.getElementById(sectionIds[index])
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <div id="hero"><HeroSection /></div>
      <Navigation activeSection={activeSection} onNavigate={handleNavigate} />
      <div id="category"><CategorySection /></div>
      <div id="round"><RoundSection /></div>
      <div id="company"><CompanySection /></div>
      <div id="bagu"><BaguSection /></div>
      <div id="project"><ProjectSection /></div>
      <div id="special"><SpecialTopicsSection /></div>
      <div id="style"><CompanyStyleSection /></div>
      <div id="candidate"><CandidateSection /></div>
      <div id="findings"><FindingsSection /></div>
      <Footer />
    </>
  )
}

/* ── Main App ── */
function App() {
  const [currentPage, setCurrentPage] = useState('report')

  const handleSwitch = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen">
      <PageSwitcher currentPage={currentPage} onSwitch={handleSwitch} />
      {currentPage === 'report' && <ReportPage />}
      {currentPage === 'guide' && <GuidePage />}
      {currentPage === 'bagu' && <BaguPage />}
    </div>
  )
}

export default App
