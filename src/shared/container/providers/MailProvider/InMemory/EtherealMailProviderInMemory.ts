import { IMailProvider } from "../Protocols/IMailProvider";

export class EtherealMailProviderInMemory implements IMailProvider {
    private message:any[]=[]
    constructor() {}
    async sendMail(to:string, subject:string,variables:any,template_path:string): Promise<void> {
        this.message.push({
            to,
            subject,
            variables,
            template_path
        })
    }
}