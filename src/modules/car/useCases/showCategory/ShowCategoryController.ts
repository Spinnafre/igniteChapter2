import { Request,Response } from "express";
import { CategoryProtocol } from '../../Protocols/Category/categoryProtocol';

interface ShowCategoryUseCase{
    execute():Array<CategoryProtocol>
}

export class ShowCategoryController{
    constructor(private showcategoryRepository:ShowCategoryUseCase){}
    handler(req:Request,res:Response):Response{
        return res.status(200).json(this.showcategoryRepository.execute())
    }
}