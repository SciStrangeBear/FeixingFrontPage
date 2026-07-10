import { useState, useRef, useEffect } from "react";

const NAV_ITEMS = [
  { label: "首页", hasDropdown: false },
  { label: "教师服务", hasDropdown: true },
  { label: "学生课程", hasDropdown: true },
  { label: "资源库", hasDropdown: true },
  { label: "关于我们", hasDropdown: false },
];

const PHOTOS = [
  { src: "/photo1.jpg", alt: "教师工作坊" },
  { src: "/photo2.jpg", alt: "教师培训课堂" },
  { src: "/photo3.jpg", alt: "学生课堂" },
  { src: "/photo4.jpg", alt: "社区活动" },
  { src: "/photo5.jpg", alt: "学生协作" },
  { src: "/photo6.jpg", alt: "课堂讲解" },
];

const SERVICES = [
  {
    symbol: "✦",
    title: "教师服务",
    desc: "AI 工具培训、备课辅助、课堂设计工作坊。帮助教师在 AI 时代找到实用的方法与节奏，持续成长。",
    cta: "了解教师服务 →",
    page: "teachers",
  },
  {
    symbol: "◈",
    title: "学生课程",
    desc: "面向 K12 学生的 AI 素养课程体系。从入门到进阶，培养批判性思维与面向未来的学习能力。",
    cta: "查看学生课程 →",
    page: "students",
  },
  {
    symbol: "▦",
    title: "资源库",
    desc: "精选 AI 教育工具、教学模板、研究报告与实践案例。持续更新，开放共享，随时取用。",
    cta: "进入资源库 →",
    page: "resources",
  },
];

