import { documentModel } from '../mongoose/mongoose.model';
import { DocumentDetails } from '../types.server'
const fs = require('fs')

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

export const deleteDocument = async (id : string) => {
    const document = await documentModel.findOne({_id : id})

    if(document && document.filename){
        fs.unlinkSync(`./uploads/${document.filename}`)
    } else {
        return {msg : 'Unable to delete file locally' , status : 400}
    }

    const result = await documentModel.deleteOne({_id : id})
    
    if(result.acknowledged && result.deletedCount)
      return({msg : 'Document deleted successfully', status : 200})
    else  
      return({msg : 'Something went wrong!', status : 400})
    
}

export const fetchDocuments = async (email : string) => {
    try{
        return await documentModel.find({email})
    } catch(error) {
        console.log(error)
    }
    
}