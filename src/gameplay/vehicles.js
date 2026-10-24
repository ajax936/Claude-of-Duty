import * as THREE from 'three';
import { Rng } from '../core/rng.js';

export const VEHICLE_TYPES = {
  motorcycle: {
    id: 'motorcycle', name: 'Motorcycle', seats: [{ id: 'driver', type: 'driver', position: new THREE.Vector3(0, 0.9, 0.3) }],
    maxSpeed: 35, acceleration: 8, handling: 1.2, health: 200, armor: 0,
    mass: 250, wheelRadius: 0.35, wheelBase: 1.5, trackWidth: 0.4,
    hasMountedGun: false, gunPosition: null,
  },
  atv: {
    id: 'atv', name: 'ATV', seats: [{ id: 'driver', type: 'driver', position: new THREE.Vector3(0, 1.0, 0.2) }, { id: 'passenger', type: 'passenger', position: new THREE.Vector3(0, 1.0, -0.4) }],
    maxSpeed: 30, acceleration: 6, handling: 1.1, health: 300, armor: 10,
    mass: 350, wheelRadius: 0.4, wheelBase: 1.8, trackWidth: 0.9,
    hasMountedGun: false, gunPosition: null,
  },
  sedan: {
    id: 'sedan', name: 'Sedan', seats: [
      { id: 'driver', type: 'driver', position: new THREE.Vector3(-0.7, 1.1, 1.2) },
      { id: 'passenger_fr', type: 'passenger', position: new THREE.Vector3(0.7, 1.1, 1.2) },
      { id: 'passenger_rl', type: 'passenger', position: new THREE.Vector3(-0.7, 1.1, -1.0) },
      { id: 'passenger_rr', type: 'passenger', position: new THREE.Vector3(0.7, 1.1, -1.0) },
    ],
    maxSpeed: 28, acceleration: 4, handling: 0.8, health: 500, armor: 20,
    mass: 1400, wheelRadius: 0.35, wheelBase: 2.7, trackWidth: 1.5,
    hasMountedGun: false, gunPosition: null,
  },
  pickup: {
    id: 'pickup', name: 'Pickup Truck', seats: [
      { id: 'driver', type: 'driver', position: new THREE.Vector3(-0.8, 1.3, 1.5) },
      { id: 'passenger_fr', type: 'passenger', position: new THREE.Vector3(0.8, 1.3, 1.5) },
      { id: 'cargo_1', type: 'cargo', position: new THREE.Vector3(-0.9, 1.6, -0.5) },
      { id: 'cargo_2', type: 'cargo', position: new THREE.Vector3(0, 1.6, -0.5) },
      { id: 'cargo_3', type: 'cargo', position: new THREE.Vector3(0.9, 1.6, -0.5) },
    ],
    maxSpeed: 25, acceleration: 3.5, handling: 0.7, health: 700, armor: 30,
    mass: 2200, wheelRadius: 0.45, wheelBase: 3.2, trackWidth: 1.7,
    hasMountedGun: false, gunPosition: null,
  },
  jeep: {
    id: 'jeep', name: 'Military Jeep', seats: [
      { id: 'driver', type: 'driver', position: new THREE.Vector3(-0.6, 1.2, 1.0) },
      { id: 'passenger_fr', type: 'passenger', position: new THREE.Vector3(0.6, 1.2, 1.0) },
      { id: 'gunner', type: 'gunner', position: new THREE.Vector3(0, 1.8, -0.3), hasGun: true },
      { id: 'passenger_rl', type: 'passenger', position: new THREE.Vector3(-0.6, 1.2, -1.0) },
      { id: 'passenger_rr', type: 'passenger', position: new THREE.Vector3(0.6, 1.2, -1.0) },
    ],
    maxSpeed: 32, acceleration: 5, handling: 0.9, health: 600, armor: 50,
    mass: 1800, wheelRadius: 0.4, wheelBase: 2.4, trackWidth: 1.5,
    hasMountedGun: true, gunPosition: new THREE.Vector3(0, 1.8, -0.3), gunType: 'm2_browning',
  },
  armored_hummer: {
    id: 'armored_hummer', name: 'Armored Humvee', seats: [
      { id: 'driver', type: 'driver', position: new THREE.Vector3(-0.7, 1.4, 1.3) },
      { id: 'passenger_fr', type: 'passenger', position: new THREE.Vector3(0.7, 1.4, 1.3) },
      { id: 'gunner', type: 'gunner', position: new THREE.Vector3(0, 2.0, -0.2), hasGun: true },
      { id: 'passenger_rl', type: 'passenger', position: new THREE.Vector3(-0.7, 1.4, -0.8) },
      { id: 'passenger_rr', type: 'passenger', position: new THREE.Vector3(0.7, 1.4, -0.8) },
    ],
    maxSpeed: 26, acceleration: 4, handling: 0.7, health: 1200, armor: 200,
    mass: 3500, wheelRadius: 0.5, wheelBase: 3.0, trackWidth: 1.8,
    hasMountedGun: true, gunPosition: new THREE.Vector3(0, 2.0, -0.2), gunType: 'm2_browning',
  },
  armored_transport: {
    id: 'armored_transport', name: 'Armored Transport', seats: [
      { id: 'driver', type: 'driver', position: new THREE.Vector3(-0.9, 1.8, 2.0) },
      { id: 'passenger_fr', type: 'passenger', position: new THREE.Vector3(0.9, 1.8, 2.0) },
      { id: 'gunner', type: 'gunner', position: new THREE.Vector3(0, 2.5, 0), hasGun: true },
      { id: 'cargo_1', type: 'cargo', position: new THREE.Vector3(-1.0, 1.8, -0.5) },
      { id: 'cargo_2', type: 'cargo', position: new THREE.Vector3(0, 1.8, -0.5) },
      { id: 'cargo_3', type: 'cargo', position: new THREE.Vector3(1.0, 1.8, -0.5) },
      { id: 'cargo_4', type: 'cargo', position: new THREE.Vector3(-1.0, 1.8, -1.8) },
      { id: 'cargo_5', type: 'cargo', position: new THREE.Vector3(0, 1.8, -1.8) },
      { id: 'cargo_6', type: 'cargo', position: new THREE.Vector3(1.0, 1.8, -1.8) },
    ],
    maxSpeed: 22, acceleration: 3, handling: 0.5, health: 2000, armor: 400,
    mass: 8000, wheelRadius: 0.6, wheelBase: 4.0, trackWidth: 2.2,
    hasMountedGun: true, gunPosition: new THREE.Vector3(0, 2.5, 0), gunType: 'm2_browning',
  },
  tank: {
    id: 'tank', name: 'Main Battle Tank', seats: [
      { id: 'driver', type: 'driver', position: new THREE.Vector3(0, 1.5, 1.5) },
      { id: 'gunner', type: 'gunner', position: new THREE.Vector3(0, 2.2, 0), hasGun: true },
      { id: 'commander', type: 'passenger', position: new THREE.Vector3(0.5, 2.2, 0.5) },
      { id: 'loader', type: 'passenger', position: new THREE.Vector3(-0.5, 2.2, 0.5) },
    ],
    maxSpeed: 20, acceleration: 2.5, handling: 0.4, health: 3000, armor: 800,
    mass: 60000, wheelRadius: 0.6, wheelBase: 3.5, trackWidth: 3.0,
    hasMountedGun: true, gunPosition: new THREE.Vector3(0, 2.2, 0), gunType: 'cannon_120mm',
    isTracked: true,
  },
};

