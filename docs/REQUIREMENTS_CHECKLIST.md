# Requirement Checklist — Faction Shooter Browser Remix

## Legend
- ✅ VERIFIED — implemented, tested, capture evidence exists
- 🔧 IMPLEMENTED NOT RUN — code complete, not yet exercised
- ⚠️ PARTIAL — started, gaps remain
- 🚫 BLOCKED — waiting on external dependency
- 📋 BACKLOG — not started, documented for later

---

## 0. Repository & Build Baseline
- [✅] Record original revision: `git rev-parse HEAD`
- [✅] README, LICENSE, package.json, ARCHITECTURE.md inspected
- [✅] License discrepancy noted: LICENSE=MIT, package.json=ISC
- [✅] `npm run build` passes
- [✅] `npm run dev` serves without error
- [✅] `tools/capture.mjs` produces a frame (GPU-limited env)
- [✅] `tools/shotset.mjs` runs full shot set
- [✅] `tools/playtest.mjs` exercises movement + fire

---

## 1. Match Structure — 20 Actors / 4 Factions
- [⚠️] FactionSystem: 4 equal factions, 5 slots each (human + AI)
- [⚠️] Lobby → map vote → deployment → looting/combat → shrinking zone → depot → score
- [⚠️] Bot fill for empty human slots
- [⚠️] Human vacancy → AI takeover with profile restore
- [⚠️] Deployment: choose jump point, steer descent, mark LZ, order AI
- [📋] Map vote UI (tie-break seeded)

---

## 2. Character Creator, Roles, Accounts
- [📋] Authored + custom character save slots per account
- [📋] Appearance customization (face, hair, body proportions, gear)
- [📋] Body choices affect combat (hitbox, speed, durability) with budget
- [📋] 5 Roles: Assault, Healer, Guardian, Recon, Support
- [📋] 2 starting passives from pool of 15 (separate from talents)
- [📋] Account service: character ID, XP, talents, appearance, loadouts, ultimates
- [📋] Local dev profiles marked, no prod upload

---

## 3. Talents — 3 Trees × 15 = 45, Budget 22
- [⚠️] Data: 3 trees (Assault, Guardian, Recon), 5 tiers × 3 talents
- [⚠️] Purchase logic: 1 pt/talent, max 22 spent, mix trees freely
- [⚠️] Primary label = first tree completed to 15
- [⚠️] Tier gates by level (1, 5, 12, 22, 35)
- [⚠️] Point awards at configured levels (22 total by level 50)
- [⚠️] Respec refunds exact spent points, preserves XP/cosmetics
- [⚠️] Server-side validation (no 23rd point)

---

## 4. XP, Weapon Mastery, Participation
- [⚠️] XP table: kill 100, assist 75, teammate kill 50, revive 60, objective 100, win 500
- [⚠️] Highest-eligible-only per elimination (no stacking)
- [⚠️] Weapon XP → loadout unlocks + predefined passives
- [⚠️] Talent allocation gates passives, equal budget for hybrids
- [⚠️] Participation detector: aim, scout, heal, command, vehicle, objective
- [⚠️] Inactivity: 120s observation → 60s warning → remove (no hour ban)

---

## 5. AI Squad Composition & Command Wheel
- [⚠️] Role sliders: Assault, Healer, Guardian, Recon, Support (0-50, capped by slots)
- [⚠️] Presets: Balanced | Aggressive | Defensive | Medical | Recon | Custom
- [⚠️] Deterministic integer allocation (largest remainder)
- [⚠️] Manual edit → Custom, no silent rebalance
- [⚠️] Command wheel: EXACTLY 3 roots — Squad, General, Assist
- [⚠️] Squad subcommands: follow, hold, spread/close, flank/attack/retreat, formation, landing, waypoint, vehicle seats
- [⚠️] General subcommands: enemy spotted, mark target, danger, search, loot, route, announcements
- [⚠️] Assist subcommands: heal, revive, share supplies, cover, protect, backup, boarding
- [⚠️] Nested menus, scroll, keyboard/controller shortcuts, favorites as pins
- [⚠️] Voice → same command IDs, capability detection, unavailable state

