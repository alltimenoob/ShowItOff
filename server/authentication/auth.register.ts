import { RegistrationDetails } from '../types.server';
import { createUser } from '../user/user.server';
import { userModel } from '../mongoose/mongoose.model';

export async function register( userDetails : RegistrationDetails) {
    const existingUser = await userModel.find({email : userDetails.email})

    if(existingUser.length){
        return { msg : "User already exists!" , status : 400}
    }
    else{
        const newUser = await createUser(userDetails)
        if(!newUser){
            return { msg : "Something went wrong while creating a new user!" , status : 400}
        }
        else{
            return { msg : "User created successfully! ",status : 200 }
        }
    }
}
