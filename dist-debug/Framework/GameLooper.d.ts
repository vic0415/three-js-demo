export default class GameLooper {
    private static _instance;
    static readonly Instance: GameLooper;
    private observers;
    constructor();
    subscribe(observer: (delta: number) => void): void;
    unsubscribe(unsubscribe: (delta: number) => void): void;
    broadcast(delta: number): void;
    clear(): void;
}
