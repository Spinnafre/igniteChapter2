import fs from 'fs';

import { IMailProvider } from "../Protocols/IMailProvider";
import nodemailer, { Transporter } from 'nodemailer';
import handlebars from "handlebars";


export class EtherealMailProvider implements IMailProvider {
    private client: Transporter 
    private static INSTANCE: IMailProvider
    private constructor() {
        nodemailer
            .createTestAccount()
            .then((account) => {
                const transporter = nodemailer.createTransport({
                    host: account.smtp.host,
                    port: account.smtp.port,
                    secure: account.smtp.secure,
                    auth: {
                        user: account.user,
                        pass: account.pass,
                    },
                });

                this.client = transporter;
            })
            .catch((err) => console.error(err));
    }
    public static getInstance() {
        if (!EtherealMailProvider.INSTANCE) {
            EtherealMailProvider.INSTANCE = new EtherealMailProvider()
        }
        return EtherealMailProvider.INSTANCE
    }
    async sendMail(to:string, subject:string,variables:any,template_path:string): Promise<void> {
        const templateHbs= fs.readFileSync(template_path).toString('utf-8')
        //Compila o arquivo para conseguir encaixar as variáveis nele
        const templateParse=handlebars.compile(templateHbs)
        //Irá passar as variáveis para o arquivo html
        const templateHTML=templateParse(variables)

        let message = {
            from: 'Sender Name <sender@example.com>',
            to,
            subject: `${subject} ✔`,
            html: templateHTML
        };
        await this.client.sendMail(message, (err, info) => {
            if (err) {
                console.log('Error occurred. ' + err.message);
                return process.exit(1);
            }

            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        });
    }
}