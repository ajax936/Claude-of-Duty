import { Rng } from '../core/rng.js';

export const WEAPON_CATEGORIES = {
  pistol: { displayName: 'Pistols / Revolvers', slot: 'sidearm', weight: 1.0 },
  smg: { displayName: 'SMGs', slot: 'primary', weight: 1.0 },
  assault_rifle: { displayName: 'Assault Rifles', slot: 'primary', weight: 1.0 },
  shotgun: { displayName: 'Shotguns', slot: 'primary', weight: 0.7 },
  lmg: { displayName: 'LMGs', slot: 'primary', weight: 0.6 },
  marksman: { displayName: 'Marksman Rifles', slot: 'primary', weight: 0.5 },
  sniper: { displayName: 'Sniper Rifles', slot: 'primary', weight: 0.3 },
  launcher: { displayName: 'Launchers', slot: 'primary', weight: 0.2 },
  thermal_launcher: { displayName: 'Thermal Lock-On Launchers', slot: 'primary', weight: 0.1 },
  melee: { displayName: 'Melee', slot: 'melee', weight: 0.5 },
};

export const RARITY_TIERS = [
  { id: 'Common', tier: 0, color: 0xaaaaaa, css: '#aaaaaa', dropWeight: 1.0, statMult: 1.0 },
  { id: 'Uncommon', tier: 1, color: 0x44ff44, css: '#44ff44', dropWeight: 0.6, statMult: 1.15 },
  { id: 'Rare', tier: 2, color: 0x4488ff, css: '#4488ff', dropWeight: 0.35, statMult: 1.35 },
  { id: 'Epic', tier: 3, color: 0xaa44ff, css: '#aa44ff', dropWeight: 0.15, statMult: 1.6 },
  { id: 'Legendary', tier: 4, color: 0xffaa00, css: '#ffaa00', dropWeight: 0.05, statMult: 2.0 },
  { id: 'Mythic', tier: 5, color: 0xff4444, css: '#ff4444', dropWeight: 0.01, statMult: 2.5 },
];

export const ATTACHMENT_TYPES = ['scope', 'suppressor', 'grip', 'magazine', 'ammo', 'stock', 'barrel'];

export const LOOT_TABLES = {
  ground: {
    Common: { pistol: 0.3, smg: 0.2, assault_rifle: 0.15, shotgun: 0.1, ammo: 0.15, armor: 0.05, healing: 0.05 },
    Uncommon: { smg: 0.25, assault_rifle: 0.2, marksman: 0.1, shotgun: 0.1, lmg: 0.05, scope: 0.1, suppressor: 0.05, armor: 0.1, healing: 0.05 },
    Rare: { assault_rifle: 0.2, marksman: 0.15, sniper: 0.1, lmg: 0.1, scope: 0.15, grip: 0.1, magazine: 0.1, armor: 0.1, healing: 0.1 },
    Epic: { sniper: 0.2, marksman: 0.15, lmg: 0.15, launcher: 0.1, scope: 0.15, suppressor: 0.1, armor: 0.15 },
    Legendary: { sniper: 0.3, thermal_launcher: 0.2, launcher: 0.15, scope: 0.2, armor: 0.15 },
    Mythic: { thermal_launcher: 0.5, sniper: 0.3, armor: 0.2 },
  },
  depot: {
    Common: { assault_rifle: 0.2, smg: 0.15, pistol: 0.1, ammo: 0.3, armor: 0.1, healing: 0.15 },
    Uncommon: { assault_rifle: 0.25, marksman: 0.15, smg: 0.1, shotgun: 0.1, scope: 0.1, suppressor: 0.05, armor: 0.15, healing: 0.1 },
    Rare: { marksman: 0.2, sniper: 0.1, lmg: 0.15, launcher: 0.05, scope: 0.15, grip: 0.1, magazine: 0.1, armor: 0.1, healing: 0.15 },
    Epic: { sniper: 0.25, launcher: 0.15, thermal_launcher: 0.05, scope: 0.2, suppressor: 0.1, armor: 0.1, healing: 0.1 },
    Legendary: { sniper: 0.3, thermal_launcher: 0.2, launcher: 0.15, armor: 0.15, healing: 0.2 },
    Mythic: { thermal_launcher: 0.4, sniper: 0.3, armor: 0.3 },
  },
};

