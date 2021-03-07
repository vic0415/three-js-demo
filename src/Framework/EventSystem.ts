import IEventBase from "./EventBase";

export class EventSystem {
    private static _instance: EventSystem;

    public static get Instance()
    {
        return this._instance || (this._instance = new this());
    }

    private events: IEventBase[] = [];
  
    constructor() {
      this.events.length = 0;
    }
  
    public subscribe(event: IEventBase) {
      this.events.push(event);
    }
  //TODO
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
    public involk(eventType: symbol, ...parameters: any) {
      this.events.forEach((event) => {        
        if(event.getEventType() === eventType){
          event.invoke(parameters);
        }

      });
    }
  
    public clear() {
      this.events.length = 0;
    }
  }
  
