# Faction Shooter — Canonical Game Design v1.0

Owner: Rob / Ajax. Working technical identifier: FactionShooter; this is not an approved commercial title.
Prepared from the planning conversation on October 23, 2026.

## 0. Authority, scope, and interpretation

This document is the shared design contract for the OmGitHub browser remix and the native Unreal production game. The owner's explicit rules outrank inherited sample-game behavior. Do not ask the owner to reapprove settled decisions. Do not quietly replace requirements with a more conventional battle royale.

LOCKED means explicitly settled in the conversation. DEFAULT means a reversible first implementation/tuning choice, not a new approved design rule. OPEN means the conversation did not resolve the issue; use the documented temporary behavior and record it. Implement the next playable increment rather than stopping for nonblocking questions. Never market an unimplemented backlog item as working.

The production target is Windows PC, Xbox, and PlayStation with cross-play and account-linked character progression. Mobile is outside the initial production scope. Specific console generations, platform access, certification, storefront release, and maximum validated concurrency are not yet established.

The browser remix is a working gameplay laboratory and source of reusable rules, algorithms, permissible assets, configuration, and tests. It is NOT the production engine. Unreal is not a wrapper around a browser canvas. Do not translate Three.js classes mechanically into C++ or carry over browser physics/networking where native systems are better.

Creative direction: responsive and smooth, slightly stylized/cartoonish hero combat; satisfying military weapon handling; tactical squad looting and vehicles; airborne deployment; RPG build freedom. Use original branding, characters, maps, sounds, and licensed assets. The named commercial games are feel references, not asset sources.

## 1. Modes, equal factions, and the match loop

LOCKED: target match sizes are 20, 50, 100, 150, and 200 total combatants. This total includes humans AND AI; bots are not extra players beyond the cap. Independent factions compete simultaneously, not only two teams. Every faction begins with the same total roster size. Valid configurations divide the player cap evenly: 20 = 4 x 5; 50 = 5 x 10; 100 = 10 x 10; 150 = 15 x 10; 200 = 20 x 10. Other equal configurations, including custom 15 = 3 x 5 or 60 = 6 x 10, may use the same validator.

Fill empty roster slots with clearly identified AI rather than launch lopsided teams. Fill human vacancies with AI in modes that support takeover; restore the same pawn/profile on reconnection, not a duplicate. Equal starting rosters do not mean artificial respawns to equalize casualties during combat. Matchmaking must consider human distribution/party integrity as well as counts; do not claim equal skill merely from equal totals.

Loop: lobby -> map vote and concurrent preparation -> deployment -> looting/combat and shrinking safe zone -> final-circle public depot -> combined-score results -> permanent progression save. Players vote for maps; highest votes win. A top-vote tie is randomly resolved only among tied maps. DEFAULT: server-seeded tie-break, one vote per connected human; AI does not pad the vote.

In the waiting/voting stage, configure characters, equipment, AI roles, command shortcuts, and custom ultimates. Keep this fast and save presets. Freeze combat-affecting loadouts at deployment. No combat-time full-screen talent/ultimate editor that pauses a multiplayer match.

Air deployment lets players choose where to jump, steer their descent, mark a landing zone, and order AI to land in the same general area. Maps expose named destination IDs, not hardcoded strings only for one map. Every named drop location must be addressable by wheel, shortcut, and supported voice command.

Roadmap modes also include Team Deathmatch, Free-for-All, Capture the Flag, Payload Escort, King of the Hill, large faction warfare, and ranked/custom matches. Prove the main faction mode first; disabled roadmap choices must not look functional.

## 2. Character creator, roles, and accounts

LOCKED: selectable authored characters AND custom characters. Save multiple persistent characters on an account. Customize face, eyebrows, eyes, lips, ears, hair, height, body mass, slender/heavy/muscular proportions, and associated appearance. Mix headwear, hair, hats, bandanas, religious head coverings, shirts/jackets, optional visible armor overlays, trousers, gloves, boots, accessories, or unlocked full armor outfits.

Body choices can affect combat: muscle improves physical/melee output but increases target size; heavier builds trade speed and attack speed for durability/physical output; lighter builds trade resilience/strength for mobility. Apply bounded, server-validated hitbox and animation profiles, consistent with the actual visible silhouette. No tiny hitbox hidden inside large cosmetics. Facial and religious/cultural customization is cosmetic, not a combat modifier.

