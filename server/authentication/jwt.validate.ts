import jwt, { JwtPayload } from 'jsonwebtoken'
import { NextFunction , Request, Response } from 'express';

interface CustomRequest extends Request{
  user : JwtPayload | string
}
export function validateJWT( req : CustomRequest, res : Response, next : NextFunction) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null) return res.sendStatus(401)
    

    jwt.verify(token, process.env.TOKEN_SECRET as string, (error, user) => {

        if (error) {
          console.log(error.name)
          res.sendStatus(403)
        } 

        if(user)
        req.user = user
    
        next()
      }) 
}
