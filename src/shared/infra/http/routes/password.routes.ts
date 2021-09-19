import { Router } from "express";
import SendForgotPasswordController from '../../../../modules/accounts/UserCases/sendForgotPassword'
import ResetPasswordController from '../../../../modules/accounts/UserCases/resetPassword'

const passwordForgotRouter=Router()

passwordForgotRouter.post('/password/forgot', (req, res) => {
    return SendForgotPasswordController().handle(req,res)
})
passwordForgotRouter.post('/password/reset', (req, res) => {
    return ResetPasswordController().handle(req,res)
})

export {passwordForgotRouter}