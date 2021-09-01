import { Router } from "express";
import { authorizationUser } from "../middlewares/ensureAuthenticated";
import specificationController from '../modules/car/useCases/createSpecification'
import showSpecificationController from '../modules/car/useCases/showSpecification'

const specificationsRoutes=Router()

specificationsRoutes.use(authorizationUser)
specificationsRoutes.post('/',(req,res)=>{
    return specificationController().handle(req,res)
})
specificationsRoutes.get('/',(req,res)=>{
    return showSpecificationController().handle(req,res)
})

export {
    specificationsRoutes
}

