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