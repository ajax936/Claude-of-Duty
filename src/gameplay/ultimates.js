import { Rng } from '../core/rng.js';

export const ULTIMATE_EFFECTS = {
  offensive: [
    { id: 'ult_dmg_burst', name: 'Damage Burst', desc: 'Instant high damage in radius', cost: 30, params: { damage: 200, radius: 8 } },
    { id: 'ult_orbital', name: 'Orbital Strike', desc: 'Delayed massive area damage', cost: 40, params: { damage: 300, radius: 12, delay: 2 } },
    { id: 'ult_missile', name: 'Guided Missile', desc: 'Player-guided high-damage projectile', cost: 25, params: { damage: 250, speed: 80 } },
    { id: 'ult_laser', name: 'Laser Sweep', desc: 'Continuous beam, high DPS', cost: 35, params: { dps: 400, duration: 4 } },
    { id: 'ult_emp', name: 'EMP Pulse', desc: 'Disables electronics, strips shields', cost: 20, params: { radius: 15, shieldStrip: 100, duration: 5 } },
  ],
  defensive: [
    { id: 'ult_barrier', name: 'Hardlight Barrier', desc: 'Deployable cover, blocks all fire', cost: 20, params: { health: 500, width: 6, duration: 15 } },
    { id: 'ult_dome', name: 'Protection Dome', desc: 'Sphere shield for team', cost: 35, params: { health: 1000, radius: 5, duration: 10 } },
    { id: 'ult_smoke', name: 'Tactical Smoke', desc: 'Massive obscuring cloud', cost: 15, params: { radius: 20, duration: 20 } },
    { id: 'ult_decoy', name: 'Holo Decoys', desc: 'Spawn fake allies to confuse', cost: 18, params: { count: 4, duration: 15 } },
    { id: 'ult_armor', name: 'Reactive Armor', desc: 'Team gains temp armor + reflect', cost: 28, params: { armor: 150, reflect: 0.3, duration: 12 } },
  ],
  healing: [
    { id: 'ult_heal_wave', name: 'Healing Wave', desc: 'Instant heal all allies in range', cost: 25, params: { heal: 100, radius: 25 } },
    { id: 'ult_revive_all', name: 'Mass Revival', desc: 'Revive all downed allies instantly', cost: 40, params: { radius: 30, fullHealth: true } },
    { id: 'ult_regen', name: 'Regeneration Field', desc: 'Continuous heal over time', cost: 22, params: { hps: 50, radius: 15, duration: 15 } },
    { id: 'ult_cleanse', name: 'Cleanse', desc: 'Remove all debuffs, grant immunity', cost: 18, params: { radius: 20, immunity: 8 } },
    { id: 'ult_overheal', name: 'Overheal', desc: 'Grant temp HP above max', cost: 30, params: { tempHp: 100, radius: 20 } },
  ],
  utility: [
    { id: 'ult_scan', name: 'Wide Scan', desc: 'Reveal all enemies in huge radius', cost: 15, params: { radius: 100, duration: 10 } },
    { id: 'ult_ammo', name: 'Resupply Drop', desc: 'Full ammo + gadgets for team', cost: 20, params: { radius: 15 } },
    { id: 'ult_vehicle', name: 'Vehicle Call-in', desc: 'Drop armored transport', cost: 35, params: { type: 'armored_transport' } },
    { id: 'ult_turret', name: 'Auto-Turret', desc: 'Deploy AI-controlled turret', cost: 25, params: { health: 300, dps: 80, duration: 30 } },
    { id: 'ult_speed', name: 'Adrenaline Rush', desc: 'Team speed + fire rate boost', cost: 22, params: { speedMult: 1.5, fireRateMult: 1.3, duration: 10 } },
  ],
};