export const STARTER_LOADOUTS = {
  Assault: { primary: 'rifle_basic', sidearm: 'pistol_basic', grenade: 'frag', armor: 'light', healing: 'bandages' },
  Healer: { primary: 'smg_basic', sidearm: 'pistol_basic', grenade: 'smoke', armor: 'light', healing: 'medkit' },
  Guardian: { primary: 'shotgun_basic', sidearm: 'pistol_basic', grenade: 'flashbang', armor: 'medium', healing: 'bandages' },
  Recon: { primary: 'marksman_basic', sidearm: 'revolver_basic', grenade: 'sensor_dart', armor: 'light', healing: 'bandages' },
  Support: { primary: 'rifle_basic', sidearm: 'pistol_basic', grenade: 'frag', armor: 'medium', healing: 'ammo_box' },
};

export class InventorySystem {
  static id = 'inventory';
  static deps = ['config', 'player', 'weapons', 'factions'];

  constructor() {
    this.config = null;
    this.player = null;
    this.weapons = null;
    this.factions = null;
    this.groundLoot = [];
    this._rng = new Rng(0xFEEDFACE);
    this.lootIdCounter = 0;
  }

  async init(ctx) {
    this.ctx = ctx;
    this.config = ctx.get('config');
    this.player = ctx.peek('player');
    this.weapons = ctx.peek('weapons');
    this.factions = ctx.peek('factions');
    this._rng = ctx.rng.fork();
    this.inventoryConfig = this.config.getInventoryConfig();
    console.info('[inventory] initialized');
  }

  getStarterLoadout(role) {
    return STARTER_LOADOUTS[role] ?? STARTER_LOADOUTS.Assault;
  }

  applyStarterLoadout(role) {
    const loadout = this.getStarterLoadout(role);
    this._giveWeapon(loadout.primary, 'primary');
    this._giveWeapon(loadout.sidearm, 'sidearm');
    this._giveGrenade(loadout.grenade);
    this._giveArmor(loadout.armor);
    this._giveHealing(loadout.healing);
  }

  _giveWeapon(weaponId, slot) {
    if (!this.weapons) return;
    this.weapons.setWeaponImmediate(weaponId);
  }

  _giveGrenade(type) {}

  _giveArmor(type) {}

  _giveHealing(type) {}

  spawnGroundLoot(position, rarityBias = 'Common') {
    const table = LOOT_TABLES.ground[rarityBias] ?? LOOT_TABLES.ground.Common;
    const items = Object.entries(table);
    const totalWeight = items.reduce((sum, [, w]) => sum + w, 0);
    let roll = this._rng.float() * totalWeight;
    let selected = 'ammo';
    for (const [item, weight] of items) {
      roll -= weight;
      if (roll <= 0) { selected = item; break; }
    }

    const rarity = this._rollRarity('ground');
    const loot = {
      id: `loot_${++this.lootIdCounter}`,
      type: selected,
      rarity,
      position: { ...position },
      timestamp: this.ctx.time.elapsed,
      data: this._generateLootData(selected, rarity),
    };

    this.groundLoot.push(loot);
    this._cleanupOldLoot();
    return loot;
  }

  spawnDepotLoot(rarity) {
    const table = LOOT_TABLES.depot[rarity] ?? LOOT_TABLES.depot.Common;
    const items = Object.entries(table);
    const totalWeight = items.reduce((sum, [, w]) => sum + w, 0);
    let roll = this._rng.float() * totalWeight;
    let selected = 'ammo';
    for (const [item, weight] of items) {
      roll -= weight;
      if (roll <= 0) { selected = item; break; }
    }
    return { type: selected, rarity, data: this._generateLootData(selected, rarity) };
  }

  _rollRarity(source) {
    const weights = RARITY_TIERS.map(t => t.dropWeight * (source === 'depot' ? 3 : 1));
    const total = weights.reduce((a, b) => a + b, 0);
    let roll = this._rng.float() * total;
    for (let i = 0; i < weights.length; i++) {
      roll -= weights[i];
      if (roll <= 0) return RARITY_TIERS[i].id;
    }
    return 'Common';
  }

