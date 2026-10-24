export const COMMAND_CATEGORIES = ['Squad', 'General', 'Assist'];

export const COMMANDS = {
  Squad: {
    follow: {
      id: 'squad_follow',
      label: 'Follow / Regroup',
      description: 'AI follows player closely',
      params: [],
      voiceAliases: ['follow me', 'regroup', 'come here'],
      defaultKey: null,
    },
    hold: {
      id: 'squad_hold',
      label: 'Hold / Defend Position',
      description: 'AI holds current position',
      params: [],
      voiceAliases: ['hold position', 'defend here', 'stay here'],
      defaultKey: null,
    },
    formation_spread: {
      id: 'squad_formation_spread',
      label: 'Spread Formation',
      description: 'AI spreads out for coverage',
      params: [],
      voiceAliases: ['spread out', 'formation spread'],
      defaultKey: null,
    },
    formation_close: {
      id: 'squad_formation_close',
      label: 'Close Formation',
      description: 'AI stays tight together',
      params: [],
      voiceAliases: ['close formation', 'tight formation', 'stick together'],
      defaultKey: null,
    },
    flank: {
      id: 'squad_flank',
      label: 'Flank / Attack',
      description: 'AI flanks and engages',
      params: [{ name: 'target', type: 'entity' }],
      voiceAliases: ['flank', 'attack', 'engage'],
      defaultKey: null,
    },
    retreat: {
      id: 'squad_retreat',
      label: 'Retreat / Fall Back',
      description: 'AI falls back to player',
      params: [],
      voiceAliases: ['retreat', 'fall back', 'pull back'],
      defaultKey: null,
    },
    formation_presets: {
      id: 'squad_formation_presets',
      label: 'Formation Presets',
      description: 'Select formation shape',
      submenu: [
        { id: 'squad_wedge', label: 'Wedge', voiceAliases: ['wedge formation'] },
        { id: 'squad_line', label: 'Line', voiceAliases: ['line formation'] },
        { id: 'squad_diamond', label: 'Diamond', voiceAliases: ['diamond formation'] },
        { id: 'squad_file', label: 'Single File', voiceAliases: ['single file', 'column'] },
      ],
      voiceAliases: ['formation'],
      defaultKey: null,
    },
    landing: {
      id: 'squad_landing',
      label: 'Select Landing Zone',
      description: 'Choose deployment destination',
      submenu: [],
      voiceAliases: ['land at', 'drop at', 'landing zone'],
      defaultKey: null,
    },
    waypoint: {
      id: 'squad_waypoint',
      label: 'Move to Waypoint',
      description: 'AI moves to marked location',
      params: [{ name: 'position', type: 'vector3' }],
      voiceAliases: ['move here', 'go to', 'waypoint'],
      defaultKey: null,
    },
    vehicle_board: {
      id: 'squad_vehicle_board',
      label: 'Board Vehicle',
      description: 'AI enters nearest vehicle',
      params: [{ name: 'seat', type: 'string', optional: true }],
      submenu: [
        { id: 'squad_seat_driver', label: 'Driver', voiceAliases: ['drive'] },
        { id: 'squad_seat_gunner', label: 'Gunner', voiceAliases: ['gunner', 'man the gun'] },
        { id: 'squad_seat_passenger', label: 'Passenger', voiceAliases: ['passenger', 'ride along'] },
      ],
      voiceAliases: ['get in', 'board', 'mount up'],
      defaultKey: null,
    },
    vehicle_exit: {
      id: 'squad_vehicle_exit',
      label: 'Exit Vehicle',
      description: 'AI disembarks',
      params: [],
      voiceAliases: ['get out', 'dismount', 'exit vehicle'],
      defaultKey: null,
    },
    convoy: {
      id: 'squad_convoy',
      label: 'Convoy Coordination',
      description: 'Follow lead vehicle',
      params: [{ name: 'leadVehicle', type: 'entity' }],
      voiceAliases: ['convoy', 'follow vehicle'],
      defaultKey: null,
    },
  },
  General: {
    enemy_spotted: {
      id: 'general_enemy_spotted',
      label: 'Enemy Spotted',
      description: 'Report enemy contact',
      params: [{ name: 'position', type: 'vector3' }, { name: 'count', type: 'number', optional: true }],
      voiceAliases: ['contact', 'enemy', 'hostile', 'spotted'],
      defaultKey: null,
    },
    mark_target: {
      id: 'general_mark_target',
      label: 'Mark Target / Location',
      description: 'Mark priority target or location',
      params: [{ name: 'position', type: 'vector3' }, { name: 'type', type: 'string', optional: true }],
      voiceAliases: ['mark', 'mark target', 'ping', 'target here'],
      defaultKey: null,
    },
    danger: {
      id: 'general_danger',
      label: 'Danger Warning',
      description: 'Warn of threat in area',
      params: [{ name: 'position', type: 'vector3' }, { name: 'threat', type: 'string', optional: true }],
      voiceAliases: ['danger', 'warning', 'careful', 'threat'],
      defaultKey: null,
    },
    search: {
      id: 'general_search',
      label: 'Search Area / Building',
      description: 'AI searches designated area',
      params: [{ name: 'position', type: 'vector3' }, { name: 'radius', type: 'number', optional: true }],
      voiceAliases: ['search', 'clear', 'check building', 'sweep'],
      defaultKey: null,
    },
    loot: {
      id: 'general_loot',
      label: 'Seek / Mark / Share Loot',
      description: 'AI finds and marks loot',
      params: [{ name: 'type', type: 'string', optional: true }],
      voiceAliases: ['loot', 'find loot', 'mark loot', 'need ammo', 'need armor'],
      defaultKey: null,
    },
    route: {
      id: 'general_route',
      label: 'Route / Navigation',
      description: 'Communicate movement plan',
      params: [{ name: 'waypoints', type: 'vector3[]' }],
      voiceAliases: ['route', 'path', 'navigation', 'go this way'],
      defaultKey: null,
    },
    announce: {
      id: 'general_announce',
      label: 'Map Location Announcement',
      description: 'Call out named location',
      params: [{ name: 'locationId', type: 'string' }],
      voiceAliases: ['location', 'at', 'we are at'],
      defaultKey: null,
    },
  },
  Assist: {
    heal_me: {
      id: 'assist_heal_me',
      label: 'Heal Me',
      description: 'Request healing from medic',
      params: [],
      voiceAliases: ['heal me', 'need healing', 'medic'],
      defaultKey: null,
    },
    heal_ally: {
      id: 'assist_heal_ally',
      label: 'Heal Ally',
      description: 'Order medic to heal target',
      params: [{ name: 'target', type: 'entity' }],
      voiceAliases: ['heal him', 'heal her', 'heal teammate'],
      defaultKey: null,
    },
    revive: {
      id: 'assist_revive',
      label: 'Revive Teammate',
      description: 'Revive downed ally',
      params: [{ name: 'target', type: 'entity' }],
      voiceAliases: ['revive', 'pick him up', 'get him up'],
      defaultKey: null,
    },
    share_ammo: {
      id: 'assist_share_ammo',
      label: 'Share Ammo',
      description: 'Request or give ammo',
      params: [{ name: 'type', type: 'string', optional: true }],
      voiceAliases: ['need ammo', 'share ammo', 'give ammo'],
      defaultKey: null,
    },
    share_armor: {
      id: 'assist_share_armor',
      label: 'Share Armor',
      description: 'Request or give armor plates',
      params: [],
      voiceAliases: ['need armor', 'share plates', 'give armor'],
      defaultKey: null,
    },
    share_medical: {
      id: 'assist_share_medical',
      label: 'Share Medical Supplies',
      description: 'Request or give meds',
      params: [],
      voiceAliases: ['need meds', 'share meds', 'give medkit'],
      defaultKey: null,
    },
    cover_fire: {
      id: 'assist_cover_fire',
      label: 'Provide Cover / Suppression',
      description: 'AI suppresses target area',
      params: [{ name: 'position', type: 'vector3' }, { name: 'duration', type: 'number', optional: true }],
      voiceAliases: ['cover me', 'suppress', 'cover fire', 'suppressing fire'],
      defaultKey: null,
    },
    protect: {
      id: 'assist_protect',
      label: 'Protect Teammate',
      description: 'AI stays with and defends target',
      params: [{ name: 'target', type: 'entity' }],
      voiceAliases: ['protect', 'guard', 'watch him', 'watch her'],
      defaultKey: null,
    },
    backup: {
      id: 'assist_backup',
      label: 'Request Backup',
      description: 'Call for reinforcements',
      params: [{ name: 'position', type: 'vector3', optional: true }],
      voiceAliases: ['backup', 'need help', 'reinforcements'],
      defaultKey: null,
    },
    boarding_help: {
      id: 'assist_boarding_help',
      label: 'Help Boarding / Extraction',
      description: 'Assist entering/exiting vehicle',
      params: [{ name: 'vehicle', type: 'entity' }],
      voiceAliases: ['help me in', 'help me out', 'extraction'],
      defaultKey: null,
    },
  },
};

