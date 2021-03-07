import * as THREE from "three";
import Collision from "./Collision";
export default class Enemy {
    group: THREE.Group;
    private meth;
    isAlive: boolean;
    private speed;
    onDeSpawn: () => void;
    collision: Collision;
    canMove: boolean;
    constructor();
    spawn(spawnPosition: THREE.Vector3, spawnRotationY: number): void;
    despawn(): void;
    update(delta: number): void;
}
