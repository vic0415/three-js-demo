export default class Debug{
    public static isDev: boolean = true;

    static log(message: any){
        if(Debug.isDev){
            console.log(message);
        }
    }

    static warn(message: any){
        if(Debug.isDev){
            console.warn(message);
        }
    }

    static error(message: any){
        console.error(message);
    }

}