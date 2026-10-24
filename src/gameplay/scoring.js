export class ScoringSystem {
  static id = 'scoring';
  static deps = ['config', 'factions'];

  constructor() {
    this.config = null;
    this.factions = null;
    this.scoreConfig = null;
    this.eventLedger = [];
    this.currentMatchId = 0;
  }

  async init(ctx) {
    this.ctx = ctx;
    this.config = ctx.get('config');
    this.factions = ctx.peek('factions');
    this.scoreConfig = this.config.getScoreConfig();
    console.info('[scoring] initialized');
  }

  startMatch() {
    this.currentMatchId++;
    this.eventLedger = [];
    for (const f of this.factions?.factions ?? []) {
      f.score = 0;
      f.scoreBreakdown = {
        eliminations: 0,
        depotDefense: 0,
        assists: 0,
        revives: 0,
        defenseIntervals: 0,
        reachedFinal: false,
        lastFactionBonus: false,
      };
    }
  }

  recordEvent(event) {
    const entry = {
      id: this.eventLedger.length + 1,
      matchId: this.currentMatchId,
      timestamp: this.ctx.time.elapsed,
      ...event,
    };
    this.eventLedger.push(entry);
    return entry;
  }

  onElimination(killerFactionId, victimFactionId, isHeadshot = false, isDepotDefense = false, assistFactions = []) {
    const killer = this.factions?.getFaction(killerFactionId);
    const victim = this.factions?.getFaction(victimFactionId);
    if (!killer || !victim) return;

    killer.scoreBreakdown.eliminations++;
    if (isDepotDefense) killer.scoreBreakdown.depotDefense++;

    this.recordEvent({
      type: 'elimination',
      killer: killerFactionId,
      victim: victimFactionId,
      headshot: isHeadshot,
      depotDefense: isDepotDefense,
      assists: assistFactions,
    });

    for (const aid of assistFactions) {
      const af = this.factions?.getFaction(aid);
      if (af && aid !== killerFactionId) {
        af.scoreBreakdown.assists++;
        this.recordEvent({ type: 'assist', assister: aid, victim: victimFactionId, killer: killerFactionId });
      }
    }
  }

  onRevive(reviverFactionId, revivedFactionId) {
    const reviver = this.factions?.getFaction(reviverFactionId);
    if (reviver) {
      reviver.scoreBreakdown.revives++;
      this.recordEvent({ type: 'revive', reviver: reviverFactionId, revived: revivedFactionId });
    }
  }

  onDepotDefenseInterval(factionId) {
    const f = this.factions?.getFaction(factionId);
    const cap = this.scoreConfig.defense_interval_cap_per_faction ?? 24;
    if (f && f.scoreBreakdown.defenseIntervals < cap) {
      f.scoreBreakdown.defenseIntervals++;
      this.recordEvent({ type: 'defense_interval', faction: factionId });
    }
  }

  onReachedFinalCircle(factionId) {
    const f = this.factions?.getFaction(factionId);
    if (f && !f.scoreBreakdown.reachedFinal) {
      f.scoreBreakdown.reachedFinal = true;
      this.recordEvent({ type: 'reached_final', faction: factionId });
    }
  }

  onLastFactionBonus(factionId) {
    const f = this.factions?.getFaction(factionId);
    if (f) {
      f.scoreBreakdown.lastFactionBonus = true;
      this.recordEvent({ type: 'last_faction_bonus', faction: factionId });
    }
  }

  calculateFactionScore(faction) {
    const b = faction.scoreBreakdown;
    const cfg = this.scoreConfig;
    return (
      b.eliminations * cfg.kill +
      b.depotDefense * cfg.depot_defense_kill_bonus +
      Math.min(b.assists, cfg.assist_pool_per_defeat) +
      b.revives * cfg.revive +
      b.defenseIntervals * cfg.contested_defense_per_faction_interval +
      (b.reachedFinal ? cfg.reach_final_once_per_faction : 0) +
      (b.lastFactionBonus ? cfg.last_faction_bonus_once : 0)
    );
  }

  finalizeMatch() {
    const results = {
      matchId: this.currentMatchId,
      timestamp: this.ctx.time.elapsed,
      factions: [],
      winner: null,
      tied: false,
    };

    for (const f of this.factions?.factions ?? []) {
      const score = this.calculateFactionScore(f);
      f.score = score;
      results.factions.push({
        id: f.id,
        name: f.name,
        color: f.css,
        score,
        breakdown: { ...b },
        alive: this.factions.getAliveCount(f.id),
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

    return results;
  }

  getLedger() {
    return [...this.eventLedger];
  }

  getFactionScores() {
    return this.factions?.factions?.map(f => ({
      id: f.id,
      name: f.name,
      score: f.score,
      breakdown: { ...f.scoreBreakdown },
    })) ?? [];
  }

  dispose() {
    this.eventLedger.length = 0;
  }
}