import { MailProvider, Message } from './../MailProvider';
import nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer';

export class MailtrapMailProvider implements MailProvider {

    private transporter: Mail;
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.mailtrap.io',
            port: 2525,
            auth: {
                user: 'fad26b52b63b20',
                pass: '19be67d708b19c'
            }
        })
    }
    async sendMail(message: Message): Promise<void> {
        await this.transporter.sendMail({
            to: {
                name: message.to.name,
                address: message.to.email
            },
            from: {
                name: message.from.name,
                address: message.from.email
            },
            subject: message.subject,
            html: message.body
        })
    }

}