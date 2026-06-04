import express from "express"

const orderRouter = express.Router()

import { createOrder, deleteOrder, getAllOrders, getSingleOrder, myOrderDetails, updateOrderStatus } from "../controllers/orderController.js"
import { isAdmin, isAuthenticatedUser } from "../util/userAuth.js";

orderRouter.post("/create-order", isAuthenticatedUser, createOrder)
orderRouter.get("/order-details/:id", isAuthenticatedUser, isAdmin("admin"), getSingleOrder)
orderRouter.get("/my-order", isAuthenticatedUser, myOrderDetails)
orderRouter.get("/all-orders", isAuthenticatedUser, getAllOrders)
orderRouter.put("/update-order-status/:id", isAuthenticatedUser, isAdmin("admin"), updateOrderStatus)
orderRouter.delete("/delete-order/:id", isAuthenticatedUser, isAdmin("admin"), deleteOrder)
export default orderRouter;