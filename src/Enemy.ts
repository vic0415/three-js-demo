import * as THREE from "three"
import Collision from "./Collision";
import EnemyPool from "./EnemyPool";
import gameOverEvent from "./Event/gameOverEvent";
import { EventSystem } from "./Framework/EventSystem";
import GameLooper from "./Framework/GameLooper";

export default class Enemy {
    public group: THREE.Group = new THREE.Group();
    private meth: THREE.Mesh;
    public isAlive: boolean = false;
    private speed: number = 5;
    public onDeSpawn: () => void = () => {};
    public collision: Collision = new Collision("enemy", this.group, 0.5);;
    public canMove: boolean = true;


    constructor(){
        GameLooper.Instance.subscribe((delta: number) => { this.update(delta);});
        EventSystem.Instance.subscribe(new gameOverEvent(() => {
            this.canMove = false;
        }));

        const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
        const material = new THREE.MeshPhongMaterial( { color: 0xff0000 } );
        this.meth = new THREE.Mesh( geometry, material );
        this.group.add(this.meth);

    }

    public spawn(spawnPosition: THREE.Vector3, spawnRotationY: number){
        console.log(spawnRotationY);
        this.isAlive = true;
        this.group.position.set(spawnPosition.x, spawnPosition.y, spawnPosition.z);
        this.group.rotation.y = spawnRotationY;
    }

    public despawn ():void {
        this.isAlive = false;
        if(this.onDeSpawn){
            this.onDeSpawn();
        }
        
        //
        EnemyPool.Instance.deSpawn(this);
    }

    public update(delta: number){
        if(this.isAlive){

            if(this.canMove){
                this.meth.rotation.x += Math.PI * delta;
                this.meth.rotation.y += Math.PI * delta;
                this.group.lookAt(0, 0 ,0);
                this.group.translateZ(delta);

                if(this.group.position.x*this.group.position.x + this.group.position.z*this.group.position.z < 0.1){
                    EventSystem.Instance.involk(gameOverEvent.type);
                }
            }


        }
    }

}