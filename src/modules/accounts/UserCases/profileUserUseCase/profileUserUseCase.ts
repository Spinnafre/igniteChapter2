import { UserMapper } from './../../mapper/UserMapper';
import { IUserRepository } from './../../Protocols/User/UserRepository';
import { IUser } from 'modules/accounts/Protocols/User/UserProtocol';
import { IProfileUserUseCase } from './../../Protocols/User/IProfileUserUseCase';

export class ProfileUserUseCase implements IProfileUserUseCase{
    constructor(private userRepository:IUserRepository){}
    async execute(id: string): Promise<IUser> {
        const profileUser=await this.userRepository.findById(id)

        const mapUser= UserMapper.mapUser(profileUser)
        return mapUser
    }

}