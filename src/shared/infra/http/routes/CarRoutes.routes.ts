import { Router } from "express";
import multer from "multer";

import carController from '../../../../modules/car/useCases/createCar'
import listCarsAvailablesController from '../../../../modules/car/useCases/listAvailableCars'
import { authorizationUser } from "../middlewares/ensureAuthenticated";
import carSpecificationController from '../../../../modules/car/useCases/createCarSpecification'
import CarImagesController from '../../../../modules/car/useCases/UploadCarImagesUseCase'
import {isAdmin}  from "../middlewares/ensureUserIsAdmin";

import uploadConfig from '../../../../config/upload'

const carRoutes=Router()

var upload = multer(uploadConfig)

carRoutes.post('/car',authorizationUser,isAdmin,(req,res)=>{
    return carController().handle(req,res)
})
carRoutes.post('/car/images/:id',authorizationUser,isAdmin,upload.array('images'),(req,res)=>{
    return CarImagesController().handle(req,res)
})
carRoutes.post('/car/:id/specification',authorizationUser,isAdmin,(req,res)=>{
    return carSpecificationController().handle(req,res)
})
carRoutes.get('/car',authorizationUser,isAdmin,(req,res)=>{
    return listCarsAvailablesController().handle(req,res)
})

export{carRoutes}