export function getCommandById(id) {
  for (const cat of COMMAND_CATEGORIES) {
    const catCommands = COMMANDS[cat];
    for (const [key, cmd] of Object.entries(catCommands)) {
      if (cmd.id === id) return { ...cmd, category: cat };
      if (cmd.submenu) {
        for (const sub of cmd.submenu) {
          if (sub.id === id) return { ...sub, category: cat, parent: cmd.id };
        }
      }
    }
  }
  return null;
}

export function getCommandsByCategory(category) {
  return COMMANDS[category] ?? {};
}

export function getAllCommands() {
  const all = [];
  for (const cat of COMMAND_CATEGORIES) {
    const catCommands = COMMANDS[cat];
    for (const [key, cmd] of Object.entries(catCommands)) {
      all.push({ ...cmd, category: cat, key });
      if (cmd.submenu) {
        for (const sub of cmd.submenu) {
          all.push({ ...sub, category: cat, parent: cmd.id, isSub: true });
        }
      }
    }
  }
  return all;
}

export function findCommandByVoice(voiceInput) {
  const normalized = voiceInput.toLowerCase().trim();
  for (const cat of COMMAND_CATEGORIES) {
    const catCommands = COMMANDS[cat];
    for (const [key, cmd] of Object.entries(catCommands)) {
      for (const alias of cmd.voiceAliases) {
        if (normalized.includes(alias.toLowerCase())) {
          return { ...cmd, category: cat, key, matchedAlias: alias };
        }
      }
      if (cmd.submenu) {
        for (const sub of cmd.submenu) {
          for (const alias of sub.voiceAliases) {
            if (normalized.includes(alias.toLowerCase())) {
              return { ...sub, category: cat, parent: cmd.id, isSub: true, matchedAlias: alias };
            }
          }
        }
      }
    }
  }
  return null;
}

