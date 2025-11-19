# VibeUp Authentication Flow - Visual Diagram

## Complete Authentication Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        VIBEUP AUTHENTICATION FLOW                            │
└─────────────────────────────────────────────────────────────────────────────┘

┌───────────┐                                                    ┌──────────────┐
│           │                                                    │              │
│   USER    │                                                    │   GOOGLE     │
│           │                                                    │   OAUTH      │
│           │                                                    │              │
└─────┬─────┘                                                    └──────┬───────┘
      │                                                                 │
      │ 1. Click "Login with Google"                                   │
      │                                                                 │
      ▼                                                                 │
┌──────────────────────────────────────────────────────────────┐       │
│                       FRONTEND                                │       │
│                                                               │       │
│  ┌──────────────────────────────────────────────────────┐   │       │
│  │  LoginButton Component (useOAuth hook)              │   │       │
│  └──────────────┬───────────────────────────────────────┘   │       │
│                 │                                             │       │
│                 │ 2. Trigger Google OAuth popup               │       │
│                 └─────────────────────────────────────────────┼───────┤
│                                                               │       │
│                                                               │       ▼
│                                                               │  ┌─────────────────┐
│                                                               │  │  Google OAuth   │
│                                                               │  │  Consent Screen │
│                                                               │  └────────┬────────┘
│                                                               │           │
│                                                               │           │ 3. User grants
│                                                               │           │    permissions
│                                                               │           │
│  ┌────────────────────────────────────────────────────────┐  │           ▼
│  │  useOAuth.handleGoogleSuccess()                       │◄─┼───────────┐
│  └──────────────┬─────────────────────────────────────────┘  │           │
│                 │                                             │  4. Returns Google
│                 │ 5. Received Google access token             │     access token
│                 │                                             │
│                 ▼                                             │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  AuthContext.login(googleToken)                       │  │
│  └──────────────┬─────────────────────────────────────────┘  │
│                 │                                             │
│                 ▼                                             │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  authService.loginWithGoogle(googleToken)             │  │
│  └──────────────┬─────────────────────────────────────────┘  │
│                 │                                             │
└─────────────────┼─────────────────────────────────────────────┘
                  │
                  │ 6. POST /api/auth/oauth/callback
                  │    Body: { token: googleToken, provider: "google" }
                  │
                  ▼
┌──────────────────────────────────────────────────────────────────────┐
│                          BACKEND                                      │
│                                                                       │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │  Routes: /api/auth/oauth/callback                             │ │
│  └──────────────┬─────────────────────────────────────────────────┘ │
│                 │                                                    │
│                 │ 7. Route to controller                             │
│                 │                                                    │
│                 ▼                                                    │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │  AuthController.googleOAuthCallback()                         │ │
│  │  - Validate provider & token                                  │ │
│  └──────────────┬─────────────────────────────────────────────────┘ │
│                 │                                                    │
│                 │ 8. Delegate to service                             │
│                 │                                                    │
│                 ▼                                                    │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │  AuthService.googleLogin(accessToken)                         │ │
│  └──────────────┬─────────────────────────────────────────────────┘ │
│                 │                                                    │
│                 │ 9. Fetch user info from Google                     │
│                 │                                                    │
│                 └────────────────────────────────────────────────────┼──────┐
│                                                                      │      │
│                                                                      │      │
└──────────────────────────────────────────────────────────────────────┘      │
                                                                               │
                                                                               ▼
                                                              ┌─────────────────────────────┐
                                                              │   GOOGLE USERINFO API       │
                                                              │                             │
                         10. Verify token                     │  GET /oauth2/v2/userinfo   │
         ┌────────────────────────────────────────────────────┤  Authorization: Bearer     │
         │                                                     │  <google_access_token>     │
         │                                                     └─────────────────────────────┘
         │
         │ 11. Return user info
         │     { id, email, name, picture }
         │
         ▼
