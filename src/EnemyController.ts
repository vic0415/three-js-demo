import * as THREE from "three";
import { threadId } from "worker_threads";
import Collision from "./Collision";
import Enemy from "./Enemy";
import EnemyPool from "./EnemyPool";
import GameLooper from "./Framework/GameLooper";

export default class EnemyController {
  private static _instance: EnemyController;

  public static get Instance()
  {
    return this._instance || (this._instance = new this());
  }

  private isStart : boolean = false;
  private timer : number = 0;
  private enemys: Enemy[] =[]
  public onEnemyTouch : (enemy: Enemy, touchCollision: Collision) => void = () => {};
  private root: THREE.Group = new THREE.Group();

  constructor() {
    GameLooper.Instance.subscribe((delta: number) => { this.update(delta);});

    this.enemys.length = 0;

  }

  public start(root: THREE.Group){
    this.isStart = true;
    this.timer = 0;
    root.add(this.root);
  }

  public end(){
    this.isStart = false;
  }


  public addEnemy(enemy: Enemy) {
    this.enemys.push(enemy);
  }
  /*
    public unsubscribe(unsubscribe: (delta: number) => void) {
      this.observers = this.observers.filter((observer) => {
        if (observer === unsubscribe) {
          return false;
        } else {
          return true;
        }
      });
    }
  */

  public checkCollision(checkCollision: Collision, enterCallback: () => void) {
    this.enemys = this.enemys.filter((enemy) => {
      let distanceX = checkCollision.transform.position.x - enemy.collision.transform.position.x;
      let distanceY = checkCollision.transform.position.y - enemy.collision.transform.position.y;
      let distanceZ = checkCollision.transform.position.z - enemy.collision.transform.position.z;
      let enterDistance = checkCollision.collisionRadius + enemy.collision.collisionRadius;

      if(distanceX * distanceX + distanceY * distanceY + distanceZ * distanceZ 
        < enterDistance * enterDistance){

        console.log("touch");
        if(enterCallback){
          enterCallback();
        }

        if(this.onEnemyTouch){
          this.onEnemyTouch(enemy, checkCollision);
        }
        enemy.despawn();
        this.root.remove(enemy.group);

        return false;
      }else{
        return true;
      }
    });
  }

  public clear() {
    this.enemys.length = 0;
  }

  //TODO 沒考慮到delay沒考慮到delay
  public update(delta: number){
    if(this.isStart){
      this.timer += delta

      if(this.timer >= 2){
        this.timer -= 2;
        this.createEnemy();
      }
    }

  }

  public createEnemy(){
    let enemy = EnemyPool.Instance.spawn();
    let derection = Math.round( (Math.random()/0.25));
    switch(derection){
      case 0:
        enemy.spawn(new THREE.Vector3(-10, 0, Math.random() * 10 - 5), 0);
        this.root.add(enemy.group);
        break;
      case 1:
        enemy.spawn(new THREE.Vector3(10, 0, Math.random() * 10 - 5), 0);
        this.root.add(enemy.group);
        break;
      case 2:
        enemy.spawn(new THREE.Vector3(Math.random() * 10 - 5, 0, -10), 0);
        this.root.add(enemy.group);
        break;
      case 3:
        enemy.spawn(new THREE.Vector3(Math.random() * 10 - 5, 0, 10), 0);
        this.root.add(enemy.group);
        break;
      default:
        enemy.spawn(new THREE.Vector3(-10, 0, Math.random() * 10 - 5), 0);
        this.root.add(enemy.group);
        break;
    }

    this.addEnemy(enemy);
  }

}
