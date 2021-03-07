import * as THREE from "three";
import Collision from "./Collision";
import Enemy from "./Enemy";
export default class EnemyController {
    private static _instance;
    static readonly Instance: EnemyController;
    private isStart;
    private timer;
    private enemys;
    onEnemyTouch: (enemy: Enemy, touchCollision: Collision) => void;
    private root;
    constructor();
    start(root: THREE.Group): void;
    end(): void;
    addEnemy(enemy: Enemy): void;
    checkCollision(checkCollision: Collision, enterCallback: () => void): void;
    clear(): void;
    update(delta: number): void;
    createEnemy(): void;
}
