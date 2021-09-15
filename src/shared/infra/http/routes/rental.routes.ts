import { Router } from 'express';

import createRentalController from '../../../../modules/rentals/useCase/createRentals'
import devolutionController from '../../../../modules/rentals/useCase/devolutionRental'
import listByUserController from '../../../../modules/rentals/useCase/listRentalsByUser'
import { authorizationUser } from '../middlewares/ensureAuthenticated';

const rentalRoutes=Router();

rentalRoutes.post('/rental',authorizationUser,(req,res)=>{
    return createRentalController().handle(req,res)
})
rentalRoutes.post('/rental/devolution/:id',authorizationUser,(req,res)=>{
    return devolutionController().handle(req,res)
})
rentalRoutes.get('/rental',authorizationUser,(req,res)=>{
    return listByUserController().handle(req,res)
})

export {rentalRoutes}