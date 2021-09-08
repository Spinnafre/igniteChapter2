import { Request, Response,Router } from "express";
import { authorizationUser } from "../middlewares/ensureAuthenticated";
import categoryController from '../../../../modules/car/useCases/createCategory'
import showCategoryController from "../../../../modules/car/useCases/showCategory";
import { isAdmin } from "../middlewares/ensureUserIsAdmin";


const categoriesRoutes=Router()


categoriesRoutes.post('/',authorizationUser,isAdmin,(req,res)=>{
    return categoryController().handle(req,res)
})
categoriesRoutes.get('/',authorizationUser,(req,res)=>{
    return showCategoryController().handler(req,res)
})

export {
    categoriesRoutes
}