Stat sliders draw from a shared finite budget; raising one consumes available points or, in a clearly signaled auto-rebalance mode, reduces others. No maxing every stat. DEFAULT: 100 allocation points, caps/floors and derived-stat curves in data; a budget is not literally raw HP or movement units. Body benefits consume the same overall power budget rather than stacking free bonuses on top.

Roles are Assault, Healer, Guardian, Recon, and Support. Roles influence weapons, AI priorities, and starting ability themes. They do not force talent allocation. Include healer-first characters with healing weapons/abilities and secondary offense. Allied healing and hostile damage require explicit target validation; a healer is not just an assault bot with a medical icon.

Two starting passives are chosen from a separate pool of 15. These are distinct from the talent trees and do not consume the 22-point talent budget. Starting passives, talent effects, and weapon mastery must not accidentally apply the same modifier multiple times.

Account service owns persistent character IDs, character XP/level, talents, starter-passive choices, appearance, unlocks, saved loadouts, and ultimate presets. Plan linking for email, Google, Apple, and platform identities to one game account; do not treat an email address as an immutable identity or silently merge accounts by matching email. Credentials/provider approvals are external prerequisites, not pretend buttons. Local development profiles must be clearly marked and cannot upload arbitrary progression into production.

Birthday rewards and promotional offers remain in scope. Collect only necessary birthday/age information, keep marketing consent separate, protect it from public profiles, and prevent duplicate birthday claims. Present rare cosmetics/weapon appearances or balanced unlocks rather than paid statistical superiority. Authentication, age handling, platform requirements, and privacy policies need a separate production readiness review, not invented compliance claims.

## 3. Permanent talents: exact structure and budget

LOCKED: three trees named Assault, Guardian, Recon. EACH has 15 distinct single-rank talents in five tiers of three. Total catalog: 45. Each purchased talent costs ONE point. Lifetime allocated budget per character: 22. Calculation: 15 + floor(15/2) = 22.

Players may distribute points across ALL THREE trees, not a compulsory primary/secondary selection. Valid examples: 15/7/0, 10/8/4, 8/7/7. The first tree actually completed at 15/15 becomes the primary label. Without a completed tree, remain hybrid with no penalty or mandatory commitment. Because the budget is 22, two completed trees are impossible.

At 22 spent, all other unpurchased talents are disabled/greyed out with an explanation. Tier-level locks and exhausted-budget locks need distinct UI reasons. Reject invalid purchases server-side even when a modified client bypasses the UI. Never allocate a 23rd point through a race condition, reconnect, import, or respec.

Tier availability follows character level; initially only the bottom three talents per tree are eligible, not automatically owned. DEFAULT level gates retained from planning: 1, 5, 12, 22, 35. All gates and point-award milestones live in configuration. Do not add undisclosed within-tree purchase requirements that prevent mixing trees.

Separate nonspendable XP from earned talent points: buying a talent never subtracts level XP. Pace awards so a focused player who spent the preceding tier's three points has a point ready when the next tier opens. DEFAULT award levels: 1,3,4,5,8,10,12,16,19,22,27,31,35,37,39,41,43,45,47,48,49,50. This grants 4 points at level 5, 7 at 12, 10 at 22, 13 at 35, and 22 at 50. These are pacing defaults, not proof of an enjoyable time-to-max.

Respec outside active combat/matches refunds EXACTLY the points actually spent, not 22 free points for an early character. Preserve XP, level, previously earned unspent points, cosmetics, and weapon progression. Clear/recompute the primary label and derived effects. Persist transactions atomically.

The owner approved tree themes and structure, not a final named list of 45 effects. Author initial data-driven talents as clearly labeled balance candidates; do not claim their exact names/numbers were approved. No multiple talent ranks or hidden fourth tree.

## 4. XP, weapon mastery, and participation

LOCKED relative rewards: own elimination > meaningful assist > ordinary teammate elimination. Adopt the approved starting table: personal elimination 100 XP; assist 75; eligible teammate elimination 50; successful teammate revive 60; objective capture 100; match victory 500. Tune values only through documented balance changes.

