import * as THREE from "three"

export default class Collision {
    collisionName: string;
    collisionRadius: number;
    transform: THREE.Object3D;

    constructor(collisionName: string, transform: THREE.Object3D, collisionRadius: number, ){
        this.collisionName = collisionName;
        this.transform = transform;
        this.collisionRadius = collisionRadius;
    }
}