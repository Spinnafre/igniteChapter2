import { Request, Response,Router } from "express";
import {categoryController} from '../modules/car/useCases/createCategory'
import { showCategoryController} from "../modules/car/useCases/showCategory";

const categoriesRoutes=Router()


categoriesRoutes.post('/',(req,res)=>{
    return categoryController.handle(req,res)
})
categoriesRoutes.get('/',(req,res)=>{
    return showCategoryController.handler(req,res)
})

export {
    categoriesRoutes
}

