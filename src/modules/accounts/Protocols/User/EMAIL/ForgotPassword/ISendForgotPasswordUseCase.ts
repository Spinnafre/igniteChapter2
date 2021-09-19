export interface ISendForgotPasswordUseCase{
    execute(email:string):Promise<void>
}