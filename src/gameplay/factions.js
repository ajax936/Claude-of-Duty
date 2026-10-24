import { Rng } from '../core/rng.js';

export const FACTION_COLORS = [
  { id: 0, name: 'Alpha', color: 0x00aaff, css: '#00aaff', cssDark: '#0088cc' },
  { id: 1, name: 'Bravo', color: 0xff4444, css: '#ff4444', cssDark: '#cc3333' },
  { id: 2, name: 'Charlie', color: 0x44ff44, css: '#44ff44', cssDark: '#33cc33' },
  { id: 3, name: 'Delta', color: 0xffaa00, css: '#ffaa00', cssDark: '#cc8800' },
  { id: 4, name: 'Echo', color: 0xaa44ff, css: '#aa44ff', cssDark: '#8833cc' },
  { id: 5, name: 'Foxtrot', color: 0x00ffaa, css: '#00ffaa', cssDark: '#00cc88' },
  { id: 6, name: 'Golf', color: 0xff6600, css: '#ff6600', cssDark: '#cc5200' },
  { id: 7, name: 'Hotel', color: 0xffffff, css: '#ffffff', cssDark: '#cccccc' },
  { id: 8, name: 'India', color: 0xff00ff, css: '#ff00ff', cssDark: '#cc00cc' },
  { id: 9, name: 'Juliett', color: 0x88ff00, css: '#88ff00', cssDark: '#66cc00' },
];

export const FACTION_ROLES = ['Assault', 'Healer', 'Guardian', 'Recon', 'Support'];

export const ROLE_DEFINITIONS = {
  Assault: {
    displayName: 'Assault',
    description: 'Frontline combat, high damage, flanking',
    primaryWeapons: ['rifle', 'smg'],
    secondaryWeapons: ['pistol'],
    gadgets: ['frag_grenade', 'smoke_grenade'],
    aiBehavior: 'aggressive',
    priority: ['engage', 'flank', 'pressure'],
    color: 0xff6600,
  },
  Healer: {
    displayName: 'Healer',
    description: 'Team sustain, revive, healing',
    primaryWeapons: ['smg', 'pistol'],
    secondaryWeapons: ['pistol'],
    gadgets: ['medkit', 'revive_tool', 'smoke_grenade'],
    aiBehavior: 'supportive',
    priority: ['heal', 'revive', 'stay_close'],
    color: 0x00ff88,
  },
  Guardian: {
    displayName: 'Guardian',
    description: 'Tank, defense, area denial',
    primaryWeapons: ['lmg', 'shotgun', 'rifle'],
    secondaryWeapons: ['pistol'],
    gadgets: ['deployable_cover', 'flashbang', 'armor_pack'],
    aiBehavior: 'defensive',
    priority: ['hold', 'protect', 'suppress'],
    color: 0x4488ff,
  },
  Recon: {
    displayName: 'Recon',
    description: 'Scout, intel, precision',
    primaryWeapons: ['marksman', 'sniper', 'smg'],
    secondaryWeapons: ['pistol', 'revolver'],
    gadgets: ['sensor_dart', 'flashbang', 'claymore'],
    aiBehavior: 'scouting',
    priority: ['mark', 'flank', 'intel'],
    color: 0xaa44ff,
  },
  Support: {
    displayName: 'Support',
    description: 'Resupply, utility, vehicle crew',
    primaryWeapons: ['rifle', 'lmg', 'smg'],
    secondaryWeapons: ['pistol'],
    gadgets: ['ammo_box', 'repair_tool', 'frag_grenade'],
    aiBehavior: 'utility',
    priority: ['resupply', 'repair', 'vehicle'],
    color: 0xffaa00,
  },
};

export const AI_PRESETS = {
  Balanced: [1, 1, 1, 1, 1],
  Aggressive: [5, 2, 1, 1, 1],
  Defensive: [1, 2, 4, 1, 2],
  Medical: [2, 4, 2, 1, 1],
  Recon: [2, 1, 1, 5, 1],
  Custom: null,
};

