import { IUser } from "./UserProtocol";

export interface IcreateUser {
    execute({
        name,
        email,
        password,
        driver_license,
    }: IUser): Promise<void>
}