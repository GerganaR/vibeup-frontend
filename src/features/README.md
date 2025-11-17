# Features Directory

This directory follows a **feature-based architecture** where each feature is self-contained.

## Structure

Each feature should have the following structure:

```
features/
└── [feature-name]/
    ├── components/      # Feature-specific components
    ├── hooks/          # Feature-specific hooks
    ├── services/       # Feature-specific API calls
    ├── types/          # Feature-specific types
    └── index.ts        # Public API (barrel export)
```

## Principles

1. **Self-contained**: All code related to a feature lives in its folder
2. **Public API**: Only export what other features need via `index.ts`
3. **No cross-feature imports**: Features should not directly import from other features
4. **Shared code**: Use `/components/common`, `/hooks`, `/services` for shared code

## Example Feature Structure

```
features/
└── user/
    ├── components/
    │   ├── UserProfile.tsx
    │   ├── UserList.tsx
    │   └── index.ts
    ├── hooks/
    │   ├── useUser.ts
    │   └── index.ts
    ├── services/
    │   ├── userService.ts
    │   └── index.ts
    ├── types/
    │   ├── user.types.ts
    │   └── index.ts
    └── index.ts        # Public API
```

## Usage

```typescript
// Import from a feature's public API
import { UserProfile, useUser } from '@/features/user';

// Don't import internal implementation details
// ❌ import { UserProfile } from '@/features/user/components/UserProfile';
```

