# VibeUp Authentication System Documentation

## Table of Contents
1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Authentication Flow](#authentication-flow)
4. [Frontend Components](#frontend-components)
5. [Backend Components](#backend-components)
6. [Security Features](#security-features)
7. [Token Management](#token-management)
8. [API Endpoints](#api-endpoints)
9. [Error Handling](#error-handling)
10. [Configuration](#configuration)
11. [Usage Examples](#usage-examples)
12. [Future Enhancements](#future-enhancements)

---

## Overview

VibeUp uses a **Google OAuth 2.0** authentication system with JWT (JSON Web Tokens) for session management. The system provides secure, stateless authentication with token refresh capabilities.

### Key Features
- 🔐 Google OAuth 2.0 authentication
- 🎫 JWT-based access and refresh tokens
- 🔄 Automatic token refresh mechanism
- 💾 Local storage persistence
- 🛡️ Protected routes
- 📱 Responsive user state management
- ⚡ React Context API for state management

---

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Frontend (React)                         │
│                                                                   │
│  ┌─────────────────┐    ┌──────────────┐    ┌────────────────┐ │
│  │  UI Components  │ ←→ │ Auth Context │ ←→ │ Auth Service   │ │
│  │  - LoginButton  │    │  - useAuth   │    │  - API calls   │ │
│  │  - Protected    │    │  - useOAuth  │    │  - Token mgmt  │ │
│  │    Routes       │    │              │    │                │ │
│  └─────────────────┘    └──────────────┘    └────────────────┘ │
│                                │                      │          │
└────────────────────────────────┼──────────────────────┼──────────┘
                                 │                      │
                                 ▼                      ▼
                      ┌─────────────────────────────────────┐
                      │     Google OAuth 2.0 Service        │
                      └─────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Backend (Node.js/Express)                   │
│                                                                   │
│  ┌─────────────┐    ┌─────────────┐    ┌──────────────────────┐│
│  │   Routes    │ ←→ │ Controllers │ ←→ │     Services         ││
│  │  - /auth/*  │    │  - Auth     │    │  - Auth Service      ││
│  └─────────────┘    └─────────────┘    │  - Token generation  ││
│         │                               │  - Token validation  ││
│         ▼                               └──────────────────────┘│
│  ┌─────────────┐                               │                │
│  │ Middleware  │                               ▼                │
│  │  - Auth     │                        ┌──────────────┐        │
│  └─────────────┘                        │ Repositories │        │
│                                         │  - User      │        │
│                                         └──────────────┘        │
│                                                │                 │
└────────────────────────────────────────────────┼─────────────────┘
                                                 ▼
                                         ┌──────────────┐
                                         │   Database   │
                                         │  (Postgres)  │
                                         └──────────────┘
```

### Technology Stack

**Frontend:**
- React 18+ with TypeScript
- @react-oauth/google (OAuth library)
- React Context API (state management)
- Local Storage (token persistence)
- Vite (build tool)

**Backend:**
- Node.js with Express
- TypeScript
- JWT (jsonwebtoken)
- Sequelize ORM
- PostgreSQL database

---

## Authentication Flow

### Complete Step-by-Step Flow

#### 1. User Initiates Login

```
User clicks "Login with Google" button
         ↓
useOAuth hook triggers loginWithGoogle()
         ↓
@react-oauth/google opens Google OAuth popup
```

#### 2. Google Authentication

```
User selects Google account and grants permissions
         ↓
Google OAuth returns access token to frontend
         ↓
useOAuth.handleGoogleSuccess() receives token
```

#### 3. Backend Authentication

```
Frontend sends Google access token to backend
         POST /api/auth/oauth/callback
         Body: { token: "google_access_token", provider: "google" }
         ↓
Backend Controller validates request
         ↓
Auth Service fetches user info from Google API
         GET https://www.googleapis.com/oauth2/v2/userinfo
         Headers: Authorization: Bearer <google_access_token>
         ↓
Google returns user info: { id, email, name, picture }
```

#### 4. User Management

```
Auth Service calls User Repository
         ↓
Repository checks if user exists (by googleId)
         ↓
If user exists: Retrieve existing user
If new user: Create user in database
         ↓
User record returned to Auth Service
```

#### 5. Token Generation

```
Auth Service generates JWT tokens:
         ↓
Access Token (1 hour expiry)
  - Payload: { id, email }
  - Signed with JWT_SECRET
         ↓
Refresh Token (7 days expiry)
  - Payload: { id }
  - Signed with JWT_REFRESH_SECRET
```

#### 6. Response to Frontend

```
Backend sends response:
{
  token: "jwt_access_token",
  refreshToken: "jwt_refresh_token",
  user: {
    id: "user_id",
    email: "user@example.com",
    name: "User Name",
    picture: "avatar_url"
  }
}
         ↓
Frontend Auth Service saves to localStorage:
  - auth_token
  - refresh_token
  - user
         ↓
Auth Context updates state:
  - user: <user_object>
  - isAuthenticated: true
  - isLoading: false
```

#### 7. Subsequent Authenticated Requests

```
User makes API request
         ↓
authService.apiRequest() adds Authorization header
         Headers: { Authorization: "Bearer <jwt_access_token>" }
         ↓
Backend Auth Middleware intercepts request
         ↓
Middleware extracts and verifies JWT token
         ↓
If valid: Fetch user from database and attach to req.user
If invalid/expired: Return 401 Unauthorized
         ↓
Controller processes authenticated request
```

#### 8. Token Refresh Flow (When Access Token Expires)

```
Access token expires after 1 hour
         ↓
API request fails with 401
         ↓
Frontend sends refresh token
         POST /api/auth/refresh
         Body: { refreshToken: "jwt_refresh_token" }
         ↓
Backend verifies refresh token
         ↓
If valid: Generate new access + refresh tokens
If invalid: User must re-authenticate
         ↓
Frontend saves new tokens
         ↓
Retry original request with new access token
```

#### 9. Logout Flow

```
User clicks logout
         ↓
Frontend calls authContext.logout()
         ↓
Frontend notifies backend (optional)
         POST /api/auth/logout
         ↓
Frontend clears localStorage:
  - auth_token
  - refresh_token
  - user
  - oauth_state
         ↓
Auth Context updates state:
  - user: null
  - isAuthenticated: false
```

#### 10. Session Persistence (Page Reload)

```
User reloads page
         ↓
AuthContext useEffect runs on mount
         ↓
Check localStorage for stored token and user
         ↓
If found: Validate with backend
         GET /api/auth/user
         Headers: { Authorization: "Bearer <token>" }
         ↓
If valid: Restore user state
If invalid: Clear storage and show login
```

---

## Frontend Components

### 1. Auth Context (`AuthContext.tsx`)

**Purpose:** Central state management for authentication

**Responsibilities:**
- Manages authentication state (user, isAuthenticated, isLoading, error)
- Provides authentication functions (login, logout, refreshUser)
- Handles initial auth check on app startup
- Persists and restores auth state

**Key Functions:**
```typescript
// Login with Google token
login(googleToken: string): Promise<void>

// Logout user
logout(): Promise<void>

// Refresh user data from server
refreshUser(): Promise<void>
```

**State:**
```typescript
{
  user: User | null,
  isAuthenticated: boolean,
  isLoading: boolean,
  error: string | null
}
```

### 2. Auth Service (`authService.ts`)

**Purpose:** Handles all authentication API calls and token management

**Key Functions:**

```typescript
// Get stored auth token
getAuthToken(): string | null

// Get stored user from localStorage
getStoredUser(): User | null

// Login with Google OAuth token
loginWithGoogle(googleToken: string): Promise<User>

// Get current authenticated user
getCurrentUser(): Promise<User>

// Logout and clear auth data
logout(): Promise<void>

// Make authenticated API request
apiRequest<T>(endpoint: string, options?: RequestInit): Promise<T>
```

**Token Storage:**
- Uses `localStorage` for persistence
- Stores: auth_token, refresh_token, user, oauth_state

### 3. Custom Hooks

#### `useAuth()`
Access authentication context from any component

```typescript
const { user, isAuthenticated, isLoading, login, logout } = useAuth();
```

#### `useOAuth()`
Handle Google OAuth flow

```typescript
const { loginWithGoogle, isLoading, error } = useOAuth();

// Trigger Google login
<button onClick={loginWithGoogle}>Login with Google</button>
```

### 4. UI Components

#### `LoginButton.tsx`
Renders Google login button and handles OAuth flow

#### `ProtectedRoute.tsx`
Wrapper component that requires authentication

```typescript
<ProtectedRoute>
  <DashboardPage />
</ProtectedRoute>
```

#### `PublicRoute.tsx`
Redirects authenticated users away from public pages (e.g., login page)

---

## Backend Components

### 1. Routes (`auth.routes.ts`)

Defines authentication API endpoints:

| Method | Endpoint | Protected | Description |
|--------|----------|-----------|-------------|
| POST | `/api/auth/oauth/callback` | No | Handle Google OAuth login |
| GET | `/api/auth/user` | Yes | Get current user info |
| POST | `/api/auth/refresh` | No | Refresh access token |
| POST | `/api/auth/logout` | Yes | Logout user |

### 2. Controller (`auth.controller.ts`)

**Purpose:** Handle HTTP requests and responses

**Methods:**

```typescript
// Handle Google OAuth callback
googleOAuthCallback(req, res): Promise<Response>
  - Validates provider and token
  - Calls auth service
  - Returns JWT tokens and user data

// Get current authenticated user
getCurrentUser(req, res): Promise<Response>
  - Returns user from req.user (set by middleware)

// Refresh access token
refreshToken(req, res): Promise<Response>
  - Validates refresh token
  - Generates new tokens

// Logout user
logout(req, res): Promise<Response>
  - Returns success message
  - Note: JWT is stateless, client discards tokens
```

### 3. Service (`auth.service.ts`)

**Purpose:** Business logic for authentication

**Key Methods:**

```typescript
// Authenticate with Google
async googleLogin(accessToken: string): Promise<AuthTokens>
  1. Fetch user info from Google
  2. Find or create user in database
  3. Generate JWT tokens
  4. Return user and tokens

// Fetch user info from Google API
private async fetchGoogleUserInfo(accessToken: string): Promise<GoogleUserInfo>

// Generate JWT tokens
generateTokens(user: User): { token: string; refreshToken: string }
  - Access token: 1 hour expiry
  - Refresh token: 7 days expiry

// Verify JWT tokens
verifyAccessToken(token: string): any
verifyRefreshToken(token: string): any

// Refresh access token
async refreshAccessToken(refreshToken: string): Promise<Tokens>

// Get user by ID
async getUserById(userId: string): Promise<User | null>
```

### 4. Middleware (`auth.middleware.ts`)

**Purpose:** Protect routes by verifying JWT tokens

**Flow:**
1. Extract token from `Authorization` header
2. Verify JWT token signature and expiry
3. Fetch user from database
4. Attach user to `req.user`
5. Call `next()` or return 401

**Usage:**
```typescript
router.get("/protected", authMiddleware, controller.method);
```

### 5. Repository (`user.repository.ts`)

**Purpose:** Database operations for User model

**Key Methods:**
```typescript
// Find user by email
async findByEmail(email: string): Promise<User | null>

// Find user by Google ID
async findByGoogleId(googleId: string): Promise<User | null>

// Find or create user by Google ID
async findOrCreateByGoogleId(googleId, userData): Promise<{user, created}>

// Update user profile
async updateProfile(userId, profileData): Promise<User | null>
```

### 6. Model (`User.model.ts`)

**Database Schema:**

```typescript
User {
  id: UUID (primary key)
  email: string (unique, validated)
  name: string
  avatarUrl: string (optional)
  googleId: string (unique)
  createdAt: timestamp
  updatedAt: timestamp
}
```

---

## Security Features

### 1. JWT Token Security

**Access Token:**
- Short lifespan (1 hour)
- Contains user ID and email
- Signed with `JWT_SECRET`
- Used for API authentication

**Refresh Token:**
- Longer lifespan (7 days)
- Contains only user ID
- Signed with separate `JWT_REFRESH_SECRET`
- Used to generate new access tokens

### 2. Token Storage

**Frontend:**
- Tokens stored in localStorage
- Automatically included in API requests
- Cleared on logout

**Security Considerations:**
- localStorage is vulnerable to XSS attacks
- Important: Sanitize all user inputs
- Consider httpOnly cookies for enhanced security (future enhancement)

### 3. Protected Routes

**Frontend:**
- `ProtectedRoute` component checks authentication
- Redirects to login if not authenticated

**Backend:**
- `authMiddleware` validates JWT on protected endpoints
- Returns 401 if token is invalid/expired

### 4. OAuth Security

- Uses official `@react-oauth/google` library
- State parameter prevents CSRF attacks
- Token validation with Google's API
- Verified email addresses only

### 5. Environment Variables

**Frontend (.env):**
```env
VITE_API_BASE_URL=http://localhost:3000
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

**Backend (.env):**
```env
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_jwt_refresh_secret
DATABASE_URL=postgresql://...
```

⚠️ **Never commit .env files to version control**

---

## Token Management

### Access Token Lifecycle

```
┌─────────────────────────────────────────────────────────┐
│                   Token Lifecycle                        │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  Login         Access Token Created (1h expiry)          │
│    ↓                                                      │
│  Stored        Saved to localStorage                     │
│    ↓                                                      │
│  Usage         Included in API requests (Bearer token)   │
│    ↓                                                      │
│  Validation    Backend verifies on each request          │
│    ↓                                                      │
│  Expiry        After 1 hour, token becomes invalid       │
│    ↓                                                      │
│  Refresh       Use refresh token to get new access token │
│    ↓                                                      │
│  New Token     Fresh access token (1h expiry)            │
│    ↓                                                      │
│  Repeat        Continue cycle until refresh token expires│
│    ↓                                                      │
│  Re-auth       After 7 days, user must login again       │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

### Token Refresh Strategy

**Current Implementation:**
- Manual refresh using `/api/auth/refresh` endpoint
- Client responsible for detecting expired tokens

**Recommended Implementation (Future):**
```typescript
// Automatic token refresh interceptor
apiRequest.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      // Try to refresh token
      const newToken = await refreshAccessToken();
      if (newToken) {
        // Retry original request with new token
        return retryRequest(error.config, newToken);
      }
    }
    throw error;
  }
);
```

---

## API Endpoints

### Authentication Endpoints

#### 1. Google OAuth Callback

**POST** `/api/auth/oauth/callback`

Exchange Google access token for JWT tokens.

**Request:**
```json
{
  "token": "google_access_token_here",
  "provider": "google"
}
```

**Response (200):**
```json
{
  "token": "jwt_access_token",
  "refreshToken": "jwt_refresh_token",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "picture": "https://..."
  }
}
```

**Errors:**
- `400`: Invalid provider or missing token
- `400`: Invalid Google token
- `500`: Server error

#### 2. Get Current User

**GET** `/api/auth/user`

Get currently authenticated user information.

**Headers:**
```
Authorization: Bearer <jwt_access_token>
```

**Response (200):**
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "name": "John Doe",
  "picture": "https://..."
}
```

**Errors:**
- `401`: Not authenticated or invalid token
- `500`: Server error

#### 3. Refresh Token

**POST** `/api/auth/refresh`

Get new access token using refresh token.

**Request:**
```json
{
  "refreshToken": "jwt_refresh_token"
}
```

**Response (200):**
```json
{
  "token": "new_jwt_access_token",
  "refreshToken": "new_jwt_refresh_token"
}
```

**Errors:**
- `400`: Missing refresh token
- `401`: Invalid or expired refresh token

#### 4. Logout

**POST** `/api/auth/logout`

Logout current user (client clears tokens).

**Headers:**
```
Authorization: Bearer <jwt_access_token>
```

**Response (200):**
```json
{
  "message": "Logged out successfully"
}
```

**Note:** With stateless JWT, logout is primarily client-side (clearing tokens).

---

## Error Handling

### Frontend Error Handling

**Auth Context:**
```typescript
try {
  await login(googleToken);
} catch (err) {
  const message = err instanceof Error ? err.message : "Login failed";
  setError(message);
  throw err;
}
```

**OAuth Hook:**
```typescript
const handleGoogleError = (errorResponse) => {
  if (errorResponse.error === "invalid_client") {
    setOAuthError("Invalid Google Client ID...");
  } else if (errorResponse.error_description) {
    setOAuthError(errorResponse.error_description);
  }
};
```

### Backend Error Handling

**Controller Level:**
```typescript
try {
  const result = await authService.googleLogin(token);
  return res.json(result);
} catch (err: any) {
  return res.status(400).json({ message: err.message });
}
```

**Service Level:**
```typescript
try {
  const googleUser = await this.fetchGoogleUserInfo(accessToken);
  // ...
} catch (error) {
  throw new Error("Failed to authenticate with Google");
}
```

**Middleware Level:**
```typescript
try {
  const payload = authService.verifyAccessToken(token);
  // ...
} catch (err) {
  return res.status(401).json({ message: "Invalid or expired token" });
}
```

### Common Error Scenarios

| Error | HTTP Code | Cause | Solution |
|-------|-----------|-------|----------|
| No token provided | 401 | Missing Authorization header | Include token in request |
| Invalid token format | 401 | Malformed Bearer token | Check token format |
| Invalid or expired token | 401 | JWT expired or invalid signature | Refresh token or re-authenticate |
| User not found | 401 | User deleted from database | Clear local storage, re-authenticate |
| Unsupported provider | 400 | Provider other than Google | Only Google is supported |
| Invalid Google token | 400 | Google token verification failed | Re-authenticate with Google |
| Invalid refresh token | 401 | Refresh token expired or invalid | User must login again |

---

## Configuration

### Frontend Setup

1. **Install dependencies:**
```bash
npm install @react-oauth/google
```

2. **Create `.env` file:**
```env
VITE_API_BASE_URL=http://localhost:3000
VITE_GOOGLE_CLIENT_ID=your_client_id_here.apps.googleusercontent.com
```

3. **Wrap app with GoogleOAuthProvider:**
```tsx
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './context/AuthContext';

<GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
  <AuthProvider>
    <App />
  </AuthProvider>
</GoogleOAuthProvider>
```

### Backend Setup

1. **Install dependencies:**
```bash
npm install jsonwebtoken
npm install --save-dev @types/jsonwebtoken
```

2. **Create `.env` file:**
```env
JWT_SECRET=your_super_secret_jwt_key_here
JWT_REFRESH_SECRET=your_super_secret_refresh_key_here
DATABASE_URL=postgresql://user:password@localhost:5432/vibeup
```

3. **Register routes:**
```typescript
import authRoutes from './routes/auth.routes';
app.use('/api/auth', authRoutes);
```

### Google Cloud Console Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Configure OAuth consent screen
6. Add authorized JavaScript origins:
   - `http://localhost:5173` (development)
   - `https://yourdomain.com` (production)
7. Add authorized redirect URIs (if needed)
8. Copy Client ID to `.env`

---

## Usage Examples

### Example 1: Login Button Component

```tsx
import { useOAuth } from '@/features/auth/hooks/useOAuth';

export function LoginButton() {
  const { loginWithGoogle, isLoading, error } = useOAuth();

  return (
    <div>
      <button 
        onClick={() => loginWithGoogle()} 
        disabled={isLoading}
      >
        {isLoading ? 'Logging in...' : 'Login with Google'}
      </button>
      {error && <p className="error">{error}</p>}
    </div>
  );
}
```

### Example 2: Protected Dashboard

```tsx
import { useAuth } from '@/features/auth/hooks/useAuth';
import { ProtectedRoute } from '@/features/auth/components';

function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1>Welcome, {user?.name}!</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

// In router
<ProtectedRoute>
  <Dashboard />
</ProtectedRoute>
```

### Example 3: Making Authenticated API Calls

```tsx
import { getAuthToken } from '@/features/auth/services/authService';

async function fetchUserData() {
  const token = getAuthToken();
  
  const response = await fetch(`${API_BASE_URL}/api/user/profile`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  
  if (!response.ok) {
    if (response.status === 401) {
      // Token expired, redirect to login
      window.location.href = '/login';
    }
    throw new Error('Failed to fetch user data');
  }
  
  return response.json();
}
```

### Example 4: Creating Protected Backend Route

```typescript
import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

// Protected route - requires authentication
router.get('/profile', authMiddleware, async (req, res) => {
  const user = req.user; // User attached by middleware
  
  res.json({
    id: user.id,
    email: user.email,
    name: user.name,
  });
});

export default router;
```

---

## Future Enhancements

### Planned Features

1. **Multiple OAuth Providers**
   - GitHub authentication
   - Apple Sign-In
   - Microsoft authentication
   - Create `UserIdentity` model to support multiple providers per user

2. **Enhanced Token Security**
   - Implement httpOnly cookies for token storage
   - Add CSRF protection
   - Implement token rotation
   - Add token blacklisting for logout

3. **Session Management**
   - Track active sessions per user
   - Device management
   - Force logout from all devices
   - Session activity logs

4. **Email/Password Authentication**
   - Traditional username/password login
   - Password hashing with bcrypt
   - Password reset flow
   - Email verification

5. **Two-Factor Authentication (2FA)**
   - TOTP (Time-based One-Time Password)
   - SMS verification
   - Backup codes

6. **Rate Limiting**
   - Prevent brute force attacks
   - Implement request throttling
   - IP-based rate limiting

7. **Audit Logging**
   - Log authentication attempts
   - Track user activities
   - Security event monitoring

8. **Automatic Token Refresh**
   - Implement axios/fetch interceptor
   - Automatic refresh before expiry
   - Silent token refresh

9. **Remember Me Feature**
   - Longer-lived refresh tokens (optional)
   - Persistent login option

10. **Account Management**
    - Delete account
    - Download user data (GDPR compliance)
    - Privacy settings
    - Connected accounts management

### Technical Debt

- [ ] Add comprehensive error logging
- [ ] Implement request/response interceptors for automatic token refresh
- [ ] Add unit tests for auth service
- [ ] Add integration tests for auth flow
- [ ] Implement proper CORS configuration
- [ ] Add API rate limiting
- [ ] Create database migrations for User model
- [ ] Add data validation with Zod or Yup
- [ ] Implement proper TypeScript types across the board
- [ ] Add API documentation with Swagger/OpenAPI

---

## Troubleshooting

### Common Issues

#### "Invalid Google Client ID"
**Cause:** Misconfigured Google OAuth credentials
**Solution:**
1. Verify `VITE_GOOGLE_CLIENT_ID` in `.env`
2. Check Google Cloud Console configuration
3. Ensure authorized JavaScript origins include your domain
4. Make sure OAuth consent screen is configured

#### "Token expired" / 401 errors
**Cause:** JWT access token expired (after 1 hour)
**Solution:**
- Implement automatic token refresh
- Use refresh token to get new access token
- Re-authenticate if refresh token also expired

#### "User not found" after successful login
**Cause:** Database connection issue or user was deleted
**Solution:**
- Check database connection
- Verify user exists in database
- Check backend logs for errors

#### Infinite redirect loop
**Cause:** Protected route logic issue
**Solution:**
- Check `ProtectedRoute` implementation
- Verify auth state is properly initialized
- Check for race conditions in auth check

#### CORS errors
**Cause:** Backend not configured to accept frontend origin
**Solution:**
- Configure CORS in backend
- Add frontend URL to allowed origins
- Check if credentials are included in requests

---

## Support and Resources

### Internal Documentation
- [Frontend README](../../README.md)
- [Backend README](../../../vibeup-backend/README.md)

### External Resources
- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [JWT Introduction](https://jwt.io/introduction)
- [React OAuth Google Library](https://github.com/MomenSherif/react-oauth)
- [Express.js Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)

### Team Contacts
For questions or issues with authentication:
- Backend: [Your backend team contact]
- Frontend: [Your frontend team contact]
- DevOps: [Your DevOps contact]

---

## Changelog

### Version 1.0.0 (Current)
- Initial implementation
- Google OAuth authentication
- JWT token management
- Basic user model
- Protected routes
- Local storage persistence

---

**Last Updated:** November 19, 2025  
**Maintained By:** VibeUp Development Team