export function allocateRoles(presetName, totalSlots, customWeights = null) {
  const weights = customWeights ?? AI_PRESETS[presetName] ?? AI_PRESETS.Balanced;
  if (!weights) return { Assault: 0, Healer: 0, Guardian: 0, Recon: 0, Support: 0 };

  const totalWeight = weights.reduce((a, b) => a + b, 0);
  const raw = weights.map((w, i) => (w / totalWeight) * totalSlots);

  const floored = raw.map(v => Math.floor(v));
  const remainders = raw.map((v, i) => ({ index: i, rem: v - floored[i] }));
  remainders.sort((a, b) => b.rem - a.rem || a.index - b.index);

  let remaining = totalSlots - floored.reduce((a, b) => a + b, 0);
  for (const r of remainders) {
    if (remaining <= 0) break;
    floored[r.index]++;
    remaining--;
  }

  const roles = {};
  FACTION_ROLES.forEach((role, i) => {
    roles[role] = Math.max(0, floored[i]);
  });
  return roles;
}

export class FactionSystem {
  static id = 'factions';
  static deps = ['config', 'ai', 'player', 'physics', 'world'];

  constructor() {
    this.factions = [];
    this.playerFaction = 0;
    this.matchConfig = null;
    this.rosterSize = 5;
    this.numFactions = 4;
    this.deploymentPhase = false;
    this.deploymentChoices = new Map();
    this.safeZone = null;
    this.safeZoneTarget = null;
    this.safeZoneShrinkRate = 0;
    this.finalPhase = false;
    this.depot = null;
    this.depotActive = false;
    this.matchEnded = false;
    this.matchResults = null;
    this._rng = new Rng(0xDEADBEEF);
  }

  async init(ctx) {
    this.ctx = ctx;
    this.config = ctx.get('config');
    this.matchConfig = this.config.getMatchConfig();
    this.numFactions = this.matchConfig.initial_factions;
    this.rosterSize = this.matchConfig.initial_roster_size;
    this._rng = ctx.rng.fork();

    this._createFactions();
    console.info('[factions] initialized', this.numFactions, 'factions x', this.rosterSize, 'roster');
  }

  _createFactions() {
    this.factions = [];
    for (let i = 0; i < this.numFactions; i++) {
      const fc = FACTION_COLORS[i % FACTION_COLORS.length];
      this.factions.push({
        id: i,
        name: fc.name,
        color: fc.color,
        css: fc.css,
        cssDark: fc.cssDark,
        roster: [],
        alive: 0,
        score: 0,
        scoreBreakdown: {
          eliminations: 0,
          depotDefense: 0,
          assists: 0,
          revives: 0,
          defenseIntervals: 0,
          reachedFinal: false,
          lastFactionBonus: false,
        },
        aiRoles: { Assault: 0, Healer: 0, Guardian: 0, Recon: 0, Support: 0 },
        aiPreset: 'Balanced',
        commander: null,
      });
    }
  }

  getFaction(id) {
    return this.factions[id];
  }

  getPlayerFaction() {
    return this.factions[this.playerFaction];
  }

  getEnemyFactions(factionId) {
    return this.factions.filter(f => f.id !== factionId);
  }

  getAllActors() {
    const actors = [];
    for (const f of this.factions) {
      for (const member of f.roster) {
        actors.push({ ...member, faction: f.id });
      }
    }
    return actors;
  }

  getAliveCount(factionId) {
    const f = this.factions[factionId];
    return f?.roster.filter(m => m.alive).length ?? 0;
  }

  getTotalAlive() {
    return this.factions.reduce((sum, f) => sum + f.roster.filter(m => m.alive).length, 0);
  }

  setAIRoles(factionId, roles, preset = 'Custom') {
    const f = this.factions[factionId];
    if (!f) return false;
    f.aiRoles = { ...roles };
    f.aiPreset = preset;
    return true;
  }

  applyAIPreset(factionId, presetName) {
    const f = this.factions[factionId];
    if (!f) return false;
    const aiSlots = this.rosterSize - 1;
    const roles = allocateRoles(presetName, aiSlots);
    f.aiRoles = roles;
    f.aiPreset = presetName;
    return true;
  }

  assignPlayerToFaction(factionId) {
    this.playerFaction = Math.max(0, Math.min(factionId, this.numFactions - 1));
  }

  startDeployment() {
    this.deploymentPhase = true;
    this.deploymentChoices.clear();
  }

  setDeploymentChoice(actorId, destinationId) {
    this.deploymentChoices.set(actorId, destinationId);
  }

  getDeploymentChoice(actorId) {
    return this.deploymentChoices.get(actorId);
  }

  endDeployment() {
    this.deploymentPhase = false;
  }

