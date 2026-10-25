import { Rng } from '../core/rng.js';

export const MATCH_PHASES = {
  LOBBY: 'lobby',
  MAP_VOTE: 'map_vote',
  PREPARATION: 'preparation',
  DEPLOYMENT: 'deployment',
  COMBAT: 'combat',
  FINAL: 'final',
  RESULTS: 'results',
};

export class MatchSystem {
  static id = 'match';
  static deps = ['config', 'factions', 'player', 'ai', 'weapons', 'inventory', 'commands', 'ultimates', 'vehicles', 'scoring', 'profiles'];

  constructor() {
    this.config = null;
    this.factions = null;
    this.player = null;
    this.ai = null;
    this.weapons = null;
    this.inventory = null;
    this.commands = null;
    this.ultimates = null;
    this.vehicles = null;
    this.scoring = null;
    this.profiles = null;
    this.phase = MATCH_PHASES.LOBBY;
    this.phaseTimer = 0;
    this.matchConfig = null;
    this._rng = new Rng(0xDADA);
    this.mapVote = { options: [], votes: new Map(), winningMap: null };
    this.deploymentOptions = [];
  }

  async init(ctx) {
    this.ctx = ctx;
    this.config = ctx.get('config');
    this.factions = ctx.get('factions');
    this.player = ctx.peek('player');
    this.ai = ctx.peek('ai');
    this.weapons = ctx.peek('weapons');
    this.inventory = ctx.peek('inventory');
    this.commands = ctx.peek('commands');
    this.ultimates = ctx.peek('ultimates');
    this.vehicles = ctx.peek('vehicles');
    this.scoring = ctx.peek('scoring');
    this.profiles = ctx.peek('profiles');
    this._rng = ctx.rng.fork();
    this.matchConfig = this.config.getMatchConfig();

    this._wireEvents();
    console.info('[match] initialized');
  }

  _wireEvents() {
    this.ctx.events.on('player:death', () => this._onPlayerDeath());
    this.ctx.events.on('actor:death', (e) => this._onActorDeath(e));
    this.ctx.events.on('damage:dealt', (e) => this._onDamageDealt(e));
  }

  startLobby() {
    this.phase = MATCH_PHASES.LOBBY;
    this.phaseTimer = 30;
    this._setupMapVote();
  }

  _setupMapVote() {
    this.mapVote.options = [
      { id: 'market_street', name: 'Market Street', description: 'Urban close-quarters' },
      { id: 'military_base', name: 'Military Base', description: 'Vehicle-friendly open areas' },
      { id: 'industrial_zone', name: 'Industrial Zone', description: 'Vertical multi-level combat' },
    ];
    this.mapVote.votes.clear();
  }

  voteMap(playerId, mapId) {
    if (this.phase !== MATCH_PHASES.MAP_VOTE) return false;
    this.mapVote.votes.set(playerId, mapId);
    this._checkVoteComplete();
    return true;
  }

  _checkVoteComplete() {
    const totalVotes = this.mapVote.votes.size;
    const humanCount = 1;
    if (totalVotes >= humanCount) {
      this._resolveMapVote();
    }
  }

  _resolveMapVote() {
    const counts = new Map();
    for (const vote of this.mapVote.votes.values()) {
      counts.set(vote, (counts.get(vote) ?? 0) + 1);
    }
    let maxVotes = 0;
    let winners = [];
    for (const [mapId, count] of counts) {
      if (count > maxVotes) {
        maxVotes = count;
        winners = [mapId];
      } else if (count === maxVotes) {
        winners.push(mapId);
      }
    }
    this.mapVote.winningMap = winners.length === 1 ? winners[0] : this._rng.pick(winners);
    this.startPreparation();
  }

  startPreparation() {
    this.phase = MATCH_PHASES.PREPARATION;
    this.phaseTimer = 60;

    this.factions.startDeployment();
    this._generateDeploymentOptions();

    this.scoring.startMatch();

    const char = this.profiles?.getActiveCharacter();
    if (char) {
      this.inventory.applyStarterLoadout(char.role);
      this.factions.setAIRoles(this.factions.playerFaction, this._getAIRolesForRole(char.role), 'Balanced');
    }

    this._spawnVehicles();
  }

  _generateDeploymentOptions() {
    const world = this.ctx.peek('world');
    if (world?.spawnPoints) {
      this.deploymentOptions = world.spawnPoints.map((sp, i) => ({
        id: `deploy_${i}`,
        name: sp.tag ?? `Zone ${i + 1}`,
        position: sp.position,
        yaw: sp.yaw,
      }));
    } else {
      this.deploymentOptions = [
        { id: 'deploy_0', name: 'North Plaza', position: new THREE.Vector3(-10, 0, 40), yaw: Math.PI },
        { id: 'deploy_1', name: 'Market Center', position: new THREE.Vector3(0, 0, 10), yaw: Math.PI },
        { id: 'deploy_2', name: 'South Street', position: new THREE.Vector3(10, 0, -30), yaw: 0 },
        { id: 'deploy_3', name: 'East Alley', position: new THREE.Vector3(25, 0, 5), yaw: -Math.PI / 2 },
      ];
    }
  }

