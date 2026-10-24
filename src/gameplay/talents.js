export const TALENT_TREES = {
  Assault: {
    displayName: 'Assault',
    description: 'Offense, mobility, and weapon handling',
    talents: [
      { id: 'assault_1_1', tier: 1, index: 0, name: 'Close Quarters', desc: 'Hip fire spread -15%', cost: 1 },
      { id: 'assault_1_2', tier: 1, index: 1, name: 'Quickdraw', desc: 'ADS speed +10%', cost: 1 },
      { id: 'assault_1_3', tier: 1, index: 2, name: 'Run & Gun', desc: 'Sprint-to-fire delay -20%', cost: 1 },
      { id: 'assault_2_1', tier: 2, index: 0, name: 'Aggressive Reload', desc: 'Tactical reload speed +25%', cost: 1 },
      { id: 'assault_2_2', tier: 2, index: 1, name: 'Flanker', desc: 'Move speed +5% while ADS', cost: 1 },
      { id: 'assault_2_3', tier: 2, index: 2, name: 'Double Tap', desc: 'Burst fire count +1', cost: 1 },
      { id: 'assault_3_1', tier: 3, index: 0, name: 'Reckless', desc: 'Damage +10% while sprinting', cost: 1 },
      { id: 'assault_3_2', tier: 3, index: 1, name: 'Gunslinger', desc: 'Pistol swap speed +50%, damage +15%', cost: 1 },
      { id: 'assault_3_3', tier: 3, index: 2, name: 'Momentum', desc: 'Kill grants 3s move speed +15%', cost: 1 },
      { id: 'assault_4_1', tier: 4, index: 0, name: 'Shredder', desc: 'Armor penetration +20%', cost: 1 },
      { id: 'assault_4_2', tier: 4, index: 1, name: 'Adrenaline', desc: 'Low health: fire rate +20%, reload +30%', cost: 1 },
      { id: 'assault_4_3', tier: 4, index: 2, name: 'Executioner', desc: 'Execute downed enemies instantly', cost: 1 },
      { id: 'assault_5_1', tier: 5, index: 0, name: 'Warlord', desc: 'All weapon handling +15%, no ADS penalty moving', cost: 1 },
      { id: 'assault_5_2', tier: 5, index: 1, name: 'Onslaught', desc: 'Tactical sprint recharge 2x, no cooldown on kill', cost: 1 },
      { id: 'assault_5_3', tier: 5, index: 2, name: 'Carnage', desc: 'Multikill: each kill extends tactical sprint 2s', cost: 1 },
    ]
  },
  Guardian: {
    displayName: 'Guardian',
    description: 'Durability, defense, and team protection',
    talents: [
      { id: 'guardian_1_1', tier: 1, index: 0, name: 'Thick Skin', desc: 'Max health +15', cost: 1 },
      { id: 'guardian_1_2', tier: 1, index: 1, name: 'Plate Carrier', desc: 'Armor effectiveness +10%', cost: 1 },
      { id: 'guardian_1_3', tier: 1, index: 2, name: 'Brace', desc: 'Crouch/prone: damage taken -10%', cost: 1 },
      { id: 'guardian_2_1', tier: 2, index: 0, name: 'Combat Medic', desc: 'Revive speed +25%, heal amount +15%', cost: 1 },
      { id: 'guardian_2_2', tier: 2, index: 1, name: 'Shield Wall', desc: 'ADS while crouched: frontal damage -20%', cost: 1 },
      { id: 'guardian_2_3', tier: 2, index: 2, name: 'Resupply', desc: 'Ammo pickup grants +1 mag to nearby allies', cost: 1 },
      { id: 'guardian_3_1', tier: 3, index: 0, name: 'Fortify', desc: 'Deployable cover health +50%', cost: 1 },
      { id: 'guardian_3_2', tier: 3, index: 1, name: 'Guardian Angel', desc: 'Revive grants 5s damage immunity to target', cost: 1 },
      { id: 'guardian_3_3', tier: 3, index: 2, name: 'Iron Will', desc: 'Suppression resistance +50%', cost: 1 },
      { id: 'guardian_4_1', tier: 4, index: 0, name: 'Bastion', desc: 'Nearby allies: armor regen +2/s', cost: 1 },
      { id: 'guardian_4_2', tier: 4, index: 1, name: 'Last Stand', desc: 'Downed: can fire sidearm, crawl 2x speed', cost: 1 },
      { id: 'guardian_4_3', tier: 4, index: 2, name: 'Martyr', desc: 'Death: explode, damage enemies, heal allies', cost: 1 },
      { id: 'guardian_5_1', tier: 5, index: 0, name: 'Immovable Object', desc: 'Cannot be knocked back, immune to stun', cost: 1 },
      { id: 'guardian_5_2', tier: 5, index: 1, name: 'Phalanx', desc: 'Allies in 10m: damage reduction +15%', cost: 1 },
      { id: 'guardian_5_3', tier: 5, index: 2, name: 'Vanguard', desc: 'Revive: full health + armor, 10s damage immunity', cost: 1 },
    ]
  },
  Recon: {
    displayName: 'Recon',
    description: 'Information, stealth, and precision',
    talents: [
      { id: 'recon_1_1', tier: 1, index: 0, name: 'Scout', desc: 'Footstep audio radius -30%', cost: 1 },
      { id: 'recon_1_2', tier: 1, index: 1, name: 'Keen Eye', desc: 'Marked enemy duration +50%', cost: 1 },
      { id: 'recon_1_3', tier: 1, index: 2, name: 'Light Step', desc: 'Fall damage -50%, no landing noise', cost: 1 },
      { id: 'recon_2_1', tier: 2, index: 0, name: 'Tracker', desc: 'Enemy footprints visible 10s', cost: 1 },
      { id: 'recon_2_2', tier: 2, index: 1, name: 'Silencer', desc: 'Suppressed weapons: no minimap reveal', cost: 1 },
      { id: 'recon_2_3', tier: 2, index: 2, name: 'Spotter', desc: 'Assist credit range +50%', cost: 1 },
      { id: 'recon_3_1', tier: 3, index: 0, name: 'Ghost', desc: 'Crouch move: invisible to UAV/radar', cost: 1 },
      { id: 'recon_3_2', tier: 3, index: 1, name: 'Marksman', desc: 'Headshot damage +25%, headshot range +20%', cost: 1 },
      { id: 'recon_3_3', tier: 3, index: 2, name: 'Intel', desc: 'Kill reveals killer position to squad 5s', cost: 1 },
      { id: 'recon_4_1', tier: 4, index: 0, name: 'Predator', desc: 'Highlight low-health enemies through walls', cost: 1 },
      { id: 'recon_4_2', tier: 4, index: 1, name: 'Dead Eye', desc: 'ADS: time slows 10% for aim (client visual)', cost: 1 },
      { id: 'recon_4_3', tier: 4, index: 2, name: 'Shadow', desc: 'Prone: near-invisible beyond 30m', cost: 1 },
      { id: 'recon_5_1', tier: 5, index: 0, name: 'Oracle', desc: 'All enemies in 100m marked every 30s', cost: 1 },
      { id: 'recon_5_2', tier: 5, index: 1, name: 'One Shot', desc: 'First shot from stealth: guaranteed crit', cost: 1 },
      { id: 'recon_5_3', tier: 5, index: 2, name: 'Phantom', desc: 'Kill: become stealthed 3s, no trace', cost: 1 },
    ]
  }
};