export const MOUNTED_GUNS = {
  m2_browning: {
    id: 'm2_browning', name: 'M2 Browning .50 Cal', damage: 45, rpm: 550, spread: 0.8,
    maxRange: 800, penetration: 1.5, overheats: true, heatPerShot: 0.015, cooldownRate: 0.08,
    muzzleVelocity: 900, tracerEvery: 4,
  },
  cannon_120mm: {
    id: 'cannon_120mm', name: '120mm Smoothbore Cannon', damage: 500, rpm: 12, spread: 0.1,
    maxRange: 2000, penetration: 5.0, overheats: false, heatPerShot: 0, cooldownRate: 0,
    muzzleVelocity: 1700, tracerEvery: 1, explosive: true, explosionRadius: 6, explosionDamage: 200,
  },
};

export class VehicleSystem {
  static id = 'vehicles';
  static deps = ['physics', 'player', 'ai', 'weapons', 'factions', 'config'];

  constructor() {
    this.vehicles = new Map();
    this.vehicleCounter = 0;
    this._rng = new Rng(0xCAFE);
  }

  async init(ctx) {
    this.ctx = ctx;
    this.physics = ctx.get('physics');
    this.player = ctx.peek('player');
    this.ai = ctx.peek('ai');
    this.weapons = ctx.peek('weapons');
    this.factions = ctx.peek('factions');
    this.config = ctx.get('config');
    this._rng = ctx.rng.fork();
    this.vehicleConfig = this.config.get('vehicle') ?? { critical_engine_explosion_seconds: 20, mounted_gun_ammo: 'unlimited', mounted_gun_overheats: true };

    this._setupInput();
    console.info('[vehicles] initialized');
  }

