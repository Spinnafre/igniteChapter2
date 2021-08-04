import { Request, Response } from 'express';
import { ICategoryService } from '../../Protocols/Category/CreateCategoryService';
export class CategoryController{
    constructor(private createCategoryService:ICategoryService){}
    handle(req:Request,res:Response):Response{
        const {name,description}=req.body
        this.createCategoryService.execute({name,description})
        return res.status(201).json({msg:'Categorias criadas com sucesso'})
    }

}