export const ULTIMATE_CORES = {
  offensive: { id: 'core_offensive', name: 'Offensive Core', color: 0xff4444, effects: ['ult_dmg_burst', 'ult_orbital', 'ult_missile', 'ult_laser', 'ult_emp'] },
  defensive: { id: 'core_defensive', name: 'Defensive Core', color: 0x4488ff, effects: ['ult_barrier', 'ult_dome', 'ult_smoke', 'ult_decoy', 'ult_armor'] },
  healing: { id: 'core_healing', name: 'Healing Core', color: 0x44ff88, effects: ['ult_heal_wave', 'ult_revive_all', 'ult_regen', 'ult_cleanse', 'ult_overheal'] },
  utility: { id: 'core_utility', name: 'Utility Core', color: 0xffaa00, effects: ['ult_scan', 'ult_ammo', 'ult_vehicle', 'ult_turret', 'ult_speed'] },
};

export const ULTIMATE_MODIFIERS = [
  { id: 'mod_range', name: 'Extended Range', desc: '+50% radius/range', cost: 5 },
  { id: 'mod_duration', name: 'Prolonged', desc: '+50% duration', cost: 5 },
  { id: 'mod_intensity', name: 'Intensified', desc: '+30% damage/healing', cost: 8 },
  { id: 'mod_cooldown', name: 'Quick Charge', desc: '-20% charge requirement', cost: 10 },
  { id: 'mod_stealth', name: 'Silent', desc: 'No audio/visual tell', cost: 12 },
  { id: 'mod_pierce', name: 'Armor Piercing', desc: 'Ignores armor/shields', cost: 10 },
  { id: 'mod_team', name: 'Shared', desc: 'Effect applies to whole squad', cost: 15 },
  { id: 'mod_chain', name: 'Chaining', desc: 'Jumps to 2 additional targets', cost: 12 },
];

export const ULTIMATE_FINISHERS = [
  { id: 'fin_explode', name: 'Detonate', desc: 'Ends with explosion', cost: 5, type: 'offensive' },
  { id: 'fin_heal', name: 'Mend', desc: 'Ends with heal pulse', cost: 5, type: 'healing' },
  { id: 'fin_shield', name: 'Fortify', desc: 'Grants temp shield on end', cost: 5, type: 'defensive' },
  { id: 'fin_stun', name: 'Paralyze', desc: 'Stuns enemies in radius', cost: 8, type: 'offensive' },
  { id: 'fin_teleport', name: 'Relocate', desc: 'Teleport to safety on end', cost: 10, type: 'utility' },
  { id: 'fin_nuke', name: 'Overload', desc: 'Massive final blast, self-damage', cost: 15, type: 'offensive' },
];

export function getEffectById(id) {
  for (const cat of Object.values(ULTIMATE_EFFECTS)) {
    const found = cat.find(e => e.id === id);
    if (found) return { ...found, category: Object.keys(ULTIMATE_EFFECTS).find(k => ULTIMATE_EFFECTS[k].includes(found)) };
  }
  return null;
}

export function getCoreById(id) {
  return ULTIMATE_CORES[id] ?? null;
}

export function getModifierById(id) {
  return ULTIMATE_MODIFIERS.find(m => m.id === id) ?? null;
}

export function getFinisherById(id) {
  return ULTIMATE_FINISHERS.find(f => f.id === id) ?? null;
}

export function validateUltimateBuild(coreId, effectId, modifierIds, finisherId, maxBudget = 100) {
  const core = getCoreById(coreId);
  const effect = getEffectById(effectId);
  if (!core || !effect) return { ok: false, reason: 'invalid_core_or_effect' };
  if (!core.effects.includes(effectId)) return { ok: false, reason: 'effect_not_in_core' };

  let totalCost = effect.cost;
  const modifiers = modifierIds.map(getModifierById).filter(Boolean);
  for (const m of modifiers) totalCost += m.cost;

  const finisher = getFinisherById(finisherId);
  if (finisher) totalCost += finisher.cost;

  if (totalCost > maxBudget) return { ok: false, reason: 'over_budget', cost: totalCost, max: maxBudget };

  return { ok: true, cost: totalCost, core, effect, modifiers, finisher };
}