  _setupInput() {
    this.ctx.events.on('command:executed', (e) => {
      if (e.commandId?.startsWith('squad_vehicle') || e.commandId?.startsWith('squad_seat') || e.commandId === 'squad_convoy') {
        this._handleAICommand(e);
      }
    });
  }

  _handleAICommand(event) {
    const faction = this.factions?.getPlayerFaction();
    const aiAgents = this.ai?.agents?.filter(a => a.alive && a.faction === faction?.id) ?? [];

    for (const agent of aiAgents) {
      if (event.commandId === 'squad_vehicle_board') {
        const seat = event.result?.seat ?? 'passenger';
        this._orderAIBoard(agent, seat);
      } else if (event.commandId === 'squad_vehicle_exit') {
        this._orderAIExit(agent);
      } else if (event.commandId === 'squad_seat_driver') {
        this._orderAIBoard(agent, 'driver');
      } else if (event.commandId === 'squad_seat_gunner') {
        this._orderAIBoard(agent, 'gunner');
      } else if (event.commandId === 'squad_convoy') {
        agent.setOrder('convoy', { leadVehicle: event.result?.leadVehicle });
      }
    }
  }

  _orderAIBoard(agent, seatType) {
    const nearby = this._findNearbyVehicle(agent.position, 8);
    if (nearby && nearby.getSeat(seatType) === null) {
      agent.setOrder('vehicle_board', { vehicle: nearby, seat: seatType });
    }
  }

  _orderAIExit(agent) {
    if (agent.vehicle) {
      agent.setOrder('vehicle_exit', { vehicle: agent.vehicle });
    }
  }

  _findNearbyVehicle(position, radius) {
    let closest = null;
    let bestDist = radius;
    for (const v of this.vehicles.values()) {
      const dist = position.distanceTo(v.position);
      if (dist < bestDist) {
        bestDist = dist;
        closest = v;
      }
    }
    return closest;
  }

  spawnVehicle(typeId, position, rotation = 0, factionId = 0) {
    const def = VEHICLE_TYPES[typeId];
    if (!def) return null;

    const id = `veh_${++this.vehicleCounter}`;
    const vehicle = {
      id,
      type: typeId,
      def,
      factionId,
      position: new THREE.Vector3().copy(position),
      rotation: new THREE.Euler(0, rotation, 0),
      velocity: new THREE.Vector3(),
      angularVelocity: 0,
      health: def.health,
      maxHealth: def.health,
      armor: def.armor,
      engineHealth: 100,
      tires: def.seats.filter(s => s.type === 'driver' || s.type === 'passenger' || s.type === 'cargo').map(() => 100),
      fuel: 100,
      engineRunning: false,
      engineTemp: 0,
      criticalDamage: false,
      explosionTimer: 0,
      seats: def.seats.map(s => ({ ...s, occupant: null })),
      gunner: null,
      gunHeat: 0,
      gunOverheated: false,
      lastDriverInput: 0,
      mesh: null,
      body: null,
      gunMesh: null,
      _temp: new THREE.Vector3(),
      _temp2: new THREE.Vector3(),
    };

    this._createVehiclePhysics(vehicle);
    this._createVehicleVisuals(vehicle);

    this.vehicles.set(id, vehicle);
    this.ctx.events.emit('vehicle:spawned', { vehicle });
    return vehicle;
  }