  initSafeZone(worldBounds) {
    const margin = 15;
    const maxX = worldBounds.max.x - margin;
    const minX = worldBounds.min.x + margin;
    const maxZ = worldBounds.max.z - margin;
    const minZ = worldBounds.min.z + margin;

    const centerX = this._rng.range(minX, maxX);
    const centerZ = this._rng.range(minZ, maxZ);
    const radius = Math.min(maxX - minX, maxZ - minZ) * 0.4;

    this.safeZone = {
      center: { x: centerX, z: centerZ },
      radius,
      targetRadius: radius,
      shrinkStartTime: 0,
      shrinkDuration: 0,
      phase: 0,
      maxPhases: 4,
    };

    this._scheduleNextShrink();
  }

  _scheduleNextShrink() {
    if (!this.safeZone) return;
    const phase = this.safeZone.phase;
    const durations = [180, 120, 90, 60];
    const radiusMultipliers = [0.65, 0.45, 0.3, 0.15];

    this.safeZone.shrinkStartTime = this.ctx.time.elapsed;
    this.safeZone.shrinkDuration = durations[phase] ?? 60;
    this.safeZone.targetRadius = this.safeZone.radius * radiusMultipliers[phase];
  }

  updateSafeZone(dt) {
    if (!this.safeZone || this.finalPhase) return;

    const elapsed = this.ctx.time.elapsed - this.safeZone.shrinkStartTime;
    if (elapsed < this.safeZone.shrinkDuration) {
      const t = elapsed / this.safeZone.shrinkDuration;
      this.safeZone.radius = this.safeZone.radius * (1 - t) + this.safeZone.targetRadius * t;
    } else {
      this.safeZone.radius = this.safeZone.targetRadius;
      this.safeZone.phase++;
      if (this.safeZone.phase >= this.safeZone.maxPhases) {
        this.beginFinalPhase();
      } else {
        this._scheduleNextShrink();
      }
    }
  }

  beginFinalPhase() {
    this.finalPhase = true;
    this.depotActive = true;
    this._spawnDepot();
    console.info('[factions] Final phase began, depot spawned');
  }

  _spawnDepot() {
    const world = this.ctx.peek('world');
    if (!world || !this.safeZone) return;

    const center = this.safeZone.center;
    const depotPos = { x: center.x, z: center.z, y: world.groundHeight(center.x, center.z) + 0.5 };

    this.depot = {
      position: depotPos,
      radius: 8,
      inventory: this._generateDepotInventory(),
      contestedBy: new Set(),
      lastContestTime: 0,
    };
  }

  _generateDepotInventory() {
    return {
      primaries: ['rare_sniper', 'rare_launcher_thermal', 'ar_advanced', 'lmg_advanced'],
      sidearms: ['pistol_match', 'revolver_magnum'],
      armor: ['plate_heavy', 'plate_medium'],
      healing: ['medkit_large', 'armor_repair', 'bandages_x5'],
      grenades: { lethal: 5, flashbang: 3, smoke: 2 },
    };
  }

  isInSafeZone(position) {
    if (!this.safeZone) return true;
    const dx = position.x - this.safeZone.center.x;
    const dz = position.z - this.safeZone.center.z;
    return dx * dx + dz * dz <= this.safeZone.radius * this.safeZone.radius;
  }

  getZoneDamage(position) {
    if (!this.safeZone || this.isInSafeZone(position)) return 0;
    const dx = position.x - this.safeZone.center.x;
    const dz = position.z - this.safeZone.center.z;
    const dist = Math.sqrt(dx * dx + dz * dz) - this.safeZone.radius;
    return Math.min(10, dist * 0.5);
  }

  isInDepot(position) {
    if (!this.depotActive || !this.depot) return false;
    const dx = position.x - this.depot.position.x;
    const dz = position.z - this.depot.position.z;
    return dx * dx + dz * dz <= this.depot.radius * this.depot.radius;
  }

  recordDepotContest(factionId) {
    if (!this.depot) return;
    this.depot.contestedBy.add(factionId);
    this.depot.lastContestTime = this.ctx.time.elapsed;
  }

  update(dt) {
    this.updateSafeZone(dt);
    this._updateDepotContest(dt);
    this._checkMatchEnd();
  }

