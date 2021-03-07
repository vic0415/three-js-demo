import IEventBase from "../Framework/EventBase";
export default class gameOverEvent implements IEventBase {
    static type: symbol;
    private callback;
    constructor(callback: () => void);
    getEventType(): Symbol;
    invoke(parameters: any[]): void;
}
