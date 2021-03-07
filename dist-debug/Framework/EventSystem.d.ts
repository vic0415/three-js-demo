import IEventBase from "./EventBase";
export declare class EventSystem {
    private static _instance;
    static readonly Instance: EventSystem;
    private events;
    constructor();
    subscribe(event: IEventBase): void;
    involk(eventType: symbol, ...parameters: any): void;
    clear(): void;
}
