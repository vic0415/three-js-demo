import IEventBase from "../Framework/EventBase";

export default class gameOverEvent implements IEventBase{
    //TODO: encapsulation
    public static type = Symbol();
    //protected eventName: string = "DetermineEvent";

    private callback: () => void;

    constructor(callback: () => void) {
        this.callback = callback;
    }

    public getEventType(): Symbol {
        return gameOverEvent.type;
    }

    public invoke(parameters: any[]) {
        this.callback();
    }

}