export class CommandSystem {
  static id = 'commands';
  static deps = ['factions', 'ai', 'player', 'config'];

  constructor() {
    this.activeWheel = false;
    this.selectedCategory = 0;
    this.selectedCommand = 0;
    this.favorites = new Set();
    this.keyBindings = new Map();
    this.voiceEnabled = false;
    this.voiceSupported = false;
    this._pendingVoiceCommand = null;
  }

  async init(ctx) {
    this.ctx = ctx;
    this.config = ctx.get('config');
    this.factions = ctx.peek('factions');
    this.ai = ctx.peek('ai');
    this.player = ctx.peek('player');
    this._setupDefaultBindings();
    this._checkVoiceSupport();
    console.info('[commands] initialized with', COMMAND_CATEGORIES.length, 'categories');
  }

  _setupDefaultBindings() {
    this.keyBindings.set('KeyF', 'squad_follow');
    this.keyBindings.set('KeyH', 'squad_hold');
    this.keyBindings.set('KeyG', 'assist_share_ammo');
    this.keyBindings.set('KeyV', 'general_enemy_spotted');
    this.keyBindings.set('KeyX', 'assist_revive');
    this.keyBindings.set('KeyZ', 'squad_formation_spread');
    this.keyBindings.set('KeyC', 'squad_formation_close');
  }

  _checkVoiceSupport() {
    if (typeof window !== 'undefined' && window.SpeechRecognition) {
      this.voiceSupported = true;
    } else if (typeof window !== 'undefined' && window.webkitSpeechRecognition) {
      this.voiceSupported = true;
    }
  }

  toggleWheel() {
    this.activeWheel = !this.activeWheel;
    if (this.activeWheel) {
      this.selectedCategory = 0;
      this.selectedCommand = 0;
    }
    return this.activeWheel;
  }

  navigateCategory(delta) {
    if (!this.activeWheel) return;
    this.selectedCategory = (this.selectedCategory + delta + COMMAND_CATEGORIES.length) % COMMAND_CATEGORIES.length;
    this.selectedCommand = 0;
  }

  navigateCommand(delta) {
    if (!this.activeWheel) return;
    const cat = COMMAND_CATEGORIES[this.selectedCategory];
    const cmds = Object.keys(COMMANDS[cat]);
    this.selectedCommand = (this.selectedCommand + delta + cmds.length) % cmds.length;
  }

