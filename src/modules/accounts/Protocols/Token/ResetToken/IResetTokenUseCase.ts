export interface IResetTokenUseCase{
    execute(password:string,refresh_token:string):Promise<void>
}