export const TALENT_TREE_ORDER = ['Assault', 'Guardian', 'Recon'];

export function getAllTalents() {
  const all = [];
  for (const treeName of TALENT_TREE_ORDER) {
    const tree = TALENT_TREES[treeName];
    for (const t of tree.talents) all.push({ ...t, tree: treeName });
  }
  return all;
}

export function getTalentsByTree(treeName) {
  return TALENT_TREES[treeName]?.talents ?? [];
}

export function getTalentById(id) {
  for (const treeName of TALENT_TREE_ORDER) {
    const t = TALENT_TREES[treeName].talents.find(x => x.id === id);
    if (t) return { ...t, tree: treeName };
  }
  return null;
}

export function getTalentTier(talent) {
  return talent.tier;
}

export function getTalentTree(talent) {
  return talent.tree;
}

export const STARTING_PASSIVES = [
  { id: 'sp_1', name: 'Quick Learner', desc: 'XP gain +10%' },
  { id: 'sp_2', name: 'Scavenger', desc: 'Loot rarity +1 tier chance' },
  { id: 'sp_3', name: 'Sprinter', desc: 'Sprint speed +5%' },
  { id: 'sp_4', name: 'Tough', desc: 'Max health +10' },
  { id: 'sp_5', name: 'Steady Hand', desc: 'Recoil control +10%' },
  { id: 'sp_6', name: 'Field Medic', desc: 'Heal effectiveness +15%' },
  { id: 'sp_7', name: 'Grenadier', desc: 'Grenade capacity +1, throw +20%' },
  { id: 'sp_8', name: 'Engineer', desc: 'Vehicle repair speed +50%' },
  { id: 'sp_9', name: 'Sharp Eye', desc: 'ADS zoom +10%' },
  { id: 'sp_10', name: 'Pack Rat', desc: 'Ammo capacity +20%' },
  { id: 'sp_11', name: 'Night Owl', desc: 'Night vision: better low-light visibility' },
  { id: 'sp_12', name: 'Heavy Hitter', desc: 'Melee damage +25%' },
  { id: 'sp_13', name: 'Commando', desc: 'Tactical sprint duration +20%' },
  { id: 'sp_14', name: 'Survivalist', desc: 'Zone damage -20%' },
  { id: 'sp_15', name: 'Leader', desc: 'AI squad effectiveness +10%' },
];

