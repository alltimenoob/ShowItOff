import { LoginDetails } from '../types.server';
import { userModel } from '../mongoose/mongoose.model';
import bcrypt from 'bcryptjs'
import { generateJWT } from './jwt.generate';

export async function login( userDetails : LoginDetails) {
    
    const existingUser = await userModel.findOne({email : userDetails.email})
   
    if(existingUser !== null){
        const isPasswordCorrect = await bcrypt.compare(userDetails.password,existingUser.password as string )
        if(isPasswordCorrect){
            const token = generateJWT(userDetails)
            return { msg : "Successful!" , name : existingUser.name, email : userDetails.email, token , status : 200}
        }
        else
            return { msg : "Password is incorrect!" , status : 401}
    }
    else{
        return { msg : "User does not exist" , status : 404}
    }
}
