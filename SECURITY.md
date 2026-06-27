# Security

Kana Quiz is a **static, client-side single-page app**. It has no backend, no
user accounts, and stores no personal or sensitive data. The security posture
reflects that small surface.

## Posture

- **No secrets in the bundle.** There are no API keys. Any future build-time
  variable would use Vite's `VITE_` prefix, which is *public by design* — it ends
  up in the shipped JavaScript. Real secrets must never be placed there.
- **`.env` is git-ignored.** Only `.env.example` is committed.
- **Strict Content Security Policy.** Declared via a `<meta>` tag in
  `index.html`, because GitHub Pages cannot send custom HTTP headers. The app is
  self-contained (no third-party scripts, fonts or runtime data fetches), so the
  policy is tight: `default-src 'self'`, `script-src 'self'`, `object-src 'none'`,
  `frame-ancestors 'none'`, `base-uri 'self'`, `form-action 'none'`.
  - `style-src` currently allows `'unsafe-inline'` because the toolchain injects
    styles inline. This can be tightened later with hashes or nonces; see below.
  - `connect-src` allows `ws:`/`wss:` for Vite's HMR during local development,
    and `https://cdn.jsdelivr.net` so the browse view can load the read-only
    kanji dataset (English) at runtime. No other outbound connections are made,
    and no personal data is ever sent.
- **No `dangerouslySetInnerHTML`** anywhere; React escapes by default.
- **No `eval` / `new Function`.** ESLint enforces `no-eval` and
  `no-implied-eval`.
- **Strict TypeScript** (`strict`, `noUncheckedIndexedAccess`,
  `exactOptionalPropertyTypes`) to catch foot-guns at compile time.
- **Minimal first-party dependencies**, which keeps the supply-chain surface
  small.
- **Least-privilege CI.** The Pages workflow requests only
  `contents: read`, `pages: write`, `id-token: write`.
- **HTTPS.** GitHub Pages serves over HTTPS; enable "Enforce HTTPS" in the repo
  settings.
- **localStorage holds only non-sensitive preferences** (selected language, pool
  configuration, settings), wrapped in try/catch so storage failures never crash
  the app.

## Hardening the CSP further (optional)

To drop `'unsafe-inline'` from `style-src`, switch to hashed/nonce'd styles or a
build step that extracts CSS to files and references them with hashes. Not done
by default to keep the toolchain simple.

## Reporting

This is a personal/learning project. If you find an issue, open a GitHub issue
describing it.