  executeSelected(target = null) {
    if (!this.activeWheel) return null;
    const cat = COMMAND_CATEGORIES[this.selectedCategory];
    const cmds = Object.keys(COMMANDS[cat]);
    const cmdKey = cmds[this.selectedCommand];
    const cmd = COMMANDS[cat][cmdKey];
    return this.executeCommand(cmd.id, target);
  }

  executeCommand(commandId, target = null, params = {}) {
    const cmd = getCommandById(commandId);
    if (!cmd) return { ok: false, reason: 'unknown_command' };

    const faction = this.factions?.getPlayerFaction();
    const aiAgents = this.ai?.agents?.filter(a => a.alive && a.faction === (faction?.id ?? 0)) ?? [];

    let result = { ok: true, commandId, executed: [] };

    switch (commandId) {
      case 'squad_follow':
        for (const a of aiAgents) a.setOrder('follow', { target: this.player });
        result.executed.push({ agents: aiAgents.length, order: 'follow' });
        break;

      case 'squad_hold':
        for (const a of aiAgents) a.setOrder('hold', { position: target ?? this.player?.position });
        result.executed.push({ agents: aiAgents.length, order: 'hold' });
        break;

      case 'squad_formation_spread':
        for (const a of aiAgents) a.setFormation('spread');
        result.executed.push({ agents: aiAgents.length, formation: 'spread' });
        break;

      case 'squad_formation_close':
        for (const a of aiAgents) a.setFormation('close');
        result.executed.push({ agents: aiAgents.length, formation: 'close' });
        break;

      case 'squad_flank':
        for (const a of aiAgents) a.setOrder('flank', { target: target?.position ?? params.target });
        result.executed.push({ agents: aiAgents.length, order: 'flank' });
        break;

      case 'squad_retreat':
        for (const a of aiAgents) a.setOrder('retreat', { target: this.player });
        result.executed.push({ agents: aiAgents.length, order: 'retreat' });
        break;

      case 'squad_wedge':
      case 'squad_line':
      case 'squad_diamond':
      case 'squad_file':
        const shape = commandId.split('_')[2];
        for (const a of aiAgents) a.setFormation(shape);
        result.executed.push({ agents: aiAgents.length, formation: shape });
        break;

      case 'squad_landing':
        result.executed.push({ order: 'landing', destination: params.destinationId });
        break;

      case 'squad_waypoint':
        for (const a of aiAgents) a.setOrder('move', { position: params.position });
        result.executed.push({ agents: aiAgents.length, order: 'move', position: params.position });
        break;

      case 'squad_seat_driver':
      case 'squad_seat_gunner':
      case 'squad_seat_passenger':
        const seat = commandId.split('_')[2];
        for (const a of aiAgents) a.setOrder('vehicle_board', { seat });
        result.executed.push({ agents: aiAgents.length, order: 'vehicle_board', seat });
        break;

      case 'squad_vehicle_exit':
        for (const a of aiAgents) a.setOrder('vehicle_exit');
        result.executed.push({ agents: aiAgents.length, order: 'vehicle_exit' });
        break;

      case 'squad_convoy':
        for (const a of aiAgents) a.setOrder('convoy', { leadVehicle: params.leadVehicle });
        result.executed.push({ agents: aiAgents.length, order: 'convoy' });
        break;

      case 'general_enemy_spotted':
        for (const a of aiAgents) a.reportContact(params.position, params.count);
        result.executed.push({ agents: aiAgents.length, report: 'contact' });
        this.ctx.events.emit('command:enemy_spotted', { faction: faction?.id, position: params.position });
        break;

      case 'general_mark_target':
        this.ctx.events.emit('command:mark_target', { faction: faction?.id, position: params.position, type: params.type });
        result.executed.push({ mark: params.position });
        break;

      case 'general_danger':
        this.ctx.events.emit('command:danger', { faction: faction?.id, position: params.position, threat: params.threat });
        result.executed.push({ warning: params.position });
        break;

      case 'general_search':
        for (const a of aiAgents) a.setOrder('search', { position: params.position, radius: params.radius });
        result.executed.push({ agents: aiAgents.length, order: 'search' });
        break;

      case 'general_loot':
        for (const a of aiAgents) a.setOrder('loot', { type: params.type });
        result.executed.push({ agents: aiAgents.length, order: 'loot' });
        break;

      case 'general_route':
        for (const a of aiAgents) a.setOrder('patrol', { waypoints: params.waypoints });
        result.executed.push({ agents: aiAgents.length, order: 'patrol' });
        break;

      case 'general_announce':
        this.ctx.events.emit('command:announce', { faction: faction?.id, locationId: params.locationId });
        result.executed.push({ announce: params.locationId });
        break;

      case 'assist_heal_me':
        for (const a of aiAgents) if (a.role === 'Healer') a.setOrder('heal', { target: this.player });
        result.executed.push({ healTarget: 'player' });
        break;

      case 'assist_heal_ally':
        for (const a of aiAgents) if (a.role === 'Healer') a.setOrder('heal', { target: params.target });
        result.executed.push({ healTarget: params.target?.id });
        break;

      case 'assist_revive':
        for (const a of aiAgents) if (a.role === 'Healer' || a.role === 'Guardian') a.setOrder('revive', { target: params.target });
        result.executed.push({ reviveTarget: params.target?.id });
        break;

      case 'assist_share_ammo':
        for (const a of aiAgents) a.setOrder('share', { type: 'ammo', target: this.player });
        result.executed.push({ share: 'ammo' });
        break;

      case 'assist_share_armor':
        for (const a of aiAgents) a.setOrder('share', { type: 'armor', target: this.player });
        result.executed.push({ share: 'armor' });
        break;

      case 'assist_share_medical':
        for (const a of aiAgents) a.setOrder('share', { type: 'medical', target: this.player });
        result.executed.push({ share: 'medical' });
        break;

      case 'assist_cover_fire':
        for (const a of aiAgents) if (a.role === 'Assault' || a.role === 'Guardian' || a.role === 'Support') a.setOrder('suppress', { position: params.position, duration: params.duration });
        result.executed.push({ suppress: params.position });
        break;

      case 'assist_protect':
        for (const a of aiAgents) a.setOrder('protect', { target: params.target });
        result.executed.push({ protect: params.target?.id });
        break;

      case 'assist_backup':
        for (const a of aiAgents) a.setOrder('backup', { position: params.position ?? this.player?.position });
        result.executed.push({ backup: params.position });
        break;

      case 'assist_boarding_help':
        for (const a of aiAgents) a.setOrder('assist_board', { vehicle: params.vehicle });
        result.executed.push({ assistBoard: params.vehicle?.id });
        break;

      default:
        return { ok: false, reason: 'unimplemented', commandId };
    }

    this.ctx.events.emit('command:executed', { commandId, faction: faction?.id, result });
    return result;
  }

