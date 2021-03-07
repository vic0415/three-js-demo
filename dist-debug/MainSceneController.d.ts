import * as THREE from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
export default class MainSceneController {
    private state;
    private root;
    private player;
    private playerSpeedX;
    private playerSpeedZ;
    private scoreElement;
    private gameOverElement;
    private score;
    constructor(rootScene: THREE.Scene);
    onResourceLoad(playerGltf: GLTF): void;
    private setKeyboard;
    private ready;
    private play;
    private endGame;
    private gameEndState;
    update(delta: number): void;
}
