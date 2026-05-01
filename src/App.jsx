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
    series: "三棵人 AI 教育探索第 5 期",
    title: "教师如何用 AI 提效：从 Vibe Coding 到 Skill+Agent 案例分享",
    date: "2026.5.1",
    desc: "零基础也能让 AI 替你干活：三位教师分享如何用 AI 工具提升工作效率，涵盖智能体开发、签证查询系统、个性化学习平台与办公自动化实战案例。",
    url: "https://www.bilibili.com/video/BV1sbRKBFEqS/?vd_source=56d2df97d35fd0e11523af88d7d403ae",
  },
  {
    series: "三棵人 AI 教育探索第 4 期",
    title: "Vibe Coding 初体验",
    date: "2026.4.16",
    desc: "通过 Vibe Coding 体验 AI 辅助编程，探索 AI 时代教育者的新可能。",
    url: "https://www.bilibili.com/video/BV1H3daBhEVh/?vd_source=56d2df97d35fd0e11523af88d7d403ae",
  },
  {
    series: "三棵人 AI 教育探索第 3 期",
    title: "用 Notion AI 搭建课程",
    date: "2026.4.2",
    desc: "实操演示如何借助 Notion AI 高效设计与管理课程内容。",
    url: "https://www.bilibili.com/video/BV1m99NBFEff/?vd_source=56d2df97d35fd0e11523af88d7d403ae",
  },
  {
    series: "三棵人 AI 教育探索第 2 期",
    title: "AI Foundations 2：AI 伦理",
    date: "2026.3.19",
    desc: "探讨 AI 伦理的核心议题，帮助教育者建立负责任的 AI 使用框架。",
    url: "https://www.bilibili.com/video/BV1KaAjz7E5g/?vd_source=56d2df97d35fd0e11523af88d7d403ae",
  },
  {
    series: "三棵人 AI 教育探索第 1 期",
    title: "AI Foundations 1：AI 的工作原理",
    date: "2026.3.12",
    desc: "教育者需要知道的 AI 通识：AI 基本原理与大语言模型的工作方式。",
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
        <h1 className="font-extrabold text-[#1a1a2e] tracking-[-0.02em] leading-none w-fit">
          <div className="text-5xl md:text-6xl lg:text-[68px] whitespace-nowrap">给教育者和学生的</div>
          <div className="text-[80px] md:text-[100px] lg:text-[112px] whitespace-nowrap mt-3">AI 素养教育</div>
        </h1>
        <p className="mt-7 text-[#6b6b7b] text-lg md:text-xl max-w-2xl leading-relaxed">
          探索 AI 时代教育的更多可能
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <button onClick={() => onNavigate("teachers")} className="rounded-full bg-[#6d28d9] px-8 py-3.5 text-[14px] font-semibold text-white hover:bg-[#5b21b6] transition-colors">
            探索教师服务 →
          </button>
          <button onClick={() => onNavigate("students")} className="rounded-full border border-[#d4cfc8] px-8 py-3.5 text-[14px] font-semibold text-[#6b6b7b] hover:bg-[#eeeae4] hover:text-[#1a1a2e] transition-colors">
            查看学生课程
          </button>
          <button
            onClick={() => onNavigate("resources")}
            className="rounded-full border border-[#d4cfc8] px-8 py-3.5 text-[14px] font-semibold text-[#6b6b7b] hover:bg-[#eeeae4] hover:text-[#1a1a2e] transition-colors"
          >
            查看资源库
          </button>
        </div>
      </div>
    </section>
  );
}

function PhotoStrip() {
  const [offset, setOffset] = useState(0);
  const visible = 3;
  const max = PHOTOS.length - visible;
  const containerRef = useRef(null);
  const lockRef = useRef(false);
  const GAP = 6;

  const prev = () => setOffset((o) => Math.max(0, o - 1));
  const next = () => setOffset((o) => Math.min(max, o + 1));

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
function extractBvid(url) {
  const m = url.match(/\/video\/(BV\w+)/);
  return m ? m[1] : null;
}

function SessionCard({ session }) {
  const [info, setInfo] = useState(null);
  const [editing, setEditing] = useState(false);
  const bvid = extractBvid(session.url);
  const storageKey = `desc_${bvid}`;

  const [customDesc, setCustomDesc] = useState(
    () => localStorage.getItem(storageKey) ?? ""
  );
  const [draft, setDraft] = useState("");

  useEffect(() => {
    if (!bvid) return;
    fetch(`/bili-api/x/web-interface/view?bvid=${bvid}`)
      .then((r) => r.json())
      .then((json) => {
        if (json.code === 0) {
          setInfo({
            pic: json.data.pic.replace("http://", "https://"),
            desc: json.data.desc,
          });
        }
      })
      .catch(() => {});
  }, [bvid]);

  const startEdit = (e) => {
    e.preventDefault();
    setDraft(customDesc || info?.desc || session.desc || "");
    setEditing(true);
  };

  const save = (e) => {
    e.preventDefault();
    localStorage.setItem(storageKey, draft);
    setCustomDesc(draft);
    setEditing(false);
  };

  const cancel = (e) => {
    e.preventDefault();
    setEditing(false);
  };

  const displayDesc = customDesc || info?.desc || session.desc || "";

  return (
    <div className="group bg-white border border-[#e8e4df] rounded-2xl overflow-hidden hover:border-[#c4b5fd] hover:shadow-md transition-all flex flex-col">
      {/* 封面 */}
      <a href={session.url} target="_blank" rel="noreferrer" className="block relative aspect-video bg-[#ede9fe] shrink-0">
        {info?.pic ? (
          <img src={info.pic} alt={session.title} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-[#c4b5fd] text-4xl animate-pulse">▶</span>
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

        {/* 简介区 */}
        <div className="mt-3 flex-1">
          {editing ? (
            <div>
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                className="w-full text-[12px] text-[#1a1a2e] leading-relaxed border border-[#c4b5fd] rounded-lg p-2.5 resize-none focus:outline-none focus:ring-2 focus:ring-[#c4b5fd]"
                rows={6}
                autoFocus
              />
              <div className="flex gap-2 mt-2">
                <button onClick={save} className="px-4 py-1.5 rounded-full bg-[#6d28d9] text-white text-[12px] font-semibold hover:bg-[#5b21b6] transition-colors">保存</button>
                <button onClick={cancel} className="px-4 py-1.5 rounded-full border border-[#d4cfc8] text-[12px] text-[#6b6b7b] hover:bg-[#f4f1eb] transition-colors">取消</button>
              </div>
            </div>
          ) : (
            <p className="text-[12px] text-[#6b6b7b] leading-relaxed">
              {displayDesc}
            </p>
          )}
        </div>
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
