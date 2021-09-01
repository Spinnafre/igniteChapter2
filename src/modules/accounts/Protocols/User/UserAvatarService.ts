export interface IUserAvatar{
    user_id:string,
    avatar_file:string
}

export interface IUserAvatarService{
    execute({user_id,avatar_file}:IUserAvatar):Promise<void>
}