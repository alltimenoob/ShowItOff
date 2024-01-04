import { MailParameters } from "../types.server"

const NodeMailer = require("nodemailer")

const connection = NodeMailer.createTransport({
  service: "gmail",
  port: 587,
  host: "smpt.gmail.com",
  secure: false,
  auth: {
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASS,
  },
})

const sendMail = async (mailOptions: MailParameters) => {
  try {
    return await connection.sendMail(mailOptions)
  } catch (error) {
    console.log(error)
  }
}

export default sendMail
