import createUserAuthController from '../../../../modules/accounts/UserCases/authUser'
import refreshUserTokenController from '../../../../modules/accounts/UserCases/refreshToken'
import { Router } from 'express';

const authRouter=Router()


authRouter.post('/session',(req,res)=>{
    return createUserAuthController().handle(req,res)
})
authRouter.post('/refreshToken',(req,res)=>{
    return refreshUserTokenController().handle(req,res)
})

export {authRouter}