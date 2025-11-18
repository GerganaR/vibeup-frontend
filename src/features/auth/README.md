# Authentication Flow - Simple Guide

This guide explains how authentication works in this app. It's designed to be easy to understand for junior-mid level developers.

## 📁 File Structure

```
src/features/auth/
├── services/
│   └── authService.ts      # Login, logout, token functions
├── hooks/
│   └── useAuth.ts          # Hook to access auth in components
├── types/
│   └── index.ts            # User type definition
└── components/
    └── (auth UI components)

src/context/
└── AuthContext.tsx          # Manages auth state for entire app
```

## 🔑 How It Works

### 1. **AuthContext** - The Central State Manager

`AuthContext.tsx` holds the authentication state for your entire app:

- Who is logged in (`user`)
- Are they logged in? (`isAuthenticated`)
- Is something loading? (`isLoading`)
- Any errors? (`error`)

It also provides functions:

- `login(googleToken)` - Log in with Google
- `logout()` - Log out
- `refreshUser()` - Get latest user data from server

### 2. **authService** - Simple Functions

`authService.ts` contains plain functions (not a class!) that:

- Talk to the backend API
- Save/load data from localStorage
- Handle Google login tokens

**Main functions:**

- `loginWithGoogle(token)` - Send Google token to backend, save user data
- `getCurrentUser()` - Fetch current user from backend
- `logout()` - Clear everything
- `getAuthToken()` - Get saved token
- `getStoredUser()` - Get saved user

### 3. **useAuth Hook** - Easy Component Access

Use this hook in any component to access auth:

```tsx
function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();

  if (!isAuthenticated) {
    return <button onClick={() => login(googleToken)}>Login</button>;
  }

  return (
    <div>
      <p>Welcome, {user.name}!</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

## 🚀 Authentication Flow

### Login Flow:

1. User clicks "Login with Google"
2. Google OAuth returns a token
3. Call `login(googleToken)` from `useAuth()`
4. This calls `loginWithGoogle()` in authService
5. Backend validates token and returns user data + app token
6. Data saved to localStorage
7. User state updated in AuthContext
8. App re-renders, user is now logged in!

### Logout Flow:

1. User clicks "Logout"
2. Call `logout()` from `useAuth()`
3. Backend notified (optional - continues even if fails)
4. localStorage cleared
5. User state set to null
6. App re-renders, user logged out!

### On App Startup:

1. AuthProvider checks localStorage for saved user + token
2. If found, verifies with backend by calling `getCurrentUser()`
3. If valid, user is logged in automatically
4. If invalid, clears everything

## 💾 Data Storage

Everything is stored in localStorage:

- `auth_token` - JWT token for API requests
- `refresh_token` - Token to get new auth_token (if supported)
- `user` - User data (JSON string)

## 🔒 Protected Routes

Use in your router to protect pages:

```tsx
function ProtectedPage() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" />;

  return <div>Protected content here!</div>;
}
```

## 🐛 Error Handling

Errors are simple and straightforward:

- Login fails? Error message set in context
- Token invalid? User logged out automatically
- Backend down? Caught and displayed

Access errors via:

```tsx
const { error } = useAuth();
if (error) return <div>Error: {error}</div>;
```

## 📝 Common Tasks

### Add Login Button

```tsx
import { useAuth } from "@/features/auth/hooks";

function LoginButton() {
  const { login } = useAuth();

  const handleLogin = async (googleToken: string) => {
    try {
      await login(googleToken);
      // Success! User is logged in
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return <button onClick={() => handleLogin(token)}>Login</button>;
}
```

### Check if User is Logged In

```tsx
const { isAuthenticated, user } = useAuth();

if (isAuthenticated) {
  console.log("User is logged in:", user.name);
}
```

### Get Fresh User Data

```tsx
const { refreshUser } = useAuth();

// After user updates their profile
await refreshUser(); // Gets latest data from server
```

## ⚠️ Important Notes

- **Always wrap your app with `<AuthProvider>`** in `main.tsx` or `App.tsx`
- **Only use `useAuth()` inside components wrapped by AuthProvider**
- **Tokens are stored in localStorage** - cleared on logout
- **Backend validation happens on startup** - ensures token is still valid

## 🎯 Key Simplifications Made

We removed:

- ❌ Complex class-based services (now simple functions)
- ❌ Auto-refresh token intervals (do it manually with refreshUser if needed)
- ❌ Complex retry logic in API client
- ❌ Nested try-catch error handling
- ❌ Multiple abstraction layers (useAuth → useAuthContext)
- ❌ Unnecessary type definitions

## 📚 Next Steps

To add more auth features:

1. **Email/Password login?** Add new function in authService.ts
2. **Remember me?** Already handled via localStorage
3. **Multi-factor auth?** Add to login flow in authService
4. **Refresh tokens?** Backend sends it, already saved, implement if needed

---

**Questions?** Read the code - it's simple and well-commented! Start with `authService.ts` and `AuthContext.tsx`.