  _createVehiclePhysics(vehicle) {
    const def = vehicle.def;
    const shape = def.isTracked ? 'box' : 'box';
    const halfExtents = def.isTracked
      ? { x: def.trackWidth * 0.5, y: 0.8, z: def.wheelBase * 0.6 }
      : { x: def.trackWidth * 0.5, y: 0.7, z: def.wheelBase * 0.5 };

    vehicle.body = this.physics.addRigidBody({
      shape,
      halfExtents,
      mass: def.mass,
      position: vehicle.position,
      rotation: new THREE.Quaternion().setFromEuler(vehicle.rotation),
      friction: 0.8,
      restitution: 0.1,
      surface: 'metal',
      object3D: vehicle.mesh,
    });

    vehicle.body.userData = { vehicleId: vehicle.id, isVehicle: true };
  }

  _createVehicleVisuals(vehicle) {
    const def = vehicle.def;
    const group = new THREE.Group();
    group.name = vehicle.id;

    const bodyGeo = new THREE.BoxGeometry(def.trackWidth, 1.2, def.wheelBase);
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x3a3a3a, roughness: 0.7, metalness: 0.8 });
    const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
    bodyMesh.position.y = 0.6;
    group.add(bodyMesh);

    if (def.hasMountedGun && def.gunPosition) {
      const gunGeo = new THREE.CylinderGeometry(0.08, 0.12, 1.2, 8);
      const gunMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.5, metalness: 0.9 });
      vehicle.gunMesh = new THREE.Mesh(gunGeo, gunMat);
      vehicle.gunMesh.position.copy(def.gunPosition);
      vehicle.gunMesh.rotation.x = -Math.PI / 2;
      group.add(vehicle.gunMesh);
    }

    vehicle.mesh = group;
    this.ctx.scene.add(group);

    if (vehicle.body) {
      vehicle.body.object3D = group;
    }
  }

  enterVehicle(actor, vehicleId, seatId = null) {
    const vehicle = this.vehicles.get(vehicleId);
    if (!vehicle) return false;

    const seat = seatId ? vehicle.seats.find(s => s.id === seatId) : vehicle.seats.find(s => s.occupant === null);
    if (!seat || seat.occupant) return false;

    if (actor.vehicle) this.exitVehicle(actor);

    seat.occupant = actor;
    actor.vehicle = vehicle;
    actor.vehicleSeat = seat.id;

    this._attachActorToSeat(actor, vehicle, seat);

    if (seat.type === 'driver') {
      vehicle.engineRunning = true;
    }
    if (seat.type === 'gunner' || seat.hasGun) {
      vehicle.gunner = actor;
    }

    this.ctx.events.emit('vehicle:entered', { vehicle, actor, seat });
    return true;
  }

  exitVehicle(actor) {
    if (!actor.vehicle) return false;

    const vehicle = actor.vehicle;
    const seat = vehicle.seats.find(s => s.occupant === actor);
    if (seat) {
      seat.occupant = null;
      if (seat.type === 'driver') {
        vehicle.engineRunning = false;
      }
      if (seat.type === 'gunner' || seat.hasGun) {
        vehicle.gunner = null;
      }
    }

    this._detachActorFromSeat(actor, vehicle);
    actor.vehicle = null;
    actor.vehicleSeat = null;

    this.ctx.events.emit('vehicle:exited', { vehicle, actor });
    return true;
  }

  _attachActorToSeat(actor, vehicle, seat) {
    if (actor.mesh) {
      actor.mesh.visible = false;
    }
    if (actor.capsule) {
      actor.capsule.enabled = false;
    }
  }

  _detachActorFromSeat(actor, vehicle) {
    if (actor.mesh) {
      actor.mesh.visible = true;
    }
    if (actor.capsule) {
      actor.capsule.enabled = true;
      const seatPos = vehicle.mesh?.localToWorld(actor.vehicleSeat ? vehicle.seats.find(s => s.id === actor.vehicleSeat).position.clone() : vehicle.position.clone()) ?? vehicle.position;
      actor.capsule.teleport(seatPos.x, seatPos.y + 1, seatPos.z);
    }
  }

  updateVehicleInput(vehicle, input, dt) {
    if (!vehicle.engineRunning) return;

    const def = vehicle.def;
    const forward = input.moveY > 0.1;
    const backward = input.moveY < -0.1;
    const steer = input.moveX;

    const accel = forward ? def.acceleration : backward ? -def.acceleration * 0.6 : 0;
    const currentSpeed = vehicle.velocity.length();

    if (accel !== 0) {
      const force = accel * def.mass * dt;
      vehicle._temp.set(0, 0, -1).applyEuler(vehicle.rotation);
      vehicle.velocity.addScaledVector(vehicle._temp, force / def.mass);
    }

    if (steer !== 0 && currentSpeed > 0.5) {
      const turnRate = (steer * def.handling * Math.min(1, currentSpeed / def.maxSpeed)) * dt;
      vehicle.rotation.y += turnRate;
      vehicle.angularVelocity = turnRate / dt;
    }

    const drag = 0.02 + (currentSpeed / def.maxSpeed) * 0.05;
    vehicle.velocity.multiplyScalar(1 - drag * dt);

    if (vehicle.velocity.length() > def.maxSpeed) {
      vehicle.velocity.setLength(def.maxSpeed);
    }
  }

  updateGunnerInput(vehicle, input, dt) {
    if (!vehicle.gunner || !vehicle.def.hasMountedGun || !vehicle.gunMesh) return;

    const gunDef = MOUNTED_GUNS[vehicle.def.gunType];
    if (!gunDef) return;

    if (vehicle.gunOverheated) {
      vehicle.gunHeat = Math.max(0, vehicle.gunHeat - gunDef.cooldownRate * dt);
      if (vehicle.gunHeat < 0.3) vehicle.gunOverheated = false;
      return;
    }

    const aimYaw = input.lookX * dt * 3;
    const aimPitch = input.lookY * dt * 3;

    vehicle.gunMesh.rotation.y += aimYaw;
    vehicle.gunMesh.rotation.x = THREE.MathUtils.clamp(vehicle.gunMesh.rotation.x + aimPitch, -0.8, 0.3);

    if (input.fire && vehicle.gunHeat < 1.0) {
      this._fireMountedGun(vehicle, gunDef);
      vehicle.gunHeat += gunDef.heatPerShot;
      if (vehicle.gunHeat >= 1.0) vehicle.gunOverheated = true;
    }

    vehicle.gunHeat = Math.max(0, vehicle.gunHeat - gunDef.cooldownRate * dt);
  }

  _fireMountedGun(vehicle, gunDef) {
    const muzzle = vehicle._temp2.set(0, 0, -1).applyQuaternion(vehicle.gunMesh.quaternion);
    const origin = vehicle._temp.copy(vehicle.gunMesh.position).addScaledVector(muzzle, 1.5);

    this.ctx.events.emit('weapon:fire', {
      weapon: gunDef.id,
      origin,
      dir: muzzle,
      seed: this._rng.u32(),
      intensity: 0.3,
      light: 0.02,
      flashScale: 1.5,
    });

    const impacts = this.physics.fireBullet({
      origin,
      dir: muzzle,
      damage: gunDef.damage,
      penetration: gunDef.penetration,
      maxDist: gunDef.maxRange,
      mask: this.physics.MASK.BULLET,
    });

    if (impacts.length && this.weapons) {
      this.weapons.viewmodel.muzzleWorld(this._temp);
      this.ctx.events.emit('bullet:tracer', { from: origin, to: impacts[0].point, speed: gunDef.muzzleVelocity });
    }

    if (gunDef.explosive && impacts.length) {
      this.ctx.events.emit('explosion', {
        position: impacts[0].point,
        radius: gunDef.explosionRadius,
        damage: gunDef.explosionDamage,
      });
    }
  }

  applyVehicleDamage(vehicle, amount, hitLocation, isExplosion = false) {
    if (vehicle.criticalDamage) return;

    let damage = amount;
    if (vehicle.armor > 0) {
      const absorbed = Math.min(vehicle.armor, damage * 0.7);
      vehicle.armor -= absorbed;
      damage -= absorbed;
    }

    vehicle.health -= damage;
    vehicle.engineHealth = Math.max(0, vehicle.engineHealth - damage * 0.5);

    if (hitLocation === 'tire') {
      const tireIdx = Math.floor(this._rng.float() * vehicle.tires.length);
      vehicle.tires[tireIdx] = Math.max(0, vehicle.tires[tireIdx] - 30);
    } else if (hitLocation === 'engine') {
      vehicle.engineHealth = Math.max(0, vehicle.engineHealth - damage);
    } else if (hitLocation === 'gun' && vehicle.gunMesh) {
      vehicle.gunHeat = Math.min(1.0, vehicle.gunHeat + 0.3);
    }

    if (vehicle.health <= 0) {
      this._destroyVehicle(vehicle);
    } else if (vehicle.engineHealth <= 20 && !vehicle.criticalDamage) {
      this._triggerCriticalDamage(vehicle);
    }
  }

  _triggerCriticalDamage(vehicle) {
    vehicle.criticalDamage = true;
    vehicle.explosionTimer = this.vehicleConfig.critical_engine_explosion_seconds ?? 20;

    this.ctx.events.emit('vehicle:critical', { vehicle, timeRemaining: vehicle.explosionTimer });

    if (vehicle.gunMesh) {
      vehicle.gunMesh.material.emissive = new THREE.Color(0xff2200);
      vehicle.gunMesh.material.emissiveIntensity = 1;
    }
  }

  _destroyVehicle(vehicle) {
    this.ctx.events.emit('explosion', {
      position: vehicle.position,
      radius: 8,
      damage: 150,
    });

    for (const seat of vehicle.seats) {
      if (seat.occupant) {
        this.exitVehicle(seat.occupant);
        seat.occupant.applyDamage?.(200, vehicle.position, { type: 'explosion' });
      }
    }

    this.removeVehicle(vehicle.id);
  }

  removeVehicle(vehicleId) {
    const vehicle = this.vehicles.get(vehicleId);
    if (!vehicle) return;

    if (vehicle.mesh) {
      vehicle.mesh.removeFromParent();
      vehicle.mesh = null;
    }
    if (vehicle.body) {
      this.physics.removeRigidBody(vehicle.body);
      vehicle.body = null;
    }

    this.vehicles.delete(vehicleId);
  }

  update(dt) {
    for (const vehicle of this.vehicles.values()) {
      this._updateVehiclePhysics(vehicle, dt);
      this._updateCriticalTimer(vehicle, dt);
    }
  }

  _updateVehiclePhysics(vehicle, dt) {
    if (!vehicle.body) return;

    vehicle.position.copy(vehicle.body.position);
    vehicle.rotation.setFromQuaternion(vehicle.body.quaternion);

    if (vehicle.criticalDamage) {
      vehicle.explosionTimer -= dt;
      if (vehicle.explosionTimer <= 0) {
        this._destroyVehicle(vehicle);
      }
    }
  }

  _updateCriticalTimer(vehicle, dt) {
    if (!vehicle.criticalDamage) return;
    vehicle.explosionTimer -= dt;
    if (vehicle.explosionTimer <= 0) {
      this._destroyVehicle(vehicle);
    }
  }

  getVehicleState(vehicleId) {
    const v = this.vehicles.get(vehicleId);
    if (!v) return null;
    return {
      id: v.id,
      type: v.type,
      health: v.health,
      maxHealth: v.maxHealth,
      armor: v.armor,
      engineHealth: v.engineHealth,
      fuel: v.fuel,
      speed: v.velocity.length(),
      maxSpeed: v.def.maxSpeed,
      seats: v.seats.map(s => ({ id: s.id, type: s.type, occupant: s.occupant?.id ?? null })),
      gunner: v.gunner?.id ?? null,
      gunHeat: v.gunHeat,
      gunOverheated: v.gunOverheated,
      criticalDamage: v.criticalDamage,
      explosionTimer: v.explosionTimer,
    };
  }

  getAllVehicles() {
    return Array.from(this.vehicles.values()).map(v => this.getVehicleState(v.id));
  }

  dispose() {
    for (const v of this.vehicles.values()) this.removeVehicle(v.id);
    this.vehicles.clear();
  }
}