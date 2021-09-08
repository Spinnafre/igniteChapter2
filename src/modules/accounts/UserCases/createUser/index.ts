import { UserRepository } from '../../infra/typeORM/repositories/UserRepository';
import { UserController } from './createUserController';
import { createUserUserCase } from './CreateUserUserCase';

export default ()=>{
    const createUserRepository=new UserRepository()
    const createUserService=new createUserUserCase(createUserRepository)
    const userController=new UserController(createUserService)
    return userController
}