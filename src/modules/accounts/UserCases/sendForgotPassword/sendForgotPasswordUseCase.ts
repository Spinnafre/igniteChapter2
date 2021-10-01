import { v4 as uuidV4 } from "uuid";
import {resolve} from 'path'

import { IMailProvider } from './../../../../shared/container/providers/MailProvider/Protocols/IMailProvider';
import { AppErrors } from './../../../../shared/errors/AppErrors';
import { ISendForgotPasswordUseCase } from './../../Protocols/User/EMAIL/ForgotPassword/ISendForgotPasswordUseCase';
import { ITokenRepository } from "./../../Protocols/Token/ITokenRepository";
import { IDateProvider } from "./../../../../shared/container/providers/DateProvider/Protocols/IDateProvider";
import { IUserRepository } from "./../../Protocols/User/UserRepository";

class SendForgotPasswordUseCase implements ISendForgotPasswordUseCase {
    constructor(
        private usersRepository: IUserRepository,
        private dateProvider: IDateProvider,
        private usersTokenRepository: ITokenRepository,
        private MailProvider: IMailProvider,
    ) { }
    async execute(email: string): Promise<void> {
        const user = await this.usersRepository.findByEmail(email)
        if (!user) {
            throw new AppErrors('User does not exists')
        }
        const token = uuidV4()

        const exp_date = this.dateProvider.addHours(3)

        await this.usersTokenRepository.create({
            expires_date: exp_date,
            refresh_token: token,
            user_id: user.id,
        })
        // Irão ser passadas para o handlebars para renderizar no html
        const variables={
            name:user.name,
            link:`http://localhost:3333/password/reset?token=${token}`
        }
        //Caminho em que o template .hbs está localizado
        const templatePath=resolve(__dirname,'..','..','Views','emails','forgotPassword.hbs')
        console.log(templatePath)

        await this.MailProvider
        .sendMail(
            email, 
            'Recuperação de senha', 
            variables,
            templatePath
        )
        
    }

}
export { SendForgotPasswordUseCase };
