import { IUserToken } from './../../Protocols/Token/IUserToken';
import { UsersTokens } from '../../infra/typeORM/entities/UserToken';
import { ITokenRepository } from './../../Protocols/Token/ITokenRepository';

export class UserTokenRepositoryInMemory implements ITokenRepository{
    private repository:IUserToken[]=[]
    async create({ expires_date, refresh_token, user_id }: IUserToken): Promise<IUserToken> {
        const userToken=new UsersTokens()
        Object.assign(userToken,{
            expires_date,
            refresh_token,
            user_id
        })
        this.repository.push(userToken)
        return userToken
    }
    async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<IUserToken> {
        return this.repository.find(r=>r.refresh_token===refresh_token && r.user_id===user_id)
    }
    async deleteTokenById(id: string): Promise<void> {
        const refresh_token=this.repository.find(r=>r.id===id)
        this.repository.splice(this.repository.indexOf(refresh_token))
    }
    async findByToken(token: string): Promise<IUserToken> {
        return this.repository.find(r=>r.refresh_token===token)
    }

}