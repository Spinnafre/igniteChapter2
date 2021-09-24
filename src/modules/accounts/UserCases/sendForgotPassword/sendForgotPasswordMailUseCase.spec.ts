import { AppErrors } from './../../../../shared/errors/AppErrors';
import { ISendForgotPasswordUseCase } from './../../Protocols/User/EMAIL/ForgotPassword/ISendForgotPasswordUseCase';
import { EtherealMailProviderInMemory } from './../../../../shared/container/providers/MailProvider/InMemory/EtherealMailProviderInMemory';
import { UserTokenRepositoryInMemory } from './../../repositoriesMemory/in-memory/UserTokenRepository';
import { DateProvider } from './../../../../shared/container/providers/DateProvider/DayjsProvider';
import { IMailProvider } from './../../../../shared/container/providers/MailProvider/Protocols/IMailProvider';
import { ITokenRepository } from "./../../Protocols/Token/ITokenRepository";
import { IDateProvider } from "./../../../../shared/container/providers/DateProvider/Protocols/IDateProvider";
import { IUserRepository } from "./../../Protocols/User/UserRepository";
import { UserRepositoryInMemory } from '../../repositoriesMemory/in-memory/UserRepositoryInMemory';
import { SendForgotPasswordUseCase } from './sendForgotPasswordUseCase';


let usersRepositoryInMemory: IUserRepository
let dateProvider: IDateProvider
let usersTokenRepositoryInMemory: ITokenRepository
let etherealMailProviderInMemory: IMailProvider
let sendForgotPasswordUseCase: ISendForgotPasswordUseCase

describe('Send forgot password email', () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UserRepositoryInMemory()
        dateProvider = new DateProvider()
        usersTokenRepositoryInMemory = new UserTokenRepositoryInMemory()
        etherealMailProviderInMemory = new EtherealMailProviderInMemory()

        sendForgotPasswordUseCase = new SendForgotPasswordUseCase(
            usersRepositoryInMemory,
            dateProvider,
            usersTokenRepositoryInMemory,
            etherealMailProviderInMemory
        )
    })
    it('should be able to send a forgot password mail to user', async () => {
        // Irá ficar escutando o método sendMail 
        const sendMail = jest.spyOn(etherealMailProviderInMemory, 'sendMail')
        await usersRepositoryInMemory.create({
            driver_license: "664168",
            email: "avzonbop@ospo.pr",
            name: "Blanche Curry",
            password: "1234",
        })

        await sendForgotPasswordUseCase.execute("avzonbop@ospo.pr")
        expect(sendMail).toHaveBeenCalled()
    })
    it('should not be able to send an mail if user does not exists', async () => {
        await expect(sendForgotPasswordUseCase.execute("avzonbop@ospo.pr"))
            .rejects.toEqual(new AppErrors('User does not exists'))
    })
    it('should be able to create an user token', async () => {
        const usersTokenCreate=jest.spyOn(usersTokenRepositoryInMemory,"create")
        await usersRepositoryInMemory.create({
            driver_license: "787330",
            email: "abome@regrog.ee",
            name: "Leon Perkins",
            password: "1234",
        })

        await sendForgotPasswordUseCase.execute("abome@regrog.ee")

        expect(usersTokenCreate).toBeCalled()

    })
});