  _getAIRolesForRole(playerRole) {
    const roleMap = {
      Assault: { Assault: 2, Healer: 1, Guardian: 1, Recon: 0, Support: 0 },
      Healer: { Assault: 1, Healer: 1, Guardian: 1, Recon: 1, Support: 0 },
      Guardian: { Assault: 1, Healer: 1, Guardian: 2, Recon: 0, Support: 0 },
      Recon: { Assault: 1, Healer: 0, Guardian: 1, Recon: 2, Support: 0 },
      Support: { Assault: 1, Healer: 1, Guardian: 1, Recon: 0, Support: 1 },
    };
    return roleMap[playerRole] ?? roleMap.Assault;
  }

  _spawnVehicles() {
    const vehicleSpawns = [
      { type: 'jeep', position: new THREE.Vector3(-5, 0, 20), rotation: 0 },
      { type: 'pickup', position: new THREE.Vector3(15, 0, -10), rotation: Math.PI },
      { type: 'armored_hummer', position: new THREE.Vector3(0, 0, -20), rotation: 0 },
    ];

    for (const spawn of vehicleSpawns) {
      this.vehicles.spawnVehicle(spawn.type, spawn.position, spawn.rotation);
    }
  }

  selectDeployment(actorId, destinationId) {
    if (this.phase !== MATCH_PHASES.DEPLOYMENT) return false;
    this.factions.setDeploymentChoice(actorId, destinationId);
    return true;
  }

  startDeployment() {
    this.phase = MATCH_PHASES.DEPLOYMENT;
    this.phaseTimer = 30;
  }

  startCombat() {
    this.phase = MATCH_PHASES.COMBAT;
    this.phaseTimer = 0;
    this.factions.endDeployment();
    this.factions.initSafeZone(this.ctx.peek('world')?.bounds ?? new THREE.Box3(new THREE.Vector3(-60, -10, -60), new THREE.Vector3(60, 30, 60)));

    const char = this.profiles?.getActiveCharacter();
    if (char) {
      this.ultimates.equipUltimate(char.equippedUltimate);
    }
  }

  update(dt) {
    if (this.phaseTimer > 0) {
      this.phaseTimer -= dt;
      if (this.phaseTimer <= 0) {
        this._onPhaseTimerExpired();
      }
    }

    switch (this.phase) {
      case MATCH_PHASES.COMBAT:
      case MATCH_PHASES.FINAL:
        this.factions.update(dt);
        this.scoring?.update?.(dt);
        break;
    }

    this.ultimates?.update(dt);
  }

  _onPhaseTimerExpired() {
    switch (this.phase) {
      case MATCH_PHASES.LOBBY:
        this.phase = MATCH_PHASES.MAP_VOTE;
        this.phaseTimer = 20;
        break;
      case MATCH_PHASES.MAP_VOTE:
        this._resolveMapVote();
        break;
      case MATCH_PHASES.PREPARATION:
        this.startDeployment();
        break;
      case MATCH_PHASES.DEPLOYMENT:
        this.startCombat();
        break;
    }
  }

  _onPlayerDeath() {
    this.ultimates?.onPlayerDeath();
  }

  _onActorDeath(event) {
    if (!event.actor) return;
    const victimFaction = event.actor.faction ?? 0;
    const killerFaction = event.by?.faction ?? (event.source?.faction ?? 0);

    if (killerFaction !== victimFaction) {
      this.factions.recordElimination(killerFaction, victimFaction);
      this.ultimates?.onTeamKill(killerFaction);
      this.scoring?.onElimination(killerFaction, victimFaction, event.headshot, false, []);
    }
  }

  _onDamageDealt(event) {
    if (event.source?.isUltimate) {
      this.ultimates.onUltimateHit(event.target, event.part, event.target?.maxHealth ?? 100, event.target?.health ?? 100);
    }
  }

  getMatchState() {
    return {
      phase: this.phase,
      phaseTimer: Math.max(0, this.phaseTimer),
      mapVote: this.mapVote,
      deploymentOptions: this.deploymentOptions,
      factions: this.factions?.getMatchState(),
      winningMap: this.mapVote.winningMap,
    };
  }

  forcePhase(phase) {
    this.phase = phase;
    this.phaseTimer = 0;
  }

  dispose() {}
}