For a single elimination, each recipient receives only their highest applicable kill-related reward: 100 OR 75 OR 50, not stacked 225. Define qualifying assist windows/contribution thresholds in data. Reward a defeat once per victim life; downing then finishing the same life is not two kills. No allied damage/revive loops, self-damage farming, or assist-tag spam. Progression XP and match score are separate ledgers.

Active healers, objective defenders, scouts, and vehicle crews can qualify for teammate rewards even without moving constantly or shooting. An inactive human cannot farm XP, talent progression, or ultimate charge just because their bots are winning.

Weapon XP permanently unlocks loadout options and predefined weapon passives for primary guns, sidearms, and launchers. Talent allocation influences compatible passive choices, but a hybrid must not be punished or forced to finish a tree. DEFAULT: eligible passive themes come from points invested in relevant trees, with an equal equipped-passive budget for hybrids and specialists. Exact thresholds/effects are tunable. Loadout unlocks are not a reason to spawn with rare depot-only power weapons.

OPEN: weapon mastery shared across all account characters versus per character was not settled. DEFAULT v0 stores it per persistent character, with a versioned migration seam. Account portability means that same character and its mastery follow the player to other platforms; it does not decide sharing among different characters.

## 5. Participation-aware inactivity handling

LOCKED: do not punish stationary defense. Detect participation, not distance traveled. Use contextual meaningful activity: aiming/tracking, scouting/pings, healing/reviving, combat, vehicle operation, purposeful commands, and active objective defense. Mere presence in a zone or endless repeated inputs is not unlimited participation credit.

After a configurable suspected-inactivity observation interval, show a prominent 60-second warning and audible cue. A meaningful response cancels it. At expiry remove the inactive player from the active match; do NOT impose an automatic one-hour ban. Do not invent ranked bans as a settled requirement. Suspend idle rewards during a validated inactive period and prevent a takeover bot from farming the absent human's account rewards.

Exclude loading, platform dialogs, map voting/customization, legitimate downed/dead/spectator states, and known input-focus loss from naive movement rules. A defender who is deliberately holding a sightline can stay; a player standing at the depot while absent must not gain indefinite immunity. Use a contextual prompt/check for ambiguous long silence, not a blind movement requirement.

## 6. AI squad composition and command wheel

LOCKED role rows: Assault, Healer, Guardian, Recon, Support. Each has a quantity slider, numeric value, and precise +/- controls. Allow zero. UI range can extend to 50, but actual capacity is bounded by available AI roster slots in the relevant squad/faction. Humans occupy slots. All role quantities are integers; their sum cannot exceed capacity.

Preset labels EXACTLY: Balanced | Aggressive | Defensive | Medical | Recon | Custom. Selecting a preset fills the available AI slots automatically. Manual slider edits switch to Custom. Save/reuse custom presets. Preset proportions are tunable; apply deterministic integer rounding so no slots vanish or appear. Do not silently alter other manual sliders when the cap is full; stop the increase and explain.

Generate AI appearances, names, builds, gear, and role-consistent behavior automatically. AI follow landing orders, search for stronger loot, stay in the team's general area, scan for enemies, use cover, heal/revive, share supplies, fill vehicle seats, operate turrets, and retreat/regroup when ordered. Behavior profiles adapt within a match toward the leader's cautious/aggressive tactics; explicit commands override inferred style. No cloud LLM is required in the per-frame bot loop. Knowledge must come from perception or shared reports, not omniscient hidden-player coordinates.

LOCKED: command wheel has EXACTLY THREE top-level categories: Squad, General, Assist. No Combat, Vehicle, Formation, Navigation, or Favorites fourth category. Those functions belong in submenus or shortcut bindings.

Squad subcommands: follow/regroup, hold/defend position, spread/close formation, flank/attack/retreat, formation presets, select landing destination, move to map waypoint, board/exit vehicles, assign driver/gunner/passenger seats, convoy coordination.

General subcommands: enemy spotted, mark target/location, danger warning, search area/building, seek/mark/share loot locations, route/navigation communication, contextual map-location announcements.

