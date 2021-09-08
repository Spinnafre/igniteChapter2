import { User } from "../../infra/typeORM/entities/UserAccount";
import { IUser } from "../../Protocols/User/UserProtocol";
import { IUserRepository } from "../../Protocols/User/UserRepository";

class UserRepositoryInMemory implements IUserRepository {
    private users:IUser[]=[]
    async create(data: IUser): Promise<void> {
        const user=new User()
        Object.assign(user,data)
        this.users.push(user)
    }
    async findByEmail(email: string): Promise<IUser> {
        const user=this.users.find(user => user.email === email)
        return user
    }
    async findById(id: string): Promise<IUser> {
        const user=this.users.find(user => user.id === id)
        return user
    }

}
export {UserRepositoryInMemory}