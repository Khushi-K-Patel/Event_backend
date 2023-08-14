import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,

    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
}, { timestamps: true })

export default mongoose.model('contact', contactSchema);