Assist subcommands: heal me/ally, revive teammate, request/share ammo/armor/medical supplies, provide cover/suppression, protect teammate, request backup, help boarding/extraction.

Support nested menus and scrolling with mouse wheel or controller joystick; keyboard and controller shortcuts can invoke preferred predefined commands directly. Favorites are shortcuts or pinned items inside existing categories, not a fourth root category. Voice recognition, wheel, and shortcuts all dispatch the SAME validated command IDs with target/destination/scope parameters. Voice initially commands AI teammates; human voice chat is a separate service.

Example binding Ctrl+R -> drop at the military-base destination. In a browser, handle shortcut conflicts only while gameplay has focus; do not hijack browser controls globally. All bindings are remappable. When speech input is unsupported, retain complete wheel/key functionality and report voice unavailable rather than pretending to understand speech.

## 7. Custom ultimates: charge, hits, revive penalties

LOCKED: compose ultimates from effects during lobby/map voting/preparation; save presets; activate with one gameplay action. Use a bounded effect-power budget and a validated compatible effect catalog. The initial Core + Modifier + Finisher editor is acceptable, but no giant editor mid-fight. Support offensive, defensive, and healing-oriented options; offensive lethal-hit rules do not turn a friendly heal into a killing attack.

Charge is individual but earned from TEAM eliminations and a team kill multiplier. Coordinated elimination participation adds a bonus. Do not silently replace this with Overwatch-style damage/healing charge. An inactive, defeated, or spectating player cannot bank free charge. Death/defeat resets that player's charge to zero; it does not arbitrarily reset every teammate's meter.

For offensive direct-hit ultimate attacks:
- Head or torso: immediate lethal defeat, bypassing ordinary armor/HP arithmetic.
- Arm or leg: damage equal to 50% of the target's MAXIMUM health, not half of current health. It can be lethal when remaining health is low. Apply once per validated impact, not separately per overlapping hitbox.
- Nearby miss: proximity knockback and ZERO damage from the ultimate near-miss event.
- Distant miss: no effect.

Use explicit hit-zone priority and server hit validation. Ordinary cover can block a projectile; cosmetic hair, helmets, or coats cannot redefine the body zones. Do not quietly turn an ultimate's splash or near miss into an instant-kill area effect. Knockback range/strength falloff is tunable, not an approved exact distance.

In revive-enabled modes a lethal defeat is a critical downed state that can be revived; a kill event must still be credited only once. Ultimate-caused defeats require a longer REVIVE INTERACTION duration. This is not an automatic change to bleed-out time or respawn wait.

Consecutive ultimate kills increase victim revive duration ONLY WITHIN ONE ACTIVATION. Track server-issued activation_id and qualifying kill index. DEFAULT: normal revive 5 seconds; first ultimate victim 10 seconds; successive victims 10 * 1.5^(index-1), capped at 60. Sequence: 10,15,22.5,33.75,50.625,60. Freeze the resulting duration on each victim; a later kill does not retroactively lengthen the first victim's timer.

End/interrupt/death closes the activation. The next activation starts at index 1. No carry across activations, matches, or attacker respawns. A miss never increments kills. DEFAULT: a miss does not erase prior qualifying kills within the still-active window. Repeated hits on one defeated life cannot inflate the streak. Late projectile/effect resolution must not resurrect an expired activation's streak.

OPEN: damage from secondary falls/wall impacts caused by near-miss knockback was not settled. DEFAULT v0 suppresses damage attributable solely to that displacement until recovery/landing, while independent incoming fire and zone hazards remain separate. Document this as a conservative zero-damage interpretation, not a confirmed expanded immunity power.

## 8. Weapons, loot, and aiming

LOCKED: start with usable but modest gear; ground/depot loot is meaningfully stronger. Never make the player drop completely weaponless. Account progression unlocks starter choices and equipment slots, including a grenade slot, while preserving the incentive to loot.

Categories: pistols/revolvers, SMGs, assault rifles, shotguns, LMGs, marksman rifles, rare sniper rifles, rare launchers, rare heat-signature lock-on launchers, melee. Loot includes compatible ammunition, scopes, suppressors, grips, extended magazines, specialized ammo, helmets, body armor, bandages/healing consumables, armor repairs, grenades, flashbangs, and smoke.

