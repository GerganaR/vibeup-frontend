# Quick Start Guide - Folder Structure

## 📦 Import Examples

### Components

```typescript
// Common components
import { Button, Input, Card } from "@/components/common";

// UI primitives
import { Avatar, Badge } from "@/components/ui";

// Feature components
import { UserProfile } from "@/features/user";
```

### Hooks

```typescript
import { useAuth, useLocalStorage, useDebounce } from "@/hooks";
```

### Services

```typescript
import { userService, apiService } from "@/services";
```

### Types

```typescript
import type { User, ApiResponse } from "@/types";
```

### Utils

```typescript
import { formatDate, formatCurrency } from "@/utils";
```

### Constants

```typescript
import { API_BASE_URL, ROUTES, STATUS } from "@/constants";
```

### Context

```typescript
import { AuthProvider, useAuthContext } from "@/context";
```

### Assets

```typescript
import reactLogo from "@/assets/images/react.svg";
import icon from "@/assets/icons/icon.svg";
```

## 🏗️ Creating a New Feature

1. Create feature folder: `src/features/my-feature/`
2. Add subdirectories: `components/`, `hooks/`, `services/`, `types/`
3. Create `index.ts` to export public API
4. Import in other parts: `import { MyFeature } from '@/features/my-feature'`

## 🧩 Creating a Common Component

1. Create component: `src/components/common/Button/Button.tsx`
2. Create types: `src/components/common/Button/Button.types.ts`
3. Create index: `src/components/common/Button/index.ts`
4. Export from: `src/components/common/index.ts`
5. Use: `import { Button } from '@/components/common'`

## ✅ Best Practices Checklist

- [ ] Use path aliases (`@/`) instead of relative paths
- [ ] Export via barrel files (`index.ts`)
- [ ] Keep features self-contained
- [ ] Separate concerns (UI, logic, data)
- [ ] Use TypeScript types throughout
- [ ] Co-locate related files
- [ ] Keep components small and focused
- [ ] Use custom hooks for reusable logic
- [ ] Centralize API calls in services
- [ ] Use constants for magic values
