import { UserTokenRepository } from './../../infra/typeORM/repositories/TokenRepository';
import { DateProvider } from './../../../../shared/container/providers/DateProvider/DayjsProvider';
import { UserAuthService } from './AuthenticateUserUserCase';
import { UserRepository } from '../../infra/typeORM/repositories/UserRepository';
import { AuthenticateUserController } from './AuthenticateUserController';

export default ()=>{
    const dateProvider = new DateProvider()
    const userTokenRepository = new UserTokenRepository()
    const userRepository=new UserRepository()
    const userAuthService=new UserAuthService(userRepository,dateProvider,userTokenRepository)
    const userAuthController=new AuthenticateUserController(userAuthService)
    return userAuthController
}