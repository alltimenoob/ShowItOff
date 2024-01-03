import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express';

export function validateJWT( req : any, res : Response, next : NextFunction) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {

        if (err) return res.sendStatus(403)
        console.log("Valid JWT ",user)
        
        req.user = user
    
        next()
      }) 
}
