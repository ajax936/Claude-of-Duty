export const PROFILE_SCHEMA_VERSION = 1;

export const DEFAULT_PROFILE = {
  schemaVersion: PROFILE_SCHEMA_VERSION,
  accountId: null,
  characters: [],
  activeCharacterId: null,
  settings: {
    graphics: { quality: 'ultra', renderScale: 1.0, fov: 80, vsync: false, frameLimit: 144 },
    audio: { master: 1.0, sfx: 1.0, music: 0.8, voice: 1.0, hrtf: true },
    input: { sensitivity: 0.0022, adsSensScale: 0.65, invertY: false, keyBindings: {}, gamepad: { deadzone: 0.16, responseCurve: 2.4 } },
    gameplay: { crosshairColor: '#ffffff', hitmarkerSound: true, showDamageNumbers: true, colorblindMode: 'none' },
    privacy: { voiceChat: false, dataCollection: false, marketingConsent: false },
  },
  statistics: { matchesPlayed: 0, wins: 0, kills: 0, deaths: 0, assists: 0, revives: 0, playtime: 0 },
  unlocks: { cosmetics: [], weapons: [], attachments: [], ultimates: [], passives: [] },
  lastLogin: Date.now(),
};

export function createProfile(accountId = 'local_dev_' + Date.now()) {
  return {
    ...DEFAULT_PROFILE,
    accountId,
    characters: [createCharacter('Operator', 'Assault')],
    activeCharacterId: 'char_1',
  };
}

export function createCharacter(name, role) {
  const id = 'char_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
  return {
    id,
    name,
    role,
    level: 1,
    xp: 0,
    talentPoints: 0,
    spentTalents: {},
    spentByTree: { Assault: 0, Guardian: 0, Recon: 0 },
    totalSpent: 0,
    primaryTree: 'Hybrid',
    startingPassives: [],
    appearance: {
      head: 'default', hair: 'short', face: 'neutral', bodyType: 'average',
      height: 1.78, mass: 75, skinTone: 'medium',
      headwear: 'none', upperBody: 'tactical_shirt', lowerBody: 'cargo_pants',
      gloves: 'tactical', boots: 'combat', armorOverlay: 'none',
      colors: { primary: '#2d3a4a', secondary: '#5a6b7c', accent: '#c8a951' },
    },
    loadouts: { primary: 'rifle_basic', sidearm: 'pistol_basic', grenade: 'frag', armor: 'light', healing: 'bandages' },
    weaponMastery: { rifle: 0, smg: 0, pistol: 0, shotgun: 0, lmg: 0, marksman: 0, sniper: 0, launcher: 0 },
    ultimatePresets: [],
    equippedUltimate: null,
    createdAt: Date.now(),
    lastPlayed: Date.now(),
  };
}

export class ProfileSystem {
  static id = 'profiles';
  static deps = ['config'];

  constructor() {
    this.config = null;
    this.profile = null;
    this.storageKey = 'factionshooter_profile';
    this.dirty = false;
    this._saveDebounce = 0;
  }

  async init(ctx) {
    this.ctx = ctx;
    this.config = ctx.get('config');
    this.load();
    console.info('[profiles] loaded', this.profile?.accountId, this.profile?.characters?.length ?? 0, 'characters');
  }

