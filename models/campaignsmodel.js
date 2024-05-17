import mongoose from "mongoose";

const campaignsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
})

export default mongoose.model('campaigns', campaignsSchema);