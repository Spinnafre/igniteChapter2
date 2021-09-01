export class AppErrors{
    public readonly statusCode:number
    public readonly errorMsg:string
    constructor(msg:string,status:number=400){
        this.statusCode=status
        this.errorMsg=msg
    }
}