Rarities: Common, Uncommon, Rare, Epic, Legendary, Mythic. Higher-tier handling/attachments/utility matter; do not make rarity alone remove skill. Thermal lock-on is a game system with acquisition rules, visibility/obstruction checks, warnings, and server-validated tracking, not perfect omniscience through every wall.

Attachments transfer only between compatible weapons. Inventory, ammo, reloads, armor, pickups, and drop interactions are transactional/server-owned in production. Cosmetics showing armor do not grant actual armor items.

Switch first/third person. Three distinct aiming states: hip fire (least stable), shoulder aim (intermediate), ADS/through sights (most stable). Include shoulder switching, sensible camera obstruction, and first-person weapon presentation. Perspective rules and competitive matchmaking settings must be explicit; do not accidentally let camera clipping reveal enemies through geometry.

## 9. Final-circle public depot and combined victory

LOCKED: when the final/smallest safe zone begins, a depot appears inside the playable area and is announced. EVERY faction can use it. There is no capture/ownership requirement for access, no faction lock, and no added ownership shield. Enemies may sneak in and take equipment while another faction is defending it.

The depot offers category-based primary/sidearm selection, rare snipers and thermal launchers, full carried-weapon ammo replenishment, armor/helmets, healing/repair supplies, up to five lethal grenades, three flashbangs, two smoke grenades. The player remains vulnerable while selecting gear. No pause, invulnerability, teleport-to-inventory, or equipment granted to the whole faction by one interaction.

OPEN: the conversation repeated 'primary' for two slot groups. DEFAULT inventory interpretation: three primary slots plus two sidearm slots; a carried launcher consumes a primary slot, not an unlimited extra slot. Keep this capacity configurable and label the interpretation.

Defending the depot contributes to match score alongside eliminations, assistance, survival, and team support. Do not reduce victory to last alive, longest occupancy, or holding the point at the buzzer. Stationary presence alone earns no unlimited defense points. Defense must be tied to a genuine contest/contribution and an auditable eligibility rule; do not automatically reward an attacker as a defender merely because a kill occurred nearby.

DEFAULT score table: enemy elimination 100; qualifying depot-defense elimination adds 50 (150 TOTAL, not 250); meaningful assists share a capped 75-point faction assist pool per enemy life; valid revive 50; active contested defense 25 per eligible faction interval; reaching final circle 200 once per faction; last surviving faction bonus 500 once. These are tuneable initial values, not a mathematically guaranteed fair balance. Defense intervals have a match cap; revive farms and repeated same-life awards are rejected.

Keep server-side event IDs/ledgers, distinct XP and score processing, clear HUD contributions, and a result breakdown. Finalize at the configured final-phase deadline or when only one/no factions have remaining lives/return opportunities. Highest combined score wins even if a different faction is last alive. Revivable downed members still count according to the explicit life-state rules. DEFAULT ties compare defense subtotal, elimination subtotal, then surviving roster count; exact remaining ties can be shared results. Do not implement unapproved respawn stations or infinite returns just to prolong scoring.

## 10. Vehicles, destruction, and weather

LOCKED vehicles: motorcycle, ATV, sedan, pickup, jeep, armored Hummer-style vehicle, armored transport/truck, and rare tanks on suitable military-base/militia maps. Use original/licensed vehicle designs. Seat roles include driver, passenger, rear-left/right, cargo positions where appropriate, gunner; prevent two pawns occupying one seat.

Jeep and armored Hummer-style vehicle have a mounted .50-caliber weapon with unlimited ammunition but overheating/cooldown. Armored vehicle gives more occupant protection. AI can board correct seats and operate mounted guns. Rarity/map tags control tank spawning.

Damage tires, engine, windows, and mounted gun separately. Critical engine damage produces visible hood fire/smoke and an occupant warning, then a 20-second evacuation countdown to explosion. Enter that state once; extra shots cannot repeatedly restart the countdown. Early engine repair behavior is separate from the critical countdown.

Crash impacts can eject occupants and cause speed/severity-dependent injury. Base the severity on collision/deceleration, not simply cruising speed. Use authoritative seat/ejection/damage transitions and visual ragdolls without making every client simulate a different outcome.

