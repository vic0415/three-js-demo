import * as THREE from "three";
export default class Threescene {
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    constructor();
    private init;
    private onWindowResize;
    private render;
    private animate;
}
