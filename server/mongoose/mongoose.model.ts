const mongoose = require('mongoose')
import { documentSchema, userSchema } from "./mongoose.schema";

const userModel = mongoose.model("user",userSchema);
const documentModel = mongoose.model("document",documentSchema)
export { userModel, documentModel }
