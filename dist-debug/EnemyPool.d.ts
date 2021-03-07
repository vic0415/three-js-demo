import Enemy from "./Enemy";
export default class EnemyPool {
    private static _instance;
    static readonly Instance: EnemyPool;
    private initLength;
    private objectArray;
    constructor();
    spawn(): Enemy;
    deSpawn(beam: Enemy): void;
}
