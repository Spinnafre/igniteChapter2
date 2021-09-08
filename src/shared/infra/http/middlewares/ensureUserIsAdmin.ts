import { UserRepository } from './../../../../modules/accounts/infra/typeORM/repositories/UserRepository';
import { NextFunction, Request, Response } from "express";
import { AppErrors } from '../../../errors/AppErrors';

export async function isAdmin(req: Request, res: Response,next:NextFunction){
    const {id} = req.user
    const userRepository=new UserRepository()
    const user=await userRepository.findById(id)
    if(!user.admin){
        throw new AppErrors('User is not a admin',401)
    }
    return next()
}