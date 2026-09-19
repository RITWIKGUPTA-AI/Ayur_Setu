# AyurSetu — Deployment Fix + UI Performance Improvement

I verified all of this by actually running your exact build/runtime commands in a
sandbox (not just reading the code), so these are confirmed fixes, not guesses.

## 1. The deployment error you saw (TS1343 `import.meta`)

**Root cause:** `server/src/db/database.ts` and `server/src/server.ts` used the ESM
pattern `fileURLToPath(import.meta.url)` to derive `__dirname`. But
`server/tsconfig.json` compiles to `"module": "commonjs"` — and `import.meta` is not
legal syntax in CommonJS output, so `tsc` refuses to compile it. That's exactly your
error.

**Fix:** Since the server compiles to CommonJS anyway, just use Node's native
CommonJS globals `__dirname` / `__filename` directly — no polyfill needed at all.
I removed the `fileURLToPath(import.meta.url)` lines entirely.

## 2. A second bug that would have crashed the server immediately after that (runtime, not build-time)

While verifying the fix, I found your `Dockerfile`'s final runtime stage never
copied `server/package.json` into the image:

```
COPY --from=builder /app/server/dist ./server/dist
COPY --from=builder /app/server/node_modules ./server/node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./       <-- only the ROOT package.json
```

Your root `package.json` has `"type": "module"`, but `server/package.json` has
`"type": "commonjs"` (correctly, since the server compiles to CommonJS). Without
`server/package.json` present at runtime, Node walks up the directory tree, finds
only the root `package.json` (`type: module`), and tries to run your compiled
`server/dist/server.js` as an ES module — which crashes instantly with:

```
ReferenceError: exports is not defined in ES module scope
```

I reproduced this exact crash in a sandbox with the missing-file setup, and
confirmed it goes away once `server/package.json` is copied in. **Fix:** added
```
COPY --from=builder /app/server/package*.json ./server/
```
to the Dockerfile.

I also tidied `server/package.json`: added an explicit `"type": "commonjs"` (extra
safety net) and fixed `main`/`dev`/`start` to point at `server.ts`/`server.js` (the
file your Dockerfile and `render.yaml` actually run) instead of `index.ts`/`index.js`
(a separate, unfinished Supabase+Anthropic API that needs its own env vars — I added
a comment to `index.ts` clarifying that so it's not confused with the real entry
point again).

**I ran your exact `npm run build` (client + server) and then ran the compiled
server from a directory laid out exactly like your Docker runtime stage — it now
starts cleanly and serves the app.**

## 3. UI/performance improvement: code-splitting

Your Vite build was shipping one ~835 KB JS bundle for every page, including the
charting library (Recharts) even for visitors who only ever see the landing page.
I converted `src/App.tsx` to lazy-load every page except the landing hero
(`React.lazy` + `Suspense`), added a small on-brand loading state
(`src/components/common/PageLoader.tsx`, matching your existing pine/tricolor
theme), and re-ran the build:

| Before | After |
|---|---|
| 1 bundle, 835.75 kB (221 kB gzip) | Landing page loads ~254 kB (77 kB gzip); Recharts (360 kB) and each dashboard (12–33 kB) only load when that page is actually opened |

This is a real, measurable improvement to first-load time with no visual changes —
your existing design system (government top strip, tricolor accents, Fraunces/Plus
Jakarta Sans pairing, role-based theming) was already well put together, so I didn't
touch anything visual; if there's a specific screen or component you want restyled,
tell me which one and I'll focus there directly.

## How to apply these changes

Two options:

**Option A — apply the patch:**
```bash
cd Ayur_Setu
git apply /path/to/all-fixes.patch
```
(plus copy the new file `src/components/common/PageLoader.tsx` from this folder,
since patches don't always include brand-new files cleanly — check `git status`
after applying and add it manually if it's missing.)

**Option B — copy files directly.** Replace these files in your repo with the ones
in this folder, in the same paths:
- `Dockerfile`
- `server/package.json`
- `server/src/db/database.ts`
- `server/src/server.ts`
- `server/src/index.ts`
- `src/App.tsx`
- `src/components/common/PageLoader.tsx` (new file)

Then:
```bash
git add -A
git commit -m "Fix CommonJS/import.meta build error, missing server/package.json in Docker runtime, and code-split routes"
git push
```
Then redeploy on Render. If it still fails, do a **Manual Deploy → Clear build
cache & deploy** once, just in case an old cached layer is involved, and paste me
the fresh log.
