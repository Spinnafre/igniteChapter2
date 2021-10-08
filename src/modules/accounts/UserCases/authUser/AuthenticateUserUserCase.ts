import { ITokenRepository } from './../../Protocols/Token/ITokenRepository';
import { IDateProvider } from './../../../../shared/container/providers/DateProvider/Protocols/IDateProvider';
import { AppErrors } from '../../../../shared/errors/AppErrors';
import { IUser } from './../../Protocols/User/UserProtocol';
import { IUserAuthProtocol } from '../../Protocols/User/UserAuthProtocol';
import { IUserAuthService } from '../../Protocols/User/UserAuthService';
import { IUserRepository } from './../../Protocols/User/UserRepository';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { auth } from '../../../../config/auth';

interface IRequest{
    email:string,
    password:string
}
export class UserAuthService implements IUserAuthService {
    constructor(
        private userRepository: IUserRepository,
        private dateProvidder:IDateProvider,
        private userTokenRepository:ITokenRepository,
    ) { }
    async execute({ email, password }: IRequest): Promise<IUserAuthProtocol> {
        const user = await this.userRepository.findByEmail(email)
        const { 
            secret_token,
            expires_in_token, 
            expires_in_refresh_token, 
            secret_refresh_token,
            expires_refresh_token_days
        } = auth
        
        if (!user) {
            throw new AppErrors('Email incorrect', 401)
        }
        // Compara a senha que estou passando com a senha que está no banco
        const passwordMatch = await compare(password, user.password)
        if (!passwordMatch) {
            throw new AppErrors('Password incorrect')
        }
        // Crio o token com a payload, chave de acesso (Usado para verificar o token)
        const token = sign({}, secret_token, {
            subject: user.id,
            expiresIn: expires_in_token
        })

        //Refresh
        const refresh_token = sign({email},secret_refresh_token,{
            subject: user.id,
            expiresIn:expires_in_refresh_token
        })
        const expires_refresh_token_Date= this.dateProvidder.addDays(expires_refresh_token_days)
        await this.userTokenRepository.create({expires_date:expires_refresh_token_Date,refresh_token,user_id:user.id})

        return {
            user: {
                name: user.name,
                email: user.email
            },
            token,
            refreshToken:refresh_token
        }
    }
}