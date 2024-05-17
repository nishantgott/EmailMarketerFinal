import mongoose from "mongoose";

const messageModelSchema = new mongoose.Schema({
    campaign_name: {
        type: String,
        required: true
    },
    message_id: {
        type: String,
    },
    open: {
        type: String,
        required: true
    },
    click: {
        type: String,
        required: true
    },
    template: {
        type: Object,
    }
})

export default mongoose.model('messages', messageModelSchema);