┌──────────────────────────────────────────────────────────────────────┐
│                          BACKEND (continued)                          │
│                                                                       │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │  AuthService (continued)                                      │ │
│  └──────────────┬─────────────────────────────────────────────────┘ │
│                 │                                                    │
│                 │ 12. Call repository                                │
│                 │                                                    │
│                 ▼                                                    │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │  UserRepository.findOrCreateByGoogleId()                      │ │
│  └──────────────┬─────────────────────────────────────────────────┘ │
│                 │                                                    │
│                 │ 13. Query database                                 │
│                 │                                                    │
│                 ▼                                                    │
│         ┌───────────────┐                                            │
│         │   DATABASE    │                                            │
│         │  (PostgreSQL) │                                            │
│         └───────┬───────┘                                            │
│                 │                                                    │
│                 │ 14. Return user (existing or newly created)        │
│                 │                                                    │
│                 ▼                                                    │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │  AuthService (continued)                                      │ │
│  │  - Generate JWT tokens                                         │ │
│  │    * Access Token (1 hour)                                     │ │
│  │    * Refresh Token (7 days)                                    │ │
│  └──────────────┬─────────────────────────────────────────────────┘ │
│                 │                                                    │
│                 │ 15. Return to controller                           │
│                 │                                                    │
│                 ▼                                                    │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │  AuthController (send response)                               │ │
│  └──────────────┬─────────────────────────────────────────────────┘ │
│                 │                                                    │
└─────────────────┼────────────────────────────────────────────────────┘
                  │
                  │ 16. HTTP Response
                  │     {
                  │       token: "jwt_access_token",
                  │       refreshToken: "jwt_refresh_token",
                  │       user: { id, email, name, picture }
                  │     }
                  │
                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│                       FRONTEND (continued)                           │
│                                                                      │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │  authService.loginWithGoogle() (continued)                   │ │
│  │  - Save to localStorage:                                      │ │
│  │    * auth_token                                               │ │
│  │    * refresh_token                                            │ │
│  │    * user                                                     │ │
│  └──────────────┬────────────────────────────────────────────────┘ │
│                 │                                                   │
│                 │ 17. Update context                                │
│                 │                                                   │
│                 ▼                                                   │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │  AuthContext                                                  │ │
│  │  - setUser(userData)                                          │ │
│  │  - isAuthenticated = true                                     │ │
│  │  - isLoading = false                                          │ │
│  └──────────────┬────────────────────────────────────────────────┘ │
│                 │                                                   │
└─────────────────┼───────────────────────────────────────────────────┘
                  │
                  │ 18. Re-render components
                  │
                  ▼
            ┌──────────────┐
            │  UI Updates  │
            │  User logged │
            │     in!      │
            └──────────────┘
```

---

## Authenticated Request Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│               MAKING AUTHENTICATED API REQUESTS                      │
└─────────────────────────────────────────────────────────────────────┘

┌───────────┐
│  FRONTEND │
│ Component │
└─────┬─────┘
      │
      │ 1. Call API endpoint
      │
      ▼
┌──────────────────────────────────────────┐
│  authService.apiRequest()                │
│  - Get token from localStorage           │
│  - Add Authorization header              │
│    "Bearer <jwt_access_token>"           │
└──────────────┬───────────────────────────┘
               │
               │ 2. HTTP Request
               │    Headers: { Authorization: "Bearer <token>" }
               │
               ▼
┌──────────────────────────────────────────────────────────────┐
│                        BACKEND                                │
│                                                               │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Express Router                                       │ │
│  └──────────────┬─────────────────────────────────────────┘ │
│                 │                                            │
│                 │ 3. Apply auth middleware                   │
│                 │                                            │
│                 ▼                                            │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  authMiddleware                                       │ │
│  │  1. Extract Authorization header                      │ │
│  │  2. Parse Bearer token                                │ │
│  │  3. Verify JWT signature                              │ │
│  │  4. Check expiry                                      │ │
│  │  5. Get user from database                            │ │
│  │  6. Attach user to req.user                           │ │
│  └──────────────┬─────────────────────────────────────────┘ │
│                 │                                            │
│                 │ ✓ Token valid                              │
│                 │                                            │
│                 ▼                                            │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Controller Method                                    │ │
│  │  - Access req.user                                     │ │
│  │  - Process request                                     │ │
│  │  - Return response                                     │ │
│  └──────────────┬─────────────────────────────────────────┘ │
│                 │                                            │
└─────────────────┼────────────────────────────────────────────┘
                  │
                  │ 4. HTTP Response
                  │    Status: 200
                  │    Body: { data }
                  │
                  ▼
            ┌──────────────┐
            │   FRONTEND   │
            │  Receives    │
            │    Data      │
            └──────────────┘


┌─────────────────────────────────────────────────────────────────────┐
│                    IF TOKEN IS INVALID/EXPIRED                       │
└─────────────────────────────────────────────────────────────────────┘

  authMiddleware
        │
        │ ✗ Token expired/invalid
        │
        ▼
  ┌────────────────────┐
  │  Return 401        │
  │  Unauthorized      │
  └─────────┬──────────┘
            │
            ▼
      ┌──────────────────────┐
      │    FRONTEND          │
      │  Receives 401        │
      │                      │
      │  OPTIONS:            │
      │  1. Use refresh      │
      │     token            │
      │  2. Redirect to      │
      │     login            │
      └──────────────────────┘
```

