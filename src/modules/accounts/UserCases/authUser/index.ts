import { UserAuthService } from './AuthenticateUserUserCase';
import { UserRepository } from '../../infra/typeORM/repositories/UserRepository';
import { AuthenticateUserController } from './AuthenticateUserController';
export default ()=>{
    const userRepository=new UserRepository()
    const userAuthService=new UserAuthService(userRepository)
    const userAuthController=new AuthenticateUserController(userAuthService)
    return userAuthController
}