import { UserRepository } from "../../repositories/UserRepository"
import { updateAvatarController } from "./userUpdateAvatarController"
import { updateAvatarService } from "./userUpdateAvatarService"

export default()=>{
    const userRepository= new UserRepository()
    const userAvatarUserCase=new updateAvatarService(userRepository)
    const userAvatarController=new updateAvatarController(userAvatarUserCase)
    return userAvatarController
}