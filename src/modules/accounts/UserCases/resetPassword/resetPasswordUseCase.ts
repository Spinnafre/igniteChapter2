import { IUserRepository } from './../../Protocols/User/UserRepository';
import { IDateProvider } from './../../../../shared/container/providers/DateProvider/Protocols/IDateProvider';
import { AppErrors } from './../../../../shared/errors/AppErrors';
import { ITokenRepository } from './../../Protocols/Token/ITokenRepository';
import { IResetTokenUseCase } from "../../Protocols/Token/ResetToken/IResetTokenUseCase";
import { hash } from 'bcrypt';


export class ResetTokenUseCase implements IResetTokenUseCase {
    constructor(
        private userTokenRepository:ITokenRepository,
        private dateProvider: IDateProvider,
        private userRepository: IUserRepository,
    ){}
    async execute(password: string, refresh_token: string): Promise<void> {
        const token=await this.userTokenRepository.findByToken(refresh_token)
        console.log(refresh_token)
        if(!token){
            throw new AppErrors('Token invalid');
        }
        //Se o token passado pelo o link do email estiver espirado, irá dar error
        if(this.dateProvider.compareIsBefore(token.expires_date,this.dateProvider.DateNow())){
            throw new AppErrors('Token expired');
        }

        const user=await this.userRepository.findById(token.user_id)
        const newPassword=await hash(password,8)

        user.password=newPassword

        await this.userRepository.create(user)
        await this.userTokenRepository.deleteTokenById(token.id)
    }

}