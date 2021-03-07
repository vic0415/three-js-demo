export default class Keyboard {
    private code: number = 0;
    public isDown: boolean = false;
    public isUp: boolean = true;
  
    constructor(keyCode: number, pressCallback?: () => void, releaseCallback?: () => void) {
      this.code = keyCode;
      if (pressCallback !== undefined) {
        this.press = pressCallback;
      }
      if (releaseCallback !== undefined) {
        this.release = releaseCallback;
      }
  
      //Attach event listeners
      window.addEventListener(
        "keydown", this.downHandler.bind(this), false,
      );
      window.addEventListener(
        "keyup", this.upHandler.bind(this), false,
      );
    }
  
    public press: () => void = () => { };
    public release: () => void = () => { };
  
    //The `downHandler`
    private downHandler = (event: any) => {
      if (event.keyCode === this.code) {
        if (this.isUp && this.press) {
          this.press();
        }
        this.isDown = true;
        this.isUp = false;
      }
      event.preventDefault();
    };
  
    //The `upHandler`
    private upHandler = (event: any) => {
      if (event.keyCode === this.code) {
        if (this.isDown && this.release) {
          this.release();
        }
        this.isDown = false;
        this.isUp = true;
      }
      event.preventDefault();
    }
  
  }