export function validateTalentPurchase(state, talentId, config) {
  const talent = getTalentById(talentId);
  if (!talent) return { ok: false, reason: 'invalid_talent' };

  const treeName = talent.tree;
  const treeSpent = state.spentByTree[treeName] ?? 0;
  const totalSpent = state.totalSpent ?? 0;

  if (state.owned[talentId]) return { ok: false, reason: 'already_owned' };
  if (totalSpent >= config.max_spent) return { ok: false, reason: 'budget_exhausted' };
  if (treeSpent >= 15) return { ok: false, reason: 'tree_complete' };

  const tier = talent.tier;
  const minLevel = config.tier_min_levels[tier - 1] ?? 999;
  if ((state.level ?? 1) < minLevel) return { ok: false, reason: 'level_requirement', required: minLevel };

  const tierTalents = TALENT_TREES[treeName].talents.filter(t => t.tier === tier);
  const tierOwned = tierTalents.filter(t => state.owned[t.id]).length;
  if (tier > 1) {
    const prevTierTalents = TALENT_TREES[treeName].talents.filter(t => t.tier === tier - 1);
    const prevTierOwned = prevTierTalents.filter(t => state.owned[t.id]).length;
    if (prevTierOwned < 3 && tierOwned === 0) return { ok: false, reason: 'tier_locked' };
  }

  return { ok: true };
}

export function calculatePrimaryTree(state) {
  const spent = state.spentByTree ?? {};
  for (const tree of TALENT_TREE_ORDER) {
    if ((spent[tree] ?? 0) >= 15) return tree;
  }
  return 'Hybrid';
}

export function computeDerivedStats(state, baseStats) {
  const stats = { ...baseStats };
  for (const [talentId, owned] of Object.entries(state.owned ?? {})) {
    if (!owned) continue;
    const talent = getTalentById(talentId);
    if (!talent) continue;
    applyTalentEffect(stats, talent);
  }
  return stats;
}

