import { RefreshTokenController } from './refreshTokenController';
import { UserTokenRepository } from './../../infra/typeORM/repositories/TokenRepository';
import { DateProvider } from './../../../../shared/container/providers/DateProvider/DayjsProvider';
import { RefreshTokenUseCase } from "./refreshTokenUseCase"

export default ():RefreshTokenController=>{
    const dateProvider = new DateProvider()
    const userTokenRepository = new UserTokenRepository()
    const createUserTokenUseCase=new RefreshTokenUseCase(userTokenRepository,dateProvider)
    const refreshUserTokenController=new RefreshTokenController(createUserTokenUseCase)
    return refreshUserTokenController
    
}