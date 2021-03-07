export default interface IEventBase {
    getEventType(): Symbol;
    invoke(xxx: any[]): void;
}
