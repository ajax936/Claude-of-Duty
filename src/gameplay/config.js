import * as THREE from 'three';

export class ConfigSystem {
  static id = 'config';
  static deps = [];

  constructor() {
    this.balance = null;
    this._loadPromise = null;
  }

  async init(ctx) {
    this.ctx = ctx;
    this.rng = ctx.rng.fork();
    await this.loadBalance();
    console.info('[config] balance loaded', this.balance.project_id, this.balance.schema_version);
  }

  async loadBalance() {
    if (this._loadPromise) return this._loadPromise;
    this._loadPromise = (async () => {
      try {
        const res = await fetch('/config/balance.defaults.json');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        this.balance = await res.json();
      } catch (err) {
        console.warn('[config] failed to load balance.defaults.json, using embedded defaults', err);
        this.balance = this.getEmbeddedDefaults();
      }
      return this.balance;
    })();
    return this._loadPromise;
  }

  getEmbeddedDefaults() {
    return {
      schema_version: '1.0.0',
      project_id: 'FactionShooter',
      match: {
        target_caps: [20, 50, 100, 150, 200],
        initial_cap: 20,
        initial_factions: 4,
        initial_roster_size: 5,
        equal_starting_rosters: true,
        bots_count_toward_cap: true,
        final_phase_seconds: 240
      },
      talents: {
        trees: ['Assault', 'Guardian', 'Recon'],
        talents_per_tree: 15,
        tiers_per_tree: 5,
        talents_per_tier: 3,
        cost_per_talent: 1,
        max_spent: 22,
        tier_min_levels: [1, 5, 12, 22, 35],
        point_award_levels: [1, 3, 4, 5, 8, 10, 12, 16, 19, 22, 27, 31, 35, 37, 39, 41, 43, 45, 47, 48, 49, 50]
      },
      starting_passives: { catalog_size: 15, equipped_count: 2, consumes_talent_points: false },
      attributes: { allocation_budget: 100 },
      xp: { kill: 100, assist: 75, teammate_kill: 50, revive: 60, objective_capture: 100, win: 500, kill_reward_resolution: 'highest_eligible_only' },
      command_wheel: { categories: ['Squad', 'General', 'Assist'], favorites_is_root_category: false },
      ai: {
        roles: ['Assault', 'Healer', 'Guardian', 'Recon', 'Support'],
        presets: ['Balanced', 'Aggressive', 'Defensive', 'Medical', 'Recon', 'Custom'],
        slider_min: 0, slider_ui_max: 50,
        weights: {
          Balanced: [1, 1, 1, 1, 1],
          Aggressive: [5, 2, 1, 1, 1],
          Defensive: [1, 2, 4, 1, 2],
          Medical: [2, 4, 2, 1, 1],
          Recon: [2, 1, 1, 5, 1]
        },
        integer_allocation: 'largest_remainder'
      },
      ultimate: {
        head_torso: 'instant_lethal_or_critical_down',
        limb_damage_max_health_fraction: 0.5,
        near_miss_damage: 0,
        normal_revive_seconds: 5,
        first_ultimate_revive_seconds: 10,
        revive_streak_multiplier: 1.5,
        revive_cap_seconds: 60,
        streak_scope: 'single_activation_id',
        death_resets_personal_charge: true,
        maximum_charge: 100,
        base_team_kill_charge: 10,
        coordination_bonus_charge: 2,
        team_multiplier_steps: [
          { kills: 0, multiplier: 1.0 },
          { kills: 2, multiplier: 1.2 },
          { kills: 5, multiplier: 1.5 },
          { kills: 10, multiplier: 2.0 },
          { kills: 15, multiplier: 2.5 }
        ]
      },
      inventory: { primary_slots: 3, sidearm_slots: 2, launcher_consumes_primary_slot: true, lethal_grenades: 5, flashbangs: 3, smoke_grenades: 2 },
      rarity: ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary', 'Mythic'],
      score: { kill: 100, depot_defense_kill_bonus: 50, assist_pool_per_defeat: 75, revive: 50, contested_defense_per_faction_interval: 25, defense_interval_seconds: 10, defense_interval_cap_per_faction: 24, reach_final_once_per_faction: 200, last_faction_bonus_once: 500, victory: 'highest_combined_score' },
      vehicle: { critical_engine_explosion_seconds: 20, mounted_gun_ammo: 'unlimited', mounted_gun_overheats: true },
      inactivity: { warning_seconds: 60, automatic_hour_ban: false, observation_window_seconds: 120 },
      persistence: { weapon_mastery_scope: 'character' },
      performance: { initial_client_target_fps: 60, initial_server_target_hz: 30 }
    };
  }

  get(path) {
    if (!this.balance) return undefined;
    const parts = path.split('.');
    let obj = this.balance;
    for (const p of parts) {
      if (obj === undefined || obj === null) return undefined;
      obj = obj[p];
    }
    return obj;
  }

  getMatchConfig() {
    return this.balance?.match ?? this.getEmbeddedDefaults().match;
  }

  getTalentConfig() {
    return this.balance?.talents ?? this.getEmbeddedDefaults().talents;
  }

  getAIConfig() {
    return this.balance?.ai ?? this.getEmbeddedDefaults().ai;
  }

  getUltimateConfig() {
    return this.balance?.ultimate ?? this.getEmbeddedDefaults().ultimate;
  }

  getInventoryConfig() {
    return this.balance?.inventory ?? this.getEmbeddedDefaults().inventory;
  }

  getScoreConfig() {
    return this.balance?.score ?? this.getEmbeddedDefaults().score;
  }

  getXPConfig() {
    return this.balance?.xp ?? this.getEmbeddedDefaults().xp;
  }

  dispose() {}
}