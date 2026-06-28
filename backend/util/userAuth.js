import jwt from "jsonwebtoken"
import User from "../models/userModel.js"

export const isAuthenticatedUser = async (req, res, next) => {
    try {

          
        const {token} = req.cookies;

        if(!token){
            return res.status(400).json({
                success: false,
                message: "plz login first"
            })
        }
      
        

        const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log(decodedData);

        req.user = await User.findById(decodedData.id);
        next(); //middlewares

    } catch (error) {
        return res.status(500).json({
            success: false,
            error
        })    
    }
}

export const isAdmin = (...roles) => {

    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            return res.status(400).json({
                success: false,
                message: "You are not admin, not allowed to access this"
            })
        }
        console.log(roles);
        
        next()
    }
}