// ─── 资源库数据 ───────────────────────────────────────────
// 在这里添加教育者社群线上分享的视频回放
const COMMUNITY_SESSIONS = [
  {
    series: "三棵人 AI 教育探索第 9 期",
    title: "教师如何沉淀自己的 AI 备课工作流：将 Agent + Skill 用进课程设计",
    date: "2026.7.9",
    desc: "AI教育者刘天晗老师分享如何把 AI 真正用进课程设计：从一次备课调研出发，梳理自己的课程设计流程，并尝试将其中可复用的部分沉淀成 Skill。\n\n本期会介绍 Codex + Obsidian 的 AI 协作工作台，也会通过真实案例展示：如何从对话中形成课程初步设想、开展课程调研、生成课程框架，并进一步复用这些 Skill 设计新的课程。\n\n适合想用 AI 辅助备课、课程设计和教学材料开发的老师，也适合对 Agent、Skill 和 AI 工作流感兴趣的教育工作者。",
    thumbnail: "https://i0.hdslb.com/bfs/archive/6fb84620ea0f839baaac5231a80dfe0675ac8282.jpg",
    url: "https://www.bilibili.com/video/BV1gPNj6VE88/?vd_source=56d2df97d35fd0e11523af88d7d403ae",
    materialUrl: "https://my.feishu.cn/docx/MY4GdTsZeoFc7ox3EDIcpctXnbc",
  },
  {
    series: "三棵人 AI 教育探索第 8 期",
    title: "用 AI Agent 与 Skill 支持教学与日常工作",
    date: "2026.6.11",
    desc: "AI教育者张绪东老师带你从\"AI 网页对话\"迈向能自主干活的 AI Agent：讲清 Agent 与 Skill 是什么、Codex/Claude Code/WorkBuddy 怎么选，并通过案例演示如何用Agent与Skill来支持教学与日常工作。\n案例包括：自动填报销单、把方法论书籍\"蒸馏\"成 Skill、利用ima知识库设计群文阅读课教案等。\n适合想用 AI 真正提效的人群，尤其适合教育工作者。",
    thumbnail: "https://i1.hdslb.com/bfs/archive/a1bef7ebb0d4e7043889491ead6ca2ca0c72df8d.jpg",
    url: "https://www.bilibili.com/video/BV1UdJF6YE6Y/?vd_source=56d2df97d35fd0e11523af88d7d403ae",
  },
  {
    series: "三棵人 AI 教育探索第 7 期",
    title: "一人公司（OPC）实战分享和现场答疑",
    date: "2026.5.28",
    desc: "本期我们邀请到教育者 / 一人公司实践者安瑟 A11BERICH（龙哥），分享他自己一人公司的案例，拆解一人公司的本质与隐形风险，以及介绍普通人如何找到自己的赛道定位、形成自己的商业模式。视频后半段是现场答疑互动，干货满满，适合所有想了解 AI 时代职业新可能的朋友观看。",
    thumbnail: "https://i1.hdslb.com/bfs/archive/3216d8b3c8c41d6ba5839f24d267eeac1e15eb86.jpg",
    url: "https://www.bilibili.com/video/BV1JcVY6ZESJ/?vd_source=56d2df97d35fd0e11523af88d7d403ae",
  },
  {
    series: "三棵人 AI 教育探索第 6 期",
    title: "AI 编程 Vibe Coding：如何找需求 + 案例分享（零基础友好）",
    date: "2026.5.14",
    desc: "本期分享嘉宾龙哥（安瑟 A11BERICH）在做教育之前有14年互联网行业经验，他将分享他在青少年 AI 创新教育中的实践：用\"三不原则\"发现需求，通过用户反馈打磨产品方案，以及用 Spec-Driven Development 提升 AI 编程效率。零基础友好。",
    thumbnail: "https://i0.hdslb.com/bfs/archive/ff742aea35a091a9baafe7ec05d173a6ea7d87a2.jpg",
    url: "https://www.bilibili.com/video/BV1Uv5e67E3E/?vd_source=56d2df97d35fd0e11523af88d7d403ae",
  },
  {
    series: "三棵人 AI 教育探索第 5 期",
    title: "教师如何用 AI 提效：从 Vibe Coding 到 Skill+Agent 案例分享",
    date: "2026.4.30",
    desc: "案例如下：用扣子搭建留学申请引导 Agent；用Qoder搭建学生签证信息查询网站；用 Cursor 开发小学语文个性化学习系统；用 WorkBuddy + TRAE 实操「国旗打印 Skill」，演示 Agent + Skill 办公自动化",
    thumbnail: "https://i2.hdslb.com/bfs/archive/3d0b5dabf878bd73dcc52bc1e8b3267b55829d4a.jpg",
    url: "https://www.bilibili.com/video/BV1sbRKBFEqS/?vd_source=56d2df97d35fd0e11523af88d7d403ae",
  },
  {
    series: "三棵人 AI 教育探索第 4 期",
    title: "Vibe Coding 初体验",
    date: "2026.4.16",
    desc: "主讲人天晗从零基础视角出发，带你了解 Vibe Coding（氛围编程 / AI编程）是什么、跟教育者有什么关系，并通过多个真实案例展示 AI 编程在教学和工作中的落地方式。",
    thumbnail: "https://i2.hdslb.com/bfs/archive/09c357061f249c77b30545f3919a42b838793d27.jpg",
    url: "https://www.bilibili.com/video/BV1H3daBhEVh/?vd_source=56d2df97d35fd0e11523af88d7d403ae",
  },
  {
    series: "三棵人 AI 教育探索第 3 期",
    title: "用 Notion AI 搭建课程",
    date: "2026.4.2",
    desc: "独立小学阅读与写作老师顾惜，分享她如何将Notion AI融入日常教学：素材管理与课程搭建；AI辅助批改学生作品；AI写作的边界讨论；教师自我提升。",
    thumbnail: "https://i1.hdslb.com/bfs/archive/e3949b253ecb68dadc04982696f33cb3b4da3f94.jpg",
    url: "https://www.bilibili.com/video/BV1m99NBFEff/?vd_source=56d2df97d35fd0e11523af88d7d403ae",
  },
  {
    series: "三棵人 AI 教育探索第 2 期",
    title: "AI Foundations 2：AI 伦理",
    date: "2026.3.19",
    desc: "三棵人AI教育社群第2场线上分享，承接第一期AI技术原理，继续探讨AI伦理问题和对教育的影响。本期主要内容：AI幻觉、AI偏见、数据隐私与安全、AI对教师职业的影响；以及AI开放麦：语音输入+深度对话、构建教学知识库。",
    thumbnail: "https://i1.hdslb.com/bfs/archive/ca3de4a6c409621ac562d81ebd3db90a3d5c999e.jpg",
    url: "https://www.bilibili.com/video/BV1KaAjz7E5g/?vd_source=56d2df97d35fd0e11523af88d7d403ae",
  },
  {
    series: "三棵人 AI 教育探索第 1 期",
    title: "AI Foundations 1：AI 的工作原理",
    date: "2026.3.12",
    desc: "三棵人AI教育社群第1场线上分享，面向技术小白讲解AI基础原理：AI是如何工作的、大语言模型的运作方式，以及Token划分、LLM可视化等实用工具演示。",
    thumbnail: "https://i0.hdslb.com/bfs/archive/fd4a028b3a3be93ff459daca0f3a8f242dae5f97.jpg",
    url: "https://www.bilibili.com/video/BV1utcSz3EQp/?vd_source=56d2df97d35fd0e11523af88d7d403ae",
  },
];

