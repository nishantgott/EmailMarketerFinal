import mongoose from "mongoose";

const emailTemplatesSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
})

export default mongoose.model('emailtemplates', emailTemplatesSchema);