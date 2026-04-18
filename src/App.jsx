import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { tabs } from "./data";

const shellTransition = { duration: 0.55, ease: [0.22, 1, 0.36, 1] };

const listVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.04,
      staggerDirection: -1,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 28,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -14,
    transition: {
      duration: 0.24,
      ease: "easeInOut",
    },
  },
};

const galleryVisuals = [
  "from-[#d8c1a8] via-[#f1e4d2] to-[#f9f5ee]",
  "from-[#4b5c78] via-[#cfd8e4] to-[#f5f3ef]",
  "from-[#9fb6aa] via-[#dbe6de] to-[#faf8f4]",
  "from-[#a96f52] via-[#ead7c7] to-[#faf6f0]",
  "from-[#7a8188] via-[#d9ddd9] to-[#fbfaf7]",
  "from-[#7a5347] via-[#d2b09a] to-[#f5eee7]",
];

function renderRichText(text) {
  const markdownLinkPattern = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
  const urlPattern = /(https?:\/\/[^\s]+)/g;

  return text.split("\n").map((paragraph, paragraphIndex) => {
    const nodes = [];
    let lastIndex = 0;
    const combinedPattern = new RegExp(
      `${markdownLinkPattern.source}|${urlPattern.source}`,
      "g",
    );

    for (const match of paragraph.matchAll(combinedPattern)) {
      const [fullMatch, markdownText, markdownUrl, plainUrl] = match;
      const start = match.index ?? 0;

      if (start > lastIndex) {
        nodes.push(paragraph.slice(lastIndex, start));
      }

      if (markdownText && markdownUrl) {
        nodes.push(
          <a
            key={`${paragraphIndex}-${start}`}
            href={markdownUrl}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-[#005cba] underline decoration-[#005cba]/30 underline-offset-4 transition-colors hover:text-[#004e9f]"
          >
            {markdownText}
          </a>,
        );
      } else if (plainUrl) {
        nodes.push(
          <a
            key={`${paragraphIndex}-${start}`}
            href={plainUrl}
            target="_blank"
            rel="noreferrer"
            className="break-all font-medium text-[#005cba] underline decoration-[#005cba]/30 underline-offset-4 transition-colors hover:text-[#004e9f]"
          >
            {plainUrl}
          </a>,
        );
      }

      lastIndex = start + fullMatch.length;
    }

    if (lastIndex < paragraph.length) {
      nodes.push(paragraph.slice(lastIndex));
    }

    return (
      <p
        key={paragraphIndex}
        className="text-[15px] leading-8 text-[#414753] not-last:mb-4"
      >
        {nodes}
      </p>
    );
  });
}

function buildCardHref(sectionId, title) {
  const params = new URLSearchParams({
    section: sectionId,
    card: title,
  });

  return `/?${params.toString()}`;
}

function findCardFromLocation() {
  const params = new URLSearchParams(window.location.search);
  const sectionId = params.get("section");
  const cardTitle = params.get("card");

  if (!sectionId || !cardTitle) {
    return null;
  }

  const section = tabs.find((item) => item.id === sectionId);

  if (!section) {
    return null;
  }

  const card = section.cards.find((item) => item.title === cardTitle);

  if (!card) {
    return null;
  }

  return { section, card };
}

function Header({ activeTab, onChange }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-5 pt-5 sm:px-8 lg:px-12">
      <nav className="mx-auto flex w-full max-w-[1440px] flex-wrap items-center justify-between gap-4 rounded-[2rem] bg-white/72 px-5 py-4 shadow-[0_8px_30px_rgba(27,27,29,0.04)] backdrop-blur-[30px] sm:px-6">
        <div className="flex items-baseline gap-3">
          <div className="bg-[linear-gradient(135deg,#1b1b1d_0%,#005cba_55%,#6b88b6_100%)] bg-clip-text text-2xl font-black tracking-[0.08em] text-transparent [text-shadow:0_10px_30px_rgba(0,92,186,0.08)]">
            飞星计划
          </div>
          <div className="hidden text-[10px] font-bold uppercase tracking-[0.24em] text-[#8b9099] sm:block">
            Feixing Project
          </div>
        </div>

        <div className="order-3 flex w-full min-w-0 items-center gap-2 overflow-x-auto pb-1 md:order-2 md:w-auto md:flex-1 md:justify-center md:overflow-visible md:pb-0">
          {tabs.map((tab) => {
            const isActive = tab.id === activeTab;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onChange(tab.id)}
                className="relative shrink-0 rounded-full px-5 py-2.5"
              >
                {isActive && (
                  <motion.div
                    layoutId="active-nav-pill"
                    className="absolute inset-0 rounded-full bg-[linear-gradient(135deg,#004e9f,#0066cc)] shadow-[0_18px_40px_rgba(0,92,186,0.18)]"
                    transition={{ type: "spring", stiffness: 320, damping: 30 }}
                  />
                )}
                <span
                  className={`relative z-10 text-[12px] font-bold uppercase tracking-[0.08em] ${
                    isActive
                      ? "text-white"
                      : "text-[#7c8089] transition-colors hover:text-[#005cba]"
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>

        <div className="order-2 flex items-center gap-4 md:order-3">
          <div className="hidden items-center rounded-full bg-[#f6f3f5] px-4 py-2.5 lg:flex">
            <span className="text-sm text-[#727784]">Search links, notes, articles...</span>
          </div>
          <button
            type="button"
            className="rounded-full bg-[linear-gradient(135deg,#004e9f,#0066cc)] px-6 py-2.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white shadow-[0_18px_40px_rgba(0,92,186,0.18)] transition-transform active:scale-95"
          >
            Explore
          </button>
        </div>
      </nav>
    </header>
  );
}

function HeroPanel({ tab }) {
  return (
    <motion.section
      key={tab.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }}
      transition={shellTransition}
      className="max-w-4xl"
    >
      <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#005cba]">
        {tab.eyebrow}
      </p>
      <h1 className="mt-5 text-5xl font-extrabold tracking-[-0.04em] text-[#1b1b1d] sm:text-6xl xl:text-7xl">
        {tab.title}
      </h1>
      <p className="mt-7 max-w-2xl text-lg leading-relaxed text-[#414753]">
        {tab.description}
      </p>
    </motion.section>
  );
}

function GalleryCard({ sectionId, card, index }) {
  return (
    <motion.a
      href={buildCardHref(sectionId, card.title)}
      variants={cardVariants}
      whileHover={{
        y: -8,
        transition: { type: "spring", stiffness: 240, damping: 20 },
      }}
      whileTap={{
        scale: 0.985,
        transition: { type: "spring", stiffness: 420, damping: 24 },
      }}
      className="group flex h-full cursor-pointer flex-col"
    >
      <div className="relative mb-6 aspect-video overflow-hidden rounded-[1.5rem] bg-[#eae7ea]">
        <div
          className={`absolute inset-0 bg-linear-to-br ${galleryVisuals[index % galleryVisuals.length]}`}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_24%,rgba(255,255,255,0.82),transparent_22%),linear-gradient(145deg,transparent_0%,rgba(255,255,255,0.18)_48%,rgba(27,27,29,0.05)_100%)]" />
        <div className="absolute inset-0 flex items-center justify-center bg-black/6 transition-colors duration-500 group-hover:bg-black/14">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/40 shadow-[0_30px_60px_rgba(0,0,0,0.06)] backdrop-blur-xl transition-transform duration-500 group-hover:scale-110">
            <div className="ml-1 h-0 w-0 border-y-[10px] border-y-transparent border-l-[15px] border-l-[#1b1b1d]" />
          </div>
        </div>
        <div className="absolute right-4 bottom-4 rounded-md bg-black/58 px-3 py-1 backdrop-blur-md">
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white">
            {card.meta}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col px-1">
        <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.22em] text-[#005cba]">
          {card.tag}
        </span>
        <h3 className="text-2xl font-bold leading-snug tracking-[-0.03em] text-[#1b1b1d] transition-colors group-hover:text-[#004e9f]">
          {card.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-7 font-medium text-[#414753]">
          {card.summary}
        </p>
        <span className="mt-5 inline-flex text-sm font-semibold text-[#005cba]">
          {card.hrefLabel}
        </span>
      </div>
    </motion.a>
  );
}

function GallerySection({ sectionId, cards }) {
  return (
    <motion.section
      variants={listVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3"
    >
      {cards.map((card, index) => (
        <GalleryCard
          key={card.title}
          sectionId={sectionId}
          card={card}
          index={index}
        />
      ))}
    </motion.section>
  );
}

function DetailPage({ section, card }) {
  return (
    <div className="min-h-screen bg-[#fcf8fb] text-[#1b1b1d]">
      <header className="px-6 pt-8 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[960px] items-center justify-between rounded-full bg-white/78 px-6 py-4 shadow-[0_8px_30px_rgba(27,27,29,0.04)] backdrop-blur-[30px]">
          <a
            href="/"
            className="text-sm font-bold uppercase tracking-[0.12em] text-[#005cba]"
          >
            Back to Home
          </a>
          <div className="text-lg font-black tracking-[-0.04em] text-[#1b1b1d]">
            Knowledge Gallery
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[960px] px-6 pt-14 pb-24 sm:px-8">
        <div className="rounded-[2rem] bg-white px-8 py-10 shadow-[0_24px_60px_rgba(27,27,29,0.06)] sm:px-12 sm:py-14">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#005cba]">
            {section.label}
          </p>
          <h1 className="mt-5 text-4xl font-extrabold tracking-[-0.04em] text-[#1b1b1d] sm:text-5xl">
            {card.title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-[#414753]">
            {card.summary}
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            <div className="rounded-[1.5rem] bg-[#f6f3f5] px-6 py-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#005cba]">
                Content Type
              </p>
              <p className="mt-3 text-xl font-bold text-[#1b1b1d]">{card.tag}</p>
            </div>
            <div className="rounded-[1.5rem] bg-[#f6f3f5] px-6 py-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#005cba]">
                Reference
              </p>
              <p className="mt-3 text-xl font-bold text-[#1b1b1d]">{card.meta}</p>
            </div>
          </div>

          <div className="mt-10 rounded-[1.5rem] bg-[#f6f3f5] px-6 py-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#005cba]">
              {card.noteTitle}
            </p>
            <div className="mt-4">{renderRichText(card.note)}</div>
          </div>
        </div>
      </main>
    </div>
  );
}

function NewsletterSection() {
  return (
    <section className="relative mt-28 overflow-hidden rounded-[2rem] bg-[#f6f3f5] px-8 py-14 text-center md:px-16 md:py-24">
      <div className="absolute top-0 right-0 h-64 w-64 translate-x-1/2 -translate-y-1/2 rounded-full bg-[#004e9f]/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-64 w-64 -translate-x-1/2 translate-y-1/2 rounded-full bg-[#b9cffd]/24 blur-3xl" />

      <div className="relative z-10">
        <h2 className="text-4xl font-extrabold tracking-[-0.04em] text-[#1b1b1d]">
          让内容持续更新，也持续被看见。
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#414753]">
          这里可以作为站点更新入口，持续推送新的讨论整理、VibeCoding 项目链接和 AI 教育文章，让主页本身成为你的内容索引。
        </p>

        <div className="mx-auto mt-10 flex max-w-2xl flex-col items-center justify-center gap-4 md:flex-row">
          <div className="w-full rounded-full bg-white px-6 py-4 text-left text-sm text-[#727784] shadow-[0_12px_30px_rgba(27,27,29,0.04)] md:w-80">
            输入邮箱或预留更新入口...
          </div>
          <button
            type="button"
            className="w-full rounded-full bg-[linear-gradient(135deg,#004e9f,#0066cc)] px-10 py-4 text-sm font-bold tracking-[0.04em] text-white shadow-[0_18px_40px_rgba(0,92,186,0.18)] transition-transform hover:scale-[1.02] active:scale-95 md:w-auto"
          >
            订阅更新
          </button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mt-20 bg-[linear-gradient(180deg,transparent,#f6f3f5)] px-6 py-12 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-6 md:flex-row">
        <div className="text-lg font-bold tracking-[-0.03em] text-[#1b1b1d]">
          Knowledge Gallery
        </div>
        <div className="flex flex-wrap justify-center gap-8 text-sm text-[#727784]">
          <a href="#">讨论整理</a>
          <a href="#">项目索引</a>
          <a href="#">文章归档</a>
          <a href="#">关于本站</a>
        </div>
        <div className="text-sm text-[#727784] opacity-70">
          A curated home for discussion notes, VibeCoding projects, and AI education writing.
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const detailEntry = useMemo(() => findCardFromLocation(), []);
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const currentTab = useMemo(
    () => tabs.find((tab) => tab.id === activeTab) ?? tabs[0],
    [activeTab],
  );

  if (detailEntry) {
    return <DetailPage section={detailEntry.section} card={detailEntry.card} />;
  }

  return (
    <div className="min-h-screen bg-[#fcf8fb] text-[#1b1b1d]">
      <Header activeTab={activeTab} onChange={setActiveTab} />

      <main className="mx-auto max-w-[1440px] px-6 pt-44 pb-24 sm:px-8 lg:px-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-14"
          >
            <HeroPanel tab={currentTab} />
            <GallerySection sectionId={currentTab.id} cards={currentTab.cards} />
          </motion.div>
        </AnimatePresence>

        <NewsletterSection />
      </main>

      <Footer />
    </div>
  );
}
