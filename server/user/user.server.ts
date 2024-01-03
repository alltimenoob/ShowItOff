import bcrypt from 'bcryptjs'
import { userModel } from '../mongoose/mongoose.model';

import { RegistrationDetails } from '../types.server'

export const createUser = async (userDetails : RegistrationDetails) => {
    const passwordHash  = await bcrypt.hash(userDetails.password,10);
    try{
        await userModel.create({
            email : userDetails.email,
            name : userDetails.name,
            password : passwordHash
        })
        return { msg : "Succesfully Added ", status : 201 };
    }
    catch(error){
        return { msg : "User already exists or invalid inputs." , status : 401 }
    }
}