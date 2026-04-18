/*
  Content maintenance guide

  1. Most text updates only need this file.
  2. Each section in `tabs` becomes one top navigation item.
  3. Each object inside `cards` becomes one homepage card and one detail page.
  4. Recommended card fields:
     - title: Card title and detail page title
     - tag: Small category label
     - summary: Short homepage summary
     - meta: Short meta text shown on the card cover
     - hrefLabel: Bottom action text on the card
     - noteTitle: Detail page note section title
     - note: Detail page long-form note
     - url: Optional external link for future use

  Easiest maintenance workflow:
  - Edit existing cards in place
  - Duplicate a card object when adding a new item
  - Keep `summary` short and put more context into `note`
*/

const defaultNoteTitle = "内容说明";

function createCard(card) {
  return {
    noteTitle: defaultNoteTitle,
    note:
      "这里可以继续补充这条内容的详细说明，例如来源、背景、使用建议、延伸阅读，或后续准备加入的外部链接。",
    url: "",
    ...card,
  };
}

export const tabs = [
  {
    id: "discussion",
    label: "讨论分享",
    eyebrow: "Discussion Digest",
    kicker: "Video links and structured notes",
    title: "AI+教育在线研讨",
    description: "通过一个成长中的在线社群，探讨AI时代的教育存在哪些可能性",
    spotlight: "圆桌会议",
    stats: [
      { label: "讨论主题", value: "18" },
      { label: "视频链接", value: "42" },
      { label: "整理纪要", value: "26" },
    ],
    highlights: ["讨论视频入口", "要点摘录", "延伸问题整理"],
    cards: [
      createCard({
        title: "AI Foundations 1：AI的工作原理",
        tag: "AI原理",
        summary: "教育者需要知道的AI通识：AI基本原理，LLM的工作原理",
        meta: "2026.3.12",
        hrefLabel: "查看回放",
        noteTitle: "讨论笔记",
        note:
          "[AI Foundations 1 教育者需要知道的AI通识 1](https://www.bilibili.com/video/BV1utcSz3EQp/?vd_source=56d2df97d35fd0e11523af88d7d403ae)",
      }),
    ],
  },
  {
    id: "vibecoding",
    label: "VibeCoding",
    eyebrow: "Project Gallery",
    kicker: "Curated links and project showcases",
    title: "用 Gallery 方式呈现 VibeCoding 项目分享。",
    description:
      "把项目链接、实验作品、交互 Demo 与构建说明整理成一个轻量但有气质的展示空间，让项目本身成为网站的核心看点。",
    spotlight:
      "这一板块更像一个持续生长的项目画廊，适合放置作品链接、Demo 入口、GitHub 地址和一句简洁的项目说明。",
    stats: [
      { label: "项目链接", value: "24" },
      { label: "在线 Demo", value: "11" },
      { label: "实验系列", value: "7" },
    ],
    highlights: ["项目 Gallery", "Demo 入口", "构建说明"],
    cards: [
      createCard({
        title: "Prompt-to-Site 视觉实验",
        tag: "Web Demo",
        summary:
          "一个从提示词直接生成网页概念稿的实验项目，页面中收录了在线预览、设计迭代记录与源代码地址。",
        meta: "Live Demo",
        hrefLabel: "打开项目",
        noteTitle: "项目说明",
        note:
          "这里适合写项目目标、Demo 入口、GitHub 地址、版本更新说明，以及你希望读者先看的重点。",
      }),
    ],
  },
  {
    id: "articles",
    label: "AI 教育文章",
    eyebrow: "Editorial Archive",
    kicker: "Writing on AI and education",
    title: "精选 AI 教育文章，形成可阅读的专题档案。",
    description:
      "汇集关于 AI 与教育的观察、方法文章与专题写作，把碎片化分享升级为更完整的阅读体验与观点沉淀。",
    spotlight:
      "这一板块适合承载深度文章、栏目连载与专题索引，让网站除了视频和项目之外，也拥有稳定的思想输出。",
    stats: [
      { label: "专题文章", value: "36" },
      { label: "栏目连载", value: "5" },
      { label: "精选阅读", value: "12" },
    ],
    highlights: ["方法文章", "专题写作", "阅读索引"],
    cards: [
      createCard({
        title: "AI 会如何改变教师备课流程？",
        tag: "专题文章",
        summary:
          "围绕备课场景展开，从信息搜集、活动设计到作业反馈，梳理 AI 进入教学流程后的真实变化。",
        meta: "8 min read",
        hrefLabel: "开始阅读",
        noteTitle: "文章导读",
        note:
          "这里适合补充文章的核心观点、阅读建议、摘要结构，或者放正文链接与延伸阅读入口。",
      }),
    ],
  },
  {
    id: "resources",
    label: "资源分享",
    eyebrow: "Resource Library",
    kicker: "Templates, links and teaching materials",
    title: "把常用资源整理成可持续扩展的共享资料库。",
    description:
      "面向教学实践，把链接、模板、工具清单与资料包系统整理成更容易检索与复用的资源入口。",
    spotlight:
      "这一栏适合放教学资料、工具入口、课程模板、参考链接和长期积累的资源清单，让分享不仅停留在讨论，也沉淀为可反复使用的内容库。",
    stats: [
      { label: "资源条目", value: "48" },
      { label: "工具链接", value: "19" },
      { label: "模板清单", value: "14" },
    ],
    highlights: ["资料包索引", "工具入口", "模板与清单"],
    cards: [
      createCard({
        title: "AI 教学工具导航",
        tag: "工具清单",
        summary:
          "整理常用 AI 教学工具的入口、适用场景与简短说明，方便教师快速找到合适的使用路径。",
        meta: "Link Hub",
        hrefLabel: "查看导航",
        noteTitle: "资源说明",
        note:
          "这里可以整理工具分类方式、使用建议，以及每个入口分别适合什么场景。",
      }),
    ],
  },
];
