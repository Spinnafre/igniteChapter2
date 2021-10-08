import fs from "fs";

import { IMailProvider } from "../Protocols/IMailProvider";
import nodemailer, { Transporter } from "nodemailer";
import handlebars from "handlebars";

export class GmailProvider implements IMailProvider {
  private client: Transporter;
  private static INSTANCE: IMailProvider;
  private constructor() {
    this.client = nodemailer.createTransport({
      service: "gmail",
      host: "mail.hover.com",
      port: 465,
      // secure: account.smtp.secure,
      auth: {
        user: "davi@3v3.com.br",
        pass: process.env.GMAIL_PASSWORD,
      },
      tls:{
        secureProtocol: "TLSv1_method"
      }
    });

  }
  public static getInstance() {
    if (!GmailProvider.INSTANCE) {
      GmailProvider.INSTANCE = new GmailProvider();
    }
    return GmailProvider.INSTANCE;
  }
  async sendMail(
    to: string,
    subject: string,
    variables: any,
    template_path: string
  ): Promise<void> {
    const templateHbs = fs.readFileSync(template_path).toString("utf-8");
    //Compila o arquivo para conseguir encaixar as variáveis nele
    const templateParse = handlebars.compile(templateHbs);
    //Irá passar as variáveis para o arquivo html
    const templateHTML = templateParse(variables);

    let message = {
      from: "Davi da Rentx <davi@3v3.com.br>",
      to,
      subject: `${subject} ✔`,
      html: templateHTML,
    };
    await this.client.sendMail(message, (err, info) => {
      if (err) {
        console.log("Error occurred. " + err.message);
        return process.exit(1);
      }

      console.log("Message sent: %s", info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log(`Enviado para ${to}`);
    });
  }
}
