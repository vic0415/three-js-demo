import Enemy from "./Enemy";

export default class EnemyPool{
    private static _instance: EnemyPool;

    public static get Instance()
    {
        return this._instance || (this._instance = new this());
    }

    private initLength: number = 5;
    private objectArray: Enemy[] = [];
  
    constructor(){
        for(let i = 0; i < this.initLength; i++){
            this.objectArray.push(new Enemy());
        }
    }

    public spawn(): Enemy{
        console.log(this.objectArray.length);
            return this.objectArray.pop() || new Enemy();
    }

    public deSpawn(beam: Enemy): void{
        this.objectArray.push(beam);
        console.log(this.objectArray.length);

    }
  
}