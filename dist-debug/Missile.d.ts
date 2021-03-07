import * as THREE from "three";
import Collision from "./Collision";
export default class Missile {
    group: THREE.Group;
    private meth;
    isAlive: boolean;
    private speed;
    private liveTime;
    private deadDuration;
    onDeSpawn: () => void;
    collision: Collision;
    canMove: boolean;
    constructor();
    spawn(spawnPosition: THREE.Vector3, spawnRotationY: number): void;
    despawn(): void;
    update(delta: number): void;
}
