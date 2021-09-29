import { IUser } from './../Protocols/User/UserProtocol';
export class UserMapper{
    static mapUser({
        id,
        name,
        email,
        driver_license,
        avatar_url

    }:IUser){
        const user={
            id,
            name,
            email,
            driver_license,
            avatar_url
        }
        return user
    }
}