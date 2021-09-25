import { IStorageProvider } from './../../../../shared/container/providers/StorageProvider/Protocols/IStorageProvider';
import { deleteFile } from "../../../../utils/deleteDuplicateFiles";
import { IUserAvatar } from "../../Protocols/User/UserAvatarService";
import { IUserRepository } from "../../Protocols/User/UserRepository";


export class updateAvatarService{
    constructor(
        private userRepository:IUserRepository,
        private storageProvider:IStorageProvider
    ){}
    async execute({user_id,avatar_file}:IUserAvatar):Promise<void>{
        const user=await this.userRepository.findById(user_id)
        if(user.avatar){
            await this.storageProvider.delete(user.avatar,'avatar')
        }
        await this.storageProvider.save(avatar_file,'avatar')
        user.avatar=avatar_file
        await this.userRepository.create(user)
    }
}