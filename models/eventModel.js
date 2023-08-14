import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.ObjectId,
        ref: 'category',
        required: true
    },
    photo: {
        data: Buffer,
        contentType: String,
    },
})

export default mongoose.model('event', eventSchema);