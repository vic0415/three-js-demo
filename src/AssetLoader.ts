import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

export default class AssetLoader{


    public load(callback: (gltf: GLTF) => void){
        const loader = new GLTFLoader();
        loader.load(
            'assets/scene.gltf',
            ( gltf ) => {
                // called when the resource is loaded
                callback( gltf );
            },
            ( xhr ) => {
                // called while loading is progressing
                console.log( `${( xhr.loaded / xhr.total * 100 )}% loaded` );
            },
            ( error ) => {
                // called when loading has errors
                console.error( 'An error happened', error );
            },
        );
    }



}

