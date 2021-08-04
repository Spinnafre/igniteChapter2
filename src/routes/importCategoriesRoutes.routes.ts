import { Request, Response,Router } from "express";
import {importCatController} from '../modules/car/useCases/importCategory'

const importCategoriesRoutes=Router()


importCategoriesRoutes.post('/',(req,res)=>{
    return importCatController.handler(req,res)
})
// importCategoriesRoutes.get('/',(req,res)=>{
//     return importCatController.handler(req,res)
// })

export {
    importCategoriesRoutes
}

