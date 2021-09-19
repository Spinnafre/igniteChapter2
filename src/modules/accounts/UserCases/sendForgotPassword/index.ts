import { SendForgotPasswordController } from './sendForgotPasswordController';
import { EtherealMailProvider } from './../../../../shared/container/providers/MailProvider/Implementations/EtherealMailProvider';
import { UserTokenRepository } from './../../infra/typeORM/repositories/TokenRepository';
import { DateProvider } from './../../../../shared/container/providers/DateProvider/DayjsProvider';
import { UserRepository } from './../../infra/typeORM/repositories/UserRepository';
import { SendForgotPasswordUseCase } from './sendForgotPasswordUseCase';

const etherealMailProvider= EtherealMailProvider.getInstance()
export default ():SendForgotPasswordController=>{
    const userRepository = new UserRepository()
    const dateProvider = new DateProvider()
    const usersTokenRepository=new UserTokenRepository()
    const sendForgotPasswordUseCase=new SendForgotPasswordUseCase(
        userRepository,
        dateProvider,
        usersTokenRepository,
        etherealMailProvider
    )
    const sendForgoPasswordController=new SendForgotPasswordController(
        sendForgotPasswordUseCase
    )
    return sendForgoPasswordController
}