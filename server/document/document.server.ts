import { documentModel } from '../mongoose/mongoose.model';
import { DocumentDetails } from '../types.server'

export const createDocument = async (documentDetails : DocumentDetails) => {
    
    try{
        await documentModel.create({
            email : documentDetails.email,
            title : documentDetails.title,
            preview : documentDetails.preview,
            filename : documentDetails.filename
        })
        return { msg : "Succesfully Added ", status : 201 };
    }
    catch(error){
        return { msg : "Document already exists or invalid inputs." , status : 401 }
    }

}

export const fetchDocuments = async (email : string) => {
    try{
        return await documentModel.find({email})
    } catch(error) {
        console.log(error)
    }
    
}