---

## Token Refresh Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                      TOKEN REFRESH FLOW                              │
└─────────────────────────────────────────────────────────────────────┘

┌──────────────┐
│   FRONTEND   │
│              │
│  API request │
│  fails with  │
│  401 error   │
└──────┬───────┘
       │
       │ 1. Access token expired
       │
       ▼
┌──────────────────────────────────┐
│  Get refresh token from          │
│  localStorage                     │
└──────────────┬───────────────────┘
               │
               │ 2. POST /api/auth/refresh
               │    Body: { refreshToken }
               │
               ▼
┌─────────────────────────────────────────────────────────────┐
│                       BACKEND                                │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐│
│  │  AuthController.refreshToken()                        ││
│  └──────────────┬─────────────────────────────────────────┘│
│                 │                                           │
│                 ▼                                           │
│  ┌────────────────────────────────────────────────────────┐│
│  │  AuthService.refreshAccessToken()                     ││
│  │  1. Verify refresh token                              ││
│  │  2. Check user exists                                 ││
│  │  3. Generate new access + refresh tokens              ││
│  └──────────────┬─────────────────────────────────────────┘│
│                 │                                           │
└─────────────────┼───────────────────────────────────────────┘
                  │
                  │ 3. Return new tokens
                  │    { token, refreshToken }
                  │
                  ▼
            ┌──────────────────────────┐
            │      FRONTEND            │
            │  - Save new tokens       │
            │  - Retry original request│
            └──────────────────────────┘
```

---

## Logout Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                        LOGOUT FLOW                                   │
└─────────────────────────────────────────────────────────────────────┘

┌───────────┐
│   USER    │
│  clicks   │
│  Logout   │
└─────┬─────┘
      │
      ▼
┌────────────────────────────────┐
│  AuthContext.logout()          │
└────────────┬───────────────────┘
             │
             │ 1. Optional: Notify backend
             │    POST /api/auth/logout
             │
             ▼
┌──────────────────────────────────┐
│       BACKEND (optional)         │
│  - Could blacklist token         │
│  - Log logout event              │
│  - Return success                │
└────────────┬─────────────────────┘
             │
             ▼
┌──────────────────────────────────┐
│         FRONTEND                 │
│  Clear localStorage:             │
│  - auth_token                    │
│  - refresh_token                 │
│  - user                          │
│  - oauth_state                   │
│                                  │
│  Update AuthContext:             │
│  - user = null                   │
│  - isAuthenticated = false       │
└────────────┬─────────────────────┘
             │
             │ 2. Redirect to login
             │
             ▼
       ┌──────────────┐
       │ Login Page   │
       └──────────────┘
```

---

## Session Persistence (Page Reload)

