import { EtherealMailProvider } from "./Implementations/EtherealMailProvider";
import { GmailProvider } from "./Implementations/GmailProvider";

const mailProvider={
    ethereal: EtherealMailProvider.getInstance(),
    gmail:GmailProvider.getInstance()
}
export default mailProvider[process.env.MAIL_PROVIDER]