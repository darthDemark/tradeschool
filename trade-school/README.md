# Trade School

**Learn. Practice. Execute.**

The complete training ground for options traders.

## Overview

Trade School is a premium trader training academy designed to take a beginner from zero knowledge to disciplined options trader. This repository is the Phase 1 prototype shell — a complete visual and product foundation ready for the next build phase.

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page with mission, curriculum overview, and trader path |
| `/dashboard` | Student command center with progress, training assignments, and performance chart |
| `/courses` | Full curriculum overview — 8 courses across 7 semesters |
| `/lessons/[id]` | Interactive lesson page with content sections, key terms, and knowledge check |
| `/lab` | Market Lab with options chain reader, Greek visualizer, and other drill modules |
| `/simulator` | Hidden-outcome scenario trading simulator |
| `/trading-desk` | Paper trading account with order ticket, watchlist, and portfolio view |
| `/journal` | Trading journal with entry form, performance metrics, and emotional tracking |
| `/coach` | Professor AI coaching interface with mock conversation |
| `/profile` | Trader profile with rank progression, badges, and curriculum rings |

## Tech Stack

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **Google Fonts**: Playfair Display, Inter, IBM Plex Mono

## Color System

```css
--background: #F7F3EB    /* Warm parchment */
--surface: #FDFBF7       /* Off-white cards */
--accent: #B58A3C        /* Gold accent */
--text-main: #1F1F1F     /* Charcoal */
--success: #2E6E52       /* Green */
--danger: #8C3B3B        /* Red */
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Phase 1 Scope (This Build)

- Working navigation (desktop sidebar + mobile bottom nav)
- Responsive layout
- Polished UI matching the brand design system
- Static mock data throughout
- Placeholder modules for future interactive features
- Clean reusable component architecture

## Phase 2 Roadmap

- Real lesson content with interactive simulations
- Scenario engine with 50+ hidden-outcome scenarios
- Paper trading engine with position tracking
- Options pricing model (Black-Scholes)
- AI Professor integration (OpenAI / Anthropic)
- Real-time chart data provider
- Supabase database
- User authentication
- Trade journal persistence

## Mock Data

All data lives in `/lib/mockData.ts`. Replace with API calls or Supabase queries in Phase 2.

## Components

| Component | Description |
|-----------|-------------|
| `AppShell` | Root layout wrapper with sidebar + topbar |
| `Sidebar` | Desktop left nav |
| `TopBar` | Header with rank, paper account, streak |
| `MobileNav` | Bottom nav for mobile |
| `StatCard` | KPI metric card |
| `CourseCard` | Curriculum course display |
| `MockChart` | SVG performance chart |
| `OptionChainMock` | Options chain table |
| `ScenarioCard` | Interactive scenario with choice/reveal |
| `JournalEntry` | Trade journal entry card |
| `CoachMessage` | Chat bubble for Professor conversation |
| `ProgressBar` | Horizontal progress indicator |
| `ProgressRing` | Circular progress ring (SVG) |
| `Badge` | Achievement badge |
| `PageHeader` | Page title with optional action |
| `SectionHeader` | Section title with optional action |
| `EmptyState` | Empty state placeholder |