Destructible doors, windows, selected walls, cover, and vehicle components change collision, sightlines, and AI navigation. Use constrained authored breakable structures in the initial slice rather than promising unlimited structural simulation. Dynamic weather changes visibility/atmosphere, audio, and applicable handling; synchronize gameplay-affecting weather.

OPEN: full Fortnite-style resource harvesting/build/edit combat was not clearly resolved. Air drops, loot, customization, and environmental destruction ARE confirmed. Do not silently launch a complete construction economy or claim its omission was an explicit owner rejection. Keep a future buildable-cover extension seam; initial slice focuses on the agreed destruction.

## 11. Settings and performance

Implement actual PC/controller settings, not decorative switches: display/resolution/window mode, render scale, graphics quality, available anti-aliasing/upscaling, textures, shadows, effects, lighting/reflections, view distance, frame limit/v-sync, FOV, motion blur/camera shake, audio buses, bindings, sensitivity, ADS sensitivity, controller dead zones, aim preferences, subtitles/readability/color accessibility, and privacy/voice toggles. Expose supported engine options only; unsupported platform options must be unavailable with an explanation.

Target consistent responsive frame times before expensive effects. A 60-FPS client and 30-Hz authoritative-server target are INITIAL profiling budgets, not measured achievements; investigate higher budgets once the slice is stable. Measure p50/p95/p99 frame/tick times, memory, bandwidth, bot counts, and destruction load. Scale from the 20-combatant slice toward 50/100/150/200 only after recorded tests. A configuration entry for 200 is not proof of a playable 200-player server.

## 12. Completion standards

First browser milestone: retained playable shooter + 20 total actors/four factions + working faction AI/order subset + role presets/sliders + exactly-three-category wheel + modest starter gear and loot + shrinking zone + open depot + combined-score match end + rule tests. Integrate progression/ultimate/vehicle increments next while keeping a runnable build.

First Unreal milestone: native bootable project, authoritative multiplayer foundation, repeatable build/test scripts, two independent clients plus bots totaling 20, and an end-to-end deploy/fight/loot/command/revive/depot/score loop. Then add deeper customization, vehicles/destruction/weather, progression persistence, and online-account integration in tested increments. Controllers must work early; console packaging awaits authorized SDKs and real validation.

Maintain a requirement-ID checklist, changed files, exact commands run, results/logs, screenshots or captures where possible, unresolved issues, and next runnable task. Distinguish VERIFIED, IMPLEMENTED NOT RUN, PARTIAL, BLOCKED, and BACKLOG. Never claim a build/test passed without running it. Never call a skeleton, mock provider, or menu-only feature complete.


SHARED INITIAL CONFIGURATION (save as config/balance.defaults.json; these numeric defaults are provisional where labeled):