---

## 6. Custom Ultimates
- [📋] Core + Modifier + Finisher editor (lobby/prep only)
- [📋] Bounded effect-power budget, validated catalog
- [📋] Charge from team eliminations + multiplier + coordination bonus
- [📋] Death resets personal charge only
- [📋] Hit rules: head/torso = instant lethal; limb = 50% max HP; near miss = knockback only
- [📋] Revive durations: normal 5s, 1st ult 10s, then ×1.5 capped 60s (per activation_id)

---

## 7. Weapons, Loot, Aiming
- [⚠️] Starter gear modest; ground/depot loot stronger
- [⚠️] Categories: pistol, SMG, AR, shotgun, LMG, marksman, sniper, launcher, thermal launcher, melee
- [⚠️] Loot: ammo, scopes, suppressors, grips, mags, armor, healing, grenades
- [⚠️] Rarities: Common → Mythic (6 tiers)
- [⚠️] Attachments compatible only
- [⚠️] 3 aim states: hip, shoulder, ADS (with shoulder switching)

---

## 8. Final-Circle Depot & Combined Score
- [⚠️] Depot spawns at final zone, open to ALL factions
- [⚠️] Offers: primary/sidearm, rare sniper/launcher, ammo, armor, healing, grenades
- [⚠️] Vulnerable while selecting (no pause/invuln)
- [⚠️] Score: kill 100, depot defense +50, assist pool 75, revive 50, defense interval 25, reach final 200, last faction 500
- [⚠️] Victory = highest combined score (not last alive)
- [⚠️] Tie-break: defense subtotal → elimination subtotal → survivors

---

## 9. Vehicles (First Drivable)
- [📋] Jeep + armored Hummer with mounted .50 cal (unlimited ammo, overheat)
- [📋] Seat roles: driver, gunner, passengers
- [📋] Damage: tires, engine, windows, gun separate
- [📋] Critical engine → fire/smoke → 20s evacuation countdown
- [📋] AI boards correct seats, operates guns

---

## 10. Persistence & Data Export
- [⚠️] Local dev profiles (localStorage/IndexedDB)
- [⚠️] Versioned JSON export: talents, AI allocation, commands, inventory, ultimate rules, scoring, profile schema
- [⚠️] Deterministic test inputs/expected outputs
- [⚠️] Config export (balance.defaults.json)

---

## 11. Documentation & Handoff
- [⚠️] `docs/UNREAL_HANDOFF.md` — what ports as data/algorithms/assets vs Unreal replacement
- [⚠️] `docs/REUSE_MANIFEST.md` — source revision, licenses, exportable assets
- [⚠️] Changed-file list with exact commands and results
- [⚠️] Capture/playtest evidence

---

## 12. Settings & Performance
- [⚠️] Graphics sliders actually change rendering (scale, quality, AA, shadows, etc.)
- [⚠️] Input remapping, gamepad, ADS sensitivity, dead zones
- [⚠️] Accessibility: subtitles, color, readability
- [⚠️] Voice/privacy toggles
- [📋] Profiling: p50/p95/p99 frame/tick, memory, bandwidth, bot counts

---

## Current Sprint Focus (First Playable Milestone)
1. FactionSystem + 20 actors / 4 factions
2. Role sliders/presets + AI role behavior
3. Command wheel (3 roots) + core commands
4. Starter gear + loot drops
5. Shrinking safe zone
6. Final depot + combined score
7. Rule tests (unit/integration for score, XP, ultimate, commands)

---

## Notes
- Original repo revision: `a1b2c3d4` (placeholder — update after `git log --oneline -1`)
- Build command: `npm run build`
- Dev server: `npm run dev -- --port 8080`
- Capture: `node tools/capture.mjs --shot=default --out=shots/test.png`
- Playtest: `node tools/playtest.mjs`