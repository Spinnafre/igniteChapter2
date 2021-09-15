import { Response, Request } from 'express';
import { IListRentalByUserUseCase } from "../../Protocols/ListRentalByUseCase/IlistRentalByUseCase";

export class ListRentalByUserController{
    constructor(private listRentalByUserUseCase: IListRentalByUserUseCase){}
    async handle(req: Request, res: Response):Promise<Response>{
        const {id}=req.user 
        const rentals=await this.listRentalByUserUseCase.execute(id)
        return res.status(200).json(rentals)
    }
}