```json
{
  "schema_version": "1.0.0",
  "status": "Implementation defaults, not a finished balance model. See GAME_DESIGN.md for locked rules and open decisions.",
  "project_id": "FactionShooter",
  "match": {
    "target_caps": [
      20,
      50,
      100,
      150,
      200
    ],
    "initial_cap": 20,
    "initial_factions": 4,
    "initial_roster_size": 5,
    "equal_starting_rosters": true,
    "bots_count_toward_cap": true,
    "final_phase_seconds": 240
  },
  "talents": {
    "trees": [
      "Assault",
      "Guardian",
      "Recon"
    ],
    "talents_per_tree": 15,
    "tiers_per_tree": 5,
    "talents_per_tier": 3,
    "cost_per_talent": 1,
    "max_spent": 22,
    "tier_min_levels": [
      1,
      5,
      12,
      22,
      35
    ],
    "point_award_levels": [
      1,
      3,
      4,
      5,
      8,
      10,
      12,
      16,
      19,
      22,
      27,
      31,
      35,
      37,
      39,
      41,
      43,
      45,
      47,
      48,
      49,
      50
    ]
  },
  "starting_passives": {
    "catalog_size": 15,
    "equipped_count": 2,
    "consumes_talent_points": false
  },
  "attributes": {
    "allocation_budget": 100,
    "status": "provisional; derived effects, floors, and caps require balance data"
  },
  "xp": {
    "kill": 100,
    "assist": 75,
    "teammate_kill": 50,
    "revive": 60,
    "objective_capture": 100,
    "win": 500,
    "kill_reward_resolution": "highest_eligible_only",
    "level_curve": "not_yet_calibrated; implementation must provide configurable curve and pacing simulation"
  },
  "command_wheel": {
    "categories": [
      "Squad",
      "General",
      "Assist"
    ],
    "favorites_is_root_category": false
  },
  "ai": {
    "roles": [
      "Assault",
      "Healer",
      "Guardian",
      "Recon",
      "Support"
    ],
    "presets": [
      "Balanced",
      "Aggressive",
      "Defensive",
      "Medical",
      "Recon",
      "Custom"
    ],
    "slider_min": 0,
    "slider_ui_max": 50,
    "weights": {
      "Balanced": [
        1,
        1,
        1,
        1,
        1
      ],
      "Aggressive": [
        5,
        2,
        1,
        1,
        1
      ],
      "Defensive": [
        1,
        2,
        4,
        1,
        2
      ],
      "Medical": [
        2,
        4,
        2,
        1,
        1
      ],
      "Recon": [
        2,
        1,
        1,
        5,
        1
      ]
    },
    "integer_allocation": "largest_remainder; tie-break by stable role order",
    "manual_edit": "switch_to_Custom; do_not_silently_rebalance"
  },
  "ultimate": {
    "head_torso": "instant_lethal_or_critical_down",
    "limb_damage_max_health_fraction": 0.5,
    "near_miss_damage": 0,
    "normal_revive_seconds": 5,
    "first_ultimate_revive_seconds": 10,
    "revive_streak_multiplier": 1.5,
    "revive_cap_seconds": 60,
    "streak_scope": "single_activation_id",
    "death_resets_personal_charge": true,
    "maximum_charge": 100,
    "base_team_kill_charge": 10,
    "coordination_bonus_charge": 2,
    "team_multiplier_steps": [
      {
        "kills": 0,
        "multiplier": 1.0
      },
      {
        "kills": 2,
        "multiplier": 1.2
      },
      {
        "kills": 5,
        "multiplier": 1.5
      },
      {
        "kills": 10,
        "multiplier": 2.0
      },
      {
        "kills": 15,
        "multiplier": 2.5
      }
    ],
    "charge_and_multiplier_status": "provisional; coordinate eligibility and decay policy require explicit implementation notes",
    "near_miss_secondary_damage_policy": "v0_suppress_displacement_attributable_collision_and_fall_damage_only"
  },
  "inventory": {
    "primary_slots": 3,
    "sidearm_slots": 2,
    "launcher_consumes_primary_slot": true,
    "lethal_grenades": 5,
    "flashbangs": 3,
    "smoke_grenades": 2,
    "slot_count_status": "3 primary + 2 sidearm is a provisional interpretation of repeated primary wording"
  },
  "rarity": [
    "Common",
    "Uncommon",
    "Rare",
    "Epic",
    "Legendary",
    "Mythic"
  ],
  "score": {
    "kill": 100,
    "depot_defense_kill_bonus": 50,
    "assist_pool_per_defeat": 75,
    "revive": 50,
    "contested_defense_per_faction_interval": 25,
    "defense_interval_seconds": 10,
    "defense_interval_cap_per_faction": 24,
    "reach_final_once_per_faction": 200,
    "last_faction_bonus_once": 500,
    "victory": "highest_combined_score",
    "status": "provisional weights, capped event ledgers required"
  },
  "vehicle": {
    "critical_engine_explosion_seconds": 20,
    "mounted_gun_ammo": "unlimited",
    "mounted_gun_overheats": true
  },
  "inactivity": {
    "warning_seconds": 60,
    "automatic_hour_ban": false,
    "observation_window_seconds": 120,
    "observation_status": "provisional; context-aware participation required, not movement-only"
  },
  "persistence": {
    "weapon_mastery_scope": "character",
    "mastery_scope_status": "provisional; account-wide sharing was not settled"
  },
  "performance": {
    "initial_client_target_fps": 60,
    "initial_server_target_hz": 30,
    "status": "targets_only_not_benchmarked"
  }
}
```

END OF CANONICAL DESIGN AND CONFIGURATION.