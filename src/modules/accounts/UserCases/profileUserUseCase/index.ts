import { ProfileUserUseCase } from './profileUserUseCase';
import { ProfileUserController } from './profileUserController';
import { UserRepository } from './../../infra/typeORM/repositories/UserRepository';

export default ():ProfileUserController=>{
    const userRepository= new UserRepository()
    const profileUserUseCase= new ProfileUserUseCase(userRepository)
    const profileUserController=new ProfileUserController(profileUserUseCase)
    return profileUserController
}