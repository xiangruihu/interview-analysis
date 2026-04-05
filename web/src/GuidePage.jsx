import { useState } from 'react'
import {
  Target, BookOpen, Layers, Zap, Users, TrendingUp, ChevronRight,
  AlertTriangle, CheckCircle2, Shield, Clock, Flame, Brain,
  MessageSquare, Star, ListChecks, Calendar, ArrowRight,
  BookMarked, Lightbulb, CircleAlert, SquareCheckBig, Square,
} from 'lucide-react'
import {
  guideOverview, interviewFlow, mustKnowTopics, projectPrepGuide,
  projectChecklist, systemDesignGuide, hrBqGuide, commonTraps,
  weeklyPlan,
} from './GuideData'

function FreqStars({ count }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`w-3 h-3 ${i < count ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`} />
      ))}
    </div>
  )
}

/* ── Hero ── */
function GuideHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-teal-950 to-slate-900 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-emerald-500/20 via-transparent to-transparent" />
      <div className="absolute top-0 left-1/2 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
      <div className="relative max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm text-emerald-200 mb-6">
            <BookMarked className="w-4 h-4" />
            基于 52 场真实面试、1,686 道题目的深度复盘
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white via-emerald-200 to-teal-200 bg-clip-text text-transparent leading-tight">
            {guideOverview.title}
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            作者：<a href="https://space.bilibili.com/441302483" target="_blank" rel="noopener noreferrer" className="text-emerald-300 hover:text-white underline underline-offset-2 transition-colors">{guideOverview.author}</a> · 一份来自秋招战场的实战经验总结
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {guideOverview.stats.map((s, i) => (
            <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 text-center hover:bg-white/10 transition-colors">
              <div className="text-3xl font-bold text-white">{s.value}</div>
              <div className="text-sm font-medium text-emerald-300 mt-1">{s.label}</div>
              <div className="text-xs text-slate-400 mt-0.5">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Interview Flow ── */
function FlowSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <ArrowRight className="w-7 h-7 text-emerald-500" />
          <h2 className="text-2xl font-bold text-slate-900">面试流程全景</h2>
        </div>
        <p className="text-slate-500 ml-10">每个阶段的重点与应对策略</p>
      </div>

      <div className="relative">
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-300 via-teal-300 to-slate-200 hidden md:block" />
        <div className="space-y-6">
          {interviewFlow.map((stage, i) => (
            <div key={i} className="relative md:pl-16">
              <div className="hidden md:flex absolute left-0 top-4 w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 items-center justify-center text-white font-bold text-lg shadow-lg shadow-emerald-200 z-10">
                {i + 1}
              </div>
              <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <span className="md:hidden flex w-8 h-8 rounded-full bg-emerald-500 items-center justify-center text-white font-bold text-sm">{i + 1}</span>
                  <h3 className="text-lg font-bold text-slate-800">{stage.stage}</h3>
                  <span className="text-xs px-2.5 py-1 bg-slate-100 rounded-full text-slate-500 font-medium">{stage.duration}</span>
                </div>
                <ul className="space-y-2">
                  {stage.tips.map((tip, ti) => (
                    <li key={ti} className="flex items-start gap-2 text-sm text-slate-600">
                      <ChevronRight className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Must-Know Topics ── */
function MustKnowSection() {
  const [expandedArea, setExpandedArea] = useState(0)
  const colorMap = {
    indigo: { bg: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-700', badge: 'bg-indigo-100 text-indigo-700', accent: 'text-indigo-500' },
    amber: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', badge: 'bg-amber-100 text-amber-700', accent: 'text-amber-500' },
    emerald: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', badge: 'bg-emerald-100 text-emerald-700', accent: 'text-emerald-500' },
    rose: { bg: 'bg-rose-50', border: 'border-rose-200', text: 'text-rose-700', badge: 'bg-rose-100 text-rose-700', accent: 'text-rose-500' },
  }

  return (
    <section className="bg-slate-100/50 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Flame className="w-7 h-7 text-orange-500" />
            <h2 className="text-2xl font-bold text-slate-900">必备知识清单</h2>
          </div>
          <p className="text-slate-500 ml-10">按真实面试频率排序，每个知识点附带考察深度和常见陷阱</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {mustKnowTopics.map((area, i) => {
            const c = colorMap[area.color]
            return (
              <button key={i} onClick={() => setExpandedArea(i)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${expandedArea === i ? `${c.bg} ${c.border} border ${c.text} shadow-sm` : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
                {area.icon} {area.area}
              </button>
            )
          })}
        </div>

        <div className="space-y-4">
          {mustKnowTopics[expandedArea].topics.map((topic, ti) => {
            const c = colorMap[mustKnowTopics[expandedArea].color]
            return (
              <div key={ti} className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h4 className={`text-lg font-bold ${c.accent}`}>{topic.name}</h4>
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${c.badge}`}>{topic.frequency}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div className="lg:col-span-2">
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">必须掌握的知识点</div>
                    <ul className="space-y-1.5">
                      {topic.keyPoints.map((kp, ki) => (
                        <li key={ki} className="flex items-start gap-2 text-sm text-slate-700">
                          <CheckCircle2 className={`w-4 h-4 ${c.accent} mt-0.5 shrink-0`} />
                          {kp}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-700 mb-2">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        踩坑提醒
                      </div>
                      <p className="text-xs text-amber-800 leading-relaxed">{topic.trap}</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ── Project Prep ── */
function ProjectPrepSection() {
  const [checklist, setChecklist] = useState(projectChecklist.map(() => false))

  const toggleCheck = (i) => {
    setChecklist(prev => prev.map((v, idx) => idx === i ? !v : v))
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Target className="w-7 h-7 text-indigo-500" />
          <h2 className="text-2xl font-bold text-slate-900">项目经历准备方法论</h2>
        </div>
        <p className="text-slate-500 ml-10">约 80% 的面试时间花在项目追问上，这是胜负手</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {projectPrepGuide.map((guide, gi) => (
          <div key={gi} className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-4">{guide.title}</h3>
            <div className="space-y-3">
              {guide.steps.map((step, si) => (
                <div key={si} className="flex items-start gap-3">
                  <div className="shrink-0 w-20 px-2 py-1 bg-indigo-50 border border-indigo-100 rounded-lg text-xs font-bold text-indigo-600 text-center">
                    {step.label}
                  </div>
                  <p className="text-sm text-slate-600 pt-0.5">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-indigo-50 to-violet-50 rounded-2xl border border-indigo-100 p-6">
        <h3 className="flex items-center gap-2 text-lg font-bold text-indigo-800 mb-4">
          <ListChecks className="w-5 h-5" />
          项目准备 Checklist（点击勾选）
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {projectChecklist.map((item, i) => (
            <button key={i} onClick={() => toggleCheck(i)}
              className={`flex items-center gap-3 p-3 rounded-xl text-left transition-all ${checklist[i] ? 'bg-emerald-50 border border-emerald-200' : 'bg-white/80 border border-transparent hover:border-indigo-200'}`}>
              {checklist[i]
                ? <SquareCheckBig className="w-5 h-5 text-emerald-500 shrink-0" />
                : <Square className="w-5 h-5 text-slate-300 shrink-0" />
              }
              <span className={`text-sm ${checklist[i] ? 'text-emerald-700 line-through' : 'text-slate-700'}`}>{item.item}</span>
            </button>
          ))}
        </div>
        <div className="mt-4 text-sm text-indigo-600 font-medium">
          已完成 {checklist.filter(Boolean).length} / {checklist.length} 项
        </div>
      </div>
    </section>
  )
}

/* ── System Design ── */
function SystemDesignSection() {
  return (
    <section className="bg-slate-100/50 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Layers className="w-7 h-7 text-red-500" />
            <h2 className="text-2xl font-bold text-slate-900">系统设计题应对策略</h2>
          </div>
          <p className="text-slate-500 ml-10">出现概率不高（约15%面试），但区分度极高</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {systemDesignGuide.map((section, si) => (
            <div key={si} className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-4">{section.title}</h3>
              <div className="space-y-2.5">
                {section.items.map((item, ii) => (
                  <div key={ii} className="flex items-start gap-2.5 p-3 bg-slate-50 rounded-xl">
                    {si === 0
                      ? <MessageSquare className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                      : <div className="w-6 h-6 rounded-full bg-red-50 border border-red-100 flex items-center justify-center text-xs font-bold text-red-500 shrink-0">{item.charAt(0)}</div>
                    }
                    <span className="text-sm text-slate-700">{si === 1 ? item.substring(4) : item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── HR & BQ ── */
function HrBqSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Users className="w-7 h-7 text-violet-500" />
          <h2 className="text-2xl font-bold text-slate-900">BQ & HR 面试应对</h2>
        </div>
        <p className="text-slate-500 ml-10">高频问题 + 推荐回答策略</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-bold text-violet-700 mb-4">
            <Brain className="w-5 h-5" /> 行为面试 (BQ)
          </h3>
          <div className="space-y-3">
            {hrBqGuide.bq.map((item, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm">
                <div className="font-semibold text-slate-800 text-sm mb-2">{item.question}</div>
                <div className="flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                  <p className="text-xs text-slate-600 leading-relaxed">{item.strategy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="flex items-center gap-2 text-lg font-bold text-pink-700 mb-4">
            <Shield className="w-5 h-5" /> HR 面试
          </h3>
          <div className="space-y-3">
            {hrBqGuide.hr.map((item, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm">
                <div className="font-semibold text-slate-800 text-sm mb-2">{item.question}</div>
                <div className="flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                  <p className="text-xs text-slate-600 leading-relaxed">{item.strategy}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 bg-pink-50 border border-pink-100 rounded-xl">
            <h4 className="text-sm font-bold text-pink-700 mb-2">HR面的核心逻辑</h4>
            <p className="text-xs text-pink-800 leading-relaxed">
              HR面的本质是"选择意愿评估"。面试官需要确认：你会不会来？给多少钱你会来？竞争对手是谁？理解了这个逻辑，所有HR问题都能从容应对。
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Common Traps ── */
function TrapsSection() {
  const severityMap = {
    high: { bg: 'bg-red-50', border: 'border-red-200', badge: 'bg-red-100 text-red-700', label: '高危' },
    medium: { bg: 'bg-amber-50', border: 'border-amber-200', badge: 'bg-amber-100 text-amber-700', label: '中危' },
  }

  return (
    <section className="bg-slate-100/50 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <CircleAlert className="w-7 h-7 text-red-500" />
            <h2 className="text-2xl font-bold text-slate-900">面试常见陷阱与避坑指南</h2>
          </div>
          <p className="text-slate-500 ml-10">这些都是真实面试中"翻车"的场景，附解决方案</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {commonTraps.map((t, i) => {
            const s = severityMap[t.severity]
            return (
              <div key={i} className={`rounded-2xl border p-5 ${s.bg} ${s.border}`}>
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${s.badge}`}>{s.label}</span>
                  <h4 className="font-bold text-slate-800">{t.trap}</h4>
                </div>
                <div className="space-y-2.5">
                  <div>
                    <div className="text-xs font-semibold text-slate-500 mb-1">症状</div>
                    <p className="text-sm text-slate-700 italic">"{t.symptom}"</p>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-emerald-600 mb-1">解决方案</div>
                    <p className="text-sm text-slate-700">{t.fix}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ── Weekly Plan ── */
function WeeklyPlanSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Calendar className="w-7 h-7 text-teal-500" />
          <h2 className="text-2xl font-bold text-slate-900">4周备战计划</h2>
        </div>
        <p className="text-slate-500 ml-10">适用于有一定基础的大模型方向求职者</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {weeklyPlan.map((week, wi) => (
          <div key={wi} className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-400" />
            <div className="text-xs font-bold text-emerald-600 mb-1">{week.week}</div>
            <h4 className="text-lg font-bold text-slate-800 mb-3">{week.title}</h4>
            <ul className="space-y-2">
              {week.tasks.map((task, ti) => (
                <li key={ti} className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  {task}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100 text-center">
        <h3 className="text-xl font-bold text-emerald-800 mb-2">最后的话</h3>
        <p className="text-sm text-emerald-700 max-w-2xl mx-auto leading-relaxed">
          面试是双向选择的过程。技术准备固然重要，但更重要的是展现你的思考深度和学习能力。
          面试官看重的不是你背了多少八股文，而是你是否真正理解了背后的原理，以及面对未知问题时的思考方式。
          祝各位 offer 多多！
        </p>
        <div className="mt-3 text-xs text-emerald-500">—— <a href="https://space.bilibili.com/441302483" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-300 underline underline-offset-2 transition-colors">凶猛肱二头</a>，52场面试的过来人</div>
      </div>
    </section>
  )
}

/* ── Main Guide Page ── */
export default function GuidePage() {
  return (
    <div>
      <GuideHero />
      <FlowSection />
      <MustKnowSection />
      <ProjectPrepSection />
      <SystemDesignSection />
      <HrBqSection />
      <TrapsSection />
      <WeeklyPlanSection />
    </div>
  )
}
