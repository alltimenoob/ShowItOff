import { documentModel } from "../mongoose/mongoose.model"
import { DocumentDetails } from "../types.server"
import sendMail from "./mailer.server"
const fs = require("fs")

export default async function shareDocument({ id, recipient }: { id: string; recipient: string }) {
  const document: DocumentDetails = await documentModel.findOne({ _id : id })

  const content = Buffer.from(fs.readFileSync("./uploads/" + document.filename)).toString(
    "base64"
  )

  const mailOptions = {
    from: {
      name: "Show It Off",
      address: process.env.MAILER_USER,
    },
    to: [recipient],
    subject: document.title,
    text : "[THIS IS AUTOMATED EMAIL BY SHOWITOFF SERVER]",
    attachments: [
      {
        filename: document.filename,
        content: content,
        encoding: "base64",
      },
    ],
  }

  const message = await sendMail(mailOptions)

  if(message.response.split(' ')[0]=='250'){
    return { msg : "Email sent to recipient.", status : 200}
  }
  else{
    return { msg : "Something went wrong", status : 400}
  }
}
