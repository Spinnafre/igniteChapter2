import { getRepository, Repository } from 'typeorm';
import { ITokenRepository } from "modules/accounts/Protocols/Token/ITokenRepository";
import { IUserToken } from "modules/accounts/Protocols/Token/IUserToken";
import { UsersTokens } from '../entities/UserToken';

export class UserTokenRepository implements ITokenRepository {
    private repository:Repository<UsersTokens>

    constructor() {
        this.repository=getRepository(UsersTokens)
    }
    async create({ expires_date, refresh_token, user_id }: IUserToken): Promise<IUserToken> {
        const userToken=this.repository.create({
            expires_date,
            refresh_token,
            user_id
        })
        await this.repository.save(userToken)
        return  userToken
    }
    async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<IUserToken> {
        return await this.repository.findOne({
            user_id,
            refresh_token
        })
    }
    async deleteTokenById(id: string): Promise<void>{
        await this.repository.delete(id)
    }

}