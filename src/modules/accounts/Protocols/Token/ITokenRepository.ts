import { IUserToken } from "./IUserToken";

export interface ITokenRepository{
    create({expires_date,refresh_token,user_id}:IUserToken):Promise<IUserToken>;
    findByUserIdAndRefreshToken(user_id:string,refresh_token:string):Promise<IUserToken>;
    deleteTokenById(id:string):Promise<void>;
}