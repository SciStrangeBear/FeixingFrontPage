# Teachers Knowledge Sharing Hub Prompt

## Objective
Design and implement a polished React landing page demo for a Chinese-language educational sharing project called **Teachers Knowledge Sharing Hub**. The page should feel calm, premium, and highly readable, with subtle motion design inspired by modern Apple product storytelling.

## Role
You are a senior React UI engineer with strong product taste. You build minimalist education interfaces with refined motion, clean information hierarchy, and production-friendly component structure.

## Tech Stack
- React with functional components and Hooks
- Tailwind CSS for layout, spacing, color, and responsive styling
- Framer Motion for layout transitions, entrance animation, and interaction details

## Deliverable
Produce a complete, runnable React demo page with:
- A minimal header introducing the project
- An animated tab navigation for content categories
- A content area that switches by active category using `AnimatePresence`
- Chinese placeholder content focused on teacher collaboration, teaching resources, and AI-related education links

## Interaction Requirements
1. The active tab must use a Framer Motion shared layout underline with `layoutId`, so the underline glides smoothly between tabs.
2. When switching categories, the content area must animate in and out with `AnimatePresence`.
3. Discussion cards inside the active panel must appear with staggered fade-up animation.
4. Cards must include spring-based hover lift/scale and a subtle tap compression effect.

## Visual Direction
- Palette: white, slate, soft gray, with indigo accents
- Typography: spacious line height, calm and premium readability
- Layout: light editorial feel, clear spacing, strong card rhythm
- Atmosphere: soft gradients or background glow are welcome, but keep the page minimalist rather than flashy

## Content Direction
Use Chinese placeholder data that feels realistic for a teacher sharing community. Include categories such as:
- AI 教学
- 教学资源
- 研讨共创

Each category should include:
- A short section label
- A strong headline
- A concise descriptive paragraph
- A small set of stat cards or highlights
- Three discussion/resource cards with Chinese titles and summaries

## Engineering Expectations
- Keep the component tree clean and readable
- Extract data into a separate constant or JSON-like structure
- Ensure the UI works well on both desktop and mobile
- Prefer elegant motion timing over excessive effects
- Avoid generic dashboard styling; the result should feel intentional and presentation-ready
