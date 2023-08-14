import { comparePassword } from "../helper/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from 'jsonwebtoken';
import { hashPassword } from "../helper/authHelper.js";

export const registerController = async (req, res) => {
    try {
        const { email, password, hint } = req.body;
        //validations
        if (!email) {
            return res.send({ message: "Email is Required" });
        }
        if (!password) {
            return res.send({ message: "Password is Required" });
        }
        if (!hint) {
            return res.send({ message: "Hint is Required" });
        }

        if (password.length < 8) {
            return res.send({ message: "password minimum length is 8" });
        }
        if (password.length > 15) {
            return res.send({ message: "Password length is not more than 15 letters" })
        }
        if (!/\d/.test(password)) {
            return res.send({ message: "Password must have one digit" })
        }
        if (!/[a-z]/.test(password)) {
            return res.send({ message: "password must have one lower case letter" });
        }
        if (!/[A-Z]/.test(password)) {
            return res.send({ message: "Password must have one uppper case letter" })
        }
        if (!/[!@#$%^&*()\-_=+{}[\]|;:'",.<>/?]/.test(password)) {
            return res.send({ message: "password must have one special character" })
        }

        //check user
        const exisitingUser = await userModel.findOne({ email });
        //exisiting user
        if (exisitingUser) {
            return res.status(200).send({
                success: false,
                message: "Already Register please login",
            });
        }
        //register user
        const hashedPassword = await hashPassword(password);
        //save
        const user = await new userModel({
            email,
            password: hashedPassword,
            hint
        }).save();

        res.status(201).send({
            success: true,
            message: "User Register Successfully",
            user,
        });



    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Errro in Registeration",
            error,
        });
    }
};




// export const loginController = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         //validation
//         if (!email || !password) {
//             return res.status(404).send({
//                 success: false,
//                 message: "Invalid email or password",
//             });
//         }
//         //check user
//         const user = await userModel.findOne({ email });
//         if (!user) {
//             return res.status(404).send({
//                 success: false,
//                 message: "User is not registerd",
//             });
//         }
//         const match = await comparePassword(password, user.password);
//         if (!match) {
//             return res.status(200).send({
//                 success: false,
//                 message: "Invalid Password",
//             });
//         }
//         //token
//         const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
//             expiresIn: "30d",
//         });
//         console.log("token", token)
//         res.status(200).send({
//             success: true,
//             message: "login successfully",
//             user: {
//                 _id: user._id,
//                 email: user.email,
//                 hint: user.hint,
//                 role: user.role
//             },
//             token,
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({
//             success: false,
//             message: "Error in login",
//             error,
//         });
//     }
// };


export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: 'Invalid email or password',

            })
        }
        //check user
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'Email is not registered'
            })
        }
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(200).send({
                success: false,
                message: 'Invalid Password'
            })
        }
        //token
        // const token = await JWT.sign({ _id: user._id }, "cghchg", { expiresIn: '7d', process.env.JWT_TOKEN_SECRET });
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "1000d" });
        res.status(200).send({
            success: true,
            message: 'login successfully',
            user: {
                email: user.email,
                role: user.role,
                hint: user.hint
            },
            token,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in login',
            error
        })
    }
};



//forgot password
export const forgotPasswordController = async (req, res) => {
    try {
        const { email, hint, newPassword } = req.body;

        if (!email) {
            res.status(400).send({ message: "Email is required" })
        }
        if (!hint) {
            res.status(400).send({ message: "Hint is required" })
        }
        if (!newPassword) {
            res.status(400).send({ message: "newPassword is required" })
        }

        //check
        const user = await userModel.findOne({ email, hint })

        //validation
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Wrong Email or Hint"
            })
        }

        const hashed = await hashPassword(newPassword)
        await userModel.findByIdAndUpdate(user._id, { password: hashed })
        res.status(200).send({
            success: true,
            message: "Password Reset Successfully"
        })

    } catch (error) {
        // console.log(error)
        res.status(500).send({
            success: false,
            message: "Something went wrong",
            error
        })
    }
}




//test controller
export const testController = (req, res) => {
    try {
        res.send("Protected Routes");
    } catch (error) {
        console.log(error);
        res.send({ error });
    }
};
