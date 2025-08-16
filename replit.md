# Portfolio Application

## Overview

This is a modern full-stack personal portfolio application built with React, Express, and TypeScript. The application features a sleek, interactive design with animated elements, 3D visual effects, and a comprehensive contact form system. It showcases a developer's skills, projects, and provides a way for visitors to get in touch through a contact form that stores submissions in a database.

## User Preferences

Preferred communication style: Simple, everyday language.
Portfolio requirements: More features and functionality, enhanced parallax scrolling, improved animations.

## Recent Changes (August 2025)

### Portfolio Enhancement Updates
- ✅ Fixed text visibility issues for "Hamd" name and "Get In Touch" sections
- ✅ Removed problematic hanging animations that were causing display issues
- ✅ Added comprehensive Skills showcase with 6 technical categories
- ✅ Implemented Experience timeline with professional background
- ✅ Created interactive Statistics section with animated counters
- ✅ Added Client Testimonials carousel with real testimonials
- ✅ Enhanced parallax scrolling throughout all sections
- ✅ Improved navigation with all new sections
- ✅ Added floating background elements for visual appeal
- ✅ Implemented scroll progress indicator
- ✅ Enhanced text contrast and visibility across all themes
- ✅ Added proper positioning to fix scroll offset warnings

### New Components Added
- Skills.tsx - Technical skills categorized by specialty
- Experience.tsx - Professional timeline with achievements
- Stats.tsx - Animated statistics with counters
- Testimonials.tsx - Client testimonials carousel
- ScrollProgress.tsx - Enhanced scroll progress indicator
- FloatingElements.tsx - Animated background elements
- hooks/use-parallax.ts - Reusable parallax scrolling hook

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Styling**: Tailwind CSS with custom CSS variables for consistent theming
- **UI Components**: Radix UI primitives with shadcn/ui component library for accessible, customizable components
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state management and API interactions
- **Forms**: React Hook Form with Zod validation for type-safe form handling
- **Animations**: CSS-based animations with custom keyframes, simulated 3D effects using CSS transforms

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules for modern JavaScript features
- **Database Layer**: Drizzle ORM with PostgreSQL for type-safe database operations
- **Storage Pattern**: Abstract storage interface with in-memory implementation for development
- **Session Management**: Express sessions with PostgreSQL session store
- **API Design**: RESTful endpoints with structured error handling and request logging

### Development Tools
- **Build System**: Vite for fast development and optimized production builds
- **Code Quality**: TypeScript strict mode with comprehensive type checking
- **Development Server**: Express with Vite middleware integration for seamless full-stack development
- **Hot Reload**: Vite HMR for instant feedback during development

### Database Schema
- **Users Table**: Basic user management with username/password authentication
- **Contacts Table**: Contact form submissions with name, email, subject, message, optional phone, and timestamp
- **Schema Validation**: Drizzle-zod integration for runtime type validation

### UI/UX Design Patterns
- **Responsive Design**: Mobile-first approach with breakpoint-based layouts
- **Dark/Light Theme**: CSS variable-based theming with localStorage persistence
- **Loading States**: Animated loading screen with progress indicators
- **Interactive Elements**: Hover effects, smooth scrolling, and animated transitions
- **Accessibility**: ARIA labels, keyboard navigation, and screen reader support

## External Dependencies

### Core Technologies
- **@neondatabase/serverless**: Serverless PostgreSQL database connection
- **drizzle-orm**: Type-safe ORM for database operations
- **drizzle-kit**: Database schema migration and management tools

### UI Framework
- **@radix-ui/***: Comprehensive set of accessible UI primitives
- **@tanstack/react-query**: Server state management and caching
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Type-safe variant management for components

### Form Handling
- **react-hook-form**: Performant form library with minimal re-renders
- **@hookform/resolvers**: Integration between React Hook Form and validation libraries
- **zod**: TypeScript-first schema validation

### Development Infrastructure
- **vite**: Next-generation frontend build tool
- **tsx**: TypeScript execution environment for Node.js
- **esbuild**: Fast JavaScript bundler for production builds

### Styling and Assets
- **clsx**: Utility for constructing className strings conditionally
- **tailwind-merge**: Utility for merging Tailwind CSS classes
- **lucide-react**: Beautiful, customizable SVG icons
- **embla-carousel-react**: Smooth carousel component

### Session and Security
- **express-session**: Session middleware for Express
- **connect-pg-simple**: PostgreSQL session store for persistent sessions

### Utilities
- **date-fns**: Modern JavaScript date utility library
- **nanoid**: URL-safe unique string ID generator