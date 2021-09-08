import createUserAuthController from '../../../../modules/accounts/UserCases/authUser'
import { Router } from 'express';

const authRouter=Router()


authRouter.post('/session',(req,res)=>{
    return createUserAuthController().handle(req,res)
})

export {authRouter}