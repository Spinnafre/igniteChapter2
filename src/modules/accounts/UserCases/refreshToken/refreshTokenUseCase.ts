import { IDateProvider } from './../../../../shared/container/providers/DateProvider/Protocols/IDateProvider';
import { AppErrors } from './../../../../shared/errors/AppErrors';
import { ITokenRepository } from './../../Protocols/Token/ITokenRepository';
import { auth } from '../../../../config/auth';
import { sign, verify } from "jsonwebtoken";



//Irá ser responsável por renovar o token do usuário
interface ITokenReponse{
    //Id_user
    sub:string,
    email:string,
}
interface IResponseRefreshTokenUseCase{
    token:string,
    refreshToken:string
}
/*
- Usuário irá logar na aplicação
- Irá criar o refresh_token e o token
- O refresh token irá ser usado somente para criar um novo token,
sempre que gerar um novo token irá gerar também um novo refresh token
com a data superior ao token
- Como o refresh token tem a expiração superior ao token, sempre que o
token for inválido irá ser possível buscar o refresh_token do usuário 
e criar um novo, ou seja, não irá expirar.
- Cada requisição irá verificar o token
- Quando o token estiver inválido, irá chamar a rota refreshToken para criar um novo token e refresh_token

*/
export class RefreshTokenUseCase{
    constructor(
    private userTokenRepository:ITokenRepository,
    private dateProvider:IDateProvider
    ){}

    async execute(refresh_token:string):Promise<IResponseRefreshTokenUseCase>{
        const {sub:user_id,email}=verify(refresh_token,auth.secret_refresh_token) as  ITokenReponse

        const userToken=await  this.userTokenRepository.findByUserIdAndRefreshToken(user_id,refresh_token)

        if(!userToken){
            throw new AppErrors('Refresh Token does not exists!')
        }

        await this.userTokenRepository.deleteTokenById(userToken.id)

        const refreshToken= sign({email},auth.secret_refresh_token,{
            subject:user_id,
            expiresIn:auth.expires_in_refresh_token
        })

        const new_token=sign({},auth.secret_token,{
            subject:user_id,
            expiresIn:auth.expires_in_token
        })

        const expires_refresh_token_Date= this.dateProvider.addDays(auth.expires_refresh_token_days)

        const newRefreshToken=await this.userTokenRepository.create({
            user_id,
            expires_date:expires_refresh_token_Date,
            refresh_token:refreshToken
        })

        return {
            token:new_token,
            refreshToken:newRefreshToken.refresh_token
        }

    }
}