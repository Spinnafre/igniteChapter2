import { AppErrors } from '../../../../shared/errors/AppErrors';
import { IUser } from './../../Protocols/User/UserProtocol';
import { IUserAuthProtocol } from '../../Protocols/User/UserAuthProtocol';
import { IUserAuthService } from '../../Protocols/User/UserAuthService';
import { IUserRepository } from './../../Protocols/User/UserRepository';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
export class UserAuthService implements IUserAuthService{
    constructor(private userRepository:IUserRepository){}
    async execute({email,password}:IUser):Promise<IUserAuthProtocol>{
        const user=await this.userRepository.findByEmail(email)
        if(!user){
            throw new AppErrors('Email incorrect',401)
        } 
        // Compara a senha que estou passando com a senha que está no banco
        const passwordMatch=await compare(password,user.password)
        if(!passwordMatch){
            throw new AppErrors('Password incorrect')
        }
        // Crio o token com a payload, chave de acesso (Usado para verificar o token)
        const token=sign({},'934850186e4397c2227e386e48fa40d4a8ee6302',{
            subject:user.id,
            expiresIn:'1d'
        })

        return {
            user:{
                name:user.name,
                email:user.email
            },
            token
        }
    }
}