import { Router } from "express";
import { authorizationUser } from "../middlewares/ensureAuthenticated";
import specificationController from '../../../../modules/car/useCases/createSpecification'
import showSpecificationController from '../../../../modules/car/useCases/showSpecification'
import { isAdmin } from "../middlewares/ensureUserIsAdmin";

const specificationsRoutes=Router()


specificationsRoutes.post('/',authorizationUser,isAdmin,(req,res)=>{
    return specificationController().handle(req,res)
})
specificationsRoutes.get('/',authorizationUser,isAdmin,(req,res)=>{
    return showSpecificationController().handle(req,res)
})

export {
    specificationsRoutes
}

