import { Request, Response } from 'express';
import { ICategoryService } from '../../Protocols/Category/CreateCategoryService';
export class CategoryController{
    constructor(private createCategoryService:ICategoryService){}
    async handle(req:Request,res:Response):Promise<Response>{
        const {name,description}=req.body
        await this.createCategoryService.execute({name,description})
        return res.status(201).json({msg:'Categorias criadas com sucesso'})
    }

}