  _generateLootData(type, rarity) {
    const tier = RARITY_TIERS.find(t => t.id === rarity)?.tier ?? 0;
    const mult = RARITY_TIERS[tier]?.statMult ?? 1.0;

    if (type === 'ammo') return { caliber: this._randomCaliber(), count: Math.floor(30 * mult) };
    if (type === 'armor') return { level: Math.min(3, 1 + tier), durability: 100 };
    if (type === 'healing') return { type: this._randomHealing(), potency: Math.round(50 * mult) };
    if (type === 'scope') return { magnification: 1 + tier, rarity };
    if (type === 'suppressor') return { soundReduction: 0.3 + tier * 0.1, rarity };
    if (type === 'grip') return { recoilReduction: 0.1 + tier * 0.05, rarity };
    if (type === 'magazine') return { capacityBonus: 5 + tier * 5, rarity };
    if (type in WEAPON_CATEGORIES) return { weaponId: this._weaponIdForType(type, rarity), rarity };

    return { rarity };
  }

  _randomCaliber() {
    return this._rng.pick(['9mm', '5.56mm', '7.62mm', '.45ACP', '.308', '12ga']);
  }

  _randomHealing() {
    return this._rng.pick(['bandages', 'medkit', 'stim', 'armor_repair']);
  }

  _weaponIdForType(type, rarity) {
    const base = {
      pistol: 'pistol', smg: 'smg', assault_rifle: 'rifle',
      shotgun: 'shotgun', lmg: 'lmg', marksman: 'marksman',
      sniper: 'sniper', launcher: 'launcher', thermal_launcher: 'thermal_launcher',
    }[type] ?? 'rifle';
    const suffix = rarity === 'Common' ? '_basic' : rarity === 'Uncommon' ? '_improved' : rarity === 'Rare' ? '_advanced' : '_elite';
    return base + suffix;
  }

  _cleanupOldLoot() {
    const maxAge = 300;
    const now = this.ctx.time.elapsed;
    this.groundLoot = this.groundLoot.filter(l => now - l.timestamp < maxAge);
    if (this.groundLoot.length > 200) {
      this.groundLoot.sort((a, b) => a.timestamp - b.timestamp);
      this.groundLoot = this.groundLoot.slice(-200);
    }
  }

  getNearbyLoot(position, radius = 3) {
    return this.groundLoot.filter(l => {
      const dx = l.position.x - position.x;
      const dz = l.position.z - position.z;
      return dx * dx + dz * dz <= radius * radius;
    });
  }

  pickupLoot(lootId) {
    const idx = this.groundLoot.findIndex(l => l.id === lootId);
    if (idx === -1) return null;
    const loot = this.groundLoot.splice(idx, 1)[0];
    this._applyLootToPlayer(loot);
    return loot;
  }

  _applyLootToPlayer(loot) {
    if (!this.player || !this.weapons) return;
    // Apply based on loot type - simplified
    this.ctx.events.emit('loot:picked_up', { loot });
  }

  getPlayerInventory() {
    return {
      primary: this.weapons?.weaponIds?.filter(id => WEAPON_CATEGORIES[WEAPON_CATEGORIES[id]?.slot === 'primary']) ?? [],
      sidearm: this.weapons?.weaponIds?.filter(id => WEAPON_CATEGORIES[WEAPON_CATEGORIES[id]?.slot === 'sidearm']) ?? [],
      grenades: { lethal: 2, flashbang: 1, smoke: 1 },
      armor: { current: 'light', plates: 2 },
      healing: { bandages: 3, medkit: 1 },
    };
  }

  canCarryMore(slot) {
    const cfg = this.inventoryConfig;
    const inv = this.getPlayerInventory();
    if (slot === 'primary') return inv.primary.length < cfg.primary_slots;
    if (slot === 'sidearm') return inv.sidearm.length < cfg.sidearm_slots;
    return true;
  }

  swapWeapon(newWeaponId, slot) {
    if (!this.canCarryMore(slot)) return false;
    return this.weapons?.setWeapon(newWeaponId) ?? false;
  }

  dispose() {
    this.groundLoot.length = 0;
  }
}