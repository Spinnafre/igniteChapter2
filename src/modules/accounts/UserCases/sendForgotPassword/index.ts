import { SendForgotPasswordController } from './sendForgotPasswordController';
import { UserTokenRepository } from './../../infra/typeORM/repositories/TokenRepository';
import { DateProvider } from './../../../../shared/container/providers/DateProvider/DayjsProvider';
import { UserRepository } from './../../infra/typeORM/repositories/UserRepository';
import { SendForgotPasswordUseCase } from './sendForgotPasswordUseCase';

// import { EtherealMailProvider } from './../../../../shared/container/providers/MailProvider/Implementations/EtherealMailProvider';

import MailProvider from '../../../../shared/container/providers/MailProvider'

// const MailProvider= EtherealMailProvider.getInstance()
export default ():SendForgotPasswordController=>{
    const userRepository = new UserRepository()
    const dateProvider = new DateProvider()
    const usersTokenRepository=new UserTokenRepository()
    const sendForgotPasswordUseCase=new SendForgotPasswordUseCase(
        userRepository,
        dateProvider,
        usersTokenRepository,
        MailProvider
    )
    const sendForgoPasswordController=new SendForgotPasswordController(
        sendForgotPasswordUseCase
    )
    return sendForgoPasswordController
}