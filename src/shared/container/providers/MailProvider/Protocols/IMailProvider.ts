export interface IMailProvider{
    sendMail(to:string, subject:string,variables:any,template_path:string):Promise<void>
}