import { Router } from 'express';

import createRentalController from '../../../../modules/rentals/useCase/createRentals'
import { authorizationUser } from '../middlewares/ensureAuthenticated';

const rentalRoutes=Router();

rentalRoutes.post('/rental',authorizationUser,(req,res)=>{
    return createRentalController().handle(req,res)
})

export {rentalRoutes}