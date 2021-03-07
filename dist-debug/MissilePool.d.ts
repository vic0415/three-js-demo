import Missile from "./Missile";
export default class MissilePool {
    private static _instance;
    static readonly Instance: MissilePool;
    private initLength;
    private objectArray;
    constructor();
    spawn(): Missile;
    deSpawn(beam: Missile): void;
}
