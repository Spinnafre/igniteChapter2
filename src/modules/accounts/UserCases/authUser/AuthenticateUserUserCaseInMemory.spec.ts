
import { AppErrors } from "../../../../shared/errors/AppErrors"
import { IcreateUser } from "../../Protocols/User/CreateUserUserCase"
import { IUserAuthService } from "../../Protocols/User/UserAuthService"
import { IUser } from "../../Protocols/User/UserProtocol"
import { UserRepositoryInMemory } from "../../repositoriesMemory/in-memory/UserRepositoryInMemory"
import { createUserUserCase } from "../createUser/CreateUserUserCase"
import { UserAuthService } from "./AuthenticateUserUserCase"

let userRepositoryInMemory:UserRepositoryInMemory
let userAuthUserCase:IUserAuthService
let CreateUserUserCase:IcreateUser

describe('Authenticate user',()=>{
    beforeEach(()=>{
        userRepositoryInMemory=new UserRepositoryInMemory();
        userAuthUserCase= new UserAuthService(userRepositoryInMemory)
        CreateUserUserCase= new createUserUserCase(userRepositoryInMemory)
    })
    it('should be able to authenticate user',async ()=>{
        const user:IUser={
            name:"DaviSpin",
            email:"test@example.com",
            password:"123",
            driver_license:"132165"
        }

        await CreateUserUserCase.execute(user)

        const userAuth=await userAuthUserCase.execute({email:user.email, password:user.password})
        expect(userAuth).toHaveProperty('token')
    })  
    it('should not be able to authenticate user not exists',async ()=>{
        const user:IUser={
            name:"DaviSpin",
            email:"test@example.com",
            password:"123",
            driver_license:"132165"
        }

        await CreateUserUserCase.execute(user)

        await expect(
            userAuthUserCase.execute({email:"mary@gmail.com", password:user.password})
        ).rejects.toBeInstanceOf(AppErrors)
    })  
    it('should not be able to authenticate user with incorrect password',async ()=>{
        const user:IUser={
            name:"DaviSpin",
            email:"test@example.com",
            password:"123",
            driver_license:"132165"
        }

        await CreateUserUserCase.execute(user)

        await expect(
            userAuthUserCase.execute({email:user.email, password:"12"})
        ).rejects.toBeInstanceOf(AppErrors)
    })  
})