  handleKeyPress(code) {
    const cmdId = this.keyBindings.get(code);
    if (cmdId) return this.executeCommand(cmdId);
    return null;
  }

  setBinding(key, commandId) {
    if (getCommandById(commandId)) {
      this.keyBindings.set(key, commandId);
      return true;
    }
    return false;
  }

  removeBinding(key) {
    this.keyBindings.delete(key);
  }

  toggleFavorite(commandId) {
    if (this.favorites.has(commandId)) this.favorites.delete(commandId);
    else this.favorites.add(commandId);
  }

  isFavorite(commandId) {
    return this.favorites.has(commandId);
  }

  getFavorites() {
    return Array.from(this.favorites).map(id => getCommandById(id)).filter(Boolean);
  }

  startVoiceRecognition() {
    if (!this.voiceSupported) return { ok: false, reason: 'voice_not_supported' };
    this.voiceEnabled = true;
    return { ok: true };
  }

  stopVoiceRecognition() {
    this.voiceEnabled = false;
  }

  processVoiceInput(transcript) {
    if (!this.voiceEnabled) return { ok: false, reason: 'voice_disabled' };
    const match = findCommandByVoice(transcript);
    if (!match) return { ok: false, reason: 'no_match', transcript };
    return this.executeCommand(match.id);
  }

  getWheelState() {
    if (!this.activeWheel) return null;
    const cat = COMMAND_CATEGORIES[this.selectedCategory];
    const cmds = Object.keys(COMMANDS[cat]).map(key => {
      const cmd = COMMANDS[cat][key];
      return {
        id: cmd.id,
        label: cmd.label,
        description: cmd.description,
        isSub: false,
        parent: null,
        favorite: this.favorites.has(cmd.id),
        submenu: cmd.submenu?.map(sub => ({
          ...sub,
          isSub: true,
          parent: cmd.id,
          favorite: this.favorites.has(sub.id),
        })),
      };
    });
    return {
      active: true,
      categories: COMMAND_CATEGORIES.map((c, i) => ({ id: c, label: c, active: i === this.selectedCategory })),
      selectedCategory: this.selectedCategory,
      commands: cmds,
      favorites: this.getFavorites(),
    };
  }

  update(dt) {}

  dispose() {
    this.keyBindings.clear();
    this.favorites.clear();
  }
}