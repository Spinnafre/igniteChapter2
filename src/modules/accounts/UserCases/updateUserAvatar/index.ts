import { S3StorageProvider } from './../../../../shared/container/providers/StorageProvider/S3StorageProvider';
import { localStorageProvider } from './../../../../shared/container/providers/StorageProvider/LocalStorageProvider';
import { UserRepository } from "../../infra/typeORM/repositories/UserRepository"
import { updateAvatarController } from "./userUpdateAvatarController"
import { updateAvatarService } from "./userUpdateAvatarService"

const provider={
    local:localStorageProvider.getInstance(),
    s3:S3StorageProvider.getInstance()
}

export default()=>{
    const storage= provider[process.env.disk]
    const userRepository= new UserRepository()
    const userAvatarUserCase=new updateAvatarService(userRepository,storage)
    const userAvatarController=new updateAvatarController(userAvatarUserCase)
    return userAvatarController
}