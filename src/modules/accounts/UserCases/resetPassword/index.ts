import { DateProvider } from './../../../../shared/container/providers/DateProvider/DayjsProvider';
import { UserTokenRepository } from './../../infra/typeORM/repositories/TokenRepository';
import { ResetPasswordController } from "./resetPasswordController"
import { ResetTokenUseCase } from "./resetPasswordUseCase"
import {UserRepository} from '../../infra/typeORM/repositories/UserRepository'


export default ():ResetPasswordController=>{
    const dateProvider = new DateProvider()
    const userTokenRepository = new UserTokenRepository()
    const userRepository=new UserRepository()
    const resetTokenUseCase=new ResetTokenUseCase(
        userTokenRepository,
        dateProvider,
        userRepository
    )
    const resetTokenController=new ResetPasswordController(resetTokenUseCase)
    return resetTokenController
}