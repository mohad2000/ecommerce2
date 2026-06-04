import express from "express";

import { combinDataController, deleteUserProfileController, getAllUsersController, loginUserController, logoutUser, registerUserContrller, resetPasswordController, resetPasswordRequestController, updatePasswordController, updateUserProfileController, userProfileController } from "../controllers/userController.js";
import { isAdmin, isAuthenticatedUser } from "../util/userAuth.js";


const userRouter = express.Router();

userRouter.post("/register-user", registerUserContrller);
userRouter.post("/login-user", loginUserController)

userRouter.get("/user-profile", isAuthenticatedUser, userProfileController)
userRouter.put("/update-profile", isAuthenticatedUser, updateUserProfileController )
userRouter.delete("/delete-profile", isAuthenticatedUser, deleteUserProfileController)
userRouter.get("/get-all-users", isAuthenticatedUser,  getAllUsersController)
userRouter.get("/logout", isAuthenticatedUser, logoutUser)
userRouter.post("/reset-password-request", resetPasswordRequestController)
userRouter.put("/reset-password/:token", resetPasswordController)
userRouter.put("/update-password", isAuthenticatedUser, updatePasswordController)
userRouter.get("/combin-data", isAuthenticatedUser, combinDataController)

export default userRouter