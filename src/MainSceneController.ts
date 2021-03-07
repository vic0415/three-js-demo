import * as THREE from "three"
import { Vector3 } from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import GameManager from ".";
import Collision from "./Collision";
import Enemy from "./Enemy";
import EnemyController from "./EnemyController";
import EnemyPool from "./EnemyPool";
import gameOverEvent from "./Event/gameOverEvent";
import { EventSystem } from "./Framework/EventSystem";
import GameLooper from "./Framework/GameLooper";
import Keyboard from "./Keyboard";
import Missile from "./Missile";
import MissilePool from "./MissilePool";
import Threescene from "./util/Threescene";

export default class MainSceneController{
    private state: (delta: number) => void = this.ready;

    private root: THREE.Group;
    private player: THREE.Group = new THREE.Group();
    private playerSpeedX : number = 0; 
    private playerSpeedZ : number = 0;
    private scoreElement: Element | null = null;
    private gameOverElement: Element | null = null;

    private score: number = 0;

    constructor(rootScene: THREE.Scene){
        GameLooper.Instance.subscribe((delta: number) => {this.update(delta);});

        this.root = new THREE.Group();
        rootScene.add(this.root);

        let backgroundGeometry = new THREE.BoxGeometry(10, 0.1, 10);
        let backgroundMaterial = new THREE.MeshPhongMaterial( { color: 0x008800 } );
        let background = new THREE.Mesh( backgroundGeometry, backgroundMaterial );
        this.root.add( background );

        let pointLight = new THREE.AmbientLight(0xffffff)
        pointLight.position.set(0, 0, 5)
        this.root.add(pointLight)

        this.root.add(this.player);
        this.player.position.y = 0.2;

        this.scoreElement = document.getElementById("score");
        this.gameOverElement = document.getElementById("end");

        EventSystem.Instance.subscribe(new gameOverEvent(() => {
            this.endGame();
        }));

    }

    public onResourceLoad(playerGltf: GLTF){
        this.setKeyboard();

        this.score = 0;
        let model = playerGltf.scene;
        this.player.add(model);
        model.scale.set(0.02, 0.02, 0.02);
        model.rotation.x = Math.PI
        model.rotation.y = Math.PI

        EnemyController.Instance.start(this.root);

        EnemyController.Instance.onEnemyTouch = (enemy: Enemy, collision: Collision) => {
            if(collision.collisionName === "missile"){
                console.log("score ++");
                this.score += 1;
                if(this.scoreElement){
                    this.scoreElement.innerHTML = "score: "+this.score;
                }
            }
        }

        this.state = this.play;
    }

    private setKeyboard() {
        //Capture the keyboard arrow keys
        let left = new Keyboard(37);
        let top = new Keyboard(38);

        let right = new Keyboard(39);
        let bottom = new Keyboard(40);

        let space = new Keyboard(32);

        left.press = () => {
            if (this.state === this.play) {
                this.playerSpeedX = -3;
                if(this.player){
                    this.player.rotation.y = -Math.PI/2;
                }
            }
        };

        left.release = () => {
            if (this.state === this.play) {
                if (right.isDown) {
                    this.playerSpeedX = 3;
                    if(this.player){
                        this.player.rotation.y = Math.PI/2;
                    }
                } else {
                    this.playerSpeedX = 0;
                }
            }
        };

        right.press = () => {
            if (this.state === this.play) {
                this.playerSpeedX = 3;
                if(this.player){
                    this.player.rotation.y = Math.PI/2;
                }
            }
        };

        right.release = () => {
            if (this.state === this.play) {
                if (left.isDown) {
                    this.playerSpeedX = -3;
                    if(this.player){
                        this.player.rotation.y = -Math.PI/2;
                    }
                } else {
                    this.playerSpeedX = -0;
                }
            }
        };

        top.press = () => {
            if (this.state === this.play) {
                this.playerSpeedZ = -3;
                if(this.player){
                    this.player.rotation.y = Math.PI;
                }
            }
        };

        top.release = () => {
            if (this.state === this.play) {
                if (bottom.isDown) {
                    this.playerSpeedZ = 3;
                    if(this.player){
                        this.player.rotation.y = 0;
                    }
                } else {
                    this.playerSpeedZ = 0;
                }
            }
        };

        bottom.press = () => {
            if (this.state === this.play) {
                this.playerSpeedZ = 3;
                if(this.player){
                    this.player.rotation.y = 0;
                }
            }
        };

        bottom.release = () => {
            if (this.state === this.play) {
                if (top.isDown) {
                    this.playerSpeedZ = -3;
                    if(this.player){
                        this.player.rotation.y = Math.PI;
                    }
                } else {
                    this.playerSpeedZ = 0;
                }
            }
        };

        space.press = () => {
            if (this.state === this.play) {
                let missile: Missile = MissilePool.Instance.spawn();
                this.root.add(missile.group)
                if(this.player){
                    missile.spawn(this.player.position, this.player.rotation.y);
                }
                missile.onDeSpawn = () =>{
                    this.root.remove(missile.group)
                }
            }

        };
    }

    private ready(delta: number) {

    }

    private play(delta: number) {
        
        if(this.player !== null){
            this.player.position.x += this.playerSpeedX * delta;
            if(this.player.position.x > 5){
                this.player.position.x = 5;
            }else if(this.player.position.x < -5){
                this.player.position.x = -5;
            }
            this.player.position.z += this.playerSpeedZ * delta;

            if(this.player.position.z > 5){
                this.player.position.z = 5;
            }else if(this.player.position.z < -5){
                this.player.position.z = -5;
            }
           //player.rotation.x += 0.01;
        //player.rotation.y += 0.01;
    
        }
    }

    private endGame() {
        this.state = this.gameEndState;
        EnemyController.Instance.end();
        if(this.gameOverElement){
            this.gameOverElement.setAttribute("style", "visibility:visible");
            this.gameOverElement.innerHTML = "your score is "+this.score;
        }
        
    }

    private gameEndState(delta: number) {
        

    }

    update(delta: number){
        this.state(delta);
        

    }


}