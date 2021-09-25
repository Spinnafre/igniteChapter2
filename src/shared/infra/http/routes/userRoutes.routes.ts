import multer from "multer";
import {Router} from 'express'
import createUserController from '../../../../modules/accounts/UserCases/createUser'
import userUpdateAvatarController from '../../../../modules/accounts/UserCases/updateUserAvatar'
import uploadConfig from '../../../../config/upload'
import { authorizationUser } from "../middlewares/ensureAuthenticated";



const userRoutes=Router()
const uploadAvatar=multer(uploadConfig)

userRoutes.post('/',(req,res)=>{
    return createUserController().handler(req,res)
})

userRoutes.patch('/avatar',authorizationUser,uploadAvatar.single('avatar'),(req,res)=>{
    return userUpdateAvatarController().handle(req,res)
})


export{userRoutes}