export const ULTIMATE_HIT_RULES = {
  head_torso: 'instant_lethal_or_critical_down',
  limb_damage_max_health_fraction: 0.5,
  near_miss_damage: 0,
  near_miss_knockback: true,
  distant_miss: 'no_effect',
};

export function calculateUltimateDamage(hitZone, targetMaxHealth, targetCurrentHealth, isUltimate = true) {
  if (!isUltimate) return { damage: 0, lethal: false, downed: false };

  switch (hitZone) {
    case 'head':
    case 'torso':
      return { damage: targetCurrentHealth, lethal: true, downed: true, bypassArmor: true };

    case 'arm':
    case 'leg':
      const dmg = targetMaxHealth * 0.5;
      const lethal = dmg >= targetCurrentHealth;
      return { damage: dmg, lethal, downed: lethal, bypassArmor: false };

    case 'near_miss':
      return { damage: 0, lethal: false, downed: false, knockback: true };

    default:
      return { damage: 0, lethal: false, downed: false };
  }
}

export class UltimateSystem {
  static id = 'ultimates';
  static deps = ['config', 'factions', 'player', 'ai'];

  constructor() {
    this.config = null;
    this.factions = null;
    this.player = null;
    this.ai = null;
    this.charge = 0;
    this.maxCharge = 100;
    this.activeUltimate = null;
    this.activationId = 0;
    this.ultimateKills = 0;
    this.ultimateConfig = null;
    this.presets = new Map();
    this.equippedUltimate = null;
  }

  async init(ctx) {
    this.ctx = ctx;
    this.config = ctx.get('config');
    this.factions = ctx.peek('factions');
    this.player = ctx.peek('player');
    this.ai = ctx.peek('ai');
    this.ultimateConfig = this.config.getUltimateConfig();
    this.maxCharge = this.ultimateConfig.maximum_charge ?? 100;
    this.charge = 0;
    console.info('[ultimates] initialized');
  }

  resetCharge() {
    this.charge = 0;
    this.ultimateKills = 0;
    this.activeUltimate = null;
  }

  onTeamKill(killerFactionId, victimCount = 1, coordinated = false) {
    const playerFaction = this.factions?.getPlayerFaction()?.id ?? 0;
    if (killerFactionId !== playerFaction) return;

    const cfg = this.ultimateConfig;
    let chargeGain = cfg.base_team_kill_charge * victimCount;
    if (coordinated) chargeGain += cfg.coordination_bonus_charge * victimCount;

    const multiplier = this._getTeamMultiplier(this.factions?.getPlayerFaction()?.scoreBreakdown?.eliminations ?? 0);
    chargeGain *= multiplier;

    this.charge = Math.min(this.maxCharge, this.charge + chargeGain);

    if (this.charge >= this.maxCharge && !this.activeUltimate) {
      this.ctx.events.emit('ultimate:ready', { charge: this.charge });
    }
  }

  _getTeamMultiplier(kills) {
    const steps = this.ultimateConfig.team_multiplier_steps ?? [
      { kills: 0, multiplier: 1.0 },
      { kills: 2, multiplier: 1.2 },
      { kills: 5, multiplier: 1.5 },
      { kills: 10, multiplier: 2.0 },
      { kills: 15, multiplier: 2.5 },
    ];
    let mult = 1.0;
    for (const step of steps) {
      if (kills >= step.kills) mult = step.multiplier;
      else break;
    }
    return mult;
  }

  canActivate() {
    return this.charge >= this.maxCharge && !this.activeUltimate && this.player && !this.player.dead;
  }