  _updateDepotContest(dt) {
    if (!this.depotActive || !this.depot) return;
    const interval = this.config.getScoreConfig().defense_interval_seconds ?? 10;
    if (this.ctx.time.elapsed - this.depot.lastContestTime > interval * 2) {
      this.depot.contestedBy.clear();
    }
  }

  _checkMatchEnd() {
    if (this.matchEnded) return;

    const aliveFactions = this.factions.filter(f => this.getAliveCount(f.id) > 0);
    if (aliveFactions.length <= 1 || (this.finalPhase && this.ctx.time.elapsed > this.matchConfig.final_phase_seconds)) {
      this.endMatch();
    }
  }

  endMatch() {
    if (this.matchEnded) return;
    this.matchEnded = true;
    this._calculateFinalScores();
    console.info('[factions] Match ended. Winner:', this.matchResults.winner?.name);
  }

  _calculateFinalScores() {
    const scoreCfg = this.config.getScoreConfig();
    const results = {
      winner: null,
      factions: [],
      mvp: null,
    };

    for (const f of this.factions) {
      const b = f.scoreBreakdown;
      const score = (
        b.eliminations * scoreCfg.kill +
        b.depotDefense * scoreCfg.depot_defense_kill_bonus +
        Math.min(b.assists, scoreCfg.assist_pool_per_defeat) +
        b.revives * scoreCfg.revive +
        b.defenseIntervals * scoreCfg.contested_defense_per_faction_interval +
        (b.reachedFinal ? scoreCfg.reach_final_once_per_faction : 0) +
        (b.lastFactionBonus ? scoreCfg.last_faction_bonus_once : 0)
      );

      f.score = score;
      results.factions.push({
        id: f.id,
        name: f.name,
        color: f.css,
        score,
        breakdown: { ...b },
        alive: this.getAliveCount(f.id),
      });
    }

    results.factions.sort((a, b) => b.score - a.score);
    results.winner = results.factions[0];

    const tied = results.factions.filter(f => f.score === results.winner.score);
    if (tied.length > 1) {
      tied.sort((a, b) => {
        const ab = a.breakdown.depotDefense - b.breakdown.depotDefense;
        if (ab !== 0) return -ab;
        const ae = a.breakdown.eliminations - b.breakdown.eliminations;
        if (ae !== 0) return -ae;
        return b.alive - a.alive;
      });
      results.winner = tied[0];
      results.tied = tied.length > 1;
    }

    this.matchResults = results;
    return results;
  }

  recordElimination(killerFactionId, victimFactionId, isDepotDefense = false) {
    const killer = this.factions[killerFactionId];
    const victim = this.factions[victimFactionId];
    if (!killer || !victim) return;

    killer.scoreBreakdown.eliminations++;
    if (isDepotDefense) killer.scoreBreakdown.depotDefense++;
  }

  recordAssist(factionId) {
    const f = this.factions[factionId];
    if (f) f.scoreBreakdown.assists++;
  }

  recordRevive(factionId) {
    const f = this.factions[factionId];
    if (f) f.scoreBreakdown.revives++;
  }

  recordDefenseInterval(factionId) {
    const f = this.factions[factionId];
    const cap = this.config.getScoreConfig().defense_interval_cap_per_faction ?? 24;
    if (f && f.scoreBreakdown.defenseIntervals < cap) {
      f.scoreBreakdown.defenseIntervals++;
    }
  }

  recordReachedFinal(factionId) {
    const f = this.factions[factionId];
    if (f && !f.scoreBreakdown.reachedFinal) {
      f.scoreBreakdown.reachedFinal = true;
    }
  }

  recordLastFactionBonus(factionId) {
    const f = this.factions[factionId];
    if (f) f.scoreBreakdown.lastFactionBonus = true;
  }

  getMatchState() {
    return {
      phase: this.deploymentPhase ? 'deployment' : this.finalPhase ? 'final' : 'combat',
      safeZone: this.safeZone ? { ...this.safeZone } : null,
      depot: this.depotActive ? { ...this.depot, inventory: undefined } : null,
      factions: this.factions.map(f => ({
        id: f.id,
        name: f.name,
        color: f.css,
        alive: this.getAliveCount(f.id),
        score: f.score,
      })),
      playerFaction: this.playerFaction,
      matchEnded: this.matchEnded,
      results: this.matchResults,
    };
  }

  dispose() {
    this.factions = [];
    this.deploymentChoices.clear();
  }
}