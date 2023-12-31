import { Request, Response } from "express"
import { register } from "./authentication/auth.register"
import { login } from "./authentication/auth.login"
import { startApolloServer } from "./graphql/graphql.server"
import { startMongoose } from "./mongoose/mongoose.config" 
import { validateJWT } from "./authentication/jwt.validate"
import getFileData from "./filehandling/document.fetch.files"
import upload from "./filehandling/upload.instance"

const express = require('express')
const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
startMongoose()
startApolloServer(app)



app.post('/register', (req : Request, res : Response) => {
  async function actionSend() { 
    console.log(req.body);
    if(Object.keys(req.body).length === 0) return res.status(400).send()

    const response = await register({ name : req.body.name, email : req.body.email , password : req.body.password})
    console.log(response);
    res.send(response);
  }
  actionSend().catch((error)=>{console.error(error)});
})

app.post('/login',(req : Request, res : Response) => {
  async function actionSend() { 
    console.log(req.body);

    if(Object.keys(req.body).length === 0) return res.status(400).send()

    const response = await login({ email : req.body.email , password : req.body.password})
    console.log(response);
    res.send(response);
  }
  actionSend().catch((error)=>{console.error(error)});
})


app.post('/documents',validateJWT,(req : Request, res : Response )=>{
  if(req.body.email)
  getFileData(req.body.email as string, req.body.existingFiles as string[]).then((fileData)=>res.send(fileData))
})


app.post('/upload',upload.single('file'), (_ : Request, res : Response) => {
  res.status(200).send() 
})


app.get('/validate-user',validateJWT,(_ : Request, res : Response) => {
  res.status(200).send()
})


const port = process.env.PORT
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



