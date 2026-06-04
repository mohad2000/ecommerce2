import express from "express";
import { creatProducts, deleteProductController, getAllProducts, getProductDetail, updateProductController } from "../controllers/productController.js";
import { isAdmin, isAuthenticatedUser } from "../util/userAuth.js";

const productsRouter = express.Router()

productsRouter.post("/create-product", isAuthenticatedUser, isAdmin("admin"), creatProducts)
productsRouter.get("/get-all-products", getAllProducts)
productsRouter.get("/product-detail/:id", getProductDetail) 
productsRouter.put("/update-product/:id", isAuthenticatedUser, isAdmin("admin"), updateProductController)
productsRouter.delete("/delete-product/:id", isAuthenticatedUser, isAdmin("admin"), deleteProductController)

export default productsRouter