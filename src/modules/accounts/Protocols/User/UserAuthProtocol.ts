export interface IUserAuthProtocol{
    user:{
        name:string,
        email:string
    },
    token:string,
    refreshToken:string
}