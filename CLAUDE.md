# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server on port 8080
- `npm run build` - Production build 
- `npm run build:dev` - Development build
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Project Architecture

This is a React-based travel planning application built with Vite, TypeScript, and shadcn/ui components.

### Core Application Flow
The app follows a three-step user journey managed by state in `src/pages/Index.tsx`:
1. **Welcome screen** - Landing page with hero section and features
2. **Planning form** - Multi-step form collecting trip preferences (`TripPlanningForm.tsx`)
3. **Itinerary display** - Generated travel itinerary with editing capabilities (`ItineraryDisplay.tsx`)

### Key Components Structure
- **Pages**: `src/pages/Index.tsx` (main page), `NotFound.tsx`
- **Core Components**: `TripPlanningForm.tsx`, `ItineraryDisplay.tsx`
- **UI Library**: Complete shadcn/ui component library in `src/components/ui/`
- **Utilities**: `src/lib/utils.ts` for shared utility functions
- **Hooks**: Custom hooks in `src/hooks/`

### Data Flow
- Trip data is managed as state in the main Index component
- Form submission triggers itinerary generation with mock data
- Itinerary allows editing/deleting activities with toast notifications
- All UI state is handled through React hooks (no external state management)

### Styling & Design System
- Uses Tailwind CSS with shadcn/ui design system
- Custom CSS variables defined for theming
- Gradient backgrounds and travel-themed styling
- Responsive design with mobile-first approach
- Custom shadow classes: `shadow-card-travel`, `shadow-travel`, `shadow-glow`

### Dependencies & Stack
- **React 18** with TypeScript and SWC for fast compilation
- **Vite** for build tooling with custom port 8080
- **React Router** for routing
- **Radix UI** primitives via shadcn/ui
- **TanStack Query** for data fetching (though currently using mock data)
- **Lucide React** for icons
- **Date-fns** for date manipulation
- **Zod** for form validation (with react-hook-form)

### TypeScript Configuration
- Relaxed TypeScript settings with `noImplicitAny: false`
- Path aliases configured: `@/*` maps to `./src/*`
- Includes both app and node-specific configurations

### Development Notes
- Uses `lovable-tagger` for development mode component tagging
- ESLint configured with React hooks and refresh plugins
- Currently generates mock itinerary data - real API integration needed
- Form validation is basic - consider enhancing with Zod schemas