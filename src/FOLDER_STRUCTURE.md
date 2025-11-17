# Project Folder Structure

This document explains the folder structure following React best practices and SOLID principles.

## 📁 Directory Structure

```
src/
├── components/          # Reusable UI components
│   ├── common/         # Common/shared components (Button, Input, Card, etc.)
│   └── ui/             # UI primitives (atoms, molecules)
├── features/           # Feature-based modules (follows Single Responsibility)
│   └── [feature-name]/
│       ├── components/ # Feature-specific components
│       ├── hooks/      # Feature-specific hooks
│       ├── services/   # Feature-specific API calls
│       ├── types/      # Feature-specific types
│       └── index.ts    # Public API of the feature
├── hooks/              # Shared custom React hooks
├── services/           # API services and external integrations
├── types/              # Global TypeScript types and interfaces
├── utils/              # Utility functions and helpers
├── constants/          # Application constants and configuration
├── context/            # React Context providers
├── assets/             # Static assets
│   ├── images/         # Image files
│   └── icons/          # Icon files
├── styles/             # Global styles and theme configuration
├── App.tsx             # Root component
└── main.tsx            # Application entry point
```

## 🎯 Principles Applied

### Single Responsibility Principle (SRP)

- Each feature folder contains only code related to that specific feature
- Components are separated by their purpose (common vs feature-specific)
- Services handle only data fetching/API calls

### Open/Closed Principle (OCP)

- Components are designed to be extended through props
- Hooks can be composed and extended
- Services can be extended without modifying existing code

### Liskov Substitution Principle (LSP)

- Common components follow consistent interfaces
- Types ensure components can be substituted safely

### Interface Segregation Principle (ISP)

- Components receive only the props they need
- Hooks are focused and do one thing well
- Services are split by domain/resource

### Dependency Inversion Principle (DIP)

- Components depend on abstractions (props, types)
- Services depend on interfaces, not concrete implementations
- Context provides dependency injection for state management

## 📂 Folder Details

### `/components/common`

Reusable components used across multiple features:

- `Button`, `Input`, `Card`, `Modal`, `Loading`, etc.
- Each component should be self-contained with its own types
- Export via `index.ts` for clean imports

### `/components/ui`

UI primitives and design system components:

- Atomic design components
- Base styling components
- Theme-aware components

### `/features/[feature-name]`

Feature-based organization (e.g., `auth`, `dashboard`, `profile`):

- Each feature is self-contained
- Contains all related components, hooks, services, and types
- Exports only public API via `index.ts`
- Follows feature-sliced design pattern

### `/hooks`

Shared custom React hooks:

- `useAuth`, `useLocalStorage`, `useDebounce`, etc.
- Reusable across multiple features
- Each hook in its own file

### `/services`

API services and external integrations:

- Organized by resource/domain (e.g., `userService`, `apiService`)
- Handles all HTTP requests
- Centralized error handling
- Type-safe API calls

### `/types`

Global TypeScript definitions:

- Shared interfaces and types
- API response types
- Common utility types
- Re-exported for convenience

### `/utils`

Pure utility functions:

- No side effects
- Easily testable
- Organized by purpose (e.g., `dateUtils`, `formatUtils`)

### `/constants`

Application constants:

- API endpoints
- Configuration values
- Enums
- Magic numbers/strings

### `/context`

React Context providers:

- Global state management
- Theme providers
- Auth context, etc.

## 🚀 Best Practices

1. **Feature-based organization**: Group related code together
2. **Barrel exports**: Use `index.ts` files for clean imports
3. **Co-location**: Keep related files close together
4. **Separation of concerns**: UI, logic, and data fetching are separated
5. **Type safety**: Use TypeScript throughout
6. **Reusability**: Common components in `/components/common`
7. **Testability**: Structure allows easy unit testing
8. **Scalability**: Easy to add new features without refactoring

## 📝 Import Examples

```typescript
// Import from common components
import { Button, Input } from "@/components/common";

// Import from a feature
import { UserProfile } from "@/features/user";

// Import hooks
import { useAuth } from "@/hooks/useAuth";

// Import services
import { userService } from "@/services/userService";

// Import types
import type { User } from "@/types";

// Import utils
import { formatDate } from "@/utils/dateUtils";
```
