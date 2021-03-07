export default class Keyboard {
    private code;
    isDown: boolean;
    isUp: boolean;
    constructor(keyCode: number, pressCallback?: () => void, releaseCallback?: () => void);
    press: () => void;
    release: () => void;
    private downHandler;
    private upHandler;
}
