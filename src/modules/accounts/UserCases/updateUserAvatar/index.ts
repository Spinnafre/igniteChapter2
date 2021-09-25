import { localStorageProvider } from './../../../../shared/container/providers/StorageProvider/LocalStorageProvider';
import { UserRepository } from "../../infra/typeORM/repositories/UserRepository"
import { updateAvatarController } from "./userUpdateAvatarController"
import { updateAvatarService } from "./userUpdateAvatarService"

export default()=>{
    const localStorage= new localStorageProvider()
    const userRepository= new UserRepository()
    const userAvatarUserCase=new updateAvatarService(userRepository,localStorage)
    const userAvatarController=new updateAvatarController(userAvatarUserCase)
    return userAvatarController
}