```
┌─────────────────────────────────────────────────────────────────────┐
│                  SESSION PERSISTENCE ON RELOAD                       │
└─────────────────────────────────────────────────────────────────────┘

┌───────────┐
│   USER    │
│  reloads  │
│   page    │
└─────┬─────┘
      │
      ▼
┌────────────────────────────────────────────┐
│  AuthContext useEffect (on mount)          │
└────────────┬───────────────────────────────┘
             │
             │ 1. Check localStorage
             │
             ▼
┌────────────────────────────────────────────┐
│  localStorage has token & user?            │
└────────────┬───────────────────────────────┘
             │
         ┌───┴───┐
         │       │
     YES │       │ NO
         │       │
         ▼       ▼
┌─────────────┐  ┌──────────────┐
│ Validate    │  │ Show login   │
│ with server │  │ screen       │
└──────┬──────┘  └──────────────┘
       │
       │ GET /api/auth/user
       │ Authorization: Bearer <token>
       │
       ▼
┌──────────────────────────────┐
│         BACKEND              │
│  authMiddleware validates    │
└──────┬───────────────────────┘
       │
   ┌───┴───┐
   │       │
VALID│     │ INVALID
   │       │
   ▼       ▼
┌────┐  ┌─────────────────┐
│200 │  │ 401 Unauthorized│
│OK  │  └────────┬────────┘
└─┬──┘           │
  │              │
  │              ▼
  │        ┌──────────────────┐
  │        │ Clear storage    │
  │        │ Show login       │
  │        └──────────────────┘
  │
  ▼
┌──────────────────────┐
│  Restore user state  │
│  User authenticated  │
└──────────────────────┘
```

---

## Component Interaction Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│              FRONTEND COMPONENT ARCHITECTURE                         │
└─────────────────────────────────────────────────────────────────────┘

                        ┌─────────────────┐
                        │      App        │
                        │   Component     │
                        └────────┬────────┘
                                 │
                    ┌────────────┼────────────┐
                    │                          │
                    ▼                          ▼
         ┌─────────────────────┐    ┌──────────────────┐
         │  GoogleOAuthProvider│    │  AuthProvider    │
         │  (@react-oauth)     │    │  (AuthContext)   │
         └─────────────────────┘    └────────┬─────────┘
                                              │
                                              │ provides
                                              │
                    ┌─────────────────────────┼─────────────────┐
                    │                         │                 │
                    ▼                         ▼                 ▼
         ┌──────────────────┐    ┌──────────────────┐  ┌──────────────┐
         │  useAuth hook    │    │ useOAuth hook    │  │  Components  │
         │  - user          │    │ - loginWithGoogle│  │  - Dashboard │
         │  - isAuth        │    │ - isLoading      │  │  - Profile   │
         │  - login()       │    │ - error          │  │  - Settings  │
         │  - logout()      │    └──────────────────┘  └──────────────┘
         │  - refreshUser() │
         └──────────────────┘
                    │
                    │ calls
                    │
                    ▼
         ┌──────────────────────┐
         │   authService        │
         │  - loginWithGoogle() │
         │  - getCurrentUser()  │
         │  - logout()          │
         │  - apiRequest()      │
         └──────────┬───────────┘
                    │
                    │ API calls
                    │
                    ▼
         ┌──────────────────────┐
         │   BACKEND API        │
         │  /api/auth/*         │
         └──────────────────────┘
```

---

## Security Layers Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                      SECURITY LAYERS                                 │
└─────────────────────────────────────────────────────────────────────┘

                         HTTP Request
                              │
                              ▼
                   ┌──────────────────┐
                   │   Layer 1:       │
                   │   HTTPS/TLS      │
                   │   Encryption     │
                   └────────┬─────────┘
                            │
                            ▼
                   ┌──────────────────┐
                   │   Layer 2:       │
                   │   CORS           │
                   │   Origin Check   │
                   └────────┬─────────┘
                            │
                            ▼
                   ┌──────────────────┐
                   │   Layer 3:       │
                   │   Rate Limiting  │
                   │   (Brute Force)  │
                   └────────┬─────────┘
                            │
                            ▼
                   ┌──────────────────┐
                   │   Layer 4:       │
                   │   JWT Validation │
                   │   authMiddleware │
                   └────────┬─────────┘
                            │
                            ▼
                   ┌──────────────────┐
                   │   Layer 5:       │
                   │   User Existence │
                   │   DB Check       │
                   └────────┬─────────┘
                            │
                            ▼
                   ┌──────────────────┐
                   │   Layer 6:       │
                   │   Authorization  │
                   │   (Permissions)  │
                   └────────┬─────────┘
                            │
                            ▼
                      Protected Resource
```

---

**For detailed documentation, see [AUTHENTICATION.md](./AUTHENTICATION.md)**
