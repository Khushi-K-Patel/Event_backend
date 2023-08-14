
import contactModel from "../models/contactModel.js";

export const contactController = async (req, res) => {
    try {
        const { fname, lname, email, phone, message } = req.body;
        //validations
        if (!fname) {
            return res.send({ message: "First name is Required" });
        }
        if (!lname) {
            return res.send({ message: "Last name is Required" });
        }
        if (!email) {
            return res.send({ message: "Email is Required" });
        }
        if (!phone) {
            return res.send({ message: "Phone no. is Required" });
        }
        if (!message) {
            return res.send({ message: "Message is Required" });
        }
        const user = await new contactModel({
            fname,
            lname,
            email,
            phone,
            message
        }).save();

        res.status(201).send({
            success: true,
            message: "Details sent Successfully",
            user,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Details not sent successfully",
            error,
        });
    }
};


//get all client message

export const getClientMessageController = async (req, res) => {
    try {
        const contact = await contactModel.find({});
        res.status(200).send({
            success: true,
            message: "successful",
            contact
        })
        console.log(contact[0])
        console.log(contact[0].message)

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in retrieval",
            error,
        });

    }
}   