  activate(ultimateBuild = null) {
    if (!this.canActivate()) return { ok: false, reason: 'not_ready' };

    const build = ultimateBuild ?? this.equippedUltimate;
    if (!build) return { ok: false, reason: 'no_ultimate_equipped' };

    const validation = validateUltimateBuild(build.core, build.effect, build.modifiers, build.finisher);
    if (!validation.ok) return { ok: false, reason: validation.reason };

    this.activationId++;
    this.activeUltimate = {
      id: this.activationId,
      build,
      startTime: this.ctx.time.elapsed,
      kills: 0,
      victims: [],
    };
    this.charge = 0;
    this.ultimateKills = 0;

    this.ctx.events.emit('ultimate:activated', { activationId: this.activationId, build });
    return { ok: true, activationId: this.activationId };
  }

  onUltimateHit(target, hitZone, targetMaxHealth, targetCurrentHealth) {
    if (!this.activeUltimate) return null;

    const dmg = calculateUltimateDamage(hitZone, targetMaxHealth, targetCurrentHealth);
    this.activeUltimate.kills++;

    if (dmg.lethal || dmg.downed) {
      const killIndex = this.activeUltimate.kills;
      const reviveDuration = this._calculateReviveDuration(killIndex);
      this.activeUltimate.victims.push({
        target,
        hitZone,
        killIndex,
        reviveDuration,
        timestamp: this.ctx.time.elapsed,
      });

      this.ctx.events.emit('ultimate:kill', {
        activationId: this.activationId,
        killIndex,
        victim: target,
        reviveDuration,
      });
    }

    return dmg;
  }

  _calculateReviveDuration(killIndex) {
    const cfg = this.ultimateConfig;
    if (killIndex === 1) return cfg.first_ultimate_revive_seconds ?? 10;

    const mult = cfg.revive_streak_multiplier ?? 1.5;
    const base = cfg.first_ultimate_revive_seconds ?? 10;
    let duration = base * Math.pow(mult, killIndex - 1);
    return Math.min(duration, cfg.revive_cap_seconds ?? 60);
  }

  endUltimate() {
    if (!this.activeUltimate) return;
    this.ctx.events.emit('ultimate:ended', { activationId: this.activationId, kills: this.activeUltimate.kills });
    this.activeUltimate = null;
    this.ultimateKills = 0;
  }

  interruptUltimate() {
    if (!this.activeUltimate) return;
    this.ctx.events.emit('ultimate:interrupted', { activationId: this.activationId });
    this.activeUltimate = null;
    this.ultimateKills = 0;
  }

  onPlayerDeath() {
    this.resetCharge();
    this.interruptUltimate();
  }

  getChargePercent() {
    return this.charge / this.maxCharge;
  }

  getState() {
    return {
      charge: this.charge,
      maxCharge: this.maxCharge,
      percent: this.getChargePercent(),
      ready: this.charge >= this.maxCharge,
      active: !!this.activeUltimate,
      activationId: this.activeUltimate?.id ?? 0,
      ultimateKills: this.ultimateKills,
      equipped: this.equippedUltimate,
    };
  }

  equipUltimate(build) {
    const validation = validateUltimateBuild(build.core, build.effect, build.modifiers, build.finisher);
    if (!validation.ok) return { ok: false, reason: validation.reason };
    this.equippedUltimate = build;
    return { ok: true };
  }

  savePreset(name, build) {
    const validation = validateUltimateBuild(build.core, build.effect, build.modifiers, build.finisher);
    if (!validation.ok) return { ok: false, reason: validation.reason };
    this.presets.set(name, { ...build, savedAt: Date.now() });
    return { ok: true };
  }

  loadPreset(name) {
    return this.presets.get(name) ?? null;
  }

  getPresets() {
    return Array.from(this.presets.entries()).map(([name, build]) => ({ name, ...build }));
  }

  update(dt) {
    if (this.activeUltimate) {
      if (this.ctx.time.elapsed - this.activeUltimate.startTime > 30) {
        this.endUltimate();
      }
    }
  }

  dispose() {
    this.presets.clear();
    this.activeUltimate = null;
  }
}