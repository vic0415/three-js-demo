export default interface IEventBase {
    //TODO: Try how to encapsulation
    getEventType(): Symbol;

    invoke(xxx: any[]): void;
}