// ─── 图标 ─────────────────────────────────────────────────
function StarIcon({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ps1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
      </defs>
      <line x1="20" y1="54" x2="4" y2="64" stroke="#a78bfa" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="17" y1="60" x2="5" y2="67" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <polygon points="42,6 51,30 76,30 55,47 63,72 42,57 21,72 29,47 8,30 33,30" fill="url(#ps1)" />
      <circle cx="73" cy="13" r="2" fill="#a78bfa" opacity="0.8" />
      <circle cx="13" cy="36" r="1.8" fill="#c4b5fd" opacity="0.7" />
    </svg>
  );
}

// ─── 导航栏 ───────────────────────────────────────────────
function Header({ onNavigate }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-[#faf9f6]/95 backdrop-blur-md border-b border-[#e8e4df]">
      <nav className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-3.5 sm:px-10 lg:px-14">
        <button onClick={() => onNavigate("home")} className="flex items-center gap-2.5">
          <StarIcon size={26} />
          <span className="text-[17px] font-black tracking-tight text-[#1a1a2e]">飞星计划 AI 教育</span>
        </button>

        <div className="hidden md:flex items-center gap-0.5">
          {NAV_ITEMS.map((item) => {
            const pageMap = { "首页": "home", "教师服务": "teachers", "学生课程": "students", "资源库": "resources", "关于我们": "about" };
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => onNavigate(pageMap[item.label])}
                className="px-4 py-2 text-[13px] font-medium text-[#6b6b7b] hover:text-[#1a1a2e] rounded-full hover:bg-[#eeeae4] transition-colors"
              >
                {item.label}{item.hasDropdown && " ▾"}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => onNavigate("contact")}
          className="rounded-full bg-[#6d28d9] px-5 py-2.5 text-[13px] font-semibold text-white hover:bg-[#5b21b6] transition-colors"
        >
          联系我们
        </button>
      </nav>
    </header>
  );
}

// ─── 主页组件 ─────────────────────────────────────────────
function Hero({ onNavigate }) {
  return (
    <section className="bg-[#faf9f6] px-6 pt-36 pb-20 sm:px-10 lg:px-14">
      <div className="mx-auto max-w-[1440px]">
        <h1 className="font-extrabold text-[#1a1a2e] tracking-[-0.02em] leading-none">
          <div className="text-[36px] sm:text-5xl md:text-6xl lg:text-[68px]">给教育者和学生的</div>
          <div className="text-[52px] sm:text-[80px] md:text-[100px] lg:text-[112px] mt-2 sm:mt-3">AI 素养教育</div>
        </h1>
        <p className="mt-7 text-[#6b6b7b] text-lg md:text-xl max-w-2xl leading-relaxed">
          探索 AI 时代教育的更多可能
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <button onClick={() => onNavigate("resources")} className="rounded-full bg-[#6d28d9] px-8 py-3.5 text-[14px] font-semibold text-white hover:bg-[#5b21b6] transition-colors">
            查看资源库
          </button>
          <button onClick={() => onNavigate("teachers")} className="rounded-full border border-[#d4cfc8] px-8 py-3.5 text-[14px] font-semibold text-[#6b6b7b] hover:bg-[#eeeae4] hover:text-[#1a1a2e] transition-colors">
            探索教师服务
          </button>
          <button onClick={() => onNavigate("students")} className="rounded-full border border-[#d4cfc8] px-8 py-3.5 text-[14px] font-semibold text-[#6b6b7b] hover:bg-[#eeeae4] hover:text-[#1a1a2e] transition-colors">
            查看学生课程
          </button>
        </div>
      </div>
    </section>
  );
}

function PhotoStrip() {
  const getVisible = () => {
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  };

  const [offset, setOffset] = useState(0);
  const [visible, setVisible] = useState(getVisible);
  const max = PHOTOS.length - visible;
  const containerRef = useRef(null);
  const lockRef = useRef(false);
  const GAP = 6;

  const prev = () => setOffset((o) => Math.max(0, o - 1));
  const next = () => setOffset((o) => Math.min(max, o + 1));

  useEffect(() => {
    const onResize = () => {
      const v = getVisible();
      setVisible(v);
      setOffset((o) => Math.min(o, PHOTOS.length - v));
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e) => {
      const isHorizontal = Math.abs(e.deltaX) >= Math.abs(e.deltaY);
      if (!isHorizontal) return;
      e.preventDefault();
      if (lockRef.current) return;
      if (e.deltaX > 20) {
        setOffset((o) => Math.min(max, o + 1));
        lockRef.current = true;
        setTimeout(() => { lockRef.current = false; }, 550);
      } else if (e.deltaX < -20) {
        setOffset((o) => Math.max(0, o - 1));
        lockRef.current = true;
        setTimeout(() => { lockRef.current = false; }, 550);
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [max]);

  return (
    <div ref={containerRef} className="relative overflow-hidden bg-[#f4f1eb] px-5 py-4">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          gap: `${GAP}px`,
          transform: `translateX(calc(-${(offset / PHOTOS.length) * 100}% - ${offset * GAP / PHOTOS.length}px))`,
          width: `${(PHOTOS.length / visible) * 100}%`,
        }}
      >
        {PHOTOS.map((p, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-lg flex-shrink-0"
            style={{ width: `calc(${100 / PHOTOS.length}% - ${GAP * (PHOTOS.length - 1) / PHOTOS.length}px)`, aspectRatio: "16/9" }}
          >
            <img src={p.src} alt={p.alt} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
      <button onClick={prev} disabled={offset === 0} className="absolute left-7 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 shadow flex items-center justify-center text-[#1a1a2e] text-sm font-bold hover:bg-white transition-colors disabled:opacity-25 disabled:cursor-not-allowed">←</button>
      <button onClick={next} disabled={offset >= max} className="absolute right-7 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 shadow flex items-center justify-center text-[#1a1a2e] text-sm font-bold hover:bg-white transition-colors disabled:opacity-25 disabled:cursor-not-allowed">→</button>
    </div>
  );
}

function Services({ onNavigate }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 border-t border-[#e8e4df] bg-[#faf9f6]">
      {SERVICES.map((s, i) => (
        <div
          key={s.title}
          className={`p-8 lg:p-12 ${i < 2 ? "md:border-r border-[#e8e4df]" : ""} border-b md:border-b-0 border-[#e8e4df] hover:bg-[#f4f1eb] transition-colors group`}
        >
          <span className="text-[#c4b5fd] text-2xl">{s.symbol}</span>
          <h3 className="mt-5 text-xl font-extrabold text-[#1a1a2e]">{s.title}</h3>
          <p className="mt-4 text-[#6b6b7b] text-[14px] leading-relaxed">{s.desc}</p>
          <button
            onClick={() => s.page && onNavigate(s.page)}
            className="mt-6 text-[13px] font-semibold text-[#6d28d9] hover:text-[#5b21b6] transition-colors"
          >
            {s.cta}
          </button>
        </div>
      ))}
    </div>
  );
}

function Footer({ onNavigate }) {
  return (
    <footer className="bg-[#f4f1eb] border-t border-[#e8e4df] px-6 py-12 sm:px-10 lg:px-14">
      <div className="mx-auto max-w-[1440px] flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <StarIcon size={22} />
          <span className="text-sm font-bold text-[#3d3d52]">飞星计划 AI 教育</span>
        </div>
        <div className="flex flex-wrap justify-center gap-8 text-sm text-[#9b9bac]">
          <button onClick={() => onNavigate("teachers")} className="hover:text-[#1a1a2e] transition-colors">教师服务</button>
          <button onClick={() => onNavigate("students")} className="hover:text-[#1a1a2e] transition-colors">学生课程</button>
          <button onClick={() => onNavigate("resources")} className="hover:text-[#1a1a2e] transition-colors">资源库</button>
          <button onClick={() => onNavigate("about")} className="hover:text-[#1a1a2e] transition-colors">关于我们</button>
        </div>
        <p className="text-xs text-[#c4bdb5]">© 2026 飞星计划 AI 教育</p>
      </div>
    </footer>
  );
}

// ─── 占位页面 ─────────────────────────────────────────────
function PlaceholderPage({ title, onNavigate }) {
  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <div className="pt-24 pb-0 px-6 sm:px-10 lg:px-14">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex items-center gap-2 text-sm text-[#9b9bac]">
            <button onClick={() => onNavigate("home")} className="hover:text-[#6d28d9] transition-colors">首页</button>
            <span>/</span>
            <span className="text-[#1a1a2e] font-medium">{title}</span>
          </div>
        </div>
      </div>
      <div className="px-6 pt-8 pb-12 sm:px-10 lg:px-14 border-b border-[#e8e4df]">
        <div className="mx-auto max-w-[1440px]">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#1a1a2e] tracking-[-0.02em]">{title}</h1>
        </div>
      </div>
      <div className="px-6 py-24 sm:px-10 lg:px-14 flex items-center justify-center">
        <div className="text-center text-[#c4bdb5]">
          <p className="text-5xl mb-6">✦</p>
          <p className="text-lg font-medium">待补充内容</p>
          <p className="mt-2 text-sm">此页面正在建设中，敬请期待</p>
        </div>
      </div>
    </div>
  );
}

// ─── 资源库页面 ───────────────────────────────────────────
function SessionCard({ session }) {
  return (
    <div className="group bg-white border border-[#e8e4df] rounded-2xl overflow-hidden hover:border-[#c4b5fd] hover:shadow-md transition-all flex flex-col">
      {/* 封面 */}
      <a href={session.url} target="_blank" rel="noreferrer" className="block relative aspect-video bg-[#ede9fe] shrink-0">
        {session.thumbnail ? (
          <img src={session.thumbnail} alt={session.title} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-[#c4b5fd] text-4xl">▶</span>
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
            <span className="text-[#6d28d9] text-lg pl-0.5">▶</span>
          </div>
        </div>
      </a>

      {/* 文字区 */}
      <div className="p-5 flex flex-col flex-1">
        <p className="text-[11px] font-bold text-[#9b9bac] tracking-widest mb-2">{session.date}</p>
        {session.series && (
          <p className="text-[11px] font-bold text-[#9b9bac] tracking-widest mb-1">{session.series}</p>
        )}
        <a href={session.url} target="_blank" rel="noreferrer">
          <h3 className="text-[15px] font-bold text-[#1a1a2e] hover:text-[#6d28d9] transition-colors leading-snug">
            {session.title}
          </h3>
        </a>
        <p className="mt-3 text-[12px] text-[#6b6b7b] leading-relaxed">
          {session.desc}
        </p>
        {session.materialUrl && (
          <a
            href={session.materialUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex w-fit items-center text-[12px] font-bold text-[#6d28d9] hover:text-[#4c1d95] transition-colors"
          >
            分享讲义 →
          </a>
        )}
      </div>
    </div>
  );
}

function ResourcesPage({ onNavigate }) {
  return (
    <div className="min-h-screen bg-[#faf9f6]">
      {/* 面包屑 */}
      <div className="pt-24 pb-0 px-6 sm:px-10 lg:px-14">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex items-center gap-2 text-sm text-[#9b9bac]">
            <button onClick={() => onNavigate("home")} className="hover:text-[#6d28d9] transition-colors">首页</button>
            <span>/</span>
            <span className="text-[#1a1a2e] font-medium">资源库</span>
          </div>
        </div>
      </div>

      {/* 页头 */}
      <div className="px-6 pt-8 pb-12 sm:px-10 lg:px-14 border-b border-[#e8e4df]">
        <div className="mx-auto max-w-[1440px]">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#1a1a2e] tracking-[-0.02em]">资源库</h1>
          <p className="mt-4 text-[#6b6b7b] text-lg max-w-2xl">
            精选 AI 教育资源，持续更新，开放共享。
          </p>
        </div>
      </div>

      {/* 内容区 */}
      <div className="px-6 py-14 sm:px-10 lg:px-14">
        <div className="mx-auto max-w-[1440px]">

          {/* 教育者社群线上分享 */}
          <section>
            <div className="flex items-baseline gap-4 mb-8">
              <h2 className="text-2xl font-extrabold text-[#1a1a2e]">教育者社群线上分享</h2>
              <span className="text-sm text-[#9b9bac]">往期线上分享视频回放</span>
            </div>

            {COMMUNITY_SESSIONS.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {COMMUNITY_SESSIONS.map((s, i) => (
                  <SessionCard key={i} session={s} />
                ))}
              </div>
            ) : (
              <div className="border border-dashed border-[#d4cfc8] rounded-2xl px-8 py-14 text-center text-[#9b9bac]">
                <p className="text-4xl mb-4">▶</p>
                <p className="text-sm">即将上线，敬请期待</p>
              </div>
            )}
          </section>

        </div>
      </div>
    </div>
  );
}

// ─── 主应用 ───────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");

  const navigate = (target) => {
    setPage(target);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] text-[#1a1a2e]">
      <Header onNavigate={navigate} />
      {page === "home" && (
        <main>
          <Hero onNavigate={navigate} />
          <PhotoStrip />
          <Services onNavigate={navigate} />
        </main>
      )}
      {page === "resources" && <ResourcesPage onNavigate={navigate} />}
      {page === "teachers" && <PlaceholderPage title="教师服务" onNavigate={navigate} />}
      {page === "students" && <PlaceholderPage title="学生课程" onNavigate={navigate} />}
      {page === "about" && <PlaceholderPage title="关于我们" onNavigate={navigate} />}
      {page === "contact" && <PlaceholderPage title="联系我们" onNavigate={navigate} />}
      <Footer onNavigate={navigate} />
    </div>
  );
}
