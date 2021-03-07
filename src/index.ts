import ThreeScee from "./util/Threescene"
import * as THREE from "three"
import AssetLoader from "./AssetLoader";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import MainSceneController from "./MainSceneController";
import { OrbitControls } from "three-orbitcontrols-ts";
import GameLooper from "./Framework/GameLooper";
//import "./assets/css/index.css"



export default class GameManager{
    private renderer: THREE.WebGLRenderer;
    private scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;
    private mainSceneController: MainSceneController | null = null;
    private clock: THREE.Clock = new THREE.Clock();

    private static _instance: GameManager;

    public static get Instance()
    {
        return this._instance || (this._instance = new this());
    }

    constructor(){
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight) // 場景大小
        this.renderer.setClearColor(0xeeeeee, 1.0) // 預設背景顏色
        document.body.appendChild( this.renderer.domElement );
        
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

        
        this.camera.position.set(0, 15, 0);
        this.camera.lookAt(0, 0, 0);
        const controls = new OrbitControls( this.camera, this.renderer.domElement );

        // 監聽螢幕寬高變化來做簡單 RWD 設定
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight
            this.camera.updateProjectionMatrix()
            this.renderer.setSize(window.innerWidth, window.innerHeight)
        })

        window.addEventListener('blur', () => {
            this.clock.stop();
        });
        window.addEventListener('focus', () => {
            this.clock.start();

        });

        this.animate();


        let loader = new AssetLoader();
        loader.load((playerGltf: GLTF) => {
            this.mainSceneController = new MainSceneController(this.scene);
            this.mainSceneController.onResourceLoad(playerGltf);
        })
        


    }

    private animate = () => {
        requestAnimationFrame( this.animate );
        
        this.update(this.clock.getDelta());
    
    
        this.renderer.render( this.scene,  this.camera );
    };

    private update(delta: number){
        GameLooper.Instance.broadcast(delta);
        //console.log(delta);
    }
    
    
    

}

new GameManager();






