export default class GameLooper {
    private static _instance: GameLooper;

    public static get Instance()
    {
        return this._instance || (this._instance = new this());
    }

    private observers: ((delta: number) => void)[] = [];
  
    constructor() {
      this.observers.length = 0;
    }
  
    public subscribe(observer: (delta: number) => void) {
      this.observers.push(observer);
    }
  
    public unsubscribe(unsubscribe: (delta: number) => void) {
      this.observers = this.observers.filter((observer) => {
        if (observer === unsubscribe) {
          return false;
        } else {
          return true;
        }
      });
    }
  
    public broadcast(delta: number) {
      this.observers.forEach((observer) => observer(delta));
    }
  
    public clear() {
      this.observers.length = 0;
    }
  }
  