function applyTalentEffect(stats, talent) {
  switch (talent.id) {
    case 'assault_1_1': stats.hipSpreadMult = (stats.hipSpreadMult ?? 1) * 0.85; break;
    case 'assault_1_2': stats.adsSpeedMult = (stats.adsSpeedMult ?? 1) * 1.1; break;
    case 'assault_1_3': stats.sprintToFireMult = (stats.sprintToFireMult ?? 1) * 0.8; break;
    case 'assault_2_1': stats.tacticalReloadMult = (stats.tacticalReloadMult ?? 1) * 1.25; break;
    case 'assault_2_2': stats.adsMoveSpeedAdd = (stats.adsMoveSpeedAdd ?? 0) + 0.05; break;
    case 'assault_2_3': stats.burstCountAdd = (stats.burstCountAdd ?? 0) + 1; break;
    case 'assault_3_1': stats.sprintDamageMult = (stats.sprintDamageMult ?? 1) * 1.1; break;
    case 'assault_3_2': stats.pistolSwapSpeedMult = (stats.pistolSwapSpeedMult ?? 1) * 1.5; stats.pistolDamageMult = (stats.pistolDamageMult ?? 1) * 1.15; break;
    case 'assault_3_3': stats.killMoveSpeedBuff = { duration: 3, mult: 1.15 }; break;
    case 'assault_4_1': stats.armorPenAdd = (stats.armorPenAdd ?? 0) + 0.2; break;
    case 'assault_4_2': stats.lowHealthFireRateMult = 1.2; stats.lowHealthReloadMult = 1.3; break;
    case 'assault_4_3': stats.canExecute = true; break;
    case 'assault_5_1': stats.allWeaponHandlingMult = 1.15; stats.adsMovePenalty = 0; break;
    case 'assault_5_2': stats.tacSprintRechargeMult = 2; stats.tacSprintKillReset = true; break;
    case 'assault_5_3': stats.multikillTacSprintExtend = 2; break;
    case 'guardian_1_1': stats.maxHealthAdd = (stats.maxHealthAdd ?? 0) + 15; break;
    case 'guardian_1_2': stats.armorEffectivenessMult = (stats.armorEffectivenessMult ?? 1) * 1.1; break;
    case 'guardian_1_3': stats.crouchDamageReduction = 0.1; break;
    case 'guardian_2_1': stats.reviveSpeedMult = 1.25; stats.healAmountMult = 1.15; break;
    case 'guardian_2_2': stats.adsCrouchFrontalReduction = 0.2; break;
    case 'guardian_2_3': stats.ammoShareOnPickup = true; break;
    case 'guardian_3_1': stats.deployableCoverHealthMult = 1.5; break;
    case 'guardian_3_2': stats.reviveImmunityDuration = 5; break;
    case 'guardian_3_3': stats.suppressionResistance = 0.5; break;
    case 'guardian_4_1': stats.allyArmorRegen = 2; break;
    case 'guardian_4_2': stats.lastStand = true; break;
    case 'guardian_4_3': stats.martyrExplosion = true; break;
    case 'guardian_5_1': stats.knockbackImmune = true; stats.stunImmune = true; break;
    case 'guardian_5_2': stats.allyDamageReductionAura = { range: 10, reduction: 0.15 }; break;
    case 'guardian_5_3': stats.reviveFullRestore = true; break;
    case 'recon_1_1': stats.footstepNoiseMult = 0.7; break;
    case 'recon_1_2': stats.markDurationMult = 1.5; break;
    case 'recon_1_3': stats.fallDamageMult = 0.5; stats.landingNoise = false; break;
    case 'recon_2_1': stats.trackerFootprints = true; break;
    case 'recon_2_2': stats.suppressedNoMinimap = true; break;
    case 'recon_2_3': stats.assistCreditRangeMult = 1.5; break;
    case 'recon_3_1': stats.crouchInvisibleToUAV = true; break;
    case 'recon_3_2': stats.headshotDamageMult = 1.25; stats.headshotRangeMult = 1.2; break;
    case 'recon_3_3': stats.killRevealKiller = true; break;
    case 'recon_4_1': stats.predatorHighlight = true; break;
    case 'recon_4_2': stats.deadEyeSlow = true; break;
    case 'recon_4_3': stats.proneStealthRange = 30; break;
    case 'recon_5_1': stats.oracleMark = { range: 100, interval: 30 }; break;
    case 'recon_5_2': stats.firstShotStealthCrit = true; break;
    case 'recon_5_3': stats.killStealth = { duration: 3 }; break;
  }
}

export const TALENT_CONFIG_DEFAULTS = {
  max_spent: 22,
  tier_min_levels: [1, 5, 12, 22, 35],
  point_award_levels: [1, 3, 4, 5, 8, 10, 12, 16, 19, 22, 27, 31, 35, 37, 39, 41, 43, 45, 47, 48, 49, 50],
};