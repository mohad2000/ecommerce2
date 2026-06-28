import jwt from "jsonwebtoken"
import User from "../models/userModel.js"

export const isAuthenticatedUser = async (req, res, next) => {
    try {


        const { token } = req.cookies?.token;;


        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Please login first"
            });
        }


        const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const user = await User.findById(decodedData.id);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }

        req.user = user;
        next();
    } catch (error) {
          return res.status(401).json({
            success: false,
            message: "Invalid token"
        });
    }
}

export const isAdmin = (...roles) => {

    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(400).json({
                success: false,
                message: "You are not admin, not allowed to access this"
            })
        }
        console.log(roles);

        next()
    }
}