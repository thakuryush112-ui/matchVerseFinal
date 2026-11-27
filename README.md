# MatchVerse - Dating App (React)

Project for **Front End Engineering-II (25CSE0203)**, Chitkara University.
A multi-page React SPA where users register, browse profiles, like/pass, and see mutual matches.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm test           # 9 unit/UI tests (Vitest + React Testing Library)
npm run build      # production build in dist/
npm run preview    # serve the production build locally
```

Requires Node.js 18 or newer.

## Try this flow in the demo
1. Open **Discover** (works as a guest), click Like -> you are sent to Login.
2. **Join** -> fill the registration form (try wrong values to see validation).
3. Like **Aanya, Simran, Arjun, Tanvi, Dev, Kabir or Zoya** -> "It's a match!" modal (they already like you).
4. Visit **Matches** (protected + nested routes), **Settings** (edit profile), toggle **Dark mode**.
5. Type a random URL such as `/xyz` -> 404 page.

## Syllabus coverage

| Syllabus topic | Where in the project |
|---|---|
| HTML5 semantic tags, accessibility, responsive CSS, media queries, Flexbox/Grid | `index.html`, `src/index.css` (semantic header/nav/main/footer, aria labels, focus styles, grid layouts, mobile menu) |
| JavaScript / ES6+ (destructuring, spread, modules, async/await, fetch, JSON, browser storage) | everywhere; `profilesSlice.js` (fetch + async/await), `useLocalStorage.js` |
| React basics: components, JSX, props, lists, conditional rendering | `components/`, `ProfileCard.jsx`, `Discover.jsx` |
| Hooks: useState, useEffect, useRef, useMemo, useCallback | `Discover.jsx` (useMemo filter, useCallback handlers), `Modal.jsx` (useRef + useEffect), `Register.jsx` (useRef focus) |
| Custom hooks, lifting state up, composition, reusable UI | `useForm`, `useDebounce`, `useLocalStorage`, `Tabs`, `Modal`, `InputField` |
| React Router: nested, dynamic, protected routes, 404 | `App.jsx`, `ProfileDetail.jsx` (`/profile/:id`), `MatchesLayout.jsx` (nested), `ProtectedRoute.jsx`, `NotFound.jsx` |
| Navigation layout & page structure (multi-page SPA, portfolio-style routing) | `Layout.jsx` + `Navbar.jsx` with `<Outlet />` |
| Context API & state architecture (global vs local state) | `AuthContext`, `ThemeContext`, `ToastContext` (global); form/filter state stays local |
| Redux Toolkit, async state, loading & error handling | `store/` - `profilesSlice` (createAsyncThunk: loading/succeeded/failed + retry), `likesSlice` (+ selectors) |
| Form handling & validation, reusable input components | `useForm.js`, `validators.js`, `InputField.jsx`, `InterestPicker.jsx`, Register / Login / Settings |
| Modal, tabs, toast notifications, search, filter, sort | `Modal`, `Tabs`, `ToastContext`, `Discover.jsx` |
| REST API with fetch, loading states, retry, pagination, debounce | `profilesSlice` (fetch `/profiles.json`), retry button, `Pagination.jsx`, `useDebounce.js` |
| Testing (Jest-style API), performance (memo, lazy loading) | `src/__tests__/`, `React.memo` in `ProfileCard`, `React.lazy` + `Suspense` in `App.jsx` |
| Build, env variables, deployment (Vercel/Netlify) | `npm run build`, `.env.example`, `vercel.json`, `public/_redirects` |

## Rubric mapping (Evaluation Component 2)

| Rubric criterion | Evidence to show |
|---|---|
| React Navigation layout & page structure | Shared `Layout` with `Outlet`, nested `/matches/*`, dynamic `/profile/:id`, protected routes, 404 |
| Context API & State architecture | 3 contexts with memoised values + custom `useAuth/useTheme/useToast` hooks; clear global vs local split |
| Intro to Redux Toolkit | `configureStore`, 2 slices, `createAsyncThunk`, `createSelector` |
| Form handling in React | Controlled inputs, onBlur touched state, per-field errors, focus on first error, reusable `InputField` |

## Notes
- Profiles come from `public/profiles.json` via `fetch`, acting as a mock REST API.
- Auth is **demo only**: accounts and passwords are kept in localStorage. A real app needs a backend and hashed passwords.
- Tests use Vitest, which has the same API as Jest (`describe`, `it`, `expect`) and works with React Testing Library.

## Deploy
- **Vercel**: import the GitHub repo, framework Vite, build `npm run build`, output `dist`.
- **Netlify**: build `npm run build`, publish `dist` (`_redirects` handles SPA routing).

## Suggested Git history (shows regular progress)
```bash
git init && git add . && git commit -m "chore: scaffold Vite + React project"
# then commit feature by feature: routing/layout, contexts, redux store, forms, discover page, tests, deployment
git branch -M main && git remote add origin <your-repo-url> && git push -u origin main
```
