import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import crypto from "crypto"

const userSchema = new mongoose.Schema({
   name : {
    type : String,
    require: [true, "Name is required"],
    minLength: 3,
    maxLingth : 20
   },

   email : {
    type: String,
    unique : true,
    require : [true, "Email is required"],
    validator : [validator.isEmail, "Enter valid email"]
   },

   password : {
    type: String,
    minLingth : 8,
    require : [true, "password is required"],
    select : false
   },
   profile :{
    public_id : {
        type : String,
        require: true
    },
    url:{
        type: String,
        require: true
    }
   },
   role: {
    type : String,
    default : "user"
   },

   resetPasswordToken : String,
   resetPasswordExpire : Date,
   
},
{
    timestamps : true,
})

userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        return next;
    }
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.methods.getJWToken = function(){
    return jwt.sign({id : this._id}, process.env.JWT_SECRET_KEY, {expiresIn : "7d"})
}

userSchema.methods.getResetPasswordToken = function(){
    const resetToken = crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;
    return resetToken;
}


const User = mongoose.model("User", userSchema);
export default User;