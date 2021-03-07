import Missile from "./Missile";

export default class MissilePool{
    private static _instance: MissilePool;

    public static get Instance()
    {
        return this._instance || (this._instance = new this());
    }

    private initLength: number = 5;
    private objectArray: Missile[] = [];
  
    constructor(){
        for(let i = 0; i < this.initLength; i++){
            this.objectArray.push(new Missile());
        }
    }

    public spawn(): Missile{
        console.log(this.objectArray.length);
            return this.objectArray.pop() || new Missile();
    }

    public deSpawn(beam: Missile): void{
        this.objectArray.push(beam);
        console.log(this.objectArray.length);

    }
  
}