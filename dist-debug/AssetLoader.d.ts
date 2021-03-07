import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
export default class AssetLoader {
    load(callback: (gltf: GLTF) => void): void;
}
