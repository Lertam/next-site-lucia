import nodemailer, { SendMailOptions } from "nodemailer";


export const sendEmail = (props: SendMailOptions) =>{
    const transporter = nodemailer.createTransport({
        host: "127.0.0.1",
        port: 1026,
        auth: {
            user: "project.1",
            pass: "secret.1",
        },
    }, {
        from: "noo-reply@obeliski.ru",
    });
	return transporter.sendMail(props);
}