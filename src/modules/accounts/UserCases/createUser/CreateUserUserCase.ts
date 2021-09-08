import { AppErrors } from '../../../../shared/errors/AppErrors';
import { IcreateUser } from "../../Protocols/User/CreateUserUserCase";
import { IUser } from "../../Protocols/User/UserProtocol";
import { IUserRepository } from "../../Protocols/User/UserRepository";
import {hash} from 'bcrypt'

export class createUserUserCase implements IcreateUser {
    constructor(private UserRepository: IUserRepository) { }
    async execute({name,email,password,driver_license,}: IUser): Promise<void> {
        if(await this.UserRepository.findByEmail(email)){
            throw new AppErrors('User already exists')
        }
        
        const passwordHash=await hash(password,8)

        await this.UserRepository.create({
            name,
            email,
            password:passwordHash,
            driver_license,
        });
    }
}
