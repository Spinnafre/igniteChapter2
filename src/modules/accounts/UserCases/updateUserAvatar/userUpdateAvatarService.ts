import { deleteFile } from "../../../../utils/deleteDuplicateFiles";
import { IUserAvatar } from "../../Protocols/User/UserAvatarService";
import { IUserRepository } from "../../Protocols/User/UserRepository";


export class updateAvatarService{
    constructor(private userRepository:IUserRepository){}
    async execute({user_id,avatar_file}:IUserAvatar):Promise<void>{
        const user=await this.userRepository.findById(user_id)
        if(user.avatar){
            await deleteFile(`./tmp/avatar/${user.avatar}`)
        }
        user.avatar=avatar_file
        await this.userRepository.create(user)
    }
}