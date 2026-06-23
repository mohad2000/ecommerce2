
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import User from "../models/userModel.js"
import { sendToken } from "../util/jwtToken.js";
import { sendEmail } from "../util/sendMail.js";
import crypto from "crypto"
import cloudinary from "../util/cloudinary.js"

export const registerUserContrller = async (req, res) => {
    try {
        const {name, email, password, avatar } = req.body;

        if (!avatar) {
            return res.status(400).json({ success: false, message: "Profile picture is required" });
        }

        const uploaded = await cloudinary.uploader.upload(avatar, { folder: "avatars" });

        const user = await User.create({
            name,
            email,
            password,
            profile: {
                public_id: uploaded.public_id,
                url: uploaded.secure_url,
            }
        })

        if(!user){
            return res.status(404).json({
                success: false,
                message : "user not created successfuly"
            })
        }

        sendToken(user, 200, res)

    } catch (error) {
        return res.status(500).json({
            success : false,
            error
        })
    }
}

export const loginUserController = async (req, res) => {
    try {
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "Please provide email and password"
            })
        }
        const user = await User.findOne({ email }).select("+password");
        if(!user){
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }

       let passwordMached = await user.comparePassword(password)

       if(!passwordMached){
        return res.status(400).json({
            success: false,
            message: "Invalid credentails"
        })
       }

        // return res.status(200).json({
        //     success: true,
        //     message: "user loggedin successfully",
        // })
        
        sendToken(user, 200, res)
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

export const userProfileController = async (req, res) => {
   try {
    //  const user = await User.findById(req.params.id)
     
    //  if(!user){
    //     return res.status(400).json({
    //         success: false,
    //         message: "User not found"
    //     })
    //  }

    const user = await User.findById(req.user._id)

     if(!user){
        return res.status(400).json({
            success: false,
            message: "User not found"
        })
     }
     return res.status(200).json({
        success: true,
        user
     })

   } catch (error) {
    return res.status(500).json({
        success: false,
        error
    })
   }
}

export const getUserRole = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)

       if(!user){
        return res.status(400).json({
            success: false,
            message: "User not found"
        })
     }
     return res.status(200).json({
        success: true,
        user
     })

    } catch (error) {
         return res.status(500).json({
        success: false,
        error
    })
    }
}

export const updateUserProfileController = async (req, res) => {
    try {
        // let user = await User.findById(req.params.id);

        // if(!user){
        //     return res.status(404).json({
        //         success: false,
        //         message : "user not found"
        //     })
        // }

        // user = await User.findByIdAndUpdate(req.params.id, req.body, {
        //     new: true,
        //     runValidators: true
        // })

        const { name, email, avatar } = req.body;
        const updateData = { name, email };

        if (avatar) {
            const existingUser = await User.findById(req.user._id);
            if (existingUser?.profile?.public_id) {
                await cloudinary.uploader.destroy(existingUser.profile.public_id);
            }
            const uploaded = await cloudinary.uploader.upload(avatar, { folder: "avatars" });
            updateData.profile = {
                public_id: uploaded.public_id,
                url: uploaded.secure_url,
            };
        }

        const user = await User.findByIdAndUpdate(req.user._id, updateData, {
            new : true,
            runValidators : true
        })

        if(!user){
            return res.status(404).json({
                success: false,
                message : "user not found"
            })
        }
        return res.status(200).json({
            success: true,
            message: "user updated successfuly",
            user
        })

    } catch (error) {
        return res.status(500).json({
            success : false,
            error
        })
    }
}

export const deleteUserProfileController = async (req, res) => {
    try {
        
        // let user = await User.findById(req.params.id)

        // if(!user){
        //     return res.status(400).json({
        //         success: false,
        //         message: "User not found"
        //     })
        // }

        // user = await User.findByIdAndDelete(req.params.id);
        
        let user = await User.findByIdAndDelete(req.user._id);

        if(!user){
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }
        return res.status(200).json({
            success: true,
            message: "User deleted successfully"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            error
        })
    }
}

export const logoutUser = async (req, res) => {
    try {
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true
        })

        return res.status(200).json({
            success: true,
            message: "User logedout successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error
        })  
    }
}

export const resetPasswordRequestController = async (req, res) => {
    try {

        const {email} = req.body;
        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({
                success : false,
                message : "Uesr not found"
            })
        }

        let resetToken = user.getResetPasswordToken();
       
        await user.save({validateBeforeSave : false})
        
        const restPasswordUrl = `http://localhost:5173/reset-password/${resetToken}`
        const message = `if you want to reset your password click on above link ${restPasswordUrl}`;

        
        await sendEmail({
            email : user.email,
            subject : "Reset Password Request",
            message
        })

        res.status(200).json({
            success : true,
            message : `Email sent successfully to ${user.email}`
        })

    } catch (error) {        
        return res.status(500).json({
            success: false,
            message: "Server error"
        })
        
    }
}
export const getAllUsersController = async (req, res) => {
    try {
        const users = await User.find();

        if(!users){
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }

        return res.status(200).json({
            success: true,
            users
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error
        })
    }
}
export const resetPasswordController = async (req, res) => {
    try {
       
        const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex")
        const user = await User.findOne({
            resetPasswordToken, 
            resetPasswordExpire : { $gt: Date.now()}
        })

        if(!user){
            return res.status(400).json({
                success : false,
                message : "Invalid token or its been expired"
            })
        }

        const {password, confirmPassword} = req.body;

        if(password !== confirmPassword){
            return res.status(400).json({
                success: false,
                message: "Password dosnt match to each other"
            })
        } 
         
        user.password = password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();
        
        sendToken(user, 200, res)

    } catch (error) {        
        return res.status(500).json({
            success: false,
            error
        })
    }
}

export const updatePasswordController = async (req, res) => {
    try {
        const { oldPassword, newPassword, confirmNewPassword } = req.body;

        // تحقق من وجود القيم
        if (!oldPassword || !newPassword || !confirmNewPassword) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const user = await User.findById(req.user._id).select("+password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const isPasswordMatched = await user.comparePassword(oldPassword);

        if (!isPasswordMatched) {
            return res.status(400).json({
                success: false,
                message: "Old password is incorrect"
            });
        }

        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match"
            });
        }

        // ممكن تضيف شرط قوة الباسورد هنا
        if (newPassword.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters"
            });
        }

        user.password = newPassword;

        await user.save(); // هنا يتم التشفير تلقائي من pre save

        res.status(200).json({
            success: true,
            message: "Password updated successfully"
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

export const combinDataController = async (req, res) =>{
    try {
        const users = await User.find();
        const products = await Product.find();
        const orders = await Order.find();

        let total = 0;
        orders.forEach((order) => {
            total = total + order.totalPrice
        })

        return res.status(200).json({
            success: true,
            user : users.length,
            product : products.length,
            order : orders.length,
            total
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            error
        })
    }
}



export const changeUserRole = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const { role } = req.body;
        if (!role) {
            return res.status(400).json({
                success: false,
                message: "Role is required"
            });
        }

        user.role = role;
        await user.save();

        return res.status(200).json({
            success: true,
            message: `User role updated to ${role}`,
            user
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error
        });
    }
}