  load() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        this.profile = JSON.parse(stored);
        if (this.profile.schemaVersion !== PROFILE_SCHEMA_VERSION) {
          this.profile = this.migrate(this.profile);
        }
      } else {
        this.profile = createProfile();
        this.save();
      }
    } catch (err) {
      console.warn('[profiles] load failed, creating new', err);
      this.profile = createProfile();
      this.save();
    }
    return this.profile;
  }

  save() {
    if (!this.profile) return;
    this.profile.lastLogin = Date.now();
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.profile));
      this.dirty = false;
    } catch (err) {
      console.error('[profiles] save failed', err);
    }
  }

  queueSave() {
    this.dirty = true;
    this._saveDebounce = 2.0;
  }

  migrate(oldProfile) {
    const migrated = createProfile(oldProfile.accountId);
    migrated.characters = (oldProfile.characters ?? []).map(c => ({
      ...createCharacter(c.name ?? 'Operator', c.role ?? 'Assault'),
      ...c,
      spentByTree: c.spentByTree ?? { Assault: 0, Guardian: 0, Recon: 0 },
      totalSpent: c.totalSpent ?? 0,
      primaryTree: c.primaryTree ?? 'Hybrid',
    }));
    migrated.activeCharacterId = oldProfile.activeCharacterId ?? migrated.characters[0]?.id;
    migrated.settings = { ...DEFAULT_PROFILE.settings, ...oldProfile.settings };
    migrated.statistics = { ...DEFAULT_PROFILE.statistics, ...oldProfile.statistics };
    migrated.unlocks = { ...DEFAULT_PROFILE.unlocks, ...oldProfile.unlocks };
    migrated.schemaVersion = PROFILE_SCHEMA_VERSION;
    return migrated;
  }

  getActiveCharacter() {
    return this.profile?.characters?.find(c => c.id === this.profile.activeCharacterId) ?? this.profile?.characters?.[0] ?? null;
  }

  setActiveCharacter(characterId) {
    const char = this.profile?.characters?.find(c => c.id === characterId);
    if (char) {
      this.profile.activeCharacterId = characterId;
      this.queueSave();
      return true;
    }
    return false;
  }

  createCharacter(name, role) {
    const char = createCharacter(name, role);
    this.profile.characters.push(char);
    this.profile.activeCharacterId = char.id;
    this.queueSave();
    return char;
  }

  deleteCharacter(characterId) {
    const idx = this.profile.characters.findIndex(c => c.id === characterId);
    if (idx >= 0) {
      this.profile.characters.splice(idx, 1);
      if (this.profile.activeCharacterId === characterId) {
        this.profile.activeCharacterId = this.profile.characters[0]?.id ?? null;
      }
      this.queueSave();
      return true;
    }
    return false;
  }

  updateCharacter(characterId, updates) {
    const char = this.profile?.characters?.find(c => c.id === characterId);
    if (char) {
      Object.assign(char, updates);
      char.lastPlayed = Date.now();
      this.queueSave();
      return true;
    }
    return false;
  }

  spendTalentPoint(characterId, talentId, talentTree) {
    const char = this.profile?.characters?.find(c => c.id === characterId);
    if (!char) return { ok: false, reason: 'character_not_found' };

    if (char.spentTalents[talentId]) return { ok: false, reason: 'already_owned' };
    if (char.totalSpent >= 22) return { ok: false, reason: 'budget_exhausted' };
    if ((char.spentByTree[talentTree] ?? 0) >= 15) return { ok: false, reason: 'tree_complete' };

    char.spentTalents[talentId] = true;
    char.spentByTree[talentTree] = (char.spentByTree[talentTree] ?? 0) + 1;
    char.totalSpent++;

    for (const tree of ['Assault', 'Guardian', 'Recon']) {
      if ((char.spentByTree[tree] ?? 0) >= 15) {
        char.primaryTree = tree;
        break;
      }
    }
    if (char.totalSpent < 22) char.primaryTree = 'Hybrid';

    this.queueSave();
    return { ok: true, char };
  }

  respecCharacter(characterId) {
    const char = this.profile?.characters?.find(c => c.id === characterId);
    if (!char) return { ok: false, reason: 'character_not_found' };

    char.spentTalents = {};
    char.spentByTree = { Assault: 0, Guardian: 0, Recon: 0 };
    char.totalSpent = 0;
    char.primaryTree = 'Hybrid';
    char.talentPoints = 0;

    this.queueSave();
    return { ok: true, char };
  }

  addXP(characterId, amount, source = 'match') {
    const char = this.profile?.characters?.find(c => c.id === characterId);
    if (!char) return;

    char.xp += amount;
    this._checkLevelUp(char);
    this.queueSave();
  }

  _checkLevelUp(char) {
    const awardLevels = this.config?.getTalentConfig?.()?.point_award_levels ?? [1, 3, 4, 5, 8, 10, 12, 16, 19, 22, 27, 31, 35, 37, 39, 41, 43, 45, 47, 48, 49, 50];
    const newLevel = awardLevels.findIndex(l => char.xp < l * 1000) + 1;
    if (newLevel > char.level) {
      char.level = newLevel;
      char.talentPoints = (char.talentPoints ?? 0) + 1;
      this.ctx?.events?.emit('character:level_up', { characterId: char.id, level: newLevel });
    }
  }

  addWeaponXP(characterId, weaponCategory, amount) {
    const char = this.profile?.characters?.find(c => c.id === characterId);
    if (!char) return;
    char.weaponMastery[weaponCategory] = (char.weaponMastery[weaponCategory] ?? 0) + amount;
    this.queueSave();
  }

  unlockCosmetic(characterId, cosmeticId) {
    const char = this.profile?.characters?.find(c => c.id === characterId);
    if (char && !char.unlocks?.cosmetics?.includes(cosmeticId)) {
      char.unlocks = char.unlocks ?? { cosmetics: [], weapons: [], attachments: [], ultimates: [], passives: [] };
      char.unlocks.cosmetics.push(cosmeticId);
      this.queueSave();
    }
  }

  unlockWeapon(characterId, weaponId) {
    const char = this.profile?.characters?.find(c => c.id === characterId);
    if (char && !char.unlocks?.weapons?.includes(weaponId)) {
      char.unlocks = char.unlocks ?? { cosmetics: [], weapons: [], attachments: [], ultimates: [], passives: [] };
      char.unlocks.weapons.push(weaponId);
      this.queueSave();
    }
  }

  addUltimatePreset(characterId, preset) {
    const char = this.profile?.characters?.find(c => c.id === characterId);
    if (char) {
      char.ultimatePresets = char.ultimatePresets ?? [];
      char.ultimatePresets.push({ ...preset, id: 'ult_' + Date.now(), createdAt: Date.now() });
      this.queueSave();
    }
  }

  equipUltimate(characterId, presetId) {
    const char = this.profile?.characters?.find(c => c.id === characterId);
    if (char) {
      const preset = char.ultimatePresets?.find(p => p.id === presetId);
      if (preset) {
        char.equippedUltimate = preset;
        this.queueSave();
        return true;
      }
    }
    return false;
  }

  updateSettings(category, settings) {
    if (this.profile?.settings?.[category]) {
      this.profile.settings[category] = { ...this.profile.settings[category], ...settings };
      this.queueSave();
      return true;
    }
    return false;
  }

  recordMatchResult(result) {
    if (!this.profile) return;
    this.profile.statistics.matchesPlayed++;
    if (result.won) this.profile.statistics.wins++;
    this.profile.statistics.kills += result.kills ?? 0;
    this.profile.statistics.deaths += result.deaths ?? 0;
    this.profile.statistics.assists += result.assists ?? 0;
    this.profile.statistics.revives += result.revives ?? 0;
    this.queueSave();
  }

  recordPlaytime(seconds) {
    if (this.profile) {
      this.profile.statistics.playtime += seconds;
      this.queueSave();
    }
  }

  update(dt) {
    if (this.dirty && this._saveDebounce > 0) {
      this._saveDebounce -= dt;
      if (this._saveDebounce <= 0) this.save();
    }
  }

  exportProfile() {
    return JSON.stringify(this.profile, null, 2);
  }

  importProfile(json) {
    try {
      const imported = JSON.parse(json);
      if (imported.schemaVersion !== PROFILE_SCHEMA_VERSION) {
        this.profile = this.migrate(imported);
      } else {
        this.profile = imported;
      }
      this.save();
      return { ok: true };
    } catch (err) {
      return { ok: false, reason: err.message };
    }
  }

  isLocalDev() {
    return this.profile?.accountId?.startsWith('local_dev_') ?? false;
  }

  dispose() {
    if (this.dirty) this.save();
  }
}