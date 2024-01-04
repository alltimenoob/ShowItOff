import { Request, Response, response } from "express"
import { register } from "./authentication/auth.register"
import { login } from "./authentication/auth.login"
import { startMongoose } from "./mongoose/mongoose.config"
import { validateJWT } from "./authentication/jwt.validate"
import upload from "./filehandling/upload.instance"
import { createDocument } from "./document/document.server"
import "./graphql/graphql.server"
import shareDocument from "./mailer/share.document"

const express = require("express")
const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
startMongoose()

app.post("/register", (req: Request, res: Response) => {
  async function actionSend() {
    console.log(req.body)
    if (Object.keys(req.body).length === 0) return res.status(400).send()

    const response = await register({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    })
    console.log(response)
    res.send(response)
  }
  actionSend().catch((error) => {
    console.error(error)
  })
})

app.post("/login", (req: Request, res: Response) => {
  async function actionSend() {
    console.log(req.body)

    if (Object.keys(req.body).length === 0) return res.status(400).send()

    const response = await login({ email: req.body.email, password: req.body.password })
    console.log(response)
    res.send(response)
  }
  actionSend().catch((error) => {
    console.error(error)
  })
})

app.post("/upload", [validateJWT, upload.single("file")], async (req: any, res: Response) => {
  await createDocument({
    email: req.user.email,
    title: req.body.title,
    filename: req.file.filename,
    preview: req.body.preview,
    tags: null,
  }).then((response) => {
    res.send(response)
  })
})

app.get("/validate-user", validateJWT, (_: Request, res: Response) => {
  res.status(200).send()
})

app.post("/share", validateJWT, async (req: Request, res: Response) => {
  if (!req.body || !req.body.id || !req.body.recipient)
    return res.status(200).send({ msg: "Incorrect infromation", status: 400 })

  const message = await shareDocument({
    id: req.body.id,
    recipient: req.body.recipient,
  })
    
  res.status(200).send(message)
})

const port = process.env.PORT
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
