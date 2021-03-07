import * as THREE from "three"
import Collision from "./Collision";
import EnemyController from "./EnemyController";
import gameOverEvent from "./Event/gameOverEvent";
import { EventSystem } from "./Framework/EventSystem";
import GameLooper from "./Framework/GameLooper";
import MissilePool from "./MissilePool";

export default class Missile{
    public group: THREE.Group = new THREE.Group();
    private meth: THREE.Mesh;
    public isAlive: boolean = false;
    private speed: number = 5;
    private liveTime: number = 0;
    private deadDuration: number = 3;
    public onDeSpawn: () => void = () => {};
    public collision: Collision = new Collision("missile", this.group, 0.2);
    public canMove: boolean = true;

    constructor(){
        GameLooper.Instance.subscribe((delta: number) => { this.update(delta);});
        EventSystem.Instance.subscribe(new gameOverEvent(() => {
            this.canMove = false;
        }));

        const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
        const material = new THREE.MeshPhongMaterial( { color: 0x888800 } );
        this.meth = new THREE.Mesh( geometry, material );
        this.group.add(this.meth);

    }

    public spawn(spawnPosition: THREE.Vector3, spawnRotationY: number){
        console.log(spawnRotationY);
        this.isAlive = true;
        this.liveTime = 0;
        this.group.position.set(spawnPosition.x, spawnPosition.y, spawnPosition.z);
        this.group.rotation.y = spawnRotationY;

        this.canMove = true;
    }

    public despawn ():void {
        this.isAlive = false;
        if(this.onDeSpawn){
            this.onDeSpawn();
        }

        //
        MissilePool.Instance.deSpawn(this);

    }

    public update(delta: number){
        if(this.isAlive){
            this.liveTime += delta; 

            if(this.canMove){
                if(this.liveTime >= this.deadDuration){
                    this.despawn();
                    return;
                }

                this.group.translateZ( this.speed * delta);
                this.meth.rotation.x += Math.PI * delta;
                this.meth.rotation.y += Math.PI * delta;
            }

            EnemyController.Instance.checkCollision(this.collision, () => {
                console.log("123456");
            });
            
        }
    }




}