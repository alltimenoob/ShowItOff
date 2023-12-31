import jwt from 'jsonwebtoken'
import { LoginDetails } from '../types.server';

export function generateJWT( userDetails : LoginDetails) {
    const secret : string  = process.env.TOKEN_SECRET as string ;
    if(secret){
        return jwt.sign( { email : userDetails.email } , secret , { expiresIn : "1800s" } )
    }
    return undefined;
}
