import { Request, Response,Router } from "express";
import { authorizationUser } from "../middlewares/ensureAuthenticated";
import importCatController from '../../../../modules/car/useCases/importCategory'
import { isAdmin } from "../middlewares/ensureUserIsAdmin";


const importCategoriesRoutes=Router()


importCategoriesRoutes.post('/',authorizationUser,isAdmin,(req,res)=>{
    return importCatController().handler(req,res)
})
// importCategoriesRoutes.get('/',(req,res)=>{
//     return importCatController.handler(req,res)
// })

export {
    importCategoriesRoutes
}

