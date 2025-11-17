# 🏗️ Project Structure - Best Practices Guide

This project follows **React best practices** and **SOLID principles** for maintainable, scalable code.

## 📁 Complete Directory Tree

```
vibeup-frontend/
├── public/                 # Static public assets
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── common/       # Shared components (Button, Input, etc.)
│   │   └── ui/           # UI primitives (atoms, molecules)
│   ├── features/         # Feature-based modules (SRP)
│   │   └── [feature]/    # Self-contained features
│   │       ├── components/
│   │       ├── hooks/
│   │       ├── services/
│   │       ├── types/
│   │       └── index.ts  # Public API
│   ├── hooks/            # Shared custom React hooks
│   ├── services/         # API services & external integrations
│   ├── types/            # Global TypeScript types
│   ├── utils/            # Pure utility functions
│   ├── constants/        # App constants & config
│   ├── context/          # React Context providers
│   ├── assets/           # Static assets
│   │   ├── images/       # Image files
│   │   └── icons/        # Icon files
│   ├── styles/           # Global styles & theme
│   ├── App.tsx           # Root component
│   ├── main.tsx          # Entry point
│   └── index.css         # Global CSS
├── vite.config.ts        # Vite config with path aliases
├── tsconfig.app.json     # TypeScript config with paths
└── package.json
```

## 🎯 SOLID Principles Applied

### 1. **Single Responsibility Principle (SRP)**
- Each feature folder contains only code for that feature
- Components have one clear purpose
- Services handle only API/data operations
- Hooks encapsulate single pieces of logic

### 2. **Open/Closed Principle (OCP)**
- Components extendable via props composition
- Hooks can be composed together
- Services can be extended without modification

### 3. **Liskov Substitution Principle (LSP)**
- Consistent component interfaces
- Type-safe prop contracts
- Interchangeable implementations

### 4. **Interface Segregation Principle (ISP)**
- Components receive only needed props
- Focused, single-purpose hooks
- Domain-specific services

### 5. **Dependency Inversion Principle (DIP)**
- Components depend on abstractions (types/props)
- Services depend on interfaces
- Context provides dependency injection

## 🚀 Key Features

✅ **Path Aliases**: Use `@/` for clean imports  
✅ **Barrel Exports**: Clean imports via `index.ts` files  
✅ **Feature-Based**: Self-contained feature modules  
✅ **Type Safety**: Full TypeScript support  
✅ **Separation of Concerns**: UI, logic, and data separated  
✅ **Scalable**: Easy to add new features  
✅ **Testable**: Structure supports unit testing  
✅ **Maintainable**: Clear organization and conventions  

## 📚 Documentation

- **`src/FOLDER_STRUCTURE.md`**: Detailed folder explanations
- **`src/QUICK_START.md`**: Quick reference for imports
- **`src/features/README.md`**: Feature development guide

## 🔧 Configuration

### Path Aliases (Configured in `vite.config.ts` & `tsconfig.app.json`)
- `@/` → `src/`
- `@/components` → `src/components`
- `@/features` → `src/features`
- `@/hooks` → `src/hooks`
- `@/services` → `src/services`
- `@/types` → `src/types`
- `@/utils` → `src/utils`
- `@/constants` → `src/constants`
- `@/context` → `src/context`
- `@/assets` → `src/assets`
- `@/styles` → `src/styles`

## 📝 Next Steps

1. **Start building features** in `src/features/`
2. **Create common components** in `src/components/common/`
3. **Add custom hooks** in `src/hooks/`
4. **Set up API services** in `src/services/`
5. **Define types** in `src/types/`

## 💡 Tips

- Always use path aliases (`@/`) instead of relative paths
- Export components/hooks via barrel files
- Keep features independent and self-contained
- Use TypeScript types for all props and data
- Co-locate related files (component + types + styles)
- Keep components small and focused
- Extract reusable logic into custom hooks
- Centralize API calls in services

---

**Happy coding! 🎉**

